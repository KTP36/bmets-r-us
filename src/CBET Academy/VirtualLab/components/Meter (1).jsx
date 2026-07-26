import React, { useEffect, useState } from "react";
import { MODE_OPTIONS, modeFromLesson, playLabSound } from "./labUtils";

export default function Meter({
  lesson,
  action,
  meterMode,
  displayValue,
  readingReady,
  onMode,
  onRecord,
}) {
  const normalizedLessonMode = modeFromLesson(lesson);
  const activeIndex = Math.max(
    0,
    MODE_OPTIONS.findIndex((item) => item.id === meterMode)
  );
  const dialAngle = -130 + activeIndex * 43;
  const [animatedDisplay, setAnimatedDisplay] = useState("— — —");
  const [displayPhase, setDisplayPhase] = useState("idle");

  useEffect(() => {
    const timers = [];

    if (meterMode === "off") {
      setDisplayPhase("idle");
      setAnimatedDisplay("— — —");
      return () => {};
    }

    setDisplayPhase("scanning");
    setAnimatedDisplay("----");
    timers.push(setTimeout(() => setAnimatedDisplay("OL"), 170));

    if (readingReady && displayValue) {
      timers.push(
        setTimeout(() => {
          setAnimatedDisplay(displayValue);
          setDisplayPhase("stable");
          playLabSound(
            meterMode === "continuity" ? "continuity" : "success"
          );
        }, 430)
      );
    } else {
      timers.push(setTimeout(() => setDisplayPhase("idle"), 430));
    }

    return () => timers.forEach(clearTimeout);
  }, [meterMode, displayValue, readingReady]);

  return (
    <section className="vl-meter-card">
      <div className="vl-meter-brand">
        <strong>MEDSKILL</strong>
        <span>117 TRUE RMS MULTIMETER</span>
      </div>

      <button
        type="button"
        className={`vl-meter-screen ${displayPhase} ${
          action === "read" ? "target-highlight" : ""
        }`}
        onClick={() => {
          playLabSound("click");
          onRecord();
        }}
      >
        <small>
          {meterMode === "off"
            ? "SELECT FUNCTION"
            : MODE_OPTIONS.find((mode) => mode.id === meterMode)?.label}
        </small>
        <strong>{animatedDisplay}</strong>
        <span>
          {meterMode === "resistance"
            ? "kΩ"
            : meterMode === "voltage"
            ? "V"
            : meterMode === "current"
            ? "A"
            : ""}
        </span>
        <i>
          {readingReady
            ? "STABLE"
            : displayPhase === "scanning"
            ? "SCANNING"
            : "AUTO"}
        </i>
      </button>

      <div className="vl-meter-status" aria-label="Meter status">
        <span className={meterMode !== "off" ? "on" : ""}>AUTO</span>
        <span className={readingReady ? "on" : ""}>STABLE</span>
        <span className={meterMode === "continuity" ? "on amber" : ""}>
          BEEP
        </span>
        <span>HOLD</span>
      </div>

      <div className="vl-meter-softkeys">
        <button type="button" onClick={() => playLabSound("click")}>
          HOLD
        </button>
        <button type="button" onClick={() => playLabSound("click")}>
          MIN MAX
        </button>
        <button type="button" onClick={() => playLabSound("click")}>
          RANGE
        </button>
        <button
          type="button"
          className="yellow"
          aria-label="Backlight"
          onClick={() => playLabSound("click")}
        />
      </div>

      <div className="vl-selector">
        <div className="vl-dial-labels">
          {MODE_OPTIONS.map((mode, index) => (
            <button
              key={mode.id}
              type="button"
              className={`${meterMode === mode.id ? "active" : ""} ${
                action === "mode" && mode.id === normalizedLessonMode
                  ? "target-highlight"
                  : ""
              }`}
              style={{ "--position": index }}
              onClick={() => {
                playLabSound("rotary");
                onMode(mode.id);
              }}
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
