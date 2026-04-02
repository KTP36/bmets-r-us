import React, { useMemo, useState } from "react";

const digestiveQuestions = [
  {
    question: "Where does digestion begin?",
    options: ["Stomach", "Mouth", "Esophagus", "Small intestine"],
    answer: 1,
    explanation: "Digestion begins in the mouth, where chewing and salivary enzymes start breaking down food."
  },
  {
    question: "Which organ absorbs most nutrients from food?",
    options: ["Stomach", "Small intestine", "Large intestine", "Liver"],
    answer: 1,
    explanation: "The small intestine is the primary site of nutrient absorption because of its long surface area and villi."
  },
  {
    question: "Which organ produces bile?",
    options: ["Gallbladder", "Pancreas", "Liver", "Stomach"],
    answer: 2,
    explanation: "The liver produces bile, and the gallbladder stores and concentrates it."
  },
  {
    question: "What is the main function of the stomach?",
    options: ["Absorb most water", "Break down food with acid and enzymes", "Store bile", "Produce insulin"],
    answer: 1,
    explanation: "The stomach mixes food with acid and enzymes to begin protein digestion and form chyme."
  },
  {
    question: "The large intestine mainly helps with:",
    options: ["Absorbing water and forming stool", "Producing red blood cells", "Filtering toxins", "Making bile"],
    answer: 0,
    explanation: "The large intestine absorbs water and electrolytes and compacts waste into stool."
  },
  {
    question: "Which structure connects the throat to the stomach?",
    options: ["Trachea", "Esophagus", "Duodenum", "Colon"],
    answer: 1,
    explanation: "The esophagus is the muscular tube that carries food from the throat to the stomach."
  },
  {
    question: "Which digestive organ releases enzymes that help digest carbohydrates, proteins, and fats?",
    options: ["Pancreas", "Gallbladder", "Appendix", "Spleen"],
    answer: 0,
    explanation: "The pancreas releases digestive enzymes into the small intestine to help break down nutrients."
  },
  {
    question: "The first part of the small intestine is the:",
    options: ["Ileum", "Jejunum", "Duodenum", "Cecum"],
    answer: 2,
    explanation: "The duodenum is the first section of the small intestine and receives bile and pancreatic enzymes."
  },
  {
    question: "What is the job of bile in digestion?",
    options: ["Digest proteins", "Break down sugar", "Emulsify fats", "Absorb vitamins"],
    answer: 2,
    explanation: "Bile emulsifies fats, making them easier for enzymes to digest."
  },
  {
    question: "Which movement pushes food through the digestive tract?",
    options: ["Diffusion", "Peristalsis", "Filtration", "Flexion"],
    answer: 1,
    explanation: "Peristalsis is the wave-like muscular movement that moves food through the digestive system."
  }
];

export default function DigestiveSystemQuiz() {
  const questions = useMemo(() => digestiveQuestions, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentIndex];
  const selected = selectedAnswers[currentIndex];
  const isAnswered = selected !== undefined;

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    const percent = Math.round((score / questions.length) * 100);
    return (
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
        <h2 style={{ color: "#12355b", marginTop: 0 }}>Digestive System Quiz Complete</h2>
        <p style={{ fontSize: 20, color: "#1e293b", marginBottom: 10 }}>
          Your score: {score} / {questions.length}
        </p>
        <p style={{ color: "#4f6275", marginTop: 0, marginBottom: 24 }}>
          Accuracy: {percent}%
        </p>
        <div style={{ display: "grid", gap: 12, maxWidth: 340, margin: "0 auto" }}>
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
            Restart Quiz
          </button>
          <a
            href="/digestive-system-anatomy-quiz.html"
            style={{
              padding: "12px 24px",
              borderRadius: 999,
              textDecoration: "none",
              background: "linear-gradient(135deg, #0f766e, #14b8a6)",
              color: "white",
              fontWeight: 700
            }}
          >
            Open Digestive Study Page
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.92)",
        borderRadius: 24,
        padding: 28,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        maxWidth: 980,
        margin: "0 auto"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h2 style={{ color: "#12355b", marginBottom: 8, marginTop: 0 }}>Digestive System Quiz</h2>
        <p style={{ color: "#4f6275", margin: 0 }}>
          Test your knowledge of the mouth, stomach, intestines, liver, pancreas, and digestive function.
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
        <div style={{ padding: "10px 16px", borderRadius: 999, background: "#eff6ff", color: "#12355b", fontWeight: 700 }}>
          Question {currentIndex + 1} / {questions.length}
        </div>
        <div style={{ padding: "10px 16px", borderRadius: 999, background: "#ecfeff", color: "#0f766e", fontWeight: 700 }}>
          Score: {score}
        </div>
      </div>

      <div style={{ color: "#12355b", marginBottom: 18 }}>
        <div style={{ fontSize: 22, fontWeight: 700 }}>{currentQuestion.question}</div>
      </div>

      {currentQuestion.options.map((opt, i) => {
        const isCorrectOption = i === currentQuestion.answer;
        const isSelectedWrong = isAnswered && i === selected && selected !== currentQuestion.answer;
        return (
          <button
            key={i}
            onClick={() => {
              if (isAnswered) return;
              setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: i }));
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
            background: "#eff6ff",
            color: "#1d4ed8",
            border: "1px solid #bfdbfe",
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
            if (currentIndex + 1 === questions.length) {
              setShowResults(true);
            } else {
              setCurrentIndex((prev) => prev + 1);
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
          {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
}
