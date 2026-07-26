import React, { useEffect, useMemo, useRef, useState } from "react";
import "./VirtualCBETLab.css";
import medSkillBuilderLogo from "./MedSkillBuilder-logo.png";
import LESSONS from "./lessons";
import {
  getDisplayValue,
  isReadingReady,
  loadCourseState,
  saveCourseState,
} from "./LessonEngine";

const MODE_OPTIONS = [
  { id: "voltage", symbol: "V⎓", label: "DC Voltage" },
  { id: "current", symbol: "A⎓", label: "DC Current" },
  { id: "resistance", symbol: "Ω", label: "Resistance" },
  { id: "continuity", symbol: ")))", label: "Continuity" },
  { id: "diode", symbol: "▷|", label: "Diode Test" },
  { id: "capacitance", symbol: "—|(—", label: "Capacitance" },
  { id: "off", symbol: "OFF", label: "Power Off" },
];

const POINT_LABELS = {
  left: "Left lead",
  right: "Right lead",
  output: "Output",
  ground: "Ground",
  positive: "Positive",
  negative: "Negative",
  source: "Source",
  load: "Load",
  com: "COM",
  vomega: "V / Ω",
  amps: "A input",
};

function titleCase(value = "") {
  return String(value)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function playContinuityBeep() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(1050, context.currentTime);
    gain.gain.setValueAtTime(0.04, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.28);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.28);
    oscillator.addEventListener("ended", () => context.close());
  } catch {
    // Audio is optional.
  }
}

function modeFromLesson(lesson) {
  const raw = String(lesson?.mode || "").toLowerCase();
  if (raw.includes("volt")) return "voltage";
  if (raw.includes("curr") || raw.includes("amp")) return "current";
  if (raw.includes("res")) return "resistance";
  if (raw.includes("cont")) return "continuity";
  if (raw.includes("diode")) return "diode";
  if (raw.includes("cap")) return "capacitance";
  return raw || "off";
}

