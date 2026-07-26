import React from "react";

export default function ProgressBar({ value, className = "lesson-progress-bar" }) {
  const safeValue = Math.max(0, Math.min(100, value));
  return (
    <div className={className} aria-label={`${Math.round(safeValue)} percent complete`}>
      <i style={{ width: `${safeValue}%` }} />
    </div>
  );
}
