# Project Setup and Installation

Follow these steps to set up the development environment for both the backend and frontend.

---

## 1. Virtual Environment
It is recommended to use a virtual environment to manage Python dependencies.

```bash
# Create a virtual environment
python -m venv venv

# Activate the environment (Windows)
venv\Scripts\activate

# Activate the environment (macOS/Linux)
source venv/bin/activate 

```



## 2. Run the Application

**Backend:**
```bash

cd backend
python -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn app:app --reload

```


**Frontend:**

```bash
cd ui
npm i
npm run dev

```

