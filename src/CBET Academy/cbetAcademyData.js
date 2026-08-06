export const cbetAcademyModules = [
  {
    number: 1,
    title: "Electronics Fundamentals",
    description: "Master voltage, current, resistance, Ohm's law, power, AC/DC, and circuit behavior.",
    badge: "Electrical Fundamentals",
    xp: 250,
  },
  {
    number: 2,
    title: "Electronic Components",
    description: "Recognize resistors, capacitors, diodes, transistors, relays, transformers, and failure modes.",
    badge: "Electronic Components",
    xp: 300,
  },
  {
    number: 3,
    title: "Test Equipment",
    description: "Use multimeters, oscilloscopes, safety analyzers, simulators, and specialty analyzers.",
    badge: "Test Equipment Use",
    xp: 350,
  },
  {
    number: 4,
    title: "Medical Equipment",
    description: "Study operation, accessories, preventive maintenance, and common failures across major device types.",
    badge: "Medical Equipment Systems",
    xp: 450,
  },
  {
    number: 5,
    title: "Anatomy & Physiology",
    description: "Connect body systems and physiological signals to the equipment that measures or supports them.",
    badge: "Anatomy & Physiology",
    xp: 300,
  },
  {
    number: 6,
    title: "Networking & Computers",
    description: "Review TCP/IP, DHCP, DNS, VLANs, Wi-Fi, DICOM, HL7, PACS, and cybersecurity.",
    badge: "Healthcare Technology Networking",
    xp: 350,
  },
  {
    number: 7,
    title: "Safety & Regulations",
    description: "Review electrical safety, risk management, standards, regulations, documentation, and compliance.",
    badge: "Equipment Safety & Compliance",
    xp: 350,
  },
  {
    number: 8,
    title: "Troubleshooting",
    description: "Diagnose realistic device, accessory, power, signal, network, and user-reported failures.",
    badge: "Evidence-Based Troubleshooting",
    xp: 450,
  },
  {
    number: 9,
    title: "CBET Exam Strategy",
    description: "Practice formulas, test-taking strategy, timing, and mixed high-yield review.",
    badge: "CBET Exam Readiness",
    xp: 400,
  },
  {
    number: 10,
    title: "Medical Gas Delivery Equipment",
    description: "Identify cylinders, regulators, fittings, flowmeters, suction equipment, and point-of-use safety concerns.",
    badge: "Medical Gas Equipment",
    xp: 350,
  },
];

export const missionOneBriefing = {
  title: "Electronics Fundamentals",
  summary:
    "Build the electrical foundation used throughout biomedical equipment technology. Complete all nine lessons, two troubleshooting scenarios, and the 25-question mission challenge.",
  objectives: [
    "Explain voltage, current, resistance, and electrical power.",
    "Use Ohm's law to solve for voltage, current, or resistance.",
    "Compare alternating current and direct current.",
    "Predict basic series and parallel circuit behavior.",
    "Apply foundational electronics concepts to biomedical equipment.",
  ],
};

export const missionOneLessons = [
  {
    title: "What Is Electricity?",
    icon: "⚡",
    points: [
      "Electricity involves the movement or presence of electric charge.",
      "A complete conductive path is required for continuous current flow.",
      "Copper and aluminum are common conductors; rubber, glass, and many plastics are insulators.",
      "Biomedical devices use electrical energy to power sensors, displays, control circuits, motors, heaters, and alarms.",
    ],
    check: {
      question: "Which material is generally the best electrical conductor?",
      options: ["Rubber", "Copper", "Glass", "Plastic"],
      answer: 1,
      explanation: "Copper has low resistance and is widely used for electrical conductors.",
    },
  },
  {
    title: "Voltage",
    icon: "🔋",
    points: [
      "Voltage is electrical potential difference.",
      "Voltage provides the push that can move charge through a circuit.",
      "Voltage is measured in volts (V).",
      "A voltmeter is connected in parallel with the component or source being measured.",
    ],
    interaction: "voltage",
    check: {
      question: "How should a voltmeter be connected to measure voltage across a resistor?",
      options: ["In series", "In parallel", "Across ground only", "With power always removed"],
      answer: 1,
      explanation: "Voltage is measured across two points, so the meter is connected in parallel.",
    },
  },
  {
    title: "Current",
    icon: "➡️",
    points: [
      "Current is the rate of electric charge flow.",
      "Current is measured in amperes (A).",
      "A closed circuit permits current flow; an open circuit interrupts it.",
      "An ammeter is placed in series so current flows through the meter.",
    ],
    interaction: "switch",
    check: {
      question: "What happens to current when a simple circuit switch is opened?",
      options: ["It increases", "It reverses", "It stops", "Voltage becomes resistance"],
      answer: 2,
      explanation: "Opening the switch breaks the conductive path, stopping current flow.",
    },
  },
  {
    title: "Resistance",
    icon: "〰️",
    points: [
      "Resistance opposes current flow.",
      "Resistance is measured in ohms (Ω).",
      "With voltage held constant, increasing resistance decreases current.",
      "Resistance is measured with circuit power removed and capacitors safely discharged.",
    ],
    interaction: "resistance",
    check: {
      question: "With voltage unchanged, what happens when resistance increases?",
      options: ["Current increases", "Current decreases", "Power always remains zero", "The circuit becomes AC"],
      answer: 1,
      explanation: "Ohm's law shows that current decreases as resistance increases when voltage is constant.",
    },
  },
  {
    title: "Ohm's Law",
    icon: "🧮",
    points: [
      "Ohm's law describes the relationship between voltage, current, and resistance.",
      "V = I × R",
      "I = V ÷ R",
      "R = V ÷ I",
      "Always verify units before calculating.",
    ],
    interaction: "ohms",
    check: {
      question: "A 12 V circuit has 6 Ω of resistance. What is the current?",
      options: ["0.5 A", "2 A", "6 A", "72 A"],
      answer: 1,
      explanation: "I = V ÷ R = 12 ÷ 6 = 2 A.",
    },
  },
  {
    title: "Electrical Power",
    icon: "💡",
    points: [
      "Electrical power is the rate at which electrical energy is used or transferred.",
      "Power is measured in watts (W).",
      "P = V × I",
      "Power can also be calculated using P = I²R or P = V²/R.",
    ],
    interaction: "power",
    check: {
      question: "A device uses 10 V at 2 A. How much power does it consume?",
      options: ["5 W", "10 W", "12 W", "20 W"],
      answer: 3,
      explanation: "P = V × I = 10 × 2 = 20 W.",
    },
  },
  {
    title: "AC vs. DC",
    icon: "🌊",
    points: [
      "Direct current flows in one direction.",
      "Alternating current periodically changes direction.",
      "Batteries provide DC; standard wall receptacles provide AC.",
      "Many medical devices receive AC mains power and convert it to regulated DC internally.",
    ],
    interaction: "acdc",
    check: {
      question: "Which source normally provides direct current?",
      options: ["Wall receptacle", "Battery", "Isolation transformer primary", "Utility distribution line"],
      answer: 1,
      explanation: "A battery is a common DC source.",
    },
  },
  {
    title: "Series Circuits",
    icon: "🔗",
    points: [
      "A series circuit has one primary current path.",
      "Current is the same through each series component.",
      "Total resistance equals the sum of individual resistances.",
      "An open anywhere in the path interrupts current through the entire circuit.",
    ],
    interaction: "series",
    check: {
      question: "What is the total resistance of 10 Ω and 20 Ω resistors in series?",
      options: ["0.5 Ω", "10 Ω", "20 Ω", "30 Ω"],
      answer: 3,
      explanation: "Series resistances add: 10 Ω + 20 Ω = 30 Ω.",
    },
  },
  {
    title: "Parallel Circuits",
    icon: "🛤️",
    points: [
      "A parallel circuit has more than one current path.",
      "Voltage is the same across each parallel branch.",
      "Total current equals the sum of branch currents.",
      "Total resistance is less than the smallest branch resistance.",
    ],
    interaction: "parallel",
    check: {
      question: "Which quantity is the same across branches in a parallel circuit?",
      options: ["Current", "Resistance", "Voltage", "Power rating"],
      answer: 2,
      explanation: "Each branch is connected across the same two nodes, so branch voltage is equal.",
    },
  },
];

