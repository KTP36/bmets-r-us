const allQuestions = [
  // --- Heart Anatomy Questions ---
  {
    question: "Which chamber of the heart receives oxygen-poor blood from the body?",
    options: ["Left atrium", "Right atrium", "Left ventricle", "Right ventricle"],
    answer: 1,
    explanation:
      "The right atrium receives deoxygenated blood from the body via the superior and inferior vena cava.",
    difficulty: "easy",
    category: "heart",
  },
  {
    question: "Which valve is located between the left atrium and left ventricle?",
    options: ["Tricuspid valve", "Pulmonary valve", "Mitral (bicuspid) valve", "Aortic valve"],
    answer: 2,
    explanation: "The mitral (bicuspid) valve separates the left atrium and left ventricle.",
    difficulty: "easy",
    category: "heart",
  },
  {
    question: "Which vessel carries oxygenated blood from the lungs to the heart?",
    options: ["Pulmonary artery", "Pulmonary vein", "Aorta", "Superior vena cava"],
    answer: 1,
    explanation: "The pulmonary veins carry oxygenated blood from the lungs to the left atrium.",
    difficulty: "easy",
    category: "heart",
  },

  // --- CBET / Device Questions: revised 100-question bank ---
  {
    "question": "A resistive training load has a power factor of 1.0 and draws 2.0 A RMS from 120 V RMS. What real power does it consume?",
    "options": [
      "120 W",
      "240 W",
      "480 W",
      "60 W"
    ],
    "answer": 1,
    "explanation": "For this resistive load, real power is V × I × power factor = 120 × 2.0 × 1.0 = 240 W. Voltage times current alone is apparent power for a general AC load.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-001"
  },
  {
    "question": "A 12 V source is applied across a 6 Ω resistor. What current should flow?",
    "options": [
      "6 A",
      "72 A",
      "0.5 A",
      "2 A"
    ],
    "answer": 3,
    "explanation": "Ohm’s law gives I = V/R = 12/6 = 2 A.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-002"
  },
  {
    "question": "Two 100 Ω resistors are connected in series. What is the total resistance?",
    "options": [
      "10,000 Ω",
      "50 Ω",
      "100 Ω",
      "200 Ω"
    ],
    "answer": 3,
    "explanation": "Series resistances add directly, so 100 Ω + 100 Ω = 200 Ω.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-003"
  },
  {
    "question": "Two identical 100 Ω resistors are connected in parallel. What is the equivalent resistance?",
    "options": [
      "25 Ω",
      "50 Ω",
      "100 Ω",
      "200 Ω"
    ],
    "answer": 1,
    "explanation": "Two equal resistors in parallel have half the resistance of either resistor: 50 Ω.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-004"
  },
  {
    "question": "Which component primarily stores energy in an electric field?",
    "options": [
      "Capacitor",
      "Diode",
      "Fuse",
      "Inductor"
    ],
    "answer": 0,
    "explanation": "A capacitor stores electrical energy in an electric field.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-005"
  },
  {
    "question": "Which component is intended to conduct current primarily in one direction?",
    "options": [
      "Diode",
      "Inductor",
      "Transformer",
      "Resistor"
    ],
    "answer": 0,
    "explanation": "A diode is designed to conduct primarily in the forward direction and block reverse current.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-006"
  },
  {
    "question": "A fuse repeatedly opens after replacement. What is the BEST next action?",
    "options": [
      "Change the fuse speed while keeping its current rating",
      "Find the overcurrent cause before replacing it again",
      "Replace the fuse again and use operating time as the diagnosis",
      "Replace the power supply before checking its load"
    ],
    "answer": 1,
    "explanation": "Repeated fuse opening indicates an underlying overcurrent fault that must be diagnosed; increasing or bypassing protection is unsafe.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-007"
  },
  {
    "question": "A transformer is most directly used to:",
    "options": [
      "Change AC voltage levels and provide isolation when designed for it",
      "Convert steady DC directly into a higher steady DC output",
      "Maintain the same voltage under every possible load",
      "Regulate its output by storing charge in a capacitor"
    ],
    "answer": 0,
    "explanation": "Transformers transfer AC energy magnetically and can step voltage up/down and provide isolation.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-008"
  },
  {
    "question": "A 10 kΩ resistor measures approximately 2 Ω while still installed in a circuit. What should the technician consider FIRST?",
    "options": [
      "The resistor's rated tolerance explains the full difference",
      "The resistor has increased its value from heating",
      "The reading proves that the resistor's body is shorted",
      "Parallel circuit paths may be affecting the reading"
    ],
    "answer": 3,
    "explanation": "In-circuit resistance readings can be lowered by parallel paths; isolate the component as appropriate before concluding it failed.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-009"
  },
  {
    "question": "When measuring voltage with a digital multimeter, the meter is normally connected:",
    "options": [
      "Across an isolated component in resistance mode",
      "Between any one test point and chassis only",
      "Across the two points being measured",
      "In series with the load being evaluated"
    ],
    "answer": 2,
    "explanation": "Voltage is a potential difference and is measured across two points.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-010"
  },
  {
    "question": "When measuring current directly with a multimeter, the meter is normally placed:",
    "options": [
      "Across a removed component using resistance mode",
      "In series with the circuit path",
      "Across the source without interrupting the current path",
      "In parallel with the load using the voltage jack"
    ],
    "answer": 1,
    "explanation": "Direct current measurement requires the meter to become part of the current path, so it is placed in series.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-011"
  },
  {
    "question": "An electrolytic capacitor has a visibly bulged top. What is the MOST appropriate interpretation?",
    "options": [
      "Possible capacitor failure requiring evaluation/replacement",
      "A normal consequence of operation within its rated ripple",
      "A reliable sign of increased useful capacitance",
      "A condition that can be cleared by recalibrating the supply"
    ],
    "answer": 0,
    "explanation": "Bulging is a common physical sign of electrolytic capacitor degradation or failure.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-012"
  },
  {
    "question": "A bridge rectifier in a power supply primarily converts:",
    "options": [
      "DC to a sinusoidal AC waveform",
      "Pulsating DC to regulated DC",
      "AC voltage to a different AC voltage without rectification",
      "AC to pulsating DC"
    ],
    "answer": 3,
    "explanation": "A rectifier uses diodes to convert AC into pulsating DC.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-013"
  },
  {
    "question": "A regulator stage in a DC power supply is primarily intended to:",
    "options": [
      "Provide isolation between mains and the secondary winding",
      "Limit fault current by opening the input circuit",
      "Maintain a stable output despite input/load changes",
      "Remove all AC ripple using only charge storage"
    ],
    "answer": 2,
    "explanation": "Voltage regulation keeps the DC output near its intended value as line and load conditions change.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-014"
  },
  {
    "question": "An oscilloscope is especially useful when a technician needs to evaluate:",
    "options": [
      "Protective-earth testing under specified conditions",
      "Waveform shape, amplitude, and timing",
      "Accurate low-ohm lead compensation",
      "Traceable static pressure generation"
    ],
    "answer": 1,
    "explanation": "Oscilloscopes display voltage versus time, making waveform and timing problems visible.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-015"
  },
  {
    "question": "A 5 V digital logic rail measures 3.1 V under load but 5.0 V with the load disconnected. What does this MOST strongly suggest?",
    "options": [
      "A possible overloaded supply or excessive series resistance",
      "The unloaded reading proves the supply meets its load rating",
      "The output must be adjusted to 5 V without investigating load",
      "The voltage difference proves the processor firmware is corrupt"
    ],
    "answer": 0,
    "explanation": "A rail that collapses only under load points toward excessive load, weak supply regulation, or resistance in the power path.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-016"
  },
  {
    "question": "An NTC thermistor commonly has what behavior as temperature rises?",
    "options": [
      "Resistance increases with temperature",
      "Resistance remains fixed across its operating range",
      "Resistance depends only on applied AC frequency",
      "Resistance decreases"
    ],
    "answer": 3,
    "explanation": "For a negative-temperature-coefficient thermistor, resistance decreases as temperature increases.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-017"
  },
  {
    "question": "A relay allows a low-power control circuit to:",
    "options": [
      "Regulate a supply's DC output continuously",
      "Store enough energy to power the load during an outage",
      "Switch another electrical circuit",
      "Provide galvanic isolation in every circuit it is fitted to"
    ],
    "answer": 2,
    "explanation": "A relay uses an electrically controlled coil or solid-state mechanism to switch another circuit.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-018"
  },
  {
    "question": "A technician suspects an intermittent connector. Which technique is MOST useful?",
    "options": [
      "Check unloaded continuity only and stop if it passes",
      "Monitor the relevant signal while gently stressing the connector/cable under controlled conditions",
      "Measure only with the connector fixed in one position",
      "Replace the attached board before inspecting contacts"
    ],
    "answer": 1,
    "explanation": "Controlled manipulation while monitoring the affected signal can reproduce and localize connector-related intermittents.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-019"
  },
  {
    "question": "When measuring very low resistance, which factor can create a significant error?",
    "options": [
      "Test-lead and contact resistance",
      "Input impedance when measuring an isolated resistor",
      "AC bandwidth when measuring steady resistance",
      "Voltage autoranging while the meter is in ohms mode"
    ],
    "answer": 0,
    "explanation": "Lead and contact resistance can be comparable to the resistance being measured and must be accounted for.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "electronics",
    "id": "cbet-v2-020"
  },
  {
    "question": "An infusion pump has a nonfunctional occlusion alarm but delivers the programmed rate accurately. What should be done?",
    "options": [
      "Release after a second flow test without testing the alarm",
      "Recalibrate delivery accuracy before investigating the alarm",
      "Record the alarm failure but release after battery testing",
      "Remove it from service until alarm function is restored and verified"
    ],
    "answer": 3,
    "explanation": "Required alarm functionality is part of safe device performance; accurate flow alone does not make the pump acceptable.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "safety",
    "id": "cbet-v2-021"
  },
  {
    "question": "After repairing a life-support device, what should occur before it is returned to clinical use?",
    "options": [
      "Release once the original symptom no longer appears",
      "Use a successful power-on check as the final release test",
      "Required functional and safety verification with documented results",
      "Release after confirming the replacement part fits"
    ],
    "answer": 2,
    "explanation": "Post-repair verification must demonstrate that the device meets applicable functional and safety requirements before release.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "safety",
    "id": "cbet-v2-022"
  },
  {
    "question": "A three-wire power cord has a damaged protective-earth conductor. The device should be:",
    "options": [
      "Record the earth-path fault without correcting it",
      "Removed from service until the protective-earth path is corrected and verified",
      "Release after checking line-to-neutral continuity only",
      "Release because the functional self-test passes"
    ],
    "answer": 1,
    "explanation": "A compromised protective-earth path can defeat a key protection against shock and requires correction.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "safety",
    "id": "cbet-v2-023"
  },
  {
    "question": "Which instrument is specifically designed to evaluate electrical safety parameters such as leakage current and protective-earth resistance?",
    "options": [
      "Electrical safety analyzer",
      "ECG patient simulator",
      "Flow and pressure analyzer",
      "Defibrillator energy analyzer"
    ],
    "answer": 0,
    "explanation": "An electrical safety analyzer is designed for measurements such as leakage current and protective-earth continuity/resistance.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "safety",
    "id": "cbet-v2-024"
  },
  {
    "question": "Why should a technician follow the manufacturer’s specified fuse type and rating?",
    "options": [
      "To ensure any same-size fuse provides identical protection",
      "To make a slower fuse acceptable for every inrush condition",
      "To compensate for an unresolved downstream overload",
      "Because the fuse is part of the device’s designed overcurrent protection"
    ],
    "answer": 3,
    "explanation": "Fuse current, voltage, speed, and interrupt characteristics are selected as part of the protection design.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "safety",
    "id": "cbet-v2-025"
  },
  {
    "question": "A medical device arrives from an outside repair vendor. Before clinical use, the BEST action is to:",
    "options": [
      "Confirm the asset tag and release without functional tests",
      "Repeat the original complaint test but omit required safety checks",
      "Complete the facility’s required incoming/return-to-service verification",
      "Rely only on the vendor's repair invoice"
    ],
    "answer": 2,
    "explanation": "The facility should verify required safety, function, configuration, and documentation before returning the device to use.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "safety",
    "id": "cbet-v2-026"
  },
  {
    "question": "A device has an intermittent fault that can disable a critical alarm. Even if the fault cannot be reproduced every time, the BEST action is to:",
    "options": [
      "Release after verifying a different alarm channel",
      "Quarantine it until the safety-related fault is resolved",
      "Release after several successful power cycles",
      "Record the problem and increase the next PM frequency"
    ],
    "answer": 1,
    "explanation": "An intermittent safety-related failure can recur unpredictably and should not be accepted for clinical service.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "safety",
    "id": "cbet-v2-027"
  },
  {
    "question": "Which documentation BEST supports a decision to return repaired equipment to service?",
    "options": [
      "Completed service documentation including relevant test results",
      "A parts invoice listing the replacement assembly",
      "A record stating that startup self-test passed",
      "An asset record showing the next scheduled PM date"
    ],
    "answer": 0,
    "explanation": "Documented verification results provide evidence that required performance and safety checks were completed.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "service",
    "id": "cbet-v2-028"
  },
  {
    "question": "A damaged strain relief on a power cord is significant because it can:",
    "options": [
      "Introduce an insulation barrier that improves earth continuity",
      "Change the cord's voltage rating without conductor damage",
      "Prove that leakage is acceptable while the device operates",
      "Allow conductor damage and create shock or intermittent-fault risk"
    ],
    "answer": 3,
    "explanation": "Strain relief protects conductors from repeated bending and pull forces; damage can lead to exposed or intermittent conductors.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "safety",
    "id": "cbet-v2-029"
  },
  {
    "question": "Which factor should MOST strongly guide a preventive-maintenance interval?",
    "options": [
      "The date a replacement battery was last ordered",
      "A universal interval chosen without device risk assessment",
      "Manufacturer recommendations, device risk, regulatory requirements, and facility policy",
      "The number of devices awaiting service alone"
    ],
    "answer": 2,
    "explanation": "PM strategy should be risk- and evidence-based and consistent with applicable requirements and organizational policy.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "service",
    "id": "cbet-v2-030"
  },
  {
    "question": "During incoming inspection, a device has the correct model but an accessory is not approved for that device. What is the BEST response?",
    "options": [
      "Release it if the accessory powers on without an error",
      "Verify compatibility and approved use before clinical release",
      "Treat mechanical connector fit as sufficient compatibility",
      "Accept the accessory after checking its color code only"
    ],
    "answer": 1,
    "explanation": "Physical fit does not establish compatibility; accessory approval and validated performance must be confirmed.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "safety",
    "id": "cbet-v2-031"
  },
  {
    "question": "A technician discovers fluid intrusion inside a powered medical device. What is the FIRST priority?",
    "options": [
      "Remove it from service and make it safe before further evaluation",
      "Run a full powered functional test before isolating it",
      "Dry the enclosure externally and repeat patient-use testing",
      "Adjust the input fuse rating before inspecting contamination"
    ],
    "answer": 0,
    "explanation": "Potential fluid intrusion creates electrical and corrosion risks; the device should be made safe and evaluated before energizing.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "safety",
    "id": "cbet-v2-032"
  },
  {
    "question": "A device’s audible alarm works, but its required visual alarm indicator does not. The device is:",
    "options": [
      "Ready if the audible alarm passes at maximum volume",
      "Ready if the failed light is noted on the service label",
      "Ready if the self-test does not report an alarm error",
      "Not ready for service until required alarm functionality is restored"
    ],
    "answer": 3,
    "explanation": "If the device design requires both alarm modalities, loss of one means alarm performance is incomplete.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "safety",
    "id": "cbet-v2-033"
  },
  {
    "question": "When servicing equipment connected to mains power, lockout/tagout procedures are intended primarily to:",
    "options": [
      "Improve the accuracy of low-voltage measurements",
      "Prevent loss of stored calibration during board replacement",
      "Control hazardous energy and prevent unexpected energization",
      "Validate the cybersecurity configuration of the device"
    ],
    "answer": 2,
    "explanation": "Lockout/tagout controls hazardous energy so equipment cannot be unexpectedly energized during applicable service work.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "safety",
    "id": "cbet-v2-034"
  },
  {
    "question": "A recall notice applies to a model in the hospital inventory. What is the BEST first operational step?",
    "options": [
      "Apply the correction to units outside the listed affected range",
      "Identify affected units/serial numbers and follow the recall or correction instructions",
      "Remove every unit of that product family immediately",
      "Wait for the next scheduled PM to check serial numbers"
    ],
    "answer": 1,
    "explanation": "Recall management begins by determining which assets are affected and implementing the specified corrective action.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "service",
    "id": "cbet-v2-035"
  },
  {
    "question": "Why is post-repair configuration verification important after a main control board replacement?",
    "options": [
      "Incorrect configuration can alter alarms, options, calibration, or clinical behavior",
      "The previous board's defaults always match the device options",
      "A startup self-test replaces verification of model settings",
      "The replacement part number proves calibration is preserved"
    ],
    "answer": 0,
    "explanation": "Replacement boards may require model-, option-, or calibration-specific configuration before safe clinical use.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "service",
    "id": "cbet-v2-036"
  },
  {
    "question": "A technician uses a substitute power supply not specified for a medical device. What is the main concern?",
    "options": [
      "Only connector fit determines substitution suitability",
      "Matching output voltage proves equivalent isolation",
      "Similar wattage proves identical leakage performance",
      "Electrical characteristics, isolation, EMC, or safety performance may no longer be validated"
    ],
    "answer": 3,
    "explanation": "Unapproved power supplies can alter safety and performance characteristics even when voltage appears compatible.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "safety",
    "id": "cbet-v2-037"
  },
  {
    "question": "A device passes functional tests but fails a required electrical-safety test after repair. What is the correct disposition?",
    "options": [
      "Release with a shortened PM interval instead of repair",
      "Treat the failed safety test as advisory without evaluation",
      "Keep it out of service until the safety failure is corrected and retested",
      "Release after a repeat functional test passes"
    ],
    "answer": 2,
    "explanation": "Required safety criteria must be met as well as functional criteria before clinical release.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "safety",
    "id": "cbet-v2-038"
  },
  {
    "question": "Which analyzer is most appropriate for verifying delivered energy from a defibrillator?",
    "options": [
      "Patient ECG simulator",
      "Defibrillator analyzer",
      "General-purpose mains power meter",
      "Infusion delivery analyzer"
    ],
    "answer": 1,
    "explanation": "A defibrillator analyzer measures parameters such as delivered energy and can evaluate synchronization and other functions depending on model.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-039"
  },
  {
    "question": "An electrosurgical unit fails output verification at several load settings. Which test instrument is most appropriate?",
    "options": [
      "ESU analyzer",
      "Defibrillator energy analyzer",
      "General-purpose electrical-safety analyzer",
      "Ventilator flow analyzer"
    ],
    "answer": 0,
    "explanation": "An ESU analyzer is designed to measure electrosurgical output and related performance.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-040"
  },
  {
    "question": "To verify an NIBP monitor without using a patient, a technician would commonly use a:",
    "options": [
      "ECG simulator without pressure capability",
      "Ventilator analyzer without NIBP capability",
      "Oximeter optical simulator only",
      "Patient simulator with NIBP capability"
    ],
    "answer": 3,
    "explanation": "An NIBP-capable simulator can provide controlled pressure/pulse conditions for monitor evaluation.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-041"
  },
  {
    "question": "An SpO2 monitor reads erratically on multiple known-good sensors. Which check is MOST useful early in troubleshooting?",
    "options": [
      "Replace the sensor interface before checking connections",
      "Use one patient's saturation as the only reference",
      "Verify the problem with an appropriate simulator/tester and inspect the sensor interface",
      "Recalibrate the display before reproducing the fault"
    ],
    "answer": 2,
    "explanation": "Controlled simulation helps separate monitor/interface faults from patient, sensor, and environmental variables.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-042"
  },
  {
    "question": "In a controlled pump test, 105 mL is delivered for a 100 mL setting. The allowable tolerance is not provided. What should the technician do before deciding pass/fail or adjusting calibration?",
    "options": [
      "Repeat with unapproved tubing and use that result for release",
      "Compare the result with the manufacturer’s allowable accuracy and test method",
      "Adjust delivery calibration before checking the specified method",
      "Decide solely from the 5 mL difference without tolerance"
    ],
    "answer": 1,
    "explanation": "Acceptance depends on the specified test method and tolerance; verify against the manufacturer’s performance criteria before adjustment.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-043"
  },
  {
    "question": "A ventilator’s measured tidal volume differs from its displayed value. Which device is most appropriate for independent verification?",
    "options": [
      "Ventilator/flow analyzer",
      "Infusion pump analyzer",
      "Electrical-safety analyzer",
      "ECG patient simulator"
    ],
    "answer": 0,
    "explanation": "A ventilator or respiratory flow analyzer independently measures flow, volume, pressure, and related respiratory parameters.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-044"
  },
  {
    "question": "An ECG monitor displays a stable 60 bpm when connected to a simulator set to 120 bpm. What is the BEST next step?",
    "options": [
      "Change displayed heart-rate limits before checking the signal",
      "Replace the acquisition board before confirming simulator setup",
      "Use a manual cuff measurement to verify the ECG rate",
      "Verify simulator setup/leads, then evaluate the monitor signal path and settings"
    ],
    "answer": 3,
    "explanation": "Confirm the test setup first, then trace the ECG acquisition and processing path if the discrepancy remains.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-045"
  },
  {
    "question": "A pulse oximeter’s SpO2 value drops when bright surgical lighting is directed at the sensor. This most likely suggests:",
    "options": [
      "Incorrect pneumatic leak compensation",
      "A change in ECG sweep speed",
      "Optical interference at the sensor",
      "Hydrostatic offset in the pressure transducer"
    ],
    "answer": 2,
    "explanation": "Strong ambient light can interfere with optical pulse-oximetry sensing if shielding or sensor placement is inadequate.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-046"
  },
  {
    "question": "A defibrillator charges normally but delivers substantially low energy into the analyzer. Which area deserves investigation?",
    "options": [
      "Thermal printer feed and recording path",
      "Energy-storage/discharge path and output components",
      "ECG acquisition amplifier and lead selector",
      "Display rendering and touch-controller path"
    ],
    "answer": 1,
    "explanation": "Normal charging with low delivered energy points toward the storage/discharge/output path rather than unrelated subsystems.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-047"
  },
  {
    "question": "An infusion pump occlusion alarm activates at a much higher pressure than specified. Why is this important?",
    "options": [
      "It may delay detection of a blocked infusion line",
      "It proves flow-rate calibration is too high",
      "It proves the air-in-line detector is oversensitive",
      "It establishes that the tubing set is incorrectly sized"
    ],
    "answer": 0,
    "explanation": "An excessive occlusion-alarm threshold can delay recognition of downstream blockage and increase clinical risk.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-048"
  },
  {
    "question": "A suction regulator cannot maintain the set vacuum when flow is applied. What should be checked?",
    "options": [
      "Only the no-flow gauge calibration",
      "Only the container's external labeling",
      "Only the regulator's cosmetic condition",
      "Vacuum source, tubing/leaks, regulator performance, and test setup"
    ],
    "answer": 3,
    "explanation": "Loss of vacuum under load can arise from supply limitations, leaks, restrictions, or regulator malfunction.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-049"
  },
  {
    "question": "An anesthesia machine oxygen analyzer reads lower than a calibrated reference. What should occur before clinical release?",
    "options": [
      "Set the alarm limit below the low reading and release",
      "Use the gas-flow setting as proof the sensor is accurate",
      "Evaluate/calibrate or repair the oxygen-monitoring function per procedure",
      "Release if the displayed oxygen value remains stable"
    ],
    "answer": 2,
    "explanation": "Accurate oxygen concentration monitoring is safety-critical and discrepancies must be resolved before use.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-050"
  },
  {
    "question": "A syringe pump intermittently alarms “occlusion” with no downstream restriction. Which cause is MOST plausible?",
    "options": [
      "A stable voltage reference unrelated to the sensing path",
      "Faulty pressure sensing or mechanical drive resistance",
      "A consistently incorrect displayed time setting",
      "A problem with the pump's stored network gateway"
    ],
    "answer": 1,
    "explanation": "False occlusion alarms can result from pressure-sensing errors, drive friction, syringe seating, or related mechanical factors.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-051"
  },
  {
    "question": "A patient monitor’s ECG waveform is noisy only when plugged into one wall outlet and becomes clean on battery. What should be investigated?",
    "options": [
      "Room power quality/grounding and environmental interference",
      "Replace the acquisition module before comparing locations",
      "Calibrate ECG gain before reproducing the noise",
      "Change the heart-rate limits to suppress the displayed noise"
    ],
    "answer": 0,
    "explanation": "The location- and mains-dependent pattern points toward power/grounding or environmental interference rather than a purely internal ECG fault.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-052"
  },
  {
    "question": "A fetal monitor transducer produces intermittent signal loss when its cable is flexed near the connector. What is the BEST next step?",
    "options": [
      "Replace the monitor processor before evaluating the transducer",
      "Calibrate the displayed scale while the cable is stationary",
      "Accept stationary operation as sufficient fault clearance",
      "Inspect and test the cable/connector for an intermittent conductor"
    ],
    "answer": 3,
    "explanation": "A flex-dependent failure strongly implicates the cable or connector and should be reproduced and localized.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-053"
  },
  {
    "question": "An ultrasound transducer has a visible crack in its housing. The MOST appropriate action is to:",
    "options": [
      "Complete only an exterior cleaning before release",
      "Treat an intact connector as proof the housing is safe",
      "Remove it from service and evaluate according to manufacturer/facility procedure",
      "Use image quality alone as the release criterion"
    ],
    "answer": 2,
    "explanation": "Physical damage can affect electrical safety, infection control, acoustic performance, and internal integrity.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-054"
  },
  {
    "question": "A temperature monitor consistently reads 2 °C high with a known reference. What should be verified before calibration?",
    "options": [
      "Verify only room temperature, without checking probe type",
      "Probe type, reference accuracy, connections, and specified test conditions",
      "Adjust the indicated value before validating the reference",
      "Replace the display before checking the probe specification"
    ],
    "answer": 1,
    "explanation": "Test setup and reference accuracy must be confirmed before concluding that calibration is required.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-055"
  },
  {
    "question": "A device battery shows normal voltage with no load but collapses under load. This MOST strongly indicates:",
    "options": [
      "Reduced battery capacity/high internal resistance",
      "Normal behavior for a battery meeting its rated load",
      "Incorrect ECG gain in the acquisition module",
      "A fault confined to the display's brightness control"
    ],
    "answer": 0,
    "explanation": "A degraded battery may maintain open-circuit voltage but sag excessively when current is demanded.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-056"
  },
  {
    "question": "A ventilator passes startup self-test but fails to reach commanded pressure during a test lung evaluation. Which is the BEST troubleshooting direction?",
    "options": [
      "Accept startup self-test as sufficient performance evidence",
      "Recalibrate the display without independent measurement",
      "Replace the network module before checking pneumatics",
      "Check circuit leaks, valves, flow/pressure generation, sensors, and test setup"
    ],
    "answer": 3,
    "explanation": "A passed self-test does not guarantee delivered respiratory performance; the pneumatic path and measurement system must be evaluated.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-057"
  },
  {
    "question": "A medical gas flowmeter ball sticks at several positions. What is the safest response?",
    "options": [
      "Increase input pressure to overcome sticking in use",
      "Use an unapproved lubricant before repeating the check",
      "Remove it from service and evaluate/replace it according to procedure",
      "Release it after confirming supply pressure alone"
    ],
    "answer": 2,
    "explanation": "A sticking flow indicator can produce unreliable gas delivery and should be corrected using approved procedures.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-058"
  },
  {
    "question": "An ECG lead-off alarm never activates when a lead is disconnected during testing. The monitor should be:",
    "options": [
      "Document the failed detection without restoring the alarm",
      "Removed from service until the alarm function is corrected and verified",
      "Release if the lead-connected waveform appears normal",
      "Verify only the heart-rate numeric display before release"
    ],
    "answer": 1,
    "explanation": "Lead-off detection is a required monitoring/alarm function and must operate correctly before release.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-059"
  },
  {
    "question": "A defibrillator synchronization marker does not consistently align with the simulated R wave. What is the concern?",
    "options": [
      "Synchronized cardioversion timing may be unsafe or ineffective",
      "The event marker is only a printer formatting feature",
      "The marker proves delivered energy is below specification",
      "The marker verifies correct pacing current at every setting"
    ],
    "answer": 0,
    "explanation": "Synchronization depends on accurate R-wave detection; misalignment can cause shock delivery at an inappropriate point in the cardiac cycle.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "devices",
    "id": "cbet-v2-060"
  },
  {
    "question": "A device reaches its gateway and the server by IP address, but the same service fails by hostname. Which issue is most strongly supported?",
    "options": [
      "A DNS problem is proved even if the server IP also fails",
      "An application failure is excluded by reaching the gateway",
      "The default gateway is unreachable under all conditions",
      "DNS/name-resolution problem"
    ],
    "answer": 3,
    "explanation": "Gateway connectivity with hostname failure suggests name resolution should be investigated.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "networking",
    "id": "cbet-v2-061"
  },
  {
    "question": "Two devices are accidentally configured with the same static IP address. What symptom is likely?",
    "options": [
      "A permanent physical-link loss on both devices",
      "A subnet-mask mismatch with no address conflict",
      "Intermittent or conflicting network connectivity",
      "Guaranteed failure of name resolution only"
    ],
    "answer": 2,
    "explanation": "Duplicate IP addresses can cause ARP conflicts and unstable connectivity for one or both devices.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "networking",
    "id": "cbet-v2-062"
  },
  {
    "question": "What does a subnet mask help a networked device determine?",
    "options": [
      "Which application port is permitted through a firewall",
      "Which addresses are local versus reached through a router",
      "Which server name maps to a particular IP address",
      "Which physical connector the network cable uses"
    ],
    "answer": 1,
    "explanation": "The subnet mask identifies the network portion of an IP address and whether a destination is on the local subnet.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "networking",
    "id": "cbet-v2-063"
  },
  {
    "question": "A device connects to Wi-Fi but repeatedly drops when moved between access-point coverage areas. What should be evaluated?",
    "options": [
      "Roaming behavior, signal coverage, authentication, and wireless configuration",
      "Only the device's fixed bench RSSI",
      "Only the last DHCP lease printed in the record",
      "Only the battery's open-circuit voltage"
    ],
    "answer": 0,
    "explanation": "Mobility-related drops point toward wireless coverage/roaming and authentication/configuration rather than unrelated clinical functions.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "networking",
    "id": "cbet-v2-064"
  },
  {
    "question": "Why should default passwords on network-capable medical equipment be changed when supported and required by policy?",
    "options": [
      "To establish network segmentation by itself",
      "To replace the need for access-control review",
      "To ensure every vendor account has administrator rights",
      "To reduce unauthorized-access risk"
    ],
    "answer": 3,
    "explanation": "Default credentials are widely known or predictable and can create avoidable security risk.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "cybersecurity",
    "id": "cbet-v2-065"
  },
  {
    "question": "A vendor asks a technician to connect an unknown USB drive to a clinical device for a software update. What is the BEST action?",
    "options": [
      "Install it first and review change records afterward",
      "Use matching connector type as proof the media is trusted",
      "Follow approved change-control/cybersecurity procedures and verify the update media/source",
      "Use the vendor's verbal assurance as the only authorization"
    ],
    "answer": 2,
    "explanation": "Software updates should use authorized media and controlled procedures to reduce malware, integrity, and configuration risk.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "cybersecurity",
    "id": "cbet-v2-066"
  },
  {
    "question": "A medical device is suspected of malware infection but is still communicating on the clinical network. What is the BEST initial response?",
    "options": [
      "Treat successful application communication as proof of safety",
      "Follow the organization’s incident-response process and coordinate containment without compromising patient safety",
      "Erase the device before preserving incident evidence",
      "Disconnect it without coordinating continuity of patient support"
    ],
    "answer": 1,
    "explanation": "Cybersecurity incidents require coordinated containment, evidence preservation, and patient-safety consideration under the organization’s response process.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "cybersecurity",
    "id": "cbet-v2-067"
  },
  {
    "question": "What is the purpose of a MAC address in Ethernet/Wi-Fi networking?",
    "options": [
      "Identify a network interface at the data-link layer",
      "Identify an application service by its transport port",
      "Assign a host to a routed IP subnet",
      "Resolve a DNS name to an IPv4 address"
    ],
    "answer": 0,
    "explanation": "A MAC address is a link-layer identifier associated with a network interface.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "networking",
    "id": "cbet-v2-068"
  },
  {
    "question": "A device receives an address beginning with 169.254.x.x when it normally uses DHCP. What does this commonly indicate?",
    "options": [
      "A valid DHCP lease on the expected routed subnet",
      "A guarantee that the default gateway responds",
      "Proof that the configured DNS server is operating",
      "It could not obtain a DHCP lease and self-assigned a link-local address"
    ],
    "answer": 3,
    "explanation": "169.254.x.x is commonly an automatic link-local address used when DHCP assignment fails.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "networking",
    "id": "cbet-v2-069"
  },
  {
    "question": "Why is accurate time synchronization important for networked medical devices?",
    "options": [
      "It establishes valid calibration of every measured parameter",
      "It substitutes for recording device identity during an incident",
      "It supports reliable event correlation, logs, alarms, and clinical records",
      "It proves the device firmware matches the newest release"
    ],
    "answer": 2,
    "explanation": "Consistent timestamps are important when correlating events across devices and clinical information systems.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "networking",
    "id": "cbet-v2-070"
  },
  {
    "question": "A networked monitor works on one switch port but not another using the same cable and configuration. What is the BEST next step?",
    "options": [
      "Recalibrate the clinical parameter before comparing link status",
      "Compare switch-port configuration/VLAN/status and physical link on the failing port",
      "Replace the device NIC before comparing port state",
      "Change the battery before checking network configuration"
    ],
    "answer": 1,
    "explanation": "Port-specific behavior points toward switch configuration, VLAN, port security, or physical-layer issues at that port.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "networking",
    "id": "cbet-v2-071"
  },
  {
    "question": "What is the main cybersecurity purpose of network segmentation for medical devices?",
    "options": [
      "Limit unnecessary communication paths and reduce the impact of compromise",
      "Encrypt every stored record automatically",
      "Authenticate every account without credentials",
      "Replace the need to manage approved software updates"
    ],
    "answer": 0,
    "explanation": "Segmentation can restrict traffic and reduce lateral movement or exposure if a device or system is compromised.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "cybersecurity",
    "id": "cbet-v2-072"
  },
  {
    "question": "Before installing a vendor software patch on a clinical device, the technician should FIRST:",
    "options": [
      "Install the patch before reviewing device-model compatibility",
      "Assume the patch preserves every configuration by default",
      "Use a successful download as the only integrity verification",
      "Confirm authorization, compatibility, backup/change-control requirements, and the vendor/facility procedure"
    ],
    "answer": 3,
    "explanation": "Controlled patching protects clinical function and configuration while ensuring the update is approved and supported.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "cybersecurity",
    "id": "cbet-v2-073"
  },
  {
    "question": "Which chamber pumps oxygenated blood into systemic circulation?",
    "options": [
      "Left atrium",
      "Left ventricle",
      "Right atrium",
      "Right ventricle"
    ],
    "answer": 1,
    "explanation": "The left ventricle ejects oxygenated blood into the aorta and systemic circulation.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "physiology",
    "id": "cbet-v2-074"
  },
  {
    "question": "Which structure normally initiates the heartbeat in a healthy heart?",
    "options": [
      "Purkinje fibers",
      "AV node",
      "SA node",
      "Bundle branches"
    ],
    "answer": 2,
    "explanation": "The sinoatrial node is the normal primary pacemaker of the heart.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "physiology",
    "id": "cbet-v2-075"
  },
  {
    "question": "On a normal ECG, the QRS complex primarily represents:",
    "options": [
      "Atrial depolarization",
      "Ventricular depolarization",
      "Ventricular repolarization",
      "Mechanical valve closure"
    ],
    "answer": 1,
    "explanation": "The QRS complex corresponds primarily to ventricular depolarization.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "physiology",
    "id": "cbet-v2-076"
  },
  {
    "question": "Pulse oximetry estimates arterial oxygen saturation primarily by analyzing:",
    "options": [
      "Light absorption at different wavelengths through pulsatile tissue",
      "Blood pressure oscillations",
      "Carbon dioxide pressure directly",
      "Electrical impedance of the chest"
    ],
    "answer": 0,
    "explanation": "Pulse oximeters use wavelength-dependent light absorption and the pulsatile arterial component to estimate SpO2.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "physiology",
    "id": "cbet-v2-077"
  },
  {
    "question": "A capnograph primarily measures and displays:",
    "options": [
      "Blood glucose",
      "Electrical cardiac activity",
      "Exhaled carbon dioxide over time",
      "Arterial blood pressure"
    ],
    "answer": 2,
    "explanation": "Capnography measures CO2 in respiratory gas and displays its concentration/partial pressure over the respiratory cycle.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "physiology",
    "id": "cbet-v2-078"
  },
  {
    "question": "Which blood vessel carries deoxygenated blood from the right ventricle toward the lungs?",
    "options": [
      "Superior vena cava",
      "Aorta",
      "Pulmonary artery",
      "Pulmonary vein"
    ],
    "answer": 2,
    "explanation": "The pulmonary artery carries deoxygenated blood from the right ventricle to the lungs.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "physiology",
    "id": "cbet-v2-079"
  },
  {
    "question": "Invasive arterial blood pressure monitoring requires the pressure transducer to be leveled and zeroed primarily to:",
    "options": [
      "Reduce hydrostatic measurement error and establish atmospheric reference",
      "Increase transducer sensitivity to cancel all drift",
      "Remove physiological pulse pressure from the reading",
      "Set an arbitrary baseline independent of transducer height"
    ],
    "answer": 0,
    "explanation": "Leveling controls hydrostatic offset and zeroing establishes the atmospheric reference for pressure measurement.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "physiology",
    "id": "cbet-v2-080"
  },
  {
    "question": "Why can patient motion interfere with pulse-oximetry readings?",
    "options": [
      "Motion creates true arterial desaturation in every case",
      "Motion changes LED wavelengths into ECG signals",
      "Motion proves that the detector has permanently failed",
      "Motion can create optical pulsations/artifact that compete with the arterial signal"
    ],
    "answer": 3,
    "explanation": "Pulse oximetry relies on detecting a small pulsatile optical signal, so motion can create competing artifact.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "physiology",
    "id": "cbet-v2-081"
  },
  {
    "question": "The diaphragm’s primary role in normal breathing is to:",
    "options": [
      "Generate electrical impulses for atrial contraction",
      "Move oxygen directly from hemoglobin into tissue",
      "Generate the main pressure change that draws air into the lungs during inspiration",
      "Close the aortic valve during ventricular relaxation"
    ],
    "answer": 2,
    "explanation": "Diaphragm contraction enlarges the thoracic cavity and creates the pressure gradient for inspiration.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "physiology",
    "id": "cbet-v2-082"
  },
  {
    "question": "A patient simulator used for ECG testing primarily provides:",
    "options": [
      "An optical source for pulse-oximeter saturation testing",
      "Controlled electrical waveforms that mimic cardiac signals",
      "A load for measuring defibrillator discharge energy",
      "A calibrated pressure source for invasive transducers"
    ],
    "answer": 1,
    "explanation": "ECG simulators generate known electrical waveforms so monitor acquisition, rate, alarms, and related functions can be evaluated.",
    "difficulty": "easy",
    "category": "cbet",
    "topic": "physiology",
    "id": "cbet-v2-083"
  },
  {
    "question": "A device fails only after operating for about 20 minutes and works again after cooling. What type of fault is MOST likely?",
    "options": [
      "Thermal/intermittent electronic fault",
      "A constant error in the asset database",
      "An unchanging unit-conversion setting",
      "A physical cable break unaffected by temperature"
    ],
    "answer": 0,
    "explanation": "A repeatable warm-up/cool-down pattern strongly suggests a temperature-dependent component, connection, or circuit fault.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "troubleshooting",
    "id": "cbet-v2-084"
  },
  {
    "question": "A device repeatedly returns with the same failure after the same board is replaced. What should the technician do?",
    "options": [
      "Replace the same board again without reviewing conditions",
      "Limit testing to the new board while ignoring its supply",
      "Use the replacement part invoice as root-cause evidence",
      "Reassess the root cause and investigate upstream/downstream conditions that may be causing the failure"
    ],
    "answer": 3,
    "explanation": "Repeated recurrence after board replacement suggests the board may be a symptom rather than the underlying cause.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "troubleshooting",
    "id": "cbet-v2-085"
  },
  {
    "question": "A service report says “unable to duplicate,” but the clinical user can reproduce the problem consistently. What should be improved FIRST?",
    "options": [
      "Only the scheduled inspection interval",
      "Only the installed device-model label",
      "Complaint details and reproduction conditions",
      "Only the replacement-parts ordering history"
    ],
    "answer": 2,
    "explanation": "Detailed conditions, sequence, accessories, environment, and symptoms are essential for reproducing intermittent complaints.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "troubleshooting",
    "id": "cbet-v2-086"
  },
  {
    "question": "A device intermittently fails self-test only after transport between departments. Which approach is BEST?",
    "options": [
      "Adjust self-test thresholds before inspecting connectors",
      "Inspect connectors/mounting and reproduce the failure while simulating controlled movement",
      "Check stationary operation only and release after a pass",
      "Replace the charger before reproducing the motion fault"
    ],
    "answer": 1,
    "explanation": "A transport-dependent fault suggests loose connections, mechanical stress, or movement-sensitive components.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "troubleshooting",
    "id": "cbet-v2-087"
  },
  {
    "question": "A monitor powers on but one subsystem is completely dead. What is the BEST general troubleshooting strategy?",
    "options": [
      "Verify inputs/power rails and trace the signal/power path toward the failed subsystem",
      "Replace the processor before checking subsystem inputs",
      "Verify only the unaffected functions and release",
      "Repeat startup without measuring the failed section"
    ],
    "answer": 0,
    "explanation": "Systematic troubleshooting begins with known inputs and power, then follows the functional path to isolate the failed stage.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "troubleshooting",
    "id": "cbet-v2-088"
  },
  {
    "question": "A device works correctly on the bench but fails in the clinical area. What should the technician investigate?",
    "options": [
      "Assume a normal bench test excludes the reported fault",
      "Replace the main board before comparing use conditions",
      "Change the display setup without recreating the complaint",
      "Environmental, accessory, network, power, workflow, and use-condition differences"
    ],
    "answer": 3,
    "explanation": "Differences between bench and clinical conditions can expose power, accessory, environmental, configuration, network, or workflow-dependent failures.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "troubleshooting",
    "id": "cbet-v2-089"
  },
  {
    "question": "A replacement board fixes the symptom, but the original board shows a burned component. What is the BEST next question?",
    "options": [
      "Can normal startup alone establish safe performance?",
      "Does clearing the error log prove the failure is resolved?",
      "What caused the component to fail?",
      "Does the replacement board fit the same mounting points?"
    ],
    "answer": 2,
    "explanation": "Root-cause analysis asks whether another fault, load, supply problem, environment, or design condition caused the visible damage.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "troubleshooting",
    "id": "cbet-v2-090"
  },
  {
    "question": "A technician is troubleshooting an intermittent device and changes three variables at once. Why is this poor practice?",
    "options": [
      "Recording the parts used removes the need to isolate variables",
      "It makes it difficult to identify which change affected the symptom",
      "Each simultaneous change independently proves root cause",
      "A final pass identifies the failed component without isolation"
    ],
    "answer": 1,
    "explanation": "Controlled troubleshooting changes one variable at a time when practical so cause and effect can be established.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "troubleshooting",
    "id": "cbet-v2-091"
  },
  {
    "question": "A device fails a test only when a specific accessory is attached. What is the BEST next step?",
    "options": [
      "Evaluate the accessory, interface, and compatibility using a known-good comparison when available",
      "Verify only the main device without the reported accessory",
      "Adjust calibration to compensate for the accessory fault",
      "Replace the main assembly before comparing accessories"
    ],
    "answer": 0,
    "explanation": "Accessory-dependent failures should be isolated by testing the accessory/interface and comparing with known-good components.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "troubleshooting",
    "id": "cbet-v2-092"
  },
  {
    "question": "A newly replaced battery has poor runtime. Which check should occur before assuming the new battery is defective?",
    "options": [
      "Use open-circuit battery voltage as the sole capacity test",
      "Replace the battery again without checking charge state",
      "Treat a correct connector fit as proof of battery compatibility",
      "Verify charging operation, battery type/compatibility, charge state, and device load"
    ],
    "answer": 3,
    "explanation": "Poor runtime can result from charging faults, wrong battery type, incomplete charge, abnormal device load, or a defective battery.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "troubleshooting",
    "id": "cbet-v2-093"
  },
  {
    "question": "A device produces a burning odor during testing but continues to operate. What should the technician do?",
    "options": [
      "Accept a passing startup test as proof overheating is harmless",
      "Record only the successful functions and release it",
      "De-energize/remove it from service and inspect for overheating or component damage",
      "Complete additional powered tests before controlling the hazard"
    ],
    "answer": 2,
    "explanation": "A burning odor can indicate overheating or electrical damage and warrants immediate safe shutdown and investigation.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "troubleshooting",
    "id": "cbet-v2-094"
  },
  {
    "question": "A device has a complaint of “random shutdown.” Logs show shutdowns occur whenever battery voltage falls below a threshold. What should be investigated FIRST?",
    "options": [
      "Change network addressing before reviewing shutdown evidence",
      "Battery condition, charging system, connections, and power-management behavior",
      "Adjust the display backlight before testing the power path",
      "Replace the ECG acquisition board without checking power"
    ],
    "answer": 1,
    "explanation": "The log correlation points directly toward the battery/power path and should guide focused testing.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "troubleshooting",
    "id": "cbet-v2-095"
  },
  {
    "question": "A technician replaces a sensor and the reading is still wrong. What is the BEST next step?",
    "options": [
      "Verify the reference/test setup and trace the entire measurement chain rather than replacing more parts at random",
      "Adjust calibration against the suspect displayed value",
      "Replace another sensor without confirming compatibility",
      "Use a passing startup check instead of tracing the measurement"
    ],
    "answer": 0,
    "explanation": "Persistent error after sensor replacement calls for systematic verification of reference, wiring, excitation, signal conditioning, conversion, and configuration.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "troubleshooting",
    "id": "cbet-v2-096"
  },
  {
    "question": "A device passes all tests after repair, but the technician cannot reproduce the original complaint. What is the BEST documentation approach?",
    "options": [
      "Record confirmed repair even if the complaint remains unverified",
      "Omit test conditions because the final tests passed",
      "Close the record with the replacement part number only",
      "Document the complaint, tests performed, conditions used, findings, and disposition accurately"
    ],
    "answer": 3,
    "explanation": "Clear documentation should preserve the reported symptom and objectively describe the investigation and results.",
    "difficulty": "medium",
    "category": "cbet",
    "topic": "service",
    "id": "cbet-v2-097"
  },
  {
    "question": "Which approach BEST supports root-cause repair instead of repeated temporary fixes?",
    "options": [
      "Repeat the temporary reset without examining failure history",
      "Restrict final testing to whether the device starts",
      "Trend failures, reproduce conditions, use evidence to isolate the failed stage, then verify the repair",
      "Replace the most commonly failed part without reproducing symptoms"
    ],
    "answer": 2,
    "explanation": "Root-cause troubleshooting uses reproducible evidence and verification rather than repeated resets or random parts replacement.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "troubleshooting",
    "id": "cbet-v2-098"
  },
  {
    "question": "A technician finds a loose connector and reseats it, restoring operation. What should happen next?",
    "options": [
      "Close the record without inspecting contact or retention damage",
      "Determine why it loosened, inspect for damage, secure as specified, and complete verification",
      "Use restored operation as the only release evidence",
      "Secure it by an undocumented method before testing"
    ],
    "answer": 1,
    "explanation": "Restoring function is not enough; the cause, connector condition, retention, and complete post-repair performance should be addressed.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "troubleshooting",
    "id": "cbet-v2-099"
  },
  {
    "question": "A device has multiple stored error codes. What is the BEST way to use them?",
    "options": [
      "Correlate codes with timestamps, symptoms, service information, and controlled testing rather than replacing parts from codes alone",
      "Replace the first assembly named without checking chronology",
      "Treat every historical code as an active fault",
      "Clear the codes before recording their timing and context"
    ],
    "answer": 0,
    "explanation": "Error codes are diagnostic clues and should be interpreted in context with symptoms, history, and verification testing.",
    "difficulty": "hard",
    "category": "cbet",
    "topic": "troubleshooting",
    "id": "cbet-v2-100"
  },

];

