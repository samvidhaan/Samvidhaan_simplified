import os
import json
import faiss
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import google.genai as genai
from fastapi.middleware.cors import CORSMiddleware

# 🔹 IMPORT QUIZ ROUTER
from routers.quiz import router as quiz_router

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
# Config
# -------------------------
VECTOR_DIR = "vector_store"
INDEX_PATH = os.path.join(VECTOR_DIR, "index.faiss")
METADATA_PATH = os.path.join(VECTOR_DIR, "metadata.json")
PARTS_DATA_PATH = os.path.join("data", "constitution_parts.json") # Path for About page

MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
GEMINI_MODEL = "gemini-2.0-flash" # Note: Ensure you are using a valid model string

SIMILARITY_THRESHOLD = 0.45
MAX_RESULTS = 8

# -------------------------
# Initialize FastAPI
# -------------------------
app = FastAPI(title="Constitution AI + Quiz API")

# -------------------------
# CORS (React + Vite)
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React default
        "http://localhost:5173"   # Vite default
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
# Check if vector store exists before reading
if os.path.exists(INDEX_PATH):
    index = faiss.read_index(INDEX_PATH)
    with open(METADATA_PATH, "r", encoding="utf-8") as f:
        metadata = json.load(f)
    embedder = SentenceTransformer(MODEL_NAME)
else:
    print("Warning: Vector store not found. RAG functionality will be disabled.")

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
def retrieve_similar_by_threshold(query: str):
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
        [
            f"Article {doc.get('article_number')} - {doc.get('article_title')}:\n{doc.get('content')}"
            for doc in context_docs
        ]
    )

    return f"""
You are a constitutional law assistant.
Using ONLY the articles below, answer the question.
Do NOT use outside knowledge.
If the Constitution does not define it explicitly, explain what it DOES define instead.

Context:
{context_text}

Question:
{query}

Answer clearly. Use bullet points if listing rights.
"""

# -------------------------
# Endpoints
# -------------------------

@app.get("/")
async def root():
    return {"message": "Constitution API is live", "version": "1.0"}

# --- ABOUT PAGE DATA ENDPOINT ---
@app.get("/api/constitution/parts")
async def get_constitution_parts():
    if not os.path.exists(PARTS_DATA_PATH):
        raise HTTPException(status_code=404, detail="Constitution parts data file not found")
    
    try:
        with open(PARTS_DATA_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- RAG QUERY ENDPOINT ---
@app.post("/rag/query", response_model=RAGResponse)
def query_constitution(request: QueryRequest):
    try:
        top_docs = retrieve_similar_by_threshold(request.query)
        
        if not top_docs:
            return {
                "answer": "I could not find specific articles in the Constitution related to your query. Please try rephrasing.",
                "top_matches": []
            }

        prompt = build_prompt(request.query, top_docs)

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config={
                "temperature": 0.2,
                "top_p": 0.9
            }
        )

        return {
            "answer": response.text,
            "top_matches": top_docs
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API Error: {str(e)}")