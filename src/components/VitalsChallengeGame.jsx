import React from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import QuizStatPill from "./ui/QuizStatPill";
import QuizAnswerGrid from "./ui/QuizAnswerGrid";
import QuizHeader from "./ui/QuizHeader";
import QuizSurface from "./ui/QuizSurface";
import QuizModeToggle from "./ui/QuizModeToggle";
import QuizFeedbackCard from "./ui/QuizFeedbackCard";

const correctSound = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
const wrongSound = new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleQuestion(question) {
  if (!question || !Array.isArray(question.options)) return question;
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
  if (!Array.isArray(questionSet)) return [];
  return shuffleArray(questionSet).map((question) => shuffleQuestion(question));
}

const VITALS_CHALLENGE_QUESTIONS = [
  {
    patient: "18-year-old student after gym class",
    vitals: { temp: "98.6°F", hr: "86", rr: "16", bp: "118/74", spo2: "99%", pain: "0/10" },
    question: "How should you classify this set of vitals?",
    options: ["Normal/stable", "Concerning", "Urgent", "Need immediate oxygen only"],
    answer: 0,
    teaching: "These vitals are within common adult ranges. The patient is stable based on the numbers shown.",
    priority: "Recognize normal before you try to recognize abnormal."
  },
  {
    patient: "72-year-old with fever and weakness",
    vitals: { temp: "102.7°F", hr: "118", rr: "24", bp: "92/58", spo2: "90%", pain: "4/10" },
    question: "What is the biggest concern?",
    options: ["Pain score only", "Low oxygen and low blood pressure", "Temperature only", "Nothing urgent"],
    answer: 1,
    teaching: "SpO2 of 90%, BP of 92/58, fast heart rate, fever, and increased respirations together suggest possible instability.",
    priority: "Look at the full pattern, not one number by itself."
  },
  {
    patient: "Adult with anxiety before a procedure",
    vitals: { temp: "98.4°F", hr: "112", rr: "22", bp: "132/82", spo2: "99%", pain: "0/10" },
    question: "What should you notice first?",
    options: ["Heart rate and respiratory rate are elevated", "Oxygen is critically low", "Blood pressure is dangerously low", "Temperature shows fever"],
    answer: 0,
    teaching: "The oxygen and blood pressure are okay, but the heart rate and respirations are elevated. Anxiety, pain, fever, dehydration, or other causes should be considered.",
    priority: "Tachycardia and tachypnea need context."
  },
  {
    patient: "Post-op patient receiving pain medication",
    vitals: { temp: "98.0°F", hr: "58", rr: "8", bp: "104/66", spo2: "88%", pain: "2/10" },
    question: "Which finding is most urgent?",
    options: ["Respiratory rate and SpO2", "Temperature", "Pain score", "Heart rate only"],
    answer: 0,
    teaching: "A respiratory rate of 8 with SpO2 of 88% is a priority concern, especially after pain medication.",
    priority: "Breathing and oxygenation come first."
  },
  {
    patient: "Adult with possible dehydration",
    vitals: { temp: "99.2°F", hr: "122", rr: "20", bp: "88/54", spo2: "97%", pain: "1/10" },
    question: "What pattern do these vitals suggest?",
    options: ["Possible dehydration or poor perfusion", "Normal adult vitals", "Respiratory failure only", "Hypertension crisis"],
    answer: 0,
    teaching: "Fast heart rate plus low blood pressure can suggest dehydration, blood loss, shock risk, or poor perfusion depending on context.",
    priority: "Low BP plus tachycardia is a red flag pattern."
  },
  {
    patient: "Patient with chest discomfort",
    vitals: { temp: "98.8°F", hr: "132", rr: "26", bp: "168/96", spo2: "93%", pain: "8/10" },
    question: "What should be treated as concerning?",
    options: ["High pain, fast HR/RR, high BP, and lower oxygen", "Temperature only", "Pain is the only abnormal value", "All values are normal"],
    answer: 0,
    teaching: "Chest discomfort with tachycardia, tachypnea, elevated BP, lower oxygen, and severe pain is concerning and needs prompt attention.",
    priority: "Symptoms plus vitals tell the story."
  },
  {
    patient: "Sleeping adult on routine check",
    vitals: { temp: "97.9°F", hr: "54", rr: "14", bp: "110/68", spo2: "98%", pain: "0/10" },
    question: "How should this be interpreted first?",
    options: ["Likely stable if patient is resting and asymptomatic", "Urgent shock", "Respiratory failure", "Fever with sepsis"],
    answer: 0,
    teaching: "A heart rate of 54 can be normal for some resting patients, especially if asymptomatic. Always consider baseline and symptoms.",
    priority: "Numbers need patient context."
  },
  {
    patient: "Child with fever and fast breathing",
    vitals: { temp: "103.1°F", hr: "142", rr: "34", bp: "96/62", spo2: "91%", pain: "3/10" },
    question: "Which pattern is most concerning?",
    options: ["Fever with fast breathing and low oxygen", "Pain score only", "Normal oxygen", "Normal temperature"],
    answer: 0,
    teaching: "Fever, tachycardia, tachypnea, and SpO2 of 91% create a concerning respiratory/infection pattern.",
    priority: "Low oxygen with increased work of breathing matters."
  },
  {
    patient: "Adult with COPD history",
    vitals: { temp: "98.7°F", hr: "96", rr: "21", bp: "128/76", spo2: "91%", pain: "0/10" },
    question: "What is the best first interpretation?",
    options: ["Borderline oxygen should be interpreted with baseline and symptoms", "This is always normal for every adult", "Blood pressure is critically low", "Temperature is the biggest issue"],
    answer: 0,
    teaching: "SpO2 of 91% can be concerning, but COPD baseline and symptoms matter. Do not ignore it; compare to baseline and clinical presentation.",
    priority: "Oxygen values need context and trend."
  },
  {
    patient: "Adult after standing up quickly",
    vitals: { temp: "98.2°F", hr: "120", rr: "18", bp: "84/50", spo2: "98%", pain: "0/10" },
    question: "Which vital sign pair is most concerning?",
    options: ["High heart rate and low blood pressure", "Temperature and oxygen", "Pain and temperature", "Respiratory rate and oxygen"],
    answer: 0,
    teaching: "Tachycardia with hypotension suggests the body may be compensating for poor circulating volume or perfusion.",
    priority: "Perfusion clues are high-yield."
  },
  {
    patient: "Adult with pneumonia symptoms",
    vitals: { temp: "101.8°F", hr: "104", rr: "28", bp: "118/70", spo2: "89%", pain: "2/10" },
    question: "What should you notice first?",
    options: ["Low oxygen and high respiratory rate", "Blood pressure is the only issue", "Pain is critical", "All values are normal"],
    answer: 0,
    teaching: "SpO2 of 89% and RR of 28 suggest respiratory compromise, especially with fever and pneumonia symptoms.",
    priority: "Airway and breathing concerns rise to the top."
  },
  {
    patient: "Adult with severe pain after injury",
    vitals: { temp: "98.6°F", hr: "118", rr: "22", bp: "150/88", spo2: "99%", pain: "9/10" },
    question: "What is the likely reason for the elevated HR and BP?",
    options: ["Severe pain response", "Oxygen failure", "Severe hypothermia", "Normal relaxation response"],
    answer: 0,
    teaching: "Severe pain can raise heart rate, respiratory rate, and blood pressure. Still, the patient needs assessment and pain management per protocol.",
    priority: "Pain changes vital signs."
  },
  {
    patient: "Adult with fluid overload signs",
    vitals: { temp: "98.9°F", hr: "108", rr: "26", bp: "166/94", spo2: "90%", pain: "0/10" },
    question: "Which assessment would connect best with these vitals?",
    options: ["Lung sounds and edema check", "Only pupil reaction", "Only skin temperature", "Only appetite"],
    answer: 0,
    teaching: "High BP, tachypnea, low oxygen, and tachycardia can fit fluid overload. Lung sounds, edema, and daily weight matter.",
    priority: "Fluid overload often shows in breathing and swelling."
  },
  {
    patient: "Adult with possible hypoglycemia symptoms",
    vitals: { temp: "98.5°F", hr: "116", rr: "20", bp: "126/78", spo2: "98%", pain: "0/10" },
    question: "What should you check next based on symptoms and vitals?",
    options: ["Blood glucose if shaky/confused/diaphoretic", "Ignore symptoms", "Request only a temperature recheck", "Assume oxygen failure"],
    answer: 0,
    teaching: "Tachycardia with shakiness, sweating, or confusion can suggest checking blood glucose depending on role and protocol.",
    priority: "Vitals plus symptoms guide next checks."
  },
  {
    patient: "Adult with suspected sepsis",
    vitals: { temp: "103.4°F", hr: "126", rr: "30", bp: "86/48", spo2: "92%", pain: "5/10" },
    question: "How should this be classified?",
    options: ["Urgent", "Normal", "Only mildly abnormal", "Pain-only issue"],
    answer: 0,
    teaching: "Fever, tachycardia, tachypnea, hypotension, and lower oxygen are urgent warning signs and may suggest sepsis or shock risk.",
    priority: "Multiple abnormal vitals together can signal instability."
  },
  {
    patient: "Adult at routine appointment",
    vitals: { temp: "98.1°F", hr: "72", rr: "15", bp: "122/76", spo2: "98%", pain: "0/10" },
    question: "What is the best interpretation?",
    options: ["Stable vitals", "Urgent respiratory distress", "Severe hypotension", "High fever"],
    answer: 0,
    teaching: "These values are consistent with stable adult vital signs.",
    priority: "Stable patterns are just as important as abnormal patterns."
  },
  {
    patient: "Adult with asthma symptoms",
    vitals: { temp: "98.8°F", hr: "124", rr: "32", bp: "138/84", spo2: "88%", pain: "0/10" },
    question: "Which issue should be prioritized?",
    options: ["Breathing and oxygenation", "Temperature", "Pain", "Only blood pressure"],
    answer: 0,
    teaching: "RR of 32 and SpO2 of 88% point to respiratory distress. Breathing and oxygenation are priority concerns.",
    priority: "Low SpO2 plus fast respirations is urgent."
  },
  {
    patient: "Adult with GI fluid loss",
    vitals: { temp: "99.0°F", hr: "114", rr: "20", bp: "94/60", spo2: "98%", pain: "3/10" },
    question: "What pattern should you connect to vomiting/diarrhea?",
    options: ["Possible dehydration", "Fluid overload only", "Normal perfusion with no concern", "Oxygen failure"],
    answer: 0,
    teaching: "GI losses can lead to dehydration. Tachycardia and lower BP support that pattern.",
    priority: "Fluid losses change vital signs."
  },
  {
    patient: "Adult after blood pressure medication change",
    vitals: { temp: "98.3°F", hr: "62", rr: "16", bp: "82/46", spo2: "97%", pain: "0/10" },
    question: "What should you notice first?",
    options: ["Low blood pressure", "Fever", "Low oxygen", "High pain"],
    answer: 0,
    teaching: "BP of 82/46 is low and could cause dizziness, falls, or poor perfusion. Medication timing and symptoms matter.",
    priority: "Low blood pressure can be a safety and fall risk."
  },
  {
    patient: "Adult with high fever",
    vitals: { temp: "104.0°F", hr: "130", rr: "26", bp: "112/70", spo2: "96%", pain: "4/10" },
    question: "Which pattern is expected with fever?",
    options: ["Increased heart rate and respiratory rate", "Low temperature", "Always low blood pressure", "No change in vitals"],
    answer: 0,
    teaching: "Fever often increases heart rate and respiratory rate. The cause of the fever still needs assessment.",
    priority: "Temperature affects other vitals."
  },
  {
    patient: "Adult with possible stroke symptoms",
    vitals: { temp: "98.6°F", hr: "88", rr: "18", bp: "184/102", spo2: "97%", pain: "0/10" },
    question: "Which finding should stand out with neurologic symptoms?",
    options: ["Very high blood pressure", "Normal temperature", "Normal oxygen only", "Pain score"],
    answer: 0,
    teaching: "Very high BP with neurologic symptoms is concerning and needs prompt clinical attention.",
    priority: "Vital signs matter more when paired with symptoms."
  },
  {
    patient: "Adult with allergic reaction symptoms",
    vitals: { temp: "98.9°F", hr: "128", rr: "28", bp: "84/52", spo2: "92%", pain: "0/10" },
    question: "How should this be treated in a challenge question?",
    options: ["Urgent", "Normal", "Only pain-related", "Temperature concern only"],
    answer: 0,
    teaching: "Low BP, fast HR/RR, and lower oxygen with allergic symptoms may suggest a serious reaction. This is urgent.",
    priority: "Low BP with breathing symptoms is dangerous."
  },
  {
    patient: "Adult with bradypnea",
    vitals: { temp: "97.8°F", hr: "64", rr: "7", bp: "116/70", spo2: "91%", pain: "0/10" },
    question: "What is the biggest concern?",
    options: ["Slow respirations and lower oxygen", "Normal temperature", "Blood pressure", "Pain score"],
    answer: 0,
    teaching: "RR of 7 is too slow for most adults and SpO2 is lower than expected. Breathing is the priority.",
    priority: "Respiratory rate is a vital sign for a reason."
  },
  {
    patient: "Adult with possible blood loss",
    vitals: { temp: "98.2°F", hr: "136", rr: "24", bp: "78/42", spo2: "95%", pain: "7/10" },
    question: "What does this pattern suggest?",
    options: ["Shock risk or poor perfusion", "Normal vitals", "Only oxygen issue", "Only fever"],
    answer: 0,
    teaching: "Very low BP with high HR is concerning for shock risk or poor perfusion. Context such as bleeding matters.",
    priority: "Compensation can show as tachycardia before collapse."
  },
  {
    patient: "Adult with sleep apnea concern",
    vitals: { temp: "98.4°F", hr: "82", rr: "12", bp: "136/82", spo2: "86%", pain: "0/10" },
    question: "Which value is most concerning?",
    options: ["SpO2 of 86%", "Temperature", "Pain", "Respiratory rate alone"],
    answer: 0,
    teaching: "SpO2 of 86% is low and should be addressed based on setting, role, and protocol.",
    priority: "Low oxygen is a priority even when other vitals look okay."
  },
  {
    patient: "Adult with uncontrolled hypertension",
    vitals: { temp: "98.7°F", hr: "90", rr: "18", bp: "202/116", spo2: "98%", pain: "0/10" },
    question: "What should you notice first?",
    options: ["Severely elevated blood pressure", "Fever", "Low oxygen", "Low respirations"],
    answer: 0,
    teaching: "A BP of 202/116 is severely elevated. Symptoms such as chest pain, headache, neuro changes, or shortness of breath increase concern.",
    priority: "Extremely high BP needs attention and symptom assessment."
  },
  {
    patient: "Adult after exercise",
    vitals: { temp: "99.1°F", hr: "108", rr: "22", bp: "130/78", spo2: "99%", pain: "0/10" },
    question: "What context matters most?",
    options: ["Recent exercise can explain mild HR/RR elevation", "This is always shock", "Oxygen is dangerously low", "Temperature is critical"],
    answer: 0,
    teaching: "Mildly elevated HR and RR after exercise may be expected. Recheck after rest if appropriate.",
    priority: "Always connect vitals to activity and timing."
  },
  {
    patient: "Adult with respiratory distress",
    vitals: { temp: "99.8°F", hr: "118", rr: "36", bp: "146/88", spo2: "82%", pain: "0/10" },
    question: "How should this be classified?",
    options: ["Urgent breathing/oxygenation concern", "Normal", "Pain-only concern", "Routine recheck only"],
    answer: 0,
    teaching: "RR of 36 and SpO2 of 82% are urgent respiratory findings.",
    priority: "SpO2 in the low 80s is a serious oxygenation concern."
  },
  {
    patient: "Adult with normal oxygen but abnormal BP",
    vitals: { temp: "98.6°F", hr: "76", rr: "16", bp: "88/56", spo2: "99%", pain: "0/10" },
    question: "What should you avoid assuming?",
    options: ["That normal oxygen means all vitals are safe", "That BP matters", "That symptoms matter", "That trends matter"],
    answer: 0,
    teaching: "Normal oxygen does not erase low blood pressure. Each vital sign adds part of the picture.",
    priority: "Do not let one normal number distract you from one dangerous number."
  },
  {
    patient: "Adult with worsening trend",
    vitals: { temp: "100.9°F", hr: "112", rr: "24", bp: "100/62", spo2: "93%", pain: "3/10" },
    question: "What makes this more concerning if prior vitals were normal?",
    options: ["The trend is worsening", "The pain is zero", "All values are perfect", "Temperature is low"],
    answer: 0,
    teaching: "Trends matter. A patient moving from normal to fever, tachycardia, tachypnea, lower BP, and lower oxygen deserves attention.",
    priority: "Trends can be more important than a single snapshot."
  }
];