const extraCategories = [
  "eye",
  "ear",
  "arterial system",
  "lungs",
  "liver",
  "kidney",
  "venous system",
  "cbet",
];

const allCategories = Array.from(
  new Set([...allQuestions.map((q) => q.category), ...extraCategories])
).sort();

const equipmentQuestions = [
  {
    image: "/equipment/anesthesia machine.jpg",
    question: "Identify this equipment.",
    options: ["Anesthesia machine", "Ventilator", "Defibrillator", "Suction machine"],
    answer: 0,
    studyTip: "Used to deliver inhaled anesthetics, oxygen, and ventilation support during procedures.",
  },
  {
    image: "/equipment/defibrillator.jpg",
    question: "Identify this equipment.",
    options: ["Patient monitor", "Defibrillator", "Infusion pump", "ECG machine"],
    answer: 1,
    studyTip: "Used to deliver controlled shocks for life-threatening arrhythmias.",
  },
  {
    image: "/equipment/ekg machine.jpg",
    question: "Identify this equipment.",
    options: ["ECG/EKG machine", "Pulse oximeter", "Ventilator", "Fetal monitor"],
    answer: 0,
    studyTip: "Records electrical activity of the heart using surface electrodes.",
  },
  {
    image: "/equipment/electrosurgical unit.jpg",
    question: "Identify this equipment.",
    options: ["Syringe pump", "Electrosurgical unit", "Anesthesia machine", "Ultrasound machine"],
    answer: 1,
    studyTip: "Provides high-frequency electrical energy for cutting/coagulation in surgery.",
  },
  {
    image: "/equipment/fetal monitor.jpg",
    question: "Identify this equipment.",
    options: ["Fetal monitor", "Patient monitor", "Infusion pump", "Defibrillator"],
    answer: 0,
    studyTip: "Tracks fetal heart rate and uterine contractions during pregnancy/labor.",
  },
  {
    image: "/equipment/infusion pump.jpg",
    question: "Identify this equipment.",
    options: ["Infusion pump", "Suction regulator", "Pulse oximeter", "Ventilator"],
    answer: 0,
    studyTip: "Delivers IV fluids and medications at controlled rates.",
  },
  {
    image: "/equipment/patient monitor.jpg",
    question: "Identify this equipment.",
    options: ["Defibrillator", "Patient monitor", "Ultrasound machine", "ECG machine"],
    answer: 1,
    studyTip: "Displays vital signs such as ECG, SpO2, blood pressure, and respiration.",
  },
  {
    image: "/equipment/pulse oximeter.jpg",
    question: "Identify this equipment.",
    options: ["Pulse oximeter", "Syringe pump", "Suction machine", "Anesthesia machine"],
    answer: 0,
    studyTip: "Measures oxygen saturation (SpO2) and pulse rate noninvasively.",
  },
  {
    image: "/equipment/suction machine.jpg",
    question: "Identify this equipment.",
    options: ["Ventilator", "Suction machine", "Patient monitor", "Defibrillator"],
    answer: 1,
    studyTip: "Provides negative pressure to remove fluids/secretions from airways or surgical fields.",
  },
  {
    image: "/equipment/suction regulator.jpg",
    question: "Identify this equipment.",
    options: ["Suction regulator", "Pulse oximeter", "Infusion pump", "Fetal monitor"],
    answer: 0,
    studyTip: "Controls and limits wall-vacuum suction pressure for safe clinical use.",
  },
  {
    image: "/equipment/syringe pump.jpg",
    question: "Identify this equipment.",
    options: ["Syringe pump", "ECG machine", "Electrosurgical unit", "Anesthesia machine"],
    answer: 0,
    studyTip: "Accurately delivers small-volume medications using a loaded syringe.",
  },
  {
    image: "/equipment/ultrasound machine.jpg",
    question: "Identify this equipment.",
    options: ["Ultrasound machine", "Defibrillator", "Patient monitor", "Suction regulator"],
    answer: 0,
    studyTip: "Uses high-frequency sound waves to generate real-time diagnostic images.",
  },
];

