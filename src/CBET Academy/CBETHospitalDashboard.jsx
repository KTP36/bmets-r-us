import React, { useEffect, useMemo, useRef, useState } from "react";
import "./CBETHospitalDashboard.css";

const DEPARTMENTS = [
  { id: "ed", icon: "🚑", name: "Emergency Department", status: "1 active call", risk: "High" },
  { id: "icu", icon: "❤️", name: "Intensive Care Unit", status: "1 active call", risk: "High" },
  { id: "or", icon: "🏥", name: "Operating Room", status: "1 critical call", risk: "Critical" },
  { id: "cardiology", icon: "💓", name: "Cardiology", status: "1 PM due", risk: "Medium" },
  { id: "imaging", icon: "🩻", name: "Imaging", status: "1 active call", risk: "Medium" },
  { id: "nicu", icon: "🍼", name: "NICU", status: "1 active call", risk: "Critical" },
];

const WORK_ORDERS = [
  {
    id: "WO-1048", priority: "STAT", departmentId: "ed", department: "Emergency Department",
    device: "Guardian Bedside Monitor", problem: "No ECG waveform while SpO₂ and NIBP remain available.",
    reward: 180, tools: ["Patient simulator", "Digital multimeter", "Known-good ECG cable"],
  },
  {
    id: "WO-1052", priority: "URGENT", departmentId: "icu", department: "Intensive Care Unit",
    device: "Guardian Bedside Monitor", problem: "NIBP inflates briefly, then stops with a leak error. ECG and SpO₂ remain available.",
    reward: 160, tools: ["Known-good NIBP cuff and hose", "Pneumatic leak tester", "Service checklist"],
  },
  {
    id: "PM-2044", priority: "ROUTINE", departmentId: "cardiology", department: "Cardiology",
    device: "Pulse External Defibrillator", problem: "Annual delivered-energy and charge-time verification is due.",
    reward: 125, tools: ["Defibrillator analyzer", "Electrical safety analyzer", "Inspection checklist"],
  },
  {
    id: "WO-1061", priority: "CRITICAL", departmentId: "or", department: "Operating Room",
    device: "AeroVent Anesthesia Ventilator", problem: "Low-pressure alarm appears during the pre-use leak test.",
    reward: 210, tools: ["Gas flow analyzer", "Test lung", "Known-good breathing circuit"],
  },
  {
    id: "WO-1073", priority: "HIGH", departmentId: "nicu", department: "NICU",
    device: "NeoFlow Syringe Pump", problem: "Pump reports downstream occlusion immediately after setup.",
    reward: 175, tools: ["Infusion device analyzer", "Approved syringe", "Occlusion test fixture"],
  },
  {
    id: "WO-1080", priority: "MEDIUM", departmentId: "imaging", department: "Imaging",
    device: "Portable Ultrasound System", problem: "System powers on, but the selected transducer is not detected.",
    reward: 150, tools: ["Known-good transducer", "Connector inspection light", "Service diagnostics"],
  },
];

function rankForXp(xp) {
  if (xp >= 15000) return "Chief Clinical Engineer";
  if (xp >= 10000) return "CBET Certified Professional";
  if (xp >= 6000) return "Clinical Engineering Specialist";
  if (xp >= 3000) return "Senior Biomedical Technician";
  if (xp >= 1500) return "Biomedical Technician II";
  if (xp >= 500) return "Biomedical Technician I";
  return "Biomedical Intern";
}

