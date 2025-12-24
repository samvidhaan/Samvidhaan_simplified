import os
import json
import faiss
import numpy as np
from fastapi import FastAPI
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

MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
GEMINI_MODEL = "gemini-2.5-flash"

SIMILARITY_THRESHOLD = 0.45
MAX_RESULTS = 8

# -------------------------
# Initialize FastAPI
# -------------------------
app = FastAPI(title="Constitution + Quiz API")

# -------------------------
# CORS (React + Vite)
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React
        "http://localhost:5173"   # Vite
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
index = faiss.read_index(INDEX_PATH)

with open(METADATA_PATH, "r", encoding="utf-8") as f:
    metadata = json.load(f)

embedder = SentenceTransformer(MODEL_NAME)

# -------------------------
# RAG Models
# -------------------------
class QueryRequest(BaseModel):
    query: str


class RAGResponse(BaseModel):
    answer: str
    top_matches: list


# -------------------------
# Retrieve Similar Docs
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


# -------------------------
# Build RAG Prompt
# -------------------------
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

If the Constitution does not define it explicitly,
explain what it DOES define instead.

Context:
{context_text}

Question:
{query}

Answer clearly. Use bullet points if listing rights.
"""


# -------------------------
# RAG Endpoint
# -------------------------
# Change this part in your app.py
@app.post("/rag/query", response_model=RAGResponse)
def query_constitution(request: QueryRequest):
    top_docs = retrieve_similar_by_threshold(request.query)

    prompt = build_prompt(request.query, top_docs)

    # Use 'config' instead of 'generation_config'
    # And ensure the types match the new SDK requirements
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
