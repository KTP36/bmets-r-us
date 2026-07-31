import React, { useMemo, useState } from "react";
import "./CBETHospitalDashboard.css";

const SERVICE_CALLS = [
  {
    id: "WO-1001",
    title: "Silent Breath",
    difficulty: "Intermediate",
    time: "8–10 minutes",
    department: "Operating Room 4",
    equipment: "PMT AeroVent A900",
    equipmentGroup: "Anesthesia",
    reason: "PEEP HIGH / BLOCKAGE",
    detail: "Pressure does not release normally during pre-use checkout.",
    achievement: "Silent Savior",
  },
  {
    id: "WO-1048",
    title: "Missing Beat",
    difficulty: "Beginner",
    time: "6–8 minutes",
    department: "Emergency Department",
    equipment: "Guardian Bedside Monitor",
    equipmentGroup: "Patient Monitor",
    reason: "No ECG waveform",
    detail: "SpO₂ and NIBP remain available after the patient was moved.",
    achievement: "Accessory Detective",
  },
  {
    id: "WO-1052",
    title: "Pressure Lost",
    difficulty: "Beginner",
    time: "6–8 minutes",
    department: "Intensive Care Unit",
    equipment: "Guardian Bedside Monitor",
    equipmentGroup: "NIBP",
    reason: "NIBP leak error",
    detail: "The cuff inflates briefly, then the measurement stops.",
    achievement: "Pressure Pathfinder",
  },
  {
    id: "WO-1092",
    title: "Temperature Trouble",
    difficulty: "Beginner",
    time: "7–9 minutes",
    department: "PACU • Bay 7",
    equipment: "Guardian GX5 Bedside Monitor",
    equipmentGroup: "Temperature Monitoring",
    reason: "Implausible temperature reading",
    detail: "The monitor displays 29.8°C even though the patient appears warm and stable.",
    achievement: "Temperature Detective",
  },
  {
    id: "WO-1099",
    title: "Dead Battery",
    difficulty: "Beginner",
    time: "7–9 minutes",
    department: "Emergency Department",
    equipment: "Guardian Transit Transport Monitor",
    equipmentGroup: "Transport Monitoring",
    reason: "Powers off when unplugged",
    detail: "The monitor operates on AC power but shuts down immediately on battery.",
    achievement: "Power Restored",
  },
  {
    id: "WO-1061",
    title: "The Hidden Leak",
    difficulty: "Intermediate",
    time: "8–10 minutes",
    department: "Operating Room",
    equipment: "AeroVent Anesthesia Ventilator",
    equipmentGroup: "Anesthesia",
    reason: "Low-pressure leak test failure",
    detail: "A low-pressure alarm appears during pre-use testing.",
  },
  {
    id: "WO-1073",
    title: "The Blocked Line",
    difficulty: "Intermediate",
    time: "7–9 minutes",
    department: "NICU",
    equipment: "NeoFlow Syringe Pump",
    equipmentGroup: "Infusion",
    reason: "Downstream occlusion",
    detail: "The pump alarms immediately after setup.",
  },
  {
    id: "WO-1080",
    title: "No Probe Found",
    difficulty: "Beginner",
    time: "6–8 minutes",
    department: "Imaging",
    equipment: "Portable Ultrasound System",
    equipmentGroup: "Ultrasound",
    reason: "Transducer not detected",
    detail: "The system powers on but cannot recognize the selected probe.",
  },
  {
    id: "WO-1105",
    title: "Silent Shock",
    difficulty: "Intermediate",
    time: "8–10 minutes",
    department: "Emergency Department",
    equipment: "PMT PulseGuard X Defibrillator",
    equipmentGroup: "Defibrillation",
    reason: "Readiness self-test failure",
    detail: "The unit is not cleared for emergency use after its readiness check fails.",
    achievement: "Emergency Ready",
  },
  {
    id: "WO-1112",
    title: "Vanishing Pressure",
    difficulty: "Intermediate",
    time: "8–10 minutes",
    department: "Intensive Care Unit",
    equipment: "PMT RespiraOne Ventilator",
    equipmentGroup: "Ventilation",
    reason: "Low pressure / low exhaled volume",
    detail: "The ventilator cannot maintain pressure with the reported patient circuit.",
    achievement: "Circuit Investigator",
  },

];

const TOTAL_PLANNED_CALLS = 10;

