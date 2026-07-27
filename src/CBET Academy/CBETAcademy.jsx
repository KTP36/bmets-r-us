import React, { useEffect, useMemo, useState } from "react";
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
import VirtualCBETLab from "./VirtualLab/VirtualCBETLab";

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
    ["🏅", "Badges earned", stats.badges],
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

function KnowledgeCheck({ check, onComplete, resetKey }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null);
  }, [resetKey]);

  const answered = selected !== null;
  const correct = selected === check.answer;

  const questionText =
    check.question ||
    check.prompt ||
    check.questionText ||
    check.text ||
    check.title ||
    "Select the best answer.";

  return (
    <div className="cbet-check">
      <span className="cbet-label">Quick Knowledge Check</span>
      <h3 className="cbet-check-question">{questionText}</h3>
      <div className="cbet-options">
        {check.options.map((option, index) => (
          <button
            key={option}
            type="button"
            disabled={correct}
            aria-pressed={selected === index}
            className={`cbet-option ${
              correct && index === check.answer ? "correct" : ""
            } ${answered && index === selected && !correct ? "wrong" : ""}`}
            onClick={() => {
              const isCorrect = index === check.answer;
              setSelected(index);
              playCbetTone(isCorrect ? "correct" : "wrong");

              if (isCorrect) {
                onComplete(true);
              }
            }}
          >
            <strong>{String.fromCharCode(65 + index)}.</strong> {option}
          </button>
        ))}
      </div>
      {answered && (
        <div className="cbet-feedback">
          <strong>{correct ? "Correct." : "Not quite. Try again."}</strong>
          <span>
            {correct
              ? check.explanation
              : "Review the lesson and choose another answer."}
          </span>
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

function ScenarioCard({ scenario, number, onComplete }) {
  const [selected, setSelected] = useState(null);
  const answered = selected !== null;
  const correct = selected === scenario.answer;

  return (
    <article className="cbet-scenario">
      <span className="cbet-label">Troubleshooting Scenario {number}</span>
      <h2>{scenario.title}</h2>
      <p>{scenario.patient}</p>
      <h3>{scenario.question}</h3>
      <div className="cbet-options">
        {scenario.options.map((option, index) => (
          <button
            key={option}
            disabled={answered}
            className={`cbet-option ${
              answered && index === scenario.answer ? "correct" : ""
            } ${answered && index === selected && !correct ? "wrong" : ""}`}
            onClick={() => {
              setSelected(index);
              onComplete();
            }}
          >
            <strong>{String.fromCharCode(65 + index)}.</strong> {option}
          </button>
        ))}
      </div>
      {answered && (
        <div className="cbet-feedback">
          <strong>{correct ? "Best action." : "Better approach:"}</strong>
          <span>{scenario.explanation}</span>
        </div>
      )}
    </article>
  );
}

function scrollCbetPageToTop() {
  if (typeof window === "undefined") return;

  window.requestAnimationFrame(() => {
    const target =
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


function MissionOne({ onBack, onComplete }) {
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
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [xpToast, setXpToast] = useState(null);
  const [showBadgeUnlock, setShowBadgeUnlock] = useState(false);

  const question = questions[questionIndex];
  const selected = answers[questionIndex];
  const answered = selected !== undefined;
  const percent = Math.round((score / questions.length) * 100);
  const passed = percent >= 80;

  useEffect(() => {
    scrollCbetPageToTop();
  }, [phase, lessonIndex, scenarioIndex, questionIndex]);

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
          <span>Badge Unlocked</span>
          <strong>Electronics Apprentice</strong>
          <button className="cbet-primary" onClick={() => setShowBadgeUnlock(false)}>Continue</button>
        </div>
      )}
    </>
  );

  if (phase === "briefing") {
    return (
      <section className="cbet-shell">
        {missionOverlay}
        <button className="cbet-text-button" onClick={onBack}>← Back to Academy</button>
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
      <section className="cbet-shell">
        {missionOverlay}
        <button className="cbet-text-button" onClick={onBack}>← Back to Academy</button>
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
            check={lesson.check}
            onComplete={(isCorrect) => {
              if (isCorrect) markLessonComplete(lessonIndex);
            }}
          />
          <div className="cbet-actions">
            <button className="cbet-secondary" disabled={lessonIndex === 0}
              onClick={() => setLessonIndex((i) => i - 1)}>Previous</button>
            <button className="cbet-primary" disabled={!done}
              onClick={() => finalLesson ? setPhase("scenarios") : setLessonIndex((i) => i + 1)}>
              {finalLesson ? "Begin Scenarios" : "Next Lesson"}
            </button>
          </div>
        </article>
      </section>
    );
  }

  if (phase === "scenarios") {
    const scenario = missionOneScenarios[scenarioIndex];
    const done = Boolean(scenarioChecks[scenarioIndex]);
    const final = scenarioIndex === missionOneScenarios.length - 1;
    return (
      <section className="cbet-shell">
        {missionOverlay}
        <button className="cbet-text-button" onClick={onBack}>← Back to Academy</button>
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
            {final ? "Begin Mission Challenge" : "Next Scenario"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="cbet-shell">
        {missionOverlay}
      <button className="cbet-text-button" onClick={onBack}>← Back to Academy</button>
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
            ? "Electronics Apprentice badge unlocked. You earned 250 XP."
            : "You need 80% to pass. Review the lessons and try again."}</p>
          <div className="cbet-actions center">
            <button className="cbet-secondary" onClick={restart}>Retake Challenge</button>
            <button className="cbet-primary" onClick={onBack}>Return to Academy</button>
          </div>
        </article>
      )}
    </section>
  );
}


function MissionTwo({ onExit }) {
  const lessons = missionTwoLessons;
  const scenarios = missionTwoScenarios;
  const questions = missionTwoQuestions;
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
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [xpToast, setXpToast] = useState(null);
  const [showBadgeUnlock, setShowBadgeUnlock] = useState(false);

  const question = questions[questionIndex];
  const selected = answers[questionIndex];
  const displayedCorrect = finalResult?.correct ?? score;
  const percent =
    finalResult?.percent ??
    Math.round((displayedCorrect / questions.length) * 100);
  const passed = percent >= 80;

  useEffect(() => {
    scrollCbetPageToTop();
  }, [phase, lessonIndex, scenarioIndex, questionIndex]);

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
    setAnswers((previous) => ({ ...previous, [questionIndex]: index }));
    playCbetTone(index === question.answer ? "correct" : "wrong");
    if (index === question.answer) setScore((previous) => previous + 1);
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
          total + (completedAnswers[index] === item.answer ? 1 : 0),
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
          <span>Badge Unlocked</span>
          <strong>Component Specialist</strong>
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
              <span>Component Specialist badge</span>
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
        <div className="cbet-subprogress">
          <span>Lesson {lessonIndex + 1} of {lessons.length}</span>
          <div><i style={{ width: `${((lessonIndex + (complete ? 1 : 0)) / lessons.length) * 100}%` }} /></div>
        </div>
        <article className="cbet-lesson-card">
          <div className="cbet-lesson-icon">{lesson.icon}</div>
          <span className="cbet-label">Component Lesson {lessonIndex + 1}</span>
          <h2>{lesson.title}</h2>
          <p className="cbet-lesson-summary">{lesson.summary}</p>
          <div className="cbet-points">
            {lesson.points.map((point) => <p key={point}><span>●</span>{point}</p>)}
          </div>
          <GlossaryTerms text={`${lesson.title} ${lesson.points.join(" ")}`} />
          <MissionTwoLab type={lesson.interaction} />
          <KnowledgeCheck
            key={`mission-2-lesson-${lessonIndex}`}
            resetKey={`mission-2-lesson-${lessonIndex}`}
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
          />
          <div className="cbet-nav-row">
            <button className="cbet-secondary" disabled={lessonIndex === 0}
              onClick={() => setLessonIndex(Math.max(0, lessonIndex - 1))}>Previous</button>
            {lessonIndex < lessons.length - 1 ? (
              <button className="cbet-primary" disabled={!complete}
                onClick={() => setLessonIndex(lessonIndex + 1)}>Next Lesson</button>
            ) : (
              <button className="cbet-primary" disabled={!complete}
                onClick={() => setPhase("scenarios")}>Begin Applied Cases</button>
            )}
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
        <div className="cbet-subprogress">
          <span>Applied Case {scenarioIndex + 1} of {scenarios.length}</span>
          <div><i style={{ width: `${((scenarioIndex + (complete ? 1 : 0)) / scenarios.length) * 100}%` }} /></div>
        </div>
        <ScenarioCard scenario={scenario} onComplete={() => markScenarioComplete(scenarioIndex)} />
        <div className="cbet-nav-row">
          <button className="cbet-secondary" disabled={scenarioIndex === 0}
            onClick={() => setScenarioIndex(Math.max(0, scenarioIndex - 1))}>Previous</button>
          {scenarioIndex < scenarios.length - 1 ? (
            <button className="cbet-primary" disabled={!complete}
              onClick={() => setScenarioIndex(scenarioIndex + 1)}>Next Case</button>
          ) : (
            <button className="cbet-primary" disabled={!complete}
              onClick={() => setPhase("quiz")}>Begin Mission Challenge</button>
          )}
        </div>
      </section>
    );
  }

  if (phase === "quiz" && !finished) {
    return (
      <section className="cbet-shell">
        {missionOverlay}
        <button className="cbet-back" onClick={onExit}>← Academy Dashboard</button>
        <div className="cbet-subprogress">
          <span>Question {questionIndex + 1} of {questions.length}</span>
          <div><i style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>
        </div>
        <article className="cbet-quiz-card">
          <span className="cbet-label">Mission 2 Challenge</span>
          <h2>{question.question}</h2>
          <div className="cbet-option-grid">
            {question.options.map((option, index) => {
              let className = "";
              if (selected !== undefined) {
                if (index === question.answer) className = "correct";
                else if (index === selected) className = "wrong";
              }
              return <button key={option} className={className} onClick={() => chooseAnswer(index)}>{option}</button>;
            })}
          </div>
          {selected !== undefined && (
            <div className={`cbet-feedback ${selected === question.answer ? "good" : "bad"}`}>
              <strong>{selected === question.answer ? "Correct" : "Review this concept"}</strong>
              <p>{question.explanation}</p>
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
          ? "You completed Electronic Components and earned 350 XP plus the Component Specialist badge."
          : "An 80% score is required. Review the interactive component labs, then try again."}</p>
        <div className="cbet-nav-row center">
          <button className="cbet-secondary" onClick={restartQuiz}>Retake Challenge</button>
          <button className="cbet-primary" onClick={onExit}>Return to Academy</button>
        </div>
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

export default function CBETAcademy() {
  const [screen, setScreen] = useState("dashboard");
  const [refresh, setRefresh] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [returnToMissions, setReturnToMissions] = useState(false);
  const [streak, setStreak] = useState(() => registerCbetVisit());
  const academy = getCbetAcademyState();
  const progress = cbetCompletionPercent();
  const stats = getCbetStats();

  useEffect(() => {
    setStreak(registerCbetVisit());
  }, [refresh]);

  useEffect(() => {
    if (screen !== "dashboard") return undefined;

    const previousScrollRestoration =
      "scrollRestoration" in window.history
        ? window.history.scrollRestoration
        : null;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToTrainingPath = () => {
      const missionSection = document.getElementById("cbet-training-path");
      if (!missionSection) return;

      const top = Math.max(
        0,
        missionSection.getBoundingClientRect().top + window.scrollY - 24
      );

      window.scrollTo({
        top,
        behavior: "auto",
      });
    };

    // Repeat briefly because images, fonts, and cards above the missions
    // can finish loading after the first scroll and shift the page.
    const timers = [0, 80, 200, 450, 800, 1200].map((delay) =>
      window.setTimeout(scrollToTrainingPath, delay)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));

      if (
        previousScrollRestoration !== null &&
        "scrollRestoration" in window.history
      ) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, [screen, returnToMissions, refresh]);

  if (screen === "mission1") {
    return (
      <main className="cbet-academy">
        <MissionOne
          onBack={() => setScreen("dashboard")}
          onComplete={() => setRefresh((v) => v + 1)}
        />
      </main>
    );
  }

  if (screen === "mission2") {
    return (
      <main className="cbet-academy">
        <MissionTwo
          onExit={() => {
            setScreen("dashboard");
            setRefresh((v) => v + 1);
          }}
        />
      </main>
    );
  }

  if (screen === "virtualLab") {
    return (
      <VirtualCBETLab
        onExit={() => {
          setReturnToMissions(true);
          setScreen("dashboard");
        }}
      />
    );
  }

  return (
    <main className="cbet-academy" key={refresh}>
      <section className="cbet-dashboard-hero">
        <div className="cbet-shell">
          <div className="cbet-hero-grid">
            <div>
              <span className="cbet-label">MedSkillBuilder Academy</span>
              <h1>🔧 CBET Certification Academy</h1>
              <p>Build biomedical equipment knowledge through guided missions, interactive labs, troubleshooting, and exam-style practice.</p>
              <div className="cbet-progress-bar large"><span style={{ width: `${progress}%` }} /></div>
              <div className="cbet-progress-copy">
                <span>{progress}% complete</span><span>{academy.xp} XP earned</span>
              </div>
              <div className="cbet-hero-actions">
                <button
                  className="cbet-primary"
                  onClick={() => setScreen(getCbetModuleState(1).complete ? "mission2" : "mission1")}
                >
                  {getCbetModuleState(1).complete
                    ? getMissionProgress(2).phase === "briefing"
                      ? "Start Mission 2"
                      : "Continue Mission 2"
                    : getMissionProgress(1).phase === "briefing"
                    ? "Start Mission 1"
                    : "Continue Mission 1"}
                </button>
                <button className="cbet-secondary" onClick={() => setShowStats(true)}>View Statistics</button>
                <button className="cbet-secondary cbet-lab-launch-button" onClick={() => setScreen("virtualLab")}>🧪 Open Virtual Lab</button>
              </div>
            </div>
            <div className="cbet-rank-card">
              <span>Current Rank</span>
              <strong>{progress === 100 ? "CBET Ready" : progress > 0 ? "Electronics Apprentice" : "Biomedical Rookie"}</strong>
              <div>🏅 {Object.values(academy.modules || {}).filter((m) => m.complete).length} badges earned</div>
              <div>🎖️ Current rank: <strong>{getCbetCareerRank(academy.xp)}</strong></div>
              <div className="cbet-streak-chip">🔥 {streak.current || 1}-day learning streak</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cbet-shell cbet-dashboard">
        <div className="cbet-section-heading" id="cbet-training-path">
          <span className="cbet-label">Training Path</span>
          <h2>Complete each mission to unlock the next</h2>
        </div>

        <div className="cbet-grid">
          {cbetAcademyModules.map((module) => {
            const state = getCbetModuleState(module.number);
            const unlocked = isCbetModuleUnlocked(module.number);
            const available = module.number === 1 || module.number === 2;
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
                <div className="cbet-badge">🏅 {module.badge}</div>
                <div className="cbet-card-footer">
                  <span>{module.xp} XP</span>
                  {available ? (
                    <button
                      className="cbet-primary"
                      disabled={!unlocked || (module.comingSoon && module.number > 2)}
                      onClick={() => setScreen(module.number === 1 ? "mission1" : module.number === 2 ? "mission2" : "dashboard")}
                    >
                      {module.comingSoon && module.number > 2
                        ? "Coming Soon"
                        : state.complete
                        ? "Review Mission"
                        : getMissionProgress(module.number).phase !== "briefing"
                        ? "Continue Mission"
                        : "Start Mission"}
                    </button>
                  ) : (
                    <button className="cbet-secondary" disabled>{unlocked ? "Coming Soon" : "Locked"}</button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <section className="cbet-signature-lab">
          <div className="cbet-signature-lab-icon">🧪</div>
          <div>
            <span className="cbet-label">Signature Learning Experience</span>
            <h2>Virtual Biomedical Electronics Bench</h2>
            <p>Learn one technical skill at a time with highlighted controls, friendly feedback, clear probe placement, and step-by-step coaching.</p>
            <div className="cbet-signature-lab-features">
              <span>One step at a time</span>
              <span>Highlighted controls</span>
              <span>Beginner feedback</span>
              <span>Saved progress</span>
            </div>
          </div>
          <button className="cbet-primary" onClick={() => setScreen("virtualLab")}>Launch Lab</button>
        </section>

        <section className="cbet-final">
          <div className="cbet-hero-icon">🏆</div>
          <div>
            <span className="cbet-label">Graduation Challenge</span>
            <h2>CBET Final Board Challenge</h2>
            <p>Comprehensive randomized exam with category scoring, question review, and a printable academy certificate.</p>
          </div>
          <button className="cbet-secondary" disabled>Complete All 9 Missions</button>
        </section>
      </section>
      {showStats && <StatsPanel stats={stats} onClose={() => setShowStats(false)} />}
    </main>
  );
}
