const lesson = {
  "id": "voltage",
  "title": "Measure DC Voltage",
  "shortTitle": "Voltage",
  "badge": "Voltage Apprentice",
  "xp": 100,
  "intro": "Measure electrical pressure between two energized points.",
  "expected": "12.0 V",
  "mode": "voltage",
  "component": {
    "label": "TRAINING LOAD",
    "symbol": "—/\\\\/\\\\—",
    "name": "1 kΩ Resistor",
    "kind": "resistor"
  },
  "points": [
    [
      "output",
      "OUTPUT",
      "positive"
    ],
    [
      "ground",
      "GROUND",
      "negative"
    ]
  ],
  "probeTargets": {
    "black": "ground",
    "red": "output"
  },
  "readingRule": "powered",
  "steps": [
    [
      "welcome",
      "Welcome to Lesson 1",
      "You will measure 12 volts DC safely.",
      "continue"
    ],
    [
      "power",
      "Turn On the Supply",
      "Click the highlighted OUTPUT button.",
      "power"
    ],
    [
      "mode",
      "Select DC Voltage",
      "Click V⎓ on the multimeter.",
      "mode"
    ],
    [
      "black",
      "Connect the Black Probe",
      "Select the black probe, then click GROUND.",
      "black"
    ],
    [
      "red",
      "Connect the Red Probe",
      "Select the red probe, then click OUTPUT.",
      "red"
    ],
    [
      "read",
      "Record the Reading",
      "Click the meter display when it shows 12.0 V.",
      "read"
    ]
  ]
};

export default lesson;
