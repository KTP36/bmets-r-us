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
      "Select the black probe and touch either metal contact.",
      "black",
    ],
    [
      "red",
      "Connect the red probe",
      "Select the red probe and touch the opposite metal contact.",
      "red",
    ],
    [
      "read",
      "Interpret the meter",
      "Read the display with both probes across the fuse. Low resistance activates the continuity indicator and tone; OL stays silent. Click the display to record the measurement.",
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
