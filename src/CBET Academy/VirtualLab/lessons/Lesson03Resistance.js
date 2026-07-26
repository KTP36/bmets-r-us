const lesson = {
  "id": "resistance",
  "title": "Measure Resistance",
  "shortTitle": "Resistance",
  "badge": "Resistance Reader",
  "xp": 120,
  "intro": "Measure opposition to current with the circuit de-energized.",
  "expected": "1.00 kΩ",
  "mode": "resistance",
  "component": {
    "label": "TRAINING LOAD",
    "symbol": "—/\\\\/\\\\—",
    "name": "1 kΩ Resistor",
    "kind": "resistor"
  },
  "points": [
    [
      "left",
      "LEFT LEAD",
      "neutral"
    ],
    [
      "right",
      "RIGHT LEAD",
      "neutral"
    ]
  ],
  "probeTargets": {
    "black": "left",
    "red": "right"
  },
  "readingRule": "unpowered",
  "steps": [
    [
      "welcome",
      "Welcome to Lesson 3",
      "You will measure a 1 kΩ resistor safely.",
      "continue"
    ],
    [
      "poweroff",
      "Verify Power Is Off",
      "Resistance is measured without power.",
      "poweroff"
    ],
    [
      "mode",
      "Select Resistance",
      "Click Ω on the multimeter.",
      "mode"
    ],
    [
      "black",
      "Connect the Black Probe",
      "Select black, then click LEFT LEAD.",
      "black"
    ],
    [
      "red",
      "Connect the Red Probe",
      "Select red, then click RIGHT LEAD.",
      "red"
    ],
    [
      "read",
      "Record the Reading",
      "Click the meter display when it shows 1.00 kΩ.",
      "read"
    ]
  ]
};

export default lesson;
