export function getVoltageMeasurement({mode, redJack, supplyOn, voltage, blackPoint, redPoint}) {
  if (mode === 'off') return {display:'— — —', ready:false};
  if (redJack !== 'vohm') return {display:'— — —', ready:false, error:'Use the V/Ω jack. A current input across a supply can cause a short circuit; this simulator blocks the connection.'};
  if (mode !== 'voltage') return {display:'— — —', ready:false, error:'Select DC voltage to measure this supply.'};
  if (!blackPoint || !redPoint) return {display:'— — —', ready:false};
  const across = blackPoint !== redPoint;
  const value = !supplyOn || !across ? 0 : (redPoint === 'output' ? voltage : -voltage);
  return {display:`${value.toFixed(1)} V`, ready:across && supplyOn, value};
}
