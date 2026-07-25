const ACADEMY_SLUG = "medication_mastery";
const MODULE_COUNT = 8;
const PATH_KEY = `msb_academy_${ACADEMY_SLUG}_path_v1`;

export function moduleStorageKey(moduleNumber) {
  return `medskillbuilder_${ACADEMY_SLUG}_module${moduleNumber}`;
}

function safeParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function getModuleState(moduleNumber) {
  return safeParse(localStorage.getItem(moduleStorageKey(moduleNumber)), {
    complete: false,
    passed: false,
    score: 0,
    xp: 0,
    completedAt: null,
  });
}

export function saveModuleState(moduleNumber, updates = {}) {
  const current = getModuleState(moduleNumber);
  const next = { ...current, ...updates };

  if (next.passed || next.complete) {
    next.passed = true;
    next.complete = true;
    next.completedAt = next.completedAt || new Date().toISOString();
  }

  localStorage.setItem(moduleStorageKey(moduleNumber), JSON.stringify(next));
  syncAcademyState();
  return next;
}

export function getAcademyState() {
  return safeParse(localStorage.getItem(PATH_KEY), {
    academySlug: ACADEMY_SLUG,
    modulesComplete: {},
    totalXp: 0,
    academyComplete: false,
    updatedAt: null,
  });
}

export function syncAcademyState() {
  const state = getAcademyState();
  let completed = 0;
  let totalXp = 0;

  for (let moduleNumber = 1; moduleNumber <= MODULE_COUNT; moduleNumber += 1) {
    const moduleState = getModuleState(moduleNumber);
    const complete = Boolean(moduleState.complete || moduleState.passed);

    state.modulesComplete[`module${moduleNumber}`] = complete;

    if (complete) completed += 1;
    totalXp += Number(moduleState.xp || 0);
  }

  state.totalXp = totalXp;
  state.academyComplete = completed === MODULE_COUNT;
  state.updatedAt = new Date().toISOString();

  localStorage.setItem(PATH_KEY, JSON.stringify(state));
  return state;
}

export function isModuleUnlocked(moduleNumber) {
  if (moduleNumber <= 1) return true;
  return Boolean(getModuleState(moduleNumber - 1).complete);
}

export function completionPercent() {
  const state = syncAcademyState();
  const completed = Object.values(state.modulesComplete).filter(Boolean).length;
  return Math.round((completed / MODULE_COUNT) * 100);
}

export function completeModule(moduleNumber, score, passingScore = 80, xp = 150) {
  const passed = Number(score) >= Number(passingScore);
  const previous = getModuleState(moduleNumber);

  return saveModuleState(moduleNumber, {
    score,
    passed,
    complete: passed,
    xp: passed && !previous.complete ? xp : previous.xp,
  });
}

export function completeModuleOne(score, passingScore = 80) {
  return completeModule(1, score, passingScore, 150);
}

export function completeModuleTwo(score, passingScore = 80) {
  return completeModule(2, score, passingScore, 175);
}

export function completeModuleThree(score, passingScore = 80) {
  return completeModule(3, score, passingScore, 200);
}

export function completeModuleFour(score, passingScore = 80) {
  return completeModule(4, score, passingScore, 225);
}

export function completeModuleFive(score, passingScore = 80) {
  return completeModule(5, score, passingScore, 250);
}

