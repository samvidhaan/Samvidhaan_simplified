"use client";

import { useState, useEffect } from "react";
import { Trophy, ArrowRight, RefreshCw, Loader2, CheckCircle2, XCircle, Info, ChevronRight } from "lucide-react";

type Question = {
  id: string;
  question: string;
  options: string[];
};

type ReviewItem = {
  question: string;
  options: string[];
  selected: number;
  correct: number;
  explanation: string;
  isCorrect: boolean;
};

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizId, setQuizId] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizReview, setQuizReview] = useState<ReviewItem[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/quiz/questions");
      const data = await res.json();
      setQuestions(data.questions);
      setQuizId(data.quizId);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleAnswerSelect = (index: number) => setSelectedAnswer(index);

  const handleNext = () => {
    if (selectedAnswer === null) return;
    const currentAns = { questionId: questions[currentQuestion].id, selectedAnswer: selectedAnswer };
    const updatedAnswers = [...answers, currentAns];
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      submitQuiz(updatedAnswers);
    }
  };

  const submitQuiz = async (finalAnswers: any[]) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId, answers: finalAnswers }),
      });
      const result = await res.json();
      setScore(result.score);
      setQuizReview(result.review);
      setShowResult(true);
    } catch (err) { console.error(err); }
    finally { setIsSubmitting(false); }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizStarted(false);
    fetchQuestions();
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-2" />
      <p className="text-gray-500 text-sm font-medium">Loading Quiz Data...</p>
    </div>
  );

  /* ---------------- 1. START SCREEN ---------------- */
  if (!quizStarted) return (
    <div className="h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-gray-100">
        <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
          <Trophy className="w-10 h-10 text-blue-600 -rotate-3" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Samvidhaan Quiz</h1>
        <p className="text-gray-500 mb-8 text-sm">Challenge your knowledge on the Indian Constitution.</p>
        <button
          onClick={() => setQuizStarted(true)}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all active:scale-[0.97] shadow-lg shadow-blue-100"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );

  /* ---------------- 2. RESULT & REVIEW SCREEN (Large & Scrollable) ---------------- */
  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {/* Result Card */}
          <div className="bg-white rounded-[2rem] shadow-xl p-10 text-center mb-10 border border-gray-100 relative">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-2">Quiz Finished</h2>
            <div className="text-6xl font-black text-gray-900 mb-2">{percentage}%</div>
            <p className="text-lg text-gray-600 mb-8 font-medium">You got {score} / {questions.length} correct</p>
            <button
              onClick={handleRestart}
              className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>

          {/* Performance Review List */}
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
             <Info className="w-5 h-5 text-blue-500" /> Performance Summary
          </h3>
          <div className="space-y-6 pb-10">
            {quizReview.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <p className="font-bold text-gray-800 leading-snug pr-4">{idx + 1}. {item.question}</p>
                  {item.isCorrect ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />}
                </div>

                <div className="grid gap-2 mb-4">
                  {item.options.map((option, i) => (
                    <div key={i} className={`p-3 rounded-xl text-sm font-semibold border ${
                      i === item.correct ? "bg-green-50 border-green-200 text-green-700" : 
                      i === item.selected && !item.isCorrect ? "bg-red-50 border-red-200 text-red-700" : "bg-gray-50 border-gray-100 text-gray-400"
                    }`}>
                      {option}
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <p className="text-xs font-bold text-blue-600 uppercase mb-1">Explanation</p>
                  <p className="text-sm text-blue-900 leading-relaxed font-medium">{item.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- 3. ACTIVE QUIZ SCREEN (Compact & No-Scroll) ---------------- */
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="h-screen bg-slate-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-xl w-full">
        {/* Progress Bar Container */}
        <div className="mb-4">
          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-blue-600 transition-all duration-700 ease-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6 leading-tight min-h-[3rem]">
            {question.question}
          </h2>

          <div className="space-y-2 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-3.5 rounded-xl text-left transition-all border-2 flex items-center group ${
                  selectedAnswer === index
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-50 bg-gray-50 hover:border-gray-300 text-gray-600"
                }`}
              >
                <span className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mr-3 text-xs font-bold ${
                  selectedAnswer === index ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-400 border border-gray-200"
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="font-semibold text-sm leading-tight">{option}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={selectedAnswer === null || isSubmitting}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              selectedAnswer === null || isSubmitting
                ? "bg-gray-100 text-gray-400"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span className="text-base font-bold">
                  {currentQuestion === questions.length - 1 ? "Finish Attempt" : "Continue"}
                </span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}