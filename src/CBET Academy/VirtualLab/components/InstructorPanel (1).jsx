import React from "react";

export default function InstructorPanel({
  lesson,
  step,
  action,
  onContinue,
}) {
  return (
    <aside className="vl-instructor">
      <div className="vl-instructor-head">
        <div className="vl-avatar" aria-hidden="true">👨‍🔧</div>
        <div>
          <span>Your lab instructor</span>
          <strong>Biomedical Coach</strong>
          <small>CBET Expert</small>
        </div>
      </div>

      <div className="vl-task-label">Current task</div>
      <h2>{step?.[0] || `Welcome to ${lesson.title}`}</h2>
      <p className="vl-task-main">{step?.[1] || lesson.intro}</p>

      <div className="vl-why-card">
        <strong>💡 Why this matters</strong>
        <p>{step?.[2] || lesson.why || lesson.intro}</p>
      </div>

      {action === "continue" && (
        <button type="button" className="vl-primary" onClick={onContinue}>
          Start Lesson
        </button>
      )}

      <div className="vl-pro-tip">
        <strong>☆ Pro tip</strong>
        <p>
          {lesson.mode === "resistance"
            ? "Always ensure the circuit is de-energized before measuring resistance."
            : "Confirm the meter mode and probe jacks before touching a test point."}
        </p>
      </div>
    </aside>
  );
}
