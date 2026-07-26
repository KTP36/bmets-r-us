import React from "react";

export function CompletionScreen({
  lesson,
  lastLesson,
  nextLesson,
  resetBench,
  onExit,
}) {
  return (
    <section className="vl-complete">
      <div>🏆</div>
      <span>
        {lesson.id === "practical"
          ? "PRACTICAL EXAM PASSED"
          : "LESSON COMPLETE"}
      </span>
      <h2>{lesson.badge}</h2>
      <p>
        You completed <strong>{lesson.title}</strong>
        {lesson.expected ? (
          <>
            {" "}
            and recorded <strong>{lesson.expected}</strong>.
          </>
        ) : (
          "."
        )}
      </p>
      <div className="vl-rewards">
        <strong>+{lesson.xp} XP</strong>
        <strong>Skill unlocked: {lesson.shortTitle}</strong>
      </div>
      <div className="vl-complete-actions">
        <button className="vl-primary" onClick={nextLesson}>
          {lastLesson
            ? "Complete Multimeter Course →"
            : "Continue to Next Lesson →"}
        </button>
        <button onClick={resetBench}>Practice Again</button>
        <button onClick={onExit}>Return to Academy Dashboard</button>
      </div>
    </section>
  );
}

export function CourseCompleteScreen({
  lessons,
  totalPossibleXp,
  onExit,
  onReview,
}) {
  return (
    <section className="vl-complete vl-finale">
      <div>🎓</div>
      <span>COURSE COMPLETE</span>
      <h2>Multimeter Foundations Certified</h2>
      <p>You completed eight guided labs and the final practical exam.</p>
      <div className="vl-rewards">
        <strong>{totalPossibleXp} possible XP</strong>
        <strong>{lessons.length} completed skill checks</strong>
      </div>
      <div className="vl-skill-grid">
        {lessons.map((item) => (
          <strong key={item.id}>✓ {item.shortTitle}</strong>
        ))}
      </div>
      <div className="vl-complete-actions">
        <button className="vl-primary" onClick={onExit}>
          Return to CBET Academy →
        </button>
        <button onClick={onReview}>Review Lessons</button>
      </div>
    </section>
  );
}
