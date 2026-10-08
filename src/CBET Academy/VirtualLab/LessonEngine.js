const STORAGE_KEY = "msbGuidedCBETCourseV3";

export function loadCourseState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function saveCourseState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Course progress should never stop the lab from running.
  }
}

export function isReadingReady({
  lesson,
  supplyOn,
  meterMode,
  blackConnected,
  redConnected,
  seriesOpen,
  discharged,
  redJack,
}) {
  if (!lesson || !blackConnected || !redConnected || meterMode !== lesson.mode) {
    return false;
  }

  const requiredJack = lesson.mode === "current" ? "amps" : "vohm";
  if (redJack !== requiredJack) return false;

  switch (lesson.readingRule) {
    case "powered":
      return supplyOn;
    case "poweredSeries":
      return supplyOn && seriesOpen;
    case "unpoweredDischarged":
      return !supplyOn && discharged;
    case "unpowered":
    default:
      return !supplyOn;
  }
}

export function splitMeterReading(reading = "") {
  const match = String(reading).trim().match(/^(.+?)\s*(mA|µF|kΩ|MΩ|Ω|mV|V|A)$/);
  return match ? { value: match[1], unit: match[2] } : { value: reading, unit: "" };
}

export function getDisplayValue({ lesson, ready, meterMode }) {
  if (ready) return lesson?.expected || "0.0";

  switch (meterMode) {
    case "off":
      return "— — —";
    case "resistance":
    case "continuity":
    case "diode":
      return "OL";
    case "voltage":
    case "current":
    case "capacitance":
    default:
      return "0.000";
  }
}
