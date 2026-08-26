export const radiographyModules = [
  {
    "number": 1,
    "title": "Patient Care & Professional Practice",
    "description": "Patient identification, communication, scheduling, infection control, mobility, contrast safety, emergencies, documentation, and professional practice.",
    "badge": "Patient Care Specialist",
    "icon": "🩻"
  },
  {
    "number": 2,
    "title": "Radiographic Anatomy & Positioning Foundations",
    "description": "Anatomic planes, landmarks, body habitus, positions, projections, central-ray direction, and positioning terminology.",
    "badge": "Positioning Foundations Specialist",
    "icon": "📐"
  },
  {
    "number": 3,
    "title": "Radiation Physics & X-Ray Production",
    "description": "Atomic interactions, x-ray tube operation, beam production, attenuation, scatter, filtration, and generator concepts.",
    "badge": "Radiation Physics Specialist",
    "icon": "⚛️"
  },
  {
    "number": 4,
    "title": "Exposure Factors & Image Acquisition",
    "description": "kVp, mAs, SID/OID, grids, AEC, digital detectors, exposure indicators, technique changes, and image quality.",
    "badge": "Image Acquisition Specialist",
    "icon": "🎛️"
  },
  {
    "number": 5,
    "title": "Radiation Biology & Protection",
    "description": "Biologic effects, dose, ALARA, pregnancy, collimation, shielding principles, occupational monitoring, and repeat reduction.",
    "badge": "Radiation Safety Specialist",
    "icon": "☢️"
  },
  {
    "number": 6,
    "title": "Chest, Abdomen & Extremity Procedures",
    "description": "Patient-centered positioning, anatomy demonstrated, central-ray placement, breathing, trauma adaptations, and image criteria.",
    "badge": "Core Procedures Specialist",
    "icon": "🫁"
  },
  {
    "number": 7,
    "title": "Spine, Pelvis, Skull & Advanced Procedures",
    "description": "Axial skeleton positioning, trauma modifications, mobile/surgical imaging, fluoroscopic concepts, and advanced procedure decisions.",
    "badge": "Advanced Procedures Specialist",
    "icon": "🦴"
  },
  {
    "number": 8,
    "title": "Image Evaluation & Clinical Judgment",
    "description": "Systematic image critique, positioning error recognition, exposure analysis, artifacts, corrective action, and integrated clinical decisions.",
    "badge": "Clinical Radiography Specialist",
    "icon": "🔎"
  }
];

