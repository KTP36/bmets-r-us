import React from "react";

export default function CArmPartnerBanner({
  trackSiteEvent,
  isSmallScreen = false
}) {
  const partnerUrl = "https://www.carmassociates.com";

  const handlePartnerClick = () => {
    if (typeof trackSiteEvent === "function") {
      trackSiteEvent("carm_partner_click", {
        target_url: partnerUrl,
        source: "homepage_prime_partner_banner",
        partner_name: "C-Arm Associates"
      });
    }
  };

  return (
    <section
      aria-label="Founding Industry Partner"
      style={{
        maxWidth: 1180,
        margin: "0 auto 16px",
        borderRadius: 18,
        border: "1px solid #e5e7eb",
        background: "#ffffff",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
        overflow: "hidden"
      }}
    >
      <a
        href={partnerUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handlePartnerClick}
        style={{
          display: "grid",
          gridTemplateColumns: isSmallScreen
            ? "1fr"
            : "95px minmax(0,1fr) auto",
          alignItems: "center",
          gap: isSmallScreen ? 14 : 18,
          padding: isSmallScreen ? "16px" : "16px 22px",
          color: "#12355b",
          textDecoration: "none"
        }}
      >
        <img
          src="/carm-associates-logo.png"
          alt="C-Arm Associates logo"
          style={{
            width: isSmallScreen ? 72 : 82,
            height: "auto",
            justifySelf: "center",
            display: "block"
          }}
        />

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              display: "inline-block",
              padding: "5px 11px",
              borderRadius: 999,
              background: "#f3f4f6",
              color: "#991b1b",
              fontWeight: 900,
              fontSize: 11,
              letterSpacing: 0.6,
              textTransform: "uppercase",
              marginBottom: 6
            }}
          >
            ⭐ Founding Industry Partner
          </div>

          <div
            style={{
              fontSize: isSmallScreen ? 22 : 28,
              fontWeight: 900,
              color: "#12355b",
              marginBottom: 4,
              lineHeight: 1.15
            }}
          >
            C-Arm Associates
          </div>

          <div
            style={{
              color: "#475569",
              fontSize: isSmallScreen ? 14 : 15,
              lineHeight: 1.45,
              fontWeight: 600
            }}
          >
            Nationwide GE OEC C-Arm service, parts sales, and premium refurbished systems for hospitals, surgery centers, and imaging facilities. 
            Use coupon code MedSkillBuilder20 and receive a 20% discount on your next parts order!
          </div>
        </div>

        <div
          style={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: isSmallScreen ? "100%" : 175,
            padding: "12px 18px",
            borderRadius: 999,
            background: "#991b1b",
            color: "#fff",
            fontWeight: 900,
            fontSize: 14,
            whiteSpace: "nowrap",
            boxShadow: "0 6px 16px rgba(153,27,27,.20)"
          }}
        >
          Visit Website →
        </div>
      </a>
    </section>
  );
}