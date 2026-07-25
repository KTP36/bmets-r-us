import React, { useMemo, useState } from "react";
import {
  completeModuleOne,
  completeModuleTwo,
  completionPercent,
  getAcademyState,
  getModuleState,
  isModuleUnlocked,
  syncAcademyState,
} from "./medicationAcademyStorage";
import {
  medicationAcademyModules,
  moduleOneBriefing,
  moduleOneLessons,
  moduleOneQuestions,
  moduleOneScenarios,
  moduleOneSources,
  moduleTwoBriefing,
  moduleTwoLessons,
  moduleTwoQuestions,
  moduleTwoScenarios,
  moduleTwoSources,
} from "./medicationAcademyData";
import "./MedicationAcademy.css";

function shuffleQuestion(question) {
  const choices = question.options.map((text, index) => ({
    text,
    correct: index === question.answer,
  }));

  for (let index = choices.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [choices[index], choices[randomIndex]] = [
      choices[randomIndex],
      choices[index],
    ];
  }

  return {
    ...question,
    options: choices.map((choice) => choice.text),
    answer: choices.findIndex((choice) => choice.correct),
  };
}

function KnowledgeCheck({ check, onComplete }) {
  const [selected, setSelected] = useState(null);
  const answered = selected !== null;
  const correct = selected === check.answer;

  return (
    <div className="mma-knowledge-check">
      <div className="mma-check-label">Quick Knowledge Check</div>
      <h3>{check.question}</h3>

      <div className="mma-options compact">
        {check.options.map((option, index) => (
          <button
            key={option}
            className={`mma-option ${
              answered && index === check.answer ? "correct" : ""
            } ${answered && index === selected && !correct ? "wrong" : ""}`}
            disabled={answered}
            onClick={() => {
              setSelected(index);
              onComplete();
            }}
          >
            <strong>{String.fromCharCode(65 + index)}.</strong> {option}
          </button>
        ))}
      </div>

      {answered && (
        <div className="mma-explanation">
          <strong>{correct ? "Correct." : "Review this point."}</strong>
          <span>{check.explanation}</span>
        </div>
      )}
    </div>
  );
}

function ScenarioCard({ scenario, number, onComplete }) {
  const [selected, setSelected] = useState(null);
  const answered = selected !== null;
  const correct = selected === scenario.answer;

  return (
    <article className="mma-scenario-card">
      <span className="mma-pill">Clinical Reasoning {number}</span>
      <h2>{scenario.title}</h2>
      <p className="mma-scenario-patient">{scenario.patient}</p>
      <h3>{scenario.question}</h3>

      <div className="mma-options">
        {scenario.options.map((option, index) => (
          <button
            key={option}
            className={`mma-option ${
              answered && index === scenario.answer ? "correct" : ""
            } ${answered && index === selected && !correct ? "wrong" : ""}`}
            disabled={answered}
            onClick={() => {
              setSelected(index);
              onComplete();
            }}
          >
            <strong>{String.fromCharCode(65 + index)}.</strong> {option}
          </button>
        ))}
      </div>

      {answered && (
        <div className="mma-explanation">
          <strong>{correct ? "Best response." : "Safer response:"}</strong>
          <span>{scenario.explanation}</span>
        </div>
      )}
    </article>
  );
}


