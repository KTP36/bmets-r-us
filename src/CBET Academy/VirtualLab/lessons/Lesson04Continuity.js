const lesson = {
  id: "continuity",
  title: "Continuity & Fuse Testing",
  shortTitle: "Continuity",
  badge: "Continuity Apprentice",
  xp: 150,
  intro: "Determine whether a training fuse has a complete or broken electrical path.",
  why: "Continuity testing quickly isolates open fuses, broken wires, and failed connections without energizing the circuit.",
  expected: "0.2 Ω",
  mode: "continuity",
  component: {
    label: "TRAINING FUSE",
    symbol: "—[ FUSE ]—",
    name: "Unknown Fuse",
    kind: "fuse",
  },
  points: [
    ["left", "LEFT SIDE", "neutral"],
    ["right", "RIGHT SIDE", "neutral"],
  ],
  probeTargets: {
    black: "left",
    red: "right",
  },
  readingRule: "unpowered",
  diagnosis: {
    correct: "Fuse Good",
    options: ["Fuse Good", "Fuse Blown"],
  },
  steps: [
    [
      "welcome",
      "A monitor will not power on",
      "Test the protective fuse and decide whether it is intact or blown.",
      "continue",
    ],
    [
      "poweroff",
      "Verify the circuit is de-energized",
      "Never use continuity mode on a powered circuit.",
      "poweroff",
    ],
    [
      "mode",
      "Select continuity mode",
      "Choose the sound-wave continuity setting on the meter.",
      "mode",
    ],
    [
      "black",
      "Connect the black probe",
      "Select the black probe, then touch the left side of the fuse.",
      "black",
    ],
    [
      "red",
      "Connect the red probe",
      "Select the red probe, then touch the right side of the fuse.",
      "red",
    ],
    [
      "read",
      "Interpret the meter",
      "A low reading with a beep means continuity. OL without a beep means the path is open.",
      "read",
    ],
    [
      "diagnose",
      "Submit your fuse diagnosis",
      "Use the meter evidence to decide whether the fuse is good or blown.",
      "diagnose",
    ],
  ],
};

export default lesson;
