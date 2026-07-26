import React, { useMemo } from "react";
import { POINT_LABELS, playLabSound, titleCase } from "./labUtils";

export default function CircuitBoard({
  lesson,
  action,
  supplyOn,
  seriesOpen,
  discharged,
  selectedProbe,
  blackConnected,
  redConnected,
  diagnosis,
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
    return unique.length === 1
      ? [...unique, unique[0] === "left" ? "right" : "left"]
      : ["left", "right"];
  }, [lesson]);

  const diagnosisOptions =
    lesson?.diagnosis?.options || lesson?.diagnosis?.choices || [];

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
            className={`${supplyOn ? "on" : ""} ${
              ["power", "poweroff"].includes(action) ? "target-highlight" : ""
            }`}
            onClick={() => {
              playLabSound("click");
              onPower();
            }}
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
          <div className="vl-resistor">
            <span>{lesson.expected || "1 kΩ"}</span>
            <i />
          </div>

          <button
            type="button"
            className={`vl-circuit-state ${
              action === "series" ? "target-highlight" : ""
            }`}
            onClick={() => {
              playLabSound("click");
              onSeries();
            }}
          >
            {seriesOpen
              ? "CIRCUIT OPEN"
              : supplyOn
              ? "CIRCUIT ENERGIZED"
              : "CIRCUIT DE-ENERGIZED"}
          </button>

          {action === "discharge" && (
            <button
              type="button"
              className="vl-discharge target-highlight"
              onClick={() => {
                playLabSound("click");
                onDischarge();
              }}
            >
              {discharged ? "DISCHARGED" : "DISCHARGE CAPACITOR"}
            </button>
          )}
        </div>

        <div className="vl-training-load">
          <span className="vl-device-title">Training Load</span>
          <div className="vl-load-symbol">—/\/\/—</div>
          <strong>{lesson.expected || "1 kΩ"}</strong>
          <small>{seriesOpen ? "Open circuit" : "Connected"}</small>
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
            const connected =
              (blackTarget && blackConnected) || (redTarget && redConnected);
            const shouldGlow =
              (action === "black" &&
                selectedProbe === "black" &&
                blackTarget) ||
              (action === "red" &&
                selectedProbe === "red" &&
                redTarget);

            return (
              <button
                key={point}
                type="button"
                className={`${connected ? "connected" : ""} ${
                  blackTarget ? "black-target" : ""
                } ${redTarget ? "red-target" : ""} ${
                  shouldGlow ? "target-highlight" : ""
                }`}
                onClick={() => {
                  playLabSound("probe");
                  onPoint(point);
                }}
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
                className={`${diagnosis === option ? "selected" : ""} ${
                  action === "diagnose" ? "target-highlight" : ""
                }`}
                onClick={() => {
                  playLabSound("click");
                  onDiagnosis(option);
                }}
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
