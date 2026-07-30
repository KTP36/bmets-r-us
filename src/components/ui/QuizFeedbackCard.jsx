import React from "react";

const tones = {
  correct: { background: "#ecfdf5", border: "#bbf7d0", color: "#065f46" },
  incorrect: { background: "#fff7ed", border: "#fed7aa", color: "#9a3412" },
  info: { background: "#eff6ff", border: "#bfdbfe", color: "#1d4ed8" }
};

export default function QuizFeedbackCard({ tone = "info", children, style = {} }) {
  const palette = tones[tone] || tones.info;
  return (
    <div
      role="status"
      style={{
        marginTop: 8,
        padding: "8px 11px",
        borderRadius: 13,
        background: palette.background,
        border: `1px solid ${palette.border}`,
        color: palette.color,
        fontWeight: 800,
        fontSize: 14,
        ...style
      }}
    >
      {children}
    </div>
  );
}
