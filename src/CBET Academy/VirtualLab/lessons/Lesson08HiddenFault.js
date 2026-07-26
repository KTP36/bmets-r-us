const lesson = {
  "id": "hidden-fault",
  "title": "Hidden Fault Challenge",
  "shortTitle": "Hidden Fault",
  "badge": "Fault Isolation Specialist",
  "xp": 260,
  "intro": "Use safe meter setup and measured evidence to isolate a failed component.",
  "expected": "OL",
  "mode": "continuity",
  "safety": "The equipment is unplugged. Begin with a continuity test of the protective fuse.",
  "component": {
    "label": "MYSTERY CIRCUIT",
    "symbol": "INPUT → F1 → LOAD",
    "name": "Fault Hidden",
    "kind": "fault"
  },
  "points": [
    [
      "fuse-in",
      "FUSE INPUT",
      "positive"
    ],
    [
      "fuse-out",
      "FUSE OUTPUT",
      "neutral"
    ]
  ],
  "probeTargets": {
    "black": "fuse-in",
    "red": "fuse-out"
  },
  "readingRule": "unpowered",
  "diagnosis": {
    "correct": "Open fuse",
    "options": [
      "Open fuse",
      "Failed display",
      "Weak battery"
    ]
  },
  "steps": [
    [
      "welcome",
      "Welcome to Lesson 8",
      "The equipment will not power on. Use the meter to isolate the first failed stage.",
      "continue"
    ],
    [
      "poweroff",
      "Confirm Safe State",
      "Verify the circuit remains de-energized.",
      "poweroff"
    ],
    [
      "mode",
      "Select Continuity",
      "Choose continuity to inspect the input fuse.",
      "mode"
    ],
    [
      "black",
      "Connect the Black Probe",
      "Connect black to FUSE INPUT.",
      "black"
    ],
    [
      "red",
      "Connect the Red Probe",
      "Connect red to FUSE OUTPUT.",
      "red"
    ],
    [
      "read",
      "Interpret the Result",
      "The meter reads OL, indicating an open path.",
      "read"
    ],
    [
      "diagnose",
      "Name the Fault",
      "Select the failed component.",
      "diagnose"
    ]
  ]
};

export default lesson;
