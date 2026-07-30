import React from "react";

function FeatureList({
  items,
  isSmallScreen = false,
  icon = "✓",
  iconColor = "#fbbf24",
  textColor = "rgba(255,255,255,0.95)"
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: isSmallScreen ? 9 : 11,
        margin: isSmallScreen ? "14px auto 0" : "20px auto 0",
        width: "fit-content",
        maxWidth: "100%",
        textAlign: "left"
      }}
    >
      {items.map((item) => (
        <div
          key={item}
          style={{
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            color: textColor,
            fontWeight: 650,
            fontSize: isSmallScreen ? 14 : 16,
            lineHeight: 1.45
          }}
        >
          <span
            aria-hidden="true"
            style={{
              color: iconColor,
              fontWeight: 950,
              flex: "0 0 auto",
              lineHeight: 1.45
            }}
          >
            {icon}
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export default FeatureList;
