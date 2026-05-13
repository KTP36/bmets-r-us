import React, { useEffect, useRef, useState } from "react";
import { anatomyQuestions } from "./AnatomyQuizData";

export default function AnatomyQuiz({ onComplete }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 500;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [completionTime, setCompletionTime] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const hasStartedRef = useRef(false);

  const formatDuration = (totalSeconds) => {
    const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
    const minutes = Math.floor(safeSeconds / 60);
    const seconds = safeSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (showResult || !anatomyQuestions.length) return;

    const intervalId = window.setInterval(() => {
      setElapsedSeconds(
        Math.max(0, Math.floor((Date.now() - startTime) / 1000))
      );
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [showResult, startTime]);

  if (!anatomyQuestions || anatomyQuestions.length === 0) {
    return <div style={{ padding: 20 }}>No anatomy questions found.</div>;
  }

  const currentQuestion = anatomyQuestions[currentIndex];
  const resultPercent = Math.round((score / anatomyQuestions.length) * 100);

  const handleAnswer = (index) => {
    if (selected !== null) return;

    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      const now = Date.now();
      setStartTime(now);
      setElapsedSeconds(0);
    }

    setSelected(index);

    if (index === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (selected === null) return;

    const currentQuestionWasCorrect = selected === currentQuestion.answer;

    if (currentIndex + 1 < anatomyQuestions.length) {
      setSelected(null);
      setCurrentIndex((prev) => prev + 1);
    } else {
      const finalScore = score + (currentQuestionWasCorrect ? 1 : 0);

      const elapsed = Math.max(
        1,
        Math.floor((Date.now() - startTime) / 1000)
      );

      setCompletionTime(elapsed);

      if (onComplete) {
        onComplete(finalScore, anatomyQuestions.length, elapsed, "Anatomy Quiz");
      }

      setScore(finalScore);
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    const now = Date.now();

    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setCompletionTime(0);
    setElapsedSeconds(0);
    setStartTime(now);

    hasStartedRef.current = false;
  };

  if (showResult) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: isMobile ? 24 : 40,
          maxWidth: 760,
          margin: "0 auto",
          background: "rgba(255,255,255,0.94)",
          borderRadius: 24,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          border: "1px solid #dbeafe"
        }}
      >
        <div
          style={{
            display: "inline-flex",
            padding: "8px 14px",
            borderRadius: 999,
            background: "#ecfdf5",
            color: "#0f766e",
            fontWeight: 900,
            marginBottom: 14
          }}
        >
          Practice Complete
        </div>

        <h2 style={{ color: "#12355b", marginTop: 0, marginBottom: 8 }}>
          Anatomy Quiz Complete
        </h2>

        <p style={{ color: "#475569", marginTop: 0, marginBottom: 20 }}>
          Great job. Review your score, try again, or keep practicing with another free tool.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 12,
            marginBottom: 24
          }}
        >
          <div
            style={{
              padding: 16,
              borderRadius: 18,
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              color: "#12355b",
              fontWeight: 900
            }}
          >
            <div style={{ fontSize: 28 }}>{score} / {anatomyQuestions.length}</div>
            <div style={{ fontSize: 13, color: "#475569" }}>Score</div>
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 18,
              background: "#ecfdf5",
              border: "1px solid #bbf7d0",
              color: "#0f766e",
              fontWeight: 900
            }}
          >
            <div style={{ fontSize: 28 }}>{resultPercent}%</div>
            <div style={{ fontSize: 13, color: "#475569" }}>Accuracy</div>
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 18,
              background: "#fff7ed",
              border: "1px solid #fed7aa",
              color: "#9a3412",
              fontWeight: 900
            }}
          >
            <div style={{ fontSize: 28 }}>{formatDuration(completionTime)}</div>
            <div style={{ fontSize: 13, color: "#475569" }}>Time</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 14
          }}
        >
          <button
            onClick={restartQuiz}
            style={{
              padding: "12px 24px",
              borderRadius: 999,
              border: "none",
              background: "linear-gradient(90deg, #38bdf8 0%, #fbbf24 100%)",
              color: "#12355b",
              fontWeight: 900,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 4px 18px rgba(56,189,248,0.13)"
            }}
          >
            Try Quick Practice Again
          </button>

          <a
            href="/?tab=HeartQuiz"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 24px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #ef4444, #f97316)",
              color: "white",
              fontWeight: 900,
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(239,68,68,0.18)"
            }}
          >
            Try Heart Quiz
          </a>

          <a
            href="/?tab=Terminology"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 24px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
              color: "white",
              fontWeight: 900,
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(124,58,237,0.18)"
            }}
          >
            Medical Terminology
          </a>

          <a
            href="/browse-all-practice.html"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 24px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #12355b, #1d6fa5)",
              color: "white",
              fontWeight: 900,
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(18,53,91,0.18)"
            }}
          >
            Browse All Tools
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: isMobile ? "100vh" : undefined,
        background: "none",
        padding: isMobile ? "0 4vw" : "0"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          boxSizing: "border-box",
          margin: "0 auto",
          padding: isMobile ? "18px 0 32px 0" : "30px 20px 50px 20px",
          textAlign: "center",
          background: "none"
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
            boxSizing: "border-box"
          }}
        >
          <div>Question {currentIndex + 1} of {anatomyQuestions.length}</div>
          <div>Score: {score}</div>
          <div
            style={{
              background: "#eff6ff",
              padding: "8px 14px",
              borderRadius: 999,
              fontWeight: 800,
              color: "#1d4ed8"
            }}
          >
            Time: {formatDuration(elapsedSeconds)}
          </div>
        </div>

        <h2 style={{ color: "#12355b", marginBottom: 8 }}>Anatomy Quiz</h2>
        <p style={{ color: "#0f766e", marginTop: 0, fontWeight: 800 }}>
          Finish to unlock your score, time, and next practice options.
        </p>
        <h3 style={{ color: "#12355b", marginTop: 0 }}>{currentQuestion.question}</h3>

        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            flexWrap: isMobile ? "nowrap" : "wrap",
            justifyContent: "center",
            alignItems: "stretch",
            gap: isMobile ? 10 : 18,
            width: "100%",
            maxWidth: 700,
            boxSizing: "border-box",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          {currentQuestion.options.map((option, i) => (
            <div
              key={i}
              onClick={() => handleAnswer(i)}
              style={{
                flex: isMobile ? "1 1 100%" : "1 1 260px",
                minWidth: isMobile ? "0" : "220px",
                maxWidth: isMobile ? "100%" : "260px",
                minHeight: "110px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: 0,
                padding: isMobile ? "14px 12px" : "18px 20px",
                borderRadius: 18,
                cursor: selected === null ? "pointer" : "default",
                textAlign: "center",
                fontSize: isMobile ? 16 : 18,
                fontWeight: 600,
                border:
                  selected === null
                    ? "2px solid #cbd5e1"
                    : i === currentQuestion.answer
                    ? "2.5px solid #22c55e"
                    : i === selected
                    ? "2.5px solid #ef4444"
                    : "2px solid #e2e8f0",
                background:
                  selected === null
                    ? "linear-gradient(90deg, #f1f5f9 60%, #e0e7ef 100%)"
                    : i === currentQuestion.answer
                    ? "linear-gradient(90deg, #22c55e 60%, #16a34a 100%)"
                    : i === selected
                    ? "linear-gradient(90deg, #ef4444 60%, #b91c1c 100%)"
                    : "linear-gradient(90deg, #e2e8f0 60%, #cbd5e1 100%)",
                color:
                  selected !== null && i === currentQuestion.answer
                    ? "white"
                    : selected !== null && i === selected
                    ? "white"
                    : "#12355b",
                boxShadow:
                  selected === null
                    ? "0 4px 14px rgba(0,0,0,0.06)"
                    : i === currentQuestion.answer
                    ? "0 0 0 4px #bbf7d0, 0 4px 18px rgba(34,197,94,0.13)"
                    : i === selected
                    ? "0 0 0 4px #fecaca, 0 4px 18px rgba(239,68,68,0.13)"
                    : "0 4px 14px rgba(0,0,0,0.06)",
                transition: "all 0.18s cubic-bezier(.4,2,.6,1)",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-line"
              }}
            >
              {option}
            </div>
          ))}
        </div>

        {selected !== null && (
          <div style={{ marginTop: isMobile ? 18 : 28 }}>
            <p
              style={{
                fontSize: isMobile ? 15 : 17,
                color: "#334155",
                marginBottom: isMobile ? 16 : 24,
                wordWrap: "break-word",
                overflowWrap: "break-word"
              }}
            >
              <strong>Explanation:</strong> {currentQuestion.explanation}
            </p>

            <button
              onClick={nextQuestion}
              style={{
                padding: isMobile ? "10px 18px" : "14px 38px",
                borderRadius: 999,
                border: "none",
                background: "linear-gradient(90deg, #38bdf8 0%, #fbbf24 100%)",
                color: "#12355b",
                fontWeight: 900,
                fontSize: isMobile ? 17 : 22,
                letterSpacing: 0.5,
                boxShadow: "0 4px 18px rgba(56,189,248,0.13)",
                cursor: "pointer",
                marginTop: 10,
                transition:
                  "transform 0.13s cubic-bezier(.4,2,.6,1), box-shadow 0.13s cubic-bezier(.4,2,.6,1)",
                width: isMobile ? "100%" : undefined,
                maxWidth: isMobile ? "100%" : undefined,
                wordWrap: "break-word"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {currentIndex === anatomyQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
