import React, { useEffect, useMemo, useState } from "react";
import {
  completeModuleOne,
  completeModuleTwo,
  completeModuleThree,
  completeModuleFour,
  completeModuleFive,
  completeModuleSix,
  completeModuleSeven,
  completeModuleEight,
  completionPercent,
  getAcademyState,
  getFinalBoardState,
  getModuleState,
  isModuleUnlocked,
  syncAcademyState,
  saveFinalBoardResult,
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
  moduleThreeBriefing,
  moduleThreeLessons,
  moduleThreeQuestions,
  moduleThreeScenarios,
  moduleThreeSources,
  moduleFourBriefing,
  moduleFourLessons,
  moduleFourQuestions,
  moduleFourScenarios,
  moduleFourSources,
  moduleFiveBriefing,
  moduleFiveLessons,
  moduleFiveQuestions,
  moduleFiveScenarios,
  moduleFiveSources,
  moduleSixBriefing,
  moduleSixLessons,
  moduleSixQuestions,
  moduleSixScenarios,
  moduleSixSources,
  moduleSevenBriefing,
  moduleSevenLessons,
  moduleSevenQuestions,
  moduleSevenScenarios,
  moduleSevenSources,
  moduleEightBriefing,
  moduleEightLessons,
  moduleEightQuestions,
  moduleEightScenarios,
  moduleEightSources,
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

            {lesson.pearl && (
              <div className="mma-clinical-pearl">
                <strong>💡 Clinical Pearl</strong>
                <span>{lesson.pearl}</span>
              </div>
            )}

            {lesson.practice && (
              <a className="mma-practice-link" href={lesson.practice.href}>
                🎧 {lesson.practice.label} →
              </a>
            )}

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



function MedicationModuleThree({ onBack, onComplete }) {
  const questions = useMemo(
    () => moduleThreeQuestions.map(shuffleQuestion),
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
      completeModuleThree(finalPercent);
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
          <div className="mma-briefing-icon">❤️</div>
          <span className="mma-pill">Mission 3 Briefing</span>
          <h1>{moduleThreeBriefing.title}</h1>
          <p>{moduleThreeBriefing.summary}</p>

          <div className="mma-objectives">
            <h2>By the end of this mission, you should be able to:</h2>
            {moduleThreeBriefing.objectives.map((objective) => (
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
            <div><strong>200</strong><span>XP</span></div>
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
    const lesson = moduleThreeLessons[lessonIndex];
    const checkComplete = Boolean(lessonChecks[lessonIndex]);
    const finalLesson = lessonIndex === moduleThreeLessons.length - 1;

    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={onBack}>
          ← Back to Academy
        </button>

        <div className="mma-module-heading">
          <span className="mma-pill">Mission 3</span>
          <h1>Cardiovascular Medications</h1>
          <p>Complete every lesson and knowledge check before moving forward.</p>
        </div>

        <div className="mma-step-progress">
          {moduleThreeLessons.map((item, index) => (
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
            {moduleThreeLessons.map((item, index) => (
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
              Lesson {lessonIndex + 1} of {moduleThreeLessons.length}
            </div>
            <h2>{lesson.title}</h2>
            <p>{lesson.body}</p>

            <div className="mma-key-point">
              <strong>Cardiovascular takeaway</strong>
              <span>{lesson.takeaway}</span>
            </div>

            {lesson.pearl && (
              <div className="mma-clinical-pearl">
                <strong>💡 Clinical Pearl</strong>
                <span>{lesson.pearl}</span>
              </div>
            )}

            {lesson.practice && (
              <a className="mma-practice-link" href={lesson.practice.href}>
                🎧 {lesson.practice.label} →
              </a>
            )}

            <KnowledgeCheck
              key={`module3-${lessonIndex}`}
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
                      Math.min(moduleThreeLessons.length - 1, previous + 1)
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
          Educational use only. Cardiovascular medication education does not replace the verified order,
          patient-specific parameters, prescribing information, clinical judgment,
          or organizational policy.
        </div>
      </section>
    );
  }

  if (phase === "scenarios") {
    const scenario = moduleThreeScenarios[scenarioIndex];
    const scenarioComplete = Boolean(scenarioChecks[scenarioIndex]);
    const finalScenario = scenarioIndex === moduleThreeScenarios.length - 1;

    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={() => setPhase("lessons")}>
          ← Review Lessons
        </button>

        <div className="mma-module-heading">
          <span className="mma-pill">Apply What You Learned</span>
          <h1>Cardiovascular Safety Scenarios</h1>
          <p>Use medication purpose, patient findings, and safety principles to choose the best response.</p>
        </div>

        <ScenarioCard
          key={`module3-${scenarioIndex}`}
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
                  Math.min(moduleThreeScenarios.length - 1, previous + 1)
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
        <h1>{passed ? "Cardiovascular Medication Specialist" : "Review and Try Again"}</h1>
        <div className="mma-score">{percent}%</div>
        <p>You answered {score} of {questions.length} questions correctly.</p>

        {passed ? (
          <>
            <div className="mma-badge-earned">
              <span>🏅</span>
              <div>
                <strong>Badge Unlocked</strong>
                <p>Cardiovascular Medication Specialist</p>
              </div>
            </div>
            <p className="mma-success">200 XP earned • Mission 4 unlocked</p>
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
          {moduleThreeSources.map((source) => (
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

        <span className="mma-pill">Mission 3 Final Challenge</span>
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




function MedicationModuleFour({ onBack, onComplete }) {
  const questions = useMemo(
    () => moduleFourQuestions.map(shuffleQuestion),
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
      completeModuleFour(finalPercent);
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
          <div className="mma-briefing-icon">🫁</div>
          <span className="mma-pill">Mission 4 Briefing</span>
          <h1>{moduleFourBriefing.title}</h1>
          <p>{moduleFourBriefing.summary}</p>

          <div className="mma-objectives">
            <h2>By the end of this mission, you should be able to:</h2>
            {moduleFourBriefing.objectives.map((objective) => (
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
            <div><strong>225</strong><span>XP</span></div>
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
    const lesson = moduleFourLessons[lessonIndex];
    const checkComplete = Boolean(lessonChecks[lessonIndex]);
    const finalLesson = lessonIndex === moduleFourLessons.length - 1;

    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={onBack}>
          ← Back to Academy
        </button>

        <div className="mma-module-heading">
          <span className="mma-pill">Mission 4</span>
          <h1>Respiratory Medications</h1>
          <p>Complete every lesson and knowledge check before moving forward.</p>
        </div>

        <div className="mma-step-progress">
          {moduleFourLessons.map((item, index) => (
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
            {moduleFourLessons.map((item, index) => (
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
              Lesson {lessonIndex + 1} of {moduleFourLessons.length}
            </div>
            <h2>{lesson.title}</h2>
            <p>{lesson.body}</p>

            <div className="mma-key-point">
              <strong>Respiratory takeaway</strong>
              <span>{lesson.takeaway}</span>
            </div>

            {lesson.pearl && (
              <div className="mma-clinical-pearl">
                <strong>💡 Clinical Pearl</strong>
                <span>{lesson.pearl}</span>
              </div>
            )}

            {lesson.practice && (
              <a className="mma-practice-link" href={lesson.practice.href}>
                🎧 {lesson.practice.label} →
              </a>
            )}

            <KnowledgeCheck
              key={`module4-${lessonIndex}`}
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
                      Math.min(moduleFourLessons.length - 1, previous + 1)
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
          Educational use only. Respiratory medication education does not replace the verified order,
          patient-specific action plan, prescribing information, clinical assessment,
          emergency response, or organizational policy.
        </div>
      </section>
    );
  }

  if (phase === "scenarios") {
    const scenario = moduleFourScenarios[scenarioIndex];
    const scenarioComplete = Boolean(scenarioChecks[scenarioIndex]);
    const finalScenario = scenarioIndex === moduleFourScenarios.length - 1;

    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={() => setPhase("lessons")}>
          ← Review Lessons
        </button>

        <div className="mma-module-heading">
          <span className="mma-pill">Apply What You Learned</span>
          <h1>Respiratory Medication Scenarios</h1>
          <p>Use respiratory medication purpose, patient findings, device safety, and escalation principles to choose the best response.</p>
        </div>

        <ScenarioCard
          key={`module4-${scenarioIndex}`}
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
                  Math.min(moduleFourScenarios.length - 1, previous + 1)
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
        <h1>{passed ? "Respiratory Medication Specialist" : "Review and Try Again"}</h1>
        <div className="mma-score">{percent}%</div>
        <p>You answered {score} of {questions.length} questions correctly.</p>

        {passed ? (
          <>
            <div className="mma-badge-earned">
              <span>🏅</span>
              <div>
                <strong>Badge Unlocked</strong>
                <p>Respiratory Medication Specialist</p>
              </div>
            </div>
            <p className="mma-success">225 XP earned • Mission 5 unlocked</p>
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
          {moduleFourSources.map((source) => (
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

        <span className="mma-pill">Mission 4 Final Challenge</span>
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




function MedicationModuleFive({ onBack, onComplete }) {
  const questions = useMemo(
    () => moduleFiveQuestions.map(shuffleQuestion),
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
      completeModuleFive(finalPercent);
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
          <span className="mma-pill">Mission 5 Briefing</span>
          <h1>{moduleFiveBriefing.title}</h1>
          <p>{moduleFiveBriefing.summary}</p>

          <div className="mma-objectives">
            <h2>By the end of this mission, you should be able to:</h2>
            {moduleFiveBriefing.objectives.map((objective) => (
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
            <div><strong>250</strong><span>XP</span></div>
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
    const lesson = moduleFiveLessons[lessonIndex];
    const checkComplete = Boolean(lessonChecks[lessonIndex]);
    const finalLesson = lessonIndex === moduleFiveLessons.length - 1;

    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={onBack}>
          ← Back to Academy
        </button>

        <div className="mma-module-heading">
          <span className="mma-pill">Mission 5</span>
          <h1>Endocrine Medications</h1>
          <p>Complete every lesson and knowledge check before moving forward.</p>
        </div>

        <div className="mma-step-progress">
          {moduleFiveLessons.map((item, index) => (
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
            {moduleFiveLessons.map((item, index) => (
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
              Lesson {lessonIndex + 1} of {moduleFiveLessons.length}
            </div>
            <h2>{lesson.title}</h2>
            <p>{lesson.body}</p>

            <div className="mma-key-point">
              <strong>Endocrine takeaway</strong>
              <span>{lesson.takeaway}</span>
            </div>

            {lesson.pearl && (
              <div className="mma-clinical-pearl">
                <strong>💡 Clinical Pearl</strong>
                <span>{lesson.pearl}</span>
              </div>
            )}

            {lesson.practice && (
              <a className="mma-practice-link" href={lesson.practice.href}>
                🎧 {lesson.practice.label} →
              </a>
            )}

            <KnowledgeCheck
              key={`module5-${lessonIndex}`}
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
                      Math.min(moduleFiveLessons.length - 1, previous + 1)
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
          Educational use only. Endocrine medication education does not replace the verified order,
          patient-specific diabetes or hormone plan, prescribing information, laboratory monitoring,
          emergency response, or organizational policy.
        </div>
      </section>
    );
  }

  if (phase === "scenarios") {
    const scenario = moduleFiveScenarios[scenarioIndex];
    const scenarioComplete = Boolean(scenarioChecks[scenarioIndex]);
    const finalScenario = scenarioIndex === moduleFiveScenarios.length - 1;

    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={() => setPhase("lessons")}>
          ← Review Lessons
        </button>

        <div className="mma-module-heading">
          <span className="mma-pill">Apply What You Learned</span>
          <h1>Endocrine Medication Scenarios</h1>
          <p>Use endocrine medication purpose, glucose findings, hormone safety, and escalation principles to choose the best response.</p>
        </div>

        <ScenarioCard
          key={`module5-${scenarioIndex}`}
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
                  Math.min(moduleFiveScenarios.length - 1, previous + 1)
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
        <h1>{passed ? "Endocrine Medication Specialist" : "Review and Try Again"}</h1>
        <div className="mma-score">{percent}%</div>
        <p>You answered {score} of {questions.length} questions correctly.</p>

        {passed ? (
          <>
            <div className="mma-badge-earned">
              <span>🏅</span>
              <div>
                <strong>Badge Unlocked</strong>
                <p>Endocrine Medication Specialist</p>
              </div>
            </div>
            <p className="mma-success">250 XP earned • Mission 6 unlocked</p>
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
          {moduleFiveSources.map((source) => (
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

        <span className="mma-pill">Mission 5 Final Challenge</span>
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




function MedicationModuleSix({ onBack, onComplete }) {
  const questions = useMemo(
    () => moduleSixQuestions.map(shuffleQuestion),
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
      completeModuleSix(finalPercent);
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
          <div className="mma-briefing-icon">🫘</div>
          <span className="mma-pill">Mission 6 Briefing</span>
          <h1>{moduleSixBriefing.title}</h1>
          <p>{moduleSixBriefing.summary}</p>

          <div className="mma-objectives">
            <h2>By the end of this mission, you should be able to:</h2>
            {moduleSixBriefing.objectives.map((objective) => (
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
            <div><strong>275</strong><span>XP</span></div>
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
    const lesson = moduleSixLessons[lessonIndex];
    const checkComplete = Boolean(lessonChecks[lessonIndex]);
    const finalLesson = lessonIndex === moduleSixLessons.length - 1;

    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={onBack}>
          ← Back to Academy
        </button>

        <div className="mma-module-heading">
          <span className="mma-pill">Mission 6</span>
          <h1>Gastrointestinal & Renal Medications</h1>
          <p>Complete every lesson and knowledge check before moving forward.</p>
        </div>

        <div className="mma-step-progress">
          {moduleSixLessons.map((item, index) => (
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
            {moduleSixLessons.map((item, index) => (
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
              Lesson {lessonIndex + 1} of {moduleSixLessons.length}
            </div>
            <h2>{lesson.title}</h2>
            <p>{lesson.body}</p>

            <div className="mma-key-point">
              <strong>GI & renal takeaway</strong>
              <span>{lesson.takeaway}</span>
            </div>

            {lesson.pearl && (
              <div className="mma-clinical-pearl">
                <strong>💡 Clinical Pearl</strong>
                <span>{lesson.pearl}</span>
              </div>
            )}

            {lesson.practice && (
              <a className="mma-practice-link" href={lesson.practice.href}>
                🎧 {lesson.practice.label} →
              </a>
            )}

            <KnowledgeCheck
              key={`module6-${lessonIndex}`}
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
                      Math.min(moduleSixLessons.length - 1, previous + 1)
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
          Educational use only. Gastrointestinal, renal, and electrolyte education does not replace the verified order,
          patient-specific treatment plan, renal dosing guidance, laboratory monitoring, emergency response,
          or organizational policy.
        </div>
      </section>
    );
  }

  if (phase === "scenarios") {
    const scenario = moduleSixScenarios[scenarioIndex];
    const scenarioComplete = Boolean(scenarioChecks[scenarioIndex]);
    const finalScenario = scenarioIndex === moduleSixScenarios.length - 1;

    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={() => setPhase("lessons")}>
          ← Review Lessons
        </button>

        <div className="mma-module-heading">
          <span className="mma-pill">Apply What You Learned</span>
          <h1>Gastrointestinal & Renal Medication Scenarios</h1>
          <p>Use gastrointestinal medication purpose, kidney function, electrolyte findings, and escalation principles to choose the safest response.</p>
        </div>

        <ScenarioCard
          key={`module6-${scenarioIndex}`}
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
                  Math.min(moduleSixScenarios.length - 1, previous + 1)
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
        <h1>{passed ? "Gastrointestinal & Renal Medication Specialist" : "Review and Try Again"}</h1>
        <div className="mma-score">{percent}%</div>
        <p>You answered {score} of {questions.length} questions correctly.</p>

        {passed ? (
          <>
            <div className="mma-badge-earned">
              <span>🏅</span>
              <div>
                <strong>Badge Unlocked</strong>
                <p>Gastrointestinal & Renal Medication Specialist</p>
              </div>
            </div>
            <p className="mma-success">275 XP earned • Mission 7 unlocked</p>
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
          {moduleSixSources.map((source) => (
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

        <span className="mma-pill">Mission 6 Final Challenge</span>
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




function MedicationModuleSeven({ onBack, onComplete }) {
  const questions = useMemo(
    () => moduleSevenQuestions.map(shuffleQuestion),
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
      completeModuleSeven(finalPercent);
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
          <div className="mma-briefing-icon">🦠</div>
          <span className="mma-pill">Mission 7 Briefing</span>
          <h1>{moduleSevenBriefing.title}</h1>
          <p>{moduleSevenBriefing.summary}</p>

          <div className="mma-objectives">
            <h2>By the end of this mission, you should be able to:</h2>
            {moduleSevenBriefing.objectives.map((objective) => (
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
            <div><strong>300</strong><span>XP</span></div>
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
    const lesson = moduleSevenLessons[lessonIndex];
    const checkComplete = Boolean(lessonChecks[lessonIndex]);
    const finalLesson = lessonIndex === moduleSevenLessons.length - 1;

    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={onBack}>
          ← Back to Academy
        </button>

        <div className="mma-module-heading">
          <span className="mma-pill">Mission 7</span>
          <h1>Infectious Disease Medications</h1>
          <p>Complete every lesson and knowledge check before moving forward.</p>
        </div>

        <div className="mma-step-progress">
          {moduleSevenLessons.map((item, index) => (
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
            {moduleSevenLessons.map((item, index) => (
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
              Lesson {lessonIndex + 1} of {moduleSevenLessons.length}
            </div>
            <h2>{lesson.title}</h2>
            <p>{lesson.body}</p>

            <div className="mma-key-point">
              <strong>Infectious disease takeaway</strong>
              <span>{lesson.takeaway}</span>
            </div>

            {lesson.pearl && (
              <div className="mma-clinical-pearl">
                <strong>💡 Clinical Pearl</strong>
                <span>{lesson.pearl}</span>
              </div>
            )}

            {lesson.practice && (
              <a className="mma-practice-link" href={lesson.practice.href}>
                🎧 {lesson.practice.label} →
              </a>
            )}

            <KnowledgeCheck
              key={`module7-${lessonIndex}`}
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
                      Math.min(moduleSevenLessons.length - 1, previous + 1)
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
          Educational use only. Infectious disease medication education does not replace the verified order,
          culture and susceptibility review, patient-specific treatment plan, allergy assessment, laboratory monitoring,
          infection-control precautions, emergency response, or organizational policy.
        </div>
      </section>
    );
  }

  if (phase === "scenarios") {
    const scenario = moduleSevenScenarios[scenarioIndex];
    const scenarioComplete = Boolean(scenarioChecks[scenarioIndex]);
    const finalScenario = scenarioIndex === moduleSevenScenarios.length - 1;

    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={() => setPhase("lessons")}>
          ← Review Lessons
        </button>

        <div className="mma-module-heading">
          <span className="mma-pill">Apply What You Learned</span>
          <h1>Infectious Disease Medication Scenarios</h1>
          <p>Use organism type, antimicrobial purpose, allergy findings, culture information, and escalation principles to choose the safest response.</p>
        </div>

        <ScenarioCard
          key={`module7-${scenarioIndex}`}
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
                  Math.min(moduleSevenScenarios.length - 1, previous + 1)
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
        <h1>{passed ? "Infectious Disease Medication Specialist" : "Review and Try Again"}</h1>
        <div className="mma-score">{percent}%</div>
        <p>You answered {score} of {questions.length} questions correctly.</p>

        {passed ? (
          <>
            <div className="mma-badge-earned">
              <span>🏅</span>
              <div>
                <strong>Badge Unlocked</strong>
                <p>Infectious Disease Medication Specialist</p>
              </div>
            </div>
            <p className="mma-success">300 XP earned • Mission 8 unlocked</p>
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
          {moduleSevenSources.map((source) => (
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

        <span className="mma-pill">Mission 7 Final Challenge</span>
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




function MedicationModuleEight({ onBack, onComplete }) {
  const questions = useMemo(
    () => moduleEightQuestions.map(shuffleQuestion),
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
      completeModuleEight(finalPercent);
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
          <div className="mma-briefing-icon">🚨</div>
          <span className="mma-pill">Mission 8 Briefing</span>
          <h1>{moduleEightBriefing.title}</h1>
          <p>{moduleEightBriefing.summary}</p>

          <div className="mma-objectives">
            <h2>By the end of this mission, you should be able to:</h2>
            {moduleEightBriefing.objectives.map((objective) => (
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
            <div><strong>350</strong><span>XP</span></div>
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
    const lesson = moduleEightLessons[lessonIndex];
    const checkComplete = Boolean(lessonChecks[lessonIndex]);
    const finalLesson = lessonIndex === moduleEightLessons.length - 1;

    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={onBack}>
          ← Back to Academy
        </button>

        <div className="mma-module-heading">
          <span className="mma-pill">Mission 8</span>
          <h1>Emergency & High-Alert Medications</h1>
          <p>Complete every lesson and knowledge check before moving forward.</p>
        </div>

        <div className="mma-step-progress">
          {moduleEightLessons.map((item, index) => (
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
            {moduleEightLessons.map((item, index) => (
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
              Lesson {lessonIndex + 1} of {moduleEightLessons.length}
            </div>
            <h2>{lesson.title}</h2>
            <p>{lesson.body}</p>

            <div className="mma-key-point">
              <strong>Emergency and high-alert takeaway</strong>
              <span>{lesson.takeaway}</span>
            </div>

            {lesson.pearl && (
              <div className="mma-clinical-pearl">
                <strong>💡 Clinical Pearl</strong>
                <span>{lesson.pearl}</span>
              </div>
            )}

            {lesson.practice && (
              <a className="mma-practice-link" href={lesson.practice.href}>
                🎧 {lesson.practice.label} →
              </a>
            )}

            <KnowledgeCheck
              key={`module8-${lessonIndex}`}
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
                      Math.min(moduleEightLessons.length - 1, previous + 1)
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
          Educational use only. Emergency and high-alert medication education does not replace the verified order,
          patient-specific emergency protocol, independent double-checks, infusion safeguards, continuous monitoring,
          emergency response, or organizational policy.
        </div>
      </section>
    );
  }

  if (phase === "scenarios") {
    const scenario = moduleEightScenarios[scenarioIndex];
    const scenarioComplete = Boolean(scenarioChecks[scenarioIndex]);
    const finalScenario = scenarioIndex === moduleEightScenarios.length - 1;

    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={() => setPhase("lessons")}>
          ← Review Lessons
        </button>

        <div className="mma-module-heading">
          <span className="mma-pill">Apply What You Learned</span>
          <h1>Emergency & High-Alert Medication Scenarios</h1>
          <p>Use indication, concentration, route, monitoring, reversal strategy, and escalation principles to choose the safest response.</p>
        </div>

        <ScenarioCard
          key={`module8-${scenarioIndex}`}
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
                  Math.min(moduleEightScenarios.length - 1, previous + 1)
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
        <h1>{passed ? "Emergency & High-Alert Medication Specialist" : "Review and Try Again"}</h1>
        <div className="mma-score">{percent}%</div>
        <p>You answered {score} of {questions.length} questions correctly.</p>

        {passed ? (
          <>
            <div className="mma-badge-earned">
              <span>🏅</span>
              <div>
                <strong>Badge Unlocked</strong>
                <p>Emergency & High-Alert Medication Specialist</p>
              </div>
            </div>
            <p className="mma-success">350 XP earned • All 8 missions complete</p>
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
          {moduleEightSources.map((source) => (
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

        <span className="mma-pill">Mission 8 Final Challenge</span>
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

            {lesson.pearl && (
              <div className="mma-clinical-pearl">
                <strong>💡 Clinical Pearl</strong>
                <span>{lesson.pearl}</span>
              </div>
            )}

            {lesson.practice && (
              <a className="mma-practice-link" href={lesson.practice.href}>
                🎧 {lesson.practice.label} →
              </a>
            )}

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



function formatExamTime(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds);
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function buildFinalBoardQuestions() {
  const groups = [
    ["Medication Safety", moduleOneQuestions],
    ["Drug Classes", moduleTwoQuestions],
    ["Cardiovascular", moduleThreeQuestions],
    ["Respiratory", moduleFourQuestions],
    ["Endocrine", moduleFiveQuestions],
    ["GI & Renal", moduleSixQuestions],
    ["Infectious Disease", moduleSevenQuestions],
    ["Emergency & High Alert", moduleEightQuestions],
  ];

  const pool = groups.flatMap(([category, questions]) =>
    questions.map((question, index) => ({
      ...shuffleQuestion(question),
      category,
      boardId: `${category}-${index}`,
    }))
  );

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[randomIndex]] = [pool[randomIndex], pool[index]];
  }

  return pool.slice(0, Math.min(75, pool.length));
}

function MedicationFinalBoard({ onBack, onComplete }) {
  const questions = useMemo(buildFinalBoardQuestions, []);
  const [phase, setPhase] = useState("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [secondsRemaining, setSecondsRemaining] = useState(120 * 60);
  const [result, setResult] = useState(null);
  const [learnerName, setLearnerName] = useState("");

  const currentQuestion = questions[questionIndex];
  const answeredCount = Object.keys(answers).length;
  const currentAnswer = answers[questionIndex];

  useEffect(() => {
    if (phase !== "exam") return undefined;
    const timer = window.setInterval(() => {
      setSecondsRemaining((previous) => {
        if (previous <= 1) {
          window.clearInterval(timer);
          window.setTimeout(() => finishExam(true), 0);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase, answers]);

  function calculateResult() {
    let correct = 0;
    const categories = {};

    questions.forEach((question, index) => {
      if (!categories[question.category]) {
        categories[question.category] = { correct: 0, total: 0 };
      }
      categories[question.category].total += 1;
      if (answers[index] === question.answer) {
        correct += 1;
        categories[question.category].correct += 1;
      }
    });

    const percent = Math.round((correct / questions.length) * 100);
    return {
      correct,
      total: questions.length,
      percent,
      passed: percent >= 85,
      categories,
      secondsUsed: 120 * 60 - secondsRemaining,
      completedAt: new Date().toISOString(),
    };
  }

  function finishExam(forced = false) {
    if (!forced && answeredCount < questions.length) {
      const unanswered = questions.length - answeredCount;
      const proceed = window.confirm(
        `You still have ${unanswered} unanswered question${unanswered === 1 ? "" : "s"}. Submit anyway?`
      );
      if (!proceed) return;
    }

    const finalResult = calculateResult();
    setResult(finalResult);
    saveFinalBoardResult(finalResult);
    setPhase("results");
    onComplete();
  }

  function restartExam() {
    setQuestionIndex(0);
    setAnswers({});
    setFlagged({});
    setSecondsRemaining(120 * 60);
    setResult(null);
    setPhase("intro");
  }

  if (phase === "intro") {
    return (
      <section className="mma-module-shell">
        <button className="mma-text-button" onClick={onBack}>← Back to Academy</button>
        <div className="mma-board-intro">
          <div className="mma-board-emblem">🏆</div>
          <span className="mma-pill">Academy Graduation Challenge</span>
          <h1>Medication Mastery Final Board Challenge</h1>
          <p>
            Complete a comprehensive 75-question review covering all eight missions.
            You may skip questions, flag them, and return before submitting.
          </p>
          <div className="mma-mission-stats">
            <div><strong>75</strong><span>Questions</span></div>
            <div><strong>120</strong><span>Minutes</span></div>
            <div><strong>85%</strong><span>Passing Score</span></div>
            <div><strong>500</strong><span>Bonus XP</span></div>
          </div>
          <div className="mma-board-notice">
            <strong>Before you begin</strong>
            <span>This is a MedSkillBuilder educational challenge, not a licensing, certification, or continuing-education examination.</span>
          </div>
          <button className="mma-primary-button full" onClick={() => setPhase("exam")}>Begin Final Challenge</button>
        </div>
      </section>
    );
  }

  if (phase === "exam") {
    return (
      <section className="mma-board-shell">
        <header className="mma-board-header">
          <div>
            <span className="mma-pill">Final Board Challenge</span>
            <h1>Question {questionIndex + 1} of {questions.length}</h1>
          </div>
          <div className={`mma-board-timer ${secondsRemaining <= 600 ? "urgent" : ""}`}>
            <span>Time Remaining</span>
            <strong>{formatExamTime(secondsRemaining)}</strong>
          </div>
        </header>

        <div className="mma-board-progress">
          <div style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
        </div>
        <div className="mma-board-progress-labels">
          <span>{answeredCount} answered</span>
          <span>{Object.values(flagged).filter(Boolean).length} flagged</span>
        </div>

        <div className="mma-board-layout">
          <aside className="mma-question-navigator" aria-label="Question navigator">
            <h2>Questions</h2>
            <div className="mma-question-grid">
              {questions.map((question, index) => (
                <button
                  key={question.boardId}
                  className={`${index === questionIndex ? "active" : ""} ${answers[index] !== undefined ? "answered" : ""} ${flagged[index] ? "flagged" : ""}`}
                  onClick={() => setQuestionIndex(index)}
                  aria-label={`Question ${index + 1}${flagged[index] ? ", flagged" : ""}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="mma-nav-legend">
              <span><i className="answered" /> Answered</span>
              <span><i className="flagged" /> Flagged</span>
            </div>
          </aside>

          <article className="mma-board-question-card">
            <div className="mma-board-question-meta">
              <span>{currentQuestion.category}</span>
              <button
                className={`mma-flag-button ${flagged[questionIndex] ? "active" : ""}`}
                onClick={() => setFlagged((previous) => ({ ...previous, [questionIndex]: !previous[questionIndex] }))}
              >
                {flagged[questionIndex] ? "★ Flagged" : "☆ Flag for Review"}
              </button>
            </div>
            <h2>{currentQuestion.question}</h2>
            <div className="mma-options board-options">
              {currentQuestion.options.map((option, optionIndex) => (
                <button
                  key={option}
                  className={`mma-option ${currentAnswer === optionIndex ? "selected" : ""}`}
                  onClick={() => setAnswers((previous) => ({ ...previous, [questionIndex]: optionIndex }))}
                >
                  <strong>{String.fromCharCode(65 + optionIndex)}.</strong> {option}
                </button>
              ))}
            </div>
            <div className="mma-board-actions">
              <button className="mma-secondary-button" disabled={questionIndex === 0} onClick={() => setQuestionIndex((value) => Math.max(0, value - 1))}>Previous</button>
              <button className="mma-secondary-button" onClick={() => setQuestionIndex((value) => Math.min(questions.length - 1, value + 1))}>{currentAnswer === undefined ? "Skip for Now" : "Next Question"}</button>
              <button className="mma-primary-button" onClick={() => finishExam(false)}>Submit Exam</button>
            </div>
          </article>
        </div>
      </section>
    );
  }

  if (phase === "certificate" && result?.passed) {
    const completionDate = new Date(result.completedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    return (
      <section className="mma-certificate-page">
        <div className="mma-no-print mma-certificate-toolbar">
          <button className="mma-text-button" onClick={() => setPhase("results")}>← Back to Results</button>
          <div className="mma-row">
            <button className="mma-secondary-button" onClick={() => window.print()}>Print / Save as PDF</button>
            <button className="mma-primary-button" onClick={onBack}>Return to Academy</button>
          </div>
        </div>

        <div className="mma-certificate" id="medication-mastery-certificate">
          <div className="mma-certificate-watermark">🦊</div>
          <div className="mma-certificate-border">
            <div className="mma-certificate-brand">MedSkillBuilder</div>
            <div className="mma-certificate-kicker">Certificate of Completion</div>
            <p className="mma-certificate-presented">Presented to</p>
            <h1>{learnerName.trim()}</h1>
            <div className="mma-certificate-rule" />
            <p className="mma-certificate-copy">For successfully completing all eight learning missions in the</p>
            <h2>Medication Mastery Academy</h2>
            <p className="mma-certificate-copy">and earning a passing score on the Final Board Challenge.</p>
            <div className="mma-certificate-details">
              <div><span>Completion Date</span><strong>{completionDate}</strong></div>
              <div><span>Final Score</span><strong>{result.percent}%</strong></div>
            </div>
            <div className="mma-certificate-footer">
              <div className="mma-signature"><strong>Kevin Pugh</strong><span>Founder, MedSkillBuilder</span></div>
              <div className="mma-graduate-seal"><span>MEDSKILLBUILDER</span><strong>GRADUATE</strong><small>Educational Achievement</small></div>
            </div>
            <p className="mma-certificate-disclaimer">This certificate recognizes completion of MedSkillBuilder educational content. It is not a professional certification, license, academic degree, or continuing education credit.</p>
          </div>
        </div>
        <p className="mma-no-print mma-screenshot-note">You can take a screenshot now, or use <strong>Print / Save as PDF</strong> to keep a clean copy.</p>
      </section>
    );
  }

  return (
    <section className="mma-result-card mma-board-results">
      <div className="mma-result-icon">{result.passed ? "🎉" : "📘"}</div>
      <span className="mma-pill">Final Board Challenge</span>
      <h1>{result.passed ? "Medication Mastery Academy Complete" : "Keep Building Your Mastery"}</h1>
      <div className="mma-score">{result.percent}%</div>
      <p>You answered {result.correct} of {result.total} questions correctly in {formatExamTime(result.secondsUsed)}.</p>
      <div className={`mma-board-outcome ${result.passed ? "passed" : "review"}`}>
        <strong>{result.passed ? "Passed — 500 bonus XP earned" : "85% is required to pass"}</strong>
        <span>{result.passed ? "Your Medication Mastery Graduate trophy has been saved in this browser." : "Review your category results and try again when ready."}</span>
      </div>

      <div className="mma-category-results">
        <h2>Performance by Category</h2>
        {Object.entries(result.categories).map(([category, values]) => {
          const categoryPercent = Math.round((values.correct / values.total) * 100);
          return (
            <div className="mma-category-row" key={category}>
              <span>{category}</span>
              <div className="mma-category-bar"><i style={{ width: `${categoryPercent}%` }} /></div>
              <strong>{categoryPercent}%</strong>
            </div>
          );
        })}
      </div>

      {result.passed ? (
        <div className="mma-certificate-claim">
          <h2>Create Your Certificate of Completion</h2>
          <p>No email or account is required. Enter the name you want displayed.</p>
          <label htmlFor="mma-learner-name">Name for certificate</label>
          <input id="mma-learner-name" value={learnerName} onChange={(event) => setLearnerName(event.target.value)} placeholder="Enter your name" maxLength={60} />
          <button className="mma-primary-button full" disabled={!learnerName.trim()} onClick={() => setPhase("certificate")}>View My Certificate</button>
          <small>Educational achievement only—not a professional credential or continuing education credit.</small>
        </div>
      ) : (
        <div className="mma-row center">
          <button className="mma-secondary-button" onClick={onBack}>Return to Academy</button>
          <button className="mma-primary-button" onClick={restartExam}>Try Final Challenge Again</button>
        </div>
      )}
    </section>
  );
}

export default function MedicationAcademy() {
  const [screen, setScreen] = useState("path");
  const [, forceRefresh] = useState(0);

  syncAcademyState();

  const academy = getAcademyState();
  const progress = completionPercent();
  const finalBoard = getFinalBoardState();

  function refreshProgress() {
    syncAcademyState();
    forceRefresh((value) => value + 1);
  }

  useEffect(() => {
    if (screen !== "path" || typeof window === "undefined") return undefined;

    const previousScrollRestoration =
      "scrollRestoration" in window.history
        ? window.history.scrollRestoration
        : null;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToAcademyTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
      });
    };

    // Repeat briefly so browser scroll restoration, route effects, fonts,
    // and late layout shifts cannot pull the Academy back down the page.
    const timers = [0, 80, 200, 450, 800, 1200].map((delay) =>
      window.setTimeout(scrollToAcademyTop, delay)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));

      if (
        previousScrollRestoration !== null &&
        "scrollRestoration" in window.history
      ) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, [screen]);

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

  if (screen === "module3") {
    return (
      <MedicationModuleThree
        onBack={() => {
          refreshProgress();
          setScreen("path");
        }}
        onComplete={refreshProgress}
      />
    );
  }

  if (screen === "module4") {
    return (
      <MedicationModuleFour
        onBack={() => {
          refreshProgress();
          setScreen("path");
        }}
        onComplete={refreshProgress}
      />
    );
  }

  if (screen === "module5") {
    return (
      <MedicationModuleFive
        onBack={() => {
          refreshProgress();
          setScreen("path");
        }}
        onComplete={refreshProgress}
      />
    );
  }

  if (screen === "module6") {
    return (
      <MedicationModuleSix
        onBack={() => {
          refreshProgress();
          setScreen("path");
        }}
        onComplete={refreshProgress}
      />
    );
  }

  if (screen === "module7") {
    return (
      <MedicationModuleSeven
        onBack={() => {
          refreshProgress();
          setScreen("path");
        }}
        onComplete={refreshProgress}
      />
    );
  }

  if (screen === "module8") {
    return (
      <MedicationModuleEight
        onBack={() => {
          refreshProgress();
          setScreen("path");
        }}
        onComplete={refreshProgress}
      />
    );
  }

  if (screen === "finalBoard") {
    return (
      <MedicationFinalBoard
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
            const available = module.number >= 1 && module.number <= 8;

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

                {module.number >= 1 && module.number <= 8 ? (
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

        <section className={`mma-final-card ${academy.academyComplete ? "unlocked" : "locked"}`}>
          <div className="mma-final-card-icon">🏆</div>
          <div className="mma-final-card-copy">
            <span className="mma-pill">Graduation Challenge</span>
            <h2>Medication Mastery Final Board Challenge</h2>
            <p>75 randomized questions • 120 minutes • 85% required to pass</p>
            {finalBoard.passed && (
              <div className="mma-final-passed">✓ Passed with {finalBoard.bestScore}% • Medication Mastery Graduate</div>
            )}
          </div>
          <button
            className="mma-primary-button"
            disabled={!academy.academyComplete}
            onClick={() => setScreen("finalBoard")}
          >
            {!academy.academyComplete ? "Complete All 8 Missions" : finalBoard.passed ? "Review Final Challenge" : "Begin Final Challenge"}
          </button>
        </section>

      </div>
    </section>
  );
}
