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
  missionFourBriefing,
  missionFourLessons,
  missionFourQuestions,
  missionFourScenarios,
  missionSevenBriefing,
  missionSevenLessons,
  missionSevenQuestions,
  missionSevenScenarios,
  missionEightBriefing,
  missionEightLessons,
  missionEightQuestions,
  missionEightScenarios,
  missionTenBriefing,
  missionTenLessons,
  missionTenQuestions,
  missionTenScenarios,
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

function isLocalAcademyHost() {
  if (typeof window === "undefined") return false;
  return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
}

function LocalDeveloperPanel({ unlockAll, onToggle }) {
  if (!isLocalAcademyHost()) return null;
  return (
    <aside className="cbet-local-dev-panel" aria-label="Local Academy developer tools">
      <div>
        <strong>⚙ Local Developer Mode</strong>
        <span>{unlockAll ? "All available missions and lessons are unlocked for testing." : "Normal learner unlock rules are active."}</span>
      </div>
      <button type="button" className={unlockAll ? "active" : ""} onClick={onToggle}>
        {unlockAll ? "Unlock All: ON" : "Unlock All: OFF"}
      </button>
    </aside>
  );
}

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
            <button className="cbet-secondary" onClick={onBack}>Back to Academy</button>
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
  const hasSavedQuizScore = Number.isFinite(savedProgress.quizScore);
  const restoredQuizIndex = savedProgress.phase === "quiz" && !hasSavedQuizScore ? 0 : (savedProgress.quizIndex || 0);
  const [questionIndex, setQuestionIndexState] = useState(restoredQuizIndex);
  const completedModule = getCbetModuleState(2) || { complete: false, bestScore: 0 };
  const [answers, setAnswers] = useState({});
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [missedQuestions, setMissedQuestions] = useState({});
  const [score, setScore] = useState(hasSavedQuizScore ? savedProgress.quizScore : 0);
  const [finished, setFinished] = useState(savedProgress.phase === "complete" && completedModule.complete);
  const [finalResult, setFinalResult] = useState(() => {
    if (savedProgress.phase === "complete" && completedModule.complete) {
      return { correct: Math.round((completedModule.bestScore / 100) * questions.length), percent: completedModule.bestScore };
    }
    if (savedProgress.phase === "result" && Number.isFinite(savedProgress.finalPercent)) {
      return { correct: Number.isFinite(savedProgress.quizScore) ? savedProgress.quizScore : 0, percent: savedProgress.finalPercent };
    }
    return null;
  });
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
    if (!missedQuestions[questionIndex]) {
      const nextScore = score + 1;
      setScore(nextScore);
      saveMissionProgress(2, { phase: "quiz", quizIndex: questionIndex, quizScore: nextScore });
    } else {
      saveMissionProgress(2, { phase: "quiz", quizIndex: questionIndex, quizScore: score });
    }
  }

  function nextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      // The running score is persisted after every first-try correct answer,
      // so it remains accurate even when a learner resumes mid-challenge.
      const finalCorrect = score;

      const finalScore = Math.round(
        (finalCorrect / questions.length) * 100
      );

      setFinalResult({
        correct: finalCorrect,
        percent: finalScore,
      });

      const wasComplete = getCbetModuleState(2).complete;
      completeCbetModule(2, finalScore, 300);

      if (finalScore >= 80 && !wasComplete) {
        setShowBadgeUnlock(true);
        setXpToast({ amount: 300, label: "Mission 2 complete" });
      }

      setFinished(finalScore >= 80);
      if (finalScore >= 80) {
        saveMissionProgress(2, { phase: "complete", quizScore: finalCorrect, finalPercent: finalScore, passed: true });
        setPhaseState("complete");
      } else {
        saveMissionProgress(2, { phase: "result", quizScore: finalCorrect, finalPercent: finalScore, passed: false });
        setPhaseState("result");
      }
      scrollCbetPageToTop();
    }
  }

  function restartQuiz() {
    setQuestionIndexState(0);
    setAnswers({});
    setScore(0);
    setFinished(false);
    setFinalResult(null);
    saveMissionProgress(2, { phase: "quiz", quizIndex: 0, quizScore: 0, finalPercent: null, passed: false });
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
        <button className="cbet-back" onClick={onExit}>← Save & Exit</button>
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
        <button className="cbet-back" onClick={onExit}>← Save & Exit</button>
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
        <button className="cbet-back" onClick={onExit}>← Save & Exit</button>
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
      <button className="cbet-back" onClick={onExit}>← Save & Exit</button>
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
          <button className="cbet-secondary" onClick={onExit}>Back to Academy</button>
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
  const hasSavedQuizScore = Number.isFinite(savedProgress.quizScore);
  const restoredQuizIndex = savedProgress.phase === "quiz" && !hasSavedQuizScore ? 0 : (savedProgress.quizIndex || 0);
  const [questionIndex, setQuestionIndexState] = useState(restoredQuizIndex);
  const completedModule = getCbetModuleState(3) || { complete: false, bestScore: 0 };
  const [answers, setAnswers] = useState({});
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [missedQuestions, setMissedQuestions] = useState({});
  const [score, setScore] = useState(hasSavedQuizScore ? savedProgress.quizScore : 0);
  const [finalResult, setFinalResult] = useState(() => {
    if (savedProgress.phase === "complete" && completedModule.complete) {
      return { correct: Math.round((completedModule.bestScore / 100) * questions.length), percent: completedModule.bestScore };
    }
    if (savedProgress.phase === "result" && Number.isFinite(savedProgress.finalPercent)) {
      return { correct: Number.isFinite(savedProgress.quizScore) ? savedProgress.quizScore : 0, percent: savedProgress.finalPercent };
    }
    return null;
  });
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
      const nextIndex = questionIndex + 1;
      setQuestionIndexState(nextIndex);
      saveMissionProgress(3, { phase: "quiz", quizIndex: nextIndex, quizScore: score });
      return;
    }

    // score is persisted after each answered question, so it remains reliable after Save & Exit.
    const finalCorrect = score;
    const finalScore = Math.round((finalCorrect / questions.length) * 100);

    setFinalResult({ correct: finalCorrect, percent: finalScore });
    if (finalScore >= 80) {
      completeCbetModule(3, finalScore, 350);
      saveMissionProgress(3, { phase: "complete", quizScore: finalCorrect, finalPercent: finalScore, passed: true });
      setPhaseState("complete");
    } else {
      saveMissionProgress(3, { phase: "result", quizScore: finalCorrect, finalPercent: finalScore, passed: false });
      setPhaseState("result");
    }
  }

  function restartQuiz() {
    setQuestionIndexState(0);
    setAnswers({});
    setWrongAnswers({});
    setMissedQuestions({});
    setScore(0);
    setFinalResult(null);
    saveMissionProgress(3, { phase: "quiz", quizIndex: 0, quizScore: 0, passed: false });
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
        <button className="cbet-back" onClick={onExit}>← Save & Exit</button>
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
        <button className="cbet-back" onClick={onExit}>← Save & Exit</button>
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
        <button className="cbet-back" onClick={onExit}>← Save & Exit</button>
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
        <button className="cbet-back" onClick={onExit}>← Save & Exit</button>
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
      <button className="cbet-back" onClick={onExit}>← Save & Exit</button>
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





const MISSION_FOUR_IMAGES = {
  monitor: "/images/mission4/patient-monitor.svg",
  pump: "/images/mission4/infusion-pump.svg",
  defibrillator: "/images/mission4/defibrillator.svg",
  ventilator: "/images/mission4/ventilator.svg",
  esu: "/images/mission4/electrosurgical-unit.svg",
  anesthesia: "/images/mission4/anesthesia-machine.svg",
  ultrasound: "/images/mission4/ultrasound-system.svg",
  accessories: "/images/mission4/equipment-accessories.svg",
};

const MISSION_FOUR_LESSON_ENHANCEMENTS = {
  0: { image: MISSION_FOUR_IMAGES.monitor, title: "Patient Monitor", purpose: "Combines multiple physiologic measurements into one bedside display.", insight: "When a value does not match the patient, verify the patient, signal source, accessory, and setup before condemning the monitor." },
  1: { image: MISSION_FOUR_IMAGES.pump, title: "Infusion Pump", purpose: "Controls medication or fluid delivery at a programmed rate.", insight: "An alarm is evidence. Read the message, inspect the full fluid path, and reproduce the complaint before replacing equipment." },
  2: { image: MISSION_FOUR_IMAGES.defibrillator, title: "Defibrillator", purpose: "Provides monitored or emergency electrical therapy for selected cardiac rhythms.", insight: "A failed operational check is a patient-safety issue. Remove the unit from use and provide a ready replacement before troubleshooting." },
  3: { image: MISSION_FOUR_IMAGES.ventilator, title: "Ventilator", purpose: "Supports ventilation by delivering controlled breaths, pressures, volumes, and oxygen concentration.", insight: "During a patient-use failure, clinical staff must maintain ventilation while Clinical Engineering evaluates the device away from the immediate patient-care task." },
  4: { image: MISSION_FOUR_IMAGES.esu, title: "Electrosurgical Unit", purpose: "Generates high-frequency electrical energy for cutting or coagulation.", insight: "If activation is heard but the clinical effect is poor, follow the complete energy path: generator, activation control, cable, electrode, patient interface, and return path." },
  5: { image: MISSION_FOUR_IMAGES.anesthesia, title: "Anesthesia Workstation", purpose: "Integrates gas delivery, ventilation, monitoring, vaporization, and scavenging functions.", insight: "Mode-specific symptoms are valuable clues. A failure limited to mechanical ventilation points to a different pathway than a failure present in both manual and ventilator modes." },
  6: { image: MISSION_FOUR_IMAGES.ultrasound, title: "Ultrasound System", purpose: "Creates diagnostic images from transmitted and returning sound waves.", insight: "Image-quality complaints often begin with the transducer, cable, preset, gel, or connection—not the main system." },
  7: { image: MISSION_FOUR_IMAGES.accessories, title: "Accessories and Interfaces", purpose: "Connect the patient and device to the measurement, therapy, power, or communication pathway.", insight: "Accessories are part of the system. A device can pass every internal test and still fail clinically because of a damaged cable, sensor, hose, cuff, or transducer." },
};

function MissionFourImage({ lessonIndex }) {
  const item = MISSION_FOUR_LESSON_ENHANCEMENTS[lessonIndex];
  if (!item) return null;
  return (
    <section className="cbet-mission4-field-card" aria-label={`${item.title} in the field`}>
      <div className="cbet-mission4-field-image"><img src={item.image} alt={`Generic educational illustration of a ${item.title}`} loading="lazy" /></div>
      <div className="cbet-mission4-field-copy">
        <span className="cbet-equipment-eyebrow">In the Field</span>
        <h3>{item.title}</h3>
        <strong>What it does</strong><p>{item.purpose}</p>
        <div className="cbet-mission4-insight"><strong>Kevin's Clinical Engineering Insight</strong><p>{item.insight}</p></div>
      </div>
    </section>
  );
}



const PATIENT_MONITOR_PARAMETERS = [
  { id: "ecg", label: "ECG", color: "#16a34a", text: "Electrical activity of the heart", detail: "Uses skin electrodes, a lead set, and an ECG input pathway. Poor contact, dried electrodes, motion, and damaged lead wires can create artifact." },
  { id: "spo2", label: "SpO₂", color: "#168fe8", text: "Peripheral oxygen saturation", detail: "Uses a pulse-oximetry sensor to estimate oxygen saturation and pulse rate. Motion, low perfusion, sensor placement, and ambient light can affect the signal." },
  { id: "nibp", label: "NIBP", color: "#171717", text: "Non-invasive blood pressure", detail: "Uses an inflatable cuff and hose. Cuff size, placement, leaks, motion, and patient rhythm can affect measurements." },
  { id: "ibp", label: "IBP", color: "#dc2626", text: "Invasive blood pressure", detail: "Uses a pressure transducer and fluid-filled line. Leveling, zeroing, air bubbles, loose connections, and damping change waveform quality." },
  { id: "temp", label: "TEMP", color: "#7c3f12", text: "Body temperature", detail: "Uses a compatible temperature probe. Probe type, placement, connection, and damaged cables can create incorrect or missing readings." },
];

function PatientMonitorGraphic({ activeParameter = "ecg", onSelect, compact = false }) {
  const active = PATIENT_MONITOR_PARAMETERS.find((item) => item.id === activeParameter) || PATIENT_MONITOR_PARAMETERS[0];
  return (
    <div className={`m4-monitor-graphic ${compact ? "compact" : ""}`}>
      <svg viewBox="0 0 760 570" role="img" aria-label="Original generic patient monitor with color-coded physiologic connections">
        <defs>
          <linearGradient id="m4-monitor-shell" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#dce5ec" />
          </linearGradient>
          <linearGradient id="m4-monitor-screen" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#121a20" />
            <stop offset="1" stopColor="#05080a" />
          </linearGradient>
          <filter id="m4-monitor-shadow" x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#0b2d48" floodOpacity=".22" />
          </filter>
        </defs>
        <g filter="url(#m4-monitor-shadow)">
          <path d="M250 92 C250 40 490 40 490 92" fill="none" stroke="#87939d" strokeWidth="30" strokeLinecap="round" />
          <path d="M250 92 C250 54 490 54 490 92" fill="none" stroke="#dfe6eb" strokeWidth="18" strokeLinecap="round" />
          <rect x="150" y="80" width="500" height="420" rx="44" fill="url(#m4-monitor-shell)" stroke="#aebbc5" strokeWidth="4" />
          <rect x="238" y="118" width="365" height="315" rx="18" fill="url(#m4-monitor-screen)" stroke="#293740" strokeWidth="8" />
          <rect x="177" y="118" width="44" height="315" rx="14" fill="#eef3f6" stroke="#b3c0c9" strokeWidth="3" />
          {PATIENT_MONITOR_PARAMETERS.map((item, index) => {
            const y = 155 + index * 59;
            const selected = activeParameter === item.id;
            return (
              <g key={item.id} onClick={() => onSelect?.(item.id)} className="m4-svg-port" style={{ cursor: onSelect ? "pointer" : "default" }}>
                <circle cx="199" cy={y} r={selected ? 18 : 14} fill={item.color} stroke={selected ? "#ffffff" : "#42505a"} strokeWidth={selected ? 5 : 3} />
                <path d={`M30 ${y} C85 ${y}, 110 ${y}, 181 ${y}`} fill="none" stroke={item.color} strokeWidth={selected ? 11 : 8} strokeLinecap="round" opacity={selected ? 1 : .78} />
                <rect x="12" y={y-19} width="72" height="38" rx="8" fill={item.color} />
                <text x="48" y={y+7} textAnchor="middle" fill="#fff" fontWeight="900" fontSize="18">{item.label}</text>
              </g>
            );
          })}
          <g className="m4-wave m4-wave-ecg" stroke="#22c55e"><polyline points="260,165 285,165 295,151 305,184 316,135 328,165 360,165 370,151 380,184 391,135 403,165 445,165 455,151 465,184 476,135 488,165 572,165" /></g>
          <g className="m4-wave m4-wave-spo2" stroke="#2aa8ff"><path d="M260 226 C275 226 278 202 291 202 C305 202 307 226 322 226 C337 226 340 202 353 202 C367 202 370 226 385 226 C400 226 403 202 416 202 C430 202 433 226 448 226 C463 226 466 202 479 202 C493 202 496 226 511 226 C526 226 529 202 542 202 C556 202 559 226 574 226" fill="none" /></g>
          <g className="m4-wave" stroke="#f3f4f6"><path d="M260 286 C280 278 294 294 312 286 C330 278 344 294 362 286 C380 278 394 294 412 286 C430 278 444 294 462 286 C480 278 494 294 512 286 C530 278 544 294 572 286" fill="none" /></g>
          <g className="m4-wave" stroke="#ef4444"><polyline points="260,345 280,345 292,329 305,365 319,315 334,345 366,345 378,329 391,365 405,315 420,345 452,345 464,329 477,365 491,315 506,345 572,345" /></g>
          <g className="m4-wave" stroke="#9a5b25"><path d="M260 402 C325 401 390 403 455 401 C500 401 535 400 572 402" fill="none" /></g>
          <text x="255" y="145" fill="#22c55e" fontSize="17" fontWeight="800">ECG</text><text x="548" y="175" fill="#22c55e" fontSize="37" fontWeight="900">80</text>
          <text x="255" y="207" fill="#2aa8ff" fontSize="17" fontWeight="800">SpO₂</text><text x="535" y="235" fill="#2aa8ff" fontSize="37" fontWeight="900">98%</text>
          <text x="255" y="268" fill="#f3f4f6" fontSize="17" fontWeight="800">NIBP</text><text x="510" y="295" fill="#f3f4f6" fontSize="29" fontWeight="900">120/80</text>
          <text x="255" y="327" fill="#ef4444" fontSize="17" fontWeight="800">IBP</text><text x="510" y="355" fill="#ef4444" fontSize="28" fontWeight="900">118/76</text>
          <text x="255" y="389" fill="#9a5b25" fontSize="17" fontWeight="800">TEMP</text><text x="526" y="416" fill="#b66c2d" fontSize="32" fontWeight="900">37.0</text>
          {[275,330,385,440,495,550].map((x, index) => <rect key={x} x={x} y="456" width="36" height="19" rx="8" fill={index === 5 ? "#f6b51f" : "#cad3d9"} stroke="#83919a" />)}
          <circle cx="600" cy="466" r="25" fill="#59666e" stroke="#26333b" strokeWidth="5" />
        </g>
      </svg>
      {!compact && <div className="m4-monitor-active-caption" style={{ borderColor: active.color }}><strong style={{ color: active.color }}>{active.label}</strong><span>{active.text}</span></div>}
    </div>
  );
}

const PATIENT_MONITOR_ACCESSORIES = [
  { id: "ecg", name: "ECG lead set", description: "Skin electrodes and lead wires carry the heart's electrical signal to the ECG input." },
  { id: "spo2", name: "SpO₂ sensor", description: "An optical sensor estimates oxygen saturation and pulse rate from pulsatile blood flow." },
  { id: "nibp", name: "NIBP cuff and hose", description: "The cuff and pneumatic hose allow the monitor to determine non-invasive blood pressure." },
  { id: "ibp", name: "Pressure transducer", description: "A leveled and zeroed transducer converts fluid-line pressure into an electrical signal." },
  { id: "temp", name: "Temperature probe", description: "A compatible probe measures temperature at the selected clinical site." },
];

function MonitorAccessoryIcon({ type, color }) {
  if (type === "nibp") return <span className="m4-accessory-drawing m4-accessory-cuff" style={{ "--accessory-color": color }}><i /><b /></span>;
  if (type === "spo2") return <span className="m4-accessory-drawing m4-accessory-clip" style={{ "--accessory-color": color }}><i /><b /></span>;
  if (type === "ibp") return <span className="m4-accessory-drawing m4-accessory-transducer" style={{ "--accessory-color": color }}><i /><b /><em /></span>;
  if (type === "temp") return <span className="m4-accessory-drawing m4-accessory-probe" style={{ "--accessory-color": color }}><i /><b /></span>;
  return <span className="m4-accessory-drawing m4-accessory-leads" style={{ "--accessory-color": color }}><i /><b /><em /></span>;
}

const PATIENT_MONITOR_EXPLORER_CHALLENGES = {
  ecg: {
    question: "The ECG rate suddenly reads 180, but the pulse-derived rate remains 78 and the patient is talking. What should you investigate first?",
    options: ["The ECG electrodes and lead set", "The NIBP pump", "The temperature probe", "The monitor battery"],
    answer: 0,
    explanation: "A mismatch between the ECG rate and a pulse-derived rate strongly suggests ECG artifact or a lead/electrode problem. Verify the patient and signal quality before replacing the monitor."
  },
  spo2: {
    question: "The SpO₂ value falls to 74%, but the pleth waveform is nearly flat and the patient's color is unchanged. What is the best first step?",
    options: ["Replace the main monitor", "Check sensor placement, perfusion, and motion", "Increase NIBP frequency", "Zero the IBP transducer"],
    answer: 1,
    explanation: "A weak or absent pleth waveform means the displayed saturation may not be reliable. Check the sensor site, perfusion, movement, and cable path first."
  },
  nibp: {
    question: "The cuff repeatedly inflates and ends with a timeout. Which local issue is most likely?",
    options: ["A leak, kink, wrong cuff size, or poor placement", "An unzeroed IBP transducer", "A dried ECG electrode", "An incompatible temperature probe"],
    answer: 0,
    explanation: "NIBP timeouts commonly result from pneumatic leaks, kinked tubing, incorrect cuff size or placement, motion, or an inability to detect oscillations."
  },
  ibp: {
    question: "An arterial waveform is overdamped after setup. What should be checked before blaming the monitor?",
    options: ["The SpO₂ sensor", "The fluid line, stopcocks, air bubbles, leveling, and zero", "The NIBP cuff", "The ECG filter only"],
    answer: 1,
    explanation: "The complete fluid-filled pressure pathway determines waveform quality. Air, clots, loose connections, stopcock position, leveling, and zeroing should be assessed first."
  },
  temp: {
    question: "The temperature channel shows no reading after a probe is connected. What is the best first technical check?",
    options: ["Confirm probe compatibility, seating, and cable integrity", "Replace the ECG module", "Inflate the NIBP cuff", "Zero the arterial line"],
    answer: 0,
    explanation: "Temperature inputs depend on the correct probe type and a sound connection. Confirm compatibility and the complete probe/cable path before replacing a module."
  }
};

function MissionFourPatientMonitoringLesson({ lesson, selected, setSelected, completeLesson, lessonCount }) {
  const [activeParameter, setActiveParameter] = useState("ecg");
  const [identifyAnswer, setIdentifyAnswer] = useState(null);
  const [explored, setExplored] = useState(() => new Set(["ecg"]));
  const [explorerAnswers, setExplorerAnswers] = useState({});
  const answered = selected !== null;
  const identificationComplete = identifyAnswer === "ibp";
  const explorerComplete = PATIENT_MONITOR_PARAMETERS.every((item) => explorerAnswers[item.id] === PATIENT_MONITOR_EXPLORER_CHALLENGES[item.id].answer);
  const active = PATIENT_MONITOR_PARAMETERS.find((item) => item.id === activeParameter) || PATIENT_MONITOR_PARAMETERS[0];
  const activeChallenge = PATIENT_MONITOR_EXPLORER_CHALLENGES[activeParameter];
  const activeExplorerAnswer = explorerAnswers[activeParameter];
  const activeExplorerAnswered = activeExplorerAnswer !== undefined;
  const activeExplorerCorrect = activeExplorerAnswer === activeChallenge.answer;
  const explorerCorrectCount = PATIENT_MONITOR_PARAMETERS.filter((item) => explorerAnswers[item.id] === PATIENT_MONITOR_EXPLORER_CHALLENGES[item.id].answer).length;

  const chooseParameter = (id) => {
    setActiveParameter(id);
    setExplored((previous) => new Set([...previous, id]));
  };

  const answerExplorer = (index) => {
    setExplorerAnswers((previous) => ({ ...previous, [activeParameter]: index }));
    playCbetTone(index === activeChallenge.answer ? "correct" : "wrong");
  };

  return (
    <div className="m4-premium-lesson">
      <section className="m4-premium-hero">
        <div className="m4-premium-monitor-column"><PatientMonitorGraphic activeParameter={activeParameter} onSelect={chooseParameter} /></div>
        <div className="m4-premium-copy-column">
          <span className="m4-premium-kicker">Lesson 1 of {lessonCount}</span>
          <h1>Patient Monitoring Systems</h1>
          <p className="m4-premium-lead">Learn how patient monitors acquire, process, display, and help clinicians interpret critical physiologic signals.</p>
          <div className="m4-parameter-summary">
            {PATIENT_MONITOR_PARAMETERS.map((item) => <button key={item.id} className={`${activeParameter === item.id ? "active" : ""} ${explorerAnswers[item.id] === PATIENT_MONITOR_EXPLORER_CHALLENGES[item.id].answer ? "mastered" : ""}`} style={{ "--parameter-color": item.color }} onClick={() => chooseParameter(item.id)}><span>{item.label}</span><small>{item.text}</small>{explorerAnswers[item.id] === PATIENT_MONITOR_EXPLORER_CHALLENGES[item.id].answer && <em>✓ Mastered</em>}</button>)}
          </div>
          <aside className="m4-lesson-objectives"><strong>In this lesson</strong><ul><li>Monitor overview</li><li>Signal sources</li><li>Accessories and connections</li><li>Artifacts and accuracy</li><li>Troubleshooting basics</li></ul><span>◷ Estimated time: 15 min</span></aside>
        </div>
      </section>

      <section className="m4-explorer-progress" aria-label="Equipment explorer progress">
        <div><span>Interactive Equipment Explorer</span><strong>{explorerCorrectCount} of {PATIENT_MONITOR_PARAMETERS.length} signal paths mastered</strong></div>
        <div className="m4-explorer-progress-track"><i style={{ width: `${(explorerCorrectCount / PATIENT_MONITOR_PARAMETERS.length) * 100}%` }} /></div>
        <div className="m4-explorer-dots">{PATIENT_MONITOR_PARAMETERS.map((item) => <button key={item.id} onClick={() => chooseParameter(item.id)} className={`${activeParameter === item.id ? "active" : ""} ${explorerAnswers[item.id] === PATIENT_MONITOR_EXPLORER_CHALLENGES[item.id].answer ? "complete" : explored.has(item.id) ? "visited" : ""}`} style={{ "--parameter-color": item.color }} aria-label={`Explore ${item.label}`}><span>{explorerAnswers[item.id] === PATIENT_MONITOR_EXPLORER_CHALLENGES[item.id].answer ? "✓" : item.label}</span></button>)}</div>
      </section>

      <section className="m4-premium-lower-grid">
        <article className="m4-service-call-card">
          <span className="m4-service-call-kicker">🚨 Service Call Scenario</span>
          <p>ICU reports that the monitor is displaying ventricular tachycardia, but the patient is awake and talking. The SpO₂ pulse rate is 78.</p>
          <h2>{lesson.check.question}</h2>
          <div className="m4-service-options">{lesson.check.options.map((option, index) => <button key={option} disabled={answered} className={`${answered && index === lesson.check.answer ? "correct" : ""} ${answered && index === selected && index !== lesson.check.answer ? "wrong" : ""}`} onClick={() => { setSelected(index); playCbetTone(index === lesson.check.answer ? "correct" : "wrong"); }}><strong>{String.fromCharCode(65 + index)}</strong><span>{option}</span></button>)}</div>
          {answered && <div className="m4-service-feedback"><strong>{selected === lesson.check.answer ? "Service call cleared." : "Recheck the evidence."}</strong><span>{lesson.check.explanation}</span></div>}
          <div className="m4-field-tip">💡 <strong>Field Tip:</strong> Compare the ECG rate with a pulse-derived source and the patient's condition before assuming a true critical rhythm.</div>
        </article>

        <article className="m4-exploration-card">
          <span className="m4-exploration-kicker">Interactive Exploration</span><h2>Follow the {active.label} signal path</h2><p>Choose a connector or parameter to reveal what it measures and what can make it fail.</p>
          <div className="m4-exploration-layout"><PatientMonitorGraphic compact activeParameter={activeParameter} onSelect={chooseParameter} /><div className="m4-parameter-detail" style={{ "--parameter-color": active.color }}><span>{active.label}</span><h3>{active.text}</h3><p>{active.detail}</p></div></div>
          <div className="m4-explorer-mini-challenge" style={{ "--parameter-color": active.color }}>
            <div className="m4-explorer-mini-heading"><span>Technician Challenge</span><strong>{active.label}</strong></div>
            <h3>{activeChallenge.question}</h3>
            <div className="m4-explorer-mini-options">{activeChallenge.options.map((option, index) => <button key={option} disabled={activeExplorerCorrect} className={`${activeExplorerAnswered && index === activeChallenge.answer ? "correct" : ""} ${activeExplorerAnswered && index === activeExplorerAnswer && index !== activeChallenge.answer ? "wrong" : ""}`} onClick={() => answerExplorer(index)}><strong>{String.fromCharCode(65 + index)}</strong><span>{option}</span></button>)}</div>
            {activeExplorerAnswered && <div className={`m4-explorer-mini-feedback ${activeExplorerCorrect ? "good" : "bad"}`}><strong>{activeExplorerCorrect ? `${active.label} signal path mastered.` : "Try another troubleshooting path."}</strong><span>{activeExplorerCorrect ? activeChallenge.explanation : "Use the signal source, accessory, and clinical evidence to choose the most direct first check."}</span></div>}
          </div>
        </article>
      </section>

      <section className="m4-accessories-section">
        <div className="m4-section-heading"><span>Accessory Recognition</span><h2>Connect the patient to the correct signal path</h2><p>Select an accessory to highlight its matching monitor parameter.</p></div>
        <div className="m4-accessory-grid">
          {PATIENT_MONITOR_ACCESSORIES.map((accessory) => {
            const parameter = PATIENT_MONITOR_PARAMETERS.find((item) => item.id === accessory.id);
            const isActive = activeParameter === accessory.id;
            return <button key={accessory.id} className={isActive ? "active" : ""} style={{ "--accessory-color": parameter.color }} onClick={() => chooseParameter(accessory.id)}>
              <MonitorAccessoryIcon type={accessory.id} color={parameter.color} />
              <strong>{accessory.name}</strong><span>{accessory.description}</span>
            </button>;
          })}
        </div>
      </section>

      <section className="m4-identify-challenge">
        <div><span className="m4-exploration-kicker">Quick Recognition</span><h2>Which connection is used for invasive blood pressure?</h2><p>Use the standardized colors and signal pathway—not a manufacturer name—to identify the correct port.</p></div>
        <div className="m4-identify-options">
          {PATIENT_MONITOR_PARAMETERS.map((item) => {
            const chosen = identifyAnswer === item.id;
            return <button key={item.id} disabled={identificationComplete} style={{ "--parameter-color": item.color }} className={`${chosen ? "chosen" : ""} ${chosen && item.id === "ibp" ? "correct" : ""} ${chosen && item.id !== "ibp" ? "wrong" : ""}`} onClick={() => { setIdentifyAnswer(item.id); playCbetTone(item.id === "ibp" ? "correct" : "wrong"); }}><i /><strong>{item.label}</strong></button>;
          })}
        </div>
        {identifyAnswer && <div className={`m4-identify-feedback ${identificationComplete ? "good" : "bad"}`}><strong>{identificationComplete ? "Correct — IBP uses the red signal path." : "Not this connection. Try again."}</strong><span>{identificationComplete ? "The invasive pressure transducer connects through the red IBP pathway." : "Use the parameter color standard and select the invasive pressure pathway."}</span></div>}
      </section>

      {explorerComplete && <section className="m4-explorer-complete"><span>🏆</span><div><small>Equipment Explorer Complete</small><h2>Patient Monitoring Signal Paths Mastered</h2><p>You worked through ECG, SpO₂, NIBP, IBP, and temperature using accessories, signal evidence, and troubleshooting logic.</p></div></section>}

      <div className="m4-premium-actions"><span>{answered && identificationComplete && explorerComplete ? "Lesson activities complete" : !answered ? "Complete the service call to continue" : !explorerComplete ? `Master all five signal paths (${explorerCorrectCount}/5 complete)` : "Complete the quick-recognition challenge"}</span><button className="cbet-primary" disabled={!answered || !identificationComplete || !explorerComplete} onClick={completeLesson}>Next: Infusion Delivery Systems →</button></div>
    </div>
  );
}


const INFUSION_PUMP_COMPONENTS = [
  { id: "bag", label: "IV Bag", color: "#2563eb", purpose: "Provides the fluid or medication source above the pump.", issues: "An empty bag, closed clamp, blocked vent, or collapsed container can interrupt flow.", insight: "Trace the entire fluid path before blaming the pump. The problem may begin above the device." },
  { id: "drip", label: "Drip Chamber", color: "#0ea5e9", purpose: "Allows visual confirmation of drops and helps keep air out of the tubing.", issues: "Incorrect fill level, an empty chamber, or air entering the line can trigger delivery problems.", insight: "A chamber that is overfilled or nearly empty removes a useful visual clue during troubleshooting." },
  { id: "clamp", label: "Roller Clamp", color: "#475569", purpose: "Manually opens, restricts, or stops flow through the administration set.", issues: "A partially closed clamp can look exactly like a pump or downstream occlusion failure.", insight: "Check every clamp—including clamps hidden under bedding or near the patient—before replacing equipment." },
  { id: "air", label: "Air-in-Line Sensor", color: "#7c3aed", purpose: "Uses an optical or ultrasonic pathway to detect air in the loaded tubing.", issues: "Air bubbles, dirty sensor surfaces, incorrect tubing, or poor loading can create repeated alarms.", insight: "Never defeat an air alarm. Confirm the tubing, remove the air safely, and inspect the sensor channel." },
  { id: "mechanism", label: "Pumping Mechanism", color: "#f59e0b", purpose: "Moves fluid through the administration set at the programmed rate.", issues: "Improper loading, worn door parts, damaged tubing, or mechanism faults can affect delivery.", insight: "The tubing set is part of the pumping system. Correct device-compatible tubing matters." },
  { id: "pressure", label: "Pressure Sensor", color: "#dc2626", purpose: "Detects rising line pressure associated with downstream resistance or occlusion.", issues: "Kinks, closed clamps, infiltrated IV sites, clogged filters, or incorrect tubing can raise pressure.", insight: "An occlusion alarm is evidence of resistance somewhere in the pathway—not proof that the pump failed." },
  { id: "battery", label: "Battery", color: "#16a34a", purpose: "Provides temporary power during transport or loss of AC power.", issues: "Aged batteries, charging faults, poor connections, or long storage can reduce runtime.", insight: "A battery complaint should be verified under load. A displayed charge percentage alone does not prove runtime." },
];

const INFUSION_PUMP_CHALLENGES = {
  bag: { question: "The pump displays no-flow, and the bag appears full. What should you verify first?", options: ["Replace the display", "Confirm the bag outlet and upstream clamp are open", "Increase the programmed rate", "Replace the battery"], answer: 1, explanation: "A closed upstream pathway prevents fluid from reaching the pump even when the bag is full." },
  drip: { question: "The drip chamber is empty while the pump is running. What is the best first check?", options: ["Inspect the upstream fluid path and chamber setup", "Replace the keypad", "Disable the alarm", "Change the network settings"], answer: 0, explanation: "The source, spike, vent, clamp, and chamber setup should be evaluated before assuming an internal failure." },
  clamp: { question: "A downstream occlusion alarm begins immediately after repositioning the patient. What is most likely?", options: ["A closed or compressed tubing pathway", "A failed speaker", "A depleted backup battery", "An incorrect date setting"], answer: 0, explanation: "Patient movement can kink tubing or close a clamp, increasing downstream resistance." },
  air: { question: "Repeated air-in-line alarms occur with visible bubbles in the tubing. What is the correct response?", options: ["Bypass the detector", "Remove the air and reload the correct tubing according to procedure", "Increase pressure limits", "Replace the AC cord"], answer: 1, explanation: "Visible air must be addressed safely; the alarm should not be bypassed." },
  mechanism: { question: "The door closes, but the set is not seated in the pumping channel. What may occur?", options: ["Inaccurate delivery or loading alarms", "Higher battery capacity", "Improved flow accuracy", "A network-only failure"], answer: 0, explanation: "The pumping mechanism depends on correct tubing placement and door engagement." },
  pressure: { question: "A pump reports downstream occlusion. What is the most direct first action?", options: ["Replace the pump immediately", "Inspect the full downstream path for clamps, kinks, filters, and the IV site", "Increase the flow rate", "Silence and ignore the alarm"], answer: 1, explanation: "Follow the downstream fluid path and remove the cause of resistance before condemning the pump." },
  battery: { question: "The pump shuts off as soon as AC power is removed. A new battery was installed. What should be investigated next?", options: ["The charging and internal power pathway", "The IV bag label", "The air detector only", "The drip chamber fill level"], answer: 0, explanation: "If a known-good battery cannot support the device, evaluate charging, connection, and internal power circuitry." },
};

function InfusionPumpGraphic({ activeComponent = "air", onSelect, compact = false, simulation = "normal" }) {
  const active = INFUSION_PUMP_COMPONENTS.find((item) => item.id === activeComponent) || INFUSION_PUMP_COMPONENTS[0];
  const select = (id) => onSelect?.(id);
  return (
    <div className={`m4-infusion-graphic ${compact ? "compact" : ""} simulation-${simulation}`}>
      <svg viewBox="0 0 760 650" role="img" aria-label="Original generic infusion pump and fluid pathway with clickable components">
        <defs>
          <linearGradient id="m4-pump-shell" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#ffffff"/><stop offset="1" stopColor="#dfe8ee"/></linearGradient>
          <linearGradient id="m4-pump-screen" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#17354a"/><stop offset="1" stopColor="#07131d"/></linearGradient>
          <filter id="m4-pump-shadow" x="-30%" y="-30%" width="170%" height="180%"><feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#102f49" floodOpacity=".22"/></filter>
        </defs>
        <g filter="url(#m4-pump-shadow)">
          <path d="M182 52 V595" stroke="#7c8790" strokeWidth="16" strokeLinecap="round"/>
          <path d="M182 78 H308" stroke="#7c8790" strokeWidth="12" strokeLinecap="round"/>
          <path d="M288 78 v26" stroke="#7c8790" strokeWidth="8"/>
          <g className={`m4-pump-hotspot ${activeComponent === "bag" ? "active" : ""}`} onClick={() => select("bag")}>
            <path d="M238 102 h100 l14 28 v112 q0 25-25 25 h-78 q-25 0-25-25 V130z" fill="#eaf6ff" stroke={activeComponent === "bag" ? active.color : "#7ca8c6"} strokeWidth={activeComponent === "bag" ? 8 : 4}/>
            <path d="M250 142 h76 v90 h-76z" fill="#bfe4ff" opacity=".8"/><text x="288" y="190" textAnchor="middle" fill="#2563eb" fontWeight="900" fontSize="20">IV FLUID</text>
          </g>
          <path d="M288 267 V320" stroke="#70bce8" strokeWidth="10" strokeLinecap="round"/>
          <g className={`m4-pump-hotspot ${activeComponent === "drip" ? "active" : ""}`} onClick={() => select("drip")}>
            <rect x="263" y="305" width="50" height="72" rx="20" fill="#eaf8ff" stroke={activeComponent === "drip" ? active.color : "#6598b5"} strokeWidth={activeComponent === "drip" ? 8 : 4}/><path d="M272 344 q16 18 32 0 v24 h-32z" fill="#7dd3fc"/>
          </g>
          <path d="M288 377 V422" stroke="#70bce8" strokeWidth="10"/>
          <g className={`m4-pump-hotspot ${activeComponent === "clamp" ? "active" : ""}`} onClick={() => select("clamp")}><rect x="258" y="397" width="60" height="42" rx="10" fill="#64748b" stroke={activeComponent === "clamp" ? active.color : "#334155"} strokeWidth={activeComponent === "clamp" ? 8 : 4}/><path d="M269 408 l38 20" stroke="#fff" strokeWidth="6"/></g>
          <path d="M288 439 C288 465 338 470 370 470" fill="none" stroke="#70bce8" strokeWidth="10"/>
          <rect x="350" y="155" width="300" height="390" rx="36" fill="url(#m4-pump-shell)" stroke="#aebbc5" strokeWidth="5"/>
          <rect x="398" y="195" width="205" height="105" rx="14" fill="url(#m4-pump-screen)" stroke="#263c4a" strokeWidth="6"/>
          <text x="420" y="225" fill="#7dd3fc" fontSize="14" fontWeight="800">RATE</text><text x="420" y="273" fill="#fff" fontSize="42" fontWeight="900">125</text><text x="534" y="273" fill="#cbd5e1" fontSize="17">mL/hr</text>
          <g className={`m4-pump-hotspot ${activeComponent === "battery" ? "active" : ""}`} onClick={() => select("battery")}><rect x="565" y="208" width="25" height="14" rx="3" fill="#16a34a"/><rect x="589" y="212" width="4" height="6" fill="#16a34a"/></g>
          <rect x="385" y="325" width="230" height="178" rx="20" fill="#f8fafc" stroke="#aab8c2" strokeWidth="4"/>
          <g className={`m4-pump-hotspot ${activeComponent === "air" ? "active" : ""}`} onClick={() => select("air")}><rect x="405" y="350" width="42" height="112" rx="12" fill="#ede9fe" stroke={activeComponent === "air" ? active.color : "#7c3aed"} strokeWidth={activeComponent === "air" ? 8 : 4}/><circle cx="426" cy="382" r="9" fill="#7c3aed"/><circle cx="426" cy="414" r="6" fill="#a78bfa"/><text x="426" y="485" textAnchor="middle" fill="#6d28d9" fontSize="12" fontWeight="900">AIR</text></g>
          <g className={`m4-pump-hotspot ${activeComponent === "mechanism" ? "active" : ""}`} onClick={() => select("mechanism")}><rect x="463" y="345" width="78" height="128" rx="14" fill="#fff7db" stroke={activeComponent === "mechanism" ? active.color : "#d69d16"} strokeWidth={activeComponent === "mechanism" ? 8 : 4}/>{[0,1,2,3].map(i=><rect key={i} x="477" y={358+i*27} width="50" height="15" rx="7" fill="#f59e0b"/>)}<text x="502" y="492" textAnchor="middle" fill="#9a6200" fontSize="11" fontWeight="900">PUMP</text></g>
          <g className={`m4-pump-hotspot ${activeComponent === "pressure" ? "active" : ""}`} onClick={() => select("pressure")}><rect x="556" y="350" width="40" height="112" rx="12" fill="#fee2e2" stroke={activeComponent === "pressure" ? active.color : "#dc2626"} strokeWidth={activeComponent === "pressure" ? 8 : 4}/><path d="M566 410 h20" stroke="#dc2626" strokeWidth="8"/><text x="576" y="485" textAnchor="middle" fill="#b91c1c" fontSize="11" fontWeight="900">PRESS</text></g>
          <path d="M370 470 H405 M447 406 H463 M541 406 H556 M596 470 C650 470 675 500 675 548" fill="none" stroke="#70bce8" strokeWidth="10" strokeLinecap="round"/>
          <path d="M675 548 q-20 22-4 46" fill="none" stroke="#70bce8" strokeWidth="10" strokeLinecap="round"/>
          <circle cx="671" cy="604" r="12" fill="#f4b6a6" stroke="#9f5b4d" strokeWidth="3"/>
          {[390,430,470,510,550].map((x,i)=><circle key={x} cx={x} cy="525" r="11" fill={i===4?"#f59e0b":"#cbd5e1"} stroke="#64748b"/>)}
          <g className="m4-fluid-animation" aria-hidden="true">
            {[0,1,2,3,4].map((i)=><circle key={i} className="m4-fluid-drop" cx="288" cy="285" r="6" style={{"--drop-delay":`${i*.45}s`}} />)}
          </g>
          {simulation === "air" && <g className="m4-air-simulation" aria-hidden="true"><circle cx="288" cy="390" r="9"/><circle cx="288" cy="414" r="6"/><text x="326" y="404">AIR DETECTED</text></g>}
          {simulation === "occlusion" && <g className="m4-occlusion-simulation" aria-hidden="true"><path d="M596 470 C650 470 675 500 675 548"/><circle cx="624" cy="482" r="8"/><circle cx="646" cy="497" r="10"/><text x="610" y="450">PRESSURE RISING</text></g>}
        </g>
      </svg>
      {!compact && <div className="m4-pump-active-caption" style={{ borderColor: active.color }}><strong style={{ color: active.color }}>{active.label}</strong><span>{active.purpose}</span></div>}
    </div>
  );
}

function MissionFourInfusionPumpLesson({ lesson, selected, setSelected, completeLesson, lessonCount }) {
  const [activeComponent, setActiveComponent] = useState("air");
  const [componentAnswers, setComponentAnswers] = useState({});
  const [identifyAnswer, setIdentifyAnswer] = useState(null);
  const [simulation, setSimulation] = useState("normal");
  const [diagnosis, setDiagnosis] = useState(null);
  const answered = selected !== null;
  const active = INFUSION_PUMP_COMPONENTS.find((item) => item.id === activeComponent) || INFUSION_PUMP_COMPONENTS[0];
  const challenge = INFUSION_PUMP_CHALLENGES[activeComponent];
  const challengeAnswer = componentAnswers[activeComponent];
  const challengeCorrect = challengeAnswer === challenge.answer;
  const masteredCount = INFUSION_PUMP_COMPONENTS.filter((item) => componentAnswers[item.id] === INFUSION_PUMP_CHALLENGES[item.id].answer).length;
  const explorerComplete = masteredCount === INFUSION_PUMP_COMPONENTS.length;
  const recognitionComplete = identifyAnswer === "pressure";
  const answerComponent = (index) => {
    if (challengeCorrect) return;
    setComponentAnswers((previous) => ({ ...previous, [activeComponent]: index }));
    playCbetTone(index === challenge.answer ? "correct" : "wrong");
  };
  return (
    <div className="m4-premium-lesson m4-infusion-lesson">
      <section className="m4-premium-hero m4-infusion-hero">
        <div className="m4-premium-monitor-column"><InfusionPumpGraphic activeComponent={activeComponent} onSelect={setActiveComponent} simulation={simulation}/></div>
        <div className="m4-premium-copy-column">
          <span className="m4-premium-kicker">Lesson 2 of {lessonCount}</span>
          <h1>Infusion Delivery Systems</h1>
          <p className="m4-premium-lead">Follow fluid from the source to the patient while learning how loading, sensors, pressure, tubing, and power affect delivery.</p>
          <div className="m4-pump-component-summary">{INFUSION_PUMP_COMPONENTS.map((item)=><button key={item.id} className={`${activeComponent===item.id?"active":""} ${componentAnswers[item.id]===INFUSION_PUMP_CHALLENGES[item.id].answer?"mastered":""}`} style={{"--component-color":item.color}} onClick={()=>setActiveComponent(item.id)}><span>{item.label}</span>{componentAnswers[item.id]===INFUSION_PUMP_CHALLENGES[item.id].answer&&<em>✓ Mastered</em>}</button>)}</div>
          <aside className="m4-lesson-objectives"><strong>In this lesson</strong><ul><li>Fluid pathway</li><li>Tubing and loading</li><li>Air detection</li><li>Occlusion sensing</li><li>Battery and power</li></ul><span>◷ Estimated time: 18 min</span></aside>
        </div>
      </section>
      <section className="m4-explorer-progress"><div><span>Equipment Explorer</span><strong>{masteredCount} of {INFUSION_PUMP_COMPONENTS.length} components mastered</strong></div><div className="m4-explorer-progress-track"><i style={{width:`${masteredCount/INFUSION_PUMP_COMPONENTS.length*100}%`}}/></div><div className="m4-pump-explorer-dots">{INFUSION_PUMP_COMPONENTS.map(item=><button key={item.id} style={{"--component-color":item.color}} className={`${activeComponent===item.id?"active":""} ${componentAnswers[item.id]===INFUSION_PUMP_CHALLENGES[item.id].answer?"complete":""}`} onClick={()=>setActiveComponent(item.id)}>{componentAnswers[item.id]===INFUSION_PUMP_CHALLENGES[item.id].answer?"✓ ":""}{item.label}</button>)}</div></section>
      <section className="m4-pump-simulator-panel">
        <div><span className="m4-exploration-kicker">Live Fluid Simulation</span><h2>See the alarm evidence</h2><p>Switch conditions, watch the pathway change, then identify where you would investigate first.</p></div>
        <div className="m4-pump-simulation-controls">
          {[{id:"normal",label:"Normal flow"},{id:"air",label:"Air in line"},{id:"occlusion",label:"Downstream occlusion"}].map((item)=><button key={item.id} className={simulation===item.id?"active":""} onClick={()=>{setSimulation(item.id);setDiagnosis(null)}}>{item.label}</button>)}
        </div>
        {simulation!=="normal"&&<div className="m4-pump-diagnosis"><strong>Click the most likely first investigation point:</strong><div>{INFUSION_PUMP_COMPONENTS.map((item)=><button key={item.id} className={diagnosis===item.id?((simulation==="air"&&item.id==="air")||(simulation==="occlusion"&&item.id==="pressure")?"correct":"wrong"):""} onClick={()=>{setDiagnosis(item.id);playCbetTone((simulation==="air"&&item.id==="air")||(simulation==="occlusion"&&item.id==="pressure")?"correct":"wrong")}}>{item.label}</button>)}</div>{diagnosis&&<p>{(simulation==="air"&&diagnosis==="air")||(simulation==="occlusion"&&diagnosis==="pressure")?"Correct. Use the alarm evidence to focus your first check.":"Not the strongest first target. Follow the alarm evidence and fluid pathway."}</p>}</div>}
      </section>
      <section className="m4-premium-lower-grid">
        <article className="m4-service-call-card"><span className="m4-service-call-kicker">🚨 Service Call Scenario</span><p>A pump alarms during medication delivery. The device powers normally, but the alarm returns after the nurse restarts it.</p><h2>{lesson.check.question}</h2><div className="m4-service-options">{lesson.check.options.map((option,index)=><button key={option} disabled={answered} className={`${answered&&index===lesson.check.answer?"correct":""} ${answered&&index===selected&&index!==lesson.check.answer?"wrong":""}`} onClick={()=>setSelected(index)}><strong>{String.fromCharCode(65+index)}</strong><span>{option}</span></button>)}</div>{answered&&<div className="m4-service-feedback"><strong>{selected===lesson.check.answer?"Service call cleared.":"Recheck the fluid path."}</strong><span>{lesson.check.explanation}</span></div>}<div className="m4-field-tip">💡 <strong>Kevin's Clinical Engineering Insight:</strong> Read the alarm, verify the setup, and follow the tubing from bag to patient before replacing the pump.</div></article>
        <article className="m4-exploration-card"><span className="m4-exploration-kicker">Interactive Exploration</span><h2>{active.label}</h2><p>{active.purpose}</p><div className="m4-exploration-layout"><InfusionPumpGraphic compact activeComponent={activeComponent} onSelect={setActiveComponent} simulation={simulation}/><div className="m4-parameter-detail" style={{"--parameter-color":active.color}}><span>Common evidence</span><h3>{active.issues}</h3><p>{active.insight}</p></div></div><div className="m4-explorer-mini-challenge" style={{"--parameter-color":active.color}}><div className="m4-explorer-mini-heading"><span>Technician Challenge</span><strong>{active.label}</strong></div><h3>{challenge.question}</h3><div className="m4-explorer-mini-options">{challenge.options.map((option,index)=><button key={option} disabled={challengeCorrect} className={`${challengeAnswer!==undefined&&index===challenge.answer?"correct":""} ${challengeAnswer===index&&index!==challenge.answer?"wrong":""}`} onClick={()=>answerComponent(index)}><strong>{String.fromCharCode(65+index)}</strong><span>{option}</span></button>)}</div>{challengeAnswer!==undefined&&<div className={`m4-explorer-mini-feedback ${challengeCorrect?"good":"bad"}`}><strong>{challengeCorrect?`${active.label} mastered.`:"Try another troubleshooting path."}</strong><span>{challengeCorrect?challenge.explanation:"Use the fluid path and alarm evidence to choose the most direct check."}</span></div>}</div></article>
      </section>
      <section className="m4-identify-challenge m4-pump-recognition"><div><span className="m4-exploration-kicker">Quick Recognition</span><h2>Which component detects increasing downstream resistance?</h2><p>Select the component that supports an occlusion alarm.</p></div><div className="m4-pump-identify-options">{INFUSION_PUMP_COMPONENTS.map(item=>{const chosen=identifyAnswer===item.id;return <button key={item.id} disabled={recognitionComplete} style={{"--component-color":item.color}} className={`${chosen?"chosen":""} ${chosen&&item.id==="pressure"?"correct":""} ${chosen&&item.id!=="pressure"?"wrong":""}`} onClick={()=>{setIdentifyAnswer(item.id);playCbetTone(item.id==="pressure"?"correct":"wrong")}}><i/><strong>{item.label}</strong></button>})}</div>{identifyAnswer&&<div className={`m4-identify-feedback ${recognitionComplete?"good":"bad"}`}><strong>{recognitionComplete?"Correct — the pressure sensor supports downstream occlusion detection.":"Not this component. Try again."}</strong><span>{recognitionComplete?"A rising downstream pressure signal helps the pump identify resistance beyond the pumping mechanism.":"Think about which component detects resistance rather than air, power, or source flow."}</span></div>}</section>
      {explorerComplete&&<section className="m4-explorer-complete"><span>🏆</span><div><small>Equipment Explorer Complete</small><h2>Infusion Delivery Path Mastered</h2><p>You traced the system from fluid source to patient and used alarm evidence to isolate common problems.</p></div></section>}
      <div className="m4-premium-actions"><span>{answered&&recognitionComplete&&explorerComplete?"Lesson activities complete":!answered?"Complete the service call to continue":!explorerComplete?`Master all seven components (${masteredCount}/7 complete)`:"Complete the pressure-sensor recognition challenge"}</span><button className="cbet-primary" disabled={!answered||!recognitionComplete||!explorerComplete} onClick={completeLesson}>Next: Defibrillation and Pacing →</button></div>
    </div>
  );
}


function MissionFourNavigator({
  lessonIndex,
  lessons,
  completedLessons,
  missionComplete,
  onOpenLesson,
}) {
  const [open, setOpen] = useState(true);
  const furthestUnlocked = missionComplete
    ? lessons.length - 1
    : Math.min(
        lessons.length - 1,
        Math.max(lessonIndex, completedLessons.length ? Math.max(...completedLessons) + 1 : 0)
      );
  const mastered = completedLessons.length;
  const percent = Math.round((mastered / lessons.length) * 100);

  return (
    <aside className={`m4-explorer-navigator ${open ? "is-open" : ""}`} aria-label="Mission 4 explorer map">
      <button
        type="button"
        className="m4-explorer-navigator-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span><strong>Equipment Explorer Map</strong><small>{mastered} of {lessons.length} explorers complete</small></span>
        <b>{open ? "Hide map" : "Open map"}</b>
      </button>
      {open && (
        <div className="m4-explorer-navigator-body">
          <div className="m4-explorer-navigator-progress" aria-label={`${percent}% of equipment explorers complete`}>
            <span style={{ width: `${percent}%` }} />
          </div>
          <div className="m4-explorer-navigator-grid">
            {lessons.map((lesson, index) => {
              const complete = completedLessons.includes(index);
              const current = index === lessonIndex;
              const unlocked = missionComplete || index <= furthestUnlocked || complete;
              return (
                <button
                  type="button"
                  key={lesson.title}
                  disabled={!unlocked}
                  className={`${complete ? "complete" : ""} ${current ? "current" : ""}`}
                  onClick={() => unlocked && onOpenLesson(index)}
                >
                  <span aria-hidden="true">{complete ? "✓" : current ? "▶" : unlocked ? index + 1 : "🔒"}</span>
                  <span><strong>{lesson.title}</strong><small>{complete ? "Review Explorer" : current ? "Current Explorer" : unlocked ? "Open Explorer" : "Complete prior explorer"}</small></span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}

function MissionFour({ onExit }) {
  const moduleNumber = 4;
  const savedProgress = getMissionProgress(moduleNumber);
  const completedModule = getCbetModuleState(moduleNumber);
  const questions = useMemo(() => missionFourQuestions.map(shuffleQuestion), []);
  const [phase, setPhaseState] = useState(savedProgress.phase || "briefing");
  const [lessonIndex, setLessonIndexState] = useState(savedProgress.lessonIndex || 0);
  const [completedLessons, setCompletedLessons] = useState(savedProgress.completedLessons || []);
  const [scenarioIndex, setScenarioIndexState] = useState(savedProgress.scenarioIndex || 0);
  const [completedScenarios, setCompletedScenarios] = useState(savedProgress.completedScenarios || []);
  const hasSavedQuizScore = Number.isFinite(savedProgress.quizScore);
  const restoredQuizIndex = savedProgress.phase === "quiz" && !hasSavedQuizScore ? 0 : (savedProgress.quizIndex || 0);
  const [questionIndex, setQuestionIndexState] = useState(restoredQuizIndex);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(hasSavedQuizScore ? savedProgress.quizScore : 0);
  const [result, setResult] = useState(
    completedModule.complete
      ? completedModule.bestScore
      : (savedProgress.phase === "result" && Number.isFinite(savedProgress.finalPercent) ? savedProgress.finalPercent : null)
  );
  const stageRef = useRef(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const target = stageRef.current;
      if (!target) return;
      window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - 12), left: 0, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [phase, lessonIndex, scenarioIndex, questionIndex]);

  const setPhase = (next) => { setPhaseState(next); saveMissionProgress(moduleNumber, { phase: next }); scrollCbetPageToTop(); };
  const completeLesson = () => {
    const done = Array.from(new Set([...completedLessons, lessonIndex]));
    setCompletedLessons(done);
    awardCbetXp(12, `mission4-lesson-${lessonIndex}`);
    setSelected(null);
    if (lessonIndex < missionFourLessons.length - 1) {
      const next = lessonIndex + 1; setLessonIndexState(next);
      saveMissionProgress(moduleNumber, { phase: "lessons", lessonIndex: next, completedLessons: done });
    } else { saveMissionProgress(moduleNumber, { phase: "scenarios", completedLessons: done, scenarioIndex: 0 }); setPhaseState("scenarios"); }
  };
  const completeScenario = () => {
    const done = Array.from(new Set([...completedScenarios, scenarioIndex]));
    setCompletedScenarios(done); awardCbetXp(18, `mission4-scenario-${scenarioIndex}`); setSelected(null);
    if (scenarioIndex < missionFourScenarios.length - 1) {
      const next = scenarioIndex + 1; setScenarioIndexState(next);
      saveMissionProgress(moduleNumber, { phase: "scenarios", scenarioIndex: next, completedScenarios: done });
    } else { setQuestionIndexState(0); setScore(0); saveMissionProgress(moduleNumber, { phase: "quiz", quizIndex: 0, quizScore: 0, completedScenarios: done }); setPhaseState("quiz"); }
  };
  const answerQuiz = (index) => {
    if (selected !== null) return;
    setSelected(index);
    const nextScore = index === questions[questionIndex].answer ? score + 1 : score;
    setScore(nextScore); saveMissionProgress(moduleNumber, { phase: "quiz", quizIndex: questionIndex, quizScore: nextScore });
  };
  const nextQuizQuestion = () => {
    if (questionIndex < questions.length - 1) {
      const next = questionIndex + 1; setQuestionIndexState(next); setSelected(null);
      saveMissionProgress(moduleNumber, { phase: "quiz", quizIndex: next, quizScore: score }); return;
    }
    const finalScore = Math.round((score / questions.length) * 100);
    setResult(finalScore);
    if (finalScore >= 80) {
      completeCbetModule(moduleNumber, finalScore, 450);
      saveMissionProgress(moduleNumber, { phase: "complete", quizIndex: questionIndex, quizScore: score, finalPercent: finalScore, passed: true });
      setPhaseState("complete");
    } else {
      saveMissionProgress(moduleNumber, { phase: "result", quizIndex: questionIndex, quizScore: score, finalPercent: finalScore, passed: false });
      setPhaseState("result");
    }
  };
  const restartQuiz = () => { setQuestionIndexState(0); setSelected(null); setScore(0); setResult(null); saveMissionProgress(moduleNumber, { phase: "quiz", quizIndex: 0, quizScore: 0 }); setPhaseState("quiz"); };
  const reviewLesson = (index = 0) => {
    setLessonIndexState(index);
    setSelected(null);
    setPhaseState("lessons");
    saveMissionProgress(moduleNumber, {
      phase: "lessons",
      lessonIndex: index,
      completedLessons,
      completedScenarios,
    });
    scrollCbetPageToTop();
  };
  const openExplorer = (index) => {
    const furthestUnlocked = completedModule.complete
      ? missionFourLessons.length - 1
      : Math.min(
          missionFourLessons.length - 1,
          Math.max(lessonIndex, completedLessons.length ? Math.max(...completedLessons) + 1 : 0)
        );
    if (!completedModule.complete && index > furthestUnlocked && !completedLessons.includes(index)) return;
    reviewLesson(index);
  };

  if (phase === "briefing") return (
    <section className="cbet-shell cbet-mission-briefing cbet-mission4-briefing">
      <button className="cbet-back" onClick={onExit}>← Back to Academy</button>
      <span className="cbet-label">Mission 4 · 450 XP</span><h1>{missionFourBriefing.title}</h1><p>{missionFourBriefing.summary}</p>
      <div className="cbet-objectives"><h2>What you will learn</h2><ul>{missionFourBriefing.objectives.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <div className="m10-brief-stats">
        <div><strong>{lessons.length}</strong><span>Equipment lessons</span></div>
        <div><strong>{scenarios.length}</strong><span>Field scenarios</span></div>
        <div><strong>{questions.length}</strong><span>Final questions</span></div>
        <div><strong>80%</strong><span>Passing standard</span></div>
      </div>
      <div className="m10-safety-note"><strong>Medical-gas safety rule:</strong> Do not defeat gas-specific connectors, improvise fittings, or introduce oil/grease into oxygen-service equipment. Follow current manufacturer instructions and facility policy.</div>
      <div className="cbet-actions"><button className="cbet-primary" onClick={() => setPhase("lessons")}>{savedProgress.phase !== "briefing" ? "Resume Mission" : "Begin Mission"}</button></div>
    </section>
  );
  if (phase === "lessons") {
    const lesson = missionFourLessons[lessonIndex], answered = selected !== null;
    return <section ref={stageRef} className="cbet-shell cbet-lesson-stage cbet-module4-stage">
      <button className="cbet-back" onClick={onExit}>← Save & Exit</button>
      <div className="cbet-quiz-meta cbet-module4-meta"><span>Medical Equipment Systems</span><span>Lesson {lessonIndex + 1} of {missionFourLessons.length}</span></div>
      <div className="cbet-progress-bar cbet-module4-progress"><span style={{ width: `${((lessonIndex + 1) / missionFourLessons.length) * 100}%` }} /></div>
      <MissionFourNavigator
        lessonIndex={lessonIndex}
        lessons={missionFourLessons}
        completedLessons={completedLessons}
        missionComplete={completedModule.complete}
        onOpenLesson={openExplorer}
      />
      {lessonIndex === 0 ? (
        <MissionFourPatientMonitoringLesson lesson={lesson} selected={selected} setSelected={setSelected} completeLesson={completeLesson} lessonCount={missionFourLessons.length} />
      ) : lessonIndex === 1 ? (
        <MissionFourInfusionPumpLesson lesson={lesson} selected={selected} setSelected={setSelected} completeLesson={completeLesson} lessonCount={missionFourLessons.length} />
      ) : (<>
        <article className="cbet-lesson-card"><div className="cbet-hero-icon">{lesson.icon}</div><h2 className="cbet-lesson-title">{lesson.title}</h2><p className="cbet-lesson-summary">{lesson.summary}</p><ul>{lesson.points.map((p) => <li key={p}>{p}</li>)}</ul></article>
        <MissionFourImage lessonIndex={lessonIndex} />
        <article className="cbet-quiz"><span className="cbet-label">Apply what you learned</span><h2>{lesson.check.question}</h2><div className="cbet-options">{lesson.check.options.map((o,i)=><button key={o} disabled={answered} className={`cbet-option ${answered&&i===lesson.check.answer?"correct":""} ${answered&&i===selected&&i!==lesson.check.answer?"wrong":""}`} onClick={()=>setSelected(i)}><strong>{String.fromCharCode(65+i)}.</strong> {o}</button>)}</div>{answered&&<div className="cbet-feedback"><strong>{selected===lesson.check.answer?"Correct — strong reasoning.":"Review the evidence."}</strong><span>{lesson.check.explanation}</span></div>}<div className="cbet-actions"><button className="cbet-primary" disabled={!answered} onClick={completeLesson}>{lessonIndex===missionFourLessons.length-1?"Begin Service Calls":"Next Lesson"}</button></div></article>
      </>)}
      <nav className="m4-explorer-bottom-nav" aria-label="Explorer navigation">
        <button
          type="button"
          className="cbet-secondary"
          disabled={lessonIndex === 0}
          onClick={() => openExplorer(lessonIndex - 1)}
        >
          ← Previous Explorer
        </button>
        <button type="button" className="m4-explorer-map-link" onClick={() => document.querySelector(".m4-explorer-navigator")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
          Equipment Explorer Map
        </button>
        <button
          type="button"
          className="cbet-secondary"
          disabled={lessonIndex >= missionFourLessons.length - 1 || (!completedModule.complete && !completedLessons.includes(lessonIndex) && !completedLessons.includes(lessonIndex + 1))}
          onClick={() => openExplorer(lessonIndex + 1)}
        >
          Next Unlocked Explorer →
        </button>
      </nav>
    </section>;
  }
  if (phase === "scenarios") {
    const scenario=missionFourScenarios[scenarioIndex], answered=selected!==null;
    return <section ref={stageRef} className="cbet-shell cbet-lesson-stage cbet-module4-stage"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><div className="cbet-quiz-meta cbet-module4-meta"><span>Hospital Service Call</span><span>{scenarioIndex+1} of {missionFourScenarios.length}</span></div><div className="cbet-progress-bar cbet-module4-progress"><span style={{width:`${((scenarioIndex+1)/missionFourScenarios.length)*100}%`}}/></div><article className="cbet-scenario cbet-mission4-scenario"><span className="cbet-label">{scenario.department}</span><h2>{scenario.title}</h2><p>{scenario.patient}</p></article><article className="cbet-quiz"><h2>{scenario.question}</h2><div className="cbet-options">{scenario.options.map((o,i)=><button key={o} disabled={answered} className={`cbet-option ${answered&&i===scenario.answer?"correct":""} ${answered&&i===selected&&i!==scenario.answer?"wrong":""}`} onClick={()=>setSelected(i)}><strong>{String.fromCharCode(65+i)}.</strong> {o}</button>)}</div>{answered&&<div className="cbet-feedback"><strong>{selected===scenario.answer?"Correct decision.":"Use a more systematic path."}</strong><span>{scenario.explanation}</span></div>}<div className="cbet-actions"><button className="cbet-primary" disabled={!answered} onClick={completeScenario}>{scenarioIndex===missionFourScenarios.length-1?"Start Final Challenge":"Next Service Call"}</button></div></article></section>;
  }
  if (phase === "quiz") {
    const question=questions[questionIndex], answered=selected!==null;
    return <section ref={stageRef} className="cbet-shell cbet-lesson-stage cbet-module4-stage"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><article className="cbet-quiz"><div className="cbet-quiz-meta cbet-module4-meta"><span>Final Challenge · {questionIndex+1} of {questions.length}</span><span>{question.category}</span></div><div className="cbet-progress-bar cbet-module4-progress"><span style={{width:`${((questionIndex+1)/questions.length)*100}%`}}/></div><h2>{question.question}</h2><div className="cbet-options">{question.options.map((o,i)=><button key={o} disabled={answered} className={`cbet-option ${answered&&i===question.answer?"correct":""} ${answered&&i===selected&&i!==question.answer?"wrong":""}`} onClick={()=>answerQuiz(i)}><strong>{String.fromCharCode(65+i)}.</strong> {o}</button>)}</div>{answered&&<div className="cbet-feedback"><strong>{selected===question.answer?"Correct.":"Incorrect."}</strong><span>{question.explanation}</span></div>}<div className="cbet-actions"><span>Score: {score}/{questions.length}</span><button className="cbet-primary" disabled={!answered} onClick={nextQuizQuestion}>{questionIndex===questions.length-1?"Finish Mission":"Next Question"}</button></div></article></section>;
  }
  const passed=(result||0)>=80;
  return <section className="cbet-shell cbet-module10-results-shell"><article className={`cbet-results cbet-module10-results ${passed?"passed":""}`}><div className="cbet-hero-icon">{passed?"🏆":"📘"}</div><span className="cbet-label">{passed?"Mission 4 Complete":"Review Required"}</span><h1 className="cbet-module10-result-score">{result||0}%</h1><h2 className="cbet-module10-result-title">Medical Equipment Systems</h2><p>{passed?"You completed the equipment lessons, hospital service calls, and final challenge.":"You need 80% to pass. Review the lessons and retake the final challenge."}</p><div className="cbet-completion-summary cbet-module10-summary"><div><span>Lessons</span><strong>{completedLessons.length}/{missionFourLessons.length}</strong></div><div><span>Service Calls</span><strong>{completedScenarios.length}/{missionFourScenarios.length}</strong></div><div><span>Status</span><strong>{passed?"Complete":"Review"}</strong></div></div>{passed&&<section className="cbet-achievement-card"><span className="cbet-achievement-eyebrow">Achievement Earned</span><div className="cbet-achievement-mark">🏅</div><h2>Medical Equipment Systems</h2><p>This recognizes successful completion of Mission 4 in the MedSkillBuilder CBET Academy.</p><div className="cbet-achievement-details"><div><span>Mission</span><strong>4</strong></div><div><span>Score</span><strong>{result}%</strong></div><div><span>XP</span><strong>450</strong></div></div><button className="cbet-primary cbet-print-achievement" onClick={()=>window.print()}>Print My Achievement</button></section>}<div className="cbet-actions center cbet-module10-result-actions">{!passed&&<button className="cbet-primary" onClick={restartQuiz}>Retake Challenge</button>}{passed&&<button className="cbet-primary" onClick={()=>reviewLesson(0)}>Review Equipment Explorers</button>}<button className="cbet-secondary" onClick={onExit}>Back to Academy</button></div></article></section>;
}



const MISSION_FIVE_CONDUCTION = [
  {
    id: "sa",
    label: "SA Node",
    color: "#16a34a",
    location: "Upper right atrium",
    purpose: "Begins the normal electrical impulse and sets the heart's rhythm.",
    equipment: "The resulting atrial depolarization contributes to the P wave seen on an ECG monitor.",
    challenge: "Which structure normally initiates the cardiac electrical impulse?",
    options: ["SA node", "AV node", "Bundle branches", "Purkinje fibers"],
    answer: 0,
  },
  {
    id: "av",
    label: "AV Node",
    color: "#eab308",
    location: "Lower interatrial septum",
    purpose: "Briefly delays conduction so the ventricles can fill before they contract.",
    equipment: "Changes in AV conduction can alter the PR interval on the ECG.",
    challenge: "What is the main function of the AV node in normal conduction?",
    options: ["Create the QRS complex", "Delay the impulse briefly", "Measure blood pressure", "Oxygenate the blood"],
    answer: 1,
  },
  {
    id: "his",
    label: "Bundle of His",
    color: "#f97316",
    location: "Upper interventricular septum",
    purpose: "Carries the impulse from the AV node into the ventricular conduction system.",
    equipment: "A conduction interruption below the AV node can widen or alter the QRS complex.",
    challenge: "Which pathway carries the impulse from the AV node toward the ventricles?",
    options: ["Pulmonary vein", "Bundle of His", "Aorta", "Coronary sinus"],
    answer: 1,
  },
  {
    id: "branches",
    label: "Bundle Branches",
    color: "#2563eb",
    location: "Right and left sides of the septum",
    purpose: "Distribute the impulse toward the right and left ventricles.",
    equipment: "A bundle-branch delay can change ventricular depolarization and QRS appearance.",
    challenge: "The right and left bundle branches primarily distribute conduction to what area?",
    options: ["The atria", "The ventricles", "The lungs", "The skin electrodes"],
    answer: 1,
  },
  {
    id: "purkinje",
    label: "Purkinje Fibers",
    color: "#9333ea",
    location: "Ventricular walls",
    purpose: "Rapidly spread the impulse through ventricular muscle for coordinated contraction.",
    equipment: "Coordinated ventricular depolarization produces the dominant QRS complex on the ECG.",
    challenge: "Which fibers rapidly spread the impulse through the ventricular myocardium?",
    options: ["Purkinje fibers", "Chordae tendineae", "Papillary muscles", "Coronary arteries"],
    answer: 0,
  },
];

function MissionFiveHeartGraphic({ activeId, explored, onSelect, signalStep = -1 }) {
  const active = MISSION_FIVE_CONDUCTION.find((item) => item.id === activeId) || MISSION_FIVE_CONDUCTION[0];
  const nodeClass = (id) => `${activeId === id ? "active" : ""} ${explored.includes(id) ? "explored" : ""} ${MISSION_FIVE_CONDUCTION.findIndex((item) => item.id === id) === signalStep ? "signal" : ""}`;
  return (
    <div className="m5-heart-graphic" style={{ "--m5-active": active.color }}>
      <svg viewBox="0 0 720 650" role="img" aria-label="Original educational heart illustration showing the cardiac conduction pathway">
        <defs>
          <linearGradient id="m5-heart-fill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#fb7185" />
            <stop offset=".58" stopColor="#dc2626" />
            <stop offset="1" stopColor="#991b1b" />
          </linearGradient>
          <filter id="m5-heart-shadow" x="-30%" y="-30%" width="170%" height="180%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#5f0f18" floodOpacity=".28" />
          </filter>
          <filter id="m5-node-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g filter="url(#m5-heart-shadow)">
          <path className="m5-aorta" d="M391 135 C397 71 466 55 505 91 C543 126 522 179 480 193 L456 165 C479 143 483 113 458 105 C434 97 421 119 423 146 Z" />
          <path className="m5-vessel" d="M279 173 C244 108 259 68 300 54 C343 39 378 74 371 133 L348 185 Z" />
          <path className="m5-heart-body" d="M359 572 C319 535 224 459 191 356 C160 258 194 177 267 158 C307 148 340 164 363 197 C389 163 430 147 474 162 C550 188 574 278 535 370 C494 469 405 544 359 572 Z" />
          <path className="m5-heart-septum" d="M363 198 C350 272 349 372 359 556" />
          <path className="m5-chamber-line" d="M210 303 C265 288 319 303 354 337" />
          <path className="m5-chamber-line" d="M371 330 C417 294 481 286 536 313" />
          <path className="m5-conduction-main" d="M291 224 C314 246 329 275 346 300 C357 317 359 338 359 361" />
          <path className="m5-conduction-left" d="M358 360 C331 392 302 432 277 489" />
          <path className="m5-conduction-right" d="M360 360 C393 397 427 438 453 492" />
          <path className="m5-purkinje" d="M277 489 C251 480 232 457 219 430 M277 489 C299 500 311 516 319 540 M453 492 C480 478 496 454 506 427 M453 492 C430 510 417 530 407 548" />
        </g>
        <text className="m5-chamber-label" x="255" y="290">RA</text>
        <text className="m5-chamber-label" x="435" y="290">LA</text>
        <text className="m5-chamber-label" x="274" y="420">RV</text>
        <text className="m5-chamber-label" x="430" y="420">LV</text>
        <g className={`m5-heart-node ${nodeClass("sa")}`} onClick={() => onSelect("sa")} role="button" tabIndex="0" aria-label="SA node" style={{ "--node-color": "#16a34a" }}>
          <circle cx="291" cy="224" r="18" /><text x="215" y="216">SA NODE</text>
        </g>
        <g className={`m5-heart-node ${nodeClass("av")}`} onClick={() => onSelect("av")} role="button" tabIndex="0" aria-label="AV node" style={{ "--node-color": "#eab308" }}>
          <circle cx="346" cy="300" r="17" /><text x="272" y="294">AV NODE</text>
        </g>
        <g className={`m5-heart-node ${nodeClass("his")}`} onClick={() => onSelect("his")} role="button" tabIndex="0" aria-label="Bundle of His" style={{ "--node-color": "#f97316" }}>
          <circle cx="359" cy="350" r="15" /><text x="376" y="354">BUNDLE OF HIS</text>
        </g>
        <g className={`m5-heart-node ${nodeClass("branches")}`} onClick={() => onSelect("branches")} role="button" tabIndex="0" aria-label="Bundle branches" style={{ "--node-color": "#2563eb" }}>
          <circle cx="360" cy="405" r="15" /><text x="378" y="410">BUNDLE BRANCHES</text>
        </g>
        <g className={`m5-heart-node ${nodeClass("purkinje")}`} onClick={() => onSelect("purkinje")} role="button" tabIndex="0" aria-label="Purkinje fibers" style={{ "--node-color": "#9333ea" }}>
          <circle cx="453" cy="492" r="15" /><text x="474" y="500">PURKINJE</text>
        </g>
      </svg>
      <div className="m5-heart-ecg" aria-label="Animated ECG waveform">
        <span>ECG</span>
        <svg viewBox="0 0 700 120" preserveAspectRatio="none"><path d="M0 72 L90 72 L112 66 L128 78 L148 72 L188 72 L205 64 L222 72 L250 72 L270 16 L290 104 L310 48 L330 72 L405 72 L427 66 L443 78 L463 72 L503 72 L520 64 L537 72 L565 72 L585 16 L605 104 L625 48 L645 72 L700 72" /></svg>
      </div>
    </div>
  );
}


const MISSION_FIVE_RESPIRATORY = [
  { id: "trachea", label: "Trachea", color: "#0ea5e9", location: "Central airway below the larynx", purpose: "Conducts air toward the right and left main bronchi.", equipment: "Ventilator circuits and capnography depend on a patent airway and correctly positioned airway device.", challenge: "Which structure is the main airway before it divides into the bronchi?", options: ["Trachea", "Alveoli", "Diaphragm", "Pulmonary vein"], answer: 0 },
  { id: "bronchi", label: "Bronchi", color: "#0284c7", location: "Right and left branches from the trachea", purpose: "Distribute inspired gas into each lung and into progressively smaller bronchioles.", equipment: "Unequal breath sounds or airway obstruction can change measured pressure, flow, and delivered tidal volume.", challenge: "What do the main bronchi primarily do?", options: ["Exchange oxygen", "Distribute air into each lung", "Pump blood", "Measure CO₂"], answer: 1 },
  { id: "alveoli", label: "Alveoli", color: "#8b5cf6", location: "Microscopic air sacs at the ends of bronchioles", purpose: "Provide the thin surface where oxygen enters blood and carbon dioxide leaves it.", equipment: "SpO₂ and capnography reflect different parts of ventilation, gas exchange, and perfusion—not merely machine output.", challenge: "Where does most pulmonary gas exchange occur?", options: ["Trachea", "Main bronchi", "Alveoli", "Diaphragm"], answer: 2 },
  { id: "capillaries", label: "Pulmonary Capillaries", color: "#ef4444", location: "Dense vessel network surrounding the alveoli", purpose: "Bring deoxygenated blood to the alveoli and carry oxygenated blood toward the heart.", equipment: "A normal ventilator can coexist with poor oxygenation when perfusion or diffusion is impaired.", challenge: "Which vessels directly surround the alveoli for gas exchange?", options: ["Coronary arteries", "Pulmonary capillaries", "Aorta", "Vena cava"], answer: 1 },
  { id: "diaphragm", label: "Diaphragm", color: "#f59e0b", location: "Dome-shaped muscle below the lungs", purpose: "Contracts downward during spontaneous inspiration, increasing thoracic volume.", equipment: "Ventilators create positive-pressure inspiration, while spontaneous breathing normally uses negative intrathoracic pressure.", challenge: "Which muscle is the primary driver of quiet inspiration?", options: ["Diaphragm", "Biceps", "Myocardium", "Trapezius"], answer: 0 },
];

function MissionFiveLungGraphic({ activeId, explored, onSelect, breathing = true }) {
  const nodeClass = (id) => `${activeId === id ? "active" : ""} ${explored.includes(id) ? "explored" : ""}`;
  return (
    <div className={`m5-lung-graphic ${breathing ? "is-breathing" : ""}`}>
      <svg viewBox="0 0 760 650" role="img" aria-label="Original educational illustration of the lungs, airway, alveoli, capillaries, and diaphragm">
        <defs>
          <linearGradient id="m5-lung-fill" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#fda4af"/><stop offset="1" stopColor="#e11d48"/></linearGradient>
          <filter id="m5-lung-shadow" x="-30%" y="-30%" width="170%" height="180%"><feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#5f1235" floodOpacity=".22"/></filter>
          <filter id="m5-lung-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <g filter="url(#m5-lung-shadow)">
          <path className="m5-lung-lobe m5-lung-left" d="M330 174 C266 132 181 167 147 249 C111 338 130 480 227 533 C275 559 318 532 331 468 Z"/>
          <path className="m5-lung-lobe m5-lung-right" d="M430 174 C494 132 579 167 613 249 C649 338 630 480 533 533 C485 559 442 532 429 468 Z"/>
          <rect className="m5-trachea" x="350" y="64" width="60" height="168" rx="25"/>
          <path className="m5-bronchi" d="M380 219 C340 245 307 273 274 316 M380 219 C420 245 453 273 486 316"/>
          <path className="m5-bronchi m5-bronchi-small" d="M274 316 L230 360 M274 316 L288 382 M486 316 L530 360 M486 316 L472 382"/>
          <path className="m5-diaphragm" d="M146 520 C246 575 514 575 614 520"/>
        </g>
        <g className="m5-alveoli-cluster">
          {[0,1,2,3,4,5,6].map((n)=><circle key={n} cx={560 + (n%3)*24 - Math.floor(n/3)*11} cy={415 + Math.floor(n/3)*25} r="18"/>)}
          <path className="m5-capillary-loop" d="M520 390 C620 365 644 465 552 492 C486 511 470 420 520 390"/>
          <circle className="m5-o2-dot dot-1" cx="548" cy="410" r="7"/><circle className="m5-o2-dot dot-2" cx="585" cy="430" r="7"/><circle className="m5-co2-dot dot-3" cx="610" cy="470" r="7"/>
          <text x="520" y="355">Gas exchange</text>
        </g>
        <g className={`m5-lung-node ${nodeClass("trachea")}`} style={{"--node-color":"#0ea5e9"}} onClick={()=>onSelect("trachea")} tabIndex="0" role="button"><circle cx="380" cy="110" r="18"/><text x="420" y="116">Trachea</text></g>
        <g className={`m5-lung-node ${nodeClass("bronchi")}`} style={{"--node-color":"#0284c7"}} onClick={()=>onSelect("bronchi")} tabIndex="0" role="button"><circle cx="380" cy="235" r="18"/><text x="420" y="242">Bronchi</text></g>
        <g className={`m5-lung-node ${nodeClass("alveoli")}`} style={{"--node-color":"#8b5cf6"}} onClick={()=>onSelect("alveoli")} tabIndex="0" role="button"><circle cx="586" cy="414" r="18"/><text x="620" y="420">Alveoli</text></g>
        <g className={`m5-lung-node ${nodeClass("capillaries")}`} style={{"--node-color":"#ef4444"}} onClick={()=>onSelect("capillaries")} tabIndex="0" role="button"><circle cx="520" cy="478" r="18"/><text x="555" y="505">Capillaries</text></g>
        <g className={`m5-lung-node ${nodeClass("diaphragm")}`} style={{"--node-color":"#f59e0b"}} onClick={()=>onSelect("diaphragm")} tabIndex="0" role="button"><circle cx="380" cy="552" r="18"/><text x="420" y="560">Diaphragm</text></g>
        <g className="m5-air-arrows"><path d="M380 42 V92"/><path d="M380 150 V205"/><path d="M355 245 L300 300"/><path d="M405 245 L460 300"/></g>
      </svg>
      <div className="m5-respiratory-monitor"><div><span>SpO₂</span><strong>98%</strong><svg viewBox="0 0 340 70" preserveAspectRatio="none"><path d="M0 48 C20 10 42 10 62 48 S104 86 124 48 S166 10 186 48 S228 86 248 48 S290 10 310 48 L340 48"/></svg></div><div><span>ETCO₂</span><strong>38</strong><svg viewBox="0 0 340 70" preserveAspectRatio="none"><path d="M0 55 L45 55 L55 18 L205 18 L220 55 L340 55"/></svg></div></div>
    </div>
  );
}


const MISSION_FIVE_CIRCULATION = [
  { id: "rightheart", label: "Right Heart", color: "#2563eb", location: "Right atrium and right ventricle", purpose: "Receives systemic venous blood and pumps it toward the lungs.", equipment: "Central venous pressure, ECG, and hemodynamic measurements must be interpreted within the complete circulation pathway.", challenge: "Which side of the heart sends deoxygenated blood toward the lungs?", options: ["Right heart", "Left heart", "Aorta", "Pulmonary veins"], answer: 0 },
  { id: "lungs", label: "Pulmonary Circulation", color: "#06b6d4", location: "Between the right heart, lungs, and left heart", purpose: "Moves blood through the lungs for gas exchange before returning it to the left heart.", equipment: "SpO₂ can look normal only when ventilation, diffusion, perfusion, and sensor acquisition all support the measurement.", challenge: "What is the main purpose of pulmonary circulation?", options: ["Filter urine", "Exchange oxygen and carbon dioxide", "Create ECG voltage", "Measure temperature"], answer: 1 },
  { id: "leftheart", label: "Left Heart", color: "#ef4444", location: "Left atrium and left ventricle", purpose: "Receives oxygenated blood from the lungs and pumps it into systemic circulation.", equipment: "Arterial pressure and pulse-derived measurements reflect the mechanical output that follows electrical activation.", challenge: "Which chamber generates most of the pressure for systemic circulation?", options: ["Right atrium", "Left ventricle", "Pulmonary artery", "Vena cava"], answer: 1 },
  { id: "arteries", label: "Systemic Arteries", color: "#dc2626", location: "Vessels carrying blood away from the left ventricle", purpose: "Distribute oxygenated blood under pressure to tissues throughout the body.", equipment: "NIBP cuffs estimate arterial pressure, while invasive arterial lines directly transmit pressure from an artery to a transducer.", challenge: "Which vessels carry blood away from the heart under the highest systemic pressure?", options: ["Veins", "Lymphatics", "Arteries", "Capillaries"], answer: 2 },
  { id: "veins", label: "Systemic Veins", color: "#7c3aed", location: "Low-pressure vessels returning blood to the right heart", purpose: "Return deoxygenated blood from tissues and act as a major blood-volume reservoir.", equipment: "Venous pressure and volume status can change without producing the same waveform or pressure seen in an artery.", challenge: "Which vessels return systemic blood to the right side of the heart?", options: ["Veins", "Aorta", "Pulmonary arteries only", "Coronary arteries"], answer: 0 },
];

function MissionFiveCirculationGraphic({ activeId, explored, onSelect, flowing = true }) {
  const nodeClass = (id) => `${activeId === id ? "active" : ""} ${explored.includes(id) ? "explored" : ""}`;
  return (
    <div className={`m5-circulation-graphic ${flowing ? "is-flowing" : ""}`}>
      <svg viewBox="0 0 820 650" role="img" aria-label="Original educational circulation diagram showing heart, lungs, arteries, veins, blood pressure cuff, arterial line, and pulse oximeter">
        <defs>
          <linearGradient id="m5-circ-heart" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#fb7185"/><stop offset="1" stopColor="#b91c1c"/></linearGradient>
          <filter id="m5-circ-shadow" x="-30%" y="-30%" width="170%" height="180%"><feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#172554" floodOpacity=".2"/></filter>
          <filter id="m5-circ-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <g filter="url(#m5-circ-shadow)">
          <path className="m5-circ-lung left" d="M280 115 C220 95 170 130 158 210 C145 294 183 355 267 369 C291 310 302 210 280 115Z"/>
          <path className="m5-circ-lung right" d="M540 115 C600 95 650 130 662 210 C675 294 637 355 553 369 C529 310 518 210 540 115Z"/>
          <path className="m5-circ-heart" d="M407 430 C362 391 321 350 328 294 C335 238 387 220 410 261 C433 220 485 238 492 294 C499 350 458 391 413 430Z"/>
          <path className="m5-circ-red-path" d="M430 302 C506 262 550 239 574 226 C650 186 733 222 742 318 C752 421 682 483 594 500 C508 518 456 541 422 590"/>
          <path className="m5-circ-blue-path" d="M390 302 C314 262 270 239 246 226 C170 186 87 222 78 318 C68 421 138 483 226 500 C312 518 364 541 398 590"/>
          <path className="m5-circ-pulmonary-red" d="M424 280 C472 244 520 220 565 210"/>
          <path className="m5-circ-pulmonary-blue" d="M396 280 C348 244 300 220 255 210"/>
        </g>
        <g className="m5-circ-particles red">{[0,1,2,3,4].map(n=><circle key={n} cx={430+n*58} cy={303+n*48} r="8" style={{"--delay":`${n*.28}s`}}/>)}</g>
        <g className="m5-circ-particles blue">{[0,1,2,3,4].map(n=><circle key={n} cx={390-n*58} cy={303+n*48} r="8" style={{"--delay":`${n*.28}s`}}/>)}</g>
        <g className="m5-circ-device m5-cuff"><rect x="615" y="390" width="105" height="72" rx="20"/><text x="667" y="420">NIBP</text><text x="667" y="446">120/80</text></g>
        <g className="m5-circ-device m5-artline"><path d="M554 480 L638 530"/><circle cx="638" cy="530" r="17"/><text x="655" y="536">IBP</text></g>
        <g className="m5-circ-device m5-spo2"><rect x="84" y="390" width="108" height="68" rx="18"/><text x="138" y="420">SpO₂</text><text x="138" y="446">98%</text></g>
        <g className={`m5-circ-node ${nodeClass("rightheart")}`} style={{"--node-color":"#2563eb"}} onClick={()=>onSelect("rightheart")} tabIndex="0" role="button"><circle cx="380" cy="320" r="19"/><text x="270" y="328">Right Heart</text></g>
        <g className={`m5-circ-node ${nodeClass("lungs")}`} style={{"--node-color":"#06b6d4"}} onClick={()=>onSelect("lungs")} tabIndex="0" role="button"><circle cx="410" cy="175" r="19"/><text x="330" y="145">Pulmonary Circulation</text></g>
        <g className={`m5-circ-node ${nodeClass("leftheart")}`} style={{"--node-color":"#ef4444"}} onClick={()=>onSelect("leftheart")} tabIndex="0" role="button"><circle cx="440" cy="320" r="19"/><text x="462" y="328">Left Heart</text></g>
        <g className={`m5-circ-node ${nodeClass("arteries")}`} style={{"--node-color":"#dc2626"}} onClick={()=>onSelect("arteries")} tabIndex="0" role="button"><circle cx="610" cy="490" r="19"/><text x="630" y="486">Systemic Arteries</text></g>
        <g className={`m5-circ-node ${nodeClass("veins")}`} style={{"--node-color":"#7c3aed"}} onClick={()=>onSelect("veins")} tabIndex="0" role="button"><circle cx="210" cy="490" r="19"/><text x="45" y="486">Systemic Veins</text></g>
      </svg>
      <div className="m5-circulation-readouts"><div><span>NIBP</span><strong>120/80</strong><small>Estimated arterial pressure</small></div><div><span>IBP</span><strong>118/76</strong><small>Direct arterial pressure</small></div><div><span>SpO₂</span><strong>98%</strong><small>Pulse-derived oxygen saturation</small></div></div>
    </div>
  );
}



const MISSION_FIVE_NEURO = [
  { id: "frontal", label: "Frontal Lobe", color: "#2563eb", location: "Front of the cerebrum", purpose: "Supports planning, voluntary movement, attention, speech production, and executive function.", equipment: "EEG channels over frontal regions can be strongly affected by eye movement, facial muscle activity, and poor electrode contact.", challenge: "Which lobe is most associated with executive function and voluntary motor planning?", options: ["Frontal lobe", "Occipital lobe", "Cerebellum", "Brainstem"], answer: 0 },
  { id: "parietal", label: "Parietal Lobe", color: "#7c3aed", location: "Upper rear portion of the cerebrum", purpose: "Integrates touch, body position, and spatial information.", equipment: "Electrode placement must be reproducible because channel location determines which cortical region contributes most strongly to the recorded signal.", challenge: "Which lobe primarily integrates somatic sensation and spatial awareness?", options: ["Temporal lobe", "Parietal lobe", "Medulla", "Cerebellum"], answer: 1 },
  { id: "temporal", label: "Temporal Lobe", color: "#db2777", location: "Lateral sides of the brain near the ears", purpose: "Supports auditory processing, memory, and language comprehension.", equipment: "Temporal electrodes may be vulnerable to jaw-muscle artifact and cable movement near the ears.", challenge: "Which lobe is closely associated with hearing and memory?", options: ["Temporal lobe", "Frontal lobe", "Occipital lobe", "Brainstem"], answer: 0 },
  { id: "occipital", label: "Occipital Lobe", color: "#f59e0b", location: "Back of the cerebrum", purpose: "Processes visual information.", equipment: "Occipital EEG rhythms often change when the eyes open or close, which helps demonstrate that the signal is physiologic rather than a fixed electronic pattern.", challenge: "Which lobe is the primary visual-processing region?", options: ["Parietal lobe", "Occipital lobe", "Temporal lobe", "Cerebellum"], answer: 1 },
  { id: "brainstem", label: "Brainstem", color: "#16a34a", location: "Base of the brain connecting to the spinal cord", purpose: "Supports vital autonomic functions and major ascending and descending pathways.", equipment: "Surface EEG mainly reflects cortical activity; absence of a visible surface rhythm does not directly measure every deeper brain function.", challenge: "Which structure connects the brain to the spinal cord and supports vital autonomic functions?", options: ["Brainstem", "Occipital lobe", "Corpus callosum", "Parietal lobe"], answer: 0 },
];

function MissionFiveBrainGraphic({ activeId, explored, onSelect, signalMode = "alpha" }) {
  const nodeClass = (id) => `${activeId === id ? "active" : ""} ${explored.includes(id) ? "explored" : ""}`;
  return (
    <div className={`m5-brain-graphic mode-${signalMode}`}>
      <svg viewBox="0 0 780 650" role="img" aria-label="Original educational brain and EEG illustration">
        <defs>
          <linearGradient id="m5-brain-fill" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#f0abfc"/><stop offset=".55" stopColor="#c084fc"/><stop offset="1" stopColor="#7c3aed"/></linearGradient>
          <filter id="m5-brain-shadow" x="-30%" y="-30%" width="170%" height="180%"><feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#312e81" floodOpacity=".22"/></filter>
          <filter id="m5-brain-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <g filter="url(#m5-brain-shadow)">
          <path className="m5-brain-base" d="M174 326 C143 251 181 171 253 147 C284 90 369 77 421 114 C487 91 560 133 574 198 C632 226 645 307 610 355 C629 422 575 480 514 483 C480 529 411 541 362 510 C305 541 229 513 213 457 C159 430 139 371 174 326 Z"/>
          <path className="m5-brain-fold" d="M240 188 C282 170 315 188 332 221 M344 146 C373 176 374 206 355 235 M430 144 C405 179 410 211 439 238 M499 177 C463 190 449 219 456 251 M211 274 C254 250 295 263 313 295 M349 266 C376 237 421 242 446 275 M482 270 C528 244 568 273 571 312 M199 352 C251 324 291 345 311 383 M346 330 C385 303 430 322 447 359 M487 356 C531 325 571 357 568 398 M245 428 C286 398 325 418 337 454 M394 410 C430 387 471 407 481 447"/>
          <path className="m5-brainstem-shape" d="M371 470 C389 484 418 489 438 477 C431 514 445 552 466 584 L401 584 C385 550 367 513 371 470 Z"/>
          <path className="m5-cerebellum" d="M472 421 C531 396 590 426 590 475 C590 521 531 543 479 515 C454 501 450 445 472 421 Z"/>
        </g>
        <g className="m5-scalp-electrodes">
          {[230,310,390,470,550].map((x,i)=><g key={x}><circle cx={x} cy={122+(i%2)*8} r="12"/><path d={`M${x} ${134+(i%2)*8} C${x} 160 ${390+(i-2)*18} 170 390 194`}/></g>)}
          <rect x="335" y="178" width="110" height="48" rx="12"/><text x="390" y="208">EEG INPUT</text>
        </g>
        <g className={`m5-brain-node ${nodeClass("frontal")}`} style={{"--node-color":"#2563eb"}} onClick={()=>onSelect("frontal")} tabIndex="0" role="button"><circle cx="225" cy="270" r="20"/><text x="102" y="264">Frontal Lobe</text></g>
        <g className={`m5-brain-node ${nodeClass("parietal")}`} style={{"--node-color":"#7c3aed"}} onClick={()=>onSelect("parietal")} tabIndex="0" role="button"><circle cx="389" cy="250" r="20"/><text x="365" y="218">Parietal Lobe</text></g>
        <g className={`m5-brain-node ${nodeClass("temporal")}`} style={{"--node-color":"#db2777"}} onClick={()=>onSelect("temporal")} tabIndex="0" role="button"><circle cx="326" cy="403" r="20"/><text x="205" y="410">Temporal Lobe</text></g>
        <g className={`m5-brain-node ${nodeClass("occipital")}`} style={{"--node-color":"#f59e0b"}} onClick={()=>onSelect("occipital")} tabIndex="0" role="button"><circle cx="535" cy="330" r="20"/><text x="557" y="335">Occipital Lobe</text></g>
        <g className={`m5-brain-node ${nodeClass("brainstem")}`} style={{"--node-color":"#16a34a"}} onClick={()=>onSelect("brainstem")} tabIndex="0" role="button"><circle cx="416" cy="522" r="20"/><text x="438" y="530">Brainstem</text></g>
      </svg>
      <div className="m5-eeg-monitor"><div><span>EEG</span><strong>{signalMode === "artifact" ? "ARTIFACT" : signalMode === "beta" ? "BETA" : "ALPHA"}</strong></div><svg viewBox="0 0 900 130" preserveAspectRatio="none"><path className="m5-eeg-trace alpha" d="M0 68 C18 28 36 108 54 68 S90 28 108 68 S144 108 162 68 S198 28 216 68 S252 108 270 68 S306 28 324 68 S360 108 378 68 S414 28 432 68 S468 108 486 68 S522 28 540 68 S576 108 594 68 S630 28 648 68 S684 108 702 68 S738 28 756 68 S792 108 810 68 S846 28 864 68 S900 108 918 68"/><path className="m5-eeg-trace artifact" d="M0 70 L90 70 L110 20 L125 118 L145 30 L165 108 L190 70 L310 70 L340 36 L360 104 L380 40 L405 96 L430 70 L900 70"/></svg><small>Surface electrodes detect microvolt-level voltage differences</small></div>
    </div>
  );
}

const MISSION_FIVE_OXYGEN=[
{id:"alveoli",label:"Alveoli",color:"#8b5cf6",purpose:"Oxygen diffuses from alveolar gas into pulmonary blood.",challenge:"Where does oxygen cross into pulmonary blood?",options:["Alveoli","Aorta","Finger sensor"],answer:0},
{id:"hemoglobin",label:"Hemoglobin",color:"#dc2626",purpose:"Hemoglobin inside red blood cells carries most blood oxygen.",challenge:"What carries most oxygen in blood?",options:["Platelets","Hemoglobin","Sodium"],answer:1},
{id:"pulse",label:"Arterial Pulse",color:"#ef4444",purpose:"Pulsatile arterial blood creates the changing optical signal.",challenge:"What lets pulse oximetry isolate arterial blood?",options:["Arterial pulse","NIBP inflation","ECG voltage"],answer:0},
{id:"sensor",label:"Finger Sensor",color:"#0ea5e9",purpose:"Red and infrared emitters shine through perfused tissue to a photodetector.",challenge:"What receives the transmitted light?",options:["ECG electrode","Photodetector","Pressure transducer"],answer:1},
{id:"display",label:"SpO₂ & Pleth",color:"#0284c7",purpose:"Processing converts pulsatile red/infrared absorption into an SpO₂ estimate and pleth.",challenge:"What supports confidence in the SpO₂ number?",options:["Pleth quality and pulse agreement","Screen brightness","NIBP cuff size"],answer:0}
];
function MissionFiveOxygenGraphic({activeId,explored,onSelect,running}){
return <div className={`m5-o2-art ${running?"running":""}`}><svg viewBox="0 0 760 560" role="img" aria-label="Original oxygen transport and pulse oximetry illustration">
<defs><linearGradient id="o2f" x1="0" x2="1"><stop stopColor="#fed7aa"/><stop offset="1" stopColor="#fdba74"/></linearGradient></defs>
<g className="o2-alveoli">{[0,1,2,3,4,5].map(n=><circle key={n} cx={105+(n%3)*38} cy={155+Math.floor(n/3)*42} r="27"/>)}</g>
<path className="o2-blood" d="M180 205 C275 220 305 320 445 320"/>
<g className="o2-rbc">{[0,1,2,3].map(n=><ellipse key={n} style={{"--d":`${n*.35}s`}} cx={225+n*65} cy={255+(n%2)*32} rx="25" ry="15"/>)}</g>
<rect className="o2-finger" x="445" y="190" width="240" height="110" rx="55"/><rect className="o2-clip" x="470" y="155" width="185" height="48" rx="17"/><rect className="o2-clip" x="470" y="290" width="185" height="48" rx="17"/>
<circle className="o2-red" cx="520" cy="180" r="12"/><circle className="o2-ir" cx="575" cy="180" r="12"/><path className="o2-red-beam" d="M520 195V292"/><path className="o2-ir-beam" d="M575 195V292"/><rect className="o2-photo" x="530" y="300" width="55" height="20" rx="7"/>
<g className="o2-monitor"><rect x="400" y="385" width="315" height="135" rx="22"/><text x="430" y="430">SpO₂</text><text className="o2-value" x="680" y="435">98%</text><path d="M430 480 C450 440 475 440 495 480 S535 520 555 480 S595 440 615 480 S655 520 685 470"/></g>
{MISSION_FIVE_OXYGEN.map((x,i)=>{const pos=[[100,120],[290,285],[410,320],[680,245],[420,405]][i];return <g key={x.id} className={`o2-node ${activeId===x.id?"active":""} ${explored.includes(x.id)?"done":""}`} onClick={()=>onSelect(x.id)}><circle cx={pos[0]} cy={pos[1]} r="18" fill={x.color}/><text x={pos[0]+24} y={pos[1]+6}>{x.label}</text></g>})}
</svg></div>}

const MISSION_FIVE_KIDNEY = [
  { id:"glomerulus", label:"Glomerulus", color:"#7c3aed", purpose:"Filters water and small solutes from blood into the nephron while retaining cells and most proteins.", challenge:"Which structure performs the initial filtration step?", options:["Glomerulus","Ureter","Bladder"], answer:0 },
  { id:"tubule", label:"Renal Tubule", color:"#0ea5e9", purpose:"Reabsorbs needed water and solutes and secretes selected substances before urine leaves the nephron.", challenge:"Where are useful water and solutes largely reclaimed?", options:["Renal tubule","Aorta","Dialysate drain"], answer:0 },
  { id:"dialyzer", label:"Dialyzer", color:"#dc2626", purpose:"Uses a semipermeable membrane to separate blood from dialysate while waste and water move across the membrane.", challenge:"What separates blood from dialysate?", options:["Semipermeable membrane","ECG electrode","Air detector"], answer:0 },
  { id:"bloodpump", label:"Blood Pump", color:"#f97316", purpose:"Moves blood through the extracorporeal circuit at the prescribed flow rate.", challenge:"Which component drives blood through the extracorporeal circuit?", options:["Blood pump","Venous clamp","Conductivity sensor"], answer:0 },
  { id:"airdetector", label:"Air Detector", color:"#14b8a6", purpose:"Monitors the venous return line for air before blood returns to the patient.", challenge:"Where is air monitored before blood returns to the patient?", options:["Venous return path","Dialysate drain","NIBP cuff"], answer:0 },
];

function MissionFiveKidneyGraphic({ activeId, explored, onSelect, running=true }) {
  const node = id => `${activeId===id?"active":""} ${explored.includes(id)?"done":""}`;
  return <div className={`m5-kidney-art ${running?"running":""}`}>
    <svg viewBox="0 0 860 650" role="img" aria-label="Original educational illustration of kidneys, nephron filtration, and a hemodialysis circuit">
      <defs>
        <linearGradient id="kidneyFill" x1="0" x2="1"><stop stopColor="#fb7185"/><stop offset="1" stopColor="#be123c"/></linearGradient>
        <linearGradient id="dialyzerFill" x1="0" x2="1"><stop stopColor="#fee2e2"/><stop offset="1" stopColor="#fecaca"/></linearGradient>
      </defs>
      <g className="kidney-body">
        <path d="M90 120C40 145 42 268 95 318C137 359 191 322 194 260C197 195 164 92 90 120Z"/>
        <path d="M250 120C300 145 298 268 245 318C203 359 149 322 146 260C143 195 176 92 250 120Z" transform="translate(160 0)"/>
        <path className="kidney-ureter" d="M165 280C170 345 160 385 160 430M335 280C330 345 340 385 340 430"/>
        <ellipse className="kidney-bladder" cx="250" cy="470" rx="58" ry="38"/>
      </g>
      <g className="nephron">
        <circle className="nephron-glom" cx="120" cy="420" r="42"/>
        <path className="nephron-tubule" d="M155 420C220 390 215 470 275 445C330 420 315 500 365 465"/>
        <path className="nephron-filtrate" d="M125 420C205 415 240 455 360 465"/>
      </g>
      <g className="dialysis-circuit">
        <rect className="dialysis-machine" x="480" y="75" width="300" height="460" rx="28"/>
        <rect className="dialysis-screen" x="520" y="110" width="220" height="90" rx="12"/>
        <text x="545" y="150">BLOOD FLOW</text><text className="dialysis-value" x="710" y="170">300</text>
        <circle className="blood-pump" cx="560" cy="275" r="52"/>
        <path className="blood-line arterial" d="M470 470C430 470 420 380 485 330C520 305 525 300 530 290"/>
        <rect className="dialyzer" x="625" y="225" width="72" height="190" rx="34"/>
        <path className="dialyzer-membrane" d="M645 245V395M677 245V395"/>
        <path className="blood-line venous" d="M665 415C690 470 630 520 570 515C505 510 470 500 455 470"/>
        <path className="dialysate-line" d="M700 245C760 250 760 390 700 395"/>
        <circle className="air-detector" cx="560" cy="500" r="24"/>
        <rect className="venous-clamp" x="595" y="485" width="42" height="30" rx="8"/>
      </g>
      <g className="waste-particles">{[0,1,2,3,4].map(n=><circle key={n} style={{"--d":`${n*.4}s`}} cx={650+(n%2)*22} cy={255+n*28} r="7"/>)}</g>
      {[
        ["glomerulus",120,420,"Glomerulus","#7c3aed"],
        ["tubule",300,450,"Renal Tubule","#0ea5e9"],
        ["bloodpump",560,275,"Blood Pump","#f97316"],
        ["dialyzer",662,320,"Dialyzer","#dc2626"],
        ["airdetector",560,500,"Air Detector","#14b8a6"],
      ].map(([id,x,y,label,color])=><g key={id} className={`kidney-node ${node(id)}`} onClick={()=>onSelect(id)}><circle cx={x} cy={y} r="20" fill={color}/><text x={x+28} y={y+6}>{label}</text></g>)}
    </svg>
  </div>;
}

const MISSION_FIVE_TEMPERATURE = [
  { id:"receptors", label:"Temperature Receptors", color:"#f59e0b", purpose:"Detect changes in skin and core temperature and send information to the central control system.", challenge:"What detects a change in body temperature first?", options:["Temperature receptors","NIBP cuff","Blood pump"], answer:0 },
  { id:"hypothalamus", label:"Hypothalamus", color:"#8b5cf6", purpose:"Compares temperature input with the body's target range and coordinates corrective responses.", challenge:"Which structure acts as the body's temperature-control center?", options:["Hypothalamus","Left ventricle","Kidney"], answer:0 },
  { id:"cold", label:"Cold Response", color:"#2563eb", purpose:"Vasoconstriction and shivering reduce heat loss and increase heat production.", challenge:"Which response helps conserve heat?", options:["Vasoconstriction","Sweating","Vasodilation"], answer:0 },
  { id:"hot", label:"Heat Response", color:"#dc2626", purpose:"Vasodilation and sweating increase heat transfer away from the body.", challenge:"Which response promotes heat loss?", options:["Sweating and vasodilation","Shivering","Peripheral vasoconstriction"], answer:0 },
  { id:"probe", label:"Temperature Probe", color:"#7c3f12", purpose:"Measures temperature at a specific site; the value depends on probe type, placement, contact, and site.", challenge:"Why can two temperature readings differ?", options:["Different sites and probe types","Screen size","Battery color"], answer:0 },
];

function MissionFiveTemperatureGraphic({ activeId, explored, onSelect, mode="normal" }) {
  const node = id => `${activeId===id?"active":""} ${explored.includes(id)?"done":""}`;
  const temp = mode==="cold" ? "34.2°C" : mode==="hot" ? "39.4°C" : "37.0°C";
  return <div className={`m5-temp-art mode-${mode}`}>
    <svg viewBox="0 0 820 620" role="img" aria-label="Original educational illustration of human temperature regulation and clinical temperature monitoring">
      <defs>
        <linearGradient id="bodyTempFill" x1="0" x2="1"><stop stopColor="#fde68a"/><stop offset="1" stopColor="#fdba74"/></linearGradient>
        <linearGradient id="tempMonitorFill" x1="0" x2="1"><stop stopColor="#0f172a"/><stop offset="1" stopColor="#111827"/></linearGradient>
      </defs>
      <g className="temp-body">
        <circle cx="225" cy="105" r="55"/>
        <path d="M170 165C150 225 150 335 178 420L150 545H198L225 425L252 545H300L272 420C300 335 300 225 280 165Z"/>
        <path className="temp-arm" d="M175 195L90 300M275 195L360 300"/>
        <circle className="temp-brain" cx="225" cy="103" r="22"/>
        <path className="temp-skin" d="M174 168C152 236 153 338 181 416M276 168C298 236 297 338 269 416"/>
      </g>
      <g className="temp-effects">
        {mode==="cold" && <>{[0,1,2,3].map(n=><path key={n} className="cold-shiver" style={{"--d":`${n*.15}s`}} d={`M${135+n*42} 250l10-12 10 12 10-12`}/>)}</>}
        {mode==="hot" && <>{[0,1,2,3,4].map(n=><path key={n} className="heat-drop" style={{"--d":`${n*.18}s`}} d={`M${120+n*48} 250C${115+n*48} 270 ${130+n*48} 278 ${125+n*48} 292`}/>)}</>}
      </g>
      <g className="temp-probe">
        <path d="M360 300C430 290 445 345 485 350"/>
        <rect x="470" y="330" width="62" height="42" rx="14"/>
        <circle cx="500" cy="351" r="10"/>
      </g>
      <g className="temp-monitor">
        <rect x="500" y="100" width="260" height="220" rx="26"/>
        <text x="535" y="150">TEMP</text>
        <text className="temp-value" x="720" y="215">{temp}</text>
        <path d="M535 270H710"/>
      </g>
      <g className="temp-loop">
        <path d="M225 103C370 40 500 55 560 105"/>
        <path d="M560 315C490 430 360 480 225 425"/>
      </g>
      {[
        ["receptors",180,190,"Receptors","#f59e0b"],
        ["hypothalamus",225,103,"Hypothalamus","#8b5cf6"],
        ["cold",140,360,"Cold Response","#2563eb"],
        ["hot",300,360,"Heat Response","#dc2626"],
        ["probe",500,350,"Temp Probe","#7c3f12"],
      ].map(([id,x,y,label,color])=><g key={id} className={`temp-node ${node(id)}`} onClick={()=>onSelect(id)}><circle cx={x} cy={y} r="19" fill={color}/><text x={x+26} y={y+6}>{label}</text></g>)}
    </svg>
  </div>;
}

const MISSION_FIVE_SYSTEMS = [
  { id:"ecg", label:"ECG", color:"#00B050", source:"Cardiac electrical activity", chain:"Patient → electrodes → lead wires → ECG input → displayed waveform", fault:"Loose or dry electrodes, damaged leads, motion, muscle artifact, electrical interference." },
  { id:"spo2", label:"SpO₂", color:"#0096FF", source:"Pulsatile optical absorption", chain:"Patient → sensor → cable → SpO₂ input → pleth and saturation", fault:"Poor perfusion, motion, sensor alignment, ambient light, cable damage, wrong site." },
  { id:"nibp", label:"NIBP", color:"#222222", source:"Oscillations in cuff pressure", chain:"Patient → cuff → hose → pump/valves/transducer → displayed pressure", fault:"Wrong cuff size, leaks, kinks, movement, loose hose, valve or pump problems." },
  { id:"ibp", label:"IBP", color:"#D32F2F", source:"Fluid-coupled pressure waveform", chain:"Patient → catheter → tubing/stopcocks → transducer → IBP input → waveform", fault:"Air, clots, damping, leveling, zeroing, stopcock position, loose connection." },
  { id:"temp", label:"Temperature", color:"#8D6E63", source:"Probe-dependent thermal measurement", chain:"Patient → probe → cable → temperature input → displayed value", fault:"Wrong probe, poor contact, incompatible input, damaged cable, wrong site." },
];

function MissionFiveSystemsGraphic({ activeId, onSelect, faultMode }) {
  const active = MISSION_FIVE_SYSTEMS.find(x=>x.id===activeId) || MISSION_FIVE_SYSTEMS[0];
  const values = faultMode==="spo2"
    ? {ecg:"84",spo2:"73",nibp:"122/76",ibp:"118/72",temp:"37.0"}
    : faultMode==="ibp"
    ? {ecg:"82",spo2:"98",nibp:"120/74",ibp:"48/22",temp:"37.1"}
    : {ecg:"82",spo2:"98",nibp:"120/74",ibp:"118/70",temp:"37.0"};
  return <div className="m5-systems-art">
    <svg viewBox="0 0 900 620" role="img" aria-label="Original bedside systems integration illustration with ECG, SpO2, NIBP, IBP and temperature signal chains">
      <defs><linearGradient id="sysMon" x1="0" x2="1"><stop stopColor="#0f172a"/><stop offset="1" stopColor="#111827"/></linearGradient></defs>
      <g className="sys-patient"><circle cx="170" cy="120" r="48"/><path d="M140 170C120 255 125 370 160 470H230C265 370 270 255 250 170Z"/><path d="M145 210L65 320M245 210L325 320"/><path d="M165 470L140 570M225 470L250 570"/></g>
      <g className="sys-monitor"><rect x="420" y="70" width="410" height="430" rx="28" fill="url(#sysMon)"/><rect x="455" y="105" width="340" height="300" rx="14"/>
      <text x="485" y="145" fill="#00B050">ECG</text><text className="sys-value" x="760" y="145" fill="#00B050">{values.ecg}</text><path className="wave ecg" d="M485 175L525 175L540 150L555 200L575 175L630 175L645 150L660 200L680 175L740 175"/>
      <text x="485" y="230" fill="#0096FF">SpO₂</text><text className="sys-value" x="760" y="230" fill="#0096FF">{values.spo2}%</text><path className="wave spo2" d="M485 260C505 220 525 220 545 260S585 300 605 260S645 220 665 260S705 300 735 250"/>
      <text x="485" y="320" fill="#fff">NIBP</text><text className="sys-value small" x="760" y="320" fill="#fff">{values.nibp}</text>
      <text x="485" y="370" fill="#D32F2F">IBP</text><text className="sys-value small" x="760" y="370" fill="#D32F2F">{values.ibp}</text>
      <text x="485" y="420" fill="#8D6E63">TEMP</text><text className="sys-value small" x="760" y="420" fill="#8D6E63">{values.temp}°C</text>
      </g>
      <g className="sys-lines">
        <path className="line ecg" d="M175 190C260 170 340 130 430 130"/>
        <path className="line spo2" d="M70 320C245 340 330 235 430 235"/>
        <path className="line nibp" d="M315 320C355 320 380 315 430 315"/>
        <path className="line ibp" d="M240 290C320 295 360 365 430 365"/>
        <path className="line temp" d="M200 420C300 425 360 415 430 415"/>
      </g>
      {MISSION_FIVE_SYSTEMS.map((x,i)=>{const pos=[[175,190],[70,320],[315,320],[240,290],[200,420]][i];return <g key={x.id} className={`sys-node ${activeId===x.id?"active":""}`} onClick={()=>onSelect(x.id)}><circle cx={pos[0]} cy={pos[1]} r="19" fill={x.color}/><text x={pos[0]+26} y={pos[1]+6}>{x.label}</text></g>})}
      <g className="sys-active-panel"><rect x="430" y="520" width="400" height="72" rx="18" fill={active.color}/><text x="455" y="548">{active.label}: {active.source}</text><text x="455" y="575">{active.chain}</text></g>
    </svg>
  </div>;
}

function MissionFive({ onExit, developerUnlockAll = false }) {
  const moduleNumber = 5;
  const saved = getMissionProgress(moduleNumber);
  const savedCompleted = saved.completedLessons || [];
  const [phase, setPhase] = useState(saved.phase && saved.phase !== "complete" ? saved.phase : "briefing");
  const [lessonIndex, setLessonIndex] = useState(Math.min(Number.isInteger(saved.lessonIndex) ? saved.lessonIndex : 0, 7));
  const [activeId, setActiveId] = useState("sa");
  const [explored, setExplored] = useState(saved.m5Explored || []);
  const [signalStep, setSignalStep] = useState(-1);
  const [pathOrder, setPathOrder] = useState([]);
  const [pathFeedback, setPathFeedback] = useState("");
  const [serviceAnswer, setServiceAnswer] = useState(null);
  const [recognitionAnswer, setRecognitionAnswer] = useState(null);
  const [challengeAnswers, setChallengeAnswers] = useState({});
  const [lungActiveId, setLungActiveId] = useState("trachea");
  const [lungExplored, setLungExplored] = useState(saved.m5LungExplored || []);
  const [lungChallenges, setLungChallenges] = useState({});
  const [breathing, setBreathing] = useState(true);
  const [gasPath, setGasPath] = useState([]);
  const [gasFeedback, setGasFeedback] = useState("");
  const [lungServiceAnswer, setLungServiceAnswer] = useState(null);
  const [lungRecognition, setLungRecognition] = useState(null);
  const [circActiveId, setCircActiveId] = useState("rightheart");
  const [circExplored, setCircExplored] = useState(saved.m5CircExplored || []);
  const [circChallenges, setCircChallenges] = useState({});
  const [bloodFlowing, setBloodFlowing] = useState(true);
  const [bloodPath, setBloodPath] = useState([]);
  const [bloodFeedback, setBloodFeedback] = useState("");
  const [circServiceAnswer, setCircServiceAnswer] = useState(null);
  const [circRecognition, setCircRecognition] = useState(null);
  const [brainActiveId, setBrainActiveId] = useState("frontal");
  const [brainExplored, setBrainExplored] = useState(saved.m5BrainExplored || []);
  const [brainChallenges, setBrainChallenges] = useState({});
  const [eegMode, setEegMode] = useState("alpha");
  const [brainPath, setBrainPath] = useState([]);
  const [brainFeedback, setBrainFeedback] = useState("");
  const [brainServiceAnswer, setBrainServiceAnswer] = useState(null);
  const [brainRecognition, setBrainRecognition] = useState(null);
  const [oxygenActiveId,setOxygenActiveId]=useState("alveoli");
  const [oxygenExplored,setOxygenExplored]=useState(saved.m5OxygenExplored||[]);
  const [oxygenChecks,setOxygenChecks]=useState({});
  const [oxygenPath,setOxygenPath]=useState([]);
  const [oxygenService,setOxygenService]=useState(null);
  const [oxygenRecognition,setOxygenRecognition]=useState(null);
  const [oxygenRunning,setOxygenRunning]=useState(true);
  const [kidneyActiveId,setKidneyActiveId]=useState("glomerulus");
  const [kidneyExplored,setKidneyExplored]=useState(saved.m5KidneyExplored||[]);
  const [kidneyChecks,setKidneyChecks]=useState({});
  const [kidneyPath,setKidneyPath]=useState([]);
  const [kidneyService,setKidneyService]=useState(null);
  const [kidneyRecognition,setKidneyRecognition]=useState(null);
  const [kidneyRunning,setKidneyRunning]=useState(true);
  const [tempActiveId,setTempActiveId]=useState("receptors");
  const [tempExplored,setTempExplored]=useState(saved.m5TempExplored||[]);
  const [tempChecks,setTempChecks]=useState({});
  const [tempPath,setTempPath]=useState([]);
  const [tempService,setTempService]=useState(null);
  const [tempRecognition,setTempRecognition]=useState(null);
  const [tempMode,setTempMode]=useState("normal");
  const [systemsActiveId,setSystemsActiveId]=useState("ecg");
  const [systemsExplored,setSystemsExplored]=useState(saved.m5SystemsExplored||[]);
  const [systemsPath,setSystemsPath]=useState([]);
  const [systemsScenario,setSystemsScenario]=useState(null);
  const [systemsFault,setSystemsFault]=useState("normal");
  const [systemsRecognition,setSystemsRecognition]=useState(null);
  const [systemsPathFeedback,setSystemsPathFeedback]=useState("");
  const [completedLessons, setCompletedLessons] = useState(savedCompleted);
  const animationRef = useRef(null);

  const localUnlock = developerUnlockAll && isLocalAcademyHost();
  const completed = completedLessons.includes(0);
  const lungCompleted = completedLessons.includes(1);
  const active = MISSION_FIVE_CONDUCTION.find((item) => item.id === activeId) || MISSION_FIVE_CONDUCTION[0];
  const lungActive = MISSION_FIVE_RESPIRATORY.find((item) => item.id === lungActiveId) || MISSION_FIVE_RESPIRATORY[0];
  const circActive = MISSION_FIVE_CIRCULATION.find((item) => item.id === circActiveId) || MISSION_FIVE_CIRCULATION[0];
  const brainActive = MISSION_FIVE_NEURO.find((item) => item.id === brainActiveId) || MISSION_FIVE_NEURO[0];
  const allExplored = explored.length === MISSION_FIVE_CONDUCTION.length;
  const allChallenges = Object.keys(challengeAnswers).length === MISSION_FIVE_CONDUCTION.length && Object.values(challengeAnswers).every(Boolean);
  const pathComplete = pathOrder.length === MISSION_FIVE_CONDUCTION.length;
  const serviceCorrect = serviceAnswer === 1;
  const recognitionCorrect = recognitionAnswer === "av";
  const ready = allExplored && allChallenges && pathComplete && serviceCorrect && recognitionCorrect;
  const lungAllExplored = lungExplored.length === MISSION_FIVE_RESPIRATORY.length;
  const lungAllChallenges = Object.keys(lungChallenges).length === MISSION_FIVE_RESPIRATORY.length && Object.values(lungChallenges).every(Boolean);
  const gasPathComplete = gasPath.length === 5;
  const lungServiceCorrect = lungServiceAnswer === 1;
  const lungRecognitionCorrect = lungRecognition === "alveoli";
  const lungReady = lungAllExplored && lungAllChallenges && gasPathComplete && lungServiceCorrect && lungRecognitionCorrect;
  const circCompleted = completedLessons.includes(2);
  const circAllExplored = circExplored.length === MISSION_FIVE_CIRCULATION.length;
  const circAllChallenges = Object.keys(circChallenges).length === MISSION_FIVE_CIRCULATION.length && Object.values(circChallenges).every(Boolean);
  const bloodPathComplete = bloodPath.length === MISSION_FIVE_CIRCULATION.length;
  const circServiceCorrect = circServiceAnswer === 1;
  const circRecognitionCorrect = circRecognition === "arteries";
  const circReady = circAllExplored && circAllChallenges && bloodPathComplete && circServiceCorrect && circRecognitionCorrect;
  const brainCompleted = completedLessons.includes(3);
  const brainAllExplored = brainExplored.length === MISSION_FIVE_NEURO.length;
  const brainAllChallenges = Object.keys(brainChallenges).length === MISSION_FIVE_NEURO.length && Object.values(brainChallenges).every(Boolean);
  const brainPathComplete = brainPath.length === 4;
  const brainServiceCorrect = brainServiceAnswer === 1;
  const brainRecognitionCorrect = brainRecognition === "occipital";
  const brainReady = brainAllExplored && brainAllChallenges && brainPathComplete && brainServiceCorrect && brainRecognitionCorrect;
  const oxygenCompleted=completedLessons.includes(4);
  const oxygenActive=MISSION_FIVE_OXYGEN.find(x=>x.id===oxygenActiveId)||MISSION_FIVE_OXYGEN[0];
  const oxygenReady=oxygenExplored.length===5&&Object.values(oxygenChecks).filter(Boolean).length===5&&oxygenPath.length===5&&oxygenService===1&&oxygenRecognition==="sensor";
  const kidneyCompleted=completedLessons.includes(5);
  const kidneyActive=MISSION_FIVE_KIDNEY.find(x=>x.id===kidneyActiveId)||MISSION_FIVE_KIDNEY[0];
  const kidneyReady=kidneyExplored.length===5&&Object.values(kidneyChecks).filter(Boolean).length===5&&kidneyPath.length===7&&kidneyService===1&&kidneyRecognition==="dialyzer";
  const tempCompleted=completedLessons.includes(6);
  const tempActive=MISSION_FIVE_TEMPERATURE.find(x=>x.id===tempActiveId)||MISSION_FIVE_TEMPERATURE[0];
  const tempReady=tempExplored.length===5&&Object.values(tempChecks).filter(Boolean).length===5&&tempPath.length===4&&tempService===1&&tempRecognition==="probe";
  const systemsCompleted=completedLessons.includes(7);
  const systemsActive=MISSION_FIVE_SYSTEMS.find(x=>x.id===systemsActiveId)||MISSION_FIVE_SYSTEMS[0];
  const systemsReady=systemsExplored.length===5&&systemsPath.length===6&&systemsScenario===1&&systemsRecognition==="spo2";

  useEffect(() => () => { if (animationRef.current) window.clearInterval(animationRef.current); }, []);

  const persistLesson = (index, patch = {}) => saveMissionProgress(moduleNumber, { phase: "lessons", lessonIndex: index, completedLessons, ...patch });
  const openLesson = (index) => { if (index > 7 || (index === 1 && !completed && !localUnlock) || (index === 2 && !lungCompleted && !localUnlock) || (index === 3 && !circCompleted && !localUnlock) || (index === 4 && !brainCompleted && !localUnlock) || (index === 5 && !oxygenCompleted && !localUnlock) || (index === 6 && !kidneyCompleted && !localUnlock) || (index === 7 && !tempCompleted && !localUnlock)) return; setLessonIndex(index); setPhase("lessons"); persistLesson(index); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const selectStructure = (id) => { setActiveId(id); setExplored((current) => { const next=current.includes(id)?current:[...current,id]; saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:0,completedLessons,m5Explored:next}); return next; }); };
  const selectLungStructure = (id) => { setLungActiveId(id); setLungExplored((current) => { const next=current.includes(id)?current:[...current,id]; saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:1,completedLessons,m5LungExplored:next}); return next; }); };
  const selectCircStructure = (id) => { setCircActiveId(id); setCircExplored((current) => { const next=current.includes(id)?current:[...current,id]; saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:2,completedLessons,m5CircExplored:next}); return next; }); };
  const selectBrainStructure = (id) => { setBrainActiveId(id); setBrainExplored((current) => { const next=current.includes(id)?current:[...current,id]; saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:3,completedLessons,m5BrainExplored:next}); return next; }); };
  const runSignal = () => { if (animationRef.current) window.clearInterval(animationRef.current); let index=0; setSignalStep(0); setActiveId(MISSION_FIVE_CONDUCTION[0].id); animationRef.current=window.setInterval(()=>{index+=1;if(index>=MISSION_FIVE_CONDUCTION.length){window.clearInterval(animationRef.current);animationRef.current=null;window.setTimeout(()=>setSignalStep(-1),900);return;}setSignalStep(index);setActiveId(MISSION_FIVE_CONDUCTION[index].id);},850); };
  const addPathStep = (id) => { if(pathComplete)return;const expected=MISSION_FIVE_CONDUCTION[pathOrder.length].id;if(id!==expected){setPathFeedback(`Not yet. The next structure should receive the impulse after ${pathOrder.length?MISSION_FIVE_CONDUCTION[pathOrder.length-1].label:"the impulse begins"}.`);playCbetTone("wrong");return;}const next=[...pathOrder,id];setPathOrder(next);setPathFeedback(next.length===MISSION_FIVE_CONDUCTION.length?"Signal path complete — the ventricles can depolarize in a coordinated sequence.":"Correct. Choose the next structure.");playCbetTone("correct"); };
  const addGasStep = (id) => { const sequence=["trachea","bronchi","alveoli","capillaries","heart"]; if(gasPath.length===sequence.length)return; if(id!==sequence[gasPath.length]){setGasFeedback("Not yet. Follow inspired gas from the airway toward blood returning to the heart.");playCbetTone("wrong");return;}const next=[...gasPath,id];setGasPath(next);setGasFeedback(next.length===sequence.length?"Gas path complete — oxygen moved from inspired air into pulmonary blood returning to the heart.":"Correct. Continue the pathway.");playCbetTone("correct"); };
  const addBloodStep = (id) => { const sequence=["rightheart","lungs","leftheart","arteries","veins"]; if(bloodPath.length===sequence.length)return; if(id!==sequence[bloodPath.length]){setBloodFeedback("That step is out of sequence. Begin with venous blood entering the right heart, travel through the lungs, then follow systemic circulation.");playCbetTone("wrong");return;}const next=[...bloodPath,id];setBloodPath(next);setBloodFeedback(next.length===sequence.length?"Circulation pathway complete — blood returns to the right heart after moving through pulmonary and systemic circulation.":"Correct — choose the next step.");playCbetTone("correct"); };
  const addBrainStep = (id) => { const sequence=["cortex","electrodes","leadset","amplifier"]; if(brainPath.length===sequence.length)return; if(id!==sequence[brainPath.length]){setBrainFeedback("That step is out of sequence. Begin with cortical voltage, then follow the acquisition pathway to the EEG amplifier.");playCbetTone("wrong");return;}const next=[...brainPath,id];setBrainPath(next);setBrainFeedback(next.length===sequence.length?"EEG acquisition pathway complete — a tiny cortical voltage has become a displayed waveform.":"Correct — choose the next step.");playCbetTone("correct"); };
  const finishLesson = () => { if(!ready)return;const next=Array.from(new Set([...completedLessons,0]));saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:0,completedLessons:next,m5Explored:explored});awardCbetXp(50,"mission5-heart-ecg-explorer");setCompletedLessons(next); };
  const finishLungLesson = () => { if(!lungReady)return;const next=Array.from(new Set([...completedLessons,1]));saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:1,completedLessons:next,m5LungExplored:lungExplored});awardCbetXp(50,"mission5-lungs-ventilation-explorer");setCompletedLessons(next); };
  const finishCircLesson = () => { if(!circReady)return;const next=Array.from(new Set([...completedLessons,2]));saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:2,completedLessons:next,m5CircExplored:circExplored});awardCbetXp(50,"mission5-blood-pressure-circulation-explorer");setCompletedLessons(next); };
  const finishBrainLesson = () => { if(!brainReady)return;const next=Array.from(new Set([...completedLessons,3]));saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:3,completedLessons:next,m5BrainExplored:brainExplored});awardCbetXp(50,"mission5-brain-eeg-explorer");setCompletedLessons(next); };
  const resetExplorer = () => {setActiveId("sa");setExplored([]);setSignalStep(-1);setPathOrder([]);setPathFeedback("");setServiceAnswer(null);setRecognitionAnswer(null);setChallengeAnswers({});};
  const resetLungExplorer = () => {setLungActiveId("trachea");setLungExplored([]);setLungChallenges({});setBreathing(true);setGasPath([]);setGasFeedback("");setLungServiceAnswer(null);setLungRecognition(null);};
  const resetCircExplorer = () => {setCircActiveId("rightheart");setCircExplored([]);setCircChallenges({});setBloodFlowing(true);setBloodPath([]);setBloodFeedback("");setCircServiceAnswer(null);setCircRecognition(null);};

  const resetBrainExplorer = () => {setBrainActiveId("frontal");setBrainExplored([]);setBrainChallenges({});setEegMode("alpha");setBrainPath([]);setBrainFeedback("");setBrainServiceAnswer(null);setBrainRecognition(null);};
  const roadmap=["Heart & ECG","Lungs & Ventilation","Blood Pressure & Circulation","Brain & EEG","Oxygen Transport","Kidneys & Dialysis","Temperature Regulation","Connecting the Systems"];
  const missionFivePrerequisites=[true,completed,lungCompleted,circCompleted,brainCompleted,oxygenCompleted,kidneyCompleted,tempCompleted];
  const missionFiveResumeIndex=systemsCompleted?7:tempCompleted?7:kidneyCompleted?6:oxygenCompleted?5:brainCompleted?4:circCompleted?3:lungCompleted?2:completed?1:0;
  if(phase==="briefing") return <section className="cbet-shell m5-shell m5-briefing"><button className="cbet-back" onClick={onExit}>← Back to Academy</button><span className="m5-kicker">Mission 5 · Anatomy & Physiology</span><h1>Understand the body.<br/>Understand the equipment.</h1><p>Connect human physiology to the signals, waveforms, and measurements biomedical equipment displays.</p><div className="m5-roadmap">{roadmap.map((item,index)=>{const isComplete=completedLessons.includes(index);const available=Boolean(missionFivePrerequisites[index]||localUnlock);return <button key={item} type="button" className={`${available?"ready":"future"} ${isComplete?"complete":""}`} disabled={!available} onClick={()=>openLesson(index)}><span>{isComplete?"✓":index===0?"❤️":index===1?"🫁":index+1}</span><strong>{item}</strong><small>{isComplete?"Complete — review anytime":available?"Ready now":"Coming next"}</small></button>;})}</div><button className="cbet-primary m5-begin" onClick={()=>openLesson(localUnlock?Math.max(missionFiveResumeIndex,7):missionFiveResumeIndex)}>{systemsCompleted?"Review Connecting the Systems":tempCompleted?"Continue to Connecting the Systems":kidneyCompleted?"Continue to Temperature Regulation":oxygenCompleted?"Continue to Kidneys & Dialysis":brainCompleted?"Continue to Oxygen Transport":circCompleted?"Continue to Brain & EEG":lungCompleted?"Continue to Blood Pressure & Circulation":completed?"Continue to Lungs & Ventilation":"Begin Heart & ECG Explorer"}</button></section>;

  if(lessonIndex===7) return <section className="cbet-shell m5-shell m5-lesson-stage m5-systems-stage">
    <div className="m5-top-nav"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 5 · Lesson 8 of 8</span><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>Mission Overview</button></div><div className="m5-progress"><span style={{width:"100%"}}/></div>
    <section className="m5-hero m5-systems-hero"><MissionFiveSystemsGraphic activeId={systemsActiveId} onSelect={id=>{setSystemsActiveId(id);setSystemsExplored(v=>v.includes(id)?v:[...v,id])}} faultMode={systemsFault}/><div className="m5-hero-copy"><span className="m5-kicker">Systems Integration</span><h1>Don’t troubleshoot the number. Troubleshoot the signal chain.</h1><p>Compare physiology, sensors, accessories, connections, configuration, and displayed values as one connected bedside system.</p><div className="m5-system-modes"><button className={systemsFault==="normal"?"active":""} onClick={()=>setSystemsFault("normal")}>Normal</button><button className={systemsFault==="spo2"?"active":""} onClick={()=>setSystemsFault("spo2")}>SpO₂ Fault</button><button className={systemsFault==="ibp"?"active":""} onClick={()=>setSystemsFault("ibp")}>IBP Fault</button></div><div className="m5-explorer-progress"><div><span style={{width:`${systemsExplored.length*20}%`}}/></div><strong>{systemsExplored.length} of 5 signal chains explored</strong></div><div className="m5-structure-tabs">{MISSION_FIVE_SYSTEMS.map(x=><button key={x.id} className={systemsActiveId===x.id?"active":""} style={{"--structure-color":x.color}} onClick={()=>{setSystemsActiveId(x.id);setSystemsExplored(v=>v.includes(x.id)?v:[...v,x.id])}}>{systemsExplored.includes(x.id)?"✓":"●"} {x.label}</button>)}</div></div></section>
    <section className="m5-detail-grid"><article className="m5-structure-detail" style={{"--structure-color":systemsActive.color}}><span className="m5-section-label">Signal-Chain Explorer</span><h2>{systemsActive.label}</h2><dl><div><dt>Physiologic source</dt><dd>{systemsActive.source}</dd></div><div><dt>Signal path</dt><dd>{systemsActive.chain}</dd></div><div><dt>Common failure points</dt><dd>{systemsActive.fault}</dd></div></dl></article>
    <article className="m5-field-card m5-systems-field"><span className="m5-section-label">Clinical Engineering Insight</span><h2>Use agreement and disagreement as evidence</h2><p>When one parameter conflicts with the patient and other signals, do not replace the entire monitor first. Identify where the signal originates, how it is acquired, what accessories carry it, and which independent parameter can confirm or challenge it.</p><div className="m5-signal-chain"><span>Patient</span><b>→</b><span>Sensor</span><b>→</b><span>Accessory</span><b>→</b><span>Input</span><b>→</b><span>Display</span></div></article></section>
    <section className="m5-path-builder m5-systems-path m5-systems-path-polished">
      <div className="m5-section-heading">
        <span className="m5-section-label">Build the Universal Signal Chain</span>
        <h2>How does a physiologic signal reach the screen?</h2>
        <p className="m5-path-instruction"><strong>Click the cards below</strong> in the order the signal travels from the patient to the displayed value.</p>
      </div>
      <div className="m5-path-result m5-path-result-arrowed">{["patient","sensor","accessory","input","processing","display"].map((id,i)=><div className="m5-path-slot-wrap" key={id}><div className={`m5-path-slot ${systemsPath[i]===id?"filled":""}`}><span className="slot-number">{i+1}</span><strong>{systemsPath[i]?({"patient":"Patient","sensor":"Sensor / Transducer","accessory":"Cable / Tubing","input":"Monitor Input","processing":"Signal Processing","display":"Displayed Value"})[systemsPath[i]]:"Choose a step"}</strong></div>{i<5&&<span className="m5-path-arrow">→</span>}</div>)}</div>
      <div className={`m5-path-feedback ${systemsPathFeedback.startsWith("✓")?"success":systemsPathFeedback.startsWith("Not")?"try-again":""}`} aria-live="polite">{systemsPathFeedback || "Start with the source of the physiologic signal."}</div>
      <div className="m5-path-options m5-path-choice-cards">{[["processing","Signal Processing","The monitor converts and analyzes the acquired signal."],["patient","Patient","The physiologic signal begins here."],["display","Displayed Value","The final number or waveform shown to the user."],["accessory","Cable / Tubing","Carries the signal from the sensor or transducer."],["input","Monitor Input","Receives the signal at the monitoring device."],["sensor","Sensor / Transducer","Detects or converts the physiologic measurement."]].map(([id,label,hint])=><button key={id} disabled={systemsPath.includes(id)} onClick={()=>{const seq=["patient","sensor","accessory","input","processing","display"];const expected=seq[systemsPath.length];if(id===expected){const next=[...systemsPath,id];setSystemsPath(next);setSystemsPathFeedback(next.length===6?"✓ Signal chain complete! You followed the measurement from the patient to the screen.":"✓ Correct — now choose what receives or carries the signal next.");playCbetTone("correct")}else{setSystemsPathFeedback("Not quite — follow the signal one step at a time from its source toward the monitor.");playCbetTone("wrong")}}}><span className="choice-title">{label}</span><span className="choice-hint">{hint}</span></button>)}</div>
      <div className="m5-path-actions"><button className="cbet-secondary" onClick={()=>{setSystemsPath([]);setSystemsPathFeedback("")}}>↻ Reset Activity</button></div>
      {systemsPath.length===6&&<div className="m5-path-summary"><strong>Signal chain complete</strong><span>Patient → Sensor / Transducer → Cable / Tubing → Monitor Input → Signal Processing → Displayed Value</span></div>}
    </section>
    <section className="m5-equipment-connections m5-systems-equipment"><span className="m5-section-label">Cross-Parameter Evidence</span><h2>Which signals can validate one another?</h2><div><article><strong>ECG vs. Pulse Rate</strong><span>A major mismatch can indicate pulse-ox artifact, poor perfusion, ectopy, or acquisition problems.</span></article><article><strong>NIBP vs. IBP</strong><span>Trend agreement and waveform quality help identify damping, leveling, zeroing, or cuff-related problems.</span></article><article><strong>SpO₂ vs. Pleth</strong><span>A saturation number without a credible pleth and pulse agreement deserves investigation.</span></article><article><strong>Temperature vs. Clinical Context</strong><span>Probe site, type, contact, and a second validated method help test plausibility.</span></article></div></section>
    <section className="m5-challenge-grid"><article className="m5-service-call"><span className="m5-section-label">🚨 Final Bedside Simulation</span><h2>One number does not fit the rest of the bedside picture.</h2><div className="m5-vitals-strip"><span><b>HR</b> 84</span><span className="spo2-alert"><b>SpO₂</b> 73%</span><span className="spo2-alert"><b>Pulse</b> 42</span><span><b>NIBP</b> 122/76</span><span><b>Temp</b> 37.0°C</span></div><p>The ECG is clean, the pleth is weak and irregular, and the patient appears stable. <strong>Which signal chain should you investigate first?</strong></p>{["Replace the entire patient monitor","Inspect the SpO₂ sensor, placement, perfusion, motion, cable, and pleth quality","Replace the NIBP cuff"].map((o,i)=><button key={o} disabled={systemsScenario===1} className={systemsScenario!==null&&i===1?"correct":systemsScenario===i?"wrong":""} onClick={()=>{setSystemsScenario(i);setSystemsFault("spo2");playCbetTone(i===1?"correct":"wrong")}}>{o}</button>)}</article><article className="m5-recognition"><span className="m5-section-label">Find the Fault</span><h2>Which signal chain is inconsistent with the other evidence?</h2><div>{MISSION_FIVE_SYSTEMS.map(x=><button key={x.id} disabled={systemsRecognition==="spo2"} className={systemsRecognition===x.id?(x.id==="spo2"?"correct":"wrong"):""} onClick={()=>{setSystemsRecognition(x.id);setSystemsActiveId(x.id);playCbetTone(x.id==="spo2"?"correct":"wrong")}}>{x.label}</button>)}</div></article></section>
    <section className={`m5-completion ${systemsReady||systemsCompleted?"ready":""}`}><div><span>{systemsReady||systemsCompleted?"🏆":"🧩"}</span><div><strong>{systemsCompleted?"Mission 5 Systems Integration Complete":systemsReady?"Final Explorer Ready to Complete":"Complete every activity"}</strong><small>100 XP · Anatomy, physiology, equipment, and systems thinking</small></div></div><button className="cbet-primary" disabled={!systemsReady&&!systemsCompleted} onClick={()=>{const next=Array.from(new Set([...completedLessons,7]));if(!systemsCompleted)awardCbetXp(100,"mission5-systems-integration");setCompletedLessons(next);saveMissionProgress(moduleNumber,{phase:"complete",lessonIndex:7,completedLessons:next,m5SystemsExplored:systemsExplored,finalPercent:100,passed:true});completeCbetModule(moduleNumber,100,0);}}>{systemsCompleted?"Mission 5 Completed ✓":"Complete Mission 5"}</button></section>
    <nav className="m5-bottom-nav"><button className="cbet-secondary" onClick={()=>openLesson(6)}>← Previous: Temperature Regulation</button><button className="cbet-secondary" onClick={()=>{setSystemsActiveId("ecg");setSystemsExplored([]);setSystemsPath([]);setSystemsScenario(null);setSystemsRecognition(null);setSystemsFault("normal");setSystemsPathFeedback("")}}>Restart Explorer</button><button className="cbet-primary" onClick={onExit}>Return to Academy →</button></nav>
  </section>;



  if(lessonIndex===6) return <section className="cbet-shell m5-shell m5-lesson-stage m5-temp-stage">
    <div className="m5-top-nav"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 5 · Lesson 7 of 8</span><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>Mission Overview</button></div><div className="m5-progress"><span style={{width:"87.5%"}}/></div>
    <section className="m5-hero m5-temp-hero"><MissionFiveTemperatureGraphic activeId={tempActiveId} explored={tempExplored} mode={tempMode} onSelect={id=>{setTempActiveId(id);setTempExplored(v=>v.includes(id)?v:[...v,id])}}/><div className="m5-hero-copy"><span className="m5-kicker">Temperature Regulation & Patient Warming</span><h1>Measure heat. Understand the response.</h1><p>Explore how receptors and the hypothalamus regulate temperature, then connect physiology to clinical probes, warming systems, and troubleshooting.</p><div className="m5-temp-mode-controls"><button className={tempMode==="cold"?"active":""} onClick={()=>setTempMode("cold")}>Cold</button><button className={tempMode==="normal"?"active":""} onClick={()=>setTempMode("normal")}>Normal</button><button className={tempMode==="hot"?"active":""} onClick={()=>setTempMode("hot")}>Hot</button></div><div className="m5-explorer-progress"><div><span style={{width:`${tempExplored.length*20}%`}}/></div><strong>{tempExplored.length} of 5 concepts explored</strong></div><div className="m5-structure-tabs">{MISSION_FIVE_TEMPERATURE.map(x=><button key={x.id} className={tempActiveId===x.id?"active":""} style={{"--structure-color":x.color}} onClick={()=>{setTempActiveId(x.id);setTempExplored(v=>v.includes(x.id)?v:[...v,x.id])}}>{tempExplored.includes(x.id)?"✓":"●"} {x.label}</button>)}</div></div></section>
    <section className="m5-detail-grid"><article className="m5-structure-detail" style={{"--structure-color":tempActive.color}}><span className="m5-section-label">Interactive Physiology</span><h2>{tempActive.label}</h2><p>{tempActive.purpose}</p><div className="m5-mini-challenge"><strong>Check your understanding</strong><p>{tempActive.challenge}</p>{tempActive.options.map((o,i)=><button key={o} disabled={tempChecks[tempActive.id]===true} className={tempChecks[tempActive.id]!==undefined&&i===tempActive.answer?"correct":""} onClick={()=>{const ok=i===tempActive.answer;setTempChecks(v=>({...v,[tempActive.id]:ok}));playCbetTone(ok?"correct":"wrong")}}>{o}</button>)}</div></article>
    <article className="m5-field-card m5-temp-field"><span className="m5-section-label">Clinical Engineering Insight</span><h2>Temperature is site-specific</h2><p>A skin reading, oral reading, bladder reading, esophageal reading, and rectal reading are not interchangeable. When a value seems implausible, confirm the probe type, placement, compatible input, cable integrity, and comparison method before replacing the monitor.</p><div className="m5-signal-chain"><span>Receptors</span><b>→</b><span>Hypothalamus</span><b>→</b><span>Cold or heat response</span><b>→</b><span>Measured site</span></div></article></section>
    <section className="m5-path-builder m5-temp-path"><div className="m5-section-heading"><span className="m5-section-label">Build the Temperature-Control Loop</span><h2>From detection to corrective response</h2><p>Select each step in the correct order.</p></div><div className="m5-path-result">{["change","receptors","hypothalamus","response"].map((id,i)=><div key={id} className={tempPath[i]===id?"filled":""}>{tempPath[i]?({"change":"Temperature Change","receptors":"Temperature Receptors","hypothalamus":"Hypothalamus","response":"Corrective Response"})[tempPath[i]]:i+1}</div>)}</div><div className="m5-path-options">{[["change","Temperature Change"],["receptors","Temperature Receptors"],["hypothalamus","Hypothalamus"],["response","Corrective Response"]].map(([id,label])=><button key={id} disabled={tempPath.includes(id)} onClick={()=>{const seq=["change","receptors","hypothalamus","response"];if(id===seq[tempPath.length]){setTempPath(v=>[...v,id]);playCbetTone("correct")}else playCbetTone("wrong")}}>{label}</button>)}</div></section>
    <section className="m5-equipment-connections m5-temp-equipment"><span className="m5-section-label">Equipment Connections</span><h2>Where and how temperature is measured or controlled</h2><div><article><strong>Skin Probe</strong><span>Tracks surface temperature and is strongly affected by placement, insulation, perfusion, and ambient conditions.</span></article><article><strong>Core Temperature Probe</strong><span>Uses compatible esophageal, bladder, rectal, or other approved sites to estimate core temperature.</span></article><article><strong>Forced-Air Warming</strong><span>Transfers warm air through a blanket system to reduce perioperative heat loss.</span></article><article><strong>Fluid Warmer</strong><span>Warms compatible fluids or blood products while requiring accurate temperature control and alarm protection.</span></article></div></section>
    <section className="m5-challenge-grid"><article className="m5-service-call"><span className="m5-section-label">🚨 Service Call</span><h2>Monitor displays 32.1°C, but the patient appears comfortable</h2><p>Other vital signs are stable and a second validated method reads 36.8°C. What should be investigated first?</p>{["Replace the monitor immediately","Check probe type, placement, connection, cable integrity, and compatible input","Replace the ECG cable"].map((o,i)=><button key={o} disabled={tempService===1} className={tempService!==null&&i===1?"correct":tempService===i?"wrong":""} onClick={()=>{setTempService(i);playCbetTone(i===1?"correct":"wrong")}}>{o}</button>)}</article><article className="m5-recognition"><span className="m5-section-label">Quick Recognition</span><h2>Which component directly acquires the temperature signal?</h2><div>{MISSION_FIVE_TEMPERATURE.map(x=><button key={x.id} disabled={tempRecognition==="probe"} className={tempRecognition===x.id?(x.id==="probe"?"correct":"wrong"):""} onClick={()=>{setTempRecognition(x.id);playCbetTone(x.id==="probe"?"correct":"wrong")}}>{x.label}</button>)}</div></article></section>
    <section className={`m5-completion ${tempReady||tempCompleted?"ready":""}`}><div><span>{tempReady||tempCompleted?"🏅":"🌡️"}</span><div><strong>{tempCompleted?"Temperature Regulation Explorer Complete":tempReady?"Explorer Ready to Complete":"Complete every activity"}</strong><small>50 XP · Temperature physiology and monitoring</small></div></div><button className="cbet-primary" disabled={!tempReady&&!tempCompleted} onClick={()=>{const next=Array.from(new Set([...completedLessons,6]));if(!tempCompleted)awardCbetXp(50,"mission5-temperature");setCompletedLessons(next);saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:6,completedLessons:next,m5TempExplored:tempExplored})}}>{tempCompleted?"Lesson Completed ✓":"Complete Temperature Regulation Explorer"}</button></section>
    <nav className="m5-bottom-nav"><button className="cbet-secondary" onClick={()=>openLesson(5)}>← Previous: Kidneys & Dialysis</button><button className="cbet-secondary" onClick={()=>{setTempActiveId("receptors");setTempExplored([]);setTempChecks({});setTempPath([]);setTempService(null);setTempRecognition(null);setTempMode("normal")}}>Restart Explorer</button><button className="cbet-primary" disabled={!tempCompleted&&!localUnlock} onClick={()=>openLesson(7)}>Next: Systems Integration →</button></nav>
  </section>;



  if(lessonIndex===5) return <section className="cbet-shell m5-shell m5-lesson-stage m5-kidney-stage">
    <div className="m5-top-nav"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 5 · Lesson 6 of 8</span><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>Mission Overview</button></div><div className="m5-progress"><span style={{width:"75%"}}/></div>
    <section className="m5-hero m5-kidney-hero"><MissionFiveKidneyGraphic activeId={kidneyActiveId} explored={kidneyExplored} running={kidneyRunning} onSelect={id=>{setKidneyActiveId(id);setKidneyExplored(v=>v.includes(id)?v:[...v,id])}}/><div className="m5-hero-copy"><span className="m5-kicker">Kidneys & Dialysis</span><h1>Filter the blood. Control the balance.</h1><p>Connect nephron physiology to the extracorporeal dialysis circuit, then trace blood safely from the patient, through the dialyzer, and back again.</p><button className="m5-signal-button m5-kidney-button" onClick={()=>setKidneyRunning(v=>!v)}>{kidneyRunning?"Ⅱ Pause Filtration":"▶ Animate Filtration"}</button><div className="m5-explorer-progress"><div><span style={{width:`${kidneyExplored.length*20}%`}}/></div><strong>{kidneyExplored.length} of 5 concepts explored</strong></div><div className="m5-structure-tabs">{MISSION_FIVE_KIDNEY.map(x=><button key={x.id} className={kidneyActiveId===x.id?"active":""} style={{"--structure-color":x.color}} onClick={()=>{setKidneyActiveId(x.id);setKidneyExplored(v=>v.includes(x.id)?v:[...v,x.id])}}>{kidneyExplored.includes(x.id)?"✓":"●"} {x.label}</button>)}</div></div></section>
    <section className="m5-detail-grid"><article className="m5-structure-detail" style={{"--structure-color":kidneyActive.color}}><span className="m5-section-label">Interactive Physiology</span><h2>{kidneyActive.label}</h2><p>{kidneyActive.purpose}</p><div className="m5-mini-challenge"><strong>Check your understanding</strong><p>{kidneyActive.challenge}</p>{kidneyActive.options.map((o,i)=><button key={o} disabled={kidneyChecks[kidneyActive.id]===true} className={kidneyChecks[kidneyActive.id]!==undefined&&i===kidneyActive.answer?"correct":""} onClick={()=>{const ok=i===kidneyActive.answer;setKidneyChecks(v=>({...v,[kidneyActive.id]:ok}));playCbetTone(ok?"correct":"wrong")}}>{o}</button>)}</div></article>
    <article className="m5-field-card m5-kidney-field"><span className="m5-section-label">Clinical Engineering Insight</span><h2>An alarm is evidence about the circuit</h2><p>Pressure alarms, air alarms, conductivity alarms, and temperature alarms point to different parts of the dialysis system. Read the alarm, inspect the full extracorporeal and dialysate paths, and reproduce the complaint before replacing equipment.</p><div className="m5-signal-chain"><span>Patient access</span><b>→</b><span>Blood pump</span><b>→</b><span>Dialyzer</span><b>→</b><span>Air detector</span><b>→</b><span>Patient return</span></div></article></section>
    <section className="m5-path-builder m5-kidney-path"><div className="m5-section-heading"><span className="m5-section-label">Build the Dialysis Circuit</span><h2>Trace blood from the patient and safely back again</h2><p>Select each step in the correct order.</p></div><div className="m5-path-result">{["patient","arterial","pump","dialyzer","air","venous","patient-return"].map((id,i)=><div key={id} className={kidneyPath[i]===id?"filled":""}>{kidneyPath[i]?({"patient":"Patient","arterial":"Arterial Line","pump":"Blood Pump","dialyzer":"Dialyzer","air":"Air Detector","venous":"Venous Line","patient-return":"Patient Return"})[kidneyPath[i]]:i+1}</div>)}</div><div className="m5-path-options">{[["patient","Patient"],["arterial","Arterial Line"],["pump","Blood Pump"],["dialyzer","Dialyzer"],["air","Air Detector"],["venous","Venous Line"],["patient-return","Patient Return"]].map(([id,label])=><button key={id} disabled={kidneyPath.includes(id)} onClick={()=>{const seq=["patient","arterial","pump","dialyzer","air","venous","patient-return"];if(id===seq[kidneyPath.length]){setKidneyPath(v=>[...v,id]);playCbetTone("correct")}else playCbetTone("wrong")}}>{label}</button>)}</div></section>
    <section className="m5-equipment-connections m5-kidney-equipment"><span className="m5-section-label">Equipment Connections</span><h2>What the dialysis system monitors</h2><div><article><strong>Arterial Pressure</strong><span>Reflects pressure in the blood withdrawal side and may change with access, line position, kinks, or flow demand.</span></article><article><strong>Venous Pressure</strong><span>Reflects resistance in the return side and may rise with clamps, kinks, clotting, or access problems.</span></article><article><strong>Conductivity & Temperature</strong><span>Help verify dialysate composition and temperature before it reaches the dialyzer.</span></article><article><strong>Air Detector & Clamp</strong><span>Protect the venous return path by detecting air and stopping return flow when required.</span></article></div></section>
    <section className="m5-challenge-grid"><article className="m5-service-call"><span className="m5-section-label">🚨 Service Call</span><h2>Repeated high venous pressure alarm</h2><p>The machine passes its internal checks and operates normally on a test circuit. What should be investigated next?</p>{["Replace the display","Inspect the patient-side return line, clamps, access, filters, and signs of clotting","Replace the battery"].map((o,i)=><button key={o} disabled={kidneyService===1} className={kidneyService!==null&&i===1?"correct":kidneyService===i?"wrong":""} onClick={()=>{setKidneyService(i);playCbetTone(i===1?"correct":"wrong")}}>{o}</button>)}</article><article className="m5-recognition"><span className="m5-section-label">Quick Recognition</span><h2>Where does diffusion across a membrane occur?</h2><div>{MISSION_FIVE_KIDNEY.map(x=><button key={x.id} disabled={kidneyRecognition==="dialyzer"} className={kidneyRecognition===x.id?(x.id==="dialyzer"?"correct":"wrong"):""} onClick={()=>{setKidneyRecognition(x.id);playCbetTone(x.id==="dialyzer"?"correct":"wrong")}}>{x.label}</button>)}</div></article></section>
    <section className={`m5-completion ${kidneyReady||kidneyCompleted?"ready":""}`}><div><span>{kidneyReady||kidneyCompleted?"🏅":"💧"}</span><div><strong>{kidneyCompleted?"Kidneys & Dialysis Explorer Complete":kidneyReady?"Explorer Ready to Complete":"Complete every activity"}</strong><small>50 XP · Renal physiology and dialysis systems</small></div></div><button className="cbet-primary" disabled={!kidneyReady&&!kidneyCompleted} onClick={()=>{const next=Array.from(new Set([...completedLessons,5]));if(!kidneyCompleted)awardCbetXp(50,"mission5-kidney-dialysis");setCompletedLessons(next);saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:5,completedLessons:next,m5KidneyExplored:kidneyExplored})}}>{kidneyCompleted?"Lesson Completed ✓":"Complete Kidneys & Dialysis Explorer"}</button></section>
    <nav className="m5-bottom-nav"><button className="cbet-secondary" onClick={()=>openLesson(4)}>← Previous: Oxygen Transport</button><button className="cbet-secondary" onClick={()=>{setKidneyActiveId("glomerulus");setKidneyExplored([]);setKidneyChecks({});setKidneyPath([]);setKidneyService(null);setKidneyRecognition(null)}}>Restart Explorer</button><button className="cbet-primary" disabled={!kidneyCompleted&&!localUnlock} onClick={()=>openLesson(6)}>Next: Temperature Regulation →</button></nav>
  </section>;

  if(lessonIndex===4) return <section className="cbet-shell m5-shell m5-lesson-stage m5-o2-stage">
<div className="m5-top-nav"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 5 · Lesson 5 of 8</span><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>Mission Overview</button></div><div className="m5-progress"><span style={{width:"62.5%"}}/></div>
<section className="m5-hero m5-o2-hero"><MissionFiveOxygenGraphic activeId={oxygenActiveId} explored={oxygenExplored} running={oxygenRunning} onSelect={id=>{setOxygenActiveId(id);setOxygenExplored(v=>v.includes(id)?v:[...v,id])}}/><div className="m5-hero-copy"><span className="m5-kicker">Oxygen Transport & Pulse Oximetry</span><h1>Move oxygen. Shine light. Measure the result.</h1><p>Follow oxygen from alveoli to hemoglobin, then see how red and infrared light through pulsatile tissue becomes SpO₂ and the pleth waveform.</p><button className="m5-signal-button" onClick={()=>setOxygenRunning(v=>!v)}>{oxygenRunning?"Ⅱ Pause Oxygen Flow":"▶ Animate Oxygen Flow"}</button><div className="m5-explorer-progress"><div><span style={{width:`${oxygenExplored.length*20}%`}}/></div><strong>{oxygenExplored.length} of 5 concepts explored</strong></div><div className="m5-structure-tabs">{MISSION_FIVE_OXYGEN.map(x=><button key={x.id} className={oxygenActiveId===x.id?"active":""} style={{"--structure-color":x.color}} onClick={()=>{setOxygenActiveId(x.id);setOxygenExplored(v=>v.includes(x.id)?v:[...v,x.id])}}>{oxygenExplored.includes(x.id)?"✓":"●"} {x.label}</button>)}</div></div></section>
<section className="m5-detail-grid"><article className="m5-structure-detail" style={{"--structure-color":oxygenActive.color}}><span className="m5-section-label">Interactive Physiology</span><h2>{oxygenActive.label}</h2><p>{oxygenActive.purpose}</p><div className="m5-mini-challenge"><strong>Check your understanding</strong><p>{oxygenActive.challenge}</p>{oxygenActive.options.map((o,i)=><button key={o} disabled={oxygenChecks[oxygenActive.id]===true} className={oxygenChecks[oxygenActive.id]!==undefined&&i===oxygenActive.answer?"correct":""} onClick={()=>{const ok=i===oxygenActive.answer;setOxygenChecks(v=>({...v,[oxygenActive.id]:ok}));playCbetTone(ok?"correct":"wrong")}}>{o}</button>)}</div></article><article className="m5-field-card"><span className="m5-section-label">Clinical Engineering Insight</span><h2>A believable number needs a believable signal</h2><p>Before blaming the monitor, inspect sensor placement, emitter-detector alignment, cable integrity, perfusion, motion, ambient light, pleth quality, and whether the pulse-ox rate agrees with another source.</p><div className="m5-signal-chain"><span>Alveoli</span><b>→</b><span>Hemoglobin</span><b>→</b><span>Arterial pulse</span><b>→</b><span>Red / IR light</span><b>→</b><span>SpO₂ + pleth</span></div></article></section>
<section className="m5-path-builder"><div className="m5-section-heading"><span className="m5-section-label">Build the Measurement Path</span><h2>From alveolus to displayed SpO₂</h2></div><div className="m5-path-result">{["alveoli","hemoglobin","pulse","sensor","display"].map((id,i)=><div key={id} className={oxygenPath[i]===id?"filled":""}>{oxygenPath[i]?MISSION_FIVE_OXYGEN.find(x=>x.id===oxygenPath[i]).label:i+1}</div>)}</div><div className="m5-path-options">{MISSION_FIVE_OXYGEN.map(x=><button key={x.id} disabled={oxygenPath.includes(x.id)} onClick={()=>{const seq=["alveoli","hemoglobin","pulse","sensor","display"];if(x.id===seq[oxygenPath.length]){setOxygenPath(v=>[...v,x.id]);playCbetTone("correct")}else playCbetTone("wrong")}}>{x.label}</button>)}</div></section>
<section className="m5-equipment-connections"><span className="m5-section-label">Equipment Connections</span><h2>What each measurement actually tells you</h2><div><article><strong>Pulse Oximeter</strong><span>Estimates arterial oxygen saturation from pulsatile red/infrared absorption.</span></article><article><strong>Pleth Waveform</strong><span>Shows the pulsatile optical signal and helps judge signal credibility.</span></article><article><strong>Blood Gas Analyzer</strong><span>PaO₂ from a blood sample is not the same measurement as SpO₂.</span></article><article><strong>ECG / Heart Rate</strong><span>Offers an independent rate to compare when artifact is suspected.</span></article></div></section>
<section className="m5-challenge-grid"><article className="m5-service-call"><span className="m5-section-label">🚨 Service Call</span><h2>SpO₂ reads 72%, but the pleth is weak</h2><p>Pulse-ox rate is 44 while ECG heart rate is 88. What should be investigated first?</p>{["Replace the monitor","Check sensor placement, perfusion, motion, cable, and pleth quality","Replace the NIBP cuff"].map((o,i)=><button key={o} disabled={oxygenService===1} className={oxygenService!==null&&i===1?"correct":oxygenService===i?"wrong":""} onClick={()=>{setOxygenService(i);playCbetTone(i===1?"correct":"wrong")}}>{o}</button>)}</article><article className="m5-recognition"><span className="m5-section-label">Quick Recognition</span><h2>Where does optical acquisition occur?</h2><div>{MISSION_FIVE_OXYGEN.map(x=><button key={x.id} disabled={oxygenRecognition==="sensor"} className={oxygenRecognition===x.id?(x.id==="sensor"?"correct":"wrong"):""} onClick={()=>{setOxygenRecognition(x.id);playCbetTone(x.id==="sensor"?"correct":"wrong")}}>{x.label}</button>)}</div></article></section>
<section className={`m5-completion ${oxygenReady||oxygenCompleted?"ready":""}`}><div><span>{oxygenReady||oxygenCompleted?"🏅":"🩸"}</span><div><strong>{oxygenCompleted?"Oxygen Transport Explorer Complete":oxygenReady?"Explorer Ready to Complete":"Complete every activity"}</strong><small>50 XP · Oxygen transport and pulse oximetry</small></div></div><button className="cbet-primary" disabled={!oxygenReady&&!oxygenCompleted} onClick={()=>{const next=Array.from(new Set([...completedLessons,4]));if(!oxygenCompleted)awardCbetXp(50,"mission5-o2");setCompletedLessons(next);saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:4,completedLessons:next,m5OxygenExplored:oxygenExplored})}}>{oxygenCompleted?"Lesson Completed ✓":"Complete Oxygen Transport Explorer"}</button></section>
<nav className="m5-bottom-nav"><button className="cbet-secondary" onClick={()=>openLesson(3)}>← Previous: Brain & EEG</button><button className="cbet-secondary" onClick={()=>{setOxygenActiveId("alveoli");setOxygenExplored([]);setOxygenChecks({});setOxygenPath([]);setOxygenService(null);setOxygenRecognition(null)}}>Restart Explorer</button><button className="cbet-primary" disabled={!oxygenCompleted&&!localUnlock} onClick={()=>openLesson(5)}>Next: Kidneys & Dialysis →</button></nav></section>;


  if(lessonIndex===3) return <section className="cbet-shell m5-shell m5-lesson-stage m5-brain-stage"><div className="m5-top-nav"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 5 · Lesson 4 of 8</span><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>Mission Overview</button></div><div className="m5-progress"><span style={{width:"50%"}}/></div>
    <section className="m5-hero m5-brain-hero"><MissionFiveBrainGraphic activeId={brainActiveId} explored={brainExplored} onSelect={selectBrainStructure} signalMode={eegMode}/><div className="m5-hero-copy"><span className="m5-kicker">Brain & EEG Explorer</span><h1>Detect the signal. Identify the artifact.</h1><p>Explore major brain regions, follow microvolt-level cortical signals to the EEG amplifier, and distinguish a physiologic waveform from acquisition artifact.</p><div className="m5-eeg-mode"><button className={eegMode==="alpha"?"active":""} onClick={()=>setEegMode("alpha")}>Relaxed / Alpha</button><button className={eegMode==="beta"?"active":""} onClick={()=>setEegMode("beta")}>Alert / Beta</button><button className={eegMode==="artifact"?"active":""} onClick={()=>setEegMode("artifact")}>Motion Artifact</button></div><div className="m5-explorer-progress"><div><span style={{width:`${(brainExplored.length/MISSION_FIVE_NEURO.length)*100}%`}}/></div><strong>{brainExplored.length} of 5 structures explored</strong></div><div className="m5-structure-tabs">{MISSION_FIVE_NEURO.map(item=><button key={item.id} className={`${brainActiveId===item.id?"active":""} ${brainExplored.includes(item.id)?"explored":""}`} style={{"--structure-color":item.color}} onClick={()=>selectBrainStructure(item.id)}><span>{brainExplored.includes(item.id)?"✓":"●"}</span>{item.label}</button>)}</div></div></section>
    <section className="m5-detail-grid"><article className="m5-structure-detail" style={{"--structure-color":brainActive.color}}><span className="m5-section-label">Interactive Neuroanatomy</span><h2>{brainActive.label}</h2><dl><div><dt>Location</dt><dd>{brainActive.location}</dd></div><div><dt>Purpose</dt><dd>{brainActive.purpose}</dd></div><div><dt>Equipment connection</dt><dd>{brainActive.equipment}</dd></div></dl><div className="m5-mini-challenge"><strong>Check your understanding</strong><p>{brainActive.challenge}</p>{brainActive.options.map((option,index)=><button key={option} className={brainChallenges[brainActive.id]!==undefined?(index===brainActive.answer?"correct":""):""} disabled={brainChallenges[brainActive.id]===true} onClick={()=>{const correct=index===brainActive.answer;setBrainChallenges(p=>({...p,[brainActive.id]:correct}));playCbetTone(correct?"correct":"wrong");}}>{option}</button>)}{brainChallenges[brainActive.id]===false&&<small>Not quite. Review the highlighted brain region and try again.</small>}</div></article><article className="m5-field-card m5-brain-field"><span className="m5-section-label">Clinical Engineering Insight</span><h2>EEG is a microvolt measurement</h2><p>Because EEG signals are extremely small, electrode impedance, dried conductive material, cable motion, nearby electrical sources, and muscle activity can dominate the display. Verify the acquisition pathway before assuming the waveform represents a neurologic change.</p><div className="m5-signal-chain"><span>Cortical voltage</span><b>→</b><span>Scalp electrode</span><b>→</b><span>Lead set</span><b>→</b><span>Differential amplifier</span><b>→</b><span>Displayed EEG</span></div></article></section>
    <section className="m5-path-builder m5-brain-path"><div className="m5-section-heading"><span className="m5-section-label">Build the EEG Signal Path</span><h2>Move a cortical signal to the display</h2><p>Select the acquisition steps in the correct order.</p></div><div className="m5-path-result">{["cortex","electrodes","leadset","amplifier"].map((id,index)=><div key={id} className={brainPath[index]===id?"filled":""}>{brainPath[index]?({cortex:"Cortical voltage",electrodes:"Scalp electrodes",leadset:"Lead set",amplifier:"EEG amplifier & display"})[brainPath[index]]:index+1}</div>)}</div><div className="m5-path-options">{[["cortex","Cortical voltage"],["electrodes","Scalp electrodes"],["leadset","Lead set"],["amplifier","EEG amplifier & display"]].map(([id,label])=><button key={id} disabled={brainPath.includes(id)} onClick={()=>addBrainStep(id)}>{label}</button>)}</div>{brainFeedback&&<p className={brainPathComplete?"good":""}>{brainFeedback}</p>}{brainPath.length>0&&!brainPathComplete&&<button className="cbet-secondary" onClick={()=>{setBrainPath([]);setBrainFeedback("");}}>Reset EEG Path</button>}</section>
    <section className="m5-equipment-connections m5-brain-equipment"><span className="m5-section-label">Equipment Connections</span><h2>What measures or uses this physiology?</h2><div><article><strong>Diagnostic EEG</strong><span>Records multi-channel cortical voltage differences using standardized scalp locations.</span></article><article><strong>BIS / Processed EEG</strong><span>Processes frontal EEG features into a trend used alongside the full clinical assessment during anesthesia.</span></article><article><strong>Evoked-Potential System</strong><span>Measures nervous-system responses to controlled sensory stimulation.</span></article><article><strong>ICP Monitor</strong><span>Measures intracranial pressure; it does not measure the same quantity as EEG.</span></article></div></section>
    <section className="m5-challenge-grid"><article className="m5-service-call"><span className="m5-section-label">🚨 Service Call</span><h2>One EEG channel suddenly becomes large and erratic</h2><p>The change appears when the patient clenches the jaw, while neighboring channels remain stable. What should be investigated first?</p>{["Replace the entire EEG system","Check the affected electrode, lead, impedance, and muscle artifact","Diagnose a seizure from the single channel","Increase amplifier gain"].map((option,index)=><button key={option} disabled={brainServiceCorrect} className={`${brainServiceAnswer!==null&&index===1?"correct":""} ${brainServiceAnswer===index&&index!==1?"wrong":""}`} onClick={()=>{setBrainServiceAnswer(index);playCbetTone(index===1?"correct":"wrong");}}><strong>{String.fromCharCode(65+index)}.</strong>{option}</button>)}{brainServiceAnswer!==null&&<div className="m5-feedback"><strong>{brainServiceCorrect?"Best first action.":"Use the channel pattern and patient activity as evidence."}</strong><span>Localized electrode or muscle artifact should be evaluated before replacing the system or interpreting the change as a new neurologic event.</span></div>}</article><article className="m5-recognition"><span className="m5-section-label">Quick Recognition</span><h2>Which lobe primarily processes vision?</h2><p>Select the cortical region at the back of the brain.</p><div>{MISSION_FIVE_NEURO.map(item=><button key={item.id} className={`${brainRecognition===item.id?(item.id==="occipital"?"correct":"wrong"):""}`} disabled={brainRecognitionCorrect} style={{"--structure-color":item.color}} onClick={()=>{setBrainRecognition(item.id);setBrainActiveId(item.id);playCbetTone(item.id==="occipital"?"correct":"wrong");}}>{item.label}</button>)}</div>{brainRecognition&&<p className={brainRecognitionCorrect?"good":"bad"}>{brainRecognitionCorrect?"Correct — the occipital lobe is the primary visual-processing region.":"Not this region. Look toward the posterior cerebrum."}</p>}</article></section>
    <section className={`m5-completion ${brainReady||brainCompleted?"ready":""}`}><div><span>{brainReady||brainCompleted?"🏅":"🧠"}</span><div><strong>{brainCompleted?"Brain & EEG Explorer Complete":brainReady?"Explorer Ready to Complete":"Complete every activity"}</strong><small>{brainCompleted?"Your 50 XP and lesson progress are preserved.":`${brainExplored.length}/5 structures · ${Object.values(brainChallenges).filter(Boolean).length}/5 checks · ${brainPathComplete?"EEG path complete":"EEG path pending"}`}</small></div></div><button className="cbet-primary" disabled={!brainReady&&!brainCompleted} onClick={finishBrainLesson}>{brainCompleted?"Lesson Completed ✓":"Complete Brain & EEG Explorer"}</button></section>
    <nav className="m5-bottom-nav" aria-label="Mission 5 lesson navigation"><button className="cbet-secondary" onClick={()=>openLesson(2)}>← Previous: Blood Pressure & Circulation</button><button className="cbet-secondary" onClick={resetBrainExplorer}>Restart Explorer</button><button className="cbet-primary" disabled={!brainCompleted&&!localUnlock} onClick={()=>openLesson(4)}>Next: Oxygen Transport →</button></nav>
  </section>;


  if(lessonIndex===2) return <section className="cbet-shell m5-shell m5-lesson-stage m5-circulation-stage"><div className="m5-top-nav"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 5 · Lesson 3 of 8</span><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>Mission Overview</button></div><div className="m5-progress"><span style={{width:"37.5%"}}/></div>
    <section className="m5-hero m5-circulation-hero"><MissionFiveCirculationGraphic activeId={circActiveId} explored={circExplored} onSelect={selectCircStructure} flowing={bloodFlowing}/><div className="m5-hero-copy"><span className="m5-kicker">Blood Pressure & Circulation Explorer</span><h1>Follow the blood. Understand the pressure.</h1><p>Trace blood through pulmonary and systemic circulation, then connect mechanical blood flow to NIBP, invasive pressure, and pulse-oximetry measurements.</p><button className="m5-signal-button m5-circulation-button" onClick={()=>setBloodFlowing(v=>!v)}>{bloodFlowing?"⏸ Pause Blood Flow":"▶ Start Blood Flow"}</button><div className="m5-explorer-progress"><div><span style={{width:`${(circExplored.length/MISSION_FIVE_CIRCULATION.length)*100}%`}}/></div><strong>{circExplored.length} of 5 structures explored</strong></div><div className="m5-structure-tabs">{MISSION_FIVE_CIRCULATION.map(item=><button key={item.id} className={`${circActiveId===item.id?"active":""} ${circExplored.includes(item.id)?"explored":""}`} style={{"--structure-color":item.color}} onClick={()=>selectCircStructure(item.id)}><span>{circExplored.includes(item.id)?"✓":"●"}</span>{item.label}</button>)}</div></div></section>
    <section className="m5-detail-grid"><article className="m5-structure-detail" style={{"--structure-color":circActive.color}}><span className="m5-section-label">Interactive Circulation</span><h2>{circActive.label}</h2><dl><div><dt>Location</dt><dd>{circActive.location}</dd></div><div><dt>Purpose</dt><dd>{circActive.purpose}</dd></div><div><dt>Equipment connection</dt><dd>{circActive.equipment}</dd></div></dl><div className="m5-mini-challenge"><strong>Check your understanding</strong><p>{circActive.challenge}</p>{circActive.options.map((option,index)=><button key={option} className={circChallenges[circActive.id]!==undefined?(index===circActive.answer?"correct":""):""} disabled={circChallenges[circActive.id]===true} onClick={()=>{const correct=index===circActive.answer;setCircChallenges(p=>({...p,[circActive.id]:correct}));playCbetTone(correct?"correct":"wrong");}}>{option}</button>)}{circChallenges[circActive.id]===false&&<small>Not quite. Review the highlighted part of the circulation pathway and try again.</small>}</div></article><article className="m5-field-card m5-circulation-field"><span className="m5-section-label">Clinical Engineering Insight</span><h2>The monitor reports pressure—not perfusion by itself</h2><p>A cuff and an arterial line measure pressure using different acquisition methods. Neither reading alone proves that every tissue is receiving adequate blood flow. Compare the waveform, pulse, sensor setup, patient condition, and other physiologic signals.</p><div className="m5-signal-chain"><span>Cardiac contraction</span><b>→</b><span>Arterial pressure</span><b>→</b><span>Cuff or transducer</span><b>→</b><span>Signal processing</span><b>→</b><span>Displayed value</span></div></article></section>
    <section className="m5-path-builder m5-blood-path"><div className="m5-section-heading"><span className="m5-section-label">Build the Blood-Flow Path</span><h2>Trace one complete circulation loop</h2><p>Select each structure in the order blood travels from the right heart through the lungs and body.</p></div><div className="m5-path-result">{MISSION_FIVE_CIRCULATION.map((item,index)=><div key={item.id} className={bloodPath[index]===item.id?"filled":""}>{bloodPath[index]?MISSION_FIVE_CIRCULATION.find(entry=>entry.id===bloodPath[index]).label:index+1}</div>)}</div><div className="m5-path-options">{MISSION_FIVE_CIRCULATION.map(item=><button key={item.id} disabled={bloodPath.includes(item.id)} onClick={()=>addBloodStep(item.id)} style={{"--structure-color":item.color}}>{item.label}</button>)}</div>{bloodFeedback&&<p className={bloodPathComplete?"good":""}>{bloodFeedback}</p>}{bloodPath.length>0&&!bloodPathComplete&&<button className="cbet-secondary" onClick={()=>{setBloodPath([]);setBloodFeedback("");}}>Reset Blood Path</button>}</section>
    <section className="m5-equipment-connections m5-circulation-equipment"><span className="m5-section-label">Equipment Connections</span><h2>Different devices observe different parts of circulation</h2><div><article><strong>⚫ NIBP Cuff</strong><span>Uses cuff pressure and oscillations to estimate systolic, diastolic, and mean arterial pressure.</span></article><article><strong>🔴 Arterial Line</strong><span>Transmits arterial pressure directly through fluid-filled tubing to a pressure transducer.</span></article><article><strong>🔵 Pulse Oximeter</strong><span>Uses pulsatile arterial blood and light absorption to estimate oxygen saturation and pulse rate.</span></article><article><strong>🟢 ECG Monitor</strong><span>Measures electrical activation; it does not directly measure pulse strength or tissue perfusion.</span></article></div></section>
    <section className="m5-challenge-grid"><article className="m5-service-call"><span className="m5-section-label">🚨 Service Call</span><h2>The arterial line reads 62/38, but the cuff reads 118/74</h2><p>The arterial waveform is dampened and the patient appears stable. What should be investigated first?</p>{["Replace the bedside monitor","Inspect the pressure bag, tubing, stopcocks, transducer level, and waveform","Increase the cuff inflation pressure","Assume the cuff is wrong and document the arterial value"].map((option,index)=><button key={option} disabled={circServiceCorrect} className={`${circServiceAnswer!==null&&index===1?"correct":""} ${circServiceAnswer===index&&index!==1?"wrong":""}`} onClick={()=>{setCircServiceAnswer(index);playCbetTone(index===1?"correct":"wrong");}}><strong>{String.fromCharCode(65+index)}.</strong>{option}</button>)}{circServiceAnswer!==null&&<div className="m5-feedback"><strong>{circServiceCorrect?"Best first action.":"Compare the acquisition methods before replacing equipment."}</strong><span>A dampened invasive waveform points first to the fluid-filled pressure pathway, transducer setup, or leveling—not automatically to the monitor or the cuff.</span></div>}</article><article className="m5-recognition"><span className="m5-section-label">Quick Recognition</span><h2>Where is systemic pressure highest?</h2><p>Select the vessel group receiving blood directly from the left ventricle.</p><div>{MISSION_FIVE_CIRCULATION.map(item=><button key={item.id} className={`${circRecognition===item.id?(item.id==="arteries"?"correct":"wrong"):""}`} disabled={circRecognitionCorrect} style={{"--structure-color":item.color}} onClick={()=>{setCircRecognition(item.id);setCircActiveId(item.id);playCbetTone(item.id==="arteries"?"correct":"wrong");}}>{item.label}</button>)}</div>{circRecognition&&<p className={circRecognitionCorrect?"good":"bad"}>{circRecognitionCorrect?"Correct — systemic arteries receive the high-pressure output of the left ventricle.":"Not this part of the pathway. Follow blood leaving the left ventricle."}</p>}</article></section>
    <section className={`m5-completion ${circReady||circCompleted?"ready":""}`}><div><span>{circReady||circCompleted?"🏅":"🩸"}</span><div><strong>{circCompleted?"Blood Pressure & Circulation Explorer Complete":circReady?"Explorer Ready to Complete":"Complete every activity"}</strong><small>{circCompleted?"Your 50 XP and lesson progress are preserved.":`${circExplored.length}/5 structures · ${Object.values(circChallenges).filter(Boolean).length}/5 checks · ${bloodPathComplete?"blood path complete":"blood path pending"}`}</small></div></div><button className="cbet-primary" disabled={!circReady&&!circCompleted} onClick={finishCircLesson}>{circCompleted?"Lesson Completed ✓":"Complete Circulation Explorer"}</button></section>
    <nav className="m5-bottom-nav" aria-label="Mission 5 lesson navigation"><button className="cbet-secondary" onClick={()=>openLesson(1)}>← Previous: Lungs & Ventilation</button><button className="cbet-secondary" onClick={resetCircExplorer}>Restart Explorer</button><button className="cbet-primary" disabled={!circCompleted&&!localUnlock} onClick={()=>openLesson(3)}>Next: Brain & EEG →</button></nav>
  </section>;


  if(lessonIndex===1) return <section className="cbet-shell m5-shell m5-lesson-stage m5-lung-stage">
    <div className="m5-top-nav"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 5 · Lesson 2 of 8</span><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>Mission Overview</button></div><div className="m5-progress"><span style={{width:"25%"}}/></div>
    <section className="m5-hero m5-lung-hero"><MissionFiveLungGraphic activeId={lungActiveId} explored={lungExplored} onSelect={selectLungStructure} breathing={breathing}/><div className="m5-hero-copy"><span className="m5-kicker">Lungs & Ventilation Explorer</span><h1>Move air. Exchange gases. Measure the result.</h1><p>Trace inspired gas through the airway, watch the diaphragm and lungs move, and connect ventilation to SpO₂, capnography, and ventilator measurements.</p><button className="m5-signal-button m5-breathe-button" onClick={()=>setBreathing(v=>!v)}>{breathing?"⏸ Pause Breathing":"▶ Start Breathing"}</button><div className="m5-explorer-progress"><div><span style={{width:`${(lungExplored.length/MISSION_FIVE_RESPIRATORY.length)*100}%`}}/></div><strong>{lungExplored.length} of 5 structures explored</strong></div><div className="m5-structure-tabs">{MISSION_FIVE_RESPIRATORY.map(item=><button key={item.id} className={`${lungActiveId===item.id?"active":""} ${lungExplored.includes(item.id)?"explored":""}`} style={{"--structure-color":item.color}} onClick={()=>selectLungStructure(item.id)}><span>{lungExplored.includes(item.id)?"✓":"●"}</span>{item.label}</button>)}</div></div></section>
    <section className="m5-detail-grid"><article className="m5-structure-detail" style={{"--structure-color":lungActive.color}}><span className="m5-section-label">Interactive Anatomy</span><h2>{lungActive.label}</h2><dl><div><dt>Location</dt><dd>{lungActive.location}</dd></div><div><dt>Purpose</dt><dd>{lungActive.purpose}</dd></div><div><dt>Equipment connection</dt><dd>{lungActive.equipment}</dd></div></dl><div className="m5-mini-challenge"><strong>Check your understanding</strong><p>{lungActive.challenge}</p>{lungActive.options.map((option,index)=><button key={option} className={lungChallenges[lungActive.id]!==undefined?(index===lungActive.answer?"correct":""):""} disabled={lungChallenges[lungActive.id]===true} onClick={()=>{const correct=index===lungActive.answer;setLungChallenges(p=>({...p,[lungActive.id]:correct}));playCbetTone(correct?"correct":"wrong");}}>{option}</button>)}{lungChallenges[lungActive.id]===false&&<small>Not quite. Review the active structure and try again.</small>}</div></article><article className="m5-field-card m5-lung-field"><span className="m5-section-label">Clinical Engineering Insight</span><h2>Ventilation, oxygenation, and perfusion are different</h2><p>A ventilator can deliver the programmed breath while SpO₂ remains low if gas exchange or perfusion is impaired. ETCO₂ confirms exhaled carbon dioxide, while SpO₂ estimates arterial oxygen saturation. Always interpret each signal within its own physiologic pathway.</p><div className="m5-signal-chain"><span>Ventilator flow</span><b>→</b><span>Alveolar ventilation</span><b>→</b><span>Gas exchange</span><b>→</b><span>Blood transport</span><b>→</b><span>SpO₂ / ETCO₂</span></div></article></section>
    <section className="m5-path-builder m5-gas-path"><div className="m5-section-heading"><span className="m5-section-label">Build the Gas Path</span><h2>Follow oxygen from room air to the heart</h2><p>Select each location in the correct order.</p></div><div className="m5-path-result">{["trachea","bronchi","alveoli","capillaries","heart"].map((id,index)=><div key={id} className={gasPath[index]===id?"filled":""}>{gasPath[index]?({trachea:"Trachea",bronchi:"Bronchi",alveoli:"Alveoli",capillaries:"Pulmonary blood",heart:"Left heart"}[gasPath[index]]):index+1}</div>)}</div><div className="m5-path-options">{[{id:"trachea",label:"Trachea",color:"#0ea5e9"},{id:"bronchi",label:"Bronchi",color:"#0284c7"},{id:"alveoli",label:"Alveoli",color:"#8b5cf6"},{id:"capillaries",label:"Pulmonary blood",color:"#ef4444"},{id:"heart",label:"Left heart",color:"#db2777"}].map(item=><button key={item.id} disabled={gasPath.includes(item.id)} onClick={()=>addGasStep(item.id)} style={{"--structure-color":item.color}}>{item.label}</button>)}</div>{gasFeedback&&<p className={gasPathComplete?"good":""}>{gasFeedback}</p>}{gasPath.length>0&&!gasPathComplete&&<button className="cbet-secondary" onClick={()=>{setGasPath([]);setGasFeedback("");}}>Reset Gas Path</button>}</section>
    <section className="m5-equipment-connections"><span className="m5-section-label">Equipment Connections</span><h2>What each device actually tells you</h2><div><article><strong>Ventilator</strong><span>Delivers and measures pressure, flow, volume, rate, PEEP, and FiO₂.</span></article><article><strong>Pulse Oximeter</strong><span>Estimates arterial oxygen saturation and displays a pulse-derived pleth waveform.</span></article><article><strong>Capnography</strong><span>Measures exhaled CO₂ and displays the respiratory waveform and ETCO₂ value.</span></article><article><strong>Oxygen Analyzer</strong><span>Verifies oxygen concentration in a delivered gas mixture.</span></article></div></section>
    <section className="m5-challenge-grid"><article className="m5-service-call"><span className="m5-section-label">🚨 Service Call</span><h2>SpO₂ is 84%, but the ventilator completes every programmed breath</h2><p>The pressure and volume waveforms appear consistent. What should be checked first before replacing the ventilator?</p>{["Replace the ventilator immediately","Assess the patient, sensor signal, oxygen source, airway, and gas-exchange pathway","Disable the low-SpO₂ alarm","Increase tidal volume without clinical direction"].map((option,index)=><button key={option} disabled={lungServiceCorrect} className={`${lungServiceAnswer!==null&&index===1?"correct":""} ${lungServiceAnswer===index&&index!==1?"wrong":""}`} onClick={()=>{setLungServiceAnswer(index);playCbetTone(index===1?"correct":"wrong");}}><strong>{String.fromCharCode(65+index)}.</strong>{option}</button>)}{lungServiceAnswer!==null&&<div className="m5-feedback"><strong>{lungServiceCorrect?"Best first action.":"Do not equate delivered ventilation with adequate oxygenation."}</strong><span>Confirm the patient, sensor quality, oxygen delivery, airway, and gas-exchange pathway before declaring the ventilator defective.</span></div>}</article><article className="m5-recognition"><span className="m5-section-label">Quick Recognition</span><h2>Where does oxygen cross into blood?</h2><p>Select the structure responsible for most pulmonary gas exchange.</p><div>{MISSION_FIVE_RESPIRATORY.map(item=><button key={item.id} className={`${lungRecognition===item.id?(item.id==="alveoli"?"correct":"wrong"):""}`} disabled={lungRecognitionCorrect} style={{"--structure-color":item.color}} onClick={()=>{setLungRecognition(item.id);setLungActiveId(item.id);playCbetTone(item.id==="alveoli"?"correct":"wrong");}}>{item.label}</button>)}</div>{lungRecognition&&<p className={lungRecognitionCorrect?"good":"bad"}>{lungRecognitionCorrect?"Correct — alveoli provide the thin exchange surface beside pulmonary capillaries.":"Not this structure. Follow inspired gas to the terminal air sacs."}</p>}</article></section>
    <section className={`m5-completion ${lungReady||lungCompleted?"ready":""}`}><div><span>{lungReady||lungCompleted?"🏅":"🫁"}</span><div><strong>{lungCompleted?"Lungs & Ventilation Explorer Complete":lungReady?"Explorer Ready to Complete":"Complete every activity"}</strong><small>{lungCompleted?"Your 50 XP and lesson progress are preserved.":`${lungExplored.length}/5 structures · ${Object.values(lungChallenges).filter(Boolean).length}/5 checks · ${gasPathComplete?"gas path complete":"gas path pending"}`}</small></div></div><button className="cbet-primary" disabled={!lungReady&&!lungCompleted} onClick={finishLungLesson}>{lungCompleted?"Lesson Completed ✓":"Complete Lungs & Ventilation Explorer"}</button></section>
    <nav className="m5-bottom-nav" aria-label="Mission 5 lesson navigation"><button className="cbet-secondary" onClick={()=>openLesson(0)}>← Previous: Heart & ECG</button><button className="cbet-secondary" onClick={resetLungExplorer}>Restart Explorer</button><button className="cbet-primary" disabled={!lungCompleted&&!localUnlock} onClick={()=>openLesson(2)}>Next: Blood Pressure & Circulation →</button></nav>
  </section>;

  return <section className="cbet-shell m5-shell m5-lesson-stage"><div className="m5-top-nav"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 5 · Lesson 1 of 8</span><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>Mission Overview</button></div><div className="m5-progress"><span style={{width:"12.5%"}}/></div>
    <section className="m5-hero"><MissionFiveHeartGraphic activeId={activeId} explored={explored} onSelect={selectStructure} signalStep={signalStep}/><div className="m5-hero-copy"><span className="m5-kicker">Heart & ECG Explorer</span><h1>The heart's electrical conduction system</h1><p>Follow the impulse from its origin in the right atrium through the ventricular conduction network—and connect each step to the ECG waveform.</p><button className="m5-signal-button" onClick={runSignal}>▶ Start Electrical Signal</button><div className="m5-explorer-progress"><div><span style={{width:`${(explored.length/MISSION_FIVE_CONDUCTION.length)*100}%`}}/></div><strong>{explored.length} of 5 structures explored</strong></div><div className="m5-structure-tabs">{MISSION_FIVE_CONDUCTION.map(item=><button key={item.id} className={`${activeId===item.id?"active":""} ${explored.includes(item.id)?"explored":""}`} style={{"--structure-color":item.color}} onClick={()=>selectStructure(item.id)}><span>{explored.includes(item.id)?"✓":"●"}</span>{item.label}</button>)}</div></div></section>
    <section className="m5-detail-grid"><article className="m5-structure-detail" style={{"--structure-color":active.color}}><span className="m5-section-label">Interactive Anatomy</span><h2>{active.label}</h2><dl><div><dt>Location</dt><dd>{active.location}</dd></div><div><dt>Purpose</dt><dd>{active.purpose}</dd></div><div><dt>Equipment connection</dt><dd>{active.equipment}</dd></div></dl><div className="m5-mini-challenge"><strong>Check your understanding</strong><p>{active.challenge}</p>{active.options.map((option,index)=><button key={option} className={challengeAnswers[active.id]!==undefined?(index===active.answer?"correct":""):""} disabled={challengeAnswers[active.id]===true} onClick={()=>{const correct=index===active.answer;setChallengeAnswers(p=>({...p,[active.id]:correct}));playCbetTone(correct?"correct":"wrong");}}>{option}</button>)}{challengeAnswers[active.id]===false&&<small>Not quite. Review the active structure and try again.</small>}</div></article><article className="m5-field-card"><span className="m5-section-label">Clinical Engineering Insight</span><h2>Electrical signal does not always equal mechanical pulse</h2><p>An ECG monitor detects voltage changes at the skin. It does not directly confirm effective blood flow. Compare the ECG with a pulse-derived source, blood pressure, and the patient's condition when the display and the patient do not agree.</p><div className="m5-signal-chain"><span>Heart impulse</span><b>→</b><span>Skin electrodes</span><b>→</b><span>Lead cable</span><b>→</b><span>ECG input</span><b>→</b><span>Displayed waveform</span></div></article></section>
    <section className="m5-path-builder"><div className="m5-section-heading"><span className="m5-section-label">Build the Signal Path</span><h2>Put conduction in the correct order</h2><p>Select the structures in the order the normal impulse travels.</p></div><div className="m5-path-result">{MISSION_FIVE_CONDUCTION.map((item,index)=><div key={item.id} className={pathOrder[index]===item.id?"filled":""}>{pathOrder[index]?MISSION_FIVE_CONDUCTION.find(entry=>entry.id===pathOrder[index]).label:index+1}</div>)}</div><div className="m5-path-options">{MISSION_FIVE_CONDUCTION.map(item=><button key={item.id} disabled={pathOrder.includes(item.id)} onClick={()=>addPathStep(item.id)} style={{"--structure-color":item.color}}>{item.label}</button>)}</div>{pathFeedback&&<p className={pathComplete?"good":""}>{pathFeedback}</p>}{pathOrder.length>0&&!pathComplete&&<button className="cbet-secondary" onClick={()=>{setPathOrder([]);setPathFeedback("");}}>Reset Signal Path</button>}</section>
    <section className="m5-challenge-grid"><article className="m5-service-call"><span className="m5-section-label">🚨 Service Call</span><h2>The monitor suddenly displays ventricular tachycardia</h2><p>The patient is awake, talking, and has a stable pulse derived from SpO₂. What should be investigated first?</p>{["Replace the bedside monitor","Verify ECG electrodes, lead wires, and artifact","Deliver unsynchronized therapy","Replace the NIBP cuff"].map((option,index)=><button key={option} disabled={serviceCorrect} className={`${serviceAnswer!==null&&index===1?"correct":""} ${serviceAnswer===index&&index!==1?"wrong":""}`} onClick={()=>{setServiceAnswer(index);playCbetTone(index===1?"correct":"wrong");}}><strong>{String.fromCharCode(65+index)}.</strong>{option}</button>)}{serviceAnswer!==null&&<div className="m5-feedback"><strong>{serviceCorrect?"Best first action.":"Use the patient and the other signals as evidence."}</strong><span>Verify the ECG acquisition pathway before assuming a true lethal rhythm or replacing the monitor.</span></div>}</article><article className="m5-recognition"><span className="m5-section-label">Quick Recognition</span><h2>Which structure delays the impulse?</h2><p>Select the correct structure. This delay allows ventricular filling before contraction.</p><div>{MISSION_FIVE_CONDUCTION.map(item=><button key={item.id} className={`${recognitionAnswer===item.id?(item.id==="av"?"correct":"wrong"):""}`} disabled={recognitionCorrect} style={{"--structure-color":item.color}} onClick={()=>{setRecognitionAnswer(item.id);setActiveId(item.id);playCbetTone(item.id==="av"?"correct":"wrong");}}>{item.label}</button>)}</div>{recognitionAnswer&&<p className={recognitionCorrect?"good":"bad"}>{recognitionCorrect?"Correct — the AV node provides the normal conduction delay.":"Not this structure. Follow the pathway and try again."}</p>}</article></section>
    <section className={`m5-completion ${ready||completed?"ready":""}`}><div><span>{ready||completed?"🏅":"❤️"}</span><div><strong>{completed?"Heart & ECG Explorer Complete":ready?"Explorer Ready to Complete":"Complete every activity"}</strong><small>{completed?"Your 50 XP and lesson progress are preserved.":`${explored.length}/5 structures · ${Object.values(challengeAnswers).filter(Boolean).length}/5 checks · ${pathComplete?"signal path complete":"signal path pending"}`}</small></div></div><button className="cbet-primary" disabled={!ready&&!completed} onClick={finishLesson}>{completed?"Lesson Completed ✓":"Complete Heart & ECG Explorer"}</button></section>
    <nav className="m5-bottom-nav" aria-label="Mission 5 lesson navigation"><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>← Mission Overview</button><button className="cbet-secondary" onClick={resetExplorer}>Restart Explorer</button><button className="cbet-primary" disabled={!completed} onClick={()=>openLesson(1)}>Next: Lungs & Ventilation →</button></nav>
  </section>;
}


const MISSION_TEN_LESSON_ENHANCEMENTS = {
  1: {
    spotlights: [
      {
        image: "/images/oxygen-cylinder.jpg",
        title: "Oxygen Cylinder",
        purpose: "Provides a portable oxygen source for transport and emergency care.",
        insight: "Verify the cylinder label, available pressure, valve condition, and connected equipment before transport. Do not rely on color alone to identify the gas.",
      },
      {
        image: "/images/medical-air-cylinder.jpg",
        title: "Medical Air Cylinder",
        purpose: "Provides a portable source of compressed medical air for compatible equipment.",
        insight: "The label and gas-specific connection are the primary identifiers. Similar-looking cylinders must never be identified by color alone.",
      },
      {
        image: "/images/nitrous-oxide-cylinder.jpg",
        title: "Nitrous Oxide Cylinder",
        purpose: "Supplies nitrous oxide for approved anesthesia and analgesia applications.",
        insight: "Confirm the gas label and indexed connection before use. A cylinder that appears familiar can still be the wrong gas or connection standard.",
      },
    ],
    callout: {
      type: "did-you-know",
      title: "Did You Know?",
      text: "Medical-gas cylinder colors can vary by country and supplier. The cylinder label and gas-specific connection—not color alone—should drive identification.",
    },
  },
  3: {
    spotlights: [
      {
        image: "/images/oxygen-regulator.jpg",
        title: "Oxygen Regulator",
        purpose: "Reduces cylinder pressure to a usable downstream pressure for connected equipment.",
        insight: "When a clinician reports no flow, verify the cylinder contains gas, the valve is open, and the regulator is securely connected before assuming the regulator has failed.",
      },
      {
        image: "/images/oxygen-flowmeter.jpg",
        title: "Oxygen Flowmeter",
        purpose: "Allows the clinician to set and visually verify oxygen flow in liters per minute.",
        insight: "A no-flow complaint may originate upstream. Confirm the outlet or cylinder source before removing the flowmeter from service.",
      },
    ],
    callout: {
      type: "clinical-tip",
      title: "Clinical Engineering Tip",
      text: "Start at the source and follow the gas path. Confirm supply, connection, and valve position before replacing point-of-use equipment.",
    },
  },
  4: {
    spotlights: [
      {
        image: "/images/oxygen-pb-quick-connect.jpg",
        title: "Oxygen Quick-Connect",
        purpose: "Connects compatible oxygen equipment to a matching point-of-use outlet.",
        insight: "Gas-specific quick-connects are intentionally noninterchangeable. Never force a connector that does not seat correctly.",
      },
      {
        image: "/images/medical-air-pb-quick-connect.jpg",
        title: "Medical Air Quick-Connect",
        purpose: "Connects compatible equipment to the medical-air service.",
        insight: "The visible label can help, but the safety comes from the connector geometry and indexing that prevent cross-connection.",
      },
      {
        image: "/images/oxygen-diss-to-pb-quick-connect.jpg",
        title: "DISS-to-Quick-Connect Adapter",
        purpose: "Adapts between two compatible oxygen connection standards when the clinical setup requires it.",
        insight: "An adapter solves a connection-standard mismatch; it must never be used to defeat gas-specific indexing or connect unlike services.",
      },
    ],
    callout: {
      type: "did-you-know",
      title: "Did You Know?",
      text: "DISS and quick-connect systems reduce misconnections by making gas services physically different—not merely by using different labels or colors.",
    },
  },
  5: {
    spotlights: [
      {
        image: "/images/vacuum-diss-fitting.jpg",
        title: "Vacuum DISS Fitting",
        purpose: "Provides a threaded, service-specific connection for a medical-vacuum setup.",
        insight: "Vacuum is a negative-pressure service. When suction is unavailable, verify the outlet, regulator setting, tubing, canister, and occlusions before escalating the issue.",
      },
      {
        image: "/images/wagd-diss-to-hose-barb.jpg",
        title: "WAGD Connection",
        purpose: "Connects waste-anesthetic-gas disposal tubing to the appropriate scavenging service.",
        insight: "WAGD removes waste anesthetic gases; it is not interchangeable with routine patient suction. Confirm the intended service before connecting equipment.",
      },
    ],
    callout: {
      type: "clinical-tip",
      title: "Clinical Engineering Tip",
      text: "For a suction complaint, check the complete point-of-use chain before replacing the regulator: outlet, regulator mode, canister, tubing, and obstruction status.",
    },
  },
};

function EquipmentSpotlight({ item }) {
  const [imageAvailable, setImageAvailable] = useState(true);
  return (
    <article className="cbet-equipment-spotlight">
      <div className="cbet-equipment-photo-wrap">
        {imageAvailable ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            onError={() => setImageAvailable(false)}
          />
        ) : (
          <div className="cbet-equipment-photo-fallback" role="img" aria-label={`${item.title} image unavailable`}>
            <span aria-hidden="true">📷</span>
            <strong>{item.title}</strong>
            <small>Add {item.image.replace("/images/", "")} to public/images</small>
          </div>
        )}
      </div>
      <div className="cbet-equipment-copy">
        <span className="cbet-equipment-eyebrow">Equipment Spotlight</span>
        <h3>{item.title}</h3>
        <div className="cbet-equipment-detail">
          <strong>Purpose</strong>
          <p>{item.purpose}</p>
        </div>
        <div className="cbet-equipment-detail cbet-equipment-insight">
          <strong>Clinical Engineering Insight</strong>
          <p>{item.insight}</p>
        </div>
      </div>
    </article>
  );
}

function MissionEight({ onExit }) {
  const moduleNumber = 8;
  const savedProgress = getMissionProgress(moduleNumber);
  const completedModule = getCbetModuleState(moduleNumber);
  const questions = useMemo(() => missionEightQuestions.map(shuffleQuestion), []);
  const lessonChecks = useMemo(() => missionEightLessons.map((lesson) => shuffleQuestion(lesson.check)), []);
  const scenarioChecks = useMemo(() => missionEightScenarios.map((scenario) => shuffleQuestion({
    question: scenario.prompt,
    options: scenario.options,
    answer: scenario.answer,
    explanation: scenario.explanation
  })), []);
  const [phase, setPhaseState] = useState(savedProgress.phase || "briefing");
  const [lessonIndex, setLessonIndexState] = useState(savedProgress.lessonIndex || 0);
  const [completedLessons, setCompletedLessons] = useState(savedProgress.completedLessons || []);
  const [scenarioIndex, setScenarioIndexState] = useState(savedProgress.scenarioIndex || 0);
  const [completedScenarios, setCompletedScenarios] = useState(savedProgress.completedScenarios || []);
  const hasSavedQuizScore = Number.isFinite(savedProgress.quizScore);
  const restoredQuizIndex = savedProgress.phase === "quiz" && !hasSavedQuizScore ? 0 : (savedProgress.quizIndex || 0);
  const [questionIndex, setQuestionIndexState] = useState(restoredQuizIndex);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(hasSavedQuizScore ? savedProgress.quizScore : 0);
  const [result, setResult] = useState(
    completedModule.complete
      ? completedModule.bestScore
      : (savedProgress.phase === "result" && Number.isFinite(savedProgress.finalPercent) ? savedProgress.finalPercent : null)
  );
  const stageRef = useRef(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (!stageRef.current) return;
      const top = Math.max(0, stageRef.current.getBoundingClientRect().top + window.scrollY - 12);
      window.scrollTo({ top, left: 0, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [phase, lessonIndex, scenarioIndex, questionIndex]);

  const setPhase = (next) => {
    setPhaseState(next);
    saveMissionProgress(moduleNumber, { phase: next });
    scrollCbetPageToTop();
  };

  const completeLesson = () => {
    const nextCompleted = Array.from(new Set([...completedLessons, lessonIndex]));
    setCompletedLessons(nextCompleted);
    awardCbetXp(10, `mission8-lesson-${lessonIndex}`);
    if (lessonIndex < missionEightLessons.length - 1) {
      const next = lessonIndex + 1;
      setLessonIndexState(next);
      setSelected(null);
      saveMissionProgress(moduleNumber, { phase: "lessons", lessonIndex: next, completedLessons: nextCompleted });
    } else {
      setSelected(null);
      setScenarioIndexState(0);
      saveMissionProgress(moduleNumber, { phase: "scenarios", scenarioIndex: 0, completedLessons: nextCompleted });
      setPhaseState("scenarios");
    }
  };

  const completeScenario = () => {
    const nextCompleted = Array.from(new Set([...completedScenarios, scenarioIndex]));
    setCompletedScenarios(nextCompleted);
    awardCbetXp(15, `mission8-scenario-${scenarioIndex}`);
    setSelected(null);
    if (scenarioIndex < missionEightScenarios.length - 1) {
      const next = scenarioIndex + 1;
      setScenarioIndexState(next);
      saveMissionProgress(moduleNumber, { phase: "scenarios", scenarioIndex: next, completedScenarios: nextCompleted });
    } else {
      setQuestionIndexState(0);
      setScore(0);
      saveMissionProgress(moduleNumber, { phase: "quiz", quizIndex: 0, completedScenarios: nextCompleted });
      setPhaseState("quiz");
    }
  };

  const answerQuiz = (index) => {
    if (selected !== null) return;
    setSelected(index);
    const nextScore = index === questions[questionIndex].answer ? score + 1 : score;
    setScore(nextScore);
    saveMissionProgress(moduleNumber, { phase: "quiz", quizIndex: questionIndex, quizScore: nextScore });
    playCbetTone(index === questions[questionIndex].answer ? "correct" : "wrong");
  };

  const nextQuizQuestion = () => {
    if (questionIndex < questions.length - 1) {
      const next = questionIndex + 1;
      setQuestionIndexState(next);
      setSelected(null);
      saveMissionProgress(moduleNumber, { phase: "quiz", quizIndex: next, quizScore: score });
      return;
    }
    const finalScore = Math.round((score / questions.length) * 100);
    setResult(finalScore);
    if (finalScore >= 80) {
      completeCbetModule(moduleNumber, finalScore, 450);
      saveMissionProgress(moduleNumber, { phase: "complete", quizIndex: questionIndex, quizScore: score, finalPercent: finalScore, passed: true });
      setPhaseState("complete");
    } else {
      saveMissionProgress(moduleNumber, { phase: "result", quizIndex: questionIndex, quizScore: score, finalPercent: finalScore, passed: false });
      setPhaseState("result");
    }
    setSelected(null);
  };

  const restartQuiz = () => {
    setQuestionIndexState(0);
    setSelected(null);
    setScore(0);
    setResult(null);
    saveMissionProgress(moduleNumber, { phase: "quiz", quizIndex: 0, quizScore: 0, passed: false });
    setPhaseState("quiz");
  };

  const previousLesson = () => {
    if (lessonIndex <= 0) return;
    const next = lessonIndex - 1;
    setLessonIndexState(next);
    setSelected(null);
    saveMissionProgress(moduleNumber, { phase: "lessons", lessonIndex: next, completedLessons });
  };

  const nextRequiredText = phase === "lessons"
    ? "Read the field evidence, answer the knowledge check, then select Complete Lesson."
    : phase === "scenarios"
    ? "Treat the complaint as evidence, not the diagnosis. Choose the highest-value next diagnostic action."
    : "Choose one answer. Results are revealed after each question; 80% is required to demonstrate competency.";

  return (
    <>
      <style>{`
        .m8-shell{--m8-navy:#0b2447;--m8-blue:#2457a6;--m8-green:#1f8f5f;--m8-gold:#d99a18}
        .m8-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
        .m8-top span{font-weight:900;color:#475569}
        .m8-progress{height:9px;background:#e2e8f0;border-radius:999px;overflow:hidden;margin-bottom:20px}
        .m8-progress span{display:block;height:100%;background:linear-gradient(90deg,#2457a6,#1f8f5f)}
        .m8-guide{display:grid;grid-template-columns:.8fr 1.2fr;gap:16px;padding:18px;border:2px solid #bfdbfe;border-radius:18px;background:linear-gradient(135deg,#eff6ff,#fff);margin-bottom:20px}
        .m8-guide small,.m8-guide strong{display:block}.m8-guide small{font-size:.72rem;letter-spacing:.09em;font-weight:950;color:#2457a6}.m8-guide strong{margin-top:5px;color:#0b2447}.m8-guide .next{background:#0b2447;color:#fff;padding:13px 15px;border-radius:13px}.m8-guide .next small{color:#93c5fd}.m8-guide .next strong{color:#fff}
        .m8-hero{display:grid;grid-template-columns:1.15fr .85fr;gap:24px;padding:30px;border-radius:26px;background:linear-gradient(135deg,#0b2447,#2457a6);color:#fff;box-shadow:0 18px 45px rgba(11,36,71,.18)}
        .m8-hero h1{font-size:clamp(2.5rem,5vw,4.6rem);line-height:.98;margin:8px 0 16px}.m8-hero p{color:#dbeafe;font-size:1.08rem}.m8-pillrow{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.m8-pillrow span{padding:8px 11px;border:1px solid rgba(255,255,255,.25);border-radius:999px;background:rgba(255,255,255,.1);font-weight:850;font-size:.82rem}
        .m8-shield{display:grid;place-items:center;min-height:250px}.m8-shield div{width:210px;height:230px;clip-path:polygon(50% 0,92% 18%,84% 72%,50% 100%,16% 72%,8% 18%);background:linear-gradient(160deg,#fbbf24,#f59e0b);display:grid;place-items:center;color:#0b2447;text-align:center;padding:35px;font-weight:950;box-shadow:0 18px 35px rgba(0,0,0,.2)}.m8-shield b{font-size:2.8rem;display:block}
        .m8-brief-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;margin:20px 0}.m8-brief-grid article{padding:18px;border:1px solid #dbe4f0;border-radius:16px;background:#fff}.m8-brief-grid strong{display:block;color:#0b2447;margin-bottom:5px}.m8-brief-grid span{color:#64748b;font-size:.9rem;line-height:1.45}
        .m8-objectives{margin:22px 0;padding:24px;border:1px solid #dbe4f0;border-radius:20px;background:#fff}.m8-objectives li{margin:8px 0}
        .m8-lesson-card{padding:28px;border:1px solid #dbe4f0;border-radius:24px;background:#fff;box-shadow:0 14px 32px rgba(15,23,42,.06)}.m8-icon{font-size:2.2rem}.m8-lesson-card h1{font-size:clamp(2rem,3.6vw,3.5rem);line-height:1.12;letter-spacing:-.02em;color:#0b2447;margin:8px auto 12px;max-width:1200px;text-wrap:balance}.m8-summary{font-size:1.06rem;color:#475569}.m8-points{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:20px 0;padding:0;list-style:none}.m8-points li{padding:14px;border:1px solid #dbeafe;border-radius:13px;background:#f8fbff}
        .m8-field{margin:20px 0;padding:22px;border:2px solid #facc15;border-radius:20px;background:#fffbeb}.m8-field-label{font-size:.72rem;letter-spacing:.09em;font-weight:950;color:#a16207}.m8-evidence{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin:12px 0}.m8-evidence span{padding:10px;border-radius:10px;background:#fff;border:1px solid #fde68a;color:#713f12;font-weight:800}.m8-field h3{margin:12px 0 5px;color:#422006}.m8-field-answer{padding:13px;border-left:5px solid #d99a18;background:#fff;border-radius:10px;color:#713f12}
        .m8-check,.m8-scenario{margin-top:20px;padding:24px;border:1px solid #dbe4f0;border-radius:20px;background:#fff}.m8-check h2,.m8-scenario h2{color:#0b2447}.m8-options{display:grid;gap:10px;margin-top:15px}.m8-options button{padding:14px 16px;border:2px solid #dbe4f0;border-radius:13px;background:#fff;text-align:left;font-weight:850;cursor:pointer}.m8-options button:hover{border-color:#60a5fa}.m8-options button.correct{border-color:#22c55e;background:#f0fdf4}.m8-options button.wrong{border-color:#ef4444;background:#fef2f2}.m8-feedback{margin-top:14px;padding:14px;border-radius:12px;background:#eff6ff;color:#1e3a8a}.m8-feedback.good{background:#f0fdf4;color:#166534}.m8-feedback.bad{background:#fff7ed;color:#9a3412}
        .m8-nav{display:flex;justify-content:space-between;gap:10px;margin-top:18px;padding-top:16px;border-top:1px solid #e2e8f0}.m8-nav button{min-width:160px}
        .m8-reg-note{margin:20px 0;padding:17px 19px;border-left:5px solid #2563eb;border-radius:12px;background:#eff6ff;color:#1e3a8a}
        .m8-quizcard{max-width:960px;margin:0 auto;padding:28px;border:1px solid #dbe4f0;border-radius:22px;background:#fff}.m8-quizcat{font-size:.75rem;letter-spacing:.08em;font-weight:950;color:#2457a6}.m8-scorehero{text-align:center;padding:34px;border-radius:24px;background:linear-gradient(135deg,#ecfdf5,#fff);border:2px solid #86efac}.m8-scorehero.review{background:#fff7ed;border-color:#fdba74}.m8-scorehero strong{font-size:clamp(3rem,7vw,5rem);line-height:1;display:block;color:#0b2447;margin:8px 0 14px}.m8-scorehero h1{font-size:clamp(2rem,4.2vw,3.6rem);line-height:1.08;letter-spacing:-.025em;margin:8px auto 14px;color:#0b2447;max-width:1100px;text-wrap:balance}
        @media(max-width:850px){.m8-hero,.m8-guide{grid-template-columns:1fr}.m8-brief-grid{grid-template-columns:1fr}.m8-points,.m8-evidence{grid-template-columns:1fr}.m8-shield{min-height:180px}}
        @media(max-width:600px){.m8-top,.m8-nav{align-items:stretch;flex-direction:column}.m8-nav button{width:100%}.m8-lesson-card,.m8-check,.m8-scenario,.m8-quizcard{padding:18px}}
      `}</style>

      {phase === "briefing" && (
        <section className="cbet-shell m8-shell">
          <div className="m8-top"><button className="cbet-back" onClick={onExit}>← Back to Academy</button><span>Mission 8 · 350 XP</span></div>
          <section className="m8-hero">
            <div>
              <span className="cbet-label">SAFETY · RISK · REGULATORY READINESS</span>
              <h1>{missionEightBriefing.title}</h1>
              <p>{missionEightBriefing.summary}</p>
              <div className="m8-pillrow"><span>Electrical Safety</span><span>Return to Service</span><span>Incident Response</span><span>Recalls</span><span>Documentation</span><span>FDA MDR</span></div>
            </div>
            <div className="m8-shield"><div><span><b>✓</b>WOULD YOU PUT THIS DEVICE BACK ON A PATIENT?</span></div></div>
          </section>
          <div className="m8-brief-grid">
            <article><strong>8 Guided Lessons</strong><span>Safety decisions tied to actual CE workflow.</span></article>
            <article><strong>4 Applied Service Calls</strong><span>Incidents, recalls, electrical safety, and alarms.</span></article>
            <article><strong>20-Question Competency Check</strong><span>80% required to complete Mission 8.</span></article>
          </div>
          <section className="m8-objectives"><h2>What you will learn</h2><ul>{missionEightBriefing.objectives.map((item)=><li key={item}>{item}</li>)}</ul></section>
          <div className="m8-reg-note"><strong>Important:</strong> Standards, manufacturer procedures, and regulatory requirements can change. Mission 8 teaches the decision process and high-yield concepts; real service work must follow current manufacturer documentation, facility policy, and applicable requirements.</div>
          <div className="cbet-actions"><button className="cbet-primary" onClick={()=>setPhase("lessons")}>{savedProgress.phase && savedProgress.phase !== "briefing" ? "Resume Mission" : "Begin Mission 8"}</button></div>
        </section>
      )}

      {phase === "lessons" && (() => {
        const lesson=missionEightLessons[lessonIndex];
        const check=lessonChecks[lessonIndex];
        const correct=selected===check.answer;
        const answered=selected!==null;
        return <section ref={stageRef} className="cbet-shell m8-shell">
          <div className="m8-top"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Lesson {lessonIndex+1} of {missionEightLessons.length}</span></div>
          <div className="m8-progress"><span style={{width:`${((lessonIndex+1)/missionEightLessons.length)*100}%`}}/></div>
          <section className="m8-guide"><div><small>HOW TO COMPLETE THIS LESSON</small><strong>1. Study the diagnostic principle → inspect the evidence → choose the best next action → prove your reasoning.</strong></div><div className="next"><small>YOUR NEXT ACTION</small><strong>{answered ? (correct ? "Correct — select Complete Lesson below." : "Review the evidence and choose another answer.") : nextRequiredText}</strong></div></section>
          <article className="m8-lesson-card">
            <span className="m8-icon">{lesson.icon}</span><h1>{lesson.title}</h1><p className="m8-summary">{lesson.summary}</p>
            <ul className="m8-points">{lesson.points.map((p)=><li key={p}>{p}</li>)}</ul>
            <section className="m8-field"><span className="m8-field-label">IN THE FIELD · {lesson.fieldCase.label}</span><div className="m8-evidence">{lesson.fieldCase.evidence.map((e)=><span key={e}>{e}</span>)}</div><h3>{lesson.fieldCase.question}</h3><div className="m8-field-answer"><strong>CE reasoning:</strong> {lesson.fieldCase.answer}</div></section>
          </article>
          <section className="m8-check"><span className="cbet-label">Quick Knowledge Check</span><h2>{check.question}</h2><div className="m8-options">{check.options.map((o,i)=><button key={o} disabled={correct} className={`${answered&&i===check.answer?"correct":""} ${answered&&i===selected&&i!==check.answer?"wrong":""}`} onClick={()=>{setSelected(i);playCbetTone(i===check.answer?"correct":"wrong")}}><strong>{String.fromCharCode(65+i)}.</strong> {o}</button>)}</div>{answered&&<div className={`m8-feedback ${correct?"good":"bad"}`}><strong>{correct?"Correct.":"Not yet."}</strong> {correct?check.explanation:"Use the field evidence and safety principle above, then try again."}</div>}<div className="m8-nav"><button className="cbet-secondary" disabled={lessonIndex===0} onClick={previousLesson}>← Previous Lesson</button><button className="cbet-primary" disabled={!correct} onClick={completeLesson}>{lessonIndex===missionEightLessons.length-1?"Finish Lessons →":"Complete Lesson →"}</button></div></section>
        </section>
      })()}

      {phase === "scenarios" && (() => {
        const item=missionEightScenarios[scenarioIndex];
        const scenario=scenarioChecks[scenarioIndex];
        const answered=selected!==null;
        const correct=selected===scenario.answer;
        return <section ref={stageRef} className="cbet-shell m8-shell">
          <div className="m8-top"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Advanced Service Call {scenarioIndex+1} of {missionEightScenarios.length}</span></div>
          <div className="m8-progress"><span style={{width:`${((scenarioIndex+1)/missionEightScenarios.length)*100}%`}}/></div>
          <section className="m8-guide"><div><small>HOW TO COMPLETE THIS CALL</small><strong>Read every clue. Several actions may sound reasonable; choose the one that best narrows the fault without skipping safety.</strong></div><div className="next"><small>YOUR NEXT ACTION</small><strong>{answered?(correct?"Correct — continue to the next call.":"Review the evidence and try another action."):nextRequiredText}</strong></div></section>
          <section className="m8-scenario"><span className="cbet-label">HOSPITAL SERVICE CALL</span><h1>{item.title}</h1><p className="m8-summary">{item.prompt}</p><div className="m8-options">{scenario.options.map((o,i)=><button key={o} disabled={correct} className={`${answered&&i===scenario.answer?"correct":""} ${answered&&i===selected&&i!==scenario.answer?"wrong":""}`} onClick={()=>{setSelected(i);playCbetTone(i===scenario.answer?"correct":"wrong")}}><strong>{String.fromCharCode(65+i)}.</strong> {o}</button>)}</div>{answered&&<div className={`m8-feedback ${correct?"good":"bad"}`}><strong>{correct?"Strong troubleshooting decision.":"Keep working the evidence."}</strong> {correct?scenario.explanation:"Use the evidence to choose the action that narrows the fault without bypassing safety."}</div>}<div className="m8-nav"><button className="cbet-secondary" onClick={()=>{setSelected(null);setPhaseState("lessons");setLessonIndexState(missionEightLessons.length-1);saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:missionEightLessons.length-1})}}>← Review Last Lesson</button><button className="cbet-primary" disabled={!correct} onClick={completeScenario}>{scenarioIndex===missionEightScenarios.length-1?"Start Competency Check →":"Next Service Call →"}</button></div></section>
        </section>
      })()}

      {phase === "quiz" && (() => {
        const q=questions[questionIndex];
        const answered=selected!==null;
        const correct=selected===q.answer;
        return <section ref={stageRef} className="cbet-shell m8-shell">
          <div className="m8-top"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 8 Competency Check · {questionIndex+1}/{questions.length}</span></div>
          <div className="m8-progress"><span style={{width:`${((questionIndex+1)/questions.length)*100}%`}}/></div>
          <section className="m8-guide"><div><small>COMPETENCY MODE</small><strong>No diagnosis is given. Apply the evidence patterns from the mission.</strong></div><div className="next"><small>PASSING STANDARD</small><strong>80% required · {questions.length} questions</strong></div></section>
          <article className="m8-quizcard"><span className="m8-quizcat">{q.category||"Advanced Troubleshooting"}</span><h1>{q.question}</h1><div className="m8-options">{q.options.map((o,i)=><button key={o} disabled={answered} className={`${answered&&i===q.answer?"correct":""} ${answered&&i===selected&&i!==q.answer?"wrong":""}`} onClick={()=>answerQuiz(i)}><strong>{String.fromCharCode(65+i)}.</strong> {o}</button>)}</div>{answered&&<div className={`m8-feedback ${correct?"good":"bad"}`}><strong>{correct?"Correct.":"Review this point."}</strong> {q.explanation}</div>}<div className="m8-nav"><button className="cbet-secondary" disabled={questionIndex===0} onClick={()=>{const prev=questionIndex-1;setQuestionIndexState(prev);setSelected(null);saveMissionProgress(moduleNumber,{phase:"quiz",quizIndex:prev})}}>← Previous</button><button className="cbet-primary" disabled={!answered} onClick={nextQuizQuestion}>{questionIndex===questions.length-1?"Submit Assessment":"Next Question →"}</button></div></article>
        </section>
      })()}

      {phase === "result" && <section className="cbet-shell m8-shell"><button className="cbet-back" onClick={onExit}>← Back to Academy</button><section className="m8-scorehero review"><span className="cbet-label">MISSION 8 RESULT</span><strong>{result}%</strong><h1>Review Recommended</h1><p>You need 80% to demonstrate competency. Review the lessons or retake the assessment.</p><div className="cbet-actions"><button className="cbet-secondary" onClick={()=>{setLessonIndexState(0);setSelected(null);setPhaseState("lessons");saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:0})}}>Review Mission</button><button className="cbet-primary" onClick={restartQuiz}>Retake Assessment</button></div></section></section>}

      {phase === "complete" && <section className="cbet-shell m8-shell"><button className="cbet-back" onClick={onExit}>← Back to Academy</button><section className="m8-scorehero"><span className="cbet-label">MISSION 8 COMPLETE</span><strong>{result ?? completedModule.bestScore ?? savedProgress.quizScore ?? 80}%</strong><h1>🏆 Evidence-Based Troubleshooting Competency Demonstrated</h1><p>You demonstrated competency across medical equipment, accessories, power, safety interlocks, intermittent faults, networking, environmental causes, and repair verification.</p><div className="cbet-actions"><button className="cbet-secondary" onClick={()=>{setLessonIndexState(0);setSelected(null);setPhaseState("lessons");saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:0})}}>Review Mission</button><button className="cbet-primary" onClick={onExit}>Return to Academy →</button></div></section></section>}
    </>
  );
}



const MISSION_NINE_LESSONS = [
  { title: "Read the Complaint Without Anchoring", icon: "🧭", points: ["Treat the user complaint as evidence, not a diagnosis.", "Separate what is observed from what is assumed.", "Look for the fastest safe check that can eliminate an entire fault category."], check: { question: "A portable X-ray unit displays COLLISION and will not drive. What is the strongest first action?", options: ["Inspect travel path, bumpers, and collision sensors for obstruction", "Clear the collision flag in service mode and retest movement", "Replace the drive-control board and verify motor operation", "Cycle system power and repeat the drive-enable sequence"], answer: 0, explanation: "A collision message plus inhibited motion makes a physical interlock or obstructed sensor a high-value first check. Confirm the simple external cause before escalating." } },
  { title: "Power, Interlocks & Emergency Stops", icon: "⛔", points: ["A device that appears dead may be intentionally inhibited by an interlock.", "Check emergency stops, breakers, line power, detachable cords, and mechanical power switches before opening equipment.", "Never bypass a safety interlock to make a symptom disappear."], check: { question: "An entire radiographic room appears powered but the imaging system will not enable after environmental services cleaned the room. What should move near the top of your first-pass inspection?", options: ["Verify emergency-off controls and system interlock/enable states", "Inspect the generator contactor and exposure-enable circuit", "Recalibrate tube-position encoders and repeat system initialization", "Restart acquisition services and verify workstation communication status"], answer: 0, explanation: "An accidentally operated emergency-off is plausible, externally verifiable, and can inhibit the room while other power remains present." } },
  { title: "Mechanical Before Electronic", icon: "⚙️", points: ["Mechanical states often create electronic-looking symptoms.", "Inspect brakes, latches, wheels, bumpers, cables, connectors, sensors, and accessories before assuming a board failure.", "Ask what changed immediately before the failure."], check: { question: "A portable ultrasound powers normally but staff report it suddenly will not roll. No alarms are present. What is the best first diagnostic move?", options: ["Inspect wheel/brake controls and confirm the brake is released", "Measure wheel-drive voltage while commanding cart movement", "Inspect and replace any caster that binds under load", "Review system logs for motion or brake-related faults"], answer: 0, explanation: "A brake left in the stop position can perfectly mimic a mobility failure. Verify the mechanical state before electrical disassembly." } },
  { title: "Signal Chain Reasoning", icon: "📈", points: ["Follow the signal from source to sensor, cable, module, processing, display, and network destination.", "Use substitutions only when they isolate a specific stage.", "A displayed number is the end of a chain, not the beginning of a diagnosis."], check: { question: "A bedside monitor shows intermittent SpO₂ dropouts on one patient. ECG and NIBP are stable. What is the most efficient next step?", options: ["Inspect sensor/site and compare with a known-good compatible sensor", "Replace the parameter module and repeat the SpO₂ functional check", "Move the monitor to a known-good network port and retest", "Run electrical-safety testing before evaluating the SpO₂ accessory"], answer: 0, explanation: "The failure is isolated to one acquisition chain. Start at the patient/accessory end and move inward using evidence." } },
  { title: "Network or Device?", icon: "🌐", points: ["Local function and network function are different layers.", "Prove whether data exists at the source before troubleshooting the destination.", "Use scope: one device, one room, one VLAN, or the entire service."], check: { question: "A patient monitor displays waveforms correctly at bedside but disappears from the central station after being moved to another room. What evidence is most useful next?", options: ["Verify network connectivity, addressing, and room assignment", "Inspect ECG acquisition, cable integrity, and bedside alarm configuration", "Restart the central station and force the monitor to re-register", "Run NIBP calibration and compare the monitor with a simulator"], answer: 0, explanation: "Local acquisition works. The fault boundary has shifted toward connectivity, configuration, or central registration." } },
  { title: "Return to Service Is a Decision", icon: "✅", points: ["A repair is not complete when the symptom disappears.", "Verify the function that failed, related safety functions, and the clinical workflow affected by the repair.", "Document objective evidence and final disposition."], check: { question: "You reseat a loose connector and a transport monitor powers up again. Which action best supports return to service?", options: ["Verify affected functions under representative use, then document disposition", "Return the monitor because normal power has already been restored", "Run electrical-safety testing and return it if the test passes", "Replace the battery and repeat startup before returning the monitor"], answer: 0, explanation: "Restored power is necessary but not sufficient. Verification should address the original failure and representative clinical use." } },
];

const MISSION_NINE_SCENARIOS = [
  { title: "Portable X-ray: Collision Error", prompt: "A portable X-ray unit powers up normally but will not drive. The display reports a collision error. Staff say it was working earlier and no service was performed.", question: "What should you do first?", options: ["Walk the unit and inspect collision bumpers/sensors and anything attached to the column that could hold a sensor out of position", "Connect the service laptop and command a collision-sensor calibration", "Replace the drive joystick because the unit cannot move in either direction", "Open the base and measure drive-motor current while commanding forward motion"], answer: 0, explanation: "A physical obstruction can hold a collision sensor active. A lead apron hanging from the column is exactly the kind of simple field condition that can create this complaint." },
  { title: "X-ray Room: Nothing Will Expose", prompt: "Staff report the X-ray room suddenly stopped working. The workstation is on, but the imaging chain will not enable. The room had heavy traffic immediately before the call.", question: "Which first-pass check has the highest diagnostic value?", options: ["Inspect emergency-off and room interlock states, then verify the system's normal enable sequence", "Replace the exposure hand switch because it is the most frequently handled component", "Restart the PACS interface because images cannot be generated without network connectivity", "Begin tube calibration because a calibration fault can inhibit exposures"], answer: 0, explanation: "An emergency shutoff can be accidentally hit and inhibit the room. It is fast, safe, and high value to verify before invasive troubleshooting." },
  { title: "Portable Ultrasound: Won't Move", prompt: "A portable ultrasound has normal display, imaging, and battery status. The complaint is simply 'the cart won't move.' The user says it was relocated between departments.", question: "What is the best next action?", options: ["Inspect the foot brake and confirm the control is in the released/run position rather than the stop position", "Remove the rear cover and test the internal power distribution board", "Replace the battery because low voltage can increase rolling resistance", "Reset the ultrasound application to restore cart-control communication"], answer: 0, explanation: "The brake position is an external mechanical state that can fully explain the complaint without any electronic failure." },
  { title: "Infusion Pump: Intermittent Occlusion", prompt: "An infusion pump repeatedly alarms occlusion on one setup. The pump passes its self-test. A second pump produces the same complaint with the same tubing and patient setup.", question: "What conclusion is best supported by the evidence?", options: ["Shift the investigation toward the administration set, clamps, tubing path, and downstream clinical setup", "Both pumps likely share the same pressure-sensor calibration defect", "The hospital network is probably delaying alarm processing", "Replace both pump batteries because motor torque falls during infusion"], answer: 0, explanation: "The symptom followed the setup rather than the device. That substitution is strong evidence to investigate the common external path." },
];

const MISSION_NINE_QUESTIONS = [
  {category:"Field Reasoning",question:"A ventilator powers on and passes self-test, but staff report low delivered volume after a circuit change. What is the strongest first move?",options:["Inspect the complete breathing circuit, connections, valves, and accessories against the intended setup","Replace the flow sensor because volume is calculated from flow","Run a software update before repeating the complaint","Open the pneumatic section and adjust internal regulator pressure"],answer:0,explanation:"The complaint began after a circuit change. Verify the changed external system before internal repair."},
  {category:"Safety",question:"A device functions after you manipulate a damaged power cord near the strain relief. What is the best disposition?",options:["Remove it from service and correct the damaged power-path condition before functional verification","Document that the cord works when positioned correctly and return it","Tape the strain relief temporarily and schedule replacement at the next PM","Perform a battery test; if it passes, the cord condition is not urgent"],answer:0,explanation:"Intermittent mains integrity is a safety and reliability defect; positioning the cord is not a repair."},
  {category:"Troubleshooting",question:"Two identical monitors work at the bedside. Only one fails to send data when connected to the same known-good network drop. What does that comparison support?",options:["The fault boundary moves toward that monitor's network configuration, interface, or hardware","The network drop is still the most likely cause because both monitors use it","The central station must be restarted before any device-side testing","The patient cables should be exchanged because physiologic data drives network registration"],answer:0,explanation:"Holding the network drop constant while the symptom follows one monitor points back toward the device side."},
  {category:"Electrical",question:"A device repeatedly opens the correct-rated input fuse immediately after replacement. What is the appropriate next step?",options:["Stop replacing fuses and investigate for an overcurrent or short condition in the input/power path","Install the next higher fuse rating to determine the normal operating current","Bypass the fuse briefly so downstream voltages can be measured","Assume the replacement fuse batch is defective and try several more"],answer:0,explanation:"A repeatedly opening protective device is evidence of a fault. Do not defeat or up-rate protection."},
  {category:"Clinical Systems",question:"NIBP fails on every patient, but ECG and SpO₂ are normal. A known-good cuff and hose do not change the symptom. Which next action best narrows the fault?",options:["Evaluate the NIBP pneumatic/module path using the manufacturer's supported diagnostics","Replace the monitor display because all parameters share it","Troubleshoot the central station because NIBP results are charted there","Replace the ECG lead set to eliminate patient-accessory interference"],answer:0,explanation:"Known-good accessories have already reduced the likelihood of the external NIBP path; move inward to the affected subsystem."},
  {category:"Equipment",question:"A powered stretcher will raise and lower but will not drive. No drive fault is displayed. What should be checked before opening the drive electronics?",options:["Drive-enable controls, brake state, wheel obstruction, user controls, and required mechanical interlocks","The lift actuator because it shares the battery","The nurse-call interface because it can inhibit transport","The mattress ground strap because static can block motor control"],answer:0,explanation:"Prove the external enable and mechanical conditions first; working lift function also confirms some shared power is available."},
  {category:"Networking",question:"After a repair, a networked medical device responds to ping but results never reach the clinical application. What verification is strongest?",options:["Trace and test the complete application workflow, including destination configuration and successful result receipt","Accept ping as proof that networking is restored","Replace the Ethernet cable because application traffic is more demanding than ping","Disable the firewall permanently to determine whether traffic begins flowing"],answer:0,explanation:"Layer-3 reachability does not prove application workflow. Verify end-to-end clinical function."},
  {category:"Documentation",question:"Which service note provides the strongest traceability?",options:["Reported symptom, condition found, diagnostic evidence, corrective action, verification results, and final disposition","Unit checked; problem fixed; returned to floor","PM completed and device operational","Rebooted equipment; no further issue at this time"],answer:0,explanation:"Specific evidence lets another technician, auditor, or investigator understand what occurred and how closure was justified."},
  {category:"Risk",question:"A user asks you to bypass a door interlock for five minutes so a procedure can continue. What is the best response?",options:["Do not bypass the safety function; escalate through the appropriate clinical and technical pathway","Bypass it only while you remain in the room","Bypass it if the user accepts responsibility in writing","Disable the alarm but leave the interlock electrically active"],answer:0,explanation:"Operational pressure does not justify defeating a safety control."},
  {category:"Exam Strategy",question:"On a CBET-style troubleshooting question, two answers could eventually be useful. How should you choose the BEST next action?",options:["Prefer the safe action that uses current evidence to narrow the fault most efficiently without assuming the diagnosis","Choose the most technically advanced test because it demonstrates deeper knowledge","Choose the component replacement that would eliminate the greatest number of possible faults","Choose the longest answer because exam writers usually place required qualifiers there"],answer:0,explanation:"Best-next-step questions reward safe, evidence-based isolation—not complexity, replacement, or answer-length cues."},
  {category:"Equipment",question:"A defibrillator charges normally on AC but fails early during battery operation. What evidence would best guide the next step?",options:["Compare battery condition and loaded voltage behavior with manufacturer criteria before condemning charging electronics","Replace the high-voltage capacitor because shocks use stored energy","Recalibrate ECG gain because battery operation changes signal amplitude","Replace the paddles because contact impedance increases battery drain"],answer:0,explanation:"The failure is mode-dependent. Test the subsystem unique to battery operation under relevant load."},
  {category:"Field Reasoning",question:"A complaint disappears when you arrive. What is the strongest approach?",options:["Reconstruct conditions with the user, review logs/history, inspect likely intermittent connections, and attempt controlled reproduction","Close the call as no problem found because the device is currently operational","Replace the most failure-prone board to prevent recurrence","Run only the startup self-test and return the unit if it passes"],answer:0,explanation:"Intermittent faults require context and evidence. A present-time pass does not erase the reported failure."},
  {category:"Clinical Systems",question:"A pulse-oximeter reads 82% with a poor pleth waveform while the patient appears stable and another validated monitor reads 98%. What is the best technical interpretation?",options:["Question signal quality and investigate sensor/site/accessory acquisition before treating 82% as a confirmed device output fault","The first monitor's processor has failed because the numeric values disagree","The second monitor must be wrong because higher SpO₂ values are less sensitive","Network latency is causing the first monitor to display an older saturation"],answer:0,explanation:"Waveform quality is evidence. Validate acquisition before diagnosing the monitor from a single number."},
  {category:"Return to Service",question:"After repairing a mobile X-ray drive complaint, which verification is most defensible?",options:["Verify normal drive, steering, braking, collision sensing, and representative movement conditions, then document results","Drive it forward several feet; if it moves, return it","Clear the error history and confirm no active codes remain","Check battery percentage because adequate charge proves the drive system is healthy"],answer:0,explanation:"Verification should cover the repaired function and related safety behaviors under representative use."},
  {category:"Troubleshooting",question:"A replacement part does not change the symptom. What should a disciplined BMET do next?",options:["Reassess the fault hypothesis and evidence instead of stacking additional unproven replacements","Replace the next board in the signal chain until the symptom changes","Assume the replacement part was defective and order another immediately","Reset all calibration values so the new component can be recognized"],answer:0,explanation:"No symptom change is new evidence. Update the hypothesis rather than continuing parts substitution without isolation."},
];

function MissionNine({ onExit }) {
  const moduleNumber = 9;
  const saved = getMissionProgress(moduleNumber);
  const completedModule = getCbetModuleState(moduleNumber);
  const lessons = useMemo(() => MISSION_NINE_LESSONS.map((lesson) => ({...lesson, check: shuffleQuestion(lesson.check)})), []);
  const scenarios = useMemo(() => MISSION_NINE_SCENARIOS.map((item) => ({...item, ...shuffleQuestion({question:item.question,options:item.options,answer:item.answer,explanation:item.explanation})})), []);
  const questions = useMemo(() => MISSION_NINE_QUESTIONS.map(shuffleQuestion), []);
  const [phase,setPhaseState]=useState(saved.phase || "briefing");
  const [lessonIndex,setLessonIndex]=useState(saved.lessonIndex || 0);
  const [scenarioIndex,setScenarioIndex]=useState(saved.scenarioIndex || 0);
  const [questionIndex,setQuestionIndex]=useState(saved.phase === "quiz" ? (saved.quizIndex || 0) : 0);
  const [selected,setSelected]=useState(null);
  const savedQuizCorrect = saved.phase === "quiz" && Number.isFinite(saved.quizScore) ? saved.quizScore : 0;
  const [score,setScore]=useState(savedQuizCorrect);
  const [result,setResult]=useState(completedModule.complete ? completedModule.bestScore : (Number.isFinite(saved.quizScore) ? saved.quizScore : null));
  const stageRef=useRef(null);
  useEffect(()=>{const t=window.setTimeout(()=>stageRef.current?.scrollIntoView({behavior:"auto",block:"start"}),30);return()=>window.clearTimeout(t)},[phase,lessonIndex,scenarioIndex,questionIndex]);
  const go=(next,data={})=>{setSelected(null);setPhaseState(next);saveMissionProgress(moduleNumber,{phase:next,...data})};
  const answer=(i,correct)=>{if(selected!==null)return;setSelected(i);playCbetTone(i===correct?"correct":"wrong")};
  const nextLesson=()=>{awardCbetXp(10,`mission9-lesson-${lessonIndex}`);if(lessonIndex<lessons.length-1){const n=lessonIndex+1;setLessonIndex(n);setSelected(null);saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:n})}else{setScenarioIndex(0);go("scenarios",{scenarioIndex:0})}};
  const nextScenario=()=>{awardCbetXp(15,`mission9-scenario-${scenarioIndex}`);if(scenarioIndex<scenarios.length-1){const n=scenarioIndex+1;setScenarioIndex(n);setSelected(null);saveMissionProgress(moduleNumber,{phase:"scenarios",scenarioIndex:n})}else{setQuestionIndex(0);setScore(0);go("quiz",{quizIndex:0,quizScore:0})}};
  const answerQuiz=(i)=>{if(selected!==null)return;setSelected(i);const ok=i===questions[questionIndex].answer;const nextScore=ok?score+1:score;setScore(nextScore);saveMissionProgress(moduleNumber,{phase:"quiz",quizIndex:questionIndex,quizScore:nextScore});playCbetTone(ok?"correct":"wrong")};
  const nextQuiz=()=>{if(questionIndex<questions.length-1){const n=questionIndex+1;setQuestionIndex(n);setSelected(null);saveMissionProgress(moduleNumber,{phase:"quiz",quizIndex:n,quizScore:score});return}const pct=Math.round((score/questions.length)*100);setResult(pct);if(pct>=80){completeCbetModule(moduleNumber,pct,400);go("complete",{quizScore:pct,passed:true})}else go("result",{quizScore:pct,passed:false})};
  const restart=()=>{setQuestionIndex(0);setScore(0);setResult(null);go("quiz",{quizIndex:0,quizScore:0,passed:false})};
  const guide=(text)=><div className="m9-guide"><div><span>HOW TO THINK</span><strong>Observe → isolate → verify → document.</strong></div><div><span>YOUR NEXT ACTION</span><strong>{text}</strong></div></div>;
  return <section ref={stageRef} className="cbet-shell m9-shell"><style>{`
    .m9-shell{--navy:#0b2447;--blue:#1859a9;--green:#18865d;padding-bottom:60px}.m9-back{margin:14px 0}.m9-guide{display:grid;grid-template-columns:.75fr 1.25fr;gap:16px;border:2px solid #bfdbfe;background:#f8fbff;padding:18px;border-radius:18px;margin:18px 0}.m9-guide>div:last-child{background:var(--navy);color:white;border-radius:14px;padding:14px}.m9-guide span{display:block;font-size:.74rem;font-weight:950;letter-spacing:.1em;color:#2563a8}.m9-guide>div:last-child span{color:#93c5fd}.m9-guide strong{display:block;margin-top:5px;font-size:1.05rem}.m9-hero{background:linear-gradient(135deg,#071b36,#174f91);color:white;border-radius:28px;padding:36px;box-shadow:0 20px 45px rgba(11,36,71,.18)}.m9-hero h1{font-size:clamp(2.5rem,5vw,4.5rem);line-height:1;margin:8px 0 14px}.m9-hero p{font-size:1.1rem;color:#dbeafe;max-width:850px}.m9-chips{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0}.m9-chips span{border:1px solid #ffffff44;background:#ffffff12;padding:8px 12px;border-radius:999px;font-weight:800}.m9-objectives,.m9-card{background:white;border:1px solid #dbe4f0;border-radius:22px;padding:26px;margin-top:20px}.m9-objectives li{margin:10px 0}.m9-title{text-align:center;margin:16px 0 10px}.m9-title h1{font-size:clamp(2rem,3.2vw,2.9rem);line-height:1.08;margin:5px auto 8px;max-width:900px}.m9-points{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:18px 0}.m9-points p{margin:0;padding:16px;border-radius:15px;background:#f3f7fc;border:1px solid #dbe7f4}.m9-options{display:grid;gap:11px;margin:18px 0}.m9-options button{text-align:left;border:2px solid #d9e3ef;background:white;border-radius:14px;padding:15px;font-weight:750;color:#102846}.m9-options button:hover:not(:disabled){border-color:#60a5fa}.m9-options button.correct{border-color:#22c55e;background:#ecfdf5}.m9-options button.wrong{border-color:#ef4444;background:#fff1f2}.m9-feedback{padding:15px;border-radius:14px;background:#eff6ff;margin:12px 0}.m9-feedback.good{background:#ecfdf5}.m9-feedback.bad{background:#fff1f2}.m9-nav{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-top:18px}.m9-meta{display:flex;justify-content:space-between;gap:12px;font-weight:850;color:#52647b;margin:10px 0}.m9-progress{height:9px;background:#e2e8f0;border-radius:999px;overflow:hidden}.m9-progress span{display:block;height:100%;background:linear-gradient(90deg,var(--blue),var(--green))}.m9-score{text-align:center;padding:38px}.m9-score strong{display:block;font-size:5rem;color:var(--navy)}@media(max-width:760px){.m9-guide,.m9-points{grid-template-columns:1fr}.m9-nav{flex-direction:column}.m9-nav button{width:100%}}
  `}</style><button className="cbet-text-button m9-back" onClick={onExit}>← Save & Exit</button>
  {phase==="briefing"&&<><div className="m9-hero"><span className="cbet-label">MISSION 9 · CBET EXAM READINESS</span><h1>Think Like a BMET.</h1><p>This mission is not a vocabulary review. It tests whether you can read incomplete field evidence, resist distractors, choose the safest high-value next step, and verify a repair like a working biomedical equipment technician.</p><div className="m9-chips"><span>Equipment faults</span><span>Electrical reasoning</span><span>Clinical systems</span><span>Networking</span><span>Safety</span><span>Exam strategy</span></div></div><div className="m9-objectives"><h2>Mission objectives</h2><ul><li>Separate the reported complaint from the actual fault.</li><li>Recognize simple mechanical and interlock problems before escalating to electronics.</li><li>Use signal-chain and substitution evidence to narrow faults.</li><li>Choose defensible return-to-service verification.</li><li>Handle CBET-style “best next action” questions without relying on answer length or position.</li></ul><div className="cbet-stats"><div><strong>{lessons.length}</strong><span>Lessons</span></div><div><strong>{scenarios.length}</strong><span>Field Calls</span></div><div><strong>{questions.length}</strong><span>Challenge Qs</span></div><div><strong>400</strong><span>XP</span></div></div><button className="cbet-primary full" onClick={()=>go("lessons",{lessonIndex:0})}>Begin Mission 9 →</button></div></>}
  {phase==="lessons"&&(()=>{const l=lessons[lessonIndex],c=l.check,ok=selected===c.answer;return <>{guide("Read the evidence, then choose the BEST next action—not merely an action that could work.")}<div className="m9-meta"><span>Mission 9 · Lesson {lessonIndex+1} of {lessons.length}</span><span>CBET reasoning</span></div><div className="m9-progress"><span style={{width:`${((lessonIndex+1)/lessons.length)*100}%`}}/></div><div className="m9-title"><span className="cbet-label">{l.icon} FIELD REASONING</span><h1>{l.title}</h1></div><article className="m9-card"><div className="m9-points">{l.points.map(x=><p key={x}>{x}</p>)}</div><h2>{c.question}</h2><div className="m9-options">{c.options.map((o,i)=><button key={o} disabled={ok} className={`${selected!==null&&i===c.answer?"correct":""} ${selected===i&&!ok?"wrong":""}`} onClick={()=>answer(i,c.answer)}><strong>{String.fromCharCode(65+i)}.</strong> {o}</button>)}</div>{selected!==null&&<div className={`m9-feedback ${ok?"good":"bad"}`}><strong>{ok?"Strong decision.":"Not the best next action."}</strong> {ok?c.explanation:"Use the evidence to eliminate the largest fault category safely, then try again."}</div>}<div className="m9-nav"><button className="cbet-secondary" disabled={lessonIndex===0} onClick={()=>{setLessonIndex(v=>v-1);setSelected(null)}}>← Previous</button><button className="cbet-primary" disabled={!ok} onClick={nextLesson}>{lessonIndex===lessons.length-1?"Start Field Calls →":"Complete Lesson →"}</button></div></article></>})()}
  {phase==="scenarios"&&(()=>{const x=scenarios[scenarioIndex],ok=selected===x.answer;return <>{guide("Work the complaint like a service call. Look for the simplest evidence-supported cause before invasive testing.")}<div className="m9-meta"><span>Advanced Field Call {scenarioIndex+1} of {scenarios.length}</span><span>Applied troubleshooting</span></div><div className="m9-progress"><span style={{width:`${((scenarioIndex+1)/scenarios.length)*100}%`}}/></div><article className="m9-card"><span className="cbet-label">HOSPITAL SERVICE CALL</span><h1>{x.title}</h1><p>{x.prompt}</p><h2>{x.question}</h2><div className="m9-options">{x.options.map((o,i)=><button key={o} disabled={ok} className={`${selected!==null&&i===x.answer?"correct":""} ${selected===i&&!ok?"wrong":""}`} onClick={()=>answer(i,x.answer)}><strong>{String.fromCharCode(65+i)}.</strong> {o}</button>)}</div>{selected!==null&&<div className={`m9-feedback ${ok?"good":"bad"}`}><strong>{ok?"Best next step.":"Keep isolating."}</strong> {ok?x.explanation:"That action may be possible, but it is not the strongest next step from the evidence given."}</div>}<div className="m9-nav"><span>Complaint ≠ diagnosis</span><button className="cbet-primary" disabled={!ok} onClick={nextScenario}>{scenarioIndex===scenarios.length-1?"Start Final Challenge →":"Next Service Call →"}</button></div></article></>})()}
  {phase==="quiz"&&(()=>{const q=questions[questionIndex],ok=selected===q.answer;return <>{guide("Choose one BEST answer. Answer positions are randomized every attempt; do not use length or placement as a clue.")}<div className="m9-meta"><span>Final Challenge · {questionIndex+1} of {questions.length}</span><span>{q.category}</span></div><div className="m9-progress"><span style={{width:`${((questionIndex+1)/questions.length)*100}%`}}/></div><article className="m9-card"><h2>{q.question}</h2><div className="m9-options">{q.options.map((o,i)=><button key={o} disabled={selected!==null} className={`${selected!==null&&i===q.answer?"correct":""} ${selected===i&&!ok?"wrong":""}`} onClick={()=>answerQuiz(i)}><strong>{String.fromCharCode(65+i)}.</strong> {o}</button>)}</div>{selected!==null&&<div className={`m9-feedback ${ok?"good":"bad"}`}><strong>{ok?"Correct.":"Incorrect."}</strong> {q.explanation}</div>}<div className="m9-nav"><span>Current score: {score}/{questions.length}</span><button className="cbet-primary" disabled={selected===null} onClick={nextQuiz}>{questionIndex===questions.length-1?"Finish Mission":"Next Question →"}</button></div></article></>})()}
  {phase==="result"&&<div className="m9-card m9-score"><span className="cbet-label">MISSION 9 RESULT</span><strong>{result}%</strong><h1>80% is required to demonstrate exam readiness.</h1><p>Review the reasoning—not just the missed answer. The goal is to choose the safest evidence-based next action under exam pressure.</p><button className="cbet-primary" onClick={restart}>Retake Challenge</button></div>}
  {phase==="complete"&&<div className="m9-card m9-score"><span className="cbet-label">MISSION 9 COMPLETE</span><strong>{result}%</strong><h1>🏆 CBET Exam Readiness Demonstrated</h1><p>You demonstrated evidence-based troubleshooting across equipment, electrical, clinical, networking, safety, documentation, and return-to-service decisions.</p><div className="m9-nav"><button className="cbet-secondary" onClick={restart}>Retake Challenge</button><button className="cbet-primary" onClick={onExit}>Return to Academy →</button></div></div>}
  </section>;
}

function MissionTenCallout({ callout }) {
  if (!callout) return null;
  const isTip = callout.type === "clinical-tip";
  return (
    <aside className={`cbet-mission10-callout ${isTip ? "clinical-tip" : "did-you-know"}`}>
      <span className="cbet-mission10-callout-icon" aria-hidden="true">{isTip ? "🔧" : "💡"}</span>
      <div>
        <strong>{callout.title}</strong>
        <p>{callout.text}</p>
      </div>
    </aside>
  );
}

function MissionTenLessonEnhancement({ lessonIndex }) {
  const enhancement = MISSION_TEN_LESSON_ENHANCEMENTS[lessonIndex];
  if (!enhancement) return null;
  return (
    <section className="cbet-mission10-enhancements" aria-label="Real equipment learning">
      <div className="cbet-equipment-spotlight-grid">
        {enhancement.spotlights.map((item) => (
          <EquipmentSpotlight key={item.image} item={item} />
        ))}
      </div>
      <MissionTenCallout callout={enhancement.callout} />
    </section>
  );
}

function MissionTenQuestionImage({ question }) {
  const normalized = `${question?.question || ""} ${question?.category || ""}`.toLowerCase();
  const image = normalized.includes("flowmeter")
    ? { src: "/images/oxygen-flowmeter.jpg", alt: "Oxygen flowmeter used as context for this question" }
    : normalized.includes("quick-connect") || normalized.includes("quick connect")
    ? { src: "/images/oxygen-diss-to-pb-quick-connect.jpg", alt: "Medical-gas connection adapter used as context for this question" }
    : normalized.includes("wagd") || normalized.includes("waste anesthetic")
    ? { src: "/images/wagd-diss-to-hose-barb.jpg", alt: "WAGD fitting used as context for this question" }
    : normalized.includes("vacuum") || normalized.includes("suction")
    ? { src: "/images/vacuum-diss-fitting.jpg", alt: "Vacuum fitting used as context for this question" }
    : normalized.includes("cylinder")
    ? { src: "/images/oxygen-cylinder.jpg", alt: "Medical oxygen cylinder used as context for this question" }
    : null;

  const [imageAvailable, setImageAvailable] = useState(true);
  if (!image || !imageAvailable) return null;
  return (
    <figure className="cbet-question-context-image">
      <img src={image.src} alt={image.alt} loading="lazy" onError={() => setImageAvailable(false)} />
      <figcaption>Use the equipment photo as context. The answer depends on safe application—not simply reading a label.</figcaption>
    </figure>
  );
}


function MissionSeven({ onExit }) {
  const moduleNumber = 7;
  const savedProgress = getMissionProgress(moduleNumber);
  const completedModule = getCbetModuleState(moduleNumber);
  const questions = useMemo(() => missionSevenQuestions.map(shuffleQuestion), []);
  const lessonChecks = useMemo(() => missionSevenLessons.map((lesson) => shuffleQuestion(lesson.check)), []);
  const scenarioChecks = useMemo(() => missionSevenScenarios.map((scenario) => shuffleQuestion({
    question: scenario.prompt,
    options: scenario.options,
    answer: scenario.answer,
    explanation: scenario.explanation
  })), []);
  const [phase, setPhaseState] = useState(savedProgress.phase || "briefing");
  const [lessonIndex, setLessonIndexState] = useState(savedProgress.lessonIndex || 0);
  const [completedLessons, setCompletedLessons] = useState(savedProgress.completedLessons || []);
  const [scenarioIndex, setScenarioIndexState] = useState(savedProgress.scenarioIndex || 0);
  const [completedScenarios, setCompletedScenarios] = useState(savedProgress.completedScenarios || []);
  const hasSavedQuizScore = Number.isFinite(savedProgress.quizScore);
  const restoredQuizIndex = savedProgress.phase === "quiz" && !hasSavedQuizScore ? 0 : (savedProgress.quizIndex || 0);
  const [questionIndex, setQuestionIndexState] = useState(restoredQuizIndex);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(hasSavedQuizScore ? savedProgress.quizScore : 0);
  const [result, setResult] = useState(
    completedModule.complete
      ? completedModule.bestScore
      : (savedProgress.phase === "result" && Number.isFinite(savedProgress.finalPercent) ? savedProgress.finalPercent : null)
  );
  const stageRef = useRef(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (!stageRef.current) return;
      const top = Math.max(0, stageRef.current.getBoundingClientRect().top + window.scrollY - 12);
      window.scrollTo({ top, left: 0, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [phase, lessonIndex, scenarioIndex, questionIndex]);

  const setPhase = (next) => {
    setPhaseState(next);
    saveMissionProgress(moduleNumber, { phase: next });
    scrollCbetPageToTop();
  };

  const completeLesson = () => {
    const nextCompleted = Array.from(new Set([...completedLessons, lessonIndex]));
    setCompletedLessons(nextCompleted);
    awardCbetXp(10, `mission7-lesson-${lessonIndex}`);
    if (lessonIndex < missionSevenLessons.length - 1) {
      const next = lessonIndex + 1;
      setLessonIndexState(next);
      setSelected(null);
      saveMissionProgress(moduleNumber, { phase: "lessons", lessonIndex: next, completedLessons: nextCompleted });
    } else {
      setSelected(null);
      setScenarioIndexState(0);
      saveMissionProgress(moduleNumber, { phase: "scenarios", scenarioIndex: 0, completedLessons: nextCompleted });
      setPhaseState("scenarios");
    }
  };

  const completeScenario = () => {
    const nextCompleted = Array.from(new Set([...completedScenarios, scenarioIndex]));
    setCompletedScenarios(nextCompleted);
    awardCbetXp(15, `mission7-scenario-${scenarioIndex}`);
    setSelected(null);
    if (scenarioIndex < missionSevenScenarios.length - 1) {
      const next = scenarioIndex + 1;
      setScenarioIndexState(next);
      saveMissionProgress(moduleNumber, { phase: "scenarios", scenarioIndex: next, completedScenarios: nextCompleted });
    } else {
      setQuestionIndexState(0);
      setScore(0);
      saveMissionProgress(moduleNumber, { phase: "quiz", quizIndex: 0, completedScenarios: nextCompleted });
      setPhaseState("quiz");
    }
  };

  const answerQuiz = (index) => {
    if (selected !== null) return;
    setSelected(index);
    const nextScore = index === questions[questionIndex].answer ? score + 1 : score;
    setScore(nextScore);
    saveMissionProgress(moduleNumber, { phase: "quiz", quizIndex: questionIndex, quizScore: nextScore });
    playCbetTone(index === questions[questionIndex].answer ? "correct" : "wrong");
  };

  const nextQuizQuestion = () => {
    if (questionIndex < questions.length - 1) {
      const next = questionIndex + 1;
      setQuestionIndexState(next);
      setSelected(null);
      saveMissionProgress(moduleNumber, { phase: "quiz", quizIndex: next, quizScore: score });
      return;
    }
    const finalScore = Math.round((score / questions.length) * 100);
    setResult(finalScore);
    if (finalScore >= 80) {
      completeCbetModule(moduleNumber, finalScore, 350);
      saveMissionProgress(moduleNumber, { phase: "complete", quizIndex: questionIndex, quizScore: score, finalPercent: finalScore, passed: true });
      setPhaseState("complete");
    } else {
      saveMissionProgress(moduleNumber, { phase: "result", quizIndex: questionIndex, quizScore: score, finalPercent: finalScore, passed: false });
      setPhaseState("result");
    }
    setSelected(null);
  };

  const restartQuiz = () => {
    setQuestionIndexState(0);
    setSelected(null);
    setScore(0);
    setResult(null);
    saveMissionProgress(moduleNumber, { phase: "quiz", quizIndex: 0, quizScore: 0, passed: false });
    setPhaseState("quiz");
  };

  const previousLesson = () => {
    if (lessonIndex <= 0) return;
    const next = lessonIndex - 1;
    setLessonIndexState(next);
    setSelected(null);
    saveMissionProgress(moduleNumber, { phase: "lessons", lessonIndex: next, completedLessons });
  };

  const nextRequiredText = phase === "lessons"
    ? "Read the field evidence, answer the knowledge check, then select Complete Lesson."
    : phase === "scenarios"
    ? "Read the service-call evidence, choose the safest CE action, then continue."
    : "Choose one answer. Results are revealed after each question; 80% is required to demonstrate competency.";

  return (
    <>
      <style>{`
        .m7-shell{--m7-navy:#0b2447;--m7-blue:#2457a6;--m7-green:#1f8f5f;--m7-gold:#d99a18}
        .m7-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
        .m7-top span{font-weight:900;color:#475569}
        .m7-progress{height:9px;background:#e2e8f0;border-radius:999px;overflow:hidden;margin-bottom:20px}
        .m7-progress span{display:block;height:100%;background:linear-gradient(90deg,#2457a6,#1f8f5f)}
        .m7-guide{display:grid;grid-template-columns:.8fr 1.2fr;gap:16px;padding:18px;border:2px solid #bfdbfe;border-radius:18px;background:linear-gradient(135deg,#eff6ff,#fff);margin-bottom:20px}
        .m7-guide small,.m7-guide strong{display:block}.m7-guide small{font-size:.72rem;letter-spacing:.09em;font-weight:950;color:#2457a6}.m7-guide strong{margin-top:5px;color:#0b2447}.m7-guide .next{background:#0b2447;color:#fff;padding:13px 15px;border-radius:13px}.m7-guide .next small{color:#93c5fd}.m7-guide .next strong{color:#fff}
        .m7-hero{display:grid;grid-template-columns:1.15fr .85fr;gap:24px;padding:30px;border-radius:26px;background:linear-gradient(135deg,#0b2447,#2457a6);color:#fff;box-shadow:0 18px 45px rgba(11,36,71,.18)}
        .m7-hero h1{font-size:clamp(2.5rem,5vw,4.6rem);line-height:.98;margin:8px 0 16px}.m7-hero p{color:#dbeafe;font-size:1.08rem}.m7-pillrow{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.m7-pillrow span{padding:8px 11px;border:1px solid rgba(255,255,255,.25);border-radius:999px;background:rgba(255,255,255,.1);font-weight:850;font-size:.82rem}
        .m7-shield{display:grid;place-items:center;min-height:250px}.m7-shield div{width:210px;height:230px;clip-path:polygon(50% 0,92% 18%,84% 72%,50% 100%,16% 72%,8% 18%);background:linear-gradient(160deg,#fbbf24,#f59e0b);display:grid;place-items:center;color:#0b2447;text-align:center;padding:35px;font-weight:950;box-shadow:0 18px 35px rgba(0,0,0,.2)}.m7-shield b{font-size:2.8rem;display:block}
        .m7-brief-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;margin:20px 0}.m7-brief-grid article{padding:18px;border:1px solid #dbe4f0;border-radius:16px;background:#fff}.m7-brief-grid strong{display:block;color:#0b2447;margin-bottom:5px}.m7-brief-grid span{color:#64748b;font-size:.9rem;line-height:1.45}
        .m7-objectives{margin:22px 0;padding:24px;border:1px solid #dbe4f0;border-radius:20px;background:#fff}.m7-objectives li{margin:8px 0}
        .m7-lesson-card{padding:28px;border:1px solid #dbe4f0;border-radius:24px;background:#fff;box-shadow:0 14px 32px rgba(15,23,42,.06)}.m7-icon{font-size:2.2rem}.m7-lesson-card h1{font-size:clamp(2rem,3.6vw,3.5rem);line-height:1.12;letter-spacing:-.02em;color:#0b2447;margin:8px auto 12px;max-width:1200px;text-wrap:balance}.m7-summary{font-size:1.06rem;color:#475569}.m7-points{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:20px 0;padding:0;list-style:none}.m7-points li{padding:14px;border:1px solid #dbeafe;border-radius:13px;background:#f8fbff}
        .m7-field{margin:20px 0;padding:22px;border:2px solid #facc15;border-radius:20px;background:#fffbeb}.m7-field-label{font-size:.72rem;letter-spacing:.09em;font-weight:950;color:#a16207}.m7-evidence{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin:12px 0}.m7-evidence span{padding:10px;border-radius:10px;background:#fff;border:1px solid #fde68a;color:#713f12;font-weight:800}.m7-field h3{margin:12px 0 5px;color:#422006}.m7-field-answer{padding:13px;border-left:5px solid #d99a18;background:#fff;border-radius:10px;color:#713f12}
        .m7-check,.m7-scenario{margin-top:20px;padding:24px;border:1px solid #dbe4f0;border-radius:20px;background:#fff}.m7-check h2,.m7-scenario h2{color:#0b2447}.m7-options{display:grid;gap:10px;margin-top:15px}.m7-options button{padding:14px 16px;border:2px solid #dbe4f0;border-radius:13px;background:#fff;text-align:left;font-weight:850;cursor:pointer}.m7-options button:hover{border-color:#60a5fa}.m7-options button.correct{border-color:#22c55e;background:#f0fdf4}.m7-options button.wrong{border-color:#ef4444;background:#fef2f2}.m7-feedback{margin-top:14px;padding:14px;border-radius:12px;background:#eff6ff;color:#1e3a8a}.m7-feedback.good{background:#f0fdf4;color:#166534}.m7-feedback.bad{background:#fff7ed;color:#9a3412}
        .m7-nav{display:flex;justify-content:space-between;gap:10px;margin-top:18px;padding-top:16px;border-top:1px solid #e2e8f0}.m7-nav button{min-width:160px}
        .m7-reg-note{margin:20px 0;padding:17px 19px;border-left:5px solid #2563eb;border-radius:12px;background:#eff6ff;color:#1e3a8a}
        .m7-quizcard{max-width:960px;margin:0 auto;padding:28px;border:1px solid #dbe4f0;border-radius:22px;background:#fff}.m7-quizcat{font-size:.75rem;letter-spacing:.08em;font-weight:950;color:#2457a6}.m7-scorehero{text-align:center;padding:34px;border-radius:24px;background:linear-gradient(135deg,#ecfdf5,#fff);border:2px solid #86efac}.m7-scorehero.review{background:#fff7ed;border-color:#fdba74}.m7-scorehero strong{font-size:clamp(3rem,7vw,5rem);line-height:1;display:block;color:#0b2447;margin:8px 0 14px}.m7-scorehero h1{font-size:clamp(2rem,4.2vw,3.6rem);line-height:1.08;letter-spacing:-.025em;margin:8px auto 14px;color:#0b2447;max-width:1100px;text-wrap:balance}
        @media(max-width:850px){.m7-hero,.m7-guide{grid-template-columns:1fr}.m7-brief-grid{grid-template-columns:1fr}.m7-points,.m7-evidence{grid-template-columns:1fr}.m7-shield{min-height:180px}}
        @media(max-width:600px){.m7-top,.m7-nav{align-items:stretch;flex-direction:column}.m7-nav button{width:100%}.m7-lesson-card,.m7-check,.m7-scenario,.m7-quizcard{padding:18px}}
      `}</style>

      {phase === "briefing" && (
        <section className="cbet-shell m7-shell">
          <div className="m7-top"><button className="cbet-back" onClick={onExit}>← Back to Academy</button><span>Mission 7 · 350 XP</span></div>
          <section className="m7-hero">
            <div>
              <span className="cbet-label">SAFETY · RISK · REGULATORY READINESS</span>
              <h1>{missionSevenBriefing.title}</h1>
              <p>{missionSevenBriefing.summary}</p>
              <div className="m7-pillrow"><span>Electrical Safety</span><span>Return to Service</span><span>Incident Response</span><span>Recalls</span><span>Documentation</span><span>FDA MDR</span></div>
            </div>
            <div className="m7-shield"><div><span><b>✓</b>WOULD YOU PUT THIS DEVICE BACK ON A PATIENT?</span></div></div>
          </section>
          <div className="m7-brief-grid">
            <article><strong>8 Guided Lessons</strong><span>Safety decisions tied to actual CE workflow.</span></article>
            <article><strong>4 Applied Service Calls</strong><span>Incidents, recalls, electrical safety, and alarms.</span></article>
            <article><strong>20-Question Competency Check</strong><span>80% required to complete Mission 7.</span></article>
          </div>
          <section className="m7-objectives"><h2>What you will learn</h2><ul>{missionSevenBriefing.objectives.map((item)=><li key={item}>{item}</li>)}</ul></section>
          <div className="m7-reg-note"><strong>Important:</strong> Standards, manufacturer procedures, and regulatory requirements can change. Mission 7 teaches the decision process and high-yield concepts; real service work must follow current manufacturer documentation, facility policy, and applicable requirements.</div>
          <div className="cbet-actions"><button className="cbet-primary" onClick={()=>setPhase("lessons")}>{savedProgress.phase && savedProgress.phase !== "briefing" ? "Resume Mission" : "Begin Mission 7"}</button></div>
        </section>
      )}

      {phase === "lessons" && (() => {
        const lesson=missionSevenLessons[lessonIndex];
        const check=lessonChecks[lessonIndex];
        const correct=selected===check.answer;
        const answered=selected!==null;
        return <section ref={stageRef} className="cbet-shell m7-shell">
          <div className="m7-top"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Lesson {lessonIndex+1} of {missionSevenLessons.length}</span></div>
          <div className="m7-progress"><span style={{width:`${((lessonIndex+1)/missionSevenLessons.length)*100}%`}}/></div>
          <section className="m7-guide"><div><small>HOW TO COMPLETE THIS LESSON</small><strong>1. Read the safety concept → 2. Inspect the field evidence → 3. Answer the check → 4. Complete the lesson.</strong></div><div className="next"><small>YOUR NEXT ACTION</small><strong>{answered ? (correct ? "Correct — select Complete Lesson below." : "Review the evidence and choose another answer.") : nextRequiredText}</strong></div></section>
          <article className="m7-lesson-card">
            <span className="m7-icon">{lesson.icon}</span><h1>{lesson.title}</h1><p className="m7-summary">{lesson.summary}</p>
            <ul className="m7-points">{lesson.points.map((p)=><li key={p}>{p}</li>)}</ul>
            <section className="m7-field"><span className="m7-field-label">IN THE FIELD · {lesson.fieldCase.label}</span><div className="m7-evidence">{lesson.fieldCase.evidence.map((e)=><span key={e}>{e}</span>)}</div><h3>{lesson.fieldCase.question}</h3><div className="m7-field-answer"><strong>CE reasoning:</strong> {lesson.fieldCase.answer}</div></section>
          </article>
          <section className="m7-check"><span className="cbet-label">Quick Knowledge Check</span><h2>{check.question}</h2><div className="m7-options">{check.options.map((o,i)=><button key={o} disabled={correct} className={`${answered&&i===check.answer?"correct":""} ${answered&&i===selected&&i!==check.answer?"wrong":""}`} onClick={()=>{setSelected(i);playCbetTone(i===check.answer?"correct":"wrong")}}><strong>{String.fromCharCode(65+i)}.</strong> {o}</button>)}</div>{answered&&<div className={`m7-feedback ${correct?"good":"bad"}`}><strong>{correct?"Correct.":"Not yet."}</strong> {correct?check.explanation:"Use the field evidence and safety principle above, then try again."}</div>}<div className="m7-nav"><button className="cbet-secondary" disabled={lessonIndex===0} onClick={previousLesson}>← Previous Lesson</button><button className="cbet-primary" disabled={!correct} onClick={completeLesson}>{lessonIndex===missionSevenLessons.length-1?"Finish Lessons →":"Complete Lesson →"}</button></div></section>
        </section>
      })()}

      {phase === "scenarios" && (() => {
        const item=missionSevenScenarios[scenarioIndex];
        const scenario=scenarioChecks[scenarioIndex];
        const answered=selected!==null;
        const correct=selected===scenario.answer;
        return <section ref={stageRef} className="cbet-shell m7-shell">
          <div className="m7-top"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Applied Safety Call {scenarioIndex+1} of {missionSevenScenarios.length}</span></div>
          <div className="m7-progress"><span style={{width:`${((scenarioIndex+1)/missionSevenScenarios.length)*100}%`}}/></div>
          <section className="m7-guide"><div><small>HOW TO COMPLETE THIS CALL</small><strong>Read the complete situation. Decide what protects the patient, preserves evidence, and satisfies the required process.</strong></div><div className="next"><small>YOUR NEXT ACTION</small><strong>{answered?(correct?"Correct — continue to the next call.":"Review the evidence and try another action."):nextRequiredText}</strong></div></section>
          <section className="m7-scenario"><span className="cbet-label">HOSPITAL SERVICE CALL</span><h1>{item.title}</h1><p className="m7-summary">{item.prompt}</p><div className="m7-options">{scenario.options.map((o,i)=><button key={o} disabled={correct} className={`${answered&&i===scenario.answer?"correct":""} ${answered&&i===selected&&i!==scenario.answer?"wrong":""}`} onClick={()=>{setSelected(i);playCbetTone(i===scenario.answer?"correct":"wrong")}}><strong>{String.fromCharCode(65+i)}.</strong> {o}</button>)}</div>{answered&&<div className={`m7-feedback ${correct?"good":"bad"}`}><strong>{correct?"Strong CE decision.":"Keep working the evidence."}</strong> {correct?scenario.explanation:"Choose the action that controls risk without destroying evidence or bypassing required safety processes."}</div>}<div className="m7-nav"><button className="cbet-secondary" onClick={()=>{setSelected(null);setPhaseState("lessons");setLessonIndexState(missionSevenLessons.length-1);saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:missionSevenLessons.length-1})}}>← Review Last Lesson</button><button className="cbet-primary" disabled={!correct} onClick={completeScenario}>{scenarioIndex===missionSevenScenarios.length-1?"Start Competency Check →":"Next Service Call →"}</button></div></section>
        </section>
      })()}

      {phase === "quiz" && (() => {
        const q=questions[questionIndex];
        const answered=selected!==null;
        const correct=selected===q.answer;
        return <section ref={stageRef} className="cbet-shell m7-shell">
          <div className="m7-top"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 7 Competency Check · {questionIndex+1}/{questions.length}</span></div>
          <div className="m7-progress"><span style={{width:`${((questionIndex+1)/questions.length)*100}%`}}/></div>
          <section className="m7-guide"><div><small>COMPETENCY MODE</small><strong>No guided field answer here. Apply what you learned across the mission.</strong></div><div className="next"><small>PASSING STANDARD</small><strong>80% required · {questions.length} questions</strong></div></section>
          <article className="m7-quizcard"><span className="m7-quizcat">{q.category||"Safety & Regulations"}</span><h1>{q.question}</h1><div className="m7-options">{q.options.map((o,i)=><button key={o} disabled={answered} className={`${answered&&i===q.answer?"correct":""} ${answered&&i===selected&&i!==q.answer?"wrong":""}`} onClick={()=>answerQuiz(i)}><strong>{String.fromCharCode(65+i)}.</strong> {o}</button>)}</div>{answered&&<div className={`m7-feedback ${correct?"good":"bad"}`}><strong>{correct?"Correct.":"Review this point."}</strong> {q.explanation}</div>}<div className="m7-nav"><button className="cbet-secondary" disabled={questionIndex===0} onClick={()=>{const prev=questionIndex-1;setQuestionIndexState(prev);setSelected(null);saveMissionProgress(moduleNumber,{phase:"quiz",quizIndex:prev,quizScore:score})}}>← Previous</button><button className="cbet-primary" disabled={!answered} onClick={nextQuizQuestion}>{questionIndex===questions.length-1?"Submit Assessment":"Next Question →"}</button></div></article>
        </section>
      })()}

      {phase === "result" && <section className="cbet-shell m7-shell"><button className="cbet-back" onClick={onExit}>← Back to Academy</button><section className="m7-scorehero review"><span className="cbet-label">MISSION 7 RESULT</span><strong>{result}%</strong><h1>Review Recommended</h1><p>You need 80% to demonstrate competency. Review the lessons or retake the assessment.</p><div className="cbet-actions"><button className="cbet-secondary" onClick={()=>{setLessonIndexState(0);setSelected(null);setPhaseState("lessons");saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:0})}}>Review Mission</button><button className="cbet-primary" onClick={restartQuiz}>Retake Assessment</button></div></section></section>}

      {phase === "complete" && <section className="cbet-shell m7-shell"><button className="cbet-back" onClick={onExit}>← Back to Academy</button><section className="m7-scorehero"><span className="cbet-label">MISSION 7 COMPLETE</span><strong>{result ?? completedModule.bestScore ?? savedProgress.quizScore ?? 80}%</strong><h1>🏆 Safety & Compliance Competency Demonstrated</h1><p>You demonstrated competency across electrical safety, return-to-service decisions, incident preservation, recalls, documentation, risk management, and regulatory escalation.</p><div className="cbet-actions"><button className="cbet-secondary" onClick={()=>{setLessonIndexState(0);setSelected(null);setPhaseState("lessons");saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:0})}}>Review Mission</button><button className="cbet-primary" onClick={onExit}>Return to Academy →</button></div></section></section>}
    </>
  );
}


function MissionTen({ onExit }) {
  const moduleNumber = 10;
  const savedProgress = getMissionProgress(moduleNumber);
  const completedModule = getCbetModuleState(moduleNumber);
  const questions = useMemo(() => missionTenQuestions.map(shuffleQuestion), []);
  const lessons = useMemo(
    () => missionTenLessons.map((lesson) => ({ ...lesson, check: shuffleQuestion(lesson.check) })),
    []
  );
  const scenarios = useMemo(
    () => missionTenScenarios.map((scenario) => ({
      ...scenario,
      ...shuffleQuestion({
        question: scenario.question,
        options: scenario.options,
        answer: scenario.answer,
        explanation: scenario.explanation,
      }),
    })),
    []
  );
  const [phase, setPhaseState] = useState(savedProgress.phase || "briefing");
  const [lessonIndex, setLessonIndexState] = useState(savedProgress.lessonIndex || 0);
  const [completedLessons, setCompletedLessons] = useState(savedProgress.completedLessons || []);
  const [scenarioIndex, setScenarioIndexState] = useState(savedProgress.scenarioIndex || 0);
  const [completedScenarios, setCompletedScenarios] = useState(savedProgress.completedScenarios || []);
  const hasSavedQuizScore = Number.isFinite(savedProgress.quizScore);
  const restoredQuizIndex = savedProgress.phase === "quiz" && !hasSavedQuizScore
    ? 0
    : (savedProgress.quizIndex || 0);
  const [questionIndex, setQuestionIndexState] = useState(restoredQuizIndex);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(hasSavedQuizScore ? savedProgress.quizScore : 0);
  const [finished, setFinished] = useState(savedProgress.phase === "complete" && completedModule.complete);
  const [result, setResult] = useState(
    completedModule.complete
      ? completedModule.bestScore
      : (savedProgress.phase === "result" && Number.isFinite(savedProgress.finalPercent) ? savedProgress.finalPercent : null)
  );
  const missionTenStageRef = useRef(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const target = missionTenStageRef.current;
      if (!target) return;
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 12);
      window.scrollTo({ top, left: 0, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [phase, lessonIndex, scenarioIndex, questionIndex]);

  function setPhase(next) {
    setPhaseState(next);
    saveMissionProgress(moduleNumber, { phase: next });
    scrollCbetPageToTop();
  }
  function completeLesson() {
    const nextCompleted = Array.from(new Set([...completedLessons, lessonIndex]));
    setCompletedLessons(nextCompleted);
    saveMissionProgress(moduleNumber, { phase: "lessons", lessonIndex, completedLessons: nextCompleted });
    awardCbetXp(10, `mission10-lesson-${lessonIndex}`);
    if (lessonIndex < lessons.length - 1) {
      const nextIndex = lessonIndex + 1;
      setLessonIndexState(nextIndex);
      saveMissionProgress(moduleNumber, { phase: "lessons", lessonIndex: nextIndex, completedLessons: nextCompleted });
    } else setPhase("scenarios");
  }
  function completeScenario() {
    const nextCompleted = Array.from(new Set([...completedScenarios, scenarioIndex]));
    setCompletedScenarios(nextCompleted);
    saveMissionProgress(moduleNumber, { phase: "scenarios", scenarioIndex, completedScenarios: nextCompleted });
    awardCbetXp(15, `mission10-scenario-${scenarioIndex}`);
    setSelected(null);
    if (scenarioIndex < scenarios.length - 1) {
      const nextIndex = scenarioIndex + 1;
      setScenarioIndexState(nextIndex);
      saveMissionProgress(moduleNumber, { phase: "scenarios", scenarioIndex: nextIndex, completedScenarios: nextCompleted });
    } else {
      setQuestionIndexState(0);
      setScore(0);
      setSelected(null);
      saveMissionProgress(moduleNumber, { phase: "quiz", quizIndex: 0, quizScore: 0 });
      setPhaseState("quiz");
    }
  }
  function answerQuiz(index) {
    if (selected !== null) return;
    setSelected(index);
    const nextScore = index === questions[questionIndex].answer ? score + 1 : score;
    setScore(nextScore);
    saveMissionProgress(moduleNumber, {
      phase: "quiz",
      quizIndex: questionIndex,
      quizScore: nextScore,
    });
  }
  function nextQuizQuestion() {
    if (questionIndex < questions.length - 1) {
      const nextIndex = questionIndex + 1;
      setQuestionIndexState(nextIndex);
      setSelected(null);
      saveMissionProgress(moduleNumber, { phase: "quiz", quizIndex: nextIndex, quizScore: score });
      return;
    }
    const finalScore = Math.round((score / questions.length) * 100);
    setResult(finalScore);
    setFinished(true);
    if (finalScore >= 80) {
      completeCbetModule(moduleNumber, finalScore, 350);
      saveMissionProgress(moduleNumber, { phase: "complete", quizIndex: questionIndex, quizScore: score, finalPercent: finalScore, passed: true });
      setPhaseState("complete");
    } else {
      saveMissionProgress(moduleNumber, { phase: "result", quizIndex: questionIndex, quizScore: score, finalPercent: finalScore, passed: false });
      setPhaseState("result");
    }
  }
  function restartQuiz() {
    setQuestionIndexState(0); setSelected(null); setScore(0); setFinished(false); setResult(null);
    saveMissionProgress(moduleNumber, { phase: "quiz", quizIndex: 0, quizScore: 0 });
    setPhaseState("quiz");
  }

  if (phase === "briefing") return (
    <section className="cbet-shell cbet-mission-briefing m10-shell">
      <style>{`
        .m10-shell h1,.cbet-module10-stage .cbet-lesson-title,.cbet-module10-results .cbet-module10-result-title{line-height:1.1;text-wrap:balance}
        .m10-brief-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:22px 0}
        .m10-brief-stats>div{background:#f8fbff;border:1px solid #dbe7f4;border-radius:16px;padding:16px;text-align:center}
        .m10-brief-stats strong{display:block;font-size:1.65rem;color:#0b2447}.m10-brief-stats span{color:#52677f;font-weight:700;font-size:.88rem}
        .m10-safety-note,.m10-how{border-left:5px solid #2563eb;background:#eff6ff;border-radius:12px;padding:14px 16px;margin:18px 0;color:#15345d}
        .m10-how span{display:block;font-size:.72rem;font-weight:950;letter-spacing:.09em;color:#2563eb;margin-bottom:4px}
        .m10-how strong{display:block;line-height:1.45}
        @media(max-width:760px){.m10-brief-stats{grid-template-columns:1fr 1fr}}
      `}</style>
      <button className="cbet-back" onClick={onExit}>← Back to Academy</button>
      <span className="cbet-label">Mission 10 · 350 XP</span>
      <h1>{missionTenBriefing.title}</h1>
      <p>{missionTenBriefing.summary}</p>
      <div className="cbet-objectives"><h2>What you will learn</h2><ul>{missionTenBriefing.objectives.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <div className="cbet-actions"><button className="cbet-primary" onClick={() => setPhase("lessons")}>{savedProgress.phase !== "briefing" ? "Resume Mission" : "Begin Mission"}</button></div>
    </section>
  );

  if (phase === "lessons") {
    const lesson = lessons[lessonIndex];
    const answered = selected !== null;
    return (
      <section ref={missionTenStageRef} className="cbet-shell cbet-lesson-stage cbet-module10-stage">
        <button className="cbet-back" onClick={onExit}>← Save & Exit</button>
        <div className="cbet-quiz-meta cbet-module10-meta"><span>Medical Gas Delivery Equipment</span><span>Lesson {lessonIndex + 1} of {lessons.length}</span></div>
        <div className="cbet-progress-bar cbet-module10-progress" aria-label={`Lesson ${lessonIndex + 1} of ${missionTenLessons.length}`}><span style={{ width: `${((lessonIndex + 1) / missionTenLessons.length) * 100}%` }} /></div>
        <article className="cbet-lesson-card"><div className="cbet-hero-icon">{lesson.icon}</div><h2 className="cbet-lesson-title">{lesson.title}</h2><ul>{lesson.points.map((point) => <li key={point}>{point}</li>)}</ul></article>
        <MissionTenLessonEnhancement lessonIndex={lessonIndex} />
        <article className="cbet-quiz">
          <div className="m10-how"><span>HOW TO COMPLETE THIS LESSON</span><strong>Review the equipment concept, use the field visual, then answer correctly before continuing.</strong></div>
          <h2>{lesson.check.question}</h2>
          <div className="cbet-options">{lesson.check.options.map((option, index) => {
            const correct = selected === lesson.check.answer;
            return <button key={option} disabled={correct} className={`cbet-option ${selected !== null && index === lesson.check.answer ? "correct" : ""} ${selected === index && index !== lesson.check.answer ? "wrong" : ""}`} onClick={() => { setSelected(index); playCbetTone(index === lesson.check.answer ? "correct" : "wrong"); }}><strong>{String.fromCharCode(65 + index)}.</strong> {option}</button>;
          })}</div>
          {answered && <div className={`cbet-feedback ${selected === lesson.check.answer ? "good" : "bad"}`}><strong>{selected === lesson.check.answer ? "Correct — continue." : "Not yet — use the equipment evidence and try again."}</strong><span>{selected === lesson.check.answer ? lesson.check.explanation : "The most defensible answer should preserve the gas-specific safety system and isolate the fault without creating a new hazard."}</span></div>}
          <div className="cbet-actions cbet-module10-actions">
            <button className="cbet-secondary" disabled={lessonIndex === 0} onClick={() => { setSelected(null); setLessonIndexState((value) => Math.max(0, value - 1)); }}>← Previous Lesson</button>
            <button className="cbet-primary" disabled={selected !== lesson.check.answer} onClick={() => { setSelected(null); completeLesson(); }}>{lessonIndex === lessons.length - 1 ? "Begin Field Scenarios →" : "Complete Lesson →"}</button>
          </div>
        </article>
      </section>
    );
  }

  if (phase === "scenarios") {
    const scenario = scenarios[scenarioIndex];
    const answered = selected !== null;
    return (
      <section ref={missionTenStageRef} className="cbet-shell cbet-lesson-stage cbet-module10-stage">
        <button className="cbet-back" onClick={onExit}>← Save & Exit</button>
        <div className="cbet-quiz-meta cbet-module10-meta"><span>Applied Field Scenario</span><span>{scenarioIndex + 1} of {scenarios.length}</span></div>
        <div className="cbet-progress-bar cbet-module10-progress" aria-label={`Scenario ${scenarioIndex + 1} of ${missionTenScenarios.length}`}><span style={{ width: `${((scenarioIndex + 1) / missionTenScenarios.length) * 100}%` }} /></div>
        <article className="cbet-lesson-card cbet-scenario-intro">
          <div className="cbet-field-call-heading"><span className="cbet-field-call-icon" aria-hidden="true">🛠️</span><div><span className="cbet-field-call-eyebrow">Clinical Engineering field call</span><span className="cbet-label">{scenario.title}</span></div></div>
          <h2 className="cbet-scenario-title">{scenario.patient}</h2>
          <div className="cbet-field-call-meta"><span>Patient safety first</span><span>Point-of-use assessment</span><span>Choose the best action</span></div>
        </article>
        <article className="cbet-quiz">
          <div className="m10-how"><span>FIELD DECISION</span><strong>Several actions may sound possible. Choose the best next action using the failure pattern and safety constraints.</strong></div>
          <h2>{scenario.question}</h2>
          <div className="cbet-options">{scenario.options.map((option, index) => {
            const correct = selected === scenario.answer;
            return <button key={option} disabled={correct} className={`cbet-option ${selected !== null && index === scenario.answer ? "correct" : ""} ${selected === index && index !== scenario.answer ? "wrong" : ""}`} onClick={() => { setSelected(index); playCbetTone(index === scenario.answer ? "correct" : "wrong"); }}><strong>{String.fromCharCode(65 + index)}.</strong> {option}</button>;
          })}</div>
          {answered && <div className={`cbet-feedback ${selected === scenario.answer ? "good" : "bad"}`}><strong>{selected === scenario.answer ? "Strong CE decision." : "Keep isolating the problem."}</strong><span>{selected === scenario.answer ? scenario.explanation : "Use the scope of the failure, the connection state, and the safest point-of-use test to choose again."}</span></div>}
          <div className="cbet-actions cbet-module10-actions">
            <button className="cbet-secondary" disabled={scenarioIndex === 0} onClick={() => { setSelected(null); setScenarioIndexState((value) => Math.max(0, value - 1)); }}>← Previous Scenario</button>
            <button className="cbet-primary" disabled={selected !== scenario.answer} onClick={completeScenario}>{scenarioIndex === scenarios.length - 1 ? "Start Final Challenge →" : "Complete Scenario →"}</button>
          </div>
        </article>
      </section>
    );
  }

  if (phase === "quiz" && !finished) {
    const question = questions[questionIndex];
    const answered = selected !== null;
    return (
      <section ref={missionTenStageRef} className="cbet-shell cbet-lesson-stage cbet-module10-stage"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><article className="cbet-quiz"><div className="cbet-quiz-meta cbet-module10-meta"><span>Final Challenge · Question {questionIndex + 1} of {questions.length}</span><span>{question.category}</span></div><div className="cbet-progress-bar cbet-module10-progress" aria-label={`Question ${questionIndex + 1} of ${questions.length}`}><span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div><MissionTenQuestionImage question={question} /><h2>{question.question}</h2><div className="cbet-options">{question.options.map((option, index) => <button key={option} disabled={answered} className={`cbet-option ${answered && index === question.answer ? "correct" : ""} ${answered && index === selected && index !== question.answer ? "wrong" : ""}`} onClick={() => answerQuiz(index)}><strong>{String.fromCharCode(65 + index)}.</strong> {option}</button>)}</div>{answered && <div className="cbet-feedback"><strong>{selected === question.answer ? "Correct." : "Incorrect."}</strong><span>{question.explanation}</span></div>}<div className="cbet-actions cbet-module10-actions"><span>Score: {score}/{questions.length}</span><button className="cbet-primary" disabled={!answered} onClick={nextQuizQuestion}>{questionIndex === questions.length - 1 ? "Finish Mission" : "Next Question"}</button></div></article></section>
    );
  }

  const passed = (result || 0) >= 80;
  const completionDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <section className="cbet-shell cbet-module10-results-shell">
      <article className={`cbet-results cbet-module10-results ${passed ? "passed" : ""}`}>
        <div className="cbet-hero-icon">{passed ? "🏆" : "📘"}</div>
        <span className="cbet-label">{passed ? "Mission 10 Passed" : "Review Required"}</span>
        <h1 className="cbet-module10-result-score">{result || 0}%</h1>
        <h2 className="cbet-module10-result-title">Medical Gas Delivery Equipment</h2>
        <p>
          {passed
            ? "You successfully completed all lessons, field scenarios, and the final challenge. You earned 350 XP on your first passing attempt."
            : "You need 80% to pass. Review the lessons and retake the challenge."}
        </p>

        <div className="cbet-completion-summary cbet-module10-summary">
          <div><span>Lessons</span><strong>{completedLessons.length} of {lessons.length} Complete</strong></div>
          <div><span>Field Scenarios</span><strong>{completedScenarios.length} of {scenarios.length} Complete</strong></div>
          <div><span>Final Challenge</span><strong>{result || 0}% {passed ? "Passed" : "Review"}</strong></div>
        </div>

        {passed && (
          <section className="cbet-achievement-card" aria-label="Certificate of Achievement">
            <span className="cbet-achievement-eyebrow">Certificate of Achievement</span>
            <div className="cbet-achievement-mark" aria-hidden="true">🏅</div>
            <h2>Medical Gas Delivery Equipment</h2>
            <p>This recognizes the successful completion of Mission 10 in the MedSkillBuilder CBET Academy.</p>
            <div className="cbet-achievement-details">
              <div><span>Final Score</span><strong>{result || 0}%</strong></div>
              <div><span>XP Earned</span><strong>350 XP</strong></div>
              <div><span>Completed</span><strong>{completionDate}</strong></div>
            </div>
            <small>Educational achievement only — not a professional certification or credential.</small>
          </section>
        )}

        <div className="cbet-actions center cbet-module10-result-actions">
          {!passed && <button className="cbet-secondary" onClick={restartQuiz}>Retake Challenge</button>}
          {passed && <button className="cbet-primary cbet-print-achievement" onClick={() => window.print()}>🖨️ Print My Achievement</button>}
          <button className="cbet-secondary" onClick={onExit}>Back to Academy</button>
        </div>
      </article>
    </section>
  );
}


const MISSION_SIX_NETWORK_NODES = [
  {id:"device",label:"Medical Device",detail:"The endpoint that generates or receives clinical data.",ip:"10.24.16.57"},
  {id:"switch",label:"Network Switch",detail:"Connects devices on the local network and forwards Ethernet frames.",ip:"Layer 2"},
  {id:"gateway",label:"Default Gateway",detail:"Routes traffic from the local subnet toward other networks.",ip:"10.24.16.1"},
  {id:"server",label:"Clinical Server",detail:"The destination system receiving data from the medical device.",ip:"10.24.40.25"},
];

function MissionSixNetworkGraphic({activeId,onSelect,packetRunning,faultMode}) {
  return <div className={`m6-network-art ${packetRunning?"running":""} fault-${faultMode}`}>
    <svg viewBox="0 0 920 470" role="img" aria-label="Hospital medical device network showing device, switch, default gateway and clinical server">
      <defs><marker id="m6arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z"/></marker></defs>
      <path className="m6-link" d="M170 235H330M455 235H610M735 235H825"/>
      <circle className="m6-packet" cx="170" cy="235" r="10"/>
      <g className={`m6-node ${activeId==="device"?"active":""}`} onClick={()=>onSelect("device")}><rect x="45" y="145" width="150" height="180" rx="20"/><rect className="screen" x="70" y="175" width="100" height="65" rx="8"/><path className="ecg" d="M80 210h18l8-18 12 38 12-20h28"/><text x="120" y="275">MEDICAL</text><text x="120" y="297">DEVICE</text><text className="ip" x="120" y="345">10.24.16.57</text></g>
      <g className={`m6-node ${activeId==="switch"?"active":""}`} onClick={()=>onSelect("switch")}><rect x="330" y="185" width="125" height="100" rx="15"/>{[0,1,2,3].map(n=><rect key={n} className="port" x={350+n*23} y="225" width="14" height="12" rx="2"/>)}<text x="392" y="315">SWITCH</text></g>
      <g className={`m6-node ${activeId==="gateway"?"active":""}`} onClick={()=>onSelect("gateway")}><circle cx="610" cy="235" r="70"/><path className="router-arrow" d="M575 235h70M625 215l20 20-20 20M595 215l-20 20 20 20"/><text x="610" y="330">GATEWAY</text><text className="ip" x="610" y="352">10.24.16.1</text></g>
      <g className={`m6-node ${activeId==="server"?"active":""}`} onClick={()=>onSelect("server")}><rect x="760" y="120" width="125" height="220" rx="16"/>{[0,1,2].map(n=><g key={n}><rect className="server-slot" x="780" y={150+n*55} width="85" height="38" rx="6"/><circle className="server-led" cx="845" cy={169+n*55} r="5"/></g>)}<text x="822" y="375">SERVER</text><text className="ip" x="822" y="397">10.24.40.25</text></g>
      <text className="m6-path-label" x="250" y="215">LOCAL LAN</text><text className="m6-path-label" x="525" y="215">ROUTED</text><text className="m6-path-label" x="780" y="215">DESTINATION</text>
    </svg>
  </div>;
}

function MissionSixLessonGuide({lesson,steps,nextAction,complete=false}) {
  return <section className={`m6-howto ${complete?"complete":""}`}>
    <div className="m6-howto-head"><div><span>HOW TO COMPLETE THIS LESSON</span><strong>Follow these steps in order</strong></div><div className="m6-howto-next"><small>YOUR NEXT ACTION</small><b>{complete?"Requirements complete — scroll to the completion panel and select Complete Lesson.":nextAction}</b></div></div>
    <div className="m6-howto-steps">{steps.map((step,index)=><div key={`${lesson}-${index}`}><i>{index+1}</i><span>{step}</span></div>)}</div>
    <p><strong>Navigation tip:</strong> Work from top to bottom. A correct action reveals the next step. When the panel turns green, select <b>Complete Lesson</b>, then use the <b>Next</b> button at the bottom.</p>
  </section>;
}


const M6_ASSESSMENT_QUESTIONS = [
  {id:"ip1",cat:"Network Fundamentals",q:"A workstation intermittently loses connectivity. ipconfig /all shows IPv4 Address 10.24.16.57 (Duplicate). What is the most likely issue?",a:["DNS failure","Duplicate IP address","Wrong DICOM port","Bad HL7 route"],correct:1,why:"The duplicate flag is direct evidence that another device is using the same IPv4 address."},
  {id:"ip2",cat:"Network Fundamentals",q:"A device has IPv4 169.254.44.18, no default gateway, and DHCP is enabled. What does this most strongly suggest?",a:["The device did not obtain the expected DHCP lease","PACS is offline","The VLAN is definitely correct","The switch is full duplex"],correct:0,why:"A 169.254.x.x link-local address with no gateway is strong evidence that DHCP configuration was not obtained."},
  {id:"dns1",cat:"Network Fundamentals",q:"ping 10.24.40.25 succeeds, but ping monitoring01.hospital.local fails. Which service should be investigated next?",a:["NIBP","DNS","DICOM storage","HL7 routing"],correct:1,why:"Successful IP reachability with hostname failure isolates the problem toward name resolution."},
  {id:"vlan1",cat:"Switching & VLANs",q:"Two medical devices are plugged into the same physical switch. Must they be on the same logical network?",a:["Yes, always","No, ports can be assigned to different VLANs","Only if both are gigabit","Only if both use DHCP"],correct:1,why:"VLAN assignment can logically separate endpoints using the same switching hardware."},
  {id:"port1",cat:"Switching & VLANs",q:"A medical device NIC is 1.0 Gbps/full while the switch port is forced to 10 Mbps/half. The port shows CRC errors and late collisions. What should you suspect?",a:["Speed/duplex mismatch","DNS failure","Bad AE Title","Expired certificate"],correct:0,why:"The incompatible link settings plus collisions/errors point to a speed/duplex problem."},
  {id:"wifi1",cat:"Wireless",q:"A mobile monitor is associated to AP-2 at -82 dBm while AP-3 is visible at -63 dBm. Roam attempts fail. What should be investigated?",a:["Roaming behavior and WLAN coverage","DICOM AE Titles","Default gateway reservation","Patient identifier mapping"],correct:0,why:"The client is holding a weak AP even though a stronger neighbor exists, which is a roaming/coverage clue."},
  {id:"wifi2",cat:"Wireless",q:"A device sees the correct SSID. Association succeeds, but 802.1X authentication fails and DHCP is never attempted. Where is the first failure?",a:["DHCP","Wireless authentication","DNS","PACS"],correct:1,why:"Authentication occurs before DHCP in this scenario, so DHCP is never reached."},
  {id:"dicom1",cat:"Clinical Connectivity",q:"A CT can ping PACS and TCP port 104 is open, but DICOM association is rejected because the Calling AE is not recognized. What layer is failing?",a:["Physical cable","IP routing","DICOM application configuration","DHCP"],correct:2,why:"Basic network connectivity is proven; the failure is the DICOM application identity/configuration."},
  {id:"dicom2",cat:"Clinical Connectivity",q:"C-ECHO succeeds, but C-STORE fails. The modality is configured for port 11112 while the PACS storage service listens on 104. What is the likely cause?",a:["Wrong storage port","Wrong subnet mask","Expired client certificate","Wrong VLAN"],correct:0,why:"The storage destination port does not match the PACS service port."},
  {id:"hl71",cat:"Clinical Connectivity",q:"An ADT message is generated by the EHR, but the interface engine routes it to CLINICAL_TEST instead of CLINICAL_SYS. What is the failure?",a:["Interface routing","DNS","Ethernet duplex","DICOM port"],correct:0,why:"The message exists and the engine received it; the configured route is wrong."},
  {id:"hl72",cat:"Clinical Connectivity",q:"An ORU message is delivered, but the destination returns MSA|AE and reports 'Patient identifier not found in destination'. What does this prove?",a:["The network never delivered the message","Transport succeeded but the application rejected the message","The cable is crossed","The switch is down"],correct:1,why:"The destination generated an application error acknowledgment, so transport succeeded."},
  {id:"cyber1",cat:"Cybersecurity",q:"A vendor arrives with an unregistered USB drive to update a functioning medical device. There is no change ticket or maintenance window. What is the best first action?",a:["Insert it and test","Pause and verify the approved change/media process before proceeding","Disable endpoint security","Copy the files to another USB"],correct:1,why:"Unverified removable media and an unscheduled change should be stopped until the approved process is confirmed."},
  {id:"cyber2",cat:"Cybersecurity",q:"A newly installed medical device still has factory-default administrator credentials. What should happen before clinical release?",a:["Nothing if the network is segmented","Apply the approved security baseline and unique managed credentials","Share the default password with staff","Disable logging"],correct:1,why:"Default administrative credentials should not remain when the device is released for clinical use."},
  {id:"integrated1",cat:"Systems Integration",q:"A device pings successfully, DICOM C-ECHO passes, but patient demographics never populate. What should you investigate next?",a:["Physical cable again","HL7/interface workflow","Switch speed","DHCP lease"],correct:1,why:"Network and DICOM layers are proven; the remaining workflow points toward the patient-data interface path."},
  {id:"integrated2",cat:"Systems Integration",q:"After a networked medical-device repair, which verification is strongest?",a:["Ping the gateway once","Confirm the complete clinical workflow end-to-end","Check only the link light","Reboot and close the ticket"],correct:1,why:"The goal is restored clinical function, not just basic connectivity."},
];


function MissionSixCertificate({name,score,date,onBack}) {
  return <section className="cbet-shell m6-shell m6-certificate-page">
    <div className="m6-certificate-actions no-print">
      <button className="cbet-secondary" onClick={onBack}>← Back to Results</button>
      <button className="cbet-primary" onClick={()=>window.print()}>Print / Save as PDF</button>
    </div>
    <section className="m6-certificate">
      <div className="m6-cert-border">
        <span className="m6-cert-brand">MedSkillBuilder · CBET Academy</span>
        <h1>Certificate of Competency</h1>
        <p className="m6-cert-intro">This certifies that</p>
        <div className="m6-cert-name">{name||"Learner Name"}</div>
        <p>has successfully demonstrated competency in</p>
        <h2>Mission 6: Networking & Connectivity</h2>
        <div className="m6-cert-badge">COMPETENCY DEMONSTRATED</div>
        <div className="m6-cert-details">
          <div><span>Assessment Score</span><strong>{score}%</strong></div>
          <div><span>Passing Standard</span><strong>80%</strong></div>
          <div><span>Completion Date</span><strong>{date}</strong></div>
        </div>
        <p className="m6-cert-scope">Competency areas include IP addressing, DHCP/DNS, switching and VLANs, Wi-Fi, DICOM/PACS, HL7 interfaces, medical-device cybersecurity, and integrated clinical-network troubleshooting.</p>
        <div className="m6-cert-footer">
          <div><strong>MedSkillBuilder</strong><span>CBET Academy Training Platform</span></div>
          <div className="m6-cert-seal">MSB</div>
          <div><strong>Mission 6</strong><span>Networking & Connectivity</span></div>
        </div>
      </div>
    </section>
  </section>;
}

function MissionSixAssessment({onExit,onBack}) {
  const moduleNumber=6;
  const saved=getMissionProgress(moduleNumber)||{};
  const [order]=useState(()=>[...M6_ASSESSMENT_QUESTIONS].sort(()=>Math.random()-.5));
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState({});
  const [finished,setFinished]=useState(false);
  const [learnerName,setLearnerName]=useState(saved.m6LearnerName||"");
  const [showCertificate,setShowCertificate]=useState(false);

  const current=order[index];
  const selected=answers[current?.id];
  const score=finished?order.reduce((n,q)=>n+(answers[q.id]===q.correct?1:0),0):0;
  const pct=finished?Math.round((score/order.length)*100):0;
  const passed=pct>=80;
  const completionDate=new Date().toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"});
  useEffect(()=>{if(saved.m6AssessmentPassed&&!getCbetModuleState(6).complete){completeCbetModule(6,saved.m6AssessmentBest||80,350);}},[]);
  if(showCertificate&&passed) return <MissionSixCertificate name={learnerName} score={pct} date={completionDate} onBack={()=>setShowCertificate(false)} />;

  const categories=["Network Fundamentals","Switching & VLANs","Wireless","Clinical Connectivity","Cybersecurity","Systems Integration"];
  const categoryScores=categories.map(cat=>{const qs=order.filter(q=>q.cat===cat);const hit=qs.filter(q=>answers[q.id]===q.correct).length;return {cat,hit,total:qs.length,pct:qs.length?Math.round(hit/qs.length*100):0};});
  const finish=()=>{const finalScore=order.reduce((n,q)=>n+(answers[q.id]===q.correct?1:0),0);const finalPct=Math.round((finalScore/order.length)*100);const finalPassed=finalPct>=80;setFinished(true);saveMissionProgress(moduleNumber,{...saved,m6AssessmentBest:Math.max(saved.m6AssessmentBest||0,finalPct),m6AssessmentPassed:finalPassed});if(finalPassed){if(!saved.m6AssessmentPassed)awardCbetXp(150,"mission6-competency-assessment");completeCbetModule(6,finalPct,350);}};
  if(finished) return <section className="cbet-shell m6-shell m6-assessment-results">
    <button className="cbet-back" onClick={onExit}>← Back to Academy</button>
    <div className={`m6-result-hero ${passed?"pass":"review"}`}><span>{passed?"🏆":"📘"}</span><div><small>MISSION 6 COMPETENCY ASSESSMENT</small><h1>{passed?"Competency Demonstrated":"Review Recommended"}</h1><p><strong>{score}/{order.length}</strong> correct · <strong>{pct}%</strong> · Passing score: 80%</p></div></div>
    <section className="m6-score-grid">{categoryScores.map(x=><article key={x.cat}><strong>{x.cat}</strong><span>{x.hit}/{x.total} correct</span><div><i style={{width:`${x.pct}%`}}/></div><b>{x.pct>=80?"Strong":x.pct>=60?"Review Recommended":"Needs Review"}</b></article>)}</section>
    <section className="m6-assessment-review"><h2>Question Review</h2>{order.map((q,i)=><article key={q.id} className={answers[q.id]===q.correct?"correct":"incorrect"}><div><span>{i+1}</span><strong>{q.q}</strong></div><p>Your answer: <b>{q.a[answers[q.id]]||"No answer"}</b></p>{answers[q.id]!==q.correct&&<p>Correct answer: <b>{q.a[q.correct]}</b></p>}<small>{q.why}</small></article>)}</section>
    {passed&&<section className="m6-certificate-launch"><div><span>CERTIFICATE UNLOCKED</span><h2>Mission 6: Networking & Connectivity</h2><p>Enter the learner name exactly as it should appear on the certificate.</p><input value={learnerName} onChange={e=>setLearnerName(e.target.value)} placeholder="Learner name" /><small>Your score and completion date will be added automatically.</small></div><button className="cbet-primary" disabled={!learnerName.trim()} onClick={()=>{saveMissionProgress(moduleNumber,{...saved,m6LearnerName:learnerName.trim(),m6AssessmentBest:Math.max(saved.m6AssessmentBest||0,pct),m6AssessmentPassed:true});setShowCertificate(true)}}>View Certificate →</button></section>}
    <div className="m6-assessment-actions"><button className="cbet-secondary" onClick={onBack}>← Review Mission 6</button><button className="cbet-primary" onClick={()=>window.location.reload()}>Retake Assessment</button></div>
  </section>;

  return <section className="cbet-shell m6-shell m6-assessment">
    <div className="m6-top-nav"><button className="cbet-back" onClick={onBack}>← Exit Assessment</button><span>Mission 6 · Competency Assessment</span><span>{index+1} / {order.length}</span></div>
    <div className="m6-progress"><span style={{width:`${((index+1)/order.length)*100}%`}}/></div>
    <section className="m6-assessment-rules"><strong>No hints. No immediate answer reveal.</strong><span>Choose the best troubleshooting answer based on the evidence. You can move backward before submitting.</span></section>
    <section className="m6-question-card"><span className="m6-section-label">{current.cat}</span><h1>{current.q}</h1><div className="m6-answer-grid">{current.a.map((a,i)=><button key={a} className={selected===i?"selected":""} onClick={()=>setAnswers(v=>({...v,[current.id]:i}))}><i>{String.fromCharCode(65+i)}</i><span>{a}</span></button>)}</div></section>
    <div className="m6-assessment-nav"><button className="cbet-secondary" disabled={index===0} onClick={()=>setIndex(i=>i-1)}>← Previous</button>{index<order.length-1?<button className="cbet-primary" disabled={selected===undefined} onClick={()=>setIndex(i=>i+1)}>Next Question →</button>:<button className="cbet-primary" disabled={Object.keys(answers).length<order.length} onClick={finish}>Submit Assessment</button>}</div>
  </section>;
}

function MissionSix({onExit, developerUnlockAll=false}) {
  const moduleNumber=6;
  const saved=getMissionProgress(moduleNumber)||{};
  const localUnlock=developerUnlockAll && isLocalAcademyHost();
  const [phase,setPhase]=useState(saved.phase||"briefing");
  const [assessmentMode,setAssessmentMode]=useState(false);
  const [lessonIndex,setLessonIndex]=useState(Number.isInteger(saved.lessonIndex)?saved.lessonIndex:0);
  const [activeNode,setActiveNode]=useState("device");
  const [explored,setExplored]=useState(saved.m6L1Explored||[]);
  const [packetRunning,setPacketRunning]=useState(true);
  const [path,setPath]=useState([]);
  const [pathFeedback,setPathFeedback]=useState("");
  const [consoleStep,setConsoleStep]=useState(0);
  const [diagnosis,setDiagnosis]=useState(null);
  const [fix,setFix]=useState(null);
  const [verify,setVerify]=useState(false);
  const [dhcpStep,setDhcpStep]=useState(0), [dhcpDiagnosis,setDhcpDiagnosis]=useState(null), [dhcpFix,setDhcpFix]=useState(null);
  const [dnsStep,setDnsStep]=useState(0), [dnsDiagnosis,setDnsDiagnosis]=useState(null), [dnsFix,setDnsFix]=useState(null), [dnsVerified,setDnsVerified]=useState(false);
  const [switchExplore,setSwitchExplore]=useState([]);
  const [vlanAnswer,setVlanAnswer]=useState(null);
  const [portStep,setPortStep]=useState(0);
  const [portDiagnosis,setPortDiagnosis]=useState(null);
  const [portFix,setPortFix]=useState(null);
  const [portVerified,setPortVerified]=useState(false);
  const [wifiExplore,setWifiExplore]=useState([]);
  const [wifiScenario,setWifiScenario]=useState(null);
  const [wifiStep,setWifiStep]=useState(0);
  const [wifiDiagnosis,setWifiDiagnosis]=useState(null);
  const [wifiFix,setWifiFix]=useState(null);
  const [wifiVerified,setWifiVerified]=useState(false);
  const [dicomExplore,setDicomExplore]=useState([]);
  const [dicomPath,setDicomPath]=useState([]);
  const [dicomPathFeedback,setDicomPathFeedback]=useState("");
  const [dicomStep,setDicomStep]=useState(0);
  const [dicomDiagnosis,setDicomDiagnosis]=useState(null);
  const [dicomFix,setDicomFix]=useState(null);
  const [dicomVerified,setDicomVerified]=useState(false);
  const [hl7Explore,setHl7Explore]=useState([]);
  const [hl7Path,setHl7Path]=useState([]);
  const [hl7PathFeedback,setHl7PathFeedback]=useState("");
  const [adtStep,setAdtStep]=useState(0), [adtDiagnosis,setAdtDiagnosis]=useState(null), [adtFix,setAdtFix]=useState(null), [adtVerified,setAdtVerified]=useState(false);
  const [resultStep,setResultStep]=useState(0), [resultDiagnosis,setResultDiagnosis]=useState(null), [resultFix,setResultFix]=useState(null), [resultVerified,setResultVerified]=useState(false);
  const [cyberExplore,setCyberExplore]=useState([]);
  const [cyberScenario,setCyberScenario]=useState(null);
  const [usbStep,setUsbStep]=useState(0);
  const [usbDiagnosis,setUsbDiagnosis]=useState(null);
  const [usbAction,setUsbAction]=useState(null);
  const [usbVerified,setUsbVerified]=useState(false);
  const [capStage,setCapStage]=useState(0);
  const [capA,setCapA]=useState(null), [capB,setCapB]=useState(null), [capC,setCapC]=useState(null), [capD,setCapD]=useState(null);
  const [capEvidence,setCapEvidence]=useState([]);
  const [capVerified,setCapVerified]=useState(false);
  const [credStep,setCredStep]=useState(0);
  const [credDiagnosis,setCredDiagnosis]=useState(null);
  const [credAction,setCredAction]=useState(null);
  const [credVerified,setCredVerified]=useState(false);

  const [storeStep,setStoreStep]=useState(0);
  const [storeDiagnosis,setStoreDiagnosis]=useState(null);
  const [storeFix,setStoreFix]=useState(null);
  const [storeVerified,setStoreVerified]=useState(false);
  const [authStep,setAuthStep]=useState(0);
  const [authDiagnosis,setAuthDiagnosis]=useState(null);
  const [authFix,setAuthFix]=useState(null);
  const [authVerified,setAuthVerified]=useState(false);
  const [wrongVlanStep,setWrongVlanStep]=useState(0);
  const [wrongVlanDiagnosis,setWrongVlanDiagnosis]=useState(null);
  const [wrongVlanFix,setWrongVlanFix]=useState(null);
  const [wrongVlanVerified,setWrongVlanVerified]=useState(false);
  const completed=Array.isArray(saved.completedLessons)&&saved.completedLessons.includes(0);
  const roadmap=["IP Addresses & TCP/IP","DHCP & DNS","Switches, VLANs & Ports","Wi-Fi in Healthcare","DICOM & PACS","HL7 & Interface Basics","Cybersecurity for Medical Devices","Networked Systems Integration"];
  if(assessmentMode) return <MissionSixAssessment onExit={onExit} onBack={()=>setAssessmentMode(false)} />;

  const active=MISSION_SIX_NETWORK_NODES.find(x=>x.id===activeNode)||MISSION_SIX_NETWORK_NODES[0];
  const ready=explored.length===4&&path.length===4&&diagnosis===1&&fix===1&&verify;
  const lesson1Complete=completed||localUnlock;
  const lesson2Completed=Array.isArray(saved.completedLessons)&&saved.completedLessons.includes(1);
  const lesson2Ready=dhcpDiagnosis===1&&dhcpFix===1&&dnsDiagnosis===1&&dnsFix===1&&dnsVerified;
  const lesson3Completed=Array.isArray(saved.completedLessons)&&saved.completedLessons.includes(2);
  const lesson3Ready=switchExplore.length===4&&vlanAnswer===1&&portDiagnosis===1&&portFix===1&&portVerified&&wrongVlanDiagnosis===1&&wrongVlanFix===1&&wrongVlanVerified;
  const lesson4Completed=Array.isArray(saved.completedLessons)&&saved.completedLessons.includes(3);
  const lesson4Ready=wifiExplore.length===4&&wifiScenario===1&&wifiDiagnosis===1&&wifiFix===1&&wifiVerified&&authDiagnosis===1&&authFix===1&&authVerified;
  const lesson5Completed=Array.isArray(saved.completedLessons)&&saved.completedLessons.includes(4);
  const lesson5Ready=dicomExplore.length===4&&dicomPath.length===4&&dicomDiagnosis===1&&dicomFix===1&&dicomVerified&&storeDiagnosis===1&&storeFix===1&&storeVerified;
  const lesson6Completed=Array.isArray(saved.completedLessons)&&saved.completedLessons.includes(5);
  const lesson6Ready=hl7Explore.length===4&&hl7Path.length===4&&adtDiagnosis===1&&adtFix===1&&adtVerified&&resultDiagnosis===1&&resultFix===1&&resultVerified;
  const lesson7Completed=Array.isArray(saved.completedLessons)&&saved.completedLessons.includes(6);
  const lesson7Ready=cyberExplore.length===4&&cyberScenario===1&&usbDiagnosis===1&&usbAction===1&&usbVerified&&credDiagnosis===1&&credAction===1&&credVerified;
  const lesson8Completed=Array.isArray(saved.completedLessons)&&saved.completedLessons.includes(7);
  const lesson8Ready=capA===1&&capB===1&&capC===1&&capD===1&&capVerified;

  const m6GuideData=[
    {steps:["Inspect all 4 network components.","Build the packet path in order.","Run ipconfig /all; diagnose, correct, and verify the fault.","Complete the lesson, then use Next."],next:explored.length<4?`Inspect the network diagram — ${4-explored.length} component(s) left.`:path.length<4?"Build the communication path.":consoleStep<1?"Click ipconfig /all in the Troubleshooting Call.":diagnosis!==1?"Answer What is wrong?":fix!==1?"Choose the strongest corrective action.":!verify?"Select Renew & Verify Configuration.":"All required activities are complete."},
    {steps:["Call #1: run ipconfig /all and diagnose DHCP.","Choose the approved DHCP correction.","Call #2: ping IP → ping hostname → nslookup.","Diagnose DNS, correct it, and verify name resolution."],next:dhcpStep<1?"Call #1: click ipconfig /all.":dhcpDiagnosis!==1?"Diagnose the DHCP evidence.":dhcpFix!==1?"Choose the approved DHCP action.":dnsStep<1?"Call #2: click ping 10.24.40.25.":dnsStep<2?"Next click ping monitoring01.hospital.local.":dnsStep<3?"Next click nslookup monitoring01.hospital.local.":dnsDiagnosis!==1?"Diagnose what the tests isolated.":dnsFix!==1?"Choose the approved DNS correction.":!dnsVerified?"Select Verify Name Resolution.":"All required activities are complete."},
    {steps:["Inspect all 4 switch concepts.","Answer the Quick Network Reasoning question.","Call #1: inspect, diagnose, correct, and verify the port.","Call #2: inspect, diagnose, correct, and verify the VLAN."],next:switchExplore.length<4?`Inspect the switch concepts — ${4-switchExplore.length} left.`:vlanAnswer!==1?"Answer Quick Network Reasoning.":portStep<1?"Call #1: click show interface Gi1/0/4.":portDiagnosis!==1?"Diagnose the port evidence.":portFix!==1?"Choose the corrective approach.":!portVerified?"Select Verify Port.":wrongVlanStep<1?"Call #2: click show interface Gi1/0/18 switchport.":wrongVlanDiagnosis!==1?"Diagnose the VLAN evidence.":wrongVlanFix!==1?"Choose the corrective action.":!wrongVlanVerified?"Select Renew & Verify.":"All required activities are complete."},
    {steps:["Click all 4 wireless concept buttons.","Answer Wireless Reasoning.","Call #1: inspect roaming evidence and run the roaming test.","Call #2: inspect authentication, correct it, and verify."],next:wifiExplore.length<4?`Review wireless concepts — ${4-wifiExplore.length} left.`:wifiScenario!==1?"Answer Wireless Reasoning.":wifiStep<1?"Call #1: click show wireless status.":wifiDiagnosis!==1?"Diagnose the wireless clue.":wifiFix!==1?"Choose what to investigate next.":!wifiVerified?"Run the Roaming Test.":authStep<1?"Call #2: click show wlan connection log.":authDiagnosis!==1?"Identify where authentication fails.":authFix!==1?"Choose the approved correction.":!authVerified?"Select Verify Connection.":"All required activities are complete."},
    {steps:["Click all 4 DICOM concept buttons.","Build the DICOM Send Path.","Call #1: verify, diagnose AE Title, correct, and retest.","Call #2: inspect the queue, diagnose the port, correct, and send a test study."],next:dicomExplore.length<4?`Review DICOM concepts — ${4-dicomExplore.length} left.`:dicomPath.length<4?"Build the DICOM Send Path.":dicomStep<1?"Call #1: run DICOM verification.":dicomDiagnosis!==1?"Diagnose the rejected association.":dicomFix!==1?"Choose the correction.":!dicomVerified?"Verify Association.":storeStep<1?"Call #2: view send queue log.":storeDiagnosis!==1?"Diagnose the strongest finding.":storeFix!==1?"Choose what should happen next.":!storeVerified?"Send Test Study.":"All required activities are complete."},
    {steps:["Click all 4 HL7 concept buttons.","Build source → engine → destination → ACK.","Call #1: inspect ADT routing, correct, and replay.","Call #2: inspect ORU response, correct mapping, and resend."],next:hl7Explore.length<4?`Review HL7 concepts — ${4-hl7Explore.length} left.`:hl7Path.length<4?"Build the HL7 workflow path.":adtStep<1?"Call #1: open latest ADT message.":adtDiagnosis!==1?"Diagnose the routing evidence.":adtFix!==1?"Choose the routing correction.":!adtVerified?"Replay & Verify.":resultStep<1?"Call #2: view ORU transaction.":resultDiagnosis!==1?"Interpret the acknowledgment.":resultFix!==1?"Choose the next step.":!resultVerified?"Resend & Verify.":"All required activities are complete."},
    {steps:["Click all 4 cybersecurity concepts.","Answer Security Reasoning.","Call #1: review USB/update risk and verify the approved update.","Call #2: identify the deployment blocker, apply baseline, and validate."],next:cyberExplore.length<4?`Review cybersecurity concepts — ${4-cyberExplore.length} left.`:cyberScenario!==1?"Answer Security Reasoning.":usbStep<1?"Call #1: review the service request.":usbDiagnosis!==1?"Identify the strongest concern.":usbAction!==1?"Choose the safe action.":!usbVerified?"Proceed & Verify after approval.":credStep<1?"Call #2: review the configuration.":credDiagnosis!==1?"Identify what blocks release.":credAction!==1?"Choose the deployment action.":!credVerified?"Validate & Release.":"All required activities are complete."},
    {steps:["Stage 1: compare both RJ45 ends.","Stage 2: run ipconfig /all and isolate the IP fault.","Stage 3: run C-ECHO and isolate DICOM.","Stage 4: trace HL7 and run end-to-end verification."],next:capA!==1?"Stage 1: compare End A and End B and answer What did you find?":!capEvidence.includes("ip")?"Stage 2: click ipconfig /all.":capB!==1?"Identify the IP fault.":!capEvidence.includes("dicom")?"Stage 3: click run C-ECHO.":capC!==1?"Identify the DICOM failure.":!capEvidence.includes("hl7")?"Stage 4: click trace patient message.":capD!==1?"Determine what the interface evidence proves.":!capVerified?"Run End-to-End Clinical Verification.":"All required activities are complete."}
  ];
  const m6ReadyFlags=[ready,lesson2Ready,lesson3Ready,lesson4Ready,lesson5Ready,lesson6Ready,lesson7Ready,lesson8Ready];
  const lessonGuide=<MissionSixLessonGuide lesson={lessonIndex+1} steps={m6GuideData[lessonIndex].steps} nextAction={m6GuideData[lessonIndex].next} complete={m6ReadyFlags[lessonIndex]}/>;






  const explore=id=>{setActiveNode(id);setExplored(v=>v.includes(id)?v:[...v,id])};
  const reset=()=>{setActiveNode("device");setExplored([]);setPacketRunning(true);setPath([]);setPathFeedback("");setConsoleStep(0);setDiagnosis(null);setFix(null);setVerify(false)};

  if(phase==="briefing") return <section className="cbet-shell m6-shell m6-briefing">
    <button className="cbet-back" onClick={onExit}>← Back to Academy</button>
    <span className="m6-kicker">Mission 6 · Networking & Computers</span>
    <h1>Follow the connection.<br/>Find the failure.</h1>
    <p>Learn networking the way a Clinical Engineer uses it: inspect the evidence, test the path, isolate the fault, correct it, and verify communication.</p>
    <div className="m6-roadmap">{roadmap.map((item,index)=>{const available=index===0||(index===1&&lesson1Complete)||(index===2&&(lesson2Completed||localUnlock))||(index===3&&(lesson3Completed||localUnlock))||(index===4&&(lesson4Completed||localUnlock))||(index===5&&(lesson5Completed||localUnlock))||(index===6&&(lesson6Completed||localUnlock))||(index===7&&(lesson7Completed||localUnlock));const done=(index===0&&completed)||(index===1&&lesson2Completed)||(index===2&&lesson3Completed)||(index===3&&lesson4Completed)||(index===4&&lesson5Completed)||(index===5&&lesson6Completed)||(index===6&&lesson7Completed)||(index===7&&lesson8Completed);return <button key={item} className={`${available?"ready":"future"} ${done?"complete":""}`} disabled={!available} onClick={()=>{setLessonIndex(index);setPhase("lessons")}}><span>{done?"✓":index===0?"🌐":index===1?"🧭":index===2?"🔀":index===3?"📶":index===4?"🩻":index===5?"⇄":index===6?"🔐":index===7?"🧩":index+1}</span><strong>{item}</strong><small>{done?"Complete — review anytime":available?"Open lesson":"Locked — complete previous lesson"}</small></button>})}</div>
    <section className="m6-assessment-launch"><div><span>FINAL COMPETENCY CHECK</span><h2>Mission 6 Networking & Connectivity Assessment</h2><p>15 randomized troubleshooting scenarios · no hints · 80% required to pass.</p></div><button className="cbet-primary" disabled={!lesson8Completed&&!localUnlock} onClick={()=>setAssessmentMode(true)}>{saved.m6AssessmentPassed?"Review / Retake Assessment":"Start Competency Assessment"}</button></section>
    <button className="cbet-primary m6-begin" onClick={()=>{setPhase("lessons");saveMissionProgress(moduleNumber,{...saved,phase:"lessons",lessonIndex:0})}}>{completed?"Review IP Addresses & TCP/IP":"Begin Network Lab"}</button>
  </section>;

  if(lessonIndex===7) return <section className="cbet-shell m6-shell m6-lesson-stage m6-l8">
    <div className="m6-top-nav"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 6 · Lesson 8 of 8</span><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>Mission Overview</button></div><div className="m6-progress"><span style={{width:"100%"}}/></div>{lessonGuide}

    <section className="m6-cap-hero"><div><span className="m6-kicker">Networked Systems Integration · Capstone</span><h1>One install. Four faults. Follow the evidence.</h1><p>A new CT injector workstation has been installed in Imaging. The hardware powers on, but the clinical workflow is not ready. You are the CE assigned to bring the system online without guessing, bypassing controls, or changing unrelated settings.</p><div className="m6-cap-call"><strong>Service Call</strong><span>“The new workstation has no reliable network communication, PACS connectivity fails, and patient data is not populating.”</span></div></div><div className="m6-cap-stack"><div>DEVICE</div><b>↓</b><div>SWITCH / VLAN</div><b>↓</b><div>IP NETWORK</div><b>↓</b><div>DICOM / HL7</div></div></section>

    <section className="m6-cap-rule"><strong>Capstone rule:</strong> You are not told which lesson contains the answer. Use the evidence, isolate one fault at a time, repair it, then retest the next layer.</section>

    <section className="m6-lab-section"><span className="m6-section-label">STAGE 1 · Physical Link</span><h2>The new workstation shows “Network Disconnected.”</h2><p>The installer says the cable was made from spare patch cable in the shop. Inspect both ends.</p>
      <div className="m6-cable-lab"><div><strong>END A · RJ45</strong><pre>{`Pin 1  White/Orange
Pin 2  Orange
Pin 3  White/Green
Pin 4  Blue
Pin 5  White/Blue
Pin 6  Green
Pin 7  White/Brown
Pin 8  Brown

T568B`}</pre></div><b>CAT6</b><div><strong>END B · RJ45</strong><pre>{`Pin 1  White/Green
Pin 2  Green
Pin 3  White/Orange
Pin 4  Blue
Pin 5  White/Blue
Pin 6  Orange
Pin 7  White/Brown
Pin 8  Brown

T568A`}</pre></div></div>
      <div className="m6-diagnose"><h3>What did you find?</h3>{["Both ends use the same wiring standard","The cable is terminated T568B on one end and T568A on the other, making it a crossover cable","The cable is fiber","The problem proves DNS is down"].map((x,i)=><button key={x} disabled={capA===1} className={capA!==null?(i===1?"correct":capA===i?"wrong":""):""} onClick={()=>{setCapA(i);if(i===1)setCapStage(v=>Math.max(v,1));playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>
      {capA===1&&<div className="m6-cap-feedback"><strong>Good catch.</strong><span>Modern Ethernet often supports auto-MDI/MDIX, so a crossover cable will not always cause failure. But on equipment or interfaces that do not compensate automatically, the wrong cable type can prevent the link. For a new install, use the manufacturer/site-approved straight-through patch cable and verify link.</span></div>}
    </section>

    {capStage>=1&&<section className="m6-lab-section"><span className="m6-section-label">STAGE 2 · IP Configuration</span><h2>The link is now up, but communication drops unpredictably.</h2><p>Run the same check you would use on the workstation during a real service call.</p>
      <div className="m6-console"><div className="m6-console-bar"><span></span><span></span><span></span><strong>Windows Command Prompt</strong></div><div className="m6-console-body"><div>&gt; <button disabled={capEvidence.includes("ip")} onClick={()=>setCapEvidence(v=>[...v,"ip"])}>ipconfig /all</button></div>{capEvidence.includes("ip")&&<pre>{`Ethernet adapter Ethernet:
   Description . . . . . . . . . : Intel Ethernet Connection
   Physical Address. . . . . . . : 3C-52-82-A7-11-09
   DHCP Enabled. . . . . . . . . : No
   IPv4 Address. . . . . . . . . : 10.24.16.57 (Duplicate)
   Subnet Mask . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . : 10.24.16.1
   DNS Servers . . . . . . . . . : 10.24.1.20`}</pre>}</div></div>
      {capEvidence.includes("ip")&&<div className="m6-diagnose"><h3>What is the fault?</h3>{["The subnet mask is always wrong","10.24.16.57 is flagged as a duplicate address","The DNS server must be changed","The MAC address is invalid"].map((x,i)=><button key={x} disabled={capB===1} className={capB!==null?(i===1?"correct":capB===i?"wrong":""):""} onClick={()=>{setCapB(i);if(i===1)setCapStage(v=>Math.max(v,2));playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {capB===1&&<div className="m6-cap-feedback"><strong>Corrective path:</strong><span>Do not simply pick another address. Coordinate the approved IP assignment and reserve the correct IP to this workstation's MAC address when that is the site's design, then verify the duplicate condition is gone.</span></div>}
    </section>}

    {capStage>=2&&<section className="m6-lab-section"><span className="m6-section-label">STAGE 3 · Application Layer</span><h2>The workstation now has stable IP communication. Ping to PACS passes, but DICOM verification fails.</h2>
      <div className="m6-console"><div className="m6-console-bar"><span></span><span></span><span></span><strong>DICOM Verification</strong></div><div className="m6-console-body"><div>&gt; <button disabled={capEvidence.includes("dicom")} onClick={()=>setCapEvidence(v=>[...v,"dicom"])}>run C-ECHO</button></div>{capEvidence.includes("dicom")&&<pre>{`ping 10.24.60.20 ................. PASS
TCP 10.24.60.20:104 .............. OPEN

Calling AE Title ................ CT_INJECTOR_NEW
Called AE Title ................. PACS_MAIN

Association ..................... REJECTED
Reason .......................... Calling AE not recognized

PACS registered AE .............. CT_INJ_01`}</pre>}</div></div>
      {capEvidence.includes("dicom")&&<div className="m6-diagnose"><h3>Where is the failure now?</h3>{["The cable failed again","The network path is proven; the DICOM calling AE Title does not match the registered PACS configuration","DHCP did not assign an address","The monitor needs calibration"].map((x,i)=><button key={x} disabled={capC===1} className={capC!==null?(i===1?"correct":capC===i?"wrong":""):""} onClick={()=>{setCapC(i);if(i===1)setCapStage(v=>Math.max(v,3));playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {capC===1&&<div className="m6-cap-feedback"><strong>Layer-by-layer thinking:</strong><span>Do not return to the cable or IP configuration after those layers are proven. Correct the approved DICOM identity so the modality/workstation and PACS agree.</span></div>}
    </section>}

    {capStage>=3&&<section className="m6-lab-section"><span className="m6-section-label">STAGE 4 · Clinical Workflow</span><h2>DICOM now passes and images transfer, but patient demographics still do not populate.</h2><p>Trace the interface message instead of changing the network again.</p>
      <div className="m6-console"><div className="m6-console-bar"><span></span><span></span><span></span><strong>Interface Engine</strong></div><div className="m6-console-body"><div>&gt; <button disabled={capEvidence.includes("hl7")} onClick={()=>setCapEvidence(v=>[...v,"hl7"])}>trace patient message</button></div>{capEvidence.includes("hl7")&&<pre>{`ADT^A01 Message ID .............. 881204
Source .......................... EHR
Interface Engine ................ RECEIVED
Expected Destination ............ CT_INJECTOR
Configured Route ................ CT_INJECTOR_TEST
Delivery to production .......... NOT ATTEMPTED
Network connection to device .... AVAILABLE`}</pre>}</div></div>
      {capEvidence.includes("hl7")&&<div className="m6-diagnose"><h3>What should you conclude?</h3>{["The entire network is down","The ADT reaches the interface engine, but the route is pointed at the test destination instead of the production clinical system","The crossover cable returned","The PACS port must be changed"].map((x,i)=><button key={x} disabled={capD===1} className={capD!==null?(i===1?"correct":capD===i?"wrong":""):""} onClick={()=>{setCapD(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {capD===1&&!capVerified&&<div className="m6-cap-finalcheck"><h3>Repairs are complete. Do you close the call?</h3><p>Not yet. A networked medical-device repair is not complete until the actual clinical workflow is verified end-to-end.</p><button className="cbet-primary" onClick={()=>setCapVerified(true)}>Run End-to-End Clinical Verification</button></div>}
      {capVerified&&<div className="m6-verify"><span>✓ END-TO-END SYSTEM VERIFIED</span><pre>{`Physical link ................... UP
Speed / Duplex .................. 1000 Mbps / Full
Duplicate IP .................... CLEARED
Gateway / DNS ................... PASS
DICOM C-ECHO .................... SUCCESS
DICOM test transfer ............. RECEIVED
ADT route ....................... PRODUCTION
Patient demographics ............ RECEIVED
Clinical workflow ............... PASS
Security baseline ............... VERIFIED
Documentation ................... COMPLETE`}</pre><strong>You did not just restore a ping. You restored and verified the clinical system.</strong></div>}
    </section>}

    <section className="m6-cap-lessons"><article><span>1</span><strong>Start at the failed layer</strong><p>Physical, link, IP, transport, application, workflow.</p></article><article><span>2</span><strong>Do not undo proven work</strong><p>Once a layer is verified, move forward unless new evidence points back to it.</p></article><article><span>3</span><strong>Use evidence, not guesses</strong><p>Commands, logs, port status, application tests, and acknowledgments tell the story.</p></article><article><span>4</span><strong>Verify the clinical outcome</strong><p>Connectivity is not the final goal. Safe clinical workflow is.</p></article></section>

    <section className={`m6-completion ${lesson8Ready||lesson8Completed?"ready":""}`}><div><span>{lesson8Ready||lesson8Completed?"🏆":"🧩"}</span><div><strong>{lesson8Completed?"Networked Systems Integration Complete":lesson8Ready?"Mission 6 Capstone Ready to Complete":"Resolve all four faults and verify the workflow"}</strong><small>125 XP · integrated network troubleshooting capstone</small></div></div><button className="cbet-primary" disabled={!lesson8Ready&&!lesson8Completed} onClick={()=>{const prior=Array.isArray(saved.completedLessons)?saved.completedLessons:[];const next=Array.from(new Set([...prior,0,1,2,3,4,5,6,7]));if(!lesson8Completed)awardCbetXp(125,"mission6-network-integration-capstone");saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:7,completedLessons:next,m6L1Explored:explored})}}>{lesson8Completed?"Mission 6 Completed ✓":"Complete Mission 6 Capstone"}</button></section>
    <nav className="m6-bottom-nav"><button className="cbet-secondary" onClick={()=>setLessonIndex(6)}>← Previous: Cybersecurity for Medical Devices</button><button className="cbet-secondary" onClick={()=>{setCapStage(0);setCapA(null);setCapB(null);setCapC(null);setCapD(null);setCapEvidence([]);setCapVerified(false)}}>Restart Capstone</button><button className="cbet-primary" disabled={!lesson8Ready&&!lesson8Completed&&!localUnlock} onClick={()=>setAssessmentMode(true)}>Take Competency Assessment →</button></nav>
  </section>;

  if(lessonIndex===6) return <section className="cbet-shell m6-shell m6-lesson-stage m6-l7">
    <div className="m6-top-nav"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 6 · Lesson 7 of 8</span><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>Mission Overview</button></div><div className="m6-progress"><span style={{width:"87.5%"}}/></div>{lessonGuide}

    <section className="m6-cyber-hero">
      <div>
        <span className="m6-kicker">Cybersecurity for Medical Devices</span>
        <h1>Protect the device without breaking patient care.</h1>
        <p>Medical-device cybersecurity is not about becoming a penetration tester. It is about recognizing risk, preserving safety, following approved change processes, and knowing when to escalate.</p>
        <div className="m6-cyber-concepts">{[["access","Access Control"],["patch","Patching"],["usb","Removable Media"],["segment","Network Segmentation"]].map(([id,label])=><button key={id} className={cyberExplore.includes(id)?"done":""} onClick={()=>setCyberExplore(v=>v.includes(id)?v:[...v,id])}>{cyberExplore.includes(id)?"✓":"●"} {label}</button>)}</div>
      </div>
      <div className="m6-cyber-diagram">
        <div className="cyber-device">MEDICAL DEVICE</div><b>→</b><div className="cyber-zone">MEDICAL VLAN</div><b>→</b><div className="cyber-firewall">FIREWALL / ACL</div><b>→</b><div className="cyber-services">APPROVED SERVICES</div>
      </div>
    </section>

    <section className="m6-vlan-check">
      <span className="m6-section-label">Security Reasoning</span>
      <h2>A device needs a software update. What is the safest first principle?</h2>
      <div>{["Download the newest file you can find and install it immediately","Use the approved vendor/organizational update process and verify compatibility, backup/recovery, change control, and post-update function","Disable security controls so the update installs faster"].map((x,i)=><button key={x} disabled={cyberScenario===1} className={cyberScenario!==null?(i===1?"correct":cyberScenario===i?"wrong":""):""} onClick={()=>{setCyberScenario(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>
    </section>

    <section className="m6-lab-section">
      <span className="m6-section-label">🚨 Troubleshooting Call #1 · Unknown USB Media</span>
      <h2>A vendor arrives to update a networked medical device using a USB drive you did not expect.</h2>
      <p>The device is currently functioning clinically. Decide what to do before inserting anything.</p>
      <div className="m6-console"><div className="m6-console-bar"><span></span><span></span><span></span><strong>Service Event Record</strong></div><div className="m6-console-body">
        <div>&gt; <button disabled={usbStep} onClick={()=>setUsbStep(1)}>review service request</button></div>
        {usbStep>0&&<pre>{`Device: Networked Infusion Management Workstation
Current Status: In service
Requested Action: Software update via USB
Change Ticket: Not found
Media Asset ID: Not registered
Vendor File Hash: Not documented
Maintenance Window: Not scheduled`}</pre>}
      </div></div>
      {usbStep>0&&<div className="m6-diagnose"><h3>What is the strongest concern?</h3>{["The USB drive is probably too small","The change and removable media are not yet verified through the approved process","The IP address is duplicated","The switch port is half duplex"].map((x,i)=><button key={x} disabled={usbDiagnosis===1} className={usbDiagnosis!==null?(i===1?"correct":usbDiagnosis===i?"wrong":""):""} onClick={()=>{setUsbDiagnosis(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {usbDiagnosis===1&&<div className="m6-fix-stage"><h3>What should you do next?</h3>{["Insert the drive and see what happens","Pause the update, verify the approved change/vendor package and removable-media process, coordinate with cybersecurity/IT as required, then proceed only when authorized","Format the USB drive yourself","Turn off antivirus permanently"].map((x,i)=><button key={x} disabled={usbAction===1} className={usbAction!==null?(i===1?"correct":usbAction===i?"wrong":""):""} onClick={()=>{setUsbAction(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {usbAction===1&&!usbVerified&&<div className="m6-port-action"><div><span>CHANGE CONTROL</span><strong>Vendor package + media approved</strong><small>Maintenance window scheduled · rollback plan confirmed</small></div><button className="cbet-primary" onClick={()=>setUsbVerified(true)}>Proceed & Verify</button></div>}
      {usbVerified&&<div className="m6-verify"><span>✓ UPDATE VERIFIED</span><pre>{`Approved package .......... VERIFIED
Maintenance window ........ ACTIVE
Update result .............. SUCCESS
Device self-test ........... PASS
Network communication ...... PASS
Clinical function check .... PASS`}</pre><strong>Security controls and clinical function were both preserved.</strong></div>}
    </section>

    <section className="m6-lab-section">
      <span className="m6-section-label">🚨 Troubleshooting Call #2 · Default Credentials</span>
      <h2>A newly installed device is reachable from the medical network and still uses factory-default administrator credentials.</h2>
      <p>The device is not yet released for clinical use. Inspect the deployment checklist.</p>
      <div className="m6-console"><div className="m6-console-bar"><span></span><span></span><span></span><strong>Deployment Security Checklist</strong></div><div className="m6-console-body">
        <div>&gt; <button disabled={credStep} onClick={()=>setCredStep(1)}>review configuration</button></div>
        {credStep>0&&<pre>{`Network Segment ............ Medical Devices VLAN
Remote Management .......... Enabled
Administrator Account ...... admin
Password State ............. Factory Default
Unique Credentials ......... Not configured
Unused Services ............ 2 enabled
Security Baseline .......... NOT COMPLETE`}</pre>}
      </div></div>
      {credStep>0&&<div className="m6-diagnose"><h3>What should prevent release to clinical use?</h3>{["The hostname is too short","The device still has default administrative credentials and the security baseline is incomplete","The DNS server is reachable","The NIC supports gigabit"].map((x,i)=><button key={x} disabled={credDiagnosis===1} className={credDiagnosis!==null?(i===1?"correct":credDiagnosis===i?"wrong":""):""} onClick={()=>{setCredDiagnosis(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {credDiagnosis===1&&<div className="m6-fix-stage"><h3>What is the appropriate deployment action?</h3>{["Release it now and change the password later","Apply the approved security baseline: unique managed credentials, disable unnecessary services, verify segmentation/access controls, document the configuration, and then validate clinical/network function","Disconnect it from all networks forever","Share one common admin password across all devices"].map((x,i)=><button key={x} disabled={credAction===1} className={credAction!==null?(i===1?"correct":credAction===i?"wrong":""):""} onClick={()=>{setCredAction(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {credAction===1&&!credVerified&&<div className="m6-port-action"><div><span>SECURITY BASELINE</span><strong>Unique credentials · unnecessary services disabled</strong><small>Segmentation and required access verified</small></div><button className="cbet-primary" onClick={()=>setCredVerified(true)}>Validate & Release</button></div>}
      {credVerified&&<div className="m6-verify"><span>✓ DEPLOYMENT VERIFIED</span><pre>{`Default credentials ........ REMOVED
Unique managed account ..... ACTIVE
Unused services ............ DISABLED
Approved network access .... VERIFIED
Clinical communication ..... PASS
Configuration documented ... YES`}</pre></div>}
    </section>

    <section className="m6-l7takeaways">
      <article><strong>Do Not Improvise Security Changes</strong><span>Use approved vendor, HTM, IT, and cybersecurity processes.</span></article>
      <article><strong>Segmentation Reduces Exposure</strong><span>Medical-device VLANs and access controls help limit unnecessary communication paths.</span></article>
      <article><strong>Default Credentials Are a Deployment Failure</strong><span>Do not release a device until the approved security baseline is complete.</span></article>
      <article><strong>Know When to Escalate</strong><span>Suspicious activity, unauthorized software/media, or security events belong with the cybersecurity/IT response process.</span></article>
    </section>

    <section className={`m6-completion ${lesson7Ready||lesson7Completed?"ready":""}`}><div><span>{lesson7Ready||lesson7Completed?"🏅":"🔐"}</span><div><strong>{lesson7Completed?"Cybersecurity for Medical Devices Complete":lesson7Ready?"Lesson Ready to Complete":"Complete both cybersecurity troubleshooting calls"}</strong><small>95 XP · secure deployment, removable media, access control & verification</small></div></div><button className="cbet-primary" disabled={!lesson7Ready&&!lesson7Completed} onClick={()=>{const prior=Array.isArray(saved.completedLessons)?saved.completedLessons:[];const next=Array.from(new Set([...prior,0,1,2,3,4,5,6]));if(!lesson7Completed)awardCbetXp(95,"mission6-cybersecurity");saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:6,completedLessons:next,m6L1Explored:explored})}}>{lesson7Completed?"Lesson Completed ✓":"Complete Lesson 7"}</button></section>

    <nav className="m6-bottom-nav"><button className="cbet-secondary" onClick={()=>setLessonIndex(5)}>← Previous: HL7 & Interface Basics</button><button className="cbet-secondary" onClick={()=>{setCyberExplore([]);setCyberScenario(null);setUsbStep(0);setUsbDiagnosis(null);setUsbAction(null);setUsbVerified(false);setCredStep(0);setCredDiagnosis(null);setCredAction(null);setCredVerified(false)}}>Restart Lesson</button><button className="cbet-primary" disabled={!lesson7Ready&&!lesson7Completed&&!localUnlock} onClick={()=>setLessonIndex(7)}>Next: Networked Systems Integration →</button></nav>
  </section>;

  if(lessonIndex===5) return <section className="cbet-shell m6-shell m6-lesson-stage m6-l6">
    <div className="m6-top-nav"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 6 · Lesson 6 of 8</span><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>Mission Overview</button></div><div className="m6-progress"><span style={{width:"75%"}}/></div>{lessonGuide}
    <section className="m6-hl7-hero"><div><span className="m6-kicker">HL7 & Interface Basics</span><h1>The network can work while the workflow fails.</h1><p>Follow the clinical message from source to interface engine to destination. Read the acknowledgment before blaming connectivity.</p><div className="m6-hl7-concepts">{[["adt","ADT"],["oru","ORU"],["engine","Interface Engine"],["ack","ACK / Error"]].map(([id,label])=><button key={id} className={hl7Explore.includes(id)?"done":""} onClick={()=>setHl7Explore(v=>v.includes(id)?v:[...v,id])}>{hl7Explore.includes(id)?"✓":"●"} {label}</button>)}</div></div><div className="m6-hl7-flow"><div><strong>EHR / SOURCE</strong><small>Generate message</small></div><b>→</b><div className="engine"><strong>INTERFACE ENGINE</strong><small>Route · transform · monitor</small></div><b>→</b><div><strong>CLINICAL SYSTEM</strong><small>Receive · ACK / Error</small></div></div></section>
    <section className="m6-path-builder"><div className="m6-section-heading"><span className="m6-section-label">Trace the HL7 Workflow</span><h2>Find the last proven-good step</h2><p>Build the troubleshooting path.</p></div><div className="m6-path-result">{["source","engine","destination","ack"].map((id,i)=><div className="m6-path-wrap" key={id}><div className={`m6-path-slot ${hl7Path[i]===id?"filled":""}`}><span>{i+1}</span><strong>{hl7Path[i]?({"source":"Source Message","engine":"Interface Engine","destination":"Destination","ack":"ACK / Error"})[hl7Path[i]]:"Choose a step"}</strong></div>{i<3&&<b>→</b>}</div>)}</div><div className={`m6-path-feedback ${hl7PathFeedback.startsWith("✓")?"success":hl7PathFeedback.startsWith("Not")?"try":""}`}>{hl7PathFeedback||"Start by proving the source generated the message."}</div><div className="m6-path-options">{[["destination","Destination"],["ack","ACK / Error"],["source","Source Message"],["engine","Interface Engine"]].map(([id,label])=><button key={id} disabled={hl7Path.includes(id)} onClick={()=>{const seq=["source","engine","destination","ack"];if(id===seq[hl7Path.length]){const n=[...hl7Path,id];setHl7Path(n);setHl7PathFeedback(n.length===4?"✓ Workflow traced.":"✓ Correct — follow the message downstream.");playCbetTone("correct")}else{setHl7PathFeedback("Not quite — prove where the message exists before jumping downstream.");playCbetTone("wrong")}}}>{label}</button>)}</div></section>
    <section className="m6-lab-section"><span className="m6-section-label">🚨 Troubleshooting Call #1 · Patient Never Appears</span><h2>The patient is admitted in the EHR but never appears on the receiving clinical system.</h2><p>The receiving server is reachable. Inspect the interface transaction.</p><div className="m6-console"><div className="m6-console-bar"><span></span><span></span><span></span><strong>Interface Engine Message Viewer</strong></div><div className="m6-console-body"><div>&gt; <button disabled={adtStep} onClick={()=>setAdtStep(1)}>open latest ADT message</button></div>{adtStep>0&&<pre>{`MSH|^~\\&|EHR|HOSPITAL|CLINICAL_SYS|HOSPITAL|20260807||ADT^A01|784211|P|2.5
PID|1||MRN78421^^^HOSPITAL^MR||PATIENT^TEST
PV1|1|I|3N^312^1

Message Type ............ ADT^A01
Source .................. EHR
Expected Destination .... CLINICAL_SYS
Active Route ............ CLINICAL_TEST
Delivery ................ NOT ATTEMPTED`}</pre>}</div></div>{adtStep>0&&<div className="m6-diagnose"><h3>What is the strongest finding?</h3>{["The patient monitor needs a new IP","The message exists, but the active interface route points to the wrong destination","DNS must be down","The switch is half duplex"].map((x,i)=><button key={x} disabled={adtDiagnosis===1} className={adtDiagnosis!==null?(i===1?"correct":adtDiagnosis===i?"wrong":""):""} onClick={()=>{setAdtDiagnosis(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}{adtDiagnosis===1&&<div className="m6-fix-stage"><h3>What should happen next?</h3>{["Change the MRN","Correct the approved interface route to CLINICAL_SYS, replay one controlled message, and verify the acknowledgment","Assign a static IP","Replace the cable"].map((x,i)=><button key={x} disabled={adtFix===1} className={adtFix!==null?(i===1?"correct":adtFix===i?"wrong":""):""} onClick={()=>{setAdtFix(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}{adtFix===1&&!adtVerified&&<div className="m6-port-action"><div><span>INTERFACE ROUTE</span><strong>ADT^A01 → CLINICAL_SYS</strong><small>Replay one controlled message</small></div><button className="cbet-primary" onClick={()=>setAdtVerified(true)}>Replay & Verify</button></div>}{adtVerified&&<div className="m6-verify"><span>✓ ADT DELIVERY VERIFIED</span><pre>{`Route .................... CLINICAL_SYS
Delivery ................. SENT
Acknowledgment ........... ACK
MSA|AA|784211
Patient visible .......... YES`}</pre></div>}</section>
    <section className="m6-lab-section"><span className="m6-section-label">🚨 Troubleshooting Call #2 · Result Rejected</span><h2>A result leaves the source system but never posts to the chart.</h2><p>The engine says the message was delivered. Read the response.</p><div className="m6-console"><div className="m6-console-bar"><span></span><span></span><span></span><strong>HL7 Transaction Log</strong></div><div className="m6-console-body"><div>&gt; <button disabled={resultStep} onClick={()=>setResultStep(1)}>view ORU transaction</button></div>{resultStep>0&&<pre>{`MSH|^~\\&|DEVICE_SYS|HOSPITAL|EHR|HOSPITAL|20260807||ORU^R01|998271|P|2.5
PID|1||MRN78421^^^HOSPITAL^MR
OBR|1|||VITALS
OBX|1|NM|HR^Heart Rate||84|bpm

Transport ................. DELIVERED
MSA|AE|998271
ERR|||PID^1^3|204^Unknown Key Identifier
Detail: Patient identifier not found in destination`}</pre>}</div></div>{resultStep>0&&<div className="m6-diagnose"><h3>What did the evidence prove?</h3>{["The network never delivered it","Transport succeeded, but the destination rejected the message because the patient identifier was not recognized","Wrong VLAN","Wrong DICOM AE Title"].map((x,i)=><button key={x} disabled={resultDiagnosis===1} className={resultDiagnosis!==null?(i===1?"correct":resultDiagnosis===i?"wrong":""):""} onClick={()=>{setResultDiagnosis(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}{resultDiagnosis===1&&<div className="m6-fix-stage"><h3>What is the appropriate next step?</h3>{["Keep resending the same message","Investigate patient/identifier mapping and registration, correct the approved mapping, then resend and confirm an ACK","Change server IP","Disable the interface engine"].map((x,i)=><button key={x} disabled={resultFix===1} className={resultFix!==null?(i===1?"correct":resultFix===i?"wrong":""):""} onClick={()=>{setResultFix(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}{resultFix===1&&!resultVerified&&<div className="m6-port-action"><div><span>PATIENT MAPPING</span><strong>Identifier mapping corrected</strong><small>Resend one result and inspect the ACK</small></div><button className="cbet-primary" onClick={()=>setResultVerified(true)}>Resend & Verify</button></div>}{resultVerified&&<div className="m6-verify"><span>✓ RESULT VERIFIED</span><pre>{`Transport ................. DELIVERED
MSA|AA|998271
Result posted ............. YES
Heart Rate ................ 84 bpm`}</pre></div>}</section>
    <section className="m6-l6takeaways"><article><strong>ADT</strong><span>Patient administration events such as admission, discharge, and transfer.</span></article><article><strong>ORU</strong><span>Observation/result information moving between systems.</span></article><article><strong>ACK / Error</strong><span>Delivery does not guarantee acceptance. Read the destination response.</span></article><article><strong>Follow the Message</strong><span>Source → engine → destination → acknowledgment.</span></article></section>
    <section className={`m6-completion ${lesson6Ready||lesson6Completed?"ready":""}`}><div><span>{lesson6Ready||lesson6Completed?"🏅":"⇄"}</span><div><strong>{lesson6Completed?"HL7 & Interface Basics Complete":lesson6Ready?"Lesson Ready to Complete":"Complete both HL7 troubleshooting calls"}</strong><small>90 XP · ADT, ORU, routing, ACK/errors & verification</small></div></div><button className="cbet-primary" disabled={!lesson6Ready&&!lesson6Completed} onClick={()=>{const prior=Array.isArray(saved.completedLessons)?saved.completedLessons:[];const next=Array.from(new Set([...prior,0,1,2,3,4,5]));if(!lesson6Completed)awardCbetXp(90,"mission6-hl7-interface");saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:5,completedLessons:next,m6L1Explored:explored})}}>{lesson6Completed?"Lesson Completed ✓":"Complete Lesson 6"}</button></section>
    <nav className="m6-bottom-nav"><button className="cbet-secondary" onClick={()=>setLessonIndex(4)}>← Previous: DICOM & PACS</button><button className="cbet-secondary" onClick={()=>{setHl7Explore([]);setHl7Path([]);setHl7PathFeedback("");setAdtStep(0);setAdtDiagnosis(null);setAdtFix(null);setAdtVerified(false);setResultStep(0);setResultDiagnosis(null);setResultFix(null);setResultVerified(false)}}>Restart Lesson</button><button className="cbet-primary" disabled={!lesson6Ready&&!lesson6Completed&&!localUnlock} onClick={()=>setLessonIndex(6)}>Next: Cybersecurity for Medical Devices →</button></nav>
  </section>;

  if(lessonIndex===4) return <section className="cbet-shell m6-shell m6-lesson-stage m6-l5">
    <div className="m6-top-nav"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 6 · Lesson 5 of 8</span><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>Mission Overview</button></div><div className="m6-progress"><span style={{width:"62.5%"}}/></div>{lessonGuide}

    <section className="m6-dicom-hero"><div><span className="m6-kicker">DICOM & PACS</span><h1>Network reachability is only the beginning.</h1><p>An imaging modality can ping a PACS server and still fail to send images. DICOM adds application-layer identifiers, ports, and destinations that must all agree.</p><div className="m6-dicom-concepts">{[["modality","Modality"],["ae","AE Title"],["port","DICOM Port"],["pacs","PACS"]].map(([id,label])=><button key={id} className={dicomExplore.includes(id)?"done":""} onClick={()=>setDicomExplore(v=>v.includes(id)?v:[...v,id])}>{dicomExplore.includes(id)?"✓":"●"} {label}</button>)}</div></div>
    <div className="m6-dicom-map"><div className="dicom-modality"><strong>CT-01</strong><small>10.24.50.31</small><span>AE: CT_ER_01</span></div><b>→</b><div className="dicom-network">HOSPITAL<br/>NETWORK</div><b>→</b><div className="dicom-pacs"><strong>PACS</strong><small>10.24.60.20</small><span>AE: PACS_MAIN</span></div></div></section>

    <section className="m6-path-builder m6-dicom-path"><div className="m6-section-heading"><span className="m6-section-label">Build the DICOM Send Path</span><h2>What has to be correct for a study to reach PACS?</h2><p>Click the cards in the logical troubleshooting order.</p></div><div className="m6-path-result">{["network","ipport","aetitle","store"].map((id,i)=><div className="m6-path-wrap" key={id}><div className={`m6-path-slot ${dicomPath[i]===id?"filled":""}`}><span>{i+1}</span><strong>{dicomPath[i]?({"network":"Network Reachability","ipport":"Destination IP / Port","aetitle":"AE Titles","store":"DICOM Store Test"})[dicomPath[i]]:"Choose a step"}</strong></div>{i<3&&<b>→</b>}</div>)}</div><div className={`m6-path-feedback ${dicomPathFeedback.startsWith("✓")?"success":dicomPathFeedback.startsWith("Not")?"try":""}`}>{dicomPathFeedback||"Start by proving the basic network path."}</div><div className="m6-path-options">{[["aetitle","AE Titles"],["store","DICOM Store Test"],["network","Network Reachability"],["ipport","Destination IP / Port"]].map(([id,label])=><button key={id} disabled={dicomPath.includes(id)} onClick={()=>{const seq=["network","ipport","aetitle","store"];if(id===seq[dicomPath.length]){const next=[...dicomPath,id];setDicomPath(next);setDicomPathFeedback(next.length===4?"✓ DICOM troubleshooting path complete.":"✓ Correct — keep moving up the stack.");playCbetTone("correct")}else{setDicomPathFeedback("Not quite — prove the lower-level dependency first.");playCbetTone("wrong")}}}>{label}</button>)}</div></section>

    <section className="m6-lab-section"><span className="m6-section-label">🚨 Troubleshooting Call #1 · Ping Works, DICOM Fails</span><h2>The CT can ping PACS, but DICOM verification fails.</h2><p>Use the application-layer evidence. Do not keep troubleshooting the cable after IP connectivity is already proven.</p>
      <div className="m6-console"><div className="m6-console-bar"><span></span><span></span><span></span><strong>DICOM Connectivity Test</strong></div><div className="m6-console-body"><div>&gt; <button disabled={dicomStep} onClick={()=>setDicomStep(1)}>run DICOM verification</button></div>{dicomStep>0&&<pre>{`Network Test:
  ping 10.24.60.20 ........ PASS

Configured Destination:
  Remote IP ............... 10.24.60.20
  Remote Port ............. 104
  Called AE Title ......... PACS_MAIN
  Calling AE Title ........ CT_ER_01

Association Result:
  TCP Connection .......... OPEN
  DICOM Association ....... REJECTED
  Reason .................. Calling AE Title not recognized

PACS Approved Modality AE:
  CT_ER1`}</pre>}</div></div>
      {dicomStep>0&&<div className="m6-diagnose"><h3>What is wrong?</h3>{["The Ethernet cable is disconnected","The calling AE Title configured on the modality does not match the AE Title approved on PACS","The PACS IP is unreachable","The device has an APIPA address"].map((x,i)=><button key={x} disabled={dicomDiagnosis===1} className={dicomDiagnosis!==null?(i===1?"correct":dicomDiagnosis===i?"wrong":""):""} onClick={()=>{setDicomDiagnosis(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {dicomDiagnosis===1&&<div className="m6-fix-stage"><h3>What should be corrected?</h3>{["Change the default gateway randomly","Coordinate the approved DICOM configuration and make the modality/PACS AE Title entries agree exactly","Replace the network switch","Disable DNS"].map((x,i)=><button key={x} disabled={dicomFix===1} className={dicomFix!==null?(i===1?"correct":dicomFix===i?"wrong":""):""} onClick={()=>{setDicomFix(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {dicomFix===1&&!dicomVerified&&<div className="m6-port-action"><div><span>DICOM CONFIGURATION</span><strong>Calling AE Title → CT_ER1</strong><small>Destination IP / Port remain unchanged</small></div><button className="cbet-primary" onClick={()=>setDicomVerified(true)}>Verify Association</button></div>}
      {dicomVerified&&<div className="m6-verify"><span>✓ DICOM ASSOCIATION VERIFIED</span><pre>{`TCP Connection .......... OPEN
DICOM Association ....... ACCEPTED
C-ECHO .................. SUCCESS
Remote AE ................ PACS_MAIN
Calling AE ............... CT_ER1`}</pre><strong>Basic IP connectivity was never the fault. The DICOM identity was.</strong></div>}
    </section>

    <section className="m6-lab-section"><span className="m6-section-label">🚨 Troubleshooting Call #2 · Association Works, Images Still Do Not Arrive</span><h2>C-ECHO passes, but completed studies remain in the modality's send queue.</h2><p>Now inspect the store operation and destination service.</p>
      <div className="m6-console"><div className="m6-console-bar"><span></span><span></span><span></span><strong>DICOM Store Log</strong></div><div className="m6-console-body"><div>&gt; <button disabled={storeStep} onClick={()=>setStoreStep(1)}>view send queue log</button></div>{storeStep>0&&<pre>{`Association to PACS_MAIN ........ ACCEPTED
C-ECHO .......................... SUCCESS

C-STORE Study 784221:
  Destination IP ................. 10.24.60.20
  Configured Port ................ 11112
  PACS Storage SCP Port .......... 104
  Result ......................... CONNECTION REFUSED

Queue Status:
  23 studies pending`}</pre>}</div></div>
      {storeStep>0&&<div className="m6-diagnose"><h3>What is the strongest finding?</h3>{["The modality cannot resolve DNS","The configured DICOM storage port does not match the PACS storage service port","The AE Title is definitely wrong","The switch must be half duplex"].map((x,i)=><button key={x} disabled={storeDiagnosis===1} className={storeDiagnosis!==null?(i===1?"correct":storeDiagnosis===i?"wrong":""):""} onClick={()=>{setStoreDiagnosis(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {storeDiagnosis===1&&<div className="m6-fix-stage"><h3>What should happen next?</h3>{["Change the PACS IP to any server that answers ping","Correct the approved DICOM destination port to match the PACS storage service, then resend a test study and verify receipt","Reboot every switch","Change the modality MAC address"].map((x,i)=><button key={x} disabled={storeFix===1} className={storeFix!==null?(i===1?"correct":storeFix===i?"wrong":""):""} onClick={()=>{setStoreFix(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {storeFix===1&&!storeVerified&&<div className="m6-port-action"><div><span>STORAGE DESTINATION</span><strong>PACS_MAIN · 10.24.60.20 · Port 104</strong><small>Send one controlled test study before releasing the queue</small></div><button className="cbet-primary" onClick={()=>setStoreVerified(true)}>Send Test Study</button></div>}
      {storeVerified&&<div className="m6-verify"><span>✓ DICOM STORE VERIFIED</span><pre>{`C-STORE Test Study ........ SUCCESS
PACS Receipt ............... CONFIRMED
Study Visible in Archive ... YES

Queued studies released:
23 → sending`}</pre><strong>The storage path is verified before releasing the backlog.</strong></div>}
    </section>

    <section className="m6-l5takeaways"><article><strong>Ping ≠ DICOM</strong><span>Ping proves IP reachability, not that DICOM configuration is correct.</span></article><article><strong>AE Titles Matter</strong><span>DICOM systems identify application entities by configured AE Titles.</span></article><article><strong>Ports Matter</strong><span>A valid IP with the wrong service port can still fail at the application layer.</span></article><article><strong>Verify With a Test Study</strong><span>Confirm association and actual image receipt before declaring the repair complete.</span></article></section>

    <section className={`m6-completion ${lesson5Ready||lesson5Completed?"ready":""}`}><div><span>{lesson5Ready||lesson5Completed?"🏅":"🩻"}</span><div><strong>{lesson5Completed?"DICOM & PACS Complete":lesson5Ready?"Lesson Ready to Complete":"Complete both DICOM troubleshooting calls"}</strong><small>90 XP · DICOM path, AE Titles, ports, C-ECHO, C-STORE & verification</small></div></div><button className="cbet-primary" disabled={!lesson5Ready&&!lesson5Completed} onClick={()=>{const prior=Array.isArray(saved.completedLessons)?saved.completedLessons:[];const next=Array.from(new Set([...prior,0,1,2,3,4]));if(!lesson5Completed)awardCbetXp(90,"mission6-dicom-pacs");saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:4,completedLessons:next,m6L1Explored:explored})}}>{lesson5Completed?"Lesson Completed ✓":"Complete Lesson 5"}</button></section>
    <nav className="m6-bottom-nav"><button className="cbet-secondary" onClick={()=>setLessonIndex(3)}>← Previous: Wi-Fi in Healthcare</button><button className="cbet-secondary" onClick={()=>{setDicomExplore([]);setDicomPath([]);setDicomPathFeedback("");setDicomStep(0);setDicomDiagnosis(null);setDicomFix(null);setDicomVerified(false);setStoreStep(0);setStoreDiagnosis(null);setStoreFix(null);setStoreVerified(false)}}>Restart Lesson</button><button className="cbet-primary" disabled={!lesson5Ready&&!lesson5Completed&&!localUnlock} onClick={()=>setLessonIndex(5)}>Next: HL7 & Interface Basics →</button></nav>
  </section>;

  if(lessonIndex===3) return <section className="cbet-shell m6-shell m6-lesson-stage m6-l4">
    <div className="m6-top-nav"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 6 · Lesson 4 of 8</span><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>Mission Overview</button></div><div className="m6-progress"><span style={{width:"50%"}}/></div>{lessonGuide}

    <section className="m6-wifi-hero"><div><span className="m6-kicker">Wi-Fi in Healthcare</span><h1>Wireless failures move with the environment.</h1><p>A device can work perfectly at the bench and fail in patient-care areas because wireless performance depends on coverage, roaming, interference, authentication, and configuration.</p><div className="m6-wifi-concepts">{[["ap","Access Point"],["rssi","Signal Strength"],["roam","Roaming"],["auth","Authentication"]].map(([id,label])=><button key={id} className={wifiExplore.includes(id)?"done":""} onClick={()=>setWifiExplore(v=>v.includes(id)?v:[...v,id])}>{wifiExplore.includes(id)?"✓":"●"} {label}</button>)}</div></div>
    <div className="m6-wifi-map"><div className="wifi-ap a"><span>AP-1</span><i></i></div><div className="wifi-ap b"><span>AP-2</span><i></i></div><div className="wifi-ap c"><span>AP-3</span><i></i></div><div className="wifi-device">MEDICAL<br/>DEVICE</div><div className="wifi-zone weak">WEAK COVERAGE</div></div></section>

    <section className="m6-vlan-check"><span className="m6-section-label">Wireless Reasoning</span><h2>A device disconnects only when transported down one hallway. What does that pattern suggest first?</h2><div>{["The application server is always offline","Investigate wireless coverage, roaming, and local RF conditions in that area","Replace the battery immediately"].map((x,i)=><button key={x} disabled={wifiScenario===1} className={wifiScenario!==null?(i===1?"correct":wifiScenario===i?"wrong":""):""} onClick={()=>{setWifiScenario(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div></section>

    <section className="m6-lab-section"><span className="m6-section-label">🚨 Troubleshooting Call #1 · Intermittent Roaming</span><h2>A wireless monitor works in Room 210 but disconnects while moving toward Room 218.</h2><p>Inspect the wireless evidence while the device is in the problem area.</p>
      <div className="m6-console"><div className="m6-console-bar"><span></span><span></span><span></span><strong>Wireless Diagnostics</strong></div><div className="m6-console-body"><div>&gt; <button disabled={wifiStep} onClick={()=>setWifiStep(1)}>show wireless status</button></div>{wifiStep>0&&<pre>{`SSID: Hospital-Medical
BSSID: AP-2
Band: 5 GHz
Channel: 44
RSSI: -82 dBm
Signal Quality: Poor
Retries: 38%
Roam Attempts: 7
Last Roam: Failed
Neighbor AP-3 RSSI: -63 dBm`}</pre>}</div></div>
      {wifiStep>0&&<div className="m6-diagnose"><h3>What is the strongest clue?</h3>{["The DNS server must be wrong","The device remains associated to a very weak AP even though a stronger neighboring AP is available","The IP address is duplicated","The Ethernet cable is crossed"].map((x,i)=><button key={x} disabled={wifiDiagnosis===1} className={wifiDiagnosis!==null?(i===1?"correct":wifiDiagnosis===i?"wrong":""):""} onClick={()=>{setWifiDiagnosis(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {wifiDiagnosis===1&&<div className="m6-fix-stage"><h3>What should be investigated next?</h3>{["Replace the monitor display","Review device roaming settings, WLAN design/coverage, AP configuration, and client compatibility with the wireless/network team","Set a random static IP","Change NIBP cuff size"].map((x,i)=><button key={x} disabled={wifiFix===1} className={wifiFix!==null?(i===1?"correct":wifiFix===i?"wrong":""):""} onClick={()=>{setWifiFix(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {wifiFix===1&&!wifiVerified&&<div className="m6-port-action"><div><span>POST-CHANGE TEST</span><strong>Roaming threshold / WLAN coverage reviewed</strong><small>Retest while moving through the original failure area</small></div><button className="cbet-primary" onClick={()=>setWifiVerified(true)}>Run Roaming Test</button></div>}
      {wifiVerified&&<div className="m6-verify"><span>✓ ROAMING VERIFIED</span><pre>{`Room 210: AP-1  RSSI -55 dBm
Hallway:  Roam AP-1 → AP-3  PASS
Room 218: AP-3  RSSI -61 dBm
Packet loss during roam: 0%
Application session: maintained`}</pre><strong>The repair was tested in the location and movement pattern that originally failed.</strong></div>}
    </section>

    <section className="m6-lab-section"><span className="m6-section-label">🚨 Troubleshooting Call #2 · Authentication</span><h2>A newly replaced wireless device sees the correct SSID but will not join it.</h2><p>The network is visible. Determine whether the failure occurs before or after IP addressing.</p>
      <div className="m6-console"><div className="m6-console-bar"><span></span><span></span><span></span><strong>Wireless Authentication Log</strong></div><div className="m6-console-body"><div>&gt; <button disabled={authStep} onClick={()=>setAuthStep(1)}>show wlan connection log</button></div>{authStep>0&&<pre>{`SSID: Hospital-Medical
Association: Successful
802.1X Authentication: Failed
EAP Method: EAP-TLS
Client Certificate: Expired
DHCP Request: Not attempted
IPv4 Address: Not assigned`}</pre>}</div></div>
      {authStep>0&&<div className="m6-diagnose"><h3>Where is the failure occurring?</h3>{["DHCP is the first failure","Wireless authentication fails before the device reaches DHCP","The server IP is duplicated","The switch port speed is 10 half"].map((x,i)=><button key={x} disabled={authDiagnosis===1} className={authDiagnosis!==null?(i===1?"correct":authDiagnosis===i?"wrong":""):""} onClick={()=>{setAuthDiagnosis(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {authDiagnosis===1&&<div className="m6-fix-stage"><h3>What is the appropriate corrective path?</h3>{["Manually assign an IP to bypass authentication","Renew or install the approved client certificate/profile through the authorized wireless/security process, then reconnect and verify","Disable wireless security","Change the DNS server"].map((x,i)=><button key={x} disabled={authFix===1} className={authFix!==null?(i===1?"correct":authFix===i?"wrong":""):""} onClick={()=>{setAuthFix(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {authFix===1&&!authVerified&&<div className="m6-port-action"><div><span>WIRELESS PROFILE</span><strong>Approved certificate/profile updated</strong><small>Reconnect and verify authentication + DHCP</small></div><button className="cbet-primary" onClick={()=>setAuthVerified(true)}>Verify Connection</button></div>}
      {authVerified&&<div className="m6-verify"><span>✓ WIRELESS CONNECTION VERIFIED</span><pre>{`Association: Successful
802.1X Authentication: Successful
DHCP: Successful
IPv4 Address: 10.24.32.71
Default Gateway: 10.24.32.1
Clinical Server: Reachable`}</pre></div>}
    </section>

    <section className="m6-l4takeaways"><article><strong>RSSI Matters</strong><span>A green Wi-Fi icon does not guarantee adequate signal quality.</span></article><article><strong>Roaming Is a Workflow</strong><span>Mobile medical devices must maintain connectivity while moving between access points.</span></article><article><strong>Authentication Happens Before DHCP</strong><span>If 802.1X fails, the device may never reach the stage where it requests an IP.</span></article><article><strong>Test Where It Fails</strong><span>Bench testing alone can miss location-specific RF and roaming problems.</span></article></section>

    <section className={`m6-completion ${lesson4Ready||lesson4Completed?"ready":""}`}><div><span>{lesson4Ready||lesson4Completed?"🏅":"📶"}</span><div><strong>{lesson4Completed?"Wi-Fi in Healthcare Complete":lesson4Ready?"Lesson Ready to Complete":"Complete both wireless troubleshooting calls"}</strong><small>85 XP · coverage, roaming, authentication, verification</small></div></div><button className="cbet-primary" disabled={!lesson4Ready&&!lesson4Completed} onClick={()=>{const prior=Array.isArray(saved.completedLessons)?saved.completedLessons:[];const next=Array.from(new Set([...prior,0,1,2,3]));if(!lesson4Completed)awardCbetXp(85,"mission6-wifi-healthcare");saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:3,completedLessons:next,m6L1Explored:explored})}}>{lesson4Completed?"Lesson Completed ✓":"Complete Lesson 4"}</button></section>
    <nav className="m6-bottom-nav"><button className="cbet-secondary" onClick={()=>setLessonIndex(2)}>← Previous: Switches, VLANs & Ports</button><button className="cbet-secondary" onClick={()=>{setWifiExplore([]);setWifiScenario(null);setWifiStep(0);setWifiDiagnosis(null);setWifiFix(null);setWifiVerified(false);setAuthStep(0);setAuthDiagnosis(null);setAuthFix(null);setAuthVerified(false)}}>Restart Lesson</button><button className="cbet-primary" disabled={!lesson4Ready&&!lesson4Completed&&!localUnlock} onClick={()=>setLessonIndex(4)}>Next: DICOM & PACS →</button></nav>
  </section>;

  if(lessonIndex===2) return <section className="cbet-shell m6-shell m6-lesson-stage m6-l3">
    <div className="m6-top-nav"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 6 · Lesson 3 of 8</span><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>Mission Overview</button></div><div className="m6-progress"><span style={{width:"37.5%"}}/></div>{lessonGuide}

    <section className="m6-l3hero"><div><span className="m6-kicker">Switches, VLANs & Ports</span><h1>A link light only proves a link.</h1><p>A medical device can be physically connected and still be on the wrong VLAN, negotiating poorly, or attached to a misconfigured switch port. Learn to separate those problems.</p></div>
    <div className="m6-switch-graphic"><div className="m6-switch-box"><strong>ACCESS SWITCH</strong><div>{[1,2,3,4,5,6,7,8].map(n=><button key={n} className={n===4?"hot":""} onClick={()=>setSwitchExplore(v=>v.includes(n%4)?v:[...v,n%4])}><span>{n}</span><i></i></button>)}</div><small>Click ports to inspect the switch</small></div></div></section>

    <section className="m6-l3-basics"><article onClick={()=>setSwitchExplore(v=>v.includes(0)?v:[...v,0])}><span>01</span><h3>Switch</h3><p>Forwards Ethernet frames between devices on the local network.</p></article><article onClick={()=>setSwitchExplore(v=>v.includes(1)?v:[...v,1])}><span>02</span><h3>Switch Port</h3><p>The physical/logical interface where the endpoint connects.</p></article><article onClick={()=>setSwitchExplore(v=>v.includes(2)?v:[...v,2])}><span>03</span><h3>VLAN</h3><p>Logically separates network traffic even when devices use the same physical switching infrastructure.</p></article><article onClick={()=>setSwitchExplore(v=>v.includes(3)?v:[...v,3])}><span>04</span><h3>Speed & Duplex</h3><p>Link settings must be compatible. A poor negotiation or forced mismatch can severely degrade communication.</p></article></section>

    <section className="m6-vlan-check"><span className="m6-section-label">Quick Network Reasoning</span><h2>Two devices are plugged into the same switch. Must they be on the same network?</h2><div>{["Yes — the same switch always means the same network","No — switch ports can be assigned to different VLANs","Yes — unless they use different cable colors"].map((x,i)=><button key={x} disabled={vlanAnswer===1} className={vlanAnswer!==null?(i===1?"correct":vlanAnswer===i?"wrong":""):""} onClick={()=>{setVlanAnswer(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>{vlanAnswer===1&&<p className="m6-inline-success">✓ Correct. Physical proximity does not prove logical network membership.</p>}</section>

    <section className="m6-lab-section"><span className="m6-section-label">🚨 Troubleshooting Call #1 · Speed / Duplex</span><h2>The device is online, but transfers are extremely slow and communication is intermittent.</h2><p>The cable has already been verified. Compare both ends of the Ethernet link.</p>
      <div className="m6-port-compare"><div><span>MEDICAL DEVICE NIC</span><strong>Speed: 1.0 Gbps</strong><strong>Duplex: Full</strong><small>Link detected</small></div><b>↔</b><div><span>SWITCH PORT Gi1/0/4</span><strong>Speed: 10 Mbps</strong><strong>Duplex: Half</strong><small>Link detected</small></div></div>
      <div className="m6-console"><div className="m6-console-bar"><span></span><span></span><span></span><strong>Switch Port Status</strong></div><div className="m6-console-body"><div>&gt; <button disabled={portStep} onClick={()=>setPortStep(1)}>show interface Gi1/0/4</button></div>{portStep>0&&<pre>{`GigabitEthernet1/0/4 is up, line protocol is up
  Description: Medical Device
  MTU 1500 bytes
  Full-duplex capability: supported
  Configured speed: 10 Mb/s
  Configured duplex: half
  Input errors: 1842
  CRC errors: 611
  Late collisions: 327`}</pre>}</div></div>
      {portStep>0&&<div className="m6-diagnose"><h3>What is the strongest finding?</h3>{["The device needs a new IP address","The endpoint and switch-port speed/duplex settings are incompatible","DNS is causing collisions","The server hostname is wrong"].map((x,i)=><button key={x} disabled={portDiagnosis===1} className={portDiagnosis!==null?(i===1?"correct":portDiagnosis===i?"wrong":""):""} onClick={()=>{setPortDiagnosis(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {portDiagnosis===1&&<div className="m6-fix-stage"><h3>What is the best corrective approach?</h3>{["Force both ends to different settings","Coordinate with network engineering and configure compatible approved settings—normally matching auto-negotiation or matching forced settings on both ends","Change the DNS server","Assign a 169.254 address"].map((x,i)=><button key={x} disabled={portFix===1} className={portFix!==null?(i===1?"correct":portFix===i?"wrong":""):""} onClick={()=>{setPortFix(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {portFix===1&&!portVerified&&<div className="m6-port-action"><div><span>UPDATED LINK</span><strong>Device: Auto · Switch: Auto</strong><small>Negotiated: 1.0 Gbps / Full Duplex</small></div><button className="cbet-primary" onClick={()=>setPortVerified(true)}>Verify Port</button></div>}
      {portVerified&&<div className="m6-verify"><span>✓ LINK VERIFIED</span><pre>{`GigabitEthernet1/0/4 is up, line protocol is up
  1000 Mb/s, full duplex
  New CRC errors: 0
  New late collisions: 0

Connectivity test: PASS
Application communication: PASS`}</pre><strong>The repair is supported by the negotiated link and clean post-change counters.</strong></div>}
    </section>

    <section className="m6-lab-section"><span className="m6-section-label">🚨 Troubleshooting Call #2 · Wrong VLAN</span><h2>A replacement medical device has a link light but cannot obtain the expected network configuration.</h2><p>A known-good device works from another wall jack. Inspect this switch port before changing the medical device.</p>
      <div className="m6-console"><div className="m6-console-bar"><span></span><span></span><span></span><strong>Switch Port Configuration</strong></div><div className="m6-console-body"><div>&gt; <button disabled={wrongVlanStep} onClick={()=>setWrongVlanStep(1)}>show interface Gi1/0/18 switchport</button></div>{wrongVlanStep>0&&<pre>{`Name: Gi1/0/18
Switchport: Enabled
Administrative Mode: static access
Operational Mode: static access
Access Mode VLAN: 120 (Guest)
Voice VLAN: none

Approved Medical Device VLAN: 240`}</pre>}</div></div>
      {wrongVlanStep>0&&<div className="m6-diagnose"><h3>What should you investigate?</h3>{["The monitor screen brightness","The switch port is assigned to the wrong VLAN","The device needs a different MAC address","The DNS hostname is too long"].map((x,i)=><button key={x} disabled={wrongVlanDiagnosis===1} className={wrongVlanDiagnosis!==null?(i===1?"correct":wrongVlanDiagnosis===i?"wrong":""):""} onClick={()=>{setWrongVlanDiagnosis(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {wrongVlanDiagnosis===1&&<div className="m6-fix-stage"><h3>What should happen next?</h3>{["Change the medical device to match the Guest VLAN","Have the switch port moved to the approved Medical Device VLAN according to the network change process, then renew and retest","Disable DHCP","Replace the Ethernet cable even though the link is good"].map((x,i)=><button key={x} disabled={wrongVlanFix===1} className={wrongVlanFix!==null?(i===1?"correct":wrongVlanFix===i?"wrong":""):""} onClick={()=>{setWrongVlanFix(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
      {wrongVlanFix===1&&!wrongVlanVerified&&<div className="m6-port-action"><div><span>PORT CHANGE</span><strong>Gi1/0/18 → VLAN 240</strong><small>Approved Medical Device VLAN</small></div><button className="cbet-primary" onClick={()=>setWrongVlanVerified(true)}>Renew & Verify</button></div>}
      {wrongVlanVerified&&<div className="m6-verify"><span>✓ VLAN PATH VERIFIED</span><pre>{`Access Mode VLAN: 240 (Medical-Devices)

C:\\> ipconfig /renew
IPv4 Address. . . . . . . . . . . : 10.24.16.88
Default Gateway . . . . . . . . . : 10.24.16.1

C:\\> ping 10.24.16.1
Reply from 10.24.16.1: bytes=32 time<1ms`}</pre><strong>The endpoint now receives the expected configuration on the approved network.</strong></div>}
    </section>

    <section className="m6-l3takeaways"><article><strong>Link Up ≠ Healthy Link</strong><span>Speed, duplex, errors, and collisions can reveal problems hidden behind a green link light.</span></article><article><strong>Same Switch ≠ Same VLAN</strong><span>Port configuration determines logical network membership.</span></article><article><strong>Change Carefully</strong><span>Coordinate switch/VLAN changes with the hospital's network process instead of improvising endpoint settings.</span></article></section>

    <section className={`m6-completion ${lesson3Ready||lesson3Completed?"ready":""}`}><div><span>{lesson3Ready||lesson3Completed?"🏅":"🔀"}</span><div><strong>{lesson3Completed?"Switches, VLANs & Ports Complete":lesson3Ready?"Lesson Ready to Complete":"Complete both port troubleshooting calls"}</strong><small>85 XP · switching, VLANs, speed/duplex, port evidence & verification</small></div></div><button className="cbet-primary" disabled={!lesson3Ready&&!lesson3Completed} onClick={()=>{const prior=Array.isArray(saved.completedLessons)?saved.completedLessons:[];const next=Array.from(new Set([...prior,0,1,2]));if(!lesson3Completed)awardCbetXp(85,"mission6-switches-vlans-ports");saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:2,completedLessons:next,m6L1Explored:explored})}}>{lesson3Completed?"Lesson Completed ✓":"Complete Lesson 3"}</button></section>
    <nav className="m6-bottom-nav"><button className="cbet-secondary" onClick={()=>setLessonIndex(1)}>← Previous: DHCP & DNS</button><button className="cbet-secondary" onClick={()=>{setSwitchExplore([]);setVlanAnswer(null);setPortStep(0);setPortDiagnosis(null);setPortFix(null);setPortVerified(false);setWrongVlanStep(0);setWrongVlanDiagnosis(null);setWrongVlanFix(null);setWrongVlanVerified(false)}}>Restart Lesson</button><button className="cbet-primary" disabled={!lesson3Ready&&!lesson3Completed&&!localUnlock} onClick={()=>setLessonIndex(3)}>Next: Wi-Fi in Healthcare →</button></nav>
  </section>;

  if(lessonIndex===1) return <section className="cbet-shell m6-shell m6-lesson-stage m6-l2">
    <div className="m6-top-nav"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 6 · Lesson 2 of 8</span><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>Mission Overview</button></div><div className="m6-progress"><span style={{width:"25%"}}/></div>{lessonGuide}
    <section className="m6-l2hero"><div><span className="m6-kicker">DHCP & DNS</span><h1>Connected does not mean communicating.</h1><p>Use the evidence to decide whether the failure is addressing or name resolution. You diagnose it before the lesson explains it.</p></div><div className="m6-l2flow"><span>Medical Device</span><b>→</b><span>DHCP</span><b>→</b><span>Network</span><b>→</b><span>DNS</span><b>→</b><span>Clinical Server</span></div></section>

    <section className="m6-lab-section"><span className="m6-section-label">🚨 Troubleshooting Call #1</span><h2>Link light is on, but the device cannot reach the hospital network.</h2><p>Inspect the configuration. Do not assume the cable is bad.</p>
    <div className="m6-console"><div className="m6-console-bar"><span></span><span></span><span></span><strong>Command Prompt</strong></div><div className="m6-console-body"><div>C:\&gt; <button disabled={dhcpStep} onClick={()=>setDhcpStep(1)}>ipconfig /all</button></div>{dhcpStep>0&&<pre>{`Ethernet adapter Ethernet:

   Physical Address. . . . . . . . . : 00-25-96-FF-12-08
   DHCP Enabled. . . . . . . . . . . : Yes
   IPv4 Address. . . . . . . . . . . : 169.254.44.18
   Subnet Mask . . . . . . . . . . . : 255.255.0.0
   Default Gateway . . . . . . . . . :
   DHCP Server . . . . . . . . . . . :
   DNS Servers . . . . . . . . . . . :`}</pre>}</div></div>
    {dhcpStep>0&&<div className="m6-diagnose"><h3>What does this most strongly suggest?</h3>{["The server is definitely offline","The device did not obtain its expected DHCP configuration","DNS is definitely working","The cable must be disconnected"].map((x,i)=><button key={x} disabled={dhcpDiagnosis===1} className={dhcpDiagnosis!==null?(i===1?"correct":dhcpDiagnosis===i?"wrong":""):""} onClick={()=>{setDhcpDiagnosis(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
    {dhcpDiagnosis===1&&<div className="m6-fix-stage"><h3>What should you do next?</h3>{["Randomly assign a static IP","Verify the approved network/VLAN and DHCP path, confirm the MAC/reservation if required, then renew the lease","Change the hostname","Replace the NIC"].map((x,i)=><button key={x} disabled={dhcpFix===1} className={dhcpFix!==null?(i===1?"correct":dhcpFix===i?"wrong":""):""} onClick={()=>{setDhcpFix(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
    {dhcpFix===1&&<div className="m6-verify"><span>✓ DHCP CONFIGURATION RESTORED</span><pre>{`C:\\> ipconfig /renew
IPv4 Address. . . . . . . . . . . : 10.24.16.57
Subnet Mask . . . . . . . . . . . : 255.255.255.0
Default Gateway . . . . . . . . . : 10.24.16.1
DHCP Server . . . . . . . . . . . : 10.24.16.10
DNS Servers . . . . . . . . . . . : 10.24.1.20`}</pre></div>}</section>

    <section className="m6-lab-section"><span className="m6-section-label">🚨 Troubleshooting Call #2</span><h2>The application cannot connect to the server by hostname.</h2><p>Test the destination by IP first, then by name.</p>
    <div className="m6-console"><div className="m6-console-bar"><span></span><span></span><span></span><strong>Command Prompt</strong></div><div className="m6-console-body"><div>C:\&gt; <button disabled={dnsStep>=1} onClick={()=>setDnsStep(1)}>ping 10.24.40.25</button></div>{dnsStep>=1&&<><pre>{`Reply from 10.24.40.25: bytes=32 time=2ms
Reply from 10.24.40.25: bytes=32 time=1ms`}</pre><div>C:\&gt; <button disabled={dnsStep>=2} onClick={()=>setDnsStep(2)}>ping monitoring01.hospital.local</button></div></>}{dnsStep>=2&&<><pre>{`Ping request could not find host monitoring01.hospital.local.`}</pre><div>C:\&gt; <button disabled={dnsStep>=3} onClick={()=>setDnsStep(3)}>nslookup monitoring01.hospital.local</button></div></>}{dnsStep>=3&&<pre>{`Server:  UnKnown
Address:  10.24.99.99
*** UnKnown can't find monitoring01.hospital.local: Non-existent domain`}</pre>}</div></div>
    {dnsStep>=3&&<div className="m6-diagnose"><h3>What have you isolated?</h3>{["Bad network cable","IP connectivity works, but name resolution is failing","Server IP is unreachable","Duplicate IP"].map((x,i)=><button key={x} disabled={dnsDiagnosis===1} className={dnsDiagnosis!==null?(i===1?"correct":dnsDiagnosis===i?"wrong":""):""} onClick={()=>{setDnsDiagnosis(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
    {dnsDiagnosis===1&&<div className="m6-fix-stage"><h3>Approved DNS is 10.24.1.20. What should you correct?</h3>{["Change the gateway to the server IP","Correct the device/DHCP DNS configuration to the approved DNS server, then retest","Disable TCP/IP","Change the MAC"].map((x,i)=><button key={x} disabled={dnsFix===1} className={dnsFix!==null?(i===1?"correct":dnsFix===i?"wrong":""):""} onClick={()=>{setDnsFix(i);playCbetTone(i===1?"correct":"wrong")}}>{x}</button>)}</div>}
    {dnsFix===1&&!dnsVerified&&<div className="m6-dns-action"><strong>DNS Server corrected → 10.24.1.20</strong><button className="cbet-primary" onClick={()=>setDnsVerified(true)}>Verify Name Resolution</button></div>}
    {dnsVerified&&<div className="m6-verify"><span>✓ DNS VERIFIED</span><pre>{`C:\\> nslookup monitoring01.hospital.local
Server:  dns01.hospital.local
Address: 10.24.1.20
Name:    monitoring01.hospital.local
Address: 10.24.40.25

C:\\> ping monitoring01.hospital.local
Reply from 10.24.40.25: bytes=32 time=2ms`}</pre><strong>IP connectivity and name resolution both work.</strong></div>}</section>

    <section className="m6-l2takeaways"><article><strong>169.254.x.x</strong><span>Investigate why the expected DHCP configuration was not obtained.</span></article><article><strong>IP works · hostname fails</strong><span>That evidence points you toward DNS/name resolution.</span></article><article><strong>Do not guess</strong><span>Test, isolate, correct, then verify.</span></article></section>
    <section className={`m6-completion ${lesson2Ready||lesson2Completed?"ready":""}`}><div><span>{lesson2Ready||lesson2Completed?"🏅":"🧭"}</span><div><strong>{lesson2Completed?"DHCP & DNS Complete":lesson2Ready?"Lesson Ready to Complete":"Complete both troubleshooting calls"}</strong><small>75 XP · DHCP, APIPA evidence, DNS isolation, correction & verification</small></div></div><button className="cbet-primary" disabled={!lesson2Ready&&!lesson2Completed} onClick={()=>{const prior=Array.isArray(saved.completedLessons)?saved.completedLessons:[];const next=Array.from(new Set([...prior,0,1]));if(!lesson2Completed)awardCbetXp(75,"mission6-dhcp-dns");saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:1,completedLessons:next,m6L1Explored:explored})}}>{lesson2Completed?"Lesson Completed ✓":"Complete Lesson 2"}</button></section>
    <nav className="m6-bottom-nav"><button className="cbet-secondary" onClick={()=>setLessonIndex(0)}>← Previous: IP Addresses & TCP/IP</button><button className="cbet-secondary" onClick={()=>{setDhcpStep(0);setDhcpDiagnosis(null);setDhcpFix(null);setDnsStep(0);setDnsDiagnosis(null);setDnsFix(null);setDnsVerified(false)}}>Restart Lesson</button><button className="cbet-primary" disabled={!lesson2Ready&&!lesson2Completed&&!localUnlock} onClick={()=>setLessonIndex(2)}>Next: Switches, VLANs & Ports →</button></nav>
  </section>;

  return <section className="cbet-shell m6-shell m6-lesson-stage">
    <div className="m6-top-nav"><button className="cbet-back" onClick={onExit}>← Save & Exit</button><span>Mission 6 · Lesson 1 of 8</span><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>Mission Overview</button></div>
    <div className="m6-progress"><span style={{width:"12.5%"}}/></div>{lessonGuide}

    <section className="m6-hero">
      <MissionSixNetworkGraphic activeId={activeNode} onSelect={explore} packetRunning={packetRunning} faultMode={diagnosis===1?"duplicate":"normal"}/>
      <div className="m6-hero-copy"><span className="m6-kicker">IP Addresses & TCP/IP</span><h1>Every connection has a path.</h1><p>Start with the medical device and trace how traffic moves through the hospital network. Click every component to inspect its role.</p>
      <button className="m6-packet-button" onClick={()=>setPacketRunning(v=>!v)}>{packetRunning?"Ⅱ Pause Packet":"▶ Send Packet"}</button>
      <div className="m6-explorer-progress"><div><span style={{width:`${explored.length*25}%`}}/></div><strong>{explored.length} of 4 network components explored</strong></div>
      <div className="m6-node-tabs">{MISSION_SIX_NETWORK_NODES.map(x=><button key={x.id} className={activeNode===x.id?"active":""} onClick={()=>explore(x.id)}>{explored.includes(x.id)?"✓":"●"} {x.label}</button>)}</div></div>
    </section>

    <section className="m6-detail-grid"><article className="m6-detail-card"><span className="m6-section-label">Network Explorer</span><h2>{active.label}</h2><p>{active.detail}</p><div className="m6-address-chip">{active.ip}</div></article>
    <article className="m6-field-card"><span className="m6-section-label">Clinical Engineering Rule</span><h2>Prove each layer before moving on.</h2><p>Start with the device and physical connection. Then inspect addressing, local reachability, the gateway, and the destination. Do not change settings simply because communication failed.</p><div className="m6-mini-chain"><span>Device</span><b>→</b><span>Switch</span><b>→</b><span>Gateway</span><b>→</b><span>Server</span></div></article></section>

    <section className="m6-path-builder"><div className="m6-section-heading"><span className="m6-section-label">Trace the Packet</span><h2>Build the communication path</h2><p><strong>Click the cards</strong> in the order traffic travels from this medical device to a server on another subnet.</p></div>
      <div className="m6-path-result">{["device","switch","gateway","server"].map((id,i)=><div className="m6-path-wrap" key={id}><div className={`m6-path-slot ${path[i]===id?"filled":""}`}><span>{i+1}</span><strong>{path[i]?MISSION_SIX_NETWORK_NODES.find(x=>x.id===path[i]).label:"Choose a step"}</strong></div>{i<3&&<b>→</b>}</div>)}</div>
      <div className={`m6-path-feedback ${pathFeedback.startsWith("✓")?"success":pathFeedback.startsWith("Not")?"try":""}`}>{pathFeedback||"Start where the network traffic originates."}</div>
      <div className="m6-path-options">{[["gateway","Default Gateway"],["device","Medical Device"],["server","Clinical Server"],["switch","Network Switch"]].map(([id,label])=><button key={id} disabled={path.includes(id)} onClick={()=>{const seq=["device","switch","gateway","server"];if(id===seq[path.length]){const next=[...path,id];setPath(next);setPathFeedback(next.length===4?"✓ Path complete — the packet can now reach the remote server.":"✓ Correct — follow the packet to the next network component.");playCbetTone("correct")}else{setPathFeedback("Not quite — follow the packet one hop at a time.");playCbetTone("wrong")}}}>{label}</button>)}</div>
      <button className="cbet-secondary m6-reset-small" onClick={()=>{setPath([]);setPathFeedback("")}}>↻ Reset Path</button>
    </section>

    <section className="m6-service-lab"><div className="m6-service-head"><span className="m6-section-label">🚨 Troubleshooting Call</span><h2>“This device worked yesterday. Today it will not communicate.”</h2><p>You are at the device. Do not guess the fault. Use the available evidence.</p></div>
      <div className="m6-console">
        <div className="m6-console-bar"><span></span><span></span><span></span><strong>Command Prompt</strong></div>
        <div className="m6-console-body">
          <div>C:\&gt; <button onClick={()=>setConsoleStep(1)} disabled={consoleStep>=1}>ipconfig /all</button></div>
          {consoleStep>=1&&<pre>{`Ethernet adapter Ethernet:

   Description . . . . . . . . . . : Medical Device Network Adapter
   Physical Address. . . . . . . . . : 00-1A-2B-3C-4D-5E
   DHCP Enabled. . . . . . . . . . . : Yes
   IPv4 Address. . . . . . . . . . . : 10.24.16.57 (Duplicate)
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 10.24.16.1
   DHCP Server . . . . . . . . . . . : 10.24.16.10
   DNS Servers . . . . . . . . . . . : 10.24.1.20`}</pre>}
        </div>
      </div>
      {consoleStep>=1&&<div className="m6-diagnose"><span className="m6-section-label">Diagnose from the evidence</span><h3>What is wrong?</h3>{["The subnet mask is incorrect","The IPv4 address is duplicated","The DNS server is missing","The default gateway is incorrect"].map((o,i)=><button key={o} disabled={diagnosis===1} className={diagnosis!==null?(i===1?"correct":diagnosis===i?"wrong":""):""} onClick={()=>{setDiagnosis(i);playCbetTone(i===1?"correct":"wrong")}}>{o}</button>)}</div>}
      {diagnosis===1&&<div className="m6-fix-stage"><span className="m6-section-label">Correct the fault</span><h3>What is the strongest next action in a DHCP-managed hospital network?</h3><p>Use the information you already gathered. Do not randomly assign an address.</p>{["Choose any unused-looking IP and make it static","Coordinate the approved IP and create/verify a DHCP reservation for this device's MAC address, while confirming no other device is statically using that IP","Change the DNS server","Replace the network card"].map((o,i)=><button key={o} disabled={fix===1} className={fix!==null?(i===1?"correct":fix===i?"wrong":""):""} onClick={()=>{setFix(i);playCbetTone(i===1?"correct":"wrong")}}>{o}</button>)}</div>}
      {fix===1&&<div className="m6-reservation"><div><span>DHCP RESERVATION</span><strong>Medical Device</strong></div><dl><div><dt>MAC / Physical Address</dt><dd>00-1A-2B-3C-4D-5E</dd></div><div><dt>Reserved IPv4</dt><dd>10.24.16.57</dd></div><div><dt>Status</dt><dd>Active</dd></div></dl><p>The reservation maps the approved address to this device's MAC address. The conflicting static assignment must also be removed or corrected.</p><button className="cbet-primary" onClick={()=>setVerify(true)}>Renew & Verify Configuration</button></div>}
      {verify&&<div className="m6-verify"><span>✓ VERIFIED</span><pre>{`C:\\> ipconfig /all
IPv4 Address. . . . . . . . . . . : 10.24.16.57
Default Gateway . . . . . . . . . : 10.24.16.1

C:\\> ping 10.24.16.1
Reply from 10.24.16.1: bytes=32 time<1ms

C:\\> ping 10.24.40.25
Reply from 10.24.40.25: bytes=32 time=2ms`}</pre><strong>Communication restored. The repair was verified instead of assumed.</strong></div>}
    </section>

    <section className="m6-toolbox"><span className="m6-section-label">What ipconfig /all gave you</span><h2>One command. Multiple troubleshooting clues.</h2><div><article><strong>IPv4 Address</strong><span>Where the device is addressed on the network.</span></article><article><strong>Physical Address</strong><span>The MAC address used to identify the network interface.</span></article><article><strong>DHCP Status</strong><span>Shows whether addressing is being assigned dynamically.</span></article><article><strong>Gateway & DNS</strong><span>Critical configuration for routed traffic and name resolution.</span></article></div></section>

    <section className={`m6-completion ${ready||completed?"ready":""}`}><div><span>{ready||completed?"🏅":"🌐"}</span><div><strong>{completed?"IP Addresses & TCP/IP Complete":ready?"Lesson Ready to Complete":"Complete the network lab and troubleshooting call"}</strong><small>75 XP · Network path, addressing, diagnosis, correction, verification</small></div></div><button className="cbet-primary" disabled={!ready&&!completed} onClick={()=>{const next=Array.from(new Set([...(Array.isArray(saved.completedLessons)?saved.completedLessons:[]),0]));if(!completed)awardCbetXp(75,"mission6-ip-tcpip");saveMissionProgress(moduleNumber,{phase:"lessons",lessonIndex:0,completedLessons:next,m6L1Explored:explored});}}>{completed?"Lesson Completed ✓":"Complete Lesson 1"}</button></section>
    <nav className="m6-bottom-nav"><button className="cbet-secondary" onClick={()=>setPhase("briefing")}>← Mission Overview</button><button className="cbet-secondary" onClick={reset}>Restart Lesson</button><button className="cbet-primary" disabled={!ready&&!completed&&!localUnlock} onClick={()=>setLessonIndex(1)}>Next: DHCP & DNS →</button></nav>
  </section>;
}


export default function CBETAcademy() {
  const [developerUnlockAll, setDeveloperUnlockAll] = useState(() => {
    if (!isLocalAcademyHost()) return false;
    const saved = window.localStorage.getItem("cbet-local-developer-unlock-all");
    return saved === null ? true : saved === "true";
  });
  const toggleDeveloperUnlockAll = () => {
    setDeveloperUnlockAll((current) => {
      const next = !current;
      if (isLocalAcademyHost()) window.localStorage.setItem("cbet-local-developer-unlock-all", String(next));
      return next;
    });
  };
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
  const [showAllMissions, setShowAllMissions] = useState(false);
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
    const completed = Boolean(getCbetModuleState(number).complete);
    const localUnlocked = developerUnlockAll && isLocalAcademyHost();
    const unlocked = completed || localUnlocked || isCbetModuleUnlocked(number);

    // Enforce the same sequential progression rule in navigation that the
    // dashboard communicates visually. Completed missions remain reviewable,
    // and Local Developer Mode can still bypass prerequisites for testing.
    if (!unlocked) return;

    if (review && completed) {
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

  if (screen === "mission4") {
    return (
      <main className="cbet-academy">
        {reviewMissionNumber === 4 && (
          <div className="cbet-review-banner" role="status">
            <strong>Review Mode</strong>
            <span>Your completion, XP, competency, and achievement are safely preserved.</span>
          </div>
        )}
        <MissionFour onExit={leaveMission} />
      </main>
    );
  }


  if (screen === "mission5") {
    return (
      <main className="cbet-academy m5-academy">
        <LocalDeveloperPanel unlockAll={developerUnlockAll} onToggle={toggleDeveloperUnlockAll} />
        {reviewMissionNumber === 5 && (
          <div className="cbet-review-banner" role="status">
            <strong>Review Mode</strong>
            <span>Your completion, XP, and saved anatomy explorer progress are preserved.</span>
          </div>
        )}
        <MissionFive onExit={leaveMission} developerUnlockAll={developerUnlockAll} />
      </main>
    );
  }

  if (screen === "mission6") {
    return (
      <main className="cbet-academy m6-academy">
        <LocalDeveloperPanel unlockAll={developerUnlockAll} onToggle={toggleDeveloperUnlockAll} />
        {reviewMissionNumber === 6 && (
          <div className="cbet-review-banner" role="status">
            <strong>Review Mode</strong>
            <span>Your completion, XP, and saved networking progress are preserved.</span>
          </div>
        )}
        <MissionSix onExit={leaveMission} developerUnlockAll={developerUnlockAll} />
      </main>
    );
  }

  if (screen === "mission7") {
    return (
      <main className="cbet-academy">
        <LocalDeveloperPanel unlockAll={developerUnlockAll} onToggle={toggleDeveloperUnlockAll} />
        {reviewMissionNumber === 7 && (
          <div className="cbet-review-banner" role="status">
            <strong>Review Mode</strong>
            <span>Your Mission 7 completion, XP, competency, and saved progress are preserved.</span>
          </div>
        )}
        <MissionSeven onExit={leaveMission} />
      </main>
    );
  }

  if (screen === "mission8") {
    return (
      <main className="cbet-academy m8-academy">
        <LocalDeveloperPanel unlockAll={developerUnlockAll} onToggle={toggleDeveloperUnlockAll} />
        {reviewMissionNumber === 8 && (
          <div className="cbet-review-banner" role="status">
            <strong>Review Mode</strong>
            <span>Your Mission 8 completion, XP, competency, and saved troubleshooting progress are preserved.</span>
          </div>
        )}
        <MissionEight onExit={leaveMission} />
      </main>
    );
  }

  if (screen === "mission9") {
    return (
      <main className="cbet-academy m9-academy">
        <LocalDeveloperPanel unlockAll={developerUnlockAll} onToggle={toggleDeveloperUnlockAll} />
        {reviewMissionNumber === 9 && (
          <div className="cbet-review-banner" role="status">
            <strong>Review Mode</strong>
            <span>Your Mission 9 completion, XP, competency, and saved exam-readiness progress are preserved.</span>
          </div>
        )}
        <MissionNine onExit={leaveMission} />
      </main>
    );
  }

  if (screen === "mission10") {
    return (
      <main className="cbet-academy">
        {reviewMissionNumber === 10 && (
          <div className="cbet-review-banner" role="status">
            <strong>Review Mode</strong>
            <span>Your completion, XP, competency, and certificate are safely preserved.</span>
          </div>
        )}
        <MissionTen onExit={leaveMission} />
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

  const missionStates = cbetAcademyModules.map((module) => ({
    number: module.number,
    ...getCbetModuleState(module.number),
  }));
  const totalMissionCount = missionStates.length;
  const completedMissionCount = missionStates.filter((mission) => mission.complete).length;
  const allMissionsComplete = completedMissionCount === totalMissionCount;
  const nextMissionState = missionStates.find((mission) => !mission.complete);
  const nextMissionNumber = nextMissionState?.number || cbetAcademyModules.at(-1)?.number || 1;
  const nextMission = cbetAcademyModules.find((module) => module.number === nextMissionNumber);
  const nextMissionProgress = getMissionProgress(nextMissionNumber);
  const nextMissionStarted = nextMissionProgress.phase !== "briefing";
  const nextMissionLabel = allMissionsComplete
    ? `Review Mission ${nextMissionNumber}`
    : nextMissionStarted
    ? `Continue Mission ${nextMissionNumber}`
    : `Start Mission ${nextMissionNumber}`;

  const badgeCount = Object.values(academy.modules || {}).filter((module) => module.complete).length;
  const virtualLabPercent = Math.min(100, Math.round((virtualLabLessonsCompleted / 9) * 100));
  const missionPercent = totalMissionCount
    ? Math.min(100, Math.round((completedMissionCount / totalMissionCount) * 100))
    : 0;

  return (
    <main className="cbet-academy" key={refresh}>
      <LocalDeveloperPanel unlockAll={developerUnlockAll} onToggle={toggleDeveloperUnlockAll} />
      <section id="cbet-academy-top" className="cbet-dashboard-hero cbet-dashboard-hero-v1">
        <div className="cbet-shell">
          <div className="cbet-dashboard-intro">
            <div className="cbet-dashboard-copy">
              <span className="cbet-label">MedSkillBuilder Academy</span>
              <h1>CBET Academy</h1>
              <p>
                Learn, practice, and troubleshoot your way through the CBET Academy.
              </p>
              <div className="cbet-dashboard-continue">
                <button className="cbet-primary cbet-continue-button" onClick={() => openMission(nextMissionNumber, allMissionsComplete)}>
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
                <div><strong>{completedMissionCount}/{totalMissionCount}</strong><span>Missions</span></div>
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
          <span className="cbet-label">Keep moving</span>
          <h2>Choose what to work on</h2>
        </div>

        <div className="cbet-hub-grid">
          <article className="cbet-hub-card featured">
            <div className="cbet-hub-card-top">
              <span className="cbet-hub-icon" aria-hidden="true">📘</span>
              <span className="cbet-hub-kicker">Learn</span>
            </div>
            <h3>Training Missions</h3>
            <p>Continue your guided mission path.</p>
            <div className="cbet-card-progress-row"><span>{completedMissionCount} of {totalMissionCount} complete</span><strong>{missionPercent}%</strong></div>
            <div className="cbet-card-progress"><span style={{ width: `${missionPercent}%` }} /></div>
            <button className="cbet-primary" onClick={() => openMission(nextMissionNumber, allMissionsComplete)}>{nextMissionLabel}</button>
          </article>

          <article className="cbet-hub-card">
            <div className="cbet-hub-card-top">
              <span className="cbet-hub-icon" aria-hidden="true">🧪</span>
              <span className="cbet-hub-kicker">Practice</span>
            </div>
            <h3>Virtual Lab</h3>
            <p>Practice measurements and troubleshooting.</p>
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
            <p>Learn equipment, components, and common faults.</p>
            <div className="cbet-hub-summary"><strong>8</strong><span>equipment families</span></div>
            <button className="cbet-secondary" onClick={() => setScreen("equipmentLearning")}>Explore Equipment</button>
          </article>

          <article className="cbet-hub-card">
            <div className="cbet-hub-card-top">
              <span className="cbet-hub-icon" aria-hidden="true">🏥</span>
              <span className="cbet-hub-kicker">Work</span>
            </div>
            <h3>Hospital Simulator</h3>
            <p>Troubleshoot realistic hospital service calls.</p>
            <div className="cbet-hub-summary"><strong>{stats.scenariosCompleted}</strong><span>scenarios completed</span></div>
            <button className="cbet-secondary" onClick={() => setScreen("hospital")}>Open Simulator</button>
          </article>

          <article className="cbet-hub-card">
            <div className="cbet-hub-card-top">
              <span className="cbet-hub-icon" aria-hidden="true">📊</span>
              <span className="cbet-hub-kicker">Progress</span>
            </div>
            <h3>Your Progress</h3>
            <p>See your missions, XP, scores, and streak.</p>
            <div className="cbet-hub-summary"><strong>{academy.xp.toLocaleString()}</strong><span>total XP earned</span></div>
            <button className="cbet-secondary" onClick={() => setShowStats(true)}>View Progress</button>
          </article>

          <article className="cbet-hub-card">
            <div className="cbet-hub-card-top">
              <span className="cbet-hub-icon" aria-hidden="true">📜</span>
              <span className="cbet-hub-kicker">Recognize</span>
            </div>
            <h3>Completion Certificates</h3>
            <p>View certificates for completed Academy missions.</p>
            <div className="cbet-hub-summary"><strong>{badgeCount}</strong><span>module certificates available</span></div>
            <button className="cbet-secondary" onClick={() => setScreen("certificates")}>View Certificates</button>
          </article>
        </div>

        <div className="cbet-mission-toggle-row">
          <div>
            <span className="cbet-label">Training path</span>
            <h2>CBET Mission Path</h2>
            <p>10 missions · Complete them in order</p>
          </div>
          <button
            className="cbet-secondary"
            aria-expanded={showAllMissions}
            aria-controls="cbet-training-path"
            onClick={() => setShowAllMissions((value) => !value)}
          >
            {showAllMissions ? "Hide Mission Path" : "View Mission Path"}
          </button>
        </div>

        {showAllMissions && (
          <div id="cbet-training-path" className="cbet-grid cbet-training-grid">
            {cbetAcademyModules.map((module) => {
              const state = getCbetModuleState(module.number);
              const unlocked = state.complete || (developerUnlockAll && isLocalAcademyHost()) || isCbetModuleUnlocked(module.number);
              const available = module.number <= 10;
              return (
                <article key={module.number} className={`cbet-module-card ${!unlocked ? "locked" : ""}`}>
                  <div className="cbet-card-top">
                    <span className="cbet-number">{module.number}</span>
                    <span className={`cbet-status ${state.complete ? "complete" : unlocked ? "ready" : "locked"}`}>
                      {state.complete ? "✓ Complete" : unlocked ? (available ? "Ready" : "Coming next") : "🔒 Locked"}
                    </span>
                  </div>
                  <h3>{module.title}</h3>
                  <div className="cbet-badge"><span aria-hidden="true">✓</span> {module.badge}</div>
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
