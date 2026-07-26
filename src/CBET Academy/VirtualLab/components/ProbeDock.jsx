import React from "react";

export default function ProbeDock({
  action,
  selectedProbe,
  blackConnected,
  redConnected,
  onSelect,
}) {
  return (
    <div className="guided-probes">
      <button
        className={`guided-probe black ${selectedProbe === "black" ? "selected" : ""} ${
          action === "black" ? "target-highlight" : ""
        }`}
        onClick={() => onSelect("black")}
      >
        <span className="probe-tip" />
        <strong>BLACK PROBE</strong>
        <small>{blackConnected ? "Connected" : "Click to select"}</small>
      </button>

      <button
        className={`guided-probe red ${selectedProbe === "red" ? "selected" : ""} ${
          action === "red" ? "target-highlight" : ""
        }`}
        onClick={() => onSelect("red")}
      >
        <span className="probe-tip" />
        <strong>RED PROBE</strong>
        <small>{redConnected ? "Connected" : "Click to select"}</small>
      </button>
    </div>
  );
}