export const missionOneScenarios = [
  {
    title: "Monitor Will Not Power On",
    patient: "A bedside monitor is reported as completely dead. The outlet is known to work.",
    question: "What is the best first technical action?",
    options: [
      "Replace the system board immediately",
      "Verify the power cord, inlet, fuse, and visible power path",
      "Increase the branch circuit voltage",
      "Bypass the protective earth conductor",
    ],
    answer: 1,
    explanation:
      "Begin with safe, simple, high-probability checks in the power path before replacing assemblies.",
  },
  {
    title: "Unexpectedly Low Current",
    patient: "A 12 V test circuit draws less current than expected after a component replacement.",
    question: "Which condition is most consistent with the observation?",
    options: [
      "The circuit resistance increased",
      "The circuit resistance decreased",
      "Voltage and resistance both became zero",
      "The source changed from DC to an open ground",
    ],
    answer: 0,
    explanation:
      "At a constant 12 V, Ohm's law predicts lower current when resistance increases.",
  },
];

const q = (question, options, answer, explanation, category) => ({
  question, options, answer, explanation, category
});

export const missionOneQuestions = [
  q("What unit measures electrical resistance?", ["Volt", "Ampere", "Ohm", "Watt"], 2, "Resistance is measured in ohms (Ω).", "Resistance"),
  q("What unit measures electrical current?", ["Ampere", "Ohm", "Watt", "Farad"], 0, "Current is measured in amperes.", "Current"),
  q("What unit measures electrical power?", ["Volt", "Watt", "Ohm", "Coulomb"], 1, "Electrical power is measured in watts.", "Power"),
  q("A complete path that permits current flow is called a:", ["Closed circuit", "Open circuit", "Shorted meter", "Floating chassis"], 0, "A closed circuit provides a continuous path.", "Foundations"),
  q("Which is commonly used as an electrical insulator?", ["Copper", "Aluminum", "Rubber", "Silver"], 2, "Rubber resists charge flow and is commonly used as insulation.", "Foundations"),
  q("A voltmeter is normally connected:", ["In series", "In parallel", "Only to protective earth", "Across a removed fuse only"], 1, "A voltmeter measures potential difference across two points.", "Measurement"),
  q("An ammeter is normally connected:", ["In series", "In parallel", "Across an open switch", "With both leads on ground"], 0, "Current must pass through an ammeter.", "Measurement"),
  q("Before measuring resistance, you should generally:", ["Energize the circuit", "Remove power", "Short the power supply", "Set the meter to current"], 1, "Resistance is normally measured with power removed.", "Measurement"),
  q("Using Ohm's law, current equals:", ["V × R", "V ÷ R", "R ÷ V", "P × R"], 1, "I = V ÷ R.", "Ohm's Law"),
  q("A 24 V source is applied to 12 Ω. Current is:", ["0.5 A", "2 A", "12 A", "288 A"], 1, "I = 24 ÷ 12 = 2 A.", "Ohm's Law"),
  q("A circuit carries 3 A through 4 Ω. Voltage is:", ["0.75 V", "7 V", "12 V", "24 V"], 2, "V = I × R = 3 × 4 = 12 V.", "Ohm's Law"),
  q("A 10 V circuit carries 2 A. Resistance is:", ["0.2 Ω", "5 Ω", "8 Ω", "20 Ω"], 1, "R = V ÷ I = 10 ÷ 2 = 5 Ω.", "Ohm's Law"),
  q("Electrical power can be calculated with:", ["P = V × I", "P = V ÷ I only", "P = R ÷ I", "P = V + I"], 0, "P = V × I.", "Power"),
  q("A 120 V device draws 2 A. Power is:", ["60 W", "118 W", "122 W", "240 W"], 3, "P = 120 × 2 = 240 W.", "Power"),
  q("Direct current normally:", ["Changes direction periodically", "Flows in one direction", "Has no voltage", "Cannot power electronics"], 1, "DC flows in one direction.", "AC/DC"),
  q("Standard wall receptacle power is normally:", ["AC", "DC", "Static charge", "Optical energy"], 0, "Utility mains power is alternating current.", "AC/DC"),
  q("Many medical devices convert incoming AC into:", ["Mechanical resistance", "Regulated DC", "Protective earth current", "Only acoustic energy"], 1, "Internal power supplies commonly rectify and regulate AC into DC.", "AC/DC"),
  q("In a series circuit, current is:", ["The same through each component", "Always zero", "Highest at the final resistor", "Different at every point"], 0, "A single current path means the same current flows through all components.", "Series"),
  q("Two resistors of 15 Ω and 25 Ω in series total:", ["10 Ω", "20 Ω", "40 Ω", "375 Ω"], 2, "Series resistance adds to 40 Ω.", "Series"),
  q("If one component opens in a simple series circuit:", ["All circuit current stops", "Only voltage stops", "Total resistance becomes zero", "Other branches continue unchanged"], 0, "An open breaks the only current path.", "Series"),
  q("In a parallel circuit, each branch has the same:", ["Current", "Voltage", "Resistance", "Wattage"], 1, "Parallel branches share the same two nodes and therefore the same voltage.", "Parallel"),
  q("Total current in a parallel circuit equals:", ["The smallest branch current", "The average branch current", "The sum of branch currents", "Zero"], 2, "Source current is the sum of branch currents.", "Parallel"),
  q("Total resistance in a parallel network is:", ["Greater than every branch", "Equal to the largest branch", "Less than the smallest branch", "Always zero"], 2, "Parallel paths reduce equivalent resistance.", "Parallel"),
  q("At constant voltage, increasing resistance causes current to:", ["Increase", "Decrease", "Reverse", "Become AC"], 1, "I = V ÷ R, so current decreases.", "Relationships"),
  q("Which is the safest troubleshooting approach for a dead device?", ["Bypass safety protections", "Start with basic power-path checks", "Replace every circuit board", "Increase line voltage"], 1, "Begin with safe, simple, likely causes before escalating.", "Troubleshooting"),
];


