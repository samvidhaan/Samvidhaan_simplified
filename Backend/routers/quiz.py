from fastapi import APIRouter
from quiz_data import QUESTIONS
from models import QuizResponse, QuestionResponse, SubmitRequest, SubmitResponse

router = APIRouter(prefix="/api/quiz", tags=["Quiz"])


@router.get("/questions", response_model=QuizResponse)
def get_questions():
    safe_questions = [
        QuestionResponse(
            id=q["id"],
            question=q["question"],
            options=q["options"]
        )
        for q in QUESTIONS
    ]

    return {
        "quizId": "quiz_123",
        "questions": safe_questions
    }


@router.post("/submit", response_model=SubmitResponse)
def submit_quiz(data: SubmitRequest):
    score = 0

    for ans in data.answers:
        question = next((q for q in QUESTIONS if q["id"] == ans.questionId), None)
        if question and question["correct_answer"] == ans.selectedAnswer:
            score += 1

    total = len(QUESTIONS)
    percentage = (score / total) * 100

    return {
        "score": score,
        "total": total,
        "percentage": percentage
    }
