export function loadCourseState() {
  try {
    return JSON.parse(localStorage.getItem("msbGuidedCBETCourseV3")) || {};
  } catch {
    return {};
  }
}

export function saveCourseState(state) {
  localStorage.setItem("msbGuidedCBETCourseV3", JSON.stringify(state));
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
  if (!blackConnected || !redConnected || meterMode !== lesson.mode) return false;

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
  if (ready) return lesson.expected;
  if (meterMode === "off") return "— — —";
  return "0.0";
}
