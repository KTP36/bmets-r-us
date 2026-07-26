import React from "react";
import ProgressBar from "./ProgressBar";

export default function Roadmap({ lessons, lessonIndex, completedLessons, onSelect }) {
  const percent = (completedLessons.length / lessons.length) * 100;

  return (
    <nav className="course-roadmap" aria-label="Guided lab lessons">
      <div className="roadmap-heading">
        <span>CBET Guided Lab</span>
        <strong>Multimeter Foundations</strong>
        <div className="roadmap-progress-copy">
          <small>Course progress</small>
          <b>{Math.round(percent)}% complete</b>
        </div>
        <ProgressBar value={percent} className="roadmap-progress-track" />
      </div>

      {lessons.map((lesson, index) => {
        const unlocked = index === 0 || completedLessons.includes(lessons[index - 1].id);
        const complete = completedLessons.includes(lesson.id);

        return (
          <button
            key={lesson.id}
            className={`${index === lessonIndex ? "active" : ""} ${complete ? "complete" : ""}`}
            disabled={!unlocked}
            onClick={() => unlocked && onSelect(index)}
          >
            <span>{complete ? "✓" : unlocked ? index + 1 : "🔒"}</span>
            <div>
              <small>{lesson.id === "practical" ? "Final" : `Lesson ${index + 1}`}</small>
              <strong>{lesson.shortTitle}</strong>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
