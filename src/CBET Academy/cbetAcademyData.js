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



/* =========================
   MISSION 7 — SAFETY & REGULATIONS
   ========================= */

export const missionSevenBriefing = {
  title: "Safety, Risk & Regulatory Readiness",
  summary:
    "Learn how Clinical Engineering protects patients before, during, and after service. Work through electrical-safety decisions, post-repair verification, incident preservation, recalls, documentation, and regulatory escalation using realistic hospital situations.",
  objectives: [
    "Decide when equipment must remain out of service instead of being returned to a patient-care area.",
    "Explain protective earth, leakage-current concepts, electrical-safety testing, and why manufacturer procedures matter.",
    "Use risk, service history, device function, and facility policy to support maintenance and disposition decisions.",
    "Preserve evidence and documentation after an incident without destroying information needed for investigation.",
    "Respond to recalls and field corrections using exact model, serial, lot, software, and affected-population information.",
    "Recognize when a device event must be escalated through the hospital's safety, risk, and medical-device reporting process."
  ]
};

export const missionSevenLessons = [
  {
    title: "The Return-to-Service Decision",
    icon: "🛡️",
    summary: "Treat patient safety and verified function as the finish line—not simply making the complaint disappear.",
    points: [
      "A repair is not complete until the reported problem is addressed and the device is verified for its intended clinical use.",
      "If a safety-related function cannot be verified, the device stays out of service even when it appears to operate normally.",
      "Clinical Engineering should communicate equipment status clearly so staff know whether a device is safe, restricted, quarantined, or awaiting further evaluation.",
      "When patient care is active, support the clinical team first; do not create a new hazard by troubleshooting around a patient unnecessarily."
    ],
    fieldCase: {
      label: "Return-to-Service Gate",
      evidence: [
        "Complaint: intermittent audible alarm",
        "Repair: speaker connection reseated",
        "Power-on self-test: PASS",
        "Visual display alarm: PASS",
        "Audible alarm test: fails 1 of 5 activations"
      ],
      question: "Would you return this device to clinical service?",
      answer: "No. An intermittent safety-related alarm is not a verified repair. Keep the device out of service and continue evaluation."
    },
    check: {
      question: "A device powers on after repair, but a safety-related alarm cannot be reproduced reliably. What is the best disposition?",
      options: [
        "Return it because the device powers on",
        "Return it with a note for nursing",
        "Keep it out until the alarm is reliably verified",
        "Disable the alarm and monitor the device"
      ],
      answer: 2,
      explanation: "Power-on is not enough. A safety-related function that cannot be verified should prevent return to clinical use."
    }
  },
  {
    title: "Protective Earth, Leakage & Electrical Safety",
    icon: "⚡",
    summary: "Understand what electrical-safety measurements are trying to protect against and why test conditions matter.",
    points: [
      "Protective earth provides a low-impedance path intended to reduce shock risk when exposed conductive parts could become energized.",
      "Leakage-current testing evaluates unintended current paths under defined test conditions; the correct limits and test modes depend on the device, applied parts, manufacturer instructions, and applicable standards.",
      "A low resistance protective-earth path does not prove every other electrical-safety requirement passes.",
      "Never invent a universal leakage-current limit. Use the approved analyzer procedure, manufacturer documentation, facility policy, and applicable standard for the equipment being tested."
    ],
    fieldCase: {
      label: "Post-Repair Safety Analyzer",
      evidence: [
        "Repair performed: AC power cord replaced",
        "Visual inspection: PASS",
        "Protective-earth test: FAIL",
        "Functional self-test: PASS",
        "Clinical function: appears normal"
      ],
      question: "What matters most?",
      answer: "The failed protective-earth result blocks return to service. Investigate the cord, inlet, ground path, connections, and test setup before release."
    },
    check: {
      question: "A device passes its functional self-test but fails an approved protective-earth test after an AC power-cord repair. What should happen?",
      options: [
        "Return it because clinical function passed",
        "Keep it out and investigate the earth path/test setup",
        "Bypass protective earth and retest",
        "Increase the allowed limit until it passes"
      ],
      answer: 1,
      explanation: "A failed electrical-safety requirement is not overridden by normal functional operation."
    }
  },
  {
    title: "Post-Repair Verification",
    icon: "🧪",
    summary: "Choose verification that is proportional to what you touched and the risk created by the repair.",
    points: [
      "Post-repair testing should verify the repaired function and any safety or performance areas that could have been affected by the work.",
      "Replacing a power cord can require electrical-safety verification; replacing an SpO₂ connector requires verification of the input pathway and compatible accessories.",
      "A generic power-on check is not an adequate substitute for a manufacturer-defined or facility-approved post-repair procedure.",
      "Document actual measurements and results rather than only writing 'tested OK.'"
    ],
    fieldCase: {
      label: "Service Scope",
      evidence: [
        "Device: bedside monitor",
        "Repair: SpO₂ input connector replaced",
        "ECG: not disturbed",
        "SpO₂ simulator: available",
        "Compatible sensor/cable: available"
      ],
      question: "What verification is strongest?",
      answer: "Verify the repaired SpO₂ pathway with appropriate simulator/accessories, inspect the repair, confirm alarms/display behavior, and complete any required post-repair safety checks."
    },
    check: {
      question: "Which post-repair note provides the strongest evidence?",
      options: [
        "Works now",
        "Nurse says okay",
        "SpO₂ verified with simulator at defined values; alarm response and repaired connector inspected; results documented",
        "Powered on for five minutes"
      ],
      answer: 2,
      explanation: "Specific test method, expected behavior, measured result, and disposition create useful, traceable service documentation."
    }
  },
  {
    title: "Risk-Based Equipment Management",
    icon: "📊",
    summary: "Understand how device function, failure consequence, history, manufacturer guidance, and local policy shape maintenance decisions.",
    points: [
      "Risk decisions should consider the device's clinical function, consequences of failure, maintenance requirements, service history, environment, and available controls.",
      "High-risk equipment deserves strong controls, but risk classification does not justify ignoring manufacturer safety requirements or facility policy.",
      "Repeated failures can change the maintenance strategy even when the device once appeared low risk.",
      "Alternative equipment-maintenance strategies require organizational governance, evidence, documentation, and compliance with applicable requirements—not an individual technician simply extending intervals."
    ],
    fieldCase: {
      label: "Repeat Failure Trend",
      evidence: [
        "Same model infusion device",
        "Three battery-related failures in six months",
        "Failures occur during transport",
        "PM history shows batteries meeting old replacement interval",
        "No immediate patient injury reported"
      ],
      question: "What should the CE do beyond replacing another battery?",
      answer: "Escalate the failure trend for equipment-management review, evaluate the maintenance strategy and manufacturer information, and document the pattern."
    },
    check: {
      question: "Which factor should influence equipment risk and maintenance strategy?",
      options: [
        "Only purchase price",
        "Only the technician's preference",
        "Function, failure impact, guidance, history, environment, and policy",
        "The color of the equipment"
      ],
      answer: 2,
      explanation: "Risk-based maintenance is evidence-driven and governed; it is not based on one factor or individual preference."
    }
  },
  {
    title: "Incident Investigation & Evidence Preservation",
    icon: "🚨",
    summary: "Respond to a device involved in an event without accidentally erasing the evidence needed to understand what happened.",
    points: [
      "Patient care comes first. Once the clinical situation is controlled, secure the involved equipment and accessories according to hospital policy.",
      "Do not casually reset, update, erase logs, alter configuration, or perform invasive repair before the incident pathway is established.",
      "Preserve the device, disposables/accessories when appropriate, power supply, cables, event logs, configuration, and identifying information.",
      "Record who reported the event, the complaint, device identifiers, condition found, and actions taken while maintaining the organization's chain-of-custody or evidence process."
    ],
    fieldCase: {
      label: "Post-Incident Work Order",
      evidence: [
        "Infusion pump involved in reported over-infusion",
        "Patient has been moved to another pump",
        "Device remains powered on",
        "Event log still available",
        "No one has changed settings since the event"
      ],
      question: "What is the strongest first CE action?",
      answer: "Quarantine and preserve the device/state according to the incident process, capture identifying/event information, and coordinate investigation before routine repair."
    },
    check: {
      question: "Which action is most likely to compromise an incident investigation?",
      options: [
        "Recording serial number and reported condition",
        "Quarantining the device",
        "Factory-resetting the device before saving its logs",
        "Following the hospital incident process"
      ],
      answer: 2,
      explanation: "Resetting or altering the device can destroy logs, configuration, or other evidence needed to reconstruct the event."
    }
  },
  {
    title: "Recalls, Corrections & Field Actions",
    icon: "📣",
    summary: "Turn a recall notice into controlled action using exact device identification and documented disposition.",
    points: [
      "A recall or field correction must be matched against the exact affected population—model, serial/lot, software version, accessory, or other identifiers in the notice.",
      "Do not assume every unit from the manufacturer is affected, and do not assume an unaffected-looking device can remain in service when its identifier matches the notice.",
      "Follow the manufacturer's/FDA action: remove, correct, inspect, relabel, update, restrict, or monitor as directed.",
      "Document inventory search, affected units, actions completed, units not located, disposition, and closure evidence."
    ],
    fieldCase: {
      label: "Urgent Field Action",
      evidence: [
        "Affected model: PX-500",
        "Affected serial range: 500120–500890",
        "Unit in OR: PX-500 / S/N 500611",
        "Notice action: remove from use until field correction",
        "Unit currently passes self-test"
      ],
      question: "Does the passing self-test override the notice?",
      answer: "No. The serial number falls inside the affected population and the notice directs removal from use until correction."
    },
    check: {
      question: "What is the best first step after receiving a device recall/field-correction notice?",
      options: [
        "Remove every device made by the manufacturer",
        "Match exact identifiers and required action to inventory",
        "Wait until the next PM",
        "Delete the notice if no failures were reported locally"
      ],
      answer: 1,
      explanation: "Recall response begins by identifying exactly which devices are affected and what the notice requires."
    }
  },
  {
    title: "Documentation, Traceability & Service Records",
    icon: "📝",
    summary: "Write service documentation that another technician, auditor, risk manager, or future investigator can actually use.",
    points: [
      "Good documentation states the complaint, condition found, troubleshooting evidence, work performed, parts/software used, verification results, and final disposition.",
      "Asset ID, manufacturer, model, serial number, location, dates, and technician identity support traceability.",
      "For safety events or recalls, record the specific action and evidence used to close the work—not only that the work order was completed.",
      "Avoid vague statements such as 'fixed,' 'checked,' or 'PM done' when a more specific result is available."
    ],
    fieldCase: {
      label: "Two Possible Notes",
      evidence: [
        "Note A: 'Pump fixed. OK for use.'",
        "Note B: 'Replaced occlusion sensor assembly; passed manufacturer functional test, alarm verification, and flow check; no leaks noted; returned to service.'"
      ],
      question: "Which note better supports traceability?",
      answer: "Note B. It tells the next person what failed, what changed, how it was verified, and the disposition."
    },
    check: {
      question: "Which information is most important in a service record after a safety-related repair?",
      options: [
        "Only the technician's initials",
        "Complaint, findings, action, verification, identifiers, and disposition",
        "Only the part price",
        "Only the room number"
      ],
      answer: 1,
      explanation: "Complete service records support continuity, auditability, safety, and future troubleshooting."
    }
  },
  {
    title: "Regulatory Escalation & Medical Device Reporting",
    icon: "🏛️",
    summary: "Know the CE role: recognize a potentially reportable event, preserve facts, and move it through the hospital's reporting process.",
    points: [
      "Hospitals and other device user facilities have FDA medical-device reporting responsibilities for certain device-related deaths and serious injuries.",
      "Clinical Engineering usually supports fact gathering, device identification, evidence preservation, manufacturer communication, and technical evaluation; the organization's designated process determines who submits formal reports.",
      "A medical-device report is a safety-surveillance report; submitting one does not by itself prove the device caused the event.",
      "Regulatory requirements and standards can change. Follow current FDA requirements, manufacturer instructions, and your organization's policy rather than relying on memory alone."
    ],
    fieldCase: {
      label: "Potentially Reportable Event",
      evidence: [
        "Hospital patient experienced a serious injury",
        "A medical device may have contributed",
        "Device is available for evaluation",
        "Manufacturer is known",
        "Clinical team has initiated the hospital safety event"
      ],
      question: "What should the CE do?",
      answer: "Preserve the device and facts, notify/coordinate through the hospital's designated risk/safety reporting pathway, and support required manufacturer/FDA reporting rather than independently deciding the event is non-reportable."
    },
    check: {
      question: "For a hospital device user facility, which statement is correct under FDA MDR requirements?",
      options: [
        "Device-related deaths and serious injuries never require reporting",
        "A suspected device-related death is reported to FDA and the manufacturer through the facility's required process",
        "Only the individual technician can submit the report",
        "Submitting an MDR proves the device caused the event"
      ],
      answer: 1,
      explanation: "FDA MDR requirements include user-facility reporting for certain device-related deaths and serious injuries. The hospital should use its designated reporting process."
    }
  }
];

