import React from "react";

export default function InstructorPanel({ lesson, step, action, onContinue }) {
  return (
    <aside className="guided-instructor">
      <div className="guided-instructor-head">
        <div className="guided-avatar">👨‍🔧</div>
        <div>
          <span>Your Lab Instructor</span>
          <strong>Biomedical Coach</strong>
        </div>
      </div>

      <div className="guided-step-count">CURRENT TASK</div>
      <h2>{step[1]}</h2>
      <p className="guided-main-instruction">{step[2]}</p>

      <div className="guided-tip">
        <span>💡 Why this matters</span>
        <p>{lesson.intro}</p>
      </div>

      {lesson.safety && <div className="guided-safety-banner">⚠️ {lesson.safety}</div>}

      {action === "continue" && (
        <button className="guided-primary-button" onClick={onContinue}>
          {lesson.id === "practical" ? "Begin Practical Exam" : "Start Lesson"}
        </button>
      )}
    </aside>
  );
}
