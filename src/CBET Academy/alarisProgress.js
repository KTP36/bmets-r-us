export const ALARIS_KEY = "medskillbuilder-alaris-progress-v1";
export function readAlaris(){try {const p=JSON.parse(localStorage.getItem(ALARIS_KEY)||"{}");return p && typeof p === "object" ? p : {};}catch{return {};}}
export function alarisEligible(p=readAlaris()){return Array.from({length:10},(_,i)=>i+1).every(n=>p[n]?.complete===true);}
