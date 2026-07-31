import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  cbetAcademyModules,
  missionOneBriefing,
  missionOneLessons,
  missionOneQuestions,
  missionOneScenarios,
  missionTwoLessons,
  missionTwoQuestions,
  missionTwoScenarios,
} from "./cbetAcademyData";
import {
  cbetCompletionPercent,
  awardCbetXp,
  completeCbetModule,
  beginMissionReview,
  getCbetAcademyState,
  getCbetModuleState,
  getCbetStats,
  getMissionProgress,
  isCbetModuleUnlocked,
  registerCbetVisit,
  resetMissionProgress,
  saveMissionProgress,
} from "./cbetAcademyStorage";
import "./CBETAcademy.css";
import "./CBETServiceCall.css";
import VirtualCBETLab from "./VirtualLab/VirtualCBETLab";
import { loadCourseState } from "./VirtualLab/LessonEngine";
import CBETHospitalDashboard from "./CBETHospitalDashboard";
import EquipmentLearningScreen from "./components/EquipmentLearningScreen";
import CertificateCenter from "./CertificateCenter";

function shuffleQuestion(question) {
  const choices = question.options.map((text, index) => ({
    text,
    correct: index === question.answer,
  }));
  for (let i = choices.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }
  return {
    ...question,
    options: choices.map((choice) => choice.text),
    answer: choices.findIndex((choice) => choice.correct),
  };
}


const CBET_GLOSSARY = {
  Voltage: "Electrical potential difference that pushes charge through a circuit. Measured in volts.",
  Current: "The rate of charge flow through a circuit. Measured in amperes.",
  Resistance: "Opposition to current flow. Measured in ohms.",
  Power: "The rate electrical energy is transferred or converted. Measured in watts.",
  "Ohm's Law": "The relationship V = I × R.",
  AC: "Alternating current periodically changes direction.",
  DC: "Direct current maintains one direction of charge flow.",
  Series: "A circuit with one current path.",
  Parallel: "A circuit with multiple current paths.",
  Ground: "A reference or protective path intended to reduce shock risk.",
  Fuse: "A protective device that opens when excessive current flows.",
};

function playCbetTone(kind = "correct") {
  if (typeof window === "undefined") return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = kind === "correct" ? "sine" : "square";
    oscillator.frequency.setValueAtTime(kind === "correct" ? 660 : 180, context.currentTime);
    if (kind === "correct") {
      oscillator.frequency.exponentialRampToValueAtTime(880, context.currentTime + 0.14);
    } else {
      oscillator.frequency.exponentialRampToValueAtTime(120, context.currentTime + 0.16);
    }

    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.22);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.24);
  } catch {
    // Sound is optional; learning continues when browser audio is blocked.
  }
}

