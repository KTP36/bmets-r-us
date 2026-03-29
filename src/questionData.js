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

  // --- CBET / Device Questions ---
  {
    question: "What should you do if an infusion pump's low-flow alarm is not working?",
    options: [
      "Returned to service because flow is accurate",
      "Tagged out until the alarm function is corrected",
      "Used only in low-risk areas",
      "Released if the nurse is informed",
    ],
    answer: 1,
    explanation:
      "A device with a non-functioning alarm must be tagged out until the alarm is corrected to ensure patient safety.",
    difficulty: "easy",
    category: "cbet",
  },
  {
    question:
      "A patient monitor shows noisy ECG only when connected to AC power in one room. Which troubleshooting approach is MOST appropriate?",
    options: [
      "Replace the monitor main board immediately",
      "Compare operation on battery and evaluate power quality/grounding in that room",
      "Ignore it if alarms still sound",
      "Replace the ECG electrodes with temperature probes",
    ],
    answer: 1,
    explanation:
      "Compare operation on battery and evaluate power quality/grounding in that room. This helps determine if the issue is with the room's power or the device itself.",
    difficulty: "easy",
    category: "cbet",
  },
  {
    question:
      "A ventilator returns from outside repair. Before clinical use, the technician should FIRST ensure:",
    options: [
      "The unit has a new asset tag",
      "Incoming inspection, safety checks, and functional verification are complete",
      "The staff has already used it once",
      "The battery has been removed",
    ],
    answer: 1,
    explanation:
      "Incoming inspection, safety checks, and functional verification should be completed before the ventilator is returned to clinical use.",
    difficulty: "medium",
    category: "cbet",
  },
  {
    question:
      "Which document is MOST important for demonstrating that a device was safe to return to service after repair?",
    options: [
      "A handwritten sticky note",
      "Completed service documentation with test results",
      "An email that parts were ordered",
      "A user complaint log only",
    ],
    answer: 1,
    explanation:
      "Completed service documentation with test results is the strongest evidence that a device was safe to return to service.",
    difficulty: "medium",
    category: "cbet",
  },
  {
    question:
      "An ESU fails output power verification across multiple load settings. Which instrument is specifically intended to evaluate this?",
    options: ["Oscilloscope only", "ESU analyzer", "Infusion device analyzer", "NIBP simulator"],
    answer: 1,
    explanation:
      "An ESU analyzer is specifically intended to evaluate electrosurgical unit performance.",
    difficulty: "medium",
    category: "cbet",
  },
  {
    question: "A medical device has a damaged power cord strain relief. Why is this significant?",
    options: [
      "It only affects cosmetic appearance",
      "It increases risk of conductor damage, shock, and intermittent faults",
      "It lowers speaker volume",
      "It changes screen brightness",
    ],
    answer: 1,
    explanation:
      "A damaged strain relief increases the risk of conductor damage, shock hazards, and intermittent electrical faults.",
    difficulty: "medium",
    category: "cbet",
  },
  {
    question:
      "In troubleshooting, a symptom that appears only after the unit warms up for 20 minutes suggests:",
    options: [
      "A purely mechanical shipping issue",
      "A thermal or intermittent electronic fault",
      "A labeling problem only",
      "A guaranteed software licensing issue",
    ],
    answer: 1,
    explanation:
      "Warm-up dependent symptoms often point to a thermal or intermittent electronic fault.",
    difficulty: "medium",
    category: "cbet",
  },
  {
    question: "Which action BEST supports root-cause repair instead of repeated temporary fixes?",
    options: [
      "Resetting the breaker and sending the device back each time",
      "Trending failures, reproducing conditions, and verifying the failed stage",
      "Replacing accessories randomly",
      "Skipping final test to save time",
    ],
    answer: 1,
    explanation:
      "Root-cause repair requires reproducing the problem, trending failures, and verifying the failed stage.",
    difficulty: "medium",
    category: "cbet",
  },
  {
    question:
      "A device alarm volume is functioning, but the visual alarm indicator does not illuminate. The device should be considered:",
    options: [
      "Acceptable because one alarm path still works",
      "Incomplete alarm functionality and not ready for service",
      "Safe for day shift only",
      "Ready if documented as a known issue",
    ],
    answer: 1,
    explanation:
      "A missing visual alarm indicator means alarm functionality is incomplete and the device should not be returned to service.",
    difficulty: "medium",
    category: "cbet",
  },
  {
    question: "What is the strongest reason to use manufacturer-approved accessories when specified?",
    options: [
      "They always cost less",
      "Compatibility and validated safety/performance",
      "They eliminate the need for PM",
      "They remove the need for user training",
    ],
    answer: 1,
    explanation:
      "Manufacturer-approved accessories help ensure compatibility and validated safety/performance.",
    difficulty: "easy",
    category: "cbet",
  },
  {
    question: "A preventive maintenance interval should primarily be based on:",
    options: [
      "The technician's preference",
      "Manufacturer guidance, device risk, and facility policy",
      "How often stickers are available",
      "Whether the unit is stored near nursing",
    ],
    answer: 1,
    explanation:
      "Preventive maintenance intervals should be based on manufacturer guidance, device risk, and facility policy.",
    difficulty: "easy",
    category: "cbet",
  },
  {
    question:
      "A unit intermittently fails self-test, but only after transport between departments. What is the BEST next step?",
    options: [
      "Assume user error",
      "Inspect connectors, mounting, and transport-related intermittents while reproducing movement",
      "Replace the battery only",
      "Disable self-test if possible",
    ],
    answer: 1,
    explanation:
      "Movement-related intermittent failures should be reproduced while checking connectors and mounting points.",
    difficulty: "medium",
    category: "cbet",
  },
  {
    question:
      "If a device repeatedly returns with the same failure after board replacement, the BEST conclusion is:",
    options: [
      "Board replacement always fails",
      "The underlying cause may be elsewhere and has not been identified",
      "The user is definitely at fault",
      "Documentation can be skipped next time",
    ],
    answer: 1,
    explanation:
      "Repeated recurrence after board replacement suggests the true underlying cause may be elsewhere.",
    difficulty: "medium",
    category: "cbet",
  },
  {
    question:
      "Which step is MOST appropriate immediately after completing a repair on a life-support device?",
    options: [
      "Return it directly to the unit",
      "Perform required functional and safety verification before release",
      "Ask clinical staff to watch it closely",
      "Clear the service history",
    ],
    answer: 1,
    explanation:
      "Life-support devices require functional and safety verification before release.",
    difficulty: "medium",
    category: "cbet",
  },
  {
    question:
      "A battery-operated device shows drastically reduced runtime but otherwise functions. The BEST classification is:",
    options: [
      "No issue if AC power is available",
      "A performance/safety concern that should be corrected before expected battery use",
      "A cosmetic problem",
      "A network configuration fault",
    ],
    answer: 1,
    explanation:
      "Reduced runtime is a performance and safety concern when battery operation is expected.",
    difficulty: "medium",
    category: "cbet",
  },
  {
    question:
      "When measuring a low resistance value in a circuit, what common issue can significantly affect accuracy?",
    options: [
      "Ambient room color",
      "Test lead resistance and contact quality",
      "Battery label orientation",
      "Ground pin length only",
    ],
    answer: 1,
    explanation:
      "Test lead resistance and contact quality can significantly affect low-resistance measurements.",
    difficulty: "medium",
    category: "cbet",
  },
  {
    question:
      "A service report says 'unable to duplicate,' but the customer can reproduce the issue easily. What should be improved FIRST?",
    options: [
      "Inventory labeling",
      "Complaint intake details and test conditions used to reproduce the problem",
      "Screen brightness",
      "Cleaning agent selection",
    ],
    answer: 1,
    explanation:
      "Better complaint intake details and reproduction conditions are needed first.",
    difficulty: "medium",
    category: "cbet",
  },
  {
    question:
      "Why is configuration verification important after replacing a main board in a medical device?",
    options: [
      "It is only needed for cosmetic repairs",
      "Incorrect configuration can affect alarms, options, calibration, or clinical behavior",
      "It prevents the unit from being cleaned",
      "It only changes the serial number label",
    ],
    answer: 1,
    explanation:
      "Configuration verification matters because incorrect setup can affect alarms, options, calibration, or clinical behavior.",
    difficulty: "medium",
    category: "cbet",
  },
  {
    question:
      "The BEST reason to quarantine a device with an intermittent safety-related fault is that intermittent problems:",
    options: [
      "Are easier for users to work around",
      "Can recur unpredictably and create unacceptable patient risk",
      "Always disappear on their own",
      "Only affect accessories and not the main device",
    ],
    answer: 1,
    explanation:
      "Intermittent safety-related faults can recur unpredictably and create unacceptable patient risk.",
    difficulty: "medium",
    category: "cbet",
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

export { allQuestions, allCategories, equipmentQuestions, extraCategories, rnQuestions };
