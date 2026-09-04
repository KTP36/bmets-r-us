// Clinically revised September 4, 2026.
// Supplemental education only; local policy, scope, orders, and supervised competency validation govern clinical practice.
export const nursingAssessmentModules = [
  {
    "number": 1,
    "title": "Assessment Foundations",
    "description": "Baseline, focused vs. comprehensive assessment, subjective/objective data, sequence, reassessment, and escalation.",
    "badge": "Assessment Foundations Specialist",
    "icon": "🧭"
  },
  {
    "number": 2,
    "title": "Vital Signs, Pain & General Survey",
    "description": "Interpret trends, recognize conflicting findings, assess pain safely, and identify early deterioration.",
    "badge": "Clinical Observation Specialist",
    "icon": "📈"
  },
  {
    "number": 3,
    "title": "Neurological Assessment",
    "description": "Mental status, pupils, strength, sensation, GCS concepts, stroke red flags, and change from baseline.",
    "badge": "Neurological Assessment Specialist",
    "icon": "🧠"
  },
  {
    "number": 4,
    "title": "Respiratory Assessment",
    "description": "Work of breathing, oxygenation, lung sounds, respiratory pattern, and recognition of worsening status.",
    "badge": "Respiratory Assessment Specialist",
    "icon": "🫁"
  },
  {
    "number": 5,
    "title": "Cardiovascular & Peripheral Vascular",
    "description": "Perfusion, pulses, edema, heart sounds, capillary refill, and hemodynamic clues.",
    "badge": "Cardiovascular Assessment Specialist",
    "icon": "❤️"
  },
  {
    "number": 6,
    "title": "Abdominal, GI & GU Assessment",
    "description": "Abdominal sequence, bowel sounds, distention, tenderness, urinary findings, and output trends.",
    "badge": "GI & GU Assessment Specialist",
    "icon": "🩺"
  },
  {
    "number": 7,
    "title": "Skin, Wounds & Musculoskeletal",
    "description": "Skin integrity, pressure injury risk, wounds, mobility, falls, ROM, and neurovascular checks.",
    "badge": "Skin & Mobility Assessment Specialist",
    "icon": "🦴"
  },
  {
    "number": 8,
    "title": "Head-to-Toe Clinical Judgment",
    "description": "Integrated patient assessment, prioritization, deterioration patterns, reassessment, and escalation.",
    "badge": "Clinical Assessment Specialist",
    "icon": "🏥"
  }
];

