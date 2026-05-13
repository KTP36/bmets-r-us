import React, { useEffect, useRef, useState } from "react";

function HeartQuiz({ questions = [], onComplete, onStart }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [completionTime, setCompletionTime] = useState(0);
  const hasStartedRef = useRef(false);

  const formatDuration = (totalSeconds) => {
    const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
    const minutes = Math.floor(safeSeconds / 60);
    const seconds = safeSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (showResult || !questions.length) return;

    const intervalId = window.setInterval(() => {
      setElapsedSeconds(
        Math.max(0, Math.floor((Date.now() - startTime) / 1000))
      );
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [showResult, questions.length, startTime]);

  if (!questions.length) {
    return (
      <div style={{ padding: 24, textAlign: "center", color: "#0f172a" }}>
        No heart quiz questions available yet.
      </div>
    );
  }

  const current = questions[index];

  const handleOptionClick = (i) => {
    if (selected !== null) return;

    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      const now = Date.now();
      setStartTime(now);
      setElapsedSeconds(0);

      if (onStart) {
        onStart("Heart Quiz");
      }
    }

    setSelected(i);

    if (i === current.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (selected === null) return;

    const currentQuestionWasCorrect = selected === current.answer;

    if (index < questions.length - 1) {
      setIndex((prev) => prev + 1);
      setSelected(null);
    } else {
      const finalScore = score + (currentQuestionWasCorrect ? 1 : 0);
      const elapsed = Math.max(
        1,
        Math.floor((Date.now() - startTime) / 1000)
      );

      setCompletionTime(elapsed);

      if (onComplete) {
        onComplete(finalScore, questions.length, elapsed, "Heart Quiz");
      }

      setScore(finalScore);
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    const now = Date.now();

    setIndex(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setElapsedSeconds(0);
    setCompletionTime(0);
    setStartTime(now);
    hasStartedRef.current = false;
  };

  const noticeText =
    current.hint || "Focus on how blood flows through the heart.";

  const explanationText =
    current.explanation ||
    "Understanding blood flow helps connect heart anatomy to function. Start by asking where blood is coming from, where it is going next, and whether it is oxygen-rich or oxygen-poor.";

  if (showResult) {
    return (
      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          textAlign: "center",
          background: "rgba(255,255,255,0.96)",
          borderRadius: 24,
          padding: 28,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          color: "#0f172a"
        }}
      >
        <h2 style={{ color: "#12355b", marginTop: 0 }}>
          Heart Quiz Complete
        </h2>

        <div style={{ margin: "16px 0", fontSize: 20 }}>
          Score: {score} / {questions.length}
        </div>

        <div style={{ marginBottom: 20, color: "#4f6275", fontWeight: 700 }}>
          Time: {formatDuration(completionTime)}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 20
          }}
        >
          <button
            onClick={() => (window.location.href = "/anatomy-labeling-practice.html")}
            style={{
              padding: "12px 24px",
              borderRadius: 999,
              background: "#2563eb",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Try Another Quiz
          </button>

          <a
            href="/browse-all-practice.html"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 24px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #0f766e, #14b8a6)",
              color: "white",
              fontWeight: 700,
              textDecoration: "none"
            }}
          >
            Browse All Tools
          </a>

          <button
            onClick={handleRestart}
            style={{
              padding: "12px 24px",
              borderRadius: 999,
              background: "#e2e8f0",
              color: "#0f172a",
              border: "none",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 560,
        margin: "0 auto",
        padding: 24,
        background: "#ffffff",
        borderRadius: 16,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        color: "#0f172a"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 16
        }}
      >
        <div
          style={{
            padding: "10px 14px",
            borderRadius: 999,
            background: "#eff6ff",
            color: "#12355b",
            fontWeight: 800
          }}
        >
          Question {index + 1} / {questions.length}
        </div>

        <div
          style={{
            padding: "10px 14px",
            borderRadius: 999,
            background: "#ecfeff",
            color: "#0f766e",
            fontWeight: 800
          }}
        >
          Time: {formatDuration(elapsedSeconds)}
        </div>

        <div
          style={{
            padding: "10px 14px",
            borderRadius: 999,
            background: "#f8fafc",
            color: "#334155",
            fontWeight: 800,
            border: "1px solid #e2e8f0"
          }}
        >
          Score: {score}
        </div>
      </div>

      <div
        style={{
          marginBottom: 18,
          padding: "12px 14px",
          borderRadius: 14,
          background: "#ecfdf5",
          border: "1px solid #bbf7d0",
          color: "#0f766e",
          fontWeight: 800,
          fontSize: 14
        }}
      >
        Quick practice takes 2 to 5 minutes. Finish to see your score and time.
      </div>

      <div
        style={{
          fontSize: 20,
          marginBottom: 20,
          fontWeight: 700,
          color: "#0f172a",
          lineHeight: 1.4
        }}
      >
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
                borderRadius: 10,
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
        <div
          style={{
            margin: "18px 0",
            padding: 16,
            borderRadius: 14,
            background: selected === current.answer ? "#ecfdf5" : "#fff7ed",
            border:
              selected === current.answer
                ? "1px solid #bbf7d0"
                : "1px solid #fed7aa",
            color: "#0f172a"
          }}
        >
          {selected === current.answer ? (
            <div style={{ color: "#166534", fontWeight: 800 }}>
              Correct!
            </div>
          ) : (
            <div style={{ color: "#991b1b", fontWeight: 800 }}>
              Incorrect. The correct answer is:{" "}
              <strong>{current.options[current.answer]}</strong>
            </div>
          )}

          <div style={{ marginTop: 12, fontSize: 14, color: "#334155" }}>
            <strong>What to notice first:</strong> {noticeText}
          </div>

          <div style={{ marginTop: 10, fontSize: 14, color: "#475569" }}>
            <strong>Why it matters:</strong> {explanationText}
          </div>
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <button
          onClick={handleNext}
          disabled={selected === null}
          style={{
            padding: "10px 22px",
            borderRadius: 999,
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
    </div>
  );
}

export default HeartQuiz;
