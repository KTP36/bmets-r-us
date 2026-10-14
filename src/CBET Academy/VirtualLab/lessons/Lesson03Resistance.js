const lesson = {
  "id": "resistance",
  "title": "Measure Resistance",
  "shortTitle": "Resistance",
  "badge": "Resistance Reader",
  "xp": 120,
  "intro": "Measure an isolated 1 k\u03a9 \u00b15% resistor and identify whether its resistance is within tolerance, drifted, open, or shorted.",
  "expected": "1.00 k\u03a9",
  "mode": "resistance",
  "component": {
    "label": "TRAINING LOAD",
    "symbol": "\u2014/\\\\/\\\\\u2014",
    "name": "1 k\u03a9 Resistor",
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
      "You will measure a 1 k\u03a9 resistor safely.",
      "continue"
    ],
    [
      "poweroff",
      "Verify Power Is Off",
      "Verify power is off and the resistor is removed from equipment and isolated from stored energy.",
      "poweroff"
    ],
    [
      "mode",
      "Select Resistance",
      "Click \u03a9 on the multimeter.",
      "mode"
    ],
    [
      "black",
      "Connect the Black Probe",
      "Select black, then touch either metal lead.",
      "black"
    ],
    [
      "red",
      "Connect the Red Probe",
      "Select red, then touch the opposite metal lead.",
      "red"
    ],
    [
      "read",
      "Record the Reading",
      "Click the meter display with both probes contacting opposite leads. Record the measured resistance, including OL if the path is open.",
      "read"
    ],
    [
      "diagnose",
      "Evaluate the Resistor",
      "Compare the measurement with the rated 1 k\u03a9 \u00b15% range (950\u20131,050 \u03a9). Choose the matching diagnosis.",
      "diagnose"
    ]
  ]
};
export default lesson;