export const nursingModuleContent = {
  "1": {
    "briefing": {
      "title": "Assessment Foundations",
      "summary": "Baseline, focused vs. comprehensive assessment, subjective/objective data, sequence, reassessment, and escalation.",
      "objectives": [
        "Start With the Patient, Not the Checklist",
        "Subjective and Objective Data",
        "Comprehensive vs. Focused Assessment",
        "Sequence With Purpose"
      ]
    },
    "lessons": [
      {
        "title": "Begin With Safety and Permission",
        "body": "Before assessment, use two patient identifiers, perform hand hygiene, use indicated PPE, explain the assessment, protect privacy, obtain the patient’s cooperation or consent as applicable, and clean shared equipment according to facility policy.",
        "takeaway": "Safe assessment begins before the first clinical finding."
      },
      {
        "title": "Start With the Patient, Not the Checklist",
        "body": "A complete assessment is organized, but it is not mechanical. Begin with the patient’s appearance, immediate safety, reason for care, and known baseline. A checklist should support clinical thinking—not override an obvious change in condition.",
        "takeaway": "A change from baseline can matter more than whether a number falls inside a reference range."
      },
      {
        "title": "Subjective and Objective Data",
        "body": "Subjective data are reported by the patient or caregiver. Objective data are observed, measured, or verified. Strong assessment connects both: a patient saying “I feel different” may be clinically important even before a dramatic vital-sign change appears.",
        "takeaway": "Do not dismiss a patient-reported change simply because the first objective measure looks normal."
      },
      {
        "title": "Comprehensive vs. Focused Assessment",
        "body": "A comprehensive assessment establishes a broad baseline. A focused assessment targets a current problem, body system, or change. A focused assessment should expand when findings suggest a wider problem.",
        "takeaway": "The scope of assessment changes when the patient changes."
      },
      {
        "title": "Sequence With Purpose",
        "body": "Inspection generally comes first. Palpation, percussion, and auscultation are used according to the body system and purpose. The abdomen is a classic exception in which auscultation occurs before percussion and palpation to avoid altering bowel activity.",
        "takeaway": "Assessment sequence is not trivia; it protects the quality of the data you collect."
      },
      {
        "title": "Reassess After an Intervention",
        "body": "An intervention is incomplete until its effect is evaluated. Reassessment should target the problem you were trying to change and should occur soon enough to detect improvement, failure, or deterioration. Escalation routes and triggers must follow the learner’s role, organizational policy, and chain of command.",
        "takeaway": "“Done” is not the same as “effective.”"
      }
    ],
    "scenarios": [
      {
        "title": "Assess First",
        "patient": "A postoperative patient says, “Something feels wrong.” BP is 118/72, HR 92, RR 20, SpO₂ 96%. The patient is pale and newly restless.",
        "question": "What is the best next action?",
        "options": [
          "Document that vital signs are normal and continue rounds",
          "Perform a focused reassessment for the new change and compare with baseline",
          "Ask the patient to rest for 30 minutes",
          "Repeat only the blood pressure"
        ],
        "answer": 1,
        "explanation": "The new pallor and restlessness are changes from baseline. Normal-looking vital signs do not eliminate the need for a focused reassessment."
      },
      {
        "title": "What Did the Nurse Miss?",
        "patient": "A nurse completes a pain intervention and documents the medication administration but no follow-up assessment.",
        "question": "What is missing?",
        "options": [
          "A full admission history",
          "Reassessment of pain and relevant safety findings",
          "A second medication order",
          "A new diagnosis"
        ],
        "answer": 1,
        "explanation": "The effectiveness and safety of an intervention must be reassessed."
      },
      {
        "title": "Focused or Comprehensive?",
        "patient": "A stable patient reports sudden new left calf pain and swelling.",
        "question": "Which approach is best?",
        "options": [
          "Repeat the entire admission assessment before looking at the leg",
          "Perform a focused vascular/neurovascular assessment and escalate concerning findings",
          "Only ask for a pain score",
          "Wait until the next scheduled head-to-toe assessment"
        ],
        "answer": 1,
        "explanation": "A new focal problem requires timely focused assessment; the scope can expand based on findings."
      }
    ],
    "questions": [
      {
        "question": "A patient’s baseline systolic BP is usually 150–160. Today it is 112, and the patient is dizzy. Which interpretation is best?",
        "options": [
          "112 is normal, so no concern",
          "The change from baseline plus symptoms is clinically important",
          "Only values below 90 matter",
          "Dizziness is unrelated to BP"
        ],
        "answer": 1,
        "explanation": "A large change from baseline with symptoms deserves evaluation even if the absolute value is not profoundly low."
      },
      {
        "question": "Which finding is subjective?",
        "options": [
          "Temperature 38.1°C",
          "Patient reports “my chest feels tight”",
          "RR 28/min",
          "Left ankle visibly swollen"
        ],
        "answer": 1,
        "explanation": "Patient-reported symptoms are subjective data."
      },
      {
        "question": "A focused assessment should expand when:",
        "options": [
          "The nurse wants more documentation",
          "Findings suggest a broader or more serious problem",
          "The patient is asleep",
          "The shift is almost over"
        ],
        "answer": 1,
        "explanation": "New or concerning findings should change the scope of assessment."
      },
      {
        "question": "Which abdominal sequence is correct?",
        "options": [
          "Inspect, palpate, auscultate, percuss",
          "Inspect, auscultate, percuss, palpate",
          "Auscultate, inspect, palpate, percuss",
          "Palpate, percuss, inspect, auscultate"
        ],
        "answer": 1,
        "explanation": "Auscultation precedes percussion and palpation for the abdomen."
      },
      {
        "question": "Which statement best describes reassessment?",
        "options": [
          "Optional if the intervention was ordered",
          "Used to determine response and detect failure or deterioration",
          "Only needed after medication",
          "The same as repeating a full admission assessment"
        ],
        "answer": 1,
        "explanation": "Reassessment evaluates whether the intervention achieved its goal and whether the condition changed."
      },
      {
        "question": "A patient says “I feel worse” but the monitor values are unchanged. Best response?",
        "options": [
          "Ignore the report",
          "Perform a focused reassessment and compare with baseline",
          "Tell the patient the monitor is normal",
          "Wait until the next shift"
        ],
        "answer": 1,
        "explanation": "A patient-reported change is assessment data and deserves evaluation."
      }
    ]
  },
  "2": {
    "briefing": {
      "title": "Vital Signs, Pain & General Survey",
      "summary": "Interpret trends, recognize conflicting findings, assess pain safely, and identify early deterioration.",
      "objectives": [
        "Trends Beat Snapshots",
        "General Survey First",
        "Pain Is More Than a Number",
        "Conflicting Findings Require Verification"
      ]
    },
    "lessons": [
      {
        "title": "Trends Beat Snapshots",
        "body": "A single vital sign is useful; a trend is usually more informative. A heart rate rising from 76 to 104 may be significant even if the patient has no dramatic symptom yet. Unexpected values should be repeated using correct technique and appropriate equipment size and placement while the patient is assessed.",
        "takeaway": "Look for direction, speed of change, and the patient context."
      },
      {
        "title": "General Survey First",
        "body": "Before touching equipment, notice posture, skin color, work of breathing, level of distress, speech, mobility, and interaction. The general survey can reveal instability before the monitor does.",
        "takeaway": "Appearance and behavior are assessment data."
      },
      {
        "title": "Pain Is More Than a Number",
        "body": "Assess location, quality, onset, duration, provoking/relieving factors, associated symptoms, functional impact, and response to treatment. A pain score without context can be misleading. Reassessment timing depends on the intervention, orders, patient condition, and organizational policy.",
        "takeaway": "Pain assessment asks what the pain means for this patient now."
      },
      {
        "title": "Conflicting Findings Require Verification",
        "body": "If a monitor value conflicts with the patient presentation, verify the measurement and assess the patient. Do not automatically trust or ignore technology. Pulse-oximeter readings may also be affected by skin pigmentation; interpret readings with symptoms, signal quality, and other clinical findings.",
        "takeaway": "Validate unexpected data before acting on an isolated number."
      },
      {
        "title": "Early Deterioration Can Be Subtle",
        "body": "Restlessness, new confusion, cool skin, decreasing urine output, increasing respiratory effort, and altered mentation can appear before severe hypotension or hypoxemia.",
        "takeaway": "Subtle changes can be early warning signs."
      }
    ],
    "scenarios": [
      {
        "title": "Trend Recognition",
        "patient": "Over 3 hours a patient’s HR rises 78→94→108, urine output falls, and skin becomes cool. BP remains 110/68.",
        "question": "Which interpretation is strongest?",
        "options": [
          "The patient is stable because BP is normal",
          "The trend suggests possible deterioration and requires focused reassessment/escalation",
          "The heart rate matters only above 120",
          "Urine output is unrelated to circulation"
        ],
        "answer": 1,
        "explanation": "Rising HR, falling output, and cool skin form a concerning trend even before hypotension."
      },
      {
        "title": "Verify the Number",
        "patient": "A pulse oximeter suddenly reads 82%, but the patient is talking comfortably and the waveform is poor.",
        "question": "What should happen first?",
        "options": [
          "Ignore the value",
          "Immediately document severe hypoxemia without checking",
          "Assess the patient and verify the sensor/signal while continuing clinical evaluation",
          "Turn off the alarm"
        ],
        "answer": 2,
        "explanation": "Unexpected monitor data should be verified while the patient is assessed."
      },
      {
        "title": "Pain With Red Flags",
        "patient": "A patient reports 8/10 “indigestion” with diaphoresis and nausea.",
        "question": "What is the priority?",
        "options": [
          "Focus only on gastrointestinal history",
          "Treat the pain score as the only important finding",
          "Recognize associated symptoms as potentially urgent and perform/escalate focused assessment",
          "Ask the patient to rate pain again in an hour"
        ],
        "answer": 2,
        "explanation": "Pain quality plus diaphoresis and nausea can signal a serious problem; the assessment must broaden."
      }
    ],
    "questions": [
      {
        "question": "Which trend is most concerning?",
        "options": [
          "HR 82→84, stable symptoms",
          "HR 76→108 with cool skin and falling urine output",
          "Temp 36.8→36.9",
          "SpO₂ 97→96 with no symptoms"
        ],
        "answer": 1,
        "explanation": "A rising HR paired with perfusion changes is a concerning pattern."
      },
      {
        "question": "A monitor reading conflicts with how the patient looks. What is best?",
        "options": [
          "Trust the monitor only",
          "Assess the patient and verify the measurement",
          "Ignore both",
          "Silence the alarm"
        ],
        "answer": 1,
        "explanation": "Unexpected data should be validated in context."
      },
      {
        "question": "Which pain assessment is most complete?",
        "options": [
          "“Pain 7/10”",
          "Location, quality, onset, aggravating/relieving factors, associated symptoms, function, and response",
          "Ask only whether pain is sharp",
          "Ask only if medication is wanted"
        ],
        "answer": 1,
        "explanation": "A numeric rating is only one part of pain assessment."
      },
      {
        "question": "New restlessness can be important because it may:",
        "options": [
          "Always indicate boredom",
          "Be an early sign of physiologic deterioration",
          "Prove a psychiatric diagnosis",
          "Mean the patient is ready for discharge"
        ],
        "answer": 1,
        "explanation": "Restlessness can precede more obvious deterioration."
      },
      {
        "question": "A patient’s RR is 20 but respirations are shallow and the patient is difficult to arouse. Best interpretation?",
        "options": [
          "Normal because rate is 20",
          "The pattern is concerning despite the rate",
          "No assessment needed",
          "Only SpO₂ matters"
        ],
        "answer": 1,
        "explanation": "Depth and mental status can reveal danger hidden by a normal rate."
      },
      {
        "question": "Which is part of the general survey?",
        "options": [
          "Skin color, posture, work of breathing, interaction",
          "Only lab results",
          "Only medication list",
          "Only past history"
        ],
        "answer": 0,
        "explanation": "The general survey begins with immediate observation of the patient."
      }
    ]
  },
  "3": {
    "briefing": {
      "title": "Neurological Assessment",
      "summary": "Mental status, pupils, strength, sensation, GCS concepts, stroke red flags, and change from baseline.",
      "objectives": [
        "Baseline Mental Status Matters",
        "Pupils Are One Piece of the Exam",
        "Strength, Drift, and Symmetry",
        "GCS Is a Trend Tool"
      ]
    },
    "lessons": [
      {
        "title": "Baseline Mental Status Matters",
        "body": "Orientation questions are useful, but the most important finding may be a new change from the patient’s baseline. Compare current behavior, speech, attention, and responsiveness with what is expected for that person.",
        "takeaway": "New confusion is never explained away by age alone."
      },
      {
        "title": "Pupils Are One Piece of the Exam",
        "body": "Assess size, equality, and reaction to light in context. A pupil finding matters more when paired with headache, trauma, declining consciousness, or focal neurologic change.",
        "takeaway": "Interpret neurologic findings as patterns."
      },
      {
        "title": "Strength, Drift, and Symmetry",
        "body": "Compare sides. New unilateral weakness, pronator drift, facial asymmetry, or speech change can indicate an acute neurologic event and requires rapid escalation according to protocol.",
        "takeaway": "Symmetry and sudden change are high-value clues."
      },
      {
        "title": "GCS Is a Trend Tool",
        "body": "Glasgow Coma Scale components evaluate eye, verbal, and motor responses. The trend and the specific component that changed are often more informative than memorizing a total score. Record eye, verbal, and motor components using the structured method. Intubation, sedation, paralysis, language, hearing, and local protocol can limit interpretation.",
        "takeaway": "A falling neurologic score is a change in condition."
      },
      {
        "title": "Do Not Delay for a Perfect Exam",
        "body": "When acute stroke or rapidly declining consciousness is suspected, perform the immediate focused assessment required to identify the problem and escalate promptly.",
        "takeaway": "Assessment supports action; it should not become a reason to delay action."
      }
    ],
    "scenarios": [
      {
        "title": "New Neuro Change",
        "patient": "A patient who was oriented 30 minutes ago now has slurred speech and right arm drift.",
        "question": "What is the priority?",
        "options": [
          "Complete a lengthy full neurologic history first",
          "Recognize an acute focal change and activate the appropriate urgent response",
          "Reassess tomorrow",
          "Offer oral fluids"
        ],
        "answer": 1,
        "explanation": "Sudden focal neurologic deficits require immediate focused assessment and escalation. Document last-known-well or symptom-onset time when known and activate the facility-specific urgent response."
      },
      {
        "title": "GCS Trend",
        "patient": "A patient’s total GCS falls because the motor response worsens while eye and verbal responses are unchanged.",
        "question": "What is most useful to communicate?",
        "options": [
          "Only the new total score",
          "The specific component change plus the total and clinical context",
          "That the patient is “sleepy”",
          "Nothing until the next scheduled assessment"
        ],
        "answer": 1,
        "explanation": "Component-level change clarifies what deteriorated."
      },
      {
        "title": "Pupil Context",
        "patient": "One pupil is slightly larger, documented as baseline for years, and the patient has no new symptoms.",
        "question": "Best interpretation?",
        "options": [
          "Any unequal pupil proves an emergency",
          "Baseline history and absence of change matter; continue appropriate monitoring",
          "Ignore pupils permanently",
          "Diagnose stroke"
        ],
        "answer": 1,
        "explanation": "Known stable anisocoria is different from a new pupil change; trend and context matter."
      }
    ],
    "questions": [
      {
        "question": "Which finding is most urgent?",
        "options": [
          "Chronic mild hand tremor",
          "Sudden facial droop and unilateral weakness",
          "Stable unequal pupils documented for years",
          "Occasional headache relieved by rest"
        ],
        "answer": 1,
        "explanation": "Sudden focal neurologic deficits require urgent response."
      },
      {
        "question": "Why document GCS components, not just total?",
        "options": [
          "Totals are never used",
          "Component changes identify what neurologic response changed",
          "It saves time",
          "Only motor score matters"
        ],
        "answer": 1,
        "explanation": "Component trends add clinical meaning to the total."
      },
      {
        "question": "New confusion in an older adult should be:",
        "options": [
          "Expected aging",
          "Compared with baseline and assessed as a change in condition",
          "Ignored if vitals are normal",
          "Treated as dementia"
        ],
        "answer": 1,
        "explanation": "Acute confusion is a change that requires evaluation."
      },
      {
        "question": "Pronator drift is most useful for assessing:",
        "options": [
          "Symmetry of upper-extremity motor function",
          "Hearing",
          "Abdominal pain",
          "Peripheral edema"
        ],
        "answer": 0,
        "explanation": "Pronator drift can reveal subtle unilateral motor weakness."
      },
      {
        "question": "A patient with possible stroke is rapidly worsening. Best principle?",
        "options": [
          "Finish every neurologic test before calling for help",
          "Perform the focused assessment needed and escalate without unnecessary delay",
          "Wait for family confirmation",
          "Give food first"
        ],
        "answer": 1,
        "explanation": "Assessment should support, not delay, time-sensitive escalation."
      },
      {
        "question": "Which pupil finding is most concerning?",
        "options": [
          "Stable lifelong anisocoria",
          "New unequal pupils with decreasing consciousness after head trauma",
          "Equal brisk pupils",
          "Small equal pupils in a stable patient"
        ],
        "answer": 1,
        "explanation": "New pupil asymmetry with declining consciousness after trauma is a red flag."
      }
    ]
  },
  "4": {
    "briefing": {
      "title": "Respiratory Assessment",
      "summary": "Work of breathing, oxygenation, lung sounds, respiratory pattern, and recognition of worsening status.",
      "objectives": [
        "Work of Breathing Comes First",
        "Oxygenation Is More Than SpO₂",
        "Listen Systematically",
        "Breath Sounds Need Context"
      ]
    },
    "lessons": [
      {
        "title": "Work of Breathing Comes First",
        "body": "Respiratory rate alone can look acceptable while the patient is tiring. Observe depth, pattern, accessory-muscle use, ability to speak, posture, retractions, and mental status.",
        "takeaway": "Normal-looking numbers do not cancel visible respiratory distress."
      },
      {
        "title": "Oxygenation Is More Than SpO₂",
        "body": "Pulse oximetry is valuable but has limitations. Poor perfusion, motion, skin temperature, device placement, nail products, tobacco use, dyshemoglobinemias, and skin pigmentation can affect readings. SpO₂ estimates oxygen saturation; it does not measure ventilation. Assess the patient and signal quality when available.",
        "takeaway": "Treat the patient, verify the data."
      },
      {
        "title": "Listen Systematically",
        "body": "Compare corresponding areas side-to-side and describe intensity and adventitious sounds. A new unilateral decrease can carry different significance than diffuse chronic findings. Terminology for adventitious sounds can vary; describe location, timing, and change, and do not assign a diagnosis from a sound alone.",
        "takeaway": "Comparison reveals asymmetry."
      },
      {
        "title": "Breath Sounds Need Context",
        "body": "Crackles, wheezes, rhonchi, stridor, and diminished sounds are findings—not diagnoses. Interpret them alongside effort, oxygenation, history, and change from baseline.",
        "takeaway": "Do not diagnose from one sound in isolation."
      },
      {
        "title": "Recognize Respiratory Fatigue",
        "body": "A patient who was tachypneic and agitated but becomes quieter, slower, and drowsy may be worsening rather than improving.",
        "takeaway": "Less visible distress can mean exhaustion."
      }
    ],
    "scenarios": [
      {
        "title": "Respiratory Fatigue",
        "patient": "A patient with severe respiratory distress was RR 34 and agitated. Now RR is 18, respirations are shallow, and the patient is difficult to arouse.",
        "question": "What does this most likely indicate?",
        "options": [
          "Clear improvement",
          "Possible fatigue and worsening ventilation requiring urgent escalation",
          "Normal sleep",
          "Pain relief"
        ],
        "answer": 1,
        "explanation": "A falling rate with decreased consciousness and shallow breathing can signal fatigue, not improvement."
      },
      {
        "title": "Asymmetry",
        "patient": "A patient develops sudden dyspnea after a procedure. Breath sounds are markedly diminished on one side.",
        "question": "What is the priority?",
        "options": [
          "Document and wait for routine rounds",
          "Recognize a significant new asymmetric finding and escalate promptly",
          "Ask the patient to cough for 20 minutes",
          "Only repeat SpO₂"
        ],
        "answer": 1,
        "explanation": "New unilateral diminished sounds with sudden dyspnea are concerning and require prompt evaluation."
      },
      {
        "title": "SpO2 Mismatch",
        "patient": "SpO₂ is 95%, but the patient can speak only 2–3 words at a time and uses accessory muscles.",
        "question": "Best interpretation?",
        "options": [
          "Oxygen saturation proves breathing is adequate",
          "Work of breathing indicates significant distress despite the saturation",
          "The patient is anxious only",
          "No reassessment is needed"
        ],
        "answer": 1,
        "explanation": "Work of breathing and speech limitation can indicate serious respiratory compromise even with a preserved SpO₂."
      }
    ],
    "questions": [
      {
        "question": "Which finding best reflects increased work of breathing?",
        "options": [
          "Speaking full sentences comfortably",
          "Accessory muscle use and inability to speak full sentences",
          "RR 16 while sleeping",
          "Clear voice"
        ],
        "answer": 1,
        "explanation": "Accessory muscle use and limited speech indicate respiratory effort."
      },
      {
        "question": "A patient becomes quieter after prolonged severe respiratory distress and is now drowsy. Best interpretation?",
        "options": [
          "Improvement",
          "Possible fatigue and impending failure",
          "Normal relaxation",
          "Pain control"
        ],
        "answer": 1,
        "explanation": "Decreasing effort with drowsiness after prolonged distress can mean exhaustion."
      },
      {
        "question": "Why compare breath sounds side-to-side?",
        "options": [
          "To diagnose every disease",
          "To identify asymmetry and change",
          "Because only one lung should be heard",
          "To replace imaging"
        ],
        "answer": 1,
        "explanation": "Side-to-side comparison helps identify focal abnormalities."
      },
      {
        "question": "Which statement about SpO₂ is best?",
        "options": [
          "It replaces respiratory assessment",
          "It is one data point and should be interpreted with signal quality and clinical findings",
          "It is always accurate",
          "It measures ventilation directly"
        ],
        "answer": 1,
        "explanation": "Pulse oximetry does not replace assessment and does not directly measure ventilation."
      },
      {
        "question": "New stridor is best treated as:",
        "options": [
          "A low-priority chronic finding",
          "A potentially serious upper-airway finding requiring prompt escalation",
          "A normal variant",
          "Only a lower-airway wheeze"
        ],
        "answer": 1,
        "explanation": "Stridor can indicate upper-airway obstruction and requires prompt evaluation."
      },
      {
        "question": "Diffuse wheezing with increasing fatigue and decreasing air movement suggests:",
        "options": [
          "Guaranteed improvement",
          "Possible worsening airflow limitation",
          "Only anxiety",
          "No need to reassess"
        ],
        "answer": 1,
        "explanation": "Less air movement in a tiring patient can be ominous."
      }
    ]
  },
  "5": {
    "briefing": {
      "title": "Cardiovascular & Peripheral Vascular",
      "summary": "Perfusion, pulses, edema, heart sounds, capillary refill, and hemodynamic clues.",
      "objectives": [
        "Perfusion Is a Pattern",
        "Compare Pulses and Extremities",
        "Edema Needs Description",
        "Heart Sounds Are Contextual"
      ]
    },
    "lessons": [
      {
        "title": "Perfusion Is a Pattern",
        "body": "Blood pressure, mental status, skin temperature, capillary refill, urine output, pulses, and symptoms all contribute to perfusion assessment.",
        "takeaway": "No single perfusion measure tells the whole story."
      },
      {
        "title": "Compare Pulses and Extremities",
        "body": "Assess presence, strength, symmetry, temperature, color, edema, and sensation. A new unilateral change deserves focused evaluation.",
        "takeaway": "Side-to-side comparison detects focal problems."
      },
      {
        "title": "Edema Needs Description",
        "body": "Describe location, symmetry, pitting/non-pitting character when appropriate, and change over time. Pair edema with respiratory findings, weight trends, mobility, and vascular clues.",
        "takeaway": "“Edema present” is incomplete documentation."
      },
      {
        "title": "Heart Sounds Are Contextual",
        "body": "Rate, rhythm, and extra sounds should be interpreted with symptoms and hemodynamic findings. A new finding plus chest pain, dyspnea, hypotension, or syncope deserves escalation.",
        "takeaway": "Auscultation is part of a larger cardiovascular picture."
      },
      {
        "title": "Orthostatic Symptoms Matter",
        "body": "Position changes can reveal impaired compensation. If dizziness, weakness, or near-syncope occurs, prioritize safety and follow the ordered/protocol-based assessment process. Measurement steps and thresholds must follow orders and local protocol.",
        "takeaway": "Prevent the fall while you assess the cause."
      }
    ],
    "scenarios": [
      {
        "title": "Perfusion Pattern",
        "patient": "A patient has BP 104/66, HR 112, cool mottled feet, delayed capillary refill, and new confusion.",
        "question": "What is the best interpretation?",
        "options": [
          "Normal perfusion because systolic BP is over 100",
          "A concerning perfusion pattern requiring focused reassessment and escalation",
          "Only the heart rate is abnormal",
          "Mottling is cosmetic"
        ],
        "answer": 1,
        "explanation": "Multiple perfusion clues outweigh reliance on a single blood pressure value."
      },
      {
        "title": "Unilateral Change",
        "patient": "One foot becomes pale, cool, painful, and the pulse is difficult to detect compared with the other side.",
        "question": "Priority?",
        "options": [
          "Recheck next shift",
          "Perform focused neurovascular assessment and escalate urgently",
          "Apply heat and ignore pulse difference",
          "Document as expected aging"
        ],
        "answer": 1,
        "explanation": "A new unilateral neurovascular change can threaten the limb and requires urgent evaluation."
      },
      {
        "title": "Edema Context",
        "patient": "A patient has bilateral lower-extremity edema plus increasing dyspnea and rapid weight gain.",
        "question": "What should the nurse do?",
        "options": [
          "Document edema as an isolated skin finding",
          "Integrate the findings into a cardiopulmonary/perfusion assessment and escalate as indicated",
          "Only measure ankle circumference",
          "Encourage unrestricted fluids"
        ],
        "answer": 1,
        "explanation": "The findings form a systemic pattern and should be assessed together."
      }
    ],
    "questions": [
      {
        "question": "Which cluster best suggests impaired perfusion?",
        "options": [
          "Warm skin, alert, strong pulses",
          "Cool skin, delayed refill, confusion, low urine output",
          "Mild chronic edema only",
          "Normal mentation and urine output"
        ],
        "answer": 1,
        "explanation": "Perfusion is assessed as a pattern across systems."
      },
      {
        "question": "A new unilateral cool pulseless foot should prompt:",
        "options": [
          "Routine follow-up next week",
          "Urgent focused vascular/neurovascular assessment and escalation",
          "Warm compress only",
          "Ambulation"
        ],
        "answer": 1,
        "explanation": "Acute unilateral perfusion loss is urgent."
      },
      {
        "question": "Edema documentation should include:",
        "options": [
          "Only “edema present”",
          "Location, symmetry, degree/character when appropriate, and trend",
          "Only skin color",
          "Only weight"
        ],
        "answer": 1,
        "explanation": "Objective description supports comparison and clinical interpretation."
      },
      {
        "question": "Orthostatic dizziness should first trigger:",
        "options": [
          "Independent ambulation",
          "Safety measures and appropriate position/vital assessment",
          "A large meal",
          "Ignoring symptoms"
        ],
        "answer": 1,
        "explanation": "Prevent injury while evaluating the hemodynamic response."
      },
      {
        "question": "Which finding strengthens concern about heart failure-type congestion?",
        "options": [
          "Bilateral edema plus increasing dyspnea and rapid weight gain",
          "A single bruise",
          "Dry skin",
          "Normal lung exam"
        ],
        "answer": 0,
        "explanation": "The combination suggests systemic fluid/congestion issues and warrants evaluation."
      },
      {
        "question": "Capillary refill is best used as:",
        "options": [
          "The sole measure of circulation",
          "One perfusion clue interpreted with temperature, pulses, mentation, and context",
          "A diagnostic test for heart failure",
          "A substitute for BP"
        ],
        "answer": 1,
        "explanation": "Capillary refill is affected by temperature, age, lighting, assessment site, and perfusion. It is one contextual clue and should not be interpreted alone."
      }
    ]
  },
  "6": {
    "briefing": {
      "title": "Abdominal, GI & GU Assessment",
      "summary": "Abdominal sequence, bowel sounds, distention, tenderness, urinary findings, and output trends.",
      "objectives": [
        "Inspect Before You Touch",
        "Abdominal Sequence Is Different",
        "Pain Changes How You Palpate",
        "Urine Output Is a Trend"
      ]
    },
    "lessons": [
      {
        "title": "Inspect Before You Touch",
        "body": "Observe contour, distention, scars, skin, visible movement, and patient guarding before palpation.",
        "takeaway": "The patient may show you where the problem is before you touch the abdomen."
      },
      {
        "title": "Abdominal Sequence Is Different",
        "body": "For the abdomen, inspect, auscultate, then percuss and palpate. This helps avoid changing bowel sounds before listening.",
        "takeaway": "Sequence protects assessment accuracy."
      },
      {
        "title": "Pain Changes How You Palpate",
        "body": "Begin away from the painful area and use gentle technique. Rigidity, rebound-type pain, severe tenderness, or worsening instability are concerning findings that require escalation according to scope and protocol.",
        "takeaway": "Do not repeatedly provoke severe pain to “confirm” it."
      },
      {
        "title": "Urine Output Is a Trend",
        "body": "Urine output is neither fully sensitive nor specific for kidney function or perfusion. Interpret the amount and time trend with intake, hemodynamics, medications, renal history, device status, and available laboratory data.",
        "takeaway": "Look at the pattern, not only the latest number."
      },
      {
        "title": "Devices Can Mislead",
        "body": "Low urine output may reflect patient physiology or a kinked, dependent, or obstructed collection system. Assess the patient and inspect the equipment using infection-prevention practices and local catheter policy. Do not disconnect a closed drainage system merely to investigate low output.",
        "takeaway": "Protect the closed system while evaluating both the patient and equipment."
      }
    ],
    "scenarios": [
      {
        "title": "Abdominal Sequence",
        "patient": "A patient has new abdominal distention and pain.",
        "question": "Which sequence is appropriate for the abdominal exam?",
        "options": [
          "Palpate deeply, then auscultate",
          "Inspect, auscultate, then percuss/palpate as appropriate",
          "Percuss first, then inspect",
          "Auscultation is unnecessary"
        ],
        "answer": 1,
        "explanation": "The abdomen is assessed with auscultation before percussion/palpation."
      },
      {
        "title": "Urine Output Drop",
        "patient": "A catheterized patient’s urine output drops abruptly. The patient is otherwise stable.",
        "question": "What should happen first?",
        "options": [
          "Assume renal failure",
          "Assess the patient and inspect the closed drainage system for positioning, kinks, or obstruction according to local policy",
          "Remove the catheter without an order",
          "Ignore the change"
        ],
        "answer": 1,
        "explanation": "Both patient physiology and equipment problems can reduce output. Inspect the closed system without disconnecting it, use infection-prevention practices, and follow local catheter policy."
      },
      {
        "title": "Rigid Abdomen",
        "patient": "A patient has escalating abdominal pain, guarding, and a rigid abdomen.",
        "question": "Priority?",
        "options": [
          "Repeated deep palpation",
          "Recognize a concerning acute finding and escalate promptly",
          "Offer food",
          "Wait for bowel sounds to return"
        ],
        "answer": 1,
        "explanation": "Rigidity and worsening pain are concerning and should prompt urgent evaluation rather than repeated provocation."
      }
    ],
    "questions": [
      {
        "question": "Why auscultate before palpating the abdomen?",
        "options": [
          "Palpation can alter bowel activity",
          "Palpation improves bowel sounds",
          "Auscultation causes pain",
          "There is no reason"
        ],
        "answer": 0,
        "explanation": "Manipulation may alter bowel sounds."
      },
      {
        "question": "A rigid abdomen with escalating pain is:",
        "options": [
          "Expected after every meal",
          "A concerning finding requiring prompt escalation",
          "Best assessed with repeated deep palpation",
          "Only a documentation issue"
        ],
        "answer": 1,
        "explanation": "Rigidity and severe worsening pain are red flags."
      },
      {
        "question": "Low urine output with a catheter should lead to:",
        "options": [
          "Assume kidney failure immediately",
          "Assess the patient and inspect the closed drainage system according to local policy while evaluating the trend",
          "Clamp the catheter",
          "Ignore it for 8 hours"
        ],
        "answer": 1,
        "explanation": "Consider physiologic and mechanical causes while protecting the closed system and following infection-prevention and local catheter policy."
      },
      {
        "question": "Which finding makes low urine output more concerning?",
        "options": [
          "Stable vitals and normal intake",
          "Cool skin, tachycardia, and falling BP",
          "A full water pitcher",
          "Normal mentation"
        ],
        "answer": 1,
        "explanation": "Paired perfusion changes increase concern."
      },
      {
        "question": "When palpating a painful abdomen, begin:",
        "options": [
          "Directly over maximal pain with deep pressure",
          "Away from the painful area and gently",
          "Only after a meal",
          "Without inspection"
        ],
        "answer": 1,
        "explanation": "Gentle assessment away from the painful area reduces guarding and unnecessary pain."
      },
      {
        "question": "New abdominal distention plus persistent vomiting should be:",
        "options": [
          "Dismissed if bowel sounds are present",
          "Assessed in context and escalated if concerning",
          "Treated only with water",
          "Ignored until discharge"
        ],
        "answer": 1,
        "explanation": "The pattern can indicate significant GI dysfunction and requires evaluation."
      }
    ]
  },
  "7": {
    "briefing": {
      "title": "Skin, Wounds & Musculoskeletal",
      "summary": "Skin integrity, pressure injury risk, wounds, mobility, falls, ROM, and neurovascular checks.",
      "objectives": [
        "Skin Tells a Systemic Story",
        "Pressure Injury Risk Is Dynamic",
        "Describe Wounds Objectively",
        "Neurovascular Checks Are Time-Sensitive"
      ]
    },
    "lessons": [
      {
        "title": "Skin Tells a Systemic Story",
        "body": "Color, temperature, moisture, turgor, lesions, bruising, pressure areas, and perfusion findings can reveal local and systemic problems.",
        "takeaway": "Skin assessment is more than checking for wounds."
      },
      {
        "title": "Pressure Injury Risk Is Dynamic",
        "body": "Mobility, moisture, nutrition, perfusion, sensation, friction/shear, and device pressure all affect risk. Reassess when condition or mobility changes. Use current facility-approved terminology and risk tools; staging should not be learned from text alone without validated visuals and qualified instruction.",
        "takeaway": "Risk changes when the patient changes."
      },
      {
        "title": "Describe Wounds Objectively",
        "body": "Document location, dimensions using a consistent facility-approved measurement method, tissue appearance, drainage, surrounding skin, pain, and change over time. Assess odor only when clinically appropriate and with infection-prevention safeguards.",
        "takeaway": "Objective description supports trend comparison."
      },
      {
        "title": "Neurovascular Checks Are Time-Sensitive",
        "body": "Assess pain, color, temperature, capillary refill, pulses when applicable, movement, and sensation after injury/procedure/casting according to orders and protocol. Do not remove or alter casts, splints, dressings, or other devices outside your role, orders, and local protocol.",
        "takeaway": "A new neurovascular deficit can be limb-threatening."
      },
      {
        "title": "Mobility Is an Assessment",
        "body": "Observe gait, transfers, balance, strength, assistive-device use, and tolerance. A patient who “walked yesterday” may not be safe today. Fall-risk screening applies to the population and setting defined by local policy; CDC STEADI resources specifically address older adults.",
        "takeaway": "Functional ability must be reassessed, not assumed."
      }
    ],
    "scenarios": [
      {
        "title": "Neurovascular Red Flag",
        "patient": "After a limb procedure, a patient develops increasing pain, numbness, and a cool pale hand.",
        "question": "What is the priority?",
        "options": [
          "Document for the next shift",
          "Immediate focused neurovascular assessment and escalation",
          "Massage the limb vigorously",
          "Reassure the patient that pain is expected"
        ],
        "answer": 1,
        "explanation": "Pain plus sensory and perfusion changes are urgent neurovascular red flags."
      },
      {
        "title": "Fall Risk Changed",
        "patient": "A patient walked independently yesterday but is now dizzy when standing and requires the bedrail to steady themselves.",
        "question": "Best action?",
        "options": [
          "Use yesterday’s mobility status",
          "Reassess mobility/fall risk and provide appropriate assistance",
          "Tell the patient to walk alone to rebuild strength",
          "Document “independent”"
        ],
        "answer": 1,
        "explanation": "Functional status can change rapidly and must be reassessed."
      },
      {
        "title": "Device Pressure",
        "patient": "A patient on oxygen tubing develops persistent redness behind the ears.",
        "question": "Best interpretation?",
        "options": [
          "Only immobile patients get pressure injury",
          "Medical devices can cause pressure injury; assess and relieve pressure per protocol",
          "Redness is harmless",
          "Stop oxygen without assessment"
        ],
        "answer": 1,
        "explanation": "Device-related pressure is a recognized risk and should be addressed while maintaining therapy safely."
      }
    ],
    "questions": [
      {
        "question": "Which new finding after casting is most concerning?",
        "options": [
          "Mild itching",
          "Increasing pain, numbness, pallor, and coolness",
          "Request for a blanket",
          "Stable swelling"
        ],
        "answer": 1,
        "explanation": "Pain plus sensory and perfusion changes are urgent neurovascular findings."
      },
      {
        "question": "Pressure injury risk should be reassessed when:",
        "options": [
          "Only at admission",
          "Mobility, perfusion, nutrition, moisture, or condition changes",
          "Never after the first score",
          "Only after skin breakdown"
        ],
        "answer": 1,
        "explanation": "Risk is dynamic."
      },
      {
        "question": "Best wound documentation includes:",
        "options": [
          "“Looks bad”",
          "Objective dimensions, tissue, drainage, surrounding skin, pain, and trend",
          "Only wound color",
          "Only odor"
        ],
        "answer": 1,
        "explanation": "Objective descriptors allow comparison and communication."
      },
      {
        "question": "A patient who was independent yesterday is dizzy and unsteady today. Best action?",
        "options": [
          "Keep yesterday’s mobility label",
          "Reassess mobility/fall risk and assist appropriately",
          "Encourage walking alone",
          "Ignore dizziness"
        ],
        "answer": 1,
        "explanation": "Functional status must reflect the current condition."
      },
      {
        "question": "Persistent redness under oxygen tubing suggests:",
        "options": [
          "Device-related pressure risk",
          "Only allergy",
          "Normal skin",
          "Need to stop oxygen immediately"
        ],
        "answer": 0,
        "explanation": "Medical devices can create pressure and require prevention measures."
      },
      {
        "question": "Which finding is part of neurovascular assessment?",
        "options": [
          "Movement and sensation",
          "Bowel sounds",
          "Visual acuity only",
          "Speech only"
        ],
        "answer": 0,
        "explanation": "Movement and sensation are core neurovascular elements, along with perfusion findings."
      }
    ]
  },
  "8": {
    "briefing": {
      "title": "Head-to-Toe Clinical Judgment",
      "summary": "Integrated patient assessment, prioritization, deterioration patterns, reassessment, and escalation.",
      "objectives": [
        "Build a Priority Map",
        "Cluster Findings",
        "Reassess the Highest-Risk Problem",
        "Communicate Changes Clearly"
      ]
    },
    "lessons": [
      {
        "title": "Build a Priority Map",
        "body": "During a head-to-toe assessment, separate expected chronic findings from new or worsening findings. Then prioritize immediate threats, significant changes, and issues requiring follow-up.",
        "takeaway": "Not every abnormality has the same urgency."
      },
      {
        "title": "Cluster Findings",
        "body": "New confusion + cool skin + falling urine output may point to a perfusion problem even before severe hypotension appears. Multiple small clues can create a high-risk pattern.",
        "takeaway": "Clinical judgment connects findings across systems."
      },
      {
        "title": "Reassess the Highest-Risk Problem",
        "body": "After an intervention or change, reassess the problem most likely to cause harm first. A complete head-to-toe can wait when the patient is deteriorating.",
        "takeaway": "Priority assessment is dynamic."
      },
      {
        "title": "Communicate Changes Clearly",
        "body": "When escalating, communicate the change from baseline, relevant assessment findings, trends, interventions already performed, and response. Use the organization’s structured communication method, such as SBAR, and confirm that urgent messages and instructions are received using closed-loop communication or check-back.",
        "takeaway": "State the change, urgency, recommendation, and response—and confirm the message was received."
      },
      {
        "title": "Know When to Stop Collecting Data",
        "body": "If you identify an immediate threat, activate the appropriate response rather than continuing a routine checklist.",
        "takeaway": "Assessment and escalation happen together."
      }
    ],
    "scenarios": [
      {
        "title": "Cluster the Findings",
        "patient": "An older adult is newly confused, HR 106, BP 108/64, skin cool, urine output falling, RR 24.",
        "question": "What is the strongest conclusion?",
        "options": [
          "No concern because no single value is extreme",
          "The cluster suggests deterioration and impaired perfusion may be developing",
          "Only confusion matters",
          "Repeat the assessment tomorrow"
        ],
        "answer": 1,
        "explanation": "Multiple modest changes across systems can indicate significant deterioration."
      },
      {
        "title": "Stop the Checklist",
        "patient": "During a routine head-to-toe, a patient suddenly develops severe dyspnea, cyanosis, and decreased responsiveness.",
        "question": "What should happen?",
        "options": [
          "Finish the head-to-toe for complete documentation",
          "Stop routine assessment and initiate the appropriate emergency response while assessing ABCs",
          "Continue with abdominal assessment",
          "Wait for the next vital-sign cycle"
        ],
        "answer": 1,
        "explanation": "Immediate threats take priority over completing a routine sequence."
      },
      {
        "title": "Reassessment Priority",
        "patient": "A patient has just received an intervention for acute respiratory distress.",
        "question": "Which reassessment is most important first?",
        "options": [
          "Hair and scalp",
          "Work of breathing, oxygenation, respiratory pattern, and mental status",
          "Long-term diet history",
          "Last bowel movement"
        ],
        "answer": 1,
        "explanation": "Reassess the problem that posed the greatest immediate risk."
      }
    ],
    "questions": [
      {
        "question": "Which patient should be assessed first?",
        "options": [
          "Stable chronic back pain 4/10",
          "New confusion with cool skin and falling urine output",
          "Request for a sleep aid",
          "Stable dressing change due in 2 hours"
        ],
        "answer": 1,
        "explanation": "The cluster suggests possible deterioration and impaired perfusion."
      },
      {
        "question": "During routine assessment, severe dyspnea and decreased responsiveness develop. Best action?",
        "options": [
          "Finish the checklist",
          "Stop routine assessment, assess ABCs, and activate the appropriate response",
          "Complete skin assessment first",
          "Wait 15 minutes"
        ],
        "answer": 1,
        "explanation": "Immediate threats take priority."
      },
      {
        "question": "Which is the strongest example of clustering findings?",
        "options": [
          "Listing each vital separately",
          "Connecting tachycardia, cool skin, confusion, and low urine output as a perfusion pattern",
          "Recording height and weight",
          "Documenting one chronic diagnosis"
        ],
        "answer": 1,
        "explanation": "Clinical judgment connects related findings into a meaningful pattern."
      },
      {
        "question": "After treating acute respiratory distress, reassess first:",
        "options": [
          "Hair",
          "Respiratory effort, oxygenation, pattern, and mental status",
          "Diet preference",
          "Bowel history"
        ],
        "answer": 1,
        "explanation": "Reassess the highest-risk problem first."
      },
      {
        "question": "When communicating deterioration, include:",
        "options": [
          "Only “patient looks bad”",
          "Change from baseline, relevant trends/findings, interventions, and response",
          "Only room number",
          "Only diagnosis"
        ],
        "answer": 1,
        "explanation": "Specific trend-based communication supports rapid clinical decision-making."
      },
      {
        "question": "Which principle best defines expert assessment?",
        "options": [
          "Collect every possible data point before acting",
          "Collect the right data, recognize patterns, prioritize threats, and reassess response",
          "Memorize normal ranges only",
          "Rely on monitors instead of the patient"
        ],
        "answer": 1,
        "explanation": "High-level assessment is purposeful, pattern-based, and linked to action."
      }
    ]
  }
};

