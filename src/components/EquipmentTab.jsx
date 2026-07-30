import React from "react";
import StudyPaths from "./StudyPaths";
import QuizStatPill from "./ui/QuizStatPill";
import QuizHeader from "./ui/QuizHeader";
import QuizSurface from "./ui/QuizSurface";
import QuizModeToggle from "./ui/QuizModeToggle";

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

function EquipmentTab({
  shuffledEquipmentQuestions,
  equipmentIndex,
  setEquipmentIndex,
  equipmentScore,
  setEquipmentScore,
  equipmentAnswers,
  setEquipmentAnswers,
  equipmentShowResult,
  setEquipmentShowResult,
  showEquipmentMissedReview,
  setShowEquipmentMissedReview,
  equipmentMissedQuestions,
  saveEquipmentProgress,
  restartEquipmentQuiz,
  trackExamCompletion,
  shareQuizResult,
  correctSound,
  wrongSound,
  cbetStatCardStyle,
  equipmentConceptQuestions = []
}) {
  const [equipmentMode, setEquipmentMode] = React.useState("identify");
  const [conceptIndex, setConceptIndex] = React.useState(0);
  const [conceptScore, setConceptScore] = React.useState(0);
  const [conceptAnswers, setConceptAnswers] = React.useState({});
  const [conceptShowResult, setConceptShowResult] = React.useState(false);
  const [showConceptMissedReview, setShowConceptMissedReview] = React.useState(false);

  const equipmentOnlyConceptQuestions = React.useMemo(() => {
    const exclude = /(liver|retina|optic nerve|largest artery|pulse points|portal vein|blood directly to the liver|ultrasound imaging of the liver)/i;

    // Equipment concept questions are written with many correct answers at index 0.
    // Shuffle each question's answer choices here so the correct answer does not
    // keep appearing in the same slot during the Concepts Quiz.
    const filteredQuestions = equipmentConceptQuestions.filter(
      (q) => !exclude.test(`${q.question} ${q.studyTip || ""}`)
    );

    return shuffleQuestionSet(filteredQuestions);
  }, [equipmentConceptQuestions]);

  const conceptMissedQuestions = equipmentOnlyConceptQuestions.filter((q, index) => {
    const selected = conceptAnswers[index];
    return selected !== undefined && selected !== q.answer;
  });

  const restartConceptQuiz = () => {
    setConceptIndex(0);
    setConceptScore(0);
    setConceptAnswers({});
    setConceptShowResult(false);
    setShowConceptMissedReview(false);
  };

  const modeToggle = (
    <QuizModeToggle
      value={equipmentMode}
      onChange={setEquipmentMode}
      options={[
        { value: "identify", label: "Image ID Mode" },
        { value: "concept", label: "Concepts Quiz" }
      ]}
    />
  );

  if (equipmentMode === "identify") {
    if (!equipmentShowResult && !showEquipmentMissedReview) {
      const current = shuffledEquipmentQuestions[equipmentIndex];
      const selected = equipmentAnswers[equipmentIndex];
      const correct = current.answer;
      const isAnswered = selected !== undefined;
      const isCorrectOption = (i) => i === correct;
      const isSelectedWrong = (i) => isAnswered && i === selected && selected !== correct;

      return (
        <div>
          {modeToggle}
          <QuizSurface style={{ maxWidth: 980, margin: "0 auto", padding: "20px clamp(16px, 2.5vw, 24px)" }}>
            <QuizHeader
              compact
              title="Medical Equipment Identification Practice"
              subtitle="Identify each device, then switch to Equipment Concepts Practice to build function and safety knowledge."
              style={{ marginBottom: 6 }}
            />
            <p style={{ color: "#0f766e", margin: "0 0 10px", fontWeight: 700, textAlign: "center" }}>
              Quick practice takes 2 to 5 minutes. Finish to see your score and missed questions.
            </p>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 12
            }}>
              <QuizStatPill>
                Question {equipmentIndex + 1} / {shuffledEquipmentQuestions.length}
              </QuizStatPill>
              <QuizStatPill tone="green">Score: {equipmentScore}</QuizStatPill>
              <QuizStatPill>Questions: {shuffledEquipmentQuestions.length}</QuizStatPill>
            </div>
            <div style={{ color: "#12355b", marginBottom: 12, textAlign: "center" }}>
              {current.image && (
                <img
                  src={current.image}
                  alt="equipment"
                  style={{
                    display: "block",
                    width: "100%",
                    maxWidth: 180,
                    height: "clamp(130px, 22vh, 180px)",
                    objectFit: "contain",
                    margin: "0 auto 8px"
                  }}
                />
              )}
              <div style={{ fontSize: 22, fontWeight: 700 }}>{current.question}</div>
            </div>
            {current.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  if (isAnswered) return;
                  setEquipmentAnswers((prev) => ({ ...prev, [equipmentIndex]: i }));
                  if (i === correct) {
                    setEquipmentScore((prev) => prev + 1);
                    correctSound.currentTime = 0;
                    correctSound.play();
                  } else {
                    wrongSound.currentTime = 0;
                    wrongSound.play();
                  }
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  marginBottom: 8,
                  borderRadius: 12,
                  border:
                    isCorrectOption(i) && isAnswered
                      ? "2px solid green"
                      : isSelectedWrong(i)
                      ? "2px solid red"
                      : "1px solid #cbd5e1",
                  background:
                    isCorrectOption(i) && isAnswered
                      ? "#d9f7d9"
                      : isSelectedWrong(i)
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
            ))}
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <button
                onClick={() => {
                  if (equipmentAnswers[equipmentIndex] === undefined) return;
                  if (equipmentIndex + 1 === shuffledEquipmentQuestions.length) {
                    trackExamCompletion &&
                      trackExamCompletion(
                        shuffledEquipmentQuestions.length === 5
                          ? "Equipment Quick Practice"
                          : "Equipment Practice",
                        equipmentScore,
                        shuffledEquipmentQuestions.length
                      );
                    setEquipmentShowResult(true);
                    saveEquipmentProgress && saveEquipmentProgress();
                  } else {
                    setEquipmentIndex((prev) => prev + 1);
                  }
                }}
                style={{
                  padding: "12px 24px",
                  borderRadius: 999,
                  border: "none",
                  background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                  color: "white",
                  fontWeight: 700,
                  cursor:
                    equipmentAnswers[equipmentIndex] === undefined
                      ? "not-allowed"
                      : "pointer",
                  opacity: equipmentAnswers[equipmentIndex] === undefined ? 0.6 : 1,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                }}
              >
                {equipmentIndex + 1 === shuffledEquipmentQuestions.length
                  ? "Finish Practice"
                  : "Next Question"}
              </button>
            </div>
          </QuizSurface>
        </div>
      );
    }

    if (equipmentShowResult) {
      const equipmentAccuracy =
        shuffledEquipmentQuestions.length > 0
          ? Math.round((equipmentScore / shuffledEquipmentQuestions.length) * 100)
          : 0;
      const equipmentMissedCount = equipmentMissedQuestions
        ? equipmentMissedQuestions.length
        : Math.max(0, shuffledEquipmentQuestions.length - equipmentScore);
      const equipmentPracticeName =
        shuffledEquipmentQuestions.length === 5
          ? "Equipment Quick Practice"
          : "Equipment Practice";

      return (
        <div>
          {modeToggle}
          <div
            style={{
              textAlign: "center",
              maxWidth: 760,
              margin: "0 auto",
              background: "rgba(255,255,255,0.96)",
              borderRadius: 24,
              padding: 28,
              border: "1px solid #dbeafe",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
            }}
          >
            <div
              style={{
                display: "inline-flex",
                padding: "8px 14px",
                borderRadius: 999,
                background: "#ecfeff",
                color: "#0f766e",
                fontWeight: 900,
                marginBottom: 14
              }}
            >
              Biomed Practice Complete
            </div>

            <h2 style={{ color: "#12355b", marginTop: 0, marginBottom: 8 }}>
              {shuffledEquipmentQuestions.length === 5
                ? "Equipment Quick Practice Complete"
                : "Equipment Practice Complete"}
            </h2>

            <p style={{ color: "#475569", marginTop: 0, marginBottom: 20 }}>
              Great job. Review your score, study missed equipment, or keep going with equipment concepts and CBET practice.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
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
                <div style={{ fontSize: 28 }}>
                  {equipmentScore} / {shuffledEquipmentQuestions.length}
                </div>
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
                <div style={{ fontSize: 28 }}>{equipmentAccuracy}%</div>
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
                <div style={{ fontSize: 28 }}>{equipmentMissedCount}</div>
                <div style={{ fontSize: 13, color: "#475569" }}>Missed</div>
              </div>
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
                onClick={() => setShowEquipmentMissedReview(true)}
                style={{
                  padding: "12px 24px",
                  borderRadius: 999,
                  border: "none",
                  background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                  color: "white",
                  fontWeight: 900,
                  cursor: "pointer"
                }}
              >
                Study Misses
              </button>

              <button
                onClick={() =>
                  shareQuizResult &&
                  shareQuizResult(
                    equipmentPracticeName,
                    equipmentScore,
                    shuffledEquipmentQuestions.length
                  )
                }
                style={{
                  padding: "12px 24px",
                  borderRadius: 999,
                  border: "none",
                  background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                  color: "white",
                  fontWeight: 900,
                  cursor: "pointer"
                }}
              >
                Share Result
              </button>

              <button
                onClick={restartEquipmentQuiz}
                style={{
                  padding: "12px 24px",
                  borderRadius: 999,
                  border: "none",
                  background: "linear-gradient(135deg, #dc2626, #ef4444)",
                  color: "white",
                  fontWeight: 900,
                  cursor: "pointer"
                }}
              >
                Try Again
              </button>

              <button
                onClick={() => setEquipmentMode("concept")}
                style={{
                  padding: "12px 24px",
                  borderRadius: 999,
                  border: "none",
                  background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                  color: "white",
                  fontWeight: 900,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(37,99,235,0.18)"
                }}
              >
                Try Equipment Concepts
              </button>

              <a
                href="/?tab=CBET"
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
                CBET Practice
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
                  cursor: "pointer",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(18,53,91,0.18)"
                }}
              >
                Browse All Tools
              </a>
