const lesson = {
  "id": "diode",
  "title": "Test a Diode",
  "shortTitle": "Diode Test",
  "badge": "Diode Detective",
  "xp": 150,
  "intro": "Check forward voltage drop and identify diode polarity.",
  "expected": "0.67 V",
  "mode": "diode",
  "component": {
    "label": "SILICON DIODE",
    "symbol": "—|>|—",
    "name": "1N400x Diode",
    "kind": "diode"
  },
  "points": [
    [
      "anode",
      "ANODE",
      "positive"
    ],
    [
      "cathode",
      "CATHODE",
      "negative"
    ]
  ],
  "probeTargets": {
    "black": "cathode",
    "red": "anode"
  },
  "readingRule": "unpowered",
  "steps": [
    [
      "welcome",
      "Welcome to Lesson 5",
      "You will test a silicon diode in the forward direction.",
      "continue"
    ],
    [
      "poweroff",
      "Verify Power Is Off",
      "Diode mode supplies its own small test voltage.",
      "poweroff"
    ],
    [
      "mode",
      "Select Diode Test",
      "Click the diode symbol.",
      "mode"
    ],
    [
      "black",
      "Connect the Black Probe",
      "Select black, then click CATHODE.",
      "black"
    ],
    [
      "red",
      "Connect the Red Probe",
      "Select red, then click ANODE.",
      "red"
    ],
    [
      "read",
      "Record Forward Drop",
      "Click the display when it shows approximately 0.67 V.",
      "read"
    ]
  ]
};

export default lesson;
