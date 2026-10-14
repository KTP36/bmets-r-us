import React from 'react';
export default function VoltageBench({supplyOn, voltage, selectedProbe, blackPoint, redPoint, onPower, onVoltage, onPoint, onDisconnect, action, diagnosis, onDiagnosis}) {
  const points = [{id:'ground', x:210, color:'#20252c', name:'Negative (−)'}, {id:'output', x:410, color:'#d73e39', name:'Positive (+)'}];
  return <section className="vl-voltage-fixture" aria-label="DC power supply training bench">
    <div className="vl-voltage-heading"><strong>DC POWER SUPPLY BENCH</strong><span>Simulated • 0–15 V DC</span></div>
    <svg viewBox="0 0 620 390" role="img" aria-label="Bench power supply with positive and negative output terminals and probe tips">
      <defs><linearGradient id="voltage-case" x2="0.8" y2="1"><stop stopColor="#d9e0e4"/><stop offset="1" stopColor="#697983"/></linearGradient><linearGradient id="voltage-probe"><stop stopColor="#71808a"/><stop offset=".3" stopColor="#e4edf2"/><stop offset="1" stopColor="#657680"/></linearGradient><pattern id="voltage-mat" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#29433e" strokeWidth=".8"/></pattern></defs>
      <rect width="620" height="390" fill="#142c28"/><rect width="620" height="390" fill="url(#voltage-mat)"/>
      <rect x="66" y="58" width="494" height="259" rx="20" fill="#000" opacity=".35"/>
      <rect x="56" y="42" width="504" height="263" rx="18" fill="url(#voltage-case)" stroke="#c4cdd4" strokeWidth="2"/>
      <rect x="77" y="63" width="462" height="220" rx="9" fill="#283440"/>
      <text x="100" y="89" fill="#d5dee7" fontSize="15" fontFamily="sans-serif">MSB · DC BENCH SUPPLY</text>
      <rect x="100" y="106" width="230" height="73" rx="7" fill="#071e23" stroke="#536c77" strokeWidth="4"/>
      <text x="119" y="151" fill={supplyOn?'#7ef9ce':'#58746e'} fontSize="34" fontFamily="monospace">{voltage.toFixed(1)} V</text>
      <text x="116" y="170" fill="#829da6" fontSize="10" fontFamily="sans-serif">SETPOINT · {supplyOn?'OUTPUT ENABLED':'OUTPUT OFF'}</text>
      <circle cx="449" cy="136" r="35" fill="#101923" stroke="#73848f" strokeWidth="4"/><circle cx="449" cy="136" r="25" fill="#35434f"/><path d="M449 111v17" stroke="#d4e1e9" strokeWidth="4"/>
      <text x="400" y="186" fill="#b8c8d2" fontSize="11" fontFamily="sans-serif">VOLTAGE SETPOINT</text>
      {points.map(p=><g key={p.id}><circle cx={p.x} cy="230" r="25" fill="#a1b0b8"/><circle cx={p.x} cy="230" r="20" fill={p.color}/><circle cx={p.x} cy="230" r="8" fill="#0b1118" stroke="#87949e" strokeWidth="3"/><text x={p.x} y="199" textAnchor="middle" fill="#e6edf3" fontSize="14" fontFamily="sans-serif">{p.name}</text></g>)}
      {[['black',blackPoint,'#151a22',18],['red',redPoint,'#e04743',-18]].map(([probe,point,color,offset])=>point&&<g key={probe} transform={`translate(${points.find(p=>p.id===point).x+(blackPoint===redPoint?offset:0)},230)`}><path d="M0 88 C0 125 70 124 80 160" fill="none" stroke="#070c11" strokeWidth="10"/><path d="M0 88 C0 125 70 124 80 160" fill="none" stroke={color} strokeWidth="6"/><path d="M0 0v25" stroke="url(#voltage-probe)" strokeWidth="4"/><rect x="-9" y="25" width="18" height="63" rx="6" fill={color} stroke="#9eabb5"/><path d="M-13 31h26" stroke={color} strokeWidth="7"/></g>)}
    </svg>
    <div className="vl-voltage-controls"><button type="button" className={action==='power'?'target-highlight':''} onClick={onPower}>Output {supplyOn?'ON':'OFF'}</button><label>Set voltage <select aria-label="Supply voltage setpoint" value={voltage} onChange={e=>onVoltage(Number(e.target.value))}>{[0,5,9,12,15].map(v=><option key={v} value={v}>{v.toFixed(1)} V</option>)}</select></label></div>
    <div className="vl-voltage-terminals">{points.map(p=><button type="button" key={p.id} onClick={()=>onPoint(p.id)} className={(blackPoint===p.id||redPoint===p.id)?'contacted':''}><span className={p.id==='output'?'positive':'negative'}>●</span><strong>{p.name} terminal</strong><small>{blackPoint===p.id?'Black probe ':''}{redPoint===p.id?'Red probe ':''}{blackPoint!==p.id&&redPoint!==p.id?'No probe contact':''}</small></button>)}</div>
    <p className="vl-voltage-help">{selectedProbe?`Selected: ${selectedProbe} probe. Choose a terminal.`:'Select a probe below the meter, then touch a terminal.'} Voltage is measured in parallel. Both probes on one terminal measure 0.0 V; reversed leads give a negative reading.</p>
    <div className="vl-voltage-controls"><button type="button" disabled={!blackPoint} onClick={()=>onDisconnect('black')}>Lift black probe</button><button type="button" disabled={!redPoint} onClick={()=>onDisconnect('red')}>Lift red probe</button></div>
    {action==='diagnose'&&<div className="vl-diagnosis"><strong>Equipment requires 12.0 V DC. What does the measured output indicate?</strong>{['Output within specification','Output below specification'].map(option=><button type="button" key={option} className={diagnosis===option?'selected':''} onClick={()=>onDiagnosis(option)}>{option}</button>)}</div>}
    <p className="vl-voltage-help">Training simulation only. The supply display shows its setpoint; verify the output using the meter. For this exercise, 12.0 V is required exactly.</p>
  </section>;
}
