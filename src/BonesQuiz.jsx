import React, { useState } from "react";
import { bonesQuestions } from "./BonesQuizData";

export default function BonesQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = bonesQuestions[currentIndex];

  const handleAnswer = (index) => {
    if (selected !== null) return;

    setSelected(index);

    if (index === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);

    if (currentIndex + 1 < bonesQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <h2>Your Score</h2>
        <h1>{score} / {bonesQuestions.length}</h1>
        <button onClick={() => window.location.reload()}>
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "30px 20px 50px 20px",
        textAlign: "center",
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          maxWidth: 700,
          margin: "0 auto 20px auto",
          padding: "12px 16px",
          background: "#ffffff",
          borderRadius: 16,
          boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
          border: "1px solid #cbd5e1",
          color: "#12355b",
          fontWeight: 700,
          fontSize: 16,
          boxSizing: "border-box",
        }}
      >
        <div>Question {currentIndex + 1} of {bonesQuestions.length}</div>
        <div>Score: {score}</div>
      </div>
      <h2>Bones Quiz</h2>
      <h3>{currentQuestion.question}</h3>

      <div style={{ marginTop: 20 }}>
        {currentQuestion.options.map((option, i) => (
          <div
            key={i}
            onClick={() => handleAnswer(i)}
            style={{
              maxWidth: 700,
              width: "100%",
              margin: "0 auto 14px auto",
              padding: "18px 20px",
              borderRadius: 16,
              cursor: "pointer",
              textAlign: "center",
              fontSize: 18,
              fontWeight: 600,
              boxSizing: "border-box",
              border: "1px solid #cbd5e1",
              background:
                selected === null
                  ? "#ffffff"
                  : i === currentQuestion.answer
                  ? "#22c55e"
                  : i === selected
                  ? "#ef4444"
                  : "#e2e8f0",
              color:
                selected !== null && i === currentQuestion.answer
                  ? "white"
                  : selected !== null && i === selected
                  ? "white"
                  : "#12355b",
              boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
              transition: "all 0.15s ease",
            }}
          >
            {option}
          </div>
        ))}
      </div>

      {selected !== null && (
        <div style={{ marginTop: 20 }}>
          <p><strong>Explanation:</strong> {currentQuestion.explanation}</p>

          <button
            onClick={nextQuestion}
            style={{
              marginTop: 14,
              padding: "12px 28px",
              borderRadius: 999,
              border: "none",
              background: "linear-gradient(90deg, #38bdf8 0%, #fbbf24 100%)",
              color: "#12355b",
              fontWeight: 800,
              fontSize: 18,
              cursor: "pointer",
              boxShadow: "0 4px 18px rgba(56,189,248,0.13)",
            }}
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}