export const missionSevenScenarios = [
  {
    title: "Infusion Pump After a Patient Event",
    prompt:
      "An infusion pump is removed from a room after a reported over-infusion. The patient is stable on another device. The pump is still powered on and its event log has not been downloaded. What is the strongest next CE action?",
    options: [
      "Factory-reset the pump so it can be tested cleanly",
      "Quarantine/preserve the device and current state, document identifiers, and follow the hospital incident-investigation process",
      "Replace the pump battery and return it to the unit",
      "Delete the event log after taking a photo of the screen"
    ],
    answer: 1,
    explanation:
      "Once patient care is stabilized, preserve the device and evidence before routine repair or reset. Event logs, configuration, accessories, and device condition may matter to the investigation."
  },
  {
    title: "Recall Notice Matches an OR Unit",
    prompt:
      "A manufacturer field action states that PX-500 units with serial numbers 500120–500890 must be removed from use until a field correction. An OR unit is PX-500, S/N 500611, and passes self-test. What should you do?",
    options: [
      "Leave it in service because self-test passes",
      "Remove/control the unit according to the field action and document the recall response",
      "Wait for the annual PM",
      "Change the serial number in the CMMS"
    ],
    answer: 1,
    explanation:
      "The unit matches the affected model and serial range. A normal self-test does not cancel the manufacturer's specified recall/field-action requirement."
  },
  {
    title: "Power Cord Repair Fails Safety Test",
    prompt:
      "After replacing a damaged AC power cord, a monitor powers on and functions normally, but the approved protective-earth test fails. What is the best disposition?",
    options: [
      "Return it because the clinical test passed",
      "Keep it out of service and investigate the cord, inlet, protective-earth path, connections, and test setup",
      "Raise the safety limit until it passes",
      "Remove the ground conductor and repeat the test"
    ],
    answer: 1,
    explanation:
      "A failed electrical-safety requirement after a power-path repair must be resolved before the device is returned to clinical service."
  },
  {
    title: "Intermittent Alarm After Repair",
    prompt:
      "A bedside monitor's speaker connection was repaired. Visual alarms work, but the audible alarm fails intermittently during repeated verification. What should the CE do?",
    options: [
      "Return it with a note that visual alarms still work",
      "Keep it out of service and continue troubleshooting until the alarm function is reliably verified",
      "Disable the audible alarm in configuration",
      "Tell staff to stand closer to the device"
    ],
    answer: 1,
    explanation:
      "A safety-related alarm that is still intermittent is not a completed repair. The device should not return to service until required alarm performance is verified."
  }
];

