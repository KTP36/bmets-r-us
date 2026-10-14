import logo from "../assets/logo.png";
export default function HeroSection({
  isSmallScreen,
  jumpToPracticeCategory,
  setMode,
  setSelectedSet,
}) {
  const choices = [
    [
      "Medical Terminology",
      "🧠",
      () =>
        jumpToPracticeCategory("Terminology", {
          examName: "Medical Terminology Practice",
        }),
      "Test your knowledge of medical terms",
    ],
    [
      "Anatomy Practice",
      "🫀",
      () =>
        jumpToPracticeCategory("Anatomy", {
          setup: () => {
            setMode("organs");
            setSelectedSet(null);
          },
        }),
      "Learn body structures through visual practice",
    ],
    [
      "Certification Prep",
      "📝",
      "#home-certification",
      "Explore CBET, RN, TEAS, and CRES practice",
    ],
    [
      "Academies",
      "🎓",
      "#home-academies",
      "Follow a guided healthcare learning path",
    ],
  ];
  return (
    <section
      aria-labelledby="medskill-home-heading"
      style={{
        textAlign: "center",
        padding: isSmallScreen ? "28px 16px" : "36px 30px",
        borderRadius: 26,
        marginBottom: 18,
        background: "linear-gradient(135deg,#12355b,#1d6fa5)",
        color: "white",
      }}
    >
      <style>
        {
          ".home-start-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:24px}.home-start-choice{box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;min-width:0;padding:20px 14px;border:1px solid #bfdbfe;border-radius:18px;background:#fff;color:#12355b;text-decoration:none;font:inherit;cursor:pointer}.home-start-choice:hover{background:#eff6ff}.home-start-choice:focus-visible{outline:3px solid #facc15;outline-offset:4px}@media(max-width:900px){.home-start-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:420px){.home-start-grid{gap:10px}.home-start-choice{padding:16px 10px}}"
        }
      </style>
      <img
        src={logo}
        alt="MedSkillBuilder"
        style={{ width: 120, borderRadius: 16 }}
      />
      <p>Learn faster. Remember longer.</p>
      <h1
        id="medskill-home-heading"
        style={{
          fontSize: isSmallScreen ? 32 : 44,
          lineHeight: 1.12,
          margin: "12px auto",
          maxWidth: 900,
          color: "white",
        }}
      >
        Build Real Healthcare Skills Through Practice
      </h1>
      <p
        style={{
          fontSize: 18,
          lineHeight: 1.5,
          maxWidth: 760,
          margin: "16px auto",
        }}
      >
        Free healthcare lessons, interactive quizzes, and certification
        practice. Choose a topic and start learning.
      </p>
      <div className="home-start-grid">
        {choices.map(([label, icon, target, detail]) => {
          const content = (
            <>
              <span aria-hidden="true" style={{ fontSize: 28 }}>
                {icon}
              </span>
              <strong style={{ fontSize: 18 }}>{label}</strong>
              <span style={{ fontSize: 14, lineHeight: 1.4 }}>{detail}</span>
            </>
          );
          return typeof target === "string" ? (
            <a key={label} className="home-start-choice" href={target}>
              {content}
            </a>
          ) : (
            <button key={label} className="home-start-choice" onClick={target}>
              {content}
            </button>
          );
        })}
      </div>
      <p>
        <a
          href="/browse-all-practice.html"
          style={{ color: "white", fontWeight: 800 }}
        >
          Browse All Practice →
        </a>
      </p>
      <p style={{ fontSize: 14, marginBottom: 0 }}>
        ✓ No sign-up required · ✓ Practice at your own pace · ✓ Built by a
        healthcare professional
      </p>
    </section>
  );
}
