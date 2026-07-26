import React from "react";

export default function CableSystem({
  selectedProbe,
  blackConnected,
  redConnected,
}) {
  return (
    <svg
      className="vl-lead-layer"
      viewBox="0 0 1000 720"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className={`vl-lead black ${
          selectedProbe === "black" ? "selected" : ""
        } ${blackConnected ? "connected" : ""}`}
        d={
          blackConnected
            ? "M 875 560 C 830 620, 700 650, 575 565 C 500 515, 450 455, 398 390"
            : "M 875 560 C 840 625, 720 690, 520 675 C 430 668, 345 655, 285 660"
        }
      />
      <path
        className={`vl-lead red ${
          selectedProbe === "red" ? "selected" : ""
        } ${redConnected ? "connected" : ""}`}
        d={
          redConnected
            ? "M 945 560 C 900 635, 760 675, 610 580 C 530 525, 485 465, 445 390"
            : "M 945 560 C 910 640, 820 700, 690 680 C 620 668, 575 655, 540 660"
        }
      />
    </svg>
  );
}
