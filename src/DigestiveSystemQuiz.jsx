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
    question: "Which part of the digestive system is also called the throat?",
    options: ["Larynx", "Pharynx", "Trachea", "Duodenum"],
    answer: 1,
    explanation: "The pharynx is also called the throat and serves as a pathway for food and air."
  },
  {
    question: "Which part of the digestive system is also called the throat?",
    options: ["Larynx", "Pharynx", "Trachea", "Duodenum"],
    answer: 1,
    explanation: "The pharynx is also called the throat and serves as a pathway for food and air."
  },
  {
    question: "Which structure carries food from the pharynx to the stomach?",
    options: ["Trachea", "Esophagus", "Ureter", "Bronchus"],
    answer: 1,
    explanation: "The esophagus is the muscular tube that transports food from the throat to the stomach."
  },
  {
    question: "Which muscle action helps move food through the digestive tract?",
    options: ["Diffusion", "Peristalsis", "Filtration", "Ventilation"],
    answer: 1,
    explanation: "Peristalsis is the wave-like muscle contraction that pushes food through the digestive system."
  },
  {
    question: "Which sphincter helps prevent stomach acid from moving back into the esophagus?",
    options: ["Pyloric sphincter", "Lower esophageal sphincter", "Anal sphincter", "Ileocecal valve"],
    answer: 1,
    explanation: "The lower esophageal sphincter helps prevent reflux of stomach contents into the esophagus."
  },
  {
    question: "Which section of the small intestine comes after the duodenum?",
    options: ["Ileum", "Colon", "Jejunum", "Cecum"],
    answer: 2,
    explanation: "The jejunum is the middle section of the small intestine, following the duodenum."
  },
  {
    question: "Which section of the small intestine is last?",
    options: ["Duodenum", "Jejunum", "Ileum", "Cecum"],
    answer: 2,
    explanation: "The ileum is the final section of the small intestine before the large intestine."
  },
  {
    question: "Which valve connects the small intestine to the large intestine?",
    options: ["Pyloric sphincter", "Ileocecal valve", "Lower esophageal sphincter", "Anal sphincter"],
    answer: 1,
    explanation: "The ileocecal valve regulates movement from the ileum into the large intestine."
  },
  {
    question: "Which part of the large intestine comes first?",
    options: ["Rectum", "Cecum", "Sigmoid colon", "Descending colon"],
    answer: 1,
    explanation: "The cecum is the first part of the large intestine."
  },
  {
    question: "Which organ stores and concentrates bile?",
    options: ["Liver", "Gallbladder", "Pancreas", "Appendix"],
    answer: 1,
    explanation: "The gallbladder stores and concentrates bile made by the liver."
  },
  {
    question: "Which organ releases insulin in addition to digestive enzymes?",
    options: ["Gallbladder", "Pancreas", "Liver", "Esophagus"],
    answer: 1,
    explanation: "The pancreas has both digestive and endocrine functions, including insulin secretion."
  },
  {
    question: "Which organ is primarily responsible for water absorption?",
    options: ["Stomach", "Small intestine", "Large intestine", "Liver"],
    answer: 2,
    explanation: "The large intestine absorbs water and electrolytes from undigested material."
  },
  {
    question: "Which structure stores waste before elimination?",
    options: ["Cecum", "Rectum", "Duodenum", "Appendix"],
    answer: 1,
    explanation: "The rectum stores feces until elimination."
  },
  {
    question: "Which structure is responsible for eliminating waste from the body?",
    options: ["Rectum", "Anus", "Colon", "Esophagus"],
    answer: 1,
    explanation: "The anus is the terminal opening through which waste exits the body."
  },
  {
    question: "Which organ plays a major role in detoxification and nutrient processing?",
    options: ["Stomach", "Liver", "Pancreas", "Gallbladder"],
    answer: 1,
    explanation: "The liver processes absorbed nutrients and detoxifies many chemicals and drugs."
  },
  {
    question: "What increases the surface area for nutrient absorption in the small intestine?",
    options: ["Alveoli", "Villi", "Nephrons", "Bronchi"],
    answer: 1,
    explanation: "Villi and microvilli greatly increase the surface area for absorption."
  },
  {
    question: "Which enzyme begins carbohydrate digestion in the mouth?",
    options: ["Pepsin", "Lipase", "Amylase", "Trypsin"],
    answer: 2,
    explanation: "Salivary amylase starts the digestion of carbohydrates in the mouth."
  },
  {
    question: "Where is hydrochloric acid produced?",
    options: ["Pancreas", "Small intestine", "Stomach", "Liver"],
    answer: 2,
    explanation: "The stomach produces hydrochloric acid to help digest food and kill pathogens."
  },
  {
    question: "What is the main role of bile?",
    options: ["Digest proteins", "Emulsify fats", "Absorb water", "Store glucose"],
    answer: 1,
    explanation: "Bile emulsifies fats into smaller droplets so enzymes can digest them more easily."
  },
  {
    question: "Which organ comes directly after the esophagus?",
    options: ["Liver", "Stomach", "Pancreas", "Colon"],
    answer: 1,
    explanation: "The esophagus connects directly to the stomach."
  },
  {
    question: "Which organ comes directly after the stomach in the digestive tract?",
    options: ["Esophagus", "Duodenum", "Colon", "Rectum"],
    answer: 1,
    explanation: "The duodenum is the first part of the small intestine and follows the stomach."
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