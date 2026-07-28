import React, { useMemo, useState } from "react";

function Panel({ title, subtitle, children, status }) {
  return (
    <section className="sim-panel">
      <header className="sim-panel-head">
        <div><span>SIMULATOR ENGINE</span><h3>{title}</h3><p>{subtitle}</p></div>
        {status && <strong className={`sim-status ${status.tone || ""}`}>{status.text}</strong>}
      </header>
      {children}
    </section>
  );
}

function DigitalMultimeter() {
  const [mode, setMode] = useState("VDC");
  const [redJack, setRedJack] = useState("VΩ");
  const [placement, setPlacement] = useState("parallel");
  const [fuseBlown, setFuseBlown] = useState(false);
  const sourceV = 12;
  const resistance = 220;
  const reading = useMemo(() => {
    if (fuseBlown && mode === "A") return "FUSE";
    if (mode === "VDC") return redJack === "VΩ" && placement === "parallel" ? `${sourceV.toFixed(2)} V` : "OL";
    if (mode === "A") {
      if (redJack !== "10A" || placement !== "series") return "⚠ FUSE";
      return `${(sourceV / resistance * 1000).toFixed(1)} mA`;
    }
    if (mode === "Ω") return redJack === "VΩ" && placement === "power-off" ? `${resistance} Ω` : "POWER OFF";
    return "---";
  }, [mode, redJack, placement, fuseBlown]);

  function test() {
    if (mode === "A" && (redJack !== "10A" || placement !== "series")) setFuseBlown(true);
  }
  const correct = (mode === "VDC" && redJack === "VΩ" && placement === "parallel") ||
    (mode === "A" && redJack === "10A" && placement === "series" && !fuseBlown) ||
    (mode === "Ω" && redJack === "VΩ" && placement === "power-off");

  return <Panel title="Digital Multimeter" subtitle="Choose the function, input jack, and probe placement." status={{text: fuseBlown ? "METER FUSE BLOWN" : correct ? "VALID SETUP" : "CHECK SETUP", tone: fuseBlown ? "bad" : correct ? "good" : "warn"}}>
    <div className="sim-dmm-grid">
      <div className={`sim-dmm ${fuseBlown ? "fault" : ""}`}>
        <div className="sim-lcd">{reading}</div>
        <div className="sim-dial"><span>{mode}</span></div>
        <div className="sim-button-row">{["VDC","A","Ω"].map(x=><button key={x} className={mode===x?"active":""} onClick={()=>setMode(x)}>{x}</button>)}</div>
        <div className="sim-jacks"><span>COM</span>{["VΩ","10A"].map(x=><button key={x} className={redJack===x?"active":""} onClick={()=>setRedJack(x)}>{x}</button>)}</div>
      </div>
      <div className="sim-controls">
        <h4>Probe placement</h4>
        {[['parallel','Across component'],['series','In series'],['power-off','Power removed']].map(([v,l])=><button key={v} className={placement===v?"active":""} onClick={()=>setPlacement(v)}>{l}</button>)}
        <button className="sim-action" onClick={test}>Take Measurement</button>
        {fuseBlown && <button onClick={()=>setFuseBlown(false)}>Replace Meter Fuse</button>}
      </div>
    </div>
  </Panel>;
}

