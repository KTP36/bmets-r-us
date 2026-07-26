const lesson = {
  "id": "continuity",
  "title": "Perform a Continuity Test",
  "shortTitle": "Continuity",
  "badge": "Continuity Checker",
  "xp": 130,
  "intro": "Confirm that a fuse or wire has an unbroken electrical path.",
  "expected": "BEEP",
  "mode": "continuity",
  "component": {
    "label": "TRAINING FUSE",
    "symbol": "—[ FUSE ]—",
    "name": "Good Fuse",
    "kind": "fuse"
  },
  "points": [
    [
      "left",
      "LEFT SIDE",
      "neutral"
    ],
    [
      "right",
      "RIGHT SIDE",
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
      "Welcome to Lesson 4",
      "You will check whether the training fuse is intact.",
      "continue"
    ],
    [
      "poweroff",
      "Verify Power Is Off",
      "Continuity testing must be performed on a de-energized circuit.",
      "poweroff"
    ],
    [
      "mode",
      "Select Continuity",
      "Click the continuity symbol.",
      "mode"
    ],
    [
      "black",
      "Connect the Black Probe",
      "Select black, then click one side of the fuse.",
      "black"
    ],
    [
      "red",
      "Connect the Red Probe",
      "Select red, then click the other side.",
      "red"
    ],
    [
      "read",
      "Confirm Continuity",
      "Click the display when the meter indicates BEEP.",
      "read"
    ]
  ]
};

export default lesson;
