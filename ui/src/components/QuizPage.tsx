import { useState, useEffect } from "react";
import { Trophy, ArrowRight, RefreshCw } from "lucide-react";

type Question = {
  id: string;
  question: string;
  options: string[];
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

  /* ---------------- FETCH QUESTIONS ---------------- */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/quiz/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions);
        setQuizId(data.quizId);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load quiz", err);
        setLoading(false);
      });
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    setAnswers((prev) => [
      ...prev,
      {
        questionId: questions[currentQuestion].id,
        selectedAnswer: selectedAnswer,
      },
    ]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quizId,
        answers,
      }),
    });

    const result = await res.json();
    setScore(result.score);
    setShowResult(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizStarted(false);
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading quiz...</p>
      </div>
    );
  }

  /* ---------------- START SCREEN ---------------- */
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-green-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Constitution Quiz
            </h1>

            <p className="text-gray-600 mb-8 text-lg">
              Test your knowledge about the Indian Constitution.
            </p>

            <div className="bg-gradient-to-r from-orange-100 to-purple-100 rounded-2xl p-6 mb-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-orange-600">
                    {questions.length}
                  </p>
                  <p className="text-sm text-gray-600">Questions</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-600">10</p>
                  <p className="text-sm text-gray-600">Minutes</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">Easy</p>
                  <p className="text-sm text-gray-600">Difficulty</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setQuizStarted(true)}
              className="bg-gradient-to-r from-orange-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- RESULT SCREEN ---------------- */
  if (showResult) {
    const percentage = (score / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-green-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-16 h-16 text-white" />
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Quiz Completed!
            </h1>

            <div className="bg-gradient-to-r from-orange-100 to-purple-100 rounded-2xl p-8 mb-8">
              <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-purple-600 mb-2">
                {percentage}%
              </p>
              <p className="text-xl text-gray-700 font-semibold">
                {score} out of {questions.length} correct
              </p>
            </div>

            <button
              onClick={handleRestart}
              className="bg-gradient-to-r from-orange-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all inline-flex items-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- QUESTION SCREEN ---------------- */
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-green-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-purple-600">
              Score: {score}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-orange-500 to-purple-600 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            {question.question}
          </h2>

          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${
                  selectedAnswer === index
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-orange-300"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      selectedAnswer === index
                        ? "bg-purple-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-gray-800 font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center space-x-2 ${
              selectedAnswer === null
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-purple-600 text-white hover:shadow-lg"
            }`}
          >
            <span>
              {currentQuestion === questions.length - 1
                ? "Finish"
                : "Next Question"}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
