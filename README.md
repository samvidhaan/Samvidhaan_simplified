#  Gemini API Key Setup (Required)

To run **Samvidhaan Simplified** locally, you must provide your **own Gemini API key**.  
This ensures secure access to Google’s Generative AI models and avoids hardcoding sensitive credentials.

---

##  Why is this required?

- The **RAG-based chatbot** uses **Google Gemini** to generate answers
- Each user should use their **own API key**
- This follows best practices for security and scalability

---

##  Step-by-Step Setup Guide

###  Get a Gemini API Key

1. Go to **Google AI Studio**  
    https://aistudio.google.com/

2. Sign in using your Google account

3. Click on **“Get API Key”**

4. Create a new API key and **copy it**

---

###  Add the API Key to Backend Environment

1. Navigate to the **backend** folder of the project
  
2. Open .env and add the following line:
   
   ```bash
   GEMINI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxx #(Replace with your own api key)
   ```

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

