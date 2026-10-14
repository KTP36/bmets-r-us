import React from 'react';
export default function ResistanceBench({selectedProbe,blackPoint,redPoint,isolationVerified,action,diagnosis,onPoint,onDisconnect,onVerify,onDiagnosis}) {
 const points=[{id:'left',x:150,name:'Left lead'},{id:'right',x:470,name:'Right lead'}];
 return <section className="vl-voltage-fixture" aria-label="Isolated resistor measurement bench">
  <div className="vl-voltage-heading"><strong>RESISTOR TEST BENCH</strong><span>{isolationVerified?'Isolation verified':'Verify isolation'}</span></div>
  <svg viewBox="0 0 620 340" role="img" aria-label="A one kilohm resistor with brown, black, red and gold bands, isolated from equipment">
   <defs><linearGradient id="resistor-body" x2="0" y2="1"><stop stopColor="#e0c695"/><stop offset=".4" stopColor="#f3ddb1"/><stop offset="1" stopColor="#9e7950"/></linearGradient><linearGradient id="resistor-metal" x2="0" y2="1"><stop stopColor="#627480"/><stop offset=".5" stopColor="#edf4f7"/><stop offset="1" stopColor="#536472"/></linearGradient><pattern id="resistor-mat" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" stroke="#2f5148" strokeWidth=".8" fill="none"/></pattern></defs>
   <rect width="620" height="340" fill="#15362e"/><rect width="620" height="340" fill="url(#resistor-mat)"/>
   <rect x="63" y="71" width="494" height="169" rx="14" fill="#253441" stroke="#6c8290" strokeWidth="2"/>
   <text x="310" y="101" textAnchor="middle" fill="#a8c0cd" fontSize="13" fontFamily="sans-serif">REMOVED FROM EQUIPMENT · NO POWER SOURCE</text>
   <path d="M150 160H470" stroke="url(#resistor-metal)" strokeWidth="8"/>
   <path d="M245 138Q230 130 223 150V171Q230 192 245 182H375Q390 192 397 171V150Q390 130 375 138Z" fill="url(#resistor-body)" stroke="#9b7b51" strokeWidth="2"/>
   {[['#6f3824',253],['#15191d',282],['#ce3432',311],['#d6aa37',361]].map(([color,x])=><rect key={x} x={x} y="137" width="12" height="46" fill={color}/>)}
   {points.map(p=><g key={p.id}><circle cx={p.x} cy="160" r="18" fill="url(#resistor-metal)"/><circle cx={p.x} cy="160" r="6" fill="#253441"/><text x={p.x} y="132" textAnchor="middle" fill="#e4eef4" fontSize="13" fontFamily="sans-serif">{p.name}</text></g>)}
   {[['black',blackPoint,'#171e26',-12],['red',redPoint,'#e54842',12]].map(([probe,point,color,offset])=>point&&<g key={probe} transform={`translate(${points.find(p=>p.id===point).x+(blackPoint===redPoint?offset:0)},160)`}><path d="M0 25V0" stroke="url(#resistor-metal)" strokeWidth="4"/><rect x="-9" y="25" width="18" height="66" rx="6" fill={color} stroke="#7e95a2"/><path d="M-13 31H13" stroke={color} strokeWidth="7"/><path d="M0 91Q0 133 65 180" stroke={color} strokeWidth="7" fill="none"/></g>)}
  </svg>
  <p className="vl-resistor-rating"><strong>1 kΩ ±5%</strong> · Brown / Black / Red / Gold<br/>Acceptable range: <strong>950–1,050 Ω</strong></p>
  <div className="vl-voltage-controls"><button type="button" className={action==='poweroff'?'target-highlight':''} onClick={onVerify}>Verify power off and isolation</button></div>
  <div className="vl-voltage-terminals">{points.map(p=><button type="button" key={p.id} className={blackPoint===p.id||redPoint===p.id?'contacted':''} onClick={()=>onPoint(p.id)}><span>●</span><strong>{p.name}</strong><small>{blackPoint===p.id?'Black probe ':''}{redPoint===p.id?'Red probe ':''}{blackPoint!==p.id&&redPoint!==p.id?'No contact':''}</small></button>)}</div>
  <p className="vl-voltage-help">{selectedProbe?`${selectedProbe} probe selected. Touch a metal lead.`:'Select a probe, then touch a metal lead.'} Either probe polarity works. Both probes on one lead check the leads, not the resistor.</p>
  <div className="vl-voltage-controls"><button type="button" disabled={!blackPoint} onClick={()=>onDisconnect('black')}>Lift black probe</button><button type="button" disabled={!redPoint} onClick={()=>onDisconnect('red')}>Lift red probe</button></div>
  {action==='diagnose'&&<div className="vl-diagnosis"><strong>Compare the measured value with the rating.</strong>{['Within tolerance','Outside tolerance','Open resistor','Shorted resistor'].map(option=><button type="button" key={option} className={diagnosis===option?'selected':''} onClick={()=>onDiagnosis(option)}>{option}</button>)}</div>}
  <p className="vl-voltage-help">Simulated fault condition. Confirm equipment is de-energized, stored energy is safely discharged, and the resistor is isolated before measuring resistance. An in-circuit reading can be affected by parallel paths. OL can also mean poor contact—verify both probes touch opposite leads.</p>
 </section>;
}