export const nursingAssessmentCapstone = [
  {
    "category": "Assessment Foundations",
    "question": "A patient’s baseline systolic BP is usually 150–160. Today it is 112, and the patient is dizzy. Which interpretation is best?",
    "options": [
      "112 is normal, so no concern",
      "The change from baseline plus symptoms is clinically important",
      "Only values below 90 matter",
      "Dizziness is unrelated to BP"
    ],
    "answer": 1,
    "explanation": "A large change from baseline with symptoms deserves evaluation even if the absolute value is not profoundly low."
  },
  {
    "category": "Assessment Foundations",
    "question": "Which finding is subjective?",
    "options": [
      "Temperature 38.1°C",
      "Patient reports “my chest feels tight”",
      "RR 28/min",
      "Left ankle visibly swollen"
    ],
    "answer": 1,
    "explanation": "Patient-reported symptoms are subjective data."
  },
  {
    "category": "Assessment Foundations",
    "question": "A focused assessment should expand when:",
    "options": [
      "The nurse wants more documentation",
      "Findings suggest a broader or more serious problem",
      "The patient is asleep",
      "The shift is almost over"
    ],
    "answer": 1,
    "explanation": "New or concerning findings should change the scope of assessment."
  },
  {
    "category": "Assessment Foundations",
    "question": "Which abdominal sequence is correct?",
    "options": [
      "Inspect, palpate, auscultate, percuss",
      "Inspect, auscultate, percuss, palpate",
      "Auscultate, inspect, palpate, percuss",
      "Palpate, percuss, inspect, auscultate"
    ],
    "answer": 1,
    "explanation": "Auscultation precedes percussion and palpation for the abdomen."
  },
  {
    "category": "Assessment Foundations",
    "question": "Which statement best describes reassessment?",
    "options": [
      "Optional if the intervention was ordered",
      "Used to determine response and detect failure or deterioration",
      "Only needed after medication",
      "The same as repeating a full admission assessment"
    ],
    "answer": 1,
    "explanation": "Reassessment evaluates whether the intervention achieved its goal and whether the condition changed."
  },
  {
    "category": "Vital Signs, Pain & General Survey",
    "question": "Which trend is most concerning?",
    "options": [
      "HR 82→84, stable symptoms",
      "HR 76→108 with cool skin and falling urine output",
      "Temp 36.8→36.9",
      "SpO₂ 97→96 with no symptoms"
    ],
    "answer": 1,
    "explanation": "A rising HR paired with perfusion changes is a concerning pattern."
  },
  {
    "category": "Vital Signs, Pain & General Survey",
    "question": "A monitor reading conflicts with how the patient looks. What is best?",
    "options": [
      "Trust the monitor only",
      "Assess the patient and verify the measurement",
      "Ignore both",
      "Silence the alarm"
    ],
    "answer": 1,
    "explanation": "Unexpected data should be validated in context."
  },
  {
    "category": "Vital Signs, Pain & General Survey",
    "question": "Which pain assessment is most complete?",
    "options": [
      "“Pain 7/10”",
      "Location, quality, onset, aggravating/relieving factors, associated symptoms, function, and response",
      "Ask only whether pain is sharp",
      "Ask only if medication is wanted"
    ],
    "answer": 1,
    "explanation": "A numeric rating is only one part of pain assessment."
  },
  {
    "category": "Vital Signs, Pain & General Survey",
    "question": "New restlessness can be important because it may:",
    "options": [
      "Always indicate boredom",
      "Be an early sign of physiologic deterioration",
      "Prove a psychiatric diagnosis",
      "Mean the patient is ready for discharge"
    ],
    "answer": 1,
    "explanation": "Restlessness can precede more obvious deterioration."
  },
  {
    "category": "Vital Signs, Pain & General Survey",
    "question": "A patient’s RR is 20 but respirations are shallow and the patient is difficult to arouse. Best interpretation?",
    "options": [
      "Normal because rate is 20",
      "The pattern is concerning despite the rate",
      "No assessment needed",
      "Only SpO₂ matters"
    ],
    "answer": 1,
    "explanation": "Depth and mental status can reveal danger hidden by a normal rate."
  },
  {
    "category": "Neurological Assessment",
    "question": "Which finding is most urgent?",
    "options": [
      "Chronic mild hand tremor",
      "Sudden facial droop and unilateral weakness",
      "Stable unequal pupils documented for years",
      "Occasional headache relieved by rest"
    ],
    "answer": 1,
    "explanation": "Sudden focal neurologic deficits require urgent response."
  },
  {
    "category": "Neurological Assessment",
    "question": "Why document GCS components, not just total?",
    "options": [
      "Totals are never used",
      "Component changes identify what neurologic response changed",
      "It saves time",
      "Only motor score matters"
    ],
    "answer": 1,
    "explanation": "Component trends add clinical meaning to the total."
  },
  {
    "category": "Neurological Assessment",
    "question": "New confusion in an older adult should be:",
    "options": [
      "Expected aging",
      "Compared with baseline and assessed as a change in condition",
      "Ignored if vitals are normal",
      "Treated as dementia"
    ],
    "answer": 1,
    "explanation": "Acute confusion is a change that requires evaluation."
  },
  {
    "category": "Neurological Assessment",
    "question": "Pronator drift is most useful for assessing:",
    "options": [
      "Symmetry of upper-extremity motor function",
      "Hearing",
      "Abdominal pain",
      "Peripheral edema"
    ],
    "answer": 0,
    "explanation": "Pronator drift can reveal subtle unilateral motor weakness."
  },
  {
    "category": "Neurological Assessment",
    "question": "A patient with possible stroke is rapidly worsening. Best principle?",
    "options": [
      "Finish every neurologic test before calling for help",
      "Perform the focused assessment needed and escalate without unnecessary delay",
      "Wait for family confirmation",
      "Give food first"
    ],
    "answer": 1,
    "explanation": "Assessment should support, not delay, time-sensitive escalation."
  },
  {
    "category": "Respiratory Assessment",
    "question": "Which finding best reflects increased work of breathing?",
    "options": [
      "Speaking full sentences comfortably",
      "Accessory muscle use and inability to speak full sentences",
      "RR 16 while sleeping",
      "Clear voice"
    ],
    "answer": 1,
    "explanation": "Accessory muscle use and limited speech indicate respiratory effort."
  },
  {
    "category": "Respiratory Assessment",
    "question": "A patient becomes quieter after prolonged severe respiratory distress and is now drowsy. Best interpretation?",
    "options": [
      "Improvement",
      "Possible fatigue and impending failure",
      "Normal relaxation",
      "Pain control"
    ],
    "answer": 1,
    "explanation": "Decreasing effort with drowsiness after prolonged distress can mean exhaustion."
  },
  {
    "category": "Respiratory Assessment",
    "question": "Why compare breath sounds side-to-side?",
    "options": [
      "To diagnose every disease",
      "To identify asymmetry and change",
      "Because only one lung should be heard",
      "To replace imaging"
    ],
    "answer": 1,
    "explanation": "Side-to-side comparison helps identify focal abnormalities."
  },
  {
    "category": "Respiratory Assessment",
    "question": "Which statement about SpO₂ is best?",
    "options": [
      "It replaces respiratory assessment",
      "It is one data point and should be interpreted with signal quality and clinical findings",
      "It is always accurate",
      "It measures ventilation directly"
    ],
    "answer": 1,
    "explanation": "Pulse oximetry does not replace assessment and does not directly measure ventilation."
  },
  {
    "category": "Respiratory Assessment",
    "question": "New stridor is best treated as:",
    "options": [
      "A low-priority chronic finding",
      "A potentially serious upper-airway finding requiring prompt escalation",
      "A normal variant",
      "Only a lower-airway wheeze"
    ],
    "answer": 1,
    "explanation": "Stridor can indicate upper-airway obstruction and requires prompt evaluation."
  },
  {
    "category": "Cardiovascular & Peripheral Vascular",
    "question": "Which cluster best suggests impaired perfusion?",
    "options": [
      "Warm skin, alert, strong pulses",
      "Cool skin, delayed refill, confusion, low urine output",
      "Mild chronic edema only",
      "Normal mentation and urine output"
    ],
    "answer": 1,
    "explanation": "Perfusion is assessed as a pattern across systems."
  },
  {
    "category": "Cardiovascular & Peripheral Vascular",
    "question": "A new unilateral cool pulseless foot should prompt:",
    "options": [
      "Routine follow-up next week",
      "Urgent focused vascular/neurovascular assessment and escalation",
      "Warm compress only",
      "Ambulation"
    ],
    "answer": 1,
    "explanation": "Acute unilateral perfusion loss is urgent."
  },
  {
    "category": "Cardiovascular & Peripheral Vascular",
    "question": "Edema documentation should include:",
    "options": [
      "Only “edema present”",
      "Location, symmetry, degree/character when appropriate, and trend",
      "Only skin color",
      "Only weight"
    ],
    "answer": 1,
    "explanation": "Objective description supports comparison and clinical interpretation."
  },
  {
    "category": "Cardiovascular & Peripheral Vascular",
    "question": "Orthostatic dizziness should first trigger:",
    "options": [
      "Independent ambulation",
      "Safety measures and appropriate position/vital assessment",
      "A large meal",
      "Ignoring symptoms"
    ],
    "answer": 1,
    "explanation": "Prevent injury while evaluating the hemodynamic response."
  },
  {
    "category": "Cardiovascular & Peripheral Vascular",
    "question": "Which finding strengthens concern about heart failure-type congestion?",
    "options": [
      "Bilateral edema plus increasing dyspnea and rapid weight gain",
      "A single bruise",
      "Dry skin",
      "Normal lung exam"
    ],
    "answer": 0,
    "explanation": "The combination suggests systemic fluid/congestion issues and warrants evaluation."
  },
  {
    "category": "Abdominal, GI & GU Assessment",
    "question": "Why auscultate before palpating the abdomen?",
    "options": [
      "Palpation can alter bowel activity",
      "Palpation improves bowel sounds",
      "Auscultation causes pain",
      "There is no reason"
    ],
    "answer": 0,
    "explanation": "Manipulation may alter bowel sounds."
  },
  {
    "category": "Abdominal, GI & GU Assessment",
    "question": "A rigid abdomen with escalating pain is:",
    "options": [
      "Expected after every meal",
      "A concerning finding requiring prompt escalation",
      "Best assessed with repeated deep palpation",
      "Only a documentation issue"
    ],
    "answer": 1,
    "explanation": "Rigidity and severe worsening pain are red flags."
  },
  {
    "category": "Abdominal, GI & GU Assessment",
    "question": "Low urine output with a catheter should lead to:",
    "options": [
      "Assume kidney failure immediately",
      "Assess the patient and drainage system while evaluating the trend",
      "Clamp the catheter",
      "Ignore it for 8 hours"
    ],
    "answer": 1,
    "explanation": "Both physiologic and mechanical causes should be considered."
  },
  {
    "category": "Abdominal, GI & GU Assessment",
    "question": "Which finding makes low urine output more concerning?",
    "options": [
      "Stable vitals and normal intake",
      "Cool skin, tachycardia, and falling BP",
      "A full water pitcher",
      "Normal mentation"
    ],
    "answer": 1,
    "explanation": "Paired perfusion changes increase concern."
  },
  {
    "category": "Abdominal, GI & GU Assessment",
    "question": "When palpating a painful abdomen, begin:",
    "options": [
      "Directly over maximal pain with deep pressure",
      "Away from the painful area and gently",
      "Only after a meal",
      "Without inspection"
    ],
    "answer": 1,
    "explanation": "Gentle assessment away from the painful area reduces guarding and unnecessary pain."
  },
  {
    "category": "Skin, Wounds & Musculoskeletal",
    "question": "Which new finding after casting is most concerning?",
    "options": [
      "Mild itching",
      "Increasing pain, numbness, pallor, and coolness",
      "Request for a blanket",
      "Stable swelling"
    ],
    "answer": 1,
    "explanation": "Pain plus sensory and perfusion changes are urgent neurovascular findings."
  },
  {
    "category": "Skin, Wounds & Musculoskeletal",
    "question": "Pressure injury risk should be reassessed when:",
    "options": [
      "Only at admission",
      "Mobility, perfusion, nutrition, moisture, or condition changes",
      "Never after the first score",
      "Only after skin breakdown"
    ],
    "answer": 1,
    "explanation": "Risk is dynamic."
  },
  {
    "category": "Skin, Wounds & Musculoskeletal",
    "question": "Best wound documentation includes:",
    "options": [
      "“Looks bad”",
      "Objective dimensions, tissue, drainage, surrounding skin, pain, and trend",
      "Only wound color",
      "Only odor"
    ],
    "answer": 1,
    "explanation": "Objective descriptors allow comparison and communication."
  },
  {
    "category": "Skin, Wounds & Musculoskeletal",
    "question": "A patient who was independent yesterday is dizzy and unsteady today. Best action?",
    "options": [
      "Keep yesterday’s mobility label",
      "Reassess mobility/fall risk and assist appropriately",
      "Encourage walking alone",
      "Ignore dizziness"
    ],
    "answer": 1,
    "explanation": "Functional status must reflect the current condition."
  },
  {
    "category": "Skin, Wounds & Musculoskeletal",
    "question": "Persistent redness under oxygen tubing suggests:",
    "options": [
      "Device-related pressure risk",
      "Only allergy",
      "Normal skin",
      "Need to stop oxygen immediately"
    ],
    "answer": 0,
    "explanation": "Medical devices can create pressure and require prevention measures."
  },
  {
    "category": "Head-to-Toe Clinical Judgment",
    "question": "Which patient should be assessed first?",
    "options": [
      "Stable chronic back pain 4/10",
      "New confusion with cool skin and falling urine output",
      "Request for a sleep aid",
      "Stable dressing change due in 2 hours"
    ],
    "answer": 1,
    "explanation": "The cluster suggests possible deterioration and impaired perfusion."
  },
  {
    "category": "Head-to-Toe Clinical Judgment",
    "question": "During routine assessment, severe dyspnea and decreased responsiveness develop. Best action?",
    "options": [
      "Finish the checklist",
      "Stop routine assessment, assess ABCs, and activate the appropriate response",
      "Complete skin assessment first",
      "Wait 15 minutes"
    ],
    "answer": 1,
    "explanation": "Immediate threats take priority."
  },
  {
    "category": "Head-to-Toe Clinical Judgment",
    "question": "Which is the strongest example of clustering findings?",
    "options": [
      "Listing each vital separately",
      "Connecting tachycardia, cool skin, confusion, and low urine output as a perfusion pattern",
      "Recording height and weight",
      "Documenting one chronic diagnosis"
    ],
    "answer": 1,
    "explanation": "Clinical judgment connects related findings into a meaningful pattern."
  },
  {
    "category": "Head-to-Toe Clinical Judgment",
    "question": "After treating acute respiratory distress, reassess first:",
    "options": [
      "Hair",
      "Respiratory effort, oxygenation, pattern, and mental status",
      "Diet preference",
      "Bowel history"
    ],
    "answer": 1,
    "explanation": "Reassess the highest-risk problem first."
  },
  {
    "category": "Head-to-Toe Clinical Judgment",
    "question": "When communicating deterioration, include:",
    "options": [
      "Only “patient looks bad”",
      "Change from baseline, relevant trends/findings, interventions, and response",
      "Only room number",
      "Only diagnosis"
    ],
    "answer": 1,
    "explanation": "Specific trend-based communication supports rapid clinical decision-making."
  },
  {
    "category": "Integrated Clinical Judgment",
    "question": "A patient with pneumonia has SpO₂ 93% on oxygen, RR 28, new confusion, and increasing accessory-muscle use. Which finding most changes the priority?",
    "options": [
      "SpO₂ alone",
      "New confusion plus increased work of breathing",
      "Diagnosis of pneumonia",
      "Oxygen device brand"
    ],
    "answer": 1,
    "explanation": "Neurologic change plus increasing respiratory effort suggests worsening physiologic stress."
  },
  {
    "category": "Integrated Clinical Judgment",
    "question": "A patient reports new chest pressure. HR is 104, skin is cool, and the patient is nauseated. What is the best first approach?",
    "options": [
      "Complete routine foot assessment",
      "Perform focused cardiopulmonary assessment and escalate according to urgency/protocol",
      "Ask about diet only",
      "Wait for pain to reach 10/10"
    ],
    "answer": 1,
    "explanation": "The symptom cluster is potentially serious and requires focused assessment and escalation."
  },
  {
    "category": "Integrated Clinical Judgment",
    "question": "A patient after surgery has increasing abdominal pain, HR 118, BP 92/58, cool skin, and increasing distention. What is the best interpretation?",
    "options": [
      "Pain is the only issue",
      "The patient may be deteriorating; assess ABCs/perfusion and escalate urgently",
      "The BP is acceptable after surgery",
      "Distention is expected"
    ],
    "answer": 1,
    "explanation": "The pattern indicates possible hemodynamic and abdominal deterioration."
  },
  {
    "category": "Integrated Clinical Judgment",
    "question": "An older adult becomes acutely confused. Which additional finding would increase concern for systemic deterioration?",
    "options": [
      "Stable appetite",
      "Tachypnea and decreasing urine output",
      "Chronic hearing loss",
      "Long-standing arthritis"
    ],
    "answer": 1,
    "explanation": "Acute confusion plus respiratory/perfusion changes strengthens concern for systemic illness."
  },
  {
    "category": "Integrated Clinical Judgment",
    "question": "A patient with a lower-leg injury reports worsening pain despite analgesia and develops paresthesia. What assessment has priority?",
    "options": [
      "Bowel sounds",
      "Focused neurovascular assessment",
      "Vision testing",
      "Oral intake"
    ],
    "answer": 1,
    "explanation": "Escalating pain and sensory change can signal neurovascular compromise."
  },
  {
    "category": "Integrated Clinical Judgment",
    "question": "A patient’s monitor shows HR 150, but palpated pulse is 76 and the patient feels well. What is best?",
    "options": [
      "Treat the monitor number immediately without verification",
      "Assess the patient and verify leads/signal/rhythm source",
      "Ignore all future alarms",
      "Document HR 150"
    ],
    "answer": 1,
    "explanation": "Discordant technology requires verification with patient assessment."
  },
  {
    "category": "Integrated Clinical Judgment",
    "question": "Which reassessment best evaluates a bronchodilator intervention?",
    "options": [
      "Hair color",
      "Work of breathing, breath sounds, respiratory rate, symptoms, and oxygenation",
      "Bowel sounds",
      "Pedal edema only"
    ],
    "answer": 1,
    "explanation": "Reassessment should target the problem and expected intervention effect."
  },
  {
    "category": "Integrated Clinical Judgment",
    "question": "Which documentation is most clinically useful?",
    "options": [
      "“Patient worse”",
      "“New confusion from baseline; HR 112 from 82; urine output 20 mL/hr; skin cool; provider/rapid-response process notified per protocol”",
      "“Patient okay”",
      "“Continue to monitor”"
    ],
    "answer": 1,
    "explanation": "Specific changes, trends, and actions communicate clinical significance."
  },
  {
    "category": "Integrated Clinical Judgment",
    "question": "A patient becomes dizzy when standing. What should happen before continuing ambulation?",
    "options": [
      "Tell the patient to push through it",
      "Ensure safety and reassess symptoms/hemodynamics according to protocol",
      "Remove assistive devices",
      "Document independent gait"
    ],
    "answer": 1,
    "explanation": "Safety and reassessment come before continued ambulation."
  },
  {
    "category": "Integrated Clinical Judgment",
    "question": "What is the best reason to compare current findings with baseline?",
    "options": [
      "To avoid documenting new data",
      "A meaningful deterioration may occur while values remain within population reference ranges",
      "Baseline never changes",
      "It replaces clinical judgment"
    ],
    "answer": 1,
    "explanation": "Individual trends can reveal clinically important changes before extreme values appear."
  }
];
