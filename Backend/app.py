import os
import json
import re
import faiss
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
from google import genai
from fastapi.middleware.cors import CORSMiddleware

# 🔹 IMPORT QUIZ ROUTER
from routers.quiz import router as quiz_router

# -------------------------
# DEBUG FLAG
# -------------------------
DEBUG_RAG = True

# -------------------------
# Load env vars
# -------------------------
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# -------------------------
# Gemini Client
# -------------------------
client = genai.Client(api_key=GEMINI_API_KEY)

# -------------------------
# Paths & Config
# -------------------------
VECTOR_DIR = "vector_store"
INDEX_PATH = os.path.join(VECTOR_DIR, "index.faiss")
METADATA_PATH = os.path.join(VECTOR_DIR, "metadata.json")
PARTS_DATA_PATH = os.path.join("data", "constitution_parts.json")

MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
GEMINI_MODEL = "gemini-2.5-flash"

SIMILARITY_THRESHOLD = 0.25
MAX_RESULTS = 8

# -------------------------
# Initialize FastAPI
# -------------------------
app = FastAPI(title="Constitution AI + Quiz API")

# -------------------------
# CORS
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Include Quiz Router
# -------------------------
app.include_router(quiz_router)

# -------------------------
# Load Vector Store
# -------------------------
if not os.path.exists(INDEX_PATH):
    raise RuntimeError("Vector store not found")

index = faiss.read_index(INDEX_PATH)
with open(METADATA_PATH, "r", encoding="utf-8") as f:
    metadata = json.load(f)

embedder = SentenceTransformer(MODEL_NAME)

# -------------------------
# Pydantic Models
# -------------------------
class QueryRequest(BaseModel):
    query: str

class RAGResponse(BaseModel):
    answer: str
    top_matches: list

# -------------------------
# Helper Functions
# -------------------------

def is_greeting(query: str) -> bool:
    return query.strip().lower() in {
        "hi", "hello", "hey", "hi there", "hello there"
    }

def is_general_knowledge(query: str) -> bool:
    keywords = [
        "who is", "father of", "first",
        "president of india", "prime minister",
        "capital of india", "indian"
    ]
    return any(k in query.lower() for k in keywords)

def extract_article_numbers(query: str):
    return re.findall(r'article\s+(\d+)', query.lower())

def retrieve_by_article_numbers(article_numbers):
    results, seen = [], set()
    for num in article_numbers:
        for doc in metadata:
            if str(doc.get("article_number")) == num and num not in seen:
                d = doc.copy()
                d["similarity_score"] = 1.0
                results.append(d)
                seen.add(num)
    return results

def retrieve_semantic(query: str):
    query_embedding = embedder.encode(
        [query],
        convert_to_numpy=True,
        normalize_embeddings=True
    )

    scores, indices = index.search(query_embedding, 50)
    results = []

    for idx, score in zip(indices[0], scores[0]):
        if score < SIMILARITY_THRESHOLD:
            continue
        doc = metadata[idx].copy()
        doc["similarity_score"] = float(score)
        results.append(doc)
        if len(results) >= MAX_RESULTS:
            break
    return results

def build_prompt(query: str, context_docs: list) -> str:
    context_text = "\n\n".join(
        f"Article {d.get('article_number')} - {d.get('article_title')}:\n{d.get('content')}"
        for d in context_docs
    )

    return f"""
You are an assistant for the Constitution of India.

Rules:
- Use ONLY the context below.
- Do NOT use outside knowledge.
- If multiple articles are provided, compare them clearly.
- If something is not present, say so explicitly.
-If query is related directly to any article and if that article is found display it.
Context:
{context_text}

Question:
{query}

Answer clearly.
"""

def extract_gemini_text(response) -> str:
    try:
        if hasattr(response, "text") and response.text:
            return response.text
        if response.candidates:
            return response.candidates[0].content.parts[0].text
        return "No response generated."
    except Exception as e:
        return f"Failed to parse response: {str(e)}"

def ask_gemini_india_only(query: str) -> str:
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=f"""
You are an assistant for Indian civics and general knowledge.

STRICT RULES:
- Answer ONLY if the question is related to India.
- If the question is about any other country or global topic, say:
  "I can only answer questions related to India."

Question:
{query}

Answer briefly and clearly.
""",
        config={"temperature": 0.3}
    )
    return extract_gemini_text(response)

# -------------------------
# API Endpoints
# -------------------------

@app.get("/")
async def root():
    return {"message": "Constitution API is live", "version": "1.0"}

@app.get("/api/constitution/parts")
async def get_constitution_parts():
    if not os.path.exists(PARTS_DATA_PATH):
        raise HTTPException(404, "Parts data not found")
    with open(PARTS_DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

@app.post("/rag/query", response_model=RAGResponse)
def query_constitution(request: QueryRequest):

    print("\n================ RAG START ================")
    print("Query:", request.query)

    # 1️⃣ Greeting
    if is_greeting(request.query):
        return {
            "answer": "Hello 👋 I can help you with the Constitution of India, its Articles, Rights, Duties, and Indian civics.",
            "top_matches": []
        }

    # 2️⃣ India-only General Knowledge
    if is_general_knowledge(request.query):
        print("India-only General Knowledge → Gemini")
        answer = ask_gemini_india_only(request.query)
        return {
            "answer": answer,
            "top_matches": []
        }

    # 3️⃣ Constitutional RAG
    article_numbers = extract_article_numbers(request.query)

    if article_numbers:
        print("Direct Article Lookup → Articles", article_numbers)
        docs = retrieve_by_article_numbers(article_numbers)
    else:
        print("Semantic RAG Retrieval")
        docs = retrieve_semantic(request.query)

    if not docs:
        return {
            "answer": "I could not find relevant constitutional articles for your question.",
            "top_matches": []
        }

    print(f"Sending {len(docs)} docs to Gemini")

    prompt = build_prompt(request.query, docs)

    if DEBUG_RAG:
        print("\n============= PROMPT TO GEMINI =============")
        print(prompt)
        print("==========================================")

    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt,
        config={"temperature": 0.2}
    )

    answer_text = extract_gemini_text(response)

    print("\n================ GEMINI OUTPUT ================")
    print(answer_text)
    print("=============================================\n")

    return {
        "answer": answer_text,
        "top_matches": docs
    }