export const missionTwoLessons = [
  {
    title: "Resistors and Color Codes",
    icon: "🟫",
    summary: "Control current, divide voltage, and recognize common resistor markings.",
    points: [
      "Resistance limits current according to Ohm’s Law.",
      "Series resistors add directly; parallel resistance is lower than the smallest branch.",
      "Color bands encode resistance value and tolerance."
    ],
    interaction: "resistor"
  },
  {
    title: "Capacitors",
    icon: "🔋",
    summary: "Understand charge, discharge, filtering, and common capacitor failures.",
    points: [
      "Capacitors store energy in an electric field.",
      "Charging current is highest initially and falls as voltage rises.",
      "Bulging, leaking, or high-ESR capacitors often cause power-supply trouble."
    ],
    interaction: "capacitor"
  },
  {
    title: "Diodes and Rectifiers",
    icon: "🔺",
    summary: "Learn one-way current flow, forward bias, reverse bias, and bridge rectification.",
    points: [
      "A healthy silicon diode usually drops about 0.6–0.7 V when forward biased.",
      "Reverse bias blocks current until breakdown.",
      "A failed bridge diode can cause low DC output, ripple, or blown fuses."
    ],
    interaction: "diode"
  },
  {
    title: "Transistors",
    icon: "📐",
    summary: "Use small control signals to switch or amplify larger currents.",
    points: [
      "A transistor can act as a switch or amplifier.",
      "BJT collector current is controlled by base current.",
      "MOSFET drain current is controlled by gate voltage."
    ],
    interaction: "transistor"
  },
  {
    title: "LEDs and Current Limiting",
    icon: "💡",
    summary: "Light an LED safely and calculate the resistor that protects it.",
    points: [
      "LEDs are polarity-sensitive diodes.",
      "Excessive current can permanently damage an LED.",
      "A series resistor limits current to a safe value."
    ],
    interaction: "led"
  },
  {
    title: "Transformers",
    icon: "🧲",
    summary: "Change AC voltage using turns ratio and magnetic coupling.",
    points: [
      "Transformers require changing magnetic flux, so they operate with AC.",
      "Voltage ratio follows the turns ratio.",
      "Step-up transformers increase voltage; step-down transformers reduce it."
    ],
    interaction: "transformer"
  },
  {
    title: "Relays and Electromechanical Switching",
    icon: "⚙️",
    summary: "Use a low-power coil to control isolated contacts.",
    points: [
      "Energizing the coil changes the contact state.",
      "Normally open and normally closed refer to the de-energized condition.",
      "Relay faults include open coils, welded contacts, and mechanical sticking."
    ],
    interaction: "relay"
  },
  {
    title: "Component Recognition",
    icon: "🔎",
    summary: "Identify components by shape, markings, package, and circuit role.",
    points: [
      "Package style provides clues, but markings confirm identity.",
      "Polarized components must be installed in the correct orientation.",
      "Physical damage can help identify likely failure modes."
    ],
    interaction: "identify"
  },
  {
    title: "Troubleshooting a Failed Power Supply",
    icon: "🧰",
    summary: "Trace a no-power fault through fuse, rectifier, capacitor, and output stages.",
    points: [
      "Begin with visual inspection and safe power checks.",
      "Follow energy from input to output in a logical sequence.",
      "Use measurements to isolate the failed stage before replacing parts."
    ],
    interaction: "troubleshoot"
  }
];

export const missionTwoScenarios = [
  {
    title: "Patient Monitor Has Excessive Ripple",
    prompt: "A monitor powers on, but the DC rail contains heavy 120 Hz ripple and the display flickers.",
    options: [
      "Open speaker",
      "Dried-out filter capacitor",
      "Shorted network cable",
      "Dirty touchscreen"
    ],
    answer: 1,
    explanation: "A degraded filter capacitor cannot smooth the rectified waveform effectively, producing excessive ripple."
  },
  {
    title: "Fuse Opens Immediately",
    prompt: "A replacement fuse blows as soon as power is applied. The bridge rectifier measures nearly 0 Ω in both directions.",
    options: [
      "The bridge is shorted",
      "The transformer is stepping down correctly",
      "The LED is reverse biased",
      "The relay contacts are open"
    ],
    answer: 0,
    explanation: "A diode or bridge that reads near-short in both directions is likely failed short and can open the input fuse."
  },
  {
    title: "Relay Clicks but Load Stays Off",
    prompt: "You hear the relay coil energize, but the connected load never receives voltage.",
    options: [
      "The coil is open",
      "The contacts may be burned or welded open",
      "The transformer turns ratio is too high",
      "The capacitor is charging normally"
    ],
    answer: 1,
    explanation: "An audible click indicates coil movement. The next check is continuity through the switched contacts."
  },
  {
    title: "LED Replacement Keeps Failing",
    prompt: "A status LED repeatedly burns out after replacement.",
    options: [
      "Install a larger fuse",
      "Reduce the current-limiting resistor",
      "Verify the series resistor and supply voltage",
      "Reverse the transformer winding"
    ],
    answer: 2,
    explanation: "Repeated LED failure usually points to excessive forward current caused by an incorrect resistor or supply condition."
  }
];

