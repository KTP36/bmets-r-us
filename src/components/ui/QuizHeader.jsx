import React from "react";

export default function QuizHeader({ title, subtitle, compact = false, style = {} }) {
  return (
    <header
      style={{
        textAlign: "center",
        marginBottom: compact ? 6 : 14,
        ...style
      }}
    >
      <h2
        style={{
          color: "#12355b",
          margin: "0 0 3px",
          fontSize: compact ? 22 : "clamp(24px, 3vw, 32px)",
          lineHeight: 1.15
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            color: "#475569",
            margin: "0 auto",
            maxWidth: 760,
            fontSize: compact ? 13 : 15,
            lineHeight: 1.4
          }}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
