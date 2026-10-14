export default function ContinuityBench({ selectedProbe, blackPoint, redPoint, isolationVerified, action, diagnosisOptions, diagnosis, onPoint, onDisconnect, onVerifyIsolation, onDiagnosis, soundEnabled, onSoundToggle, audioUnavailable }) {
  const tip = (point, color, offset) => {
    if (!point) return null;
    const x = point === "left" ? 182 : 418;
    return <g aria-hidden="true"><path d={`M ${color === "red" ? 570 : 35} 345 C ${color === "red" ? 540 : 60} 220, ${x + offset} 270, ${x + offset} 195`} fill="none" stroke={color === "red" ? "#ef4444" : "#111827"} strokeWidth="8" strokeLinecap="round"/><path d={`M ${x + offset} 195 L ${x} 158`} stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round"/><path d={`M ${x + offset} 227 L ${x + offset} 187`} stroke={color === "red" ? "#b91c1c" : "#1f2937"} strokeWidth="17" strokeLinecap="round"/></g>;
  };
  return <section className="vl-circuit-column vl-real-bench" aria-labelledby="continuity-bench-heading">
    <div className="vl-workbench-heading"><div><span>Service bench · F1</span><strong id="continuity-bench-heading">Isolated Fuse Test</strong></div></div>
    <div className="vl-real-fixture">
      <div className="vl-fixture-top"><span>REMOVED FROM EQUIPMENT</span><span className={isolationVerified ? "verified" : ""}>{isolationVerified ? "Isolation confirmed" : "Verify isolation"}</span></div>
      <svg viewBox="0 0 600 350" role="img" aria-label="Glass cartridge fuse in an isolated test holder, with probes shown at their selected terminals">
        <defs><linearGradient id="fuseMetal" x2="0" y2="1"><stop stopColor="#f8fafc"/><stop offset=".3" stopColor="#94a3b8"/><stop offset=".6" stopColor="#f1f5f9"/><stop offset="1" stopColor="#475569"/></linearGradient><linearGradient id="fuseGlass" x2="0" y2="1"><stop stopColor="#e2e8f0" stopOpacity=".9"/><stop offset=".5" stopColor="#94a3b8" stopOpacity=".2"/><stop offset="1" stopColor="#e2e8f0" stopOpacity=".7"/></linearGradient><pattern id="matGrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#355344" strokeWidth=".5"/></pattern></defs>
        <rect x="0" y="0" width="600" height="350" rx="16" fill="#203b31"/><rect width="600" height="350" rx="16" fill="url(#matGrid)"/>
        <text x="25" y="35" fill="#a5b5ae" fontSize="12" fontFamily="monospace">ESD WORK SURFACE / TRAINING FIXTURE</text>
        <rect x="125" y="106" width="350" height="117" rx="14" fill="#101a1e" stroke="#52616b" strokeWidth="3"/>
        {[143,457].map(x=><g key={x}><circle cx={x} cy="121" r="6" fill="#94a3b8"/><path d={`M${x-3} 121h6`} stroke="#334155" strokeWidth="2"/></g>)}
        <rect x="207" y="132" width="186" height="49" rx="12" fill="url(#fuseGlass)" stroke="#b5c8d0"/>
        <path d="M219 140h160" stroke="#fff" strokeOpacity=".45" strokeWidth="3"/>
        <path d="M227 157h146" stroke="#c6cbd0" strokeOpacity=".38" strokeWidth="1.5"/>
        <rect x="169" y="130" width="49" height="53" rx="7" fill="url(#fuseMetal)"/><rect x="382" y="130" width="49" height="53" rx="7" fill="url(#fuseMetal)"/>
        <text x="300" y="206" textAnchor="middle" fill="#91a4ae" fontSize="12" fontFamily="monospace">F1 · CARTRIDGE FUSE</text>
        {tip(blackPoint,"black",-13)}{tip(redPoint,"red",13)}
        <text x="182" y="263" textAnchor="middle" fill="#d8e5de" fontSize="13">LEFT CONTACT</text><text x="418" y="263" textAnchor="middle" fill="#d8e5de" fontSize="13">RIGHT CONTACT</text>
      </svg>
      <div className="vl-fixture-contacts">{["left","right"].map(point=><button key={point} type="button" onClick={()=>onPoint(point)} className={(blackPoint===point||redPoint===point)?"contacted":""}><span className="vl-metal-contact"/><strong>{point === "left" ? "Left" : "Right"} contact</strong><small>{[blackPoint===point&&"Black",redPoint===point&&"Red"].filter(Boolean).join(" + ") || "Touch with selected probe"}</small></button>)}</div>
      <p className="vl-bench-help">{selectedProbe ? `${selectedProbe === "black" ? "Black" : "Red"} probe selected. Touch a contact.` : "Select a probe, then touch a contact."} Either polarity works across the fuse. Both probes on one contact test the leads, not the fuse.</p>
      <div className="vl-bench-controls"><button type="button" className={action==="poweroff"?"target-highlight":""} onClick={onVerifyIsolation}>Verify fixture is disconnected</button><button type="button" disabled={!blackPoint} onClick={()=>onDisconnect("black")}>Lift black probe</button><button type="button" disabled={!redPoint} onClick={()=>onDisconnect("red")}>Lift red probe</button><button type="button" aria-pressed={soundEnabled} onClick={onSoundToggle}>{soundEnabled?"Sound on":"Sound muted"}</button></div>
      {audioUnavailable&&<p role="status" className="vl-bench-help">Audio is unavailable in this browser. Use the meter reading and continuity indicator.</p>}
    </div>
    <div className="vl-diagnosis"><span>Diagnosis · use the meter evidence</span><div>{diagnosisOptions.map(option=><button key={option} type="button" className={diagnosis===option?"selected":""} onClick={()=>onDiagnosis(option)}>{option}</button>)}</div></div>
  </section>;
}
