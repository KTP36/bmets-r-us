import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CERTIFICATE_DISCLAIMER,
  findCertificateById,
  formatCertificateDate,
  getIssuedCertificates,
  getLearnerName,
  issueCertificate,
  saveLearnerName,
} from "./certificateUtils";
import "./CertificateCenter.css";

const EQUIPMENT_COMPLETION_KEY = "medskillbuilder-elc-completed-v1";
const PENDING_CERTIFICATE_TARGET_KEY = "medskillbuilder-pending-certificate-target";
const CERTIFICATE_EMAIL_KEY = "medskillbuilder-cbet-certificate-email-v1";
const CERTIFICATE_MARKETING_KEY = "medskillbuilder-cbet-marketing-opt-in-v1";
const EQUIPMENT_CERTIFICATE_GROUPS = [
  { key: "equipment-life-support", title: "Life Support Equipment Foundations", devices: ["Defibrillator", "Ventilator", "AED"] },
  { key: "equipment-patient-monitoring", title: "Patient Monitoring Foundations", devices: ["Patient Monitor", "Pulse Oximeter", "Telemetry"] },
  { key: "equipment-infusion", title: "Infusion Systems Foundations", devices: ["Infusion Pump", "Syringe Pump"] },
  { key: "equipment-anesthesia", title: "Anesthesia Equipment Foundations", devices: ["Anesthesia Machine", "Vaporizer"] },
  { key: "equipment-surgical", title: "Surgical Equipment Foundations", devices: ["Electrosurgical Unit", "Surgical Light"] },
  { key: "equipment-respiratory", title: "Respiratory Care Equipment Foundations", devices: ["CPAP/BiPAP", "Suction Regulator"] },
  { key: "equipment-imaging", title: "Medical Imaging Equipment Foundations", devices: ["Ultrasound", "Portable X-ray"] },
  { key: "equipment-test", title: "Biomedical Test Equipment Foundations", devices: ["Digital Multimeter", "Electrical Safety Analyzer", "Defibrillator Analyzer", "Gas Flow Analyzer"] },
];
function getCompletedEquipment() {
  try {
    const saved = JSON.parse(localStorage.getItem(EQUIPMENT_COMPLETION_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch { return []; }
}

function getSavedCertificateEmail() {
  try { return localStorage.getItem(CERTIFICATE_EMAIL_KEY) || ""; }
  catch { return ""; }
}
function saveCertificateEmail(value) {
  try { localStorage.setItem(CERTIFICATE_EMAIL_KEY, value); }
  catch {}
}
function getSavedMarketingOptIn() {
  try { return localStorage.getItem(CERTIFICATE_MARKETING_KEY) === "true"; }
  catch { return false; }
}
function saveMarketingOptIn(value) {
  try { localStorage.setItem(CERTIFICATE_MARKETING_KEY, String(Boolean(value))); }
  catch {}
}
function validCertificateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanCertificateTitle(title = "") {
  return title.replace(/\s*[—–-]\s*Certificate of Completion\s*$/i, "").trim();
}

function CertificateDocument({ certificate, onClose }) {
  const viewerRef = useRef(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const target = viewerRef.current;
      if (!target) return;

      const top = Math.max(
        0,
        target.getBoundingClientRect().top + window.scrollY - 18
      );

      window.scrollTo({
        top,
        left: 0,
        behavior: "auto",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!certificate) return null;
  const displayTitle = cleanCertificateTitle(certificate.title);

  return (
    <div ref={viewerRef} className="certificate-viewer">
      <div className="certificate-toolbar no-print">
        <button type="button" className="certificate-secondary" onClick={onClose}>← Back to Certificates</button>
        <button type="button" className="certificate-primary" onClick={() => window.print()}>Print / Save as PDF</button>
      </div>

      <article className="certificate-document" aria-label={`${displayTitle} certificate`}>
        <div className="certificate-border">
          <div className="certificate-watermark" aria-hidden="true">MSB</div>
          <header className="certificate-heading">
            <div className="certificate-monogram" aria-hidden="true">MSB</div>
            <div>
              <div className="certificate-brand">MedSkillBuilder Academy</div>
              <div className="certificate-brand-subtitle">Biomedical Equipment Education</div>
            </div>
          </header>

          <div className="certificate-kicker">Certificate of Completion</div>
          <h1>{displayTitle}</h1>
          <p className="certificate-presented">This educational achievement is presented to</p>
          <div className="certificate-name">{certificate.learnerName}</div>
          <p className="certificate-recognition">
            In recognition of completing the designated MedSkillBuilder educational curriculum, learning activities, and knowledge checks.
          </p>

          <div className="certificate-lower">
            <div className="certificate-seal" aria-label="MedSkillBuilder educational achievement seal">
              <span>MSB</span>
              <small>Educational Achievement</small>
            </div>

            <div className="certificate-meta">
              <div><span>Date issued</span><strong>{formatCertificateDate(certificate.issuedDate)}</strong></div>
              <div><span>Certificate ID</span><strong>{certificate.id}</strong></div>
              <div><span>Curriculum</span><strong>Version {certificate.curriculumVersion}</strong></div>
            </div>

            <div className="certificate-signature">
              <div className="certificate-signature-line">MedSkillBuilder Academy</div>
              <span>Educational Program Issuer</span>
            </div>
          </div>

          <div className="certificate-education-label">Educational Achievement — Not Professional Certification</div>
          <p className="certificate-disclaimer">{CERTIFICATE_DISCLAIMER}</p>
        </div>
      </article>
    </div>
  );
}

function CertificateCard({ item, issued, onIssue, onView, cardRef, highlighted }) {
  return (
    <article ref={cardRef} tabIndex="-1" className={`certificate-card ${item.unlocked ? "unlocked" : "locked"} ${highlighted ? "certificate-target-highlight" : ""}`}>
      <div className="certificate-card-icon" aria-hidden="true">{item.unlocked ? "📜" : "🔒"}</div>
      <div className="certificate-card-copy">
        <span>{item.type}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {issued && <small>Issued {formatCertificateDate(issued.issuedDate)} · {issued.id}</small>}
      </div>
      <div className="certificate-card-action">
        {!item.unlocked ? (
          <button type="button" disabled>Complete requirements to unlock</button>
        ) : issued ? (
          <button type="button" className="certificate-primary" onClick={() => onView(issued)}>View Certificate</button>
        ) : (
          <button type="button" className="certificate-primary" onClick={() => onIssue(item)}>
            Open &amp; Issue Certificate
          </button>
        )}
      </div>
    </article>
  );
}

export default function CertificateCenter({ modules, onExit, targetCertificateKey = null, onTargetHandled }) {
  const initialTargetKey = targetCertificateKey || sessionStorage.getItem(PENDING_CERTIFICATE_TARGET_KEY);
  const [learnerName, setLearnerName] = useState(() => getLearnerName());
  const [learnerEmail, setLearnerEmail] = useState(() => getSavedCertificateEmail());
  const [marketingOptIn, setMarketingOptIn] = useState(() => getSavedMarketingOptIn());
  const [submittingCertificate, setSubmittingCertificate] = useState(false);
  const [issuedCertificates, setIssuedCertificates] = useState(() => getIssuedCertificates());
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [verificationId, setVerificationId] = useState("");
  const [verificationResult, setVerificationResult] = useState(undefined);
  const [message, setMessage] = useState("");
  const [pendingIssue, setPendingIssue] = useState(null);
  const [highlightedKey, setHighlightedKey] = useState(initialTargetKey);
  const certificateRefs = useRef({});
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const completedEquipment = useMemo(() => getCompletedEquipment(), []);

  const certificateItems = useMemo(() => {
    const moduleItems = modules.map((module) => ({
      key: `module-${module.number}`,
      type: `Module ${module.number}`,
      title: `${module.title} — Certificate of Completion`,
      description: `Recognizes completion of the MedSkillBuilder ${module.title} educational module.`,
      unlocked: Boolean(module.complete),
    }));

    const equipmentItems = EQUIPMENT_CERTIFICATE_GROUPS.map((group) => ({
      key: group.key,
      type: "Equipment learning pathway",
      title: `${group.title} — Certificate of Completion`,
      description: `Recognizes completion of all ${group.devices.length} equipment overviews in this learning pathway.`,
      unlocked: group.devices.every((deviceName) => completedEquipment.includes(deviceName)),
    }));
    const allEquipmentDevices = EQUIPMENT_CERTIFICATE_GROUPS.flatMap((group) => group.devices);
    return [
      ...equipmentItems,
      {
        key: "equipment-all-complete",
        type: "Equipment Learning Center",
        title: "Biomedical Equipment Foundations — Certificate of Completion",
        description: "Recognizes completion of all 20 MedSkillBuilder Equipment Learning Center overviews.",
        unlocked: allEquipmentDevices.every((deviceName) => completedEquipment.includes(deviceName)),
      },
      ...moduleItems,
      {
        key: "academy-complete",
        type: "Academy curriculum",
        title: "MedSkillBuilder Academy Curriculum — Certificate of Completion",
        description: "Recognizes completion of all nine MedSkillBuilder Academy educational modules.",
        unlocked: modules.length === 9 && modules.every((module) => module.complete),
      },
    ];
  }, [modules, completedEquipment]);

  useEffect(() => {
    const requestedKey = targetCertificateKey || sessionStorage.getItem(PENDING_CERTIFICATE_TARGET_KEY);
    if (!requestedKey) return;

    setHighlightedKey(requestedKey);
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    let attempts = 0;
    let retryTimer;
    let settleTimer;

    const scrollToCertificate = () => {
      const target = certificateRefs.current[requestedKey];
      if (!target && attempts < 30) {
        attempts += 1;
        retryTimer = window.setTimeout(scrollToCertificate, 100);
        return;
      }
      if (!target) return;

      window.requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect();
        const top = Math.max(0, window.scrollY + rect.top - 110);
        window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
        settleTimer = window.setTimeout(() => {
          const settledRect = target.getBoundingClientRect();
          const correction = settledRect.top - 110;
          if (Math.abs(correction) > 12) window.scrollBy({ top: correction, behavior: "auto" });
          target.focus?.({ preventScroll: true });
          sessionStorage.removeItem(PENDING_CERTIFICATE_TARGET_KEY);
          onTargetHandled?.();
        }, reduceMotion ? 80 : 850);
      });
    };

    retryTimer = window.setTimeout(scrollToCertificate, 250);
    const clearHighlight = window.setTimeout(() => setHighlightedKey(null), 6000);
    return () => {
      window.clearTimeout(retryTimer);
      window.clearTimeout(settleTimer);
      window.clearTimeout(clearHighlight);
    };
  }, [targetCertificateKey, onTargetHandled]);

  function updateName(event) {
    const value = event.target.value;
    setLearnerName(value);
    saveLearnerName(value);
    setMessage("");
  }

  function handleIssue(item) {
    setPendingIssue(item);
    setMessage("");
  }

  function createCertificate(item) {
    try {
      const certificate = issueCertificate({
        key: item.key,
        title: item.title,
        learnerName,
      });
      setIssuedCertificates(getIssuedCertificates());
      setPendingIssue(null);
      setActiveCertificate(certificate);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function submitPendingCertificate(event) {
    event.preventDefault();
    const name = learnerName.trim();
    const email = learnerEmail.trim();

    if (!name) {
      setMessage("Enter the learner’s full name to create the certificate.");
      nameInputRef.current?.focus();
      return;
    }
    if (!validCertificateEmail(email)) {
      setMessage("Enter a valid email address to unlock the certificate.");
      emailInputRef.current?.focus();
      return;
    }
    if (!pendingIssue || submittingCertificate) return;

    setSubmittingCertificate(true);
    setMessage("Saving your completion…");

    const submission = new FormData();
    submission.append("name", name);
    submission.append("email", email);
    submission.append("activity", "CBET Academy");
    submission.append("lead_type", "Academy Graduate / Certificate Claim");
    submission.append("certificate_title", pendingIssue.title);
    submission.append("certificate_key", pendingIssue.key);
    submission.append("marketing_opt_in", marketingOptIn ? "Yes" : "No");
    submission.append("_source", "academy-certificate");
    submission.append("_subject", `MedSkillBuilder CBET Certificate Claim - ${pendingIssue.title}`);
    submission.append("message", [
      `Name: ${name}`,
      `Email: ${email}`,
      "Activity: CBET Academy",
      "Lead Type: Academy Graduate / Certificate Claim",
      `Certificate: ${pendingIssue.title}`,
      `Certificate Key: ${pendingIssue.key}`,
      `Marketing Opt-In: ${marketingOptIn ? "Yes" : "No"}`,
      "This email was submitted from the CBET Academy Certificate Center."
    ].join("\n"));

    try {
      const response = await fetch("https://formspree.io/f/xgonbzaj", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: submission,
      });
      if (!response.ok) throw new Error("submit_failed");

      saveLearnerName(name);
      saveCertificateEmail(email);
      saveMarketingOptIn(marketingOptIn);
      createCertificate(pendingIssue);
    } catch {
      setMessage("We could not save your completion. Please check your connection and try again.");
    } finally {
      setSubmittingCertificate(false);
    }
  }

  function verifyCertificate(event) {
    event.preventDefault();
    setVerificationResult(findCertificateById(verificationId));
  }

  if (activeCertificate) {
    return <CertificateDocument certificate={activeCertificate} onClose={() => setActiveCertificate(null)} />;
  }

  const unlockedCount = certificateItems.filter((item) => item.unlocked).length;

  return (
    <main className="certificate-center">
      <section className="certificate-center-hero">
        <div className="certificate-center-shell">
          <button type="button" className="certificate-back" onClick={onExit}>← Back to Academy</button>
          <span className="certificate-eyebrow">Educational recognition</span>
          <h1>Certificates of Completion</h1>
          <p>
            Celebrate completed learning milestones. These documents recognize MedSkillBuilder curriculum completion only and are not CBET certifications or professional credentials.
          </p>
          <div className="certificate-warning">
            <strong>Important:</strong> A MedSkillBuilder Certificate of Completion does not confer CBET status and is not issued or endorsed by a certification organization.
          </div>
        </div>
      </section>

      <section className="certificate-center-shell certificate-center-content">
        <article className="certificate-name-panel">
          <div>
            <span className="certificate-eyebrow">Name on certificate</span>
            <h2>Enter the learner’s full name</h2>
            <p>The saved name will appear exactly as entered on newly issued certificates. Your email is requested when you issue a new certificate so MedSkillBuilder can record the completion.</p>
          </div>
          <label>
            <span>Full name</span>
            <input ref={nameInputRef} value={learnerName} onChange={updateName} maxLength={80} placeholder="Enter full name" autoComplete="name" />
          </label>
          {message && <p className="certificate-message" role="alert">{message}</p>}
        </article>

        <div className="certificate-section-heading">
          <div>
            <span className="certificate-eyebrow">Your achievements</span>
            <h2>{unlockedCount} of {certificateItems.length} certificates unlocked</h2>
          </div>
        </div>

        <div className="certificate-list">
          {certificateItems.map((item) => (
            <CertificateCard
              key={item.key}
              item={item}
              issued={issuedCertificates[item.key]}
              onIssue={handleIssue}
              onView={setActiveCertificate}
              cardRef={(node) => { if (node) certificateRefs.current[item.key] = node; }}
              highlighted={highlightedKey === item.key}
            />
          ))}
        </div>

        <article className="certificate-verification">
          <div>
            <span className="certificate-eyebrow">Local verification</span>
            <h2>Verify a certificate issued on this device</h2>
            <p>
              Enter a certificate ID to confirm that it exists in this browser’s saved Academy records. Public online verification requires a future server-side database and is not included in this local version.
            </p>
          </div>
          <form onSubmit={verifyCertificate}>
            <label htmlFor="certificate-id">Certificate ID</label>
            <div>
              <input id="certificate-id" value={verificationId} onChange={(event) => setVerificationId(event.target.value)} placeholder="MSB-2026-XXXXXXX" />
              <button type="submit" className="certificate-primary">Verify</button>
            </div>
          </form>
          {verificationResult === null && (
            <div className="certificate-verification-result invalid" role="status">
              <strong>Not found</strong>
              <span>No matching certificate exists in this browser’s saved records.</span>
            </div>
          )}
          {verificationResult && (
            <div className="certificate-verification-result valid" role="status">
              <strong>Locally verified</strong>
              <span>{verificationResult.learnerName} · {verificationResult.title} · Issued {formatCertificateDate(verificationResult.issuedDate)}</span>
              <button type="button" onClick={() => setActiveCertificate(verificationResult)}>View certificate</button>
            </div>
          )}
        </article>
      </section>

      {pendingIssue && (
        <div className="certificate-issue-backdrop" role="presentation">
          <section className="certificate-issue-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-issue-title">
            <button type="button" className="certificate-issue-close" onClick={() => { setPendingIssue(null); setMessage(""); }} aria-label="Close">×</button>
            <div className="certificate-issue-icon" aria-hidden="true">📜</div>
            <span className="certificate-eyebrow">Certificate unlocked</span>
            <h2 id="certificate-issue-title">Unlock your certificate</h2>
            <p>{pendingIssue.title}</p>
            <form onSubmit={submitPendingCertificate}>
              <label htmlFor="certificate-learner-name">Full name as it should appear</label>
              <input
                id="certificate-learner-name"
                ref={nameInputRef}
                value={learnerName}
                onChange={updateName}
                maxLength={80}
                placeholder="Enter full name"
                autoComplete="name"
                autoFocus
              />

              <label htmlFor="certificate-learner-email">Email address</label>
              <input
                id="certificate-learner-email"
                ref={emailInputRef}
                type="email"
                value={learnerEmail}
                onChange={(event) => { setLearnerEmail(event.target.value); setMessage(""); }}
                maxLength={120}
                placeholder="you@example.com"
                autoComplete="email"
              />

              <label style={{display:"flex",gap:9,alignItems:"flex-start",fontSize:12,lineHeight:1.45,color:"#64748b"}}>
                <input
                  type="checkbox"
                  checked={marketingOptIn}
                  onChange={(event) => setMarketingOptIn(event.target.checked)}
                  style={{marginTop:3}}
                />
                <span>Send me MedSkillBuilder learning resources, Academy announcements, and occasional partner offers. Optional.</span>
              </label>

              <p style={{fontSize:12,color:"#64748b",margin:"4px 0 0"}}>
                Your email stays private and is used to record this MedSkillBuilder certificate claim.
              </p>

              {message && <p className="certificate-message" role="status">{message}</p>}
              <button type="submit" className="certificate-primary" disabled={submittingCertificate}>
                {submittingCertificate ? "Saving Completion…" : "Unlock & Open Certificate"}
              </button>
            </form>
            <small>Educational Certificate of Completion — not a CBET certification or professional credential.</small>
          </section>
        </div>
      )}
    </main>
  );
}
