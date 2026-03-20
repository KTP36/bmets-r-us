
import React, { useState, useEffect } from "react";
import logo from "./assets/logo.png";

// --- SOUND EFFECTS ---
const correctSound = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
const wrongSound = new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");

// --- HELPERS ---
function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// --- CBET QUESTIONS ---
const cbetQuestions = [
  {
    question: "What does Ohm’s Law describe?",
    options: [
      "The relationship between voltage, current, and resistance",
      "The relationship between pressure and flow",
      "The relationship between capacitance and inductance",
      "The relationship between temperature and resistance only"
    ],
    answer: 0
  },
  {
    question: "What unit is used to measure electrical resistance?",
    options: ["Volt", "Ampere", "Ohm", "Watt"],
    answer: 2
  },
  {
    question: "Which test instrument is best used to view an electrical waveform?",
    options: ["Defibrillator analyzer", "Oscilloscope", "Infusion analyzer", "ESU analyzer"],
    answer: 1
  },
  {
    question: "What is the main purpose of protective grounding in medical equipment?",
    options: [
      "To increase battery life",
      "To reduce display brightness",
      "To protect patients and users from electrical shock",
      "To improve signal resolution"
    ],
    answer: 2
  },
  {
    question: "Normal adult resting heart rate is generally:",
    options: ["20–40 bpm", "40–60 bpm", "60–100 bpm", "110–160 bpm"],
    answer: 2
  },
  {
    question: "AC stands for:",
    options: ["Applied Current", "Alternating Current", "Average Current", "Amplified Current"],
    answer: 1
  },
  {
    question: "Which of the following measures voltage?",
    options: ["Ammeter", "Voltmeter", "Ohmmeter", "Frequency meter"],
    answer: 1
  },
  {
    question: "Electrical power is measured in:",
    options: ["Volts", "Watts", "Ohms", "Hertz"],
    answer: 1
  },
  {
    question: "Which organ is primarily responsible for pumping blood?",
    options: ["Lungs", "Heart", "Liver", "Kidney"],
    answer: 1
  },
  {
    question: "A transformer is commonly used to:",
    options: [
      "Store charge",
      "Isolate or change voltage",
      "Measure current",
      "Block all AC signals"
    ],
    answer: 1
  },
  {
    question: "A fuse is designed to:",
    options: [
      "Boost current",
      "Open the circuit when excessive current flows",
      "Increase voltage",
      "Reduce signal noise"
    ],
    answer: 1
  },
  {
    question: "The respiratory system primarily exchanges:",
    options: ["Calcium and sodium", "Oxygen and carbon dioxide", "Blood and plasma", "Hormones and enzymes"],
    answer: 1
  },
  {
    question: "What is the unit of frequency?",
    options: ["Ohm", "Henry", "Hertz", "Volt"],
    answer: 2
  },
  {
    question: "A battery provides:",
    options: ["Alternating current only", "Direct current", "Pulsed ultrasound", "Ground fault protection"],
    answer: 1
  },
  {
    question: "Which action should be taken first when troubleshooting equipment?",
    options: [
      "Replace all circuit boards",
      "Verify the problem",
      "Order parts",
      "Calibrate the device"
    ],
    answer: 1
  },
  {
    question: "What does an ammeter measure?",
    options: ["Resistance", "Current", "Voltage", "Capacitance"],
    answer: 1
  },
  {
    question: "Which device is used to deliver electrical energy during cardiac arrest?",
    options: ["Ventilator", "Defibrillator", "Pulse oximeter", "Infusion pump"],
    answer: 1
  },
  {
    question: "An infusion pump is used to:",
    options: [
      "Measure blood oxygen levels",
      "Monitor ECG rhythm",
      "Deliver fluids at a controlled rate",
      "Measure temperature"
    ],
    answer: 2
  },
  {
    question: "Preventive maintenance is best described as:",
    options: [
      "Repair after failure",
      "Routine inspection and service to reduce failures",
      "Removing equipment from inventory",
      "Only electrical safety testing"
    ],
    answer: 1
  },
  {
    question: "Which of the following is a unit of current?",
    options: ["Ampere", "Watt", "Volt", "Ohm"],
    answer: 0
  },
  {
    question: "In the equation P = V × I, P stands for:",
    options: ["Pressure", "Power", "Potential", "Phase"],
    answer: 1
  },
  {
    question: "A capacitor primarily stores:",
    options: ["Current", "Magnetic flux", "Electrical charge", "Resistance"],
    answer: 2
  },
  {
    question: "A resistor’s function is to:",
    options: ["Store energy", "Oppose current flow", "Generate AC", "Measure voltage"],
    answer: 1
  },
  {
    question: "Which component opposes changes in current?",
    options: ["Capacitor", "Resistor", "Inductor", "Fuse"],
    answer: 2
  },
  {
    question: "What is continuity testing used for?",
    options: [
      "To check for an unbroken electrical path",
      "To measure capacitance",
      "To test battery chemistry",
      "To calibrate a monitor"
    ],
    answer: 0
  },
  {
    question: "A short circuit usually causes:",
    options: ["Higher resistance", "Lower current", "Excessive current flow", "No voltage"],
    answer: 2
  },
  {
    question: "A step-down transformer will:",
    options: ["Increase voltage", "Decrease voltage", "Store charge", "Rectify AC"],
    answer: 1
  },
  {
    question: "Which device converts AC to DC?",
    options: ["Transformer", "Rectifier", "Resistor", "Oscillator"],
    answer: 1
  },
  {
    question: "What does a diode primarily allow?",
    options: ["Current in both directions", "Current in one direction", "Voltage doubling", "Capacitance storage"],
    answer: 1
  },
  {
    question: "The symbol Ω represents:",
    options: ["Voltage", "Current", "Resistance", "Frequency"],
    answer: 2
  },
  {
    question: "Which meter function would you use to test a wall outlet voltage?",
    options: ["Ohms", "AC volts", "DC amps", "Continuity"],
    answer: 1
  },
  {
    question: "What is the likely result of an open fuse?",
    options: ["Short circuit", "Complete continuity", "No current flow through that path", "Increased capacitance"],
    answer: 2
  },
  {
    question: "Which circuit connection has the same current through all components?",
    options: ["Parallel", "Series", "Grounded", "Isolated"],
    answer: 1
  },
  {
    question: "Which circuit connection has the same voltage across branches?",
    options: ["Series", "Parallel", "Open", "Rectified"],
    answer: 1
  },
  {
    question: "A multimeter set to resistance should be used on:",
    options: [
      "An energized circuit",
      "A de-energized circuit",
      "Only AC circuits",
      "Only battery-powered devices"
    ],
    answer: 1
  },
  {
    question: "What is the purpose of a circuit breaker?",
    options: [
      "To increase current",
      "To interrupt current during overload",
      "To rectify AC power",
      "To regulate pressure"
    ],
    answer: 1
  },
  {
    question: "A waveform’s amplitude refers to its:",
    options: ["Frequency", "Maximum height", "Pulse width only", "Duty cycle"],
    answer: 1
  },
  {
    question: "A ground fault is best described as:",
    options: [
      "A normal condition",
      "A connection between an energized conductor and ground",
      "A battery failure",
      "A loss of capacitance"
    ],
    answer: 1
  },
  {
    question: "Which quantity is measured in farads?",
    options: ["Inductance", "Resistance", "Capacitance", "Current"],
    answer: 2
  },
  {
    question: "Which quantity is measured in henrys?",
    options: ["Capacitance", "Inductance", "Resistance", "Voltage"],
    answer: 1
  },
  {
    question: "The sinoatrial node is known as the heart’s:",
    options: ["Valve", "Pacemaker", "Septum", "Ventricle"],
    answer: 1
  },
  {
    question: "Which chamber of the heart pumps blood to the lungs?",
    options: ["Left atrium", "Right atrium", "Left ventricle", "Right ventricle"],
    answer: 3
  },
  {
    question: "Which chamber of the heart pumps blood to the body?",
    options: ["Left ventricle", "Right ventricle", "Right atrium", "Pulmonary artery"],
    answer: 0
  },
  {
    question: "The lungs are primarily responsible for:",
    options: ["Blood filtration", "Gas exchange", "Hormone production", "Digestive absorption"],
    answer: 1
  },
  {
    question: "Which blood vessel carries oxygenated blood away from the left ventricle?",
    options: ["Vena cava", "Pulmonary vein", "Aorta", "Pulmonary artery"],
    answer: 2
  },
  {
    question: "Pulse oximetry estimates:",
    options: [
      "Blood pressure",
      "Arterial oxygen saturation",
      "Respiratory volume",
      "Blood glucose"
    ],
    answer: 1
  },
  {
    question: "Normal adult body temperature is closest to:",
    options: ["95°F", "98.6°F", "101.5°F", "104°F"],
    answer: 1
  },
  {
    question: "Which organ primarily filters blood and produces urine?",
    options: ["Liver", "Kidney", "Pancreas", "Spleen"],
    answer: 1
  },
  {
    question: "The brain is part of which system?",
    options: ["Respiratory", "Nervous", "Digestive", "Musculoskeletal"],
    answer: 1
  },
  {
    question: "An ECG monitors the electrical activity of the:",
    options: ["Brain", "Lungs", "Heart", "Kidneys"],
    answer: 2
  },
  {
    question: "Blood pressure is expressed as:",
    options: ["Pulse over temperature", "Systolic over diastolic", "Mean over peak", "Cardiac output over heart rate"],
    answer: 1
  },
  {
    question: "Hypertension means:",
    options: ["Low blood oxygen", "High blood pressure", "Low pulse rate", "High temperature"],
    answer: 1
  },
  {
    question: "Respiratory rate measures:",
    options: [
      "Heartbeats per minute",
      "Breaths per minute",
      "Oxygen percentage",
      "Lung volume"
    ],
    answer: 1
  },
  {
    question: "The liver is important for:",
    options: ["Gas exchange", "Detoxification and metabolism", "Electrical conduction", "Oxygen storage"],
    answer: 1
  },
  {
    question: "Which body system includes bones and muscles?",
    options: ["Cardiovascular", "Musculoskeletal", "Neurologic", "Endocrine"],
    answer: 1
  },
  {
    question: "The function of hemoglobin is to:",
    options: ["Carry oxygen", "Digest proteins", "Produce insulin", "Form urine"],
    answer: 0
  },
  {
    question: "The trachea is part of the:",
    options: ["Digestive system", "Respiratory system", "Urinary system", "Endocrine system"],
    answer: 1
  },
  {
    question: "The stomach is part of the:",
    options: ["Nervous system", "Digestive system", "Respiratory system", "Skeletal system"],
    answer: 1
  },
  {
    question: "Which of the following is a vital sign?",
    options: ["Glucose", "Temperature", "Sodium", "Hemoglobin"],
    answer: 1
  },
  {
    question: "Bradycardia refers to:",
    options: ["Fast breathing", "Slow heart rate", "High blood pressure", "Low oxygen saturation"],
    answer: 1
  },
  {
    question: "An isolation transformer in medical equipment is primarily used to:",
    options: [
      "Increase battery life",
      "Reduce shock hazard",
      "Boost current",
      "Decrease resistance"
    ],
    answer: 1
  },
  {
    question: "Leakage current testing is performed mainly to verify:",
    options: [
      "Display accuracy",
      "Electrical safety",
      "Mechanical alignment",
      "Printer quality"
    ],
    answer: 1
  },
  {
    question: "Before opening equipment for service, a technician should first:",
    options: [
      "Calibrate the device",
      "Disconnect power and follow safety procedures",
      "Replace the battery",
      "Check network settings"
    ],
    answer: 1
  },
  {
    question: "The purpose of lockout/tagout is to:",
    options: [
      "Track inventory",
      "Prevent accidental energizing during service",
      "Reduce network traffic",
      "Verify calibration"
    ],
    answer: 1
  },
  {
    question: "A hospital-grade plug is intended to:",
    options: [
      "Improve patient comfort",
      "Provide more secure, durable grounding and connection",
      "Increase voltage output",
      "Reduce battery charging time"
    ],
    answer: 1
  },
  {
    question: "When handling ESD-sensitive components, the technician should use:",
    options: ["Latex gloves", "A wrist strap and ESD precautions", "A larger fuse", "An isolation chamber"],
    answer: 1
  },
  {
    question: "The safest first step before replacing an internal board is to:",
    options: ["Increase gain", "Power down and unplug the device", "Start a self-test", "Reset the clock"],
    answer: 1
  },
  {
    question: "A frayed power cord presents what type of hazard?",
    options: ["Optical hazard", "Electrical shock hazard", "Pneumatic hazard", "EMI benefit"],
    answer: 1
  },
  {
    question: "A line isolation monitor is associated with:",
    options: ["Operating rooms", "Laundry rooms", "Waiting rooms", "Office areas"],
    answer: 0
  },
  {
    question: "What is the main purpose of a biomedical equipment safety inspection?",
    options: [
      "To increase speed",
      "To verify the device is safe for use",
      "To reduce image resolution",
      "To improve aesthetics"
    ],
    answer: 1
  },
  {
    question: "If a device fails electrical safety testing, it should:",
    options: [
      "Be returned to service anyway",
      "Be removed from service until corrected",
      "Be used only at night",
      "Be recalibrated and ignored"
    ],
    answer: 1
  },
  {
    question: "A three-prong plug’s third prong is for:",
    options: ["Higher current", "Grounding", "Signal reference only", "Battery charging"],
    answer: 1
  },
  {
    question: "Defibrillator paddles or pads should be handled with care because they can:",
    options: [
      "Emit X-rays",
      "Deliver hazardous energy",
      "Cause refrigeration",
      "Drain oxygen"
    ],
    answer: 1
  },
  {
    question: "The best way to reduce accidental shock is to:",
    options: [
      "Remove the fuse",
      "Use proper grounding and safety procedures",
      "Increase frequency",
      "Lower capacitance"
    ],
    answer: 1
  },
  {
    question: "An equipment user reports a tingling sensation when touching a device. This suggests:",
    options: [
      "Normal function",
      "Possible leakage current problem",
      "A software update is needed",
      "Low battery only"
    ],
    answer: 1
  },
  {
    question: "Which fire extinguisher is generally appropriate for electrical fires?",
    options: ["Class A only", "Class B only", "Class C", "Class K only"],
    answer: 2
  },
  {
    question: "The purpose of warning labels on medical equipment is to:",
    options: [
      "Improve cosmetic appearance",
      "Communicate hazards and safe operation",
      "Increase network speed",
      "Reduce calibration frequency"
    ],
    answer: 1
  },
  {
    question: "When servicing equipment with capacitors, the technician should remember capacitors may:",
    options: [
      "Never store energy",
      "Retain charge after power is removed",
      "Only work on AC",
      "Automatically discharge instantly"
    ],
    answer: 1
  },
  {
    question: "A cracked enclosure on electrical equipment is concerning because it may:",
    options: [
      "Improve ventilation",
      "Expose users to hazardous parts",
      "Increase battery life",
      "Reduce leakage current"
    ],
    answer: 1
  },
  {
    question: "Preventive safety checks are intended to:",
    options: [
      "Replace all parts",
      "Identify hazards before they harm patients or staff",
      "Increase power consumption",
      "Eliminate the need for documentation"
    ],
    answer: 1
  },
  {
    question: "The most important first step in troubleshooting is to:",
    options: [
      "Replace the most expensive part",
      "Verify the complaint and gather information",
      "Reset every device",
      "Call the manufacturer immediately"
    ],
    answer: 1
  },
  {
    question: "If a device will not power on, an early check should be:",
    options: [
      "Image quality settings",
      "Power source, cord, and fuse",
      "Alarm volume",
      "Patient ID settings"
    ],
    answer: 1
  },
  {
    question: "Intermittent failures are often hardest to diagnose because they:",
    options: [
      "Never recur",
      "Do not occur consistently",
      "Only happen during PM",
      "Always involve software"
    ],
    answer: 1
  },
  {
    question: "When troubleshooting, changing multiple variables at once is:",
    options: ["Best practice", "Acceptable", "Usually not recommended", "Required"],
    answer: 2
  },
  {
    question: "A useful troubleshooting method is to:",
    options: [
      "Guess and replace parts",
      "Use a systematic step-by-step process",
      "Ignore the service manual",
      "Power cycle repeatedly until fixed"
    ],
    answer: 1
  },
  {
    question: "A service manual is valuable because it may provide:",
    options: [
      "Only serial numbers",
      "Schematics, flowcharts, and procedures",
      "Patient charts",
      "Insurance information"
    ],
    answer: 1
  },
  {
    question: "No display on a monitor, but power indicator is on. A likely next step is to check:",
    options: [
      "The weather",
      "Brightness, cable connections, and video path",
      "The infusion rate",
      "The printer paper"
    ],
    answer: 1
  },
  {
    question: "A device alarm that occurs only during patient movement may suggest:",
    options: [
      "A broken power supply",
      "Motion artifact or sensor placement issue",
      "A cracked enclosure",
      "A failed fuse"
    ],
    answer: 1
  },
  {
    question: "Before replacing a part, the technician should ideally:",
    options: [
      "Verify the part is likely faulty",
      "Replace all similar parts",
      "Erase all settings",
      "Disable all alarms"
    ],
    answer: 0
  },
  {
    question: "If a problem cannot be duplicated, the technician should:",
    options: [
      "Assume it is fixed",
      "Document findings and gather more information",
      "Discard the device",
      "Replace the battery automatically"
    ],
    answer: 1
  },
  {
    question: "Troubleshooting by comparing with a known-good unit can help identify:",
    options: [
      "Only cosmetic defects",
      "Abnormal behavior versus normal behavior",
      "Patient diagnosis",
      "Hospital staffing issues"
    ],
    answer: 1
  },
  {
    question: "When a device intermittently loses power if moved, a likely cause is:",
    options: [
      "A loose connection",
      "A calibrated sensor",
      "Normal operation",
      "A clean filter"
    ],
    answer: 0
  },
  {
    question: "An effective repair should be followed by:",
    options: [
      "No further action",
      "Verification testing and documentation",
      "Immediate disposal",
      "Removing labels"
    ],
    answer: 1
  },
  {
    question: "A blown fuse that blows again immediately after replacement suggests:",
    options: [
      "The problem is solved",
      "An underlying fault remains",
      "The new fuse is too large",
      "The display needs adjustment"
    ],
    answer: 1
  },
  {
    question: "Which is most helpful when troubleshooting a reported alarm issue?",
    options: [
      "Ignoring user input",
      "Understanding the alarm conditions and sequence",
      "Replacing the speaker first",
      "Changing the case color"
    ],
    answer: 1
  },
  {
    question: "A technician should document troubleshooting steps because it:",
    options: [
      "Wastes time",
      "Supports continuity and future service",
      "Eliminates need for testing",
      "Avoids PM schedules"
    ],
    answer: 1
  },
  {
    question: "If a sensor-dependent device gives unusual readings, a good first check is:",
    options: [
      "Replace the main board",
      "Inspect the sensor and its connection",
      "Repaint the enclosure",
      "Change the power cord"
    ],
    answer: 1
  },
  {
    question: "A problem that began after transport may suggest:",
    options: [
      "Loose parts or connections",
      "Better calibration",
      "Improved grounding",
      "Software licensing success"
    ],
    answer: 0
  },
  {
    question: "Troubleshooting should end only after:",
    options: [
      "The complaint is verified resolved",
      "A part is ordered",
      "A fuse is removed",
      "The case is closed informally"
    ],
    answer: 0
  },
  {
    question: "If a monitor displays artifact only on one channel, a likely next step is to inspect:",
    options: [
      "The room lighting",
      "The affected lead, cable, or input path",
      "The building plumbing",
      "The serial number label"
    ],
    answer: 1
  },
  {
    question: "A defibrillator is used primarily to:",
    options: [
      "Deliver IV medication",
      "Restore a viable rhythm with therapeutic shock",
      "Monitor temperature",
      "Measure lung volumes"
    ],
    answer: 1
  },
  {
    question: "An electrosurgical unit primarily cuts or coagulates tissue using:",
    options: ["Magnetic force", "High-frequency electrical energy", "Ultrasound only", "Hydraulic pressure"],
    answer: 1
  },
  {
    question: "A ventilator is used to:",
    options: [
      "Measure blood pressure",
      "Provide respiratory support",
      "Monitor ECG",
      "Deliver defibrillation"
    ],
    answer: 1
  },
  {
    question: "A pulse oximeter sensor is commonly placed on the:",
    options: ["Chest", "Finger", "Knee", "Shoulder"],
    answer: 1
  },
  {
    question: "An ECG monitor displays:",
    options: ["Temperature trend", "Electrical cardiac rhythm", "Oxygen tank level", "Drug concentration"],
    answer: 1
  },
  {
    question: "An NIBP monitor measures:",
    options: ["Invasive blood gases", "Noninvasive blood pressure", "Brain activity", "Respiratory humidity"],
    answer: 1
  },
  {
    question: "A patient monitor may commonly display:",
    options: [
      "ECG, SpO2, NIBP, and temperature",
      "Only ultrasound images",
      "Only x-ray images",
      "Only ventilator waveforms"
    ],
    answer: 0
  },
  {
    question: "A syringe pump is designed to:",
    options: [
      "Defibrillate the heart",
      "Deliver small volumes precisely",
      "Measure lung capacity",
      "Run an ECG"
    ],
    answer: 1
  },
  {
    question: "A suction regulator is used to:",
    options: [
      "Increase blood pressure",
      "Control negative pressure for suction",
      "Measure oxygen saturation",
      "Calibrate an oscilloscope"
    ],
    answer: 1
  },
  {
    question: "An ultrasound system creates images using:",
    options: ["Ionizing radiation", "Sound waves", "Static electricity", "Magnetic tape"],
    answer: 1
  },
  {
    question: "A fetal monitor is used to assess:",
    options: [
      "Maternal dental health",
      "Fetal heart rate and uterine activity",
      "Eye pressure only",
      "Kidney perfusion only"
    ],
    answer: 1
  },
  {
    question: "A centrifuge primarily separates substances based on:",
    options: ["Color", "Density", "Taste", "Conductivity only"],
    answer: 1
  },
  {
    question: "An autoclave sterilizes using:",
    options: ["Dry ice", "Steam under pressure", "UV light only", "Battery power"],
    answer: 1
  },
  {
    question: "A flowmeter is used to:",
    options: [
      "Measure electrical current",
      "Control and indicate gas flow",
      "Measure pulse rate",
      "Display waveforms"
    ],
    answer: 1
  },
  {
    question: "A capnograph measures:",
    options: ["Blood pressure", "End-tidal CO2", "Oxygen cylinder weight", "Heart size"],
    answer: 1
  },
  {
    question: "An incubator for neonates is used to maintain:",
    options: ["Blood glucose", "A controlled thermal environment", "Defibrillation level", "Surgical suction"],
    answer: 1
  },
  {
    question: "A dialysis machine is used to:",
    options: [
      "Support kidney function by removing wastes and fluid",
      "Provide respiratory support",
      "Measure ECG",
      "Analyze x-rays"
    ],
    answer: 0
  },
  {
    question: "A spirometer is used to assess:",
    options: ["Pulmonary function", "Cardiac output", "Blood sugar", "Kidney filtration"],
    answer: 0
  },
  {
    question: "The primary purpose of an anesthesia machine is to:",
    options: [
      "Sterilize instruments",
      "Deliver medical gases and anesthetic agents safely",
      "Measure EEG",
      "Infuse chemotherapy"
    ],
    answer: 1
  },
  {
    question: "A thermistor in a temperature probe changes with:",
    options: ["Humidity only", "Temperature", "Pressure only", "Oxygen level only"],
    answer: 1
  },
  {
    question: "Good service documentation should include:",
    options: [
      "Only the technician’s initials",
      "Findings, actions taken, and verification results",
      "Only the device color",
      "Only the date of manufacture"
    ],
    answer: 1
  },
  {
    question: "An inventory control number is used to:",
    options: [
      "Set blood pressure",
      "Track equipment within the program",
      "Measure voltage",
      "Record temperature"
    ],
    answer: 1
  },
  {
    question: "Preventive maintenance intervals are often based on:",
    options: [
      "The weather",
      "Risk, manufacturer guidance, and facility policy",
      "Technician preference only",
      "Patient age only"
    ],
    answer: 1
  },
  {
    question: "A recall on medical equipment requires the department to:",
    options: [
      "Ignore the notice",
      "Identify affected devices and take appropriate action",
      "Delete the inventory record",
      "Change the room temperature"
    ],
    answer: 1
  },
  {
    question: "Calibration means:",
    options: [
      "Cleaning the enclosure",
      "Comparing and adjusting performance to a known standard",
      "Replacing batteries only",
      "Performing only electrical safety tests"
    ],
    answer: 1
  },
  {
    question: "A work order should generally be opened when:",
    options: [
      "Equipment requires service or inspection",
      "A device is painted",
      "A user changes departments",
      "A screen saver changes"
    ],
    answer: 0
  },
  {
    question: "User training is important because it can:",
    options: [
      "Eliminate all equipment failures",
      "Reduce misuse and improve safe operation",
      "Replace PM entirely",
      "Remove the need for manuals"
    ],
    answer: 1
  },
  {
    question: "Incoming inspection is performed when equipment is:",
    options: ["Disposed", "Received before clinical use", "Sent for recall", "Disconnected from network"],
    answer: 1
  },
  {
    question: "A service history record helps by:",
    options: [
      "Providing trend information on past problems",
      "Reducing the need for inventory numbers",
      "Replacing safety testing",
      "Changing alarm limits automatically"
    ],
    answer: 0
  },
  {
    question: "If a device is beyond economical repair, appropriate action may include:",
    options: [
      "Returning it directly to service",
      "Following facility replacement/disposition procedures",
      "Ignoring it",
      "Using it only occasionally"
    ],
    answer: 1
  },
  {
    question: "A biomedical equipment management program should emphasize:",
    options: [
      "Patient safety and equipment effectiveness",
      "Only cosmetic appearance",
      "Only battery replacement",
      "Only purchasing"
    ],
    answer: 0
  },
  {
    question: "If a user reports a device problem, the technician should also consider:",
    options: [
      "Environmental and operator factors",
      "Only replacing the display",
      "Only changing fuses",
      "Ignoring setup factors"
    ],
    answer: 0
  },
  {
    question: "A loaner device used during repair should:",
    options: [
      "Be undocumented",
      "Be tracked and verified safe for use",
      "Be exempt from PM",
      "Have unknown settings"
    ],
    answer: 1
  },
  {
    question: "Battery maintenance is important because weak batteries can:",
    options: [
      "Improve alarm audibility",
      "Cause unexpected device shutdown or degraded performance",
      "Reduce leakage current to zero",
      "Improve calibration automatically"
    ],
    answer: 1
  },
  {
    question: "When a device returns from outside service, it should typically receive:",
    options: [
      "No inspection",
      "Appropriate verification before use",
      "Immediate disposal",
      "Only cosmetic cleaning"
    ],
    answer: 1
  },
  {
    question: "If a device repeatedly fails in the same way, it may suggest:",
    options: [
      "A recurring systemic issue",
      "The problem is solved",
      "The inventory number is wrong",
      "Normal device aging only"
    ],
    answer: 0
  },
  {
    question: "A preventive maintenance procedure should be:",
    options: [
      "Random each time",
      "Consistent and documented",
      "Kept secret from staff",
      "Performed only after failure"
    ],
    answer: 1
  },
  {
    question: "Before returning a repaired device to clinical use, the technician should:",
    options: [
      "Only clean it",
      "Verify proper function and safety",
      "Change the asset tag",
      "Disconnect the alarms"
    ],
    answer: 1
  },
  {
    question: "A battery-powered device plugged into AC often uses the AC source to:",
    options: [
      "Drain the battery",
      "Operate and/or charge the battery",
      "Increase leakage intentionally",
      "Disable grounding"
    ],
    answer: 1
  },
  {
    question: "A trend of repeated user errors with one device may indicate a need for:",
    options: [
      "Less documentation",
      "Additional user education",
      "Lower line voltage",
      "More batteries only"
    ],
    answer: 1
  },
  {
    question: "Alarm verification on patient equipment is important because alarms:",
    options: [
      "Are optional decorations",
      "Alert caregivers to potentially unsafe conditions",
      "Only matter during shipping",
      "Should always be disabled"
    ],
    answer: 1
  },
  {
    question: "A low battery alarm indicates:",
    options: [
      "The patient is unstable",
      "The device power reserve is limited",
      "Grounding is improved",
      "The fuse is oversized"
    ],
    answer: 1
  },
  {
    question: "If a device has network connectivity problems, a useful check is:",
    options: [
      "Gas supply pressure",
      "Cable connection and network settings",
      "Patient height",
      "Room lighting"
    ],
    answer: 1
  },
  {
    question: "An overloaded outlet strip in a patient care area is a concern because it can:",
    options: [
      "Improve redundancy",
      "Create an electrical hazard",
      "Reduce leakage to zero",
      "Increase image quality"
    ],
    answer: 1
  },
  {
    question: "The purpose of a self-test on startup is to:",
    options: [
      "Decorate the display",
      "Check key functions before use",
      "Increase noise",
      "Lower battery voltage"
    ],
    answer: 1
  },
  {
    question: "A defective sensor may lead to:",
    options: [
      "Accurate readings always",
      "Incorrect readings or alarms",
      "Lower resistance only",
      "Improved resolution"
    ],
    answer: 1
  },
  {
    question: "A cracked patient cable should generally be:",
    options: [
      "Ignored",
      "Removed from service and replaced",
      "Painted",
      "Retaped without inspection"
    ],
    answer: 1
  },
  {
    question: "A device’s service manual should be used because it helps ensure:",
    options: [
      "Guess-based repair",
      "Correct procedures and specifications",
      "Fewer work orders",
      "Lower oxygen flow"
    ],
    answer: 1
  },
  {
    question: "When evaluating a no-audio alarm complaint, check:",
    options: [
      "Speaker, alarm settings, and test conditions",
      "Only the paint color",
      "Only the asset tag",
      "Only the network printer"
    ],
    answer: 0
  },
  {
    question: "If a ventilator is removed from service unexpectedly, a priority is to:",
    options: [
      "Update wallpaper",
      "Ensure patient support continues safely",
      "Charge the battery only",
      "Cancel all PM"
    ],
    answer: 1
  },
  {
    question: "Medical gas hoses should be checked for:",
    options: [
      "Network speed",
      "Damage, leaks, and correct connections",
      "Screen brightness",
      "Battery chemistry"
    ],
    answer: 1
  },
  {
    question: "A biomedical technician should escalate issues when:",
    options: [
      "The problem is beyond training, tools, or authorization",
      "The case is a minor cleanup",
      "The battery is fully charged",
      "The asset tag is visible"
    ],
    answer: 0
  },
  {
    question: "A PM completion sticker mainly communicates:",
    options: [
      "Patient diagnosis",
      "Service status and timing",
      "Alarm volume",
      "Software source code"
    ],
    answer: 1
  },
  {
    question: "If two identical devices behave differently under the same test, this suggests:",
    options: [
      "A possible fault in one unit",
      "The test is invalid automatically",
      "Normal identical performance",
      "Grounding is unnecessary"
    ],
    answer: 0
  },
  {
    question: "A repeated nuisance alarm can still be dangerous because it may:",
    options: [
      "Lead to alarm fatigue",
      "Improve staff awareness indefinitely",
      "Increase oxygen saturation",
      "Eliminate leakage current"
    ],
    answer: 0
  },
  {
    question: "The goal of acceptance testing is to verify a new device:",
    options: [
      "Matches wall color",
      "Functions properly and is safe before clinical use",
      "Needs immediate disposal",
      "Never requires PM"
    ],
    answer: 1
  },
  {
    question: "A PM checklist helps technicians by:",
    options: [
      "Ensuring consistent required steps are followed",
      "Eliminating documentation",
      "Replacing service manuals",
      "Skipping safety checks"
    ],
    answer: 0
  },
  {
    question: "A failed battery in a transport monitor can especially affect:",
    options: [
      "Wall outlet polarity",
      "Operation away from AC power",
      "Printer color",
      "The room thermostat"
    ],
    answer: 1
  },
  {
    question: "Which is a common sign of sensor misapplication?",
    options: [
      "Unexpected values inconsistent with the patient condition",
      "Improved signal quality",
      "Longer battery life",
      "Lower line voltage"
    ],
    answer: 0
  },
  {
    question: "The best final step after completing a repair is to:",
    options: [
      "Assume success",
      "Test the device and document return-to-service status",
      "Delete the work order",
      "Remove the asset tag"
    ],
    answer: 1
  },
  {
    question: "Which patient monitor parameter is most directly related to oxygen saturation?",
    options: ["NIBP", "SpO2", "ECG", "EtCO2 waveform frequency only"],
    answer: 1
  },
  {
    question: "A device that fails only when on battery likely has an issue with the:",
    options: ["Enclosure color", "Battery or charging system", "Ground pin only", "Network password"],
    answer: 1
  },
  {
    question: "In a series circuit, if one component opens, the circuit will usually:",
    options: ["Continue normally", "Stop current flow", "Increase capacitance", "Double the voltage"],
    answer: 1
  },
  {
    question: "Which is most appropriate before connecting a safety analyzer to a device?",
    options: [
      "Read the procedure and understand the test setup",
      "Guess the settings",
      "Disable all alarms permanently",
      "Remove the grounding conductor"
    ],
    answer: 0
  },
  {
    question: "A patient cable with intermittent noise when flexed likely has:",
    options: ["A broken or damaged conductor", "Improved shielding", "Normal operation", "Higher insulation strength"],
    answer: 0
  }
];
const rnQuestions = [
  {
    question: "Which patient should the nurse see first?",
    options: [
      "A client with COPD and an oxygen saturation of 88%",
      "A client with a cast reporting itching",
      "A client requesting pain medication for chronic back pain",
      "A client asking for discharge instructions"
    ],
    answer: 0
  },
  {
    question: "Which finding requires immediate intervention?",
    options: [
      "Post-op client with urine output of 20 mL/hr",
      "Client with a temperature of 99.1°F",
      "Client with mild nausea after lunch",
      "Client requesting help to the bathroom"
    ],
    answer: 0
  },
  {
    question: "Which action is most important when administering insulin?",
    options: [
      "Shake the vial vigorously",
      "Check the blood glucose level first",
      "Administer before verifying the meal tray",
      "Massage the injection site"
    ],
    answer: 1
  },
  {
    question: "Which lab value is most concerning?",
    options: [
      "Potassium 6.2 mEq/L",
      "Sodium 138 mEq/L",
      "Calcium 9.2 mg/dL",
      "Glucose 102 mg/dL"
    ],
    answer: 0
  },
  {
    question: "A client receiving warfarin should be monitored for:",
    options: [
      "Bleeding",
      "Bradycardia",
      "Hypoglycemia",
      "Constipation"
    ],
    answer: 0
  },
  {
    question: "Which symptom is expected with hypoglycemia?",
    options: [
      "Cool clammy skin",
      "Dry flushed skin",
      "Bradycardia",
      "Decreased hunger"
    ],
    answer: 0
  },
  {
    question: "Which client is highest priority?",
    options: [
      "Client with chest pain and diaphoresis",
      "Client with a sprained ankle",
      "Client requesting a blanket",
      "Client with chronic constipation"
    ],
    answer: 0
  },
  {
    question: "The nurse should question which prescription?",
    options: [
      "Potassium for a client with potassium of 5.8",
      "Acetaminophen for fever",
      "Normal saline bolus for hypotension",
      "Oxygen for shortness of breath"
    ],
    answer: 0
  },
  {
    question: "Which finding suggests fluid volume overload?",
    options: [
      "Crackles in the lungs",
      "Flat neck veins",
      "Dry mucous membranes",
      "Poor skin turgor"
    ],
    answer: 0
  },
  {
    question: "Which intervention is appropriate for seizure precautions?",
    options: [
      "Pad side rails",
      "Place a tongue blade at bedside",
      "Restrain the client during seizure",
      "Keep the room brightly lit"
    ],
    answer: 0
  },
  {
    question: "Which patient statement shows understanding of digoxin teaching?",
    options: [
      "I will check my pulse before taking it",
      "I should take an extra dose if I miss one",
      "I can stop it when I feel better",
      "Blurred vision means the medicine is working"
    ],
    answer: 0
  },
  {
    question: "A client with suspected stroke should receive priority for:",
    options: [
      "Rapid neurologic assessment",
      "A high-protein snack",
      "Passive range-of-motion exercises",
      "Routine bedtime medications"
    ],
    answer: 0
  },
  {
    question: "Which position is best for a client with shortness of breath?",
    options: [
      "High Fowler's",
      "Supine",
      "Trendelenburg",
      "Prone"
    ],
    answer: 0
  },
  {
    question: "Which action prevents infection most effectively?",
    options: [
      "Hand hygiene",
      "Wearing a mask at all times",
      "Using sterile gloves for all care",
      "Keeping the room door closed"
    ],
    answer: 0
  },
  {
    question: "A nurse is caring for a client with a potassium of 2.9 mEq/L. The priority assessment is:",
    options: [
      "Cardiac rhythm",
      "Bowel sounds",
      "Vision changes",
      "Skin color"
    ],
    answer: 0
  },
  {
    question: "Which finding is expected with dehydration?",
    options: [
      "Tachycardia",
      "Bounding pulses",
      "Jugular vein distention",
      "Pulmonary crackles"
    ],
    answer: 0
  },
  {
    question: "Which nursing action is appropriate when transfusing blood?",
    options: [
      "Stay with the client during the first 15 minutes",
      "Infuse with dextrose solution",
      "Warm blood in a microwave if cold",
      "Start slowly after one hour"
    ],
    answer: 0
  },
  {
    question: "Which patient is at highest risk for falls?",
    options: [
      "An older adult taking sedatives",
      "A teenager with a sprained wrist",
      "A middle-aged adult with a headache",
      "A child with a sore throat"
    ],
    answer: 0
  },
  {
    question: "Which finding suggests anaphylaxis?",
    options: [
      "Wheezing and facial swelling",
      "Mild rash on one arm",
      "Low-grade fever",
      "Constipation"
    ],
    answer: 0
  },
  {
    question: "A nurse should hold which medication for a pulse of 52/min?",
    options: [
      "Metoprolol",
      "Acetaminophen",
      "Cefazolin",
      "Docusate"
    ],
    answer: 0
  },
  {
    question: "Which client requires droplet precautions?",
    options: [
      "Client with influenza",
      "Client with C. diff",
      "Client with MRSA wound infection",
      "Client with hepatitis A"
    ],
    answer: 0
  },
  {
    question: "Which symptom is most common in a urinary tract infection?",
    options: [
      "Burning on urination",
      "Bradycardia",
      "Blurred vision",
      "Constipation"
    ],
    answer: 0
  },
  {
    question: "Which food should a client taking warfarin consume consistently?",
    options: [
      "Green leafy vegetables",
      "Bananas",
      "Milk",
      "Oranges"
    ],
    answer: 0
  },
  {
    question: "The best indicator of oxygenation is:",
    options: [
      "Pulse oximetry",
      "Capillary refill",
      "Blood pressure",
      "Urine output"
    ],
    answer: 0
  },
  {
    question: "Which client teaching is correct for nitroglycerin tablets?",
    options: [
      "Sit down before taking the medication",
      "Swallow it with water immediately",
      "Take it only at bedtime",
      "Store it in the bathroom medicine cabinet"
    ],
    answer: 0
  },
  {
    question: "Which finding indicates worsening respiratory status?",
    options: [
      "Use of accessory muscles",
      "Respiratory rate 16/min",
      "Clear speech",
      "Pink nail beds"
    ],
    answer: 0
  },
  {
    question: "Which intervention is priority for a client with active bleeding?",
    options: [
      "Apply direct pressure",
      "Offer oral fluids",
      "Elevate the head of bed",
      "Provide discharge instructions"
    ],
    answer: 0
  },
  {
    question: "Which client is most likely experiencing hypovolemic shock?",
    options: [
      "Client with severe blood loss and low blood pressure",
      "Client with hypertension and edema",
      "Client with fever and flushed skin",
      "Client with chronic kidney disease"
    ],
    answer: 0
  },
  {
    question: "Which assessment finding is expected after opioid administration?",
    options: [
      "Respiratory depression",
      "Tachycardia",
      "Diarrhea",
      "Hypertension"
    ],
    answer: 0
  },
  {
    question: "A postoperative client has absent bowel sounds. The nurse should:",
    options: [
      "Continue to assess and hold oral intake if prescribed",
      "Give a laxative immediately",
      "Encourage a large meal",
      "Place the client flat"
    ],
    answer: 0
  },
  {
    question: "Which electrolyte imbalance can cause muscle weakness and dysrhythmias?",
    options: [
      "Hypokalemia",
      "Hypercalcemia",
      "Hypernatremia",
      "Hypophosphatemia"
    ],
    answer: 0
  },
  {
    question: "Which action is appropriate for chest tube care?",
    options: [
      "Keep the drainage system below chest level",
      "Clamp the tube routinely for transport",
      "Milk the tube every hour",
      "Disconnect the system to empty it"
    ],
    answer: 0
  },
  {
    question: "A nurse is teaching a client with heart failure. Which statement shows understanding?",
    options: [
      "I will weigh myself daily",
      "I should drink unlimited fluids",
      "I can stop my medicine if swelling improves",
      "Salt substitutes are always safe"
    ],
    answer: 0
  },
  {
    question: "Which finding is most concerning in a client with diabetes?",
    options: [
      "Foot ulcer with drainage",
      "Mild hunger before lunch",
      "Blood glucose 118 mg/dL",
      "Dry skin on elbows"
    ],
    answer: 0
  },
  {
    question: "Which nurse action is correct when a client has a seizure?",
    options: [
      "Turn the client on their side",
      "Insert an oral airway",
      "Hold the client down",
      "Place a pillow under the knees"
    ],
    answer: 0
  },
  {
    question: "A nurse should first assess a client who has:",
    options: [
      "Sudden confusion and restlessness",
      "A request for pain medicine",
      "A dressing change due in 30 minutes",
      "Questions about diet"
    ],
    answer: 0
  },
  {
    question: "Which finding is expected with hyperglycemia?",
    options: [
      "Increased thirst",
      "Diaphoresis",
      "Tremors",
      "Hunger"
    ],
    answer: 0
  },
  {
    question: "Which intervention reduces pressure injury risk?",
    options: [
      "Reposition at least every 2 hours",
      "Massage reddened skin",
      "Use donut cushions under bony prominences",
      "Keep the head of bed at 90 degrees"
    ],
    answer: 0
  },
  {
    question: "A client on heparin should be monitored using:",
    options: [
      "aPTT",
      "INR only",
      "Hemoglobin A1c",
      "Troponin"
    ],
    answer: 0
  },
  {
    question: "Which sign may indicate digoxin toxicity?",
    options: [
      "Nausea and visual halos",
      "Increased appetite",
      "Dry cough",
      "Constipation"
    ],
    answer: 0
  },
  {
    question: "Which client should the nurse assign to an LPN/LVN?",
    options: [
      "Stable client needing routine dressing change",
      "Client with new onset chest pain",
      "Client with acute respiratory distress",
      "Client needing admission assessment"
    ],
    answer: 0
  },
  {
    question: "Which intervention is priority for a client with a new tracheostomy?",
    options: [
      "Keep a trach obturator and suction available",
      "Limit all visitors",
      "Place the client flat after meals",
      "Provide thin liquids frequently"
    ],
    answer: 0
  },
  {
    question: "A client with pneumonia should be encouraged to:",
    options: [
      "Cough and deep breathe",
      "Remain flat in bed",
      "Restrict all fluids",
      "Avoid ambulation completely"
    ],
    answer: 0
  },
  {
    question: "Which finding suggests poor perfusion?",
    options: [
      "Cool pale extremities",
      "Warm dry skin",
      "Strong peripheral pulses",
      "Capillary refill less than 2 seconds"
    ],
    answer: 0
  },
  {
    question: "A nurse should question which diet order for a client with dysphagia?",
    options: [
      "Thin liquids",
      "Pureed foods",
      "Thickened liquids",
      "Upright position for meals"
    ],
    answer: 0
  },
  {
    question: "Which medication is commonly used to reverse opioid overdose?",
    options: [
      "Naloxone",
      "Atropine",
      "Epinephrine",
      "Flumazenil"
    ],
    answer: 0
  },
  {
    question: "A client with asthma is wheezing and short of breath. The priority medication is:",
    options: [
      "Albuterol",
      "Montelukast",
      "Prednisone tablet for next week",
      "Acetaminophen"
    ],
    answer: 0
  },
  {
    question: "Which statement by a new parent needs further teaching?",
    options: [
      "I will put my baby to sleep on their stomach",
      "I will place my baby on their back to sleep",
      "I will use a firm mattress",
      "I will keep loose blankets out of the crib"
    ],
    answer: 0
  },
  {
    question: "Which symptom is classic for appendicitis?",
    options: [
      "Right lower quadrant abdominal pain",
      "Left shoulder pain",
      "Painless hematuria",
      "Bilateral leg edema"
    ],
    answer: 0
  },
  {
    question: "A nurse caring for a client with meningitis should assess for:",
    options: [
      "Neck stiffness",
      "Bradycardia only after meals",
      "Decreased urine output after activity",
      "Yellow sclera"
    ],
    answer: 0
  },
  {
    question: "Which action best promotes client safety before giving medication?",
    options: [
      "Use two identifiers",
      "Ask the roommate to confirm the name",
      "Check only the room number",
      "Give meds based on the medication cart list"
    ],
    answer: 0
  }
];
// --- DATA SETS ---

 const organs = {
  Heart: {
    image: "/heart.png",
    boardWidth: 420,
    boardHeight: 420,
    dropWidth: 100,
    dropHeight: 40,
    mobileDropScale: 0.42,
    mobileLabelOffsetX: -75,
    mobileLabelOffsetY: 0,
    mobileImageScale: 1,
    mobileImageTranslateX: 0,
    mobileImageTranslateY: 0,
    imageStyle: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      objectPosition: "center"
    },
    parts: [
      { name: "Left Atrium", x: 250, y: 100 },
      { name: "Right Atrium", x: 130, y: 100 },
      { name: "Left Ventricle", x: 260, y: 230 },
      { name: "Right Ventricle", x: 150, y: 230 },
      { name: "Aorta", x: 210, y: 40 }
    ]
  },

  Brain: {
    image: "/brain.png",
    boardWidth: 420,
    boardHeight: 420,
    dropWidth: 100,
    dropHeight: 40,
    mobileDropScale: 0.42,
    mobileLabelOffsetX: -75,
    mobileLabelOffsetY: 0,
    mobileImageScale: 1,
    mobileImageTranslateX: 0,
    mobileImageTranslateY: 0,
    imageStyle: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      objectPosition: "center"
    },
    parts: [
      { name: "Frontal Lobe", x: 280, y: 120 },
      { name: "Parietal Lobe", x: 220, y: 80 },
      { name: "Occipital Lobe", x: 120, y: 120 }
    ]
  },

  Lungs: {
    image: "/lungs.png",
    boardWidth: 420,
    boardHeight: 420,
    dropWidth: 100,
    dropHeight: 40,
    mobileDropScale: 0.42,
    mobileLabelOffsetX: -75,
    mobileLabelOffsetY: 0,
    mobileImageScale: 1,
    mobileImageTranslateX: 0,
    mobileImageTranslateY: 0,
    imageStyle: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      objectPosition: "center"
    },
    parts: [
      { name: "Left Lung", x: 140, y: 150 },
      { name: "Right Lung", x: 260, y: 150 },
      { name: "Trachea", x: 200, y: 50 }
    ]
  }
};