export const missionTwoQuestions = [
  {
    question: "What is the total resistance of 220 Ω and 330 Ω in series?",
    options: ["110 Ω", "265 Ω", "550 Ω", "72.6 kΩ"],
    answer: 2,
    explanation: "Series resistance adds directly: 220 Ω + 330 Ω = 550 Ω."
  },
  {
    question: "Which condition is most typical of a failing electrolytic capacitor?",
    options: ["Perfectly flat DC output", "Bulging top or high ESR", "Zero magnetic flux", "Infinite relay coil current"],
    answer: 1,
    explanation: "Bulging, leaking, or increased ESR are common electrolytic capacitor failure signs."
  },
  {
    question: "A healthy silicon diode in forward bias commonly measures approximately:",
    options: ["0.6–0.7 V", "12 V", "0 Ω in both directions", "Infinite current"],
    answer: 0,
    explanation: "A standard silicon junction commonly shows about 0.6–0.7 V forward drop."
  },
  {
    question: "What does a transistor do when used as a switch?",
    options: ["Stores magnetic energy", "Controls a larger current with a smaller signal", "Converts AC directly to sound", "Measures resistance"],
    answer: 1,
    explanation: "A transistor switch uses a small control signal to turn a larger current path on or off."
  },
  {
    question: "Why is a resistor placed in series with an LED?",
    options: ["To increase reverse voltage", "To limit current", "To create magnetic coupling", "To short the supply"],
    answer: 1,
    explanation: "The resistor limits LED current to a safe value."
  },
  {
    question: "A transformer with 100 primary turns and 50 secondary turns is ideally:",
    options: ["A 2:1 step-down transformer", "A 1:2 step-up transformer", "A DC rectifier", "A relay"],
    answer: 0,
    explanation: "The secondary has half as many turns, so its voltage is ideally half the primary voltage."
  },
  {
    question: "Normally open relay contacts are:",
    options: ["Closed when the coil is de-energized", "Open when the coil is de-energized", "Always shorted", "Only used with DC"],
    answer: 1,
    explanation: "Normally open describes the contact state with the relay coil de-energized."
  },
  {
    question: "Which component is most likely used to suppress a voltage surge?",
    options: ["MOV", "Speaker", "RJ45 connector", "Fuse holder only"],
    answer: 0,
    explanation: "A metal-oxide varistor is commonly used for transient voltage suppression."
  },
  {
    question: "A bridge rectifier primarily converts:",
    options: ["DC to mechanical motion", "AC to pulsating DC", "Resistance to capacitance", "Current to network data"],
    answer: 1,
    explanation: "A bridge rectifier uses four diodes to convert both AC half-cycles into pulsating DC."
  },
  {
    question: "In a no-power troubleshooting sequence, what should usually happen first?",
    options: ["Replace every capacitor", "Visual inspection and safe input checks", "Bypass the fuse", "Increase line voltage"],
    answer: 1,
    explanation: "Start with safe inspection and basic input verification before replacing components."
  },
  {
    question: "What happens to capacitor charging current over time in a DC RC circuit?",
    options: ["It increases forever", "It remains constant", "It starts high and decreases", "It reverses every cycle"],
    answer: 2,
    explanation: "Charging current is initially highest and falls as capacitor voltage approaches the supply voltage."
  },
  {
    question: "Which transistor terminal controls a MOSFET?",
    options: ["Gate", "Anode", "Cathode", "Common"],
    answer: 0,
    explanation: "MOSFET conduction is controlled by voltage at the gate."
  },
  {
    question: "A diode that measures nearly 0 V in both directions is most likely:",
    options: ["Open", "Shorted", "Operating normally", "A transformer"],
    answer: 1,
    explanation: "A near-zero reading in both directions usually indicates a shorted diode."
  },
  {
    question: "Which capacitor value stores more charge at the same voltage?",
    options: ["1 µF", "10 µF", "100 µF", "They are identical"],
    answer: 2,
    explanation: "Charge Q = C × V, so the largest capacitance stores the most charge at the same voltage."
  },
  {
    question: "What is the ideal secondary voltage when a 120 V primary uses a 4:1 step-down turns ratio?",
    options: ["30 V", "60 V", "120 V", "480 V"],
    answer: 0,
    explanation: "120 V ÷ 4 = 30 V."
  },
  {
    question: "Which relay fault can leave a load energized even after the coil turns off?",
    options: ["Open coil", "Welded contacts", "Low capacitor ESR", "Reverse-biased LED"],
    answer: 1,
    explanation: "Welded contacts can remain closed after coil power is removed."
  },
  {
    question: "What does ESR mean when evaluating a capacitor?",
    options: ["Equivalent series resistance", "Electronic safety rating", "External surge relay", "Energy storage ratio"],
    answer: 0,
    explanation: "ESR is the capacitor's equivalent series resistance."
  },
  {
    question: "A 5 V source powers a 2 V LED at 15 mA. Approximately what series resistance is needed?",
    options: ["20 Ω", "200 Ω", "333 Ω", "5 kΩ"],
    answer: 1,
    explanation: "R = (5 V − 2 V) ÷ 0.015 A = 200 Ω."
  },
  {
    question: "What is the main purpose of a filter capacitor after a rectifier?",
    options: ["Increase ripple", "Smooth pulsating DC", "Open the fuse", "Create a network address"],
    answer: 1,
    explanation: "The capacitor stores and releases charge to reduce ripple."
  },
  {
    question: "A BJT used as a switch should be driven into:",
    options: ["Saturation for ON", "Reverse breakdown for ON", "Open circuit for ON", "Transformer action"],
    answer: 0,
    explanation: "A BJT switch is typically driven into saturation for a low-voltage ON state."
  },
  {
    question: "Which component is polarity-sensitive?",
    options: ["Standard carbon resistor", "Electrolytic capacitor", "Non-polar ceramic capacitor", "Mechanical fuse"],
    answer: 1,
    explanation: "Electrolytic capacitors are polarized and can be damaged by reverse installation."
  },
  {
    question: "What should be checked after a relay coil is confirmed to energize?",
    options: ["The switched contacts", "The network password", "The speaker volume", "The battery label"],
    answer: 0,
    explanation: "If the coil actuates, verify that the contacts actually change state and pass current."
  },
  {
    question: "Which component can act as both an electronic switch and amplifier?",
    options: ["Transistor", "Fuse", "Transformer core", "Mechanical connector"],
    answer: 0,
    explanation: "Transistors are commonly used for switching and amplification."
  },
  {
    question: "What happens when additional equal resistors are placed in parallel?",
    options: ["Equivalent resistance rises", "Equivalent resistance falls", "All current stops", "Voltage becomes AC"],
    answer: 1,
    explanation: "Adding parallel current paths lowers equivalent resistance."
  },
  {
    question: "Heavy 120 Hz ripple on a 60 Hz full-wave rectified supply most strongly suggests:",
    options: ["A failed smoothing stage", "A normal Ethernet signal", "An open relay coil only", "A healthy DC rail"],
    answer: 0,
    explanation: "Full-wave rectified 60 Hz power produces 120 Hz ripple, which becomes excessive when filtering is inadequate."
  }
];



export const missionFourBriefing = {
  title: "Medical Equipment Systems",
  summary: "Learn how major clinical devices work as complete systems. Focus on operation, accessories, failure evidence, patient-safety priorities, and systematic Clinical Engineering troubleshooting—without turning the mission into a preventive-maintenance checklist.",
  objectives: [
    "Interpret common patient-monitoring signals and separate artifact from equipment failure.",
    "Follow infusion, ventilation, defibrillation, and electrosurgical pathways logically.",
    "Recognize how accessories, setup, and clinical conditions affect device performance.",
    "Use symptom-specific evidence to narrow faults before replacing assemblies.",
    "Prioritize patient support, removal from service, and escalation appropriately."
  ]
};

