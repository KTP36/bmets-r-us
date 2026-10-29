// Applied training scenarios. Numerical acceptance limits are exercise-specific, not universal device standards.
export const harderCbetQuestions = [
  {
    "id": "cbet-harder-v2-001",
    "question": "An isolated, de-energized component measures 0.46 Ω. Shorted leads measure 0.31 Ω. Ignoring other uncertainty, what is the lead-corrected resistance?",
    "options": [
      "0.31 Ω",
      "0.46 Ω",
      "0.77 Ω",
      "0.15 Ω"
    ],
    "answer": 3,
    "explanation": "Subtract the series lead/contact contribution: 0.46 − 0.31 = 0.15 Ω. This correction does not remove every other source of uncertainty.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "measurement"
  },
  {
    "id": "cbet-harder-v2-002",
    "question": "A pump is programmed at 120 mL/h. Under the specified test conditions it delivers 58 mL in 30 minutes. What is its measured average flow?",
    "options": [
      "120 mL/h",
      "124 mL/h",
      "116 mL/h",
      "58 mL/h"
    ],
    "answer": 2,
    "explanation": "Thirty minutes is 0.5 hour. Average flow = 58 / 0.5 = 116 mL/h; this calculation alone does not establish pass/fail.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "measurement"
  },
  {
    "id": "cbet-harder-v2-003",
    "question": "A controlled pump test commands 50.0 mL and measures 52.0 mL. This exercise defines error as (measured − commanded) / commanded × 100. What is the error?",
    "options": [
      "+3.85%",
      "+4.0%",
      "−4.0%",
      "+2.0%"
    ],
    "answer": 1,
    "explanation": "The difference is +2.0 mL. Dividing by the commanded 50.0 mL gives +4.0%; dividing by measured volume uses the wrong denominator.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "measurement"
  },
  {
    "id": "cbet-harder-v2-004",
    "question": "A training procedure accepts 12.0 V ±5%, inclusive. A traceable meter reads 11.35 V. Ignore measurement uncertainty for this exercise. How does the reading compare?",
    "options": [
      "Fails: 0.05 V below the lower limit",
      "Passes: within 0.65 V of nominal",
      "Fails: 0.65 V below the lower limit",
      "Passes: above the 10.8 V lower limit"
    ],
    "answer": 0,
    "explanation": "Five percent of 12.0 V is 0.60 V, so the accepted range is 11.40–12.60 V. The reading is 0.05 V below 11.40 V.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "measurement"
  },
  {
    "id": "cbet-harder-v2-005",
    "question": "A defibrillator test procedure in this exercise accepts 200 J ±10%, inclusive. The analyzer reads 176 J. Ignoring uncertainty, what is the result?",
    "options": [
      "Pass: 8% below the selected energy",
      "Fail: 24% below the selected energy",
      "Pass: 10% below the selected energy",
      "Fail: 12% below the selected energy"
    ],
    "answer": 3,
    "explanation": "Error = (176 − 200) / 200 × 100 = −12%. The stated lower limit is 180 J; the reading fails this exercise criterion. Real tests use the device-specific procedure.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "measurement"
  },
  {
    "id": "cbet-harder-v2-006",
    "question": "A test waveform repeats every 4.0 horizontal divisions at 5.0 ms/div. What is its frequency?",
    "options": [
      "200 Hz",
      "800 Hz",
      "50 Hz",
      "20 Hz"
    ],
    "answer": 2,
    "explanation": "Period = 4 × 5 ms = 20 ms = 0.020 s. Frequency = 1 / 0.020 = 50 Hz.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "electronics"
  },
  {
    "id": "cbet-harder-v2-007",
    "question": "A sine wave is 3.0 vertical divisions peak-to-peak at 2.0 V/div. The scope is already configured for the probe factor. What is the peak-to-peak voltage?",
    "options": [
      "12.0 V",
      "6.0 V",
      "1.5 V",
      "3.0 V"
    ],
    "answer": 1,
    "explanation": "Peak-to-peak voltage = 3.0 divisions × 2.0 V/div = 6.0 V. Do not apply the probe factor again when the instrument already accounts for it.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "electronics"
  },
  {
    "id": "cbet-harder-v2-008",
    "question": "A 24 V DC supply feeds 4 Ω and 8 Ω resistors in series. Neglect wiring resistance. What voltage is across the 8 Ω resistor?",
    "options": [
      "16 V",
      "8 V",
      "12 V",
      "24 V"
    ],
    "answer": 0,
    "explanation": "Total resistance is 12 Ω, so current is 24/12 = 2 A. The 8 Ω resistor drops 2 × 8 = 16 V.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "electronics"
  },
  {
    "id": "cbet-harder-v2-009",
    "question": "A regulated DC rail reads 5.00 V at its source and 4.40 V at a load drawing 2.0 A. What equivalent series resistance does the intervening path have?",
    "options": [
      "0.12 Ω",
      "0.60 Ω",
      "1.20 Ω",
      "0.30 Ω"
    ],
    "answer": 3,
    "explanation": "The path drops 0.60 V at 2.0 A. R = V/I = 0.60/2.0 = 0.30 Ω; this may include contacts, wiring, or other series elements.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "electronics"
  },
  {
    "id": "cbet-harder-v2-010",
    "question": "A battery has 48 Wh of usable energy under this exercise’s conditions. A device draws a constant 16 W; ignore conversion losses. What runtime is predicted?",
    "options": [
      "2.0 hours",
      "4.8 hours",
      "3.0 hours",
      "0.33 hours"
    ],
    "answer": 2,
    "explanation": "Runtime = usable energy / power = 48 Wh / 16 W = 3.0 h. Real runtime also depends on battery condition, load, temperature, and conversion losses.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "electronics"
  },
  {
    "id": "cbet-harder-v2-011",
    "question": "A 12 V DC rail draws 1.5 A. Its converter is 75% efficient under this load. What input power is required?",
    "options": [
      "30 W",
      "24 W",
      "13.5 W",
      "18 W"
    ],
    "answer": 1,
    "explanation": "Output power is 12 × 1.5 = 18 W. Input power = 18 / 0.75 = 24 W; the 6 W difference represents loss in this simplified model.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "electronics"
  },
  {
    "id": "cbet-harder-v2-012",
    "question": "A /27 IPv4 subnet has 32 addresses. Using conventional subnet network and broadcast addresses, how many host addresses are usable?",
    "options": [
      "30",
      "27",
      "31",
      "32"
    ],
    "answer": 0,
    "explanation": "There are 32 total addresses; reserving the subnet network and broadcast addresses leaves 30 usable host addresses.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "networking"
  },
  {
    "id": "cbet-harder-v2-013",
    "question": "A device is 192.168.40.70/26. Which listed gateway address belongs to the same subnet and is a usable host address?",
    "options": [
      "192.168.40.1",
      "192.168.40.64",
      "192.168.40.127",
      "192.168.40.65"
    ],
    "answer": 3,
    "explanation": "A /26 block spans 64 addresses. The device is in .64–.127, with usable hosts .65–.126; .64 is the network and .127 the broadcast address.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "networking"
  },
  {
    "id": "cbet-harder-v2-014",
    "question": "A monitor reboots after warming for 20 minutes. Its DC input stays stable, but a regulated rail drops just before each reboot. Which comparison most directly narrows this evidence?",
    "options": [
      "Compare application log timestamps without measuring the rail",
      "Compare display assemblies before checking rail behavior",
      "Compare rail voltage, ripple, and load cold versus warm",
      "Compare battery runtime at two display brightness settings"
    ],
    "answer": 2,
    "explanation": "The measured rail change precedes the reboot. Comparing the rail and its load under the failure condition can distinguish regulation, loading, and connection problems without guessing a part.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "troubleshooting"
  },
  {
    "id": "cbet-harder-v2-015",
    "question": "On a de-energized, isolated cable, end-to-end continuity passes while stationary. Resistance becomes open only when the connector boot is flexed. Which conclusion is best supported?",
    "options": [
      "The cable insulation has failed its rated dielectric test",
      "A motion-dependent conductor or termination fault is present",
      "The stationary pass establishes cable integrity under use",
      "The receiving board must be loading the circuit excessively"
    ],
    "answer": 1,
    "explanation": "The cable is isolated and the open follows movement, directly supporting a conductor or termination fault. Continuity does not establish dielectric integrity.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "troubleshooting"
  },
  {
    "id": "cbet-harder-v2-016",
    "question": "A device communicates with a server by IP. The same application works by hostname when an approved alternate DNS resolver is used, with no other changes. Which fault is best isolated?",
    "options": [
      "The original name-resolution path",
      "The device-to-switch physical link",
      "The server application listener",
      "The device battery power path"
    ],
    "answer": 0,
    "explanation": "IP access and the unchanged application work, while changing only the resolver restores hostname access. This isolates the original name-resolution path more directly than hardware or application failure.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "networking"
  },
  {
    "id": "cbet-harder-v2-017",
    "question": "A powered bench test shows a clean ECG on battery and noisy ECG on AC in two rooms. An identical monitor is clean on the same simulator and outlets. Which next comparison best separates remaining causes?",
    "options": [
      "Replace both rooms’ network switches before retesting",
      "Repeat only the suspect unit’s stationary battery-capacity test",
      "Adjust the simulator rate until the displayed trace becomes clean",
      "Compare the suspect unit with an approved known-good AC supply or cord arrangement per service procedure"
    ],
    "answer": 3,
    "explanation": "The issue follows the suspect unit on AC rather than one room or the shared simulator. An approved comparison within its AC power path narrows the fault; the evidence does not yet prove a specific component.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "troubleshooting"
  },
  {
    "id": "cbet-harder-v2-018",
    "question": "Two independent, in-calibration analyzers agree on low delivered defibrillator energy. Approved test connections are confirmed. Charge time is normal. Which evidence is still needed before selecting a repair part?",
    "options": [
      "A battery open-circuit voltage reading as the sole diagnosis",
      "Replacement of the capacitor based only on normal charge time",
      "Device-specific tests separating storage, discharge, and output-path losses",
      "Another test of printer feed alignment at the same energy"
    ],
    "answer": 2,
    "explanation": "Independent agreement and setup checks make a measurement artifact less likely, but normal charge time does not isolate energy storage, switching, or output-path losses. Use the approved diagnostic sequence.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "troubleshooting"
  },
  {
    "id": "cbet-harder-v2-019",
    "question": "A pump occlusion test fails with one administration set and passes repeatedly with a second approved set under otherwise identical conditions. What should be investigated before adjusting the pump?",
    "options": [
      "The display brightness irrespective of pressure response",
      "The original set, its loading, and the test-path restriction",
      "The pump keypad timing irrespective of the set difference",
      "The network module irrespective of local alarm behavior"
    ],
    "answer": 1,
    "explanation": "The failure follows the original set/setup. Investigate that controlled difference before changing calibration; a passing comparison does not itself establish the original set’s exact defect.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "troubleshooting"
  },
  {
    "id": "cbet-harder-v2-020",
    "question": "After a board replacement, all measured parameters meet specifications, but an alarm option documented for this serial number is absent. The installed board part number is approved. What remains unresolved?",
    "options": [
      "Configuration and restoration of the required alarm option",
      "Only battery capacity, because the board part number matches",
      "Only display contrast, because measured parameters pass",
      "Nothing, because approved hardware guarantees correct options"
    ],
    "answer": 0,
    "explanation": "Approved hardware does not prove the correct configuration or enabled options. Verify restoration and test the required alarm before clinical release under the applicable procedure.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "safety"
  },
  {
    "id": "cbet-harder-v2-021",
    "question": "A pressure channel reads 18 mmHg at a verified zero-pressure input. At an applied 100 mmHg it reads 118 mmHg. Which error pattern best fits these two measurements?",
    "options": [
      "An approximately +18% gain error with zero offset",
      "An approximately −18 mmHg offset",
      "A reversed pressure signal with no offset",
      "An approximately +18 mmHg offset"
    ],
    "answer": 3,
    "explanation": "The same +18 mmHg difference appears at both points. A pure gain error would not produce +18 at a true zero input; additional points are needed for full characterization.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "measurement"
  },
  {
    "id": "cbet-harder-v2-022",
    "question": "A pressure channel is correct at zero. At a verified input of 100 mmHg it reads 110 mmHg, and at 200 mmHg it reads 220 mmHg. Which simple model fits?",
    "options": [
      "A constant +20 mmHg offset",
      "A −10% gain error with approximately zero offset",
      "A +10% gain error with approximately zero offset",
      "A constant +10 mmHg offset"
    ],
    "answer": 2,
    "explanation": "Both nonzero readings are 1.10 times the input while zero is preserved. That supports a gain error rather than a fixed additive offset in this exercise.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "measurement"
  },
  {
    "id": "cbet-harder-v2-023",
    "question": "A service trace shows four shutdowns. In each, battery voltage falls below the documented cutoff before the shutdown event. No shutdown occurs on stable external DC. What should be prioritized?",
    "options": [
      "Recalibrating the clinical sensor before testing power",
      "Loaded battery, connection, and charging-path evaluation",
      "Replacing the processor before reviewing power measurements",
      "Changing network settings before reproducing shutdown"
    ],
    "answer": 1,
    "explanation": "The time-correlated cutoff evidence and stable external-DC comparison prioritize the battery/power path. They do not yet distinguish battery condition, charge state, connections, and charging performance.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "troubleshooting"
  },
  {
    "id": "cbet-harder-v2-024",
    "question": "An insulation-related safety test fails after repair. A second test using the correct device class, accessory setup, and current procedure also fails. Functional checks pass. Which release evidence is still missing?",
    "options": [
      "A passing required safety verification after corrective action",
      "A third functional self-test without correcting the safety fault",
      "A record that the device operated for one hour on the bench",
      "A user acknowledgment of the unresolved safety-test result"
    ],
    "answer": 0,
    "explanation": "Function and safety verification are separate requirements. Reproducible failure of a required safety test is unresolved; successful function or user acknowledgment does not replace correction and retesting.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "safety"
  },
  {
    "id": "cbet-harder-v2-025",
    "question": "A failure occurs with accessory A on devices X and Y. Accessory B works on both devices under the same test conditions. Which statement best matches the evidence?",
    "options": [
      "Both devices independently have the same proven main-board failure",
      "Device X alone is proved defective by the first failed combination",
      "Accessory B proves the entire device family has no possible faults",
      "The fault follows accessory A or its compatibility with the tested setup"
    ],
    "answer": 3,
    "explanation": "The controlled substitution pattern localizes the problem to accessory A or its compatibility/setup. It does not establish a particular internal device defect or certify every other function.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "troubleshooting"
  }
];
