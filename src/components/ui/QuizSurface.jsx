import React from "react";

export default function QuizSurface({ children, compact = false, style = {}, className = "" }) {
  return (
    <section
      className={className}
      style={{
        background: "rgba(255,255,255,0.96)",
        borderRadius: compact ? 20 : 24,
        padding: compact ? "12px 14px" : "clamp(18px, 3vw, 28px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        border: "1px solid #dbeafe",
        ...style
      }}
    >
      {children}
    </section>
  );
}