const rnQuestions = [
  {
    question: "Which patient should the nurse see first?",
    options: [
      "A client with COPD and an oxygen saturation of 88%",
      "A client with a cast reporting itching",
      "A client requesting pain medication for chronic back pain",
      "A client asking for discharge instructions",
    ],
    answer: 0,
  },
  {
    question: "Which finding requires immediate intervention?",
    options: [
      "Client with a temperature of 99.1°F",
      "Post-op client with urine output of 20 mL/hr",
      "Client with mild nausea after lunch",
      "Client requesting help to the bathroom",
    ],
    answer: 1,
  },
  {
    question: "Which action is most important when administering insulin?",
    options: [
      "Shake the vial vigorously",
      "Administer before verifying the meal tray",
      "Check the blood glucose level first",
      "Massage the injection site",
    ],
    answer: 2,
  },
  {
    question: "Which lab value is most concerning?",
    options: ["Sodium 138 mEq/L", "Calcium 9.2 mg/dL", "Glucose 102 mg/dL", "Potassium 6.2 mEq/L"],
    answer: 3,
  },
  {
    question: "A client receiving warfarin should be monitored for:",
    options: ["Bleeding", "Bradycardia", "Hypoglycemia", "Constipation"],
    answer: 0,
  },
  {
    question: "Which symptom is expected with hypoglycemia?",
    options: ["Dry flushed skin", "Cool clammy skin", "Bradycardia", "Decreased hunger"],
    answer: 1,
  },
  {
    question: "Which client is highest priority?",
    options: [
      "Client with a sprained ankle",
      "Client requesting a blanket",
      "Client with chest pain and diaphoresis",
      "Client with chronic constipation",
    ],
    answer: 2,
  },
  {
    question: "The nurse should question which prescription?",
    options: [
      "Acetaminophen for fever",
      "Normal saline bolus for hypotension",
      "Oxygen for shortness of breath",
      "Potassium for a client with potassium of 5.8",
    ],
    answer: 3,
  },
  {
    question: "Which finding suggests fluid volume overload?",
    options: ["Crackles in the lungs", "Flat neck veins", "Dry mucous membranes", "Poor skin turgor"],
    answer: 0,
  },
  {
    question: "Which intervention is appropriate for seizure precautions?",
    options: [
      "Place a tongue blade at bedside",
      "Pad side rails",
      "Restrain the client during seizure",
      "Keep the room brightly lit",
    ],
    answer: 1,
  },
  {
    question: "Which patient statement shows understanding of digoxin teaching?",
    options: [
      "I should take an extra dose if I miss one",
      "I can stop it when I feel better",
      "I will check my pulse before taking it",
      "Blurred vision means the medicine is working",
    ],
    answer: 2,
  },
  {
    question: "A client with suspected stroke should receive priority for:",
    options: [
      "A high-protein snack",
      "Passive range-of-motion exercises",
      "Routine bedtime medications",
      "Rapid neurologic assessment",
    ],
    answer: 3,
  },
  {
    question: "Which position is best for a client with shortness of breath?",
    options: ["High Fowler's", "Supine", "Trendelenburg", "Prone"],
    answer: 0,
  },
  {
    question: "Which action prevents infection most effectively?",
    options: [
      "Wearing a mask at all times",
      "Hand hygiene",
      "Using sterile gloves for all care",
      "Keeping the room door closed",
    ],
    answer: 1,
  },
  {
    question: "A nurse is caring for a client with a potassium of 2.9 mEq/L. The priority assessment is:",
    options: ["Bowel sounds", "Vision changes", "Cardiac rhythm", "Skin color"],
    answer: 2,
  },
  {
    question: "Which finding is expected with dehydration?",
    options: ["Bounding pulses", "Jugular vein distention", "Pulmonary crackles", "Tachycardia"],
    answer: 3,
  },
  {
    question: "Which nursing action is appropriate when transfusing blood?",
    options: [
      "Stay with the client during the first 15 minutes",
      "Infuse with dextrose solution",
      "Warm blood in a microwave if cold",
      "Start slowly after one hour",
    ],
    answer: 0,
  },
  {
    question: "Which patient is at highest risk for falls?",
    options: [
      "A teenager with a sprained wrist",
      "An older adult taking sedatives",
      "A middle-aged adult with a headache",
      "A child with a sore throat",
    ],
    answer: 1,
  },
  {
    question: "Which finding suggests anaphylaxis?",
    options: ["Mild rash on one arm", "Low-grade fever", "Wheezing and facial swelling", "Constipation"],
    answer: 2,
  },
  {
    question: "A nurse should hold which medication for a pulse of 52/min?",
    options: ["Acetaminophen", "Cefazolin", "Docusate", "Metoprolol"],
    answer: 3,
  },
];

const cbetQuestions = allQuestions.filter((q) => q.category === "cbet");
export { allQuestions, allCategories, equipmentQuestions, extraCategories, rnQuestions, cbetQuestions };