function Oscilloscope() {
  const [volts, setVolts] = useState(2);
  const [time, setTime] = useState(5);
  const [trigger, setTrigger] = useState(1.5);
  const stable = volts >= 1 && volts <= 3 && time >= 3 && time <= 7 && trigger >= .5 && trigger <= 2.5;
  const amp = Math.max(18, Math.min(65, 72 / volts));
  const cycles = Math.max(1, Math.min(7, 22 / time));
  const path = Array.from({length:121},(_,i)=>{
    const x=i*5; const y=80-Math.sin((i/120)*Math.PI*2*cycles)*amp + (stable?0:Math.sin(i*1.8)*5);
    return `${i?'L':'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
  return <Panel title="Oscilloscope Trainer" subtitle="Adjust vertical scale, time base, and trigger until the waveform is stable." status={{text:stable?"WAVEFORM LOCKED":"UNSTABLE",tone:stable?"good":"warn"}}>
    <div className="sim-scope-screen"><div className="sim-grid"/><svg viewBox="0 0 600 160"><path d={path}/></svg></div>
    <div className="sim-knob-grid">
      <label>Volts/div <strong>{volts.toFixed(1)}</strong><input type="range" min=".5" max="8" step=".5" value={volts} onChange={e=>setVolts(+e.target.value)}/></label>
      <label>Time/div <strong>{time} ms</strong><input type="range" min="1" max="20" value={time} onChange={e=>setTime(+e.target.value)}/></label>
      <label>Trigger <strong>{trigger.toFixed(1)} V</strong><input type="range" min="-2" max="5" step=".5" value={trigger} onChange={e=>setTrigger(+e.target.value)}/></label>
    </div>
  </Panel>;
}

function SafetyAnalyzer() {
  const [test, setTest] = useState("earth");
  const [run, setRun] = useState(false);
  const values = {earth:["0.18 Ω",true,"Protective-earth resistance"], leakage:["612 µA",false,"Chassis leakage"], patient:["42 µA",true,"Patient leakage"]};
  const [value, pass, label] = values[test];
  return <Panel title="Electrical Safety Analyzer" subtitle="Run each test and decide whether the device may return to service." status={run?{text:pass?"PASS":"FAIL — REMOVE FROM SERVICE",tone:pass?"good":"bad"}:null}>
    <div className="sim-analyzer-grid"><div className="sim-lcd large"><small>{label}</small>{run?value:"READY"}</div><div className="sim-controls">{Object.keys(values).map(x=><button key={x} className={test===x?"active":""} onClick={()=>{setTest(x);setRun(false)}}>{x}</button>)}<button className="sim-action" onClick={()=>setRun(true)}>Run Test</button></div></div>
  </Panel>;
}

function PatientSimulator() {
  const [rhythm,setRhythm]=useState("Sinus"); const [rate,setRate]=useState(72);
  const rhythmClass=rhythm.toLowerCase().replace(/\s/g,'-');
  return <Panel title="Patient Simulator" subtitle="Send a known rhythm to a patient monitor and verify its response." status={{text:`${rhythm} • ${rate} BPM`,tone:"good"}}>
    <div className="sim-monitor"><div className={`sim-ecg ${rhythmClass}`}><i/><i/><i/><i/></div><strong>{rhythm==="Asystole"?0:rate}</strong><span>BPM</span></div>
    <div className="sim-button-row">{["Sinus","VTach","VFib","Asystole"].map(x=><button key={x} className={rhythm===x?"active":""} onClick={()=>setRhythm(x)}>{x}</button>)}</div>
    <label>Rate <strong>{rate} bpm</strong><input type="range" min="30" max="220" value={rate} onChange={e=>setRate(+e.target.value)}/></label>
  </Panel>;
}

function InfusionAnalyzer() {
  const [programmed,setProgrammed]=useState(125); const [running,setRunning]=useState(false); const measured=Math.round(programmed*.944); const error=Math.abs(measured-programmed)/programmed*100; const pass=error<=5;
  return <Panel title="Infusion Device Analyzer" subtitle="Program the pump, start the test, and evaluate flow accuracy." status={running?{text:pass?"WITHIN ±5%":"OUT OF TOLERANCE",tone:pass?"good":"bad"}:null}>
    <div className="sim-analyzer-grid"><div className="sim-pump"><div className="sim-fluid" style={{height:running?"32%":"78%"}}/><strong>{programmed}</strong><span>mL/hr</span></div><div className="sim-controls"><label>Programmed rate<input type="range" min="25" max="500" step="5" value={programmed} onChange={e=>{setProgrammed(+e.target.value);setRunning(false)}}/></label><div className="sim-readout">Measured: <strong>{running?`${measured} mL/hr`:'--'}</strong><small>{running?`${error.toFixed(1)}% error`:''}</small></div><button className="sim-action" onClick={()=>setRunning(true)}>Start Flow Test</button></div></div>
  </Panel>;
}

function DefibrillatorAnalyzer() {
  const [energy,setEnergy]=useState(200); const [charged,setCharged]=useState(false); const [delivered,setDelivered]=useState(null); const measured=Math.round(energy*.98); const pass=delivered!==null && Math.abs(measured-energy)/energy<=.15;
  return <Panel title="Defibrillator Analyzer" subtitle="Select energy, charge the device, and discharge into the rated analyzer." status={delivered!==null?{text:pass?"ENERGY PASS":"ENERGY FAIL",tone:pass?"good":"bad"}:{text:charged?"CHARGED":"STANDBY",tone:charged?"warn":""}}>
    <div className="sim-defib-grid"><div className={`sim-defib ${charged?'charged':''}`}><div className="sim-lcd large">{delivered!==null?`${measured} J`:charged?"READY":`${energy} J`}</div><div className="sim-paddles">⚡</div></div><div className="sim-controls"><div className="sim-button-row">{[100,200,300,360].map(x=><button key={x} className={energy===x?"active":""} onClick={()=>{setEnergy(x);setCharged(false);setDelivered(null)}}>{x} J</button>)}</div><button className="sim-action" onClick={()=>{setCharged(true);setDelivered(null)}}>Charge</button><button disabled={!charged} onClick={()=>{setDelivered(measured);setCharged(false)}}>Deliver Shock to Analyzer</button></div></div>
  </Panel>;
}

function ProcessAnalyzer() {
  const [type,setType]=useState("Pressure"); const [reference,setReference]=useState(50); const measured=reference*.988; const error=(measured-reference)/reference*100;
  return <Panel title="Pressure, Flow & Temperature Analyzer" subtitle="Apply traceable reference points and compare device response across its range." status={{text:`${Math.abs(error).toFixed(1)}% ERROR`,tone:Math.abs(error)<=2?"good":"bad"}}>
    <div className="sim-analyzer-grid"><div className="sim-lcd large"><small>{type}</small>{measured.toFixed(1)}<span>Measured</span></div><div className="sim-controls"><div className="sim-button-row">{["Pressure","Flow","Temperature"].map(x=><button key={x} className={type===x?"active":""} onClick={()=>setType(x)}>{x}</button>)}</div><label>Reference point <strong>{reference}</strong><input type="range" min="10" max="100" step="10" value={reference} onChange={e=>setReference(+e.target.value)}/></label><div className="sim-readout">Reference: <strong>{reference.toFixed(1)}</strong></div></div></div>
  </Panel>;
}

export default function CBETSimulatorEngine({ type }) {
  if(type==="dmm") return <DigitalMultimeter/>;
  if(type==="scope") return <Oscilloscope/>;
  if(type==="safety") return <SafetyAnalyzer/>;
  if(type==="simulator") return <PatientSimulator/>;
  if(type==="infusion") return <InfusionAnalyzer/>;
  if(type==="defib") return <DefibrillatorAnalyzer/>;
  if(type==="process") return <ProcessAnalyzer/>;
  return null;
}
