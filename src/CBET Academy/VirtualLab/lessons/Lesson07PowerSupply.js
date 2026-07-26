const lesson = {
  "id": "power-supply",
  "title": "Troubleshoot a DC Power Supply",
  "shortTitle": "Power Supply",
  "badge": "Power Rail Troubleshooter",
  "xp": 220,
  "intro": "Trace a no-power complaint from input to regulated output.",
  "expected": "0.0 V",
  "mode": "voltage",
  "safety": "Use voltage mode for energized troubleshooting. Never use resistance or continuity mode on a powered circuit.",
  "component": {
    "label": "FAULTED POWER SUPPLY",
    "symbol": "AC → [REG] → DC",
    "name": "Open Output Fuse",
    "kind": "fault"
  },
  "points": [
    [
      "ground",
      "GROUND",
      "negative"
    ],
    [
      "rail",
      "12 V RAIL",
      "positive"
    ]
  ],
  "probeTargets": {
    "black": "ground",
    "red": "rail"
  },
  "readingRule": "powered",
  "diagnosis": {
    "correct": "Open output fuse",
    "options": [
      "Failed transformer",
      "Open output fuse",
      "Shorted load"
    ]
  },
  "steps": [
    [
      "welcome",
      "Welcome to Lesson 7",
      "A device powers on internally, but the 12 V output rail is missing.",
      "continue"
    ],
    [
      "power",
      "Energize the Supply",
      "Turn the output on for voltage troubleshooting.",
      "power"
    ],
    [
      "mode",
      "Select DC Voltage",
      "Use V⎓ to inspect the output rail.",
      "mode"
    ],
    [
      "black",
      "Connect Reference",
      "Connect black to GROUND.",
      "black"
    ],
    [
      "red",
      "Probe the Rail",
      "Connect red to the 12 V RAIL.",
      "red"
    ],
    [
      "read",
      "Observe the Fault",
      "Confirm the rail reads 0.0 V.",
      "read"
    ],
    [
      "diagnose",
      "Identify the Failure",
      "Choose the most likely fault.",
      "diagnose"
    ]
  ]
};

export default lesson;
