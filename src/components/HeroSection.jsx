import logo from "../assets/logo.png";
import Button from "./ui/Button";

export default function HeroSection({ isSmallScreen, jumpToPracticeCategory }) {
  return (
    <section
      aria-labelledby="medskill-home-heading"
      style={{
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        marginBottom: 24,
        padding: isSmallScreen ? "30px 18px 26px" : "38px 40px 28px",
        borderRadius: isSmallScreen ? 24 : 30,
        background: "linear-gradient(135deg, #12355b 0%, #1d6fa5 56%, #58b4d8 100%)",
        color: "white",
        boxShadow: "0 18px 42px rgba(18,53,91,0.26)",
        border: "1px solid rgba(255,255,255,0.22)"
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          top: -210,
          right: -90
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "rgba(88,180,216,0.13)",
          bottom: -170,
          left: -60
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1120, margin: "0 auto" }}>
        <img
          src={logo}
          alt="MedSkillBuilder"
          style={{
            width: isSmallScreen ? "min(138px, 44vw)" : 145,
            height: "auto",
            display: "block",
            margin: isSmallScreen ? "0 auto 12px" : "0 auto 12px",
            borderRadius: 18,
            boxShadow: "0 12px 28px rgba(8,47,87,0.26)"
          }}
        />

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "7px 13px",
            borderRadius: 999,
            marginBottom: 8,
            background: "rgba(255,255,255,0.14)",
            border: "1px solid rgba(255,255,255,0.28)",
            color: "#eff6ff",
            fontSize: isSmallScreen ? 12 : 13,
            fontWeight: 900,
            letterSpacing: 0.7,
            textTransform: "uppercase"
          }}
        >
          Learn faster. Remember longer.
        </div>

        <h1
          id="medskill-home-heading"
          style={{
            margin: 0,
            color: "white",
            fontSize: isSmallScreen ? 34 : 48,
            lineHeight: 1.08,
            letterSpacing: isSmallScreen ? -0.7 : -1.2,
            fontWeight: 950,
            textShadow: "0 3px 16px rgba(8,47,87,0.25)"
          }}
        >
          Build Real Healthcare Skills Through Practice
        </h1>

        <p
          style={{
            maxWidth: 920,
            margin: isSmallScreen ? "16px auto 0" : "20px auto 0",
            color: "rgba(255,255,255,0.94)",
            fontSize: isSmallScreen ? 16 : 20,
            lineHeight: 1.55,
            fontWeight: 600
          }}
        >
          Explore interactive healthcare academies, realistic clinical simulations, certification prep, 
          and interactive study tools all completely free. Medication mastery, CBET and biomed, anatomy, medical 
          terminology, EKG, ABG, RN,TEAS, CRES, and much more.
        </p>

        <style>
          {`
            .medskill-hero-action {
              min-height: 58px;
              min-width: 230px;
              transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
            }

            .medskill-hero-action:hover {
              transform: translateY(-3px);
              filter: brightness(1.03);
            }

            .medskill-hero-action:focus-visible {
              outline: 3px solid rgba(255,255,255,0.95);
              outline-offset: 3px;
            }

            @media (max-width: 760px) {
              .medskill-hero-action {
                width: 100%;
                min-width: 0;
              }
            }
          `}
        </style>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            gap: isSmallScreen ? 10 : 14,
            flexWrap: "wrap",
            marginTop: isSmallScreen ? 26 : 32
          }}
        >
          <Button
            onClick={() => jumpToPracticeCategory("CBET", { examName: "CBET Practice" })}
            className="medskill-hero-action"
            style={{
              padding: isSmallScreen ? "15px 18px" : "17px 30px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.7)",
              background: "linear-gradient(135deg, #ffffff, #dbeafe)",
              color: "#12355b",
              fontWeight: 950,
              fontSize: isSmallScreen ? 15 : 17,
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 12px 28px rgba(8,47,87,0.30)"
            }}
          >
            ⚡ Start CBET Practice
          </Button>

          <a
            href="/browse-all-practice.html"
            className="medskill-hero-action"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isSmallScreen ? "15px 18px" : "17px 26px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.12)",
              color: "white",
              textDecoration: "none",
              fontWeight: 900,
              fontSize: isSmallScreen ? 14 : 16,
              textAlign: "center",
              boxShadow: "0 10px 24px rgba(8,47,87,0.18)",
              border: "1px solid rgba(255,255,255,0.48)"
            }}
          >
            🚀 Explore All Practice Tools
          </a>

          <a
            href="/recommended-study-gear.html"
            className="medskill-hero-action"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isSmallScreen ? "15px 18px" : "17px 26px",
              borderRadius: 999,
              background: "rgba(10,96,64,0.38)",
              color: "white",
              textDecoration: "none",
              fontWeight: 900,
              fontSize: isSmallScreen ? 14 : 16,
              textAlign: "center",
              boxShadow: "0 10px 24px rgba(8,47,87,0.18)",
              border: "1px solid rgba(187,247,208,0.48)"
            }}
          >
            🛒 Recommended Study Gear
          </a>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: isSmallScreen ? 12 : 24,
            flexWrap: "wrap",
            marginTop: isSmallScreen ? 18 : 16,
            color: "rgba(255,255,255,0.88)",
            fontSize: isSmallScreen ? 12 : 14,
            fontWeight: 800
          }}
        >
          <span><span aria-hidden="true" style={{ fontSize: isSmallScreen ? 15 : 17 }}>✓</span> No sign-up required</span>
          <span><span aria-hidden="true" style={{ fontSize: isSmallScreen ? 15 : 17 }}>✓</span> Practice at your own pace</span>
          <span><span aria-hidden="true" style={{ fontSize: isSmallScreen ? 15 : 17 }}>✓</span> Built by a healthcare professional</span>
        </div>
      </div>
    </section>
  );
}