export default function VitalsChallengeGame({ trackExamCompletion, shareQuizResult }) {
  const buildVitalsSet = (mode) => {
    const count = mode === "quick" ? 5 : 25;
    return shuffleQuestionSet(VITALS_CHALLENGE_QUESTIONS).slice(0, count);
  };

  const [mode, setMode] = React.useState("quick");
  const [questions, setQuestions] = React.useState(() => buildVitalsSet("quick"));
  const [index, setIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [showResults, setShowResults] = React.useState(false);
  const [showMissedReview, setShowMissedReview] = React.useState(false);
  const [streak, setStreak] = React.useState(0);
  const [bestStreak, setBestStreak] = React.useState(0);

  const current = questions[index];
  const selected = answers[index];
  const isAnswered = selected !== undefined;
  const activityName = mode === "quick" ? "Vitals Challenge Quick Practice" : "Vitals Challenge Full Practice";

  const startMode = (nextMode) => {
    setMode(nextMode);
    setQuestions(buildVitalsSet(nextMode));
    setIndex(0);
    setScore(0);
    setAnswers({});
    setShowResults(false);
    setShowMissedReview(false);
    setStreak(0);
    setBestStreak(0);
  };

  const restart = () => startMode(mode);

  const missedQuestions = questions
    .map((q, originalIndex) => ({ ...q, originalIndex, selected: answers[originalIndex] }))
    .filter((q) => q.selected !== undefined && q.selected !== q.answer);

  const statStyle = {
    padding: "12px 14px",
    borderRadius: 18,
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    color: "#12355b",
    fontWeight: 900,
    textAlign: "center"
  };

  const buttonBase = {
    padding: "12px 20px",
    borderRadius: 999,
    border: "none",
    color: "white",
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(15,23,42,0.12)"
  };

  if (showMissedReview) {
    return (
      <Card style={{ maxWidth: 980, margin: "0 auto", background: "rgba(255,255,255,0.96)", borderRadius: 24, padding: 28, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", border: "1px solid #dbeafe" }}>
        <h2 style={{ color: "#12355b", textAlign: "center", marginTop: 0 }}>Vitals Missed Questions Review</h2>
        {missedQuestions.length === 0 ? (
          <p style={{ textAlign: "center", color: "#1e293b" }}>You did not miss any questions.</p>
        ) : (
          <div style={{ display: "grid", gap: 14 }}>
            {missedQuestions.map((q) => (
              <div key={q.originalIndex} style={{ background: "#f8fafc", border: "1px solid #dbeafe", borderRadius: 18, padding: 18 }}>
                <div style={{ color: "#12355b", fontWeight: 900, marginBottom: 8 }}>{q.patient}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8, marginBottom: 12 }}>
                  {Object.entries(q.vitals).map(([label, value]) => (
                    <div key={label} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 10, textAlign: "center" }}>
                      <div style={{ color: "#64748b", fontSize: 9, textTransform: "uppercase", fontWeight: 800 }}>{label}</div>
                      <div style={{ color: "#0f172a", fontWeight: 900 }}>{value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontWeight: 900, color: "#0f172a" }}>{q.question}</div>
                <div style={{ marginTop: 8, color: "#dc2626", fontWeight: 800 }}>Your answer: {q.options[q.selected]}</div>
                <div style={{ color: "#16a34a", fontWeight: 900 }}>Correct: {q.options[q.answer]}</div>
                <div style={{ marginTop: 8, color: "#334155" }}>{q.teaching}</div>
                <div style={{ marginTop: 8, padding: 10, borderRadius: 12, background: "#ecfeff", color: "#0f766e", fontWeight: 800 }}>Priority clue: {q.priority}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Button onClick={() => setShowMissedReview(false)} style={{ ...buttonBase, background: "linear-gradient(135deg, #12355b, #1d6fa5)" }}>Back to Results</Button>
        </div>
      </Card>
    );
  }

  if (showResults) {
    const accuracy = questions.length ? Math.round((score / questions.length) * 100) : 0;
    return (
      <Card style={{ maxWidth: 900, margin: "0 auto", background: "rgba(255,255,255,0.96)", borderRadius: 24, padding: 28, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", border: "1px solid #dbeafe", textAlign: "center" }}>
        <div style={{ display: "inline-flex", padding: "8px 14px", borderRadius: 999, background: "#ecfeff", color: "#0f766e", fontWeight: 900, marginBottom: 14 }}>Vitals Challenge Complete</div>
        <h2 style={{ color: "#12355b", marginTop: 0 }}>{mode === "quick" ? "Quick Vitals Challenge Complete" : "Full Vitals Challenge Complete"}</h2>
        <p style={{ color: "#475569", maxWidth: 700, margin: "0 auto 22px" }}>Great job. Review your score, study missed scenarios, or switch between quick and full practice.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 24 }}>
          <div style={statStyle}><div style={{ fontSize: 28 }}>{score} / {questions.length}</div><div style={{ fontSize: 13, color: "#64748b" }}>Score</div></div>
          <div style={{ ...statStyle, background: "#ecfdf5", borderColor: "#bbf7d0", color: "#0f766e" }}><div style={{ fontSize: 28 }}>{accuracy}%</div><div style={{ fontSize: 13, color: "#64748b" }}>Accuracy</div></div>
          <div style={{ ...statStyle, background: "#fff7ed", borderColor: "#fed7aa", color: "#9a3412" }}><div style={{ fontSize: 28 }}>{missedQuestions.length}</div><div style={{ fontSize: 13, color: "#64748b" }}>Missed</div></div>
          <div style={{ ...statStyle, background: "#f5f3ff", borderColor: "#ddd6fe", color: "#6d28d9" }}><div style={{ fontSize: 28 }}>{bestStreak}</div><div style={{ fontSize: 13, color: "#64748b" }}>Best Streak</div></div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <Button onClick={() => setShowMissedReview(true)} style={{ ...buttonBase, background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}>Study Misses</Button>
          <Button onClick={() => shareQuizResult && shareQuizResult(activityName, score, questions.length)} style={{ ...buttonBase, background: "linear-gradient(135deg, #0f766e, #14b8a6)" }}>Share Result</Button>
          <Button onClick={restart} style={{ ...buttonBase, background: "linear-gradient(135deg, #dc2626, #ef4444)" }}>Try Again</Button>
          <Button onClick={() => startMode(mode === "quick" ? "full" : "quick")} style={{ ...buttonBase, background: "linear-gradient(135deg, #12355b, #1d6fa5)" }}>{mode === "quick" ? "Try Full Version" : "Try Quick Version"}</Button>
          <a href="/browse-all-practice.html" style={{ ...buttonBase, background: "linear-gradient(135deg, #334155, #0f172a)", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>Browse All Tools</a>
        </div>
      </Card>
    );
  }

  return (
    <div className="vitals-challenge-shell" style={{ maxWidth: 1120, margin: "0 auto" }}>
      <style>{`
        @media (max-width: 760px) {
          .vitals-challenge-shell { padding: 0 4px; }
        }
      `}</style>
      <QuizHeader
        compact
        title="Vitals Challenge: Normal or Not?"
        subtitle="Spot the most important clue and choose the best answer."
      />

      <QuizModeToggle
        compact
        value={mode}
        onChange={startMode}
        options={[
          { value: "quick", label: "Quick Practice • 5" },
          { value: "full", label: "Full Challenge • 25" }
        ]}
      />

      <QuizSurface compact>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 7,
            flexWrap: "wrap",
            marginBottom: 8
          }}
        >
          <QuizStatPill style={{ minHeight: 32, padding: "5px 10px" }}>
            Question {index + 1}/{questions.length}
          </QuizStatPill>
          <QuizStatPill style={{ minHeight: 32, padding: "5px 10px" }}>
            Score {score}
          </QuizStatPill>
          <QuizStatPill tone="orange" style={{ minHeight: 32, padding: "5px 10px" }}>
            Streak {streak}
          </QuizStatPill>
          <QuizStatPill tone="green" style={{ minHeight: 32, padding: "5px 10px" }}>
            {mode === "quick" ? "Quick Mode" : "Full Mode"}
          </QuizStatPill>
        </div>

        <div
          style={{
            borderRadius: 16,
            padding: "8px 10px",
            background: "linear-gradient(135deg, #f8fbff, #ffffff)",
            border: "1px solid #cfe3f7",
            marginBottom: 8
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 6 }}>
            <span
              style={{
                display: "inline-flex",
                padding: "5px 10px",
                borderRadius: 999,
                background: "#dbeafe",
                color: "#12355b",
                fontSize: 12,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: ".04em"
              }}
            >
              Patient Scenario
            </span>
            <h3 style={{ color: "#12355b", margin: "4px 0 0", fontSize: 18 }}>
              {current.patient}
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, minmax(82px, 1fr))",
              gap: 6,
              overflowX: "auto"
            }}
          >
            {Object.entries(current.vitals).map(([label, value]) => (
              <div
                key={label}
                style={{
                  minWidth: 82,
                  background: "#0f2942",
                  border: "1px solid #254b6d",
                  borderRadius: 10,
                  padding: "6px 5px",
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(15,23,42,0.08)"
                }}
              >
                <div style={{ color: "#9fd7ff", fontSize: 10, textTransform: "uppercase", fontWeight: 900, letterSpacing: ".05em" }}>
                  {label === "spo2" ? "SpO₂" : label}
                </div>
                <div style={{ color: "white", fontWeight: 900, fontSize: 15, lineHeight: 1.15 }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 18, fontWeight: 900, color: "#12355b", marginBottom: 8, textAlign: "center" }}>
          {current.question}
        </div>

        <QuizAnswerGrid>
        {current.options.map((opt, i) => {
          const isCorrectOption = i === current.answer;
          const isSelectedWrong = isAnswered && selected === i && selected !== current.answer;
          return (
            <button
              key={i}
              onClick={() => {
                if (isAnswered) return;
                setAnswers((prev) => ({ ...prev, [index]: i }));
                if (i === current.answer) {
                  setScore((prev) => prev + 1);
                  setStreak((prev) => {
                    const next = prev + 1;
                    setBestStreak((oldBest) => Math.max(oldBest, next));
                    return next;
                  });
                  correctSound.currentTime = 0;
                  correctSound.play();
                } else {
                  setStreak(0);
                  wrongSound.currentTime = 0;
                  wrongSound.play();
                }
              }}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "9px 12px",
                marginBottom: 0,
                minHeight: 46,
                borderRadius: 12,
                border: isAnswered && isCorrectOption
                  ? "2px solid #16a34a"
                  : isSelectedWrong
                    ? "2px solid #dc2626"
                    : "1px solid #cbd5e1",
                background: isAnswered && isCorrectOption
                  ? "#dcfce7"
                  : isSelectedWrong
                    ? "#fee2e2"
                    : "#f8fafc",
                color: "#1e293b",
                fontSize: 13,
                fontWeight: 800,
                cursor: isAnswered ? "default" : "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
              }}
            >
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          );
        })}
        </QuizAnswerGrid>

        {isAnswered && (
          <QuizFeedbackCard tone={selected === current.answer ? "correct" : "incorrect"}>
            <div>{selected === current.answer ? "Correct." : "Not quite."} {current.teaching}</div>
            <div style={{ marginTop: 5, color: "#12355b" }}>Priority clue: {current.priority}</div>
          </QuizFeedbackCard>
        )}

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <button
            onClick={() => {
              if (!isAnswered) return;
              if (index + 1 === questions.length) {
                const finalScore = score;
                trackExamCompletion && trackExamCompletion(activityName, finalScore, questions.length);
                setShowResults(true);
              } else {
                setIndex((prev) => prev + 1);
              }
            }}
            style={{
              ...buttonBase,
              padding: "8px 18px",
              background: "linear-gradient(135deg, #12355b, #1d6fa5)",
              opacity: isAnswered ? 1 : 0.55,
              cursor: isAnswered ? "pointer" : "not-allowed"
            }}
          >
            {index + 1 === questions.length ? "Finish Challenge" : "Next Scenario"}
          </button>
        </div>
      </QuizSurface>
    </div>
  );
}
