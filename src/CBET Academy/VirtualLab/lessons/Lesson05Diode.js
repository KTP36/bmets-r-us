const lesson = {
  id: "diode",
  title: "Diode Testing & Fault Diagnosis",
  shortTitle: "Diode Test",
  badge: "Diode Diagnostic Specialist",
  xp: 175,
  intro: "Test an unknown silicon diode and determine whether it is good, open, or shorted.",
  why: "Diodes appear in power supplies, protection circuits, rectifiers, and medical-device boards. A diode-mode test quickly reveals junction condition without powering the circuit.",
  expected: "0.650 V",
  mode: "diode",
  component: {
    label: "TRAINING DIODE",
    symbol: "—▶|—",
    name: "Unknown Silicon Diode",
    kind: "diode",
  },
  points: [
    ["left", "ANODE", "red"],
    ["right", "CATHODE", "black"],
  ],
  probeTargets: {
    red: "left",
    black: "right",
  },
  readingRule: "unpowered",
  diagnosis: {
    correct: "Diode Good",
    options: ["Diode Good", "Diode Open", "Diode Shorted"],
  },
  steps: [
    [
      "welcome",
      "A power-supply board has an unknown diode",
      "Use diode-test mode to evaluate the junction before replacing the component.",
      "continue",
    ],
    [
      "poweroff",
      "Verify the board is de-energized",
      "Diode testing is performed with circuit power removed.",
      "poweroff",
    ],
    [
      "mode",
      "Select diode-test mode",
      "The meter applies a small test current and displays the junction voltage drop.",
      "mode",
    ],
    [
      "black",
      "Place the black probe on the cathode",
      "The cathode is the banded side of a physical diode and the bar side of its schematic symbol.",
      "black",
    ],
    [
      "red",
      "Place the red probe on the anode",
      "Red on the anode and black on the cathode forward-biases the junction.",
      "red",
    ],
    [
      "read",
      "Read the forward-bias result",
      "About 0.5–0.8 V is typical for a silicon diode. OL indicates an open junction; near 0 V indicates a short.",
      "read",
    ],
    [
      "diagnose",
      "Submit the diode diagnosis",
      "Use the displayed forward-voltage evidence to identify the diode condition.",
      "diagnose",
    ],
  ],
};

export default lesson;