const bones = {
  Skeleton: {
    image: "/skeleton.jpg",
    boardWidth: 620,
    boardHeight: 920,
    dropWidth: 80,
    dropHeight: 32,
    mobileDropScale: 0.38,
    mobileLabelOffsetX: -145,
    mobileLabelOffsetY: 0,
    mobileImageScale: 1.95,
    mobileImageTranslateX: -70,
    mobileImageTranslateY: 0,
    imageStyle: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      objectPosition: "center"
    },
    parts: [
      { name: "Skull", x: 315, y: 108 },
      { name: "Clavicle", x: 390, y: 220 },
      { name: "Sternum", x: 315, y: 270 },
      { name: "Ribs", x: 390, y: 320 },
      { name: "Humerus", x: 180, y: 255 },
      { name: "Radius", x: 100, y: 365 },
      { name: "Ulna", x: 189, y: 430 },
      { name: "Pelvis", x: 315, y: 395 },
      { name: "Femur", x: 315, y: 560 },
      { name: "Tibia", x: 390, y: 735 }
    ]
  },

  Hand: {
    image: "/hand.jpg",
    boardWidth: 620,
    boardHeight: 980,
    dropWidth: 118,
    dropHeight: 34,
    mobileDropScale: 0.34,
    mobileLabelOffsetX: -155,
    mobileLabelOffsetY: 10,
    mobileImageScale: 1.7,
    mobileImageTranslateX: -70,
    mobileImageTranslateY: 0,
    imageStyle: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      objectPosition: "center top",
      transform: "translateY(-40px) scale(0.95)"
    },
    parts: [
      { name: "Distal Phalanges", x: 325, y: 20 },
      { name: "Middle Phalanges", x: 460, y: 145 },
      { name: "Proximal Phalanges", x: 330, y: 220 },
      { name: "Metacarpals", x: 310, y: 345 },
      { name: "Scaphoid", x: 250, y: 540 },
      { name: "Lunate", x: 476, y: 510 },
      { name: "Triquetrum", x: 490, y: 465 },
      { name: "Pisiform", x: 390, y: 551 },
      { name: "Trapezium", x: 169, y: 455 },
      { name: "Trapezoid", x: 115, y: 510 },
      { name: "Capitate", x: 275, y: 412 },
      { name: "Hamate", x: 460, y: 415 }
    ]
  },

  Foot: {
    image: "/foot.jpg",
    boardWidth: 620,
    boardHeight: 1120,
    dropWidth: 130,
    dropHeight: 34,
    mobileDropScale: 0.34,
    mobileLabelOffsetX: -155,
    mobileLabelOffsetY: 10,
    mobileImageScale: 1.7,
    mobileImageTranslateX: -70,
    mobileImageTranslateY: 20,
    imageStyle: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      objectPosition: "center top",
      transform: "translateY(35px) scale(0.9)"
    },
    parts: [
      { name: "Distal Phalanges", x: 310, y: 95 },
      { name: "Middle Phalanges", x: 500, y: 225 },
      { name: "Proximal Phalanges", x: 490, y: 270 },
      { name: "Metatarsals", x: 495, y: 325 },
      { name: "Medial Cuneiform", x: 205, y: 375 },
      { name: "Intermediate Cuneiform", x: 370, y: 370 },
      { name: "Lateral Cuneiform", x: 414, y: 415 },
      { name: "Navicular", x: 205, y: 430 },
      { name: "Cuboid", x: 444, y: 460 },
      { name: "Talus", x: 230, y: 485 },
      { name: "Calcaneus", x: 350, y: 580 }
    ]
  }
};
export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [mode, setMode] = useState("organs");
  const [selectedSet, setSelectedSet] = useState(null);
  const [placed, setPlaced] = useState({});
  const [score, setScore] = useState(0);
  const [dashboard, setDashboard] = useState({});
  const [feedback, setFeedback] = useState({});
  const [draggingLabel, setDraggingLabel] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");

  const isSmallScreen = window.innerWidth < 768;
  const mobileDropScale = isSmallScreen ? 0.58 : 1;

  // --- CBET STATE ---
  const [shuffledCbetQuestions, setShuffledCbetQuestions] = useState(() =>
    shuffleArray(cbetQuestions)
  );
  const [cbetIndex, setCbetIndex] = useState(0);
  const [cbetScore, setCbetScore] = useState(0);
  const [cbetAnswers, setCbetAnswers] = useState({});
  const [cbetShowResult, setCbetShowResult] = useState(false);
  const [showMissedReview, setShowMissedReview] = useState(false);

  // --- RN PRACTICE STATE ---
  const [shuffledRnQuestions, setShuffledRnQuestions] = useState(() =>
    shuffleArray(rnQuestions)
  );
  const [rnIndex, setRnIndex] = useState(0);
  const [rnScore, setRnScore] = useState(0);
  const [rnAnswers, setRnAnswers] = useState({});
  const [rnShowResult, setRnShowResult] = useState(false);
  const [showRnMissedReview, setShowRnMissedReview] = useState(false);
  
  const data = mode === "organs" ? organs : bones;
  const currentSet = selectedSet ? data[selectedSet] : null;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("progress")) || {};
    setDashboard(saved);
  }, []);

  useEffect(() => {
    const savedCbet = JSON.parse(localStorage.getItem("cbetProgress"));
    if (savedCbet) {
      setShuffledCbetQuestions(savedCbet.shuffledCbetQuestions || shuffleArray(cbetQuestions));
      setCbetIndex(savedCbet.cbetIndex || 0);
      setCbetScore(savedCbet.cbetScore || 0);
      setCbetAnswers(savedCbet.cbetAnswers || {});
      setCbetShowResult(savedCbet.cbetShowResult || false);
      setShowMissedReview(savedCbet.showMissedReview || false);
    }
  }, []);

  const saveProgress = (key, newScore) => {
    const saved = JSON.parse(localStorage.getItem("progress")) || {};
    saved[key] = newScore;
    localStorage.setItem("progress", JSON.stringify(saved));
    setDashboard(saved);
  };

  const handleDrop = (e, part) => {
    e.preventDefault();
    const label = e.dataTransfer.getData("text/plain");
    setDraggingLabel("");

    if (!label) return;
    if (placed[part.name] === "correct") return;

    if (label !== part.name) {
      wrongSound.currentTime = 0;
      wrongSound.play();
      setFeedback((prev) => ({ ...prev, [part.name]: "wrong" }));

      setTimeout(() => {
        setFeedback((prev) => ({ ...prev, [part.name]: "" }));
      }, 700);

      return;
    }

    correctSound.currentTime = 0;
    correctSound.play();
    setPlaced((prev) => ({ ...prev, [part.name]: "correct" }));
    setFeedback((prev) => ({ ...prev, [part.name]: "correct" }));

    const newScore = score + 1;
    setScore(newScore);
    saveProgress(selectedSet, newScore);
  };

  const resetGame = () => {
    setPlaced({});
    setFeedback({});
    setScore(0);
    setDraggingLabel("");
  };

  const selectSet = (item) => {
    setSelectedSet(item);
    setPlaced({});
    setFeedback({});
    setScore(0);
    setDraggingLabel("");
  };

  const resetCbetExam = () => {
    const reshuffled = shuffleArray(cbetQuestions);
    localStorage.removeItem("cbetProgress");
    setShuffledCbetQuestions(reshuffled);
    setCbetIndex(0);
    setCbetScore(0);
    setCbetAnswers({});
    setCbetShowResult(false);
    setShowMissedReview(false);
  };

  const saveCbetProgress = () => {
    const progress = {
      shuffledCbetQuestions,
      cbetIndex,
      cbetScore,
      cbetAnswers,
      cbetShowResult,
      showMissedReview
    };
    localStorage.setItem("cbetProgress", JSON.stringify(progress));
  };

  const restartCbetExam = () => {
    const reshuffled = shuffleArray(cbetQuestions);
    localStorage.removeItem("cbetProgress");
    setShuffledCbetQuestions(reshuffled);
    setCbetIndex(0);
    setCbetScore(0);
    setCbetAnswers({});
    setCbetShowResult(false);
    setShowMissedReview(false);
  };

  const missedQuestions = shuffledCbetQuestions.filter((q, index) => {
    const selected = cbetAnswers[index];
    return selected !== undefined && selected !== q.answer;
  });

  const homeCardStyle = {
    background: "rgba(255,255,255,0.85)",
    borderRadius: 18,
    padding: 20,
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    minWidth: 220,
    flex: "1 1 220px",
    textAlign: "center"
  };

