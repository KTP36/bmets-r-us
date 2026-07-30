export default function QuickPracticeSection({
  isSmallScreen,
  jumpToPracticeCategory,
  setMode,
  setSelectedSet,
  trackSiteEvent
}) {
  return (
    <>
      {/* QUICK PRACTICE LEARNING PATHS */}
      <section
        aria-labelledby="quick-practice-heading"
        style={{
          marginBottom: 18,
          padding: isSmallScreen ? "28px 16px" : "38px 28px",
          borderRadius: 26,
          background: "linear-gradient(145deg, rgba(255,255,255,0.97), rgba(239,246,255,0.96))",
          border: "1px solid #cbdff5",
          boxShadow: "0 16px 34px rgba(18,53,91,0.10)",
          overflow: "hidden"
        }}
      >
        <style>
          {`
            .quick-practice-card {
              height: 100%;
              box-sizing: border-box;
              transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
            }

            .quick-practice-card:hover {
              transform: translateY(-7px);
              box-shadow: 0 24px 42px rgba(18,53,91,0.20) !important;
              filter: saturate(1.04);
            }

            .quick-practice-card:focus-visible {
              outline: 3px solid rgba(29,111,165,0.34);
              outline-offset: 4px;
            }
          `}
        </style>

        <div style={{ textAlign: "center", marginBottom: isSmallScreen ? 22 : 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 13px",
              borderRadius: 999,
              background: "#12355b",
              color: "white",
              fontSize: 12,
              fontWeight: 950,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 11,
              boxShadow: "0 8px 18px rgba(18,53,91,0.18)"
            }}
          >
            ⚡ Quick Practice
          </div>
          <h2
            id="quick-practice-heading"
            style={{
              color: "#12355b",
              fontSize: isSmallScreen ? 28 : 36,
              lineHeight: 1.15,
              margin: "0 0 9px"
            }}
          >
            Pick a Skill. Start Practicing.
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#4f6275",
              fontSize: isSmallScreen ? 15 : 17,
              lineHeight: 1.6,
              margin: "0 auto",
              maxWidth: 760
            }}
          >
            Short, focused activities make it easy to build confidence one healthcare skill at a time.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: isSmallScreen ? 14 : 18,
            width: "100%",
            maxWidth: 1160,
            margin: "0 auto",
            alignItems: "stretch"
          }}
        >
          <a
            href="/spot-the-problem-vital-signs-challenge.html"
            onClick={() =>
              trackSiteEvent("start_here_spot_problem_click", {
                target_url: "/spot-the-problem-vital-signs-challenge.html",
                source: "start_here_spot_problem"
              })
            }
            className="quick-practice-card"
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              minHeight: isSmallScreen ? 230 : 250,
              padding: 22,
              borderRadius: 22,
              background: "white",
              border: "1px solid #fecaca",
              borderTop: "7px solid #ef4444",
              color: "#12355b",
              textDecoration: "none",
              boxShadow: "0 12px 24px rgba(18,53,91,0.09)",
              textAlign: "left"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 32, lineHeight: 1 }}>🚨</span>
              <span style={{ padding: "6px 10px", borderRadius: 999, background: "#fff1f2", color: "#be123c", fontSize: 11, fontWeight: 950, letterSpacing: 0.7, textTransform: "uppercase" }}>
                Clinical Judgment
              </span>
            </div>
            <h3 style={{ fontSize: 23, lineHeight: 1.18, margin: "18px 0 8px", color: "#991b1b" }}>Spot the Problem</h3>
            <p style={{ margin: 0, color: "#52677c", lineHeight: 1.55, fontSize: 15 }}>
              Work through challenging vital-sign scenarios and identify the most important clinical concern.
            </p>
            <span style={{ marginTop: "auto", paddingTop: 18, color: "#b91c1c", fontWeight: 950 }}>
              Start Vitals Challenge →
            </span>
          </a>

          <button
            onClick={() =>
              jumpToPracticeCategory("CBET", {
                examName: "CBET Practice",
                source: "start_here_cbet"
              })
            }
            className="quick-practice-card"
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              minHeight: isSmallScreen ? 230 : 250,
              padding: 22,
              borderRadius: 22,
              background: "white",
              border: "1px solid #fed7aa",
              borderTop: "7px solid #f97316",
              color: "#12355b",
              boxShadow: "0 12px 24px rgba(18,53,91,0.09)",
              textAlign: "left",
              cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", width: "100%" }}>
              <span style={{ fontSize: 32, lineHeight: 1 }}>🔧</span>
              <span style={{ padding: "6px 10px", borderRadius: 999, background: "#fff7ed", color: "#c2410c", fontSize: 11, fontWeight: 950, letterSpacing: 0.7, textTransform: "uppercase" }}>
                Certification Prep
              </span>
            </div>
            <h3 style={{ fontSize: 23, lineHeight: 1.18, margin: "18px 0 8px", color: "#c2410c" }}>Free CBET Practice</h3>
            <p style={{ margin: 0, color: "#52677c", lineHeight: 1.55, fontSize: 15 }}>
              Build biomedical equipment knowledge with exam-style questions, explanations, and immediate feedback.
            </p>
            <span style={{ marginTop: "auto", paddingTop: 18, color: "#c2410c", fontWeight: 950 }}>
              Start CBET Practice →
            </span>
          </button>

          <button
            onClick={() =>
              jumpToPracticeCategory("Terminology", {
                examName: "Medical Terminology Practice",
                source: "start_here_terminology"
              })
            }
            className="quick-practice-card"
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              minHeight: isSmallScreen ? 230 : 250,
              padding: 22,
              borderRadius: 22,
              background: "white",
              border: "1px solid #bbf7d0",
              borderTop: "7px solid #22c55e",
              color: "#12355b",
              boxShadow: "0 12px 24px rgba(18,53,91,0.09)",
              textAlign: "left",
              cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", width: "100%" }}>
              <span style={{ fontSize: 32, lineHeight: 1 }}>🧾</span>
              <span style={{ padding: "6px 10px", borderRadius: 999, background: "#ecfdf5", color: "#047857", fontSize: 11, fontWeight: 950, letterSpacing: 0.7, textTransform: "uppercase" }}>
                Core Vocabulary
              </span>
            </div>
            <h3 style={{ fontSize: 23, lineHeight: 1.18, margin: "18px 0 8px", color: "#047857" }}>Medical Terminology</h3>
            <p style={{ margin: 0, color: "#52677c", lineHeight: 1.55, fontSize: 15 }}>
              Learn prefixes, suffixes, roots, and common word parts through fast recognition practice.
            </p>
            <span style={{ marginTop: "auto", paddingTop: 18, color: "#047857", fontWeight: 950 }}>
              Practice Medical Terms →
            </span>
          </button>

          <button
            onClick={() =>
              jumpToPracticeCategory("Anatomy", {
                source: "start_here_anatomy",
                setup: () => {
                  setMode("organs");
                  setSelectedSet(null);
                }
              })
            }
            className="quick-practice-card"
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              minHeight: isSmallScreen ? 230 : 250,
              padding: 22,
              borderRadius: 22,
              background: "white",
              border: "1px solid #ddd6fe",
              borderTop: "7px solid #8b5cf6",
              color: "#12355b",
              boxShadow: "0 12px 24px rgba(18,53,91,0.09)",
              textAlign: "left",
              cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", width: "100%" }}>
              <span style={{ fontSize: 32, lineHeight: 1 }}>🧠</span>
              <span style={{ padding: "6px 10px", borderRadius: 999, background: "#f5f3ff", color: "#6d28d9", fontSize: 11, fontWeight: 950, letterSpacing: 0.7, textTransform: "uppercase" }}>
                Visual Learning
              </span>
            </div>
            <h3 style={{ fontSize: 23, lineHeight: 1.18, margin: "18px 0 8px", color: "#6d28d9" }}>Anatomy Labeling</h3>
            <p style={{ margin: 0, color: "#52677c", lineHeight: 1.55, fontSize: 15 }}>
              Strengthen recognition of organs and body structures through interactive visual practice.
            </p>
            <span style={{ marginTop: "auto", paddingTop: 18, color: "#6d28d9", fontWeight: 950 }}>
              Start Anatomy Practice →
            </span>
          </button>
        </div>
      </section>
    </>
  );
}
