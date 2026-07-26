const lesson = {
  "id": "capacitor",
  "title": "Test a Capacitor",
  "shortTitle": "Capacitance",
  "badge": "Capacitor Specialist",
  "xp": 180,
  "intro": "Safely discharge, identify polarity, and measure capacitance.",
  "expected": "98.6 µF",
  "mode": "capacitance",
  "safety": "Capacitors can retain charge after power is removed. Always verify the circuit is de-energized and discharge the capacitor before testing.",
  "component": {
    "label": "POLARIZED CAPACITOR",
    "symbol": "—| |—  +",
    "name": "100 µF Electrolytic",
    "kind": "capacitor"
  },
  "points": [
    [
      "negative",
      "NEGATIVE LEAD",
      "negative"
    ],
    [
      "positive",
      "POSITIVE LEAD",
      "positive"
    ]
  ],
  "probeTargets": {
    "black": "negative",
    "red": "positive"
  },
  "readingRule": "unpoweredDischarged",
  "usesDischarge": true,
  "steps": [
    [
      "welcome",
      "Welcome to Lesson 6",
      "You will test a polarized 100 µF capacitor safely.",
      "continue"
    ],
    [
      "poweroff",
      "Verify Power Is Off",
      "De-energize the circuit before touching the capacitor.",
      "poweroff"
    ],
    [
      "discharge",
      "Discharge the Capacitor",
      "Click DISCHARGE CAPACITOR before measuring.",
      "discharge"
    ],
    [
      "mode",
      "Select Capacitance",
      "Click the capacitance setting on the meter.",
      "mode"
    ],
    [
      "black",
      "Connect the Black Probe",
      "Connect black to the negative lead.",
      "black"
    ],
    [
      "red",
      "Connect the Red Probe",
      "Connect red to the positive lead.",
      "red"
    ],
    [
      "read",
      "Evaluate the Reading",
      "Click the display when it shows 98.6 µF.",
      "read"
    ]
  ]
};

export default lesson;
