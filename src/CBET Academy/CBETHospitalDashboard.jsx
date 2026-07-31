import React, { useMemo, useState } from "react";
import "./CBETHospitalDashboard.css";

const SERVICE_CALLS = [
  {
    id: "WO-1001",
    title: "Silent Breath",
    difficulty: "Intermediate",
    department: "Operating Room 4",
    equipment: "PMT AeroVent A900",
    reason: "PEEP HIGH / BLOCKAGE",
    detail: "Pressure does not release normally during pre-use checkout.",
  },
  {
    id: "WO-1048",
    title: "Missing Beat",
    difficulty: "Beginner",
    department: "Emergency Department",
    equipment: "Guardian Bedside Monitor",
    reason: "No ECG waveform",
    detail: "SpO₂ and NIBP remain available after the patient was moved.",
  },
  {
    id: "WO-1052",
    title: "Pressure Lost",
    difficulty: "Beginner",
    department: "Intensive Care Unit",
    equipment: "Guardian Bedside Monitor",
    reason: "NIBP leak error",
    detail: "The cuff inflates briefly, then the measurement stops.",
  },
  {
    id: "WO-1061",
    title: "The Hidden Leak",
    difficulty: "Intermediate",
    department: "Operating Room",
    equipment: "AeroVent Anesthesia Ventilator",
    reason: "Low-pressure leak test failure",
    detail: "A low-pressure alarm appears during pre-use testing.",
  },
  {
    id: "WO-1073",
    title: "The Blocked Line",
    difficulty: "Intermediate",
    department: "NICU",
    equipment: "NeoFlow Syringe Pump",
    reason: "Downstream occlusion",
    detail: "The pump alarms immediately after setup.",
  },
  {
    id: "WO-1080",
    title: "No Probe Found",
    difficulty: "Beginner",
    department: "Imaging",
    equipment: "Portable Ultrasound System",
    reason: "Transducer not detected",
    detail: "The system powers on but cannot recognize the selected probe.",
  },
];

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];
const TOTAL_PLANNED_CALLS = 25;
const SERVICE_CALL_ORDER = SERVICE_CALLS.map((call) => call.id);

function getNextIncompleteCall(completedSet, afterId = "") {
  const startIndex = Math.max(-1, SERVICE_CALL_ORDER.indexOf(afterId));
  const orderedIds = [
    ...SERVICE_CALL_ORDER.slice(startIndex + 1),
    ...SERVICE_CALL_ORDER.slice(0, startIndex + 1),
  ];
  const nextId = orderedIds.find((id) => !completedSet.has(id));
  return SERVICE_CALLS.find((call) => call.id === nextId) || null;
}

function readCompletedCalls() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem("cbetCompletedServiceCalls") || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readActiveCall() {
  try {
    return (
      window.localStorage.getItem("cbetActiveServiceCall") ||
      window.localStorage.getItem("cbetActiveWorkOrder") ||
      "WO-1001"
    );
  } catch {
    return "WO-1001";
  }
}

function difficultyClass(difficulty) {
  return `difficulty-${difficulty.toLowerCase()}`;
}