export const radiographyModuleContent = {
  "1": {
    "briefing": {
      "title": "Patient Care & Professional Practice",
      "summary": "Patient identification, communication, scheduling, infection control, mobility, contrast safety, emergencies, documentation, and professional practice.",
      "objectives": [
        "Verify Before You Expose",
        "Communicate for the Patient in Front of You",
        "Infection Control Follows the Task",
        "Move Patients Without Creating a Second Injury"
      ]
    },
    "lessons": [
      {
        "title": "Verify Before You Expose",
        "body": "Use two patient identifiers and reconcile discrepancies before proceeding. Match the patient, order, body part, laterality, indication, and relevant history before positioning.",
        "takeaway": "A familiar patient or plausible order never replaces positive identification."
      },
      {
        "title": "Communicate for the Patient in Front of You",
        "body": "Adapt explanations to age, cognition, language, anxiety, hearing, pain, and the urgency of the examination. Confirm understanding rather than assuming it.",
        "takeaway": "Effective communication is part of safe image acquisition."
      },
      {
        "title": "Infection Control Follows the Task",
        "body": "Use standard precautions for every patient and add transmission-based precautions when indicated. Handle contaminated equipment and IV supplies according to policy.",
        "takeaway": "Clean technique protects the next patient as much as the current one."
      },
      {
        "title": "Move Patients Without Creating a Second Injury",
        "body": "Assess mobility, lines, drains, oxygen, weight-bearing restrictions, and available help before transfer. Use safe-handling devices when needed.",
        "takeaway": "A technically perfect image is not worth an unsafe transfer."
      },
      {
        "title": "Recognize When the Exam Must Pause",
        "body": "Contrast reactions, syncope, respiratory distress, neurologic change, or unstable vital signs require appropriate escalation and support within role and policy.",
        "takeaway": "Patient stability outranks workflow speed."
      }
    ],
    "scenarios": [
      {
        "title": "Case Review",
        "patient": "A patient states the correct name but gives a date of birth that differs from the order by one digit. The wristband matches the patient’s statement, not the order. What is the best next action.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Use the wristband because it is attached to the patient",
          "Proceed if the requested anatomy matches the complaint",
          "Ask a family member which date of birth is correct",
          "Pause and reconcile the discrepancy before positioning the patient"
        ],
        "answer": 3,
        "explanation": "Conflicting identifiers must be resolved before the examination; neither a plausible order nor a single matching source is enough."
      },
      {
        "title": "Positioning Decision",
        "patient": "An inpatient arrives for a chest exam with oxygen tubing, an IV pump, and a recent fall-risk alert. Which action best prepares for transfer.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Ask the patient to stand while the detector is positioned",
          "Move the patient first and organize the lines afterward",
          "Assess mobility and lines, then obtain appropriate assistance",
          "Disconnect the oxygen briefly to simplify the transfer"
        ],
        "answer": 2,
        "explanation": "Transfer planning should account for mobility, attached devices, and available help before movement begins."
      },
      {
        "title": "Clinical Judgment",
        "patient": "A patient with limited English proficiency nods during instructions but cannot repeat the breathing directions. What is the best response.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Proceed because nodding indicates adequate understanding",
          "Use qualified language assistance and confirm understanding",
          "Repeat the same instructions more slowly and loudly",
          "Ask an accompanying child to interpret the instructions"
        ],
        "answer": 1,
        "explanation": "Communication should be adapted and verified; qualified language support is preferable to assumptions or inappropriate interpreters."
      }
    ],
    "questions": [
      {
        "question": "A patient states the correct name but gives a date of birth that differs from the order by one digit. The wristband matches the patient’s statement, not the order. What is the best next action?",
        "options": [
          "Use the wristband because it is attached to the patient",
          "Proceed if the requested anatomy matches the complaint",
          "Ask a family member which date of birth is correct",
          "Pause and reconcile the discrepancy before positioning the patient"
        ],
        "answer": 3,
        "explanation": "Conflicting identifiers must be resolved before the examination; neither a plausible order nor a single matching source is enough."
      },
      {
        "question": "An inpatient arrives for a chest exam with oxygen tubing, an IV pump, and a recent fall-risk alert. Which action best prepares for transfer?",
        "options": [
          "Ask the patient to stand while the detector is positioned",
          "Move the patient first and organize the lines afterward",
          "Assess mobility and lines, then obtain appropriate assistance",
          "Disconnect the oxygen briefly to simplify the transfer"
        ],
        "answer": 2,
        "explanation": "Transfer planning should account for mobility, attached devices, and available help before movement begins."
      },
      {
        "question": "A patient with limited English proficiency nods during instructions but cannot repeat the breathing directions. What is the best response?",
        "options": [
          "Proceed because nodding indicates adequate understanding",
          "Use qualified language assistance and confirm understanding",
          "Repeat the same instructions more slowly and loudly",
          "Ask an accompanying child to interpret the instructions"
        ],
        "answer": 1,
        "explanation": "Communication should be adapted and verified; qualified language support is preferable to assumptions or inappropriate interpreters."
      },
      {
        "question": "During preparation for a contrast-related procedure, the patient reports a prior severe reaction but the order contains no allergy information. What should the technologist do?",
        "options": [
          "Stop and communicate the history before proceeding",
          "Proceed because the current order is already authorized",
          "Document the history only after the procedure is finished",
          "Ask the patient whether the prior reaction felt serious"
        ],
        "answer": 0,
        "explanation": "A potentially significant prior reaction requires clarification and communication before contrast administration."
      },
      {
        "question": "A patient becomes pale and diaphoretic while upright for imaging and says, “I feel like I’m going to pass out.” What is the priority?",
        "options": [
          "Finish the exposure quickly before changing the position",
          "Ask the patient to hold still until symptoms improve",
          "Leave the patient standing while obtaining assistance",
          "Protect the patient from falling and initiate appropriate assessment"
        ],
        "answer": 3,
        "explanation": "Immediate patient safety and assessment take priority over completing the exposure."
      },
      {
        "question": "A patient states the correct name but gives a date of birth that differs from the order by one digit. The wristband matches the patient’s statement, not the order. Which is the best next action Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Proceed if the requested anatomy matches the complaint",
          "Ask a family member which date of birth is correct",
          "Pause and reconcile the discrepancy before positioning the patient",
          "Use the wristband because it is attached to the patient"
        ],
        "answer": 2,
        "explanation": "Conflicting identifiers must be resolved before the examination; neither a plausible order nor a single matching source is enough."
      },
      {
        "question": "An inpatient arrives for a chest exam with oxygen tubing, an IV pump, and a recent fall-risk alert. Which action best prepares for transfer Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Move the patient first and organize the lines afterward",
          "Assess mobility and lines, then obtain appropriate assistance",
          "Disconnect the oxygen briefly to simplify the transfer",
          "Ask the patient to stand while the detector is positioned"
        ],
        "answer": 1,
        "explanation": "Transfer planning should account for mobility, attached devices, and available help before movement begins."
      },
      {
        "question": "A patient with limited English proficiency nods during instructions but cannot repeat the breathing directions. Which is the best response Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Use qualified language assistance and confirm understanding",
          "Repeat the same instructions more slowly and loudly",
          "Ask an accompanying child to interpret the instructions",
          "Proceed because nodding indicates adequate understanding"
        ],
        "answer": 0,
        "explanation": "Communication should be adapted and verified; qualified language support is preferable to assumptions or inappropriate interpreters."
      },
      {
        "question": "During preparation for a contrast-related procedure, the patient reports a prior severe reaction but the order contains no allergy information. What should the technologist do Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Proceed because the current order is already authorized",
          "Document the history only after the procedure is finished",
          "Ask the patient whether the prior reaction felt serious",
          "Stop and communicate the history before proceeding"
        ],
        "answer": 3,
        "explanation": "A potentially significant prior reaction requires clarification and communication before contrast administration."
      },
      {
        "question": "A patient becomes pale and diaphoretic while upright for imaging and says, “I feel like I’m going to pass out.” What is the priority Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Ask the patient to hold still until symptoms improve",
          "Leave the patient standing while obtaining assistance",
          "Protect the patient from falling and initiate appropriate assessment",
          "Finish the exposure quickly before changing the position"
        ],
        "answer": 2,
        "explanation": "Immediate patient safety and assessment take priority over completing the exposure."
      },
      {
        "question": "A patient states the correct name but gives a date of birth that differs from the order by one digit. The wristband matches the patient’s statement, not the order. What is the best next action Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Ask a family member which date of birth is correct",
          "Pause and reconcile the discrepancy before positioning the patient",
          "Use the wristband because it is attached to the patient",
          "Proceed if the requested anatomy matches the complaint"
        ],
        "answer": 1,
        "explanation": "Conflicting identifiers must be resolved before the examination; neither a plausible order nor a single matching source is enough."
      },
      {
        "question": "An inpatient arrives for a chest exam with oxygen tubing, an IV pump, and a recent fall-risk alert. Which action best prepares for transfer Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Assess mobility and lines, then obtain appropriate assistance",
          "Disconnect the oxygen briefly to simplify the transfer",
          "Ask the patient to stand while the detector is positioned",
          "Move the patient first and organize the lines afterward"
        ],
        "answer": 0,
        "explanation": "Transfer planning should account for mobility, attached devices, and available help before movement begins."
      },
      {
        "question": "A patient with limited English proficiency nods during instructions but cannot repeat the breathing directions. What is the best response Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Repeat the same instructions more slowly and loudly",
          "Ask an accompanying child to interpret the instructions",
          "Proceed because nodding indicates adequate understanding",
          "Use qualified language assistance and confirm understanding"
        ],
        "answer": 3,
        "explanation": "Communication should be adapted and verified; qualified language support is preferable to assumptions or inappropriate interpreters."
      },
      {
        "question": "During preparation for a contrast-related procedure, the patient reports a prior severe reaction but the order contains no allergy information. What should the technologist do Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Document the history only after the procedure is finished",
          "Ask the patient whether the prior reaction felt serious",
          "Stop and communicate the history before proceeding",
          "Proceed because the current order is already authorized"
        ],
        "answer": 2,
        "explanation": "A potentially significant prior reaction requires clarification and communication before contrast administration."
      },
      {
        "question": "A patient becomes pale and diaphoretic while upright for imaging and says, “I feel like I’m going to pass out.” What is the priority Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Leave the patient standing while obtaining assistance",
          "Protect the patient from falling and initiate appropriate assessment",
          "Finish the exposure quickly before changing the position",
          "Ask the patient to hold still until symptoms improve"
        ],
        "answer": 1,
        "explanation": "Immediate patient safety and assessment take priority over completing the exposure."
      }
    ]
  },
  "2": {
    "briefing": {
      "title": "Radiographic Anatomy & Positioning Foundations",
      "summary": "Anatomic planes, landmarks, body habitus, positions, projections, central-ray direction, and positioning terminology.",
      "objectives": [
        "Position, Projection, and View Are Not Synonyms",
        "Use Landmarks, Not Guesswork",
        "Planes Organize the Body",
        "Central Ray Geometry Matters"
      ]
    },
    "lessons": [
      {
        "title": "Position, Projection, and View Are Not Synonyms",
        "body": "Position describes how the patient is placed; projection describes the path of the central ray; view describes the image as seen.",
        "takeaway": "Precise language prevents positioning errors."
      },
      {
        "title": "Use Landmarks, Not Guesswork",
        "body": "Surface landmarks help center the anatomy and choose the field. Body habitus and patient condition may shift expected relationships.",
        "takeaway": "Center to anatomy, then verify with image criteria."
      },
      {
        "title": "Planes Organize the Body",
        "body": "Sagittal, coronal, transverse, and oblique relationships guide rotation and alignment.",
        "takeaway": "Small rotational errors can hide or distort anatomy."
      },
      {
        "title": "Central Ray Geometry Matters",
        "body": "Tube angle, part alignment, detector alignment, SID, and OID influence shape and recorded detail.",
        "takeaway": "Positioning and geometry are inseparable."
      },
      {
        "title": "Image Criteria Close the Loop",
        "body": "A named projection is not complete until the required anatomy, rotation, collimation, and exposure are evaluated.",
        "takeaway": "Positioning is judged by the resulting image, not by intention."
      }
    ],
    "scenarios": [
      {
        "title": "Case Review",
        "patient": "A technologist intends a true lateral knee, but the femoral condyles are not superimposed on the image. Which conclusion is most appropriate.",
        "question": "Which response best addresses this situation?",
        "options": [
          "The mAs was too low and changed joint alignment",
          "The collimation field was too small for the detector",
          "The part was rotated and requires positioning correction",
          "The SID was too long and reduced recorded detail"
        ],
        "answer": 2,
        "explanation": "Failure to superimpose structures expected on a lateral image indicates rotational positioning error."
      },
      {
        "title": "Positioning Decision",
        "patient": "A patient with a broad, hypersthenic body habitus is positioned using a memorized centering point, but the required anatomy is clipped. What is the best lesson.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Rotate the patient slightly to move anatomy toward the field",
          "Use palpable anatomy and image requirements rather than fixed distances alone",
          "Increase SID so more anatomy automatically fits the detector",
          "Increase kVp because penetration determines anatomic coverage"
        ],
        "answer": 1,
        "explanation": "Body habitus changes anatomic relationships; centering should be based on landmarks and required coverage."
      },
      {
        "title": "Clinical Judgment",
        "patient": "The central ray is angled while the part and detector remain parallel. Which geometric effect is most likely if the angle is not required by the projection.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Shape distortion from misalignment of the imaging components",
          "Uniform magnification caused only by increased SID",
          "Loss of receptor exposure caused by reduced tube current",
          "Improved spatial resolution from a smaller effective field"
        ],
        "answer": 0,
        "explanation": "Misalignment of tube, part, and detector can produce shape distortion."
      }
    ],
    "questions": [
      {
        "question": "A technologist intends a true lateral knee, but the femoral condyles are not superimposed on the image. Which conclusion is most appropriate?",
        "options": [
          "The mAs was too low and changed joint alignment",
          "The collimation field was too small for the detector",
          "The part was rotated and requires positioning correction",
          "The SID was too long and reduced recorded detail"
        ],
        "answer": 2,
        "explanation": "Failure to superimpose structures expected on a lateral image indicates rotational positioning error."
      },
      {
        "question": "A patient with a broad, hypersthenic body habitus is positioned using a memorized centering point, but the required anatomy is clipped. What is the best lesson?",
        "options": [
          "Rotate the patient slightly to move anatomy toward the field",
          "Use palpable anatomy and image requirements rather than fixed distances alone",
          "Increase SID so more anatomy automatically fits the detector",
          "Increase kVp because penetration determines anatomic coverage"
        ],
        "answer": 1,
        "explanation": "Body habitus changes anatomic relationships; centering should be based on landmarks and required coverage."
      },
      {
        "question": "The central ray is angled while the part and detector remain parallel. Which geometric effect is most likely if the angle is not required by the projection?",
        "options": [
          "Shape distortion from misalignment of the imaging components",
          "Uniform magnification caused only by increased SID",
          "Loss of receptor exposure caused by reduced tube current",
          "Improved spatial resolution from a smaller effective field"
        ],
        "answer": 0,
        "explanation": "Misalignment of tube, part, and detector can produce shape distortion."
      },
      {
        "question": "Which description best distinguishes an AP projection from an AP position?",
        "options": [
          "Projection describes patient placement; position describes ray path",
          "Projection describes detector size; position describes field size",
          "Projection describes anatomy; position describes exposure technique",
          "Projection describes ray path; position describes patient placement"
        ],
        "answer": 3,
        "explanation": "Projection refers to the direction of the central ray through the patient; position refers to how the patient is placed."
      },
      {
        "question": "A marker is visible, anatomy is included, and exposure is adequate, but a joint space expected to be open is closed. What should be evaluated first?",
        "options": [
          "Patient identification and order-entry information",
          "Tube heat units and generator waveform",
          "Part alignment and central-ray relationship to the joint",
          "Detector exposure indicator and processing algorithm"
        ],
        "answer": 2,
        "explanation": "Closed joint spaces commonly reflect alignment/angle problems rather than exposure or administrative issues."
      },
      {
        "question": "A technologist intends a true lateral knee, but the femoral condyles are not superimposed on the image. Which conclusion is most appropriate Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "The collimation field was too small for the detector",
          "The part was rotated and requires positioning correction",
          "The SID was too long and reduced recorded detail",
          "The mAs was too low and changed joint alignment"
        ],
        "answer": 1,
        "explanation": "Failure to superimpose structures expected on a lateral image indicates rotational positioning error."
      },
      {
        "question": "A patient with a broad, hypersthenic body habitus is positioned using a memorized centering point, but the required anatomy is clipped. Which is the best lesson Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Use palpable anatomy and image requirements rather than fixed distances alone",
          "Increase SID so more anatomy automatically fits the detector",
          "Increase kVp because penetration determines anatomic coverage",
          "Rotate the patient slightly to move anatomy toward the field"
        ],
        "answer": 0,
        "explanation": "Body habitus changes anatomic relationships; centering should be based on landmarks and required coverage."
      },
      {
        "question": "The central ray is angled while the part and detector remain parallel. Which geometric effect is most likely if the angle is not required by the projection Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Uniform magnification caused only by increased SID",
          "Loss of receptor exposure caused by reduced tube current",
          "Improved spatial resolution from a smaller effective field",
          "Shape distortion from misalignment of the imaging components"
        ],
        "answer": 3,
        "explanation": "Misalignment of tube, part, and detector can produce shape distortion."
      },
      {
        "question": "Which description best distinguishes an AP projection from an AP position Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Projection describes detector size; position describes field size",
          "Projection describes anatomy; position describes exposure technique",
          "Projection describes ray path; position describes patient placement",
          "Projection describes patient placement; position describes ray path"
        ],
        "answer": 2,
        "explanation": "Projection refers to the direction of the central ray through the patient; position refers to how the patient is placed."
      },
      {
        "question": "A marker is visible, anatomy is included, and exposure is adequate, but a joint space expected to be open is closed. What should be evaluated first Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Tube heat units and generator waveform",
          "Part alignment and central-ray relationship to the joint",
          "Detector exposure indicator and processing algorithm",
          "Patient identification and order-entry information"
        ],
        "answer": 1,
        "explanation": "Closed joint spaces commonly reflect alignment/angle problems rather than exposure or administrative issues."
      },
      {
        "question": "A technologist intends a true lateral knee, but the femoral condyles are not superimposed on the image. Which conclusion is most appropriate Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "The part was rotated and requires positioning correction",
          "The SID was too long and reduced recorded detail",
          "The mAs was too low and changed joint alignment",
          "The collimation field was too small for the detector"
        ],
        "answer": 0,
        "explanation": "Failure to superimpose structures expected on a lateral image indicates rotational positioning error."
      },
      {
        "question": "A patient with a broad, hypersthenic body habitus is positioned using a memorized centering point, but the required anatomy is clipped. What is the best lesson Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Increase SID so more anatomy automatically fits the detector",
          "Increase kVp because penetration determines anatomic coverage",
          "Rotate the patient slightly to move anatomy toward the field",
          "Use palpable anatomy and image requirements rather than fixed distances alone"
        ],
        "answer": 3,
        "explanation": "Body habitus changes anatomic relationships; centering should be based on landmarks and required coverage."
      },
      {
        "question": "The central ray is angled while the part and detector remain parallel. Which geometric effect is most likely if the angle is not required by the projection Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Loss of receptor exposure caused by reduced tube current",
          "Improved spatial resolution from a smaller effective field",
          "Shape distortion from misalignment of the imaging components",
          "Uniform magnification caused only by increased SID"
        ],
        "answer": 2,
        "explanation": "Misalignment of tube, part, and detector can produce shape distortion."
      },
      {
        "question": "Which description best distinguishes an AP projection from an AP position Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Projection describes anatomy; position describes exposure technique",
          "Projection describes ray path; position describes patient placement",
          "Projection describes patient placement; position describes ray path",
          "Projection describes detector size; position describes field size"
        ],
        "answer": 1,
        "explanation": "Projection refers to the direction of the central ray through the patient; position refers to how the patient is placed."
      },
      {
        "question": "A marker is visible, anatomy is included, and exposure is adequate, but a joint space expected to be open is closed. What should be evaluated first Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Part alignment and central-ray relationship to the joint",
          "Detector exposure indicator and processing algorithm",
          "Patient identification and order-entry information",
          "Tube heat units and generator waveform"
        ],
        "answer": 0,
        "explanation": "Closed joint spaces commonly reflect alignment/angle problems rather than exposure or administrative issues."
      }
    ]
  },
  "3": {
    "briefing": {
      "title": "Radiation Physics & X-Ray Production",
      "summary": "Atomic interactions, x-ray tube operation, beam production, attenuation, scatter, filtration, and generator concepts.",
      "objectives": [
        "X-Rays Begin With Electron Energy",
        "Bremsstrahlung and Characteristic Radiation",
        "Attenuation Shapes the Image",
        "Filtration and Collimation Have Different Jobs"
      ]
    },
    "lessons": [
      {
        "title": "X-Rays Begin With Electron Energy",
        "body": "Thermionic emission supplies electrons; the potential difference accelerates them toward the anode target, where kinetic energy becomes x-rays and heat.",
        "takeaway": "Tube current and tube potential affect different parts of production."
      },
      {
        "title": "Bremsstrahlung and Characteristic Radiation",
        "body": "Most diagnostic x-rays arise from electron interactions with the target nucleus; characteristic photons arise after inner-shell ionization and electron-shell transitions.",
        "takeaway": "Know the mechanism, not just the vocabulary."
      },
      {
        "title": "Attenuation Shapes the Image",
        "body": "Photoelectric absorption and Compton scatter change beam intensity and image information differently. Tissue composition, thickness, and photon energy matter.",
        "takeaway": "Scatter reduces image contrast and adds unnecessary exposure."
      },
      {
        "title": "Filtration and Collimation Have Different Jobs",
        "body": "Filtration removes low-energy photons from the beam; collimation limits field size and reduces irradiated tissue and scatter production.",
        "takeaway": "Do not treat beam quality and field size as the same control."
      },
      {
        "title": "Generator and Tube Choices Affect Output",
        "body": "Rectification, waveform, focal spot, anode heat capacity, and tube loading influence how an exposure can be produced safely and consistently.",
        "takeaway": "Physics becomes useful when it predicts the image and equipment limits."
      }
    ],
    "scenarios": [
      {
        "title": "Case Review",
        "patient": "An exposure is made with increased tube current while kVp and time are unchanged. Which change occurs most directly at the x-ray tube.",
        "question": "Which response best addresses this situation?",
        "options": [
          "The focal spot becomes smaller because current increased",
          "More electrons cross the tube per unit time",
          "Electrons strike the target with greater kinetic energy",
          "The average photon energy rises without changing quantity"
        ],
        "answer": 1,
        "explanation": "Tube current controls the rate of electron flow and therefore primarily affects photon quantity."
      },
      {
        "title": "Positioning Decision",
        "patient": "A photon transfers part of its energy to an outer-shell electron and changes direction. Which interaction occurred.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Compton scatter",
          "Photoelectric absorption",
          "Pair production",
          "Coherent tube emission"
        ],
        "answer": 0,
        "explanation": "Compton interaction produces a scattered photon and recoil electron after partial energy transfer."
      },
      {
        "title": "Clinical Judgment",
        "patient": "A thicker patient produces more scatter at the same field size and technique. Which change most directly reduces scatter production.",
        "question": "Which response best addresses this situation?",
        "options": [
          "A larger detector to capture the full scatter field",
          "A higher mAs to improve detector signal",
          "A shorter SID to increase beam intensity",
          "Tighter collimation to the anatomy of interest"
        ],
        "answer": 3,
        "explanation": "Reducing field size decreases the volume of tissue irradiated and therefore reduces scatter production."
      }
    ],
    "questions": [
      {
        "question": "An exposure is made with increased tube current while kVp and time are unchanged. Which change occurs most directly at the x-ray tube?",
        "options": [
          "The focal spot becomes smaller because current increased",
          "More electrons cross the tube per unit time",
          "Electrons strike the target with greater kinetic energy",
          "The average photon energy rises without changing quantity"
        ],
        "answer": 1,
        "explanation": "Tube current controls the rate of electron flow and therefore primarily affects photon quantity."
      },
      {
        "question": "A photon transfers part of its energy to an outer-shell electron and changes direction. Which interaction occurred?",
        "options": [
          "Compton scatter",
          "Photoelectric absorption",
          "Pair production",
          "Coherent tube emission"
        ],
        "answer": 0,
        "explanation": "Compton interaction produces a scattered photon and recoil electron after partial energy transfer."
      },
      {
        "question": "A thicker patient produces more scatter at the same field size and technique. Which change most directly reduces scatter production?",
        "options": [
          "A larger detector to capture the full scatter field",
          "A higher mAs to improve detector signal",
          "A shorter SID to increase beam intensity",
          "Tighter collimation to the anatomy of interest"
        ],
        "answer": 3,
        "explanation": "Reducing field size decreases the volume of tissue irradiated and therefore reduces scatter production."
      },
      {
        "question": "Additional filtration is introduced into the useful beam. Which effect is expected?",
        "options": [
          "Photon quantity increases because tube current is unchanged",
          "Scatter production rises because field size becomes larger",
          "Low-energy photons are preferentially removed from the beam",
          "High-energy photons are converted into characteristic radiation"
        ],
        "answer": 2,
        "explanation": "Filtration preferentially removes low-energy photons that contribute to skin dose without useful image formation."
      },
      {
        "question": "A technologist selects a smaller focal spot for a detail-sensitive exam. What tradeoff should be anticipated?",
        "options": [
          "More scatter cleanup without using a grid",
          "Improved geometric detail with more restrictive tube loading",
          "Greater photon energy with less anode heat production",
          "Lower patient dose regardless of the selected technique"
        ],
        "answer": 1,
        "explanation": "A smaller focal spot improves spatial resolution but typically limits allowable tube loading because heat is concentrated over a smaller target area."
      },
      {
        "question": "An exposure is made with increased tube current while kVp and time are unchanged. Which change occurs most directly at the x-ray tube Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "More electrons cross the tube per unit time",
          "Electrons strike the target with greater kinetic energy",
          "The average photon energy rises without changing quantity",
          "The focal spot becomes smaller because current increased"
        ],
        "answer": 0,
        "explanation": "Tube current controls the rate of electron flow and therefore primarily affects photon quantity."
      },
      {
        "question": "A photon transfers part of its energy to an outer-shell electron and changes direction. Which interaction occurred Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Photoelectric absorption",
          "Pair production",
          "Coherent tube emission",
          "Compton scatter"
        ],
        "answer": 3,
        "explanation": "Compton interaction produces a scattered photon and recoil electron after partial energy transfer."
      },
      {
        "question": "A thicker patient produces more scatter at the same field size and technique. Which change most directly reduces scatter production Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "A higher mAs to improve detector signal",
          "A shorter SID to increase beam intensity",
          "Tighter collimation to the anatomy of interest",
          "A larger detector to capture the full scatter field"
        ],
        "answer": 2,
        "explanation": "Reducing field size decreases the volume of tissue irradiated and therefore reduces scatter production."
      },
      {
        "question": "Additional filtration is introduced into the useful beam. Which effect is expected Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Scatter production rises because field size becomes larger",
          "Low-energy photons are preferentially removed from the beam",
          "High-energy photons are converted into characteristic radiation",
          "Photon quantity increases because tube current is unchanged"
        ],
        "answer": 1,
        "explanation": "Filtration preferentially removes low-energy photons that contribute to skin dose without useful image formation."
      },
      {
        "question": "A technologist selects a smaller focal spot for a detail-sensitive exam. What tradeoff should be anticipated Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Improved geometric detail with more restrictive tube loading",
          "Greater photon energy with less anode heat production",
          "Lower patient dose regardless of the selected technique",
          "More scatter cleanup without using a grid"
        ],
        "answer": 0,
        "explanation": "A smaller focal spot improves spatial resolution but typically limits allowable tube loading because heat is concentrated over a smaller target area."
      },
      {
        "question": "An exposure is made with increased tube current while kVp and time are unchanged. Which change occurs most directly at the x-ray tube Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Electrons strike the target with greater kinetic energy",
          "The average photon energy rises without changing quantity",
          "The focal spot becomes smaller because current increased",
          "More electrons cross the tube per unit time"
        ],
        "answer": 3,
        "explanation": "Tube current controls the rate of electron flow and therefore primarily affects photon quantity."
      },
      {
        "question": "A photon transfers part of its energy to an outer-shell electron and changes direction. Which interaction occurred Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Pair production",
          "Coherent tube emission",
          "Compton scatter",
          "Photoelectric absorption"
        ],
        "answer": 2,
        "explanation": "Compton interaction produces a scattered photon and recoil electron after partial energy transfer."
      },
      {
        "question": "A thicker patient produces more scatter at the same field size and technique. Which change most directly reduces scatter production Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "A shorter SID to increase beam intensity",
          "Tighter collimation to the anatomy of interest",
          "A larger detector to capture the full scatter field",
          "A higher mAs to improve detector signal"
        ],
        "answer": 1,
        "explanation": "Reducing field size decreases the volume of tissue irradiated and therefore reduces scatter production."
      },
      {
        "question": "Additional filtration is introduced into the useful beam. Which effect is expected Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Low-energy photons are preferentially removed from the beam",
          "High-energy photons are converted into characteristic radiation",
          "Photon quantity increases because tube current is unchanged",
          "Scatter production rises because field size becomes larger"
        ],
        "answer": 0,
        "explanation": "Filtration preferentially removes low-energy photons that contribute to skin dose without useful image formation."
      },
      {
        "question": "A technologist selects a smaller focal spot for a detail-sensitive exam. What tradeoff should be anticipated Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Greater photon energy with less anode heat production",
          "Lower patient dose regardless of the selected technique",
          "More scatter cleanup without using a grid",
          "Improved geometric detail with more restrictive tube loading"
        ],
        "answer": 3,
        "explanation": "A smaller focal spot improves spatial resolution but typically limits allowable tube loading because heat is concentrated over a smaller target area."
      },
      {
        "question": "An exposure is made with increased tube current while kVp and time are unchanged. Which change occurs most directly at the x-ray tube Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "The average photon energy rises without changing quantity",
          "The focal spot becomes smaller because current increased",
          "More electrons cross the tube per unit time",
          "Electrons strike the target with greater kinetic energy"
        ],
        "answer": 2,
        "explanation": "Tube current controls the rate of electron flow and therefore primarily affects photon quantity."
      },
      {
        "question": "A photon transfers part of its energy to an outer-shell electron and changes direction. Which interaction occurred Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Coherent tube emission",
          "Compton scatter",
          "Photoelectric absorption",
          "Pair production"
        ],
        "answer": 1,
        "explanation": "Compton interaction produces a scattered photon and recoil electron after partial energy transfer."
      },
      {
        "question": "A thicker patient produces more scatter at the same field size and technique. Which change most directly reduces scatter production Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Tighter collimation to the anatomy of interest",
          "A larger detector to capture the full scatter field",
          "A higher mAs to improve detector signal",
          "A shorter SID to increase beam intensity"
        ],
        "answer": 0,
        "explanation": "Reducing field size decreases the volume of tissue irradiated and therefore reduces scatter production."
      }
    ]
  },
  "4": {
    "briefing": {
      "title": "Exposure Factors & Image Acquisition",
      "summary": "kVp, mAs, SID/OID, grids, AEC, digital detectors, exposure indicators, technique changes, and image quality.",
      "objectives": [
        "Technique Changes Have Tradeoffs",
        "Geometry Changes Detail and Magnification",
        "Grids Require Deliberate Technique",
        "AEC Is Not Autopilot"
      ]
    },
    "lessons": [
      {
        "title": "Technique Changes Have Tradeoffs",
        "body": "mAs strongly influences photon quantity; kVp influences photon energy and also affects receptor exposure and contrast relationships.",
        "takeaway": "Choose the control that addresses the actual problem."
      },
      {
        "title": "Geometry Changes Detail and Magnification",
        "body": "SID, OID, focal spot size, and alignment influence magnification, distortion, and spatial resolution.",
        "takeaway": "Moving the patient or detector can change more than framing."
      },
      {
        "title": "Grids Require Deliberate Technique",
        "body": "A grid reduces scatter reaching the detector but also removes useful photons, so technique and alignment matter.",
        "takeaway": "Grid use can improve contrast while increasing exposure requirements."
      },
      {
        "title": "AEC Is Not Autopilot",
        "body": "Chamber selection, anatomy coverage, centering, collimation, detector response, and backup settings influence AEC performance.",
        "takeaway": "AEC cannot correct poor positioning or the wrong chamber."
      },
      {
        "title": "Digital Systems Can Hide Overexposure",
        "body": "Post-processing can normalize brightness even when detector exposure is excessive. Exposure indicators and technique history remain important.",
        "takeaway": "A pretty image does not prove an appropriate exposure."
      }
    ],
    "scenarios": [
      {
        "title": "Case Review",
        "patient": "A radiograph has adequate penetration but the exposure indicator shows substantially excessive detector exposure. Which change most directly reduces detector exposure while preserving beam penetration.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Reduce mAs while maintaining the selected kVp",
          "Reduce kVp while maintaining the selected mAs",
          "Increase OID while maintaining both exposure factors",
          "Decrease SID while maintaining both exposure factors"
        ],
        "answer": 0,
        "explanation": "Reducing mAs primarily reduces photon quantity while preserving the selected beam energy/penetration."
      },
      {
        "title": "Positioning Decision",
        "patient": "A patient is moved farther from the detector while SID remains unchanged. What combination is most likely.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Less magnification and improved recorded spatial detail",
          "Higher beam energy and lower scatter production",
          "Lower detector exposure with unchanged geometric sharpness",
          "Greater magnification and reduced recorded spatial detail"
        ],
        "answer": 3,
        "explanation": "Increasing OID increases magnification and geometric unsharpness."
      },
      {
        "title": "Clinical Judgment",
        "patient": "An AEC chest exposure terminates too early because the selected chamber is partly outside the lung field. What is the best correction.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Increase mA because AEC responds directly to tube current",
          "Open collimation so every chamber receives scatter radiation",
          "Reposition and select a chamber fully covered by the intended anatomy",
          "Increase backup time so the exposure cannot terminate early"
        ],
        "answer": 2,
        "explanation": "AEC depends on correct chamber selection and positioning; changing backup or mA does not fix an uncovered chamber."
      }
    ],
    "questions": [
      {
        "question": "A radiograph has adequate penetration but the exposure indicator shows substantially excessive detector exposure. Which change most directly reduces detector exposure while preserving beam penetration?",
        "options": [
          "Reduce mAs while maintaining the selected kVp",
          "Reduce kVp while maintaining the selected mAs",
          "Increase OID while maintaining both exposure factors",
          "Decrease SID while maintaining both exposure factors"
        ],
        "answer": 0,
        "explanation": "Reducing mAs primarily reduces photon quantity while preserving the selected beam energy/penetration."
      },
      {
        "question": "A patient is moved farther from the detector while SID remains unchanged. What combination is most likely?",
        "options": [
          "Less magnification and improved recorded spatial detail",
          "Higher beam energy and lower scatter production",
          "Lower detector exposure with unchanged geometric sharpness",
          "Greater magnification and reduced recorded spatial detail"
        ],
        "answer": 3,
        "explanation": "Increasing OID increases magnification and geometric unsharpness."
      },
      {
        "question": "An AEC chest exposure terminates too early because the selected chamber is partly outside the lung field. What is the best correction?",
        "options": [
          "Increase mA because AEC responds directly to tube current",
          "Open collimation so every chamber receives scatter radiation",
          "Reposition and select a chamber fully covered by the intended anatomy",
          "Increase backup time so the exposure cannot terminate early"
        ],
        "answer": 2,
        "explanation": "AEC depends on correct chamber selection and positioning; changing backup or mA does not fix an uncovered chamber."
      },
      {
        "question": "A grid is added for a thicker body part without changing other factors. What is the most likely immediate effect?",
        "options": [
          "Beam energy increases because the grid hardens the beam",
          "Less scatter reaches the detector but receptor exposure may fall",
          "More scatter reaches the detector and receptor exposure rises",
          "Magnification decreases because the grid reduces OID"
        ],
        "answer": 1,
        "explanation": "A grid removes scatter and some primary radiation, often requiring an exposure increase to maintain receptor exposure."
      },
      {
        "question": "Two digital images appear similarly bright after processing, but one has a much higher exposure indicator than target. What should the technologist conclude?",
        "options": [
          "Display brightness can mask excessive detector exposure",
          "The images received identical detector exposure",
          "Post-processing eliminates any patient-dose difference",
          "Exposure indicators are unrelated to technique selection"
        ],
        "answer": 0,
        "explanation": "Digital processing can normalize brightness, so exposure indicators help reveal dose creep or excessive receptor exposure."
      },
      {
        "question": "A radiograph has adequate penetration but the exposure indicator shows substantially excessive detector exposure. Which change most directly reduces detector exposure while preserving beam penetration Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Reduce kVp while maintaining the selected mAs",
          "Increase OID while maintaining both exposure factors",
          "Decrease SID while maintaining both exposure factors",
          "Reduce mAs while maintaining the selected kVp"
        ],
        "answer": 3,
        "explanation": "Reducing mAs primarily reduces photon quantity while preserving the selected beam energy/penetration."
      },
      {
        "question": "A patient is moved farther from the detector while SID remains unchanged. What combination is most likely Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Higher beam energy and lower scatter production",
          "Lower detector exposure with unchanged geometric sharpness",
          "Greater magnification and reduced recorded spatial detail",
          "Less magnification and improved recorded spatial detail"
        ],
        "answer": 2,
        "explanation": "Increasing OID increases magnification and geometric unsharpness."
      },
      {
        "question": "An AEC chest exposure terminates too early because the selected chamber is partly outside the lung field. Which is the best correction Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Open collimation so every chamber receives scatter radiation",
          "Reposition and select a chamber fully covered by the intended anatomy",
          "Increase backup time so the exposure cannot terminate early",
          "Increase mA because AEC responds directly to tube current"
        ],
        "answer": 1,
        "explanation": "AEC depends on correct chamber selection and positioning; changing backup or mA does not fix an uncovered chamber."
      },
      {
        "question": "A grid is added for a thicker body part without changing other factors. What is the most likely immediate effect Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Less scatter reaches the detector but receptor exposure may fall",
          "More scatter reaches the detector and receptor exposure rises",
          "Magnification decreases because the grid reduces OID",
          "Beam energy increases because the grid hardens the beam"
        ],
        "answer": 0,
        "explanation": "A grid removes scatter and some primary radiation, often requiring an exposure increase to maintain receptor exposure."
      },
      {
        "question": "Two digital images appear similarly bright after processing, but one has a much higher exposure indicator than target. What should the technologist conclude Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "The images received identical detector exposure",
          "Post-processing eliminates any patient-dose difference",
          "Exposure indicators are unrelated to technique selection",
          "Display brightness can mask excessive detector exposure"
        ],
        "answer": 3,
        "explanation": "Digital processing can normalize brightness, so exposure indicators help reveal dose creep or excessive receptor exposure."
      },
      {
        "question": "A radiograph has adequate penetration but the exposure indicator shows substantially excessive detector exposure. Which change most directly reduces detector exposure while preserving beam penetration Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Increase OID while maintaining both exposure factors",
          "Decrease SID while maintaining both exposure factors",
          "Reduce mAs while maintaining the selected kVp",
          "Reduce kVp while maintaining the selected mAs"
        ],
        "answer": 2,
        "explanation": "Reducing mAs primarily reduces photon quantity while preserving the selected beam energy/penetration."
      },
      {
        "question": "A patient is moved farther from the detector while SID remains unchanged. What combination is most likely Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Lower detector exposure with unchanged geometric sharpness",
          "Greater magnification and reduced recorded spatial detail",
          "Less magnification and improved recorded spatial detail",
          "Higher beam energy and lower scatter production"
        ],
        "answer": 1,
        "explanation": "Increasing OID increases magnification and geometric unsharpness."
      },
      {
        "question": "An AEC chest exposure terminates too early because the selected chamber is partly outside the lung field. What is the best correction Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Reposition and select a chamber fully covered by the intended anatomy",
          "Increase backup time so the exposure cannot terminate early",
          "Increase mA because AEC responds directly to tube current",
          "Open collimation so every chamber receives scatter radiation"
        ],
        "answer": 0,
        "explanation": "AEC depends on correct chamber selection and positioning; changing backup or mA does not fix an uncovered chamber."
      },
      {
        "question": "A grid is added for a thicker body part without changing other factors. What is the most likely immediate effect Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "More scatter reaches the detector and receptor exposure rises",
          "Magnification decreases because the grid reduces OID",
          "Beam energy increases because the grid hardens the beam",
          "Less scatter reaches the detector but receptor exposure may fall"
        ],
        "answer": 3,
        "explanation": "A grid removes scatter and some primary radiation, often requiring an exposure increase to maintain receptor exposure."
      },
      {
        "question": "Two digital images appear similarly bright after processing, but one has a much higher exposure indicator than target. What should the technologist conclude Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Post-processing eliminates any patient-dose difference",
          "Exposure indicators are unrelated to technique selection",
          "Display brightness can mask excessive detector exposure",
          "The images received identical detector exposure"
        ],
        "answer": 2,
        "explanation": "Digital processing can normalize brightness, so exposure indicators help reveal dose creep or excessive receptor exposure."
      },
      {
        "question": "A radiograph has adequate penetration but the exposure indicator shows substantially excessive detector exposure. Which change most directly reduces detector exposure while preserving beam penetration Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Decrease SID while maintaining both exposure factors",
          "Reduce mAs while maintaining the selected kVp",
          "Reduce kVp while maintaining the selected mAs",
          "Increase OID while maintaining both exposure factors"
        ],
        "answer": 1,
        "explanation": "Reducing mAs primarily reduces photon quantity while preserving the selected beam energy/penetration."
      },
      {
        "question": "A patient is moved farther from the detector while SID remains unchanged. What combination is most likely Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Greater magnification and reduced recorded spatial detail",
          "Less magnification and improved recorded spatial detail",
          "Higher beam energy and lower scatter production",
          "Lower detector exposure with unchanged geometric sharpness"
        ],
        "answer": 0,
        "explanation": "Increasing OID increases magnification and geometric unsharpness."
      },
      {
        "question": "An AEC chest exposure terminates too early because the selected chamber is partly outside the lung field. Which is the best correction Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Increase backup time so the exposure cannot terminate early",
          "Increase mA because AEC responds directly to tube current",
          "Open collimation so every chamber receives scatter radiation",
          "Reposition and select a chamber fully covered by the intended anatomy"
        ],
        "answer": 3,
        "explanation": "AEC depends on correct chamber selection and positioning; changing backup or mA does not fix an uncovered chamber."
      }
    ]
  },
  "5": {
    "briefing": {
      "title": "Radiation Biology & Protection",
      "summary": "Biologic effects, dose, ALARA, pregnancy, collimation, shielding principles, occupational monitoring, and repeat reduction.",
      "objectives": [
        "Risk Depends on Dose and Biology",
        "ALARA Is a Decision Framework",
        "Pregnancy Requires Thoughtful Verification",
        "Collimation Protects and Improves"
      ]
    },
    "lessons": [
      {
        "title": "Risk Depends on Dose and Biology",
        "body": "Radiation effects depend on dose, tissue sensitivity, age, and exposure pattern. Stochastic and tissue-reaction concepts describe different risk relationships.",
        "takeaway": "Protection decisions should reduce unnecessary exposure without compromising needed imaging."
      },
      {
        "title": "ALARA Is a Decision Framework",
        "body": "Time, distance, shielding practices, collimation, technique selection, and repeat prevention all contribute to keeping exposure as low as reasonably achievable.",
        "takeaway": "The best protection strategy often begins before the exposure."
      },
      {
        "title": "Pregnancy Requires Thoughtful Verification",
        "body": "Follow institutional policy for pregnancy screening and communication; do not independently cancel a medically necessary exam outside your role.",
        "takeaway": "Pregnancy changes risk management, not the need for professional communication."
      },
      {
        "title": "Collimation Protects and Improves",
        "body": "Limiting the field reduces tissue irradiated and scatter generated, often improving image contrast.",
        "takeaway": "Open collimation is not a substitute for accurate positioning."
      },
      {
        "title": "Repeat Analysis Is a Safety Tool",
        "body": "Reject/repeat patterns can reveal positioning, motion, exposure, detector, or workflow problems that deserve correction.",
        "takeaway": "Preventing the next repeat is more valuable than blaming the last one."
      }
    ],
    "scenarios": [
      {
        "title": "Case Review",
        "patient": "A repeat is considered because the anatomy is slightly off center but all required structures are included and diagnostic criteria are met. Which choice best supports ALARA.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Repeat because every image must be perfectly centered",
          "Increase technique and repeat to ensure greater penetration",
          "Repeat with a larger field to improve visual symmetry",
          "Do not repeat solely to improve cosmetic centering"
        ],
        "answer": 3,
        "explanation": "A repeat that adds exposure without improving diagnostic adequacy is inconsistent with ALARA."
      },
      {
        "title": "Positioning Decision",
        "patient": "During mobile imaging, a staff member can step farther from the patient without compromising care. Which protection principle is being used most directly.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Collimation of the beam to the anatomy of interest",
          "Reduction of fluoroscopic pulse rate during a procedure",
          "Distance from the radiation source and scatter field",
          "Filtration of low-energy photons from the primary beam"
        ],
        "answer": 2,
        "explanation": "Increasing distance reduces exposure according to geometric principles and is a key occupational protection strategy."
      },
      {
        "title": "Clinical Judgment",
        "patient": "A patient reports possible pregnancy before a medically indicated pelvic exam. What is the best technologist response.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Substitute a different projection without authorization",
          "Follow pregnancy-screening policy and communicate before exposure",
          "Cancel the examination without consulting the care team",
          "Proceed without documentation because the exam is ordered"
        ],
        "answer": 1,
        "explanation": "Pregnancy concerns require policy-based screening and communication; the technologist should not independently cancel or redesign the exam outside role."
      }
    ],
    "questions": [
      {
        "question": "A repeat is considered because the anatomy is slightly off center but all required structures are included and diagnostic criteria are met. Which choice best supports ALARA?",
        "options": [
          "Repeat because every image must be perfectly centered",
          "Increase technique and repeat to ensure greater penetration",
          "Repeat with a larger field to improve visual symmetry",
          "Do not repeat solely to improve cosmetic centering"
        ],
        "answer": 3,
        "explanation": "A repeat that adds exposure without improving diagnostic adequacy is inconsistent with ALARA."
      },
      {
        "question": "During mobile imaging, a staff member can step farther from the patient without compromising care. Which protection principle is being used most directly?",
        "options": [
          "Collimation of the beam to the anatomy of interest",
          "Reduction of fluoroscopic pulse rate during a procedure",
          "Distance from the radiation source and scatter field",
          "Filtration of low-energy photons from the primary beam"
        ],
        "answer": 2,
        "explanation": "Increasing distance reduces exposure according to geometric principles and is a key occupational protection strategy."
      },
      {
        "question": "A patient reports possible pregnancy before a medically indicated pelvic exam. What is the best technologist response?",
        "options": [
          "Substitute a different projection without authorization",
          "Follow pregnancy-screening policy and communicate before exposure",
          "Cancel the examination without consulting the care team",
          "Proceed without documentation because the exam is ordered"
        ],
        "answer": 1,
        "explanation": "Pregnancy concerns require policy-based screening and communication; the technologist should not independently cancel or redesign the exam outside role."
      },
      {
        "question": "Which change usually reduces both patient tissue irradiated and scatter production?",
        "options": [
          "Collimate more closely to the required anatomy",
          "Increase field size while reducing mAs",
          "Increase SID while opening collimation",
          "Use a larger detector with the same field size"
        ],
        "answer": 0,
        "explanation": "Tighter collimation reduces irradiated volume and scatter production."
      },
      {
        "question": "A department notices repeated lateral knee rejects for rotation. What is the most effective safety response?",
        "options": [
          "Tell technologists to increase mAs on all lateral knees",
          "Remove reject analysis so staff do not feel penalized",
          "Increase field size to reduce the chance of rotation",
          "Analyze the pattern and correct the positioning process"
        ],
        "answer": 3,
        "explanation": "Repeat analysis should identify systematic causes and guide process improvement, reducing future unnecessary exposures."
      },
      {
        "question": "A repeat is considered because the anatomy is slightly off center but all required structures are included and diagnostic criteria are met. Which choice best supports ALARA Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Increase technique and repeat to ensure greater penetration",
          "Repeat with a larger field to improve visual symmetry",
          "Do not repeat solely to improve cosmetic centering",
          "Repeat because every image must be perfectly centered"
        ],
        "answer": 2,
        "explanation": "A repeat that adds exposure without improving diagnostic adequacy is inconsistent with ALARA."
      },
      {
        "question": "During mobile imaging, a staff member can step farther from the patient without compromising care. Which protection principle is being used most directly Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Reduction of fluoroscopic pulse rate during a procedure",
          "Distance from the radiation source and scatter field",
          "Filtration of low-energy photons from the primary beam",
          "Collimation of the beam to the anatomy of interest"
        ],
        "answer": 1,
        "explanation": "Increasing distance reduces exposure according to geometric principles and is a key occupational protection strategy."
      },
      {
        "question": "A patient reports possible pregnancy before a medically indicated pelvic exam. Which is the best technologist response Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Follow pregnancy-screening policy and communicate before exposure",
          "Cancel the examination without consulting the care team",
          "Proceed without documentation because the exam is ordered",
          "Substitute a different projection without authorization"
        ],
        "answer": 0,
        "explanation": "Pregnancy concerns require policy-based screening and communication; the technologist should not independently cancel or redesign the exam outside role."
      },
      {
        "question": "Which change usually reduces both patient tissue irradiated and scatter production Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Increase field size while reducing mAs",
          "Increase SID while opening collimation",
          "Use a larger detector with the same field size",
          "Collimate more closely to the required anatomy"
        ],
        "answer": 3,
        "explanation": "Tighter collimation reduces irradiated volume and scatter production."
      },
      {
        "question": "A department notices repeated lateral knee rejects for rotation. What is the most effective safety response Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Remove reject analysis so staff do not feel penalized",
          "Increase field size to reduce the chance of rotation",
          "Analyze the pattern and correct the positioning process",
          "Tell technologists to increase mAs on all lateral knees"
        ],
        "answer": 2,
        "explanation": "Repeat analysis should identify systematic causes and guide process improvement, reducing future unnecessary exposures."
      },
      {
        "question": "A repeat is considered because the anatomy is slightly off center but all required structures are included and diagnostic criteria are met. Which choice best supports ALARA Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Repeat with a larger field to improve visual symmetry",
          "Do not repeat solely to improve cosmetic centering",
          "Repeat because every image must be perfectly centered",
          "Increase technique and repeat to ensure greater penetration"
        ],
        "answer": 1,
        "explanation": "A repeat that adds exposure without improving diagnostic adequacy is inconsistent with ALARA."
      },
      {
        "question": "During mobile imaging, a staff member can step farther from the patient without compromising care. Which protection principle is being used most directly Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Distance from the radiation source and scatter field",
          "Filtration of low-energy photons from the primary beam",
          "Collimation of the beam to the anatomy of interest",
          "Reduction of fluoroscopic pulse rate during a procedure"
        ],
        "answer": 0,
        "explanation": "Increasing distance reduces exposure according to geometric principles and is a key occupational protection strategy."
      },
      {
        "question": "A patient reports possible pregnancy before a medically indicated pelvic exam. What is the best technologist response Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Cancel the examination without consulting the care team",
          "Proceed without documentation because the exam is ordered",
          "Substitute a different projection without authorization",
          "Follow pregnancy-screening policy and communicate before exposure"
        ],
        "answer": 3,
        "explanation": "Pregnancy concerns require policy-based screening and communication; the technologist should not independently cancel or redesign the exam outside role."
      },
      {
        "question": "Which change usually reduces both patient tissue irradiated and scatter production Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Increase SID while opening collimation",
          "Use a larger detector with the same field size",
          "Collimate more closely to the required anatomy",
          "Increase field size while reducing mAs"
        ],
        "answer": 2,
        "explanation": "Tighter collimation reduces irradiated volume and scatter production."
      },
      {
        "question": "A department notices repeated lateral knee rejects for rotation. What is the most effective safety response Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Increase field size to reduce the chance of rotation",
          "Analyze the pattern and correct the positioning process",
          "Tell technologists to increase mAs on all lateral knees",
          "Remove reject analysis so staff do not feel penalized"
        ],
        "answer": 1,
        "explanation": "Repeat analysis should identify systematic causes and guide process improvement, reducing future unnecessary exposures."
      },
      {
        "question": "A repeat is considered because the anatomy is slightly off center but all required structures are included and diagnostic criteria are met. Which choice best supports ALARA Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Do not repeat solely to improve cosmetic centering",
          "Repeat because every image must be perfectly centered",
          "Increase technique and repeat to ensure greater penetration",
          "Repeat with a larger field to improve visual symmetry"
        ],
        "answer": 0,
        "explanation": "A repeat that adds exposure without improving diagnostic adequacy is inconsistent with ALARA."
      },
      {
        "question": "During mobile imaging, a staff member can step farther from the patient without compromising care. Which protection principle is being used most directly Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Filtration of low-energy photons from the primary beam",
          "Collimation of the beam to the anatomy of interest",
          "Reduction of fluoroscopic pulse rate during a procedure",
          "Distance from the radiation source and scatter field"
        ],
        "answer": 3,
        "explanation": "Increasing distance reduces exposure according to geometric principles and is a key occupational protection strategy."
      },
      {
        "question": "A patient reports possible pregnancy before a medically indicated pelvic exam. Which is the best technologist response Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Proceed without documentation because the exam is ordered",
          "Substitute a different projection without authorization",
          "Follow pregnancy-screening policy and communicate before exposure",
          "Cancel the examination without consulting the care team"
        ],
        "answer": 2,
        "explanation": "Pregnancy concerns require policy-based screening and communication; the technologist should not independently cancel or redesign the exam outside role."
      }
    ]
  },
  "6": {
    "briefing": {
      "title": "Chest, Abdomen & Extremity Procedures",
      "summary": "Patient-centered positioning, anatomy demonstrated, central-ray placement, breathing, trauma adaptations, and image criteria.",
      "objectives": [
        "Chest Imaging Is a Geometry Problem",
        "Abdomen Requires Coverage and Context",
        "Extremities Demand Joint Awareness",
        "Trauma Changes the Method, Not the Goal"
      ]
    },
    "lessons": [
      {
        "title": "Chest Imaging Is a Geometry Problem",
        "body": "Upright PA positioning, long SID, scapular rotation, inspiration, and lack of rotation each contribute to diagnostic chest imaging.",
        "takeaway": "Evaluate inspiration and rotation before blaming exposure."
      },
      {
        "title": "Abdomen Requires Coverage and Context",
        "body": "Centering and field size must include required anatomy; patient habitus and the clinical question influence positioning and exposure.",
        "takeaway": "Coverage failure can make an otherwise good image nondiagnostic."
      },
      {
        "title": "Extremities Demand Joint Awareness",
        "body": "Many long-bone exams require inclusion of adjacent joints, while joint studies require precise alignment and appropriate projections.",
        "takeaway": "Do not crop away anatomy needed to answer the clinical question."
      },
      {
        "title": "Trauma Changes the Method, Not the Goal",
        "body": "Adapt tube, detector, and patient position to obtain required anatomy without violating immobilization or causing unnecessary movement.",
        "takeaway": "Move the equipment before moving an unstable patient."
      },
      {
        "title": "Breathing Instructions Are Part of Positioning",
        "body": "Respiration changes diaphragm level, lung expansion, motion, and abdominal organ position.",
        "takeaway": "A correct projection with the wrong breathing phase can still fail."
      }
    ],
    "scenarios": [
      {
        "title": "Case Review",
        "patient": "An upright PA chest shows the medial clavicles equidistant from the spinous processes, but only eight posterior ribs are visible above the diaphragm. Which issue is most likely.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Excessive SID rather than inadequate inspiration",
          "Insufficient mAs rather than inadequate inspiration",
          "Inadequate inspiration rather than patient rotation",
          "Excessive rotation rather than inadequate inspiration"
        ],
        "answer": 2,
        "explanation": "Symmetric clavicular relationships argue against rotation; low rib count suggests suboptimal inspiration."
      },
      {
        "title": "Positioning Decision",
        "patient": "A trauma patient with suspected hip fracture cannot internally rotate the affected leg. Which approach is most appropriate.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Delay all imaging until the patient can tolerate rotation",
          "Maintain the limb position and use a trauma-appropriate lateral method",
          "Internally rotate the leg to obtain the routine AP appearance",
          "Externally rotate both legs equally to improve symmetry"
        ],
        "answer": 1,
        "explanation": "Suspected fracture is a contraindication to routine internal rotation; equipment and projection should adapt to the patient."
      },
      {
        "title": "Clinical Judgment",
        "patient": "A forearm image includes the wrist but clips the elbow joint. What is the primary problem.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Required anatomy is incomplete for a long-bone examination",
          "The exposure indicator is invalid because a joint is missing",
          "The beam energy is too low for cortical bone visualization",
          "The patient is rotated because the elbow is not included"
        ],
        "answer": 0,
        "explanation": "Long-bone studies generally require inclusion of both adjacent joints."
      }
    ],
    "questions": [
      {
        "question": "An upright PA chest shows the medial clavicles equidistant from the spinous processes, but only eight posterior ribs are visible above the diaphragm. Which issue is most likely?",
        "options": [
          "Excessive SID rather than inadequate inspiration",
          "Insufficient mAs rather than inadequate inspiration",
          "Inadequate inspiration rather than patient rotation",
          "Excessive rotation rather than inadequate inspiration"
        ],
        "answer": 2,
        "explanation": "Symmetric clavicular relationships argue against rotation; low rib count suggests suboptimal inspiration."
      },
      {
        "question": "A trauma patient with suspected hip fracture cannot internally rotate the affected leg. Which approach is most appropriate?",
        "options": [
          "Delay all imaging until the patient can tolerate rotation",
          "Maintain the limb position and use a trauma-appropriate lateral method",
          "Internally rotate the leg to obtain the routine AP appearance",
          "Externally rotate both legs equally to improve symmetry"
        ],
        "answer": 1,
        "explanation": "Suspected fracture is a contraindication to routine internal rotation; equipment and projection should adapt to the patient."
      },
      {
        "question": "A forearm image includes the wrist but clips the elbow joint. What is the primary problem?",
        "options": [
          "Required anatomy is incomplete for a long-bone examination",
          "The exposure indicator is invalid because a joint is missing",
          "The beam energy is too low for cortical bone visualization",
          "The patient is rotated because the elbow is not included"
        ],
        "answer": 0,
        "explanation": "Long-bone studies generally require inclusion of both adjacent joints."
      },
      {
        "question": "An AP supine abdomen is requested to evaluate bowel gas pattern. The image clips the pubic symphysis. What should drive the repeat decision?",
        "options": [
          "Whether the exposure indicator falls within the target range",
          "Whether the patient can hold a deeper inspiration next time",
          "Whether a grid was used for the first exposure",
          "Whether required abdominal anatomy for the exam is fully included"
        ],
        "answer": 3,
        "explanation": "Coverage of required anatomy is a core image criterion; exposure adequacy cannot compensate for missing anatomy."
      },
      {
        "question": "A patient with a painful shoulder cannot abduct the arm for a routine projection. What is the best principle?",
        "options": [
          "Increase kVp so positioning becomes less important",
          "Use a larger field so the arm position does not matter",
          "Adapt the projection to the patient while preserving the diagnostic goal",
          "Force the routine position because standardization is always required"
        ],
        "answer": 2,
        "explanation": "Patient condition may require modified projections; the diagnostic objective should be preserved without causing harm."
      },
      {
        "question": "An upright PA chest shows the medial clavicles equidistant from the spinous processes, but only eight posterior ribs are visible above the diaphragm. Which issue is most likely Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Insufficient mAs rather than inadequate inspiration",
          "Inadequate inspiration rather than patient rotation",
          "Excessive rotation rather than inadequate inspiration",
          "Excessive SID rather than inadequate inspiration"
        ],
        "answer": 1,
        "explanation": "Symmetric clavicular relationships argue against rotation; low rib count suggests suboptimal inspiration."
      },
      {
        "question": "A trauma patient with suspected hip fracture cannot internally rotate the affected leg. Which approach is most appropriate Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Maintain the limb position and use a trauma-appropriate lateral method",
          "Internally rotate the leg to obtain the routine AP appearance",
          "Externally rotate both legs equally to improve symmetry",
          "Delay all imaging until the patient can tolerate rotation"
        ],
        "answer": 0,
        "explanation": "Suspected fracture is a contraindication to routine internal rotation; equipment and projection should adapt to the patient."
      },
      {
        "question": "A forearm image includes the wrist but clips the elbow joint. What is the primary problem Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "The exposure indicator is invalid because a joint is missing",
          "The beam energy is too low for cortical bone visualization",
          "The patient is rotated because the elbow is not included",
          "Required anatomy is incomplete for a long-bone examination"
        ],
        "answer": 3,
        "explanation": "Long-bone studies generally require inclusion of both adjacent joints."
      },
      {
        "question": "An AP supine abdomen is requested to evaluate bowel gas pattern. The image clips the pubic symphysis. What should drive the repeat decision Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Whether the patient can hold a deeper inspiration next time",
          "Whether a grid was used for the first exposure",
          "Whether required abdominal anatomy for the exam is fully included",
          "Whether the exposure indicator falls within the target range"
        ],
        "answer": 2,
        "explanation": "Coverage of required anatomy is a core image criterion; exposure adequacy cannot compensate for missing anatomy."
      },
      {
        "question": "A patient with a painful shoulder cannot abduct the arm for a routine projection. Which is the best principle Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Use a larger field so the arm position does not matter",
          "Adapt the projection to the patient while preserving the diagnostic goal",
          "Force the routine position because standardization is always required",
          "Increase kVp so positioning becomes less important"
        ],
        "answer": 1,
        "explanation": "Patient condition may require modified projections; the diagnostic objective should be preserved without causing harm."
      },
      {
        "question": "An upright PA chest shows the medial clavicles equidistant from the spinous processes, but only eight posterior ribs are visible above the diaphragm. Which issue is most likely Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Inadequate inspiration rather than patient rotation",
          "Excessive rotation rather than inadequate inspiration",
          "Excessive SID rather than inadequate inspiration",
          "Insufficient mAs rather than inadequate inspiration"
        ],
        "answer": 0,
        "explanation": "Symmetric clavicular relationships argue against rotation; low rib count suggests suboptimal inspiration."
      },
      {
        "question": "A trauma patient with suspected hip fracture cannot internally rotate the affected leg. Which approach is most appropriate Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Internally rotate the leg to obtain the routine AP appearance",
          "Externally rotate both legs equally to improve symmetry",
          "Delay all imaging until the patient can tolerate rotation",
          "Maintain the limb position and use a trauma-appropriate lateral method"
        ],
        "answer": 3,
        "explanation": "Suspected fracture is a contraindication to routine internal rotation; equipment and projection should adapt to the patient."
      },
      {
        "question": "A forearm image includes the wrist but clips the elbow joint. What is the primary problem Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "The beam energy is too low for cortical bone visualization",
          "The patient is rotated because the elbow is not included",
          "Required anatomy is incomplete for a long-bone examination",
          "The exposure indicator is invalid because a joint is missing"
        ],
        "answer": 2,
        "explanation": "Long-bone studies generally require inclusion of both adjacent joints."
      },
      {
        "question": "An AP supine abdomen is requested to evaluate bowel gas pattern. The image clips the pubic symphysis. What should drive the repeat decision Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Whether a grid was used for the first exposure",
          "Whether required abdominal anatomy for the exam is fully included",
          "Whether the exposure indicator falls within the target range",
          "Whether the patient can hold a deeper inspiration next time"
        ],
        "answer": 1,
        "explanation": "Coverage of required anatomy is a core image criterion; exposure adequacy cannot compensate for missing anatomy."
      },
      {
        "question": "A patient with a painful shoulder cannot abduct the arm for a routine projection. What is the best principle Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Adapt the projection to the patient while preserving the diagnostic goal",
          "Force the routine position because standardization is always required",
          "Increase kVp so positioning becomes less important",
          "Use a larger field so the arm position does not matter"
        ],
        "answer": 0,
        "explanation": "Patient condition may require modified projections; the diagnostic objective should be preserved without causing harm."
      },
      {
        "question": "An upright PA chest shows the medial clavicles equidistant from the spinous processes, but only eight posterior ribs are visible above the diaphragm. Which issue is most likely Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Excessive rotation rather than inadequate inspiration",
          "Excessive SID rather than inadequate inspiration",
          "Insufficient mAs rather than inadequate inspiration",
          "Inadequate inspiration rather than patient rotation"
        ],
        "answer": 3,
        "explanation": "Symmetric clavicular relationships argue against rotation; low rib count suggests suboptimal inspiration."
      },
      {
        "question": "A trauma patient with suspected hip fracture cannot internally rotate the affected leg. Which approach is most appropriate Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Externally rotate both legs equally to improve symmetry",
          "Delay all imaging until the patient can tolerate rotation",
          "Maintain the limb position and use a trauma-appropriate lateral method",
          "Internally rotate the leg to obtain the routine AP appearance"
        ],
        "answer": 2,
        "explanation": "Suspected fracture is a contraindication to routine internal rotation; equipment and projection should adapt to the patient."
      },
      {
        "question": "A forearm image includes the wrist but clips the elbow joint. What is the primary problem Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "The patient is rotated because the elbow is not included",
          "Required anatomy is incomplete for a long-bone examination",
          "The exposure indicator is invalid because a joint is missing",
          "The beam energy is too low for cortical bone visualization"
        ],
        "answer": 1,
        "explanation": "Long-bone studies generally require inclusion of both adjacent joints."
      },
      {
        "question": "An AP supine abdomen is requested to evaluate bowel gas pattern. The image clips the pubic symphysis. What should drive the repeat decision Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Whether required abdominal anatomy for the exam is fully included",
          "Whether the exposure indicator falls within the target range",
          "Whether the patient can hold a deeper inspiration next time",
          "Whether a grid was used for the first exposure"
        ],
        "answer": 0,
        "explanation": "Coverage of required anatomy is a core image criterion; exposure adequacy cannot compensate for missing anatomy."
      },
      {
        "question": "A patient with a painful shoulder cannot abduct the arm for a routine projection. Which is the best principle Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Force the routine position because standardization is always required",
          "Increase kVp so positioning becomes less important",
          "Use a larger field so the arm position does not matter",
          "Adapt the projection to the patient while preserving the diagnostic goal"
        ],
        "answer": 3,
        "explanation": "Patient condition may require modified projections; the diagnostic objective should be preserved without causing harm."
      }
    ]
  },
  "7": {
    "briefing": {
      "title": "Spine, Pelvis, Skull & Advanced Procedures",
      "summary": "Axial skeleton positioning, trauma modifications, mobile/surgical imaging, fluoroscopic concepts, and advanced procedure decisions.",
      "objectives": [
        "Spine Positioning Depends on Alignment",
        "Pelvis and Hip Require Trauma Awareness",
        "Skull and Facial Work Is Angle Sensitive",
        "Mobile and Surgical Imaging Add Constraints"
      ]
    },
    "lessons": [
      {
        "title": "Spine Positioning Depends on Alignment",
        "body": "Rotation, flexion/extension limits, CR angle, and patient habitus influence visualization of vertebral structures and joint spaces.",
        "takeaway": "Use image criteria to distinguish rotation from anatomy."
      },
      {
        "title": "Pelvis and Hip Require Trauma Awareness",
        "body": "Routine internal rotation is inappropriate when fracture or dislocation is suspected; cross-table methods can preserve alignment.",
        "takeaway": "A routine position becomes unsafe when the clinical condition changes."
      },
      {
        "title": "Skull and Facial Work Is Angle Sensitive",
        "body": "Small errors in head rotation, flexion, extension, or CR angle can move dense structures over anatomy of interest.",
        "takeaway": "Precise landmarks matter more as anatomy becomes compact."
      },
      {
        "title": "Mobile and Surgical Imaging Add Constraints",
        "body": "Sterile fields, limited access, equipment geometry, staff exposure, and communication must be managed together.",
        "takeaway": "Clinical environment changes how the projection is achieved."
      },
      {
        "title": "Fluoroscopy Requires Continuous Awareness",
        "body": "Real-time imaging introduces dose-management, positioning, contrast, and procedural workflow considerations.",
        "takeaway": "Time and geometry matter repeatedly, not just once."
      }
    ],
    "scenarios": [
      {
        "title": "Case Review",
        "patient": "A patient with suspected cervical spine injury remains immobilized. Which principle should guide the initial lateral imaging approach.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Remove immobilization if it interferes with standard positioning",
          "Move the tube and detector rather than manipulating the cervical spine",
          "Rotate the head until the mandibular rami are superimposed",
          "Flex the neck to separate the lower cervical vertebrae"
        ],
        "answer": 1,
        "explanation": "In trauma, equipment should adapt to the patient while spinal precautions are maintained."
      },
      {
        "title": "Positioning Decision",
        "patient": "An AP pelvis is requested after high-energy trauma. The affected leg is shortened and externally rotated. What should the technologist do.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Avoid routine internal rotation and image according to trauma protocol",
          "Internally rotate both legs to place the femoral necks parallel",
          "Apply traction before positioning to restore normal alignment",
          "Delay imaging until the leg position becomes symmetric"
        ],
        "answer": 0,
        "explanation": "Shortening and external rotation can indicate fracture; routine internal rotation may worsen injury."
      },
      {
        "title": "Clinical Judgment",
        "patient": "A skull projection shows asymmetric orbital margins when symmetry is expected. Which error should be considered first.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Excessive mAs relative to patient thickness",
          "Insufficient filtration of the primary beam",
          "Grid ratio too low for the selected kVp",
          "Head rotation relative to the detector"
        ],
        "answer": 3,
        "explanation": "Asymmetry of paired structures commonly indicates rotation."
      }
    ],
    "questions": [
      {
        "question": "A patient with suspected cervical spine injury remains immobilized. Which principle should guide the initial lateral imaging approach?",
        "options": [
          "Remove immobilization if it interferes with standard positioning",
          "Move the tube and detector rather than manipulating the cervical spine",
          "Rotate the head until the mandibular rami are superimposed",
          "Flex the neck to separate the lower cervical vertebrae"
        ],
        "answer": 1,
        "explanation": "In trauma, equipment should adapt to the patient while spinal precautions are maintained."
      },
      {
        "question": "An AP pelvis is requested after high-energy trauma. The affected leg is shortened and externally rotated. What should the technologist do?",
        "options": [
          "Avoid routine internal rotation and image according to trauma protocol",
          "Internally rotate both legs to place the femoral necks parallel",
          "Apply traction before positioning to restore normal alignment",
          "Delay imaging until the leg position becomes symmetric"
        ],
        "answer": 0,
        "explanation": "Shortening and external rotation can indicate fracture; routine internal rotation may worsen injury."
      },
      {
        "question": "A skull projection shows asymmetric orbital margins when symmetry is expected. Which error should be considered first?",
        "options": [
          "Excessive mAs relative to patient thickness",
          "Insufficient filtration of the primary beam",
          "Grid ratio too low for the selected kVp",
          "Head rotation relative to the detector"
        ],
        "answer": 3,
        "explanation": "Asymmetry of paired structures commonly indicates rotation."
      },
      {
        "question": "During a mobile exam in isolation, the detector has been placed behind the patient and is now contaminated. What is the best next step?",
        "options": [
          "Cover the detector with a clean sheet and continue using it",
          "Wipe only the visible surface if no fluid is present",
          "Handle and disinfect the detector according to isolation and equipment policy",
          "Return the detector directly to the department for later cleaning"
        ],
        "answer": 2,
        "explanation": "Portable equipment can transmit organisms; cleaning must follow infection-control and manufacturer/facility procedures."
      },
      {
        "question": "During fluoroscopy, which change most directly reduces exposure when clinically feasible?",
        "options": [
          "Open collimation to prevent anatomy from leaving the field",
          "Minimize beam-on time and use dose-saving operating modes",
          "Increase magnification mode for every image sequence",
          "Move personnel closer to improve communication"
        ],
        "answer": 1,
        "explanation": "Reducing fluoroscopy time and using dose-saving modes lowers exposure while maintaining the clinical task."
      },
      {
        "question": "A patient with suspected cervical spine injury remains immobilized. Which principle should guide the initial lateral imaging approach Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Move the tube and detector rather than manipulating the cervical spine",
          "Rotate the head until the mandibular rami are superimposed",
          "Flex the neck to separate the lower cervical vertebrae",
          "Remove immobilization if it interferes with standard positioning"
        ],
        "answer": 0,
        "explanation": "In trauma, equipment should adapt to the patient while spinal precautions are maintained."
      },
      {
        "question": "An AP pelvis is requested after high-energy trauma. The affected leg is shortened and externally rotated. What should the technologist do Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Internally rotate both legs to place the femoral necks parallel",
          "Apply traction before positioning to restore normal alignment",
          "Delay imaging until the leg position becomes symmetric",
          "Avoid routine internal rotation and image according to trauma protocol"
        ],
        "answer": 3,
        "explanation": "Shortening and external rotation can indicate fracture; routine internal rotation may worsen injury."
      },
      {
        "question": "A skull projection shows asymmetric orbital margins when symmetry is expected. Which error should be considered first Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Insufficient filtration of the primary beam",
          "Grid ratio too low for the selected kVp",
          "Head rotation relative to the detector",
          "Excessive mAs relative to patient thickness"
        ],
        "answer": 2,
        "explanation": "Asymmetry of paired structures commonly indicates rotation."
      },
      {
        "question": "During a mobile exam in isolation, the detector has been placed behind the patient and is now contaminated. Which is the best next step Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Wipe only the visible surface if no fluid is present",
          "Handle and disinfect the detector according to isolation and equipment policy",
          "Return the detector directly to the department for later cleaning",
          "Cover the detector with a clean sheet and continue using it"
        ],
        "answer": 1,
        "explanation": "Portable equipment can transmit organisms; cleaning must follow infection-control and manufacturer/facility procedures."
      },
      {
        "question": "During fluoroscopy, which change most directly reduces exposure when clinically feasible Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Minimize beam-on time and use dose-saving operating modes",
          "Increase magnification mode for every image sequence",
          "Move personnel closer to improve communication",
          "Open collimation to prevent anatomy from leaving the field"
        ],
        "answer": 0,
        "explanation": "Reducing fluoroscopy time and using dose-saving modes lowers exposure while maintaining the clinical task."
      },
      {
        "question": "A patient with suspected cervical spine injury remains immobilized. Which principle should guide the initial lateral imaging approach Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Rotate the head until the mandibular rami are superimposed",
          "Flex the neck to separate the lower cervical vertebrae",
          "Remove immobilization if it interferes with standard positioning",
          "Move the tube and detector rather than manipulating the cervical spine"
        ],
        "answer": 3,
        "explanation": "In trauma, equipment should adapt to the patient while spinal precautions are maintained."
      },
      {
        "question": "An AP pelvis is requested after high-energy trauma. The affected leg is shortened and externally rotated. What should the technologist do Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Apply traction before positioning to restore normal alignment",
          "Delay imaging until the leg position becomes symmetric",
          "Avoid routine internal rotation and image according to trauma protocol",
          "Internally rotate both legs to place the femoral necks parallel"
        ],
        "answer": 2,
        "explanation": "Shortening and external rotation can indicate fracture; routine internal rotation may worsen injury."
      },
      {
        "question": "A skull projection shows asymmetric orbital margins when symmetry is expected. Which error should be considered first Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Grid ratio too low for the selected kVp",
          "Head rotation relative to the detector",
          "Excessive mAs relative to patient thickness",
          "Insufficient filtration of the primary beam"
        ],
        "answer": 1,
        "explanation": "Asymmetry of paired structures commonly indicates rotation."
      },
      {
        "question": "During a mobile exam in isolation, the detector has been placed behind the patient and is now contaminated. What is the best next step Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Handle and disinfect the detector according to isolation and equipment policy",
          "Return the detector directly to the department for later cleaning",
          "Cover the detector with a clean sheet and continue using it",
          "Wipe only the visible surface if no fluid is present"
        ],
        "answer": 0,
        "explanation": "Portable equipment can transmit organisms; cleaning must follow infection-control and manufacturer/facility procedures."
      },
      {
        "question": "During fluoroscopy, which change most directly reduces exposure when clinically feasible Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Increase magnification mode for every image sequence",
          "Move personnel closer to improve communication",
          "Open collimation to prevent anatomy from leaving the field",
          "Minimize beam-on time and use dose-saving operating modes"
        ],
        "answer": 3,
        "explanation": "Reducing fluoroscopy time and using dose-saving modes lowers exposure while maintaining the clinical task."
      },
      {
        "question": "A patient with suspected cervical spine injury remains immobilized. Which principle should guide the initial lateral imaging approach Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Flex the neck to separate the lower cervical vertebrae",
          "Remove immobilization if it interferes with standard positioning",
          "Move the tube and detector rather than manipulating the cervical spine",
          "Rotate the head until the mandibular rami are superimposed"
        ],
        "answer": 2,
        "explanation": "In trauma, equipment should adapt to the patient while spinal precautions are maintained."
      },
      {
        "question": "An AP pelvis is requested after high-energy trauma. The affected leg is shortened and externally rotated. What should the technologist do Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Delay imaging until the leg position becomes symmetric",
          "Avoid routine internal rotation and image according to trauma protocol",
          "Internally rotate both legs to place the femoral necks parallel",
          "Apply traction before positioning to restore normal alignment"
        ],
        "answer": 1,
        "explanation": "Shortening and external rotation can indicate fracture; routine internal rotation may worsen injury."
      },
      {
        "question": "A skull projection shows asymmetric orbital margins when symmetry is expected. Which error should be considered first Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Head rotation relative to the detector",
          "Excessive mAs relative to patient thickness",
          "Insufficient filtration of the primary beam",
          "Grid ratio too low for the selected kVp"
        ],
        "answer": 0,
        "explanation": "Asymmetry of paired structures commonly indicates rotation."
      },
      {
        "question": "During a mobile exam in isolation, the detector has been placed behind the patient and is now contaminated. Which is the best next step Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Return the detector directly to the department for later cleaning",
          "Cover the detector with a clean sheet and continue using it",
          "Wipe only the visible surface if no fluid is present",
          "Handle and disinfect the detector according to isolation and equipment policy"
        ],
        "answer": 3,
        "explanation": "Portable equipment can transmit organisms; cleaning must follow infection-control and manufacturer/facility procedures."
      },
      {
        "question": "During fluoroscopy, which change most directly reduces exposure when clinically feasible Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Move personnel closer to improve communication",
          "Open collimation to prevent anatomy from leaving the field",
          "Minimize beam-on time and use dose-saving operating modes",
          "Increase magnification mode for every image sequence"
        ],
        "answer": 2,
        "explanation": "Reducing fluoroscopy time and using dose-saving modes lowers exposure while maintaining the clinical task."
      }
    ]
  },
  "8": {
    "briefing": {
      "title": "Image Evaluation & Clinical Judgment",
      "summary": "Systematic image critique, positioning error recognition, exposure analysis, artifacts, corrective action, and integrated clinical decisions.",
      "objectives": [
        "Critique in a Consistent Order",
        "Name the Error Before Repeating",
        "Exposure Indicators Need Context",
        "Artifacts Have Sources"
      ]
    },
    "lessons": [
      {
        "title": "Critique in a Consistent Order",
        "body": "Check identity/marker, required anatomy, positioning, collimation, motion, exposure indicators, contrast/detail, and artifacts before deciding on corrective action.",
        "takeaway": "A systematic critique prevents tunnel vision."
      },
      {
        "title": "Name the Error Before Repeating",
        "body": "Rotation, motion, clipping, exposure error, grid cutoff, and artifact require different corrections.",
        "takeaway": "Do not repeat until you know what you are changing."
      },
      {
        "title": "Exposure Indicators Need Context",
        "body": "Detector exposure metrics help identify under- or overexposure but must be interpreted with the system, exam, processing, and image appearance.",
        "takeaway": "Brightness alone is unreliable in digital radiography."
      },
      {
        "title": "Artifacts Have Sources",
        "body": "Patient, detector, processing, accessories, clothing, motion, and equipment can all create artifacts.",
        "takeaway": "Correct the source rather than masking the symptom."
      },
      {
        "title": "Clinical Judgment Integrates Domains",
        "body": "The safest choice may require balancing patient condition, positioning, exposure, radiation protection, image quality, and the diagnostic question.",
        "takeaway": "The best answer is often the one that solves the whole case."
      }
    ],
    "scenarios": [
      {
        "title": "Case Review",
        "patient": "A chest image is adequately exposed and includes the lungs, but the sternoclavicular joints are asymmetric and one scapula overlies the lung field. What is the best interpretation.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Positioning error is present despite acceptable exposure",
          "Exposure error is present despite acceptable positioning",
          "Detector artifact is present despite acceptable collimation",
          "Motion is present despite acceptable inspiration"
        ],
        "answer": 0,
        "explanation": "Asymmetric thoracic landmarks and scapular superimposition indicate positioning problems."
      },
      {
        "title": "Positioning Decision",
        "patient": "A digital abdomen appears appropriately bright, but the exposure indicator is far above target and noise is minimal. What is the best corrective action for future similar patients.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Increase technique further to ensure the image remains noise free",
          "Ignore the indicator because displayed brightness is acceptable",
          "Increase field size so the detector receives more scatter",
          "Reduce technique appropriately rather than relying on processed brightness"
        ],
        "answer": 3,
        "explanation": "Processed brightness can conceal excessive detector exposure; technique should be optimized using exposure feedback."
      },
      {
        "title": "Clinical Judgment",
        "patient": "A repeated image still shows the same linear artifact in the identical detector location despite repositioning the patient. What source is most likely.",
        "question": "Which response best addresses this situation?",
        "options": [
          "Patient motion during exposure",
          "Anatomic structure from patient rotation",
          "Detector or image-receptor related artifact",
          "Patient clothing artifact"
        ],
        "answer": 2,
        "explanation": "A fixed artifact that remains in the same detector location despite patient repositioning suggests a detector/system source."
      }
    ],
    "questions": [
      {
        "question": "A chest image is adequately exposed and includes the lungs, but the sternoclavicular joints are asymmetric and one scapula overlies the lung field. What is the best interpretation?",
        "options": [
          "Positioning error is present despite acceptable exposure",
          "Exposure error is present despite acceptable positioning",
          "Detector artifact is present despite acceptable collimation",
          "Motion is present despite acceptable inspiration"
        ],
        "answer": 0,
        "explanation": "Asymmetric thoracic landmarks and scapular superimposition indicate positioning problems."
      },
      {
        "question": "A digital abdomen appears appropriately bright, but the exposure indicator is far above target and noise is minimal. What is the best corrective action for future similar patients?",
        "options": [
          "Increase technique further to ensure the image remains noise free",
          "Ignore the indicator because displayed brightness is acceptable",
          "Increase field size so the detector receives more scatter",
          "Reduce technique appropriately rather than relying on processed brightness"
        ],
        "answer": 3,
        "explanation": "Processed brightness can conceal excessive detector exposure; technique should be optimized using exposure feedback."
      },
      {
        "question": "A repeated image still shows the same linear artifact in the identical detector location despite repositioning the patient. What source is most likely?",
        "options": [
          "Patient motion during exposure",
          "Anatomic structure from patient rotation",
          "Detector or image-receptor related artifact",
          "Patient clothing artifact"
        ],
        "answer": 2,
        "explanation": "A fixed artifact that remains in the same detector location despite patient repositioning suggests a detector/system source."
      },
      {
        "question": "An image is clipped laterally, but the exposure indicator is within target and positioning is otherwise correct. What should be changed on repeat?",
        "options": [
          "Shorten exposure time to reduce geometric clipping",
          "Center and collimate to include the required anatomy",
          "Increase mAs to compensate for the missing anatomy",
          "Increase kVp to widen the useful x-ray beam"
        ],
        "answer": 1,
        "explanation": "Missing anatomy is a centering/field-coverage problem, not an exposure-factor problem."
      },
      {
        "question": "A trauma image is technically imperfect but demonstrates all required anatomy and answers the immediate clinical question. The patient deteriorates after the exposure. What is the best next action?",
        "options": [
          "Prioritize the patient and communicate the clinical change rather than repeat for perfection",
          "Repeat immediately so the image meets routine positioning standards",
          "Adjust technique and obtain an additional image before reporting the change",
          "Move the patient to a routine position to improve image symmetry"
        ],
        "answer": 0,
        "explanation": "Patient condition takes priority; repeats should be clinically justified, especially when the existing image is diagnostic."
      },
      {
        "question": "A chest image is adequately exposed and includes the lungs, but the sternoclavicular joints are asymmetric and one scapula overlies the lung field. Which is the best interpretation Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Exposure error is present despite acceptable positioning",
          "Detector artifact is present despite acceptable collimation",
          "Motion is present despite acceptable inspiration",
          "Positioning error is present despite acceptable exposure"
        ],
        "answer": 3,
        "explanation": "Asymmetric thoracic landmarks and scapular superimposition indicate positioning problems."
      },
      {
        "question": "A digital abdomen appears appropriately bright, but the exposure indicator is far above target and noise is minimal. Which is the best corrective action for future similar patients Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Ignore the indicator because displayed brightness is acceptable",
          "Increase field size so the detector receives more scatter",
          "Reduce technique appropriately rather than relying on processed brightness",
          "Increase technique further to ensure the image remains noise free"
        ],
        "answer": 2,
        "explanation": "Processed brightness can conceal excessive detector exposure; technique should be optimized using exposure feedback."
      },
      {
        "question": "A repeated image still shows the same linear artifact in the identical detector location despite repositioning the patient. What source is most likely Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Anatomic structure from patient rotation",
          "Detector or image-receptor related artifact",
          "Patient clothing artifact",
          "Patient motion during exposure"
        ],
        "answer": 1,
        "explanation": "A fixed artifact that remains in the same detector location despite patient repositioning suggests a detector/system source."
      },
      {
        "question": "An image is clipped laterally, but the exposure indicator is within target and positioning is otherwise correct. What should be changed on repeat Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Center and collimate to include the required anatomy",
          "Increase mAs to compensate for the missing anatomy",
          "Increase kVp to widen the useful x-ray beam",
          "Shorten exposure time to reduce geometric clipping"
        ],
        "answer": 0,
        "explanation": "Missing anatomy is a centering/field-coverage problem, not an exposure-factor problem."
      },
      {
        "question": "A trauma image is technically imperfect but demonstrates all required anatomy and answers the immediate clinical question. The patient deteriorates after the exposure. Which is the best next action Before making another exposure, what is the most appropriate conclusion or action?",
        "options": [
          "Repeat immediately so the image meets routine positioning standards",
          "Adjust technique and obtain an additional image before reporting the change",
          "Move the patient to a routine position to improve image symmetry",
          "Prioritize the patient and communicate the clinical change rather than repeat for perfection"
        ],
        "answer": 3,
        "explanation": "Patient condition takes priority; repeats should be clinically justified, especially when the existing image is diagnostic."
      },
      {
        "question": "A chest image is adequately exposed and includes the lungs, but the sternoclavicular joints are asymmetric and one scapula overlies the lung field. What is the best interpretation Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Detector artifact is present despite acceptable collimation",
          "Motion is present despite acceptable inspiration",
          "Positioning error is present despite acceptable exposure",
          "Exposure error is present despite acceptable positioning"
        ],
        "answer": 2,
        "explanation": "Asymmetric thoracic landmarks and scapular superimposition indicate positioning problems."
      },
      {
        "question": "A digital abdomen appears appropriately bright, but the exposure indicator is far above target and noise is minimal. What is the best corrective action for future similar patients Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Increase field size so the detector receives more scatter",
          "Reduce technique appropriately rather than relying on processed brightness",
          "Increase technique further to ensure the image remains noise free",
          "Ignore the indicator because displayed brightness is acceptable"
        ],
        "answer": 1,
        "explanation": "Processed brightness can conceal excessive detector exposure; technique should be optimized using exposure feedback."
      },
      {
        "question": "A repeated image still shows the same linear artifact in the identical detector location despite repositioning the patient. What source is most likely Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Detector or image-receptor related artifact",
          "Patient clothing artifact",
          "Patient motion during exposure",
          "Anatomic structure from patient rotation"
        ],
        "answer": 0,
        "explanation": "A fixed artifact that remains in the same detector location despite patient repositioning suggests a detector/system source."
      },
      {
        "question": "An image is clipped laterally, but the exposure indicator is within target and positioning is otherwise correct. What should be changed on repeat Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Increase mAs to compensate for the missing anatomy",
          "Increase kVp to widen the useful x-ray beam",
          "Shorten exposure time to reduce geometric clipping",
          "Center and collimate to include the required anatomy"
        ],
        "answer": 3,
        "explanation": "Missing anatomy is a centering/field-coverage problem, not an exposure-factor problem."
      },
      {
        "question": "A trauma image is technically imperfect but demonstrates all required anatomy and answers the immediate clinical question. The patient deteriorates after the exposure. What is the best next action Considering patient safety and diagnostic adequacy, what is the most appropriate conclusion or action?",
        "options": [
          "Adjust technique and obtain an additional image before reporting the change",
          "Move the patient to a routine position to improve image symmetry",
          "Prioritize the patient and communicate the clinical change rather than repeat for perfection",
          "Repeat immediately so the image meets routine positioning standards"
        ],
        "answer": 2,
        "explanation": "Patient condition takes priority; repeats should be clinically justified, especially when the existing image is diagnostic."
      },
      {
        "question": "A chest image is adequately exposed and includes the lungs, but the sternoclavicular joints are asymmetric and one scapula overlies the lung field. Which is the best interpretation Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Motion is present despite acceptable inspiration",
          "Positioning error is present despite acceptable exposure",
          "Exposure error is present despite acceptable positioning",
          "Detector artifact is present despite acceptable collimation"
        ],
        "answer": 1,
        "explanation": "Asymmetric thoracic landmarks and scapular superimposition indicate positioning problems."
      },
      {
        "question": "A digital abdomen appears appropriately bright, but the exposure indicator is far above target and noise is minimal. Which is the best corrective action for future similar patients Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Reduce technique appropriately rather than relying on processed brightness",
          "Increase technique further to ensure the image remains noise free",
          "Ignore the indicator because displayed brightness is acceptable",
          "Increase field size so the detector receives more scatter"
        ],
        "answer": 0,
        "explanation": "Processed brightness can conceal excessive detector exposure; technique should be optimized using exposure feedback."
      },
      {
        "question": "A repeated image still shows the same linear artifact in the identical detector location despite repositioning the patient. What source is most likely Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Patient clothing artifact",
          "Patient motion during exposure",
          "Anatomic structure from patient rotation",
          "Detector or image-receptor related artifact"
        ],
        "answer": 3,
        "explanation": "A fixed artifact that remains in the same detector location despite patient repositioning suggests a detector/system source."
      },
      {
        "question": "An image is clipped laterally, but the exposure indicator is within target and positioning is otherwise correct. What should be changed on repeat Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Increase kVp to widen the useful x-ray beam",
          "Shorten exposure time to reduce geometric clipping",
          "Center and collimate to include the required anatomy",
          "Increase mAs to compensate for the missing anatomy"
        ],
        "answer": 2,
        "explanation": "Missing anatomy is a centering/field-coverage problem, not an exposure-factor problem."
      },
      {
        "question": "A trauma image is technically imperfect but demonstrates all required anatomy and answers the immediate clinical question. The patient deteriorates after the exposure. Which is the best next action Using the most defensible radiographic reasoning, what is the most appropriate conclusion or action?",
        "options": [
          "Move the patient to a routine position to improve image symmetry",
          "Prioritize the patient and communicate the clinical change rather than repeat for perfection",
          "Repeat immediately so the image meets routine positioning standards",
          "Adjust technique and obtain an additional image before reporting the change"
        ],
        "answer": 1,
        "explanation": "Patient condition takes priority; repeats should be clinically justified, especially when the existing image is diagnostic."
      }
    ]
  }
};