export const missionSevenQuestions = [
  ["What is the best definition of a completed repair?", ["The device powers on", "The complaint is gone once", "The repaired and affected functions are verified and the device has an appropriate disposition", "A part was replaced"], 2, "Repair completion requires verification and disposition, not simply replacing a part.", "Return to Service"],
  ["A safety-related alarm cannot be verified reliably after repair. What should happen?", ["Return it with a warning", "Keep it out of service", "Disable the alarm", "Close the ticket"], 1, "Unverified safety-related function should block release.", "Return to Service"],
  ["Protective earth is intended primarily to:", ["Improve Wi-Fi", "Provide a low-impedance fault-current path that reduces shock risk", "Store charge", "Increase leakage"], 1, "Protective earth is a safety path for fault current.", "Electrical Safety"],
  ["Which statement about leakage-current limits is strongest?", ["One universal limit applies to every medical device", "Use the applicable device classification, test condition, manufacturer procedure, facility policy, and standard", "Any measurable leakage is a failure", "Functional testing replaces leakage testing"], 1, "Limits and test conditions depend on the device and applicable requirements.", "Electrical Safety"],
  ["A device passes functional testing but fails the required electrical-safety test. Which result controls release?", ["Functional result only", "The failed required safety test prevents release until resolved", "Whichever test is faster", "Neither"], 1, "Required safety verification must pass before return to service.", "Electrical Safety"],
  ["After replacing an SpO₂ input connector, the strongest verification is:", ["Power on only", "Verify the SpO₂ pathway, alarms, and simulator", "Check the network IP only", "Ask whether the screen looks normal"], 1, "Post-repair verification should target the repaired and affected functions.", "Post-Repair"],
  ["Which service note is strongest?", ["Fixed", "Checked OK", "Replaced AC cord; visual inspection and required electrical-safety/functional tests passed; returned to service", "Nurse notified"], 2, "Specific work and verification results provide traceability.", "Documentation"],
  ["Risk-based maintenance should consider:", ["Purchase price only", "Clinical function, consequence of failure, history, manufacturer guidance, environment, and policy", "Technician preference only", "Device color"], 1, "Risk decisions are evidence-based and governed.", "Risk Management"],
  ["Repeated battery failures across the same model should trigger:", ["Only repeated battery replacement", "Trend review and possible equipment-management/maintenance-strategy escalation", "Deletion of old work orders", "Longer PM intervals automatically"], 1, "Repeated failures are a signal that the maintenance strategy may need review.", "Risk Management"],
  ["After a potentially serious device incident, which action can destroy useful evidence?", ["Documenting serial number", "Quarantining the device", "Factory reset before preserving logs/configuration", "Following the incident policy"], 2, "Resetting can erase data needed for investigation.", "Incident Investigation"],
  ["What should happen first after patient care is stabilized in a serious device event?", ["Routine repair immediately", "Secure/preserve the device and follow the organization's incident process", "Return it to stock", "Delete event logs"], 1, "Preservation and controlled investigation come before routine repair.", "Incident Investigation"],
  ["A recall notice applies to a specific serial-number range. What should the CE compare first?", ["Room number", "Exact device identifiers against the affected population", "Technician schedule", "Purchase price"], 1, "Recall control depends on exact affected identifiers and action.", "Recalls"],
  ["A recalled device passes self-test. The notice says remove from use until correction. What should happen?", ["Keep it in use", "Follow the notice and remove/control it until correction", "Wait for failure", "Ignore the serial number"], 1, "Self-test does not override a field-action instruction.", "Recalls"],
  ["A manufacturer performs a correction without physically removing the device. Which idea is most accurate?", ["Corrections can include repair, modification, adjustment, relabeling, inspection, or other specified action", "It cannot be a recall action", "No documentation is needed", "Only FDA can initiate any correction"], 0, "FDA defines corrections broadly; recall actions can be implemented without physically moving the product.", "Recalls"],
  ["Which information best supports traceability?", ["Asset ID/model/serial, complaint, findings, work, test results, and disposition", "Part price only", "Technician first name only", "Room number only"], 0, "Traceability requires device identity plus what happened and how it was verified.", "Documentation"],
  ["Under FDA MDR requirements, a hospital user facility that becomes aware of a suspected device-related death generally reports it to:", ["No one", "FDA and the manufacturer through the required facility process", "Only the equipment technician", "Only local purchasing"], 1, "FDA states that user facilities report suspected device-related deaths to FDA and the manufacturer.", "Regulatory"],
  ["Under FDA MDR requirements, a hospital user facility generally reports a device-related serious injury to:", ["The manufacturer, or FDA if the manufacturer is unknown", "Only the patient", "No one", "Only the device distributor"], 0, "FDA's user-facility requirements distinguish serious-injury reporting from death reporting.", "Regulatory"],
  ["Does filing an MDR by itself prove that the device caused the event?", ["Yes", "No", "Only if a technician signed it", "Only for infusion pumps"], 1, "FDA notes that an MDR itself is not proof of causation.", "Regulatory"],
  ["What is the CE's strongest role in a potentially reportable event?", ["Independently decide no report is needed", "Preserve facts/device evidence and escalate through the hospital's designated safety/risk reporting process", "Alter logs before risk management sees them", "Send the device back to service"], 1, "CE supports technical fact gathering and preservation while the organization follows its reporting process.", "Regulatory"],
  ["Why should Mission 7 avoid teaching one memorized safety limit for every device?", ["Safety analyzers cannot measure current", "Device type, applied parts, test conditions, manufacturer instructions, applicable standards, and policy determine what must be tested and accepted", "Limits never exist", "Only voltage matters"], 1, "Safe testing requires the correct device-specific and standard-specific context.", "Electrical Safety"]
].map(([question, options, answer, explanation, category]) => ({ question, options, answer, explanation, category }));



