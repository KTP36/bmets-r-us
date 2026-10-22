const STORAGE_KEY = "msbCbetAcademyStateV2";

const CBET_MISSION_XP_CAPS = {
  1: 250,
  2: 350,
  3: 350,
  4: 450,
  5: 300,
  6: 350,
  7: 350,
  8: 450,
  9: 400,
  10: 350,
};

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
  missionXp: {},
  modules: {},
  missionProgress: {
    1: defaultMissionProgress,
    2: { ...defaultMissionProgress },
    3: { ...defaultMissionProgress },
    4: { ...defaultMissionProgress },
    10: { ...defaultMissionProgress },
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
    missionXp: { ...defaultState.missionXp, ...(saved.missionXp || {}) },
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
      3: {
        ...defaultMissionProgress,
        ...(saved.missionProgress?.[3] || {}),
      },
      4: {
        ...defaultMissionProgress,
        ...(saved.missionProgress?.[4] || {}),
      },
      10: {
        ...defaultMissionProgress,
        ...(saved.missionProgress?.[10] || {}),
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

  const missionMatch = String(awardKey).match(/^mission(\d+)-/);
  const missionNumber = missionMatch ? Number(missionMatch[1]) : null;
  const cap = missionNumber ? CBET_MISSION_XP_CAPS[missionNumber] : null;
  const currentMissionXp = missionNumber ? Number(state.missionXp?.[missionNumber] || 0) : 0;
  const appliedAmount = cap == null
    ? amount
    : Math.max(0, Math.min(amount, cap - currentMissionXp));

  state.xp += appliedAmount;
  state.xpAwards = { ...awards, [awardKey]: true };
  state.xpAwardAmounts = { ...(state.xpAwardAmounts || {}), [awardKey]: appliedAmount };
  if (missionNumber) {
    state.missionXp = {
      ...(state.missionXp || {}),
      [missionNumber]: currentMissionXp + appliedAmount,
    };
  }
  saveCbetAcademyState(state);
  return state;
}

export function completeCbetModule(number, score, xp) {
  const state = getCbetAcademyState();
  const previous = state.modules?.[number] || {};
  const firstPass = !previous.complete && score >= 80;
  const cap = CBET_MISSION_XP_CAPS[number] ?? xp;
  const currentMissionXp = Number(state.missionXp?.[number] || 0);
  const completionAward = firstPass ? Math.max(0, cap - currentMissionXp) : 0;

  const next = {
    ...state,
    xp: state.xp + completionAward,
    missionXp: {
      ...(state.missionXp || {}),
      [number]: currentMissionXp + completionAward,
    },
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


export function beginMissionReview(number = 1) {
  const state = getCbetAcademyState();
  const previousModule = state.modules?.[number] || {};

  state.modules = {
    ...state.modules,
    [number]: {
      ...previousModule,
      timesReviewed: (previousModule.timesReviewed || 0) + 1,
      lastReviewed: localDateKey(),
    },
  };

  state.missionProgress = {
    ...state.missionProgress,
    [number]: { ...defaultMissionProgress },
  };

  saveCbetAcademyState(state);
  return state;
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
  const completed = Array.from({ length: 10 }, (_, i) => i + 1)
    .filter((n) => state.modules?.[n]?.complete).length;
  return Math.round((completed / 10) * 100);
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
    badges: completedModules.length, // legacy key used by the UI; represents earned competencies
    bestMissionOneScore: state.modules?.[1]?.bestScore || 0,
    lessonsCompleted: lessonAwards,
    scenariosCompleted: scenarioAwards,
    serviceCallsCompleted: getCompletedServiceCalls().length,
    currentStreak: state.streak?.current || 0,
    longestStreak: state.streak?.longest || 0,
    activeDays: state.streak?.visitDates?.length || 0,
  };
}

// Hospital service calls are separate from mission exercises.
export function getCompletedServiceCalls() {
  if (typeof window === "undefined") return [];
  try {
    const saved = JSON.parse(window.localStorage.getItem("cbetCompletedServiceCalls") || "[]");
    return Array.isArray(saved) ? [...new Set(saved.filter((id) => typeof id === "string" && id.length > 0))] : [];
  } catch { return []; }
}
