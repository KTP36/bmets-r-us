export const MODE_OPTIONS = [
  { id: "voltage", symbol: "V⎓", label: "DC Voltage" },
  { id: "current", symbol: "A⎓", label: "DC Current" },
  { id: "resistance", symbol: "Ω", label: "Resistance" },
  { id: "continuity", symbol: ")))", label: "Continuity" },
  { id: "diode", symbol: "▷|", label: "Diode Test" },
  { id: "capacitance", symbol: "—|(—", label: "Capacitance" },
  { id: "off", symbol: "OFF", label: "Power Off" },
];

export const POINT_LABELS = {
  left: "Left lead",
  right: "Right lead",
  output: "Output",
  ground: "Ground",
  positive: "Positive",
  negative: "Negative",
  source: "Source",
  load: "Load",
  com: "COM",
  vomega: "V / Ω",
  amps: "A input",
};

export function titleCase(value = "") {
  return String(value)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function modeFromLesson(lesson) {
  const raw = String(lesson?.mode || "").toLowerCase();
  if (raw.includes("volt")) return "voltage";
  if (raw.includes("curr") || raw.includes("amp")) return "current";
  if (raw.includes("res")) return "resistance";
  if (raw.includes("cont")) return "continuity";
  if (raw.includes("diode")) return "diode";
  if (raw.includes("cap")) return "capacitance";
  return raw || "off";
}

export function playLabSound(type = "click") {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    const settings = {
      click: { frequency: 620, duration: 0.045, volume: 0.025, wave: "square" },
      rotary: { frequency: 260, duration: 0.075, volume: 0.035, wave: "triangle" },
      probe: { frequency: 440, duration: 0.08, volume: 0.03, wave: "sine" },
      success: { frequency: 880, duration: 0.14, volume: 0.035, wave: "sine" },
      continuity: { frequency: 1050, duration: 0.24, volume: 0.04, wave: "square" },
    };

    const chosen = settings[type] || settings.click;
    oscillator.type = chosen.wave;
    oscillator.frequency.setValueAtTime(chosen.frequency, context.currentTime);
    gain.gain.setValueAtTime(chosen.volume, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      context.currentTime + chosen.duration
    );

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + chosen.duration);
    oscillator.addEventListener("ended", () => context.close());
  } catch {
    // Audio is intentionally optional.
  }
}
