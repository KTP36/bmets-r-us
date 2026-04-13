import React, { useMemo, useState } from "react";

const labValuesQuestions = [
  {
    question: "A potassium level of 6.1 mEq/L is best classified as:",
    options: ["Hypokalemia", "Normal potassium", "Hyperkalemia", "Hyponatremia"],
    answer: 2,
    explanation: "Normal potassium is about 3.5 to 5.0 mEq/L, so 6.1 mEq/L is hyperkalemia."
  },
  {
    question: "Which sodium value is within the normal range?",
    options: ["128 mEq/L", "132 mEq/L", "140 mEq/L", "149 mEq/L"],
    answer: 2,
    explanation: "Normal sodium is about 135 to 145 mEq/L."
  },
  {
    question: "A calcium level of 7.9 mg/dL is most consistent with:",
    options: ["Hypercalcemia", "Normal calcium", "Hypocalcemia", "Normal potassium"],
    answer: 2,
    explanation: "Normal total calcium is about 8.5 to 10.5 mg/dL, so 7.9 mg/dL is low."
  },
  {
    question: "Which WBC count is considered normal?",
    options: ["2,900", "6,800", "12,400", "15,000"],
    answer: 1,
    explanation: "Normal white blood cell count is roughly 4,000 to 11,000."
  },
  {
    question: "A hemoglobin of 10.8 g/dL in an adult is best described as:",
    options: ["Elevated", "Low", "Critical high", "Normal for most adults"],
    answer: 1,
    explanation: "Adult hemoglobin is generally below normal at 10.8 g/dL."
  },
  {
    question: "Which platelet count falls within a common normal range?",
    options: ["95,000", "140,000", "250,000", "520,000"],
    answer: 2,
    explanation: "Normal platelets are commonly about 150,000 to 450,000."
  },
  {
    question: "A glucose level of 58 mg/dL is most consistent with:",
    options: ["Hyperglycemia", "Hypoglycemia", "Normal fasting glucose", "Hypernatremia"],
    answer: 1,
    explanation: "A glucose of 58 mg/dL is low and is consistent with hypoglycemia."
  },
  {
    question: "Which BUN value is within a typical normal range?",
    options: ["4 mg/dL", "12 mg/dL", "29 mg/dL", "38 mg/dL"],
    answer: 1,
    explanation: "Typical BUN range is about 7 to 20 mg/dL."
  },
  {
    question: "A creatinine of 2.3 mg/dL in an adult most likely suggests:",
    options: ["Low kidney marker", "Normal renal function", "Elevated creatinine", "Low sodium"],
    answer: 2,
    explanation: "Creatinine around 2.3 mg/dL is elevated for most adults."
  },
  {
    question: "Which potassium value is normal?",
    options: ["2.8 mEq/L", "3.9 mEq/L", "5.8 mEq/L", "6.4 mEq/L"],
    answer: 1,
    explanation: "Normal potassium is about 3.5 to 5.0 mEq/L."
  },
  {
    question: "A sodium level of 150 mEq/L is best classified as:",
    options: ["Hyponatremia", "Normal sodium", "Hypernatremia", "Hypokalemia"],
    answer: 2,
    explanation: "Sodium above about 145 mEq/L is hypernatremia."
  },
  {
    question: "Which hematocrit is most likely within a typical adult normal range?",
    options: ["22%", "31%", "42%", "55%"],
    answer: 2,
    explanation: "A hematocrit of 42% is within a typical adult normal range."
  },
  {
    question: "A magnesium level of 1.1 mg/dL is most consistent with:",
    options: ["Hypermagnesemia", "Normal magnesium", "Hypomagnesemia", "Normal calcium"],
    answer: 2,
    explanation: "Typical magnesium range is about 1.7 to 2.2 mg/dL, so 1.1 mg/dL is low."
  },
  {
    question: "Which phosphorus value is within a common normal range?",
    options: ["1.8 mg/dL", "3.6 mg/dL", "5.4 mg/dL", "6.2 mg/dL"],
    answer: 1,
    explanation: "A phosphorus of 3.6 mg/dL falls in a common normal range."
  },
  {
    question: "An INR of 3.8 is best described as:",
    options: ["Low", "Normal for someone not anticoagulated", "Elevated", "A platelet value"],
    answer: 2,
    explanation: "An INR of 3.8 is elevated compared with a typical normal INR near 1.0."
  },
  {
    question: "Which lab value is within a common normal fasting glucose range?",
    options: ["62 mg/dL", "88 mg/dL", "134 mg/dL", "182 mg/dL"],
    answer: 1,
    explanation: "A fasting glucose of 88 mg/dL is within a common normal range."
  },
  {
    question: "A WBC count of 13,800 most likely reflects:",
    options: ["Leukopenia", "A normal count", "Leukocytosis", "Normal platelets"],
    answer: 2,
    explanation: "WBC above about 11,000 is commonly considered leukocytosis."
  },
  {
    question: "Which chloride value is most likely normal?",
    options: ["88 mEq/L", "101 mEq/L", "112 mEq/L", "118 mEq/L"],
    answer: 1,
    explanation: "Typical chloride range is about 96 to 106 mEq/L."
  },
  {
    question: "A platelet count of 88,000 is best classified as:",
    options: ["Thrombocytosis", "Normal platelets", "Thrombocytopenia", "Normal WBC"],
    answer: 2,
    explanation: "A platelet count of 88,000 is low and consistent with thrombocytopenia."
  },
  {
    question: "Which calcium level is high?",
    options: ["7.8 mg/dL", "8.9 mg/dL", "9.7 mg/dL", "11.6 mg/dL"],
    answer: 3,
    explanation: "Calcium above about 10.5 mg/dL is generally elevated."
  },
  {
    question: "A BUN of 32 mg/dL is best described as:",
    options: ["Low", "Normal", "Elevated", "A normal sodium value"],
    answer: 2,
    explanation: "BUN of 32 mg/dL is elevated above a typical normal range."
  },
  {
    question: "Which creatinine value is most likely within a common normal range?",
    options: ["0.9 mg/dL", "1.9 mg/dL", "2.8 mg/dL", "3.4 mg/dL"],
    answer: 0,
    explanation: "A creatinine around 0.9 mg/dL is within a common normal range for many adults."
  },
  {
    question: "A sodium value of 131 mEq/L is most consistent with:",
    options: ["Hypernatremia", "Normal sodium", "Hyponatremia", "Normal chloride"],
    answer: 2,
    explanation: "Sodium below about 135 mEq/L is hyponatremia."
  },
  {
    question: "Which hemoglobin value is most likely normal for many adult females?",
    options: ["9.4 g/dL", "11.1 g/dL", "13.2 g/dL", "18.0 g/dL"],
    answer: 2,
    explanation: "A hemoglobin of 13.2 g/dL is within a common normal range for many adult females."
  },
  {
    question: "A potassium level of 3.0 mEq/L is best classified as:",
    options: ["Normal potassium", "Hyperkalemia", "Hypokalemia", "Hypercalcemia"],
    answer: 2,
    explanation: "Potassium below about 3.5 mEq/L is hypokalemia."
  }
];

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

