export const RESISTOR_SCENARIOS = ['normal', 'drifted', 'open', 'shorted'];
export function resistorEvidence(condition) {
  const values = {normal:{display:'1.02 kΩ',diagnosis:'Within tolerance'},drifted:{display:'1.20 kΩ',diagnosis:'Outside tolerance'},open:{display:'OL',diagnosis:'Open resistor'},shorted:{display:'0.2 Ω',diagnosis:'Shorted resistor'}};
  return values[condition] || values.normal;
}
export function getResistanceMeasurement({mode,redJack,supplyOn,isolationVerified,blackPoint,redPoint,condition}) {
  if(mode === 'off') return {display:'— — —',ready:false};
  if(supplyOn || !isolationVerified || redJack !== 'vohm' || mode !== 'resistance') return {display:'— — —',ready:false};
  if(!blackPoint || !redPoint) return {display:'OL',ready:false};
  if(blackPoint === redPoint) return {display:'0.1 Ω',ready:false};
  return {...resistorEvidence(condition),ready:true};
}