function GlossaryTerms({ text = "" }) {
  const terms = Object.entries(CBET_GLOSSARY)
    .filter(([term]) => text.toLowerCase().includes(term.toLowerCase()))
    .slice(0, 5);

  if (!terms.length) return null;

  return (
    <div className="cbet-glossary-strip">
      <span className="cbet-label">Tap a key term</span>
      <div className="cbet-glossary-list">
        {terms.map(([term, definition]) => (
          <span className="cbet-glossary-term" tabIndex={0} key={term}>
            {term}
            <span className="cbet-glossary-popover">{definition}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function XpToast({ amount, label, onDone }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 1500);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="cbet-xp-toast" role="status">
      <strong>+{amount} XP</strong>
      <span>{label}</span>
    </div>
  );
}

function StatsPanel({ stats, onClose }) {
  const cards = [
    ["⚡", "Total XP", stats.xp],
    ["🔥", "Current streak", `${stats.currentStreak} day${stats.currentStreak === 1 ? "" : "s"}`],
    ["🏆", "Longest streak", `${stats.longestStreak} day${stats.longestStreak === 1 ? "" : "s"}`],
    ["📚", "Lessons complete", `${stats.lessonsCompleted} / 9`],
    ["🧰", "Scenarios complete", stats.scenariosCompleted],
    ["🎯", "Best Mission 1 score", `${stats.bestMissionOneScore}%`],
    ["✓", "Competencies earned", stats.badges],
    ["📅", "Active days", stats.activeDays],
  ];

  return (
    <div className="cbet-modal-backdrop" role="dialog" aria-modal="true" aria-label="Academy statistics">
      <section className="cbet-stats-panel">
        <div className="cbet-stats-header">
          <div>
            <span className="cbet-label">Your progress</span>
            <h2>Academy Statistics</h2>
          </div>
          <button className="cbet-modal-close" onClick={onClose} aria-label="Close statistics">×</button>
        </div>
        <div className="cbet-stats-grid">
          {cards.map(([icon, label, value]) => (
            <article key={label}>
              <span>{icon}</span>
              <strong>{value}</strong>
              <small>{label}</small>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function KnowledgeCheck({ check, onComplete, resetKey, progressLabel, actions }) {
  const [selected, setSelected] = useState(null);
  const [autoAdvance, setAutoAdvance] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("cbet-auto-advance") === "true";
  });
  const [advancePending, setAdvancePending] = useState(false);
  const checkRef = useRef(null);
  const randomizedCheck = useMemo(() => shuffleQuestion(check), [resetKey]);

  useEffect(() => {
    setSelected(null);
    setAdvancePending(false);
  }, [resetKey]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cbet-auto-advance", String(autoAdvance));
    }
  }, [autoAdvance]);

  const answered = selected !== null;
  const correct = selected === randomizedCheck.answer;
  const progressMatch = progressLabel?.match(/(\d+)\s+of\s+(\d+)/i);
  const progressCurrent = progressMatch ? Number(progressMatch[1]) : null;
  const progressTotal = progressMatch ? Number(progressMatch[2]) : null;
  const progressPercent = progressCurrent && progressTotal
    ? Math.min(100, Math.round((progressCurrent / progressTotal) * 100))
    : null;

  const chooseOption = (index) => {
    if (correct || index < 0 || index >= randomizedCheck.options.length) return;

    const isCorrect = index === randomizedCheck.answer;
    setSelected(index);
    playCbetTone(isCorrect ? "correct" : "wrong");

    if (isCorrect) onComplete(true);
  };

  useEffect(() => {
    if (!correct || !autoAdvance) {
      setAdvancePending(false);
      return undefined;
    }

    const nextButton = checkRef.current?.querySelector(
      ".cbet-check-actions .cbet-primary:not(:disabled)"
    );
    if (!nextButton) return undefined;

    setAdvancePending(true);
    const timer = window.setTimeout(() => {
      setAdvancePending(false);
      nextButton.click();
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [correct, autoAdvance, resetKey]);

  useEffect(() => {
    const handleKeyboard = (event) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT") return;

      const number = Number(event.key);
      if (number >= 1 && number <= randomizedCheck.options.length && !correct) {
        event.preventDefault();
        chooseOption(number - 1);
        return;
      }

      if (event.key === "Enter" && correct) {
        const nextButton = checkRef.current?.querySelector(
          ".cbet-check-actions .cbet-primary:not(:disabled)"
        );
        if (nextButton) {
          event.preventDefault();
          nextButton.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [correct, randomizedCheck.options.length, randomizedCheck.answer]);

  const questionText =
    randomizedCheck.question ||
    randomizedCheck.prompt ||
    randomizedCheck.questionText ||
    randomizedCheck.text ||
    randomizedCheck.title ||
    "Select the best answer.";

  return (
    <div className="cbet-check cbet-check-premium" ref={checkRef}>
      <div className="cbet-check-sticky-header">
        <div className="cbet-check-heading">
          <span className="cbet-label">Quick Knowledge Check</span>
          <div className="cbet-check-header-tools">
            {progressLabel && <span className="cbet-check-progress">{progressLabel}</span>}
            <label className="cbet-auto-advance-toggle">
              <input
                type="checkbox"
                checked={autoAdvance}
                onChange={(event) => setAutoAdvance(event.target.checked)}
              />
              <span>Auto-advance</span>
            </label>
          </div>
        </div>
        {progressPercent !== null && (
          <div className="cbet-check-progress-bar" aria-label={`${progressPercent}% complete`}>
            <span style={{ width: `${progressPercent}%` }} />
          </div>
        )}
      </div>

      <h3 className="cbet-check-question">{questionText}</h3>
      <div className="cbet-options">
        {randomizedCheck.options.map((option, index) => (
          <button
            key={option}
            type="button"
            disabled={correct}
            aria-pressed={selected === index}
            className={`cbet-option ${
              correct && index === randomizedCheck.answer ? "correct" : ""
            } ${answered && index === selected && !correct ? "wrong" : ""}`}
            onClick={() => chooseOption(index)}
          >
            <strong>{String.fromCharCode(65 + index)}.</strong> {option}
            <kbd>{index + 1}</kbd>
          </button>
        ))}
      </div>

      <div className={`cbet-feedback-slot ${answered ? "is-visible" : ""}`} aria-live="polite">
        {answered ? (
          <div className={`cbet-feedback ${correct ? "good" : "bad"}`}>
            <div className="cbet-feedback-title">
              <span aria-hidden="true">{correct ? "✓" : "↻"}</span>
              <strong>{correct ? "Correct — excellent work!" : "Not quite — try again."}</strong>
            </div>
            <span>
              {correct
                ? randomizedCheck.explanation
                : "Review the activity and select another answer."}
            </span>
            {correct && (
              <small>
                {advancePending
                  ? "Moving to the next lesson…"
                  : autoAdvance
                  ? "Auto-advance is on."
                  : "Press Enter or select the next lesson button."}
              </small>
            )}
          </div>
        ) : (
          <span className="cbet-keyboard-hint">Use keys 1–4 or select an answer.</span>
        )}
      </div>

      {actions && (
        <div className={`cbet-check-actions ${advancePending ? "is-advancing" : ""}`}>
          {actions}
          {advancePending && <span className="cbet-auto-advance-line" aria-hidden="true" />}
        </div>
      )}
    </div>
  );
}


function InteractiveLab({ type }) {
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(12);
  const [current, setCurrent] = useState(2);
  const [closed, setClosed] = useState(true);
  const [mode, setMode] = useState("DC");
  const [meterMode, setMeterMode] = useState("V");
  const [probePlacement, setProbePlacement] = useState("parallel");
  const [circuitType, setCircuitType] = useState(type === "parallel" ? "parallel" : "series");
  const [resistorCount, setResistorCount] = useState(2);

  const calculatedCurrent = resistance ? voltage / resistance : 0;
  const power = voltage * current;
  const meterReading =
    meterMode === "V"
      ? probePlacement === "parallel"
        ? `${voltage.toFixed(1)} V`
        : "OL / incorrect placement"
      : meterMode === "A"
      ? probePlacement === "series"
        ? `${calculatedCurrent.toFixed(2)} A`
        : "Fuse risk / incorrect placement"
      : probePlacement === "power-off"
      ? `${resistance.toFixed(1)} Ω`
      : "Remove power first";

  if (!type) return null;

  if (["voltage", "resistance", "ohms"].includes(type)) {
    return (
      <div className="cbet-lab">
        <div className="cbet-lab-title">Virtual Multimeter Lab</div>
        <div className="cbet-meter-layout">
          <div className="cbet-dmm">
            <div className="cbet-dmm-screen">{meterReading}</div>
            <div className="cbet-dmm-modes">
              {["V", "A", "Ω"].map((item) => (
                <button
                  key={item}
                  className={meterMode === item ? "active" : ""}
                  onClick={() => setMeterMode(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="cbet-probes">
              <span className="black-probe">COM</span>
              <span className="red-probe">INPUT</span>
            </div>
          </div>

          <div className="cbet-lab-controls">
            <label>
              Source voltage: <strong>{voltage} V</strong>
              <input type="range" min="1" max="48" value={voltage}
                onChange={(e) => setVoltage(Number(e.target.value))} />
            </label>
            <label>
              Resistance: <strong>{resistance} Ω</strong>
              <input type="range" min="1" max="100" value={resistance}
                onChange={(e) => setResistance(Number(e.target.value))} />
            </label>
            <div className="cbet-placement-buttons">
              <button className={probePlacement === "parallel" ? "active" : ""}
                onClick={() => setProbePlacement("parallel")}>Across component</button>
              <button className={probePlacement === "series" ? "active" : ""}
                onClick={() => setProbePlacement("series")}>In series</button>
              <button className={probePlacement === "power-off" ? "active" : ""}
                onClick={() => setProbePlacement("power-off")}>Power removed</button>
            </div>
          </div>
        </div>
        <div className="cbet-equation">
          {type === "ohms" ? `I = V ÷ R = ${calculatedCurrent.toFixed(2)} A` : "Choose the correct meter mode and probe placement."}
        </div>
        <p className="cbet-lab-tip">
          Voltage is measured in parallel, current in series, and resistance with power removed.
        </p>
      </div>
    );
  }

  if (type === "switch") {
    return (
      <div className="cbet-lab">
        <div className="cbet-lab-title">Animated Current-Flow Lab</div>
        <div className={`cbet-flow-track ${closed ? "flowing" : "stopped"}`}>
          <span className="source-node">−</span>
          {Array.from({ length: 10 }, (_, index) => (
            <i key={index} style={{ "--delay": `${index * 0.11}s` }} />
          ))}
          <span className="load-node">LOAD</span>
          <span className="source-node">+</span>
        </div>
        <button className="cbet-secondary" onClick={() => setClosed((value) => !value)}>
          {closed ? "Open the switch" : "Close the switch"}
        </button>
        <div className="cbet-meter">
          Circuit status: <strong>{closed ? "Closed — current is flowing" : "Open — current is 0 A"}</strong>
        </div>
      </div>
    );
  }

  if (type === "power") {
    return (
      <div className="cbet-lab">
        <div className="cbet-lab-title">Power and Heat Lab</div>
        <label>
          Voltage: <strong>{voltage} V</strong>
          <input type="range" min="1" max="120" value={voltage}
            onChange={(e) => setVoltage(Number(e.target.value))} />
        </label>
        <label>
          Current: <strong>{current} A</strong>
          <input type="range" min="1" max="10" value={current}
            onChange={(e) => setCurrent(Number(e.target.value))} />
        </label>
        <div className="cbet-power-visual">
          <div className="cbet-bulb" style={{ opacity: Math.min(1, power / 300) + 0.2 }}>💡</div>
          <div>
            <div className="cbet-equation">P = V × I</div>
            <div className="cbet-meter"><strong>{voltage} × {current} = {power} W</strong></div>
          </div>
        </div>
        <p>Higher power generally means more energy is being converted each second, often including more heat.</p>
      </div>
    );
  }

  if (type === "acdc") {
    return (
      <div className="cbet-lab">
        <div className="cbet-lab-title">Oscilloscope View: AC vs. DC</div>
        <div className="cbet-toggle">
          <button className={mode === "DC" ? "active" : ""} onClick={() => setMode("DC")}>Battery / DC</button>
          <button className={mode === "AC" ? "active" : ""} onClick={() => setMode("AC")}>Outlet / AC</button>
        </div>
        <div className="cbet-scope">
          <div className="scope-grid" />
          <svg viewBox="0 0 600 160" aria-label={`${mode} waveform`}>
            {mode === "DC" ? (
              <path d="M0 80 L600 80" />
            ) : (
              <path d="M0 80 C50 10 100 10 150 80 S250 150 300 80 S400 10 450 80 S550 150 600 80" />
            )}
          </svg>
        </div>
        <p>{mode === "DC"
          ? "A steady DC level remains on one side of zero."
          : "An AC waveform repeatedly changes magnitude and direction."}</p>
      </div>
    );
  }

  if (type === "series" || type === "parallel") {
    const isSeries = circuitType === "series";
    const totalResistance = isSeries
      ? resistorCount * 10
      : 10 / resistorCount;
    const totalCurrent = 12 / totalResistance;

    return (
      <div className="cbet-lab">
        <div className="cbet-lab-title">Circuit Builder</div>
        <div className="cbet-toggle">
          <button className={isSeries ? "active" : ""} onClick={() => setCircuitType("series")}>Series</button>
          <button className={!isSeries ? "active" : ""} onClick={() => setCircuitType("parallel")}>Parallel</button>
        </div>
        <label>
          Number of 10 Ω resistors: <strong>{resistorCount}</strong>
          <input type="range" min="1" max="4" value={resistorCount}
            onChange={(e) => setResistorCount(Number(e.target.value))} />
        </label>
        <div className={`cbet-builder ${circuitType}`}>
          <span className="battery-node">12 V</span>
          <div className="resistor-bank">
            {Array.from({ length: resistorCount }, (_, index) => (
              <span key={index}>R{index + 1}<small>10 Ω</small></span>
            ))}
          </div>
        </div>
        <div className="cbet-lab-readouts">
          <div><span>Total resistance</span><strong>{totalResistance.toFixed(2)} Ω</strong></div>
          <div><span>Source current</span><strong>{totalCurrent.toFixed(2)} A</strong></div>
        </div>
        <p>{isSeries
          ? "Adding series resistance increases total resistance and reduces source current."
          : "Adding parallel branches reduces equivalent resistance and increases source current."}</p>
      </div>
    );
  }

  return null;
}


function MissionTwoLab({ type }) {
  const [resistance, setResistance] = useState(1000);
  const [band1, setBand1] = useState(1);
  const [band2, setBand2] = useState(0);
  const [multiplier, setMultiplier] = useState(2);
  const [charge, setCharge] = useState(0);
  const [capacitance, setCapacitance] = useState(470);
  const [diodeDirection, setDiodeDirection] = useState("forward");
  const [diodeFailed, setDiodeFailed] = useState(false);
  const [baseCurrent, setBaseCurrent] = useState(2);
  const [ledVoltage, setLedVoltage] = useState(3);
  const [ledResistance, setLedResistance] = useState(220);
  const [primaryTurns, setPrimaryTurns] = useState(100);
  const [secondaryTurns, setSecondaryTurns] = useState(50);
  const [relayOn, setRelayOn] = useState(false);
  const [identifyIndex, setIdentifyIndex] = useState(0);
  const [identifyAnswer, setIdentifyAnswer] = useState(null);
  const [troubleStep, setTroubleStep] = useState(0);
  const [troubleHistory, setTroubleHistory] = useState([]);

  useEffect(() => {
    if (type !== "capacitor") return undefined;
    const timer = window.setInterval(() => {
      setCharge((value) => Math.min(100, value + Math.max(1, (100 - value) * 0.08)));
    }, 120);
    return () => window.clearInterval(timer);
  }, [type, capacitance]);

  if (type === "resistor") {
    const calculated = (band1 * 10 + band2) * (10 ** multiplier);
    const current = 12 / calculated * 1000;
    return (
      <div className="cbet-lab">
        <div className="cbet-lab-title">Resistor Color-Code Bench</div>
        <div className="component-workbench">
          <div className="resistor-visual">
            <div className="resistor-lead" />
            <div className="resistor-body">
              <i style={{ background: ["#000","#7c2d12","#dc2626","#f97316","#eab308","#22c55e","#2563eb","#7e22ce","#6b7280","#fff"][band1] }} />
              <i style={{ background: ["#000","#7c2d12","#dc2626","#f97316","#eab308","#22c55e","#2563eb","#7e22ce","#6b7280","#fff"][band2] }} />
              <i style={{ background: ["#000","#7c2d12","#dc2626","#f97316","#eab308","#22c55e","#2563eb","#7e22ce","#6b7280","#fff"][multiplier] }} />
              <i style={{ background: "#d4af37" }} />
            </div>
            <div className="resistor-lead" />
          </div>
          <div className="cbet-control-grid">
            <label>First digit
              <input type="range" min="0" max="9" value={band1} onChange={(e) => setBand1(Number(e.target.value))} />
              <strong>{band1}</strong>
            </label>
            <label>Second digit
              <input type="range" min="0" max="9" value={band2} onChange={(e) => setBand2(Number(e.target.value))} />
              <strong>{band2}</strong>
            </label>
            <label>Multiplier
              <input type="range" min="0" max="6" value={multiplier} onChange={(e) => setMultiplier(Number(e.target.value))} />
              <strong>×10^{multiplier}</strong>
            </label>
          </div>
        </div>
        <div className="cbet-lab-readouts">
          <div><span>Resistance</span><strong>{calculated >= 1000000 ? `${(calculated/1000000).toFixed(1)} MΩ` : calculated >= 1000 ? `${(calculated/1000).toFixed(1)} kΩ` : `${calculated} Ω`}</strong></div>
          <div><span>Current at 12 V</span><strong>{current.toFixed(2)} mA</strong></div>
        </div>
      </div>
    );
  }

  if (type === "capacitor") {
    const storedEnergy = 0.5 * (capacitance / 1_000_000) * 12 * 12;
    return (
      <div className="cbet-lab">
        <div className="cbet-lab-title">Capacitor Charge and Discharge Lab</div>
        <label>Capacitance: <strong>{capacitance} µF</strong>
          <input type="range" min="10" max="2200" step="10" value={capacitance}
            onChange={(e) => { setCapacitance(Number(e.target.value)); setCharge(0); }} />
        </label>
        <div className="capacitor-stage">
          <div className="capacitor-can">
            <div className="capacitor-fill" style={{ height: `${charge}%` }} />
            <span>{Math.round(charge)}%</span>
          </div>
          <div className="capacitor-graph">
            <svg viewBox="0 0 500 180">
              <path className="graph-axis" d="M35 10 V150 H485" />
              <path className="charge-curve" d="M35 150 C110 40 230 24 485 18" />
              <path className="current-curve" d="M35 18 C130 128 300 145 485 150" />
            </svg>
            <div className="graph-legend"><span>Voltage ↑</span><span>Current ↓</span></div>
          </div>
        </div>
        <button className="cbet-secondary" onClick={() => setCharge(0)}>Discharge Capacitor</button>
        <p>Stored energy at 12 V: <strong>{storedEnergy.toFixed(4)} joules</strong></p>
      </div>
    );
  }

  if (type === "diode") {
    const conducting = diodeFailed ? true : diodeDirection === "forward";
    return (
      <div className="cbet-lab">
        <div className="cbet-lab-title">Diode and Bridge Rectifier Lab</div>
        <div className="cbet-toggle">
          <button className={diodeDirection === "forward" ? "active" : ""} onClick={() => setDiodeDirection("forward")}>Forward Bias</button>
          <button className={diodeDirection === "reverse" ? "active" : ""} onClick={() => setDiodeDirection("reverse")}>Reverse Bias</button>
        </div>
        <div className={`diode-stage ${conducting ? "conducting" : "blocked"}`}>
          <span className="source-node">+</span>
          <div className="diode-symbol">▶|</div>
          <div className="diode-flow">
            {Array.from({length: 8}, (_, i) => <i key={i} style={{"--delay": `${i*.12}s`}} />)}
          </div>
          <span className="load-node">LOAD</span>
        </div>
        <p>{diodeFailed
          ? "Failed short: current flows in both directions and the bridge may open the fuse."
          : conducting
          ? "Forward biased: current flows and the diode drops approximately 0.7 V."
          : "Reverse biased: current is blocked."}</p>
        <button className="cbet-secondary" onClick={() => setDiodeFailed((v) => !v)}>
          {diodeFailed ? "Restore Healthy Diode" : "Simulate Shorted Diode"}
        </button>
      </div>
    );
  }

  if (type === "transistor") {
    const collectorCurrent = Math.min(200, baseCurrent * 40);
    return (
      <div className="cbet-lab">
        <div className="cbet-lab-title">Transistor Switching Lab</div>
        <label>Base current: <strong>{baseCurrent.toFixed(1)} mA</strong>
          <input type="range" min="0" max="5" step=".1" value={baseCurrent}
            onChange={(e) => setBaseCurrent(Number(e.target.value))} />
        </label>
        <div className="transistor-stage">
          <div className="transistor-symbol">BJT</div>
          <div className="current-bars">
            <div><span>Base</span><i style={{height: `${baseCurrent*16}%`}} /></div>
            <div><span>Collector</span><i style={{height: `${collectorCurrent/2}%`}} /></div>
          </div>
        </div>
        <div className="cbet-meter">Collector current: <strong>{collectorCurrent.toFixed(0)} mA</strong></div>
        <p>A small base current controls a much larger collector current.</p>
      </div>
    );
  }

  if (type === "led") {
    const current = Math.max(0, (ledVoltage - 2) / ledResistance * 1000);
    const burned = current > 25;
    return (
      <div className="cbet-lab">
        <div className="cbet-lab-title">LED Current-Limiting Lab</div>
        <label>Supply voltage: <strong>{ledVoltage.toFixed(1)} V</strong>
          <input type="range" min="0" max="12" step=".1" value={ledVoltage}
            onChange={(e) => setLedVoltage(Number(e.target.value))} />
        </label>
        <label>Series resistor: <strong>{ledResistance} Ω</strong>
          <input type="range" min="10" max="1000" step="10" value={ledResistance}
            onChange={(e) => setLedResistance(Number(e.target.value))} />
        </label>
        <div className={`led-stage ${burned ? "burned" : current > 1 ? "lit" : ""}`}>
          <div className="led-bulb">{burned ? "✖" : "●"}</div>
          <strong>{burned ? "LED OVERCURRENT" : current > 1 ? "LED ON" : "LED OFF"}</strong>
        </div>
        <p>Calculated LED current: <strong>{current.toFixed(1)} mA</strong></p>
      </div>
    );
  }

  if (type === "transformer") {
    const output = 120 * secondaryTurns / primaryTurns;
    return (
      <div className="cbet-lab">
        <div className="cbet-lab-title">Transformer Turns-Ratio Lab</div>
        <div className="transformer-stage">
          <div className="coil primary" style={{"--turns": primaryTurns/10}}>Primary<br/><strong>{primaryTurns} turns</strong></div>
          <div className="magnetic-core">∿</div>
          <div className="coil secondary" style={{"--turns": secondaryTurns/10}}>Secondary<br/><strong>{secondaryTurns} turns</strong></div>
        </div>
        <label>Primary turns
          <input type="range" min="20" max="200" step="10" value={primaryTurns} onChange={(e) => setPrimaryTurns(Number(e.target.value))} />
        </label>
        <label>Secondary turns
          <input type="range" min="20" max="200" step="10" value={secondaryTurns} onChange={(e) => setSecondaryTurns(Number(e.target.value))} />
        </label>
        <div className="cbet-meter">120 V primary → <strong>{output.toFixed(1)} V secondary</strong></div>
      </div>
    );
  }

  if (type === "relay") {
    return (
      <div className="cbet-lab">
        <div className="cbet-lab-title">Relay Contact Lab</div>
        <div className={`relay-stage ${relayOn ? "energized" : ""}`}>
          <div className="relay-coil">COIL</div>
          <div className="relay-arm">↗</div>
          <div className="relay-contacts">
            <span>NO</span><i /><span>COM</span><i /><span>NC</span>
          </div>
        </div>
        <button className="cbet-primary" onClick={() => {
          setRelayOn((v) => !v);
          playCbetTone("correct");
        }}>{relayOn ? "De-energize Coil" : "Energize Coil"}</button>
        <p>{relayOn ? "The common contact has switched to the normally open contact." : "The common contact rests on the normally closed contact."}</p>
      </div>
    );
  }

  if (type === "identify") {
    const items = [
      { icon: "🟫", name: "Resistor", clue: "Axial body with color bands" },
      { icon: "🔋", name: "Electrolytic Capacitor", clue: "Cylindrical polarized can" },
      { icon: "🔺", name: "Diode", clue: "Axial package with polarity band" },
      { icon: "⚫", name: "MOV", clue: "Disc-shaped surge suppressor" },
      { icon: "🧲", name: "Transformer", clue: "Two windings coupled by a core" },
      { icon: "⚙️", name: "Relay", clue: "Coil-operated contact package" },
    ];
    const item = items[identifyIndex % items.length];
    return (
      <div className="cbet-lab">
        <div className="cbet-lab-title">Component Recognition Drill</div>
        <div className="identify-card">
          <div className="identify-icon">{item.icon}</div>
          <p>{item.clue}</p>
          <div className="cbet-option-grid">
            {items.slice(0,4).map((choice, index) => (
              <button key={choice.name}
                className={identifyAnswer === choice.name ? (choice.name === item.name ? "correct" : "wrong") : ""}
                onClick={() => {
                  setIdentifyAnswer(choice.name);
                  playCbetTone(choice.name === item.name ? "correct" : "wrong");
                }}>
                {choice.name}
              </button>
            ))}
          </div>
          {identifyAnswer && <p><strong>{identifyAnswer === item.name ? "Correct." : `Not quite. This is a ${item.name}.`}</strong></p>}
          <button className="cbet-secondary" onClick={() => { setIdentifyIndex((v) => v+1); setIdentifyAnswer(null); }}>Next Component</button>
        </div>
      </div>
    );
  }

  if (type === "troubleshoot") {
    const steps = [
      {
        finding: "Device is completely dead.",
        choices: [
          ["Inspect fuse and line input", 1, "Correct first step: verify the input path safely."],
          ["Replace the display", 0, "The display cannot explain loss of all power."],
          ["Update firmware", 0, "Firmware is not the first suspect when no power is present."]
        ]
      },
      {
        finding: "Fuse is open. A new fuse opens immediately.",
        choices: [
          ["Bypass the fuse", 0, "Never bypass a safety device."],
          ["Test the bridge rectifier", 1, "A shorted bridge can open the fuse immediately."],
          ["Increase fuse rating", 0, "Do not increase the fuse rating without manufacturer direction."]
        ]
      },
      {
        finding: "Bridge rectifier measures shorted in both directions.",
        choices: [
          ["Replace the bridge and inspect downstream components", 1, "The shorted bridge is a confirmed fault."],
          ["Replace the speaker", 0, "The speaker is unrelated to the input short."],
          ["Short across the bridge", 0, "This is unsafe and would worsen the fault."]
        ]
      },
      {
        finding: "After bridge replacement, DC output is present but has heavy ripple.",
        choices: [
          ["Check the filter capacitor", 1, "Excessive ripple points to poor filtering."],
          ["Replace the relay", 0, "The relay does not smooth rectified DC."],
          ["Ignore the ripple", 0, "Heavy ripple can destabilize the device."]
        ]
      },
      {
        finding: "Filter capacitor has high ESR and a bulged top.",
        choices: [
          ["Replace with correct capacitance, voltage, temperature, and ESR rating", 1, "Correct repair and part selection."],
          ["Install any capacitor that fits", 0, "Incorrect ratings can fail quickly or create a hazard."],
          ["Remove the capacitor permanently", 0, "The supply requires filtering."]
        ]
      }
    ];
    const step = steps[Math.min(troubleStep, steps.length - 1)];
    return (
      <div className="cbet-lab">
        <div className="cbet-lab-title">Guided Power-Supply Troubleshooting</div>
        <div className="trouble-path">
          {steps.map((_, i) => <i key={i} className={i <= troubleStep ? "active" : ""} />)}
        </div>
        {troubleStep < steps.length ? (
          <>
            <div className="trouble-finding">{step.finding}</div>
            <div className="cbet-option-grid">
              {step.choices.map(([label, correct, feedback]) => (
                <button key={label} onClick={() => {
                  playCbetTone(correct ? "correct" : "wrong");
                  setTroubleHistory((h) => [...h, feedback]);
                  if (correct) setTroubleStep((s) => s + 1);
                }}>{label}</button>
              ))}
            </div>
            {troubleHistory.length > 0 && <p className="trouble-feedback">{troubleHistory.at(-1)}</p>}
          </>
        ) : (
          <div className="trouble-success">
            <strong>Fault isolated and repaired.</strong>
            <p>You followed the energy path from line input through rectification and filtering.</p>
            <button className="cbet-secondary" onClick={() => { setTroubleStep(0); setTroubleHistory([]); }}>Run Again</button>
          </div>
        )}
      </div>
    );
  }

  return null;
}

function ScenarioCard({ scenario, number, onComplete, actions }) {
  const [selected, setSelected] = useState(null);
  const randomizedScenario = useMemo(() => shuffleQuestion(scenario), [scenario]);
  const answered = selected !== null;
  const correct = selected === randomizedScenario.answer;

  return (
    <article className="cbet-scenario">
      <span className="cbet-label">Troubleshooting Scenario {number}</span>
      <h2>{randomizedScenario.title}</h2>
      <p>{randomizedScenario.patient}</p>
      <h3>{randomizedScenario.question}</h3>
      <div className="cbet-options">
        {randomizedScenario.options.map((option, index) => (
          <button
            key={option}
            disabled={correct}
            className={`cbet-option ${
              correct && index === randomizedScenario.answer ? "correct" : ""
            } ${answered && index === selected && !correct ? "wrong" : ""}`}
            onClick={() => {
              const isCorrect = index === randomizedScenario.answer;
              setSelected(index);
              if (isCorrect) onComplete(true);
            }}
          >
            <strong>{String.fromCharCode(65 + index)}.</strong> {option}
          </button>
        ))}
      </div>
      {answered && (
        <div className={`cbet-feedback ${correct ? "good" : "bad"}`}>
          <strong>{correct ? "Best action." : "Not quite. Try another answer."}</strong>
          <span>{correct ? randomizedScenario.explanation : "That choice is not the best next step. Choose another answer."}</span>
          {correct && actions && (
            <div className="cbet-nav-row cbet-scenario-inline-actions">
              {actions}
            </div>
          )}
        </div>
      )}
    </article>
  );
}


function scrollToCbetTrainingTarget(targetId) {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const run = () => {
    const target = document.getElementById(targetId);
    if (!target) return;

    // scrollIntoView handles the window and most nested scrolling containers.
    target.scrollIntoView({ behavior: "auto", block: "start", inline: "nearest" });

    // Some MedSkillBuilder layouts use an overflow container instead of the window.
    // Reset every scrollable ancestor so the assignment starts at the visible top.
    let parent = target.parentElement;
    while (parent && parent !== document.body && parent !== document.documentElement) {
      const style = window.getComputedStyle(parent);
      const canScroll = /(auto|scroll|overlay)/.test(style.overflowY || "") && parent.scrollHeight > parent.clientHeight;
      if (canScroll) {
        const parentTop = parent.getBoundingClientRect().top;
        const targetTop = target.getBoundingClientRect().top;
        parent.scrollTop += targetTop - parentTop - 12;
      }
      parent = parent.parentElement;
    }

    const top = Math.max(0, target.getBoundingClientRect().top + window.pageYOffset - 12);
    window.scrollTo({ top, left: 0, behavior: "auto" });
  };

  run();
  [0, 40, 120, 260, 500].forEach((delay) => window.setTimeout(run, delay));
}

function scrollCbetPageToTop() {
  if (typeof window === "undefined") return;

  window.requestAnimationFrame(() => {
    const target =
      document.getElementById("mission-1-active") ||
      document.querySelector(".cbet-academy .cbet-shell") ||
      document.querySelector(".cbet-academy");

    if (!target) return;

    const top = Math.max(
      0,
      target.getBoundingClientRect().top + window.scrollY - 24
    );

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  });
}



function MissionJourney({ phase, lessonIndex = 0, lessonCount = 9, passed = false }) {
  const phaseOrder = ["briefing", "lessons", "scenarios", "quiz", "complete"];
  const activePhase = passed ? "complete" : phase;
  const activeIndex = phaseOrder.indexOf(activePhase);
  const steps = [
    { key: "briefing", label: "Briefing" },
    { key: "lessons", label: `Lessons${phase === "lessons" ? ` ${lessonIndex + 1}/${lessonCount}` : ""}` },
    { key: "scenarios", label: "Troubleshooting" },
    { key: "quiz", label: "Challenge" },
    { key: "complete", label: "Complete" },
  ];

  return (
    <nav className="cbet-mission-journey" aria-label="Mission progress">
      {steps.map((step, index) => {
        const isDone = index < activeIndex;
        const isActive = index === activeIndex;
        return (
          <div
            key={step.key}
            className={`${isDone ? "done" : ""} ${isActive ? "active" : ""}`}
            aria-current={isActive ? "step" : undefined}
          >
            <span>{isDone ? "✓" : index + 1}</span>
            <strong>{step.label}</strong>
          </div>
        );
      })}
    </nav>
  );
}

function MissionOne({ onBack, onComplete, onContinueMission2 }) {
  const questions = useMemo(() => missionOneQuestions.map(shuffleQuestion), []);
  const savedProgress = getMissionProgress(1);
  const [phase, setPhaseState] = useState(savedProgress.phase || "briefing");
  const [lessonIndex, setLessonIndexState] = useState(savedProgress.lessonIndex || 0);
  const [lessonChecks, setLessonChecks] = useState(
    Object.fromEntries((savedProgress.completedLessons || []).map((index) => [index, true]))
  );
  const [scenarioIndex, setScenarioIndexState] = useState(savedProgress.scenarioIndex || 0);
  const [scenarioChecks, setScenarioChecks] = useState(
    Object.fromEntries((savedProgress.completedScenarios || []).map((index) => [index, true]))
  );
  const [questionIndex, setQuestionIndexState] = useState(savedProgress.quizIndex || 0);
  const [answers, setAnswers] = useState({});
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [missedQuestions, setMissedQuestions] = useState({});
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [xpToast, setXpToast] = useState(null);
  const [showBadgeUnlock, setShowBadgeUnlock] = useState(false);
  const missionContentRef = useRef(null);

  const question = questions[questionIndex];
  const selected = answers[questionIndex];
  const wrongSelected = wrongAnswers[questionIndex];
  const answered = selected !== undefined;
  const percent = Math.round((score / questions.length) * 100);
  const passed = percent >= 80;

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      if (phase === "lessons" && missionContentRef.current) {
        missionContentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        scrollCbetPageToTop();
      }
    }, 60);

    return () => window.clearTimeout(timerId);
  }, [phase, lessonIndex, scenarioIndex]);

  function setPhase(nextPhase) {
    setPhaseState(nextPhase);
    saveMissionProgress(1, { phase: nextPhase });
  }

  function setLessonIndex(next) {
    const value = typeof next === "function" ? next(lessonIndex) : next;
    setLessonIndexState(value);
    saveMissionProgress(1, { lessonIndex: value, phase: "lessons" });
  }

  function setScenarioIndex(next) {
    const value = typeof next === "function" ? next(scenarioIndex) : next;
    setScenarioIndexState(value);
    saveMissionProgress(1, { scenarioIndex: value, phase: "scenarios" });
  }

  function setQuestionIndex(next) {
    const value = typeof next === "function" ? next(questionIndex) : next;
    setQuestionIndexState(value);
    saveMissionProgress(1, { quizIndex: value, phase: "quiz" });
  }

  function markLessonComplete(index) {
    setLessonChecks((previous) => {
      const next = { ...previous, [index]: true };
      saveMissionProgress(1, {
        completedLessons: Object.keys(next).filter((key) => next[key]).map(Number),
        lessonIndex: index,
        phase: "lessons",
      });
      const before = getCbetAcademyState().xp;
      const updated = awardCbetXp(10, `mission1-lesson-${index}`);
      if (updated.xp > before) setXpToast({ amount: 10, label: "Lesson complete" });
      return next;
    });
  }

  function markScenarioComplete(index) {
    setScenarioChecks((previous) => {
      const next = { ...previous, [index]: true };
      saveMissionProgress(1, {
        completedScenarios: Object.keys(next).filter((key) => next[key]).map(Number),
        scenarioIndex: index,
        phase: "scenarios",
      });
      const before = getCbetAcademyState().xp;
      const updated = awardCbetXp(15, `mission1-scenario-${index}`);
      if (updated.xp > before) setXpToast({ amount: 15, label: "Scenario complete" });
      return next;
    });
  }

  function choose(index) {
    if (answered) return;
    setAnswers((prev) => ({ ...prev, [questionIndex]: index }));
    playCbetTone(index === question.answer ? "correct" : "wrong");
    if (index === question.answer) setScore((prev) => prev + 1);
  }

  function nextQuestion() {
    if (!answered) return;
    if (questionIndex === questions.length - 1) {
      const finalCorrect = score + (selected === question.answer ? 1 : 0);
      const finalScore = Math.round((finalCorrect / questions.length) * 100);
      setScore(finalCorrect);
      const wasComplete = getCbetModuleState(1).complete;
      completeCbetModule(1, finalScore, 250);
      if (finalScore >= 80 && !wasComplete) {
        setShowBadgeUnlock(true);
        setXpToast({ amount: 250, label: "Mission complete" });
      }
      setFinished(true);
      onComplete();
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  }

  function restart() {
    setQuestionIndex(0);
    setAnswers({});
    setWrongAnswers({});
    setMissedQuestions({});
    setScore(0);
    setFinished(false);
    saveMissionProgress(1, { phase: "quiz", quizIndex: 0 });
  }

  const missionOverlay = (
    <>
      {xpToast && <XpToast {...xpToast} onDone={() => setXpToast(null)} />}
      {showBadgeUnlock && (
        <div className="cbet-badge-unlock" role="status">
          <div className="cbet-badge-burst">⚡</div>
          <span>Competency Earned</span>
          <strong>Electrical Fundamentals</strong>
          <button className="cbet-primary" onClick={() => setShowBadgeUnlock(false)}>Continue</button>
        </div>
      )}
    </>
  );

  if (phase === "briefing") {
    return (
      <section id="mission-1-active" className="cbet-shell">
        {missionOverlay}
        <button className="cbet-text-button" onClick={onBack}>← Back to Academy</button>
        <MissionJourney phase={phase} lessonIndex={lessonIndex} passed={finished && passed} />
        <div className="cbet-briefing">
          <div className="cbet-hero-icon">⚡</div>
          <span className="cbet-label">Mission 1 Briefing</span>
          <h1>{missionOneBriefing.title}</h1>
          <p>{missionOneBriefing.summary}</p>
          <div className="cbet-objectives">
            <h2>Mission objectives</h2>
            {missionOneBriefing.objectives.map((objective) => (
              <div key={objective}><span>✓</span><p>{objective}</p></div>
            ))}
          </div>
          <div className="cbet-stats">
            <div><strong>9</strong><span>Lessons</span></div>
            <div><strong>2</strong><span>Scenarios</span></div>
            <div><strong>25</strong><span>Questions</span></div>
            <div><strong>250</strong><span>XP</span></div>
          </div>
          {savedProgress.phase !== "briefing" && savedProgress.phase !== "complete" && (
            <div className="cbet-resume-note">
              Progress saved: resume at {savedProgress.phase === "lessons"
                ? `Lesson ${(savedProgress.lessonIndex || 0) + 1}`
                : savedProgress.phase === "scenarios"
                ? `Scenario ${(savedProgress.scenarioIndex || 0) + 1}`
                : "Mission Challenge"}.
            </div>
          )}
          <button className="cbet-primary full" onClick={() =>
            setPhase(savedProgress.phase === "briefing" ? "lessons" : savedProgress.phase)
          }>
            {savedProgress.phase === "briefing" ? "Begin Mission" : "Resume Mission"}
          </button>
        </div>
      </section>
    );
  }

  if (phase === "lessons") {
    const lesson = missionOneLessons[lessonIndex];
    const done = Boolean(lessonChecks[lessonIndex]);
    const finalLesson = lessonIndex === missionOneLessons.length - 1;

    return (
      <section id="mission-1-active" className="cbet-shell">
        {missionOverlay}
        <button className="cbet-text-button" onClick={onBack}>← Back to Academy</button>
        <MissionJourney phase={phase} lessonIndex={lessonIndex} passed={finished && passed} />
        <div className="cbet-heading">
          <span className="cbet-label">Mission 1 • Lesson {lessonIndex + 1} of 9</span>
          <h1>{lesson.icon} {lesson.title}</h1>
        </div>
        <div className="cbet-progress-steps">
          {missionOneLessons.map((item, index) => (
            <div key={item.title} className={`${index === lessonIndex ? "active" : ""} ${lessonChecks[index] ? "done" : ""}`}>
              <span>{lessonChecks[index] ? "✓" : index + 1}</span>
            </div>
          ))}
        </div>
        <article className="cbet-lesson">
          <div className="cbet-points">
            {lesson.points.map((point) => <p key={point}><span>●</span>{point}</p>)}
          </div>
          <GlossaryTerms text={`${lesson.title} ${lesson.points.join(" ")}`} />
          <InteractiveLab type={lesson.interaction} />
          <KnowledgeCheck
            key={`mission-1-lesson-${lessonIndex}`}
            resetKey={`mission-1-lesson-${lessonIndex}`}
            progressLabel={`Lesson ${lessonIndex + 1} of ${missionOneLessons.length}`}
            check={lesson.check}
            onComplete={(isCorrect) => {
              if (isCorrect) markLessonComplete(lessonIndex);
            }}
            actions={(
              <>
                <button className="cbet-secondary" disabled={lessonIndex === 0}
                  onClick={() => setLessonIndex((i) => i - 1)}>Previous</button>
                <button className="cbet-primary" disabled={!done}
                  onClick={() => finalLesson ? setPhase("scenarios") : setLessonIndex((i) => i + 1)}>
                  {finalLesson ? "Continue to Troubleshooting" : "Continue to Next Lesson"}
                </button>
              </>
            )}
          />
        </article>
      </section>
    );
  }

  if (phase === "scenarios") {
    const scenario = missionOneScenarios[scenarioIndex];
    const done = Boolean(scenarioChecks[scenarioIndex]);
    const final = scenarioIndex === missionOneScenarios.length - 1;
    return (
      <section id="mission-1-active" className="cbet-shell">
        {missionOverlay}
        <button className="cbet-text-button" onClick={onBack}>← Back to Academy</button>
        <MissionJourney phase={phase} lessonIndex={lessonIndex} passed={finished && passed} />
        <div className="cbet-heading">
          <span className="cbet-label">Mission 1 • Applied Troubleshooting</span>
          <h1>Use the fundamentals</h1>
        </div>
        <ScenarioCard
          key={scenarioIndex}
          scenario={scenario}
          number={scenarioIndex + 1}
          onComplete={() => markScenarioComplete(scenarioIndex)}
        />
        <div className="cbet-actions">
          <button className="cbet-secondary" disabled={scenarioIndex === 0}
            onClick={() => setScenarioIndex((i) => i - 1)}>Previous</button>
          <button className="cbet-primary" disabled={!done}
            onClick={() => final ? setPhase("quiz") : setScenarioIndex((i) => i + 1)}>
            {final ? "Continue to Mission Challenge" : "Continue to Next Scenario"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="mission-1-active" className="cbet-shell">
        {missionOverlay}
      <button className="cbet-text-button" onClick={onBack}>← Back to Academy</button>
      <MissionJourney phase={phase} lessonIndex={lessonIndex} passed={finished && passed} />
      <div className="cbet-heading">
        <span className="cbet-label">Mission 1 Challenge</span>
        <h1>Electronics Fundamentals</h1>
        <p>Score 80% or higher to unlock Mission 2.</p>
      </div>

      {!finished ? (
        <article className="cbet-quiz">
          <div className="cbet-quiz-meta">
            <span>Question {questionIndex + 1} of {questions.length}</span>
            <span>{question.category}</span>
          </div>
          <div className="cbet-progress-bar"><span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>
          <h2>{question.question}</h2>
          <div className="cbet-options">
            {question.options.map((option, index) => (
              <button key={option} disabled={answered}
                className={`cbet-option ${
                  answered && index === question.answer ? "correct" : ""
                } ${answered && index === selected && index !== question.answer ? "wrong" : ""}`}
                onClick={() => choose(index)}>
                <strong>{String.fromCharCode(65 + index)}.</strong> {option}
              </button>
            ))}
          </div>
          {answered && (
            <div className="cbet-feedback">
              <strong>{selected === question.answer ? "Correct." : "Incorrect."}</strong>
              <span>{question.explanation}</span>
            </div>
          )}
          <div className="cbet-actions">
            <span>Score: {score}/{questions.length}</span>
            <button className="cbet-primary" disabled={!answered} onClick={nextQuestion}>
              {questionIndex === questions.length - 1 ? "Finish Mission" : "Next Question"}
            </button>
          </div>
        </article>
      ) : (
        <article className={`cbet-results ${passed ? "passed" : ""}`}>
          {passed && (
            <div className="cbet-confetti" aria-hidden="true">
              {Array.from({ length: 24 }, (_, index) => <i key={index} style={{ "--i": index }} />)}
            </div>
          )}
          <div className="cbet-hero-icon">{passed ? "🏆" : "📘"}</div>
          <span className="cbet-label">{passed ? "Mission Complete" : "Keep Training"}</span>
          <h1>{percent}%</h1>
          <p>{passed
            ? "Electrical Fundamentals competency earned. You earned 250 XP."
            : "You need 80% to pass. Review the lessons and try again."}</p>
          <div className="cbet-completion-summary">
            <div><span>XP earned</span><strong>{passed ? "+250" : "0"}</strong></div>
            <div><span>Mission status</span><strong>{passed ? "Complete" : "Review required"}</strong></div>
            <div><span>Next step</span><strong>{passed ? "Mission 2" : "Retake challenge"}</strong></div>
          </div>
          <div className="cbet-actions center">
            {!passed && <button className="cbet-secondary" onClick={restart}>Retake Challenge</button>}
            <button className="cbet-secondary" onClick={onBack}>Return to Academy</button>
            {passed && (
              <button className="cbet-primary" onClick={onContinueMission2}>Continue to Mission 2 →</button>
            )}
          </div>
        </article>
      )}
    </section>
  );
}


function MissionTwo({ onExit, onContinueMission3 }) {
  const lessons = missionTwoLessons;
  const scenarios = missionTwoScenarios;
  const questions = useMemo(() => missionTwoQuestions.map(shuffleQuestion), []);
  const savedProgress = getMissionProgress(2);

  const [phase, setPhaseState] = useState(savedProgress.phase || "briefing");
  const [lessonIndex, setLessonIndexState] = useState(savedProgress.lessonIndex || 0);
  const [lessonChecks, setLessonChecks] = useState(
    Object.fromEntries((savedProgress.completedLessons || []).map((index) => [index, true]))
  );
  const [scenarioIndex, setScenarioIndexState] = useState(savedProgress.scenarioIndex || 0);
  const [scenarioChecks, setScenarioChecks] = useState(
    Object.fromEntries((savedProgress.completedScenarios || []).map((index) => [index, true]))
  );
  const [questionIndex, setQuestionIndexState] = useState(savedProgress.quizIndex || 0);
  const completedModule = getCbetModuleState(2) || { complete: false, bestScore: 0 };
  const [answers, setAnswers] = useState({});
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [missedQuestions, setMissedQuestions] = useState({});
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(savedProgress.phase === "complete" && completedModule.complete);
  const [finalResult, setFinalResult] = useState(
    savedProgress.phase === "complete" && completedModule.complete
      ? { correct: Math.round((completedModule.bestScore / 100) * questions.length), percent: completedModule.bestScore }
      : null
  );
  const [xpToast, setXpToast] = useState(null);
  const [showBadgeUnlock, setShowBadgeUnlock] = useState(false);
  const lessonStageRef = useRef(null);

  const question = questions[questionIndex];
  const selected = answers[questionIndex];
  const wrongSelected = wrongAnswers[questionIndex];
  const displayedCorrect = finalResult?.correct ?? score;
  const percent =
    finalResult?.percent ??
    Math.round((displayedCorrect / questions.length) * 100);
  const passed = percent >= 80;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let timeoutId;
    let frameOne;
    let frameTwo;

    const moveToActiveStep = () => {
      const target =
        phase === "lessons"
          ? lessonStageRef.current
          : document.getElementById("mission-2-active-step");

      if (!target) {
        scrollCbetPageToTop();
        return;
      }

      const headerOffset = window.innerWidth <= 760 ? 12 : 24;
      const top = Math.max(
        0,
        target.getBoundingClientRect().top + window.scrollY - headerOffset
      );

      window.scrollTo({ top, behavior: "smooth" });
    };

    // Wait for the selected lesson, lab controls, and question card to finish rendering.
    frameOne = window.requestAnimationFrame(() => {
      frameTwo = window.requestAnimationFrame(moveToActiveStep);
    });
    timeoutId = window.setTimeout(moveToActiveStep, 180);

    return () => {
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
      window.clearTimeout(timeoutId);
    };
  }, [phase, lessonIndex, scenarioIndex]);

  function setPhase(nextPhase) {
    setPhaseState(nextPhase);
    saveMissionProgress(2, { phase: nextPhase });
  }

  function setLessonIndex(next) {
    const value = typeof next === "function" ? next(lessonIndex) : next;
    setLessonIndexState(value);
    saveMissionProgress(2, { lessonIndex: value, phase: "lessons" });
  }

  function setScenarioIndex(next) {
    const value = typeof next === "function" ? next(scenarioIndex) : next;
    setScenarioIndexState(value);
    saveMissionProgress(2, { scenarioIndex: value, phase: "scenarios" });
  }

  function setQuestionIndex(next) {
    const value = typeof next === "function" ? next(questionIndex) : next;
    setQuestionIndexState(value);
    saveMissionProgress(2, { quizIndex: value, phase: "quiz" });
  }

  function markLessonComplete(index) {
    setLessonChecks((previous) => {
      const next = { ...previous, [index]: true };
      saveMissionProgress(2, {
        completedLessons: Object.keys(next).filter((key) => next[key]).map(Number),
        lessonIndex: index,
        phase: "lessons",
      });
      const before = getCbetAcademyState().xp;
      const updated = awardCbetXp(15, `mission2-lesson-${index}`);
      if (updated.xp > before) setXpToast({ amount: 15, label: "Component lesson complete" });
      return next;
    });
  }

  function markScenarioComplete(index) {
    setScenarioChecks((previous) => {
      const next = { ...previous, [index]: true };
      saveMissionProgress(2, {
        completedScenarios: Object.keys(next).filter((key) => next[key]).map(Number),
        scenarioIndex: index,
        phase: "scenarios",
      });
      const before = getCbetAcademyState().xp;
      const updated = awardCbetXp(20, `mission2-scenario-${index}`);
      if (updated.xp > before) setXpToast({ amount: 20, label: "Troubleshooting case complete" });
      return next;
    });
  }

  function chooseAnswer(index) {
    if (selected !== undefined) return;

    if (index !== question.answer) {
      setWrongAnswers((previous) => ({ ...previous, [questionIndex]: index }));
      setMissedQuestions((previous) => ({ ...previous, [questionIndex]: true }));
      playCbetTone("wrong");
      return;
    }

    setAnswers((previous) => ({ ...previous, [questionIndex]: index }));
    setWrongAnswers((previous) => {
      const next = { ...previous };
      delete next[questionIndex];
      return next;
    });
    playCbetTone("correct");
    if (!missedQuestions[questionIndex]) setScore((previous) => previous + 1);
  }

  function nextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      const completedAnswers = {
        ...answers,
        [questionIndex]: selected,
      };

      const finalCorrect = questions.reduce(
        (total, item, index) =>
          total + (completedAnswers[index] === item.answer && !missedQuestions[index] ? 1 : 0),
        0
      );

      const finalScore = Math.round(
        (finalCorrect / questions.length) * 100
      );

      setFinalResult({
        correct: finalCorrect,
        percent: finalScore,
      });

      const wasComplete = getCbetModuleState(2).complete;
      completeCbetModule(2, finalScore, 350);

      if (finalScore >= 80 && !wasComplete) {
        setShowBadgeUnlock(true);
        setXpToast({ amount: 350, label: "Mission 2 complete" });
      }

      setFinished(true);
      setPhase("complete");
    }
  }

  function restartQuiz() {
    setQuestionIndexState(0);
    setAnswers({});
    setScore(0);
    setFinished(false);
    setFinalResult(null);
    saveMissionProgress(2, { phase: "quiz", quizIndex: 0 });
    setPhaseState("quiz");
  }

  const missionOverlay = (
    <>
      {xpToast && <XpToast {...xpToast} onDone={() => setXpToast(null)} />}
      {showBadgeUnlock && (
        <div className="cbet-badge-unlock" role="status">
          <div className="cbet-badge-burst">🔧</div>
          <span>Competency Earned</span>
          <strong>Electronic Components</strong>
          <button className="cbet-primary" onClick={() => setShowBadgeUnlock(false)}>Continue</button>
        </div>
      )}
    </>
  );

  if (phase === "briefing") {
    const hasSavedProgress =
      savedProgress.phase !== "briefing" && savedProgress.phase !== "complete";

    const resumeLabel =
      savedProgress.phase === "lessons"
        ? `Lesson ${(savedProgress.lessonIndex || 0) + 1}`
        : savedProgress.phase === "scenarios"
        ? `Scenario ${(savedProgress.scenarioIndex || 0) + 1}`
        : "Mission Challenge";

    return (
      <section className="cbet-shell mission-two-launch-shell">
        {missionOverlay}

        <style>{`
          .mission-two-launch-shell {
            --m2-navy: #0b2742;
            --m2-blue: #1769aa;
            --m2-cyan: #55d7ff;
            --m2-gold: #ffc83d;
            --m2-text: #eef8ff;
            --m2-muted: #b9d2e2;
            min-height: 100vh;
            padding: clamp(18px, 3vw, 42px);
            color: var(--m2-text);
            background:
              radial-gradient(circle at 12% 0%, rgba(40, 151, 211, .25), transparent 34%),
              radial-gradient(circle at 100% 14%, rgba(255, 200, 61, .12), transparent 26%),
              linear-gradient(135deg, #071827 0%, #0b2b47 58%, #193e4a 100%);
          }

          .mission-two-launch-shell * {
            box-sizing: border-box;
          }

          .mission-two-topbar,
          .mission-two-launch-card {
            width: min(1180px, 100%);
            margin-inline: auto;
          }

          .mission-two-topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            margin-bottom: clamp(22px, 4vw, 42px);
          }

          .mission-two-back {
            display: inline-flex;
            align-items: center;
            gap: 9px;
            min-height: 44px;
            padding: 0;
            border: 0;
            background: transparent;
            color: #d9efff;
            font: inherit;
            font-weight: 800;
            cursor: pointer;
          }

          .mission-two-back:hover {
            color: white;
            transform: translateX(-2px);
          }

          .mission-two-path {
            color: #82bddf;
            font-size: .78rem;
            font-weight: 900;
            letter-spacing: .1em;
            text-transform: uppercase;
          }

          .mission-two-launch-card {
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(120, 204, 244, .24);
            border-radius: 30px;
            background: linear-gradient(145deg, rgba(13, 47, 75, .96), rgba(8, 28, 44, .98));
            box-shadow: 0 28px 75px rgba(0, 0, 0, .34);
          }

          .mission-two-launch-card::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
              linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
            background-size: 34px 34px;
            mask-image: linear-gradient(to bottom, black, transparent 78%);
          }

          .mission-two-hero {
            position: relative;
            z-index: 1;
            display: grid;
            grid-template-columns: minmax(0, 1.45fr) minmax(280px, .75fr);
            gap: clamp(28px, 5vw, 72px);
            align-items: center;
            padding: clamp(30px, 6vw, 72px);
          }

          .mission-two-copy {
            min-width: 0;
          }

          .mission-two-kicker {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 9px 14px;
            border: 1px solid rgba(85, 215, 255, .34);
            border-radius: 999px;
            background: rgba(85, 215, 255, .08);
            color: #8ce4ff;
            font-size: .78rem;
            font-weight: 950;
            letter-spacing: .1em;
            text-transform: uppercase;
          }

          .mission-two-kicker i {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: var(--m2-cyan);
            box-shadow: 0 0 18px rgba(85, 215, 255, .85);
          }

          .mission-two-copy h1 {
            margin: 22px 0 16px;
            color: white;
            font-size: clamp(2.7rem, 7vw, 5.6rem);
            line-height: .96;
            letter-spacing: -.055em;
          }

          .mission-two-copy > p {
            max-width: 760px;
            margin: 0;
            color: var(--m2-muted);
            font-size: clamp(1.05rem, 2vw, 1.35rem);
            line-height: 1.65;
          }

          .mission-two-focus {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 26px;
          }

          .mission-two-focus span {
            padding: 9px 12px;
            border: 1px solid rgba(255,255,255,.1);
            border-radius: 999px;
            background: rgba(255,255,255,.055);
            color: #e6f6ff;
            font-size: .82rem;
            font-weight: 800;
          }

          .mission-two-emblem {
            position: relative;
            display: grid;
            place-items: center;
            width: min(280px, 100%);
            aspect-ratio: 1;
            margin-inline: auto;
            border: 1px solid rgba(85, 215, 255, .22);
            border-radius: 50%;
            background:
              radial-gradient(circle, rgba(85, 215, 255, .14), rgba(17, 74, 110, .08) 58%, transparent 60%),
              rgba(4, 20, 31, .42);
            box-shadow:
              inset 0 0 50px rgba(85, 215, 255, .08),
              0 20px 55px rgba(0,0,0,.24);
          }

          .mission-two-emblem::before,
          .mission-two-emblem::after {
            content: "";
            position: absolute;
            border: 1px solid rgba(85, 215, 255, .22);
            border-radius: 50%;
          }

          .mission-two-emblem::before { inset: 17%; }
          .mission-two-emblem::after { inset: 33%; }

          .mission-two-emblem span {
            position: relative;
            z-index: 2;
            font-size: clamp(4rem, 9vw, 7rem);
            filter: drop-shadow(0 14px 22px rgba(0,0,0,.32));
          }

          .mission-two-emblem strong {
            position: absolute;
            bottom: 16%;
            z-index: 2;
            color: #a9eaff;
            font-size: .72rem;
            letter-spacing: .13em;
            text-transform: uppercase;
          }

          .mission-two-stat-grid {
            position: relative;
            z-index: 1;
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 14px;
            padding: 0 clamp(30px, 6vw, 72px) clamp(28px, 5vw, 56px);
          }

          .mission-two-stat {
            min-width: 0;
            padding: 20px;
            border: 1px solid rgba(123, 198, 235, .17);
            border-radius: 18px;
            background: rgba(255,255,255,.045);
            backdrop-filter: blur(5px);
          }

          .mission-two-stat small {
            display: block;
            color: #87b9d5;
            font-size: .7rem;
            font-weight: 950;
            letter-spacing: .08em;
            text-transform: uppercase;
          }

          .mission-two-stat strong {
            display: block;
            margin-top: 7px;
            color: white;
            font-size: clamp(1.65rem, 3vw, 2.25rem);
          }

          .mission-two-stat span {
            display: block;
            margin-top: 4px;
            color: #b9d2e2;
            font-size: .85rem;
          }

          .mission-two-resume {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 0 clamp(30px, 6vw, 72px) 22px;
            padding: 15px 18px;
            border: 1px solid rgba(255, 200, 61, .28);
            border-radius: 14px;
            background: rgba(255, 200, 61, .07);
            color: #ffe99a;
            font-weight: 800;
          }

          .mission-two-actions {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            padding: 24px clamp(30px, 6vw, 72px);
            border-top: 1px solid rgba(123, 198, 235, .15);
            background: rgba(3, 17, 27, .46);
          }

          .mission-two-actions-copy strong {
            display: block;
            color: white;
            font-size: 1rem;
          }

          .mission-two-actions-copy span {
            display: block;
            margin-top: 4px;
            color: #8fb8cf;
            font-size: .83rem;
          }

          .mission-two-start {
            flex: 0 0 auto;
            min-width: 240px;
            min-height: 58px;
            padding: 0 25px;
            border: 0;
            border-radius: 15px;
            background: linear-gradient(135deg, #ffd75a, #ffb300);
            color: #142536;
            font: inherit;
            font-size: 1rem;
            font-weight: 950;
            cursor: pointer;
            box-shadow: 0 14px 30px rgba(255, 179, 0, .22);
            transition: transform .18s ease, box-shadow .18s ease;
          }

          .mission-two-start:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 38px rgba(255, 179, 0, .3);
          }

          .mission-two-start:focus-visible,
          .mission-two-back:focus-visible {
            outline: 3px solid rgba(85, 215, 255, .72);
            outline-offset: 4px;
          }

          @media (max-width: 880px) {
            .mission-two-hero {
              grid-template-columns: 1fr;
            }

            .mission-two-emblem {
              width: min(220px, 70vw);
            }

            .mission-two-stat-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 600px) {
            .mission-two-launch-shell {
              padding: 14px;
            }

            .mission-two-topbar {
              align-items: flex-start;
              flex-direction: column;
            }

            .mission-two-hero,
            .mission-two-stat-grid,
            .mission-two-actions {
              padding-left: 20px;
              padding-right: 20px;
            }

            .mission-two-copy h1 {
              font-size: clamp(2.35rem, 13vw, 3.8rem);
            }

            .mission-two-stat-grid {
              grid-template-columns: 1fr;
            }

            .mission-two-resume {
              margin-left: 20px;
              margin-right: 20px;
            }

            .mission-two-actions {
              align-items: stretch;
              flex-direction: column;
            }

            .mission-two-start {
              width: 100%;
              min-width: 0;
            }
          }
        `}</style>

        <div className="mission-two-topbar">
          <button type="button" className="mission-two-back" onClick={onExit}>
            <span aria-hidden="true">←</span>
            Back to Academy Dashboard
          </button>
          <span className="mission-two-path">CBET Certification Academy</span>
        </div>

        <article className="mission-two-launch-card">
          <MissionJourney phase={phase} lessonIndex={lessonIndex} lessonCount={lessons.length} passed={false} />
          <div className="mission-two-hero">
            <div className="mission-two-copy">
              <span className="mission-two-kicker">
                <i aria-hidden="true" />
                Mission 2
              </span>

              <h1>Electronic Components</h1>

              <p>
                Learn how real components behave, fail, and appear during
                troubleshooting through guided lessons, interactive benches,
                and applied diagnostic cases.
              </p>

              <div className="mission-two-focus" aria-label="Mission focus areas">
                <span>Component recognition</span>
                <span>Failure behavior</span>
                <span>Safe troubleshooting</span>
                <span>Power-supply diagnostics</span>
              </div>
            </div>

            <div className="mission-two-emblem" aria-hidden="true">
              <span>🔧</span>
              <strong>Component Specialist Path</strong>
            </div>
          </div>

          <div className="mission-two-stat-grid">
            <div className="mission-two-stat">
              <small>Guided learning</small>
              <strong>9</strong>
              <span>Interactive lessons</span>
            </div>
            <div className="mission-two-stat">
              <small>Applied practice</small>
              <strong>4</strong>
              <span>Troubleshooting cases</span>
            </div>
            <div className="mission-two-stat">
              <small>Knowledge challenge</small>
              <strong>25</strong>
              <span>Mission questions</span>
            </div>
            <div className="mission-two-stat">
              <small>Completion reward</small>
              <strong>350 XP</strong>
              <span>Electronic Components competency</span>
            </div>
          </div>

          {hasSavedProgress && (
            <div className="mission-two-resume">
              <span aria-hidden="true">●</span>
              Progress saved — continue at {resumeLabel}.
            </div>
          )}

          <div className="mission-two-actions">
            <div className="mission-two-actions-copy">
              <strong>Ready to begin Mission 2?</strong>
              <span>Your progress is saved automatically as you advance.</span>
            </div>

            <button
              type="button"
              className="mission-two-start"
              onClick={() =>
                setPhase(
                  savedProgress.phase === "briefing"
                    ? "lessons"
                    : savedProgress.phase
                )
              }
            >
              {savedProgress.phase === "briefing"
                ? "Begin Mission 2 →"
                : "Resume Mission 2 →"}
            </button>
          </div>
        </article>
      </section>
    );
  }

  if (phase === "lessons") {
    const lesson = lessons[lessonIndex];
    const complete = lessonChecks[lessonIndex];
    return (
      <section className="cbet-shell">
        {missionOverlay}
        <button className="cbet-back" onClick={onExit}>← Academy Dashboard</button>
        <MissionJourney phase={phase} lessonIndex={lessonIndex} lessonCount={lessons.length} passed={phase === "complete" && passed} />
        <div className="cbet-subprogress">
          <span>Lesson {lessonIndex + 1} of {lessons.length}</span>
          <div><i style={{ width: `${((lessonIndex + (complete ? 1 : 0)) / lessons.length) * 100}%` }} /></div>
        </div>
        <article id="mission-2-active-step" className="cbet-lesson-card mission-two-lesson-card">
          <div className="cbet-lesson-icon">{lesson.icon}</div>
          <span className="cbet-label">Component Lesson {lessonIndex + 1}</span>
          <h2>{lesson.title}</h2>
          <p className="cbet-lesson-summary">{lesson.summary}</p>
          <div className="cbet-points">
            {lesson.points.map((point) => <p key={point}><span>●</span>{point}</p>)}
          </div>
          <GlossaryTerms text={`${lesson.title} ${lesson.points.join(" ")}`} />
          <div className="mission-two-guided-stage" ref={lessonStageRef}>
            <div className="mission-two-activity-pane">
              <span className="mission-two-pane-label">Interactive activity</span>
              <MissionTwoLab type={lesson.interaction} />
            </div>
            <div className="mission-two-question-pane">
              <span className="mission-two-pane-label">Apply what you learned</span>
              <KnowledgeCheck
                key={`mission-2-lesson-${lessonIndex}`}
                resetKey={`mission-2-lesson-${lessonIndex}`}
                progressLabel={`Lesson ${lessonIndex + 1} of ${lessons.length}`}
                check={{
              prompt: lessonIndex === 0 ? "What happens to current when resistance increases and voltage stays constant?"
                : lessonIndex === 1 ? "What commonly causes excessive ripple after a rectifier?"
                : lessonIndex === 2 ? "What should a healthy diode do in reverse bias?"
                : lessonIndex === 3 ? "What does a small transistor control signal do?"
                : lessonIndex === 4 ? "Why does an LED need a series resistor?"
                : lessonIndex === 5 ? "Which relationship sets transformer voltage ratio?"
                : lessonIndex === 6 ? "What changes when a relay coil is energized?"
                : lessonIndex === 7 ? "What is the safest way to confirm component identity?"
                : "What is the best troubleshooting approach?",
              options: lessonIndex === 0 ? ["Current rises", "Current falls", "Current stays identical", "Voltage becomes AC"]
                : lessonIndex === 1 ? ["Open speaker", "Failed filter capacitor", "Dirty screen", "Network fault"]
                : lessonIndex === 2 ? ["Conduct strongly", "Block current", "Act as a relay", "Store charge"]
                : lessonIndex === 3 ? ["A larger current path", "Only transformer turns", "A fuse rating", "Network speed"]
                : lessonIndex === 4 ? ["To limit current", "To increase ripple", "To bypass polarity", "To generate AC"]
                : lessonIndex === 5 ? ["Turns ratio", "Fuse color", "Relay contact type", "Capacitor ESR only"]
                : lessonIndex === 6 ? ["Contacts switch state", "Capacitance doubles", "The diode becomes open", "Resistance disappears"]
                : lessonIndex === 7 ? ["Use markings, package, and circuit context", "Guess by color only", "Apply line voltage", "Bypass the fuse"]
                : ["Follow the energy path and measure each stage", "Replace all parts", "Increase fuse size", "Skip inspection"],
              answer: lessonIndex === 0 ? 1 : lessonIndex === 1 ? 1 : lessonIndex === 2 ? 1 : lessonIndex === 3 ? 0 : lessonIndex === 4 ? 0 : lessonIndex === 5 ? 0 : lessonIndex === 6 ? 0 : lessonIndex === 7 ? 0 : 0,
              explanation: "Correct. This is the key behavior to remember for this component."
            }}
                onComplete={(isCorrect) => {
                  if (isCorrect) markLessonComplete(lessonIndex);
                }}
                actions={(
                  <>
                    <button className="cbet-secondary" disabled={lessonIndex === 0}
                      onClick={() => setLessonIndex(Math.max(0, lessonIndex - 1))}>Previous</button>
                    {lessonIndex < lessons.length - 1 ? (
                      <button className="cbet-primary" disabled={!complete}
                        onClick={() => setLessonIndex(lessonIndex + 1)}>Next Lesson</button>
                    ) : (
                      <button className="cbet-primary" disabled={!complete}
                        onClick={() => setPhase("scenarios")}>Begin Applied Cases</button>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </article>
      </section>
    );
  }

  if (phase === "scenarios") {
    const scenario = scenarios[scenarioIndex];
    const complete = scenarioChecks[scenarioIndex];
    return (
      <section className="cbet-shell">
        {missionOverlay}
        <button className="cbet-back" onClick={onExit}>← Academy Dashboard</button>
        <MissionJourney phase={phase} lessonIndex={lessonIndex} lessonCount={lessons.length} passed={phase === "complete" && passed} />
        <div className="cbet-subprogress">
          <span>Applied Case {scenarioIndex + 1} of {scenarios.length}</span>
          <div><i style={{ width: `${((scenarioIndex + (complete ? 1 : 0)) / scenarios.length) * 100}%` }} /></div>
        </div>
        <div id="mission-2-active-step">
          <ScenarioCard
            key={`mission-2-scenario-${scenarioIndex}`}
            scenario={scenario}
            number={scenarioIndex + 1}
            onComplete={() => markScenarioComplete(scenarioIndex)}
            actions={(
              <>
                <button className="cbet-secondary" disabled={scenarioIndex === 0}
                  onClick={() => setScenarioIndex(Math.max(0, scenarioIndex - 1))}>Previous</button>
                {scenarioIndex < scenarios.length - 1 ? (
                  <button className="cbet-primary"
                    onClick={() => setScenarioIndex(scenarioIndex + 1)}>Next Case</button>
                ) : (
                  <button className="cbet-primary"
                    onClick={() => setPhase("quiz")}>Begin Mission Challenge</button>
                )}
              </>
            )}
          />
        </div>
      </section>
    );
  }

  if (phase === "quiz" && !finished) {
    return (
      <section className="cbet-shell">
        {missionOverlay}
        <button className="cbet-back" onClick={onExit}>← Academy Dashboard</button>
        <MissionJourney phase={phase} lessonIndex={lessonIndex} lessonCount={lessons.length} passed={phase === "complete" && passed} />
        <div className="cbet-subprogress">
          <span>Question {questionIndex + 1} of {questions.length}</span>
          <div><i style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>
        </div>
        <article id="mission-2-active-step" className="cbet-quiz-card">
          <span className="cbet-label">Mission 2 Challenge</span>
          <h2>{question.question}</h2>
          <div className="cbet-option-grid">
            {question.options.map((option, index) => {
              let className = "";
              if (selected !== undefined && index === selected) className = "correct";
              else if (wrongSelected !== undefined && index === wrongSelected) className = "wrong";
              return <button key={option} className={className} onClick={() => chooseAnswer(index)}>{option}</button>;
            })}
          </div>
          {(selected !== undefined || wrongSelected !== undefined) && (
            <div className={`cbet-feedback ${selected !== undefined ? "good" : "bad"}`}>
              <strong>{selected !== undefined ? "Correct" : "Not quite. Try again."}</strong>
              <p>{selected !== undefined ? question.explanation : "Choose another answer. The correct answer will not be revealed."}</p>
            </div>
          )}
          <button className="cbet-primary full" disabled={selected === undefined} onClick={nextQuestion}>
            {questionIndex === questions.length - 1 ? "Finish Mission" : "Next Question"}
          </button>
        </article>
      </section>
    );
  }

  return (
    <section className="cbet-shell">
      {missionOverlay}
      <button className="cbet-back" onClick={onExit}>← Academy Dashboard</button>
      <MissionJourney phase="complete" lessonIndex={lessons.length - 1} lessonCount={lessons.length} passed={passed} />
      <article className={`cbet-results ${passed ? "passed" : ""}`}>
        {passed && (
          <div className="cbet-confetti" aria-hidden="true">
            {Array.from({ length: 24 }, (_, index) => <i key={index} style={{ "--i": index }} />)}
          </div>
        )}
        <div className="cbet-hero-icon">{passed ? "🔧" : "📘"}</div>
        <span className="cbet-label">Mission 2 Results</span>
        <h1 className="cbet-results-title">
          {passed ? "Component Specialist" : "Keep Building Your Skills"}
        </h1>
        <div className="cbet-score-ring" aria-label={`${percent}% score`}>
          <strong>{percent}%</strong>
          <span>{displayedCorrect} of {questions.length}</span>
        </div>
        <p>{passed
          ? "You completed Electronic Components and earned 350 XP plus the Electronic Components competency."
          : "An 80% score is required. Review the interactive component labs, then try again."}</p>
        <div className="cbet-completion-summary">
          <div><span>XP earned</span><strong>{passed ? "+350" : "0"}</strong></div>
          <div><span>Mission status</span><strong>{passed ? "Complete" : "Review required"}</strong></div>
          <div><span>Next step</span><strong>{passed ? "Mission 3" : "Retake challenge"}</strong></div>
        </div>
        <div className="cbet-nav-row center">
          {!passed && <button className="cbet-secondary" onClick={restartQuiz}>Retake Challenge</button>}
          <button className="cbet-secondary" onClick={onExit}>Return to Academy</button>
          {passed && (
            <button className="cbet-primary" onClick={onContinueMission3}>Continue to Mission 3 →</button>
          )}
        </div>
      </article>
    </section>
  );
}



const MISSION_THREE_LESSONS = [
  {
    icon: "🔌",
    title: "Digital Multimeter Setup",
    summary: "Select the correct function, input jack, range, and probe placement before taking a measurement.",
    points: [
      "Voltage is measured across a component or source.",
      "Current is measured by opening the circuit and placing the meter in series.",
      "Resistance and continuity are checked only after power is removed."
    ],
    interaction: "dmm",
    check: {
      question: "Before measuring resistance, what must you do first?",
      options: ["Remove power from the circuit", "Move the red lead to the current jack", "Increase the fuse rating", "Connect the meter in series"],
      answer: 0,
      explanation: "Resistance testing uses the meter's internal source, so external circuit power must be removed."
    }
  },
  {
    icon: "📈",
    title: "Oscilloscope Fundamentals",
    summary: "Use vertical scale, time base, triggering, and probe compensation to obtain a stable waveform.",
    points: [
      "Volts/div controls the waveform's vertical size.",
      "Time/div controls how much time appears across the screen.",
      "Trigger settings stabilize repeating signals."
    ],
    interaction: "scope",
    check: {
      question: "Which oscilloscope control changes the amount of time shown horizontally?",
      options: ["Time per division", "Volts per division", "Trigger level only", "Probe attenuation"],
      answer: 0,
      explanation: "Time per division controls the horizontal time scale."
    }
  },
  {
    icon: "🛡️",
    title: "Electrical Safety Analyzer",
    summary: "Evaluate protective earth resistance, leakage current, and applied-part safety using the correct standard and setup.",
    points: [
      "Inspect the device and power cord before testing.",
      "Protective earth resistance verifies the grounding path.",
      "Leakage tests must match the device class and applied-part type."
    ],
    interaction: "safety",
    check: {
      question: "What does a protective earth resistance test primarily evaluate?",
      options: ["The low-resistance grounding path", "Battery capacity", "Network speed", "Display brightness"],
      answer: 0,
      explanation: "The test confirms that exposed conductive parts have a dependable path to protective earth."
    }
  },
  {
    icon: "❤️",
    title: "Patient Simulators",
    summary: "Generate known ECG, respiration, temperature, and invasive-pressure signals to verify monitor performance.",
    points: [
      "Start with a known normal signal before testing alarms.",
      "Match cable configuration and lead selection to the device.",
      "Document both the simulator setting and monitor response."
    ],
    interaction: "simulator",
    check: {
      question: "Why should the simulator setting be documented with the monitor reading?",
      options: ["To compare the known input with the displayed output", "To increase leakage current", "To bypass calibration", "To change the network address"],
      answer: 0,
      explanation: "A known input and observed output are both needed to evaluate accuracy."
    }
  },
  {
    icon: "💧",
    title: "Infusion Device Analyzer",
    summary: "Measure flow rate, delivered volume, occlusion pressure, and alarm behavior safely.",
    points: [
      "Prime tubing to remove air before beginning the test.",
      "Allow enough test time for a meaningful flow-rate average.",
      "Verify occlusion and air-in-line alarms separately."
    ],
    interaction: "infusion",
    check: {
      question: "What should be done before starting an infusion flow test?",
      options: ["Prime the tubing and remove air", "Increase the programmed rate beyond specifications", "Disable all alarms", "Use an open container with no analyzer"],
      answer: 0,
      explanation: "Air in the test line can distort flow and volume measurements."
    }
  },
  {
    icon: "⚡",
    title: "Defibrillator Analyzer",
    summary: "Verify delivered energy, charge time, synchronization, pacing output, and safety without using a patient.",
    points: [
      "Use a rated defibrillator analyzer or approved test load.",
      "Confirm selected energy and measured delivered energy.",
      "Test synchronized cardioversion timing with a simulated ECG."
    ],
    interaction: "defib",
    check: {
      question: "Where should a defibrillator be discharged during performance testing?",
      options: ["Into a rated analyzer or approved test load", "Into open air", "Through a standard multimeter", "Directly into an oscilloscope input"],
      answer: 0,
      explanation: "A rated analyzer safely absorbs the pulse and measures delivered energy."
    }
  },
  {
    icon: "🌡️",
    title: "Pressure, Flow, and Temperature Analyzers",
    summary: "Apply traceable reference values to verify sensors used in ventilators, anesthesia systems, pumps, and monitors.",
    points: [
      "Zero pressure channels before applying a reference.",
      "Use the correct units and environmental conditions.",
      "Compare multiple points across the operating range."
    ],
    interaction: "process",
    check: {
      question: "Why should multiple points across a device's range be tested?",
      options: ["To evaluate accuracy across the operating range", "To eliminate the need for documentation", "To change the device serial number", "To avoid using a reference standard"],
      answer: 0,
      explanation: "One point cannot confirm linearity or performance across the full range."
    }
  }
];

const MISSION_THREE_SCENARIOS = [
  {
    title: "Unstable ECG Waveform",
    patient: "A patient monitor shows a drifting, unstable waveform while connected to a simulator.",
    question: "What is the best first troubleshooting step?",
    options: [
      "Verify lead connections, simulator output, and selected lead",
      "Replace the monitor immediately",
      "Increase the alarm limits",
      "Disable the ECG function"
    ],
    answer: 0,
    explanation: "Confirm the known source and signal path before replacing equipment."
  },
  {
    title: "Infusion Pump Flow Discrepancy",
    patient: "A pump programmed for 100 mL/hr averages 86 mL/hr on the analyzer.",
    question: "What should the technician do next?",
    options: [
      "Confirm the tubing set, priming, test duration, and setup before adjustment",
      "Increase the pump rate until the analyzer reads 100",
      "Ignore the result because flow varies",
      "Replace the battery only"
    ],
    answer: 0,
    explanation: "Rule out setup and consumable errors before calibration or repair."
  },
  {
    title: "Excessive Leakage Current",
    patient: "An analyzer reports leakage above the applicable limit.",
    question: "What is the safest next action?",
    options: [
      "Remove the device from service and inspect the power path, grounding, and accessories",
      "Bypass the ground conductor",
      "Repeat the test with a higher limit",
      "Return the device without documentation"
    ],
    answer: 0,
    explanation: "An out-of-limit safety result requires removal from service and investigation."
  }
];

const MISSION_THREE_QUESTIONS = [
  ["Voltage should normally be measured:", ["Across the source or component", "In series with the load", "With power removed only", "Through the current jack"], 0],
  ["Current should normally be measured:", ["With the meter in series", "Across the source", "With both probes in COM", "Using resistance mode"], 0],
  ["Resistance testing requires:", ["Power removed", "Maximum line voltage", "Current mode", "An energized relay"], 0],
  ["The oscilloscope vertical scale is controlled by:", ["Volts per division", "Time per division", "Trigger slope only", "Sweep delay only"], 0],
  ["The oscilloscope horizontal scale is controlled by:", ["Time per division", "Volts per division", "Input impedance only", "Coupling only"], 0],
  ["A trigger is used to:", ["Stabilize a repeating waveform", "Measure protective earth resistance", "Prime infusion tubing", "Charge a defibrillator"], 0],
  ["Protective earth resistance evaluates:", ["The grounding path", "ECG amplitude", "Battery chemistry", "Network latency"], 0],
  ["Leakage-current limits depend on:", ["Device class and applied-part type", "Screen size only", "Hospital bed count", "Cable color"], 0],
  ["Before electrical safety testing, first:", ["Inspect the device and power cord", "Bypass the ground", "Disable the analyzer", "Increase the limits"], 0],
  ["A patient simulator provides:", ["A known reference signal", "A repair history", "A network password", "A leakage-current path"], 0],
  ["To verify ECG accuracy, compare:", ["Simulator setting with monitor display", "Battery age with room temperature", "Cable color with serial number", "Alarm volume with network speed"], 0],
  ["Before an infusion flow test:", ["Prime the tubing", "Disable all alarms", "Use damaged tubing", "Skip the analyzer setup"], 0],
  ["A longer infusion test generally provides:", ["A more meaningful average flow rate", "A higher leakage current", "A lower line voltage", "A different serial number"], 0],
  ["Occlusion pressure testing evaluates:", ["The pump's response to a blocked line", "ECG gain", "Defibrillator energy", "Ground resistance"], 0],
  ["A defibrillator should be discharged into:", ["A rated analyzer or approved load", "Open air", "A standard DMM", "A patient simulator ECG lead"], 0],
  ["Synchronized cardioversion testing verifies:", ["Pulse timing relative to the ECG", "Infusion volume", "Protective earth resistance", "Temperature accuracy"], 0],
  ["Delivered defibrillator energy should be compared with:", ["The selected energy setting and tolerance", "The room number", "The battery serial number only", "The ECG lead color"], 0],
  ["Pressure channels should be zeroed:", ["Before applying the reference pressure", "After every answer choice", "Only after a failed test", "While over-ranged"], 0],
  ["Testing several points across a range evaluates:", ["Accuracy and linearity", "Only the power cord", "Network security", "Alarm volume"], 0],
  ["Traceability means the reference is linked to:", ["Recognized measurement standards", "A random device", "The hospital logo", "An unverified source"], 0],
  ["An out-of-limit safety result requires:", ["Removal from service and investigation", "Changing the limit", "Ignoring the result", "Bypassing protective earth"], 0],
  ["The safest troubleshooting sequence begins by:", ["Confirming setup and the known source", "Replacing every board", "Increasing fuse ratings", "Skipping inspection"], 0],
  ["Documentation should include:", ["Test setup, reference values, results, and disposition", "Only the technician's initials", "Only the device color", "No failed results"], 0],
  ["Probe attenuation must match:", ["The oscilloscope channel setting", "The infusion rate", "The defibrillator energy", "The leakage-current limit"], 0],
  ["The best reason to use specialized analyzers is to:", ["Apply controlled references and safely measure device performance", "Avoid all documentation", "Bypass manufacturer procedures", "Replace visual inspection"], 0]
].map(([question, options, answer]) => ({
  question,
  options,
  answer,
  explanation: "Use the correct analyzer, setup, and safety process for the measurement being performed."
}));

function MissionThreeLab({ type }) {
  const [value, setValue] = useState(type === "scope" ? 5 : 50);
  const [mode, setMode] = useState("ready");

  const labels = {
    dmm: ["Meter mode", "DC Voltage", `${value.toFixed(1)} V`],
    scope: ["Time base", `${value} ms/div`, "Stable waveform"],
    safety: ["Protective earth", `${(value / 100).toFixed(2)} Ω`, value < 50 ? "Pass" : "Review"],
    simulator: ["ECG rate", `${value + 30} bpm`, "Known reference"],
    infusion: ["Programmed flow", `${value + 50} mL/hr`, `${value + 48} mL/hr measured`],
    defib: ["Selected energy", `${value * 2 + 100} J`, `${value * 2 + 96} J delivered`],
    process: ["Reference input", `${value} units`, `${(value * 0.99).toFixed(1)} measured`]
  };

  const [label, setting, reading] = labels[type] || labels.dmm;

  return (
    <div className="cbet-lab mission-three-lab">
      <div className="cbet-lab-title">Interactive Test Equipment Bench</div>
      <div className="mission-three-instrument">
        <div className="mission-three-display">
          <small>{label}</small>
          <strong>{reading}</strong>
          <span>{mode === "ready" ? "Reference applied" : "Analyzer reset"}</span>
        </div>
        <label>
          {setting}
          <input
            type="range"
            min="1"
            max="100"
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
          />
        </label>
        <div className="cbet-toggle">
          <button
            type="button"
            className={mode === "ready" ? "active" : ""}
            onClick={() => setMode("ready")}
          >
            Apply Reference
          </button>
          <button
            type="button"
            className={mode === "reset" ? "active" : ""}
            onClick={() => setMode("reset")}
          >
            Reset Analyzer
          </button>
        </div>
      </div>
      <p className="cbet-lab-tip">
        Confirm the analyzer setup, units, leads, and applicable limits before recording a result.
      </p>
    </div>
  );
}

function MissionThree({ onExit }) {
  const lessons = MISSION_THREE_LESSONS;
  const scenarios = MISSION_THREE_SCENARIOS;
  const questions = useMemo(
    () => MISSION_THREE_QUESTIONS.map(shuffleQuestion),
    []
  );
  const savedProgress = getMissionProgress(3);

  const [phase, setPhaseState] = useState(savedProgress.phase || "briefing");
  const [lessonIndex, setLessonIndexState] = useState(savedProgress.lessonIndex || 0);
  const [lessonChecks, setLessonChecks] = useState(
    Object.fromEntries((savedProgress.completedLessons || []).map((index) => [index, true]))
  );
  const [scenarioIndex, setScenarioIndexState] = useState(savedProgress.scenarioIndex || 0);
  const [scenarioChecks, setScenarioChecks] = useState(
    Object.fromEntries((savedProgress.completedScenarios || []).map((index) => [index, true]))
  );
  const [questionIndex, setQuestionIndexState] = useState(savedProgress.quizIndex || 0);
  const completedModule = getCbetModuleState(3) || { complete: false, bestScore: 0 };
  const [answers, setAnswers] = useState({});
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [missedQuestions, setMissedQuestions] = useState({});
  const [score, setScore] = useState(0);
  const [finalResult, setFinalResult] = useState(
    savedProgress.phase === "complete" && completedModule.complete
      ? { correct: Math.round((completedModule.bestScore / 100) * questions.length), percent: completedModule.bestScore }
      : null
  );
  const [xpToast, setXpToast] = useState(null);
  const lessonStageRef = useRef(null);

  const question = questions[questionIndex];
  const selected = answers[questionIndex];
  const wrongSelected = wrongAnswers[questionIndex];
  const displayedCorrect = finalResult?.correct ?? score;
  const percent =
    finalResult?.percent ??
    Math.round((displayedCorrect / questions.length) * 100);
  const passed = percent >= 80;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let timeoutId;
    let frameOne;
    let frameTwo;

    const moveToActiveStep = () => {
      const target =
        phase === "lessons"
          ? lessonStageRef.current
          : document.getElementById("mission-3-active-step");

      if (!target) {
        scrollCbetPageToTop();
        return;
      }

      // Leave enough room above the workstation so the question header is never clipped.
      const headerOffset = window.innerWidth <= 760 ? 16 : 72;
      const top = Math.max(
        0,
        target.getBoundingClientRect().top + window.scrollY - headerOffset
      );

      window.scrollTo({ top, behavior: "smooth" });
    };

    // Scroll only when the learner changes lessons/phases—not when an answer is selected.
    frameOne = window.requestAnimationFrame(() => {
      frameTwo = window.requestAnimationFrame(moveToActiveStep);
    });
    timeoutId = window.setTimeout(moveToActiveStep, 180);

    return () => {
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
      window.clearTimeout(timeoutId);
    };
  }, [phase, lessonIndex, scenarioIndex]);

  function setPhase(nextPhase) {
    setPhaseState(nextPhase);
    saveMissionProgress(3, { phase: nextPhase });
  }

  function setLessonIndex(nextIndex) {
    setLessonIndexState(nextIndex);
    saveMissionProgress(3, { lessonIndex: nextIndex, phase: "lessons" });
  }

  function setScenarioIndex(nextIndex) {
    setScenarioIndexState(nextIndex);
    saveMissionProgress(3, { scenarioIndex: nextIndex, phase: "scenarios" });
  }

  function setQuestionIndex(nextIndex) {
    setQuestionIndexState(nextIndex);
    saveMissionProgress(3, { quizIndex: nextIndex, phase: "quiz" });
  }

  function markLessonComplete(index) {
    setLessonChecks((previous) => {
      const next = { ...previous, [index]: true };
      saveMissionProgress(3, {
        completedLessons: Object.keys(next).filter((key) => next[key]).map(Number),
        lessonIndex: index,
        phase: "lessons"
      });
      const before = getCbetAcademyState().xp;
      const updated = awardCbetXp(15, `mission3-lesson-${index}`);
      if (updated.xp > before) {
        setXpToast({ amount: 15, label: "Test-equipment lesson complete" });
      }
      return next;
    });
  }

  function markScenarioComplete(index) {
    setScenarioChecks((previous) => {
      const next = { ...previous, [index]: true };
      saveMissionProgress(3, {
        completedScenarios: Object.keys(next).filter((key) => next[key]).map(Number),
        scenarioIndex: index,
        phase: "scenarios"
      });
      const before = getCbetAcademyState().xp;
      const updated = awardCbetXp(20, `mission3-scenario-${index}`);
      if (updated.xp > before) {
        setXpToast({ amount: 20, label: "Applied case complete" });
      }
      return next;
    });
  }

  function chooseAnswer(index) {
    if (selected !== undefined) return;

    if (index !== question.answer) {
      setWrongAnswers((previous) => ({ ...previous, [questionIndex]: index }));
      setMissedQuestions((previous) => ({ ...previous, [questionIndex]: true }));
      playCbetTone("wrong");
      return;
    }

    setAnswers((previous) => ({ ...previous, [questionIndex]: index }));
    setWrongAnswers((previous) => {
      const next = { ...previous };
      delete next[questionIndex];
      return next;
    });
    playCbetTone("correct");
    if (!missedQuestions[questionIndex]) setScore((previous) => previous + 1);
  }

  function nextQuestion() {
    if (selected === undefined) return;

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      return;
    }

    const completedAnswers = {
      ...answers,
      [questionIndex]: selected
    };

    const finalCorrect = questions.reduce(
      (total, item, index) =>
        total + (completedAnswers[index] === item.answer && !missedQuestions[index] ? 1 : 0),
      0
    );
    const finalScore = Math.round((finalCorrect / questions.length) * 100);

    setFinalResult({ correct: finalCorrect, percent: finalScore });
    completeCbetModule(3, finalScore, 350);
    setPhase("complete");
  }

  function restartQuiz() {
    setQuestionIndexState(0);
    setAnswers({});
    setWrongAnswers({});
    setMissedQuestions({});
    setScore(0);
    setFinalResult(null);
    saveMissionProgress(3, { phase: "quiz", quizIndex: 0 });
    setPhaseState("quiz");
  }

  const overlay = (
    <>
      {xpToast && <XpToast {...xpToast} onDone={() => setXpToast(null)} />}
    </>
  );

  if (phase === "briefing") {
    return (
      <section className="cbet-shell">
        {overlay}
        <button className="cbet-back" onClick={onExit}>← Academy Dashboard</button>
        <MissionJourney phase={phase} lessonIndex={lessonIndex} lessonCount={lessons.length} passed={false} />
        <article className="cbet-briefing mission-three-briefing">
          <div className="cbet-hero-icon">🧰</div>
          <span className="cbet-label">Mission 3 Briefing</span>
          <h1>Test Equipment</h1>
          <p>
            Learn to select, configure, and apply the instruments biomedical technicians use to verify safety, accuracy, and performance.
          </p>
          <div className="cbet-stats">
            <div><strong>{lessons.length}</strong><span>Lessons</span></div>
            <div><strong>{scenarios.length}</strong><span>Cases</span></div>
            <div><strong>{questions.length}</strong><span>Questions</span></div>
            <div><strong>350</strong><span>XP</span></div>
          </div>
          <button
            className="cbet-primary full"
            onClick={() =>
              setPhase(savedProgress.phase === "briefing" ? "lessons" : savedProgress.phase)
            }
          >
            {savedProgress.phase === "briefing" ? "Begin Mission 3" : "Resume Mission 3"}
          </button>
        </article>
      </section>
    );
  }

  if (phase === "lessons") {
    const lesson = lessons[lessonIndex];
    const complete = Boolean(lessonChecks[lessonIndex]);

    return (
      <section className="cbet-shell">
        {overlay}
        <button className="cbet-back" onClick={onExit}>← Academy Dashboard</button>
        <MissionJourney phase={phase} lessonIndex={lessonIndex} lessonCount={lessons.length} passed={phase === "complete" && passed} />
        <div className="cbet-subprogress">
          <span>Lesson {lessonIndex + 1} of {lessons.length}</span>
          <div><i style={{ width: `${((lessonIndex + (complete ? 1 : 0)) / lessons.length) * 100}%` }} /></div>
        </div>
        <article id="mission-3-active-step" className="cbet-lesson-card mission-two-lesson-card mission-three-lesson-card">
          <div className="cbet-lesson-icon">{lesson.icon}</div>
          <span className="cbet-label">Test Equipment Lesson {lessonIndex + 1}</span>
          <h2>{lesson.title}</h2>
          <p className="cbet-lesson-summary">{lesson.summary}</p>
          <div className="cbet-points">
            {lesson.points.map((point) => <p key={point}><span>●</span>{point}</p>)}
          </div>

          <div className="mission-two-guided-stage mission-three-guided-stage" ref={lessonStageRef}>
            <div className="mission-two-activity-pane mission-three-activity-pane">
              <span className="mission-two-pane-label">Interactive activity</span>
              <MissionThreeLab type={lesson.interaction} />
            </div>

            <div className="mission-two-question-pane mission-three-question-pane">
              <span className="mission-two-pane-label">Apply what you learned</span>
              <KnowledgeCheck
                key={`mission-3-lesson-${lessonIndex}`}
                resetKey={`mission-3-lesson-${lessonIndex}`}
                progressLabel={`Lesson ${lessonIndex + 1} of ${lessons.length}`}
                check={lesson.check}
                onComplete={(isCorrect) => {
                  if (isCorrect) markLessonComplete(lessonIndex);
                }}
                actions={(
                  <>
                    <button
                      className="cbet-secondary"
                      disabled={lessonIndex === 0}
                      onClick={() => setLessonIndex(Math.max(0, lessonIndex - 1))}
                    >
                      Previous
                    </button>
                    {lessonIndex < lessons.length - 1 ? (
                      <button
                        className="cbet-primary"
                        disabled={!complete}
                        onClick={() => setLessonIndex(lessonIndex + 1)}
                      >
                        Next Lesson
                      </button>
                    ) : (
                      <button
                        className="cbet-primary"
                        disabled={!complete}
                        onClick={() => setPhase("scenarios")}
                      >
                        Begin Applied Cases
                      </button>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </article>
      </section>
    );
  }

  if (phase === "scenarios") {
    const scenario = scenarios[scenarioIndex];
    const complete = Boolean(scenarioChecks[scenarioIndex]);

    return (
      <section className="cbet-shell">
        {overlay}
        <button className="cbet-back" onClick={onExit}>← Academy Dashboard</button>
        <MissionJourney phase={phase} lessonIndex={lessonIndex} lessonCount={lessons.length} passed={phase === "complete" && passed} />
        <div className="cbet-subprogress">
          <span>Applied Case {scenarioIndex + 1} of {scenarios.length}</span>
          <div><i style={{ width: `${((scenarioIndex + (complete ? 1 : 0)) / scenarios.length) * 100}%` }} /></div>
        </div>
        <ScenarioCard
          key={`mission-3-scenario-${scenarioIndex}`}
          scenario={scenario}
          number={scenarioIndex + 1}
          onComplete={() => markScenarioComplete(scenarioIndex)}
          actions={(
            <>
              <button
                className="cbet-secondary"
                disabled={scenarioIndex === 0}
                onClick={() => setScenarioIndex(Math.max(0, scenarioIndex - 1))}
              >
                Previous
              </button>
              {scenarioIndex < scenarios.length - 1 ? (
                <button
                  className="cbet-primary"
                  onClick={() => setScenarioIndex(scenarioIndex + 1)}
                >
                  Next Case
                </button>
              ) : (
                <button
                  className="cbet-primary"
                  onClick={() => setPhase("quiz")}
                >
                  Begin Mission Challenge
                </button>
              )}
            </>
          )}
        />
      </section>
    );
  }

  if (phase === "quiz") {
    return (
      <section className="cbet-shell">
        {overlay}
        <button className="cbet-back" onClick={onExit}>← Academy Dashboard</button>
        <MissionJourney phase={phase} lessonIndex={lessonIndex} lessonCount={lessons.length} passed={phase === "complete" && passed} />
        <div className="cbet-subprogress">
          <span>Question {questionIndex + 1} of {questions.length}</span>
          <div><i style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>
        </div>
        <article className="cbet-quiz-card">
          <span className="cbet-label">Mission 3 Challenge</span>
          <h2>{question.question}</h2>
          <div className="cbet-option-grid">
            {question.options.map((option, index) => {
              let className = "";
              if (selected !== undefined && index === selected) className = "correct";
              else if (wrongSelected !== undefined && index === wrongSelected) className = "wrong";
              return (
                <button
                  type="button"
                  key={option}
                  className={className}
                  disabled={selected !== undefined}
                  onClick={() => chooseAnswer(index)}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {(selected !== undefined || wrongSelected !== undefined) && (
            <div className={`cbet-feedback ${selected !== undefined ? "good" : "bad"}`}>
              <strong>{selected !== undefined ? "Correct" : "Not quite. Try again."}</strong>
              <p>{selected !== undefined ? question.explanation : "Choose another answer. The correct answer will not be revealed."}</p>
            </div>
          )}
          <button
            className="cbet-primary full"
            disabled={selected === undefined}
            onClick={nextQuestion}
          >
            {questionIndex === questions.length - 1 ? "Finish Mission" : "Next Question"}
          </button>
        </article>
      </section>
    );
  }

  return (
    <section className="cbet-shell">
      <button className="cbet-back" onClick={onExit}>← Academy Dashboard</button>
      <MissionJourney phase="complete" lessonIndex={lessons.length - 1} lessonCount={lessons.length} passed={passed} />
      <article className={`cbet-results ${passed ? "passed" : ""}`}>
        <div className="cbet-hero-icon">{passed ? "🧰" : "📘"}</div>
        <span className="cbet-label">Mission 3 Results</span>
        <h1 className="cbet-results-title">
          {passed ? "Test Equipment Specialist" : "Keep Building Your Skills"}
        </h1>
        <div className="cbet-score-ring">
          <strong>{percent}%</strong>
          <span>{displayedCorrect} of {questions.length}</span>
        </div>
        <p>
          {passed
            ? "Mission 3 is complete. You earned 350 XP and demonstrated the Test Equipment Use competency."
            : "An 80% score is required. Review the analyzer setup and measurement lessons, then try again."}
        </p>
        <div className="cbet-completion-summary">
          <div><span>XP earned</span><strong>{passed ? "+350" : "0"}</strong></div>
          <div><span>Mission status</span><strong>{passed ? "Complete" : "Review required"}</strong></div>
          <div><span>Next step</span><strong>{passed ? "Academy dashboard" : "Retake challenge"}</strong></div>
        </div>
        <div className="cbet-nav-row center">
          {!passed && <button className="cbet-secondary" onClick={restartQuiz}>Retake Challenge</button>}
          <button className="cbet-primary" onClick={onExit}>
            {passed ? "Finish Mission Path →" : "Return to Academy"}
          </button>
        </div>
      </article>
    </section>
  );
}






const SERVICE_CALL_SCENARIOS = {
  "WO-1052": {
    id: "WO-1052",
    mode: "Guided Troubleshooting",
    title: "NIBP Leak Error",
    equipment: "Guardian GX5 Bedside Monitor",
    location: "4 West • Room 418",
    complaint: "The cuff begins inflating, then the cycle stops with a leak error. ECG and SpO₂ remain available.",
    tools: ["Patient handoff", "Known-good cuff", "Known-good NIBP hose", "Pressure leak tester"],
    stages: [
      { id: "safety", label: "Protect the patient", action: "Confirm alternate BP monitoring", log: "Alternate blood-pressure monitoring confirmed with nursing." },
      { id: "remove", label: "Control the device", action: "Remove monitor from service", log: "Monitor labeled and removed from clinical service." },
      { id: "inspect", label: "Inspect the pneumatic path", action: "Inspect cuff, hose, and connectors", log: "Visual inspection found no obvious cuff damage; wear noted near hose connector strain relief." },
      { id: "reproduce", label: "Reproduce the complaint", action: "Run NIBP cycle with original setup", log: "Original setup inflated to 42 mmHg, pressure fell rapidly, and LEAK ERROR displayed." },
      { id: "substitute", label: "Change one variable", action: "Install known-good cuff and hose", log: "Known-good cuff and hose completed a normal 122/78 mmHg cycle." },
      { id: "isolate", label: "Test the suspect component", action: "Pressure-test original hose", log: "Original hose failed pressure-decay test; leak localized near connector strain relief." },
    ],
    diagnoses: [
      { id: "hose", label: "Leak in original NIBP hose", correct: true },
      { id: "cuff", label: "Damaged NIBP cuff bladder", correct: false },
      { id: "pump", label: "Failed internal NIBP pump", correct: false },
      { id: "software", label: "Incorrect monitor configuration", correct: false },
    ],
    repair: "Replace NIBP hose",
    verify: "Complete three verification cycles",
    questions: [
      { q: "What is the first priority before removing the monitor?", options: ["Confirm alternate BP monitoring", "Open the monitor", "Replace the pump", "Run a calibration"], answer: 0, why: "Patient care must remain supported before equipment is removed." },
      { q: "Why does a normal cycle with known-good accessories matter?", options: ["It isolates the fault to the original external pneumatic path", "It proves the battery is new", "It confirms ECG calibration", "It clears every stored error"], answer: 0, why: "Changing one variable and restoring operation narrows the failure to the original cuff/hose path." },
      { q: "Which finding most directly confirms the hose failure?", options: ["Failed pressure-decay test near the connector", "Normal SpO₂ reading", "The monitor powers on", "The cuff is the correct size"], answer: 0, why: "A direct pressure-decay failure provides component-level evidence." },
      { q: "What is required after replacing the hose?", options: ["Repeated successful operating cycles", "Only a visual inspection", "A software update", "No additional testing"], answer: 0, why: "The repair must be verified under actual operating conditions." },
      { q: "What should the service record include?", options: ["Complaint, evidence, root cause, corrective action, and verification", "Only the replaced part", "Only the final reading", "The technician's opinion"], answer: 0, why: "Complete documentation shows how the conclusion was reached and how safe operation was confirmed." },
    ],
  },
};


const EXPANDED_SERVICE_SCENARIOS = {
  "WO-1001": {
    id: "WO-1001",
    engineVersion: 2,
    title: "PEEP High / Blockage",
    equipment: "PMT AeroVent A900",
    location: "Operating Room 4",
    priority: "URGENT",
    complaint: "During pre-use checkout, the anesthesia system displays PEEP HIGH / BLOCKAGE and pressure does not release normally.",
    patientStatus: "No patient connected — safe to troubleshoot",
    tools: ["Visual inspection", "Test lung", "Gas flow analyzer"],
    safetyChecks: [
      { id: "patient", label: "Verify no patient is connected", required: true },
      { id: "backup", label: "Confirm another anesthesia system is available", required: true },
      { id: "staff", label: "Notify the anesthesia provider that the unit is being evaluated", required: true },
      { id: "parts", label: "Begin replacing internal components", required: false },
    ],
    investigationOptions: [
      { id: "scavenging", label: "Inspect the scavenging system", correct: true, evidence: "The scavenging relief valve is CLOSED. Pressure cannot vent from the system." },
      { id: "vaporizer", label: "Replace the vaporizer", correct: false, evidence: "The vaporizer is seated correctly and does not explain the trapped pressure." },
      { id: "battery", label: "Test the backup battery", correct: false, evidence: "The unit is on AC power and the alarm is pneumatic, not electrical." },
      { id: "network", label: "Check network settings", correct: false, evidence: "Network communication does not control pressure release." },
    ],
    correctiveActions: [
      { id: "open", label: "Open the scavenging relief valve", correct: true },
      { id: "sensor", label: "Replace the pressure sensor", correct: false },
      { id: "circuit", label: "Replace the breathing circuit immediately", correct: false },
      { id: "restart", label: "Restart the system and return it to service", correct: false },
    ],
    verificationChecks: [
      "Repeat the pre-use leak test",
      "Verify the PEEP HIGH / BLOCKAGE alarm clears",
      "Confirm pressure releases through the scavenging path",
      "Complete a functional ventilation test with a test lung",
    ],
    rootCause: "The scavenging relief valve was closed, preventing pressure from releasing.",
    resolution: "Opened the scavenging relief valve and completed full functional verification.",
    clinicalPearl: "When high airway pressure or blockage alarms appear during checkout, inspect the scavenging path before replacing components. A closed relief valve can trap pressure even when the breathing circuit is intact.",
  },
  "WO-1061": {
    id: "WO-1061", title: "Low-Pressure Leak Test Failure", equipment: "AeroVent Anesthesia Ventilator",
    location: "Operating Room • OR 6", complaint: "Low-pressure alarm appears during the pre-use leak test.",
    tools: ["Gas flow analyzer", "Test lung", "Known-good breathing circuit"],
    steps: [
      ["Protect the patient", "Confirm another anesthesia workstation is available before removing the unit."],
      ["Inspect the breathing path", "Check circuit connections, reservoir bag, absorber canister, and seals."],
      ["Reproduce the failure", "Run the documented leak test with the original circuit."],
      ["Substitute the circuit", "Install a known-good circuit and repeat the leak test."],
      ["Verify performance", "Use the gas flow analyzer and test lung to confirm pressure, flow, and alarm response."],
    ],
    diagnosis: "Leak in the original breathing circuit connection",
    correctiveAction: "Replace the damaged circuit and complete full pre-use verification",
    questions: [
      ["What should be checked first for a low-pressure alarm?", ["External circuit and connections", "Internal control board", "Display brightness", "Network settings"], 0],
      ["What does a normal test with a known-good circuit show?", ["The original external circuit is suspect", "The battery is defective", "The oxygen sensor is calibrated", "The display is accurate"], 0],
      ["Which tool verifies flow and pressure?", ["Gas flow analyzer", "Defibrillator analyzer", "ECG simulator", "Lux meter"], 0],
    ],
  },
  "WO-1073": {
    id: "WO-1073", title: "Immediate Occlusion Alarm", equipment: "NeoFlow Syringe Pump",
    location: "NICU • Bed 12", complaint: "Pump reports downstream occlusion immediately after setup.",
    tools: ["Infusion device analyzer", "Approved syringe", "Occlusion test fixture"],
    steps: [
      ["Protect therapy", "Coordinate alternate medication delivery with clinical staff."],
      ["Inspect setup", "Check clamps, tubing, syringe seating, plunger engagement, and downstream line."],
      ["Reproduce the alarm", "Run the pump with the reported syringe and setup."],
      ["Test with approved setup", "Install an approved syringe and known-good tubing."],
      ["Measure occlusion performance", "Use the infusion analyzer to confirm alarm pressure and delivery accuracy."],
    ],
    diagnosis: "Incorrect syringe seating caused false occlusion detection",
    correctiveAction: "Reload the approved syringe correctly and verify delivery accuracy",
    questions: [
      ["What should be inspected first?", ["The complete fluid path and syringe loading", "The network cable", "The display color", "The battery label"], 0],
      ["Which tool measures flow and occlusion pressure?", ["Infusion device analyzer", "Patient simulator", "Gas analyzer", "Defibrillator analyzer"], 0],
      ["Why coordinate alternate therapy first?", ["Medication delivery is clinically critical", "It resets the pump", "It changes the alarm limit", "It charges the battery"], 0],
    ],
  },
  "WO-1080": {
    id: "WO-1080", title: "Transducer Not Detected", equipment: "Portable Ultrasound System",
    location: "Imaging • Ultrasound Room 3", complaint: "System powers on, but the selected transducer is not detected.",
    tools: ["Known-good transducer", "Connector inspection light", "Service diagnostics"],
    steps: [
      ["Confirm clinical coverage", "Make sure another ultrasound system is available for scheduled patients."],
      ["Inspect the interface", "Check connector pins, latch, strain relief, contamination, and physical damage."],
      ["Reproduce the complaint", "Connect the reported transducer and confirm the detection error."],
      ["Substitute the transducer", "Connect a compatible known-good transducer to the same port."],
      ["Cross-check the original", "Test the original transducer on another compatible system if permitted."],
    ],
    diagnosis: "Failed transducer cable near the connector strain relief",
    correctiveAction: "Remove the damaged transducer from service and verify the system with a known-good probe",
    questions: [
      ["What is the best first technical check?", ["Inspect and reseat the transducer connector", "Replace the system board", "Disable diagnostics", "Increase output power"], 0],
      ["A known-good probe works on the same port. What is isolated?", ["The original transducer", "The system power supply", "The display", "The network"], 0],
      ["Why inspect connector pins?", ["Bent or contaminated pins can prevent detection", "They control room lighting", "They charge the battery", "They set image depth"], 0],
    ],
  },
  "WO-1092": {
    id: "WO-1092",
    title: "Temperature Trouble",
    equipment: "Guardian GX5 Bedside Monitor",
    location: "PACU • Bay 7",
    complaint: "The monitor displays 29.8°C, but the patient is awake, warm, and showing no signs consistent with severe hypothermia.",
    tools: ["Clinical handoff", "Known-good temperature probe", "Temperature simulator"],
    steps: [
      ["Protect the patient", "Confirm the patient's condition with clinical staff and ensure temperature can be checked by an alternate method."],
      ["Compare the reading", "Determine whether the displayed value matches the patient's appearance and the alternate temperature measurement."],
      ["Inspect the probe", "Check probe placement, connector seating, cable strain relief, and visible damage."],
      ["Change one variable", "Connect a compatible known-good temperature probe and compare the result."],
      ["Verify the channel", "Use a temperature simulator to verify the monitor accurately displays multiple known values."],
    ],
    diagnosis: "Intermittent open circuit in the original temperature probe cable",
    correctiveAction: "Remove the damaged probe from service, install a known-good probe, and verify the temperature channel with simulated values",
    clinicalPearl: "When a displayed value does not match the patient's condition, verify the complete measurement pathway before assuming either patient deterioration or monitor failure.",
    achievement: "Temperature Detective",
    xp: 175,
    questions: [
      ["What is the first priority when the temperature reading appears implausible?", ["Assess the patient and confirm an alternate measurement", "Replace the monitor", "Open the monitor housing", "Disable the alarm"], 0],
      ["What does a normal reading with a known-good probe suggest?", ["The original probe is suspect", "The monitor display has failed", "The network is offline", "The battery is depleted"], 0],
      ["Why use a temperature simulator after replacing the probe?", ["To verify the monitor channel at known values", "To charge the probe", "To update the software", "To test NIBP pressure"], 0],
      ["Which finding best supports an intermittent probe-cable failure?", ["The reading changes when the cable is flexed near the strain relief", "ECG remains normal", "The monitor is on AC power", "The patient is awake"], 0],
    ],
  },
  "WO-1099": {
    id: "WO-1099",
    title: "Dead Battery",
    equipment: "Guardian Transit Transport Monitor",
    location: "Emergency Department • Equipment Alcove",
    complaint: "The transport monitor works on AC power but shuts off immediately whenever it is unplugged.",
    tools: ["Alternate transport monitor", "Known-good charged battery", "Battery analyzer"],
    steps: [
      ["Protect the transport", "Confirm another charged monitor is available before the affected unit is removed from service."],
      ["Reproduce the complaint", "Verify normal AC operation, then safely disconnect AC power and observe the shutdown."],
      ["Inspect the battery path", "Check battery seating, contacts, latch condition, charge indication, and visible damage."],
      ["Substitute the battery", "Install a compatible known-good charged battery and repeat the unplugged operating test."],
      ["Verify runtime", "Confirm charging, battery status, alarm operation, and stable battery-powered operation before return to service."],
    ],
    diagnosis: "The installed battery can no longer store sufficient energy to support the monitor",
    correctiveAction: "Replace the failed battery and complete charging, runtime, and functional verification",
    clinicalPearl: "A device that operates normally on AC power but fails immediately when unplugged usually points to the battery or battery connection—not the entire monitor.",
    achievement: "Power Restored",
    xp: 175,
    questions: [
      ["What must be confirmed before testing a transport monitor that cannot run on battery?", ["Another safe transport-monitoring option is available", "The display brightness is maximum", "The network cable is connected", "The printer has paper"], 0],
      ["The monitor works on AC but shuts off when unplugged. Which subsystem should be isolated first?", ["Battery and battery connection", "ECG lead set", "NIBP cuff", "Network interface"], 0],
      ["A known-good battery keeps the monitor operating. What does that demonstrate?", ["The original battery is the likely fault", "The monitor power supply has failed", "The display is defective", "The AC outlet is faulty"], 0],
      ["What is required before returning the monitor to service?", ["Verify charging, battery operation, alarms, and functional performance", "Only confirm that it powers on", "Clear the service history", "Disable the low-battery alarm"], 0],
    ],
  },
  "WO-1105": {
    id: "WO-1105",
    title: "Silent Shock",
    equipment: "PMT PulseGuard X Defibrillator",
    location: "Emergency Department • Resuscitation Bay",
    complaint: "The defibrillator reports a readiness self-test failure and is not cleared for emergency use.",
    tools: ["Alternate emergency defibrillator", "Known-good therapy cable", "Defibrillator analyzer"],
    steps: [
      ["Protect emergency readiness", "Confirm another tested defibrillator is immediately available and remove the affected unit from emergency use."],
      ["Review the failure", "Check the displayed readiness message and ask staff what occurred during the last operational check."],
      ["Inspect external connections", "Examine the therapy cable, connector, pads interface, battery seating, and visible damage before opening the device."],
      ["Substitute the accessory", "Connect a compatible known-good therapy cable and repeat the manufacturer-independent readiness check."],
      ["Verify safe operation", "Use a defibrillator analyzer to verify delivered energy, synchronization indication, charging, alarms, and basic operation before release."],
    ],
    diagnosis: "A loose, worn therapy-cable connector caused the readiness self-test failure",
    correctiveAction: "Replace the faulty therapy cable and complete functional verification with a defibrillator analyzer",
    clinicalPearl: "A failed readiness check means the device must not be assumed ready. Secure alternate coverage, inspect external accessories first, and verify performance before return to emergency service.",
    achievement: "Emergency Ready",
    xp: 200,
    questions: [
      ["What is the first priority after a defibrillator fails a readiness check?", ["Ensure another verified defibrillator is available", "Open the device", "Clear the message and continue use", "Replace the display"], 0],
      ["What should be inspected before suspecting an internal failure?", ["Therapy cable, connector, battery, and external accessories", "Only the printer paper", "The hospital network", "The room lighting"], 0],
      ["A known-good therapy cable clears the failure. What does that suggest?", ["The original cable or connector is the likely fault", "The analyzer is defective", "The battery must be replaced", "The display has failed"], 0],
      ["What tool is appropriate for confirming delivered-energy performance?", ["Defibrillator analyzer", "Infusion analyzer", "Temperature simulator", "Gas-flow meter"], 0],
    ],
  },
  "WO-1112": {
    id: "WO-1112",
    title: "Vanishing Pressure",
    equipment: "PMT RespiraOne Critical-Care Ventilator",
    location: "Intensive Care Unit • Room 9",
    complaint: "The ventilator repeatedly alarms LOW PRESSURE / LOW EXHALED VOLUME while the patient is being supported by an alternate ventilator.",
    tools: ["Alternate ventilator confirmed", "Test lung", "Known-good patient circuit"],
    steps: [
      ["Protect ventilation", "Confirm the patient remains safely supported on an alternate ventilator before evaluating the affected unit."],
      ["Gather the clinical report", "Ask when the alarm began and whether the circuit, humidifier, suction port, or patient connection was recently changed."],
      ["Inspect the complete breathing path", "Check circuit connections, water traps, caps, humidifier seals, exhalation components, and open ports."],
      ["Reproduce with a test lung", "Connect the original circuit to a test lung and confirm that pressure and exhaled volume cannot be maintained."],
      ["Substitute one variable", "Install a known-good circuit, repeat the functional test, and verify pressure, volume, and alarm response."],
    ],
    diagnosis: "An uncapped sampling port in the original patient circuit created a major leak",
    correctiveAction: "Cap the open port, replace the compromised circuit as appropriate, and verify operation with a test lung",
    clinicalPearl: "Low-pressure and low-volume alarms often indicate a leak or disconnect in the external breathing path. Inspect the entire circuit before assuming an internal ventilator failure.",
    achievement: "Circuit Investigator",
    xp: 225,
    questions: [
      ["What must happen before the affected ventilator is evaluated?", ["The patient must be safely supported by an alternate method", "The alarm must be silenced permanently", "The ventilator must be opened", "The network cable must be removed"], 0],
      ["Which finding most commonly explains simultaneous low pressure and low exhaled volume?", ["A circuit leak or disconnect", "High battery charge", "Excessive screen brightness", "A normal test lung"], 0],
      ["Why test the original circuit on a test lung?", ["To reproduce the complaint without involving a patient", "To calibrate the hospital oxygen supply", "To charge the ventilator", "To test the ECG module"], 0],
      ["A known-good circuit restores normal performance. What is the best conclusion?", ["The fault is isolated to the original external circuit path", "The internal blower has failed", "The test lung is defective", "The display needs replacement"], 0],
    ],
  },

};


function InteractiveServiceCallEngine({ scenario, onExit, onComplete }) {
  const [phase, setPhase] = useState("safety");
  const [safety, setSafety] = useState({});
  const [investigation, setInvestigation] = useState("");
  const [action, setAction] = useState("");
  const [verification, setVerification] = useState({});
  const [attempts, setAttempts] = useState(0);
  const [safetyFeedback, setSafetyFeedback] = useState(false);

  useEffect(() => {
    setPhase("safety"); setSafety({}); setInvestigation(""); setAction(""); setVerification({}); setAttempts(0); setSafetyFeedback(false);
  }, [scenario.id]);

  useEffect(() => { scrollToCbetTrainingTarget("interactive-service-call-top"); }, [phase, scenario.id]);

  const requiredSafety = scenario.safetyChecks.filter((item) => item.required);
  const safetyReady = requiredSafety.every((item) => safety[item.id]) && !scenario.safetyChecks.some((item) => !item.required && safety[item.id]);
  const chosenInvestigation = scenario.investigationOptions.find((item) => item.id === investigation);
  const chosenAction = scenario.correctiveActions.find((item) => item.id === action);
  const verificationReady = scenario.verificationChecks.every((_, index) => verification[index]);
  const phases = ["Safety", "Investigate", "Correct", "Verify", "Report"];
  const activeIndex = { safety: 0, investigate: 1, correct: 2, verify: 3, report: 4 }[phase];

  const chooseInvestigation = (item) => { setInvestigation(item.id); if (!item.correct) setAttempts((value) => value + 1); };
  const chooseAction = (item) => { setAction(item.id); if (!item.correct) setAttempts((value) => value + 1); };

  return <section id="interactive-service-call-top" className="sim2-shell">
    <style>{`
      .sim2-shell{max-width:1500px;margin:0 auto;padding:18px 24px 48px;color:#102a43;scroll-margin-top:10px}.sim2-shell *{box-sizing:border-box}.sim2-top{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px}.sim2-back,.sim2-primary{border:0;border-radius:13px;padding:12px 18px;font-weight:900;cursor:pointer}.sim2-back{background:#fff;border:1px solid #c9dbe7;color:#164565}.sim2-primary{background:linear-gradient(135deg,#078fc6,#075887);color:#fff}.sim2-primary:disabled{opacity:.45;cursor:not-allowed}.sim2-brand{font-size:.78rem;letter-spacing:.09em;text-transform:uppercase;font-weight:950;color:#087cab}.sim2-header{background:linear-gradient(135deg,#071f35,#0c4e72);color:#fff;border-radius:26px;padding:24px 28px;box-shadow:0 18px 45px #16344b24}.sim2-header-grid{display:grid;grid-template-columns:1fr auto;gap:20px;align-items:start}.sim2-header h1{margin:7px 0 8px;font-size:clamp(2rem,4.5vw,4rem);line-height:1}.sim2-header p{margin:0;max-width:900px;line-height:1.55;color:#d7edf8}.sim2-priority{background:#b32632;border-radius:999px;padding:8px 12px;font-size:.78rem;font-weight:950}.sim2-meta{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}.sim2-meta span{background:#ffffff16;border:1px solid #ffffff2a;border-radius:10px;padding:8px 11px;font-weight:800}.sim2-progress{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:16px 0}.sim2-progress div{background:#dfeaf0;border-radius:12px;padding:10px;text-align:center;font-size:.8rem;font-weight:900;color:#60788a}.sim2-progress .active{background:#087fac;color:#fff}.sim2-progress .done{background:#e5f6ee;color:#176b48}.sim2-grid{display:grid;grid-template-columns:minmax(250px,330px) minmax(0,1fr);gap:18px}.sim2-card{background:#fff;border:1px solid #d5e4ed;border-radius:24px;padding:24px;box-shadow:0 14px 34px #173e5815}.sim2-side{position:sticky;top:12px}.sim2-side h2,.sim2-card h2{margin:4px 0 12px}.sim2-side dl{display:grid;gap:13px}.sim2-side dt{font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:#648093;font-weight:900}.sim2-side dd{margin:3px 0 0;font-weight:850}.sim2-tool{display:block;background:#eef7fb;border-radius:10px;padding:9px 11px;margin:7px 0;font-weight:800}.sim2-choice{width:100%;text-align:left;border:1px solid #cddde7;background:#f8fbfc;border-radius:14px;padding:14px 16px;margin:8px 0;font-weight:850;color:#173b57;cursor:pointer}.sim2-choice.selected{border-color:#168fc0;background:#eaf7fc}.sim2-choice.correct{border-color:#2f9e69;background:#e9f8f0;color:#17643f}.sim2-choice.wrong{border-color:#d45d66;background:#fff0f1;color:#8d2b34}.sim2-feedback{margin:14px 0;padding:15px 17px;border-radius:14px;background:#edf6fa;border-left:5px solid #078fc6;line-height:1.55}.sim2-check{display:flex;gap:11px;align-items:flex-start;padding:13px;border:1px solid #d7e5ed;border-radius:13px;margin:8px 0;background:#f9fbfc;font-weight:800}.sim2-check input{margin-top:3px;transform:scale(1.2)}.sim2-check.unsafe-selected{border-color:#d45d66;background:#fff0f1;color:#8d2b34}.sim2-check.unsafe-selected span::after{content:" — uncheck this action";font-size:.78rem;font-weight:900}.sim2-safety-help{margin:12px 0 0;padding:13px 15px;border-radius:12px;background:#fff0f1;border-left:5px solid #b32632;color:#8d2b34;font-weight:850;line-height:1.45}.sim2-monitor{background:#101f2b;color:#fff;border:8px solid #dce3e7;border-radius:22px;padding:18px;margin:18px 0}.sim2-alarm{background:#9b1f2a;border-radius:9px;padding:12px;text-align:center;font-size:1.3rem;font-weight:950;letter-spacing:.04em}.sim2-reading{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}.sim2-reading div{background:#07131b;border-radius:10px;padding:14px;text-align:center}.sim2-reading span{display:block;color:#8eb7ca;font-size:.72rem;text-transform:uppercase}.sim2-reading strong{display:block;font-size:1.35rem;margin-top:5px}.sim2-report{background:#102638;color:#eefaff;border-radius:18px;padding:20px;display:grid;gap:14px}.sim2-report span{display:block;color:#93bdcf;font-size:.72rem;text-transform:uppercase;letter-spacing:.08em}.sim2-report strong{display:block;margin-top:4px;line-height:1.45}.sim2-pearl{margin-top:18px;background:#fff7df;border-left:5px solid #e2a426;border-radius:14px;padding:17px;line-height:1.55}.sim2-footer{display:flex;justify-content:flex-end;margin-top:18px}.sim2-error{color:#9a3038;font-weight:850;margin-top:10px}@media(max-width:800px){.sim2-shell{padding:12px}.sim2-grid,.sim2-header-grid{grid-template-columns:1fr}.sim2-side{position:static}.sim2-progress{grid-template-columns:1fr}.sim2-reading{grid-template-columns:1fr}}
    `}</style>
    <div className="sim2-top"><button className="sim2-back" onClick={onExit}>← Service Calls</button><span className="sim2-brand">Summit University Medical Center</span></div>
    <header className="sim2-header"><div className="sim2-header-grid"><div><span className="sim2-brand">Interactive service call</span><h1>{scenario.title}</h1><p>{scenario.complaint}</p></div><span className="sim2-priority">{scenario.priority}</span></div><div className="sim2-meta"><span>{scenario.location}</span><span>{scenario.equipment}</span><span>{scenario.patientStatus}</span></div></header>
    <div className="sim2-progress">{phases.map((label,index)=><div key={label} className={index<activeIndex?"done":index===activeIndex?"active":""}>{index<activeIndex?"✓ ":""}{label}</div>)}</div>
    <div className="sim2-grid">
      <aside className="sim2-card sim2-side"><span className="sim2-brand">Service call details</span><h2>{scenario.equipment}</h2><dl><div><dt>Location</dt><dd>{scenario.location}</dd></div><div><dt>Reason for service</dt><dd>{scenario.title}</dd></div><div><dt>Toolbox</dt><dd>{scenario.tools.map(t=><span className="sim2-tool" key={t}>✓ {t}</span>)}</dd></div><div><dt>Learning attempts</dt><dd>{attempts}</dd></div></dl></aside>
      <main className="sim2-card">
        {phase==="safety"&&<><span className="sim2-brand">Step 1 • Protect the patient</span><h2>Select every required action</h2><p>Before technical troubleshooting begins, establish a safe clinical handoff.</p>{scenario.safetyChecks.map(item=>{const unsafeSelected=!item.required&&!!safety[item.id];return <label className={`sim2-check ${unsafeSelected?"unsafe-selected":""}`} key={item.id}><input type="checkbox" checked={!!safety[item.id]} onChange={()=>{setSafety(v=>({...v,[item.id]:!v[item.id]}));setSafetyFeedback(false);}}/><span>{item.label}</span></label>})}{(safetyFeedback||scenario.safetyChecks.some(i=>!i.required&&safety[i.id]))&&!safetyReady&&<div className="sim2-safety-help">Uncheck the highlighted unsafe action, and make sure every required safety action is selected.</div>}<div className="sim2-footer"><button className="sim2-primary" onClick={()=>{if(safetyReady){setSafetyFeedback(false);setPhase("investigate");}else{setSafetyFeedback(true);setAttempts(value=>value+1);}}}>{safetyReady?"Begin Investigation":"Review Safety Selections"}</button></div></>}
        {phase==="investigate"&&<><span className="sim2-brand">Step 2 • Investigate</span><h2>Where should you inspect first?</h2><div className="sim2-monitor"><div className="sim2-alarm">PEEP HIGH • BLOCKAGE</div><div className="sim2-reading"><div><span>Airway pressure</span><strong>38 cmH₂O</strong></div><div><span>Set PEEP</span><strong>5 cmH₂O</strong></div><div><span>Pressure release</span><strong>Restricted</strong></div></div></div>{scenario.investigationOptions.map(item=><button key={item.id} className={`sim2-choice ${investigation===item.id?(item.correct?"correct":"wrong"):""}`} onClick={()=>chooseInvestigation(item)}>{item.label}</button>)}{chosenInvestigation&&<div className="sim2-feedback"><strong>{chosenInvestigation.correct?"Evidence found":"No fault found here"}</strong><br/>{chosenInvestigation.evidence}</div>}<div className="sim2-footer"><button className="sim2-primary" disabled={!chosenInvestigation?.correct} onClick={()=>setPhase("correct")}>Choose Corrective Action</button></div></>}
        {phase==="correct"&&<><span className="sim2-brand">Step 3 • Correct the fault</span><h2>What should you do?</h2>{scenario.correctiveActions.map(item=><button key={item.id} className={`sim2-choice ${action===item.id?(item.correct?"correct":"wrong"):""}`} onClick={()=>chooseAction(item)}>{item.label}</button>)}{chosenAction&&<div className="sim2-feedback">{chosenAction.correct?"The scavenging path is now open and trapped pressure can release.":"That action is not supported by the evidence collected."}</div>}<div className="sim2-footer"><button className="sim2-primary" disabled={!chosenAction?.correct} onClick={()=>setPhase("verify")}>Verify the Repair</button></div></>}
        {phase==="verify"&&<><span className="sim2-brand">Step 4 • Verification</span><h2>Complete every return-to-service check</h2>{scenario.verificationChecks.map((label,index)=><label className="sim2-check" key={label}><input type="checkbox" checked={!!verification[index]} onChange={()=>setVerification(v=>({...v,[index]:!v[index]}))}/><span>{label}</span></label>)}{verificationReady&&<div className="sim2-monitor"><div className="sim2-alarm" style={{background:'#19734b'}}>FUNCTIONAL TEST PASSED</div><div className="sim2-reading"><div><span>Airway pressure</span><strong>18 cmH₂O</strong></div><div><span>Pressure release</span><strong>Normal</strong></div><div><span>Alarm status</span><strong>Cleared</strong></div></div></div>}<div className="sim2-footer"><button className="sim2-primary" disabled={!verificationReady} onClick={()=>setPhase("report")}>Complete Service Call</button></div></>}
        {phase==="report"&&<><span className="sim2-brand">Service call complete</span><h2>Service call completed successfully</h2><div className="sim2-report"><div><span>Complaint</span><strong>{scenario.title}</strong></div><div><span>Root cause</span><strong>{scenario.rootCause}</strong></div><div><span>Corrective action</span><strong>{scenario.resolution}</strong></div><div><span>Verification</span><strong>Leak test passed • Pressure release normal • Functional ventilation test passed</strong></div><div><span>Disposition</span><strong>Equipment returned to clinical service</strong></div></div><div className="sim2-pearl"><strong>Clinical Pearl</strong><br/>{scenario.clinicalPearl}</div><div className="sim2-footer"><button className="sim2-primary" onClick={()=>{onComplete?.();onExit();}}>Return to Service Calls</button></div></>}
      </main>
    </div>
  </section>;
}

function ExpandedServiceCall({ scenario, onExit, onComplete }) {
  if (scenario.engineVersion === 2) return <InteractiveServiceCallEngine scenario={scenario} onExit={onExit} onComplete={onComplete} />;
  // The Hospital dashboard already provides the assignment briefing.
  // Open directly in the interactive troubleshooting workflow.
  const [phase, setPhase] = useState("work");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const assignmentRef = useRef(null);

  useEffect(() => {
    setPhase("work");
    setStep(0);
    setAnswers({});
    setQuestionIndex(0);
  }, [scenario.id]);

  const score = Object.entries(answers).filter(
    ([index, answer]) => scenario.questions[Number(index)]?.[2] === answer
  ).length;

  useEffect(() => {
    scrollToCbetTrainingTarget("expanded-service-call-top");
  }, [phase, step, questionIndex, scenario.id]);

  const goToPhase = (nextPhase) => setPhase(nextPhase);
  const currentStep = scenario.steps[Math.min(step, scenario.steps.length - 1)];
  const currentQuestion = scenario.questions[questionIndex];
  const answered = answers[questionIndex] !== undefined;

  return (
    <section ref={assignmentRef} id="expanded-service-call-top" className="msb-service-call">
      <style>{`
        .msb-service-call{box-sizing:border-box;width:100%;max-width:1500px;margin:0 auto;padding:18px 24px 42px;color:#102a43;font-family:inherit;scroll-margin-top:12px}
        .msb-service-call *{box-sizing:border-box}
        .msb-service-call button{font:inherit}
        .msb-call-topbar{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:18px}
        .msb-call-back{border:1px solid #bdd3e3;background:#fff;color:#123f66;border-radius:12px;padding:10px 16px;font-weight:800;cursor:pointer}
        .msb-call-kicker{display:inline-flex;align-items:center;border-radius:999px;background:#e7f5fb;color:#087cab;padding:8px 13px;font-size:.78rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
        .msb-call-card{background:#fff;border:1px solid #d7e5ee;border-radius:26px;box-shadow:0 14px 36px rgba(25,70,100,.11);padding:clamp(24px,4vw,52px)}
        .msb-call-card h1{margin:10px 0 14px;color:#071a2f;font-size:clamp(2.1rem,5vw,4.8rem);line-height:1.03;overflow-wrap:anywhere}
        .msb-call-card h2{margin:8px 0 12px;color:#0b2e4f;font-size:clamp(1.65rem,3vw,2.7rem);line-height:1.12;overflow-wrap:anywhere}
        .msb-call-lead{max-width:1000px;margin:0 auto 24px;color:#526b80;font-size:clamp(1rem,1.7vw,1.25rem);line-height:1.6;text-align:center}
        .msb-call-center{text-align:center}
        .msb-call-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin:24px 0}
        .msb-call-info{min-width:0;background:#f2f7fa;border:1px solid #d5e4ed;border-radius:20px;padding:22px}
        .msb-call-info span{display:block;color:#587186;font-size:.78rem;font-weight:900;letter-spacing:.07em;text-transform:uppercase;margin-bottom:8px}
        .msb-call-info strong{display:block;color:#102a43;font-size:clamp(1.05rem,2vw,1.45rem);line-height:1.35;overflow-wrap:anywhere}
        .msb-call-info p{margin:7px 0;color:#294d68;line-height:1.45;overflow-wrap:anywhere}
        .msb-call-primary{display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:14px;background:linear-gradient(135deg,#078fc6,#075887);color:#fff;padding:14px 23px;font-weight:900;cursor:pointer;box-shadow:0 8px 18px rgba(7,104,153,.22)}
        .msb-call-primary:disabled{opacity:.55;cursor:not-allowed}
        .msb-call-work{display:grid;grid-template-columns:minmax(250px,340px) minmax(0,1fr);gap:20px;align-items:start}
        .msb-call-sidebar{position:sticky;top:12px}
        .msb-call-sidebar h1{font-size:clamp(1.8rem,3vw,2.7rem)}
        .msb-call-steps{display:grid;gap:9px;margin-top:20px}
        .msb-call-step{display:grid;grid-template-columns:34px minmax(0,1fr);gap:10px;align-items:center;padding:10px;border-radius:13px;background:#f5f8fa;color:#607489}
        .msb-call-step b{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#dbe7ee;color:#31536c}
        .msb-call-step span{font-weight:800;line-height:1.25;overflow-wrap:anywhere}
        .msb-call-step.active{background:#e6f5fb;color:#075f8b;border:1px solid #8fd3ec}
        .msb-call-step.active b,.msb-call-step.done b{background:#078fc6;color:#fff}
        .msb-call-step.done{color:#18734d;background:#ecf8f2}
        .msb-call-action{min-width:0}
        .msb-call-action p{font-size:1.1rem;line-height:1.65;color:#48657b}
        .msb-call-tool{margin:22px 0;background:#edf7fb;border-left:5px solid #0790c7;border-radius:14px;padding:17px 19px}
        .msb-call-tool span{display:block;font-size:.76rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#4f6e82;margin-bottom:6px}
        .msb-call-tool strong{font-size:1.12rem;color:#0b3554;overflow-wrap:anywhere}
        .msb-call-summary{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:24px 0}
        .msb-call-summary>div{min-width:0;background:#f2f7fa;border-radius:16px;padding:18px}
        .msb-call-summary span{display:block;color:#5b7285;font-size:.76rem;font-weight:900;letter-spacing:.07em;text-transform:uppercase;margin-bottom:7px}
        .msb-call-summary strong{display:block;line-height:1.4;overflow-wrap:anywhere}
        .msb-call-choice{display:block;width:100%;border:1px solid #cfdee8;background:#f8fbfc;border-radius:14px;padding:15px 17px;margin:9px 0;text-align:left;color:#173b57;font-weight:800;line-height:1.35;cursor:pointer;overflow-wrap:anywhere}
        .msb-call-choice.correct{border-color:#36a774;background:#eaf8f1;color:#17633f}
        .msb-call-choice.wrong{border-color:#d7656c;background:#fff0f1;color:#922d35}
        .msb-call-score{font-size:clamp(3rem,8vw,5rem);font-weight:950;color:#087db0;line-height:1}
        .msb-call-progress-note{color:#587186;font-weight:800;margin:8px 0 18px}
        @media(max-width:850px){.msb-service-call{padding:12px 12px 34px}.msb-call-grid,.msb-call-summary,.msb-call-work{grid-template-columns:1fr}.msb-call-sidebar{position:static}.msb-call-card{border-radius:20px;padding:22px}.msb-call-card h1{font-size:clamp(2rem,10vw,3.2rem)}}
      `}</style>

      <div className="msb-call-topbar">
        <button type="button" className="msb-call-back" onClick={onExit}>← Service Calls</button>
        <span className="msb-call-kicker">Biomedical Training Hospital</span>
      </div>

      {phase === "briefing" && (
        <article className="msb-call-card msb-call-center">
          <span className="msb-call-kicker">{scenario.id} • Guided assignment</span>
          <h1>{scenario.title}</h1>
          <p className="msb-call-lead">{scenario.complaint}</p>
          <div className="msb-call-grid">
            <div className="msb-call-info">
              <span>Device and location</span>
              <strong>{scenario.equipment}</strong>
              <p>{scenario.location}</p>
            </div>
            <div className="msb-call-info">
              <span>Recommended toolbox</span>
              {scenario.tools.map((tool) => <p key={tool}>✓ {tool}</p>)}
            </div>
          </div>
          <button type="button" className="msb-call-primary" onClick={() => goToPhase("work")}>Begin Assignment</button>
        </article>
      )}

      {phase === "work" && currentStep && (
        <div className="msb-call-work">
          <aside className="msb-call-card msb-call-sidebar">
            <span className="msb-call-kicker">{scenario.id}</span>
            <h1>{scenario.title}</h1>
            <p>{scenario.complaint}</p>
            <div className="msb-call-steps">
              {scenario.steps.map((item, index) => (
                <div key={item[0]} className={`msb-call-step ${index < step ? "done" : index === step ? "active" : ""}`}>
                  <b>{index < step ? "✓" : index + 1}</b>
                  <span>{item[0]}</span>
                </div>
              ))}
            </div>
          </aside>

          <article className="msb-call-card msb-call-action">
            <span className="msb-call-kicker">Step {step + 1} of {scenario.steps.length}</span>
            <h2>{currentStep[0]}</h2>
            <p>{currentStep[1]}</p>
            <div className="msb-call-tool">
              <span>Tool focus</span>
              <strong>{scenario.tools[Math.min(step, scenario.tools.length - 1)]}</strong>
            </div>
            <button
              type="button"
              className="msb-call-primary"
              onClick={() => step < scenario.steps.length - 1 ? setStep((value) => value + 1) : goToPhase("diagnosis")}
            >
              {step < scenario.steps.length - 1 ? "Complete Step" : "Review Evidence"}
            </button>
          </article>
        </div>
      )}

      {phase === "diagnosis" && (
        <article className="msb-call-card msb-call-center">
          <span className="msb-call-kicker">Evidence review</span>
          <h2>Root cause identified</h2>
          <p className="msb-call-lead">{scenario.diagnosis}</p>
          <div className="msb-call-summary">
            <div><span>Corrective action</span><strong>{scenario.correctiveAction}</strong></div>
            <div><span>Tools used</span><strong>{scenario.tools.join(" • ")}</strong></div>
          </div>
          <button type="button" className="msb-call-primary" onClick={() => goToPhase("questions")}>Start After-Action Review</button>
        </article>
      )}

      {phase === "questions" && currentQuestion && (
        <article className="msb-call-card">
          <span className="msb-call-kicker">After-action review • {questionIndex + 1}/{scenario.questions.length}</span>
          <h2>{currentQuestion[0]}</h2>
          {currentQuestion[1].map((option, index) => (
            <button
              type="button"
              key={option}
              disabled={answered}
              className={`msb-call-choice ${answered && index === currentQuestion[2] ? "correct" : answered && index === answers[questionIndex] ? "wrong" : ""}`}
              onClick={() => setAnswers((previous) => ({ ...previous, [questionIndex]: index }))}
            >
              {option}
            </button>
          ))}
          {answered && (
            <button
              type="button"
              className="msb-call-primary"
              onClick={() => questionIndex < scenario.questions.length - 1 ? setQuestionIndex((value) => value + 1) : goToPhase("debrief")}
            >
              {questionIndex < scenario.questions.length - 1 ? "Next Question" : "Complete Service Call"}
            </button>
          )}
        </article>
      )}

      {phase === "debrief" && (
        <article className="msb-call-card msb-call-center">
          <span className="msb-call-kicker">Service call complete</span>
          <h2>{scenario.id} closed</h2>
          <div className="msb-call-score">{score}/{scenario.questions.length}</div>
          <p className="msb-call-progress-note">After-action review score</p>
          <div className="msb-call-summary">
            <div><span>Root cause</span><strong>{scenario.diagnosis}</strong></div>
            <div><span>Resolution</span><strong>{scenario.correctiveAction}</strong></div>
          </div>
          {scenario.clinicalPearl && (
            <div className="msb-call-tool" style={{ textAlign: "left", background: "#fff7df", borderLeftColor: "#e2a426" }}>
              <span>Clinical Pearl</span>
              <strong>{scenario.clinicalPearl}</strong>
            </div>
          )}
          {scenario.achievement && (
            <div className="msb-call-info" style={{ maxWidth: 620, margin: "18px auto", textAlign: "left" }}>
              <span>Achievement unlocked</span>
              <strong>🏅 {scenario.achievement}{scenario.xp ? ` • +${scenario.xp} XP` : ""}</strong>
            </div>
          )}
          <button type="button" className="msb-call-primary" onClick={() => { if (scenario.xp) awardCbetXp(scenario.xp, `service-call-${scenario.id}`); onComplete?.(); onExit(); }}>Return to Service Calls</button>
        </article>
      )}
    </section>
  );
}

function TroubleshootingMonitor({ phase, cycleNumber }) {
  const originalFailure = phase === "failed";
  const normal = phase === "normal" || phase === "verified";
  const pressure = originalFailure ? 42 : normal ? 122 : 0;
  return (
    <div className="sim-monitor" aria-label="Guardian GX5 patient monitor">
      <div className="sim-monitor-top"><strong>Guardian GX5</strong><span>BED 418</span></div>
      <div className="sim-screen">
        <div className="sim-vital ecg"><span>ECG</span><strong>72</strong><small>bpm</small><i className="sim-wave">⌁⌁╱╲⌁⌁╱╲⌁⌁</i></div>
        <div className="sim-vital spo2"><span>SpO₂</span><strong>98</strong><small>%</small><i className="sim-wave">∿∿∿∿∿∿∿</i></div>
        <div className="sim-nibp">
          <span>NIBP</span>
          <strong>{normal ? "122/78" : originalFailure ? `${pressure} ↓` : "—/—"}</strong>
          <small>mmHg</small>
          {originalFailure && <b>LEAK ERROR</b>}
          {phase === "inflating" && <b>INFLATING…</b>}
          {phase === "verified" && <b className="ok">PASS • CYCLE {cycleNumber}/3</b>}
        </div>
      </div>
      <div className="sim-monitor-controls"><button type="button">Silence</button><button type="button">Trends</button><button type="button" className="nibp-key">NIBP Start/Stop</button></div>
    </div>
  );
}

function GuidedTroubleshootingEngine({ scenario, onExit, onComplete }) {
  const [screen, setScreen] = useState("briefing");
  const [step, setStep] = useState(0);
  const [monitorPhase, setMonitorPhase] = useState("idle");
  const [diagnosis, setDiagnosis] = useState("");
  const [repairDone, setRepairDone] = useState(false);
  const [verifyCount, setVerifyCount] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [log, setLog] = useState([`08:17 — Service call ${scenario.id} dispatched to Clinical Engineering.`]);

  const addLog = (message) => setLog((items) => [...items, `${String(18 + items.length * 3).padStart(2, "0")}:${items.length % 2 ? "21" : "18"} — ${message}`]);
  const completeStep = () => {
    const current = scenario.stages[step];
    if (!current) return;
    if (current.id === "reproduce") setMonitorPhase("failed");
    if (current.id === "substitute") setMonitorPhase("normal");
    addLog(current.log);
    const next = step + 1;
    setStep(next);
    if (next >= scenario.stages.length) setTimeout(() => setScreen("diagnosis"), 250);
  };
  const correctDiagnosis = scenario.diagnoses.find((item) => item.correct)?.id;
  const score = Object.entries(answers).filter(([idx, value]) => scenario.questions[Number(idx)].answer === value).length;

  return (
    <section className="service-engine-shell">
      <style>{`
        .service-engine-shell{min-height:100vh;background:linear-gradient(135deg,#eef8fc,#e5f1f8);padding:24px;color:#07111f;font-family:inherit}.engine-topbar{max-width:1400px;margin:0 auto 18px;display:flex;justify-content:space-between;align-items:center}.engine-back{border:0;background:#fff;padding:12px 16px;border-radius:12px;font-weight:800;box-shadow:0 8px 30px #16344b14;cursor:pointer}.engine-badge{font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#0788c1}.engine-brief{max-width:1000px;margin:45px auto;background:#fff;border-radius:30px;padding:48px;box-shadow:0 24px 70px #16344b1a}.engine-brief h1{font-size:clamp(2.4rem,6vw,5rem);margin:8px 0 20px;line-height:.95}.engine-brief-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:28px;margin:30px 0}.engine-card{background:#f3f8fb;border:1px solid #d8e7ef;border-radius:20px;padding:22px}.engine-primary{border:0;background:#057eb5;color:#fff;padding:15px 22px;border-radius:14px;font-weight:900;font-size:1rem;cursor:pointer}.engine-layout{max-width:1400px;margin:auto;display:grid;grid-template-columns:minmax(250px,320px) minmax(480px,1fr) minmax(290px,390px);gap:22px;align-items:start}.engine-panel{background:#fff;border-radius:26px;padding:26px;box-shadow:0 18px 55px #16344b16}.engine-case h1{font-size:clamp(2rem,3.2vw,3.3rem);line-height:1;margin:10px 0 16px}.engine-case p{line-height:1.55}.engine-progress{display:grid;gap:10px;margin-top:24px}.engine-step{display:flex;gap:12px;align-items:center;padding:12px;border-radius:14px;background:#f4f8fa;border:1px solid #dce8ee}.engine-step.done{background:#e9f8f1;border-color:#afe1c9}.engine-step.active{background:#e8f5fc;border-color:#83cbe9}.engine-step b{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:#fff}.engine-workbench{display:grid;gap:20px}.sim-monitor{background:#1b2731;border:10px solid #dbe1e4;border-radius:28px;padding:16px;box-shadow:inset 0 0 0 2px #9ca8ad,0 18px 45px #07111f2b}.sim-monitor-top{display:flex;justify-content:space-between;color:#dbe9ef;padding:2px 5px 12px;font-size:.85rem;letter-spacing:.08em}.sim-screen{background:#07131b;border-radius:12px;padding:18px;color:#eaf8ff;min-height:330px;display:grid;grid-template-columns:1fr 1fr;gap:12px}.sim-vital,.sim-nibp{position:relative;border-bottom:1px solid #28414e;padding:12px}.sim-vital span,.sim-nibp span{display:block;font-weight:900;letter-spacing:.08em}.sim-vital strong,.sim-nibp strong{font-size:3rem}.sim-vital small,.sim-nibp small{margin-left:8px}.sim-wave{display:block;font-style:normal;font-size:1.6rem;letter-spacing:.12em;margin-top:18px}.sim-vital.ecg{color:#6df58d}.sim-vital.spo2{color:#62d8ff}.sim-nibp{grid-column:1/-1;color:#fff}.sim-nibp b{display:inline-block;margin-top:15px;margin-left:14px;padding:8px 12px;border-radius:8px;background:#9d2731;color:#fff}.sim-nibp b.ok{background:#18754a}.sim-monitor-controls{display:flex;gap:10px;padding-top:14px}.sim-monitor-controls button{flex:1;border:1px solid #64737b;background:#34444d;color:#fff;border-radius:9px;padding:10px;font-weight:800}.sim-monitor-controls .nibp-key{background:#e5edf0;color:#15232b}.engine-action{background:#fff;border-radius:22px;padding:24px;border:1px solid #d9e7ee}.engine-action h2{margin-top:4px}.engine-action button{width:100%}.engine-log{max-height:610px;overflow:auto}.engine-log-entry{font-family:ui-monospace,monospace;background:#102638;color:#eefaff;border-radius:13px;padding:14px;margin:10px 0;line-height:1.45}.engine-choice{width:100%;text-align:left;border:1px solid #d7e5ec;background:#f7fafb;border-radius:14px;padding:15px;margin:7px 0;font-weight:800;cursor:pointer}.engine-choice.selected{border-color:#0788c1;background:#e8f6fc}.engine-choice.correct{border-color:#2d9b68;background:#eaf8f1}.engine-choice.wrong{border-color:#c94e56;background:#fff0f1}.engine-result{max-width:900px;margin:30px auto}.engine-summary{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.engine-summary div{background:#f3f8fb;border-radius:14px;padding:16px}.engine-summary span{display:block;font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:#537080}.engine-summary strong{display:block;margin-top:5px}.engine-doc{background:#102638;color:#eefaff;border-radius:18px;padding:22px;line-height:1.7;margin-top:20px}.engine-score{font-size:4rem;font-weight:900}.engine-verify{display:flex;gap:10px;margin-top:15px}.engine-verify i{flex:1;height:10px;border-radius:99px;background:#d7e5ec}.engine-verify i.done{background:#27a56c}@media(max-width:1100px){.engine-layout{grid-template-columns:280px 1fr}.engine-log-panel{grid-column:1/-1}.engine-log{max-height:300px}}@media(max-width:760px){.service-engine-shell{padding:12px}.engine-layout,.engine-brief-grid{grid-template-columns:1fr}.engine-case h1{font-size:2.4rem}.sim-screen{min-height:280px}.engine-brief{padding:28px}.engine-summary{grid-template-columns:1fr}}
      `}</style>
      <div className="engine-topbar"><button className="engine-back" onClick={onExit}>← Service Calls</button><span className="engine-badge">Biomedical Training Hospital</span></div>

      {screen === "briefing" && <article className="engine-brief">
        <span className="engine-badge">{scenario.id} • {scenario.mode}</span><h1>{scenario.title}</h1><p>{scenario.complaint}</p>
        <div className="engine-brief-grid"><div className="engine-card"><strong>Device</strong><h2>{scenario.equipment}</h2><p>{scenario.location}</p></div><div className="engine-card"><strong>Recommended setup</strong>{scenario.tools.map((tool) => <p key={tool}>✓ {tool}</p>)}</div></div>
        <button className="engine-primary" onClick={() => setScreen("workbench")}>Accept Service Call</button>
      </article>}

      {screen === "workbench" && <div className="engine-layout">
        <aside className="engine-panel engine-case"><span className="engine-badge">{scenario.id}</span><h1>{scenario.title}</h1><p>{scenario.complaint}</p><div className="engine-progress">{scenario.stages.map((item, idx) => <div key={item.id} className={`engine-step ${idx < step ? "done" : idx === step ? "active" : ""}`}><b>{idx < step ? "✓" : idx + 1}</b><span>{item.label}</span></div>)}</div></aside>
        <main className="engine-workbench"><TroubleshootingMonitor phase={monitorPhase} cycleNumber={verifyCount}/><div className="engine-action"><span className="engine-badge">Current action</span><h2>{scenario.stages[step]?.label || "Evidence collected"}</h2><p>{scenario.stages[step]?.id === "reproduce" ? "Observe the pressure rise and fall. The behavior—not the error text alone—is your evidence." : "Complete the action, observe the result, and let the evidence guide the next step."}</p><button className="engine-primary" onClick={completeStep}>{scenario.stages[step]?.action || "Continue to diagnosis"}</button></div></main>
        <aside className="engine-panel engine-log-panel"><span className="engine-badge">Evidence log</span><h2>Service record</h2><div className="engine-log">{log.map((entry, idx) => <div className="engine-log-entry" key={`${entry}-${idx}`}>{entry}</div>)}</div></aside>
      </div>}

      {screen === "diagnosis" && <article className="engine-panel engine-result"><span className="engine-badge">Root-cause decision</span><h1>Select the diagnosis supported by the evidence</h1>{scenario.diagnoses.map((item) => <button key={item.id} className={`engine-choice ${diagnosis === item.id ? "selected" : ""}`} onClick={() => setDiagnosis(item.id)}>{item.label}</button>)}<button className="engine-primary" disabled={!diagnosis} onClick={() => { if (diagnosis === correctDiagnosis) { addLog("Root cause documented: leak in original NIBP hose."); setScreen("repair"); } }}>Submit Evidence-Based Diagnosis</button>{diagnosis && diagnosis !== correctDiagnosis && <p><strong>Not yet supported.</strong> Review what changed when normal operation returned and which component failed direct testing.</p>}</article>}

      {screen === "repair" && <article className="engine-panel engine-result"><span className="engine-badge">Corrective action and verification</span><h1>{repairDone ? "Verify the repair" : scenario.repair}</h1><TroubleshootingMonitor phase={repairDone ? (verifyCount ? "verified" : "normal") : "failed"} cycleNumber={verifyCount}/>{!repairDone ? <button className="engine-primary" onClick={() => { setRepairDone(true); addLog("Failed NIBP hose removed and replacement hose installed."); }}>Replace NIBP Hose</button> : <><div className="engine-verify">{[1,2,3].map((n) => <i key={n} className={verifyCount >= n ? "done" : ""}/>)}</div><button className="engine-primary" onClick={() => { const next = verifyCount + 1; setVerifyCount(next); addLog(`Verification cycle ${next} completed successfully without leak error.`); if (next === 3) setTimeout(() => setScreen("questions"), 250); }}>Run Verification Cycle {Math.min(verifyCount + 1,3)} of 3</button></>}</article>}

      {screen === "questions" && <article className="engine-panel engine-result"><span className="engine-badge">After-action review • {questionIndex + 1}/{scenario.questions.length}</span><h1>{scenario.questions[questionIndex].q}</h1>{scenario.questions[questionIndex].options.map((option, idx) => { const chosen = answers[questionIndex]; const answered = chosen !== undefined; return <button key={option} disabled={answered} className={`engine-choice ${answered && idx === scenario.questions[questionIndex].answer ? "correct" : answered && idx === chosen ? "wrong" : ""}`} onClick={() => setAnswers((old) => ({...old,[questionIndex]:idx}))}>{option}</button>; })}{answers[questionIndex] !== undefined && <><p><strong>{answers[questionIndex] === scenario.questions[questionIndex].answer ? "Correct." : "Review this concept."}</strong> {scenario.questions[questionIndex].why}</p><button className="engine-primary" onClick={() => questionIndex < scenario.questions.length - 1 ? setQuestionIndex(questionIndex + 1) : setScreen("debrief")}>{questionIndex < scenario.questions.length - 1 ? "Next Question" : "Complete Service Call"}</button></>}</article>}

      {screen === "debrief" && <article className="engine-panel engine-result"><span className="engine-badge">Service call complete</span><h1>Device returned to service</h1><div className="engine-score">{score}/{scenario.questions.length}</div><p>After-action review score</p><div className="engine-summary"><div><span>Failure</span><strong>Leak in original NIBP hose</strong></div><div><span>Corrective action</span><strong>NIBP hose replaced</strong></div><div><span>Verification</span><strong>Three successful NIBP cycles</strong></div><div><span>Competencies</span><strong>Patient Safety • Signal Isolation • Evidence-Based Troubleshooting • Documentation</strong></div></div><div className="engine-doc"><strong>Service documentation</strong><br/>Confirmed alternate blood-pressure monitoring and removed the monitor from clinical service. Reproduced the reported NIBP leak error with the original cuff and hose. A known-good accessory set restored normal operation. Pressure-decay testing isolated the leak to the original hose near the connector strain relief. Replaced the NIBP hose and completed three successful verification cycles without error. Device returned to clinical service.</div><button className="engine-primary" onClick={() => { onComplete?.(); onExit(); }}>Complete Service Call</button></article>}
    </section>
  );
}

function GuardianNibpServiceCall({ onExit, onComplete }) {
  const [phase, setPhase] = useState("dispatch");
  const [choice, setChoice] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [xpAwarded, setXpAwarded] = useState(false);

  const phases = ["Dispatch", "Prioritize", "Assess", "Inspect", "Isolate", "Resolve"];
  const phaseIndex = {
    dispatch: 0,
    priority: 1,
    assess: 2,
    inspect: 3,
    cuffTest: 4,
    hoseTest: 4,
    root: 4,
    complete: 5,
  }[phase] ?? 0;

  const finishCall = () => {
    if (!xpAwarded) {
      awardCbetXp(175, "service-call-WO-1052");
      setXpAwarded(true);
    }
    onComplete?.();
    setPhase("complete");
  };

  const selectAnswer = (value, correct, nextPhase) => {
    setChoice(value);
    if (correct) {
      playCbetTone("correct");
      window.setTimeout(() => {
        setChoice("");
        setAttempts(0);
        if (nextPhase === "complete") finishCall();
        else setPhase(nextPhase);
      }, 550);
    } else {
      playCbetTone("wrong");
      setAttempts((count) => count + 1);
    }
  };

  const Feedback = ({ first, second }) => {
    if (!choice) return null;
    return <div className="pressure-feedback">{attempts >= 2 ? second : first}</div>;
  };

  const Choice = ({ id, children, correct, next }) => (
    <button
      type="button"
      className={`pressure-choice ${choice === id ? (correct ? "correct" : "wrong") : ""}`}
      onClick={() => selectAnswer(id, correct, next)}
    >
      {children}
    </button>
  );

  return (
    <section className="pressure-shell" id="guided-troubleshooting-top">
      <style>{`
        .pressure-shell{min-height:100vh;background:#eef5f8;color:#102a43;padding:18px;font-family:inherit;box-sizing:border-box}
        .pressure-shell *{box-sizing:border-box}.pressure-shell button{font:inherit}
        .pressure-topbar{max-width:1220px;margin:0 auto 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
        .pressure-back{border:1px solid #c7d9e4;background:#fff;color:#174565;border-radius:12px;padding:10px 15px;font-weight:850;cursor:pointer}
        .pressure-brand{font-size:.77rem;font-weight:900;letter-spacing:.09em;text-transform:uppercase;color:#087aa7}
        .pressure-card{max-width:1220px;margin:0 auto;background:#fff;border:1px solid #d3e3ec;border-radius:26px;box-shadow:0 16px 40px rgba(22,65,91,.12);overflow:hidden}
        .pressure-header{padding:26px clamp(22px,4vw,46px);background:linear-gradient(135deg,#122f49,#126a82);color:#fff}
        .pressure-header-grid{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center}.pressure-header h1{font-size:clamp(2.2rem,5vw,4.4rem);line-height:1;margin:8px 0 12px}.pressure-header p{font-size:1.05rem;line-height:1.55;margin:0;max-width:760px;color:#dceef7}
        .pressure-icon{width:98px;height:98px;border-radius:24px;background:rgba(255,255,255,.13);display:grid;place-items:center;font-size:3rem;border:1px solid rgba(255,255,255,.22)}
        .pressure-meta{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}.pressure-meta span{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:8px 12px;font-size:.86rem;font-weight:750}
        .pressure-progress{display:grid;grid-template-columns:repeat(6,1fr);gap:7px;padding:17px clamp(18px,3vw,38px);border-bottom:1px solid #dce8ef;background:#f8fbfc}.pressure-progress span{padding:8px 6px;border-radius:10px;text-align:center;color:#7890a1;font-size:.74rem;font-weight:850}.pressure-progress span.active{background:#dff3fb;color:#087aa7}.pressure-progress span.done{background:#e3f5eb;color:#14734c}
        .pressure-body{padding:clamp(24px,4vw,46px);max-width:900px;margin:auto}.pressure-body h2{font-size:clamp(1.65rem,3vw,2.45rem);line-height:1.15;margin:8px 0 12px;color:#0b2942}.pressure-body>p{font-size:1.05rem;line-height:1.65;color:#536c7e}
        .pressure-kicker{display:inline-flex;border-radius:999px;background:#e5f4fa;color:#087ba7;padding:7px 11px;font-size:.75rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
        .pressure-call{margin:24px 0;background:#f4f8fa;border:1px solid #d5e4ec;border-radius:20px;padding:22px}.pressure-call strong{display:block;color:#0b3858;margin-bottom:9px}.pressure-call blockquote{margin:0;color:#456174;font-size:1.08rem;line-height:1.62}
        .pressure-choice{width:100%;text-align:left;border:1px solid #cbdde7;background:#fff;color:#173d58;border-radius:15px;padding:15px 17px;margin:8px 0;font-weight:800;cursor:pointer;transition:.16s}.pressure-choice:hover{border-color:#1389b4;transform:translateY(-1px);box-shadow:0 7px 18px rgba(30,100,130,.09)}.pressure-choice.correct{border-color:#1c9b66;background:#e9f8f0}.pressure-choice.wrong{border-color:#d95d63;background:#fff0f0}
        .pressure-primary,.pressure-secondary{border:0;border-radius:13px;padding:13px 19px;font-weight:900;cursor:pointer}.pressure-primary{background:#087ca8;color:#fff;box-shadow:0 8px 20px rgba(8,124,168,.22)}.pressure-secondary{background:#e7f0f4;color:#174565}.pressure-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:24px}
        .pressure-feedback{margin-top:12px;background:#fff7e6;border:1px solid #f2d493;color:#72541b;border-radius:14px;padding:13px 15px;line-height:1.5;font-weight:720}
        .pressure-clues{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:21px 0}.pressure-clue{border-radius:16px;padding:17px;border:1px solid #d6e3ea;background:#f7fafb}.pressure-clue span{display:block;font-size:.73rem;font-weight:900;text-transform:uppercase;letter-spacing:.08em;color:#71899a;margin-bottom:7px}.pressure-clue strong{font-size:1.05rem}.pressure-clue.good{border-color:#b9e4cb;background:#effaf4}.pressure-clue.bad{border-color:#f0c0c0;background:#fff3f3}
        .pressure-monitor{background:#071923;color:#d8f8ff;border-radius:20px;padding:18px;margin:22px 0;box-shadow:inset 0 0 0 1px #234653}.pressure-monitor-top{display:flex;justify-content:space-between;color:#7cb4c5;font-size:.72rem;font-weight:900;letter-spacing:.08em}.pressure-gauge{height:92px;margin:18px 0 10px;display:flex;align-items:flex-end;gap:8px}.pressure-gauge i{display:block;flex:1;background:#43d4e7;border-radius:5px 5px 1px 1px;min-height:10px}.pressure-gauge.failed i:nth-child(n+5){background:#b64950}.pressure-readings{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.pressure-readings div{background:#102d39;border-radius:10px;padding:10px}.pressure-readings span{display:block;color:#75aebe;font-size:.68rem;font-weight:850}.pressure-readings strong{display:block;margin-top:4px;font-size:.97rem;color:#e8fbff}
        .pressure-teach{margin:18px 0;background:#eaf6fb;border-left:4px solid #1688b2;border-radius:12px;padding:15px 17px;color:#24546d;line-height:1.55}
        .pressure-success{text-align:center}.pressure-success-icon{width:72px;height:72px;border-radius:50%;display:grid;place-items:center;margin:0 auto 16px;background:#dff5e8;color:#148052;font-size:2.2rem;font-weight:950}.pressure-report{display:grid;grid-template-columns:1fr 1fr;gap:12px;text-align:left;margin:24px 0}.pressure-report div{border:1px solid #d9e6ed;border-radius:15px;padding:15px;background:#f9fbfc}.pressure-report span{display:block;color:#71899a;font-size:.72rem;font-weight:900;text-transform:uppercase;letter-spacing:.07em;margin-bottom:5px}.pressure-report strong{color:#173c56}
        .pressure-consequence{text-align:left;border:1px solid #f0cf9c;background:#fff8ec;border-radius:18px;padding:19px;margin:22px 0}.pressure-consequence h3{margin:0 0 10px;color:#7d5512}.pressure-consequence p{margin:7px 0;color:#624e2d;line-height:1.5}
        .pressure-pearl{border-radius:18px;padding:20px;background:linear-gradient(135deg,#0d334e,#0b6b86);color:#fff;text-align:left;margin:22px 0}.pressure-pearl span{display:block;color:#aee9f6;font-size:.75rem;font-weight:900;text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px}.pressure-pearl strong{font-size:1.08rem;line-height:1.55}
        .pressure-achievement{display:flex;align-items:center;gap:13px;border:1px solid #d3e3ec;background:#f5f9fb;border-radius:18px;padding:17px;text-align:left}.pressure-achievement>b{font-size:2rem}.pressure-achievement span{display:block;color:#71899a;font-size:.72rem;font-weight:900;text-transform:uppercase}.pressure-achievement strong{display:block;color:#173d58}.pressure-xp{margin-left:auto!important;color:#0b8560!important;font-size:1.15rem}
        @media(max-width:700px){.pressure-header-grid{grid-template-columns:1fr}.pressure-icon{display:none}.pressure-progress{grid-template-columns:repeat(3,1fr)}.pressure-clues,.pressure-report{grid-template-columns:1fr}.pressure-readings{grid-template-columns:1fr}.pressure-body{padding:23px 17px}}
      `}</style>

      <div className="pressure-topbar">
        <button type="button" className="pressure-back" onClick={onExit}>← Service Calls</button>
        <span className="pressure-brand">MedSkillBuilder Clinical Engineering Academy</span>
      </div>

      <article className="pressure-card">
        <header className="pressure-header">
          <div className="pressure-header-grid">
            <div>
              <span className="pressure-brand" style={{ color: "#bceaff" }}>Interactive Service Call</span>
              <h1>Pressure Lost</h1>
              <p>The blood-pressure cuff inflates, but the bedside monitor cannot complete a reading.</p>
              <div className="pressure-meta"><span>4 West • Room 418</span><span>Guardian GX5 Bedside Monitor</span><span>Beginner+ • 7–9 minutes</span></div>
            </div>
            <div className="pressure-icon" aria-hidden="true">◉</div>
          </div>
        </header>

        <div className="pressure-progress">
          {phases.map((label, index) => <span key={label} className={index < phaseIndex ? "done" : index === phaseIndex ? "active" : ""}>{index < phaseIndex ? "✓ " : ""}{label}</span>)}
        </div>

        <main className="pressure-body">
          {phase === "dispatch" && <>
            <span className="pressure-kicker">Incoming Service Call</span>
            <h2>4 West needs Clinical Engineering.</h2>
            <div className="pressure-call"><strong>Nurse report</strong><blockquote>“The cuff starts inflating, then the monitor stops and says LEAK. ECG and pulse ox are fine. We tried the blood pressure twice.”</blockquote></div>
            <button type="button" className="pressure-primary" onClick={() => setPhase("priority")}>Accept Service Call</button>
          </>}

          {phase === "priority" && <>
            <span className="pressure-kicker">Step 1 • Prioritize</span><h2>What should happen before troubleshooting begins?</h2>
            <Choice id="cycle" correct={false} next="assess">Run several more NIBP cycles on the patient</Choice>
            <Choice id="alternate" correct={true} next="assess">Confirm the patient is stable and another blood-pressure method is available</Choice>
            <Choice id="open" correct={false} next="assess">Open the monitor and inspect the pump</Choice>
            <Choice id="reset" correct={false} next="assess">Reset the monitor to factory settings</Choice>
            <Feedback first="Start with the clinical situation, not the suspected component." second="The monitor may need to be removed from use. Make sure blood-pressure monitoring continues first." />
          </>}

          {phase === "assess" && <>
            <span className="pressure-kicker">Step 2 • Assess the Evidence</span><h2>What does the pattern suggest?</h2>
            <div className="pressure-clues"><div className="pressure-clue good"><span>ECG</span><strong>Normal waveform</strong></div><div className="pressure-clue good"><span>SpO₂</span><strong>98% • good pleth</strong></div><div className="pressure-clue bad"><span>NIBP</span><strong>Inflates • LEAK</strong></div></div>
            <Choice id="total" correct={false} next="inspect">The entire monitor has failed</Choice>
            <Choice id="pneumatic" correct={true} next="inspect">The problem is likely within the NIBP pneumatic path</Choice>
            <Choice id="network" correct={false} next="inspect">The central monitoring network has failed</Choice>
            <Choice id="power" correct={false} next="inspect">The monitor power supply is unstable</Choice>
            <Feedback first="Use the functions that still work to narrow the affected system." second="Only the cuff-based pressure function is failing; focus on the cuff, hose, connections, and NIBP hardware." />
          </>}

          {phase === "inspect" && <>
            <span className="pressure-kicker">Step 3 • Inspect</span><h2>What is the best first equipment check?</h2>
            <div className="pressure-monitor"><div className="pressure-monitor-top"><span>GUARDIAN GX5</span><span>NIBP CYCLE</span></div><div className="pressure-gauge failed">{[18,30,45,62,48,35,22,12].map((h,i)=><i key={i} style={{height:`${h}px`}}/>)}</div><div className="pressure-readings"><div><span>ECG</span><strong>78 bpm</strong></div><div><span>SpO₂</span><strong>98%</strong></div><div><span>NIBP</span><strong>LEAK</strong></div></div></div>
            <Choice id="external" correct={true} next="cuffTest">Inspect cuff size and placement, tubing, and all external connections</Choice>
            <Choice id="pump" correct={false} next="cuffTest">Replace the internal NIBP pump</Choice>
            <Choice id="software" correct={false} next="cuffTest">Reinstall the monitor software</Choice>
            <Choice id="network2" correct={false} next="cuffTest">Troubleshoot the network switch</Choice>
            <Feedback first="Begin with accessible causes before internal repair." second="A leak message should first lead you through the external pneumatic pathway from cuff to monitor connector." />
          </>}

          {phase === "cuffTest" && <>
            <span className="pressure-kicker">Step 4 • Change One Variable</span><h2>The cuff is correctly sized and positioned. The patient is still. What should you do next?</h2>
            <div className="pressure-teach"><strong>Inspection evidence:</strong> The cuff bladder looks intact. The hose shows light wear near the connector, but no obvious opening is visible.</div>
            <Choice id="goodcuff" correct={true} next="hoseTest">Test with a compatible known-good cuff while keeping the original hose</Choice>
            <Choice id="wholemonitor" correct={false} next="hoseTest">Replace the complete bedside monitor</Choice>
            <Choice id="calibrate" correct={false} next="hoseTest">Calibrate the ECG channel</Choice>
            <Choice id="ignore" correct={false} next="hoseTest">Return it to use because ECG and SpO₂ work</Choice>
            <Feedback first="Choose an action that isolates one part of the pneumatic path." second="Keep the original hose and change only the cuff. The result will tell you whether the cuff is responsible." />
          </>}

          {phase === "hoseTest" && <>
            <span className="pressure-kicker">Step 5 • Isolate the Fault</span><h2>The known-good cuff produces the same leak error. What is the strongest next test?</h2>
            <div className="pressure-teach"><strong>New evidence:</strong> Changing only the cuff did not change the failure. The original hose remains in the test setup.</div>
            <Choice id="goodhose" correct={true} next="root">Install a known-good NIBP hose and repeat the cycle</Choice>
            <Choice id="pump2" correct={false} next="root">Replace the internal pump immediately</Choice>
            <Choice id="battery" correct={false} next="root">Replace the monitor battery</Choice>
            <Choice id="alarm" correct={false} next="root">Disable the leak alarm</Choice>
            <Feedback first="Continue isolating the external pressure path before moving inside the device." second="The cuff has been ruled out. The remaining external component between cuff and monitor is the hose." />
          </>}

          {phase === "root" && <>
            <span className="pressure-kicker">Step 6 • Identify Root Cause</span><h2>A normal 122/78 reading completes with the known-good hose. What conclusion is supported?</h2>
            <div className="pressure-monitor"><div className="pressure-monitor-top"><span>GUARDIAN GX5</span><span>CYCLE COMPLETE</span></div><div className="pressure-gauge">{[12,22,34,48,62,72,82,90].map((h,i)=><i key={i} style={{height:`${h}px`}}/>)}</div><div className="pressure-readings"><div><span>ECG</span><strong>78 bpm</strong></div><div><span>SpO₂</span><strong>98%</strong></div><div><span>NIBP</span><strong>122/78</strong></div></div></div>
            <Choice id="hose" correct={true} next="complete">The original NIBP hose is leaking</Choice>
            <Choice id="cuff" correct={false} next="complete">The original cuff is leaking</Choice>
            <Choice id="pump3" correct={false} next="complete">The internal pump has failed</Choice>
            <Choice id="network3" correct={false} next="complete">The network caused the failed cycle</Choice>
            <Feedback first="Follow what changed immediately before normal operation returned." second="The cuff had already failed to change the result. Replacing only the hose restored a complete cycle." />
          </>}

          {phase === "complete" && <div className="pressure-success">
            <div className="pressure-success-icon">✓</div><span className="pressure-kicker">Service Call Complete</span><h2>Blood-pressure monitoring restored.</h2><p>The Guardian monitor and NIBP pump were functioning. A leak in the original hose prevented the cuff from maintaining pressure.</p>
            <div className="pressure-report"><div><span>Complaint</span><strong>Cuff inflates, then cycle stops with LEAK</strong></div><div><span>Root cause</span><strong>Leak near original hose connector strain relief</strong></div><div><span>Corrective action</span><strong>Replaced NIBP hose</strong></div><div><span>Verification</span><strong>Three successful NIBP cycles completed</strong></div></div>
            <div className="pressure-consequence"><h3>What would have happened?</h3><p>Replacing the monitor first could have removed a working device while leaving the leaking hose in use.</p><p>If the original hose were connected to the replacement monitor, the same leak error would likely return.</p><p>Opening the monitor too early would add downtime without first eliminating the more common external causes.</p></div>
            <div className="pressure-pearl"><span>Clinical Pearl</span><strong>For pneumatic failures, isolate the pressure path one component at a time: cuff, hose, connector, then internal hardware.</strong></div>
            <div className="pressure-achievement"><b>🏅</b><div><span>Achievement Unlocked</span><strong>Pressure Pathfinder</strong></div><strong className="pressure-xp">+175 XP</strong></div>
            <div className="pressure-call" style={{ textAlign: "left" }}><strong>Next Service Call Unlocked</strong><blockquote><b>Low-Pressure Leak Test Failure</b><br/>An anesthesia workstation fails its pre-use leak test in Operating Room 6.</blockquote></div>
            <div className="pressure-actions"><button type="button" className="pressure-primary" onClick={onExit}>Return to Service Calls</button><button type="button" className="pressure-secondary" onClick={() => { setChoice(""); setAttempts(0); setPhase("dispatch"); }}>Replay Call</button></div>
          </div>}
        </main>
      </article>
    </section>
  );
}

function GuardianEcgServiceCall({ onExit, onComplete }) {
  const [phase, setPhase] = useState("dispatch");
  const [choice, setChoice] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [xpAwarded, setXpAwarded] = useState(false);

  const phases = ["Dispatch", "Prioritize", "Assess", "Inspect", "Isolate", "Resolve"];
  const phaseIndex = {
    dispatch: 0,
    priority: 1,
    assess: 2,
    inspect: 3,
    cable: 4,
    root: 4,
    complete: 5,
  }[phase] ?? 0;

  const selectAnswer = (value, correct, nextPhase) => {
    setChoice(value);
    if (correct) {
      playCbetTone("correct");
      window.setTimeout(() => {
        setChoice("");
        if (nextPhase === "complete") finishCall();
        else setPhase(nextPhase);
      }, 550);
    } else {
      playCbetTone("wrong");
      setAttempts((count) => count + 1);
    }
  };

  const finishCall = () => {
    if (!xpAwarded) {
      awardCbetXp(150, "service-call-WO-1048");
      setXpAwarded(true);
    }
    onComplete?.();
    setPhase("complete");
  };

  const Choice = ({ id, children, correct, next }) => (
    <button
      type="button"
      className={`missing-choice ${choice === id ? (correct ? "correct" : "wrong") : ""}`}
      onClick={() => selectAnswer(id, correct, next)}
    >
      {children}
    </button>
  );

  return (
    <section className="missing-beat-shell" id="missing-beat-top">
      <style>{`
        .missing-beat-shell{min-height:100vh;background:#eef5f8;color:#102a43;padding:18px;font-family:inherit;box-sizing:border-box}
        .missing-beat-shell *{box-sizing:border-box}.missing-beat-shell button{font:inherit}
        .missing-topbar{max-width:1220px;margin:0 auto 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
        .missing-back{border:1px solid #c7d9e4;background:#fff;color:#174565;border-radius:12px;padding:10px 15px;font-weight:850;cursor:pointer}
        .missing-brand{font-size:.77rem;font-weight:900;letter-spacing:.09em;text-transform:uppercase;color:#087aa7}
        .missing-card{max-width:1220px;margin:0 auto;background:#fff;border:1px solid #d3e3ec;border-radius:26px;box-shadow:0 16px 40px rgba(22,65,91,.12);overflow:hidden}
        .missing-header{padding:26px clamp(22px,4vw,46px);background:linear-gradient(135deg,#082c49,#0a6894);color:#fff}
        .missing-header-grid{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center}.missing-header h1{font-size:clamp(2.2rem,5vw,4.4rem);line-height:1;margin:8px 0 12px}.missing-header p{font-size:1.05rem;line-height:1.55;margin:0;max-width:760px;color:#dceef7}
        .missing-heart{width:98px;height:98px;border-radius:24px;background:rgba(255,255,255,.13);display:grid;place-items:center;font-size:3.2rem;border:1px solid rgba(255,255,255,.22)}
        .missing-meta{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}.missing-meta span{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:8px 12px;font-size:.86rem;font-weight:750}
        .missing-progress{display:grid;grid-template-columns:repeat(6,1fr);gap:7px;padding:17px clamp(18px,3vw,38px);border-bottom:1px solid #dce8ef;background:#f8fbfc}.missing-progress span{padding:8px 6px;border-radius:10px;text-align:center;color:#7890a1;font-size:.74rem;font-weight:850}.missing-progress span.active{background:#dff3fb;color:#087aa7}.missing-progress span.done{background:#e3f5eb;color:#14734c}
        .missing-body{padding:clamp(24px,4vw,46px);max-width:900px;margin:auto}.missing-body h2{font-size:clamp(1.65rem,3vw,2.45rem);line-height:1.15;margin:8px 0 12px;color:#0b2942}.missing-body>p{font-size:1.05rem;line-height:1.65;color:#536c7e}
        .missing-kicker{display:inline-flex;border-radius:999px;background:#e5f4fa;color:#087ba7;padding:7px 11px;font-size:.75rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
        .missing-call{margin:24px 0;background:#f4f8fa;border:1px solid #d5e4ec;border-radius:20px;padding:22px}.missing-call strong{display:block;color:#0b3858;margin-bottom:9px}.missing-call blockquote{margin:0;color:#244a63;font-size:1.08rem;line-height:1.6}
        .missing-clues{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:22px 0}.missing-clue{border:1px solid #d7e4eb;border-radius:18px;padding:18px;background:#f8fbfc}.missing-clue.good{border-top:5px solid #1a9363}.missing-clue.bad{border-top:5px solid #cf3d4b}.missing-clue span{display:block;color:#6e8595;font-size:.77rem;font-weight:850;text-transform:uppercase;letter-spacing:.06em}.missing-clue strong{display:block;margin-top:7px;color:#153c57;font-size:1.15rem}
        .missing-choice{display:block;width:100%;text-align:left;border:1px solid #cbdde7;background:#fff;color:#173d57;border-radius:15px;padding:15px 17px;margin:10px 0;font-weight:780;cursor:pointer;transition:.16s}.missing-choice:hover{border-color:#1493bf;transform:translateY(-1px)}.missing-choice.correct{border-color:#23845b;background:#eaf8f0;color:#12603f}.missing-choice.wrong{border-color:#c44350;background:#fff0f1;color:#932e39}
        .missing-feedback{margin-top:16px;border-radius:15px;padding:15px 17px;background:#fff1f2;border:1px solid #ecc7cc;color:#8c3039;line-height:1.5;font-weight:700}
        .missing-primary{border:0;border-radius:14px;background:linear-gradient(135deg,#078fc6,#075887);color:#fff;padding:14px 22px;font-weight:900;cursor:pointer;box-shadow:0 8px 18px rgba(7,104,153,.22)}
        .missing-monitor{margin:22px 0;border-radius:22px;background:#071b25;border:8px solid #263c46;padding:18px;color:#d6f8e7}.missing-monitor-top{display:flex;justify-content:space-between;color:#9bc8d7;font-size:.78rem;font-weight:800}.missing-wave{height:90px;display:flex;align-items:center;justify-content:center;font-size:2.4rem;letter-spacing:.08em;color:#5ee393;border-bottom:1px solid #31505b}.missing-wave.missing{color:#e85b66}.missing-readings{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding-top:14px}.missing-readings span{display:block;font-size:.73rem;color:#92b5c0}.missing-readings strong{font-size:1.2rem}
        .missing-teach{margin:20px 0;border-left:5px solid #1695c1;background:#eef9fd;border-radius:14px;padding:17px 19px;color:#234b63;line-height:1.55}.missing-teach strong{color:#087aa7}
        .missing-success{text-align:center}.missing-success-icon{width:88px;height:88px;border-radius:50%;display:grid;place-items:center;margin:0 auto 16px;background:#dff5e8;color:#14734c;font-size:2.8rem;font-weight:950}.missing-report{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:22px 0;text-align:left}.missing-report div{background:#f5f9fb;border:1px solid #d8e6ed;border-radius:15px;padding:16px}.missing-report span{display:block;color:#6e8595;font-size:.75rem;font-weight:850;text-transform:uppercase}.missing-report strong{display:block;margin-top:6px;color:#173d57;line-height:1.4}
        .missing-consequence{margin:20px 0;text-align:left;border-radius:18px;padding:20px;background:#fff7e7;border:1px solid #ead39d}.missing-consequence h3{margin:0 0 9px;color:#74520c}.missing-consequence p{margin:7px 0;color:#654f24}
        .missing-pearl{margin:20px 0;border-radius:20px;padding:22px;text-align:left;background:linear-gradient(135deg,#0a3858,#087da9);color:#fff}.missing-pearl span{display:block;font-size:.74rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:#bceaff}.missing-pearl strong{display:block;font-size:1.3rem;line-height:1.45;margin-top:8px}
        .missing-achievement{display:grid;grid-template-columns:auto 1fr auto;gap:15px;align-items:center;border:1px solid #dcc67c;background:#fffaf0;border-radius:18px;padding:18px;text-align:left;margin:20px 0}.missing-achievement b{font-size:2rem}.missing-achievement span{display:block;color:#856c24;font-size:.73rem;font-weight:900;text-transform:uppercase}.missing-achievement strong{display:block;color:#59430d;font-size:1.15rem}.missing-xp{font-size:1.2rem!important;color:#14734c!important}
        .missing-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}.missing-secondary{border:1px solid #bcd2df;background:#fff;color:#164764;border-radius:14px;padding:13px 20px;font-weight:850;cursor:pointer}
        @media(max-width:760px){.missing-header-grid{grid-template-columns:1fr}.missing-heart{display:none}.missing-progress{grid-template-columns:repeat(3,1fr)}.missing-clues,.missing-readings,.missing-report{grid-template-columns:1fr}.missing-achievement{grid-template-columns:auto 1fr}.missing-achievement .missing-xp{grid-column:1/-1}}
      `}</style>

      <div className="missing-topbar">
        <button type="button" className="missing-back" onClick={onExit}>← Service Calls</button>
        <span className="missing-brand">Summit University Medical Center</span>
      </div>

      <article className="missing-card">
        <header className="missing-header">
          <div className="missing-header-grid">
            <div>
              <span className="missing-brand" style={{ color: "#bceaff" }}>Interactive Service Call</span>
              <h1>Missing Beat</h1>
              <p>A bedside monitor has lost its ECG waveform while the other monitored parameters remain available.</p>
              <div className="missing-meta"><span>Emergency Department • Room 12</span><span>Guardian Bedside Monitor</span><span>Beginner • 6–8 minutes</span></div>
            </div>
            <div className="missing-heart" aria-hidden="true">♥</div>
          </div>
        </header>

        <div className="missing-progress">
          {phases.map((label, index) => <span key={label} className={index < phaseIndex ? "done" : index === phaseIndex ? "active" : ""}>{index < phaseIndex ? "✓ " : ""}{label}</span>)}
        </div>

        <main className="missing-body">
          {phase === "dispatch" && <>
            <span className="missing-kicker">Incoming Service Call</span>
            <h2>Emergency Department needs Clinical Engineering.</h2>
            <div className="missing-call"><strong>Nurse report</strong><blockquote>“The patient is awake and talking, but the ECG waveform disappeared. Pulse ox still reads 82 and blood pressure is working. Is the monitor broken?”</blockquote></div>
            <button type="button" className="missing-primary" onClick={() => setPhase("priority")}>Accept Service Call</button>
          </>}

          {phase === "priority" && <>
            <span className="missing-kicker">Step 1 • Prioritize</span><h2>Before touching the monitor, what comes first?</h2>
            <Choice id="replace" correct={false} next="assess">Replace the bedside monitor immediately</Choice>
            <Choice id="stable" correct={true} next="assess">Verify the patient is stable and monitoring needs are covered</Choice>
            <Choice id="restart" correct={false} next="assess">Restart the monitor</Choice>
            <Choice id="disconnect" correct={false} next="assess">Disconnect every patient cable</Choice>
            {choice && choice !== "stable" && <div className="missing-feedback">The equipment matters, but the patient and continuity of monitoring come first. Review the choices.</div>}
          </>}

          {phase === "assess" && <>
            <span className="missing-kicker">Step 2 • Assess the Evidence</span><h2>What does the available information suggest?</h2>
            <div className="missing-clues"><div className="missing-clue bad"><span>ECG</span><strong>No waveform</strong></div><div className="missing-clue good"><span>SpO₂</span><strong>82 bpm • good pleth</strong></div><div className="missing-clue good"><span>NIBP</span><strong>118/74 mmHg</strong></div></div>
            <Choice id="whole" correct={false} next="inspect">The entire monitor has failed</Choice>
            <Choice id="single" correct={true} next="inspect">Only the ECG signal path appears affected</Choice>
            <Choice id="network" correct={false} next="inspect">The hospital network has failed</Choice>
            <Choice id="power" correct={false} next="inspect">The monitor has lost power</Choice>
            {choice && choice !== "single" && <div className="missing-feedback">Two other monitoring functions are still operating. Use that evidence to narrow the problem.</div>}
          </>}

          {phase === "inspect" && <>
            <span className="missing-kicker">Step 3 • Inspect</span><h2>Where should you look first?</h2>
            <div className="missing-monitor"><div className="missing-monitor-top"><span>GUARDIAN MONITOR</span><span>ED 12</span></div><div className="missing-wave missing">────────────</div><div className="missing-readings"><div><span>ECG</span><strong>LEADS OFF</strong></div><div><span>SpO₂</span><strong>98% • 82</strong></div><div><span>NIBP</span><strong>118/74</strong></div></div></div>
            <Choice id="leads" correct={true} next="cable">Inspect the ECG electrodes, lead placement, and connections</Choice>
            <Choice id="housing" correct={false} next="cable">Open the monitor housing</Choice>
            <Choice id="manufacturer" correct={false} next="cable">Call the manufacturer</Choice>
            <Choice id="battery" correct={false} next="cable">Replace the monitor battery</Choice>
            {choice && choice !== "leads" && <div className="missing-feedback">Start with the external signal path before assuming an internal equipment failure.</div>}
          </>}

          {phase === "cable" && <>
            <span className="missing-kicker">Step 4 • Isolate the Fault</span><h2>You replace a loose chest electrode, but the ECG is still missing. What next?</h2>
            <div className="missing-teach"><strong>New evidence:</strong> Electrode contact is now secure. The monitor still displays a lead-off condition.</div>
            <Choice id="known" correct={true} next="root">Substitute a compatible known-good ECG lead set</Choice>
            <Choice id="entire" correct={false} next="root">Replace the entire monitor</Choice>
            <Choice id="ignore" correct={false} next="root">Ignore ECG because SpO₂ is working</Choice>
            <Choice id="software" correct={false} next="root">Reinstall the monitor software</Choice>
            {choice && choice !== "known" && <div className="missing-feedback">Change one likely variable at a time. The external ECG pathway has not yet been fully isolated.</div>}
          </>}

          {phase === "root" && <>
            <span className="missing-kicker">Step 5 • Identify Root Cause</span><h2>The waveform returns immediately with the known-good lead set. What failed?</h2>
            <div className="missing-monitor"><div className="missing-monitor-top"><span>GUARDIAN MONITOR</span><span>ECG RESTORED</span></div><div className="missing-wave">─╲╱─╲╱╲───╲╱─</div><div className="missing-readings"><div><span>ECG</span><strong>82 bpm</strong></div><div><span>SpO₂</span><strong>98% • 82</strong></div><div><span>NIBP</span><strong>118/74</strong></div></div></div>
            <Choice id="leadset" correct={true} next="complete">The original ECG lead set</Choice>
            <Choice id="monitor" correct={false} next="complete">The bedside monitor</Choice>
            <Choice id="network2" correct={false} next="complete">The hospital network</Choice>
            <Choice id="power2" correct={false} next="complete">The monitor power supply</Choice>
            {choice && choice !== "leadset" && <div className="missing-feedback">The monitor displayed ECG normally after only the lead set changed. Follow the evidence.</div>}
          </>}

          {phase === "complete" && <div className="missing-success">
            <div className="missing-success-icon">✓</div><span className="missing-kicker">Service Call Complete</span><h2>ECG monitoring restored.</h2><p>The Guardian monitor was functioning correctly. The original ECG lead set was faulty and was replaced.</p>
            <div className="missing-report"><div><span>Complaint</span><strong>No ECG waveform</strong></div><div><span>Root cause</span><strong>Failed ECG lead set</strong></div><div><span>Corrective action</span><strong>Replaced lead set and restored waveform</strong></div><div><span>Verification</span><strong>ECG, lead-off detection, and alarms verified</strong></div></div>
            <div className="missing-consequence"><h3>What would have happened?</h3><p>Replacing the entire monitor first would have removed a working device.</p><p>If the faulty lead set moved with the patient, the replacement monitor could show the same problem.</p><p>Nursing would wait longer while the actual fault remained unresolved.</p></div>
            <div className="missing-pearl"><span>Clinical Pearl</span><strong>When one parameter fails but others remain normal, isolate that parameter’s external signal path before replacing the monitor.</strong></div>
            <div className="missing-achievement"><b>🏅</b><div><span>Achievement Unlocked</span><strong>Accessory Detective</strong></div><strong className="missing-xp">+150 XP</strong></div>
            <div className="missing-call" style={{ textAlign: "left" }}><strong>Next Service Call Unlocked</strong><blockquote><b>Pressure Lost</b><br/>The blood pressure cuff inflates, but never completes a reading.</blockquote></div>
            <div className="missing-actions"><button type="button" className="missing-primary" onClick={onExit}>Return to Service Calls</button><button type="button" className="missing-secondary" onClick={() => { setChoice(""); setAttempts(0); setPhase("dispatch"); }}>Replay Call</button></div>
          </div>}
        </main>
      </article>
    </section>
  );
}


function getCbetCareerRank(xp = 0) {
  if (xp >= 15000) return "CBET Master";
  if (xp >= 10000) return "CBET Candidate";
  if (xp >= 6000) return "Senior Clinical Engineer";
  if (xp >= 3000) return "Clinical Engineer";
  if (xp >= 1500) return "Biomedical Technician";
  if (xp >= 500) return "Electronics Apprentice";
  return "Biomedical Rookie";
}

const SERVICE_CALL_PROGRESSION = [
  "WO-1001",
  "WO-1048",
  "WO-1052",
  "WO-1092",
  "WO-1099",
  "WO-1061",
  "WO-1073",
  "WO-1080",
  "WO-1105",
  "WO-1112",
];

function findNextServiceCall(completedCalls, completedId) {
  const completedSet = new Set(completedCalls);
  const completedIndex = SERVICE_CALL_PROGRESSION.indexOf(completedId);
  const orderedIds = [
    ...SERVICE_CALL_PROGRESSION.slice(completedIndex + 1),
    ...SERVICE_CALL_PROGRESSION.slice(0, completedIndex + 1),
  ];
  return orderedIds.find((id) => !completedSet.has(id)) || completedId;
}

export default function CBETAcademy() {
  const markServiceCallComplete = (serviceCallId) => {
    try {
      const current = JSON.parse(window.localStorage.getItem("cbetCompletedServiceCalls") || "[]");
      const completed = Array.isArray(current) ? current : [];
      const updatedCompleted = completed.includes(serviceCallId)
        ? completed
        : [...completed, serviceCallId];
      window.localStorage.setItem("cbetCompletedServiceCalls", JSON.stringify(updatedCompleted));

      const nextServiceCallId = findNextServiceCall(updatedCompleted, serviceCallId);
      window.localStorage.setItem("cbetActiveServiceCall", nextServiceCallId);
      window.localStorage.removeItem("cbetActiveWorkOrder");
    } catch {
      // Completion tracking is optional when storage is unavailable.
    }
    setRefresh((value) => value + 1);
  };
  const [screen, setScreen] = useState("dashboard");
  const [refresh, setRefresh] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [showAllMissions, setShowAllMissions] = useState(true);
  const [reviewMissionNumber, setReviewMissionNumber] = useState(null);
  const [certificateTarget, setCertificateTarget] = useState(null);
  const [streak, setStreak] = useState(() => registerCbetVisit());
  const academy = getCbetAcademyState();
  const progress = cbetCompletionPercent();
  const stats = getCbetStats();
  const virtualLabState = loadCourseState();
  const virtualLabLessonsCompleted = Array.isArray(virtualLabState.completedLessons)
    ? virtualLabState.completedLessons.length
    : 0;

  function openMission(number, review = false) {
    if (review) {
      beginMissionReview(number);
      setReviewMissionNumber(number);
    } else {
      setReviewMissionNumber(null);
    }
    setScreen(`mission${number}`);
    setRefresh((value) => value + 1);
  }

  function leaveMission() {
    setReviewMissionNumber(null);
    setScreen("dashboard");
    setRefresh((value) => value + 1);
  }

  useEffect(() => {
    setStreak(registerCbetVisit());
  }, [refresh]);

  useEffect(() => {
    const targetId =
      screen === "dashboard"
        ? "cbet-academy-top"
        : screen === "hospital"
        ? "cbet-hospital-map"
        : screen === "serviceCall1048"
        ? "service-call-top"
        : screen === "serviceCall1052"
        ? "guided-troubleshooting-top"
        : screen.startsWith("serviceCall:")
        ? "expanded-service-call-top"
        : "";

    if (!targetId) return undefined;

    const moveToTarget = () => scrollToCbetTrainingTarget(targetId);
    moveToTarget();

    const timers = [20, 80, 180, 350, 700, 1100].map((delay) =>
      window.setTimeout(moveToTarget, delay)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [screen]);


  if (screen === "hospital") {
    return (
      <>
        <CBETHospitalDashboard
          xp={academy.xp}
          progress={progress}
          badges={Object.values(academy.modules || {}).filter((module) => module.complete).length}
          streak={streak.current || 1}
          onOpenTraining={() => setScreen("dashboard")}
          onOpenLab={() => setScreen("virtualLab")}
          onOpenMission={(orderId) => {
            if (orderId === "WO-1048") setScreen("serviceCall1048");
            else if (orderId === "WO-1052") setScreen("serviceCall1052");
            else setScreen(`serviceCall:${orderId}`);
          }}
          onOpenStats={() => setShowStats(true)}
        />
        {showStats && <StatsPanel stats={stats} onClose={() => setShowStats(false)} />}
      </>
    );
  }

  if (screen === "serviceCall1048") {
    return (
      <GuardianEcgServiceCall
        onExit={() => {
          setScreen("hospital");
          setRefresh((value) => value + 1);
        }}
        onOpenTraining={() => setScreen("dashboard")}
        onComplete={() => markServiceCallComplete("WO-1048")}
      />
    );
  }

  if (screen === "serviceCall1052") {
    return (
      <GuardianNibpServiceCall
        onExit={() => {
          setScreen("hospital");
          setRefresh((value) => value + 1);
        }}
        onComplete={() => markServiceCallComplete("WO-1052")}
      />
    );
  }

  if (screen.startsWith("serviceCall:")) {
    const scenarioId = screen.split(":")[1];
    const scenario = EXPANDED_SERVICE_SCENARIOS[scenarioId];
    if (scenario) {
      return (
        <ExpandedServiceCall
          scenario={scenario}
          onExit={() => { setScreen("hospital"); setRefresh((value) => value + 1); }}
          onComplete={() => markServiceCallComplete(scenarioId)}
        />
      );
    }
  }

  if (screen === "mission1") {
    return (
      <main className="cbet-academy">
        {reviewMissionNumber === 1 && (
          <div className="cbet-review-banner" role="status">
            <strong>Review Mode</strong>
            <span>Your completion, XP, competencies, and unlocks are safely preserved.</span>
          </div>
        )}
        <MissionOne
          onBack={leaveMission}
          onComplete={() => setRefresh((v) => v + 1)}
          onContinueMission2={() => openMission(2, false)}
        />
      </main>
    );
  }

  if (screen === "mission2") {
    return (
      <main className="cbet-academy">
        {reviewMissionNumber === 2 && (
          <div className="cbet-review-banner" role="status">
            <strong>Review Mode</strong>
            <span>Your completion, XP, competencies, and unlocks are safely preserved.</span>
          </div>
        )}
        <MissionTwo
          onExit={leaveMission}
          onContinueMission3={() => openMission(3, false)}
        />
      </main>
    );
  }

  if (screen === "mission3") {
    return (
      <main className="cbet-academy">
        {reviewMissionNumber === 3 && (
          <div className="cbet-review-banner" role="status">
            <strong>Review Mode</strong>
            <span>Your completion, XP, competencies, and unlocks are safely preserved.</span>
          </div>
        )}
        <MissionThree onExit={leaveMission} />
      </main>
    );
  }

  if (screen === "equipmentLearning") {
    return (
      <EquipmentLearningScreen
        onExit={() => setScreen("dashboard")}
        onCertificates={(certificateKey) => {
          setCertificateTarget(certificateKey || null);
          setScreen("certificates");
        }}
      />
    );
  }

  if (screen === "virtualLab") {
    return (
      <VirtualCBETLab
        onExit={() => setScreen("dashboard")}
      />
    );
  }

  if (screen === "certificates") {
    const certificateModules = cbetAcademyModules.map((module) => ({
      ...module,
      complete: Boolean(getCbetModuleState(module.number).complete),
    }));
    return (
      <CertificateCenter
        modules={certificateModules}
        targetCertificateKey={certificateTarget}
        onTargetHandled={() => setCertificateTarget(null)}
        onExit={() => { setCertificateTarget(null); setScreen("dashboard"); }}
      />
    );
  }

  const missionStates = [1, 2, 3].map((number) => getCbetModuleState(number));
  const completedMissionCount = missionStates.filter((mission) => mission.complete).length;

  const nextMissionScreen = !missionStates[0].complete
    ? "mission1"
    : !missionStates[1].complete
    ? "mission2"
    : "mission3";

  const nextMissionNumber = nextMissionScreen === "mission1" ? 1 : nextMissionScreen === "mission2" ? 2 : 3;
  const nextMission = cbetAcademyModules.find((module) => module.number === nextMissionNumber);
  const nextMissionProgress = getMissionProgress(nextMissionNumber);
  const nextMissionStarted = nextMissionProgress.phase !== "briefing";
  const nextMissionLabel = missionStates.every((mission) => mission.complete)
    ? "Review Mission 3"
    : nextMissionStarted
    ? `Continue Mission ${nextMissionNumber}`
    : `Start Mission ${nextMissionNumber}`;

  const badgeCount = Object.values(academy.modules || {}).filter((module) => module.complete).length;
  const virtualLabPercent = Math.min(100, Math.round((virtualLabLessonsCompleted / 9) * 100));
  const missionPercent = Math.min(100, Math.round((completedMissionCount / 3) * 100));

  return (
    <main className="cbet-academy" key={refresh}>
      <section id="cbet-academy-top" className="cbet-dashboard-hero cbet-dashboard-hero-v1">
        <div className="cbet-shell">
          <div className="cbet-dashboard-intro">
            <div className="cbet-dashboard-copy">
              <span className="cbet-label">MedSkillBuilder Academy</span>
              <h1>CBET Academy</h1>
              <p>
                Build your electronics knowledge, practice on the virtual bench, and apply it to realistic hospital service calls.
              </p>
              <div className="cbet-dashboard-continue">
                <button className="cbet-primary cbet-continue-button" onClick={() => openMission(nextMissionNumber, missionStates.every((mission) => mission.complete))}>
                  <span>{nextMissionLabel}</span>
                  <small>{nextMission?.title || "Training Mission"}</small>
                </button>
                <button className="cbet-hero-secondary" onClick={() => setScreen("virtualLab")}>
                  Open Virtual Lab
                </button>
              </div>
            </div>

            <aside className="cbet-overview-card" aria-label="Academy progress overview">
              <div className="cbet-overview-heading">
                <span>Current rank</span>
                <strong>{getCbetCareerRank(academy.xp)}</strong>
              </div>
              <div className="cbet-overview-xp">
                <span>{academy.xp.toLocaleString()} XP</span>
                <span>{progress}% complete</span>
              </div>
              <div className="cbet-progress-bar large" aria-label={`${progress}% academy completion`}>
                <span style={{ width: `${progress}%` }} />
              </div>
              <div className="cbet-overview-metrics">
                <div><strong>{completedMissionCount}/3</strong><span>Missions</span></div>
                <div><strong>{virtualLabLessonsCompleted}/9</strong><span>Lab lessons</span></div>
                <div><strong>{badgeCount}</strong><span>Competencies</span></div>
                <div><strong>{streak.current || 1}</strong><span>Day streak</span></div>
              </div>
              <button className="cbet-overview-link" onClick={() => setShowStats(true)}>View full progress →</button>
            </aside>
          </div>
        </div>
      </section>

      <section className="cbet-shell cbet-dashboard cbet-dashboard-v1">
        <div className="cbet-section-heading cbet-dashboard-heading">
          <span className="cbet-label">Choose your next step</span>
          <h2>Everything you need, in one place</h2>
          <p>Learn the concepts, practice the skills, then use them on the job.</p>
        </div>

        <div className="cbet-hub-grid">
          <article className="cbet-hub-card featured">
            <div className="cbet-hub-card-top">
              <span className="cbet-hub-icon" aria-hidden="true">📘</span>
              <span className="cbet-hub-kicker">Learn</span>
            </div>
            <h3>Training Missions</h3>
            <p>Guided instruction, interactive activities, and knowledge checks organized into a clear path.</p>
            <div className="cbet-card-progress-row"><span>{completedMissionCount} of 3 complete</span><strong>{missionPercent}%</strong></div>
            <div className="cbet-card-progress"><span style={{ width: `${missionPercent}%` }} /></div>
            <button className="cbet-primary" onClick={() => openMission(nextMissionNumber, missionStates.every((mission) => mission.complete))}>{nextMissionLabel}</button>
          </article>

          <article className="cbet-hub-card">
            <div className="cbet-hub-card-top">
              <span className="cbet-hub-icon" aria-hidden="true">🧪</span>
              <span className="cbet-hub-kicker">Practice</span>
            </div>
            <h3>Virtual Lab</h3>
            <p>Practice meter setup, circuit measurements, and troubleshooting on an interactive electronics bench.</p>
            <div className="cbet-card-progress-row"><span>{virtualLabLessonsCompleted} of 9 lessons</span><strong>{virtualLabPercent}%</strong></div>
            <div className="cbet-card-progress"><span style={{ width: `${virtualLabPercent}%` }} /></div>
            <button className="cbet-secondary" onClick={() => setScreen("virtualLab")}>Open Virtual Lab</button>
          </article>

          <article className="cbet-hub-card">
            <div className="cbet-hub-card-top">
              <span className="cbet-hub-icon" aria-hidden="true">🩺</span>
              <span className="cbet-hub-kicker">Explore</span>
            </div>
            <h3>Equipment Learning Center</h3>
            <p>Understand clinical purpose, operating principles, major components, reported symptoms, and BMET reasoning. Preventive maintenance is discussed conceptually, but no PM procedures are simulated.</p>
            <div className="cbet-hub-summary"><strong>8</strong><span>equipment families</span></div>
            <button className="cbet-secondary" onClick={() => setScreen("equipmentLearning")}>Explore Equipment</button>
          </article>

          <article className="cbet-hub-card">
            <div className="cbet-hub-card-top">
              <span className="cbet-hub-icon" aria-hidden="true">🏥</span>
              <span className="cbet-hub-kicker">Work</span>
            </div>
            <h3>Hospital Simulator</h3>
            <p>Complete realistic service calls, isolate faults, document repairs, and return equipment to service.</p>
            <div className="cbet-hub-summary"><strong>{stats.scenariosCompleted}</strong><span>scenarios completed</span></div>
            <button className="cbet-secondary" onClick={() => setScreen("hospital")}>Enter Hospital</button>
          </article>

          <article className="cbet-hub-card">
            <div className="cbet-hub-card-top">
              <span className="cbet-hub-icon" aria-hidden="true">📊</span>
              <span className="cbet-hub-kicker">Progress</span>
            </div>
            <h3>Your Progress</h3>
            <p>Review XP, completed lessons, professional competencies, scores, and your learning streak.</p>
            <div className="cbet-hub-summary"><strong>{academy.xp.toLocaleString()}</strong><span>total XP earned</span></div>
            <button className="cbet-secondary" onClick={() => setShowStats(true)}>View Statistics</button>
          </article>

          <article className="cbet-hub-card">
            <div className="cbet-hub-card-top">
              <span className="cbet-hub-icon" aria-hidden="true">📜</span>
              <span className="cbet-hub-kicker">Recognize</span>
            </div>
            <h3>Certificates of Completion</h3>
            <p>View educational completion certificates for finished Academy modules. These are not CBET certifications or professional credentials.</p>
            <div className="cbet-hub-summary"><strong>{badgeCount}</strong><span>module certificates available</span></div>
            <button className="cbet-secondary" onClick={() => setScreen("certificates")}>Open Certificate Center</button>
          </article>
        </div>

        <div className="cbet-mission-toggle-row">
          <div>
            <span className="cbet-label">Training path</span>
            <h2>Three missions available now</h2>
          </div>
          <button
            className="cbet-secondary"
            aria-expanded={showAllMissions}
            aria-controls="cbet-training-path"
            onClick={() => setShowAllMissions((value) => !value)}
          >
            {showAllMissions ? "Hide Missions" : "View All Missions"}
          </button>
        </div>

        {showAllMissions && (
          <div id="cbet-training-path" className="cbet-grid cbet-training-grid">
            {cbetAcademyModules.map((module) => {
              const state = getCbetModuleState(module.number);
              const unlocked = module.number <= 3 ? true : isCbetModuleUnlocked(module.number);
              const available = module.number <= 3;
              return (
                <article key={module.number} className={`cbet-module-card ${!unlocked ? "locked" : ""}`}>
                  <div className="cbet-card-top">
                    <span className="cbet-number">{module.number}</span>
                    <span className={`cbet-status ${state.complete ? "complete" : unlocked ? "ready" : "locked"}`}>
                      {state.complete ? "✓ Complete" : unlocked ? (available ? "Ready" : "Coming next") : "🔒 Locked"}
                    </span>
                  </div>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                  <div className="cbet-badge"><span aria-hidden="true">✓</span> Professional Competency: {module.badge}</div>
                  <div className="cbet-card-footer">
                    <span>{module.xp} XP</span>
                    {available ? (
                      <button className="cbet-primary" disabled={!unlocked} onClick={() => openMission(module.number, state.complete)}>
                        {state.complete ? "Review Mission" : getMissionProgress(module.number).phase !== "briefing" ? "Continue Mission" : "Start Mission"}
                      </button>
                    ) : (
                      <button className="cbet-secondary" disabled>{unlocked ? "Coming Soon" : "Locked"}</button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
      {showStats && <StatsPanel stats={stats} onClose={() => setShowStats(false)} />}
    </main>
  );
}
