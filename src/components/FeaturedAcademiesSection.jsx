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

      <div
        role="region"
        aria-label="MedSkillBuilder Fall 2026 Learning Sweepstakes"
        className="msb-giveaway"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1180,
          margin: "0 auto 30px",
          padding: isSmallScreen ? "24px 18px" : "30px 34px",
          borderRadius: 24,
          background: "linear-gradient(125deg, #050b18 0%, #082f49 38%, #312e81 70%, #581c87 100%)",
          border: "1px solid rgba(103,232,249,0.62)",
          boxShadow: "0 20px 46px rgba(15,23,42,0.28), inset 0 0 40px rgba(34,211,238,0.05)",
          color: "white",
          overflow: "hidden"
        }}
      >
        <div aria-hidden="true" className="msb-giveaway-orb msb-giveaway-orb-one" />
        <div aria-hidden="true" className="msb-giveaway-orb msb-giveaway-orb-two" />

        <style>
          {`
            .msb-giveaway-orb {
              position: absolute;
              border-radius: 999px;
              pointer-events: none;
              filter: blur(1px);
            }
            .msb-giveaway-orb-one {
              width: 230px;
              height: 230px;
              right: -70px;
              top: -95px;
              background: radial-gradient(circle, rgba(34,211,238,.28), rgba(34,211,238,0) 70%);
            }
            .msb-giveaway-orb-two {
              width: 260px;
              height: 260px;
              left: 36%;
              bottom: -190px;
              background: radial-gradient(circle, rgba(217,70,239,.25), rgba(217,70,239,0) 70%);
            }
            .msb-giveaway-prize {
              transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
            }
            .msb-giveaway-prize:hover {
              transform: translateY(-3px);
              border-color: rgba(103,232,249,.72) !important;
              box-shadow: 0 16px 34px rgba(0,0,0,.20) !important;
            }
            .msb-giveaway-cta {
              transition: transform .18s ease, box-shadow .18s ease;
            }
            .msb-giveaway-cta:hover {
              transform: translateY(-2px);
              box-shadow: 0 12px 26px rgba(34,211,238,.28);
            }
            .msb-giveaway-cta:focus-visible,
            .msb-giveaway-rules:focus-visible {
              outline: 3px solid #67e8f9;
              outline-offset: 3px;
            }
            @media (prefers-reduced-motion: reduce) {
              .msb-giveaway-prize,
              .msb-giveaway-cta { transition: none; }
              .msb-giveaway-prize:hover,
              .msb-giveaway-cta:hover { transform: none; }
            }
          `}
        </style>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: isSmallScreen ? "1fr" : "minmax(0, 1.42fr) minmax(310px, 0.78fr)",
            gap: isSmallScreen ? 20 : 34,
            alignItems: "center"
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 13px",
                borderRadius: 999,
                background: "rgba(34,211,238,0.13)",
                border: "1px solid rgba(103,232,249,0.55)",
                color: "#a5f3fc",
                fontSize: 11,
                fontWeight: 950,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 13
              }}
            >
              🎉 Fall 2026 Giveaway
            </div>

            <div
              style={{
                color: "#f0abfc",
                fontSize: isSmallScreen ? 13 : 14,
                fontWeight: 950,
                letterSpacing: 1.7,
                textTransform: "uppercase",
                marginBottom: 4
              }}
            >
              Learn for free • Enter for free
            </div>

            <h2
              style={{
                margin: "0 0 10px",
                fontSize: isSmallScreen ? 34 : 50,
                lineHeight: 0.98,
                letterSpacing: isSmallScreen ? -0.8 : -1.7,
                color: "#fff",
                textTransform: "uppercase",
                maxWidth: 680
              }}
            >
              <span style={{ display: "block", color: "#fff", fontSize: isSmallScreen ? 40 : 58, marginBottom: 3 }}>WIN</span>
              <span
                style={{
                  display: "inline-block",
                  background: "linear-gradient(90deg, #22d3ee 0%, #60a5fa 42%, #e879f9 82%, #f0abfc 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent"
                }}
              >
                AIRPODS PRO 3
              </span>
            </h2>

            <p
              style={{
                margin: "0 0 17px",
                color: "#dbeafe",
                lineHeight: 1.6,
                fontSize: isSmallScreen ? 14 : 16,
                maxWidth: 720
              }}
            >
              Complete any eligible MedSkillBuilder quiz or Academy and submit your result between <strong>September 8 and November 29, 2026</strong> to enter the random drawing.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isSmallScreen ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))",
                gap: 8,
                marginBottom: 18,
                alignItems: "stretch",
                width: "100%"
              }}
            >
              {[
                "FREE ENTRY",
                "ONE ENTRY PER PERSON",
                "U.S. + D.C. • 18+",
                "DRAWING NOV. 30"
              ].map((item) => (
                <span
                  key={item}
                  style={{
                    padding: "8px 8px",
                    borderRadius: 999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    minWidth: 0,
                    background: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.20)",
                    color: "#fff",
                    fontSize: 11.5,
                    fontWeight: 950,
                    letterSpacing: 0.25
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a
                className="msb-giveaway-cta"
                href="#featured-academies-heading"
                style={{
                  padding: "12px 18px",
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #22d3ee, #67e8f9)",
                  color: "#082f49",
                  textDecoration: "none",
                  fontWeight: 950
                }}
              >
                Enter the Giveaway →
              </a>
              <a
                className="msb-giveaway-rules"
                href="/fall-2026-giveaway-rules.html"
                style={{
                  padding: "12px 18px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.26)",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 900
                }}
              >
                Official Rules
              </a>
            </div>
          </div>

          <div
            className="msb-giveaway-prize"
            style={{
              position: "relative",
              textAlign: "center",
              padding: isSmallScreen ? "20px 16px" : "26px 20px",
              borderRadius: 22,
              background: "radial-gradient(circle at 50% 38%, rgba(59,130,246,.16), rgba(255,255,255,.09) 45%, rgba(255,255,255,.05) 100%)",
              border: "2px solid rgba(103,232,249,0.48)",
              boxShadow: "0 16px 34px rgba(0,0,0,.22), 0 0 28px rgba(34,211,238,.24), 0 0 54px rgba(217,70,239,.18), inset 0 0 26px rgba(255,255,255,.035)"
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "12% 10% 28%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(34,211,238,.34) 0%, rgba(217,70,239,.26) 40%, rgba(0,0,0,0) 72%)",
                filter: "blur(18px)",
                pointerEvents: "none"
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "relative",
                zIndex: 1,
                width: isSmallScreen ? 190 : 230,
                height: isSmallScreen ? 145 : 170,
                margin: "0 auto 12px",
                filter: "drop-shadow(0 0 16px rgba(34,211,238,.24))"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: isSmallScreen ? "12px 8px 0" : "10px 5px 0",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(34,211,238,.28) 0%, rgba(217,70,239,.20) 42%, rgba(0,0,0,0) 72%)",
                  filter: "blur(10px)"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: 3,
                  transform: "translateX(-50%)",
                  width: isSmallScreen ? 145 : 170,
                  height: isSmallScreen ? 78 : 90,
                  borderRadius: "26px 26px 34px 34px",
                  background: "linear-gradient(160deg, #ffffff 0%, #f8fafc 52%, #dbe4ee 100%)",
                  border: "1px solid rgba(255,255,255,.95)",
                  boxShadow: "0 18px 30px rgba(0,0,0,.25), inset 0 -8px 14px rgba(148,163,184,.22)"
                }}
              >
                <div style={{ position: "absolute", left: "50%", top: 11, transform: "translateX(-50%)", width: 5, height: 5, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,.7)" }} />
              </div>

              <div
                style={{
                  position: "absolute",
                  left: isSmallScreen ? 35 : 42,
                  top: 7,
                  width: isSmallScreen ? 54 : 62,
                  height: isSmallScreen ? 62 : 72,
                  borderRadius: "55% 55% 48% 48%",
                  background: "linear-gradient(145deg, #ffffff, #e7edf4)",
                  border: "1px solid rgba(255,255,255,.95)",
                  transform: "rotate(-15deg)",
                  boxShadow: "0 9px 18px rgba(0,0,0,.22)"
                }}
              >
                <div style={{ position: "absolute", right: 7, top: 14, width: 18, height: 9, borderRadius: 999, background: "#111827", transform: "rotate(12deg)" }} />
                <div style={{ position: "absolute", left: "50%", top: 49, transform: "translateX(-50%)", width: 16, height: isSmallScreen ? 53 : 62, borderRadius: "0 0 12px 12px", background: "linear-gradient(90deg, #f8fafc, #dbe4ee)" }} />
              </div>

              <div
                style={{
                  position: "absolute",
                  right: isSmallScreen ? 35 : 42,
                  top: 7,
                  width: isSmallScreen ? 54 : 62,
                  height: isSmallScreen ? 62 : 72,
                  borderRadius: "55% 55% 48% 48%",
                  background: "linear-gradient(215deg, #ffffff, #e7edf4)",
                  border: "1px solid rgba(255,255,255,.95)",
                  transform: "rotate(15deg)",
                  boxShadow: "0 9px 18px rgba(0,0,0,.22)"
                }}
              >
                <div style={{ position: "absolute", left: 7, top: 14, width: 18, height: 9, borderRadius: 999, background: "#111827", transform: "rotate(-12deg)" }} />
                <div style={{ position: "absolute", left: "50%", top: 49, transform: "translateX(-50%)", width: 16, height: isSmallScreen ? 53 : 62, borderRadius: "0 0 12px 12px", background: "linear-gradient(90deg, #dbe4ee, #f8fafc)" }} />
              </div>
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "inline-block",
                padding: "6px 10px",
                borderRadius: 999,
                background: "#f0abfc",
                color: "#4a044e",
                fontSize: 11,
                fontWeight: 950,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 9
              }}
            >
              Grand Prize
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 1,
                fontSize: isSmallScreen ? 24 : 26,
                fontWeight: 950,
                lineHeight: 1.08,
                maxWidth: 390,
                margin: "0 auto"
              }}
            >
              Apple AirPods Pro&nbsp;3
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "inline-block",
                marginTop: 12,
                padding: "8px 13px",
                borderRadius: 12,
                background: "rgba(34,211,238,.14)",
                border: "1px solid rgba(103,232,249,.42)",
                color: "#cffafe",
                fontSize: 14,
                fontWeight: 950
              }}
            >
              $249 VALUE
            </div>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: 18,
            paddingTop: 13,
            borderTop: "1px solid rgba(255,255,255,.13)"
          }}
        >
          <p style={{ margin: 0, color: "#cbd5e1", fontSize: 10.5, lineHeight: 1.5 }}>
            NO PURCHASE NECESSARY. Open to legal residents of the 50 United States and D.C., age 18+. Limit one entry per person and active email address. Odds depend on eligible entries received. Void where prohibited. Apple is not a sponsor of or affiliated with this Sweepstakes. See Official Rules for complete details. Prize ARV: $249.
          </p>
        </div>
      </div>

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
          gridTemplateColumns: isSmallScreen ? "1fr" : "repeat(2, minmax(0, 1fr))",
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

        <a
          className="featured-academy-card"
          href="/emt-learning-path.html"
          onClick={() =>
            trackSiteEvent("featured_academy_click", {
              academy: "emt",
              target_url: "/emt-learning-path.html",
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
            border: "1px solid #fed7aa",
            boxShadow: "0 14px 30px rgba(194,65,12,0.11)",
            overflow: "hidden"
          }}
        >
          <div style={{ height: 7, margin: isSmallScreen ? "-22px -22px 22px" : "-26px -26px 24px", background: "linear-gradient(90deg, #991b1b, #dc2626, #f97316)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <span style={{ width: 54, height: 54, borderRadius: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg, #fee2e2, #ffedd5)", fontSize: 27, boxShadow: "0 8px 18px rgba(194,65,12,0.12)" }}>🚑</span>
            <span style={{ padding: "6px 10px", borderRadius: 999, background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa", fontSize: 11, fontWeight: 950, letterSpacing: 0.7, textTransform: "uppercase" }}>Career Path</span>
          </div>
          <h3 style={{ color: "#b91c1c", fontSize: isSmallScreen ? 25 : 28, lineHeight: 1.15, margin: "20px 0 10px" }}>
            EMT Academy
          </h3>
          <p style={{ margin: "0 0 18px", lineHeight: 1.6, color: "#526579" }}>
            Learn what it takes to become an EMT through guided lessons, responder safety, anatomy, airway skills, patient-care decisions, and realistic scenarios.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
            {["8-module path", "EMT fundamentals", "Patient scenarios", "Saved progress"].map((label) => (
              <span key={label} style={{ padding: "7px 10px", borderRadius: 999, background: "#fff7ed", border: "1px solid #fed7aa", color: "#7c2d12", fontSize: 12, fontWeight: 800 }}>✓ {label}</span>
            ))}
          </div>
          <span className="featured-academy-cta" style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: 12, width: "100%", padding: "13px 16px", borderRadius: 14, background: "linear-gradient(135deg, #b91c1c, #ea580c)", color: "white", fontWeight: 950, boxShadow: "0 8px 18px rgba(194,65,12,0.18)" }}>
            Start Academy <span aria-hidden="true">→</span>
          </span>
        </a>
      </div>
    </section>
  );
}