function MedicationModuleTwo({ onBack, onComplete }) {
  const questions = useMemo(
    () => moduleTwoQuestions.map(shuffleQuestion),
    []
  );

  const [phase, setPhase] = useState("briefing");
  const [lessonIndex, setLessonIndex] = useState(0);
  const [lessonChecks, setLessonChecks] = useState({});
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [scenarioChecks, setScenarioChecks] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[questionIndex];
  const selected = answers[questionIndex];
  const answered = selected !== undefined;
  const percent = Math.round((score / questions.length) * 100);
  const passed = percent >= 80;

  function chooseAnswer(optionIndex) {
    if (answered) return;

    setAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));

    if (optionIndex === currentQuestion.answer) {
      setScore((previous) => previous + 1);
    }
  }

  function nextQuestion() {
    if (!answered) return;

    if (questionIndex === questions.length - 1) {
      const finalPercent = Math.round((score / questions.length) * 100);
      completeModuleTwo(finalPercent);
      setFinished(true);
      onComplete();
      return;
    }

    setQuestionIndex((previous) => previous + 1);
  }

  function restartQuiz() {
    setQuestionIndex(0);
    setAnswers({});
    setScore(0);
    setFinished(false);
  }

  if (phase === "briefing") {
    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={onBack}>
          ← Back to Academy
        </button>

        <div className="mma-briefing-card">
          <div className="mma-briefing-icon">🧬</div>
          <span className="mma-pill">Mission 2 Briefing</span>
          <h1>{moduleTwoBriefing.title}</h1>
          <p>{moduleTwoBriefing.summary}</p>

          <div className="mma-objectives">
            <h2>By the end of this mission, you should be able to:</h2>
            {moduleTwoBriefing.objectives.map((objective) => (
              <div className="mma-objective" key={objective}>
                <span>✓</span>
                <p>{objective}</p>
              </div>
            ))}
          </div>

          <div className="mma-mission-stats">
            <div><strong>6</strong><span>Lessons</span></div>
            <div><strong>2</strong><span>Scenarios</span></div>
            <div><strong>15</strong><span>Final Questions</span></div>
            <div><strong>175</strong><span>XP</span></div>
          </div>

          <button
            className="mma-primary-button full"
            onClick={() => setPhase("lessons")}
          >
            Begin Mission
          </button>
        </div>
      </section>
    );
  }

  if (phase === "lessons") {
    const lesson = moduleTwoLessons[lessonIndex];
    const checkComplete = Boolean(lessonChecks[lessonIndex]);
    const finalLesson = lessonIndex === moduleTwoLessons.length - 1;

    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={onBack}>
          ← Back to Academy
        </button>

        <div className="mma-module-heading">
          <span className="mma-pill">Mission 2</span>
          <h1>Drug Classes</h1>
          <p>Complete every lesson and knowledge check before moving forward.</p>
        </div>

        <div className="mma-step-progress">
          {moduleTwoLessons.map((item, index) => (
            <div
              key={item.title}
              className={`mma-step ${
                index < lessonIndex || lessonChecks[index] ? "done" : ""
              } ${index === lessonIndex ? "active" : ""}`}
            >
              <span>{index + 1}</span>
              <small>{index < lessonIndex || lessonChecks[index] ? "Done" : "Lesson"}</small>
            </div>
          ))}
        </div>

        <div className="mma-lesson-layout">
          <aside className="mma-lesson-list" aria-label="Module lessons">
            {moduleTwoLessons.map((item, index) => (
              <button
                key={item.title}
                className={`mma-lesson-link ${
                  index === lessonIndex ? "active" : ""
                }`}
                onClick={() => setLessonIndex(index)}
              >
                <span>{item.icon}</span>
                <span>{index + 1}. {item.title}</span>
              </button>
            ))}
          </aside>

          <article className="mma-lesson-card">
            <div className="mma-lesson-icon">{lesson.icon}</div>
            <div className="mma-lesson-counter">
              Lesson {lessonIndex + 1} of {moduleTwoLessons.length}
            </div>
            <h2>{lesson.title}</h2>
            <p>{lesson.body}</p>

            <div className="mma-key-point">
              <strong>Class takeaway</strong>
              <span>{lesson.takeaway}</span>
            </div>

            <KnowledgeCheck
              key={`module2-${lessonIndex}`}
              check={lesson.check}
              onComplete={() =>
                setLessonChecks((previous) => ({
                  ...previous,
                  [lessonIndex]: true,
                }))
              }
            />

            <div className="mma-row">
              <button
                className="mma-secondary-button"
                disabled={lessonIndex === 0}
                onClick={() =>
                  setLessonIndex((previous) => Math.max(0, previous - 1))
                }
              >
                Previous
              </button>

              {finalLesson ? (
                <button
                  className="mma-primary-button"
                  disabled={!checkComplete}
                  onClick={() => setPhase("scenarios")}
                >
                  Continue to Scenarios
                </button>
              ) : (
                <button
                  className="mma-primary-button"
                  disabled={!checkComplete}
                  onClick={() =>
                    setLessonIndex((previous) =>
                      Math.min(moduleTwoLessons.length - 1, previous + 1)
                    )
                  }
                >
                  Next Lesson
                </button>
              )}
            </div>
          </article>
        </div>

        <div className="mma-disclaimer">
          Educational use only. Drug-name patterns are recognition clues, not a
          substitute for the verified medication label, approved prescribing
          information, or organizational policy.
        </div>
      </section>
    );
  }

  if (phase === "scenarios") {
    const scenario = moduleTwoScenarios[scenarioIndex];
    const scenarioComplete = Boolean(scenarioChecks[scenarioIndex]);
    const finalScenario = scenarioIndex === moduleTwoScenarios.length - 1;

    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={() => setPhase("lessons")}>
          ← Review Lessons
        </button>

        <div className="mma-module-heading">
          <span className="mma-pill">Apply What You Learned</span>
          <h1>Drug-Class Scenarios</h1>
          <p>Use class clues and clinical purpose to choose the best answer.</p>
        </div>

        <ScenarioCard
          key={`module2-${scenarioIndex}`}
          scenario={scenario}
          number={scenarioIndex + 1}
          onComplete={() =>
            setScenarioChecks((previous) => ({
              ...previous,
              [scenarioIndex]: true,
            }))
          }
        />

        <div className="mma-row mma-scenario-nav">
          <button
            className="mma-secondary-button"
            disabled={scenarioIndex === 0}
            onClick={() =>
              setScenarioIndex((previous) => Math.max(0, previous - 1))
            }
          >
            Previous Scenario
          </button>

          {finalScenario ? (
            <button
              className="mma-primary-button"
              disabled={!scenarioComplete}
              onClick={() => setPhase("quiz")}
            >
              Start Final Challenge
            </button>
          ) : (
            <button
              className="mma-primary-button"
              disabled={!scenarioComplete}
              onClick={() =>
                setScenarioIndex((previous) =>
                  Math.min(moduleTwoScenarios.length - 1, previous + 1)
                )
              }
            >
              Next Scenario
            </button>
          )}
        </div>
      </section>
    );
  }

  if (finished) {
    return (
      <section className="mma-result-card">
        <div className="mma-result-icon">{passed ? "🏆" : "📘"}</div>
        <span className="mma-pill">
          {passed ? "Mission Complete" : "Keep Building"}
        </span>
        <h1>{passed ? "Drug Class Specialist" : "Review and Try Again"}</h1>
        <div className="mma-score">{percent}%</div>
        <p>You answered {score} of {questions.length} questions correctly.</p>

        {passed ? (
          <>
            <div className="mma-badge-earned">
              <span>🏅</span>
              <div>
                <strong>Badge Unlocked</strong>
                <p>Drug Class Specialist</p>
              </div>
            </div>
            <p className="mma-success">175 XP earned • Mission 3 unlocked</p>
            <button className="mma-primary-button" onClick={onBack}>
              Return to Learning Path
            </button>
          </>
        ) : (
          <div className="mma-row center">
            <button className="mma-secondary-button" onClick={() => setPhase("lessons")}>
              Review Lessons
            </button>
            <button className="mma-primary-button" onClick={restartQuiz}>
              Try Again
            </button>
          </div>
        )}

        <div className="mma-sources">
          <h2>Learning sources</h2>
          {moduleTwoSources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {source.label}
            </a>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mma-quiz-shell">
      <button className="mma-text-button" onClick={() => setPhase("scenarios")}>
        ← Review Scenarios
      </button>

      <div className="mma-quiz-card">
        <div className="mma-quiz-meta">
          <span>Question {questionIndex + 1} of {questions.length}</span>
          <span>Score: {score}</span>
        </div>

        <div className="mma-mini-progress">
          <div style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
        </div>

        <span className="mma-pill">Mission 2 Final Challenge</span>
        <h2>{currentQuestion.question}</h2>

        <div className="mma-options">
          {currentQuestion.options.map((option, optionIndex) => {
            const correct = optionIndex === currentQuestion.answer;
            const wrongSelection =
              answered && optionIndex === selected && !correct;

            return (
              <button
                key={option}
                className={`mma-option ${
                  answered && correct ? "correct" : ""
                } ${wrongSelection ? "wrong" : ""}`}
                onClick={() => chooseAnswer(optionIndex)}
                disabled={answered}
              >
                <strong>{String.fromCharCode(65 + optionIndex)}.</strong>{" "}
                {option}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mma-explanation">
            <strong>{selected === currentQuestion.answer ? "Correct." : "Not quite."}</strong>
            <span>{currentQuestion.explanation}</span>
          </div>
        )}

        <button
          className="mma-primary-button full"
          disabled={!answered}
          onClick={nextQuestion}
        >
          {questionIndex === questions.length - 1
            ? "Finish Challenge"
            : "Next Question"}
        </button>
      </div>
    </section>
  );
}


function MedicationModuleOne({ onBack, onComplete }) {
  const questions = useMemo(
    () => moduleOneQuestions.map(shuffleQuestion),
    []
  );

  const [phase, setPhase] = useState("briefing");
  const [lessonIndex, setLessonIndex] = useState(0);
  const [lessonChecks, setLessonChecks] = useState({});
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [scenarioChecks, setScenarioChecks] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[questionIndex];
  const selected = answers[questionIndex];
  const answered = selected !== undefined;
  const percent = Math.round((score / questions.length) * 100);
  const passed = percent >= 80;

  function chooseAnswer(optionIndex) {
    if (answered) return;

    setAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));

    if (optionIndex === currentQuestion.answer) {
      setScore((previous) => previous + 1);
    }
  }

  function nextQuestion() {
    if (!answered) return;

    if (questionIndex === questions.length - 1) {
      const finalPercent = Math.round((score / questions.length) * 100);
      completeModuleOne(finalPercent);
      setFinished(true);
      onComplete();
      return;
    }

    setQuestionIndex((previous) => previous + 1);
  }

  function restartQuiz() {
    setQuestionIndex(0);
    setAnswers({});
    setScore(0);
    setFinished(false);
  }

  if (phase === "briefing") {
    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={onBack}>
          ← Back to Academy
        </button>

        <div className="mma-briefing-card">
          <div className="mma-briefing-icon">💊</div>
          <span className="mma-pill">Mission 1 Briefing</span>
          <h1>{moduleOneBriefing.title}</h1>
          <p>{moduleOneBriefing.summary}</p>

          <div className="mma-objectives">
            <h2>By the end of this mission, you should be able to:</h2>
            {moduleOneBriefing.objectives.map((objective) => (
              <div className="mma-objective" key={objective}>
                <span>✓</span>
                <p>{objective}</p>
              </div>
            ))}
          </div>

          <div className="mma-mission-stats">
            <div><strong>6</strong><span>Lessons</span></div>
            <div><strong>2</strong><span>Scenarios</span></div>
            <div><strong>15</strong><span>Final Questions</span></div>
            <div><strong>150</strong><span>XP</span></div>
          </div>

          <button
            className="mma-primary-button full"
            onClick={() => setPhase("lessons")}
          >
            Begin Mission
          </button>
        </div>
      </section>
    );
  }

  if (phase === "lessons") {
    const lesson = moduleOneLessons[lessonIndex];
    const checkComplete = Boolean(lessonChecks[lessonIndex]);
    const finalLesson = lessonIndex === moduleOneLessons.length - 1;

    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={onBack}>
          ← Back to Academy
        </button>

        <div className="mma-module-heading">
          <span className="mma-pill">Mission 1</span>
          <h1>Medication Safety Fundamentals</h1>
          <p>
            Complete each lesson and its knowledge check before moving forward.
          </p>
        </div>

        <div className="mma-step-progress">
          {moduleOneLessons.map((item, index) => (
            <div
              key={item.title}
              className={`mma-step ${
                index < lessonIndex || lessonChecks[index] ? "done" : ""
              } ${index === lessonIndex ? "active" : ""}`}
            >
              <span>{index + 1}</span>
              <small>{index < lessonIndex || lessonChecks[index] ? "Done" : "Lesson"}</small>
            </div>
          ))}
        </div>

        <div className="mma-lesson-layout">
          <aside className="mma-lesson-list" aria-label="Module lessons">
            {moduleOneLessons.map((item, index) => (
              <button
                key={item.title}
                className={`mma-lesson-link ${
                  index === lessonIndex ? "active" : ""
                }`}
                onClick={() => setLessonIndex(index)}
              >
                <span>{item.icon}</span>
                <span>{index + 1}. {item.title}</span>
              </button>
            ))}
          </aside>

          <article className="mma-lesson-card">
            <div className="mma-lesson-icon">{lesson.icon}</div>
            <div className="mma-lesson-counter">
              Lesson {lessonIndex + 1} of {moduleOneLessons.length}
            </div>
            <h2>{lesson.title}</h2>
            <p>{lesson.body}</p>

            <div className="mma-key-point">
              <strong>Safety takeaway</strong>
              <span>{lesson.takeaway}</span>
            </div>

            <KnowledgeCheck
              key={lessonIndex}
              check={lesson.check}
              onComplete={() =>
                setLessonChecks((previous) => ({
                  ...previous,
                  [lessonIndex]: true,
                }))
              }
            />

            <div className="mma-row">
              <button
                className="mma-secondary-button"
                disabled={lessonIndex === 0}
                onClick={() =>
                  setLessonIndex((previous) => Math.max(0, previous - 1))
                }
              >
                Previous
              </button>

              {finalLesson ? (
                <button
                  className="mma-primary-button"
                  disabled={!checkComplete}
                  onClick={() => setPhase("scenarios")}
                >
                  Continue to Scenarios
                </button>
              ) : (
                <button
                  className="mma-primary-button"
                  disabled={!checkComplete}
                  onClick={() =>
                    setLessonIndex((previous) =>
                      Math.min(moduleOneLessons.length - 1, previous + 1)
                    )
                  }
                >
                  Next Lesson
                </button>
              )}
            </div>
          </article>
        </div>

        <div className="mma-disclaimer">
          Educational use only. This academy does not replace medication
          policies, licensed clinical judgment, prescribing information, or
          supervision required by your role.
        </div>
      </section>
    );
  }

  if (phase === "scenarios") {
    const scenario = moduleOneScenarios[scenarioIndex];
    const scenarioComplete = Boolean(scenarioChecks[scenarioIndex]);
    const finalScenario = scenarioIndex === moduleOneScenarios.length - 1;

    return (
      <section className="mma-module-shell">
        <button
          className="mma-text-button"
          onClick={() => setPhase("lessons")}
        >
          ← Review Lessons
        </button>

        <div className="mma-module-heading">
          <span className="mma-pill">Apply What You Learned</span>
          <h1>Clinical Safety Scenarios</h1>
          <p>
            Choose the safest response based on the information provided.
          </p>
        </div>

        <ScenarioCard
          key={scenarioIndex}
          scenario={scenario}
          number={scenarioIndex + 1}
          onComplete={() =>
            setScenarioChecks((previous) => ({
              ...previous,
              [scenarioIndex]: true,
            }))
          }
        />

        <div className="mma-row mma-scenario-nav">
          <button
            className="mma-secondary-button"
            disabled={scenarioIndex === 0}
            onClick={() =>
              setScenarioIndex((previous) => Math.max(0, previous - 1))
            }
          >
            Previous Scenario
          </button>

          {finalScenario ? (
            <button
              className="mma-primary-button"
              disabled={!scenarioComplete}
              onClick={() => setPhase("quiz")}
            >
              Start Final Challenge
            </button>
          ) : (
            <button
              className="mma-primary-button"
              disabled={!scenarioComplete}
              onClick={() =>
                setScenarioIndex((previous) =>
                  Math.min(moduleOneScenarios.length - 1, previous + 1)
                )
              }
            >
              Next Scenario
            </button>
          )}
        </div>
      </section>
    );
  }

  if (finished) {
    return (
      <section className="mma-result-card">
        <div className="mma-result-icon">{passed ? "🏆" : "📘"}</div>
        <span className="mma-pill">
          {passed ? "Mission Complete" : "Keep Building"}
        </span>
        <h1>{passed ? "Medication Safety Specialist" : "Review and Try Again"}</h1>
        <div className="mma-score">{percent}%</div>
        <p>
          You answered {score} of {questions.length} questions correctly.
        </p>

        {passed ? (
          <>
            <div className="mma-badge-earned">
              <span>🏅</span>
              <div>
                <strong>Badge Unlocked</strong>
                <p>Medication Safety Specialist</p>
              </div>
            </div>
            <p className="mma-success">
              150 XP earned • Mission 2 unlocked
            </p>
            <button className="mma-primary-button" onClick={onBack}>
              Return to Learning Path
            </button>
          </>
        ) : (
          <div className="mma-row center">
            <button
              className="mma-secondary-button"
              onClick={() => setPhase("lessons")}
            >
              Review Lessons
            </button>
            <button className="mma-primary-button" onClick={restartQuiz}>
              Try Again
            </button>
          </div>
        )}

        <div className="mma-sources">
          <h2>Learning sources</h2>
          {moduleOneSources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {source.label}
            </a>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mma-quiz-shell">
      <button className="mma-text-button" onClick={() => setPhase("scenarios")}>
        ← Review Scenarios
      </button>

      <div className="mma-quiz-card">
        <div className="mma-quiz-meta">
          <span>
            Question {questionIndex + 1} of {questions.length}
          </span>
          <span>Score: {score}</span>
        </div>

        <div className="mma-mini-progress">
          <div
            style={{
              width: `${((questionIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <span className="mma-pill">Final Challenge</span>
        <h2>{currentQuestion.question}</h2>

        <div className="mma-options">
          {currentQuestion.options.map((option, optionIndex) => {
            const correct = optionIndex === currentQuestion.answer;
            const wrongSelection =
              answered && optionIndex === selected && !correct;

            return (
              <button
                key={option}
                className={`mma-option ${
                  answered && correct ? "correct" : ""
                } ${wrongSelection ? "wrong" : ""}`}
                onClick={() => chooseAnswer(optionIndex)}
                disabled={answered}
              >
                <strong>{String.fromCharCode(65 + optionIndex)}.</strong>{" "}
                {option}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mma-explanation">
            <strong>
              {selected === currentQuestion.answer
                ? "Correct."
                : "Not quite."}
            </strong>
            <span>{currentQuestion.explanation}</span>
          </div>
        )}

        <button
          className="mma-primary-button full"
          disabled={!answered}
          onClick={nextQuestion}
        >
          {questionIndex === questions.length - 1
            ? "Finish Challenge"
            : "Next Question"}
        </button>
      </div>
    </section>
  );
}

export default function MedicationAcademy() {
  const [screen, setScreen] = useState("path");
  const [, forceRefresh] = useState(0);

  syncAcademyState();

  const academy = getAcademyState();
  const progress = completionPercent();

  function refreshProgress() {
    syncAcademyState();
    forceRefresh((value) => value + 1);
  }

  if (screen === "module1") {
    return (
      <MedicationModuleOne
        onBack={() => {
          refreshProgress();
          setScreen("path");
        }}
        onComplete={refreshProgress}
      />
    );
  }

  if (screen === "module2") {
    return (
      <MedicationModuleTwo
        onBack={() => {
          refreshProgress();
          setScreen("path");
        }}
        onComplete={refreshProgress}
      />
    );
  }

  return (
    <section className="mma-page">
      <header className="mma-hero">
        <div className="mma-hero-content">
          <span className="mma-eyebrow">MedSkillBuilder Academy</span>
          <h1>Medication Mastery</h1>
          <p>
            Build medication knowledge through recognition, safety principles,
            and clinical reasoning—not memorization alone.
          </p>

          <div className="mma-progress-card">
            <div className="mma-progress-track">
              <div style={{ width: `${progress}%` }} />
            </div>
            <div className="mma-progress-labels">
              <span>{progress}% complete</span>
              <span>{academy.totalXp || 0} XP</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mma-content">
        <div className="mma-intro">
          <div>
            <span className="mma-pill">8 Missions</span>
            <h2>Choose your next mission</h2>
          </div>
          <p>Complete each mission to unlock the next.</p>
        </div>

        <div className="mma-grid">
          {medicationAcademyModules.map((module) => {
            const state = getModuleState(module.number);
            const unlocked = isModuleUnlocked(module.number);
            const complete = Boolean(state.complete || state.passed);
            const available = module.number === 1 || module.number === 2;

            return (
              <article
                key={module.number}
                className={`mma-module-card ${!unlocked ? "locked" : ""}`}
              >
                <div className="mma-card-top">
                  <span className="mma-number">{module.number}</span>
                  <span
                    className={`mma-status ${
                      complete ? "complete" : unlocked ? "open" : "locked"
                    }`}
                  >
                    {complete
                      ? "✓ Complete"
                      : unlocked
                      ? available
                        ? "Ready"
                        : "Coming next"
                      : "🔒 Locked"}
                  </span>
                </div>

                <h3>{module.title}</h3>
                <p>{module.description}</p>
                <div className="mma-badge-line">🏅 {module.badge}</div>

                {module.number === 1 || module.number === 2 ? (
                  <button
                    className="mma-primary-button full"
                    disabled={!unlocked}
                    onClick={() => setScreen(`module${module.number}`)}
                  >
                    {complete ? "Review Mission" : "Start Mission"}
                  </button>
                ) : (
                  <button
                    className="mma-secondary-button full"
                    disabled
                  >
                    {unlocked ? "Coming Soon" : "Locked"}
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
