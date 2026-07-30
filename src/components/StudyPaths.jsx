import React from "react";

const STUDY_PATHS = [
  ["🫀 Anatomy", "/anatomy-labeling-practice.html"],
  ["⚡ CBET", "/free-cbet-practice-test.html"],
  ["🩺 Nursing", "/rn-practice-questions.html"],
  ["📈 TEAS", "/free-teas-practice-test.html"],
  ["❤️ EKG", "/how-to-read-ekg.html"],
  ["🧠 Medical Terms", "/medical-terminology-practice.html"],
  ["🫁 Lung Sounds", "/evaluate-lung-sounds.html"],
  ["🩸 Lab Values", "/lab-values-practice-quiz.html"]
];

export default function StudyPaths() {
  return (
    <div
      style={{
        marginTop: 28,
        background: "rgba(255,255,255,0.94)",
        borderRadius: 22,
        padding: 24,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
      }}
    >
      <h2 style={{ textAlign: "center", color: "#12355b", marginTop: 0 }}>
        Choose Your Study Path
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 14
        }}
      >
        {STUDY_PATHS.map(([label, href]) => (
          <a
            key={label}
            href={href}
            style={{
              textDecoration: "none",
              color: "#12355b",
              fontWeight: 900,
              padding: "16px",
              borderRadius: 16,
              background: "linear-gradient(135deg,#eff6ff,#ffffff)",
              border: "1px solid #dbeafe",
              textAlign: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
