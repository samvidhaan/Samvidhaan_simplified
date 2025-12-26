import json
import os
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

# -------------------------------
# Config
# -------------------------------
INPUT_JSON_FILES = [
    "data/constitution.json",
    "data/articles.json"   ]
           

VECTOR_DIR = "vector_store"
INDEX_PATH = os.path.join(VECTOR_DIR, "index.faiss")
METADATA_PATH = os.path.join(VECTOR_DIR, "metadata.json")

MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"

# -------------------------------
# Ensure folder exists
# -------------------------------
os.makedirs(VECTOR_DIR, exist_ok=True)

# -------------------------------
# Load & merge JSON data
# -------------------------------
all_records = []

for json_file in INPUT_JSON_FILES:
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)
        print(f"Loaded {len(data)} records from {json_file}")
        all_records.extend(data)

print(f"✅ Total merged records: {len(all_records)}")

# -------------------------------
# Prepare texts & metadata
# -------------------------------
texts = []
metadata = []

for record in all_records:
    text = (
        f"Part: {record.get('part_title')}\n"
        f"Article: {record.get('article_number')} - {record.get('article_title')}\n"
        f"Content: {record.get('content')}"
    )

    texts.append(text)

    metadata.append({
        "id": record.get("id"),
        "source_type": record.get("source_type"),
        "part_number": record.get("part_number"),
        "part_title": record.get("part_title"),
        "article_number": record.get("article_number"),
        "article_title": record.get("article_title"),
        "content": record.get("content"),
        "sub_sections": record.get("sub_sections"),
        "amendments_notes": record.get("amendments_notes"),
        "source_references": record.get("source_references"),
        "source": record.get("source")
    })

# -------------------------------
# Load embedding model
# -------------------------------
model = SentenceTransformer(MODEL_NAME)

# -------------------------------
# Generate embeddings
# -------------------------------
embeddings = model.encode(
    texts,
    show_progress_bar=True,
    convert_to_numpy=True,
    normalize_embeddings=True
)

dimension = embeddings.shape[1]
print(f"Embedding dimension: {dimension}")

# -------------------------------
# Create FAISS index
# -------------------------------
index = faiss.IndexFlatIP(dimension)  # cosine similarity
index.add(embeddings)

print(f"FAISS index size: {index.ntotal}")

# -------------------------------
# Save index & metadata
# -------------------------------
faiss.write_index(index, INDEX_PATH)

with open(METADATA_PATH, "w", encoding="utf-8") as f:
    json.dump(metadata, f, ensure_ascii=False, indent=2)

print("✅ Vector store built successfully")
print(f"📁 Index saved at: {INDEX_PATH}")
print(f"📁 Metadata saved at: {METADATA_PATH}")