export default function CBETHospitalDashboard({
  xp = 0,
  progress = 0,
  badges = 0,
  streak = 1,
  onOpenTraining,
  onOpenLab,
  onOpenMission,
  onOpenStats,
}) {
  const [activeCallId, setActiveCallId] = useState(readActiveCall);
  const [completedCalls] = useState(readCompletedCalls);
  const [openDifficulty, setOpenDifficulty] = useState("");

  const completedSet = useMemo(() => new Set(completedCalls), [completedCalls]);
  const activeCall = getNextIncompleteCall(completedSet) || SERVICE_CALLS[0];
  const recommendedCall =
    getNextIncompleteCall(new Set([...completedSet, activeCall.id]), activeCall.id) || activeCall;

  const launchCall = (id) => {
    setActiveCallId(id);
    try {
      window.localStorage.setItem("cbetActiveServiceCall", id);
    } catch {
      // Local progress storage is optional.
    }
    onOpenMission(id);
  };

  const completedCount = completedSet.size;
  const serviceProgress = Math.min(100, (completedCount / TOTAL_PLANNED_CALLS) * 100);

  return (
    <main className="academy-home" id="cbet-hospital-map">
      <header className="academy-topbar">
        <div className="academy-brand">
          <span className="academy-brand-mark">MSB</span>
          <div>
            <strong>MedSkillBuilder</strong>
            <small>Clinical Engineering Academy</small>
          </div>
        </div>
        <div className="academy-top-actions">
          <button type="button" onClick={onOpenStats}>Statistics</button>
          <button type="button" onClick={onOpenTraining}>Learning modules</button>
        </div>
      </header>

      <section className="academy-shell">
        <section className="academy-intro">
          <span className="academy-eyebrow">Clinical Engineering Academy</span>
          <h1>Learn by solving realistic service calls.</h1>
          <p>Work through one focused equipment problem at a time. Investigate, identify the cause, verify the solution, and document what you learned.</p>
        </section>

        <section className="academy-progress-card" aria-label="Career progress">
          <div className="academy-progress-heading">
            <div>
              <span className="academy-eyebrow">Career progress</span>
              <strong>{completedCount} of {TOTAL_PLANNED_CALLS} service calls completed</strong>
            </div>
            <button type="button" className="academy-text-button" onClick={onOpenStats}>View achievements</button>
          </div>
          <div className="academy-progress-track" aria-hidden="true">
            <i style={{ width: `${serviceProgress}%` }} />
          </div>
          <div className="academy-progress-meta">
            <span>{xp.toLocaleString()} XP</span>
            <span>{badges} badges</span>
            <span>{streak} day streak</span>
            <span>{progress}% academy completion</span>
          </div>
        </section>

        <section className="academy-focus-grid">
          <article className="academy-call-card academy-call-primary">
            <span className="academy-card-label">Continue learning</span>
            <div className="academy-call-heading">
              <div>
                <span className={`academy-difficulty ${difficultyClass(activeCall.difficulty)}`}>{activeCall.difficulty}</span>
                <h2>{activeCall.title}</h2>
              </div>
              <span className="academy-call-icon" aria-hidden="true">🔧</span>
            </div>
            <dl>
              <div><dt>Equipment</dt><dd>{activeCall.equipment}</dd></div>
              <div><dt>Department</dt><dd>{activeCall.department}</dd></div>
              <div><dt>Reason for service</dt><dd>{activeCall.reason}</dd></div>
            </dl>
            <p>{activeCall.detail}</p>
            <button type="button" className="academy-primary-button" onClick={() => launchCall(activeCall.id)}>
              Continue service call
            </button>
          </article>

          <article className="academy-call-card academy-recommended-card">
            <span className="academy-card-label">Recommended next</span>
            <div className="academy-call-heading">
              <div>
                <span className={`academy-difficulty ${difficultyClass(recommendedCall.difficulty)}`}>{recommendedCall.difficulty}</span>
                <h2>{recommendedCall.title}</h2>
              </div>
              <span className="academy-call-icon" aria-hidden="true">★</span>
            </div>
            <strong className="academy-reason">{recommendedCall.reason}</strong>
            <span className="academy-equipment">{recommendedCall.equipment} · {recommendedCall.department}</span>
            <p>{recommendedCall.detail}</p>
            <button type="button" onClick={() => launchCall(recommendedCall.id)}>Start recommended call</button>
          </article>
        </section>

        <section className="academy-library">
          <div className="academy-section-heading">
            <div>
              <span className="academy-eyebrow">Optional browsing</span>
              <h2>Service Call Library</h2>
              <p>Open only the difficulty group you want to explore.</p>
            </div>
            <button type="button" onClick={onOpenLab}>Equipment lab</button>
          </div>

          <div className="academy-library-groups">
            {DIFFICULTIES.map((difficulty) => {
              const calls = SERVICE_CALLS.filter((call) => call.difficulty === difficulty);
              const isOpen = openDifficulty === difficulty;
              return (
                <section className="academy-library-group" key={difficulty}>
                  <button
                    type="button"
                    className="academy-library-toggle"
                    aria-expanded={isOpen}
                    onClick={() => setOpenDifficulty(isOpen ? "" : difficulty)}
                  >
                    <span>
                      <i className={`academy-dot ${difficultyClass(difficulty)}`} />
                      <strong>{difficulty}</strong>
                      <small>{calls.length ? `${calls.length} available` : "Coming soon"}</small>
                    </span>
                    <b>{isOpen ? "−" : "+"}</b>
                  </button>

                  {isOpen && calls.length > 0 && (
                    <div className="academy-library-list">
                      {calls.slice(0, 5).map((call) => (
                        <article key={call.id} className={completedSet.has(call.id) ? "complete" : ""}>
                          <div>
                            <span>{completedSet.has(call.id) ? "✓ Completed" : call.reason}</span>
                            <strong>{call.title}</strong>
                            <small>{call.equipment} · {call.department}</small>
                          </div>
                          <button type="button" onClick={() => launchCall(call.id)}>
                            {completedSet.has(call.id) ? "Review" : "Start"}
                          </button>
                        </article>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
