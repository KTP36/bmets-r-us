import React, { useState } from "react";

function HeartQuiz({ questions = [] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  if (!questions.length) {
    return <div style={{ padding: 24, textAlign: "center" }}>No heart quiz questions available yet.</div>;
  }

  const current = questions[index];

  const handleOptionClick = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === current.answer) setScore(score + 1);
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
        <h2>Quiz Complete!</h2>
        <div style={{ margin: "16px 0" }}>
          Score: {score} / {questions.length}
        </div>
        <button onClick={handleRestart}>Restart</button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "0 auto",
        padding: 24,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 12px #0001"
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <strong>Question {index + 1} / {questions.length}</strong>
      </div>

      <div style={{ fontSize: 20, marginBottom: 20 }}>{current.question}</div>

      <div>
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleOptionClick(i)}
            disabled={selected !== null}
            style={{
              display: "block",
              width: "100%",
              margin: "8px 0",
              padding: "10px 16px",
              borderRadius: 8,
              border: "1px solid #ccc",
              background:
                selected === null
                  ? "#f9f9f9"
                  : i === current.answer
                  ? "#c8f7c5"
                  : selected === i
                  ? "#f7c5c5"
                  : "#f9f9f9",
              cursor: selected === null ? "pointer" : "default"
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      {selected !== null && (
        <div style={{ margin: "16px 0" }}>
          {selected === current.answer ? (
            <span style={{ color: "#219150" }}>Correct!</span>
          ) : (
            <span style={{ color: "#b22222" }}>
              Incorrect. The correct answer is: <strong>{current.options[current.answer]}</strong>
            </span>
          )}
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <button
          onClick={handleNext}
          disabled={selected === null}
          style={{
            padding: "8px 20px",
            borderRadius: 8,
            background: "#1976d2",
            color: "#fff",
            border: "none",
            cursor: selected !== null ? "pointer" : "not-allowed"
          }}
        >
          {index === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>

      <div style={{ marginTop: 24, color: "#555" }}>
        Score: {score}
      </div>
    </div>
  );
}

export default HeartQuiz;