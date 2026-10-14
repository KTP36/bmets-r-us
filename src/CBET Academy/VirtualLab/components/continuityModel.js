// The training meter uses a 30-ohm continuity threshold. Real meters vary.
export const CONTINUITY_THRESHOLD_OHMS = 30;

export function getContinuityMeasurement({ mode, redJack, supplyOn, blackPoint, redPoint, fuseCondition }) {
  if (mode === "off") return { display: "— — —", beeps: false, acrossFuse: false };
  if (supplyOn || redJack !== "vohm") return { display: "— — —", beeps: false, acrossFuse: false, setupError: true };
  const contact = [blackPoint, redPoint].every(point => point === "left" || point === "right");
  if (!contact) return { display: ["continuity", "resistance", "diode"].includes(mode) ? "OL" : "— — —", beeps: false, acrossFuse: false };
  const acrossFuse = blackPoint !== redPoint;
  const ohms = !acrossFuse ? 0.1 : fuseCondition === "good" ? 0.2 : Infinity;
  if (!["continuity", "resistance"].includes(mode)) return { display: "— — —", beeps: false, acrossFuse, unsupportedMode: true };
  return { display: Number.isFinite(ohms) ? `${ohms.toFixed(1)} Ω` : "OL", beeps: mode === "continuity" && ohms <= CONTINUITY_THRESHOLD_OHMS, acrossFuse, ohms };
}

export function createContinuityTone(getContext, onUnavailable = () => {}) {
  let context, oscillator, gain, wanted = false, generation = 0, disposed = false;
  function stop() {
    wanted = false;
    generation += 1;
    if (oscillator) {
      try { oscillator.stop(); } catch { /* Already stopped. */ }
      oscillator.disconnect();
      gain.disconnect();
      oscillator = null;
      gain = null;
    }
  }
  function unlock() {
    if (disposed) return;
    try {
      context ||= getContext();
      if (!context) { onUnavailable(); return; }
      const resume = context.resume();
      if (resume?.catch) resume.catch(onUnavailable);
    } catch { onUnavailable(); }
  }
  async function start() {
    if (disposed) return;
    wanted = true;
    const token = ++generation;
    try {
      context ||= getContext();
      if (!context) { onUnavailable(); return; }
      await context.resume();
      if (!wanted || disposed || token !== generation || oscillator) return;
      oscillator = context.createOscillator();
      gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(1050, context.currentTime);
      gain.gain.setValueAtTime(0.025, context.currentTime);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
    } catch { stop(); onUnavailable(); }
  }
  function dispose() {
    disposed = true;
    stop();
    if (context) {
      try { const closed = context.close(); if (closed?.catch) closed.catch(() => {}); } catch { /* Optional audio. */ }
    }
  }
  return { unlock, start, stop, dispose };
}
