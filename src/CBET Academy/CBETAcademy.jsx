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
          <button type="button" className="msb-call-primary" onClick={() => { onComplete?.(); onExit(); }}>Return to Service Calls</button>
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
  return <GuidedTroubleshootingEngine scenario={SERVICE_CALL_SCENARIOS["WO-1052"]} onExit={onExit} onComplete={onComplete} />;
}


function GuardianEcgServiceCall({ onExit, onOpenTraining, onComplete }) {
  const [stage, setStage] = useState("briefing");
  const [patientTransferred, setPatientTransferred] = useState(false);
  const [deviceRemoved, setDeviceRemoved] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [simulatorConnected, setSimulatorConnected] = useState(false);
  const [knownGoodCableInstalled, setKnownGoodCableInstalled] = useState(false);
  const [originalCableRemoved, setOriginalCableRemoved] = useState(false);
  const [meterMode, setMeterMode] = useState("continuity");
  const [probeStep, setProbeStep] = useState(0);
  const [tests, setTests] = useState({
    visual: false,
    simulatorOriginal: false,
    simulatorKnownGood: false,
    continuity: false,
  });
  const [diagnosis, setDiagnosis] = useState(null);
  const [repairComplete, setRepairComplete] = useState(false);
  const [alarmVerified, setAlarmVerified] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [xpAwarded, setXpAwarded] = useState(false);
  const [log, setLog] = useState([
    "06:42 — Service call WO-1048 dispatched to Clinical Engineering.",
  ]);
  const [openGuideStep, setOpenGuideStep] = useState(1);
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  const questions = useMemo(
    () =>
      [
        {
          question: "Before removing a bedside monitor from clinical use, what is the first priority?",
          options: [
            "Confirm the patient is safely supported by alternate monitoring",
            "Open the monitor enclosure",
            "Measure cable resistance",
            "Clear the alarm history",
          ],
          answer: 0,
          explanation:
            "Patient care comes first. The clinical team must transfer the patient to appropriate alternate monitoring before the device is removed for service.",
        },
        {
          question: "Why should the patient simulator be connected through the original ECG cable first?",
          options: [
            "To test the complete signal path before substituting parts",
            "To charge the monitor battery",
            "To verify NIBP pressure",
            "To test electrical leakage current",
          ],
          answer: 0,
          explanation:
            "Testing through the original accessories preserves the reported configuration and helps determine whether the fault is in the cable, connector, or monitor input.",
        },
        {
          question: "The monitor displays ECG with a known-good cable. What has been isolated?",
          options: [
            "The original ECG lead set is defective",
            "The monitor display is defective",
            "The SpO₂ module is defective",
            "The AC power supply is defective",
          ],
          answer: 0,
          explanation:
            "A normal waveform with the same simulator and monitor, after changing only the cable, isolates the failure to the original cable assembly.",
        },
        {
          question: "When is continuity testing of the removed ECG cable appropriate?",
          options: [
            "After it is disconnected from the patient and monitor",
            "While connected to the patient",
            "While the monitor is delivering a defibrillation pulse",
            "Only while the cable is wet",
          ],
          answer: 0,
          explanation:
            "A resistance or continuity measurement should be performed only on an isolated cable, disconnected from the patient and powered equipment.",
        },
        {
          question: "What belongs in the final service record?",
          options: [
            "Complaint, safety actions, tests, findings, repair, and verification",
            "Only the replacement part number",
            "Only the final waveform",
            "Only the technician's initials",
          ],
          answer: 0,
          explanation:
            "A defensible service record documents the reported issue, patient-safety precautions, diagnostic evidence, corrective action, and final performance verification.",
        },
      ].map(shuffleQuestion),
    []
  );

  const currentQuestion = questions[questionIndex];
  const selectedAnswer = answers[questionIndex];
  const debriefComplete = Object.keys(answers).length === questions.length;
  const score = questions.reduce(
    (total, question, index) => total + (answers[index] === question.answer ? 1 : 0),
    0
  );
  const waveformVisible = simulatorConnected && knownGoodCableInstalled;
  const originalPathTested = tests.simulatorOriginal;
  const enoughEvidence = tests.simulatorOriginal && tests.simulatorKnownGood && tests.continuity;

  const workflowSteps = [
    { id: 1, label: "Confirm alternate monitoring", complete: patientTransferred },
    { id: 2, label: "Remove from clinical service", complete: deviceRemoved },
    { id: 3, label: "Inspect ECG signal path", complete: tests.visual },
    { id: 4, label: "Connect ECG patient simulator", complete: simulatorConnected },
    { id: 5, label: "Reproduce reported complaint", complete: tests.simulatorOriginal },
    { id: 6, label: "Install known-good ECG lead set", complete: tests.simulatorKnownGood },
    { id: 7, label: "Verify cable continuity", complete: tests.continuity },
    { id: 8, label: "Document root cause", complete: diagnosis === "cable" || ["repair", "debrief"].includes(stage) || debriefComplete },
    { id: 9, label: "Repair and verify performance", complete: repairComplete && alarmVerified },
    { id: 10, label: "Complete service call", complete: debriefComplete },
  ];

  const roomStep =
    !patientTransferred ? 1 :
    !deviceRemoved ? 2 :
    !tests.visual ? 3 :
    !simulatorConnected ? 4 :
    !tests.simulatorOriginal ? 5 :
    !tests.simulatorKnownGood ? 6 :
    !tests.continuity ? 7 : 8;

  const activeStep =
    stage === "room" ? roomStep :
    stage === "diagnosis" ? 8 :
    stage === "repair" ? 9 :
    stage === "debrief" ? 10 : 1;

  const guideContent = {
    1: {
      title: "Confirm alternate monitoring",
      message: "Before touching the monitor, make sure the patient is safely supported by another approved monitoring method.",
      action: "Ask the nurse to transfer the patient.",
      target: "handoff",
    },
    2: {
      title: "Remove the device from clinical use",
      message: "Label the device out of service and move it to a safe test location before connecting test equipment.",
      action: "Remove and label the monitor.",
      target: "handoff",
    },
    3: {
      title: "Begin with a visual inspection",
      message: "Inspect the ECG connector, cable jacket, strain relief, and obvious signs of damage before changing the setup.",
      action: "Inspect the cable and connector.",
      target: "monitor",
    },
    4: {
      title: "Connect a known test source",
      message: "Use the patient simulator to apply a controlled ECG signal while preserving the original cable path.",
      action: "Select the BioSim patient simulator.",
      target: "simulator",
    },
    5: {
      title: "Reproduce the complaint",
      message: "Apply the simulated ECG through the original lead set before substituting any parts.",
      action: "Run the ECG through the original cable.",
      target: "simulator",
    },
    6: {
      title: "Perform a substitution test",
      message: "Change only one item. Install a known-good ECG lead set while keeping the simulator and monitor unchanged.",
      action: "Select the known-good ECG lead set.",
      target: "cable",
    },
    7: {
      title: "Confirm the cable fault",
      message: "Isolate the removed cable, select continuity mode, and test each conductor to locate the open circuit.",
      action: "Use the digital multimeter.",
      target: "multimeter",
    },
    8: {
      title: "Document the diagnosis",
      message: "Use the evidence from the original-path test, substitution test, and continuity test to identify the failed component.",
      action: "Continue to diagnosis.",
      target: "evidence",
    },
    9: {
      title: "Repair and verify performance",
      message: "Install the replacement lead set, then verify ECG response, lead-off detection, and alarm operation.",
      action: "Complete all functional checks.",
      target: "repair",
    },
    10: {
      title: "Complete the service call",
      message: "Complete the after-action review and document the complaint, findings, corrective action, and final verification.",
      action: "Finish the review.",
      target: "documentation",
    },
  };

  const currentGuide = guideContent[activeStep];

  function GuidedWorkflow({ compact = false }) {
    return (
      <aside className={`service-call-guide ${compact ? "compact" : ""}`}>
        <div className="service-call-guide-header">
          <div>
            <span className="service-call-eyebrow">Guided Workflow</span>
            <h2>Step {activeStep} of 10</h2>
          </div>
          <strong>{Math.round((workflowSteps.filter((step) => step.complete).length / workflowSteps.length) * 100)}%</strong>
        </div>

        <div className="service-call-step-track" aria-label="Service call progress">
          {workflowSteps.map((step) => {
            const locked = step.id > activeStep && !step.complete;
            return (
              <button
                type="button"
                key={step.id}
                className={`service-call-step ${
                  step.complete ? "complete" : step.id === activeStep ? "active" : ""
                } ${locked ? "locked" : ""}`}
                onClick={() => setOpenGuideStep(step.id)}
                aria-label={`Open step ${step.id}: ${step.label}`}
              >
                <span>{step.complete ? "✓" : step.id}</span>
                <small>{step.label}</small>
              </button>
            );
          })}
        </div>

        <div className="service-call-next-action">
          <span>Next action</span>
          <h3>{currentGuide.title}</h3>
          <p>{currentGuide.message}</p>
          <button
            type="button"
            className="service-call-open-step"
            onClick={() => setOpenGuideStep(activeStep)}
          >
            Open Step {activeStep}
          </button>
        </div>
      </aside>
    );
  }

  function completeCurrentGuideAction(stepId) {
    if (stepId === 1) acknowledgeHandoff();
    else if (stepId === 2) removeDeviceFromService();
    else if (stepId === 3) inspectConnections();
    else if (stepId === 4) {
      setSelectedTool("simulator");
      connectSimulator();
    } else if (stepId === 5) {
      setSelectedTool("simulator");
      testOriginalCable();
    } else if (stepId === 6) {
      setSelectedTool("cable");
      installKnownGoodCable();
    } else if (stepId === 7) {
      setSelectedTool("multimeter");
    } else if (stepId === 8) {
      setOpenGuideStep(null);
      window.requestAnimationFrame(() => setStage("diagnosis"));
      return;
    } else if (stepId === 9) {
      setOpenGuideStep(null);
      window.requestAnimationFrame(() => setStage("repair"));
      return;
    } else if (stepId === 10) {
      setOpenGuideStep(null);
      window.requestAnimationFrame(() => setStage("debrief"));
      return;
    }
  }

  function GuideStepModal() {
    if (!openGuideStep) return null;

    const step = workflowSteps.find((item) => item.id === openGuideStep);
    const content = guideContent[openGuideStep];
    const locked = openGuideStep > activeStep && !step?.complete;
    const isCurrent = openGuideStep === activeStep;
    const isComplete = Boolean(step?.complete);

    return (
      <div
        className="service-call-modal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-call-modal-title"
        onClick={() => setOpenGuideStep(null)}
      >
        <article className="service-call-step-modal" onClick={(event) => event.stopPropagation()}>
          <button
            type="button"
            className="service-call-modal-close"
            onClick={() => setOpenGuideStep(null)}
            aria-label="Close step instructions"
          >
            ×
          </button>

          <div className={`service-call-modal-step-number ${isComplete ? "complete" : ""}`}>
            {isComplete ? "✓" : openGuideStep}
          </div>

          <span className="service-call-eyebrow">
            {isComplete ? "Step Complete" : locked ? "Locked Step" : `Step ${openGuideStep} of 10`}
          </span>
          <h2 id="service-call-modal-title">{content.title}</h2>

          {isComplete ? (
            <div className="service-call-modal-status success">
              <strong>{step.label} completed</strong>
              <p>This action has been recorded in the service activity log.</p>
            </div>
          ) : locked ? (
            <div className="service-call-modal-status locked">
              <strong>Complete Step {activeStep} first</strong>
              <p>{guideContent[activeStep].action}</p>
            </div>
          ) : (
            <>
              <p className="service-call-modal-message">{content.message}</p>
              <div className="service-call-modal-instructions">
                <strong>What to do</strong>
                <p>{content.action}</p>
              </div>

              {openGuideStep === 7 && (
                <div className="service-call-modal-status">
                  <strong>Multimeter sequence</strong>
                  <p>Select continuity mode, then test RA, LA, and LL conductors in order.</p>
                </div>
              )}
            </>
          )}

          <div className="service-call-modal-actions">
            <button
              type="button"
              className="service-call-secondary"
              onClick={() => setOpenGuideStep(null)}
            >
              Close
            </button>

            {isCurrent && !isComplete && !locked && (
              <button
                type="button"
                className="service-call-primary"
                onClick={() => {
                  const selectedStep = openGuideStep;
                  completeCurrentGuideAction(selectedStep);

                  if (![8, 9, 10].includes(selectedStep)) {
                    setOpenGuideStep(null);
                  }
                }}
              >
                {content.action}
              </button>
            )}
          </div>
        </article>
      </div>
    );
  }


  function addLog(message) {
    setLog((previous) => [...previous, `${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} — ${message}`]);
  }

  function acknowledgeHandoff() {
    setPatientTransferred(true);
    addLog("Charge nurse confirmed patient transferred to alternate monitoring.");
    playCbetTone("correct");
  }

  function removeDeviceFromService() {
    if (!patientTransferred) return;
    setDeviceRemoved(true);
    addLog("Monitor labeled out of service and moved to a safe test location.");
    playCbetTone("correct");
  }

  function inspectConnections() {
    setTests((previous) => ({ ...previous, visual: true }));
    addLog("Visual inspection completed: ECG connector seated, no visible fluid intrusion, cable strain relief worn.");
    playCbetTone("correct");
  }

  function connectSimulator() {
    if (!deviceRemoved) return;
    setSimulatorConnected(true);
    addLog("BioSim patient simulator connected at 80 bpm, 1 mV ECG output.");
    playCbetTone("correct");
  }

  function testOriginalCable() {
    if (!simulatorConnected || knownGoodCableInstalled) return;
    setTests((previous) => ({ ...previous, simulatorOriginal: true }));
    addLog("No ECG waveform obtained through original lead set.");
    playCbetTone("wrong");
  }

  function installKnownGoodCable() {
    if (!simulatorConnected) return;
    setKnownGoodCableInstalled(true);
    setOriginalCableRemoved(true);
    setTests((previous) => ({ ...previous, simulatorKnownGood: true }));
    addLog("Known-good ECG lead set installed; waveform restored at 80 bpm.");
    playCbetTone("correct");
  }

  function advanceProbe() {
    if (!originalCableRemoved || meterMode !== "continuity") return;
    const next = Math.min(3, probeStep + 1);
    setProbeStep(next);
    if (next === 3) {
      setTests((previous) => ({ ...previous, continuity: true }));
      addLog("Continuity test found an open conductor in the Lead II path.");
      playCbetTone("correct");
    }
  }

  useEffect(() => {
    if (stage === "room") {
      setOpenGuideStep(activeStep);
    }
  }, [stage, activeStep]);

  useEffect(() => {
    // Open every service-call phase at its heading.
    const resetStageScroll = () => {
      const assignment = document.getElementById("service-call-top");

      if (assignment) {
        assignment.scrollIntoView({
          behavior: "auto",
          block: "start",
          inline: "nearest",
        });
        window.scrollBy({ top: -18, left: 0, behavior: "auto" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }

      const mainPane = document.querySelector(".service-call-workstation-main");
      const sidePane = document.querySelector(".service-call-workstation-sidebar");
      if (mainPane) mainPane.scrollTop = 0;
      if (sidePane) sidePane.scrollTop = 0;
    };

    resetStageScroll();
    const timers = [0, 50, 140].map((delay) =>
      window.setTimeout(resetStageScroll, delay)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [stage]);

  useEffect(() => {
    if (!debriefComplete || !repairComplete || !alarmVerified || xpAwarded) return;
    awardCbetXp(180, "hospital-work-order-1048");
    setXpAwarded(true);
    if (onComplete) onComplete();
    playCbetTone("correct");
  }, [debriefComplete, repairComplete, alarmVerified, xpAwarded, onComplete]);

  if (stage === "briefing") {
    return (
      <main className="service-call">
        <section className="service-call-shell" id="service-call-top">
          <button className="service-call-back" onClick={onExit}>← Service Calls</button>
          <article className="service-call-briefing">
            <div className="service-call-priority">STAT</div>
            <span className="service-call-eyebrow">Clinical Engineering Dispatch</span>
            <h1>Service Call #048</h1>
            <div className="service-call-brief-grid">
              <div><span>Department</span><strong>Emergency Department • Bay 8</strong></div>
              <div><span>Equipment</span><strong>Guardian Bedside Monitor</strong></div>
              <div><span>Reason for service</span><strong>ECG waveform lost during monitoring</strong></div>
              <div><span>Current status</span><strong>SpO₂ and NIBP remain available</strong></div>
            </div>
            <div className="service-call-note">
              <span>Nurse handoff</span>
              <p>“The ECG dropped out suddenly. The patient is stable, but we need continuous cardiac monitoring.”</p>
            </div>
            <div className="service-call-safety">
              <strong>Before touching the equipment</strong>
              <p>Confirm the patient is placed on alternate monitoring. Do not remove or test clinical equipment while it is still supporting patient care.</p>
            </div>
            <div className="service-call-actions">
              <button className="service-call-secondary" onClick={onExit}>Return to Queue</button>
              <button className="service-call-primary" onClick={() => setStage("room")}>Accept Assignment</button>
            </div>
          </article>
        </section>
      </main>
    );
  }

  if (stage === "room") {
    return (
      <main className="service-call">
        <section className="service-call-shell" id="service-call-top">
          <button className="service-call-back" onClick={onExit}>← Service Calls</button>
          <div className="service-call-stage-heading">
            <span className="service-call-eyebrow">Emergency Department • Bay 8</span>
            <h1>Stabilize the clinical situation before troubleshooting.</h1>
          </div>

          <div className="service-call-workstation">
            <aside className="service-call-workstation-sidebar">
              <GuidedWorkflow />

              <div className={`service-call-handoff ${activeStep <= 2 ? "guided-highlight" : "guided-dim"}`}>
            <div>
              <span className="service-call-eyebrow">Clinical handoff</span>
              <h2>Patient monitoring status</h2>
              <p>The bedside monitor is still connected to the patient. The nurse is waiting for your direction.</p>
            </div>
            <div className="service-call-handoff-actions">
              <button
                className={patientTransferred ? "complete" : ""}
                onClick={acknowledgeHandoff}
              >
                {patientTransferred ? "✓ Alternate monitoring confirmed" : "Ask nurse to transfer patient to alternate monitoring"}
              </button>
              <button
                disabled={!patientTransferred}
                className={deviceRemoved ? "complete" : ""}
                onClick={removeDeviceFromService}
              >
                {deviceRemoved ? "✓ Device removed from service" : "Label and remove device from clinical use"}
              </button>
            </div>
              </div>
            </aside>

            <div className="service-call-workstation-main">
              <div className="service-call-room-grid">
            <article className={`guardian-monitor ${deviceRemoved ? "bench-mode" : ""} ${currentGuide.target === "monitor" ? "guided-highlight" : ""}`}>
              <div className="guardian-monitor-top">
                <strong>Guardian Bedside Monitor</strong>
                <span>{deviceRemoved ? "SERVICE MODE" : "PATIENT CONNECTED"}</span>
              </div>
              <div className="guardian-monitor-screen">
                <div className="guardian-ecg">
                  <span>ECG II</span>
                  <strong>{waveformVisible ? "80" : "— —"}</strong>
                  <div className={waveformVisible ? "service-call-waveform" : "guardian-flatline"} />
                  <small>{waveformVisible ? "SIMULATED SIGNAL" : "ECG LEADS OFF / NO SIGNAL"}</small>
                </div>
                <div className="guardian-vitals">
                  <div><span>SpO₂</span><strong>{deviceRemoved ? "—" : "98"}</strong><small>%</small></div>
                  <div><span>NIBP</span><strong>{deviceRemoved ? "—/—" : "121/79"}</strong><small>mmHg</small></div>
                  <div><span>Pulse</span><strong>{waveformVisible ? "80" : deviceRemoved ? "—" : "74"}</strong><small>bpm</small></div>
                </div>
              </div>
              <div className="guardian-monitor-controls">
                <button
                  disabled={!deviceRemoved}
                  onClick={inspectConnections}
                  className={tests.visual ? "complete" : ""}
                >
                  {tests.visual ? "✓ Visual inspection documented" : "Inspect connector, cable, and strain relief"}
                </button>
              </div>
            </article>

            <aside className="service-call-toolbox">
              <span className="service-call-eyebrow">Technician Toolbox</span>
              <h2>Select a diagnostic tool</h2>
              <p>Use tools in a logical order. Preserve the reported configuration before substituting parts.</p>

              <div className="service-call-tools">
                {[
                  ["simulator", "🫀", "BioSim patient simulator"],
                  ["cable", "🔌", "Known-good ECG lead set"],
                  ["multimeter", "🔧", "Digital multimeter"],
                ].map(([id, icon, label]) => (
                  <button
                    key={id}
                    disabled={!deviceRemoved}
                    className={`${selectedTool === id ? "active" : ""} ${
                      currentGuide.target === id ? "recommended guided-highlight" : ""
                    }`}
                    onClick={() => setSelectedTool(id)}
                  >
                    <span>{icon}</span>
                    <strong>{label}</strong>
                    <small>{selectedTool === id ? "Selected" : "Available"}</small>
                  </button>
                ))}
              </div>

              {selectedTool === "simulator" && (
                <div className="service-call-tool-action">
                  <strong>BioSim patient simulator</strong>
                  <p>Output: normal sinus rhythm, 80 bpm, 1 mV amplitude.</p>
                  <div className="service-call-cable-diagram">
                    <span className={simulatorConnected ? "connected" : ""}>SIMULATOR</span>
                    <i className={simulatorConnected ? "connected" : ""} />
                    <span className={simulatorConnected ? "connected" : ""}>
                      {knownGoodCableInstalled ? "KNOWN-GOOD CABLE" : "ORIGINAL ECG CABLE"}
                    </span>
                    <i className={simulatorConnected ? "connected" : ""} />
                    <span className={simulatorConnected ? "connected" : ""}>MONITOR</span>
                  </div>
                  {!simulatorConnected ? (
                    <button className="service-call-primary" onClick={connectSimulator}>Connect ECG patient simulator</button>
                  ) : !originalPathTested ? (
                    <button className="service-call-primary" onClick={testOriginalCable}>Reproduce reported complaint</button>
                  ) : (
                    <div className="service-call-result warning">No waveform through the original cable path.</div>
                  )}
                </div>
              )}

              {selectedTool === "cable" && (
                <div className="service-call-tool-action">
                  <strong>Known-good ECG lead set</strong>
                  <p>Substitute only after documenting the original configuration.</p>
                  <button
                    className="service-call-primary"
                    disabled={!tests.simulatorOriginal}
                    onClick={installKnownGoodCable}
                  >
                    Install known-good ECG lead set
                  </button>
                  {knownGoodCableInstalled && (
                    <div className="service-call-result success">ECG restored at 80 bpm. Monitor input is responding normally.</div>
                  )}
                </div>
              )}

              {selectedTool === "multimeter" && (
                <div className="service-call-tool-action">
                  <strong>Digital multimeter</strong>
                  <p>Use only on the removed cable, isolated from the patient and monitor.</p>
                  <div className="service-call-dmm">
                    <div className="service-call-dmm-display">
                      {!originalCableRemoved
                        ? "DISCONNECT CABLE"
                        : meterMode !== "continuity"
                        ? "WRONG MODE"
                        : probeStep < 3
                        ? "0.3 Ω"
                        : "OL"}
                    </div>
                    <div className="service-call-dmm-modes">
                      {["voltage", "continuity", "resistance"].map((mode) => (
                        <button
                          key={mode}
                          className={meterMode === mode ? "active" : ""}
                          onClick={() => setMeterMode(mode)}
                        >
                          {mode === "voltage" ? "V" : mode === "continuity" ? "🔔" : "Ω"}
                        </button>
                      ))}
                    </div>
                    <div className="service-call-probe-board">
                      <span className={probeStep >= 1 ? "tested" : ""}>RA</span>
                      <span className={probeStep >= 2 ? "tested" : ""}>LA</span>
                      <span className={probeStep >= 3 ? "open" : ""}>LL / Lead II</span>
                    </div>
                  </div>
                  <button
                    className="service-call-primary"
                    disabled={!originalCableRemoved || meterMode !== "continuity" || probeStep >= 3}
                    onClick={advanceProbe}
                  >
                    {probeStep === 0 ? "Test RA conductor" : probeStep === 1 ? "Test LA conductor" : "Test LL conductor"}
                  </button>
                  {tests.continuity && (
                    <div className="service-call-result warning">Open circuit found in the LL conductor used for Lead II.</div>
                  )}
                </div>
              )}
            </aside>
          </div>

          <article className={`service-call-evidence-compact ${currentGuide.target === "evidence" ? "guided-highlight" : ""}`}>
            <button
              type="button"
              className="service-call-evidence-summary"
              onClick={() => setEvidenceOpen((value) => !value)}
              aria-expanded={evidenceOpen}
            >
              <div>
                <span>Diagnostic Evidence</span>
                <strong>{Object.values(tests).filter(Boolean).length} of 4 findings recorded</strong>
              </div>
              <div className="service-call-current-task">
                <span>Current task</span>
                <strong>{currentGuide.title}</strong>
              </div>
              <span className="service-call-evidence-toggle">{evidenceOpen ? "Hide" : "View"}</span>
            </button>

            {evidenceOpen && (
              <div className="service-call-evidence-expanded">
                <ul>
                  <li className={patientTransferred ? "done" : ""}>Alternate monitoring confirmed</li>
                  <li className={deviceRemoved ? "done" : ""}>Device removed from service</li>
                  <li className={tests.visual ? "done" : ""}>Visual inspection</li>
                  <li className={tests.simulatorOriginal ? "done" : ""}>Original signal path tested</li>
                  <li className={tests.simulatorKnownGood ? "done" : ""}>Known-good cable verified</li>
                  <li className={tests.continuity ? "done" : ""}>Continuity fault located</li>
                </ul>
                <button
                  type="button"
                  className="service-call-primary"
                  disabled={!enoughEvidence}
                  onClick={() => setStage("diagnosis")}
                >
                  Document Root Cause
                </button>
              </div>
            )}
          </article>

              <details className="service-call-log">
                <summary>
                  <span className="service-call-eyebrow">Service Activity Log</span>
                  <strong>{log.length} entries</strong>
                </summary>
                <div className="service-call-log-entries">
                  {log.map((entry, index) => <p key={`${entry}-${index}`}>{entry}</p>)}
                </div>
              </details>
            </div>
          </div>
          <GuideStepModal />
        </section>
      </main>
    );
  }

  if (stage === "diagnosis") {
    const choices = [
      ["monitor", "Replace the complete bedside monitor"],
      ["cable", "Original ECG lead set has an open conductor"],
      ["module", "SpO₂ module failure"],
      ["configuration", "Incorrect NIBP configuration"],
    ];

    return (
      <main className="service-call">
        <section className="service-call-shell narrow" id="service-call-top">
          <button className="service-call-back" onClick={() => setStage("room")}>← Return to test bench</button>
          <GuidedWorkflow compact />
          <article className="service-call-card guided-highlight">
            <span className="service-call-eyebrow">Fault Isolation</span>
            <h1>Select the diagnosis supported by the evidence.</h1>
            <div className="service-call-diagnostic-summary">
              <p>Simulator through original cable: <strong>No ECG waveform</strong></p>
              <p>Simulator through known-good cable: <strong>Normal 80 bpm waveform</strong></p>
              {tests.continuity && <p>Original cable continuity: <strong>LL conductor open</strong></p>}
            </div>
            <div className="service-call-diagnosis-options">
              {choices.map(([id, label]) => (
                <button
                  key={id}
                  className={diagnosis === id ? (id === "cable" ? "correct" : "wrong") : ""}
                  onClick={() => {
                    setDiagnosis(id);
                    playCbetTone(id === "cable" ? "correct" : "wrong");
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            {diagnosis && diagnosis !== "cable" && (
              <div className="service-call-result warning">
                This choice does not fit the substitution test. The same monitor and simulator worked when only the cable changed.
              </div>
            )}
            {diagnosis === "cable" && (
              <>
                <div className="service-call-result success">
                  Fault isolated to the original ECG lead set. Replace the accessory and perform a full functional verification.
                </div>
                <button className="service-call-primary full" onClick={() => setStage("repair")}>
                  Continue to Corrective Action
                </button>
              </>
            )}
          </article>
          <GuideStepModal />
        </section>
      </main>
    );
  }

  if (stage === "repair") {
    return (
      <main className="service-call">
        <section className="service-call-shell narrow" id="service-call-top">
          <button className="service-call-back" onClick={() => setStage("diagnosis")}>← Diagnosis</button>
          <GuidedWorkflow compact />
          <article className="service-call-card guided-highlight">
            <span className="service-call-eyebrow">Corrective Action and Verification</span>
            <h1>Replace the failed lead set and verify performance.</h1>

            <div className={`service-call-repair-monitor ${repairComplete ? "repaired" : ""}`}>
              <span>ECG II</span>
              <strong>{repairComplete ? "80" : "—"}</strong>
              <div className={repairComplete ? "service-call-waveform" : "guardian-flatline"} />
              <small>{repairComplete ? "NORMAL SINUS RHYTHM • 1 mV SIMULATOR INPUT" : "NO SIGNAL"}</small>
            </div>

            {!repairComplete ? (
              <button
                className="service-call-primary full"
                onClick={() => {
                  setRepairComplete(true);
                  addLog("Replacement ECG lead set installed and waveform verified.");
                  playCbetTone("correct");
                }}
              >
                Install Replacement Lead Set
              </button>
            ) : (
              <>
                <div className="service-call-verification-list">
                  <label><input type="checkbox" checked readOnly /> ECG waveform and heart rate verified</label>
                  <label><input type="checkbox" checked readOnly /> Lead-off detection verified</label>
                  <label>
                    <input
                      type="checkbox"
                      checked={alarmVerified}
                      onChange={(event) => {
                        setAlarmVerified(event.target.checked);
                        if (event.target.checked) addLog("ECG high/low alarm response verified.");
                      }}
                    />
                    High and low heart-rate alarms verified
                  </label>
                </div>

                <button
                  className="service-call-primary full"
                  disabled={!alarmVerified}
                  onClick={() => setStage("debrief")}
                >
                  Close Technical Work and Begin Review
                </button>
              </>
            )}
          </article>
          <GuideStepModal />
        </section>
      </main>
    );
  }

  if (stage === "debrief" && !debriefComplete) {
    return (
      <main className="service-call">
        <section className="service-call-shell narrow" id="service-call-top">
          <GuidedWorkflow compact />
          <article className="service-call-card guided-highlight">
            <div className="service-call-question-meta">
              <span className="service-call-eyebrow">After-Action Review</span>
              <strong>{questionIndex + 1} of {questions.length}</strong>
            </div>
            <h1>{currentQuestion.question}</h1>
            <div className="service-call-answer-grid">
              {currentQuestion.options.map((option, index) => {
                const answered = selectedAnswer !== undefined;
                const className = answered
                  ? index === currentQuestion.answer
                    ? "correct"
                    : index === selectedAnswer
                    ? "wrong"
                    : ""
                  : "";
                return (
                  <button
                    key={option}
                    className={className}
                    disabled={answered}
                    onClick={() => {
                      setAnswers((previous) => ({ ...previous, [questionIndex]: index }));
                      playCbetTone(index === currentQuestion.answer ? "correct" : "wrong");
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {selectedAnswer !== undefined && (
              <div className={`service-call-result ${selectedAnswer === currentQuestion.answer ? "success" : "warning"}`}>
                <strong>{selectedAnswer === currentQuestion.answer ? "Correct." : "Review this point."}</strong>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}
            <button
              className="service-call-primary full"
              disabled={selectedAnswer === undefined}
              onClick={() => setQuestionIndex((index) => Math.min(index + 1, questions.length - 1))}
            >
              {questionIndex === questions.length - 1 ? "Complete Service Call" : "Next Question"}
            </button>
          </article>
          <GuideStepModal />
        </section>
      </main>
    );
  }

  return (
    <main className="service-call">
      <section className="service-call-shell narrow" id="service-call-top">
        <article className="service-call-complete">
          <div className="service-call-complete-icon">✓</div>
          <span className="service-call-eyebrow">Service Call Complete</span>
          <h1>Guardian monitor returned to clinical service.</h1>
          <div className="service-call-complete-grid">
            <div><span>Failure</span><strong>Open conductor in ECG lead set</strong></div>
            <div><span>Corrective action</span><strong>Lead set replaced</strong></div>
            <div><span>Verification</span><strong>ECG, lead-off, and alarms passed</strong></div>
            <div><span>Review score</span><strong>{score} of {questions.length}</strong></div>
            <div><span>Disposition</span><strong>Returned to service</strong></div>
            <div className="service-call-competencies">
              <span>Competencies Demonstrated</span>
              <ul>
                <li>✅ Patient Safety</li>
                <li>✅ Visual Inspection</li>
                <li>✅ Signal Tracing</li>
                <li>✅ Evidence-Based Troubleshooting</li>
              </ul>
              <small>+180 Learning Points</small>
            </div>
          </div>
          <div className="service-call-learning-summary">
            <h3>What You Practiced</h3>
            <p>
              You safely removed a monitor from service, reproduced the complaint,
              isolated the failure using a known-good lead set, confirmed the diagnosis
              with continuity testing, and verified proper operation before returning
              the monitor to clinical service.
            </p>
          </div>
          <div className="service-call-report">
            <strong>Final service note</strong>
            <p>
              Confirmed patient transfer to alternate monitoring and removed the device from clinical use.
              Reproduced loss of ECG using an 80 bpm, 1 mV simulated signal through the original lead set.
              Substituted a known-good lead set and restored ECG. Continuity testing identified an open LL
              conductor in the original accessory. Replaced the lead set and verified waveform display,
              lead-off detection, heart-rate calculation, and high/low alarm response.
            </p>
          </div>
          <div className="service-call-actions">
            <button className="service-call-secondary" onClick={onOpenTraining}>Review Related Training</button>
            <button className="service-call-primary" onClick={onExit}>Return to Service Calls</button>
          </div>
        </article>
      </section>
    </main>
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
  "WO-1061",
  "WO-1073",
  "WO-1080",
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