export const missionFourLessons = [
  { title:"Patient Monitoring Systems", icon:"📟", summary:"Connect ECG, SpO₂, NIBP, temperature, and invasive-pressure signals to the accessories and conditions that create them.", points:["A monitor displays signals; the patient, sensor, cable, module, configuration, and environment all affect the result.","Artifact can resemble a true physiologic event, especially with poor electrode contact or motion.","Compare the displayed heart rate with a second source such as the pulse waveform or clinical assessment.","Start with the reported symptom and signal path before replacing the main monitor."], check:{question:"The ECG displays ventricular tachycardia, but the patient is awake and the pulse rate from SpO₂ is 78. What is the best first technical interpretation?",options:["The defibrillator must be activated","The ECG may contain artifact and the patient/signal should be verified","The SpO₂ module has failed","The monitor should be immediately discarded"],answer:1,explanation:"A mismatch between ECG rate, pulse-derived rate, and patient condition strongly supports verifying electrodes, leads, motion, and signal quality before assuming a true rhythm or monitor failure."}},
  { title:"Infusion Delivery Systems", icon:"💧", summary:"Use alarm messages and the full fluid path to understand volumetric, syringe, and PCA pump complaints.", points:["The programmed therapy, tubing set, cassette, clamps, container height, access site, and patient line all influence operation.","Upstream and downstream occlusion alarms point to different portions of the delivery path.","Air-in-line alarms may reflect actual air, improper loading, wet or dirty sensor areas, or incompatible tubing.","Do not defeat safety alarms to make a pump continue running."], check:{question:"A pump repeatedly reports downstream occlusion and operates normally on a test line. What should be investigated next?",options:["The facility Wi-Fi","The patient-side tubing, clamps, filters, and access resistance","The display backlight","The upstream fluid container label only"],answer:1,explanation:"Normal performance on a test line shifts attention downstream toward the clinical tubing path, filters, clamps, catheter, and patient access."}},
  { title:"Defibrillation and Pacing", icon:"⚡", summary:"Understand energy delivery, synchronization, pacing, pads, cables, batteries, and readiness decisions.", points:["Manual defibrillation, synchronized cardioversion, AED analysis, and pacing are distinct functions.","Synchronized cardioversion times energy delivery to the selected ECG marker.","Pads, paddles, cables, batteries, and test loads are part of the therapy pathway.","A failed readiness or discharge check requires removal from use and a ready replacement."], check:{question:"A defibrillator fails its operational energy check before clinical use. What is the correct immediate response?",options:["Leave it available because it passed yesterday","Remove it from service, provide a replacement, and troubleshoot","Increase selected energy until it passes","Disable the warning"],answer:1,explanation:"Therapy equipment that fails a readiness check should not remain available for patient use. Continuity of care comes first, followed by systematic evaluation."}},
  { title:"Ventilation Systems", icon:"🫁", summary:"Relate gas supply, breathing circuits, sensors, valves, humidification, and patient conditions to ventilator alarms.", points:["Ventilator alarms describe conditions, not necessarily failed components.","Low pressure may result from disconnection or leak; high pressure may result from obstruction, secretions, biting, or reduced compliance.","Gas supply, circuit configuration, exhalation components, filters, and water accumulation can alter performance.","During a patient-use problem, ventilation must be maintained by the clinical team while equipment is evaluated."], check:{question:"A ventilator produces a low-pressure alarm immediately after a patient is moved. Which cause should be checked first?",options:["A disconnected or leaking breathing circuit","The hospital DNS server","The defibrillator battery","The ultrasound transducer"],answer:0,explanation:"A sudden low-pressure alarm after movement strongly suggests a loose connection, disconnection, cuff/circuit leak, or open pathway."}},
  { title:"Electrosurgical Systems", icon:"🔥", summary:"Trace monopolar and bipolar energy through activation controls, accessories, electrodes, and the patient circuit.", points:["Monopolar current travels from the active electrode through tissue to the return electrode.","Bipolar energy travels between the two tips of the instrument and does not use a remote return electrode in the same way.","Poor clinical effect can originate in settings, activation controls, cables, electrodes, return path, or tissue contact.","Accessory condition and connection are often more likely than generator failure."], check:{question:"An ESU activates and tones normally, but there is no cutting effect. What is the best next troubleshooting direction?",options:["Replace the generator main board immediately","Trace the active accessory, cable, connection, settings, and return pathway","Increase wall oxygen pressure","Reboot the patient monitor"],answer:1,explanation:"The activation tone confirms part of the command pathway. The next step is to follow the complete delivered-energy path and accessories."}},
  { title:"Anesthesia Workstations", icon:"🩺", summary:"Connect gas delivery, vaporizers, breathing circuits, ventilator pathways, monitoring, and scavenging into one system.", points:["An anesthesia workstation combines several subsystems that can fail independently.","A symptom present only in ventilator mode narrows the fault toward the ventilator pathway and associated valves or seals.","Circuit assembly, absorbers, water traps, sensors, and disposable components can create apparent machine failures.","Preserve patient care and use the workstation's approved checkout and diagnostic information."], check:{question:"The workstation passes manual ventilation but fails to maintain pressure only in ventilator mode. Where should troubleshooting concentrate?",options:["The ECG lead set","The ventilator pathway, valves, bellows/piston system, and related seals","The room lighting circuit","The ultrasound probe"],answer:1,explanation:"A mode-specific failure is a strong localization clue. Components shared by both modes are less likely than the ventilator-only pathway."}},
  { title:"Ultrasound Systems", icon:"📡", summary:"Use image symptoms to separate transducer, cable, connector, preset, processing, and display concerns.", points:["The transducer converts electrical energy to sound and returning echoes back to electrical signals.","Dropout or intermittent image loss can result from damaged elements, cable conductors, strain relief, or connectors.","Preset, depth, gain, frequency, focus, and probe selection affect image appearance.","Compare with a known-good transducer or alternate port when safe and compatible."], check:{question:"One transducer shows a fixed vertical dropout band, while another transducer works normally on the same system and port. What is most likely?",options:["A transducer element or cable fault","A hospital-wide power failure","A failed NIBP cuff","A ventilator gas-supply problem"],answer:0,explanation:"The symptom follows one transducer while the system and port work with another, localizing the likely fault to that transducer or its cable."}},
  { title:"Accessories, Interfaces, and Failure Evidence", icon:"🔌", summary:"Treat sensors, cables, cuffs, hoses, transducers, batteries, and disposables as functional parts of the medical-device system.", points:["Accessories carry power, signals, energy, fluids, gases, or mechanical force.","Intermittent complaints often require movement, flexing, substitution, and careful reproduction of the reported condition.","A known-good compatible accessory can help isolate a fault without unnecessary disassembly.","Document the complaint, evidence, tests, actions, and final disposition even when no internal repair is needed."], check:{question:"A device passes every internal test but fails only with one cable. What conclusion is best supported?",options:["The cable or its interface is the leading suspect","The entire device must be replaced","The hospital generator has failed","The clinical complaint is impossible"],answer:0,explanation:"A failure that follows one accessory is strong isolation evidence. Inspect and test the cable and both connection interfaces."}}
];

export const missionFourScenarios = [
  {department:"ICU",title:"The Rhythm That Wasn't There",patient:"The central station reports ventricular tachycardia. The bedside patient is alert. ECG rate is 190, but the pulse waveform and palpated pulse are near 82. The ECG electrodes were replaced earlier but one lead wire is visibly moving with the patient.",question:"What is the best Clinical Engineering action?",options:["Declare the monitor defective","Support clinical assessment and evaluate electrode contact, lead integrity, motion, and ECG signal quality","Silence all alarms permanently","Replace the SpO₂ module"],answer:1,explanation:"The discordant pulse sources and moving lead indicate likely ECG artifact. Patient assessment remains primary while the signal path is corrected and verified."},
  {department:"Emergency Department",title:"The Pump That Works on the Bench",patient:"A volumetric pump repeatedly alarms downstream occlusion in one patient setup. It completes a delivery accuracy check and runs normally with approved test tubing.",question:"What should happen next?",options:["Replace the motor","Inspect the patient-side tubing, clamps, filters, catheter, and access resistance with the clinical team","Disable occlusion detection","Replace the hospital network switch"],answer:1,explanation:"The pump performs normally under controlled conditions, so the clinical delivery path and access conditions require evaluation before internal repair."},
  {department:"Operating Room",title:"Activation Without Effect",patient:"An ESU powers on, settings are appropriate, and the activation tone occurs. A second approved active cable and electrode restore normal cutting performance.",question:"What does the evidence support?",options:["A generator output-stage failure","A fault in the original active accessory or cable","A failed return electrode monitor in every case","A medical gas problem"],answer:1,explanation:"The problem follows the original accessory and resolves with a known-good compatible replacement, strongly localizing the fault outside the generator."},
  {department:"Respiratory Care",title:"Alarm After Transport",patient:"A ventilated patient is moved from bed to stretcher. A low-pressure alarm begins immediately. The patient is being manually supported while the circuit is inspected.",question:"What is the highest-probability first technical finding?",options:["A circuit disconnection or significant leak introduced during movement","A failed ultrasound beamformer","A defibrillator synchronization problem","An infusion drug-library mismatch"],answer:0,explanation:"Timing matters. A low-pressure alarm immediately after movement most strongly suggests a newly loosened or disconnected circuit component or leak."}
];

