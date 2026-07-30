import React from "react";

const toneStyles = {
  blue: {
    background: "#eff6ff",
    borderColor: "#bfdbfe",
    color: "#12355b"
  },
  green: {
    background: "#ecfdf5",
    borderColor: "#bbf7d0",
    color: "#0f766e"
  },
  orange: {
    background: "#fff7ed",
    borderColor: "#fed7aa",
    color: "#9a3412"
  },
  purple: {
    background: "#f5f3ff",
    borderColor: "#ddd6fe",
    color: "#6d28d9"
  }
};

export default function QuizStatPill({ children, tone = "blue", style }) {
  const selectedTone = toneStyles[tone] || toneStyles.blue;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 38,
        padding: "7px 13px",
        borderRadius: 999,
        border: `1px solid ${selectedTone.borderColor}`,
        background: selectedTone.background,
        color: selectedTone.color,
        fontWeight: 900,
        textAlign: "center",
        lineHeight: 1.15,
        whiteSpace: "nowrap",
        ...style
      }}
    >
      {children}
    </div>
  );
}
