from pydantic import BaseModel
from typing import List

class QuestionResponse(BaseModel):
    id: str
    question: str
    options: List[str]

class QuizResponse(BaseModel):
    quizId: str
    questions: List[QuestionResponse]

class Answer(BaseModel):
    questionId: str
    selectedAnswer: int

class SubmitRequest(BaseModel):
    quizId: str
    answers: List[Answer]

class SubmitResponse(BaseModel):
    score: int
    total: int
    percentage: float