export const missionEightBriefing = {
  title: "Advanced Evidence-Based Troubleshooting",
  summary: "The complaint is not the diagnosis. Work realistic hospital failures by reading evidence, isolating the fault, choosing the highest-value next test, and proving the repair.",
  objectives: [
    "Separate reported symptoms from root causes.",
    "Isolate device, accessory, setup, environment, power, interlock, and network faults.",
    "Reproduce intermittent failures under the conditions that trigger them.",
    "Avoid shotgun part replacement and unsafe interlock bypasses.",
    "Verify the affected function before return to service."
  ],
};

export const missionEightLessons = [
  {title:"The Complaint Is Not the Diagnosis",icon:"🧠",summary:"Translate the work order into a testable symptom before replacing parts.",points:["Clarify what happened, when, and what changed.", "Ask what still works; partial function narrows the pathway.", "Reproduce safely when practical.", "Treat an error message as evidence, not a diagnosis."],fieldCase:{label:"Portable X-ray will not drive",evidence:["Boots normally", "COLLISION displayed", "No drive motion", "Recently used in trauma"],question:"What has the highest value before opening the drive system?",answer:"Inspect the column, bumper, collision-sensor movement, wheels, and attached items for obstruction or binding."},check:{question:"A portable X-ray boots but reports COLLISION and will not drive. Best first action?",options:["Replace the drive controller", "Inspect the collision/bumper mechanism for obstruction", "Replace both motors", "Disable collision detection"],answer:1,explanation:"Direct inspection should precede electronic replacement."}},
  {title:"Observe Before You Disassemble",icon:"👀",summary:"Simple physical conditions can create convincing equipment failures.",points:["Look for obstructed sensors, loose connectors, brakes, covers, and control positions.", "Compare current physical state with normal state.", "Never defeat an interlock just to clear a symptom.", "Observation is a diagnostic test."],fieldCase:{label:"Real collision call",evidence:["Collision error", "Drive inhibited", "No chassis damage", "Lead apron hanging on column"],question:"What does the apron change?",answer:"It can prevent the drive collision sensors from swinging freely. Remove the obstruction, then verify sensor movement, drive, and collision protection."},check:{question:"After removing an obstruction from a collision sensor, what completes the repair?",options:["Error disappears once", "Drive and collision protection pass functional verification", "User says it is okay", "Apron is moved"],answer:1,explanation:"The safety function must be verified."}},
  {title:"Trace the Entire Power Path",icon:"⚡",summary:"No-power complaints require a source-to-load approach.",points:["Verify source, cord, inlet, master switch/breaker, fuses, battery, and rails as appropriate.", "Hidden master controls can make a healthy cart look dead.", "Emergency-off can remove power from an imaging room.", "Confirm why an emergency shutdown occurred before restoring it."],fieldCase:{label:"Portable ultrasound appears dead",evidence:["Known-good outlet", "Cord connected", "No boot response", "Base switch marked I / O"],question:"What should be verified before opening the console?",answer:"Verify the cart master switch/breaker is in I (ON), then verify startup, charging, and operation."},check:{question:"Ultrasound is dead on a known-good outlet. Highest-value next step?",options:["Order a power supply", "Verify every external power control/breaker", "Replace battery", "Measure logic rails"],answer:1,explanation:"Finish external power-path checks first."}},
  {title:"Safety Controls and Interlocks",icon:"🛑",summary:"Healthy equipment can be intentionally inhibited by a safety circuit.",points:["Emergency-off, door, collision, cover, brake, and position interlocks may inhibit operation.", "Do not bypass safety circuits for clinical use.", "Determine whether a room problem is equipment, infrastructure, or safety state.", "Reset only after confirming the reason for activation is resolved."],fieldCase:{label:"X-ray room completely inoperative",evidence:["Console dark", "Generator disabled", "Nearby power normal", "Emergency-off physically depressed"],question:"What is the leading conclusion?",answer:"The emergency-off state can explain the shutdown. Confirm no unresolved hazard exists before the approved reset process."},check:{question:"Why not immediately reset an accidentally pressed X-ray emergency-off?",options:["It damages the tube", "Confirm it was not activated for an unresolved hazard", "It erases DICOM", "It resets calibration"],answer:1,explanation:"Safety state comes first."}},
  {title:"Device, Accessory, Setup, or Environment?",icon:"🔬",summary:"A device may pass bench testing because the fault is outside the chassis.",points:["Use known-good accessories and simulators to divide the system.", "If the symptom follows an accessory, investigate it.", "Location-only failures point toward environment/infrastructure/setup.", "Document substitutions and conditions."],fieldCase:{label:"Intermittent ECG artifact",evidence:["Clean simulator test", "Noise on selected beds", "Cable swap does not fix", "Worse near powered equipment"],question:"What should you investigate next?",answer:"Investigate interference, grounding/power conditions, electrode application, and nearby equipment before replacing the ECG module."},check:{question:"Monitor is clean on simulator but noisy only in one area. Best direction?",options:["Replace ECG board", "Investigate local environment and acquisition chain", "Replace display", "Reload network"],answer:1,explanation:"Location dependence shifts the evidence."}},
  {title:"Test Under Failure Conditions",icon:"📈",summary:"Intermittent faults disappear when bench conditions do not match clinical use.",points:["Reproduce load, motion, battery use, temperature, accessory setup, or clinical mode.", "A battery can look normal unloaded and collapse under load.", "Connectors can fail only during motion.", "A self-test proves only what it exercises."],fieldCase:{label:"Defibrillator intermittent energy",evidence:["Charges normally", "Battery acceptable", "Energy intermittently low", "Changes when therapy cable moves"],question:"What is the best next move?",answer:"Evaluate the therapy cable, connector, and energy path while reproducing the mechanical condition."},check:{question:"Why can a passed self-test be insufficient?",options:["Self-tests never work", "It may not exercise the failed pathway under clinical conditions", "It proves accessory failure", "It replaces external testing"],answer:1,explanation:"Match verification to the complaint."}},
  {title:"Network Evidence Without Guessing",icon:"🌐",summary:"Troubleshoot network failures by layer and evidence.",points:["Link does not prove application communication.", "Valid-looking IP settings can still conflict or be on the wrong path.", "New installs deserve cabling and switch-port scrutiny.", "Use duplicate-address, ping, link, and switch evidence."],fieldCase:{label:"New install cannot communicate",evidence:["IP build appears correct", "Application unreachable", "Installed today", "Physical path newly patched"],question:"What comes before changing application settings?",answer:"Validate cable/path, termination, link, switch port, and addressing. A physical-layer install error can defeat a correct IP build."},check:{question:"Correct IP settings but no communication after a new install. Strongest next step?",options:["Reinstall app", "Validate cabling, link, switch port, and path", "Change IP randomly", "Replace motherboard"],answer:1,explanation:"Start at the lower layers."}},
  {title:"Prove the Root Cause and Repair",icon:"✅",summary:"The symptom disappearing is not the same as proving the repair.",points:["A reboot can hide a symptom without fixing cause.", "Repeat the test that exposed the failure.", "Verify related safety functions.", "Document evidence, cause, correction, verification, and disposition."],fieldCase:{label:"Infusion pump occlusion",evidence:["Self-test passes", "Complaint with one set configuration", "Known-good set changes behavior", "No internal fault code"],question:"What would constitute strong closure?",answer:"Identify whether set, clamp, valve, setup, or pump pressure pathway caused the condition; correct it; then verify delivery and occlusion behavior."},check:{question:"Strongest evidence troubleshooting is complete?",options:["Device rebooted", "Root cause corrected and affected function verified", "No complaint for one hour", "A part was replaced"],answer:1,explanation:"Root-cause evidence plus verification is stronger."}},
];

