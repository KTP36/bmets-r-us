export default function TerminologyChoices({ onWordParts, onQuick, onFull, onContinue, hasSavedProgress, questionCount }) {
  const cards = [
    ["Learn Word Parts", "Build your vocabulary with prefixes, suffixes, and term-building tools.", onWordParts, "📚"],
    ["Quick 5-Question Challenge", "Try five medical term definitions with immediate feedback and a score at the end.", onQuick, "⚡"],
    ["Full Hard Challenge", `Test yourself on ${questionCount} medical term definitions, then review your missed answers.`, onFull, "🧠"]
  ];
  return <section aria-labelledby="terminology-choices-heading">
    <h2 id="terminology-choices-heading" style={{color:"#12355b",textAlign:"center"}}>Choose Your Medical Terminology Practice</h2>
    <p style={{color:"#475569",lineHeight:1.6,textAlign:"center"}}>Learn how medical words are built, or challenge yourself to identify their meanings. Both challenges use the hard terminology question bank.</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,220px),1fr))",gap:16}}>
      {cards.map(([title,description,action,icon])=><button key={title} onClick={action} style={{minWidth:0,textAlign:"left",padding:22,borderRadius:18,border:"1px solid #bfdbfe",background:"#eff6ff",color:"#12355b",font:"inherit",cursor:"pointer"}}><span aria-hidden="true" style={{fontSize:28}}>{icon}</span><h3 style={{lineHeight:1.3}}>{title}</h3><p style={{color:"#475569",lineHeight:1.5}}>{description}</p><strong>Start →</strong></button>)}
    </div>
    {hasSavedProgress && <button onClick={onContinue} style={{display:"block",margin:"20px auto 0",padding:"12px 20px",borderRadius:12,border:"1px solid #12355b",background:"#12355b",color:"white",font:"inherit",fontWeight:800,cursor:"pointer"}}>Continue Saved Practice</button>}
  </section>;
}
