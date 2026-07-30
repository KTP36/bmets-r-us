import React from "react";

export default function QuizModeToggle({ options, value, onChange, compact = false, style = {} }) {
  return (
    <div
      role="group"
      aria-label="Practice mode"
      style={{
        display: "flex",
        justifyContent: "center",
        gap: compact ? 8 : 12,
        flexWrap: "wrap",
        marginBottom: compact ? 6 : 12,
        ...style
      }}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            style={{
              padding: compact ? "8px 14px" : "10px 20px",
              borderRadius: 999,
              border: "none",
              background: active
                ? "linear-gradient(135deg, #12355b, #1d6fa5)"
                : "linear-gradient(135deg, #dbeafe, #eff6ff)",
              color: active ? "white" : "#12355b",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: active
                ? "0 6px 16px rgba(18,53,91,0.18)"
                : "0 3px 8px rgba(15,23,42,0.06)"
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