export const missionEightScenarios = [
  {title:"Portable X-ray: Collision Error",prompt:"Portable X-ray boots normally but will not drive. COLLISION is displayed after use in a busy trauma bay. No impact damage is obvious. Best next action?",options:["Replace collision board", "Inspect bumper/sensor movement and anything contacting the column", "Replace drive motors", "Disable collision detection"],answer:1,explanation:"Inspection reveals a lead apron hanging on the column and blocking free collision-sensor movement. Remove it and verify drive plus collision protection."},
  {title:"X-ray Room: Everything Is Dead",prompt:"An entire X-ray room is down. Console and generator are dark while nearby department power is normal. Check before internal generator troubleshooting?",options:["DICOM routing", "Room emergency-off and safety-control state", "Tube calibration", "Detector software"],answer:1,explanation:"An emergency-off can intentionally remove system power. Confirm no unresolved hazard before approved reset."},
  {title:"Portable Ultrasound: No Power",prompt:"Portable ultrasound has no response. Outlet is known good and AC cord is connected. Highest-value next check?",options:["Replace power supply", "Verify the master I/O breaker at the base", "Replace battery", "Measure internal rails"],answer:1,explanation:"The lower master breaker is in O instead of I. Restore the proper state and verify startup/operation."},
  {title:"Infusion Pump: Occlusion on the Floor",prompt:"Pump repeatedly alarms downstream occlusion. Shop self-test passes. Complaint follows the clinical administration set and disappears with a known-good set. Best conclusion?",options:["Replace pressure sensor", "Continue isolating the set/setup before condemning the pump", "Replace PCB", "Raise occlusion threshold"],answer:1,explanation:"The evidence follows the set/setup; inspect restrictions, clamps, valves, loading, and interfaces."},
  {title:"Ventilator: Self-Test Passes, Volume Does Not",prompt:"Ventilator passes self-test, but a verified external analyzer repeatedly measures delivered volume outside tolerance. Best next move?",options:["Return it", "Evaluate configuration, circuit, sensors, and pneumatic path", "Replace display", "Change network"],answer:1,explanation:"Independent repeatable evidence requires further isolation."},
  {title:"Defibrillator: Intermittent Energy Failure",prompt:"Defibrillator charges normally and battery capacity is acceptable. Energy fails intermittently only when therapy cable is moved near connector. Investigate first?",options:["Battery chemistry", "Therapy cable, connector, and energy-delivery connection", "Printer", "Wi-Fi"],answer:1,explanation:"The failure correlates with cable movement."},
  {title:"Bedside Monitor: ECG Noise in One Area",prompt:"Multiple monitors show intermittent ECG noise only in one care area; shop simulator testing is clean. Noise worsens near powered equipment. Best direction?",options:["Replace ECG modules", "Investigate interference, power/grounding, and acquisition setup", "Replace displays", "Reimage monitors"],answer:1,explanation:"Shared location dependence points toward environment/infrastructure/acquisition."},
  {title:"Network: Duplicate Address",prompt:"Replacement workstation cannot communicate reliably. Network status shows intended static address but marks it Duplicate. Best interpretation?",options:["DNS failure", "Another device is using the same IP", "NIC definitely failed", "Reinstall server app"],answer:1,explanation:"Duplicate-address evidence directly indicates an IP conflict."},
  {title:"Network: New Install, No Communication",prompt:"New medical device has correct IP information but no application communication. Link behavior is abnormal after fresh patching. Validate first?",options:["Database records", "Physical cable/path, termination, link, and switch-port configuration", "Battery", "Patient accessories"],answer:1,explanation:"Start at the physical/link layer; an incorrect cable or patching error can defeat a correct IP build."},
  {title:"Portable Monitor: Fails Only in Transport",prompt:"Monitor runs normally on AC and battery passes stationary test. During transport it loses power over thresholds or when jostled. Best next test?",options:["Replace display", "Reproduce motion while monitoring battery contacts/connectors/power path", "Change IP", "Replace SpO2 sensor"],answer:1,explanation:"Dynamic testing matches the failure condition."}
];