const m4q=(question,options,answer,explanation,category)=>({question,options,answer,explanation,category});
export const missionFourQuestions = [
 m4q("ECG rate is 180 while the pulse-derived rate is 76 and the patient is stable. What should be investigated first?",["ECG artifact and lead quality","NIBP cuff size only","Defibrillator energy selection","Ultrasound frequency"],0,"Discordant heart-rate sources support verifying the ECG signal path and artifact.","Monitoring"),
 m4q("Which factor can cause a falsely low pulse-oximetry value?",["Motion or poor perfusion","Correct probe placement","Strong pulsatile signal","Stable warm extremity"],0,"Motion and poor perfusion can degrade the pulsatile signal used by pulse oximetry.","Monitoring"),
 m4q("An NIBP cuff that is too small most commonly causes what concern?",["Potentially inaccurate elevated readings","Guaranteed zero pressure","ECG artifact only","Loss of ultrasound image"],0,"Incorrect cuff sizing can distort NIBP measurements; an undersized cuff may read high.","Monitoring"),
 m4q("A downstream occlusion alarm directs attention primarily where?",["Between the pump and patient","Between the fluid bag and pump only","The hospital router","The ECG trunk cable"],0,"Downstream means the delivery path after the pumping mechanism toward the patient.","Infusion"),
 m4q("A pump operates normally with approved test tubing but alarms with one clinical setup. What is the strongest next step?",["Evaluate the clinical tubing and access path","Replace the display","Disable alarms","Replace every battery"],0,"The controlled test shifts suspicion toward the setup, tubing, filter, clamp, or access resistance.","Infusion"),
 m4q("Why should an infusion-pump alarm not be bypassed?",["It may represent a condition affecting therapy delivery","It only changes screen color","It improves battery life","It is unrelated to safety"],0,"Pump alarms may indicate interrupted, inaccurate, or unsafe delivery conditions.","Infusion"),
 m4q("What is the immediate disposition of a defibrillator that fails its readiness test?",["Remove from service and provide a replacement","Leave it on the crash cart","Use it at lower energy","Ignore the result"],0,"A failed readiness test means the unit should not remain available for emergency therapy.","Defibrillation"),
 m4q("Synchronization markers are used during which function?",["Synchronized cardioversion","Routine SpO₂ measurement","NIBP inflation","Ultrasound imaging"],0,"Synchronization coordinates energy delivery with the selected ECG event.","Defibrillation"),
 m4q("A low-pressure ventilator alarm most directly suggests which broad condition?",["Leak, disconnection, or inability to build pressure","Excessive circuit resistance only","High blood pressure","A PACS outage"],0,"Low pressure commonly reflects an open or leaking breathing pathway.","Ventilation"),
 m4q("A high-pressure ventilator alarm can result from:",["Obstruction, secretions, biting, kinked tubing, or reduced compliance","A disconnected open circuit only","A missing ECG electrode","A low ultrasound gain setting"],0,"Any condition increasing resistance or reducing compliance can raise airway pressure.","Ventilation"),
 m4q("During an active ventilator failure, what comes first?",["Maintaining patient ventilation through the clinical response","Opening the ventilator immediately at bedside","Updating the asset tag","Printing the service manual"],0,"Patient support and safe clinical continuity precede technical investigation.","Ventilation"),
 m4q("In monopolar electrosurgery, the current pathway includes:",["Active electrode, patient tissue, and return electrode","Only the two tips of bipolar forceps","An oxygen cylinder","An NIBP cuff"],0,"Monopolar energy returns through the patient return electrode pathway.","Electrosurgery"),
 m4q("An ESU tones on activation but has no clinical effect. What is the best first technical strategy?",["Trace settings, controls, accessories, connections, and energy path","Replace the main board","Increase oxygen flow","Disable return monitoring"],0,"Systematic isolation should precede internal component replacement.","Electrosurgery"),
 m4q("A problem appears only in anesthesia ventilator mode but not manual mode. What does this tell you?",["Focus on the ventilator-specific pathway","The vaporizer must be empty","The ECG cable caused it","The hospital network is down"],0,"Mode specificity narrows the suspect pathway.","Anesthesia"),
 m4q("Which item can create an apparent anesthesia-machine leak without an internal machine failure?",["Misassembled breathing circuit or damaged disposable seal","A normal outlet label","A charged defibrillator battery","An ultrasound preset"],0,"External circuits and disposables are integral to the pressure pathway and can leak.","Anesthesia"),
 m4q("A fixed dropout band follows one ultrasound transducer. Another probe works normally. What is most likely?",["Transducer element/cable fault","Main display failure","NIBP hose leak","Ventilator exhalation-valve fault"],0,"The fault follows the transducer, localizing the problem.","Ultrasound"),
 m4q("What is the best use of a known-good compatible accessory?",["Isolate whether the fault follows the accessory or device","Defeat device safety systems","Avoid documenting the complaint","Change manufacturer specifications"],0,"Controlled substitution is a powerful isolation method when performed safely.","Accessories"),
 m4q("An intermittent failure appears when a cable is flexed near its strain relief. What does this suggest?",["An internal conductor or strain-relief failure","A hospital-wide voltage surge","A drug-library issue","Normal operation"],0,"Movement-dependent failure is characteristic of broken or intermittent conductors.","Accessories"),
 m4q("Which statement best describes a medical device system?",["The device plus accessories, configuration, patient interface, environment, and users","Only the internal circuit boards","Only disposable supplies","Only the wall outlet"],0,"Clinical performance depends on the complete system, not just the main enclosure.","Systems"),
 m4q("What should happen before replacing a major assembly?",["Gather evidence and isolate the failed pathway","Order every available board","Bypass the alarm","Assume the complaint is user error"],0,"Evidence-based isolation reduces unnecessary parts replacement and repeat failures.","Troubleshooting"),
 m4q("A device passes internal tests but the complaint is reproducible with one accessory. What is the leading suspect?",["The accessory or interface","The entire hospital electrical system","The medical gas plant","The patient monitor database"],0,"A reproducible accessory-specific failure is strong localization evidence.","Troubleshooting"),
 m4q("Which complaint requires the most urgent continuity-of-care action?",["A life-support ventilator failure during patient use","A cosmetic scratch","A printer paper jam","A missing noncritical label"],0,"Life-support failure during use requires immediate patient support and replacement equipment.","Prioritization"),
 m4q("When should equipment be removed from service?",["When a safety-critical function cannot be verified","Whenever a user asks a question","Only after a part is ordered","Never if it powers on"],0,"Unverified safety-critical performance requires controlled removal and replacement.","Safety"),
 m4q("What makes a service-call description most useful?",["Specific symptom, conditions, timing, configuration, and observed evidence","The phrase 'it is broken'","Only the room number","Only the device model"],0,"Precise context makes reproduction and isolation possible.","Communication"),
 m4q("What should final documentation include?",["Complaint, findings, tests, actions, and disposition","Only labor time","Only the serial number","Nothing when no part was replaced"],0,"Complete documentation preserves evidence and supports future safe service.","Documentation")
];

export const missionTenBriefing = {
  title: "Medical Gas Delivery Equipment",
  summary:
    "Learn the point-of-use medical gas equipment Clinical Engineers identify, inspect, connect, and troubleshoot. This mission stays focused on equipment support rather than central plant infrastructure managed by Facilities.",
  objectives: [
    "Identify common medical gas cylinders and verify labels before use.",
    "Explain how regulators reduce cylinder pressure to a usable working pressure.",
    "Differentiate PISS, DISS, and quick-connect safety systems.",
    "Recognize flowmeters, oxygen-air blenders, vacuum regulators, and suction accessories.",
    "Use a safe troubleshooting sequence and know when to escalate an infrastructure concern.",
  ],
};