const cardStyle = {
  background: "rgba(255,255,255,0.92)",
  borderRadius: 24,
  padding: 28,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  maxWidth: 940,
  margin: "0 auto"
};

const statCardStyle = {
  background: "#eff6ff",
  color: "#12355b",
  borderRadius: 16,
  padding: "10px 16px",
  fontWeight: 700,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
};

export default function LabValuesQuiz({ onComplete }) {
  const [questions, setQuestions] = useState(() => shuffleQuestionSet(labValuesQuestions));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = questions[currentIndex];
  const totalQuestions = questions.length;
  const isAnswered = selectedAnswer !== null;
  const percentage = useMemo(() => Math.round((score / totalQuestions) * 100), [score, totalQuestions]);

  const restartQuiz = () => {
    setQuestions(shuffleQuestionSet(labValuesQuestions));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
  };

  const handleAnswerClick = (optionIndex) => {
    if (isAnswered) return;
    setSelectedAnswer(optionIndex);
    if (optionIndex === question.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!isAnswered) return;

    if (currentIndex + 1 === totalQuestions) {
      setShowResults(true);
      if (onComplete) {
        const finalScore = score + (selectedAnswer === question.answer ? 1 : 0);
        onComplete(finalScore, totalQuestions);
      }
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
  };

  if (showResults) {
    return (
      <div style={cardStyle}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "#12355b", marginTop: 0 }}>Lab Values Quiz Complete</h2>
          <p style={{ fontSize: 20, color: "#1e293b", marginBottom: 8 }}>
            Your score: {score} / {totalQuestions}
          </p>
          <p style={{ color: "#4f6275", marginTop: 0, marginBottom: 20 }}>
            You finished all 25 questions.
          </p>
          <div
            style={{
              display: "inline-block",
              padding: "12px 18px",
              borderRadius: 16,
              background: "#eff6ff",
              color: "#12355b",
              fontWeight: 800,
              marginBottom: 22
            }}
          >
            {percentage}% correct
          </div>
          <div>
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
              Restart Lab Values Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h2 style={{ color: "#12355b", marginBottom: 8 }}>Lab Values Practice Quiz</h2>
        <p style={{ color: "#4f6275", margin: 0 }}>
          Test common nursing and medical lab ranges with 25 practice questions.
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
        <div style={statCardStyle}>Question {currentIndex + 1} / {totalQuestions}</div>
        <div style={statCardStyle}>Score: {score}</div>
        <div style={statCardStyle}>Lab Values</div>
      </div>

      <div style={{ fontSize: 24, fontWeight: 800, color: "#12355b", marginBottom: 18 }}>
        {question.question}
      </div>

      {question.options.map((option, index) => {
        const isCorrectOption = index === question.answer;
        const isSelectedWrong = isAnswered && index === selectedAnswer && selectedAnswer !== question.answer;

        return (
          <button
            key={option}
            onClick={() => handleAnswerClick(index)}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "14px 16px",
              marginBottom: 12,
              borderRadius: 12,
              border: isCorrectOption && isAnswered
                ? "2px solid green"
                : isSelectedWrong
                ? "2px solid red"
                : "1px solid #cbd5e1",
              background: isCorrectOption && isAnswered
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
            {String.fromCharCode(65 + index)}. {option}
          </button>
        );
      })}

      {isAnswered && (
        <div
          style={{
            marginTop: 8,
            padding: "12px 14px",
            borderRadius: 12,
            background: selectedAnswer === question.answer ? "#eff6ff" : "#fff7ed",
            color: selectedAnswer === question.answer ? "#1d4ed8" : "#9a3412",
            border: selectedAnswer === question.answer ? "1px solid #bfdbfe" : "1px solid #fdba74",
            fontWeight: 600,
            lineHeight: 1.5
          }}
        >
          {question.explanation}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button
          onClick={handleNext}
          style={{
            padding: "12px 24px",
            borderRadius: 999,
            border: "none",
            background: "linear-gradient(135deg, #12355b, #1d6fa5)",
            color: "white",
            fontWeight: 700,
            cursor: isAnswered ? "pointer" : "not-allowed",
            opacity: isAnswered ? 1 : 0.6,
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
          }}
        >
          {currentIndex + 1 === totalQuestions ? "Finish Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
}
