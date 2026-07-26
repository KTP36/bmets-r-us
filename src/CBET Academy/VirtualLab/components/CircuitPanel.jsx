import React from "react";

export default function CircuitPanel({
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
  const targetFor = (probe) => lesson.probeTargets?.[probe];

  return (
    <div className="guided-circuit">
      <div className="circuit-equipment-row">
        <div className="guided-power-card">
          <div className="guided-device-label">DC POWER SUPPLY</div>
          <div className="guided-supply-display">
            <strong>{supplyOn ? "12.0" : "0.0"}</strong><span>V</span>
          </div>
          <button
            className={`guided-output-button ${supplyOn ? "on" : ""} ${
              ["power", "poweroff"].includes(action) ? "target-highlight" : ""
            }`}
            onClick={onPower}
          >
            <i />{supplyOn ? "OUTPUT ON" : "OUTPUT OFF"}
          </button>
        </div>

        <div className="circuit-path">
          <div className={`circuit-line top ${supplyOn ? "energized" : ""}`} />
          <div className="circuit-flow-label">
            {supplyOn ? "ENERGIZED CIRCUIT" : "CIRCUIT DE-ENERGIZED"}
          </div>

          {lesson.usesSeriesGap && (
            <button
              className={`series-gap ${action === "series" ? "target-highlight" : ""} ${
                seriesOpen ? "open" : ""
              }`}
              onClick={onSeries}
            >
              {seriesOpen ? "CIRCUIT OPEN" : "OPEN SERIES GAP"}
            </button>
          )}

          {lesson.usesDischarge && (
            <button
              className={`series-gap ${action === "discharge" ? "target-highlight" : ""} ${
                discharged ? "open" : ""
              }`}
              onClick={onDischarge}
            >
              {discharged ? "CAPACITOR DISCHARGED" : "DISCHARGE CAPACITOR"}
            </button>
          )}

          <div className={`circuit-line bottom ${supplyOn ? "energized" : ""}`} />
        </div>

        <div className="guided-component-card">
          <div className="guided-device-label">{lesson.component.label}</div>
          <div className={`guided-component-symbol ${lesson.component.kind || ""}`}>
            {lesson.component.symbol}
          </div>
          <strong>{lesson.component.name}</strong>
        </div>
      </div>

      <div className="circuit-testpoint-panel">
        <div className="testpoint-heading">
          <span>Probe connection points</span>
          <small>Select a probe first, then choose the glowing point.</small>
        </div>

        <div className="circuit-testpoints">
          {lesson.points.map(([point, label, tone]) => {
            const relevant = selectedProbe && targetFor(selectedProbe) === point;
            const isConnected =
              (blackConnected && targetFor("black") === point) ||
              (redConnected && targetFor("red") === point);

            return (
              <button
                key={point}
                className={`guided-testpoint ${tone} ${
                  relevant ? "target-highlight" : ""
                } ${isConnected ? "connected" : ""}`}
                onClick={() => onPoint(point)}
              >
                <span>{tone === "positive" ? "+" : tone === "negative" ? "−" : "●"}</span>
                <strong>{label}</strong>
                <small>{isConnected ? "Probe connected" : "Click to connect"}</small>
              </button>
            );
          })}
        </div>
      </div>

      {lesson.diagnosis && (
        <div className="guided-action-panel">
          {lesson.diagnosis.options.map((option) => (
            <button
              key={option}
              className={action === "diagnose" && diagnosis === option ? "target-highlight" : ""}
              onClick={() => onDiagnosis(option)}
            >
              <strong>{option}</strong>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
