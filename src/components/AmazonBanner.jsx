import React from "react";

export default function AmazonBanner({
  currentStudyGearPick,
  currentStudyGearPickIndex = 0,
  setCurrentStudyGearPickIndex,
  studyGearPicks = [],
  trackSiteEvent,
  isSmallScreen = false
}) {
  if (!currentStudyGearPick) {
    return null;
  }

  const handleAffiliateClick = () => {
    if (typeof trackSiteEvent === "function") {
      trackSiteEvent("affiliate_study_gear_pick_click", {
        target_url: currentStudyGearPick.eventName,
        source: "homepage_rotating_banner"
      });
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes medskillGearPulse {
            0% {
              transform: scale(1);
            }

            50% {
              transform: scale(1.06);
            }

            100% {
              transform: scale(1);
            }
          }

          .medskill-gear-feature:hover {
            transform: translateY(-2px);
            box-shadow: 0 20px 42px rgba(15, 118, 110, 0.22);
          }

          .medskill-amazon-button:hover {
            filter: brightness(0.96);
            transform: translateY(-1px);
          }
        `}
      </style>

      <div
        style={{
          margin: "0 auto 12px",
          maxWidth: 1180,
          borderRadius: isSmallScreen ? 22 : 28,
          border: "2px solid #86efac",
          background:
            "linear-gradient(135deg, #ffffff 0%, #ecfdf5 58%, #dcfce7 100%)",
          boxShadow: "0 16px 36px rgba(22, 163, 74, 0.17)",
          overflow: "hidden"
        }}
      >
        <a
          href={currentStudyGearPick.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="medskill-gear-feature"
          onClick={handleAffiliateClick}
          style={{
            display: "grid",
            gridTemplateColumns: isSmallScreen
              ? "minmax(0, 1fr)"
              : "auto minmax(0, 1fr) auto",
            alignItems: "center",
            gap: isSmallScreen ? 12 : 20,
            padding: isSmallScreen ? "20px 16px" : "22px 26px",
            color: "#12355b",
            textDecoration: "none",
            transition: "transform 0.2s ease, box-shadow 0.2s ease"
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: isSmallScreen ? 62 : 78,
              height: isSmallScreen ? 62 : 78,
              margin: isSmallScreen ? "0 auto" : 0,
              borderRadius: 22,
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
              border: "1px solid #86efac",
              fontSize: isSmallScreen ? 32 : 40,
              animation: "medskillGearPulse 2.8s ease-in-out infinite",
              boxShadow: "0 8px 18px rgba(22, 163, 74, 0.14)"
            }}
          >
            {currentStudyGearPick.icon}
          </div>

          <div
            style={{
              minWidth: 0,
              textAlign: isSmallScreen ? "center" : "left"
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "6px 11px",
                borderRadius: 999,
                background: "#166534",
                color: "white",
                fontWeight: 950,
                fontSize: 12,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                marginBottom: 8
              }}
            >
              MedSkillBuilder Recommends
            </div>

            <div
              style={{
                color: "#047857",
                fontWeight: 900,
                fontSize: isSmallScreen ? 13 : 14,
                marginBottom: 3
              }}
            >
              {currentStudyGearPick.label}
            </div>

            <div
              style={{
                color: "#12355b",
                fontWeight: 950,
                fontSize: isSmallScreen ? 19 : 23,
                lineHeight: 1.25,
                overflowWrap: "anywhere"
              }}
            >
              {currentStudyGearPick.text}
            </div>

            <div
              style={{
                color: "#475569",
                fontWeight: 700,
                fontSize: isSmallScreen ? 13 : 14,
                marginTop: 6
              }}
            >
              Helpful study and clinical tools selected for healthcare learners.
            </div>
          </div>

          <div
            className="medskill-amazon-button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: isSmallScreen ? "100%" : "auto",
              minWidth: isSmallScreen ? 0 : 190,
              maxWidth: "100%",
              boxSizing: "border-box",
              padding: "13px 18px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #f59e0b, #f97316)",
              color: "white",
              fontWeight: 950,
              fontSize: isSmallScreen ? 14 : 15,
              textAlign: "center",
              boxShadow: "0 10px 22px rgba(249, 115, 22, 0.25)",
              transition: "transform 0.2s ease, filter 0.2s ease"
            }}
          >
            View on Amazon →
          </div>
        </a>
      </div>

      {studyGearPicks.length > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            margin: "0 auto 8px"
          }}
          aria-label="Study gear pick rotation indicators"
        >
          {studyGearPicks.map((pick, index) => (
            <button
              type="button"
              key={pick.eventName || index}
              onClick={() => {
                if (typeof setCurrentStudyGearPickIndex === "function") {
                  setCurrentStudyGearPickIndex(index);
                }
              }}
              aria-label={`Show ${pick.label}`}
              style={{
                width: index === currentStudyGearPickIndex ? 22 : 9,
                height: 9,
                padding: 0,
                borderRadius: 999,
                border: "none",
                background:
                  index === currentStudyGearPickIndex
                    ? "#16a34a"
                    : "#bbf7d0",
                cursor: "pointer",
                transition: "0.2s ease"
              }}
            />
          ))}
        </div>
      )}

      <p
        style={{
          textAlign: "center",
          color: "#64748b",
          fontSize: 12,
          margin: "0 auto 18px",
          maxWidth: 760
        }}
      >
        As an Amazon Associate, MedSkillBuilder earns from qualifying purchases.
      </p>
    </>
  );
}
