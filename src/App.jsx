
import React, { useState, useEffect, useRef } from "react";
import logo from "./assets/logo.png";
import { teasQuestions } from "./teasQuestions";

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
  },
  {
    question: "The liver's primary function includes:",
    options: ["Filtering blood and producing bile", "Pumping oxygenated blood", "Filtering urine", "Producing hormones"],
    answer: 0
  },
  {
    question: "Which vessel delivers blood directly to the liver?",
    options: ["The aorta", "The portal vein", "The pulmonary artery", "The inferior vena cava"],
    answer: 1
  },
  {
    question: "Ultrasound imaging of the liver is commonly used to:",
    options: ["Measure electrical activity", "Detect masses and assess blood flow", "Count white blood cells", "Measure oxygen saturation"],
    answer: 1
  },
  {
    question: "The retina of the eye contains:",
    options: ["Muscles for focusing", "Photoreceptor cells for vision", "Tear glands", "Aqueous humor"],
    answer: 1
  },
  {
    question: "The optic nerve carries:",
    options: ["Nutrients to the eye", "Visual information to the brain", "Tears to the eye surface", "Messages to control eye muscles"],
    answer: 1
  },
  {
    question: "The largest artery in the body is:",
    options: ["The carotid artery", "The femoral artery", "The aorta", "The radial artery"],
    answer: 2
  },
  {
    question: "Pulse points are commonly palpated at which arterial locations? (Select the most common)",
    options: ["Radial and femoral", "Subclavian only", "Renal arteries", "Celiac artery"],
    answer: 0
  }
];

const harderCbetQuestions = [
  {
    question: "A defibrillator fails an energy output test at 200 J but passes at lower settings. Which issue is MOST likely?",
    options: ["Weak battery in the ECG module", "High-voltage capacitor or charging circuit problem", "Damaged patient cable only", "Printer paper sensor failure"],
    answer: 1
  },
  {
    question: "During preventive maintenance, leakage current exceeds limits only when the device polarity is reversed. What should you suspect first?",
    options: ["Normal operation with no action needed", "Compromised insulation or line filter issue", "Low battery capacity", "Incorrect heart rate alarm settings"],
    answer: 1
  },
  {
    question: "A monitor intermittently reboots when plugged into wall power but runs normally on battery. The MOST likely source is:",
    options: ["The display backlight only", "The AC input or power supply section", "The speaker volume setting", "The SpO2 sensor"],
    answer: 1
  },
  {
    question: "What is the BEST reason to verify a complaint before replacing parts?",
    options: ["It improves cosmetic appearance", "It reduces unnecessary parts replacement and misdiagnosis", "It avoids documenting the issue", "It lets nursing recalibrate the device"],
    answer: 1
  },
  {
    question: "A device repeatedly blows its fuse immediately on power-up. After verifying correct fuse type, what is the next BEST step?",
    options: ["Install a larger fuse", "Inspect for a short in the power input stage", "Bypass the fuse temporarily", "Replace the enclosure label"],
    answer: 1
  },
  {
    question: "An infusion pump passes flow-rate accuracy but its occlusion alarm does not activate within specification. The device should be:",
    options: ["Returned to service because flow is accurate", "Tagged out until the alarm function is corrected", "Used only in low-risk areas", "Released if the nurse is informed"],
    answer: 1
  },
  {
    question: "When a service manual specifies torque values for internal hardware, why should they be followed?",
    options: ["To reduce cleaning time", "To maintain safety, alignment, and reliable assembly", "Only to improve appearance", "Because torque values affect battery charge time"],
    answer: 1
  },
  {
    question: "A patient monitor shows noisy ECG only when connected to AC power in one room. Which troubleshooting approach is MOST appropriate?",
    options: ["Replace the monitor main board immediately", "Compare operation on battery and evaluate power quality/grounding in that room", "Ignore it if alarms still sound", "Replace the ECG electrodes with temperature probes"],
    answer: 1
  },
  {
    question: "A ventilator returns from outside repair. Before clinical use, the technician should FIRST ensure:",
    options: ["The unit has a new asset tag", "Incoming inspection, safety checks, and functional verification are complete", "The staff has already used it once", "The battery has been removed"],
    answer: 1
  },
  {
    question: "Which document is MOST important for demonstrating that a device was safe to return to service after repair?",
    options: ["A handwritten sticky note", "Completed service documentation with test results", "An email that parts were ordered", "A user complaint log only"],
    answer: 1
  },
  {
    question: "An ESU fails output power verification across multiple load settings. Which instrument is specifically intended to evaluate this?",
    options: ["Oscilloscope only", "ESU analyzer", "Infusion device analyzer", "NIBP simulator"],
    answer: 1
  },
  {
    question: "A medical device has a damaged power cord strain relief. Why is this significant?",
    options: ["It only affects cosmetic appearance", "It increases risk of conductor damage, shock, and intermittent faults", "It lowers speaker volume", "It changes screen brightness"],
    answer: 1
  },
  {
    question: "In troubleshooting, a symptom that appears only after the unit warms up for 20 minutes suggests:",
    options: ["A purely mechanical shipping issue", "A thermal or intermittent electronic fault", "A labeling problem only", "A guaranteed software licensing issue"],
    answer: 1
  },
  {
    question: "Which action BEST supports root-cause repair instead of repeated temporary fixes?",
    options: ["Resetting the breaker and sending the device back each time", "Trending failures, reproducing conditions, and verifying the failed stage", "Replacing accessories randomly", "Skipping final test to save time"],
    answer: 1
  },
  {
    question: "A device alarm volume is functioning, but the visual alarm indicator does not illuminate. The device should be considered:",
    options: ["Acceptable because one alarm path still works", "Incomplete alarm functionality and not ready for service", "Safe for day shift only", "Ready if documented as a known issue"],
    answer: 1
  },
  {
    question: "What is the strongest reason to use manufacturer-approved accessories when specified?",
    options: ["They always cost less", "Compatibility and validated safety/performance", "They eliminate the need for PM", "They remove the need for user training"],
    answer: 1
  },
  {
    question: "A preventive maintenance interval should primarily be based on:",
    options: ["The technician's preference", "Manufacturer guidance, device risk, and facility policy", "How often stickers are available", "Whether the unit is stored near nursing"],
    answer: 1
  },
  {
    question: "A unit intermittently fails self-test, but only after transport between departments. What is the BEST next step?",
    options: ["Assume user error", "Inspect connectors, mounting, and transport-related intermittents while reproducing movement", "Replace the battery only", "Disable self-test if possible"],
    answer: 1
  },
  {
    question: "If a device repeatedly returns with the same failure after board replacement, the BEST conclusion is:",
    options: ["Board replacement always fails", "The underlying cause may be elsewhere and has not been identified", "The user is definitely at fault", "Documentation can be skipped next time"],
    answer: 1
  },
  {
    question: "Which step is MOST appropriate immediately after completing a repair on a life-support device?",
    options: ["Return it directly to the unit", "Perform required functional and safety verification before release", "Ask clinical staff to watch it closely", "Clear the service history"],
    answer: 1
  },
  {
    question: "A battery-operated device shows drastically reduced runtime but otherwise functions. The BEST classification is:",
    options: ["No issue if AC power is available", "A performance/safety concern that should be corrected before expected battery use", "A cosmetic problem", "A network configuration fault"],
    answer: 1
  },
  {
    question: "When measuring a low resistance value in a circuit, what common issue can significantly affect accuracy?",
    options: ["Ambient room color", "Test lead resistance and contact quality", "Battery label orientation", "Ground pin length only"],
    answer: 1
  },
  {
    question: "A service report says 'unable to duplicate,' but the customer can reproduce the issue easily. What should be improved FIRST?",
    options: ["Inventory labeling", "Complaint intake details and test conditions used to reproduce the problem", "Screen brightness", "Cleaning agent selection"],
    answer: 1
  },
  {
    question: "Why is configuration verification important after replacing a main board in a medical device?",
    options: ["It is only needed for cosmetic repairs", "Incorrect configuration can affect alarms, options, calibration, or clinical behavior", "It prevents the unit from being cleaned", "It only changes the serial number label"],
    answer: 1
  },
  {
    question: "The BEST reason to quarantine a device with an intermittent safety-related fault is that intermittent problems:",
    options: ["Are easier for users to work around", "Can recur unpredictably and create unacceptable patient risk", "Always disappear on their own", "Only affect accessories and not the main device"],
    answer: 1
  }
];

const equipmentQuestions = [
  {
    image: "/equipment/anesthesia machine.jpg",
    question: "Identify this equipment.",
    options: ["Anesthesia machine", "Ventilator", "Defibrillator", "Suction machine"],
    answer: 0,
    studyTip: "Used to deliver inhaled anesthetics, oxygen, and ventilation support during procedures."
  },
  {
    image: "/equipment/defibrillator.jpg",
    question: "Identify this equipment.",
    options: ["Patient monitor", "Defibrillator", "Infusion pump", "ECG machine"],
    answer: 1,
    studyTip: "Used to deliver controlled shocks for life-threatening arrhythmias."
  },
  {
    image: "/equipment/ekg machine.jpg",
    question: "Identify this equipment.",
    options: ["ECG/EKG machine", "Pulse oximeter", "Ventilator", "Fetal monitor"],
    answer: 0,
    studyTip: "Records electrical activity of the heart using surface electrodes."
  },
  {
    image: "/equipment/electrosurgical unit.jpg",
    question: "Identify this equipment.",
    options: ["Syringe pump", "Electrosurgical unit", "Anesthesia machine", "Ultrasound machine"],
    answer: 1,
    studyTip: "Provides high-frequency electrical energy for cutting/coagulation in surgery."
  },
  {
    image: "/equipment/fetal monitor.jpg",
    question: "Identify this equipment.",
    options: ["Fetal monitor", "Patient monitor", "Infusion pump", "Defibrillator"],
    answer: 0,
    studyTip: "Tracks fetal heart rate and uterine contractions during pregnancy/labor."
  },
  {
    image: "/equipment/infusion pump.jpg",
    question: "Identify this equipment.",
    options: ["Infusion pump", "Suction regulator", "Pulse oximeter", "Ventilator"],
    answer: 0,
    studyTip: "Delivers IV fluids and medications at controlled rates."
  },
  {
    image: "/equipment/patient monitor.jpg",
    question: "Identify this equipment.",
    options: ["Defibrillator", "Patient monitor", "Ultrasound machine", "ECG machine"],
    answer: 1,
    studyTip: "Displays vital signs such as ECG, SpO2, blood pressure, and respiration."
  },
  {
    image: "/equipment/pulse oximeter.jpg",
    question: "Identify this equipment.",
    options: ["Pulse oximeter", "Syringe pump", "Suction machine", "Anesthesia machine"],
    answer: 0,
    studyTip: "Measures oxygen saturation (SpO2) and pulse rate noninvasively."
  },
  {
    image: "/equipment/suction machine.jpg",
    question: "Identify this equipment.",
    options: ["Ventilator", "Suction machine", "Patient monitor", "Defibrillator"],
    answer: 1,
    studyTip: "Provides negative pressure to remove fluids/secretions from airways or surgical fields."
  },
  {
    image: "/equipment/suction regulator.jpg",
    question: "Identify this equipment.",
    options: ["Suction regulator", "Pulse oximeter", "Infusion pump", "Fetal monitor"],
    answer: 0,
    studyTip: "Controls and limits wall-vacuum suction pressure for safe clinical use."
  },
  {
    image: "/equipment/syringe pump.jpg",
    question: "Identify this equipment.",
    options: ["Syringe pump", "ECG machine", "Electrosurgical unit", "Anesthesia machine"],
    answer: 0,
    studyTip: "Accurately delivers small-volume medications using a loaded syringe."
  },
  {
    image: "/equipment/ultrasound machine.jpg",
    question: "Identify this equipment.",
    options: ["Ultrasound machine", "Defibrillator", "Patient monitor", "Suction regulator"],
    answer: 0,
    studyTip: "Uses high-frequency sound waves to generate real-time diagnostic images."
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
  },
  {
    question: "A client with liver cirrhosis is at highest risk for:",
    options: [
      "Hepatic encephalopathy and ascites",
      "Acute myocardial infarction",
      "Type 1 diabetes mellitus",
      "Acute kidney injury only"
    ],
    answer: 0
  },
  {
    question: "Which is the most important nursing assessment for a client on acetaminophen?",
    options: [
      "Liver function and total daily dose not exceeding 4 grams",
      "Kidney function only",
      "Heart rate only",
      "Respiratory rate"
    ],
    answer: 0
  },
  {
    question: "A client complains of floaters and flashes in their vision. The nurse should:",
    options: [
      "Report this immediately; it may indicate retinal detachment",
      "Reassure them this is normal",
      "Apply a warm compress",
      "Administer eye drops"
    ],
    answer: 0
  },
  {
    question: "Which intervention is correct for a client with conjunctivitis?",
    options: [
      "Clean eye from inner canthus to outer canthus",
      "Patch both eyes",
      "Apply light to test pupils",
      "Avoid saline rinses"
    ],
    answer: 0
  },
  {
    question: "Which pulse point is commonly assessed for stroke risk in clients with atrial fibrillation?",
    options: [
      "Carotid artery",
      "Dorsalis pedis",
      "Brachial artery",
      "Popliteal artery"
    ],
    answer: 0
  },
  {
    question: "A client is found to have a weak femoral pulse. The nurse should:",
    options: [
      "Assess both legs and report findings",
      "Assume this is normal",
      "Immediately loosen all bandages",
      "Have the client stand and ambulate"
    ],
    answer: 0
  }
];