function readCompletedCalls() {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem("cbetCompletedServiceCalls") || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readActiveCall() {
  if (typeof window === "undefined") return "WO-1001";
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

function stars(value) {
  const safeValue = Math.max(1, Math.min(5, value));
  return `${"★".repeat(safeValue)}${"☆".repeat(5 - safeValue)}`;
}

export default function CBETHospitalDashboard({
  onOpenTraining,
  onOpenLab,
  onOpenMission,
  onOpenStats,
}) {
  const [activeCallId, setActiveCallId] = useState(readActiveCall);
  const [completedCalls] = useState(readCompletedCalls);

  const completedSet = useMemo(() => new Set(completedCalls), [completedCalls]);
  const completedCount = completedSet.size;
  const progressPercent = Math.min(100, (completedCount / TOTAL_PLANNED_CALLS) * 100);

  const activeCall = useMemo(() => {
    const storedCall = SERVICE_CALLS.find(
      (call) => call.id === activeCallId && !completedSet.has(call.id)
    );
    return storedCall || SERVICE_CALLS.find((call) => !completedSet.has(call.id)) || SERVICE_CALLS[0];
  }, [activeCallId, completedSet]);

  const completedCallDetails = SERVICE_CALLS.filter((call) => completedSet.has(call.id));
  const upcomingCalls = SERVICE_CALLS.filter((call) => !completedSet.has(call.id)).slice(0, 3);
  const recentAchievements = completedCallDetails
    .filter((call) => call.achievement)
    .slice(-3)
    .reverse();
  const equipmentExperience = [...new Set(completedCallDetails.map((call) => call.equipmentGroup))];

  const skillLevel = Math.min(5, 2 + Math.floor(completedCount / 2));
  const safetyLevel = Math.min(5, 3 + Math.floor(completedCount / 3));
  const equipmentLevel = Math.min(5, 2 + Math.floor(equipmentExperience.length / 2));

  const launchCall = (id) => {
    setActiveCallId(id);
    try {
      window.localStorage.setItem("cbetActiveServiceCall", id);
    } catch {
      // Local progress storage is optional.
    }
    onOpenMission(id);
  };

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
          <button type="button" onClick={onOpenTraining}>Learning modules</button>
          <button type="button" onClick={onOpenLab}>Equipment lab</button>
        </div>
      </header>

      <section className="academy-shell">
        <section className="academy-intro">
          <span className="academy-eyebrow">Clinical Engineering Academy</span>
          <h1>Start your shift.</h1>
          <p>Solve one realistic equipment problem at a time and build practical troubleshooting experience.</p>
        </section>

        <section className="academy-progress-card" aria-label="Career progress">
          <div className="academy-progress-heading">
            <div>
              <span className="academy-eyebrow">Career progress</span>
              <strong>{completedCount} of {TOTAL_PLANNED_CALLS} service calls complete</strong>
            </div>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="academy-progress-track" aria-hidden="true">
            <i style={{ width: `${progressPercent}%` }} />
          </div>
        </section>

        <article className="academy-shift-card">
          <div className="academy-shift-copy">
            <span className="academy-card-label">Continue your shift</span>
            <div className="academy-call-title-row">
              <div>
                <span className={`academy-difficulty ${difficultyClass(activeCall.difficulty)}`}>
                  {activeCall.difficulty}
                </span>
                <h2>{activeCall.title}</h2>
              </div>
              <span className="academy-shift-icon" aria-hidden="true">🔧</span>
            </div>
            <p className="academy-call-reason">{activeCall.reason}</p>
            <p>{activeCall.detail}</p>
            <div className="academy-call-meta">
              <span>{activeCall.equipment}</span>
              <span>{activeCall.department}</span>
              <span>{activeCall.time}</span>
            </div>
          </div>
          <button type="button" className="academy-primary-button" onClick={() => launchCall(activeCall.id)}>
            Respond to service call
          </button>
        </article>

        <section className="academy-compact-grid">
          <article className="academy-panel">
            <div className="academy-panel-heading">
              <div>
                <span className="academy-card-label">Your skills</span>
                <h2>Growing with every call</h2>
              </div>
            </div>
            <div className="academy-skills-list">
              <div><span>Patient safety</span><strong aria-label={`${safetyLevel} out of 5 stars`}>{stars(safetyLevel)}</strong></div>
              <div><span>Troubleshooting</span><strong aria-label={`${skillLevel} out of 5 stars`}>{stars(skillLevel)}</strong></div>
              <div><span>Equipment knowledge</span><strong aria-label={`${equipmentLevel} out of 5 stars`}>{stars(equipmentLevel)}</strong></div>
            </div>
          </article>

          <article className="academy-panel">
            <div className="academy-panel-heading">
              <div>
                <span className="academy-card-label">Recent achievements</span>
                <h2>Your latest wins</h2>
              </div>
              <button type="button" className="academy-text-button" onClick={onOpenStats}>View all</button>
            </div>
            <div className="academy-achievement-list">
              {recentAchievements.length ? recentAchievements.map((call) => (
                <div key={call.id}>
                  <span aria-hidden="true">🏅</span>
                  <strong>{call.achievement}</strong>
                </div>
              )) : (
                <p>Complete your first service call to earn an achievement.</p>
              )}
            </div>
          </article>
        </section>

        <section className="academy-panel academy-call-status">
          <div className="academy-panel-heading">
            <div>
              <span className="academy-card-label">Service calls</span>
              <h2>Turn every call green</h2>
            </div>
          </div>

          <div className="academy-status-columns">
            <div>
              <h3>Completed</h3>
              <div className="academy-status-list">
                {completedCallDetails.length ? completedCallDetails.slice(-3).reverse().map((call) => (
                  <button type="button" className="complete" key={call.id} onClick={() => launchCall(call.id)}>
                    <span>✓</span>
                    <strong>{call.title}</strong>
                  </button>
                )) : <p>No calls completed yet.</p>}
              </div>
            </div>

            <div>
              <h3>Upcoming</h3>
              <div className="academy-status-list">
                {upcomingCalls.map((call) => (
                  <button type="button" key={call.id} onClick={() => launchCall(call.id)}>
                    <span>○</span>
                    <strong>{call.title}</strong>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {equipmentExperience.length > 0 && (
          <section className="academy-equipment-experience" aria-label="Equipment experience">
            <span>Equipment experience</span>
            <div>
              {equipmentExperience.map((equipment) => <strong key={equipment}>{equipment}</strong>)}
            </div>
          </section>
        )}

        <blockquote className="academy-quote">
          “The best troubleshooters don’t guess. They investigate.”
        </blockquote>
      </section>
    </main>
  );
}
