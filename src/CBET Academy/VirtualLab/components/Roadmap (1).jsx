import React from "react";

export default function Roadmap({
  lessons,
  lessonIndex,
  completedLessons,
  onSelect,
}) {
  const unlockedThrough = Math.max(
    lessonIndex,
    lessons.findIndex((item) => !completedLessons.includes(item.id))
  );

  return (
    <aside className="vl-roadmap">
      <div className="vl-roadmap-header">
        <span>CBET Guided Lab</span>
        <strong>Multimeter Foundations</strong>
        <small>Course progress</small>
        <div className="vl-roadmap-percent">
          {Math.round((completedLessons.length / lessons.length) * 100)}% complete
        </div>
        <div className="vl-roadmap-track">
          <i
            style={{
              width: `${(completedLessons.length / lessons.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="vl-roadmap-list">
        {lessons.map((item, index) => {
          const complete = completedLessons.includes(item.id);
          const active = index === lessonIndex;
          const locked =
            index > Math.max(unlockedThrough, lessonIndex + 1) && !complete;
          const isFinal = item.id === "practical";

          return (
            <button
              key={item.id}
              type="button"
              className={`${active ? "active" : ""} ${
                complete ? "complete" : ""
              }`}
              disabled={locked}
              onClick={() => onSelect(index)}
            >
              <span className="vl-roadmap-number">
                {complete ? "✓" : locked ? "🔒" : isFinal ? "🏆" : index + 1}
              </span>
              <span className="vl-roadmap-copy">
                <small>{isFinal ? "Final" : `Lesson ${index + 1}`}</small>
                <strong>{item.shortTitle || item.title}</strong>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
