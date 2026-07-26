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
}) {
  if (!lesson || !blackConnected || !redConnected || meterMode !== lesson.mode) {
    return false;
  }

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
