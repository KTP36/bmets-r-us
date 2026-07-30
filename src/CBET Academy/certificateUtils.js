const CERTIFICATE_STORAGE_KEY = "msbCbetAcademyCertificatesV1";
const LEARNER_NAME_KEY = "msbCbetAcademyLearnerNameV1";

export const CERTIFICATE_DISCLAIMER =
  "This Certificate of Completion recognizes completion of MedSkillBuilder educational curriculum. It is not a professional certification, license, or credential and does not confer Certified Biomedical Equipment Technician (CBET) status or any other professional designation. MedSkillBuilder is an independent educational platform and is not affiliated with, endorsed by, or issuing credentials on behalf of AAMI, CABMET, or any certification organization. Completion does not replace employer training requirements or professional certification examinations.";

function readJson(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(window.localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getLearnerName() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(LEARNER_NAME_KEY) || "";
}

export function saveLearnerName(name) {
  const cleanName = String(name || "").replace(/\s+/g, " ").trim().slice(0, 80);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LEARNER_NAME_KEY, cleanName);
  }
  return cleanName;
}

export function getIssuedCertificates() {
  return readJson(CERTIFICATE_STORAGE_KEY, {});
}

function hashText(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).toUpperCase().padStart(7, "0").slice(0, 7);
}

function dateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatCertificateDate(value) {
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function issueCertificate({ key, title, learnerName, curriculumVersion = "1.0" }) {
  const name = saveLearnerName(learnerName);
  if (!name) throw new Error("Enter the learner name before issuing a certificate.");

  const certificates = getIssuedCertificates();
  if (certificates[key]) return certificates[key];

  const issuedDate = dateKey();
  const fingerprint = hashText(`${key}|${name}|${issuedDate}|${title}`);
  const year = issuedDate.slice(0, 4);
  const certificate = {
    key,
    title,
    learnerName: name,
    issuedDate,
    curriculumVersion,
    id: `MSB-${year}-${fingerprint}`,
  };

  writeJson(CERTIFICATE_STORAGE_KEY, {
    ...certificates,
    [key]: certificate,
  });
  return certificate;
}

export function findCertificateById(id) {
  const normalized = String(id || "").trim().toUpperCase();
  return Object.values(getIssuedCertificates()).find(
    (certificate) => certificate.id.toUpperCase() === normalized
  ) || null;
}
