import React from "react";

const MODES = [
  ["voltage", "V⎓", "DC VOLTAGE"],
  ["current", "A⎓", "DC CURRENT"],
  ["resistance", "Ω", "RESISTANCE"],
  ["continuity", ")))", "CONTINUITY"],
  ["diode", "▷|", "DIODE TEST"],
  ["capacitance", "—|(—", "CAPACITANCE"],
  ["off", "OFF", "POWER OFF"],
];

export default function Meter({
  lesson,
  action,
  meterMode,
  displayValue,
  onMode,
  onRecord,
}) {
  return (
    <section className="guided-meter">
      <div className="guided-device-label">DIGITAL MULTIMETER</div>

      <button
        className={`guided-meter-screen ${action === "read" ? "target-highlight" : ""}`}
        onClick={onRecord}
      >
        <span>{displayValue}</span>
        <small>{meterMode === "off" ? "SELECT FUNCTION" : lesson.shortTitle.toUpperCase()}</small>
      </button>

      <div className="guided-meter-buttons seven">
        {MODES.map(([mode, symbol, label]) => (
          <button
            key={mode}
            className={`${meterMode === mode ? "active" : ""} ${
              action === "mode" && lesson.mode === mode ? "target-highlight" : ""
            }`}
            onClick={() => onMode(mode)}
          >
            {symbol}
            <small>{label}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
