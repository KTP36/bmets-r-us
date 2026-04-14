import React, { useState } from "react";
import { abgQuestions } from "./abgQuestions";

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleQuestion(question) {
  const optionsWithFlags = question.options.map((option, index) => ({
    text: option,
    isCorrect: index === question.answer
  }));

  const shuffledOptions = shuffleArray(optionsWithFlags);

  return {
    ...question,
    options: shuffledOptions.map((item) => item.text),
    answer: shuffledOptions.findIndex((item) => item.isCorrect)
  };
}

function shuffleQuestionSet(questionSet) {
  return shuffleArray(questionSet).map((question) => shuffleQuestion(question));
}

export default function ABGQuiz({ onComplete }) {
  const [questions, setQuestions] = useState(() => shuffleQuestionSet(abgQuestions));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[index];
  const selected = answers[index];
  const isAnswered = selected !== undefined;

  const restartQuiz = () => {
    setQuestions(shuffleQuestionSet(abgQuestions));
    setIndex(0);
    setScore(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div style={{ padding: 20 }}>
        <div
          style={{
            background: "rgba(255,255,255,0.92)",
            borderRadius: 24,
            padding: 28,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <h2 style={{ color: "#12355b", marginTop: 0 }}>ABG Quiz Complete</h2>
          <p style={{ fontSize: 20, color: "#1e293b" }}>
            Your score: {score} / {questions.length}
          </p>
          <button
            onClick={restartQuiz}
            style={{
              padding: "12px 24px",
              borderRadius: 999,
              border: "none",
              background: "linear-gradient(135deg, #12355b, #1d6fa5)",
              color: "white",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Restart ABG Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          background: "rgba(255,255,255,0.9)",
          borderRadius: 24,
          padding: 28,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          maxWidth: 980,
          margin: "0 auto"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h2 style={{ color: "#12355b", marginBottom: 8 }}>ABG Quiz</h2>
          <p style={{ color: "#4f6275", margin: 0 }}>
            Practice identifying acid base imbalances and normal ABG ranges.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 20
          }}
        >
          <div
            style={{
              padding: "10px 16px",
              borderRadius: 999,
              background: "#eff6ff",
              color: "#12355b",
              fontWeight: 700
            }}
          >
            Question {index + 1} / {questions.length}
          </div>
          <div
            style={{
              padding: "10px 16px",
              borderRadius: 999,
              background: "#ecfeff",
              color: "#0f766e",
              fontWeight: 700
            }}
          >
            Score: {score}
          </div>
        </div>

        <div style={{ color: "#12355b", marginBottom: 18 }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{currentQuestion.question}</div>
        </div>

        {currentQuestion.options.map((opt, i) => {
          const isCorrectOption = i === currentQuestion.answer;
          const isSelectedWrong =
            isAnswered && i === selected && selected !== currentQuestion.answer;

          return (
            <button
              key={i}
              onClick={() => {
                if (isAnswered) return;
                setAnswers((prev) => ({ ...prev, [index]: i }));
                if (i === currentQuestion.answer) {
                  setScore((prev) => prev + 1);
                }
              }}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "14px 16px",
                marginBottom: 12,
                borderRadius: 12,
                border:
                  isCorrectOption && isAnswered
                    ? "2px solid green"
                    : isSelectedWrong
                    ? "2px solid red"
                    : "1px solid #cbd5e1",
                background:
                  isCorrectOption && isAnswered
                    ? "#d9f7d9"
                    : isSelectedWrong
                    ? "#fee2e2"
                    : "#f8fafc",
                color: "#1e293b",
                fontSize: 16,
                fontWeight: 600,
                cursor: isAnswered ? "default" : "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
              }}
            >
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          );
        })}

        {isAnswered && (
          <div
            style={{
              marginTop: 8,
              padding: "12px 14px",
              borderRadius: 12,
              background:
                selected === currentQuestion.answer ? "#eff6ff" : "#fff7ed",
              color:
                selected === currentQuestion.answer ? "#1d4ed8" : "#9a3412",
              border:
                selected === currentQuestion.answer
                  ? "1px solid #bfdbfe"
                  : "1px solid #fdba74",
              fontWeight: 600
            }}
          >
            {currentQuestion.explanation}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button
            onClick={() => {
              if (!isAnswered) return;

              if (index + 1 === questions.length) {
                onComplete && onComplete(score, questions.length);
                setShowResults(true);
              } else {
                setIndex((prev) => prev + 1);
              }
            }}
            style={{
              padding: "12px 24px",
              borderRadius: 999,
              border: "none",
              background: "linear-gradient(135deg, #12355b, #1d6fa5)",
              color: "white",
              fontWeight: 700,
              cursor: !isAnswered ? "not-allowed" : "pointer",
              opacity: !isAnswered ? 0.6 : 1,
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
            }}
          >
            {index + 1 === questions.length ? "Finish Quiz" : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
}