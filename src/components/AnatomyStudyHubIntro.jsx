import React from "react";
import FeatureList from "./ui/FeatureList";
import NumberedStepList from "./ui/NumberedStepList";

const ANATOMY_FEATURES = [
  "Study first before revealing hints.",
  "Connect anatomy to real patient care.",
  "Build recognition through quick knowledge checks.",
  "Learn to reason instead of memorizing labels."
];

const LEARNING_STEPS = [
  "Study the anatomy image first.",
  "Make your best guess.",
  "Reveal hints only if needed.",
  "Apply what you learned to patient care."
];

function AnatomyStudyHubIntro({ isSmallScreen }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, rgba(18,53,91,0.98) 0%, rgba(29,111,165,0.95) 48%, rgba(15,118,110,0.96) 100%)",
        borderRadius: isSmallScreen ? 20 : 28,
        padding: isSmallScreen ? "18px 14px" : "28px 30px",
        marginBottom: isSmallScreen ? 16 : 22,
        boxShadow: isSmallScreen
          ? "0 10px 24px rgba(15, 23, 42, 0.18)"
          : "0 18px 45px rgba(15, 23, 42, 0.22)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.25)"
      }}
    >
      <div
        style={{
          position: "absolute",
          right: isSmallScreen ? -70 : -40,
          top: isSmallScreen ? -80 : -50,
          width: isSmallScreen ? 130 : 190,
          height: isSmallScreen ? 130 : 190,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)"
        }}
      />
      <div
        style={{
          position: "absolute",
          left: isSmallScreen ? -95 : -60,
          bottom: isSmallScreen ? -105 : -70,
          width: isSmallScreen ? 150 : 220,
          height: isSmallScreen ? 150 : 220,
          borderRadius: "50%",
          background: "rgba(251,191,36,0.16)"
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: isSmallScreen ? 6 : 8,
            padding: isSmallScreen ? "7px 10px" : "8px 14px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.16)",
            border: "1px solid rgba(255,255,255,0.28)",
            fontWeight: 800,
            marginBottom: isSmallScreen ? 10 : 14,
            letterSpacing: 0.2,
            fontSize: isSmallScreen ? 13 : 16
          }}
        >
          🧠 Interactive Anatomy Study Hub
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isSmallScreen
              ? "1fr"
              : "minmax(0, 1.4fr) minmax(260px, 0.8fr)",
            gap: isSmallScreen ? 14 : 22,
            alignItems: "stretch"
          }}
        >
          <div>
            <h2
              style={{
                fontSize: isSmallScreen ? 25 : "clamp(30px, 4vw, 40px)",
                lineHeight: isSmallScreen ? 1.12 : 1.08,
                margin: isSmallScreen ? "0 0 10px 0" : "0 0 14px 0",
                fontWeight: 950,
                letterSpacing: isSmallScreen ? "-0.02em" : "-0.03em",
                color: "white"
              }}
            >
              Recognize Anatomy. Understand Why It Matters.
            </h2>
            <p
              style={{
                fontSize: isSmallScreen ? 15 : 18,
                lineHeight: isSmallScreen ? 1.55 : 1.65,
                margin: isSmallScreen ? "0 0 14px 0" : "0 0 18px 0",
                color: "rgba(255,255,255,0.9)",
                maxWidth: 760
              }}
            >
              Choose a body system, study the image, make your best decision,
              then reveal hints only if you need them. Every activity is designed
              to build clinical reasoning instead of memorization.
            </p>

            <FeatureList items={ANATOMY_FEATURES} isSmallScreen={isSmallScreen} />
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.20)",
              borderRadius: isSmallScreen ? 16 : 20,
              padding: isSmallScreen ? 15 : 20,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)"
            }}
          >
            <h3
              style={{
                margin: "0 0 14px 0",
                fontSize: isSmallScreen ? 18 : 22,
                fontWeight: 900,
                color: "white"
              }}
            >
              How You&apos;ll Learn
            </h3>
            <NumberedStepList steps={LEARNING_STEPS} isSmallScreen={isSmallScreen} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnatomyStudyHubIntro;
