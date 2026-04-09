import React, { useState } from "react";

const questions = [
{ prefix: "brady", root: "cardia", meaning: "slow heart rate" },
{ prefix: "tachy", root: "pnea", meaning: "fast breathing" },
{ prefix: "hypo", root: "glycemia", meaning: "low blood sugar" },
{ prefix: "hyper", root: "tension", meaning: "high blood pressure" },
{ prefix: "hemi", root: "plegia", meaning: "paralysis on one side" },
{ prefix: "poly", root: "uria", meaning: "excessive urination" },
{ prefix: "oligo", root: "uria", meaning: "low urine output" },
{ prefix: "nephro", root: "logy", meaning: "study of kidneys" },
{ prefix: "hepato", root: "megaly", meaning: "enlarged liver" },
{ prefix: "derma", root: "itis", meaning: "skin inflammation" },
{ prefix: "leuko", root: "cytosis", meaning: "high white cells" },
{ prefix: "hemo", root: "lysis", meaning: "breakdown of blood" },
{ prefix: "cardio", root: "logy", meaning: "study of heart" },
{ prefix: "gastro", root: "itis", meaning: "stomach inflammation" },
{ prefix: "osteo", root: "porosis", meaning: "bone weakening" },
{ prefix: "arthro", root: "plasty", meaning: "joint repair" },
{ prefix: "neuro", root: "pathy", meaning: "nerve disease" },
{ prefix: "myo", root: "cardial", meaning: "heart muscle" },
{ prefix: "dermato", root: "logy", meaning: "skin study" },
{ prefix: "pulmo", root: "nary", meaning: "lungs" },
{ prefix: "thoraco", root: "centesis", meaning: "chest fluid removal" },
{ prefix: "reno", root: "vascular", meaning: "kidney vessels" },
{ prefix: "cyto", root: "logy", meaning: "cell study" },
{ prefix: "patho", root: "logy", meaning: "study of disease" },
{ prefix: "electro", root: "cardiogram", meaning: "heart tracing" },
{ prefix: "encephalo", root: "pathy", meaning: "brain disorder" },
{ prefix: "necro", root: "sis", meaning: "tissue death" },
{ prefix: "angi", root: "oplasty", meaning: "vessel repair" },
{ prefix: "hemat", root: "oma", meaning: "blood collection" },
{ prefix: "broncho", root: "scopy", meaning: "lung scope" },
{ prefix: "laparo", root: "scopy", meaning: "abdominal scope" },
{ prefix: "colono", root: "scopy", meaning: "colon scope" },
{ prefix: "tracheo", root: "stomy", meaning: "airway opening" },
{ prefix: "rhino", root: "plasty", meaning: "nose repair" },
{ prefix: "otitis", root: "media", meaning: "ear infection" },
{ prefix: "gluco", root: "meter", meaning: "blood sugar device" },
{ prefix: "phlebo", root: "tomy", meaning: "vein incision" },
{ prefix: "uro", root: "logy", meaning: "urinary study" },
{ prefix: "psycho", root: "logy", meaning: "mind study" },
{ prefix: "derm", root: "abrasion", meaning: "skin scraping" },
{ prefix: "vaso", root: "dilation", meaning: "vessel widening" },
{ prefix: "vaso", root: "constriction", meaning: "vessel narrowing" },
{ prefix: "hyper", root: "glycemia", meaning: "high blood sugar" },
{ prefix: "hypo", root: "tension", meaning: "low blood pressure" },
{ prefix: "tachy", root: "cardia", meaning: "fast heart rate" },
{ prefix: "brady", root: "pnea", meaning: "slow breathing" },
{ prefix: "multi", root: "cellular", meaning: "many cells" },
{ prefix: "mono", root: "cyte", meaning: "single cell" },
{ prefix: "peri", root: "cardium", meaning: "around heart" }
];

function shuffle(arr) {
return [...arr].sort(() => Math.random() - 0.5);
}

export default function MedTermBuilder() {
const [index, setIndex] = useState(0);
const [score, setScore] = useState(0);
const [choices, setChoices] = useState(shuffle(questions.map(q => q.root)).slice(0,4));
const [selected, setSelected] = useState(null);

const current = questions[index];

const next = () => {
setIndex(index + 1);
setSelected(null);
setChoices(shuffle(questions.map(q => q.root)).slice(0,4));
};

const handleSelect = (choice) => {
if (selected) return;
setSelected(choice);

```
if (choice === current.root) {
  setScore(score + 1);
}
```

};

if (index >= questions.length) {
return (
<div style={{ textAlign: "center", padding: 40 }}> <h2>Complete!</h2> <p>{score} / {questions.length}</p>
<button onClick={() => window.location.reload()}>Restart</button> </div>
);
}

return (
<div style={{ maxWidth: 600, margin: "auto", padding: 20 }}> <h2>Medical Terminology Builder</h2>

```
  <div style={{ marginBottom: 10 }}>
    Question {index + 1} / {questions.length}
  </div>

  <div style={{
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  }}>
    {current.prefix} + ?
  </div>

  {choices.map((c, i) => {
    const isCorrect = selected && c === current.root;
    const isWrong = selected === c && c !== current.root;

    return (
      <button
        key={i}
        onClick={() => handleSelect(c)}
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 10,
          background: isCorrect ? "#d4edda" : isWrong ? "#f8d7da" : "#eee",
          border: "1px solid #ccc",
          borderRadius: 8,
          fontWeight: "bold"
        }}
      >
        {c}
      </button>
    );
  })}

  {selected && (
    <div style={{ marginTop: 10 }}>
      <strong>{current.prefix + current.root}</strong> = {current.meaning}
    </div>
  )}

  <button
    onClick={next}
    style={{ marginTop: 20, width: "100%", padding: 12 }}
  >
    Next
  </button>
</div>
```

);
}
