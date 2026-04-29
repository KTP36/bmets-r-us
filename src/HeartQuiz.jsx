import React, { useState } from "react";

function HeartQuiz({ questions = [], onComplete }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [completionTime, setCompletionTime] = useState(0);

  if (!questions.length) {
    return (
      <div style={{ padding: 24, textAlign: "center", color: "#0f172a" }}>
        No heart quiz questions available yet.
      </div>
    );
  }

  const current = questions[index];

  const formatDuration = (totalSeconds) => {
    const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
    const minutes = Math.floor(safeSeconds / 60);
    const seconds = safeSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const handleOptionClick = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === current.answer) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    if (selected === null) return;

    if (index < questions.length - 1) {
      setIndex((prev) => prev + 1);
      setSelected(null);
    } else {
      const finalScore = score;
      const elapsedSeconds = Math.max(1, Math.floor((Date.now() - startTime) / 1000));

      setCompletionTime(elapsedSeconds);

      if (onComplete) {
        onComplete(finalScore, questions.length, elapsedSeconds, "Heart Quiz");
      }

      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setCompletionTime(0);
    setStartTime(Date.now());
  };

  if (showResult) {
    return (
      <div
        style={{
          maxWidth: 500,
          margin: "0 auto",
          textAlign: "center",
          background: "rgba(255,255,255,0.96)",
          borderRadius: 24,
          padding: 28,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          color: "#0f172a"
        }}
      >
        <h2 style={{ color: "#12355b", marginTop: 0 }}>Heart Quiz Complete</h2>

        <div style={{ margin: "16px 0", fontSize: 20, color: "#1e293b" }}>
          Score: {score} / {questions.length}
        </div>

        <div style={{ marginBottom: 20, color: "#4f6275", fontWeight: 600 }}>
          Time: {formatDuration(completionTime)}
        </div>

        <button
          onClick={handleRestart}
          style={{
            padding: "12px 24px",
            borderRadius: 999,
            background: "linear-gradient(135deg, #12355b, #1d6fa5)",
            color: "#ffffff",
            border: "none",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "0 auto",
        padding: 24,
        background: "#ffffff",
        borderRadius: 12,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        color: "#0f172a"
      }}
    >
      <div style={{ marginBottom: 16, color: "#0f172a" }}>
        <strong>Question {index + 1} / {questions.length}</strong>
      </div>

      <div style={{ fontSize: 20, marginBottom: 20, color: "#0f172a", fontWeight: 600 }}>
        {current.question}
      </div>

      <div>
        {current.options.map((opt, i) => {
          const isCorrect = i === current.answer;
          const isSelected = selected === i;

          return (
            <button
              key={i}
              onClick={() => handleOptionClick(i)}
              disabled={selected !== null}
              style={{
                display: "block",
                width: "100%",
                margin: "8px 0",
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid #cbd5e1",
                background:
                  selected === null
                    ? "#f8fafc"
                    : isCorrect
                    ? "#dcfce7"
                    : isSelected
                    ? "#fee2e2"
                    : "#f8fafc",
                color: "#0f172a",
                fontWeight: 600,
                cursor: selected === null ? "pointer" : "default",
                textAlign: "left"
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div style={{ margin: "16px 0", color: "#0f172a" }}>
          {selected === current.answer ? (
            <span style={{ color: "#166534", fontWeight: 700 }}>Correct!</span>
          ) : (
            <span style={{ color: "#991b1b", fontWeight: 700 }}>
              Incorrect. The correct answer is:{" "}
              <strong>{current.options[current.answer]}</strong>
            </span>
          )}
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <button
          onClick={handleNext}
          disabled={selected === null}
          style={{
            padding: "10px 22px",
            borderRadius: 8,
            background: selected !== null ? "#1976d2" : "#94a3b8",
            color: "#ffffff",
            border: "none",
            fontWeight: 700,
            cursor: selected !== null ? "pointer" : "not-allowed"
          }}
        >
          {index === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>

      <div style={{ marginTop: 24, color: "#334155", fontWeight: 600 }}>
        Score: {score}
      </div>
    </div>
  );
}

export default HeartQuiz;