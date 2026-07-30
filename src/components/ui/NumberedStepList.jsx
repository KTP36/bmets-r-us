import React from "react";

function NumberedStepList({ steps, isSmallScreen = false }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {steps.map((step, index) => (
        <div
          key={`${index + 1}-${step}`}
          style={{
            display: "grid",
            gridTemplateColumns: isSmallScreen ? "28px 1fr" : "34px 1fr",
            gap: isSmallScreen ? 8 : 10,
            alignItems: "start"
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: isSmallScreen ? 28 : 34,
              height: isSmallScreen ? 28 : 34,
              borderRadius: "50%",
              background: "rgba(251,191,36,0.95)",
              color: "#12355b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 950,
              fontSize: isSmallScreen ? 13 : 16
            }}
          >
            {index + 1}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.92)",
              lineHeight: isSmallScreen ? 1.35 : 1.45,
              fontWeight: 700,
              fontSize: isSmallScreen ? 13 : 16
            }}
          >
            {step}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NumberedStepList;
