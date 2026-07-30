import React from "react";

function AchievementCase({
  unlockedAchievements,
  achievementProgress,
  trackSiteEvent,
  unlockAchievement,
  achievements
}) {
  const bookmarkAchievementUnlocked = unlockedAchievements.includes(
    "bookmark-supporter"
  );

  const safelyTrack = (eventName, eventData) => {
    if (typeof trackSiteEvent === "function") {
      trackSiteEvent(eventName, eventData);
    }
  };

  return (
    <div
      id="achievement-case"
      style={{
        marginBottom: 18,
        padding: "22px 20px",
        borderRadius: 22,
        background:
          "linear-gradient(135deg, rgba(255,247,237,0.98), rgba(254,243,199,0.92))",
        border: "1px solid #fed7aa",
        boxShadow: "0 12px 26px rgba(146,64,14,0.10)"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          alignItems: "center",
          gap: 20,
          maxWidth: 1100,
          margin: "0 auto"
        }}
      >
        <div>
          <div
            style={{
              color: "#92400e",
              fontWeight: 950,
              letterSpacing: 0.4,
              fontSize: 21,
              marginBottom: 5
            }}
          >
            🏆 Achievements
          </div>
          <div style={{ color: "#7c2d12", fontSize: 14, lineHeight: 1.45 }}>
            Complete practice tools, score high, return later, and unlock trophies on this device.
          </div>
        </div>

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              color: "#78350f",
              fontWeight: 900,
              fontSize: 14,
              marginBottom: 9
            }}
          >
            <span>
              {unlockedAchievements.length} of {achievements.length} trophies unlocked
            </span>
            <span>{achievementProgress}%</span>
          </div>
          <div
            role="progressbar"
            aria-label="Achievement progress"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={achievementProgress}
            style={{
              height: 12,
              borderRadius: 999,
              background: "#fde68a",
              overflow: "hidden",
              boxShadow: "inset 0 1px 2px rgba(120,53,15,0.10)"
            }}
          >
            <div
              style={{
                width: `${achievementProgress}%`,
                height: "100%",
                borderRadius: 999,
                background: "linear-gradient(135deg, #f59e0b, #f97316)",
                transition: "width 0.35s ease"
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap"
          }}
        >
          {bookmarkAchievementUnlocked ? (
            <div
              aria-label="Bookmark trophy unlocked"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "9px 14px",
                borderRadius: 999,
                background: "rgba(220,252,231,0.95)",
                border: "1px solid #86efac",
                color: "#166534",
                fontWeight: 950,
                boxShadow: "0 5px 12px rgba(21,128,61,0.10)"
              }}
            >
              🦊 Bookmarked
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (typeof unlockAchievement === "function") {
                  unlockAchievement("bookmark-supporter");
                }

                safelyTrack("achievement_bookmark_click", {
                  achievement_id: "bookmark-supporter"
                });
              }}
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                border: "none",
                background: "linear-gradient(135deg, #92400e, #f59e0b)",
                color: "white",
                fontWeight: 950,
                cursor: "pointer",
                boxShadow: "0 8px 16px rgba(146,64,14,0.16)"
              }}
            >
              🦊 I Bookmarked It
            </button>
          )}

          <a
            href="/spot-the-problem-vital-signs-challenge.html"
            onClick={() =>
              safelyTrack("achievement_cta_click", {
                destination: "spot_the_problem_vitals"
              })
            }
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 16px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #b91c1c, #f97316)",
              color: "white",
              fontWeight: 950,
              textDecoration: "none",
              boxShadow: "0 8px 16px rgba(185,28,28,0.16)"
            }}
          >
            🚨 Earn Vitals Trophy
          </a>
        </div>
      </div>

      <details
        onToggle={(event) => {
          if (event.currentTarget.open) {
            safelyTrack("trophy_case_opened", {
              unlocked_count: unlockedAchievements.length,
              total_trophies: achievements.length
            });
          }
        }}
        style={{
          maxWidth: 1100,
          margin: "18px auto 0",
          borderRadius: 18,
          background: "rgba(255,255,255,0.62)",
          border: "1px solid #fed7aa",
          overflow: "hidden"
        }}
      >
        <summary
          style={{
            padding: "14px 16px",
            cursor: "pointer",
            color: "#78350f",
            fontWeight: 950,
            fontSize: 16,
            textAlign: "center",
            listStyle: "none"
          }}
        >
          View trophy requirements and progress
        </summary>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 14,
            padding: "2px 16px 16px"
          }}
        >
          {achievements.map((achievement) => {
            const unlocked = unlockedAchievements.includes(achievement.id);

            return (
              <div
                key={achievement.id}
                style={{
                  position: "relative",
                  minHeight: 150,
                  padding: 16,
                  borderRadius: 18,
                  background: unlocked
                    ? "linear-gradient(135deg, #ffffff, #f0fdf4)"
                    : "rgba(255,255,255,0.48)",
                  border: unlocked
                    ? "1px solid #86efac"
                    : "1px solid #fcd9a8",
                  color: unlocked ? "#78350f" : "#92400e",
                  boxShadow: unlocked
                    ? "0 8px 18px rgba(22,101,52,0.11)"
                    : "none",
                  opacity: unlocked ? 1 : 0.72,
                  textAlign: "center"
                }}
              >
                {unlocked && (
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      padding: "3px 8px",
                      borderRadius: 999,
                      background: "#dcfce7",
                      border: "1px solid #86efac",
                      color: "#166534",
                      fontSize: 10,
                      fontWeight: 950,
                      letterSpacing: 0.3
                    }}
                  >
                    UNLOCKED
                  </div>
                )}

                <div style={{ fontSize: 28, marginBottom: 7, marginTop: 2 }}>
                  {unlocked ? achievement.icon : "🔒"}
                </div>
                <div style={{ fontWeight: 950, marginBottom: 6, fontSize: 15 }}>
                  {achievement.title}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    lineHeight: 1.4,
                    color: unlocked ? "#7c2d12" : "#92400e"
                  }}
                >
                  {achievement.description}
                </div>
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
}

export default AchievementCase;