export const missionTenLessons = [
  {
    title: "Medical Gas Identification",
    icon: "🏷️",
    points: [
      "Always identify a medical gas by its product label and connection system, not by color alone.",
      "Common point-of-use services include oxygen, medical air, vacuum, nitrous oxide, and WAGD.",
      "Color conventions can vary by country, standard, or older installation.",
      "A Clinical Engineer should verify the source, fitting, and intended equipment before connection.",
    ],
    check: { question: "What is the most reliable way to identify a medical gas source?", options: ["Cylinder color only", "Room location", "The product label and indexed connection", "The hose length"], answer: 2, explanation: "Labels and indexed connections are the primary identification safeguards; color alone is not enough." },
  },
  {
    title: "Cylinder Types and Pressure",
    icon: "🧯",
    points: [
      "E cylinders are commonly used for portable patient transport.",
      "Larger H or K cylinders are generally used where greater capacity is needed.",
      "Cylinder pressure must be checked before use or transport.",
      "Cylinders must remain secured and protected from impact or valve damage.",
    ],
    check: { question: "Which cylinder is commonly used for portable patient transport?", options: ["E cylinder", "H cylinder", "Bulk tank", "Receiver tank"], answer: 0, explanation: "The E cylinder is a common portable cylinder size used on transport carts." },
  },
  {
    title: "Regulators and Gauges",
    icon: "🎛️",
    points: [
      "A regulator reduces high cylinder pressure to a controlled working pressure.",
      "The pressure gauge indicates remaining cylinder pressure or supply pressure, depending on the design.",
      "Inspect the regulator body, gauge, yoke, seal, threads, and outlet before use.",
      "Do not use oil, grease, or unapproved sealants on oxygen equipment.",
    ],
    check: { question: "Why is a regulator required on a compressed gas cylinder?", options: ["To increase cylinder pressure", "To reduce high pressure to a usable pressure", "To change oxygen into air", "To cool the gas"], answer: 1, explanation: "Cylinder pressure is too high for direct patient-care use, so the regulator controls the delivered pressure." },
  },
  {
    title: "PISS and Yoke Connections",
    icon: "🔩",
    points: [
      "The Pin Index Safety System uses gas-specific pin positions on small-cylinder yoke connections.",
      "The correct washer or seal is required for a leak-free connection.",
      "Never defeat, remove, or alter indexing pins.",
      "A damaged yoke, missing seal, or misaligned cylinder can cause leakage.",
    ],
    check: { question: "What is the purpose of PISS?", options: ["Measure flow", "Prevent connection of the wrong gas cylinder", "Collect suction fluid", "Regulate wall vacuum"], answer: 1, explanation: "Gas-specific pin positions help prevent attaching the wrong cylinder to a yoke." },
  },
  {
    title: "DISS and Quick-Connect Fittings",
    icon: "🔌",
    points: [
      "DISS uses gas-specific threaded dimensions to prevent cross-connection.",
      "Quick-connect systems may include Ohmeda, Chemetron, or other indexed designs.",
      "Inspect fittings for damage, contamination, loose parts, and poor retention.",
      "Never force a fitting that does not engage normally.",
    ],
    check: { question: "A fitting will not engage a wall outlet normally. What is the safest action?", options: ["Force it with pliers", "Modify the fitting", "Stop and verify the gas and connection type", "Lubricate it with oil"], answer: 2, explanation: "A mismatch or damaged connection must be identified rather than forced." },
  },
  {
    title: "Flowmeters",
    icon: "📏",
    points: [
      "A Thorpe-tube flowmeter controls and displays gas flow in liters per minute.",
      "Read a ball float at its center unless the manufacturer specifies otherwise.",
      "The flowmeter should be upright for an accurate reading.",
      "Common failures include cracked tubes, stuck floats, damaged knobs, and leaking seals.",
    ],
    check: { question: "Where is a ball-style Thorpe-tube float normally read?", options: ["At the top", "At the center", "At the bottom", "At the control knob"], answer: 1, explanation: "Ball floats are generally read at the center; always follow the device labeling and manufacturer instructions." },
  },
  {
    title: "Oxygen-Air Blenders",
    icon: "🫁",
    points: [
      "A blender combines oxygen and medical air to provide a selected oxygen concentration.",
      "Both gas supplies must be present and within the required pressure range.",
      "A supply imbalance or missing source can activate an alarm and affect output.",
      "Verification requires an appropriate oxygen analyzer when specified by the manufacturer or procedure.",
    ],
    check: { question: "What two sources are required by a standard oxygen-air blender?", options: ["Oxygen and vacuum", "Air and vacuum", "Oxygen and medical air", "Nitrous oxide and WAGD"], answer: 2, explanation: "The blender mixes pressurized oxygen and medical air to create the selected concentration." },
  },
  {
    title: "Vacuum Regulators",
    icon: "⬇️",
    points: [
      "A vacuum regulator controls the negative pressure delivered from a wall vacuum source.",
      "Modes may include continuous, intermittent, or full-regulated suction depending on the device.",
      "Inspect the gauge, mode selector, adjustment control, outlet, and overflow protection.",
      "Compare performance at another outlet when determining whether a problem is local or room-wide.",
    ],
    check: { question: "A vacuum regulator has no suction. What is a good first comparison?", options: ["Replace the central pump", "Try a known-good regulator at the same outlet", "Increase oxygen flow", "Bypass the overflow protection"], answer: 1, explanation: "A known-good comparison helps separate a regulator problem from an outlet or infrastructure issue." },
  },
  {
    title: "Canisters and Suction Accessories",
    icon: "🧴",
    points: [
      "A suction setup commonly includes a vacuum source, regulator, collection canister, tubing, and patient interface.",
      "Overflow protection helps prevent fluid from entering the regulator or pipeline.",
      "Leaks, loose lids, blocked filters, kinked tubing, and full canisters can reduce suction.",
      "Disposable components should be installed and replaced according to facility policy and manufacturer instructions.",
    ],
    check: { question: "Which condition can reduce suction even when the wall source is working?", options: ["A loose canister lid", "A secured cylinder", "A labeled outlet", "A clean gauge lens"], answer: 0, explanation: "A loose lid creates an air leak and can prevent the system from developing adequate vacuum." },
  },
  {
    title: "Safe Troubleshooting and Escalation",
    icon: "🛡️",
    points: [
      "Begin with the complaint, verify the setup, and inspect the local equipment and accessories.",
      "Use known-good substitutions when safe and appropriate to isolate the fault.",
      "If multiple outlets or rooms are affected, protect patient care and escalate to Facilities or the responsible medical gas team.",
      "Document findings, actions, test results, and the final disposition of the equipment.",
    ],
    check: { question: "Several outlets in one clinical area have low pressure. What should Clinical Engineering do after local checks?", options: ["Open wall piping", "Adjust the central plant", "Escalate the possible infrastructure issue while supporting patient safety", "Ignore it because one device still works"], answer: 2, explanation: "A multi-outlet problem may involve infrastructure and should be escalated to the responsible Facilities or medical gas team." },
  },
];

export const missionTenScenarios = [
  {
    title: "Transport Cylinder Reads 250 PSI",
    patient: "A transport team is preparing to move a patient. The attached E cylinder reads approximately 250 PSI.",
    question: "What is the best response?",
    options: ["Proceed because any positive pressure is sufficient", "Replace or refill the cylinder according to policy before transport", "Strike the gauge to verify it", "Remove the regulator while the valve is open"],
    answer: 1,
    explanation: "A nearly depleted cylinder may not support the planned transport. Follow facility policy and verify adequate reserve before departure.",
  },
  {
    title: "No Suction at the Bedside",
    patient: "A nurse reports no suction. The regulator is connected, but the gauge does not respond.",
    question: "What is the best first troubleshooting sequence?",
    options: ["Replace the hospital vacuum pump", "Verify outlet engagement, regulator mode, tubing, canister seal, and compare with known-good equipment", "Increase oxygen pressure", "Bypass the regulator"],
    answer: 1,
    explanation: "Start with the complete local setup and isolate the fault before escalating an infrastructure concern.",
  },
  {
    title: "Blender Alarm After Setup",
    patient: "An oxygen-air blender alarms immediately after connection. Oxygen is connected, but the air hose is not fully seated.",
    question: "What should be done first?",
    options: ["Silence the alarm and continue", "Verify and properly connect both gas supplies", "Replace the concentration knob", "Connect vacuum to the air inlet"],
    answer: 1,
    explanation: "The blender requires both oxygen and medical air supplies. A missing or low source can trigger the alarm.",
  },
  {
    title: "Multiple Rooms Report Low Oxygen Pressure",
    patient: "Three rooms in the same area report low oxygen pressure. Local hoses and devices appear intact.",
    question: "What is the appropriate Clinical Engineering action?",
    options: ["Disassemble the wall outlets", "Continue replacing bedside devices", "Support immediate patient-care alternatives and notify the responsible Facilities/medical gas team", "Adjust the bulk oxygen system"],
    answer: 2,
    explanation: "A multi-room condition suggests a possible infrastructure problem outside normal Clinical Engineering scope." },
];

