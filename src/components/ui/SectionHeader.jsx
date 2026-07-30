import React from "react";

export default function SectionHeader({
  title,
  subtitle,
  align = "center",
  maxWidth = 760,
  titleColor = "#12355b",
  subtitleColor = "#4f6275",
  style = {},
}) {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth,
        margin: "0 auto 32px",
        ...style,
      }}
    >
      <h2
        style={{
          margin: 0,
          color: titleColor,
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          fontWeight: 900,
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>

      {subtitle ? (
        <p
          style={{
            margin: "14px auto 0",
            color: subtitleColor,
            fontSize: 18,
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
