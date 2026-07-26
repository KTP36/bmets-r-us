const STORAGE_KEY = "msbCbetAcademyStateV2";

const defaultMissionProgress = {
  phase: "briefing",
  lessonIndex: 0,
  completedLessons: [],
  scenarioIndex: 0,
  completedScenarios: [],
  quizIndex: 0,
};

const defaultState = {
  xp: 0,
  modules: {},
  missionProgress: {
    1: defaultMissionProgress,
    2: { ...defaultMissionProgress },
  },
  finalBoard: { passed: false, bestScore: 0 },
  streak: {
    current: 0,
    longest: 0,
    lastVisit: "",
    visitDates: [],
  },
};

function mergeState(saved = {}) {
  return {
    ...defaultState,
    ...saved,
    modules: { ...defaultState.modules, ...(saved.modules || {}) },
    missionProgress: {
      ...defaultState.missionProgress,
      ...(saved.missionProgress || {}),
      1: {
        ...defaultMissionProgress,
        ...(saved.missionProgress?.[1] || {}),
      },
      2: {
        ...defaultMissionProgress,
        ...(saved.missionProgress?.[2] || {}),
      },
    },
    finalBoard: { ...defaultState.finalBoard, ...(saved.finalBoard || {}) },
    streak: { ...defaultState.streak, ...(saved.streak || {}) },
  };
}

export function getCbetAcademyState() {
  if (typeof window === "undefined") return defaultState;
  try {
    return mergeState(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {});
  } catch {
    return defaultState;
  }
}

export function saveCbetAcademyState(state) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mergeState(state)));
}

export function getCbetModuleState(number) {
  return getCbetAcademyState().modules?.[number] || {
    complete: false,
    bestScore: 0,
    xpAwarded: false,
  };
}

export function isCbetModuleUnlocked(number) {
  if (number === 1) return true;
  return Boolean(getCbetModuleState(number - 1).complete);
}

export function getMissionProgress(number = 1) {
  const state = getCbetAcademyState();
  return state.missionProgress?.[number] || defaultMissionProgress;
}

export function saveMissionProgress(number, partial) {
  const state = getCbetAcademyState();
  state.missionProgress = {
    ...state.missionProgress,
    [number]: {
      ...(state.missionProgress?.[number] || defaultMissionProgress),
      ...partial,
    },
  };
  saveCbetAcademyState(state);
  return state;
}

export function awardCbetXp(amount, awardKey) {
  const state = getCbetAcademyState();
  const awards = state.xpAwards || {};
  if (awards[awardKey]) return state;

  state.xp += amount;
  state.xpAwards = { ...awards, [awardKey]: true };
  saveCbetAcademyState(state);
  return state;
}

export function completeCbetModule(number, score, xp) {
  const state = getCbetAcademyState();
  const previous = state.modules?.[number] || {};
  const firstPass = !previous.complete && score >= 80;

  const next = {
    ...state,
    xp: state.xp + (firstPass ? xp : 0),
    modules: {
      ...state.modules,
      [number]: {
        complete: previous.complete || score >= 80,
        bestScore: Math.max(previous.bestScore || 0, score),
        xpAwarded: previous.xpAwarded || firstPass,
      },
    },
    missionProgress: {
      ...state.missionProgress,
      [number]: {
        ...(state.missionProgress?.[number] || defaultMissionProgress),
        phase: score >= 80 ? "complete" : "quiz",
        quizIndex: 0,
      },
    },
  };

  saveCbetAcademyState(next);
  return next;
}

export function resetMissionProgress(number = 1) {
  const state = getCbetAcademyState();
  state.missionProgress = {
    ...state.missionProgress,
    [number]: { ...defaultMissionProgress },
  };
  saveCbetAcademyState(state);
  return state;
}

export function cbetCompletionPercent() {
  const state = getCbetAcademyState();
  const completed = Array.from({ length: 9 }, (_, i) => i + 1)
    .filter((n) => state.modules?.[n]?.complete).length;
  return Math.round((completed / 9) * 100);
}


function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function daysBetween(dateA, dateB) {
  const a = new Date(`${dateA}T12:00:00`);
  const b = new Date(`${dateB}T12:00:00`);
  return Math.round((b - a) / 86400000);
}

export function registerCbetVisit() {
  const state = getCbetAcademyState();
  const today = localDateKey();
  const previous = state.streak?.lastVisit || "";

  if (previous !== today) {
    const gap = previous ? daysBetween(previous, today) : null;
    const current =
      gap === 1 ? (state.streak?.current || 0) + 1 :
      gap === 0 ? (state.streak?.current || 1) :
      1;

    const visitDates = Array.from(
      new Set([...(state.streak?.visitDates || []), today])
    ).slice(-60);

    state.streak = {
      current,
      longest: Math.max(state.streak?.longest || 0, current),
      lastVisit: today,
      visitDates,
    };

    saveCbetAcademyState(state);
  }

  return state.streak;
}

export function getCbetStats() {
  const state = getCbetAcademyState();
  const completedModules = Object.values(state.modules || {}).filter((module) => module.complete);
  const lessonAwards = Object.keys(state.xpAwards || {}).filter((key) => key.startsWith("mission1-lesson-")).length;
  const scenarioAwards = Object.keys(state.xpAwards || {}).filter((key) => key.startsWith("mission1-scenario-")).length;

  return {
    xp: state.xp || 0,
    completedMissions: completedModules.length,
    badges: completedModules.length,
    bestMissionOneScore: state.modules?.[1]?.bestScore || 0,
    lessonsCompleted: lessonAwards,
    scenariosCompleted: scenarioAwards,
    currentStreak: state.streak?.current || 0,
    longestStreak: state.streak?.longest || 0,
    activeDays: state.streak?.visitDates?.length || 0,
  };
}