export const radiographyCapstone = [
  {
    "category": "Patient Care & Professional Practice",
    "question": "A patient states the correct name but gives a date of birth that differs from the order by one digit. The wristband matches the patient’s statement, not the order. What is the best next action?",
    "options": [
      "Ask a family member which date of birth is correct",
      "Pause and reconcile the discrepancy before positioning the patient",
      "Use the wristband because it is attached to the patient",
      "Proceed if the requested anatomy matches the complaint"
    ],
    "answer": 1,
    "explanation": "Conflicting identifiers must be resolved before the examination; neither a plausible order nor a single matching source is enough."
  },
  {
    "category": "Patient Care & Professional Practice",
    "question": "An inpatient arrives for a chest exam with oxygen tubing, an IV pump, and a recent fall-risk alert. Which action best prepares for transfer?",
    "options": [
      "Assess mobility and lines, then obtain appropriate assistance",
      "Disconnect the oxygen briefly to simplify the transfer",
      "Ask the patient to stand while the detector is positioned",
      "Move the patient first and organize the lines afterward"
    ],
    "answer": 0,
    "explanation": "Transfer planning should account for mobility, attached devices, and available help before movement begins."
  },
  {
    "category": "Patient Care & Professional Practice",
    "question": "A patient with limited English proficiency nods during instructions but cannot repeat the breathing directions. What is the best response?",
    "options": [
      "Repeat the same instructions more slowly and loudly",
      "Ask an accompanying child to interpret the instructions",
      "Proceed because nodding indicates adequate understanding",
      "Use qualified language assistance and confirm understanding"
    ],
    "answer": 3,
    "explanation": "Communication should be adapted and verified; qualified language support is preferable to assumptions or inappropriate interpreters."
  },
  {
    "category": "Patient Care & Professional Practice",
    "question": "During preparation for a contrast-related procedure, the patient reports a prior severe reaction but the order contains no allergy information. What should the technologist do?",
    "options": [
      "Document the history only after the procedure is finished",
      "Ask the patient whether the prior reaction felt serious",
      "Stop and communicate the history before proceeding",
      "Proceed because the current order is already authorized"
    ],
    "answer": 2,
    "explanation": "A potentially significant prior reaction requires clarification and communication before contrast administration."
  },
  {
    "category": "Patient Care & Professional Practice",
    "question": "A patient becomes pale and diaphoretic while upright for imaging and says, “I feel like I’m going to pass out.” What is the priority?",
    "options": [
      "Leave the patient standing while obtaining assistance",
      "Protect the patient from falling and initiate appropriate assessment",
      "Finish the exposure quickly before changing the position",
      "Ask the patient to hold still until symptoms improve"
    ],
    "answer": 1,
    "explanation": "Immediate patient safety and assessment take priority over completing the exposure."
  },
  {
    "category": "Radiographic Anatomy & Positioning Foundations",
    "question": "A technologist intends a true lateral knee, but the femoral condyles are not superimposed on the image. Which conclusion is most appropriate?",
    "options": [
      "The part was rotated and requires positioning correction",
      "The SID was too long and reduced recorded detail",
      "The mAs was too low and changed joint alignment",
      "The collimation field was too small for the detector"
    ],
    "answer": 0,
    "explanation": "Failure to superimpose structures expected on a lateral image indicates rotational positioning error."
  },
  {
    "category": "Radiographic Anatomy & Positioning Foundations",
    "question": "A patient with a broad, hypersthenic body habitus is positioned using a memorized centering point, but the required anatomy is clipped. What is the best lesson?",
    "options": [
      "Increase SID so more anatomy automatically fits the detector",
      "Increase kVp because penetration determines anatomic coverage",
      "Rotate the patient slightly to move anatomy toward the field",
      "Use palpable anatomy and image requirements rather than fixed distances alone"
    ],
    "answer": 3,
    "explanation": "Body habitus changes anatomic relationships; centering should be based on landmarks and required coverage."
  },
  {
    "category": "Radiographic Anatomy & Positioning Foundations",
    "question": "The central ray is angled while the part and detector remain parallel. Which geometric effect is most likely if the angle is not required by the projection?",
    "options": [
      "Loss of receptor exposure caused by reduced tube current",
      "Improved spatial resolution from a smaller effective field",
      "Shape distortion from misalignment of the imaging components",
      "Uniform magnification caused only by increased SID"
    ],
    "answer": 2,
    "explanation": "Misalignment of tube, part, and detector can produce shape distortion."
  },
  {
    "category": "Radiographic Anatomy & Positioning Foundations",
    "question": "Which description best distinguishes an AP projection from an AP position?",
    "options": [
      "Projection describes anatomy; position describes exposure technique",
      "Projection describes ray path; position describes patient placement",
      "Projection describes patient placement; position describes ray path",
      "Projection describes detector size; position describes field size"
    ],
    "answer": 1,
    "explanation": "Projection refers to the direction of the central ray through the patient; position refers to how the patient is placed."
  },
  {
    "category": "Radiographic Anatomy & Positioning Foundations",
    "question": "A marker is visible, anatomy is included, and exposure is adequate, but a joint space expected to be open is closed. What should be evaluated first?",
    "options": [
      "Part alignment and central-ray relationship to the joint",
      "Detector exposure indicator and processing algorithm",
      "Patient identification and order-entry information",
      "Tube heat units and generator waveform"
    ],
    "answer": 0,
    "explanation": "Closed joint spaces commonly reflect alignment/angle problems rather than exposure or administrative issues."
  },
  {
    "category": "Radiation Physics & X-Ray Production",
    "question": "An exposure is made with increased tube current while kVp and time are unchanged. Which change occurs most directly at the x-ray tube?",
    "options": [
      "Electrons strike the target with greater kinetic energy",
      "The average photon energy rises without changing quantity",
      "The focal spot becomes smaller because current increased",
      "More electrons cross the tube per unit time"
    ],
    "answer": 3,
    "explanation": "Tube current controls the rate of electron flow and therefore primarily affects photon quantity."
  },
  {
    "category": "Radiation Physics & X-Ray Production",
    "question": "A photon transfers part of its energy to an outer-shell electron and changes direction. Which interaction occurred?",
    "options": [
      "Pair production",
      "Coherent tube emission",
      "Compton scatter",
      "Photoelectric absorption"
    ],
    "answer": 2,
    "explanation": "Compton interaction produces a scattered photon and recoil electron after partial energy transfer."
  },
  {
    "category": "Radiation Physics & X-Ray Production",
    "question": "A thicker patient produces more scatter at the same field size and technique. Which change most directly reduces scatter production?",
    "options": [
      "A shorter SID to increase beam intensity",
      "Tighter collimation to the anatomy of interest",
      "A larger detector to capture the full scatter field",
      "A higher mAs to improve detector signal"
    ],
    "answer": 1,
    "explanation": "Reducing field size decreases the volume of tissue irradiated and therefore reduces scatter production."
  },
  {
    "category": "Radiation Physics & X-Ray Production",
    "question": "Additional filtration is introduced into the useful beam. Which effect is expected?",
    "options": [
      "Low-energy photons are preferentially removed from the beam",
      "High-energy photons are converted into characteristic radiation",
      "Photon quantity increases because tube current is unchanged",
      "Scatter production rises because field size becomes larger"
    ],
    "answer": 0,
    "explanation": "Filtration preferentially removes low-energy photons that contribute to skin dose without useful image formation."
  },
  {
    "category": "Radiation Physics & X-Ray Production",
    "question": "A technologist selects a smaller focal spot for a detail-sensitive exam. What tradeoff should be anticipated?",
    "options": [
      "Greater photon energy with less anode heat production",
      "Lower patient dose regardless of the selected technique",
      "More scatter cleanup without using a grid",
      "Improved geometric detail with more restrictive tube loading"
    ],
    "answer": 3,
    "explanation": "A smaller focal spot improves spatial resolution but typically limits allowable tube loading because heat is concentrated over a smaller target area."
  },
  {
    "category": "Exposure Factors & Image Acquisition",
    "question": "A radiograph has adequate penetration but the exposure indicator shows substantially excessive detector exposure. Which change most directly reduces detector exposure while preserving beam penetration?",
    "options": [
      "Increase OID while maintaining both exposure factors",
      "Decrease SID while maintaining both exposure factors",
      "Reduce mAs while maintaining the selected kVp",
      "Reduce kVp while maintaining the selected mAs"
    ],
    "answer": 2,
    "explanation": "Reducing mAs primarily reduces photon quantity while preserving the selected beam energy/penetration."
  },
  {
    "category": "Exposure Factors & Image Acquisition",
    "question": "A patient is moved farther from the detector while SID remains unchanged. What combination is most likely?",
    "options": [
      "Lower detector exposure with unchanged geometric sharpness",
      "Greater magnification and reduced recorded spatial detail",
      "Less magnification and improved recorded spatial detail",
      "Higher beam energy and lower scatter production"
    ],
    "answer": 1,
    "explanation": "Increasing OID increases magnification and geometric unsharpness."
  },
  {
    "category": "Exposure Factors & Image Acquisition",
    "question": "An AEC chest exposure terminates too early because the selected chamber is partly outside the lung field. What is the best correction?",
    "options": [
      "Reposition and select a chamber fully covered by the intended anatomy",
      "Increase backup time so the exposure cannot terminate early",
      "Increase mA because AEC responds directly to tube current",
      "Open collimation so every chamber receives scatter radiation"
    ],
    "answer": 0,
    "explanation": "AEC depends on correct chamber selection and positioning; changing backup or mA does not fix an uncovered chamber."
  },
  {
    "category": "Exposure Factors & Image Acquisition",
    "question": "A grid is added for a thicker body part without changing other factors. What is the most likely immediate effect?",
    "options": [
      "More scatter reaches the detector and receptor exposure rises",
      "Magnification decreases because the grid reduces OID",
      "Beam energy increases because the grid hardens the beam",
      "Less scatter reaches the detector but receptor exposure may fall"
    ],
    "answer": 3,
    "explanation": "A grid removes scatter and some primary radiation, often requiring an exposure increase to maintain receptor exposure."
  },
  {
    "category": "Exposure Factors & Image Acquisition",
    "question": "Two digital images appear similarly bright after processing, but one has a much higher exposure indicator than target. What should the technologist conclude?",
    "options": [
      "Post-processing eliminates any patient-dose difference",
      "Exposure indicators are unrelated to technique selection",
      "Display brightness can mask excessive detector exposure",
      "The images received identical detector exposure"
    ],
    "answer": 2,
    "explanation": "Digital processing can normalize brightness, so exposure indicators help reveal dose creep or excessive receptor exposure."
  },
  {
    "category": "Radiation Biology & Protection",
    "question": "A repeat is considered because the anatomy is slightly off center but all required structures are included and diagnostic criteria are met. Which choice best supports ALARA?",
    "options": [
      "Repeat with a larger field to improve visual symmetry",
      "Do not repeat solely to improve cosmetic centering",
      "Repeat because every image must be perfectly centered",
      "Increase technique and repeat to ensure greater penetration"
    ],
    "answer": 1,
    "explanation": "A repeat that adds exposure without improving diagnostic adequacy is inconsistent with ALARA."
  },
  {
    "category": "Radiation Biology & Protection",
    "question": "During mobile imaging, a staff member can step farther from the patient without compromising care. Which protection principle is being used most directly?",
    "options": [
      "Distance from the radiation source and scatter field",
      "Filtration of low-energy photons from the primary beam",
      "Collimation of the beam to the anatomy of interest",
      "Reduction of fluoroscopic pulse rate during a procedure"
    ],
    "answer": 0,
    "explanation": "Increasing distance reduces exposure according to geometric principles and is a key occupational protection strategy."
  },
  {
    "category": "Radiation Biology & Protection",
    "question": "A patient reports possible pregnancy before a medically indicated pelvic exam. What is the best technologist response?",
    "options": [
      "Cancel the examination without consulting the care team",
      "Proceed without documentation because the exam is ordered",
      "Substitute a different projection without authorization",
      "Follow pregnancy-screening policy and communicate before exposure"
    ],
    "answer": 3,
    "explanation": "Pregnancy concerns require policy-based screening and communication; the technologist should not independently cancel or redesign the exam outside role."
  },
  {
    "category": "Radiation Biology & Protection",
    "question": "Which change usually reduces both patient tissue irradiated and scatter production?",
    "options": [
      "Increase SID while opening collimation",
      "Use a larger detector with the same field size",
      "Collimate more closely to the required anatomy",
      "Increase field size while reducing mAs"
    ],
    "answer": 2,
    "explanation": "Tighter collimation reduces irradiated volume and scatter production."
  },
  {
    "category": "Radiation Biology & Protection",
    "question": "A department notices repeated lateral knee rejects for rotation. What is the most effective safety response?",
    "options": [
      "Increase field size to reduce the chance of rotation",
      "Analyze the pattern and correct the positioning process",
      "Tell technologists to increase mAs on all lateral knees",
      "Remove reject analysis so staff do not feel penalized"
    ],
    "answer": 1,
    "explanation": "Repeat analysis should identify systematic causes and guide process improvement, reducing future unnecessary exposures."
  },
  {
    "category": "Chest, Abdomen & Extremity Procedures",
    "question": "An upright PA chest shows the medial clavicles equidistant from the spinous processes, but only eight posterior ribs are visible above the diaphragm. Which issue is most likely?",
    "options": [
      "Inadequate inspiration rather than patient rotation",
      "Excessive rotation rather than inadequate inspiration",
      "Excessive SID rather than inadequate inspiration",
      "Insufficient mAs rather than inadequate inspiration"
    ],
    "answer": 0,
    "explanation": "Symmetric clavicular relationships argue against rotation; low rib count suggests suboptimal inspiration."
  },
  {
    "category": "Chest, Abdomen & Extremity Procedures",
    "question": "A trauma patient with suspected hip fracture cannot internally rotate the affected leg. Which approach is most appropriate?",
    "options": [
      "Internally rotate the leg to obtain the routine AP appearance",
      "Externally rotate both legs equally to improve symmetry",
      "Delay all imaging until the patient can tolerate rotation",
      "Maintain the limb position and use a trauma-appropriate lateral method"
    ],
    "answer": 3,
    "explanation": "Suspected fracture is a contraindication to routine internal rotation; equipment and projection should adapt to the patient."
  },
  {
    "category": "Chest, Abdomen & Extremity Procedures",
    "question": "A forearm image includes the wrist but clips the elbow joint. What is the primary problem?",
    "options": [
      "The beam energy is too low for cortical bone visualization",
      "The patient is rotated because the elbow is not included",
      "Required anatomy is incomplete for a long-bone examination",
      "The exposure indicator is invalid because a joint is missing"
    ],
    "answer": 2,
    "explanation": "Long-bone studies generally require inclusion of both adjacent joints."
  },
  {
    "category": "Chest, Abdomen & Extremity Procedures",
    "question": "An AP supine abdomen is requested to evaluate bowel gas pattern. The image clips the pubic symphysis. What should drive the repeat decision?",
    "options": [
      "Whether a grid was used for the first exposure",
      "Whether required abdominal anatomy for the exam is fully included",
      "Whether the exposure indicator falls within the target range",
      "Whether the patient can hold a deeper inspiration next time"
    ],
    "answer": 1,
    "explanation": "Coverage of required anatomy is a core image criterion; exposure adequacy cannot compensate for missing anatomy."
  },
  {
    "category": "Chest, Abdomen & Extremity Procedures",
    "question": "A patient with a painful shoulder cannot abduct the arm for a routine projection. What is the best principle?",
    "options": [
      "Adapt the projection to the patient while preserving the diagnostic goal",
      "Force the routine position because standardization is always required",
      "Increase kVp so positioning becomes less important",
      "Use a larger field so the arm position does not matter"
    ],
    "answer": 0,
    "explanation": "Patient condition may require modified projections; the diagnostic objective should be preserved without causing harm."
  },
  {
    "category": "Spine, Pelvis, Skull & Advanced Procedures",
    "question": "A patient with suspected cervical spine injury remains immobilized. Which principle should guide the initial lateral imaging approach?",
    "options": [
      "Rotate the head until the mandibular rami are superimposed",
      "Flex the neck to separate the lower cervical vertebrae",
      "Remove immobilization if it interferes with standard positioning",
      "Move the tube and detector rather than manipulating the cervical spine"
    ],
    "answer": 3,
    "explanation": "In trauma, equipment should adapt to the patient while spinal precautions are maintained."
  },
  {
    "category": "Spine, Pelvis, Skull & Advanced Procedures",
    "question": "An AP pelvis is requested after high-energy trauma. The affected leg is shortened and externally rotated. What should the technologist do?",
    "options": [
      "Apply traction before positioning to restore normal alignment",
      "Delay imaging until the leg position becomes symmetric",
      "Avoid routine internal rotation and image according to trauma protocol",
      "Internally rotate both legs to place the femoral necks parallel"
    ],
    "answer": 2,
    "explanation": "Shortening and external rotation can indicate fracture; routine internal rotation may worsen injury."
  },
  {
    "category": "Spine, Pelvis, Skull & Advanced Procedures",
    "question": "A skull projection shows asymmetric orbital margins when symmetry is expected. Which error should be considered first?",
    "options": [
      "Grid ratio too low for the selected kVp",
      "Head rotation relative to the detector",
      "Excessive mAs relative to patient thickness",
      "Insufficient filtration of the primary beam"
    ],
    "answer": 1,
    "explanation": "Asymmetry of paired structures commonly indicates rotation."
  },
  {
    "category": "Spine, Pelvis, Skull & Advanced Procedures",
    "question": "During a mobile exam in isolation, the detector has been placed behind the patient and is now contaminated. What is the best next step?",
    "options": [
      "Handle and disinfect the detector according to isolation and equipment policy",
      "Return the detector directly to the department for later cleaning",
      "Cover the detector with a clean sheet and continue using it",
      "Wipe only the visible surface if no fluid is present"
    ],
    "answer": 0,
    "explanation": "Portable equipment can transmit organisms; cleaning must follow infection-control and manufacturer/facility procedures."
  },
  {
    "category": "Spine, Pelvis, Skull & Advanced Procedures",
    "question": "During fluoroscopy, which change most directly reduces exposure when clinically feasible?",
    "options": [
      "Increase magnification mode for every image sequence",
      "Move personnel closer to improve communication",
      "Open collimation to prevent anatomy from leaving the field",
      "Minimize beam-on time and use dose-saving operating modes"
    ],
    "answer": 3,
    "explanation": "Reducing fluoroscopy time and using dose-saving modes lowers exposure while maintaining the clinical task."
  },
  {
    "category": "Image Evaluation & Clinical Judgment",
    "question": "A chest image is adequately exposed and includes the lungs, but the sternoclavicular joints are asymmetric and one scapula overlies the lung field. What is the best interpretation?",
    "options": [
      "Detector artifact is present despite acceptable collimation",
      "Motion is present despite acceptable inspiration",
      "Positioning error is present despite acceptable exposure",
      "Exposure error is present despite acceptable positioning"
    ],
    "answer": 2,
    "explanation": "Asymmetric thoracic landmarks and scapular superimposition indicate positioning problems."
  },
  {
    "category": "Image Evaluation & Clinical Judgment",
    "question": "A digital abdomen appears appropriately bright, but the exposure indicator is far above target and noise is minimal. What is the best corrective action for future similar patients?",
    "options": [
      "Increase field size so the detector receives more scatter",
      "Reduce technique appropriately rather than relying on processed brightness",
      "Increase technique further to ensure the image remains noise free",
      "Ignore the indicator because displayed brightness is acceptable"
    ],
    "answer": 1,
    "explanation": "Processed brightness can conceal excessive detector exposure; technique should be optimized using exposure feedback."
  },
  {
    "category": "Image Evaluation & Clinical Judgment",
    "question": "A repeated image still shows the same linear artifact in the identical detector location despite repositioning the patient. What source is most likely?",
    "options": [
      "Detector or image-receptor related artifact",
      "Patient clothing artifact",
      "Patient motion during exposure",
      "Anatomic structure from patient rotation"
    ],
    "answer": 0,
    "explanation": "A fixed artifact that remains in the same detector location despite patient repositioning suggests a detector/system source."
  },
  {
    "category": "Image Evaluation & Clinical Judgment",
    "question": "An image is clipped laterally, but the exposure indicator is within target and positioning is otherwise correct. What should be changed on repeat?",
    "options": [
      "Increase mAs to compensate for the missing anatomy",
      "Increase kVp to widen the useful x-ray beam",
      "Shorten exposure time to reduce geometric clipping",
      "Center and collimate to include the required anatomy"
    ],
    "answer": 3,
    "explanation": "Missing anatomy is a centering/field-coverage problem, not an exposure-factor problem."
  },
  {
    "category": "Image Evaluation & Clinical Judgment",
    "question": "A trauma image is technically imperfect but demonstrates all required anatomy and answers the immediate clinical question. The patient deteriorates after the exposure. What is the best next action?",
    "options": [
      "Adjust technique and obtain an additional image before reporting the change",
      "Move the patient to a routine position to improve image symmetry",
      "Prioritize the patient and communicate the clinical change rather than repeat for perfection",
      "Repeat immediately so the image meets routine positioning standards"
    ],
    "answer": 2,
    "explanation": "Patient condition takes priority; repeats should be clinically justified, especially when the existing image is diagnostic."
  }
];
