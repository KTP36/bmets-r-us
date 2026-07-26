const lesson = {
  "id": "practical",
  "title": "Final Multimeter Practical",
  "shortTitle": "Practical Exam",
  "badge": "Multimeter Foundations Certified",
  "xp": 350,
  "intro": "Complete an unprompted troubleshooting sequence using the skills from the course.",
  "expected": "0.0 V",
  "mode": "voltage",
  "safety": "Practical exam: choose each action carefully. Incorrect choices provide feedback but do not erase progress.",
  "component": {
    "label": "PATIENT MONITOR POWER BOARD",
    "symbol": "INPUT → FUSE → 12 V",
    "name": "No-Power Complaint",
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
    "correct": "Failed 12 V output stage",
    "options": [
      "Failed 12 V output stage",
      "Open ECG lead",
      "Speaker failure"
    ]
  },
  "steps": [
    [
      "welcome",
      "Final Practical Exam",
      "A patient monitor has no display. Demonstrate the correct live-voltage troubleshooting sequence.",
      "continue"
    ],
    [
      "power",
      "Apply Bench Power",
      "Energize the training board.",
      "power"
    ],
    [
      "mode",
      "Choose the Correct Meter Mode",
      "Select the safe function for an energized DC rail.",
      "mode"
    ],
    [
      "black",
      "Establish the Reference",
      "Connect the common probe to ground.",
      "black"
    ],
    [
      "red",
      "Measure the Output Rail",
      "Probe the 12 V rail.",
      "red"
    ],
    [
      "read",
      "Record the Evidence",
      "Confirm the output rail is missing.",
      "read"
    ],
    [
      "diagnose",
      "Submit Your Diagnosis",
      "Identify the most likely failed stage.",
      "diagnose"
    ]
  ]
};

export default lesson;