export default function CBETHospitalDashboard({
  xp = 0,
  progress = 0,
  badges = 0,
  streak = 1,
  onOpenTraining,
  onOpenLab,
  onOpenMission,
  onOpenStats,
}) {
  const [selectedDepartment, setSelectedDepartment] = useState("ed");
  const activeAssignmentRef = useRef(null);
  const [acceptedOrder, setAcceptedOrder] = useState(() => {
    try {
      const savedOrder = window.localStorage.getItem("cbetActiveWorkOrder");
      const supportedOrder = WORK_ORDERS.find(
        (order) => order.id === savedOrder && order.available !== false
      );
      return supportedOrder?.id || "WO-1048";
    } catch {
      return "WO-1048";
    }
  });

  const activeOrder = useMemo(
    () => WORK_ORDERS.find((order) => order.id === acceptedOrder) || WORK_ORDERS[0],
    [acceptedOrder]
  );

  useEffect(() => {
    const scrollToHospitalMap = () => {
      const map = document.getElementById("cbet-hospital-map");
      if (!map) return;

      map.scrollIntoView({
        behavior: "auto",
        block: "start",
        inline: "nearest",
      });
      window.scrollBy({ top: -18, left: 0, behavior: "auto" });
    };

    scrollToHospitalMap();
    const timers = [0, 80, 240, 600, 1000].map((delay) =>
      window.setTimeout(scrollToHospitalMap, delay)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const scrollToActiveAssignment = () => {
    window.setTimeout(() => {
      activeAssignmentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
  };

  const acceptOrder = (id, shouldScroll = true) => {
    const order = WORK_ORDERS.find((item) => item.id === id);
    if (!order) return;

    setAcceptedOrder(id);
    setSelectedDepartment(order.departmentId);
    try { window.localStorage.setItem("cbetActiveWorkOrder", id); } catch { /* optional */ }
    if (shouldScroll) scrollToActiveAssignment();
  };

  const selectDepartment = (departmentId) => {
    setSelectedDepartment(departmentId);
    const firstOrder = WORK_ORDERS.find((order) => order.departmentId === departmentId);
    if (firstOrder) acceptOrder(firstOrder.id, true);
  };

  return (
    <main className="hospital-engine">
      <header className="hospital-topbar">
        <div className="hospital-brand">
          <span className="hospital-brand-mark">MSB</span>
          <div>
            <strong>MedSkillBuilder</strong>
            <small>Biomedical Training Hospital</small>
          </div>
        </div>
        <div className="hospital-top-actions">
          <button type="button" onClick={onOpenStats}>View statistics</button>
          <button type="button" className="hospital-primary" onClick={onOpenTraining}>Training academy</button>
        </div>
      </header>

      <section className="hospital-hero">
        <div>
          <span className="hospital-eyebrow">Shift briefing</span>
          <h1>Welcome to Clinical Engineering</h1>
          <p>Choose a department, accept a service call, and complete a distinct troubleshooting assignment using realistic biomedical test equipment.</p>
          <div className="hospital-hero-actions">
            <button type="button" className="hospital-primary" onClick={() => onOpenMission(activeOrder.id)}>Continue active assignment</button>
            <button type="button" onClick={onOpenLab}>Open equipment lab</button>
          </div>
        </div>
        <aside className="hospital-profile-card">
          <span>Current role</span>
          <strong>{rankForXp(xp)}</strong>
          <div className="hospital-profile-stats">
            <div><b>{xp.toLocaleString()}</b><small>XP</small></div>
            <div><b>{badges}</b><small>Badges</small></div>
            <div><b>{streak}</b><small>Day streak</small></div>
          </div>
          <div className="hospital-progress"><i style={{ width: `${Math.min(progress, 100)}%` }} /></div>
          <small>{progress}% academy completion</small>
        </aside>
      </section>

      <section className="hospital-command-grid" id="cbet-hospital-map">
        <article className="hospital-panel hospital-map-panel">
          <div className="hospital-panel-heading">
            <div><span className="hospital-eyebrow">Hospital map</span><h2>Departments</h2></div>
            <span className="hospital-live-dot">Live</span>
          </div>
          <div className="hospital-map">
            {DEPARTMENTS.map((department) => (
              <button type="button"
                key={department.id}
                className={selectedDepartment === department.id ? "active" : ""}
                onClick={() => selectDepartment(department.id)}
              >
                <span>{department.icon}</span>
                <strong>{department.name}</strong>
                <small>{department.status}</small>
                <em className={`risk-${department.risk.toLowerCase()}`}>{department.risk}</em>
              </button>
            ))}
          </div>
        </article>

        <article ref={activeAssignmentRef} className="hospital-panel hospital-active-order">
          <div className="hospital-panel-heading">
            <div><span className="hospital-eyebrow">Active assignment</span><h2>{activeOrder.id}</h2></div>
            <span className={`priority priority-${activeOrder.priority.toLowerCase()}`}>{activeOrder.priority}</span>
          </div>
          <dl>
            <div><dt>Department</dt><dd>{activeOrder.department}</dd></div>
            <div><dt>Equipment</dt><dd>{activeOrder.device}</dd></div>
            <div><dt>Reported problem</dt><dd>{activeOrder.problem}</dd></div>
          </dl>
          <div className="hospital-tool-preview">
            <span>Recommended toolbox</span>
            {activeOrder.tools.map((tool) => <small key={tool}>✓ {tool}</small>)}
          </div>
          <div className="hospital-order-footer">
            <strong>+{activeOrder.reward} XP</strong>
            <button type="button" className="hospital-primary" onClick={() => onOpenMission(activeOrder.id)}>Begin assignment</button>
          </div>
        </article>
      </section>

      <section className="hospital-panel hospital-orders-panel">
        <div className="hospital-panel-heading">
          <div><span className="hospital-eyebrow">Service desk</span><h2>Open work orders</h2></div>
          <button type="button" onClick={onOpenTraining}>View training path</button>
        </div>
        <div className="hospital-order-list">
          {WORK_ORDERS.map((order) => (
            <article key={order.id} className={acceptedOrder === order.id ? "accepted" : ""}>
              <div className="hospital-order-id"><span className={`priority priority-${order.priority.toLowerCase()}`}>{order.priority}</span><strong>{order.id}</strong></div>
              <div><strong>{order.device}</strong><small>{order.department}</small></div>
              <p>{order.problem}</p>
              <div className="hospital-order-actions">
                <span>+{order.reward} XP</span>
                <button type="button" onClick={() => acceptOrder(order.id)}>
                  {acceptedOrder === order.id ? "Accepted" : "Accept call"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="hospital-shift-grid">
        <article className="hospital-panel">
          <span className="hospital-eyebrow">Today's shift</span>
          <h2>Assignment checklist</h2>
          <label><input type="checkbox" /> Complete one guided lesson</label>
          <label><input type="checkbox" /> Run one analyzer simulation</label>
          <label><input type="checkbox" /> Finish one applied case</label>
          <label><input type="checkbox" /> Review one missed concept</label>
        </article>
        <article className="hospital-panel hospital-career-panel">
          <span className="hospital-eyebrow">Career pathway</span>
          <h2>Next promotion</h2>
          <div className="career-route">
            <span className="complete">Biomedical Intern</span>
            <i />
            <span className={xp >= 500 ? "complete" : "current"}>Biomedical Technician I</span>
            <i />
            <span>Biomedical Technician II</span>
            <i />
            <span>Senior Biomedical Technician</span>
          </div>
          <button type="button" className="hospital-primary" onClick={onOpenTraining}>Build promotion progress</button>
        </article>
      </section>
    </main>
  );
}
