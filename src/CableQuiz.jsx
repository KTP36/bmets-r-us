import React, { useState } from "react";

const cableQuestions = [
{
question: "What cable is shown?",
image: "/images/cables/ecg_trunk_cable.jpg",
options: ["ECG trunk cable", "SpO2 cable", "Temperature probe", "Arterial line"],
answer: 0
},
{
question: "What device cable is this?",
image: "/images/cables/spo2_sensor.jpg",
options: ["ECG cable", "SpO2 sensor", "PICC line", "NIBP hose"],
answer: 1
},
{
question: "Identify this line:",
image: "/images/cables/picc_line.jpg",
options: ["Arterial line", "Central/PICC line", "ECG lead", "Temperature probe"],
answer: 1
},
{
question: "What is this setup used for?",
image: "/images/cables/arterial_line_catheter.jpg",
options: ["IV fluids", "Continuous blood pressure monitoring", "Oxygen delivery", "Temperature monitoring"],
answer: 1
},
{
question: "What connector is shown?",
image: "/images/cables/hdmi_connector.jpg",
options: ["HDMI", "DisplayPort", "USB-A", "DVI"],
answer: 0
},
{
question: "What cable is this?",
image: "/images/cables/vga_connector.jpg",
options: ["VGA", "HDMI", "BNC", "USB-C"],
answer: 0
},
{
question: "Identify this connector:",
image: "/images/cables/bnc_connector.jpg",
options: ["BNC", "DVI", "VGA", "DisplayPort"],
answer: 0
},
{
question: "What connector is this?",
image: "/images/cables/usb_a_connector.jpg",
options: ["USB-A", "USB-C", "HDMI", "Ethernet"],
answer: 0
},
{
question: "What cable type is shown?",
image: "/images/cables/displayport_connector.jpg",
options: ["DisplayPort", "HDMI", "VGA", "DVI"],
answer: 0
},
{
question: "Identify this connector:",
image: "/images/cables/dvi_connector.jpg",
options: ["DVI", "HDMI", "DisplayPort", "BNC"],
answer: 0
}
];

export default function CableQuiz() {
const [index, setIndex] = useState(0);
const [score, setScore] = useState(0);
const [answers, setAnswers] = useState({});
const [showResults, setShowResults] = useState(false);

const current = cableQuestions[index];
const selected = answers[index];
const isAnswered = selected !== undefined;

const handleAnswer = (i) => {
if (isAnswered) return;

```
setAnswers({ ...answers, [index]: i });

if (i === current.answer) {
  setScore(score + 1);
}
```

};

const nextQuestion = () => {
if (!isAnswered) return;

```
if (index + 1 === cableQuestions.length) {
  setShowResults(true);
} else {
  setIndex(index + 1);
}
```

};

const restartQuiz = () => {
setIndex(0);
setScore(0);
setAnswers({});
setShowResults(false);
};

if (showResults) {
return (
<div style={{ textAlign: "center", padding: 40 }}> <h2>Quiz Complete</h2> <p>Your score: {score} / {cableQuestions.length}</p>

```
    <button onClick={restartQuiz} style={buttonStyle}>
      Restart Quiz
    </button>
  </div>
);
```

}

return ( <div style={container}>
<h2 style={{ textAlign: "center" }}>Medical Cable Identification Quiz</h2>

```
  <div style={card}>
    <p><strong>Question {index + 1} / {cableQuestions.length}</strong></p>

    {current.image && (
      <img
        src={current.image}
        alt="cable"
        style={imageStyle}
      />
    )}

    <h3>{current.question}</h3>

    {current.options.map((opt, i) => {
      const isCorrect = i === current.answer;
      const isWrong = isAnswered && i === selected && selected !== current.answer;

      return (
        <button
          key={i}
          onClick={() => handleAnswer(i)}
          style={{
            ...optionStyle,
            background: isCorrect && isAnswered
              ? "#d4edda"
              : isWrong
              ? "#f8d7da"
              : "#f1f5f9",
            border: isCorrect && isAnswered
              ? "2px solid green"
              : isWrong
              ? "2px solid red"
              : "1px solid #ccc"
          }}
        >
          {String.fromCharCode(65 + i)}. {opt}
        </button>
      );
    })}

    <button onClick={nextQuestion} style={buttonStyle}>
      {index + 1 === cableQuestions.length ? "Finish" : "Next"}
    </button>
  </div>
</div>
```

);
}

const container = {
padding: 20
};

const card = {
maxWidth: 600,
margin: "0 auto",
background: "white",
padding: 20,
borderRadius: 12,
boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
};

const imageStyle = {
width: "100%",
maxHeight: 250,
objectFit: "contain",
marginBottom: 15
};

const optionStyle = {
display: "block",
width: "100%",
padding: 12,
marginBottom: 10,
borderRadius: 8,
cursor: "pointer",
fontWeight: "bold"
};

const buttonStyle = {
marginTop: 15,
padding: 12,
width: "100%",
borderRadius: 8,
background: "#12355b",
color: "white",
border: "none",
cursor: "pointer",
fontWeight: "bold"
};