// --- CRES QUESTIONS ---
const cresQuestions = [
  {
    question: "What is the primary function of the cathode filament in an X-ray tube?",
    options: [
      "Convert X-rays into visible light",
      "Emit electrons through thermionic emission",
      "Rotate the anode at high speed",
      "Filter low-energy photons from the beam"
    ],
    answer: 1
  },
  {
    question: "Which X-ray tube component converts electron kinetic energy into X-rays and heat?",
    options: ["Cathode", "Collimator", "Anode", "Rotor"],
    answer: 2
  },
  {
    question: "kVp in an X-ray system primarily controls:",
    options: [
      "The quantity of X-rays (number of photons)",
      "The penetrating power (quality) of the X-ray beam",
      "The speed of anode rotation",
      "The size of the focal spot"
    ],
    answer: 1
  },
  {
    question: "Increasing mAs in radiography primarily affects:",
    options: [
      "X-ray beam energy (kV)",
      "Image brightness/density and patient dose",
      "Contrast resolution only",
      "Focal spot size"
    ],
    answer: 1
  },
  {
    question: "The heel effect in X-ray imaging refers to:",
    options: [
      "Variation in beam intensity across the field due to the anode angle",
      "Motion artifact caused by patient movement",
      "Image distortion from off-center positioning",
      "Loss of detail from backscattered radiation"
    ],
    answer: 0
  },
  {
    question: "The half-value layer (HVL) is a measure of:",
    options: [
      "X-ray beam intensity at the detector",
      "Image receptor sensitivity",
      "X-ray beam quality (penetrating ability)",
      "Patient entrance skin dose"
    ],
    answer: 2
  },
  {
    question: "In digital radiography (DR), which detector type converts X-ray photons DIRECTLY to an electrical signal?",
    options: [
      "Photostimulable phosphor plate (CR)",
      "Amorphous silicon flat-panel with scintillator (indirect)",
      "Amorphous selenium flat-panel detector (direct)",
      "Image intensifier with CCD camera"
    ],
    answer: 2
  },
  {
    question: "In computed radiography (CR), the latent image is stored in:",
    options: [
      "A CCD sensor array",
      "An amorphous silicon thin-film transistor panel",
      "A photostimulable phosphor (PSP) plate",
      "A sodium iodide scintillation crystal"
    ],
    answer: 2
  },
  {
    question: "Which CT image artifact is caused by preferential absorption of low-energy photons as the beam passes through dense objects?",
    options: [
      "Ring artifact",
      "Beam hardening artifact",
      "Partial volume artifact",
      "Motion artifact"
    ],
    answer: 1
  },
  {
    question: "The CT number (Hounsfield Unit) for water is:",
    options: ["-1000", "0", "+400", "+1000"],
    answer: 1
  },
  {
    question: "In fluoroscopy, the automatic brightness control (ABC) system maintains image brightness by automatically adjusting:",
    options: [
      "Patient table height and tilt",
      "kVp and/or mA",
      "Image intensifier input screen size",
      "Monitor gamma and black level"
    ],
    answer: 1
  },
  {
    question: "Per FDA regulations, the maximum patient entrance skin exposure rate for conventional fluoroscopy is:",
    options: ["1 R/min", "5 R/min", "10 R/min", "25 R/min"],
    answer: 2
  },
  {
    question: "Mammography X-ray tubes use molybdenum or rhodium targets primarily to:",
    options: [
      "Increase beam penetration for dense breasts",
      "Produce characteristic X-rays that optimize soft-tissue contrast at low dose",
      "Reduce heat loading on the anode",
      "Minimize geometric unsharpness"
    ],
    answer: 1
  },
  {
    question: "In MRI, the Larmor frequency is the:",
    options: [
      "Number of slices acquired per second",
      "Resonant precession frequency of protons in a given magnetic field strength",
      "Repetition time between RF pulse sequences",
      "Bandwidth of the radiofrequency receiver coil"
    ],
    answer: 1
  },
  {
    question: "Which MRI pulse sequence produces images where fluid (e.g., CSF) appears brightest?",
    options: [
      "T1-weighted spin echo",
      "T2-weighted spin echo",
      "FLAIR (fluid-attenuated inversion recovery)",
      "Gradient echo with short TR"
    ],
    answer: 1
  },
  {
    question: "Gradient coils in an MRI system are used to:",
    options: [
      "Generate the main static magnetic field (B0)",
      "Provide spatial localization/encoding of the MRI signal",
      "Excite hydrogen protons into resonance",
      "Shield the scanner room from radiofrequency interference"
    ],
    answer: 1
  },
  {
    question: "Which ultrasound artifact appears as multiple equally spaced hyperechoic lines extending deep to a strong reflector?",
    options: [
      "Posterior acoustic shadowing",
      "Posterior acoustic enhancement",
      "Reverberation artifact",
      "Side lobe artifact"
    ],
    answer: 2
  },
  {
    question: "Higher-frequency ultrasound transducers provide:",
    options: [
      "Greater depth penetration but lower spatial resolution",
      "Better spatial resolution but reduced depth penetration",
      "Identical resolution and penetration to lower-frequency transducers",
      "Better penetration and resolution simultaneously"
    ],
    answer: 1
  },
  {
    question: "In nuclear medicine gamma camera QC, the daily peaking procedure verifies that:",
    options: [
      "The collimator is free of cracks",
      "The energy window is centered on the photopeak of the radionuclide",
      "Flood field uniformity is within tolerance",
      "Spatial resolution meets ACR standards"
    ],
    answer: 1
  },
  {
    question: "The radionuclide most commonly used in PET imaging is:",
    options: ["Tc-99m", "I-131", "F-18 (fluorodeoxyglucose, FDG)", "Ga-67"],
    answer: 2
  },
  {
    question: "ALARA stands for:",
    options: [
      "Automatic Limiting And Radiation Attenuation",
      "As Low As Reasonably Achievable",
      "Applied Low-dose Attenuation Radiation Analysis",
      "Average Longitudinal Absorbed Radiation Assessment"
    ],
    answer: 1
  },
  {
    question: "Which federal agency enforces the performance standards for diagnostic X-ray equipment manufacturers under 21 CFR Part 1020?",
    options: [
      "Nuclear Regulatory Commission (NRC)",
      "American College of Radiology (ACR)",
      "FDA Center for Devices and Radiological Health (CDRH)",
      "Centers for Medicare & Medicaid Services (CMS)"
    ],
    answer: 2
  },
  {
    question: "The Modulation Transfer Function (MTF) describes a system's:",
    options: [
      "Ability to deliver consistent patient dose across exposures",
      "Spatial resolution performance across a range of spatial frequencies",
      "Signal-to-noise ratio at a given dose level",
      "Contrast sensitivity independent of spatial frequency"
    ],
    answer: 1
  },
  {
    question: "Detective Quantum Efficiency (DQE) measures:",
    options: [
      "The efficiency of the X-ray generator's high-voltage circuit",
      "How efficiently a detector converts incident X-ray signal into useful image signal relative to added noise",
      "The generator's voltage ripple percentage",
      "The patient's entrance surface dose per image"
    ],
    answer: 1
  },
  {
    question: "A high-frequency (inverter) X-ray generator produces what approximate voltage ripple?",
    options: ["100%", "13%", "4%", "Less than 1%"],
    answer: 3
  },
  {
    question: "Added filtration in the X-ray beam is used primarily to:",
    options: [
      "Increase beam intensity at the image receptor",
      "Remove low-energy photons that increase patient dose without improving image quality",
      "Reduce the kVp required for a given penetration",
      "Increase the production of scatter radiation"
    ],
    answer: 1
  },
  {
    question: "Inherent filtration in an X-ray tube originates from:",
    options: [
      "Added aluminum or copper filters in the collimator",
      "The glass envelope, insulating oil, and tube port window",
      "The Bucky grid beneath the table top",
      "The lead collimator blades"
    ],
    answer: 1
  },
  {
    question: "An anti-scatter grid (Bucky) in radiography is used to:",
    options: [
      "Increase magnification of the anatomy of interest",
      "Reduce scattered radiation reaching the image receptor, improving contrast",
      "Focus the primary X-ray beam onto a smaller field",
      "Decrease the required mAs for a given exposure"
    ],
    answer: 1
  },
  {
    question: "Which CT quality control test evaluates the ability to distinguish objects with small differences in contrast from background?",
    options: [
      "CT number linearity (Hounsfield unit accuracy) test",
      "Noise and uniformity test",
      "Low-contrast detectability test",
      "High-contrast spatial resolution test"
    ],
    answer: 2
  },
  {
    question: "The radiation protection principle that uses time, distance, and shielding is applied to:",
    options: [
      "Optimize image contrast and resolution",
      "Reduce occupational radiation exposure",
      "Calibrate imaging equipment output",
      "Calculate patient effective dose"
    ],
    answer: 1
  },
  {
    question: "Spatial resolution in digital imaging is most commonly expressed as:",
    options: [
      "Line pairs per millimeter (lp/mm)",
      "Hounsfield units (HU)",
      "Signal-to-noise ratio (SNR)",
      "Effective dose in millisieverts (mSv)"
    ],
    answer: 0
  },
  {
    question: "Which test is used in X-ray QC to verify that the radiation field matches the light field from the collimator?",
    options: [
      "Sensitometry test",
      "Beam/light field alignment test",
      "Half-value layer (HVL) measurement",
      "Detective quantum efficiency (DQE) test"
    ],
    answer: 1
  },
  {
    question: "In a 3-phase, 12-pulse X-ray generator, the approximate voltage ripple is:",
    options: ["100%", "13%", "4%", "Less than 1%"],
    answer: 2
  },
  {
    question: "What is the purpose of the focal spot in an X-ray tube?",
    options: [
      "To filter out scattered X-rays before they reach the patient",
      "To define the area on the anode where electrons strike and X-rays are produced, affecting image sharpness",
      "To collimate the beam to the anatomy of interest",
      "To store charge between exposures"
    ],
    answer: 1
  },
  {
    question: "Ring artifacts in CT images are caused by:",
    options: [
      "Patient motion during the scan",
      "A miscalibrated or defective detector element",
      "Beam hardening through metallic implants",
      "Undersampling of the projection data"
    ],
    answer: 1
  },
  {
    question: "The annual occupational radiation dose limit for radiation workers in the US is:",
    options: ["1 mSv (100 mrem)", "5 mSv (500 mrem)", "20 mSv (2000 mrem)", "50 mSv (5000 mrem)"],
    answer: 3
  }
];

// --- MEDICAL TERMINOLOGY QUESTIONS ---
const terminologyQuestions = [
  { question: "What is the best definition of 'bradykinesia'?", options: ["Rapid involuntary tremor", "Slowness of movement", "Muscle rigidity from spasm", "Loss of balance when standing"], answer: 1 },
  { question: "What is the best definition of 'anisocoria'?", options: ["Unequal pupil size", "Inflammation of the iris", "Double vision on lateral gaze", "Blurred near vision"], answer: 0 },
  { question: "What is the best definition of 'dysphagia'?", options: ["Painful swallowing", "Difficulty swallowing", "Excessive salivation", "Reflux of gastric acid"], answer: 1 },
  { question: "What is the best definition of 'orthopnea'?", options: ["Shortness of breath when lying flat", "Shortness of breath on exertion", "Wheezing at night", "Breathing pause during sleep"], answer: 0 },
  { question: "What is the best definition of 'hematemesis'?", options: ["Blood in stool", "Vomiting blood", "Coughing blood", "Blood in urine"], answer: 1 },
  { question: "What is the best definition of 'melena'?", options: ["Bright red rectal bleeding", "Black tarry stool from digested blood", "Fatty foul-smelling stool", "Mucus in stool"], answer: 1 },
  { question: "What is the best definition of 'hemoptysis'?", options: ["Bleeding from gums", "Vomiting blood", "Coughing up blood", "Nosebleed"], answer: 2 },
  { question: "What is the best definition of 'paresthesia'?", options: ["Numbness and tingling sensation", "Complete loss of sensation", "Burning chest pain", "Pain in a joint during motion"], answer: 0 },
  { question: "What is the best definition of 'ascites'?", options: ["Fluid in pleural space", "Generalized tissue edema", "Fluid in pericardial sac", "Fluid accumulation in the peritoneal cavity"], answer: 3 },
  { question: "What is the best definition of 'cyanosis'?", options: ["Yellow skin discoloration", "Blue discoloration from low oxygenation", "Redness from vasodilation", "Pallor from anemia"], answer: 1 },
  { question: "What is the best definition of 'aphasia'?", options: ["Difficulty articulating speech", "Loss of language comprehension and/or expression", "Memory loss after trauma", "Inability to swallow solids"], answer: 1 },
  { question: "What is the best definition of 'ataxia'?", options: ["Involuntary jerking movements", "Lack of coordinated voluntary movement", "Muscle weakness on one side", "Loss of pain sensation"], answer: 1 },
  { question: "What is the best definition of 'diplopia'?", options: ["Tunnel vision", "Night blindness", "Double vision", "Loss of central vision"], answer: 2 },
  { question: "What is the best definition of 'petechiae'?", options: ["Large raised welts", "Small pinpoint non-blanching hemorrhages", "Extensive purple bruises", "Erythematous plaques"], answer: 1 },
  { question: "What is the best definition of 'ecchymosis'?", options: ["A superficial skin scratch", "A pressure ulcer", "A large bruise from subcutaneous bleeding", "A fungal skin lesion"], answer: 2 },
  { question: "What is the best definition of 'oliguria'?", options: ["Low urine output", "No urine output", "Frequent nighttime urination", "Painful urination"], answer: 0 },
  { question: "What is the best definition of 'anuria'?", options: ["Excessive urine output", "Urine with pus", "Near absence of urine output", "Urinary urgency"], answer: 2 },
  { question: "What is the best definition of 'polyuria'?", options: ["Large urine volume", "Blood in urine", "Protein in urine", "Retained urine after voiding"], answer: 0 },
  { question: "What is the best definition of 'nocturia'?", options: ["Urination only during daytime", "Frequent nighttime urination", "Pain with urination", "Urinary incontinence"], answer: 1 },
  { question: "What is the best definition of 'hematuria'?", options: ["Cloudy urine", "Blood in urine", "Glucose in urine", "Ketones in urine"], answer: 1 },
  { question: "What is the best definition of 'pyuria'?", options: ["Pus in urine", "Sugar in urine", "Urinary crystals", "Urinary retention"], answer: 0 },
  { question: "What is the best definition of 'steatorrhea'?", options: ["Bloody diarrhea", "Fatty stool due to malabsorption", "Mucous stool from IBS", "Constipation from dehydration"], answer: 1 },
  { question: "What is the best definition of 'tenesmus'?", options: ["Involuntary stool leakage", "Painful defecation", "Rectal urgency with sensation of incomplete evacuation", "Absent bowel sounds"], answer: 2 },
  { question: "What is the best definition of 'dysuria'?", options: ["Frequent urination", "Painful or difficult urination", "Inability to urinate", "Urinary urgency"], answer: 1 },
  { question: "What is the best definition of 'pruritus'?", options: ["Skin peeling", "Itching", "Bruising", "Burning neuropathic pain"], answer: 1 },
  { question: "What is the best definition of 'urticaria'?", options: ["Hives with transient raised wheals", "Deep skin ulcer", "Purulent skin infection", "Scaly fungal rash"], answer: 0 },
  { question: "What is the best definition of 'tachypnea'?", options: ["Rapid respiratory rate", "Deep slow breathing", "Absent respiratory effort", "Noisy inspiratory breathing"], answer: 0 },
  { question: "What is the best definition of 'bradypnea'?", options: ["Rapid shallow breathing", "Slow respiratory rate", "Labored breathing when supine", "Intermittent apnea"], answer: 1 },
  { question: "What is the best definition of 'apnea'?", options: ["Rapid breathing with low tidal volume", "Temporary cessation of breathing", "Difficulty exhaling", "Noisy breathing from upper airway edema"], answer: 1 },
  { question: "What is the best definition of 'stridor'?", options: ["Low-pitched snoring breath sound", "High-pitched inspiratory sound from upper airway obstruction", "Crackling sound at lung bases", "Pleural friction rub"], answer: 1 },
  { question: "What is the best definition of 'wheeze'?", options: ["High-pitched musical sound from narrowed lower airways", "Gurgling throat sound", "Percussion dullness", "Bronchial breath sounds"], answer: 0 },
  { question: "What is the best definition of 'rales (crackles)'?", options: ["Pleural rubbing sounds", "Fine popping sounds from fluid-filled alveoli", "Upper airway snoring noise", "Whistling expiratory sounds"], answer: 1 },
  { question: "What is the best definition of 'rhonchi'?", options: ["Harsh low-pitched rattling from airway secretions", "Fine bibasilar crackles only", "Inspiratory stridor", "Absence of breath sounds"], answer: 0 },
  { question: "What is the best definition of 'claudication'?", options: ["Resting chest pain due to CAD", "Leg pain with exertion from arterial insufficiency", "Joint stiffness after inactivity", "Neuropathic foot burning at night"], answer: 1 },
  { question: "What is the best definition of 'edema'?", options: ["Localized erythema", "Excess fluid accumulation in interstitial tissues", "Subcutaneous hemorrhage", "Skin desquamation"], answer: 1 },
  { question: "What is the best definition of 'cachexia'?", options: ["Fluid overload with edema", "Severe weight and muscle loss from chronic disease", "Vitamin deficiency anemia", "Obesity from endocrine disorder"], answer: 1 },
  { question: "What is the best definition of 'kyphosis'?", options: ["Exaggerated lumbar inward curvature", "Lateral spinal curvature", "Exaggerated thoracic posterior curvature", "Rotation of vertebral bodies only"], answer: 2 },
  { question: "What is the best definition of 'lordosis'?", options: ["Exaggerated lumbar inward curvature", "Thoracic posterior hump", "Lateral spinal deviation", "Flattening of cervical spine"], answer: 0 },
  { question: "What is the best definition of 'scoliosis'?", options: ["Posterior spinal hump", "Lateral curvature of the spine", "Anterior pelvic tilt", "Degenerative disc narrowing"], answer: 1 },
  { question: "What is the best definition of 'hemiparesis'?", options: ["Complete paralysis of one side", "Partial weakness of one side", "Weakness of both legs", "Bilateral arm weakness"], answer: 1 },
  { question: "What is the best definition of 'hemiplegia'?", options: ["Partial weakness of one side", "Complete paralysis of one side", "Paralysis below the waist", "Transient numbness in one arm"], answer: 1 },
  { question: "What is the best definition of 'syncope'?", options: ["Sudden temporary loss of consciousness", "Brief vertigo with nausea", "Sudden seizure activity", "Transient amnesia"], answer: 0 },
  { question: "What is the best definition of 'presyncope'?", options: ["Near-faint sensation without complete loss of consciousness", "Brief complete unconsciousness", "Postural tremor", "Transient aphasia"], answer: 0 },
  { question: "What is the best definition of 'vertigo'?", options: ["Lightheadedness from dehydration", "Illusion of spinning or motion", "Loss of hearing in one ear", "Double vision with headache"], answer: 1 },
  { question: "What is the best definition of 'nystagmus'?", options: ["Fixed dilated pupil", "Involuntary rhythmic eye movements", "Drooping upper eyelid", "Conjunctival hemorrhage"], answer: 1 },
  { question: "What is the best definition of 'photophobia'?", options: ["Fear of darkness", "Sensitivity to light", "Night blindness", "Inability to focus near objects"], answer: 1 },
  { question: "What is the best definition of 'odynophagia'?", options: ["Difficulty swallowing", "Painful swallowing", "Inability to open mouth", "Esophageal reflux"], answer: 1 },
  { question: "What is the best definition of 'xerostomia'?", options: ["Dry mouth", "Excessive salivation", "Mouth ulceration", "Tongue swelling"], answer: 0 },
  { question: "What is the best definition of 'dysarthria'?", options: ["Language comprehension deficit", "Impaired speech articulation from motor dysfunction", "Inability to read words", "Stuttering from anxiety"], answer: 1 },
  { question: "What is the best definition of 'asterixis'?", options: ["Fine resting tremor", "Flapping hand tremor from metabolic encephalopathy", "Intention tremor during movement", "Myoclonic jerks in sleep"], answer: 1 },
  { question: "What is the best definition of 'jaundice'?", options: ["Pale skin from anemia", "Yellow discoloration from elevated bilirubin", "Blue skin from hypoxemia", "Red skin from flushing"], answer: 1 },
  { question: "What is the best definition of 'hepatomegaly'?", options: ["Enlarged spleen", "Enlarged liver", "Inflamed pancreas", "Distended gallbladder"], answer: 1 },
  { question: "What is the best definition of 'splenomegaly'?", options: ["Enlarged kidney", "Enlarged spleen", "Liver enlargement", "Pancreatic enlargement"], answer: 1 },
  { question: "What is the best definition of 'cardiomegaly'?", options: ["Dilated aorta", "Enlarged heart", "Pericardial inflammation", "Reduced ejection fraction only"], answer: 1 },
  { question: "What is the best definition of 'thrombocytopenia'?", options: ["Low platelet count", "Low white blood cell count", "Low red blood cell count", "High platelet count"], answer: 0 },
  { question: "What is the best definition of 'leukocytosis'?", options: ["Low WBC count", "Elevated WBC count", "Abnormal RBC shape", "Elevated hemoglobin"], answer: 1 },
  { question: "What is the best definition of 'erythema'?", options: ["Bluish skin discoloration", "Yellow skin discoloration", "Redness of the skin from increased blood flow", "Skin thickening from fibrosis"], answer: 2 },
  { question: "What is the best definition of 'ischemia'?", options: ["Tissue swelling due to fluid overload", "Reduced blood supply causing oxygen deprivation", "Infection of the bloodstream", "Excess blood flow to tissue"], answer: 1 },
  { question: "What is the best definition of 'infarction'?", options: ["Reversible tissue hypoxia", "Tissue necrosis due to prolonged ischemia", "Inflammation of blood vessels", "Bleeding into tissue"], answer: 1 },
  { question: "What is the best definition of 'anasarca'?", options: ["Localized ankle edema", "Generalized severe body edema", "Pleural fluid accumulation", "Ascites only"], answer: 1 }
];