<a
  href="/recommended-study-gear.html"
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 24px",
    borderRadius: 999,
    background: "linear-gradient(135deg, #16a34a, #22c55e)",
    color: "white",
    fontWeight: 900,
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "0 4px 14px rgba(22,163,74,0.18)",
    marginLeft: 12
  }}
>
  Recommended Study Gear
</a>
            </div>
          </div>
        </div>
      );
    }

    if (showEquipmentMissedReview) {
      return (
        <div>
          {modeToggle}
          <div style={{ marginTop: 24 }}>
            <h2 style={{ color: "#12355b", textAlign: "center" }}>
              Equipment Missed Questions Review
            </h2>
            {equipmentMissedQuestions && equipmentMissedQuestions.length === 0 ? (
              <p style={{ textAlign: "center", color: "#1e293b" }}>
                You did not miss any questions.
              </p>
            ) : (
              <ul>
                {equipmentMissedQuestions && equipmentMissedQuestions.map((q, idx) => (
                  <li key={idx} style={{ marginBottom: 16 }}>
                    {q.image && <img src={q.image} alt="equipment" style={{ maxWidth: 120, display: 'block', marginBottom: 8 }} />}
                    <strong>{q.question}</strong>
                    <div>Correct: {q.options[q.answer]}</div>
                    <div>Your answer: {q.options[q.selected]}</div>
                    {q.studyTip && <div className="study-tip">Tip: {q.studyTip}</div>}
                  </li>
                ))}
              </ul>
            )}
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button
                onClick={() => setShowEquipmentMissedReview(false)}
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
                Back to Results
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  const currentConcept = equipmentOnlyConceptQuestions[conceptIndex];
  const conceptSelected = conceptAnswers[conceptIndex];
  const conceptCorrect = currentConcept?.answer;
  const conceptIsAnswered = conceptSelected !== undefined;

  if (!currentConcept && equipmentOnlyConceptQuestions.length === 0) {
    return (
      <div>
        {modeToggle}
        <div style={{ textAlign: "center", color: "#1e293b" }}>
          No equipment concept questions are available yet.

        </div>

        {/* Phase 4 - Study Path Quick Access */}
        <StudyPaths />
      </div>
    );
  }

  if (!conceptShowResult && !showConceptMissedReview) {
    return (
      <div>
        {modeToggle}
        <div style={{
          background: "rgba(255,255,255,0.9)",
          borderRadius: 24,
          padding: 28,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          maxWidth: 980,
          margin: "0 auto"
        }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h2 style={{ color: "#12355b", marginBottom: 8 }}>Medical Equipment Concepts Practice</h2>
            <p style={{ color: "#4f6275", margin: 0 }}>
              Build confidence with function, troubleshooting, and safety concepts after image identification practice.
            </p>
            <p style={{ color: "#0f766e", margin: "8px 0 0", fontWeight: 700 }}>
              Keep going. Your score and missed questions appear at the end.
            </p>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 20
          }}>
            <div style={cbetStatCardStyle}>
              Question {conceptIndex + 1} / {equipmentOnlyConceptQuestions.length}
            </div>
            <div style={cbetStatCardStyle}>Score: {conceptScore}</div>
            <div style={cbetStatCardStyle}>Concepts</div>
          </div>
          <div style={{ color: "#12355b", marginBottom: 18 }}>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{currentConcept.question}</div>
          </div>
          {currentConcept.options.map((opt, i) => {
            const isCorrectOption = i === conceptCorrect;
            const isSelectedWrong = conceptIsAnswered && i === conceptSelected && conceptSelected !== conceptCorrect;
            return (
              <button
                key={i}
                onClick={() => {
                  if (conceptIsAnswered) return;
                  setConceptAnswers((prev) => ({ ...prev, [conceptIndex]: i }));
                  if (i === conceptCorrect) {
                    setConceptScore((prev) => prev + 1);
                    correctSound.currentTime = 0;
                    correctSound.play();
                  } else {
                    wrongSound.currentTime = 0;
                    wrongSound.play();
                  }
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "14px 16px",
                  marginBottom: 12,
                  borderRadius: 12,
                  border:
                    isCorrectOption && conceptIsAnswered
                      ? "2px solid green"
                      : isSelectedWrong
                      ? "2px solid red"
                      : "1px solid #cbd5e1",
                  background:
                    isCorrectOption && conceptIsAnswered
                      ? "#d9f7d9"
                      : isSelectedWrong
                      ? "#fee2e2"
                      : "#f8fafc",
                  color: "#1e293b",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: conceptIsAnswered ? "default" : "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
                }}
              >
                {String.fromCharCode(65 + i)}. {opt}
              </button>
            );
          })}
          {typeof currentConcept.studyTip === "string" && conceptIsAnswered && (
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
              Study tip: {currentConcept.studyTip}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button
              onClick={() => {
                if (conceptAnswers[conceptIndex] === undefined) return;
                if (conceptIndex + 1 === equipmentOnlyConceptQuestions.length) {
                  trackExamCompletion &&
                    trackExamCompletion("Equipment Concepts Practice", conceptScore, equipmentOnlyConceptQuestions.length);
                  setConceptShowResult(true);
                } else {
                  setConceptIndex((prev) => prev + 1);
                }
              }}
              style={{
                padding: "12px 24px",
                borderRadius: 999,
                border: "none",
                background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                color: "white",
                fontWeight: 700,
                cursor:
                  conceptAnswers[conceptIndex] === undefined
                    ? "not-allowed"
                    : "pointer",
                opacity: conceptAnswers[conceptIndex] === undefined ? 0.6 : 1,
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
              }}
            >
              {conceptIndex + 1 === equipmentOnlyConceptQuestions.length ? "Finish Practice" : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (conceptShowResult) {
    const conceptAccuracy =
      equipmentOnlyConceptQuestions.length > 0
        ? Math.round((conceptScore / equipmentOnlyConceptQuestions.length) * 100)
        : 0;
    const conceptMissedCount = conceptMissedQuestions.length;

    return (
      <div>
        {modeToggle}
        <div
          style={{
            textAlign: "center",
            maxWidth: 760,
            margin: "0 auto",
            background: "rgba(255,255,255,0.96)",
            borderRadius: 24,
            padding: 28,
            border: "1px solid #dbeafe",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
          }}
        >
          <div
            style={{
              display: "inline-flex",
              padding: "8px 14px",
              borderRadius: 999,
              background: "#ecfeff",
              color: "#0f766e",
              fontWeight: 900,
              marginBottom: 14
            }}
          >
            Equipment Concepts Complete
          </div>

          <h2 style={{ color: "#12355b", marginTop: 0, marginBottom: 8 }}>
            Medical Equipment Concepts Complete
          </h2>

          <p style={{ color: "#475569", marginTop: 0, marginBottom: 20 }}>
            Great job. Review your score, study missed concepts, or keep building your CBET and biomed knowledge.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
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
              <div style={{ fontSize: 28 }}>
                {conceptScore} / {equipmentOnlyConceptQuestions.length}
              </div>
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
              <div style={{ fontSize: 28 }}>{conceptAccuracy}%</div>
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
              <div style={{ fontSize: 28 }}>{conceptMissedCount}</div>
              <div style={{ fontSize: 13, color: "#475569" }}>Missed</div>
            </div>
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
              onClick={() => setShowConceptMissedReview(true)}
              style={{
                padding: "12px 24px",
                borderRadius: 999,
                border: "none",
                background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                color: "white",
                fontWeight: 900,
                cursor: "pointer"
              }}
            >
              Study Misses
            </button>

            <button
              onClick={() =>
                shareQuizResult &&
                shareQuizResult("Equipment Concepts Practice", conceptScore, equipmentOnlyConceptQuestions.length)
              }
              style={{
                padding: "12px 24px",
                borderRadius: 999,
                border: "none",
                background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                color: "white",
                fontWeight: 900,
                cursor: "pointer"
              }}
            >
              Share Result
            </button>

            <button
              onClick={restartConceptQuiz}
              style={{
                padding: "12px 24px",
                borderRadius: 999,
                border: "none",
                background: "linear-gradient(135deg, #dc2626, #ef4444)",
                color: "white",
                fontWeight: 900,
                cursor: "pointer"
              }}
            >
              Restart Practice
            </button>

            <button
              onClick={() => {
                restartEquipmentQuiz();
                setEquipmentMode("identify");
              }}
              style={{
                padding: "12px 24px",
                borderRadius: 999,
                border: "none",
                background: "linear-gradient(135deg, #0891b2, #06b6d4)",
                color: "white",
                fontWeight: 900,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(8,145,178,0.18)"
              }}
            >
              Try Equipment ID
            </button>

            <a
              href="/?tab=CBET"
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
              CBET Practice
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
      </div>
    );
  }

  if (showConceptMissedReview) {
    return (
      <div>
        {modeToggle}
        <div style={{ marginTop: 24 }}>
          <h2 style={{ color: "#12355b", textAlign: "center" }}>
            Equipment Concepts Missed Questions Review
          </h2>
          {conceptMissedQuestions.length === 0 ? (
            <p style={{ textAlign: "center", color: "#1e293b" }}>
              You did not miss any questions.
            </p>
          ) : (
            <ul>
              {conceptMissedQuestions.map((q, idx) => {
                const selectedIndex = conceptAnswers[equipmentOnlyConceptQuestions.indexOf(q)];
                return (
                  <li key={idx} style={{ marginBottom: 16 }}>
                    <strong>{q.question}</strong>
                    <div>Correct: {q.options[q.answer]}</div>
                    <div>Your answer: {q.options[selectedIndex]}</div>
                    {q.studyTip && <div className="study-tip">Tip: {q.studyTip}</div>}
                  </li>
                );
              })}
            </ul>
          )}
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button
              onClick={() => setShowConceptMissedReview(false)}
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
              Back to Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default EquipmentTab;
