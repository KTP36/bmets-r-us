const lesson = {
  "id": "current",
  "title": "Measure DC Current",
  "shortTitle": "Current",
  "badge": "Current Explorer",
  "xp": 120,
  "intro": "Measure electron flow by placing the meter in series.",
  "expected": "12.0 mA",
  "mode": "current",
  "component": {
    "label": "TRAINING LOAD",
    "symbol": "—/\\\\/\\\\—",
    "name": "1 kΩ Resistor",
    "kind": "resistor"
  },
  "points": [
    [
      "source",
      "SOURCE",
      "positive"
    ],
    [
      "return",
      "RETURN",
      "negative"
    ]
  ],
  "probeTargets": {
    "black": "return",
    "red": "source"
  },
  "readingRule": "poweredSeries",
  "usesSeriesGap": true,
  "steps": [
    [
      "welcome",
      "Welcome to Lesson 2",
      "You will measure current through the training load.",
      "continue"
    ],
    [
      "poweroff",
      "De-energize the Circuit",
      "Click OUTPUT to make sure power is off before rewiring.",
      "poweroff"
    ],
    [
      "mode",
      "Select DC Current",
      "Click A⎓ on the multimeter.",
      "mode"
    ],
    [
      "series",
      "Open the Circuit",
      "Click the SERIES GAP to create a safe meter insertion point.",
      "series"
    ],
    [
      "black",
      "Connect the Black Probe",
      "Select the black probe, then click RETURN.",
      "black"
    ],
    [
      "red",
      "Connect the Red Probe",
      "Select the red probe, then click SOURCE.",
      "red"
    ],
    [
      "power",
      "Restore Power",
      "Turn the output back on.",
      "power"
    ],
    [
      "read",
      "Record the Reading",
      "Click the meter display when it shows 12.0 mA.",
      "read"
    ]
  ]
};

export default lesson;