export const missionTenQuestions = [
  ["Which item is the primary source for identifying a medical gas?", ["Color alone", "Product label", "Room number", "Cylinder height"], 1, "The product label is the primary identifier; indexed connections add another safeguard."],
  ["What is a common use for an E cylinder?", ["Bulk storage", "Patient transport", "Vacuum production", "Alarm monitoring"], 1, "E cylinders are commonly used as portable gas sources during transport."],
  ["What does a cylinder regulator do?", ["Raises pressure", "Reduces pressure", "Creates vacuum", "Measures oxygen concentration"], 1, "The regulator reduces high cylinder pressure to a usable working pressure."],
  ["What does PISS help prevent?", ["Low flow", "Wrong cylinder connection", "Canister overflow", "Pipeline alarm failure"], 1, "Pin positions are gas-specific to reduce the risk of cross-connection."],
  ["DISS connections are primarily identified by what feature?", ["Gas-specific threaded dimensions", "Cylinder color", "Room signage", "Hose length"], 0, "DISS uses gas-specific diameters and threads."],
  ["What should you do if a quick-connect fitting will not engage?", ["Force it", "Verify type and inspect for damage", "Apply oil", "File the connector"], 1, "Never force or alter an indexed medical gas connection."],
  ["A Thorpe-tube flowmeter should normally be used in what position?", ["Horizontal", "Upright", "Upside down", "Any position"], 1, "The tube must generally be upright for accurate float position."],
  ["A ball float is generally read at what point?", ["Top", "Center", "Bottom", "Left edge"], 1, "Ball-style floats are normally read at the center."],
  ["What two gases feed an oxygen-air blender?", ["Oxygen and vacuum", "Oxygen and medical air", "Air and WAGD", "Nitrous oxide and oxygen"], 1, "The blender mixes oxygen and medical air."],
  ["A blender alarms when one supply is missing because of what condition?", ["Supply pressure imbalance", "Canister overflow", "Cylinder indexing", "Vacuum occlusion"], 0, "Blenders monitor the two source pressures and may alarm when one is absent or unequal."],
  ["What does a vacuum regulator control?", ["Positive oxygen pressure", "Negative pressure", "Oxygen percentage", "Cylinder temperature"], 1, "A vacuum regulator controls the suction level delivered to the setup."],
  ["Which item protects a vacuum regulator from aspirated fluid?", ["Overflow protection", "PISS pins", "DISS nut", "Flow tube"], 0, "Overflow devices and filters help prevent fluid from reaching the regulator or pipeline."],
  ["Which setup fault commonly reduces suction?", ["Loose canister lid", "Secure tubing", "Clean filter", "Correct outlet engagement"], 0, "A loose lid creates a leak in the suction circuit."],
  ["What should be checked before replacing a reported faulty suction regulator?", ["The entire local setup", "Only the wall color", "The bulk oxygen level", "The hospital generator"], 0, "Tubing, canister, filters, mode, connections, and source should all be evaluated."],
  ["What is WAGD used for?", ["Delivering oxygen", "Removing waste anesthetic gas", "Producing medical air", "Measuring vacuum"], 1, "WAGD removes waste anesthetic gases from the anesthesia system."],
  ["Why must oxygen equipment be kept free of oil and grease?", ["They reduce gauge accuracy", "They can create a serious fire hazard in oxygen-enriched conditions", "They change cylinder color", "They stop vacuum"], 1, "Hydrocarbon contamination can ignite readily in high-pressure or oxygen-enriched environments."],
  ["What is the safest way to determine whether a suction problem is the regulator or outlet?", ["Replace central pumps", "Use a known-good comparison", "Increase oxygen flow", "Remove indexing"], 1, "Known-good substitution is an efficient way to isolate the fault."],
  ["A cylinder must be transported in what condition?", ["Unsecured", "Secured against falling", "With the valve unprotected", "Carried by the regulator"], 1, "Cylinders must be secured and handled to protect the valve and prevent impact."],
  ["What should be done with a visibly damaged regulator?", ["Use it at low flow", "Remove it from service and evaluate it", "Lubricate it", "Ignore cosmetic damage"], 1, "Damage can affect pressure control and safety; the device should be removed and evaluated."],
  ["What is the first action when receiving a medical gas equipment complaint?", ["Replace the assembly", "Clarify the complaint and verify the setup", "Call the manufacturer", "Open the wall outlet"], 1, "Good troubleshooting begins by understanding and reproducing the reported problem safely."],
  ["Several rooms have the same pipeline pressure problem. Who should be notified after local checks?", ["Dietary", "Facilities or the responsible medical gas team", "Only the equipment vendor", "No one"], 1, "A multi-room issue may involve the distribution infrastructure."],
  ["Which connection system is commonly used on small cylinder yokes?", ["PISS", "DICOM", "HL7", "WAGD"], 0, "PISS is used on gas-specific small-cylinder yoke connections."],
  ["Which connection system uses gas-specific threaded fittings?", ["PISS", "DISS", "NIBP", "PACS"], 1, "DISS uses gas-specific diameter and thread combinations."],
  ["A flowmeter float is stuck at zero after the source is opened. What should be checked first?", ["Source availability and control valve", "Hospital network", "Canister lid", "ECG cable"], 0, "Verify that gas is available and the control path is open before replacing the flowmeter."],
  ["What is a likely cause of a leak at a cylinder yoke?", ["Missing or damaged seal", "Correct pin index", "Secured cylinder", "Closed flow control"], 0, "A missing, damaged, or doubled seal is a common yoke leak cause."],
  ["What should never be done to a gas-specific fitting?", ["Inspect it", "Clean it per approved procedure", "Modify it to fit another service", "Verify its label"], 2, "Altering an indexed connector defeats a critical safety barrier."],
  ["A portable suction unit differs from wall suction because it contains what?", ["Its own vacuum pump", "A bulk oxygen tank", "A central compressor", "A zone valve"], 0, "Portable suction creates vacuum using an internal pump rather than the central pipeline."],
  ["What information should a Clinical Engineer document after troubleshooting?", ["Only the room number", "Complaint, findings, actions, test results, and disposition", "Only the part cost", "Nothing if no part was replaced"], 1, "Complete documentation supports safety, continuity, and future troubleshooting."],
  ["A regulator gauge remains at zero on a known-full cylinder. What should be suspected first?", ["A closed valve, poor connection, or regulator/gauge fault", "A network outage", "A full suction canister", "An ECG artifact"], 0, "Verify the valve and connection, then evaluate the regulator and gauge."],
  ["Which statement best describes Clinical Engineering scope in this mission?", ["Maintain the central medical gas plant", "Support point-of-use equipment and escalate infrastructure issues", "Modify pipeline valves", "Certify bulk storage vessels"], 1, "The mission focuses on point-of-use equipment while central infrastructure is handled by the responsible Facilities/medical gas team."],
].map(([question, options, answer, explanation], index) => ({ question, options, answer, explanation, category: index < 6 ? "Identification" : index < 16 ? "Equipment" : index < 24 ? "Safety" : "Troubleshooting" }));
