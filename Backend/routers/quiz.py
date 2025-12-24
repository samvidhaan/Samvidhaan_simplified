import json
import random
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/quiz")

# --- Models ---
class Answer(BaseModel):
    questionId: str
    selectedAnswer: int

class SubmitRequest(BaseModel):
    quizId: str
    answers: List[Answer]

# --- Load Questions from a "Database" file ---
def load_all_questions():
    with open("data/questions.json", "r") as f:
        return json.load(f)

@router.get("/questions")
async def get_questions():
    all_questions = load_all_questions()
    # Randomize and pick 5
    selected = random.sample(all_questions, min(len(all_questions), 5))
    
    # In a real app, you'd save this 'session' in a DB
    return {
        "quizId": "session_" + str(random.randint(100, 999)),
        "questions": [{"id": q["id"], "question": q["question"], "options": q["options"]} for q in selected]
    }

@router.post("/submit")
async def submit_quiz(data: SubmitRequest):
    all_questions = load_all_questions()
    q_map = {q["id"]: q for q in all_questions}
    
    score = 0
    review = []

    for user_ans in data.answers:
        original_q = q_map.get(user_ans.questionId)
        if original_q:
            is_correct = original_q["correct_answer"] == user_ans.selectedAnswer
            if is_correct: score += 1
            
            review.append({
                "question": original_q["question"],
                "options": original_q["options"],
                "selected": user_ans.selectedAnswer,
                "correct": original_q["correct_answer"],
                "explanation": original_q.get("explanation", ""),
                "isCorrect": is_correct
            })

    return {
        "score": score,
        "total": len(data.answers),
        "review": review
    }