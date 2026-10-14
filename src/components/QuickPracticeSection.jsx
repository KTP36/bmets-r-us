export default function QuickPracticeSection({
  isSmallScreen,
  jumpToPracticeCategory,
  setMode,
  setSelectedSet,
  trackSiteEvent,
}) {
  const groups = [
    {
      title: "Certification Prep",
      id: "home-certification",
      items: [
        ["CBET Practice", "CBET", "CBET Practice"],
        ["RN Practice", "RN", "RN Practice"],
        ["TEAS Practice", "TEAS", "TEAS Practice"],
        ["CRES Practice", "/cres-practice-questions.html"],
      ],
    },
    {
      title: "Clinical Practice",
      items: [
        [
          "Vital Signs Challenge",
          "/spot-the-problem-vital-signs-challenge.html",
        ],
        ["EKG Waveform Quiz", "EKGQuiz", "EKG Waveform Quiz"],
        ["ABG Practice", "ABGQuiz", "ABG Practice"],
        ["Lab Values Quiz", "LabValuesQuiz", "Lab Values Quiz"],
      ],
    },
    {
      title: "Study Guides and Games",
      items: [
        ["Medical Terminology Builder", "/medical-terminology-builder.html"],
        ["Prefix and Suffix Practice", "/medical-prefix-suffix-practice.html"],
        ["Bone Practice", "Bones"],
        ["Heart Quiz", "HeartQuiz", "Heart Quiz"],
        ["Digestive Practice", "DigestiveQuiz", "Digestive Quiz"],
        ["CBET Electronics Study Guide", "/basic-electronics-cbet.html"],
      ],
    },
  ];
  const style = {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    padding: "14px 16px",
    borderRadius: 12,
    border: "1px solid #bfdbfe",
    background: "white",
    color: "#12355b",
    textDecoration: "none",
    font: "inherit",
    fontWeight: 750,
    textAlign: "left",
    cursor: "pointer",
  };
  return (
    <section
      aria-labelledby="home-practice-heading"
      style={{
        padding: isSmallScreen ? "24px 16px" : "32px 26px",
        background: "#eff6ff",
        border: "1px solid #bfdbfe",
        borderRadius: 24,
        marginBottom: 20,
      }}
    >
      <h2 id="home-practice-heading" style={{ color: "#12355b", marginTop: 0 }}>
        Explore More Practice
      </h2>
      <p style={{ color: "#475569" }}>
        Choose a focused activity, review your answers, and build confidence at
        your own pace.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))",
          gap: 24,
        }}
      >
        {groups.map((g) => (
          <section
            key={g.title}
            id={g.id}
            style={{ scrollMarginTop: 24, minWidth: 0 }}
          >
            <h3 style={{ color: "#12355b" }}>{g.title}</h3>
            <div style={{ display: "grid", gap: 10 }}>
              {g.items.map(([label, target, examName]) =>
                target.startsWith("/") ? (
                  <a
                    key={label}
                    href={target}
                    style={style}
                    onClick={() =>
                      trackSiteEvent("homepage_practice_link", {
                        target_url: target,
                      })
                    }
                  >
                    {label} →
                  </a>
                ) : (
                  <button
                    key={label}
                    style={style}
                    onClick={() =>
                      jumpToPracticeCategory(target, {
                        examName,
                        setup:
                          target === "Bones"
                            ? () => {
                                setMode("bones");
                                setSelectedSet(null);
                              }
                            : undefined,
                      })
                    }
                  >
                    {label} →
                  </button>
                ),
              )}
            </div>
          </section>
        ))}
      </div>
      <p style={{ marginBottom: 0 }}>
        <a href="/browse-all-practice.html">
          Browse all quizzes, games, and study guides →
        </a>
      </p>
    </section>
  );
}
