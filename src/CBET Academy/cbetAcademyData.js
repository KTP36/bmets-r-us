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
