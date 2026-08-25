const ACADEMY_SLUG = "nursing_assessment";
const MODULE_COUNT = 8;
const PATH_KEY = `msb_academy_${ACADEMY_SLUG}_path_v1`;
const FINAL_KEY = `msb_academy_${ACADEMY_SLUG}_final_v1`;

function safeParse(v,f){try{return v?JSON.parse(v):f}catch{return f}}
export function moduleKey(n){return `medskillbuilder_${ACADEMY_SLUG}_module${n}`;}
export function getModuleState(n){return safeParse(localStorage.getItem(moduleKey(n)),{complete:false,passed:false,score:0,xp:0,completedAt:null});}
export function saveModuleState(n,u={}){const cur=getModuleState(n);const next={...cur,...u};if(next.passed||next.complete){next.passed=true;next.complete=true;next.completedAt=next.completedAt||new Date().toISOString();}localStorage.setItem(moduleKey(n),JSON.stringify(next));syncAcademyState();return next;}
export function isModuleUnlocked(n){if(n<=1)return true;return Boolean(getModuleState(n-1).complete);}
export function syncAcademyState(){let completed=0,totalXp=0,mods={};for(let n=1;n<=MODULE_COUNT;n++){const s=getModuleState(n);const c=Boolean(s.complete||s.passed);mods[`module${n}`]=c;if(c)completed++;totalXp+=Number(s.xp||0);}const state={academySlug:ACADEMY_SLUG,modulesComplete:mods,totalXp,academyComplete:completed===MODULE_COUNT,updatedAt:new Date().toISOString()};localStorage.setItem(PATH_KEY,JSON.stringify(state));return state;}
export function getAcademyState(){return safeParse(localStorage.getItem(PATH_KEY),syncAcademyState());}
export function completionPercent(){const s=syncAcademyState();return Math.round(Object.values(s.modulesComplete).filter(Boolean).length/MODULE_COUNT*100);}
export function completeModule(n,score){const passed=Number(score)>=85;const prev=getModuleState(n);return saveModuleState(n,{score,passed,complete:passed,xp:passed&&!prev.complete?100+n*25:prev.xp});}
export function getFinalState(){return safeParse(localStorage.getItem(FINAL_KEY),{attempts:0,passed:false,bestScore:0,lastScore:0,completedAt:null});}
export function saveFinalResult(r){const p=getFinalState();const next={...p,attempts:Number(p.attempts||0)+1,passed:Boolean(p.passed||r.passed),bestScore:Math.max(Number(p.bestScore||0),Number(r.percent||0)),lastScore:Number(r.percent||0),completedAt:r.passed?(p.completedAt||r.completedAt):p.completedAt};localStorage.setItem(FINAL_KEY,JSON.stringify(next));return next;}
