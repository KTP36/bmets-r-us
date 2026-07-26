import React from "react";
import { playLabSound } from "./labUtils";

export default function ProbeDock({
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
        className={`black ${
          selectedProbe === "black" ? "selected" : ""
        } ${action === "black" ? "target-highlight" : ""}`}
        onClick={() => {
          playLabSound("probe");
          onSelect("black");
        }}
      >
        <span className="vl-probe-icon"><i /></span>
        <span>
          <strong>Black Probe</strong>
          <small>
            {blackConnected ? "Connected to COM" : "Click to select"}
          </small>
        </span>
        <em
          className={`vl-probe-body ${
            selectedProbe === "black" ? "selected" : ""
          } ${blackConnected ? "connected" : ""}`}
        />
      </button>

      <button
        type="button"
        className={`red ${selectedProbe === "red" ? "selected" : ""} ${
          action === "red" ? "target-highlight" : ""
        }`}
        onClick={() => {
          playLabSound("probe");
          onSelect("red");
        }}
      >
        <span className="vl-probe-icon"><i /></span>
        <span>
          <strong>Red Probe</strong>
          <small>
            {redConnected ? "Connected to V / Ω" : "Click to select"}
          </small>
        </span>
        <em
          className={`vl-probe-body ${
            selectedProbe === "red" ? "selected" : ""
          } ${redConnected ? "connected" : ""}`}
        />
      </button>
    </div>
  );
}