return (
  <div
    style={{
      minHeight: "100vh",
      padding: 20,
      fontFamily: "Arial, sans-serif",
      background:
        "linear-gradient(135deg, #e0f7fa 0%, #eef4ff 35%, #fdf2f8 70%, #fff8e1 100%)"
    }}
  >
    {/* LOGO HEADER */}
<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "12px",
    flexWrap: "wrap",
    textAlign: "center"
  }}
>
  <img
    src={logo}
    alt="MedSkillBuilder Logo"
    style={{
      width: "min(140px, 28vw)",
      height: "auto"
    }}
  />
  <h1
    style={{
      margin: 0,
      color: "#12355b",
      fontSize: "clamp(28px, 4vw, 40px)"
    }}
  >
    MedSkillBuilder
  </h1>
</div>

    <div
      style={{
        maxWidth: 1300,
        margin: "0 auto"
      }}
    >
      {/* HERO HEADER */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 20,
          padding: "20px 10px",
          borderRadius: 22,
          background: "linear-gradient(135deg, #12355b, #1d6fa5, #58b4d8)",
          color: "white",
          boxShadow: "0 10px 28px rgba(18,53,91,0.25)"
        }}
      >
        <h1 style={{ margin: 0, fontSize: 42, letterSpacing: 1 }}>
          BMETS-R-US
        </h1>
        <p style={{ marginTop: 10, fontSize: 18 }}>
          Interactive anatomy, bone labeling, and CBET practice
        </p>
      </div>

      {/* NAV BUTTONS (FIXED WRAPPER) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 20
        }}
      >
        <button
          onClick={() => setActiveTab("Home")}
          style={navButtonStyle(activeTab === "Home")}
        >
          Home
        </button>

        <button
          onClick={() => {
            setActiveTab("Anatomy");
            setMode("organs");
            setSelectedSet(null);
          }}
          style={navButtonStyle(activeTab === "Anatomy")}
        >
          Anatomy
        </button>

        <button
          onClick={() => {
            setActiveTab("Bones");
            setMode("bones");
            setSelectedSet(null);
          }}
          style={navButtonStyle(activeTab === "Bones")}
        >
          Bones
        </button>

        <button
          onClick={() => setActiveTab("Dashboard")}
          style={navButtonStyle(activeTab === "Dashboard")}
        >
         Dashboard
        </button>

        <button
          onClick={() => setActiveTab("CBET")}
          style={navButtonStyle(activeTab === "CBET")}
        >
          CBET Exam
        </button>

        <button
          onClick={() => setActiveTab("RN")}
          style={navButtonStyle(activeTab === "RN")}
        >
          RN Practice
        </button>
      </div>

      {/* HOME TAB */}
      {activeTab === "Home" && (
        <div
          style={{
            background: "rgba(255,255,255,0.78)",
            borderRadius: 24,
            padding: 30,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <h2
              style={{
                color: "#12355b",
                fontSize: 32,
                marginBottom: 10
              }}
            >
              Welcome to Your Medical Training Game
            </h2>
            <p
              style={{
                fontSize: 18,
                color: "#385170",
                maxWidth: 800,
                margin: "0 auto"
              }}
            >
              Practice identifying organs and bones with drag-and-drop
              activities, then build your confidence with CBET
              multiple-choice review.
            </p>
          </div>

            <div
              style={{
                display: "flex",
                gap: 20,
                flexWrap: "wrap",
                justifyContent: "center",
                marginBottom: 30
              }}
            >
              <div style={homeCardStyle}>
                <div style={{ fontSize: 42, marginBottom: 8 }}>🫀</div>
                <h3 style={{ color: "#12355b" }}>Anatomy Practice</h3>
                <p style={{ color: "#4f6275" }}>
                  Learn the heart, brain, and lungs with interactive labeling.
                </p>
              </div>

              <div style={homeCardStyle}>
                <div style={{ fontSize: 42, marginBottom: 8 }}>🦴</div>
                <h3 style={{ color: "#12355b" }}>Bone Practice</h3>
                <p style={{ color: "#4f6275" }}>
                  Study the skeleton, hand bones, and foot bones in detail.
                </p>
              </div>

              <div style={homeCardStyle}>
                <div style={{ fontSize: 42, marginBottom: 8 }}>📝</div>
                <h3 style={{ color: "#12355b" }}>CBET Exam Prep</h3>
                <p style={{ color: "#4f6275" }}>
                  Take multiple-choice practice questions and track your score.
                </p>
              </div>

              <div style={homeCardStyle}>
                <div style={{ fontSize: 42, marginBottom: 8 }}>📈</div>
                <h3 style={{ color: "#12355b" }}>Track Progress</h3>
                <p style={{ color: "#4f6275" }}>
                  Monitor your score and see how much you have mastered.
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 20,
                flexWrap: "wrap",
                justifyContent: "center"
              }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, #d1fae5, #ecfeff)",
                  borderRadius: 18,
                  padding: 22,
                  minWidth: 280,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
                }}
              >
                <h3 style={{ color: "#0f4c5c", marginTop: 0 }}>How to Play</h3>
                <p style={{ color: "#345" }}>
                  Pick a category, choose a body part set, then drag each label to the
                  correct drop box or answer questions in CBET mode.
                </p>
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, #fde68a, #fef3c7)",
                  borderRadius: 18,
                  padding: 22,
                  minWidth: 280,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
                }}
              >
                <h3 style={{ color: "#7c4a03", marginTop: 0 }}>Tip</h3>
                <p style={{ color: "#5f4a1c" }}>
                  In the CBET section, the correct answer is highlighted after you choose,
                  so you can learn as you go.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Dashboard" && (
          <div
            style={{
              textAlign: "center",
              background: "rgba(255,255,255,0.82)",
              borderRadius: 22,
              padding: 28,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
            }}
          >
            <h2 style={{ color: "#12355b", fontSize: 30 }}>Progress Dashboard</h2>
            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: 20
              }}
            >
              {Object.keys({ ...organs, ...bones }).map((item) => (
                <div
                  key={item}
                  style={{
                    background: "linear-gradient(135deg, #eef4ff, #ffffff)",
                    border: "1px solid #d8e4f2",
                    borderRadius: 16,
                    padding: 16,
                    minWidth: 160,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                  }}
                >
                  <div style={{ fontWeight: 700, color: "#12355b" }}>{item}</div>
                  <div style={{ fontSize: 24, marginTop: 8, color: "#1d6fa5" }}>
                    {dashboard[item] || 0}
                  </div>
                </div>
              ))}

              <div
                style={{
                  background: "linear-gradient(135deg, #eef4ff, #ffffff)",
                  border: "1px solid #d8e4f2",
                  borderRadius: 16,
                  padding: 16,
                  minWidth: 200,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                }}
              >
                <div style={{ fontWeight: 700, color: "#12355b" }}>CBET Practice</div>
                <div style={{ fontSize: 24, marginTop: 8, color: "#1d6fa5" }}>
                  {cbetScore} / {shuffledCbetQuestions.length}
                </div>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "Anatomy" || activeTab === "Bones") && (
          <div
            style={{
              background: "rgba(255,255,255,0.82)",
              borderRadius: 22,
              padding: 20,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 14 }}>
              {Object.keys(data).map((item) => (
                <button
                  key={item}
                  onClick={() => selectSet(item)}
                  style={{
                    margin: 6,
                    padding: "10px 18px",
                    borderRadius: 999,
                    border: "none",
                    background:
                      selectedSet === item
                        ? "linear-gradient(135deg, #12355b, #1d6fa5)"
                        : "linear-gradient(135deg, #dbeafe, #eff6ff)",
                    color: selectedSet === item ? "white" : "#12355b",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            {selectedSet && currentSet && (
              <>
               <div style={{ textAlign: "center", marginBottom: 12 }}>
  <button
    onClick={resetGame}
    style={{
      padding: "10px 18px",
      borderRadius: 999,
      border: "none",
      background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
      color: "white",
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
    }}
  >
    Retry
  </button>
</div>

<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: 30,
    marginTop: 10,
    flexWrap: "wrap",
    alignItems: "flex-start"
  }}
>
  <div
    style={{
      width: "100%",
      maxWidth: currentSet.boardWidth,
      flex: `1 1 ${Math.min(currentSet.boardWidth, 620)}px`
    }}
  >
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${currentSet.boardWidth} / ${currentSet.boardHeight}`,
        border: "3px solid #12355b",
        borderRadius: 12,
        backgroundColor: "#f8fafc",
        overflow: "hidden"
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <img
  src={currentSet.image}
  alt={selectedSet}
  style={{
    ...currentSet.imageStyle,
    width: "100%",
    height: "100%",
    objectFit: "contain",
    objectPosition:
      isSmallScreen && (selectedSet === "Hand" || selectedSet === "Foot")
        ? "center center"
        : currentSet.imageStyle.objectPosition,
    transform:
      isSmallScreen && (selectedSet === "Hand" || selectedSet === "Foot")
        ? "none"
        : currentSet.imageStyle.transform
  }}
/>

      <div
        style={{
          position: "absolute",
          left: `${(35 / currentSet.boardWidth) * 100}%`,
          top: `${(35 / currentSet.boardHeight) * 100}%`,
          fontSize: "clamp(16px, 2.5vw, 24px)",
          fontWeight: 700,
          color: "#222",
          textShadow: "0 1px 2px rgba(255,255,255,0.7)",
          transform: "translateY(-50%)"
        }}
      >
        {selectedSet === "Hand"
          ? "Hand Bones"
          : selectedSet === "Foot"
          ? "Foot Bones"
          : selectedSet}
      </div>

      {currentSet.parts.map((part) => {
  const isCorrect = placed[part.name] === "correct";
  const isWrong = feedback[part.name] === "wrong";

  return (
    <div
      key={part.name}
      onDrop={(e) => handleDrop(e, part)}
      onDragOver={(e) => e.preventDefault()}
      style={{
        position: "absolute",
        left: `${(part.x / currentSet.boardWidth) * 100}%`,
        top: `${(part.y / currentSet.boardHeight) * 100}%`,
        width: `${((currentSet.dropWidth * mobileDropScale) / currentSet.boardWidth) * 100}%`,
        height: `${((currentSet.dropHeight * mobileDropScale) / currentSet.boardHeight) * 100}%`,
        transform: "translate(-50%, -50%)",
        border: isCorrect
          ? "2px solid green"
          : isWrong
          ? "2px solid red"
          : "2px solid #1d4ed8",
        backgroundColor: isCorrect
          ? "rgba(144, 238, 144, 0.9)"
          : isWrong
          ? "rgba(255, 214, 214, 0.92)"
          : "rgba(219, 234, 254, 0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: isSmallScreen ? "9px" : "clamp(9px, 1.4vw, 13px)",
        fontWeight: 700,
        textAlign: "center",
        padding: isSmallScreen ? "1px 3px" : "2px 6px",
        borderRadius: 6,
        color: "#475569",
        boxSizing: "border-box",
        overflow: "hidden",
        lineHeight: 1.1
      }}
    >
      {isCorrect ? part.name : "Drop"}
    </div>
  );
})}
    </div>
  </div>

  <div
    style={{
      background: "linear-gradient(180deg, #f8fafc, #eef4ff)",
      borderRadius: 16,
      padding: 16,
      width: "100%",
      maxWidth: 260,
      boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
    }}
  >
    {currentSet.parts.map((part) => {
  const isCorrect = placed[part.name] === "correct";
  const isDragging = draggingLabel === part.name;
  const isSelected = selectedLabel === part.name;

  return (
    <div
      key={part.name}
      draggable={!isCorrect && !isSmallScreen}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", part.name);
        setDraggingLabel(part.name);
      }}
      onDragEnd={() => setDraggingLabel("")}
      onClick={() => {
        if (isSmallScreen && !isCorrect) {
          setSelectedLabel(part.name);
        }
      }}
      style={{
        padding: 12,
        margin: "0 0 8px 0",
        border: isSelected ? "2px solid #2563eb" : "1px solid #334155",
        background: isCorrect ? "#d9f7d9" : isSelected ? "#dbeafe" : "#e2e8f0",
        color: "#5b4967",
        cursor: isCorrect ? "default" : isSmallScreen ? "pointer" : "grab",
        width: "100%",
        textAlign: "center",
        opacity: isDragging ? 0.5 : 1,
        borderRadius: 4,
        fontSize: 18,
        boxSizing: "border-box"
      }}
    >
      {isCorrect ? `✔ ${part.name}` : isSmallScreen ? `Tap: ${part.name}` : part.name}
    </div>
  );
})}

    <div
      style={{
        marginTop: 20,
        fontWeight: 700,
        fontSize: 18,
        textAlign: "center",
        color: "#5b4967"
      }}
    >
      Score: {score} / {currentSet.parts.length}
    </div>

    {score === currentSet.parts.length && (
      <div
        style={{
          marginTop: 15,
          padding: 12,
          backgroundColor: "#dff6dd",
          border: "1px solid green",
          borderRadius: 8,
          fontWeight: 700,
          textAlign: "center",
          color: "#14532d"
        }}
      >
           Great job! You completed {selectedSet}.
      </div>
    )}
  </div>
</div>
              </>
            )}
          </div>
        )}

        {activeTab === "CBET" && (
          <div
            style={{
              background: "rgba(255,255,255,0.9)",
              borderRadius: 24,
              padding: 28,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              maxWidth: 900,
              margin: "0 auto"
            }}
          >
            {!cbetShowResult && !showMissedReview ? (
              <>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <h2 style={{ color: "#12355b", marginBottom: 8 }}>CBET Practice Exam</h2>
                  <p style={{ color: "#4f6275", margin: 0 }}>
                    Questions are shuffled each restart. Select one answer. The correct
                    answer will highlight after you answer.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    flexWrap: "wrap",
                    marginBottom: 20
                  }}
                >
                  <div style={cbetStatCardStyle}>
                    Question {cbetIndex + 1} / {shuffledCbetQuestions.length}
                  </div>
                  <div style={cbetStatCardStyle}>
                    Score: {cbetScore}
                  </div>
                  <div style={cbetStatCardStyle}>
                    Passing: 70%
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 12,
                    flexWrap: "wrap",
                    marginBottom: 20
                  }}
                >
                  <button
                    onClick={saveCbetProgress}
                    style={{
                      padding: "10px 18px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #16a34a, #22c55e)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                    }}
                  >
                    Save Progress
                  </button>

                  <button
                    onClick={restartCbetExam}
                    style={{
                      padding: "10px 18px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #dc2626, #ef4444)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                    }}
                  >
                    Restart Exam
                  </button>
                </div>

                <div
                  style={{
                    background: "linear-gradient(135deg, #eef4ff, #ffffff)",
                    borderRadius: 18,
                    padding: 24,
                    border: "1px solid #d8e4f2",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                  }}
                >
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#12355b",
                      marginBottom: 18
                    }}
                  >
                    {shuffledCbetQuestions[cbetIndex].question}
                  </div>

                  {shuffledCbetQuestions[cbetIndex].options.map((opt, i) => {
                    const selected = cbetAnswers[cbetIndex];
                    const correct = shuffledCbetQuestions[cbetIndex].answer;
                    const isAnswered = selected !== undefined;
                    const isCorrectOption = i === correct;
                    const isSelectedWrong = isAnswered && i === selected && selected !== correct;

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (isAnswered) return;

                          setCbetAnswers((prev) => ({ ...prev, [cbetIndex]: i }));

                          if (i === correct) {
                            setCbetScore((prev) => prev + 1);
                            correctSound.currentTime = 0;
                            correctSound.play();
                          } else {
                            wrongSound.currentTime = 0;
                            wrongSound.play();
                          }
                        }}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "14px 16px",
                          marginBottom: 12,
                          borderRadius: 12,
                          border: isCorrectOption && isAnswered
                            ? "2px solid green"
                            : isSelectedWrong
                            ? "2px solid red"
                            : "1px solid #cbd5e1",
                          background: isCorrectOption && isAnswered
                            ? "#d9f7d9"
                            : isSelectedWrong
                            ? "#fee2e2"
                            : "#f8fafc",
                          color: "#1e293b",
                          fontSize: 16,
                          fontWeight: 600,
                          cursor: isAnswered ? "default" : "pointer",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
                        }}
                      >
                        {String.fromCharCode(65 + i)}. {opt}
                      </button>
                    );
                  })}

                  <div style={{ textAlign: "center", marginTop: 20 }}>
                    <button
                      onClick={() => {
                        if (cbetAnswers[cbetIndex] === undefined) return;

                        if (cbetIndex + 1 === shuffledCbetQuestions.length) {
                          setCbetShowResult(true);
                        } else {
                          setCbetIndex((prev) => prev + 1);
                        }
                      }}
                      style={{
                        padding: "12px 24px",
                        borderRadius: 999,
                        border: "none",
                        background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                        color: "white",
                        fontWeight: 700,
                        cursor: cbetAnswers[cbetIndex] === undefined ? "not-allowed" : "pointer",
                        opacity: cbetAnswers[cbetIndex] === undefined ? 0.6 : 1,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                      }}
                    >
                      {cbetIndex + 1 === shuffledCbetQuestions.length
                        ? "Finish Exam"
                        : "Next Question"}
                    </button>
                  </div>
                </div>
              </>