// --- DATA SETS ---

 const organs = {
  Heart: {
    image: "/heart.png",
    boardWidth: 420,
    boardHeight: 420,
      functionTitle: "Circulates blood through the body",
      functionSummary:
        "The heart works as a muscular pump that sends oxygen-poor blood to the lungs and oxygen-rich blood out to the rest of the body.",
      studyHighlights: [
        "Maintains blood flow and blood pressure",
        "Supplies tissues with oxygen and nutrients",
        "Helps remove carbon dioxide and metabolic waste"
      ],
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
      objectPosition: "center",
      transform: "scale(1.2)"
    },
    parts: [
      { name: "Left Atrium", x: 250, y: 100, description: "Receives oxygen-rich blood from the lungs" },
      { name: "Right Atrium", x: 130, y: 100, description: "Receives oxygen-poor blood from the body" },
      { name: "Left Ventricle", x: 260, y: 230, description: "Pumps oxygen-rich blood out to the body via the aorta" },
      { name: "Right Ventricle", x: 150, y: 230, description: "Pumps oxygen-poor blood to the lungs" },
      { name: "Aorta", x: 210, y: 40, description: "Main artery that carries oxygenated blood from heart to body" }
    ]
  },

  Brain: {
    image: "/brain.png",
    boardWidth: 420,
    boardHeight: 420,
    functionTitle: "Controls the body and processes information",
    functionSummary:
      "The brain interprets sensory input, directs movement, stores memory, and coordinates automatic functions needed to stay alive.",
    studyHighlights: [
      "Coordinates thought, memory, and decision-making",
      "Controls movement, speech, and sensation",
      "Regulates breathing, heart rate, and other vital functions"
    ],
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
      { name: "Frontal Lobe", x: 280, y: 120, description: "Controls decision-making, personality, movement, and speech" },
      { name: "Parietal Lobe", x: 220, y: 80, description: "Processes sensations like touch, temperature, and pain" },
      { name: "Occipital Lobe", x: 120, y: 120, description: "Processes visual information and color perception" },
      { name: "Temporal Lobe", x: 185, y: 220, description: "Supports hearing, language comprehension, and memory formation" },
      { name: "Cerebellum", x: 106, y: 230, description: "Coordinates balance, posture, and smooth voluntary movement" },
      { name: "Brainstem", x: 165, y: 265, description: "Controls vital automatic functions like breathing and heart rate" },
      { name: "Corpus Callosum", x: 210, y: 120, description: "Major fiber tract connecting the left and right cerebral hemispheres" },
      { name: "Thalamus", x: 190, y: 150, description: "Primary relay center that routes sensory and motor signals to the cortex" },
      { name: "Hypothalamus", x: 205, y: 202, description: "Regulates temperature, hunger, endocrine control, and autonomic balance" },
      { name: "Pituitary Gland", x: 221, y: 236, description: "Master endocrine gland that secretes hormones controlling other glands" },
      { name: "Pons", x: 166, y: 271, description: "Brainstem region involved in breathing control and cranial nerve pathways" },
      { name: "Medulla", x: 148, y: 323, description: "Lower brainstem center for respiration, heart rate, and blood pressure control" }
    ]
  },

  Lungs: {
    image: "/lungs.png",
    boardWidth: 420,
    boardHeight: 420,
    functionTitle: "Exchange oxygen and carbon dioxide",
    functionSummary:
      "The lungs bring oxygen into the bloodstream and remove carbon dioxide so the body can produce energy and maintain acid-base balance.",
    studyHighlights: [
      "Oxygenates blood for delivery to tissues",
      "Removes carbon dioxide during exhalation",
      "Supports normal pH balance in the body"
    ],
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
      { name: "Left Lung", x: 140, y: 150, description: "Smaller lung with two lobes; exchanges oxygen and CO2" },
      { name: "Right Lung", x: 260, y: 150, description: "Larger lung with three lobes; exchanges oxygen and CO2" },
      { name: "Trachea", x: 200, y: 50, description: "Windpipe; carries air from throat to bronchi in lungs" },
      { name: "Carina", x: 200, y: 118, description: "Ridge at the tracheal split where airways divide into main bronchi" },
      { name: "Right Main Bronchus", x: 238, y: 140, description: "Main airway branch carrying air into the right lung" },
      { name: "Left Main Bronchus", x: 162, y: 140, description: "Main airway branch carrying air into the left lung" }
    ]
  },

  Liver: {
    image: "/liver.jpg",
    boardWidth: 700,
    boardHeight: 600,
    functionTitle: "Filters blood and processes nutrients",
    functionSummary:
      "The liver detoxifies blood, stores energy, produces bile, and helps regulate metabolism so the body can use nutrients efficiently.",
    studyHighlights: [
      "Breaks down toxins, drugs, and waste products",
      "Produces bile to help digest fats",
      "Stores glycogen, vitamins, and important nutrients"
    ],
    dropWidth: 80,
    dropHeight: 32,
    mobileDropScale: 0.35,
    mobileLabelOffsetX: -145,
    mobileLabelOffsetY: 0,
    mobileImageScale: 1.8,
    mobileImageTranslateX: -70,
    mobileImageTranslateY: 0,
    imageStyle: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      objectPosition: "center"
    },
    parts: [
      { name: "Right Lobe", x: 280, y: 210, description: "Larger lobe; performs most liver functions" },
      { name: "Left Lobe", x: 468, y: 190, description: "Smaller lobe; works with right lobe for detoxification" },
      { name: "Portal Triad (Hilum)", x: 392, y: 304, description: "Convergence area containing portal vein, hepatic artery, and bile duct" },
      { name: "Bile Duct", x: 456, y: 352, description: "Main downward duct carrying bile toward the gallbladder and intestine" },
      { name: "Gallbladder", x: 480, y: 380, description: "Stores bile until needed to digest fats" },
      { name: "Falciform Ligament", x: 350, y: 140, description: "Tissue that attaches liver to abdominal wall" },
      { name: "Inferior Border", x: 430, y: 360, description: "Lower edge of the liver visible on this anterior view" }
    ]
  },

  Eye: {
    image: "/eye.jpg",
    boardWidth: 750,
    boardHeight: 700,
    functionTitle: "Captures light and creates vision",
    functionSummary:
      "The eye focuses incoming light, converts it into nerve signals, and sends those signals to the brain so images can be interpreted.",
    studyHighlights: [
      "Focuses light through the cornea and lens",
      "Converts light into signals in the retina",
      "Sends visual information to the brain through the optic nerve"
    ],
    dropWidth: 80,
    dropHeight: 32,
    mobileDropScale: 0.35,
    mobileLabelOffsetX: -145,
    mobileLabelOffsetY: 0,
    mobileImageScale: 1.8,
    mobileImageTranslateX: -70,
    mobileImageTranslateY: 0,
    imageStyle: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      objectPosition: "center"
    },
    parts: [
      { name: "Cornea", x: 28, y: 355, description: "Clear front layer that protects the eye and focuses light" },
      { name: "Iris", x: 73, y: 406, description: "Colored muscle that controls pupil size and light entry" },
      { name: "Lens", x: 121, y: 355, description: "Clear structure that focuses light precisely on retina" },
      { name: "Pupil", x: 58, y: 354, description: "Opening in iris that regulates light entering the eye" },
      { name: "Aqueous Humor", x: 32, y: 296, description: "Clear fluid in front of lens; maintains eye pressure" },
      { name: "Vitreous Humor", x: 370, y: 355, description: "Clear gel filling most of eye; maintains shape" },
      { name: "Retina", x: 548, y: 227, description: "Light-sensitive tissue that captures visual images" },
      { name: "Optic Nerve", x: 675, y: 465, description: "Transmits visual signals from retina to brain" },
      { name: "Sclera", x: 578, y: 165, description: "White outer layer; provides shape and protection" },
      { name: "Choroid", x: 556, y: 184, description: "Blood vessel layer that supplies nutrients to retina" },
      { name: "Macula", x: 556, y: 505, description: "Central area of retina for sharp, detailed vision" },
      { name: "Ciliary Body", x: 108, y: 240, description: "Produces aqueous fluid and adjusts lens shape" }
    ]
  },

  Ear: {
    image: "/ear.jpg",
    boardWidth: 700,
    boardHeight: 600,
    functionTitle: "Supports hearing and balance",
    functionSummary:
      "The ear collects and transmits sound for hearing and contains structures that help maintain equilibrium and spatial orientation.",
    studyHighlights: [
      "Outer ear funnels sound toward the eardrum",
      "Middle ear bones amplify vibration",
      "Inner ear structures convert vibration to nerve signals and support balance"
    ],
    dropWidth: 90,
    dropHeight: 34,
    mobileDropScale: 0.36,
    mobileLabelOffsetX: -145,
    mobileLabelOffsetY: 0,
    mobileImageScale: 1.8,
    mobileImageTranslateX: -70,
    mobileImageTranslateY: 0,
    imageStyle: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      objectPosition: "center"
    },
    parts: [
      { name: "Auricle (Pinna)", x: 105, y: 290, description: "Outer visible part that funnels sound waves into the ear canal" },
      { name: "External Auditory Canal", x: 170, y: 295, description: "Tube that directs sound waves toward the eardrum" },
      { name: "Tympanic Membrane", x: 347, y: 272, description: "Eardrum; vibrates in response to sound waves" },
      { name: "Malleus", x: 332, y: 222, description: "Hammer bone; first of three tiny bones that amplify vibrations" },
      { name: "Incus", x: 366, y: 196, description: "Anvil bone; transfers vibrations from malleus to stapes" },
      { name: "Stapes", x: 447, y: 272, description: "Stirrup bone; smallest bone in body; transfers vibrations to inner ear" },
      { name: "Cochlea", x: 505, y: 296, description: "Spiral-shaped chamber; converts vibrations to electrical nerve signals" },
      { name: "Semicircular Canals", x: 473, y: 124, description: "Three fluid-filled loops that detect head movement and maintain balance" },
      { name: "Eustachian Tube", x: 512, y: 412, description: "Connects middle ear to throat; equalizes air pressure" },
      { name: "Auditory Nerve", x: 600, y: 195, description: "Transmits electrical signals from cochlea to brain for sound interpretation" }
    ]
  },

  "Arterial System": {
    image: "/arterial-system.jpg",
    boardWidth: 620,
    boardHeight: 950,
    functionTitle: "Delivers oxygen-rich blood throughout the body",
    functionSummary:
      "The arterial system carries blood away from the heart so oxygen and nutrients can reach organs, muscles, and other tissues.",
    studyHighlights: [
      "Distributes oxygen-rich blood from the heart",
      "Supports tissue perfusion from head to toe",
      "Helps maintain blood pressure and circulation pathways"
    ],
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
      { name: "Aorta", x: 310, y: 150, description: "Largest artery; main vessel carrying blood from heart" },
      { name: "Ascending Aorta", x: 320, y: 170, description: "Initial portion rising from left ventricle" },
      { name: "Aortic Arch", x: 310, y: 190, description: "Curved portion supplying head, neck, and arms" },
      { name: "Descending Aorta", x: 310, y: 260, description: "Portion descending through chest and abdomen" },
      { name: "Right Carotid", x: 375, y: 190, description: "Supplies blood to right side of head and brain" },
      { name: "Left Carotid", x: 245, y: 190, description: "Supplies blood to left side of head and brain" },
      { name: "Right Subclavian", x: 380, y: 245, description: "Supplies blood to right shoulder and arm" },
      { name: "Left Subclavian", x: 240, y: 245, description: "Supplies blood to left shoulder and arm" },
      { name: "Right Axillary", x: 425, y: 305, description: "Continuation of subclavian into right arm" },
      { name: "Left Axillary", x: 165, y: 305, description: "Continuation of subclavian into left arm" },
      { name: "Right Radial", x: 455, y: 425, description: "Supplies blood to right forearm and hand" },
      { name: "Left Radial", x: 170, y: 425, description: "Supplies blood to left forearm and hand" },
      { name: "Celiac Artery", x: 310, y: 360, description: "Supplies stomach, liver, and spleen" },
      { name: "Superior Mesenteric", x: 310, y: 430, description: "Supplies small intestine and parts of colon" },
      { name: "Right Renal", x: 345, y: 430, description: "Supplies blood to right kidney" },
      { name: "Left Renal", x: 275, y: 430, description: "Supplies blood to left kidney" },
      { name: "Right Iliac", x: 345, y: 540, description: "Supplies blood to right pelvic region and leg" },
      { name: "Left Iliac", x: 275, y: 540, description: "Supplies blood to left pelvic region and leg" },
      { name: "Right Femoral", x: 345, y: 650, description: "Main artery of right leg" },
      { name: "Left Femoral", x: 275, y: 650, description: "Main artery of left leg" }
    ]
  },

  "Venous System": {
    image: "/venous system.jpg",
    boardWidth: 1680,
    boardHeight: 928,
    functionTitle: "Returns oxygen-poor blood back to the heart",
    functionSummary:
      "The venous system collects blood from tissues and returns it to the right side of the heart for reoxygenation in the lungs.",
    studyHighlights: [
      "Venous blood flows back to the heart at lower pressure",
      "Large central veins drain the head, arms, trunk, and legs",
      "Deep leg veins are clinically important for DVT risk"
    ],
    dropWidth: 80,
    dropHeight: 32,
    mobileDropScale: 0.38,
    mobileLabelOffsetX: -145,
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
      { name: "Superior Vena Cava", x: 850, y: 198, description: "Major vein returning blood from head, neck, and upper limbs to the heart" },
      { name: "Inferior Vena Cava", x: 842, y: 320, description: "Largest vein returning blood from abdomen, pelvis, and legs to the heart" },
      { name: "Right Internal Jugular Vein", x: 804, y: 84, description: "Drains venous blood from the brain and deep face on the right" },
      { name: "Left Internal Jugular Vein", x: 876, y: 84, description: "Drains venous blood from the brain and deep face on the left" },
      { name: "Right Brachiocephalic Vein", x: 822, y: 168, description: "Formed by right jugular and subclavian veins before joining the SVC" },
      { name: "Left Brachiocephalic Vein", x: 874, y: 168, description: "Formed by left jugular and subclavian veins before joining the SVC" },
      { name: "Right Subclavian Vein", x: 715, y: 152, description: "Drains venous blood from the right upper limb" },
      { name: "Left Subclavian Vein", x: 965, y: 152, description: "Drains venous blood from the left upper limb" },
      { name: "Right Common Iliac Vein", x: 805, y: 405, description: "Drains pelvis and right lower limb into the inferior vena cava" },
      { name: "Left Common Iliac Vein", x: 875, y: 405, description: "Drains pelvis and left lower limb into the inferior vena cava" },
      { name: "Right Femoral Vein", x: 790, y: 545, description: "Major deep vein of the right thigh" },
      { name: "Left Femoral Vein", x: 890, y: 545, description: "Major deep vein of the left thigh" }
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
      { name: "Skull", x: 315, y: 108, description: "Protects brain and supports facial structure" },
      { name: "Clavicle", x: 390, y: 220, description: "Collarbone; connects shoulder to sternum" },
      { name: "Sternum", x: 315, y: 270, description: "Breastbone; protects heart and lungs" },
      { name: "Ribs", x: 390, y: 320, description: "Curved bones protecting organs in chest" },
      { name: "Humerus", x: 180, y: 255, description: "Upper arm bone; connects shoulder to elbow" },
      { name: "Radius", x: 100, y: 365, description: "Forearm bone on thumb side; aids arm movement" },
      { name: "Ulna", x: 189, y: 430, description: "Forearm bone on pinky side; supports elbow" },
      { name: "Pelvis", x: 315, y: 395, description: "Hip bones; supports and protects abdominal organs" },
      { name: "Femur", x: 315, y: 560, description: "Thigh bone; longest bone in body" },
      { name: "Tibia", x: 390, y: 735, description: "Shin bone; supports weight during walking" }
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
      { name: "Distal Phalanges", x: 325, y: 220, description: "Fingertip bones; provide dexterity and sensation" },
      { name: "Middle Phalanges", x: 460, y: 345, description: "Middle finger bones; support gripping" },
      { name: "Proximal Phalanges", x: 330, y: 420, description: "Base finger bones; connect to metacarpals" },
      { name: "Metacarpals", x: 310, y: 545, description: "Palm bones; form structure and support" },
      { name: "Scaphoid", x: 279, y: 766, description: "Wrist carpal; commonly fractured in falls" },
      { name: "Lunate", x: 413, y: 745, description: "Moon-shaped wrist carpal" },
      { name: "Triquetrum", x: 455, y: 696, description: "Three-cornered wrist carpal" },
      { name: "Pisiform", x: 371, y: 784, description: "Pea-shaped wrist carpal" },
      { name: "Trapezium", x: 234, y: 690, description: "Thumb-side wrist carpal" },
      { name: "Trapezoid", x: 164, y: 750, description: "Irregular wrist carpal" },
      { name: "Capitate", x: 289, y: 649, description: "Largest wrist carpal; head-shaped" },
      { name: "Hamate", x: 427, y: 670, description: "Hook-shaped wrist carpal" }
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
      transform: "translateY(0px) scale(0.9)"
    },
    parts: [
      { name: "Distal Phalanges", x: 310, y: 305, description: "Toe tip bones; provide touch sensation" },
      { name: "Middle Phalanges", x: 310, y: 330, description: "Middle toe bones" },
      { name: "Proximal Phalanges", x: 318, y: 370, description: "Base toe bones; connect to metatarsals" },
      { name: "Metatarsals", x: 330, y: 480, description: "Long bones in middle of foot; support weight" },
      { name: "Medial Cuneiform", x: 280, y: 595, description: "Inner wedge-shaped tarsal bone" },
      { name: "Intermediate Cuneiform", x: 310, y: 595, description: "Middle wedge-shaped tarsal bone" },
      { name: "Lateral Cuneiform", x: 335, y: 595, description: "Outer wedge-shaped tarsal bone" },
      { name: "Navicular", x: 295, y: 645, description: "Boat-shaped tarsal bone; links midfoot to heel" },
      { name: "Cuboid", x: 385, y: 635, description: "Cube-shaped outer tarsal bone" },
      { name: "Talus", x: 265, y: 735, description: "Ankle bone; connects foot to leg" },
      { name: "Calcaneus", x: 330, y: 815, description: "Heel bone; largest foot bone; supports body weight" }
    ]
  }
};
export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [contactStatus, setContactStatus] = useState("idle");
  const [contactError, setContactError] = useState("");
  const contactFormRef = useRef(null);
  const placementMessageTimeoutRef = useRef(null);
  const cashAppSupportUrl = "https://cash.app/$KevinPugh23";
  const adsenseClient = "ca-pub-4355354977115217";
  const topAdSlot = "";
  const bottomAdSlot = "";
  const [mode, setMode] = useState("organs");
  const [selectedSet, setSelectedSet] = useState(null);
  const [placed, setPlaced] = useState({});
  const [score, setScore] = useState(0);
  const [dashboard, setDashboard] = useState({});
  const [feedback, setFeedback] = useState({});
  const [selectedLabel, setSelectedLabel] = useState("");
  const [hoveredPartName, setHoveredPartName] = useState("");
  const [placementMessage, setPlacementMessage] = useState({ text: "", tone: "idle" });
  const [showZoneAnswers, setShowZoneAnswers] = useState(false);

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
  const [harderCbetUnlocked, setHarderCbetUnlocked] = useState(
    () => localStorage.getItem("harderCbetUnlocked") === "true"
  );
  const [shuffledHarderCbetQuestions, setShuffledHarderCbetQuestions] = useState(() =>
    shuffleArray(harderCbetQuestions)
  );
  const [harderCbetIndex, setHarderCbetIndex] = useState(0);
  const [harderCbetScore, setHarderCbetScore] = useState(0);
  const [harderCbetAnswers, setHarderCbetAnswers] = useState({});
  const [harderCbetShowResult, setHarderCbetShowResult] = useState(false);
  const [showHarderCbetMissedReview, setShowHarderCbetMissedReview] = useState(false);

  // --- RN PRACTICE STATE ---
  const [shuffledRnQuestions, setShuffledRnQuestions] = useState(() =>
    shuffleArray(rnQuestions)
  );
  const [rnIndex, setRnIndex] = useState(0);
  const [rnScore, setRnScore] = useState(0);
  const [rnAnswers, setRnAnswers] = useState({});
  const [rnShowResult, setRnShowResult] = useState(false);
  const [showRnMissedReview, setShowRnMissedReview] = useState(false);
  const [shuffledTeasQuestions, setShuffledTeasQuestions] = useState(() =>
    shuffleArray(teasQuestions)
  );
  const [teasIndex, setTeasIndex] = useState(0);
  const [teasScore, setTeasScore] = useState(0);
  const [teasAnswers, setTeasAnswers] = useState({});
  const [teasShowResult, setTeasShowResult] = useState(false);
  const [showTeasMissedReview, setShowTeasMissedReview] = useState(false);
  const [hoveredHomeCard, setHoveredHomeCard] = useState("");
  const [hoveredNavTab, setHoveredNavTab] = useState("");

  // --- EQUIPMENT ID STATE ---
  const [shuffledEquipmentQuestions, setShuffledEquipmentQuestions] = useState(() =>
    shuffleArray(equipmentQuestions)
  );
  const [equipmentIndex, setEquipmentIndex] = useState(0);
  const [equipmentScore, setEquipmentScore] = useState(0);
  const [equipmentAnswers, setEquipmentAnswers] = useState({});
  const [equipmentShowResult, setEquipmentShowResult] = useState(false);
  const [showEquipmentMissedReview, setShowEquipmentMissedReview] = useState(false);

  // --- CRES STATE ---
  const [shuffledCresQuestions, setShuffledCresQuestions] = useState(() =>
    shuffleArray(cresQuestions)
  );
  const [cresIndex, setCresIndex] = useState(0);
  const [cresScore, setCresScore] = useState(0);
  const [cresAnswers, setCresAnswers] = useState({});
  const [cresShowResult, setCresShowResult] = useState(false);
  const [showCresMissedReview, setShowCresMissedReview] = useState(false);

  // --- MEDICAL TERMINOLOGY STATE ---
  const [shuffledTerminologyQuestions, setShuffledTerminologyQuestions] = useState(() =>
    shuffleArray(terminologyQuestions)
  );
  const [terminologyIndex, setTerminologyIndex] = useState(0);
  const [terminologyScore, setTerminologyScore] = useState(0);
  const [terminologyAnswers, setTerminologyAnswers] = useState({});
  const [terminologyShowResult, setTerminologyShowResult] = useState(false);
  const [showTerminologyMissedReview, setShowTerminologyMissedReview] = useState(false);

  const data = mode === "organs" ? organs : bones;
  const currentSet = selectedSet ? data[selectedSet] : null;
  const usesNumberedZones =
    selectedSet === "Hand" || selectedSet === "Foot" || selectedSet === "Eye" || selectedSet === "Ear";

  const showPlacementMessage = (text, tone = "wrong") => {
    if (placementMessageTimeoutRef.current) {
      clearTimeout(placementMessageTimeoutRef.current);
    }

    setPlacementMessage({ text, tone });
    placementMessageTimeoutRef.current = setTimeout(() => {
      setPlacementMessage({ text: "", tone: "idle" });
      placementMessageTimeoutRef.current = null;
    }, 900);
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("progress")) || {};
    setDashboard(saved);
  }, []);

  useEffect(() => {
    return () => {
      if (placementMessageTimeoutRef.current) {
        clearTimeout(placementMessageTimeoutRef.current);
      }
    };
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

  useEffect(() => {
    const savedHarderCbet = JSON.parse(localStorage.getItem("harderCbetProgress"));
    if (savedHarderCbet) {
      setShuffledHarderCbetQuestions(
        savedHarderCbet.shuffledHarderCbetQuestions || shuffleArray(harderCbetQuestions)
      );
      setHarderCbetIndex(savedHarderCbet.harderCbetIndex || 0);
      setHarderCbetScore(savedHarderCbet.harderCbetScore || 0);
      setHarderCbetAnswers(savedHarderCbet.harderCbetAnswers || {});
      setHarderCbetShowResult(savedHarderCbet.harderCbetShowResult || false);
      setShowHarderCbetMissedReview(savedHarderCbet.showHarderCbetMissedReview || false);
    }
  }, []);

  useEffect(() => {
    const savedTeas = JSON.parse(localStorage.getItem("teasProgress"));
    if (savedTeas) {
      setShuffledTeasQuestions(savedTeas.shuffledTeasQuestions || shuffleArray(teasQuestions));
      setTeasIndex(savedTeas.teasIndex || 0);
      setTeasScore(savedTeas.teasScore || 0);
      setTeasAnswers(savedTeas.teasAnswers || {});
      setTeasShowResult(savedTeas.teasShowResult || false);
      setShowTeasMissedReview(savedTeas.showTeasMissedReview || false);
    }
  }, []);

  useEffect(() => {
    const savedEquipment = JSON.parse(localStorage.getItem("equipmentProgress"));
    if (savedEquipment) {
      setShuffledEquipmentQuestions(
        savedEquipment.shuffledEquipmentQuestions || shuffleArray(equipmentQuestions)
      );
      setEquipmentIndex(savedEquipment.equipmentIndex || 0);
      setEquipmentScore(savedEquipment.equipmentScore || 0);
      setEquipmentAnswers(savedEquipment.equipmentAnswers || {});
      setEquipmentShowResult(savedEquipment.equipmentShowResult || false);
      setShowEquipmentMissedReview(savedEquipment.showEquipmentMissedReview || false);
    }
  }, []);

  useEffect(() => {
    const savedCres = JSON.parse(localStorage.getItem("cresProgress"));
    if (savedCres) {
      setShuffledCresQuestions(savedCres.shuffledCresQuestions || shuffleArray(cresQuestions));
      setCresIndex(savedCres.cresIndex || 0);
      setCresScore(savedCres.cresScore || 0);
      setCresAnswers(savedCres.cresAnswers || {});
      setCresShowResult(savedCres.cresShowResult || false);
      setShowCresMissedReview(savedCres.showCresMissedReview || false);
    }
  }, []);

  useEffect(() => {
    const savedTerminology = JSON.parse(localStorage.getItem("terminologyProgress"));
    if (savedTerminology) {
      setShuffledTerminologyQuestions(
        savedTerminology.shuffledTerminologyQuestions || shuffleArray(terminologyQuestions)
      );
      setTerminologyIndex(savedTerminology.terminologyIndex || 0);
      setTerminologyScore(savedTerminology.terminologyScore || 0);
      setTerminologyAnswers(savedTerminology.terminologyAnswers || {});
      setTerminologyShowResult(savedTerminology.terminologyShowResult || false);
      setShowTerminologyMissedReview(savedTerminology.showTerminologyMissedReview || false);
    }
  }, []);

  useEffect(() => {
    if (
      cbetShowResult &&
      shuffledCbetQuestions.length > 0 &&
      cbetScore / shuffledCbetQuestions.length >= 0.7 &&
      !harderCbetUnlocked
    ) {
      setHarderCbetUnlocked(true);
      localStorage.setItem("harderCbetUnlocked", "true");
    }
  }, [cbetShowResult, cbetScore, shuffledCbetQuestions.length, harderCbetUnlocked]);

  const saveProgress = (key, newScore) => {
    const saved = JSON.parse(localStorage.getItem("progress")) || {};
    saved[key] = newScore;
    localStorage.setItem("progress", JSON.stringify(saved));
    setDashboard(saved);
  };

  const handlePlacementAttempt = (part) => {
    if (!selectedLabel) return;
    if (!part || placed[part.name] === "correct") return;

    if (part.name !== selectedLabel) {
      wrongSound.currentTime = 0;
      wrongSound.play();
      setFeedback((prev) => ({ ...prev, [part.name]: "wrong" }));
      showPlacementMessage("Wrong, try again.");

      setTimeout(() => {
        setFeedback((prev) => ({ ...prev, [part.name]: "" }));
      }, 700);

      return;
    }

    correctSound.currentTime = 0;
    correctSound.play();
    setPlacementMessage({ text: "", tone: "idle" });
    setPlaced((prev) => ({ ...prev, [part.name]: "correct" }));
    setFeedback((prev) => ({ ...prev, [part.name]: "correct" }));
    setSelectedLabel("");

    const newScore = score + 1;
    setScore(newScore);
    saveProgress(selectedSet, newScore);
  };

  const handleImageClick = (e) => {
    if (!selectedLabel || !usesNumberedZones) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let clickX = (e.clientX - rect.left) / rect.width * currentSet.boardWidth;
    let clickY = (e.clientY - rect.top) / rect.height * currentSet.boardHeight;

    // Reverse-transform the click coordinates to match the part coordinate system
    // The image displays with transforms, so we need to undo them
    if (
      currentSet.imageStyle.transform &&
      !isSmallScreen &&
      selectedSet !== "Hand" &&
      selectedSet !== "Foot"
    ) {
      const transformStr = currentSet.imageStyle.transform;
      
      // Parse scale transform
      const scaleMatch = transformStr.match(/scale\(([\d.]+)\)/);
      if (scaleMatch) {
        const scale = parseFloat(scaleMatch[1]);
        clickX = clickX / scale;
        clickY = clickY / scale;
      }
      
      // Parse translateY transform
      const translateMatch = transformStr.match(/translateY\((-?[\d]+)px\)/);
      if (translateMatch) {
        const translateY = parseInt(translateMatch[1]);
        clickY = clickY - translateY;
      }
    }

    // Find the closest part
    let closestPart = null;
    const tolerance = 100;
    let closestDistance = tolerance;

    currentSet.parts.forEach((part) => {
      const distance = Math.sqrt(
        Math.pow(part.x - clickX, 2) + Math.pow(part.y - clickY, 2)
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestPart = part;
      }
    });

    handlePlacementAttempt(closestPart);
  };

  const resetGame = () => {
    setPlaced({});
    setFeedback({});
    setScore(0);
    setSelectedLabel("");
    setPlacementMessage({ text: "", tone: "idle" });
    setShowZoneAnswers(false);
  };

  const selectSet = (item) => {
    setSelectedSet(item);
    setPlaced({});
    setFeedback({});
    setScore(0);
    setSelectedLabel("");
    setPlacementMessage({ text: "", tone: "idle" });
    setShowZoneAnswers(false);
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

  const saveHarderCbetProgress = () => {
    const progress = {
      shuffledHarderCbetQuestions,
      harderCbetIndex,
      harderCbetScore,
      harderCbetAnswers,
      harderCbetShowResult,
      showHarderCbetMissedReview
    };
    localStorage.setItem("harderCbetProgress", JSON.stringify(progress));
  };

  const restartHarderCbetExam = () => {
    const reshuffled = shuffleArray(harderCbetQuestions);
    localStorage.removeItem("harderCbetProgress");
    setShuffledHarderCbetQuestions(reshuffled);
    setHarderCbetIndex(0);
    setHarderCbetScore(0);
    setHarderCbetAnswers({});
    setHarderCbetShowResult(false);
    setShowHarderCbetMissedReview(false);
  };

  const saveEquipmentProgress = () => {
    const progress = {
      shuffledEquipmentQuestions,
      equipmentIndex,
      equipmentScore,
      equipmentAnswers,
      equipmentShowResult,
      showEquipmentMissedReview
    };
    localStorage.setItem("equipmentProgress", JSON.stringify(progress));
  };

  const restartEquipmentQuiz = () => {
    const reshuffled = shuffleArray(equipmentQuestions);
    localStorage.removeItem("equipmentProgress");
    setShuffledEquipmentQuestions(reshuffled);
    setEquipmentIndex(0);
    setEquipmentScore(0);
    setEquipmentAnswers({});
    setEquipmentShowResult(false);
    setShowEquipmentMissedReview(false);
  };

  const missedQuestions = shuffledCbetQuestions.filter((q, index) => {
    const selected = cbetAnswers[index];
    return selected !== undefined && selected !== q.answer;
  });
  const harderCbetMissedQuestions = shuffledHarderCbetQuestions.filter((q, index) => {
    const selected = harderCbetAnswers[index];
    return selected !== undefined && selected !== q.answer;
  });
  const equipmentMissedQuestions = shuffledEquipmentQuestions.filter((q, index) => {
    const selected = equipmentAnswers[index];
    return selected !== undefined && selected !== q.answer;
  });
  const rnMissedQuestions = shuffledRnQuestions.filter((q, index) => {
    const selected = rnAnswers[index];
    return selected !== undefined && selected !== q.answer;
  });
  const teasMissedQuestions = shuffledTeasQuestions.filter((q, index) => {
    const selected = teasAnswers[index];
    return selected !== undefined && selected !== q.answer;
  });
  const cresMissedQuestions = shuffledCresQuestions.filter((q, index) => {
    const selected = cresAnswers[index];
    return selected !== undefined && selected !== q.answer;
  });
  const terminologyMissedQuestions = shuffledTerminologyQuestions.filter((q, index) => {
    const selected = terminologyAnswers[index];
    return selected !== undefined && selected !== q.answer;
  });

  const saveCresProgress = () => {
    const progress = {
      shuffledCresQuestions,
      cresIndex,
      cresScore,
      cresAnswers,
      cresShowResult,
      showCresMissedReview
    };
    localStorage.setItem("cresProgress", JSON.stringify(progress));
  };

  const restartCresExam = () => {
    const reshuffled = shuffleArray(cresQuestions);
    localStorage.removeItem("cresProgress");
    setShuffledCresQuestions(reshuffled);
    setCresIndex(0);
    setCresScore(0);
    setCresAnswers({});
    setCresShowResult(false);
    setShowCresMissedReview(false);
  };

  const saveTerminologyProgress = () => {
    const progress = {
      shuffledTerminologyQuestions,
      terminologyIndex,
      terminologyScore,
      terminologyAnswers,
      terminologyShowResult,
      showTerminologyMissedReview
    };
    localStorage.setItem("terminologyProgress", JSON.stringify(progress));
  };

  const restartTerminologyQuiz = () => {
    const reshuffled = shuffleArray(terminologyQuestions);
    localStorage.removeItem("terminologyProgress");
    setShuffledTerminologyQuestions(reshuffled);
    setTerminologyIndex(0);
    setTerminologyScore(0);
    setTerminologyAnswers({});
    setTerminologyShowResult(false);
    setShowTerminologyMissedReview(false);
  };

  const saveRnProgress = () => {
    const progress = {
      shuffledRnQuestions,
      rnIndex,
      rnScore,
      rnAnswers,
      rnShowResult,
      showRnMissedReview
    };
    localStorage.setItem("rnProgress", JSON.stringify(progress));
  };

  const resetRnExam = () => {
    const reshuffled = shuffleArray(rnQuestions);
    localStorage.removeItem("rnProgress");
    setShuffledRnQuestions(reshuffled);
    setRnIndex(0);
    setRnScore(0);
    setRnAnswers({});
    setRnShowResult(false);
    setShowRnMissedReview(false);
  };

  const restartRnExam = () => {
    const reshuffled = shuffleArray(rnQuestions);
    localStorage.removeItem("rnProgress");
    setShuffledRnQuestions(reshuffled);
    setRnIndex(0);
    setRnScore(0);
    setRnAnswers({});
    setRnShowResult(false);
    setShowRnMissedReview(false);
  };

  const saveTeasProgress = () => {
    const progress = {
      shuffledTeasQuestions,
      teasIndex,
      teasScore,
      teasAnswers,
      teasShowResult,
      showTeasMissedReview
    };
    localStorage.setItem("teasProgress", JSON.stringify(progress));
  };

  const resetTeasExam = () => {
    const reshuffled = shuffleArray(teasQuestions);
    localStorage.removeItem("teasProgress");
    setShuffledTeasQuestions(reshuffled);
    setTeasIndex(0);
    setTeasScore(0);
    setTeasAnswers({});
    setTeasShowResult(false);
    setShowTeasMissedReview(false);
  };

  const restartTeasExam = () => {
    resetTeasExam();
  };

  useEffect(() => {
    const savedRn = JSON.parse(localStorage.getItem("rnProgress"));
    if (savedRn) {
      setShuffledRnQuestions(savedRn.shuffledRnQuestions || shuffleArray(rnQuestions));
      setRnIndex(savedRn.rnIndex || 0);
      setRnScore(savedRn.rnScore || 0);
      setRnAnswers(savedRn.rnAnswers || {});
      setRnShowResult(savedRn.rnShowResult || false);
      setShowRnMissedReview(savedRn.showRnMissedReview || false);
    }
  }, []);

  const navButtonStyle = (isActive, isHovered) => ({
    padding: "10px 18px",
    borderRadius: 999,
    border: "none",
    background: isActive
      ? "linear-gradient(135deg, #12355b, #1d6fa5)"
      : isHovered
      ? "linear-gradient(135deg, #bfdbfe, #dbeafe)"
      : "linear-gradient(135deg, #dbeafe, #eff6ff)",
    color: isActive ? "white" : "#12355b",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: isHovered
      ? "0 8px 18px rgba(29,111,165,0.18)"
      : "0 4px 10px rgba(0,0,0,0.08)",
    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
    transition: "background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease"
  });

  const cbetStatCardStyle = {
    padding: "12px 16px",
    borderRadius: 10,
    background: "linear-gradient(135deg, #eef4ff, #ffffff)",
    border: "1px solid #d8e4f2",
    fontWeight: 700,
    color: "#12355b",
    textAlign: "center",
    minWidth: 120,
    boxShadow: "0 4px 10px rgba(0,0,0,0.04)"
  };

  const homeCardStyle = {
    background: "rgba(255,255,255,0.85)",
    borderRadius: 18,
    padding: 20,
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    minWidth: 220,
    flex: "1 1 220px",
    textAlign: "center",
    border: "1px solid transparent",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
  };

  const getInteractiveHomeCardStyle = (cardId) => {
    const isActive = hoveredHomeCard === cardId;

    return {
      ...homeCardStyle,
      cursor: "pointer",
      transform: isActive ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
      borderColor: isActive ? "#7fb7e8" : "transparent",
      boxShadow: isActive
        ? "0 14px 34px rgba(18,53,91,0.18), 0 0 0 4px rgba(88,180,216,0.16)"
        : homeCardStyle.boxShadow
    };
  };

  const handleHomeCardKeyDown = (event, action) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  const anatomyStudyCard =
    mode === "organs" && currentSet && currentSet.functionTitle ? (
      <div
        style={{
          marginBottom: 18,
          padding: isSmallScreen ? 18 : 22,
          borderRadius: 22,
          background:
            "linear-gradient(135deg, rgba(18,53,91,0.96), rgba(29,111,165,0.92), rgba(88,180,216,0.88))",
          color: "white",
          boxShadow: "0 14px 34px rgba(18,53,91,0.22)",
          overflow: "hidden",
          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 35%), radial-gradient(circle at bottom left, rgba(255,255,255,0.14), transparent 30%)",
            pointerEvents: "none"
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between"
          }}
        >
          <div style={{ flex: "1 1 320px", minWidth: 0 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 12px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.16)",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 0.6,
                textTransform: "uppercase"
              }}
            >
              Study Snapshot
            </div>

            <h3
              style={{
                margin: "14px 0 8px",
                fontSize: isSmallScreen ? 24 : 28,
                lineHeight: 1.15
              }}
            >
              {selectedSet}
            </h3>

            <div
              style={{
                fontSize: isSmallScreen ? 16 : 18,
                fontWeight: 700,
                color: "#e0f2fe",
                marginBottom: 10
              }}
            >
              {currentSet.functionTitle}
            </div>

            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.94)",
                maxWidth: 700
              }}
            >
              {currentSet.functionSummary}
            </p>
          </div>

          <div
            style={{
              flex: "0 1 250px",
              minWidth: isSmallScreen ? "100%" : 220,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 18,
              padding: 16,
              backdropFilter: "blur(4px)"
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                color: "#dbeafe",
                marginBottom: 10
              }}
            >
              Why It Matters
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {currentSet.studyHighlights.map((highlight) => (
                <div
                  key={highlight}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    fontSize: 14,
                    lineHeight: 1.4,
                    color: "white"
                  }}
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ) : null;

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const honeypotValue = (formData.get("_gotcha") || "").toString().trim();

    // Silently accept bot submissions caught by the honeypot.
    if (honeypotValue) {
      setContactStatus("success");
      form.reset();
      return;
    }

    setContactStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/xgonbzaj", {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("submit_failed");
      }

      setContactStatus("success");
      contactFormRef.current?.reset();
    } catch (error) {
      setContactStatus("error");
      setContactError("Message failed to send. Please try again.");
    }
  };

  const shareQuizResult = async (quizName, scoreValue, totalValue) => {
    const baseUrl =
      typeof window !== "undefined" ? window.location.origin : "https://medskillbuilder.com";
    const shareText = `I scored ${scoreValue}/${totalValue} on ${quizName} at MedSkillBuilder. Try it: ${baseUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${quizName} - MedSkillBuilder`,
          text: `I scored ${scoreValue}/${totalValue} on ${quizName} at MedSkillBuilder.`,
          url: baseUrl
        });
        return;
      } catch (error) {
        if (error?.name === "AbortError") {
          return;
        }
      }
    }

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareText);
        window.alert("Share text copied to clipboard.");
        return;
      } catch (error) {
        // Fall through to prompt when clipboard is unavailable.
      }
    }

    window.prompt("Copy and share this:", shareText);
  };

  const cbetPassed =
    shuffledCbetQuestions.length > 0 && cbetScore / shuffledCbetQuestions.length >= 0.7;

  const renderAdSlot = (slotId) => {
    if (!adsenseClient || !slotId) {
      return (
        <div
          style={{
            width: "100%",
            maxWidth: 980,
            margin: "0 auto",
            borderRadius: 14,
            border: "1px solid #d8e4f2",
            background: "rgba(255,255,255,0.75)",
            color: "#64748b",
            textAlign: "center",
            padding: "10px 12px",
            fontSize: 12
          }}
        >
          Ad space reserved
        </div>
      );
    }

    return (
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseClient}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    );
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
      height: "auto",
      filter: "drop-shadow(0 0 6px rgba(88, 180, 216, 0.55)) drop-shadow(0 0 16px rgba(29, 111, 165, 0.35))"
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
          Interactive anatomy, bone labeling, and practice modules for CBET, RN, TEAS, and Medical Terminology
        </p>
      </div>

      <div style={{ marginBottom: 16 }}>
        {renderAdSlot(topAdSlot)}
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
          onMouseEnter={() => setHoveredNavTab("Home")}
          onMouseLeave={() => setHoveredNavTab("")}
          style={navButtonStyle(activeTab === "Home", hoveredNavTab === "Home")}
        >
          Home
        </button>

        <button
          onClick={() => {
            setActiveTab("Anatomy");
            setMode("organs");
            setSelectedSet(null);
          }}
          onMouseEnter={() => setHoveredNavTab("Anatomy")}
          onMouseLeave={() => setHoveredNavTab("")}
          style={navButtonStyle(activeTab === "Anatomy", hoveredNavTab === "Anatomy")}
        >
          Anatomy
        </button>

        <button
          onClick={() => {
            setActiveTab("Bones");
            setMode("bones");
            setSelectedSet(null);
          }}
          onMouseEnter={() => setHoveredNavTab("Bones")}
          onMouseLeave={() => setHoveredNavTab("")}
          style={navButtonStyle(activeTab === "Bones", hoveredNavTab === "Bones")}
        >
          Bones
        </button>

        <button
          onClick={() => setActiveTab("Dashboard")}
          onMouseEnter={() => setHoveredNavTab("Dashboard")}
          onMouseLeave={() => setHoveredNavTab("")}
          style={navButtonStyle(activeTab === "Dashboard", hoveredNavTab === "Dashboard")}
        >
         Dashboard
        </button>

        <button
          onClick={() => setActiveTab("CBET")}
          onMouseEnter={() => setHoveredNavTab("CBET")}
          onMouseLeave={() => setHoveredNavTab("")}
          style={navButtonStyle(activeTab === "CBET", hoveredNavTab === "CBET")}
        >
          CBET Practice
        </button>

        <button
          onClick={() => {
            if (harderCbetUnlocked) {
              setActiveTab("HarderCBET");
            }
          }}
          title={
            harderCbetUnlocked
              ? "Harder CBET Questions"
              : "Pass CBET Practice with 70% to unlock"
          }
          onMouseEnter={() => setHoveredNavTab("HarderCBET")}
          onMouseLeave={() => setHoveredNavTab("")}
          style={{
            ...navButtonStyle(activeTab === "HarderCBET", hoveredNavTab === "HarderCBET"),
            opacity: harderCbetUnlocked ? 1 : 0.65,
            cursor: harderCbetUnlocked ? "pointer" : "not-allowed"
          }}
        >
          {harderCbetUnlocked ? "CBET Harder Questions" : "CBET Harder Questions (Locked)"}
        </button>

        <button
          onClick={() => setActiveTab("RN")}
          onMouseEnter={() => setHoveredNavTab("RN")}
          onMouseLeave={() => setHoveredNavTab("")}
          style={navButtonStyle(activeTab === "RN", hoveredNavTab === "RN")}
        >
          RN Practice
        </button>

        <button
          onClick={() => setActiveTab("TEAS")}
          onMouseEnter={() => setHoveredNavTab("TEAS")}
          onMouseLeave={() => setHoveredNavTab("")}
          style={navButtonStyle(activeTab === "TEAS", hoveredNavTab === "TEAS")}
        >
          TEAS Practice
        </button>

        <button
          onClick={() => setActiveTab("CRES")}
          onMouseEnter={() => setHoveredNavTab("CRES")}
          onMouseLeave={() => setHoveredNavTab("")}
          style={navButtonStyle(activeTab === "CRES", hoveredNavTab === "CRES")}
        >
          CRES Practice
        </button>

        <button
          onClick={() => setActiveTab("Terminology")}
          onMouseEnter={() => setHoveredNavTab("Terminology")}
          onMouseLeave={() => setHoveredNavTab("")}
          style={navButtonStyle(activeTab === "Terminology", hoveredNavTab === "Terminology")}
        >
          Medical Terminology
        </button>

        <button
          onClick={() => setActiveTab("Equipment")}
          onMouseEnter={() => setHoveredNavTab("Equipment")}
          onMouseLeave={() => setHoveredNavTab("")}
          style={navButtonStyle(activeTab === "Equipment", hoveredNavTab === "Equipment")}
        >
          Medical Equipment ID
        </button>

        <button
          onClick={() => setActiveTab("Contact")}
          onMouseEnter={() => setHoveredNavTab("Contact")}
          onMouseLeave={() => setHoveredNavTab("")}
          style={navButtonStyle(activeTab === "Contact", hoveredNavTab === "Contact")}
        >
          Contact
        </button>

        <button
          onClick={() => setActiveTab("Support")}
          onMouseEnter={() => setHoveredNavTab("Support")}
          onMouseLeave={() => setHoveredNavTab("")}
          style={navButtonStyle(activeTab === "Support", hoveredNavTab === "Support")}
        >
          Support Our Content
        </button>

        <button
          onClick={() => setActiveTab("Privacy")}
          onMouseEnter={() => setHoveredNavTab("Privacy")}
          onMouseLeave={() => setHoveredNavTab("")}
          style={navButtonStyle(activeTab === "Privacy", hoveredNavTab === "Privacy")}
        >
          Privacy
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
              Practice identifying organs and bones with interactive
              label-to-image activities, then build confidence with CBET,
              RN, TEAS, and Medical Terminology multiple-choice review.
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
              <div
                role="button"
                tabIndex={0}
                onMouseEnter={() => setHoveredHomeCard("anatomy")}
                onMouseLeave={() => setHoveredHomeCard("")}
                onFocus={() => setHoveredHomeCard("anatomy")}
                onBlur={() => setHoveredHomeCard("")}
                onClick={() => {
                  setActiveTab("Anatomy");
                  setMode("organs");
                  setSelectedSet(null);
                }}
                onKeyDown={(event) =>
                  handleHomeCardKeyDown(event, () => {
                    setActiveTab("Anatomy");
                    setMode("organs");
                    setSelectedSet(null);
                  })
                }
                style={getInteractiveHomeCardStyle("anatomy")}
              >
                <div style={{ fontSize: 42, marginBottom: 8 }}>🫀</div>
                <h3 style={{ color: "#12355b" }}>Anatomy Practice</h3>
                <p style={{ color: "#4f6275" }}>
                  Learn heart, brain, lungs, liver, eye, and arterial anatomy
                  with interactive labeling.
                </p>
              </div>

              <div
                role="button"
                tabIndex={0}
                onMouseEnter={() => setHoveredHomeCard("bones")}
                onMouseLeave={() => setHoveredHomeCard("")}
                onFocus={() => setHoveredHomeCard("bones")}
                onBlur={() => setHoveredHomeCard("")}
                onClick={() => {
                  setActiveTab("Bones");
                  setMode("bones");
                  setSelectedSet(null);
                }}
                onKeyDown={(event) =>
                  handleHomeCardKeyDown(event, () => {
                    setActiveTab("Bones");
                    setMode("bones");
                    setSelectedSet(null);
                  })
                }
                style={getInteractiveHomeCardStyle("bones")}
              >
                <div style={{ fontSize: 42, marginBottom: 8 }}>🦴</div>
                <h3 style={{ color: "#12355b" }}>Bone Practice</h3>
                <p style={{ color: "#4f6275" }}>
                  Study the skeleton, hand bones, and foot bones in detail.
                </p>
              </div>

              <div
                role="button"
                tabIndex={0}
                onMouseEnter={() => setHoveredHomeCard("cbet")}
                onMouseLeave={() => setHoveredHomeCard("")}
                onFocus={() => setHoveredHomeCard("cbet")}
                onBlur={() => setHoveredHomeCard("")}
                onClick={() => setActiveTab("CBET")}
                onKeyDown={(event) =>
                  handleHomeCardKeyDown(event, () => setActiveTab("CBET"))
                }
                style={getInteractiveHomeCardStyle("cbet")}
              >
                <div style={{ fontSize: 42, marginBottom: 8 }}>📝</div>
                <h3 style={{ color: "#12355b" }}>CBET Practice</h3>
                <p style={{ color: "#4f6275" }}>
                  Take CBET practice questions with instant feedback and score
                  tracking.
                </p>
              </div>

              <div
                role="button"
                tabIndex={0}
                onMouseEnter={() => setHoveredHomeCard("rn")}
                onMouseLeave={() => setHoveredHomeCard("")}
                onFocus={() => setHoveredHomeCard("rn")}
                onBlur={() => setHoveredHomeCard("")}
                onClick={() => setActiveTab("RN")}
                onKeyDown={(event) =>
                  handleHomeCardKeyDown(event, () => setActiveTab("RN"))
                }
                style={getInteractiveHomeCardStyle("rn")}
              >
                <div style={{ fontSize: 42, marginBottom: 8 }}>🩺</div>
                <h3 style={{ color: "#12355b" }}>RN Practice</h3>
                <p style={{ color: "#4f6275" }}>
                  Practice RN-style questions with immediate answer review and
                  score tracking.
                </p>
              </div>

              <div
                role="button"
                tabIndex={0}
                onMouseEnter={() => setHoveredHomeCard("teas")}
                onMouseLeave={() => setHoveredHomeCard("")}
                onFocus={() => setHoveredHomeCard("teas")}
                onBlur={() => setHoveredHomeCard("")}
                onClick={() => setActiveTab("TEAS")}
                onKeyDown={(event) =>
                  handleHomeCardKeyDown(event, () => setActiveTab("TEAS"))
                }
                style={getInteractiveHomeCardStyle("teas")}
              >
                <div style={{ fontSize: 42, marginBottom: 8 }}>📚</div>
                <h3 style={{ color: "#12355b" }}>TEAS Practice</h3>
                <p style={{ color: "#4f6275" }}>
                  Work through 150 randomized TEAS-style questions covering
                  reading, math, science, and English usage.
                </p>
              </div>

              <div
                role="button"
                tabIndex={0}
                onMouseEnter={() => setHoveredHomeCard("terminology")}
                onMouseLeave={() => setHoveredHomeCard("")}
                onFocus={() => setHoveredHomeCard("terminology")}
                onBlur={() => setHoveredHomeCard("")}
                onClick={() => setActiveTab("Terminology")}
                onKeyDown={(event) =>
                  handleHomeCardKeyDown(event, () => setActiveTab("Terminology"))
                }
                style={getInteractiveHomeCardStyle("terminology")}
              >
                <div style={{ fontSize: 42, marginBottom: 8 }}>🧠</div>
                <h3 style={{ color: "#12355b" }}>Medical Terminology</h3>
                <p style={{ color: "#4f6275" }}>
                  Master hard medical terms by matching each word to its correct definition.
                </p>
              </div>

              <div
                role="button"
                tabIndex={0}
                onMouseEnter={() => setHoveredHomeCard("dashboard")}
                onMouseLeave={() => setHoveredHomeCard("")}
                onFocus={() => setHoveredHomeCard("dashboard")}
                onBlur={() => setHoveredHomeCard("")}
                onClick={() => setActiveTab("Dashboard")}
                onKeyDown={(event) =>
                  handleHomeCardKeyDown(event, () => setActiveTab("Dashboard"))
                }
                style={getInteractiveHomeCardStyle("dashboard")}
              >
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
                  Pick a category, choose a body part set, tap/click a label,
                  then tap/click the matching zone on the image.
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
                  New modules are live: Liver, Eye, and Arterial System.
                  Use Retry to practice each set until perfect.
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
                <div style={{ fontWeight: 700, color: "#12355b" }}>TEAS Practice</div>
                <div style={{ fontSize: 24, marginTop: 8, color: "#1d6fa5" }}>
                  {teasScore} / {shuffledTeasQuestions.length}
                </div>
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, #eef4ff, #ffffff)",
                  border: "1px solid #d8e4f2",
                  borderRadius: 16,
                  padding: 16,
                  minWidth: 220,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                }}
              >
                <div style={{ fontWeight: 700, color: "#12355b" }}>Medical Terminology</div>
                <div style={{ fontSize: 24, marginTop: 8, color: "#1d6fa5" }}>
                  {terminologyScore} / {shuffledTerminologyQuestions.length}
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
               {anatomyStudyCard}
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
        overflow: "hidden",
        cursor: selectedLabel ? "crosshair" : "default"
      }}
      onClick={handleImageClick}
    >
      <img
  src={currentSet.image}
  alt={selectedSet}
  style={{
    ...currentSet.imageStyle,
    width: "100%",
    height: "100%",
    objectFit: "contain",
    objectPosition: "center center",
    transform:
      isSmallScreen || selectedSet === "Hand" || selectedSet === "Foot"
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
          : selectedSet === "Eye"
          ? "Eye Anatomy"
          : selectedSet}
      </div>

      {usesNumberedZones && currentSet.parts.map((part, idx) => (
        <div
          key={`num-${part.name}`}
          style={{
            position: "absolute",
            left: `${(part.x / currentSet.boardWidth) * 100}%`,
            top: `${(part.y / currentSet.boardHeight) * 100}%`,
            transform: feedback[part.name] === "wrong"
              ? "translate(-50%, -50%) scale(1.08)"
              : "translate(-50%, -50%)",
            width: "24px",
            height: "24px",
            background: placed[part.name] === "correct"
              ? "rgba(34, 197, 94, 0.85)"
              : feedback[part.name] === "wrong"
              ? "rgba(185, 28, 28, 0.92)"
              : "rgba(255, 0, 0, 0.7)",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: feedback[part.name] === "wrong" ? "14px" : "12px",
            fontWeight: "bold",
            border: placed[part.name] === "correct"
              ? "2px solid #166534"
              : feedback[part.name] === "wrong"
              ? "2px solid #fecaca"
              : "2px solid white",
            zIndex: 10,
            pointerEvents: "none",
            boxShadow: feedback[part.name] === "wrong"
              ? "0 0 0 4px rgba(239, 68, 68, 0.18)"
              : "none",
            transition: "transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease"
          }}
        >
          {feedback[part.name] === "wrong" ? "X" : idx + 1}
        </div>
      ))}

      {currentSet.parts.map((part) => {
  const isCorrect = placed[part.name] === "correct";
  const isWrong = feedback[part.name] === "wrong";
  const zoneDiameter = isSmallScreen ? 28 : 24;
  
  // Hide drop zones for numbered-zone sets.
  if (usesNumberedZones) {
    return null;
  }
  
  // Scale coordinates proportionally for Hand/Foot on mobile to fit actual viewport
  let partX = part.x;
  let partY = part.y;
  
  if (isSmallScreen && (selectedSet === "Hand" || selectedSet === "Foot")) {
    // Scale down coordinates proportionally since board height is larger on these
    const mobileWidthScale = 0.6; // Reduce width scaling
    const mobileHeightScale = 0.45; // Reduce height scaling more
    partX = (part.x * mobileWidthScale) + 125;
    partY = (part.y * mobileHeightScale) + 50;
  }

  return (
    <div
      key={part.name}
      onClick={() => handlePlacementAttempt(part)}
      style={{
        position: "absolute",
        left: `${(partX / currentSet.boardWidth) * 100}%`,
        top: `${(partY / currentSet.boardHeight) * 100}%`,
        width: `${(zoneDiameter / currentSet.boardWidth) * 100}%`,
        height: `${(zoneDiameter / currentSet.boardHeight) * 100}%`,
        transform: isWrong ? "translate(-50%, -50%) scale(1.08)" : "translate(-50%, -50%)",
        border: isCorrect
          ? "2px solid #166534"
          : isWrong
          ? "2px solid #fecaca"
          : "2px solid white",
        backgroundColor: isCorrect
          ? "rgba(34, 197, 94, 0.85)"
          : isWrong
          ? "rgba(185, 28, 28, 0.92)"
          : "rgba(255, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: isWrong ? "14px" : "12px",
        fontWeight: 700,
        textAlign: "center",
        borderRadius: "50%",
        color: "white",
        boxSizing: "border-box",
        overflow: "hidden",
        lineHeight: 1,
        cursor: "pointer",
        boxShadow: isWrong
          ? "0 0 0 4px rgba(239, 68, 68, 0.18)"
          : "none",
        transition: "transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease"
      }}
    >
      {isCorrect ? "✓" : isWrong ? "X" : ""}
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
      maxWidth: 340,
      flex: "1 1 280px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
    }}
  >
    {usesNumberedZones && (
      <div style={{ marginBottom: 14 }}>
        <button
          onClick={() => setShowZoneAnswers((prev) => !prev)}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #f59e0b",
            background: "linear-gradient(135deg, #fffbeb, #fef3c7)",
            color: "#92400e",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <span>{showZoneAnswers ? "Hide Zone Answers" : "Show Zone Answers"}</span>
          <span style={{ fontSize: 14 }}>{showZoneAnswers ? "▲" : "▼"}</span>
        </button>

        <div
          style={{
            maxHeight: showZoneAnswers ? "360px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.25s ease, opacity 0.2s ease",
            opacity: showZoneAnswers ? 1 : 0
          }}
        >
          <div
            style={{
              marginTop: 10,
              padding: 12,
              background: "#fff3cd",
              borderRadius: 8,
              border: "1px solid #ffc107"
            }}
          >
            <div style={{ fontWeight: 700, color: "#856404", marginBottom: 8, fontSize: 14 }}>
              Zone Answer Key:
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              {currentSet.parts.map((part, idx) => (
                <div key={`ref-${part.name}`} style={{ fontSize: 11, color: "#856404" }}>
                  <strong>{idx + 1}.</strong> {part.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}

    <div
      style={{
        background: "linear-gradient(135deg, #e0f2fe, #f0f9ff)",
        border: "1px solid #0ea5e9",
        borderRadius: 10,
        padding: "12px 14px",
        marginBottom: 14,
        fontSize: 13,
        fontWeight: 600,
        color: "#0c4a6e",
        textAlign: "center",
        lineHeight: 1.4
      }}
    >
      {usesNumberedZones
        ? isSmallScreen ? "👆 Tap zones to place labels" : "🖱️ Click zones to place labels"
        : isSmallScreen ? "👆 Tap a label, then tap the drop zone" : "🖱️ Click a label, then click the drop zone"}
    </div>

    {placementMessage.text && (
      <div
        style={{
          marginBottom: 14,
          padding: "10px 12px",
          borderRadius: 10,
          border: placementMessage.tone === "wrong" ? "1px solid #fca5a5" : "1px solid #93c5fd",
          background: placementMessage.tone === "wrong"
            ? "linear-gradient(135deg, #fff1f2, #ffe4e6)"
            : "linear-gradient(135deg, #eff6ff, #dbeafe)",
          color: placementMessage.tone === "wrong" ? "#b91c1c" : "#1d4ed8",
          fontSize: 13,
          fontWeight: 700,
          textAlign: "center",
          letterSpacing: 0.2,
          boxShadow: "0 6px 16px rgba(15, 23, 42, 0.08)"
        }}
      >
        {placementMessage.text}
      </div>
    )}

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
    {currentSet.parts.map((part) => {
  const isCorrect = placed[part.name] === "correct";
  const isSelected = selectedLabel === part.name;
  const isNumberedZoneSet = usesNumberedZones;
  const isHovered = hoveredPartName === part.name;

  return (
    <div
      key={part.name}
      onClick={() => {
        if (!isCorrect) {
          setSelectedLabel(isSelected ? "" : part.name);
        }
      }}
      onMouseEnter={() => setHoveredPartName(part.name)}
      onMouseLeave={() => setHoveredPartName("")}
      style={{
        padding: "8px 4px",
        border: isSelected ? "2px solid #2563eb" : "1px solid #334155",
        background: isCorrect ? "#d9f7d9" : isSelected ? "#dbeafe" : "#e2e8f0",
        color: "#5b4967",
        cursor: isCorrect ? "default" : "pointer",
        width: "100%",
        textAlign: "center",
        opacity: 1,
        borderRadius: 4,
        fontSize: 13,
        boxSizing: "border-box",
        boxShadow: isSelected ? "0 0 8px rgba(37, 99, 235, 0.5)" : isHovered ? "0 0 6px rgba(37, 99, 235, 0.3)" : "none",
        lineHeight: 1.2,
        transition: "box-shadow 0.2s ease"
      }}
    >
      {isCorrect 
        ? `✔ ${part.name}` 
        : isSelected && isSmallScreen
        ? `✓ ${part.name} - Tap image`
        : isSelected 
        ? `✓ ${part.name}`
        : part.name}
      {isHovered && part.description && (
        <div
          style={{
            marginTop: "6px",
            fontSize: "11px",
            fontStyle: "italic",
            color: "#475569",
            paddingTop: "4px",
            borderTop: "1px solid #cbd5e1",
            lineHeight: 1.3
          }}
        >
          {part.description}
        </div>
      )}
    </div>
  );
})}
    </div>

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
                  <h2 style={{ color: "#12355b", marginBottom: 8 }}>CBET Practice</h2>
                  <p style={{ color: "#4f6275", margin: 0 }}>
                    Questions are shuffled each restart. Select one answer. The correct
                    answer will highlight after you answer.
                  </p>
                  <p style={{ color: "#1d6fa5", margin: "8px 0 0 0", fontWeight: 700 }}>
                    Finish CBET Practice with a score of 70% or higher to unlock CBET Harder Questions.
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
                    Restart Practice
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
                    const isSelectedWrong =
                      isAnswered && i === selected && selected !== correct;

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
                          border:
                            isCorrectOption && isAnswered
                              ? "2px solid green"
                              : isSelectedWrong
                              ? "2px solid red"
                              : "1px solid #cbd5e1",
                          background:
                            isCorrectOption && isAnswered
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
                        cursor:
                          cbetAnswers[cbetIndex] === undefined
                            ? "not-allowed"
                            : "pointer",
                        opacity: cbetAnswers[cbetIndex] === undefined ? 0.6 : 1,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                      }}
                    >
                      {cbetIndex + 1 === shuffledCbetQuestions.length
                        ? "Finish Practice"
                        : "Next Question"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <h2 style={{ color: "#12355b" }}>CBET Practice Complete</h2>
                <p style={{ fontSize: 20, color: "#1e293b" }}>
                  Your score: {cbetScore} / {shuffledCbetQuestions.length}
                </p>

                <div
                  style={{
                    marginTop: 12,
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: cbetPassed ? "#dcfce7" : "#eff6ff",
                    border: cbetPassed ? "1px solid #22c55e" : "1px solid #bfdbfe",
                    color: cbetPassed ? "#166534" : "#1d4ed8",
                    fontWeight: 700,
                    maxWidth: 520,
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                >
                  {cbetPassed
                    ? "CBET Harder Questions unlocked."
                    : "Complete CBET Practice and score 70% or higher to unlock CBET Harder Questions."}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 12,
                    flexWrap: "wrap",
                    marginTop: 20
                  }}
                >
                  <button
                    onClick={() => setShowMissedReview(true)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Review Missed Questions
                  </button>

                  <button
                    onClick={() =>
                      shareQuizResult(
                        "CBET Practice",
                        cbetScore,
                        shuffledCbetQuestions.length
                      )
                    }
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Share Quiz
                  </button>

                  {harderCbetUnlocked && (
                    <button
                      onClick={() => setActiveTab("HarderCBET")}
                      style={{
                        padding: "12px 24px",
                        borderRadius: 999,
                        border: "none",
                        background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                        color: "white",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      Go to CBET Harder Questions
                    </button>
                  )}

                  <button
                    onClick={restartCbetExam}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #dc2626, #ef4444)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Restart Practice
                  </button>
                </div>
              </div>
            )}

            {showMissedReview && (
              <div style={{ marginTop: 24 }}>
                <h2 style={{ color: "#12355b", textAlign: "center" }}>
                  Missed Questions Review
                </h2>

                {missedQuestions.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#1e293b" }}>
                    You did not miss any questions.
                  </p>
                ) : (
                  missedQuestions.map((q, idx) => {
                    const originalIndex = shuffledCbetQuestions.findIndex(
                      (item) => item.question === q.question
                    );
                    const selected = cbetAnswers[originalIndex];

                    return (
                      <div
                        key={idx}
                        style={{
                          background: "#fff",
                          border: "1px solid #d8e4f2",
                          borderRadius: 16,
                          padding: 20,
                          marginBottom: 16,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            color: "#12355b",
                            marginBottom: 12,
                            fontSize: 18
                          }}
                        >
                          {q.question}
                        </div>

                        {q.options.map((opt, i) => (
                          <div
                            key={i}
                            style={{
                              padding: "10px 12px",
                              marginBottom: 8,
                              borderRadius: 10,
                              background:
                                i === q.answer
                                  ? "#d9f7d9"
                                  : i === selected
                                  ? "#fee2e2"
                                  : "#f8fafc",
                              border:
                                i === q.answer
                                  ? "2px solid green"
                                  : i === selected
                                  ? "2px solid red"
                                  : "1px solid #cbd5e1"
                            }}
                          >
                            {String.fromCharCode(65 + i)}. {opt}
                          </div>
                        ))}
                      </div>
                    );
                  })
                )}

                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <button
                    onClick={() => setShowMissedReview(false)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Back to Results
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "HarderCBET" && (
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
            {!harderCbetUnlocked ? (
              <div style={{ textAlign: "center" }}>
                <h2 style={{ color: "#12355b", marginBottom: 8 }}>CBET Harder Questions</h2>
                <p style={{ color: "#4f6275", marginBottom: 16 }}>
                  To unlock this tab, complete CBET Practice and score at least 70% on the regular question set.
                </p>
                <button
                  onClick={() => setActiveTab("CBET")}
                  style={{
                    padding: "12px 24px",
                    borderRadius: 999,
                    border: "none",
                    background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                    color: "white",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Go to CBET Practice
                </button>
              </div>
            ) : !harderCbetShowResult && !showHarderCbetMissedReview ? (
              <>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <h2 style={{ color: "#12355b", marginBottom: 8 }}>CBET Harder Questions</h2>
                  <p style={{ color: "#4f6275", margin: 0 }}>
                    Advanced CBET-style troubleshooting and safety scenarios. Questions are shuffled
                    each restart.
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
                    Question {harderCbetIndex + 1} / {shuffledHarderCbetQuestions.length}
                  </div>
                  <div style={cbetStatCardStyle}>
                    Score: {harderCbetScore}
                  </div>
                  <div style={cbetStatCardStyle}>
                    Advanced Tier
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
                    onClick={saveHarderCbetProgress}
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
                    onClick={restartHarderCbetExam}
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
                    Restart Practice
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
                    {shuffledHarderCbetQuestions[harderCbetIndex].question}
                  </div>

                  {shuffledHarderCbetQuestions[harderCbetIndex].options.map((opt, i) => {
                    const selected = harderCbetAnswers[harderCbetIndex];
                    const correct = shuffledHarderCbetQuestions[harderCbetIndex].answer;
                    const isAnswered = selected !== undefined;
                    const isCorrectOption = i === correct;
                    const isSelectedWrong =
                      isAnswered && i === selected && selected !== correct;

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (isAnswered) return;

                          setHarderCbetAnswers((prev) => ({
                            ...prev,
                            [harderCbetIndex]: i
                          }));

                          if (i === correct) {
                            setHarderCbetScore((prev) => prev + 1);
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
                          border:
                            isCorrectOption && isAnswered
                              ? "2px solid green"
                              : isSelectedWrong
                              ? "2px solid red"
                              : "1px solid #cbd5e1",
                          background:
                            isCorrectOption && isAnswered
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
                        if (harderCbetAnswers[harderCbetIndex] === undefined) return;

                        if (harderCbetIndex + 1 === shuffledHarderCbetQuestions.length) {
                          setHarderCbetShowResult(true);
                        } else {
                          setHarderCbetIndex((prev) => prev + 1);
                        }
                      }}
                      style={{
                        padding: "12px 24px",
                        borderRadius: 999,
                        border: "none",
                        background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                        color: "white",
                        fontWeight: 700,
                        cursor:
                          harderCbetAnswers[harderCbetIndex] === undefined
                            ? "not-allowed"
                            : "pointer",
                        opacity: harderCbetAnswers[harderCbetIndex] === undefined ? 0.6 : 1,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                      }}
                    >
                      {harderCbetIndex + 1 === shuffledHarderCbetQuestions.length
                        ? "Finish Practice"
                        : "Next Question"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <h2 style={{ color: "#12355b" }}>CBET Harder Questions Complete</h2>
                <p style={{ fontSize: 20, color: "#1e293b" }}>
                  Your score: {harderCbetScore} / {shuffledHarderCbetQuestions.length}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 12,
                    flexWrap: "wrap",
                    marginTop: 20
                  }}
                >
                  <button
                    onClick={() => setShowHarderCbetMissedReview(true)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Review Missed Questions
                  </button>

                  <button
                    onClick={() =>
                      shareQuizResult(
                        "CBET Harder Questions",
                        harderCbetScore,
                        shuffledHarderCbetQuestions.length
                      )
                    }
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Share Quiz
                  </button>

                  <button
                    onClick={restartHarderCbetExam}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #dc2626, #ef4444)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Restart Practice
                  </button>
                </div>
              </div>
            )}

            {showHarderCbetMissedReview && (
              <div style={{ marginTop: 24 }}>
                <h2 style={{ color: "#12355b", textAlign: "center" }}>
                  Missed Questions Review
                </h2>

                {harderCbetMissedQuestions.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#1e293b" }}>
                    You did not miss any questions.
                  </p>
                ) : (
                  harderCbetMissedQuestions.map((q, idx) => {
                    const originalIndex = shuffledHarderCbetQuestions.findIndex(
                      (item) => item.question === q.question
                    );
                    const selected = harderCbetAnswers[originalIndex];

                    return (
                      <div
                        key={idx}
                        style={{
                          background: "#fff",
                          border: "1px solid #d8e4f2",
                          borderRadius: 16,
                          padding: 20,
                          marginBottom: 16,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            color: "#12355b",
                            marginBottom: 12,
                            fontSize: 18
                          }}
                        >
                          {q.question}
                        </div>

                        {q.options.map((opt, i) => (
                          <div
                            key={i}
                            style={{
                              padding: "10px 12px",
                              marginBottom: 8,
                              borderRadius: 10,
                              background:
                                i === q.answer
                                  ? "#d9f7d9"
                                  : i === selected
                                  ? "#fee2e2"
                                  : "#f8fafc",
                              border:
                                i === q.answer
                                  ? "2px solid green"
                                  : i === selected
                                  ? "2px solid red"
                                  : "1px solid #cbd5e1"
                            }}
                          >
                            {String.fromCharCode(65 + i)}. {opt}
                          </div>
                        ))}
                      </div>
                    );
                  })
                )}

                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <button
                    onClick={() => setShowHarderCbetMissedReview(false)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Back to Results
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "Equipment" && (
          <div
            style={{
              background: "rgba(255,255,255,0.9)",
              borderRadius: 24,
              padding: 28,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              maxWidth: 960,
              margin: "0 auto"
            }}
          >
            {!equipmentShowResult && !showEquipmentMissedReview ? (
              <>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <h2 style={{ color: "#12355b", marginBottom: 8 }}>Medical Equipment ID</h2>
                  <p style={{ color: "#4f6275", margin: 0 }}>
                    Identify each device from the image and choose the best answer.
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
                    Question {equipmentIndex + 1} / {shuffledEquipmentQuestions.length}
                  </div>
                  <div style={cbetStatCardStyle}>
                    Score: {equipmentScore}
                  </div>
                  <div style={cbetStatCardStyle}>
                    Visual Recognition
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
                    onClick={saveEquipmentProgress}
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
                    onClick={restartEquipmentQuiz}
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
                    Restart Practice
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
                      background: "#fff",
                      border: "1px solid #d8e4f2",
                      borderRadius: 14,
                      padding: 12,
                      marginBottom: 16,
                      textAlign: "center"
                    }}
                  >
                    <img
                      src={shuffledEquipmentQuestions[equipmentIndex].image}
                      alt="Medical equipment"
                      style={{
                        width: "100%",
                        maxHeight: 320,
                        objectFit: "contain",
                        borderRadius: 10
                      }}
                    />
                  </div>

                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#12355b",
                      marginBottom: 18,
                      textAlign: "center"
                    }}
                  >
                    {shuffledEquipmentQuestions[equipmentIndex].question}
                  </div>

                  {shuffledEquipmentQuestions[equipmentIndex].options.map((opt, i) => {
                    const selected = equipmentAnswers[equipmentIndex];
                    const correct = shuffledEquipmentQuestions[equipmentIndex].answer;
                    const isAnswered = selected !== undefined;
                    const isCorrectOption = i === correct;
                    const isSelectedWrong =
                      isAnswered && i === selected && selected !== correct;

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (isAnswered) return;

                          setEquipmentAnswers((prev) => ({ ...prev, [equipmentIndex]: i }));

                          if (i === correct) {
                            setEquipmentScore((prev) => prev + 1);
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
                          border:
                            isCorrectOption && isAnswered
                              ? "2px solid green"
                              : isSelectedWrong
                              ? "2px solid red"
                              : "1px solid #cbd5e1",
                          background:
                            isCorrectOption && isAnswered
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

                  {equipmentAnswers[equipmentIndex] !== undefined && (
                    <div
                      style={{
                        marginTop: 8,
                        marginBottom: 8,
                        padding: "10px 12px",
                        borderRadius: 10,
                        background: "#eff6ff",
                        border: "1px solid #bfdbfe",
                        color: "#1e3a8a",
                        fontWeight: 600
                      }}
                    >
                      Tip: {shuffledEquipmentQuestions[equipmentIndex].studyTip}
                    </div>
                  )}

                  <div style={{ textAlign: "center", marginTop: 20 }}>
                    <button
                      onClick={() => {
                        if (equipmentAnswers[equipmentIndex] === undefined) return;

                        if (equipmentIndex + 1 === shuffledEquipmentQuestions.length) {
                          setEquipmentShowResult(true);
                        } else {
                          setEquipmentIndex((prev) => prev + 1);
                        }
                      }}
                      style={{
                        padding: "12px 24px",
                        borderRadius: 999,
                        border: "none",
                        background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                        color: "white",
                        fontWeight: 700,
                        cursor:
                          equipmentAnswers[equipmentIndex] === undefined
                            ? "not-allowed"
                            : "pointer",
                        opacity: equipmentAnswers[equipmentIndex] === undefined ? 0.6 : 1,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                      }}
                    >
                      {equipmentIndex + 1 === shuffledEquipmentQuestions.length
                        ? "Finish Practice"
                        : "Next Question"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <h2 style={{ color: "#12355b" }}>Medical Equipment ID Complete</h2>
                <p style={{ fontSize: 20, color: "#1e293b" }}>
                  Your score: {equipmentScore} / {shuffledEquipmentQuestions.length}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 12,
                    flexWrap: "wrap",
                    marginTop: 20
                  }}
                >
                  <button
                    onClick={() => setShowEquipmentMissedReview(true)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Review Missed Questions
                  </button>

                  <button
                    onClick={() =>
                      shareQuizResult(
                        "Medical Equipment ID",
                        equipmentScore,
                        shuffledEquipmentQuestions.length
                      )
                    }
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Share Quiz
                  </button>

                  <button
                    onClick={restartEquipmentQuiz}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #dc2626, #ef4444)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Restart Practice
                  </button>
                </div>
              </div>
            )}

            {showEquipmentMissedReview && (
              <div style={{ marginTop: 24 }}>
                <h2 style={{ color: "#12355b", textAlign: "center" }}>
                  Missed Questions Review
                </h2>

                {equipmentMissedQuestions.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#1e293b" }}>
                    You did not miss any questions.
                  </p>
                ) : (
                  equipmentMissedQuestions.map((q, idx) => {
                    const originalIndex = shuffledEquipmentQuestions.findIndex(
                      (item) => item.question === q.question && item.image === q.image
                    );
                    const selected = equipmentAnswers[originalIndex];

                    return (
                      <div
                        key={idx}
                        style={{
                          background: "#fff",
                          border: "1px solid #d8e4f2",
                          borderRadius: 16,
                          padding: 20,
                          marginBottom: 16,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                        }}
                      >
                        <img
                          src={q.image}
                          alt="Medical equipment review"
                          style={{
                            width: "100%",
                            maxHeight: 220,
                            objectFit: "contain",
                            borderRadius: 10,
                            border: "1px solid #e2e8f0",
                            marginBottom: 12
                          }}
                        />

                        <div
                          style={{
                            fontWeight: 700,
                            color: "#12355b",
                            marginBottom: 12,
                            fontSize: 18
                          }}
                        >
                          {q.question}
                        </div>

                        {q.options.map((opt, i) => (
                          <div
                            key={i}
                            style={{
                              padding: "10px 12px",
                              marginBottom: 8,
                              borderRadius: 10,
                              background:
                                i === q.answer
                                  ? "#d9f7d9"
                                  : i === selected
                                  ? "#fee2e2"
                                  : "#f8fafc",
                              border:
                                i === q.answer
                                  ? "2px solid green"
                                  : i === selected
                                  ? "2px solid red"
                                  : "1px solid #cbd5e1"
                            }}
                          >
                            {String.fromCharCode(65 + i)}. {opt}
                          </div>
                        ))}

                        <div
                          style={{
                            marginTop: 8,
                            padding: "10px 12px",
                            borderRadius: 10,
                            background: "#eff6ff",
                            border: "1px solid #bfdbfe",
                            color: "#1e3a8a",
                            fontWeight: 600
                          }}
                        >
                          Tip: {q.studyTip}
                        </div>
                      </div>
                    );
                  })
                )}

                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <button
                    onClick={() => setShowEquipmentMissedReview(false)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Back to Results
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "RN" && (
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
            {!rnShowResult && !showRnMissedReview ? (
              <>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <h2 style={{ color: "#12355b", marginBottom: 8 }}>RN Practice</h2>
                  <p style={{ color: "#4f6275", margin: 0 }}>
                    Select one answer. The correct answer will highlight after you answer.
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
                    Question {rnIndex + 1} / {shuffledRnQuestions.length}
                  </div>
                  <div style={cbetStatCardStyle}>
                    Score: {rnScore}
                  </div>
                  <div style={cbetStatCardStyle}>
                    Passing: 70%
                  </div>
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
                    {shuffledRnQuestions[rnIndex].question}
                  </div>

                  {shuffledRnQuestions[rnIndex].options.map((opt, i) => {
                    const selected = rnAnswers[rnIndex];
                    const correct = shuffledRnQuestions[rnIndex].answer;
                    const isAnswered = selected !== undefined;
                    const isCorrectOption = i === correct;
                    const isSelectedWrong =
                      isAnswered && i === selected && selected !== correct;

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (isAnswered) return;

                          setRnAnswers((prev) => ({ ...prev, [rnIndex]: i }));

                          if (i === correct) {
                            setRnScore((prev) => prev + 1);
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
                          border:
                            isCorrectOption && isAnswered
                              ? "2px solid green"
                              : isSelectedWrong
                              ? "2px solid red"
                              : "1px solid #cbd5e1",
                          background:
                            isCorrectOption && isAnswered
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
                        if (rnAnswers[rnIndex] === undefined) return;

                        if (rnIndex + 1 === shuffledRnQuestions.length) {
                          setRnShowResult(true);
                        } else {
                          setRnIndex((prev) => prev + 1);
                        }
                      }}
                      style={{
                        padding: "12px 24px",
                        borderRadius: 999,
                        border: "none",
                        background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                        color: "white",
                        fontWeight: 700,
                        cursor:
                          rnAnswers[rnIndex] === undefined
                            ? "not-allowed"
                            : "pointer",
                        opacity: rnAnswers[rnIndex] === undefined ? 0.6 : 1,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                      }}
                    >
                      {rnIndex + 1 === shuffledRnQuestions.length
                        ? "Finish Practice"
                        : "Next Question"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <h2 style={{ color: "#12355b" }}>RN Practice Complete</h2>
                <p style={{ fontSize: 20, color: "#1e293b" }}>
                  Your score: {rnScore} / {shuffledRnQuestions.length}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 12,
                    flexWrap: "wrap",
                    marginTop: 20
                  }}
                >
                  <button
                    onClick={() => setShowRnMissedReview(true)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Review Missed Questions
                  </button>

                  <button
                    onClick={() =>
                      shareQuizResult(
                        "RN Practice",
                        rnScore,
                        shuffledRnQuestions.length
                      )
                    }
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Share Quiz
                  </button>

                  <button
                    onClick={() => {
                      setShuffledRnQuestions(shuffleArray(rnQuestions));
                      setRnIndex(0);
                      setRnScore(0);
                      setRnAnswers({});
                      setRnShowResult(false);
                      setShowRnMissedReview(false);
                    }}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #dc2626, #ef4444)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Restart Practice
                  </button>
                </div>
              </div>
            )}

            {showRnMissedReview && (
              <div style={{ marginTop: 24 }}>
                <h2 style={{ color: "#12355b", textAlign: "center" }}>
                  RN Missed Questions Review
                </h2>

                {shuffledRnQuestions.filter((q, index) => {
                  const selected = rnAnswers[index];
                  return selected !== undefined && selected !== q.answer;
                }).length === 0 ? (
                  <p style={{ textAlign: "center", color: "#1e293b" }}>
                    You did not miss any questions.
                  </p>
                ) : (
                  shuffledRnQuestions
                    .filter((q, index) => {
                      const selected = rnAnswers[index];
                      return selected !== undefined && selected !== q.answer;
                    })
                    .map((q, idx) => {
                      const originalIndex = shuffledRnQuestions.findIndex(
                        (item) => item.question === q.question
                      );
                      const selected = rnAnswers[originalIndex];

                      return (
                        <div
                          key={idx}
                          style={{
                            background: "#fff",
                            border: "1px solid #d8e4f2",
                            borderRadius: 16,
                            padding: 20,
                            marginBottom: 16,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                          }}
                        >
                          <div
                            style={{
                              fontWeight: 700,
                              color: "#12355b",
                              marginBottom: 12,
                              fontSize: 18
                            }}
                          >
                            {q.question}
                          </div>

                          {q.options.map((opt, i) => (
                            <div
                              key={i}
                              style={{
                                padding: "10px 12px",
                                marginBottom: 8,
                                borderRadius: 10,
                                background:
                                  i === q.answer
                                    ? "#d9f7d9"
                                    : i === selected
                                    ? "#fee2e2"
                                    : "#f8fafc",
                                border:
                                  i === q.answer
                                    ? "2px solid green"
                                    : i === selected
                                    ? "2px solid red"
                                    : "1px solid #cbd5e1"
                              }}
                            >
                              {String.fromCharCode(65 + i)}. {opt}
                            </div>
                          ))}
                        </div>
                      );
                    })
                )}

                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <button
                    onClick={() => setShowRnMissedReview(false)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Back to Results
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "TEAS" && (
          <div
            style={{
              background: "rgba(255,255,255,0.9)",
              borderRadius: 24,
              padding: 28,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              maxWidth: 980,
              margin: "0 auto"
            }}
          >
            {!teasShowResult && !showTeasMissedReview ? (
              <>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <h2 style={{ color: "#12355b", marginBottom: 8 }}>
                    TEAS Practice
                  </h2>
                  <p style={{ color: "#4f6275", margin: 0, maxWidth: 760, marginInline: "auto" }}>
                    This bank includes 150 randomized TEAS-style questions across
                    reading, math, science, and English language usage. Select one
                    answer, then move to the next question after reviewing the result.
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
                    Question {teasIndex + 1} / {shuffledTeasQuestions.length}
                  </div>
                  <div style={cbetStatCardStyle}>Score: {teasScore}</div>
                  <div style={cbetStatCardStyle}>Questions: 150</div>
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
                    onClick={saveTeasProgress}
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
                    onClick={restartTeasExam}
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
                    Restart Practice
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
                    {shuffledTeasQuestions[teasIndex].question}
                  </div>

                  {shuffledTeasQuestions[teasIndex].options.map((opt, i) => {
                    const selected = teasAnswers[teasIndex];
                    const correct = shuffledTeasQuestions[teasIndex].answer;
                    const isAnswered = selected !== undefined;
                    const isCorrectOption = i === correct;
                    const isSelectedWrong =
                      isAnswered && i === selected && selected !== correct;

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (isAnswered) return;

                          setTeasAnswers((prev) => ({ ...prev, [teasIndex]: i }));

                          if (i === correct) {
                            setTeasScore((prev) => prev + 1);
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
                          border:
                            isCorrectOption && isAnswered
                              ? "2px solid green"
                              : isSelectedWrong
                              ? "2px solid red"
                              : "1px solid #cbd5e1",
                          background:
                            isCorrectOption && isAnswered
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
                        if (teasAnswers[teasIndex] === undefined) return;

                        if (teasIndex + 1 === shuffledTeasQuestions.length) {
                          setTeasShowResult(true);
                        } else {
                          setTeasIndex((prev) => prev + 1);
                        }
                      }}
                      style={{
                        padding: "12px 24px",
                        borderRadius: 999,
                        border: "none",
                        background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                        color: "white",
                        fontWeight: 700,
                        cursor:
                          teasAnswers[teasIndex] === undefined
                            ? "not-allowed"
                            : "pointer",
                        opacity: teasAnswers[teasIndex] === undefined ? 0.6 : 1,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                      }}
                    >
                      {teasIndex + 1 === shuffledTeasQuestions.length
                        ? "Finish Practice"
                        : "Next Question"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <h2 style={{ color: "#12355b" }}>TEAS Practice Complete</h2>
                <p style={{ fontSize: 20, color: "#1e293b" }}>
                  Your score: {teasScore} / {shuffledTeasQuestions.length}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 12,
                    flexWrap: "wrap",
                    marginTop: 20
                  }}
                >
                  <button
                    onClick={() => setShowTeasMissedReview(true)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Review Missed Questions
                  </button>

                  <button
                    onClick={() =>
                      shareQuizResult(
                        "TEAS Practice",
                        teasScore,
                        shuffledTeasQuestions.length
                      )
                    }
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Share Quiz
                  </button>

                  <button
                    onClick={restartTeasExam}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #dc2626, #ef4444)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Restart Practice
                  </button>
                </div>
              </div>
            )}

            {showTeasMissedReview && (
              <div style={{ marginTop: 24 }}>
                <h2 style={{ color: "#12355b", textAlign: "center" }}>
                  TEAS Missed Questions Review
                </h2>

                {teasMissedQuestions.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#1e293b" }}>
                    You did not miss any questions.
                  </p>
                ) : (
                  teasMissedQuestions.map((q, idx) => {
                    const originalIndex = shuffledTeasQuestions.findIndex(
                      (item) => item.question === q.question
                    );
                    const selected = teasAnswers[originalIndex];

                    return (
                      <div
                        key={idx}
                        style={{
                          background: "#fff",
                          border: "1px solid #d8e4f2",
                          borderRadius: 16,
                          padding: 20,
                          marginBottom: 16,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            color: "#12355b",
                            marginBottom: 12,
                            fontSize: 18
                          }}
                        >
                          {q.question}
                        </div>

                        {q.options.map((opt, i) => (
                          <div
                            key={i}
                            style={{
                              padding: "10px 12px",
                              marginBottom: 8,
                              borderRadius: 10,
                              background:
                                i === q.answer
                                  ? "#d9f7d9"
                                  : i === selected
                                  ? "#fee2e2"
                                  : "#f8fafc",
                              border:
                                i === q.answer
                                  ? "2px solid green"
                                  : i === selected
                                  ? "2px solid red"
                                  : "1px solid #cbd5e1"
                            }}
                          >
                            {String.fromCharCode(65 + i)}. {opt}
                          </div>
                        ))}
                      </div>
                    );
                  })
                )}

                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <button
                    onClick={() => setShowTeasMissedReview(false)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Back to Results
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "CRES" && (
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
            {!cresShowResult && !showCresMissedReview ? (
              <>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <h2 style={{ color: "#12355b", marginBottom: 8 }}>CRES Practice</h2>
                  <p style={{ color: "#4f6275", margin: 0 }}>
                    Certified Radiology Equipment Specialist — questions are shuffled each restart.
                    Select one answer. The correct answer will highlight after you answer.
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
                    Question {cresIndex + 1} / {shuffledCresQuestions.length}
                  </div>
                  <div style={cbetStatCardStyle}>
                    Score: {cresScore}
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
                    onClick={saveCresProgress}
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
                    onClick={restartCresExam}
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
                    Restart Practice
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
                    {shuffledCresQuestions[cresIndex].question}
                  </div>

                  {shuffledCresQuestions[cresIndex].options.map((opt, i) => {
                    const selected = cresAnswers[cresIndex];
                    const correct = shuffledCresQuestions[cresIndex].answer;
                    const isAnswered = selected !== undefined;
                    const isCorrectOption = i === correct;
                    const isSelectedWrong =
                      isAnswered && i === selected && selected !== correct;

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (isAnswered) return;
                          setCresAnswers((prev) => ({ ...prev, [cresIndex]: i }));
                          if (i === correct) {
                            setCresScore((prev) => prev + 1);
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
                          border:
                            isCorrectOption && isAnswered
                              ? "2px solid green"
                              : isSelectedWrong
                              ? "2px solid red"
                              : "1px solid #cbd5e1",
                          background:
                            isCorrectOption && isAnswered
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
                        if (cresAnswers[cresIndex] === undefined) return;
                        if (cresIndex + 1 === shuffledCresQuestions.length) {
                          setCresShowResult(true);
                        } else {
                          setCresIndex((prev) => prev + 1);
                        }
                      }}
                      style={{
                        padding: "12px 24px",
                        borderRadius: 999,
                        border: "none",
                        background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                        color: "white",
                        fontWeight: 700,
                        cursor:
                          cresAnswers[cresIndex] === undefined ? "not-allowed" : "pointer",
                        opacity: cresAnswers[cresIndex] === undefined ? 0.6 : 1,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                      }}
                    >
                      {cresIndex + 1 === shuffledCresQuestions.length
                        ? "Finish Practice"
                        : "Next Question"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <h2 style={{ color: "#12355b" }}>CRES Practice Complete</h2>
                <p style={{ fontSize: 20, color: "#1e293b" }}>
                  Your score: {cresScore} / {shuffledCresQuestions.length}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 12,
                    flexWrap: "wrap",
                    marginTop: 20
                  }}
                >
                  <button
                    onClick={() => setShowCresMissedReview(true)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Review Missed Questions
                  </button>

                  <button
                    onClick={() =>
                      shareQuizResult(
                        "CRES Practice",
                        cresScore,
                        shuffledCresQuestions.length
                      )
                    }
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Share Quiz
                  </button>

                  <button
                    onClick={restartCresExam}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #dc2626, #ef4444)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Restart Practice
                  </button>
                </div>
              </div>
            )}

            {showCresMissedReview && (
              <div style={{ marginTop: 24 }}>
                <h2 style={{ color: "#12355b", textAlign: "center" }}>
                  Missed Questions Review
                </h2>

                {cresMissedQuestions.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#1e293b" }}>
                    You did not miss any questions.
                  </p>
                ) : (
                  cresMissedQuestions.map((q, idx) => {
                    const originalIndex = shuffledCresQuestions.findIndex(
                      (item) => item.question === q.question
                    );
                    const selected = cresAnswers[originalIndex];

                    return (
                      <div
                        key={idx}
                        style={{
                          background: "#fff",
                          border: "1px solid #d8e4f2",
                          borderRadius: 16,
                          padding: 20,
                          marginBottom: 16,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            color: "#12355b",
                            marginBottom: 12,
                            fontSize: 18
                          }}
                        >
                          {q.question}
                        </div>

                        {q.options.map((opt, i) => (
                          <div
                            key={i}
                            style={{
                              padding: "10px 12px",
                              marginBottom: 8,
                              borderRadius: 10,
                              background:
                                i === q.answer
                                  ? "#d9f7d9"
                                  : i === selected
                                  ? "#fee2e2"
                                  : "#f8fafc",
                              border:
                                i === q.answer
                                  ? "2px solid green"
                                  : i === selected
                                  ? "2px solid red"
                                  : "1px solid #cbd5e1"
                            }}
                          >
                            {String.fromCharCode(65 + i)}. {opt}
                          </div>
                        ))}
                      </div>
                    );
                  })
                )}

                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <button
                    onClick={() => setShowCresMissedReview(false)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Back to Results
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "Terminology" && (
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
            {!terminologyShowResult && !showTerminologyMissedReview ? (
              <>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <h2 style={{ color: "#12355b", marginBottom: 8 }}>Medical Terminology Practice</h2>
                  <p style={{ color: "#4f6275", margin: 0 }}>
                    Hard terminology drill. Each question shows a medical term, and you select the
                    best definition from multiple choices.
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
                    Question {terminologyIndex + 1} / {shuffledTerminologyQuestions.length}
                  </div>
                  <div style={cbetStatCardStyle}>
                    Score: {terminologyScore}
                  </div>
                  <div style={cbetStatCardStyle}>
                    Difficulty: Hard
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
                    onClick={saveTerminologyProgress}
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
                    onClick={restartTerminologyQuiz}
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
                    Restart Practice
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
                    {shuffledTerminologyQuestions[terminologyIndex].question}
                  </div>

                  {shuffledTerminologyQuestions[terminologyIndex].options.map((opt, i) => {
                    const selected = terminologyAnswers[terminologyIndex];
                    const correct = shuffledTerminologyQuestions[terminologyIndex].answer;
                    const isAnswered = selected !== undefined;
                    const isCorrectOption = i === correct;
                    const isSelectedWrong =
                      isAnswered && i === selected && selected !== correct;

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (isAnswered) return;
                          setTerminologyAnswers((prev) => ({ ...prev, [terminologyIndex]: i }));
                          if (i === correct) {
                            setTerminologyScore((prev) => prev + 1);
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
                          border:
                            isCorrectOption && isAnswered
                              ? "2px solid green"
                              : isSelectedWrong
                              ? "2px solid red"
                              : "1px solid #cbd5e1",
                          background:
                            isCorrectOption && isAnswered
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
                        if (terminologyAnswers[terminologyIndex] === undefined) return;
                        if (terminologyIndex + 1 === shuffledTerminologyQuestions.length) {
                          setTerminologyShowResult(true);
                        } else {
                          setTerminologyIndex((prev) => prev + 1);
                        }
                      }}
                      style={{
                        padding: "12px 24px",
                        borderRadius: 999,
                        border: "none",
                        background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                        color: "white",
                        fontWeight: 700,
                        cursor:
                          terminologyAnswers[terminologyIndex] === undefined
                            ? "not-allowed"
                            : "pointer",
                        opacity: terminologyAnswers[terminologyIndex] === undefined ? 0.6 : 1,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                      }}
                    >
                      {terminologyIndex + 1 === shuffledTerminologyQuestions.length
                        ? "Finish Practice"
                        : "Next Question"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <h2 style={{ color: "#12355b" }}>Medical Terminology Practice Complete</h2>
                <p style={{ fontSize: 20, color: "#1e293b" }}>
                  Your score: {terminologyScore} / {shuffledTerminologyQuestions.length}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 12,
                    flexWrap: "wrap",
                    marginTop: 20
                  }}
                >
                  <button
                    onClick={() => setShowTerminologyMissedReview(true)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Review Missed Questions
                  </button>

                  <button
                    onClick={() =>
                      shareQuizResult(
                        "Medical Terminology Practice",
                        terminologyScore,
                        shuffledTerminologyQuestions.length
                      )
                    }
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Share Quiz
                  </button>

                  <button
                    onClick={restartTerminologyQuiz}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #dc2626, #ef4444)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Restart Practice
                  </button>
                </div>
              </div>
            )}

            {showTerminologyMissedReview && (
              <div style={{ marginTop: 24 }}>
                <h2 style={{ color: "#12355b", textAlign: "center" }}>
                  Missed Questions Review
                </h2>

                {terminologyMissedQuestions.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#1e293b" }}>
                    You did not miss any questions.
                  </p>
                ) : (
                  terminologyMissedQuestions.map((q, idx) => {
                    const originalIndex = shuffledTerminologyQuestions.findIndex(
                      (item) => item.question === q.question
                    );
                    const selected = terminologyAnswers[originalIndex];

                    return (
                      <div
                        key={idx}
                        style={{
                          background: "#fff",
                          border: "1px solid #d8e4f2",
                          borderRadius: 16,
                          padding: 20,
                          marginBottom: 16,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            color: "#12355b",
                            marginBottom: 12,
                            fontSize: 18
                          }}
                        >
                          {q.question}
                        </div>

                        {q.options.map((opt, i) => (
                          <div
                            key={i}
                            style={{
                              padding: "10px 12px",
                              marginBottom: 8,
                              borderRadius: 10,
                              background:
                                i === q.answer
                                  ? "#d9f7d9"
                                  : i === selected
                                  ? "#fee2e2"
                                  : "#f8fafc",
                              border:
                                i === q.answer
                                  ? "2px solid green"
                                  : i === selected
                                  ? "2px solid red"
                                  : "1px solid #cbd5e1"
                            }}
                          >
                            {String.fromCharCode(65 + i)}. {opt}
                          </div>
                        ))}
                      </div>
                    );
                  })
                )}

                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <button
                    onClick={() => setShowTerminologyMissedReview(false)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Back to Results
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "Contact" && (
          <div
            style={{
              background: "rgba(255,255,255,0.9)",
              borderRadius: 24,
              padding: 28,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              maxWidth: 900,
              margin: "0 auto",
              color: "#1e293b"
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <h2 style={{ color: "#12355b", margin: "0 0 8px 0" }}>Contact MedSkillBuilder</h2>
              <p style={{ color: "#4f6275", margin: 0 }}>
                Send us a message and we will get back to you as soon as we can.
              </p>
            </div>

            <form
              ref={contactFormRef}
              action="https://formspree.io/f/xgonbzaj"
              method="POST"
              onSubmit={handleContactSubmit}
              style={{
                display: "grid",
                gap: 12,
                maxWidth: 640,
                margin: "0 auto"
              }}
            >
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                style={{
                  position: "absolute",
                  left: "-5000px",
                  opacity: 0,
                  pointerEvents: "none"
                }}
                aria-hidden="true"
              />
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                style={{
                  padding: "12px 14px",
                  borderRadius: 10,
                  border: "1px solid #cbd5e1",
                  fontSize: 16
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                style={{
                  padding: "12px 14px",
                  borderRadius: 10,
                  border: "1px solid #cbd5e1",
                  fontSize: 16
                }}
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                style={{
                  padding: "12px 14px",
                  borderRadius: 10,
                  border: "1px solid #cbd5e1",
                  fontSize: 16
                }}
              />
              <textarea
                name="message"
                placeholder="How can we help you?"
                required
                rows={6}
                style={{
                  padding: "12px 14px",
                  borderRadius: 10,
                  border: "1px solid #cbd5e1",
                  fontSize: 16,
                  resize: "vertical"
                }}
              />

              <button
                type="submit"
                disabled={contactStatus === "sending"}
                style={{
                  padding: "12px 18px",
                  borderRadius: 999,
                  border: "none",
                  background: "linear-gradient(135deg, #12355b, #1d6fa5)",
                  color: "white",
                  fontWeight: 700,
                  cursor: contactStatus === "sending" ? "not-allowed" : "pointer",
                  opacity: contactStatus === "sending" ? 0.75 : 1,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                  justifySelf: "center"
                }}
              >
                {contactStatus === "sending" ? "Sending..." : "Send Message"}
              </button>

              {contactStatus === "success" && (
                <div
                  style={{
                    marginTop: 4,
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #16a34a",
                    background: "#dcfce7",
                    color: "#166534",
                    textAlign: "center",
                    fontWeight: 600
                  }}
                >
                  Message sent successfully.
                </div>
              )}

              {contactStatus === "error" && (
                <div
                  style={{
                    marginTop: 4,
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #ef4444",
                    background: "#fee2e2",
                    color: "#991b1b",
                    textAlign: "center",
                    fontWeight: 600
                  }}
                >
                  {contactError}
                </div>
              )}
            </form>
          </div>
        )}

        {activeTab === "Support" && (
          <div
            style={{
              background: "rgba(255,255,255,0.9)",
              borderRadius: 24,
              padding: 28,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              maxWidth: 900,
              margin: "0 auto",
              color: "#1e293b"
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <h2 style={{ color: "#12355b", margin: "0 0 8px 0" }}>Support Our Content</h2>
              <p style={{ color: "#4f6275", margin: 0 }}>
                If this platform helps your studying, you can support future content and updates.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gap: 14,
                maxWidth: 700,
                margin: "0 auto"
              }}
            >
              <div
                style={{
                  padding: 16,
                  borderRadius: 14,
                  border: "1px solid #d8e4f2",
                  background: "#f8fafc",
                  textAlign: "center"
                }}
              >
                <a
                  href={cashAppSupportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "12px 24px",
                    borderRadius: 999,
                    border: "none",
                    background: "linear-gradient(135deg, #16a34a, #22c55e)",
                    color: "white",
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                  }}
                >
                  Support via Cash App
                </a>
                <div style={{ marginTop: 10, fontSize: 13, color: "#64748b" }}>
                  Update the link in app code to your real cashtag if needed.
                </div>
              </div>

              <div
                style={{
                  padding: 16,
                  borderRadius: 14,
                  border: "1px solid #e2e8f0",
                  background: "#fff",
                  lineHeight: 1.6
                }}
              >
                <h3 style={{ margin: "0 0 8px 0", color: "#12355b" }}>Support Disclaimer</h3>
                <p style={{ margin: 0 }}>
                  Donations are voluntary and are not required to use MedSkillBuilder. Donations are
                  non-refundable and do not purchase medical advice, certification, or guaranteed exam
                  outcomes. MedSkillBuilder is an educational resource only.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Privacy" && (
          <div
            style={{
              background: "rgba(255,255,255,0.9)",
              borderRadius: 24,
              padding: 28,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              maxWidth: 900,
              margin: "0 auto",
              color: "#1e293b",
              lineHeight: 1.6
            }}
          >
            <h2 style={{ color: "#12355b", marginTop: 0 }}>Privacy Policy</h2>
            <p>
              Effective date: March 21, 2026
            </p>

            <h3 style={{ color: "#12355b" }}>What We Collect</h3>
            <p>
              We use Google Analytics to collect limited usage information such as pages visited,
              approximate location (region/city), device and browser details, interaction events, and
              ad-related consent choices where required. We do not intentionally collect sensitive
              personal health information through analytics or advertising tools.
            </p>

            <h3 style={{ color: "#12355b" }}>How We Use Data</h3>
            <p>
              We use analytics data to understand how learners use MedSkillBuilder, improve site
              performance, enhance training content and user experience, and support limited website
              monetization through advertising.
            </p>

            <h3 style={{ color: "#12355b" }}>Cookies and Tracking</h3>
            <p>
              Google Analytics and Google AdSense may use cookies or similar technologies to
              distinguish visitors, measure site activity, support advertising, and help determine
              whether ads are personalized or non-personalized based on visitor consent and applicable
              regional requirements.
            </p>

            <h3 style={{ color: "#12355b" }}>Your Choices</h3>
            <p>
              You can block or delete cookies in your browser settings. You can also opt out of Google
              Analytics using the official browser add-on: https://tools.google.com/dlpage/gaoptout
              . Where required by law, visitors may also be shown a consent message to manage cookie
              and advertising preferences.
            </p>

            <h3 style={{ color: "#12355b" }}>Third-Party Services</h3>
            <p>
              Google Analytics and Google AdSense are provided by Google. Learn more about how Google
              uses data here: https://policies.google.com/technologies/partner-sites
            </p>

            <h3 style={{ color: "#12355b" }}>Advertising Disclosure</h3>
            <p>
              MedSkillBuilder may display advertisements to support the site. Ads may be personalized
              or non-personalized depending on consent choices, browser settings, location, and Google
              advertising policies.
            </p>

            <h3 style={{ color: "#12355b" }}>Updates to This Policy</h3>
            <p>
              We may update this policy from time to time. Changes will be posted on this page with an
              updated effective date.
            </p>
          </div>
        )}

        <div
          style={{
            textAlign: "center",
            marginTop: 16,
            marginBottom: 8,
            display: "flex",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap"
          }}
        >
          <button
            onClick={() => setActiveTab("Contact")}
            style={{
              border: "none",
              background: "transparent",
              color: "#12355b",
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Contact
          </button>
          <button
            onClick={() => setActiveTab("Support")}
            style={{
              border: "none",
              background: "transparent",
              color: "#12355b",
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Support Our Content
          </button>
          <button
            onClick={() => setActiveTab("Privacy")}
            style={{
              border: "none",
              background: "transparent",
              color: "#12355b",
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Privacy Policy
          </button>
        </div>

        <div style={{ marginTop: 8 }}>
          {renderAdSlot(bottomAdSlot)}
        </div>
      </div>
    </div>
  );
}
