# Installation & Setup

### 1. Install Dependencies
```bash
pip install -r requirements.txt
pip install sentence-transformers faiss-cpu numpy
pip install fastapi uvicorn google-generativeai
pip install --upgrade sentence-transformers
npm i
```

### 2. Run the Application
**Backend:**
```bash
cd backend
uvicorn app:app --reload
```

**Frontend:**
```bash
cd ui
npm run dev
```
