const lesson = {
  "id": "voltage",
  "title": "Measure DC Voltage",
  "shortTitle": "Voltage",
  "badge": "Voltage Apprentice",
  "xp": 100,
  "intro": "Measure a low-voltage DC supply in parallel, observe polarity, and identify an output below specification.",
  "expected": "12.0 V",
  "mode": "voltage",
  "component": {
    "label": "TRAINING LOAD",
    "symbol": "\u2014/\\\\/\\\\\u2014",
    "name": "1 k\u03a9 Resistor",
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
      "Click Output OFF to enable the 12.0 V DC supply.",
      "power"
    ],
    [
      "mode",
      "Select DC Voltage",
      "Click V\u2393 on the multimeter.",
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
    ],
    [
      "diagnose",
      "Check a Low Output",
      "Set the supply to 9.0 V. Measure across the output and decide whether it meets the equipment requirement of 12.0 V DC.",
      "diagnose"
    ]
  ],
  "diagnosis": {
    "correct": "Output below specification",
    "options": [
      "Output within specification",
      "Output below specification"
    ]
  }
};
export default lesson;