function Roadmap({ lessons, lessonIndex, completedLessons, onSelect }) {
  const unlockedThrough = Math.max(
    lessonIndex,
    lessons.findIndex((item) => !completedLessons.includes(item.id))
  );

  return (
    <aside className="vl-roadmap">
      <div className="vl-roadmap-header">
        <span>CBET Guided Lab</span>
        <strong>Multimeter Foundations</strong>
        <small>Course progress</small>
        <div className="vl-roadmap-percent">
          {Math.round((completedLessons.length / lessons.length) * 100)}% complete
        </div>
        <div className="vl-roadmap-track">
          <i style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }} />
        </div>
      </div>

      <div className="vl-roadmap-list">
        {lessons.map((item, index) => {
          const complete = completedLessons.includes(item.id);
          const active = index === lessonIndex;
          const locked = index > Math.max(unlockedThrough, lessonIndex + 1) && !complete;
          const isFinal = item.id === "practical";

          return (
            <button
              key={item.id}
              type="button"
              className={`${active ? "active" : ""} ${complete ? "complete" : ""}`}
              disabled={locked}
              onClick={() => onSelect(index)}
            >
              <span className="vl-roadmap-number">
                {complete ? "✓" : locked ? "🔒" : isFinal ? "🏆" : index + 1}
              </span>
              <span className="vl-roadmap-copy">
                <small>{isFinal ? "Final" : `Lesson ${index + 1}`}</small>
                <strong>{item.shortTitle || item.title}</strong>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function InstructorPanel({ lesson, step, action, onContinue }) {
  return (
    <aside className="vl-instructor">
      <div className="vl-instructor-head">
        <div className="vl-avatar" aria-hidden="true">👨‍🔧</div>
        <div>
          <span>Your lab instructor</span>
          <strong>Biomedical Coach</strong>
          <small>CBET Expert</small>
        </div>
      </div>

      <div className="vl-task-label">Current task</div>
      <h2>{step?.[0] || `Welcome to ${lesson.title}`}</h2>
      <p className="vl-task-main">{step?.[1] || lesson.intro}</p>

      <div className="vl-why-card">
        <strong>💡 Why this matters</strong>
        <p>{step?.[2] || lesson.why || lesson.intro}</p>
      </div>

      {action === "continue" && (
        <button type="button" className="vl-primary" onClick={onContinue}>
          Start Lesson
        </button>
      )}

      <div className="vl-pro-tip">
        <strong>☆ Pro tip</strong>
        <p>
          {lesson.mode === "resistance"
            ? "Always ensure the circuit is de-energized before measuring resistance."
            : "Confirm the meter mode and probe jacks before touching a test point."}
        </p>
      </div>
    </aside>
  );
}

function CircuitBoard({
  lesson,
  action,
  supplyOn,
  seriesOpen,
  discharged,
  selectedProbe,
  blackConnected,
  redConnected,
  diagnosis,
  readingReady,
  continuityScenario,
  diodeScenario,
  onPower,
  onSeries,
  onDischarge,
  onPoint,
  onDiagnosis,
}) {
  const targetPoints = useMemo(() => {
    const values = Object.values(lesson?.probeTargets || {}).filter(Boolean);
    const unique = [...new Set(values)];
    if (unique.length >= 2) return unique;
    return unique.length === 1 ? [...unique, unique[0] === "left" ? "right" : "left"] : ["left", "right"];
  }, [lesson]);

  const diagnosisOptions = lesson?.diagnosis?.options || lesson?.diagnosis?.choices || [];

  return (
    <section className="vl-circuit-column">
      <div className="vl-workbench-heading">
        <div>
          <span>Training workbench</span>
          <strong>{lesson.title}</strong>
        </div>
      </div>

      <div className="vl-circuit-board">
        <div className="vl-power-supply">
          <span className="vl-device-title">DC Power Supply</span>
          <div className="vl-power-screen">
            <strong>{supplyOn ? "12.0" : "0.0"}</strong>
            <small>V</small>
          </div>
          <div className="vl-power-knob" aria-hidden="true"><i /></div>
          <button
            type="button"
            className={`${supplyOn ? "on" : ""} ${["power", "poweroff"].includes(action) ? "target-highlight" : ""}`}
            onClick={onPower}
          >
            <i /> OUTPUT {supplyOn ? "ON" : "OFF"}
          </button>
          <div className="vl-supply-jacks">
            <span className="black" />
            <span className="red" />
          </div>
        </div>

        <div className="vl-circuit-path" aria-label="Training circuit">
          <div className="vl-terminal tl" />
          <div className="vl-terminal tr" />
          <div className="vl-terminal bl" />
          <div className="vl-terminal br" />
          <div className="vl-wire top" />
          <div className="vl-wire left" />
          <div className="vl-wire right" />
          <div className="vl-wire bottom" />
          {lesson.id === "continuity" ? (
            <div className={`vl-fuse ${readingReady ? continuityScenario : ""}`} aria-label="Training fuse">
              <span>{readingReady ? (continuityScenario === "good" ? "GOOD FUSE" : "OPEN FUSE") : "FUSE"}</span>
              <i />
            </div>
          ) : lesson.id === "diode" ? (
            <div className={`vl-diode ${readingReady ? diodeScenario : ""}`} aria-label="Training diode">
              <span>{readingReady ? (diodeScenario === "good" ? "GOOD DIODE" : diodeScenario === "open" ? "OPEN DIODE" : "SHORTED DIODE") : "DIODE"}</span>
              <i className="anode" />
              <b>▶|</b>
              <i className="cathode" />
            </div>
          ) : (
            <div className="vl-resistor">
              <span>{lesson.expected || "1 kΩ"}</span>
              <i />
            </div>
          )}

          <button
            type="button"
            className={`vl-circuit-state ${action === "series" ? "target-highlight" : ""}`}
            onClick={onSeries}
          >
            {seriesOpen ? "CIRCUIT OPEN" : supplyOn ? "CIRCUIT ENERGIZED" : "CIRCUIT DE-ENERGIZED"}
          </button>

          {action === "discharge" && (
            <button type="button" className="vl-discharge target-highlight" onClick={onDischarge}>
              {discharged ? "DISCHARGED" : "DISCHARGE CAPACITOR"}
            </button>
          )}
        </div>

        <div className={`vl-training-load ${lesson.id === "continuity" ? "fuse-load" : ""} ${lesson.id === "diode" ? "diode-load" : ""}`}>
          <span className="vl-device-title">{lesson.id === "continuity" ? "Training Fuse" : lesson.id === "diode" ? "Training Diode" : "Training Load"}</span>
          <div className="vl-load-symbol">{lesson.id === "continuity" ? "—[ FUSE ]—" : lesson.id === "diode" ? "—▶|—" : "—/\/\—"}</div>
          <strong>{lesson.id === "continuity" ? (readingReady ? (continuityScenario === "good" ? "CONTINUITY" : "OPEN") : "TEST REQUIRED") : lesson.id === "diode" ? (readingReady ? (diodeScenario === "good" ? "FORWARD DROP" : diodeScenario === "open" ? "OPEN" : "SHORT") : "TEST REQUIRED") : lesson.expected || "1 kΩ"}</strong>
          <small>{lesson.id === "continuity" ? (readingReady ? (continuityScenario === "good" ? "Electrical path complete" : "Electrical path broken") : "Condition hidden") : lesson.id === "diode" ? (readingReady ? (diodeScenario === "good" ? "Normal silicon junction" : diodeScenario === "open" ? "No forward conduction" : "Near-zero junction drop") : "Condition hidden") : seriesOpen ? "Open circuit" : "Connected"}</small>
        </div>
      </div>

      <div className="vl-connection-panel">
        <div className="vl-panel-heading">
          <div>
            <span>Probe connection points</span>
            <small>Select a probe first, then click the glowing point.</small>
          </div>
        </div>

        <div className="vl-point-grid">
          {targetPoints.map((point) => {
            const blackTarget = lesson?.probeTargets?.black === point;
            const redTarget = lesson?.probeTargets?.red === point;
            const connected = (blackTarget && blackConnected) || (redTarget && redConnected);
            const shouldGlow =
              (action === "black" && selectedProbe === "black" && blackTarget) ||
              (action === "red" && selectedProbe === "red" && redTarget);

            return (
              <button
                key={point}
                type="button"
                className={`${connected ? "connected" : ""} ${shouldGlow ? "target-highlight" : ""}`}
                onClick={() => onPoint(point)}
              >
                <span className={redTarget ? "red" : "black"} />
                <strong>{POINT_LABELS[point] || titleCase(point)}</strong>
                <small>{connected ? "Probe connected" : "Click to connect"}</small>
              </button>
            );
          })}
        </div>
      </div>

      {diagnosisOptions.length > 0 && (
        <div className="vl-diagnosis">
          <span>Diagnosis</span>
          <div>
            {diagnosisOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`${diagnosis === option ? "selected" : ""} ${action === "diagnose" ? "target-highlight" : ""}`}
                onClick={() => onDiagnosis(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function Meter({
  lesson,
  action,
  meterMode,
  displayValue,
  readingReady,
  onMode,
  onRecord,
}) {
  const normalizedLessonMode = modeFromLesson(lesson);
  const activeIndex = Math.max(0, MODE_OPTIONS.findIndex((item) => item.id === meterMode));
  const dialAngle = -130 + activeIndex * 43;

  return (
    <section className="vl-meter-card">
      <div className="vl-meter-brand">
        <strong>MEDSKILL</strong>
        <span>117 TRUE RMS MULTIMETER</span>
      </div>

      <button
        type="button"
        className={`vl-meter-screen ${action === "read" ? "target-highlight" : ""}`}
        onClick={onRecord}
      >
        <small>{meterMode === "off" ? "SELECT FUNCTION" : MODE_OPTIONS.find((m) => m.id === meterMode)?.label}</small>
        <strong>{displayValue || (meterMode === "off" ? "— — —" : "OL")}</strong>
        <span>{meterMode === "resistance" ? "kΩ" : meterMode === "voltage" ? "V" : meterMode === "current" ? "A" : ""}</span>
        <i>{meterMode === "continuity" && readingReady && displayValue !== "OL" ? "BEEP" : readingReady ? "STABLE" : "AUTO"}</i>
      </button>

      <div className="vl-meter-softkeys">
        <button type="button">HOLD</button>
        <button type="button">MIN MAX</button>
        <button type="button">RANGE</button>
        <button type="button" className="yellow" aria-label="Backlight" />
      </div>

      <div className="vl-selector">
        <div className="vl-dial-labels">
          {MODE_OPTIONS.map((mode, index) => (
            <button
              key={mode.id}
              type="button"
              className={`${meterMode === mode.id ? "active" : ""} ${
                action === "mode" && mode.id === normalizedLessonMode ? "target-highlight" : ""
              }`}
              style={{ "--position": index }}
              onClick={() => onMode(mode.id)}
              title={mode.label}
            >
              <b>{mode.symbol}</b>
              <small>{mode.label}</small>
            </button>
          ))}
        </div>
        <div className="vl-dial">
          <i style={{ transform: `translateX(-50%) rotate(${dialAngle}deg)` }} />
          <span />
        </div>
      </div>

      <div className="vl-meter-jacks">
        <div>
          <strong>A</strong>
          <span className="jack red" />
          <small>10 A FUSED</small>
        </div>
        <div>
          <strong>COM</strong>
          <span className="jack black plugged" />
          <small>BLACK</small>
        </div>
        <div>
          <strong>V Ω</strong>
          <span className="jack red plugged" />
          <small>RED</small>
        </div>
      </div>
    </section>
  );
}

function ProbeDock({
  action,
  selectedProbe,
  blackConnected,
  redConnected,
  onSelect,
}) {
  return (
    <div className="vl-probe-dock">
      <button
        type="button"
        className={`black ${selectedProbe === "black" ? "selected" : ""} ${action === "black" ? "target-highlight" : ""}`}
        onClick={() => onSelect("black")}
      >
        <span className="vl-probe-icon"><i /></span>
        <span>
          <strong>Black Probe</strong>
          <small>{blackConnected ? "Connected to COM" : "Click to select"}</small>
        </span>
        <em className="vl-probe-body" />
      </button>

      <button
        type="button"
        className={`red ${selectedProbe === "red" ? "selected" : ""} ${action === "red" ? "target-highlight" : ""}`}
        onClick={() => onSelect("red")}
      >
        <span className="vl-probe-icon"><i /></span>
        <span>
          <strong>Red Probe</strong>
          <small>{redConnected ? "Connected to V / Ω" : "Click to select"}</small>
        </span>
        <em className="vl-probe-body" />
      </button>
    </div>
  );
}

function EducationNotice() {
  return (
    <section className="vl-education-notice" aria-label="Educational simulation notice">
      <img src={medSkillBuilderLogo} alt="MedSkillBuilder" />
      <div>
        <strong>Educational Simulation</strong>
        <p>
          This interactive lab reinforces healthcare technology concepts through guided practice. It supports
          classroom learning and certification preparation, but does not replace formal education, supervised
          hands-on experience, employer training, manufacturer instruction, or professional certification.
        </p>
      </div>
    </section>
  );
}

function CompletionScreen({ lesson, lastLesson, nextLesson, resetBench, onExit }) {
  return (
    <section className="vl-complete vl-learning-complete">
      <div className="vl-complete-mark">✓</div>
      <span>LEARNING OBJECTIVE ACHIEVED</span>
      <h2>{lesson.badge}</h2>
      <p>You successfully completed <strong>{lesson.title}</strong> and demonstrated the concepts presented in this guided lesson.</p>
      <div className="vl-objective-list">
        <strong>✓ Correct meter setup</strong>
        <strong>✓ Safe testing procedures</strong>
        <strong>✓ Proper probe placement</strong>
        <strong>✓ Accurate interpretation of results</strong>
      </div>
      <div className="vl-rewards">
        <strong>⚡ +{lesson.xp} XP earned</strong>
        <strong>🏅 {lesson.badge} badge unlocked</strong>
      </div>
      <div className="vl-readiness-note">
        <strong>Ready for the next concept?</strong>
        <span>Continue building your knowledge with the next guided lesson.</span>
      </div>
      <div className="vl-complete-actions">
        <button className="vl-primary" onClick={nextLesson}>
          {lastLesson ? "Complete Multimeter Academy →" : "Continue to Next Lesson →"}
        </button>
        <button onClick={resetBench}>Practice Again</button>
        <button onClick={onExit}>Return to Academy Dashboard</button>
      </div>
    </section>
  );
}

function CertificateScreen({ learnerName, setLearnerName, onBack, onExit }) {
  const completionDate = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date());
  const certificateId = `MSB-VMA-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

  function updateName(value) {
    setLearnerName(value);
    localStorage.setItem("msbLearnerName", value);
  }

  return (
    <section className="vl-certificate-page">
      <div className="vl-certificate-controls no-print">
        <label>
          Name shown on certificate
          <input value={learnerName} onChange={(event) => updateName(event.target.value)} placeholder="Learner Name" />
        </label>
        <button className="vl-primary" type="button" onClick={() => window.print()}>Print Certificate</button>
        <button type="button" onClick={onBack}>Back to Completion</button>
        <button type="button" onClick={onExit}>Academy Dashboard</button>
      </div>

      <article className="vl-certificate" aria-label="Certificate of completion">
        <img src={medSkillBuilderLogo} alt="MedSkillBuilder" />
        <span>LEARN. PRACTICE. GROW.</span>
        <h2>Certificate of Completion</h2>
        <p>This certifies that</p>
        <h3>{learnerName.trim() || "Learner Name"}</h3>
        <p>has successfully completed the</p>
        <h4>Virtual Multimeter Academy</h4>
        <p className="vl-certificate-copy">
          and demonstrated an understanding of the educational concepts presented throughout this interactive learning experience.
        </p>
        <div className="vl-certificate-disclaimer">
          This certificate recognizes completion of a MedSkillBuilder educational program. It is not a professional
          certification, license, credential, or authorization to independently perform clinical or biomedical engineering duties.
        </div>
        <footer>
          <span>Certificate ID: {certificateId}</span>
          <span>Completed: {completionDate}</span>
        </footer>
      </article>
    </section>
  );
}

export default function VirtualCBETLab({ onExit }) {
  const stored = loadCourseState();
  const [lessonIndex, setLessonIndex] = useState(stored.lessonIndex || 0);
  const [stepIndex, setStepIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(stored.completedLessons || []);
  const [totalXp, setTotalXp] = useState(stored.totalXp || 0);
  const [screen, setScreen] = useState("lesson");
  const [learnerName, setLearnerName] = useState(() => localStorage.getItem("msbLearnerName") || "");
  const [supplyOn, setSupplyOn] = useState(false);
  const [meterMode, setMeterMode] = useState("off");
  const [selectedProbe, setSelectedProbe] = useState("");
  const [blackConnected, setBlackConnected] = useState(false);
  const [redConnected, setRedConnected] = useState(false);
  const [seriesOpen, setSeriesOpen] = useState(false);
  const [discharged, setDischarged] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  const [continuityScenario, setContinuityScenario] = useState(() => Math.random() < 0.5 ? "good" : "blown");
  const [diodeScenario, setDiodeScenario] = useState(() => ["good", "open", "shorted"][Math.floor(Math.random() * 3)]);
  const [feedback, setFeedback] = useState("Follow the glowing control.");
  const [feedbackKind, setFeedbackKind] = useState("");
  const timer = useRef(null);

  const baseLesson = LESSONS[lessonIndex];
  const lesson = useMemo(() => {
    if (baseLesson?.id === "continuity") {
      const goodFuse = continuityScenario === "good";
      return {
        ...baseLesson,
        expected: goodFuse ? "0.2 Ω" : "OL",
        component: { ...(baseLesson.component || {}), label: "TRAINING FUSE", symbol: "—[ FUSE ]—", name: goodFuse ? "Good Fuse" : "Blown Fuse", kind: "fuse" },
        diagnosis: { correct: goodFuse ? "Fuse Good" : "Fuse Blown", options: ["Fuse Good", "Fuse Blown"] },
      };
    }

    if (baseLesson?.id === "diode") {
      const expectedByScenario = { good: "0.650 V", open: "OL", shorted: "0.000 V" };
      const diagnosisByScenario = { good: "Diode Good", open: "Diode Open", shorted: "Diode Shorted" };
      return {
        ...baseLesson,
        expected: expectedByScenario[diodeScenario],
        component: { ...(baseLesson.component || {}), label: "TRAINING DIODE", symbol: "—▶|—", name: diagnosisByScenario[diodeScenario], kind: "diode" },
        diagnosis: { correct: diagnosisByScenario[diodeScenario], options: ["Diode Good", "Diode Open", "Diode Shorted"] },
      };
    }

    return baseLesson;
  }, [baseLesson, continuityScenario, diodeScenario]);
  const step = lesson.steps[stepIndex];
  const action = step?.[3];

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    saveCourseState({ lessonIndex, completedLessons, totalXp });
  }, [lessonIndex, completedLessons, totalXp]);

  function resetBench(nextLessonIndex = lessonIndex) {
    setLessonIndex(nextLessonIndex);
    setStepIndex(0);
    setScreen("lesson");
    setSupplyOn(false);
    setMeterMode("off");
    setSelectedProbe("");
    setBlackConnected(false);
    setRedConnected(false);
    setSeriesOpen(false);
    setDischarged(false);
    setDiagnosis("");
    if (LESSONS[nextLessonIndex]?.id === "continuity") setContinuityScenario(Math.random() < 0.5 ? "good" : "blown");
    if (LESSONS[nextLessonIndex]?.id === "diode") setDiodeScenario(["good", "open", "shorted"][Math.floor(Math.random() * 3)]);
    setFeedback("Follow the glowing control.");
    setFeedbackKind("");
  }

  function showFeedback(message, kind = "good") {
    clearTimeout(timer.current);
    setFeedback(message);
    setFeedbackKind(kind);
    timer.current = setTimeout(() => setFeedbackKind(""), 900);
  }

  function advance(message) {
    showFeedback(message);
    setTimeout(() => {
      if (stepIndex === lesson.steps.length - 1) {
        const firstCompletion = !completedLessons.includes(lesson.id);
        if (firstCompletion) {
          setCompletedLessons((items) => [...items, lesson.id]);
          setTotalXp((xp) => xp + lesson.xp);
        }
        setScreen("complete");
      } else {
        setStepIndex((value) => value + 1);
      }
    }, 450);
  }

  function wrong(message) {
    showFeedback(message, "warn");
  }

  function handleContinue() {
    if (action === "continue") advance("Let's begin.");
  }

  function handlePower() {
    if (action === "power") {
      setSupplyOn(true);
      advance("Power is on.");
    } else if (action === "poweroff") {
      setSupplyOn(false);
      advance("Power is off. It is safe to continue.");
    } else {
      wrong("Follow the current highlighted step.");
    }
  }

  function handleMode(mode) {
    if (action !== "mode") return wrong("The meter setting is not the current step.");
    if (mode !== modeFromLesson(lesson)) return wrong(`Choose the ${lesson.shortTitle} setting.`);
    setMeterMode(mode);
    advance(`Correct. ${lesson.shortTitle} mode selected.`);
  }

  function handleSeriesGap() {
    if (action !== "series") return wrong("The series gap is not needed right now.");
    setSeriesOpen(true);
    advance("Circuit opened. The meter can now be placed in series.");
  }

  function handleDischarge() {
    if (action !== "discharge") return wrong("Discharging is not the current step.");
    if (supplyOn) return wrong("Turn the power off before discharging the capacitor.");
    setDischarged(true);
    advance("Capacitor safely discharged.");
  }

  function selectProbe(probe) {
    if (!["black", "red"].includes(action)) return wrong("The probes are not needed yet.");
    if (probe !== action) return wrong(`Select the ${action} probe.`);
    setSelectedProbe(probe);
    showFeedback(`${probe === "black" ? "Black" : "Red"} probe selected. Now click the highlighted point.`);
  }

  function connectPoint(point) {
    if (!["black", "red"].includes(action)) return wrong("This test point is not needed now.");
    if (selectedProbe !== action) return wrong(`Select the ${action} probe first.`);
    if (lesson.probeTargets[action] !== point) return wrong("Almost. Use the highlighted connection point.");

    if (action === "black") setBlackConnected(true);
    if (action === "red") setRedConnected(true);
    setSelectedProbe("");
    advance(`${action === "black" ? "Black" : "Red"} probe connected correctly.`);
  }

  const readingReady = isReadingReady({
    lesson,
    supplyOn,
    meterMode,
    blackConnected,
    redConnected,
    seriesOpen,
    discharged,
  });

  function recordReading() {
    if (action !== "read") return wrong("The display is not the current step.");
    if (!readingReady) return wrong("Check the meter mode, power state, safety step, and probe placement.");
    if (lesson.id === "continuity" && continuityScenario === "good") playContinuityBeep();
    if (lesson.id === "continuity") {
      advance(continuityScenario === "good" ? "Beep confirmed. The fuse has a complete electrical path." : "OL confirmed. The fuse has an open electrical path.");
      return;
    }
    if (lesson.id === "diode") {
      const message = diodeScenario === "good"
        ? "0.650 V confirms a normal silicon forward-voltage drop."
        : diodeScenario === "open"
        ? "OL confirms the diode is not conducting in the forward direction."
        : "0.000 V confirms an internal short across the diode junction.";
      advance(message);
      return;
    }
    advance(`Correct reading: ${lesson.expected}.`);
  }

  function handleDiagnosis(option) {
    if (action !== "diagnose") return wrong("Complete the measurement before diagnosing.");
    setDiagnosis(option);
    if (option !== lesson.diagnosis.correct) return wrong("That diagnosis does not match the measured evidence.");
    advance(`Correct diagnosis: ${option}.`);
  }

  function nextLesson() {
    if (lessonIndex < LESSONS.length - 1) resetBench(lessonIndex + 1);
    else setScreen("courseComplete");
  }

  const displayValue = getDisplayValue({ lesson, ready: readingReady, meterMode });
  const lastLesson = lessonIndex === LESSONS.length - 1;
  const totalPossibleXp = LESSONS.reduce((sum, item) => sum + item.xp, 0);
  const stepProgress = ((stepIndex + 1) / lesson.steps.length) * 100;

  return (
    <main className={`virtual-lab-shell feedback-${feedbackKind}`}>
      <header className="vl-topbar">
        <div>
          <span>CBET Virtual Lab 4.0</span>
          <h1>Multimeter Foundations</h1>
        </div>
        <div className="vl-top-actions">
          <div className="vl-xp">⚡ {totalXp} XP</div>
          <button type="button" onClick={onExit}>← Academy Dashboard</button>
        </div>
      </header>

      <EducationNotice />

      <div className="vl-course-progress">
        {LESSONS.map((item, index) => (
          <div key={item.id} className={`${index === lessonIndex ? "active" : ""} ${completedLessons.includes(item.id) ? "done" : ""}`}>
            <span>{completedLessons.includes(item.id) ? "✓" : item.id === "practical" ? "🏆" : index + 1}</span>
            <small>{item.shortTitle}</small>
          </div>
        ))}
      </div>

      {screen === "lesson" && (
        <section className="vl-page-grid">
          <Roadmap
            lessons={LESSONS}
            lessonIndex={lessonIndex}
            completedLessons={completedLessons}
            onSelect={resetBench}
          />

          <InstructorPanel
            lesson={lesson}
            step={step}
            action={action}
            onContinue={handleContinue}
          />

          <section className="vl-lab-area">
            <div className="vl-stepbar">
              <div>
                <span>Step {stepIndex + 1} of {lesson.steps.length}</span>
                <strong>{lesson.title}</strong>
              </div>
              <div className={`vl-feedback ${feedbackKind}`}>{feedback}</div>
            </div>
            <div className="vl-step-track"><i style={{ width: `${stepProgress}%` }} /></div>

            <div className="vl-workbench-grid">
              <CircuitBoard
                lesson={lesson}
                action={action}
                supplyOn={supplyOn}
                seriesOpen={seriesOpen}
                discharged={discharged}
                selectedProbe={selectedProbe}
                blackConnected={blackConnected}
                redConnected={redConnected}
                diagnosis={diagnosis}
                readingReady={readingReady}
                continuityScenario={continuityScenario}
                diodeScenario={diodeScenario}
                onPower={handlePower}
                onSeries={handleSeriesGap}
                onDischarge={handleDischarge}
                onPoint={connectPoint}
                onDiagnosis={handleDiagnosis}
              />

              <Meter
                lesson={lesson}
                action={action}
                meterMode={meterMode}
                displayValue={displayValue}
                readingReady={readingReady}
                onMode={handleMode}
                onRecord={recordReading}
              />

              <ProbeDock
                action={action}
                selectedProbe={selectedProbe}
                blackConnected={blackConnected}
                redConnected={redConnected}
                onSelect={selectProbe}
              />
            </div>
          </section>
        </section>
      )}

      {screen === "complete" && (
        <CompletionScreen
          lesson={lesson}
          lastLesson={lastLesson}
          nextLesson={nextLesson}
          resetBench={() => resetBench(lessonIndex)}
          onExit={onExit}
        />
      )}

      {screen === "courseComplete" && (
        <section className="vl-complete vl-finale vl-responsible-finale">
          <img className="vl-finale-logo" src={medSkillBuilderLogo} alt="MedSkillBuilder" />
          <span>ACADEMY COMPLETE</span>
          <h2>Congratulations!</h2>
          <p>You completed the <strong>MedSkillBuilder Virtual Multimeter Academy</strong>.</p>
          <div className="vl-rewards">
            <strong>{totalPossibleXp} possible XP</strong>
            <strong>{LESSONS.length} completed learning checks</strong>
          </div>
          <div className="vl-skill-grid">
            {LESSONS.map((item) => <strong key={item.id}>✓ {item.shortTitle}</strong>)}
          </div>
          <div className="vl-professional-reminder">
            <strong>Remember</strong>
            <p>
              Completing this academy demonstrates understanding of the educational concepts presented. Professional competency
              develops through continued study, supervised hands-on experience, employer training, manufacturer instruction,
              and formal certification when appropriate.
            </p>
            <div><span>Keep learning.</span><span>Keep practicing.</span><span>Keep growing.</span></div>
          </div>
          <div className="vl-complete-actions">
            <button className="vl-primary" onClick={() => setScreen("certificate")}>View Certificate of Completion →</button>
            <button onClick={() => resetBench(0)}>Review Lessons</button>
            <button onClick={onExit}>Return to CBET Academy</button>
          </div>
        </section>
      )}

      {screen === "certificate" && (
        <CertificateScreen
          learnerName={learnerName}
          setLearnerName={setLearnerName}
          onBack={() => setScreen("courseComplete")}
          onExit={onExit}
        />
      )}

      <footer className="vl-safety vl-brand-promise">
        <img src={medSkillBuilderLogo} alt="" aria-hidden="true" />
        <div>
          <strong>Learn. Practice. Grow.</strong>
          <span>MedSkillBuilder helps learners build confidence through interactive practice while encouraging continued education, supervised practice, and lifelong professional development.</span>
        </div>
      </footer>
    </main>
  );
}