export const missionEightQuestions = [
  ["A user says the machine is broken. Establish first?",["Exact symptom, conditions, timing, and recent changes", "Most expensive board", "Warranty status", "Vendor ETA"],0,"Convert complaint to a testable symptom","Diagnostic Process"],
  ["Portable X-ray shows COLLISION and will not drive. Best first action?",["Replace controller", "Inspect collision mechanism for obstruction/binding", "Replace motors", "Disable interlock"],1,"Error text is evidence, not diagnosis","Imaging"],
  ["After removing a lead apron blocking a collision sensor, what completes repair?",["Verify drive and collision protection", "Clear error only", "Replace sensor anyway", "Test imaging only"],0,"Verify affected safety function","Imaging"],
  ["X-ray room is dark while nearby power is normal. High-value early check?",["Emergency-off and safety-control state", "Detector tables", "PACS routing", "Focal spot"],0,"Safety controls can inhibit the room","Imaging"],
  ["Why not simply reset an activated emergency-off?",["It destroys calibration", "Reason for activation must be understood first", "It changes frequency", "It disables DICOM"],1,"Confirm no unresolved hazard","Safety"],
  ["Ultrasound is dead on a known-good outlet. Check before internal rails?",["Master I/O switch/breaker", "Crystal impedance", "Worklist", "Image processing"],0,"Trace external power path first","Ultrasound"],
  ["Pump occlusion follows one administration set. Evidence suggests?",["Investigate set/setup first", "Main PCB failed", "Battery weak", "Display bad"],0,"Symptom follows accessory/setup","Infusion"],
  ["Ventilator self-test passes but verified analyzer shows wrong volume. Next?",["Return it", "Investigate setup, sensors, and pneumatic delivery", "Replace display", "Ignore analyzer"],1,"Independent evidence requires isolation","Ventilation"],
  ["Defibrillator energy failure changes with therapy-cable movement. Target?",["Therapy cable/connector path", "Battery label", "Printer sensor", "Network radio"],0,"Follow the correlation","Defibrillation"],
  ["Several monitors show ECG noise only in one area. Pattern suggests?",["Environmental/infrastructure influence", "Simultaneous board failures", "Battery failures", "Backlight failure"],0,"Shared location matters","Patient Monitoring"],
  ["What does a passed self-test prove?",["Only functions/conditions exercised by that self-test", "Every clinical function", "Every accessory", "No intermittent fault"],0,"Know test limitations","Diagnostic Process"],
  ["Known-good substitution is useful because?",["It divides the system and shows where symptom follows", "It guarantees original part bad", "It eliminates verification", "It replaces documentation"],0,"Controlled substitution isolates","Diagnostic Process"],
  ["Battery voltage is normal unloaded but device resets under load. Evaluate?",["Battery/load performance and power path under load", "Unloaded voltage only", "Network speed", "Brightness"],0,"Load reveals weakness","Power"],
  ["Portable device fails only when moved. Reproduce what?",["Motion while monitoring contacts/power connections", "Stationary use only", "Different IP", "Factory reset"],0,"Match failure conditions","Intermittent Faults"],
  ["Intended static IP is marked Duplicate. Meaning?",["Another host uses that IP", "Subnet always wrong", "DNS definitely down", "Cable must be crossover"],0,"Direct IP conflict evidence","Networking"],
  ["Correct IP settings but no link after new install. Check before software?",["Cable/path, termination, link, switch port", "Database permissions", "Password", "Waveform scaling"],0,"Start at physical/link layer","Networking"],
  ["Problem with replacing the likely board before evidence?",["Can mask root cause and waste parts/time", "Boards never fail", "Always voids clearance", "Prevents inspection forever"],0,"Isolate before replacement","Diagnostic Process"],
  ["Intermittent complaint cannot be reproduced in shop. Strongest move?",["Reconstruct clinical conditions and collect history/logs", "Close immediately", "Replace main board", "Return undocumented"],0,"Recreate conditions and gather evidence","Intermittent Faults"],
  ["Symptom disappears after reboot. Conclusion?",["Symptom cleared; root cause may remain", "Device proven safe", "Hardware definitely good", "User caused it"],0,"Reboot is not root-cause proof","Diagnostic Process"],
  ["Fault appears only with one accessory. Next?",["Inspect/test accessory and interface", "Replace host", "Change VLAN", "Ignore pattern"],0,"Follow where symptom travels","Accessories"],
  ["Best troubleshooting documentation?",["Complaint, conditions, evidence, cause, action, verification, disposition", "Repaired OK", "Part replaced", "User notified"],0,"Detailed evidence supports traceability","Documentation"],
  ["Safety interlock prevents operation. BMET should?",["Determine why it is active rather than bypass it", "Defeat it", "Short switch for use", "Assume controller failed"],0,"Understand safety state","Safety"],
  ["Strong clue against replacing internal ECG module?",["Clean simulator test plus location-dependent noise", "Work order says ECG", "Device age", "User frustration"],0,"Controlled evidence outweighs assumption","Patient Monitoring"],
  ["Best final verification after intermittent repair?",["Repeat triggering condition and verify affected functions", "Power-cycle once", "Wait for complaint", "Cosmetic check"],0,"Challenge repair under original conditions","Verification"],
  ["Evidence-based troubleshooting means?",["Use observations/tests to narrow fault before corrective action", "Replace common parts first", "Follow error literally", "Start with most complex subsystem"],0,"Progressively reduce uncertainty","Diagnostic Process"]
].map(([question, options, answer, explanation, category]) => ({ question, options, answer, explanation, category }));

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
