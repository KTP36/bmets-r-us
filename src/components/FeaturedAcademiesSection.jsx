export default function FeaturedAcademiesSection({ isSmallScreen, trackSiteEvent }) {
  return (
    <section
      aria-labelledby="featured-academies-heading"
      style={{
        position: "relative",
        marginBottom: 20,
        padding: isSmallScreen ? "30px 16px" : "42px 30px",
        borderRadius: 28,
        overflow: "hidden",
        background: "linear-gradient(145deg, rgba(248,250,252,0.99), rgba(239,246,255,0.98) 55%, rgba(236,254,255,0.96))",
        border: "1px solid rgba(147,197,253,0.72)",
        boxShadow: "0 18px 42px rgba(18,53,91,0.13)"
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          right: -95,
          top: -120,
          background: "rgba(56,189,248,0.10)"
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 190,
          height: 190,
          borderRadius: "50%",
          left: -85,
          bottom: -105,
          background: "rgba(14,165,233,0.08)"
        }}
      />

      <style>
        {`
          .featured-academy-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          }

          .featured-academy-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 22px 46px rgba(18, 53, 91, 0.18) !important;
            border-color: rgba(59, 130, 246, 0.42) !important;
          }

          .featured-academy-card:focus-visible {
            outline: 3px solid #38bdf8;
            outline-offset: 4px;
          }

          .featured-academy-card:hover .featured-academy-cta {
            transform: translateX(4px);
          }

          .featured-academy-cta {
            transition: transform 0.2s ease;
          }
        `}
      </style>

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", marginBottom: isSmallScreen ? 24 : 30 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            borderRadius: 999,
            background: "#12355b",
            color: "white",
            fontSize: 12,
            fontWeight: 950,
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 12,
            boxShadow: "0 8px 18px rgba(18,53,91,0.18)"
          }}
        >
          🎓 Guided Learning Paths
        </div>
        <h2
          id="featured-academies-heading"
          style={{
            color: "#12355b",
            fontSize: isSmallScreen ? 29 : 38,
            lineHeight: 1.12,
            margin: "0 0 10px",
            letterSpacing: -0.5
          }}
        >
          Choose an Academy. Build a Real Skill.
        </h2>
        <p
          style={{
            color: "#4f6275",
            fontSize: isSmallScreen ? 15 : 17,
            lineHeight: 1.65,
            maxWidth: 760,
            margin: "0 auto"
          }}
        >
          Follow a structured path with guided lessons, interactive practice, progress milestones, and focused skill building.
        </p>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(285px, 1fr))",
          gap: isSmallScreen ? 16 : 22,
          maxWidth: 1180,
          margin: "0 auto"
        }}
      >
        <a
          className="featured-academy-card"
          href="/medical-assistant-learning-path.html"
          onClick={() =>
            trackSiteEvent("featured_academy_click", {
              academy: "medical_assistant",
              target_url: "/medical-assistant-learning-path.html",
              source: "homepage_featured_academies"
            })
          }
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: 390,
            padding: isSmallScreen ? 22 : 26,
            borderRadius: 24,
            color: "#1e293b",
            textDecoration: "none",
            background: "rgba(255,255,255,0.98)",
            border: "1px solid #bfdbfe",
            boxShadow: "0 14px 30px rgba(18,53,91,0.11)",
            overflow: "hidden"
          }}
        >
          <div style={{ height: 7, margin: isSmallScreen ? "-22px -22px 22px" : "-26px -26px 24px", background: "linear-gradient(90deg, #12355b, #1d6fa5, #38bdf8)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <span style={{ width: 54, height: 54, borderRadius: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg, #dbeafe, #e0f2fe)", fontSize: 27, boxShadow: "0 8px 18px rgba(29,111,165,0.12)" }}>🩺</span>
            <span style={{ padding: "6px 10px", borderRadius: 999, background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", fontSize: 11, fontWeight: 950, letterSpacing: 0.7, textTransform: "uppercase" }}>Career Path</span>
          </div>
          <h3 style={{ color: "#12355b", fontSize: isSmallScreen ? 25 : 28, lineHeight: 1.15, margin: "20px 0 10px" }}>
            Medical Assistant Academy
          </h3>
          <p style={{ margin: "0 0 18px", lineHeight: 1.6, color: "#526579" }}>
            Build practical confidence in clinical skills, patient care, vital signs, infection control, terminology, medications, and professional readiness.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
            {["Clinical skills", "Patient care", "Vital signs", "Certificate path"].map((label) => (
              <span key={label} style={{ padding: "7px 10px", borderRadius: 999, background: "#f8fafc", border: "1px solid #dbeafe", color: "#334155", fontSize: 12, fontWeight: 800 }}>✓ {label}</span>
            ))}
          </div>
          <span className="featured-academy-cta" style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: 12, width: "100%", padding: "13px 16px", borderRadius: 14, background: "linear-gradient(135deg, #12355b, #1d6fa5)", color: "white", fontWeight: 950, boxShadow: "0 8px 18px rgba(18,53,91,0.18)" }}>
            Start Academy <span aria-hidden="true">→</span>
          </span>
        </a>

        <a
          className="featured-academy-card"
          href="/medication-mastery-academy.html"
          onClick={() =>
            trackSiteEvent("featured_academy_click", {
              academy: "medication_mastery",
              target_url: "/medication-mastery-academy.html",
              source: "homepage_featured_academies"
            })
          }
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: 390,
            padding: isSmallScreen ? 22 : 26,
            borderRadius: 24,
            color: "#1e293b",
            textDecoration: "none",
            background: "rgba(255,255,255,0.98)",
            border: "1px solid #ddd6fe",
            boxShadow: "0 14px 30px rgba(91,33,182,0.11)",
            overflow: "hidden"
          }}
        >
          <div style={{ height: 7, margin: isSmallScreen ? "-22px -22px 22px" : "-26px -26px 24px", background: "linear-gradient(90deg, #6d28d9, #9333ea, #e11d48)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <span style={{ width: 54, height: 54, borderRadius: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg, #ede9fe, #fce7f3)", fontSize: 27, boxShadow: "0 8px 18px rgba(109,40,217,0.12)" }}>💊</span>
            <span style={{ padding: "6px 10px", borderRadius: 999, background: "#faf5ff", color: "#7e22ce", border: "1px solid #e9d5ff", fontSize: 11, fontWeight: 950, letterSpacing: 0.7, textTransform: "uppercase" }}>8 Missions</span>
          </div>
          <h3 style={{ color: "#5b21b6", fontSize: isSmallScreen ? 25 : 28, lineHeight: 1.15, margin: "20px 0 10px" }}>
            Medication Mastery Academy
          </h3>
          <p style={{ margin: "0 0 18px", lineHeight: 1.6, color: "#526579" }}>
            Master medication safety and major drug groups through interactive missions, clinical scenarios, quizzes, and a comprehensive Final Board Challenge.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
            {["8 missions", "75-question final", "500 XP", "Certificate included"].map((label) => (
              <span key={label} style={{ padding: "7px 10px", borderRadius: 999, background: "#faf5ff", border: "1px solid #e9d5ff", color: "#4c1d95", fontSize: 12, fontWeight: 800 }}>✓ {label}</span>
            ))}
          </div>
          <span className="featured-academy-cta" style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: 12, width: "100%", padding: "13px 16px", borderRadius: 14, background: "linear-gradient(135deg, #6d28d9, #9333ea)", color: "white", fontWeight: 950, boxShadow: "0 8px 18px rgba(109,40,217,0.18)" }}>
            Start Academy <span aria-hidden="true">→</span>
          </span>
        </a>

        <a
          className="featured-academy-card"
          href="/?tab=CBETAcademy"
          onClick={() =>
            trackSiteEvent("featured_academy_click", {
              academy: "cbet_certification",
              target_url: "/?tab=CBETAcademy",
              source: "homepage_featured_academies"
            })
          }
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: 390,
            padding: isSmallScreen ? 22 : 26,
            borderRadius: 24,
            color: "#1e293b",
            textDecoration: "none",
            background: "rgba(255,255,255,0.98)",
            border: "1px solid #a7f3d0",
            boxShadow: "0 14px 30px rgba(15,118,110,0.11)",
            overflow: "hidden"
          }}
        >
          <div style={{ height: 7, margin: isSmallScreen ? "-22px -22px 22px" : "-26px -26px 24px", background: "linear-gradient(90deg, #0f766e, #0e7490, #2563eb)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <span style={{ width: 54, height: 54, borderRadius: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg, #ccfbf1, #dbeafe)", fontSize: 27, boxShadow: "0 8px 18px rgba(15,118,110,0.12)" }}>⚡</span>
            <span style={{ padding: "6px 10px", borderRadius: 999, background: "#ecfdf5", color: "#047857", border: "1px solid #a7f3d0", fontSize: 11, fontWeight: 950, letterSpacing: 0.7, textTransform: "uppercase" }}>Certification Prep</span>
          </div>
          <h3 style={{ color: "#0f766e", fontSize: isSmallScreen ? 25 : 28, lineHeight: 1.15, margin: "20px 0 10px" }}>
            CBET Certification Academy
          </h3>
          <p style={{ margin: "0 0 18px", lineHeight: 1.6, color: "#526579" }}>
            Build biomedical equipment technician skills through guided electronics lessons, test-equipment training, troubleshooting, and the Virtual Lab.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
            {["Guided lessons", "Virtual Lab", "Troubleshooting", "Saved progress"].map((label) => (
              <span key={label} style={{ padding: "7px 10px", borderRadius: 999, background: "#f0fdfa", border: "1px solid #a7f3d0", color: "#134e4a", fontSize: 12, fontWeight: 800 }}>✓ {label}</span>
            ))}
          </div>
          <span className="featured-academy-cta" style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: 12, width: "100%", padding: "13px 16px", borderRadius: 14, background: "linear-gradient(135deg, #0f766e, #0e7490)", color: "white", fontWeight: 950, boxShadow: "0 8px 18px rgba(15,118,110,0.18)" }}>
            Start Academy <span aria-hidden="true">→</span>
          </span>
        </a>
      </div>
    </section>
  );
}
