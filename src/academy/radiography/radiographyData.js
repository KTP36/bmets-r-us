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
                  "Pause and reconcile the discrepancy before positioning the patient",
                  "Proceed if the requested anatomy matches the complaint",
                  "Ask a family member which date of birth is correct",
                  "Use the wristband because it is attached to the patient"
            ],
            "answer": 0,
            "explanation": "Conflicting identifiers must be resolved before the examination; neither a plausible order nor a single matching source is enough."
      },
      {
            "question": "An inpatient arrives for a chest exam with oxygen tubing, an IV pump, and a recent fall-risk alert. Which action best prepares for transfer?",
            "options": [
                  "Ask the patient to stand while the detector is positioned",
                  "Assess mobility and lines, then obtain appropriate assistance",
                  "Move the patient first and organize the lines afterward",
                  "Disconnect the oxygen briefly to simplify the transfer"
            ],
            "answer": 1,
            "explanation": "Transfer planning should account for mobility, attached devices, and available help before movement begins."
      },
      {
            "question": "A patient with limited English proficiency nods during instructions but cannot repeat the breathing directions. What is the best response?",
            "options": [
                  "Proceed because nodding indicates adequate understanding",
                  "Repeat the same instructions more slowly and loudly",
                  "Use qualified language assistance and confirm understanding",
                  "Ask an accompanying child to interpret the instructions"
            ],
            "answer": 2,
            "explanation": "Communication should be adapted and verified; qualified language support is preferable to assumptions or inappropriate interpreters."
      },
      {
            "question": "During preparation for a contrast-related procedure, the patient reports a prior severe reaction but the order contains no allergy information. What should the technologist do?",
            "options": [
                  "Ask the patient whether the prior reaction felt serious",
                  "Proceed because the current order is already authorized",
                  "Document the history only after the procedure is finished",
                  "Stop and communicate the history before proceeding"
            ],
            "answer": 3,
            "explanation": "A potentially significant prior reaction requires clarification and communication before contrast administration."
      },
      {
            "question": "A patient becomes pale and diaphoretic while upright for imaging and says, “I feel like I’m going to pass out.” What is the priority?",
            "options": [
                  "Protect the patient from falling and initiate appropriate assessment",
                  "Ask the patient to hold still until symptoms improve",
                  "Leave the patient standing while obtaining assistance",
                  "Finish the exposure quickly before changing the position"
            ],
            "answer": 0,
            "explanation": "Immediate patient safety and assessment take priority over completing the exposure."
      },
      {
            "question": "A patient scheduled for a right wrist exam points to the left wrist as the painful side. The order specifies right. What should happen before positioning?",
            "options": [
                  "Image the right wrist because the order controls",
                  "Clarify the laterality discrepancy before imaging",
                  "Image both wrists to avoid a delay",
                  "Ask the patient to choose which side to image"
            ],
            "answer": 1,
            "explanation": "A laterality conflict must be resolved before exposure rather than guessed or bypassed."
      },
      {
            "question": "A patient with hearing impairment cannot hear breathing instructions in a busy room. Which approach best supports safe communication?",
            "options": [
                  "Repeat the same words at a much louder volume",
                  "Speak from behind the patient so positioning is not interrupted",
                  "Face the patient, reduce background noise, and confirm understanding",
                  "Rely on hand gestures without checking comprehension"
            ],
            "answer": 2,
            "explanation": "Communication should be adapted to the patient and understanding should be verified."
      },
      {
            "question": "A patient on contact precautions needs a portable chest image. Which action best limits cross-contamination?",
            "options": [
                  "Place the detector on the bed first and clean it after the shift",
                  "Carry unused supplies into the room for faster workflow",
                  "Skip hand hygiene because gloves are being worn",
                  "Use appropriate barriers and disinfect equipment after the exam"
            ],
            "answer": 3,
            "explanation": "Appropriate barriers, hand hygiene, and equipment disinfection reduce transmission risk."
      },
      {
            "question": "A patient with a new spinal precaution order must be moved from stretcher to table. Which plan is most appropriate?",
            "options": [
                  "Use a coordinated transfer with enough trained assistance",
                  "Ask the patient to pivot independently if pain is tolerable",
                  "Pull the patient quickly using the draw sheet alone",
                  "Delay reviewing precautions until after the exposure"
            ],
            "answer": 0,
            "explanation": "Transfers should account for restrictions, patient condition, and adequate assistance before movement."
      },
      {
            "question": "While reviewing history, a patient reports dizziness only when standing. An upright exam is ordered. What is the best first step?",
            "options": [
                  "Proceed upright and shorten the exposure time",
                  "Assess the risk and adapt the plan before standing",
                  "Have the patient stand while another staff member watches",
                  "Cancel the exam without communicating with the care team"
            ],
            "answer": 1,
            "explanation": "Known orthostatic symptoms should influence positioning and safety planning before movement."
      },
      {
            "question": "A patient refuses an ordered radiograph after the procedure is explained. What is the best response?",
            "options": [
                  "Proceed because the provider already placed the order",
                  "Ask a family member to authorize the exam instead",
                  "Document the refusal and notify the appropriate care team member",
                  "Delay until the patient is distracted and then proceed"
            ],
            "answer": 2,
            "explanation": "A competent patient's refusal should be respected, documented, and communicated."
      },
      {
            "question": "A patient arrives with a draining wound near the area being imaged. Which action is most appropriate before positioning equipment?",
            "options": [
                  "Remove the dressing so anatomy is easier to see",
                  "Cover the detector only after the exposure is complete",
                  "Ignore the drainage because the detector does not touch skin",
                  "Follow precautions and protect equipment from contamination"
            ],
            "answer": 3,
            "explanation": "Infection-control planning should occur before contaminated contact with equipment."
      },
      {
            "question": "During a wheelchair transfer, the patient says the footrests are still down and blocking movement. What should the technologist do?",
            "options": [
                  "Pause and correct the transfer setup before moving",
                  "Continue because stopping increases fall risk",
                  "Ask the patient to lift both feet during the transfer",
                  "Pull the wheelchair backward while the patient stands"
            ],
            "answer": 0,
            "explanation": "Unsafe transfer setup should be corrected before movement begins."
      },
      {
            "question": "A patient becomes acutely short of breath during positioning and cannot finish a sentence. What is the priority?",
            "options": [
                  "Complete the exposure because motion may increase later",
                  "Stop the exam and initiate appropriate assistance",
                  "Ask the patient to hold the breath for one quick image",
                  "Lower the technique so the exposure is faster"
            ],
            "answer": 1,
            "explanation": "Acute respiratory distress takes priority over image completion."
      },
      {
            "question": "A patient’s chart lists a medication allergy, while the patient denies ever having that allergy. What is the best action before a related contrast procedure?",
            "options": [
                  "Delete the allergy from the chart based on the patient's statement",
                  "Proceed because the patient currently denies the allergy",
                  "Clarify the discrepancy according to policy before proceeding",
                  "Ask the patient to sign a waiver and continue"
            ],
            "answer": 2,
            "explanation": "Conflicting safety information should be reconciled before a procedure that could be affected by it."
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
                  "The part was rotated and requires positioning correction",
                  "The collimation field was too small for the detector",
                  "The SID was too long and reduced recorded detail"
            ],
            "answer": 1,
            "explanation": "Failure to superimpose structures expected on a lateral image indicates rotational positioning error."
      },
      {
            "question": "A patient with a broad, hypersthenic body habitus is positioned using a memorized centering point, but the required anatomy is clipped. What is the best lesson?",
            "options": [
                  "Rotate the patient slightly to move anatomy toward the field",
                  "Increase SID so more anatomy automatically fits the detector",
                  "Use palpable anatomy and image requirements rather than fixed distances alone",
                  "Increase kVp because penetration determines anatomic coverage"
            ],
            "answer": 2,
            "explanation": "Body habitus changes anatomic relationships; centering should be based on landmarks and required coverage."
      },
      {
            "question": "The central ray is angled while the part and detector remain parallel. Which geometric effect is most likely if the angle is not required by the projection?",
            "options": [
                  "Improved spatial resolution from a smaller effective field",
                  "Uniform magnification caused only by increased SID",
                  "Loss of receptor exposure caused by reduced tube current",
                  "Shape distortion from misalignment of the imaging components"
            ],
            "answer": 3,
            "explanation": "Misalignment of tube, part, and detector can produce shape distortion."
      },
      {
            "question": "Which description best distinguishes an AP projection from an AP position?",
            "options": [
                  "Projection describes ray path; position describes patient placement",
                  "Projection describes detector size; position describes field size",
                  "Projection describes anatomy; position describes exposure technique",
                  "Projection describes patient placement; position describes ray path"
            ],
            "answer": 0,
            "explanation": "Projection refers to the direction of the central ray through the patient; position refers to how the patient is placed."
      },
      {
            "question": "A marker is visible, anatomy is included, and exposure is adequate, but a joint space expected to be open is closed. What should be evaluated first?",
            "options": [
                  "Patient identification and order-entry information",
                  "Part alignment and central-ray relationship to the joint",
                  "Tube heat units and generator waveform",
                  "Detector exposure indicator and processing algorithm"
            ],
            "answer": 1,
            "explanation": "Closed joint spaces commonly reflect alignment/angle problems rather than exposure or administrative issues."
      },
      {
            "question": "A radiograph intended as a true AP projection shows the patient rotated, although the central ray was perpendicular. Which factor most likely caused the asymmetry?",
            "options": [
                  "Detector processing algorithm",
                  "Focal spot size selected at the tube",
                  "Patient position relative to the detector",
                  "Exposure time used for the image"
            ],
            "answer": 2,
            "explanation": "Rotation is primarily a positioning relationship between the patient and detector."
      },
      {
            "question": "A technologist centers using a fixed distance below the iliac crest, but the anatomy of interest is consistently clipped in very tall patients. What should be changed?",
            "options": [
                  "Rotate the detector to compensate for differences in patient body height",
                  "Increase mAs so clipped anatomy becomes more visible on the receptor",
                  "Increase SID until the field automatically includes the missing anatomy",
                  "Use palpable anatomy and required coverage rather than a fixed distance alone"
            ],
            "answer": 3,
            "explanation": "Surface anatomy and required image coverage should guide centering."
      },
      {
            "question": "A part is not parallel to the detector and the central ray is not perpendicular to the part. Which image effect is most likely?",
            "options": [
                  "Shape distortion",
                  "Uniform brightness increase",
                  "Reduced scatter production",
                  "Lower tube loading"
            ],
            "answer": 0,
            "explanation": "Misalignment among tube, part, and detector creates shape distortion."
      },
      {
            "question": "Which statement best describes a lateral projection?",
            "options": [
                  "The patient must always lie on the left side",
                  "The central ray enters one side and exits the opposite side",
                  "The detector must be placed horizontally",
                  "The anatomy must be rotated exactly 45 degrees"
            ],
            "answer": 1,
            "explanation": "Projection describes the path of the central ray through the patient."
      },
      {
            "question": "A joint space is closed on an image even though the part appears centered. Which correction should be considered first?",
            "options": [
                  "Increase field size to reduce magnification",
                  "Increase mAs to separate overlapping anatomy",
                  "Evaluate central-ray angle and part alignment",
                  "Change processing to increase displayed contrast"
            ],
            "answer": 2,
            "explanation": "Closed joint spaces commonly reflect alignment or central-ray geometry."
      },
      {
            "question": "A patient cannot assume the textbook position because of pain. What principle should guide the modification?",
            "options": [
                  "Skip image criteria because the patient is symptomatic",
                  "Force the standard position because alternatives are invalid",
                  "Increase technique to compensate for any positioning error",
                  "Adapt positioning while preserving the required anatomy and projection goal"
            ],
            "answer": 3,
            "explanation": "Positioning can be adapted as long as the diagnostic objective and patient safety are preserved."
      },
      {
            "question": "A body part is centered correctly, but one end is farther from the detector than the other. What distortion is most likely?",
            "options": [
                  "Unequal magnification across the part",
                  "Uniform reduction in receptor exposure",
                  "Improved spatial resolution throughout",
                  "Loss of beam penetration only"
            ],
            "answer": 0,
            "explanation": "Unequal OID across the anatomy can create unequal magnification."
      },
      {
            "question": "The detector is angled relative to the central ray for a projection that requires perpendicular alignment. What should be expected?",
            "options": [
                  "Higher beam energy",
                  "Shape distortion",
                  "Less patient rotation",
                  "Shorter exposure time"
            ],
            "answer": 1,
            "explanation": "Detector and central-ray misalignment produces distortion."
      },
      {
            "question": "A technologist uses the same palpated landmark on two patients with different body habitus. Why might the final centering differ?",
            "options": [
                  "Detector size changes organ position",
                  "Beam energy changes landmark location",
                  "Internal anatomy can shift relative to surface landmarks",
                  "Tube current changes patient alignment"
            ],
            "answer": 2,
            "explanation": "Body habitus affects internal anatomic relationships."
      },
      {
            "question": "A projection is labeled correctly, but the image fails the expected positioning criteria. Which conclusion is best?",
            "options": [
                  "The detector orientation determines acceptability",
                  "The image is acceptable because the label is correct",
                  "Exposure technique overrides positioning criteria",
                  "The named projection alone does not prove correct positioning"
            ],
            "answer": 3,
            "explanation": "Positioning is judged by the resulting anatomy and image criteria, not the label alone."
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
                  "Electrons strike the target with greater kinetic energy",
                  "More electrons cross the tube per unit time",
                  "The average photon energy rises without changing quantity"
            ],
            "answer": 2,
            "explanation": "Tube current controls the rate of electron flow and therefore primarily affects photon quantity."
      },
      {
            "question": "A photon transfers part of its energy to an outer-shell electron and changes direction. Which interaction occurred?",
            "options": [
                  "Coherent tube emission",
                  "Photoelectric absorption",
                  "Pair production",
                  "Compton scatter"
            ],
            "answer": 3,
            "explanation": "Compton interaction produces a scattered photon and recoil electron after partial energy transfer."
      },
      {
            "question": "A thicker patient produces more scatter at the same field size and technique. Which change most directly reduces scatter production?",
            "options": [
                  "Tighter collimation to the anatomy of interest",
                  "A higher mAs to improve detector signal",
                  "A shorter SID to increase beam intensity",
                  "A larger detector to capture the full scatter field"
            ],
            "answer": 0,
            "explanation": "Reducing field size decreases the volume of tissue irradiated and therefore reduces scatter production."
      },
      {
            "question": "Additional filtration is introduced into the useful beam. Which effect is expected?",
            "options": [
                  "Photon quantity increases because tube current is unchanged",
                  "Low-energy photons are preferentially removed from the beam",
                  "Scatter production rises because field size becomes larger",
                  "High-energy photons are converted into characteristic radiation"
            ],
            "answer": 1,
            "explanation": "Filtration preferentially removes low-energy photons that contribute to skin dose without useful image formation."
      },
      {
            "question": "A technologist selects a smaller focal spot for a detail-sensitive exam. What tradeoff should be anticipated?",
            "options": [
                  "More scatter cleanup without using a grid",
                  "Greater photon energy with less anode heat production",
                  "Improved geometric detail with more restrictive tube loading",
                  "Lower patient dose regardless of the selected technique"
            ],
            "answer": 2,
            "explanation": "A smaller focal spot improves spatial resolution but typically limits allowable tube loading because heat is concentrated over a smaller target area."
      },
      {
            "question": "kVp is increased while mAs remains constant. Which beam change is expected most directly?",
            "options": [
                  "Less scatter because photon energy is lower",
                  "More electrons emitted without changing photon energy",
                  "Smaller focal spot with unchanged tube loading",
                  "Higher photon energy with increased beam penetrability"
            ],
            "answer": 3,
            "explanation": "kVp primarily affects photon energy and penetrability."
      },
      {
            "question": "Exposure time is doubled while mA is halved. What happens to mAs?",
            "options": [
                  "It remains unchanged",
                  "It doubles",
                  "It is reduced by half",
                  "It becomes unrelated to photon quantity"
            ],
            "answer": 0,
            "explanation": "mAs is the product of mA and time."
      },
      {
            "question": "An incident x-ray photon is completely absorbed and ejects an inner-shell electron. Which interaction is described?",
            "options": [
                  "Compton scatter",
                  "Photoelectric absorption",
                  "Coherent scatter",
                  "Pair production"
            ],
            "answer": 1,
            "explanation": "Photoelectric interaction involves complete photon absorption and inner-shell ionization."
      },
      {
            "question": "A photon changes direction without ionizing the atom and with essentially no energy loss. Which interaction best fits?",
            "options": [
                  "Photoelectric absorption",
                  "Compton scatter",
                  "Coherent scatter",
                  "Bremsstrahlung production"
            ],
            "answer": 2,
            "explanation": "Coherent scatter changes direction without ionization."
      },
      {
            "question": "Why does tighter collimation usually improve image contrast?",
            "options": [
                  "It increases detector magnification",
                  "It increases focal-spot size",
                  "It raises average photon energy",
                  "It reduces the volume of tissue producing scatter"
            ],
            "answer": 3,
            "explanation": "Smaller fields irradiate less tissue and generate less scatter."
      },
      {
            "question": "Why is low-energy filtration valuable even though it reduces photon quantity?",
            "options": [
                  "It removes low-energy photons that add skin dose with little image benefit",
                  "It converts scattered photons into useful primary-beam radiation",
                  "It increases field size while keeping patient exposure unchanged",
                  "It lowers tube heat by reducing the number of electrons crossing the tube"
            ],
            "answer": 0,
            "explanation": "Low-energy photons add dose with little image benefit."
      },
      {
            "question": "An electron approaches the tungsten nucleus, slows, and changes direction while emitting an x-ray photon. What process occurred?",
            "options": [
                  "Characteristic production",
                  "Bremsstrahlung production",
                  "Compton scatter",
                  "Photoelectric absorption"
            ],
            "answer": 1,
            "explanation": "Bremsstrahlung is produced by electron deceleration near nuclei."
      },
      {
            "question": "An incoming electron ejects a K-shell electron from the target atom, followed by an outer-shell transition. What x-ray is produced?",
            "options": [
                  "Compton radiation",
                  "Coherent scatter",
                  "Characteristic radiation",
                  "Pair production"
            ],
            "answer": 2,
            "explanation": "Characteristic x-rays result from shell transitions after inner-shell ionization."
      },
      {
            "question": "Why does increasing patient thickness generally increase scatter production?",
            "options": [
                  "The generator lowers kVp",
                  "The focal spot automatically enlarges",
                  "The detector becomes more efficient",
                  "More tissue volume is available for interactions"
            ],
            "answer": 3,
            "explanation": "More irradiated tissue increases opportunities for scatter interactions."
      },
      {
            "question": "A high-frequency generator is compared with a single-phase generator at the same selected kVp and mAs. Which difference is most relevant?",
            "options": [
                  "High-frequency output is more consistent because voltage ripple is lower",
                  "Single-phase output consistently produces a smaller focal spot at the same technique",
                  "High-frequency output eliminates scatter interactions within the patient",
                  "Single-phase output requires no rectification before electrons reach the tube"
            ],
            "answer": 0,
            "explanation": "Lower voltage ripple improves output consistency."
      },
      {
            "question": "A tube is repeatedly operated near its maximum heat capacity. Which concern is most immediate?",
            "options": [
                  "Loss of patient positioning accuracy",
                  "Excessive anode heat loading",
                  "Reduced collimator field size",
                  "Automatic increase in detector DQE"
            ],
            "answer": 1,
            "explanation": "Tube loading limits protect the anode and tube from heat."
      },
      {
            "question": "Why does a smaller focal spot have lower allowable tube loading?",
            "options": [
                  "The field size becomes too large",
                  "Photon energy becomes too low",
                  "Heat is concentrated over a smaller target area",
                  "The detector receives more scatter"
            ],
            "answer": 2,
            "explanation": "A smaller focal track concentrates heat."
      },
      {
            "question": "Which change primarily increases photon quantity without directly increasing maximum photon energy?",
            "options": [
                  "Increase OID while holding technique constant",
                  "Increase kVp while holding mAs constant",
                  "Increase SID while holding technique constant",
                  "Increase mAs while holding kVp constant"
            ],
            "answer": 3,
            "explanation": "mAs primarily changes photon quantity."
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
                  "Decrease SID while maintaining both exposure factors",
                  "Reduce kVp while maintaining the selected mAs",
                  "Increase OID while maintaining both exposure factors",
                  "Reduce mAs while maintaining the selected kVp"
            ],
            "answer": 3,
            "explanation": "Reducing mAs primarily reduces photon quantity while preserving the selected beam energy/penetration."
      },
      {
            "question": "A patient is moved farther from the detector while SID remains unchanged. What combination is most likely?",
            "options": [
                  "Greater magnification and reduced recorded spatial detail",
                  "Higher beam energy and lower scatter production",
                  "Lower detector exposure with unchanged geometric sharpness",
                  "Less magnification and improved recorded spatial detail"
            ],
            "answer": 0,
            "explanation": "Increasing OID increases magnification and geometric unsharpness."
      },
      {
            "question": "An AEC chest exposure terminates too early because the selected chamber is partly outside the lung field. What is the best correction?",
            "options": [
                  "Increase mA because AEC responds directly to tube current",
                  "Reposition and select a chamber fully covered by the intended anatomy",
                  "Open collimation so every chamber receives scatter radiation",
                  "Increase backup time so the exposure cannot terminate early"
            ],
            "answer": 1,
            "explanation": "AEC depends on correct chamber selection and positioning; changing backup or mA does not fix an uncovered chamber."
      },
      {
            "question": "A grid is added for a thicker body part without changing other factors. What is the most likely immediate effect?",
            "options": [
                  "Beam energy increases because the grid hardens the beam",
                  "More scatter reaches the detector and receptor exposure rises",
                  "Less scatter reaches the detector but receptor exposure may fall",
                  "Magnification decreases because the grid reduces OID"
            ],
            "answer": 2,
            "explanation": "A grid removes scatter and some primary radiation, often requiring an exposure increase to maintain receptor exposure."
      },
      {
            "question": "Two digital images appear similarly bright after processing, but one has a much higher exposure indicator than target. What should the technologist conclude?",
            "options": [
                  "Exposure indicators are unrelated to technique selection",
                  "The images received identical detector exposure",
                  "Post-processing eliminates any patient-dose difference",
                  "Display brightness can mask excessive detector exposure"
            ],
            "answer": 3,
            "explanation": "Digital processing can normalize brightness, so exposure indicators help reveal dose creep or excessive receptor exposure."
      },
      {
            "question": "A digital image shows excessive quantum noise and the exposure indicator is below target. Which change most directly addresses the problem if kVp is otherwise appropriate?",
            "options": [
                  "Increase mAs",
                  "Increase OID",
                  "Decrease SID without recalculation",
                  "Use a smaller detector"
            ],
            "answer": 0,
            "explanation": "Insufficient detector exposure is most directly corrected by increasing photon quantity."
      },
      {
            "question": "SID is increased from 100 cm to 180 cm with no technique change. What happens to receptor exposure?",
            "options": [
                  "It increases because magnification is reduced",
                  "It decreases because beam intensity falls with distance",
                  "It remains unchanged because kVp is constant",
                  "It doubles because the field is larger"
            ],
            "answer": 1,
            "explanation": "Beam intensity decreases as distance increases."
      },
      {
            "question": "A grid is used with noticeable off-level angulation across the grid lines. What artifact is most likely?",
            "options": [
                  "Quantum mottle",
                  "Motion blur",
                  "Grid cutoff",
                  "Geometric magnification"
            ],
            "answer": 2,
            "explanation": "Grid misalignment can remove primary radiation and produce cutoff."
      },
      {
            "question": "An AEC chamber lies under a prosthetic hip during an AP pelvis. What exposure error is most likely?",
            "options": [
                  "The image will be underexposed only over tissue away from the prosthesis",
                  "The exposure will terminate early because metal increases detector signal",
                  "The AEC system will ignore the chamber covered by the prosthetic material",
                  "The exposure may continue too long because dense material delays chamber response"
            ],
            "answer": 3,
            "explanation": "Dense material over an AEC chamber can delay termination."
      },
      {
            "question": "A digital image is too noisy, but the exposure indicator is within the manufacturer’s target range. What should be checked next?",
            "options": [
                  "Review positioning, collimation, processing, and the exam-specific target range",
                  "Increase mAs because visible noise always means detector underexposure",
                  "Decrease kVp because lower beam energy consistently improves image noise",
                  "Accept the image because a target-range exposure indicator rules out problems"
            ],
            "answer": 0,
            "explanation": "Exposure indicators must be interpreted with the image and exam type."
      },
      {
            "question": "A patient is positioned farther from the detector but SID is also increased enough to maintain magnification. What tradeoff must still be considered?",
            "options": [
                  "Photon energy automatically increases",
                  "Receptor exposure changes unless technique is adjusted",
                  "Scatter is completely eliminated",
                  "Focal spot size becomes irrelevant"
            ],
            "answer": 1,
            "explanation": "Distance changes alter beam intensity."
      },
      {
            "question": "A technologist doubles mAs while keeping all other factors unchanged. What is the expected primary effect?",
            "options": [
                  "Halved magnification because receptor exposure has increased",
                  "Doubled maximum photon energy with unchanged beam quantity",
                  "Approximately doubled photon quantity with unchanged selected kVp",
                  "Elimination of scatter because twice as many photons reach the detector"
            ],
            "answer": 2,
            "explanation": "mAs is directly related to photon quantity."
      },
      {
            "question": "A radiograph shows anatomy cut off at the edge although detector exposure is appropriate. Which adjustment is most relevant?",
            "options": [
                  "Use post-processing to reconstruct anatomy outside the exposed field",
                  "Increase mAs so the missing anatomy becomes visible on the detector",
                  "Increase kVp so the useful x-ray field widens beyond collimation",
                  "Correct positioning and field placement rather than exposure factors"
            ],
            "answer": 3,
            "explanation": "Clipped anatomy is a positioning/collimation problem."
      },
      {
            "question": "Why can dose creep occur with digital radiography?",
            "options": [
                  "Processing can preserve acceptable brightness despite excessive exposure",
                  "Digital detectors stop responding when receptor exposure exceeds target",
                  "AEC prevents dose creep by terminating every exposure at the ideal level",
                  "Excess exposure always produces a visibly darker digital image"
            ],
            "answer": 0,
            "explanation": "Digital processing can mask excessive detector exposure."
      },
      {
            "question": "A smaller focal spot is selected for fine bony detail. Which image characteristic is most likely improved?",
            "options": [
                  "Beam penetration",
                  "Spatial resolution",
                  "Scatter rejection",
                  "Patient positioning"
            ],
            "answer": 1,
            "explanation": "Smaller focal spots reduce geometric unsharpness."
      },
      {
            "question": "A patient cannot be brought close to the detector, increasing OID. Which change can help reduce magnification if practical?",
            "options": [
                  "Decrease kVp",
                  "Increase field size",
                  "Increase SID",
                  "Increase grid ratio"
            ],
            "answer": 2,
            "explanation": "Increasing SID can reduce magnification caused by increased OID."
      },
      {
            "question": "An exposure indicator is consistently high across one exam type even though images look acceptable. What is the best department response?",
            "options": [
                  "Disable exposure-indicator display for this exam type",
                  "Ignore the trend because processed brightness remains acceptable",
                  "Lower SID for all patients to increase receptor exposure consistency",
                  "Review technique charts and target exposure ranges for this exam"
            ],
            "answer": 3,
            "explanation": "Consistently high indicators suggest a technique-management issue."
      },
      {
            "question": "A grid is removed for a thin extremity exam. What benefit may result if scatter is already low?",
            "options": [
                  "Lower exposure requirement with little contrast penalty when scatter is minimal",
                  "Higher photon energy because grid removal increases beam penetrability",
                  "Improved magnification because removing the grid decreases OID",
                  "Automatic elimination of motion because exposure time becomes irrelevant"
            ],
            "answer": 0,
            "explanation": "When scatter is low, grid removal can reduce exposure requirements."
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
                  "Do not repeat solely to improve cosmetic centering",
                  "Increase technique and repeat to ensure greater penetration",
                  "Repeat with a larger field to improve visual symmetry",
                  "Repeat because every image must be perfectly centered"
            ],
            "answer": 0,
            "explanation": "A repeat that adds exposure without improving diagnostic adequacy is inconsistent with ALARA."
      },
      {
            "question": "During mobile imaging, a staff member can step farther from the patient without compromising care. Which protection principle is being used most directly?",
            "options": [
                  "Collimation of the beam to the anatomy of interest",
                  "Distance from the radiation source and scatter field",
                  "Reduction of fluoroscopic pulse rate during a procedure",
                  "Filtration of low-energy photons from the primary beam"
            ],
            "answer": 1,
            "explanation": "Increasing distance reduces exposure according to geometric principles and is a key occupational protection strategy."
      },
      {
            "question": "A patient reports possible pregnancy before a medically indicated pelvic exam. What is the best technologist response?",
            "options": [
                  "Substitute a different projection without authorization",
                  "Cancel the examination without consulting the care team",
                  "Follow pregnancy-screening policy and communicate before exposure",
                  "Proceed without documentation because the exam is ordered"
            ],
            "answer": 2,
            "explanation": "Pregnancy concerns require policy-based screening and communication; the technologist should not independently cancel or redesign the exam outside role."
      },
      {
            "question": "Which change usually reduces both patient tissue irradiated and scatter production?",
            "options": [
                  "Use a larger detector with the same field size",
                  "Increase field size while reducing mAs",
                  "Increase SID while opening collimation",
                  "Collimate more closely to the required anatomy"
            ],
            "answer": 3,
            "explanation": "Tighter collimation reduces irradiated volume and scatter production."
      },
      {
            "question": "A department notices repeated lateral knee rejects for rotation. What is the most effective safety response?",
            "options": [
                  "Analyze the pattern and correct the positioning process",
                  "Remove reject analysis so staff do not feel penalized",
                  "Increase field size to reduce the chance of rotation",
                  "Tell technologists to increase mAs on all lateral knees"
            ],
            "answer": 0,
            "explanation": "Repeat analysis should identify systematic causes and guide process improvement, reducing future unnecessary exposures."
      },
      {
            "question": "Which patient is generally more radiosensitive to a given dose?",
            "options": [
                  "A middle-aged adult",
                  "A young child",
                  "An older adult",
                  "All ages are equally radiosensitive"
            ],
            "answer": 1,
            "explanation": "Younger tissues generally have greater radiosensitivity."
      },
      {
            "question": "A technologist can reduce field size without clipping required anatomy. What is the best reason to do so?",
            "options": [
                  "Increase tube loading so fewer scattered photons reach the detector",
                  "Increase magnification so the region of interest fills the detector",
                  "Reduce irradiated tissue volume and the amount of scatter produced",
                  "Lengthen exposure time so the field can be narrowed more accurately"
            ],
            "answer": 2,
            "explanation": "Collimation reduces tissue volume exposed and scatter."
      },
      {
            "question": "A repeat image is requested only because the marker is cosmetically placed farther from the anatomy than preferred, but all required information is present. What is the best action?",
            "options": [
                  "Remove the marker digitally and repeat anyway",
                  "Repeat because marker position always determines diagnostic quality",
                  "Increase technique on repeat to guarantee visibility",
                  "Do not repeat solely for cosmetic marker placement"
            ],
            "answer": 3,
            "explanation": "Repeats should be based on diagnostic need."
      },
      {
            "question": "A technologist wears a personal dosimeter at the collar outside a protective apron. What is the primary purpose?",
            "options": [
                  "Monitor occupational exposure according to policy",
                  "Measure the patient’s entrance skin dose",
                  "Calculate detector exposure indicator",
                  "Determine tube heat units"
            ],
            "answer": 0,
            "explanation": "Personnel monitoring tracks occupational exposure."
      },
      {
            "question": "During mobile imaging, a caregiver must remain with a patient. What principle should guide protection?",
            "options": [
                  "Remain near the tube because scatter is lowest beside the x-ray source",
                  "Use distance and shielding when possible while minimizing time near exposure",
                  "Hold the detector during exposure so the patient does not need assistance",
                  "Stand in the primary beam if protective gloves and an apron are available"
            ],
            "answer": 1,
            "explanation": "Time, distance, and shielding should be optimized."
      },
      {
            "question": "A possible pregnancy is reported before a nonurgent exam involving the pelvis. Which action best reflects safe practice?",
            "options": [
                  "Proceed because pregnancy does not affect imaging decisions",
                  "Cancel the exam independently without consultation",
                  "Follow facility screening and communication policy before exposure",
                  "Substitute another exam without authorization"
            ],
            "answer": 2,
            "explanation": "Pregnancy concerns should trigger policy-based screening and communication."
      },
      {
            "question": "Which change most directly reduces occupational exposure during fluoroscopy?",
            "options": [
                  "Increase pulse rate",
                  "Increase magnification mode",
                  "Stand closer to the image receptor only",
                  "Increase distance from the patient when possible"
            ],
            "answer": 3,
            "explanation": "Distance from the scatter source reduces exposure."
      },
      {
            "question": "A department’s repeat analysis shows a cluster of motion repeats during erect chest exams in frail patients. What is the best response?",
            "options": [
                  "Investigate positioning support, exposure timing, and patient communication workflow",
                  "Increase exposure for all erect chest exams to reduce repeat frequency",
                  "Remove motion-related rejects from the department's repeat analysis",
                  "Use larger field sizes so motion is less likely to require another exposure"
            ],
            "answer": 0,
            "explanation": "Repeat analysis should identify correctable workflow causes."
      },
      {
            "question": "Which action reduces scatter dose to the patient and staff at the same time?",
            "options": [
                  "Higher grid ratio alone",
                  "Tight collimation",
                  "Longer fluoroscopy time",
                  "Larger field size"
            ],
            "answer": 1,
            "explanation": "Collimation reduces irradiated volume and scatter."
      },
      {
            "question": "A technologist notices the dosimeter has been left in a locker during several shifts. What should happen?",
            "options": [
                  "Borrow another worker’s dosimeter",
                  "Estimate the dose from memory and continue",
                  "Report the issue according to radiation-safety policy",
                  "Ignore it if no high-dose procedures occurred"
            ],
            "answer": 2,
            "explanation": "Personnel monitoring issues should be addressed according to policy."
      },
      {
            "question": "Why is preventing unnecessary repeats an important radiation-protection strategy?",
            "options": [
                  "Repeats eliminate scatter that was present on the first image",
                  "Repeated exposures may increase dose without added clinical value",
                  "Repeats reduce photon energy reaching radiosensitive tissues",
                  "Repeat imaging prevents detector artifacts from recurring"
            ],
            "answer": 1,
            "explanation": "Avoiding unnecessary repeat exposures directly reduces dose."
      },
      {
            "question": "A patient asks whether an x-ray exam has zero risk. Which response is most accurate?",
            "options": [
                  "A justified exam balances expected clinical benefit against radiation risk",
                  "Diagnostic x-rays produce no biological effect at routine exposure levels",
                  "Any ionizing-radiation exposure is too risky to justify clinically",
                  "Radiation risk depends mainly on detector dimensions and field shape"
            ],
            "answer": 0,
            "explanation": "Radiation use is based on justification and optimization."
      },
      {
            "question": "Which change is most consistent with ALARA when diagnostic quality is already adequate?",
            "options": [
                  "Increase mAs until all visible quantum noise is eliminated",
                  "Avoid increasing exposure merely to make an already diagnostic image look cleaner",
                  "Open collimation to reduce the risk of clipping peripheral anatomy",
                  "Repeat images that have minor cosmetic flaws despite diagnostic adequacy"
            ],
            "answer": 1,
            "explanation": "ALARA means avoiding unnecessary exposure once diagnostic adequacy is achieved."
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
                  "Inadequate inspiration rather than patient rotation",
                  "Insufficient mAs rather than inadequate inspiration",
                  "Excessive rotation rather than inadequate inspiration"
            ],
            "answer": 1,
            "explanation": "Symmetric clavicular relationships argue against rotation; low rib count suggests suboptimal inspiration."
      },
      {
            "question": "A trauma patient with suspected hip fracture cannot internally rotate the affected leg. Which approach is most appropriate?",
            "options": [
                  "Delay all imaging until the patient can tolerate rotation",
                  "Internally rotate the leg to obtain the routine AP appearance",
                  "Maintain the limb position and use a trauma-appropriate lateral method",
                  "Externally rotate both legs equally to improve symmetry"
            ],
            "answer": 2,
            "explanation": "Suspected fracture is a contraindication to routine internal rotation; equipment and projection should adapt to the patient."
      },
      {
            "question": "A forearm image includes the wrist but clips the elbow joint. What is the primary problem?",
            "options": [
                  "The patient is rotated because the elbow is not included",
                  "The exposure indicator is invalid because a joint is missing",
                  "The beam energy is too low for cortical bone visualization",
                  "Required anatomy is incomplete for a long-bone examination"
            ],
            "answer": 3,
            "explanation": "Long-bone studies generally require inclusion of both adjacent joints."
      },
      {
            "question": "An AP supine abdomen is requested to evaluate bowel gas pattern. The image clips the pubic symphysis. What should drive the repeat decision?",
            "options": [
                  "Whether required abdominal anatomy for the exam is fully included",
                  "Whether the patient can hold a deeper inspiration next time",
                  "Whether a grid was used for the first exposure",
                  "Whether the exposure indicator falls within the target range"
            ],
            "answer": 0,
            "explanation": "Coverage of required anatomy is a core image criterion; exposure adequacy cannot compensate for missing anatomy."
      },
      {
            "question": "A patient with a painful shoulder cannot abduct the arm for a routine projection. What is the best principle?",
            "options": [
                  "Increase kVp so positioning becomes less important",
                  "Adapt the projection to the patient while preserving the diagnostic goal",
                  "Use a larger field so the arm position does not matter",
                  "Force the routine position because standardization is always required"
            ],
            "answer": 1,
            "explanation": "Patient condition may require modified projections; the diagnostic objective should be preserved without causing harm."
      },
      {
            "question": "A PA chest image shows the scapulae projected over the lateral lungs. Which positioning change is most appropriate?",
            "options": [
                  "Increase SID to move the scapulae away from the lung fields",
                  "Increase kVp to reduce superimposition of the scapulae",
                  "Roll the shoulders forward to move the scapulae laterally",
                  "Angle the central ray cephalically to clear the scapulae"
            ],
            "answer": 2,
            "explanation": "Rolling the shoulders forward helps move the scapulae off the lung fields."
      },
      {
            "question": "An upright chest shows the clavicles projected high above the apices. What is the most likely positioning issue?",
            "options": [
                  "The mAs is too low",
                  "The patient is rotated",
                  "The SID is too short",
                  "The patient is leaning backward"
            ],
            "answer": 3,
            "explanation": "Leaning backward can create a lordotic appearance."
      },
      {
            "question": "A supine abdomen image includes the diaphragm but excludes the symphysis. If the clinical question is distal bowel obstruction, what is the best action?",
            "options": [
                  "Repeat with more inferior centering to include the required distal anatomy",
                  "Accept the image because inclusion of the diaphragm confirms adequate coverage",
                  "Increase kVp on the next image without changing the centering point",
                  "Crop the displayed image to emphasize the bowel that was included"
            ],
            "answer": 0,
            "explanation": "Repeat decisions should be driven by required anatomy."
      },
      {
            "question": "A lateral elbow shows the humeral epicondyles not superimposed. What is the primary correction?",
            "options": [
                  "Increase mAs",
                  "Adjust elbow rotation",
                  "Increase SID",
                  "Use a grid"
            ],
            "answer": 1,
            "explanation": "Failure to superimpose expected structures indicates rotation."
      },
      {
            "question": "A wrist image excludes the distal radius while including all carpals. What is the main problem?",
            "options": [
                  "Excessive magnification",
                  "Insufficient beam penetration",
                  "Insufficient proximal coverage",
                  "Grid cutoff"
            ],
            "answer": 2,
            "explanation": "Required anatomy must be included."
      },
      {
            "question": "A trauma patient cannot turn for an oblique foot. What is the best principle?",
            "options": [
                  "Skip the projection and omit documentation of the limitation",
                  "Force the patient into the routine position despite trauma restrictions",
                  "Increase exposure factors while keeping the routine positioning setup",
                  "Modify tube and detector relationships while minimizing patient movement"
            ],
            "answer": 3,
            "explanation": "Trauma positioning should preserve safety while adapting geometry."
      },
      {
            "question": "A chest image shows rotation with one sternoclavicular joint farther from the spine than the other. What should be corrected?",
            "options": [
                  "Patient rotation",
                  "Exposure time",
                  "Focal spot size",
                  "Grid ratio"
            ],
            "answer": 0,
            "explanation": "Sternoclavicular asymmetry indicates rotation."
      },
      {
            "question": "A lateral knee demonstrates excessive separation of the femoral condyles. What is the most likely cause?",
            "options": [
                  "Insufficient mAs",
                  "Incorrect rotation or knee flexion",
                  "Excessive collimation",
                  "High kVp"
            ],
            "answer": 1,
            "explanation": "Condyle separation is primarily a positioning issue."
      },
      {
            "question": "A shoulder exam requires anatomy that cannot be demonstrated because the patient cannot abduct. What should the technologist do?",
            "options": [
                  "Increase mAs and keep the arm at the side",
                  "Force abduction until the textbook position is reached",
                  "Use an alternative projection that meets the clinical objective",
                  "Cancel the exam without communication"
            ],
            "answer": 2,
            "explanation": "Alternative projections may be needed when routine positioning is impossible."
      },
      {
            "question": "An AP ankle image shows the distal tibiofibular joint excessively overlapped. Which factor should be reviewed first?",
            "options": [
                  "Grid alignment",
                  "kVp",
                  "SID",
                  "Leg and ankle rotation"
            ],
            "answer": 3,
            "explanation": "Distal tibiofibular overlap is influenced by rotation."
      },
      {
            "question": "A chest image is motion-blurred even though positioning is correct. What should be considered for the repeat?",
            "options": [
                  "Use a shorter exposure time while maintaining the required mAs",
                  "Use a longer exposure time with lower mA to preserve receptor exposure",
                  "Increase OID so motion is less visible on the final image",
                  "Open collimation so the blurred anatomy is easier to recognize"
            ],
            "answer": 0,
            "explanation": "Reducing exposure time helps control motion blur."
      },
      {
            "question": "An AP knee image clips the distal femur but includes the proximal tibia. What should guide the repeat?",
            "options": [
                  "Exposure indicator alone",
                  "Required anatomy for the ordered projection",
                  "Whether the patient has pain",
                  "Detector orientation only"
            ],
            "answer": 1,
            "explanation": "Coverage requirements determine whether a repeat is needed."
      },
      {
            "question": "A lateral chest patient cannot raise both arms fully. What is the main image-quality concern?",
            "options": [
                  "The diaphragm will disappear",
                  "Photon energy will fall",
                  "Upper arms may superimpose the upper lungs",
                  "Scatter will be eliminated"
            ],
            "answer": 2,
            "explanation": "Incomplete arm elevation can superimpose soft tissue over the thorax."
      },
      {
            "question": "A portable chest image is taken semierect because the patient cannot sit fully upright. What should be documented or considered?",
            "options": [
                  "Document that routine rotation criteria were intentionally disregarded",
                  "Classify the image as automatically unacceptable because it is semierect",
                  "Treat exposure factors as irrelevant because the patient is not fully upright",
                  "Document the modified position and consider its effect on image appearance"
            ],
            "answer": 3,
            "explanation": "Modified positioning can affect appearance and interpretation."
      },
      {
            "question": "A forearm exam includes both joints but the elbow is not in the same plane as the wrist. What image issue is most likely?",
            "options": [
                  "Rotation and distortion of the forearm",
                  "Increased beam energy",
                  "Reduced scatter",
                  "Automatic magnification correction"
            ],
            "answer": 0,
            "explanation": "Misalignment can introduce rotation and distortion."
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
                  "Rotate the head until the mandibular rami are superimposed",
                  "Move the tube and detector rather than manipulating the cervical spine",
                  "Flex the neck to separate the lower cervical vertebrae"
            ],
            "answer": 2,
            "explanation": "In trauma, equipment should adapt to the patient while spinal precautions are maintained."
      },
      {
            "question": "An AP pelvis is requested after high-energy trauma. The affected leg is shortened and externally rotated. What should the technologist do?",
            "options": [
                  "Delay imaging until the leg position becomes symmetric",
                  "Internally rotate both legs to place the femoral necks parallel",
                  "Apply traction before positioning to restore normal alignment",
                  "Avoid routine internal rotation and image according to trauma protocol"
            ],
            "answer": 3,
            "explanation": "Shortening and external rotation can indicate fracture; routine internal rotation may worsen injury."
      },
      {
            "question": "A skull projection shows asymmetric orbital margins when symmetry is expected. Which error should be considered first?",
            "options": [
                  "Head rotation relative to the detector",
                  "Insufficient filtration of the primary beam",
                  "Grid ratio too low for the selected kVp",
                  "Excessive mAs relative to patient thickness"
            ],
            "answer": 0,
            "explanation": "Asymmetry of paired structures commonly indicates rotation."
      },
      {
            "question": "During a mobile exam in isolation, the detector has been placed behind the patient and is now contaminated. What is the best next step?",
            "options": [
                  "Cover the detector with a clean sheet and continue using it",
                  "Handle and disinfect the detector according to isolation and equipment policy",
                  "Wipe only the visible surface if no fluid is present",
                  "Return the detector directly to the department for later cleaning"
            ],
            "answer": 1,
            "explanation": "Portable equipment can transmit organisms; cleaning must follow infection-control and manufacturer/facility procedures."
      },
      {
            "question": "During fluoroscopy, which change most directly reduces exposure when clinically feasible?",
            "options": [
                  "Open collimation to prevent anatomy from leaving the field",
                  "Increase magnification mode for every image sequence",
                  "Minimize beam-on time and use dose-saving operating modes",
                  "Move personnel closer to improve communication"
            ],
            "answer": 2,
            "explanation": "Reducing fluoroscopy time and using dose-saving modes lowers exposure while maintaining the clinical task."
      },
      {
            "question": "A trauma cervical spine patient cannot be moved from the stretcher. Which approach best supports safe imaging?",
            "options": [
                  "Delay imaging until pain medication allows movement",
                  "Remove immobilization for a routine upright view",
                  "Ask the patient to rotate the head for better alignment",
                  "Adapt tube and detector position while maintaining immobilization"
            ],
            "answer": 3,
            "explanation": "Trauma imaging should minimize movement and preserve immobilization."
      },
      {
            "question": "An AP pelvis image shows one obturator foramen larger than the other. What is the most likely cause?",
            "options": [
                  "Pelvic rotation",
                  "High kVp",
                  "Grid cutoff",
                  "Short exposure time"
            ],
            "answer": 0,
            "explanation": "Asymmetric pelvic structures commonly indicate rotation."
      },
      {
            "question": "A lateral lumbar image shows the posterior vertebral bodies not superimposed. What should be corrected first?",
            "options": [
                  "mAs",
                  "Patient rotation",
                  "SID",
                  "Collimation width"
            ],
            "answer": 1,
            "explanation": "Posterior vertebral body superimposition is a positioning criterion."
      },
      {
            "question": "A skull image expected to be symmetric shows unequal distance from the lateral orbital margins to the skull edge. What is most likely?",
            "options": [
                  "Excessive SID",
                  "Insufficient mAs",
                  "Head rotation",
                  "Grid miscentering"
            ],
            "answer": 2,
            "explanation": "Asymmetry in paired skull structures suggests rotation."
      },
      {
            "question": "During C-arm imaging, the operator can use pulsed fluoroscopy at a lower pulse rate without compromising the procedure. What is the expected benefit?",
            "options": [
                  "Increased tube heat only",
                  "Higher scatter production",
                  "Greater magnification",
                  "Reduced radiation exposure"
            ],
            "answer": 3,
            "explanation": "Lower pulse rates can reduce fluoroscopic exposure."
      },
      {
            "question": "A mobile image is required in an ICU room with several staff present. What should happen before exposure?",
            "options": [
                  "Communicate clearly so unnecessary personnel can increase distance",
                  "Expose immediately before anyone moves",
                  "Open the field to ensure all anatomy is included",
                  "Place staff beside the patient to stabilize the detector"
            ],
            "answer": 0,
            "explanation": "Clear communication allows unnecessary personnel to use distance."
      },
      {
            "question": "A patient with severe pelvic trauma has one leg externally rotated and shortened. Why should routine internal rotation be avoided?",
            "options": [
                  "It lowers detector exposure",
                  "It may worsen injury or pain",
                  "It increases scatter",
                  "It changes tube heat"
            ],
            "answer": 1,
            "explanation": "Trauma positioning should not force movements that may worsen injury."
      },
      {
            "question": "A lateral cervical spine image does not include C7-T1 because the shoulders remain elevated. Which next step is most appropriate?",
            "options": [
                  "Increase kVp and accept that the cervicothoracic junction is not shown",
                  "Force the shoulders down despite pain to obtain the routine projection",
                  "Use an approved alternative technique to demonstrate the C7-T1 region",
                  "Crop the lower cervical region so the missing anatomy is less apparent"
            ],
            "answer": 2,
            "explanation": "Required anatomy may require an alternative projection."
      },
      {
            "question": "A mobile detector used in isolation leaves the room inside a protective cover. What should be done next?",
            "options": [
                  "Store the covered detector until the end of the shift before cleaning it",
                  "Carry the covered detector directly to the next patient for efficiency",
                  "Wipe only the visible handle if no contamination is seen on the cover",
                  "Remove the contaminated barrier and disinfect the detector per policy"
            ],
            "answer": 3,
            "explanation": "Barrier removal and disinfection prevent cross-contamination."
      },
      {
            "question": "During fluoroscopy, the image receptor is moved farther from the patient. What general effect may occur?",
            "options": [
                  "Patient dose may increase because the system may raise output to maintain the image",
                  "Patient dose always decreases because the receptor is farther from the patient",
                  "Scatter production falls to zero when receptor distance is increased",
                  "Tube current becomes irrelevant once the receptor is moved away from the patient"
            ],
            "answer": 0,
            "explanation": "Increasing receptor distance can prompt greater system output."
      },
      {
            "question": "A lateral skull image shows duplicated mandibular rami. What does this suggest?",
            "options": [
                  "Insufficient exposure",
                  "Head rotation",
                  "Excessive collimation",
                  "Low grid ratio"
            ],
            "answer": 1,
            "explanation": "Duplicated paired structures on a lateral image commonly indicate rotation."
      },
      {
            "question": "A patient cannot flex the neck for a requested skull projection because of trauma precautions. What should guide the response?",
            "options": [
                  "Force brief neck flexion because routine positioning takes priority",
                  "Ignore the trauma precaution once the detector has been positioned",
                  "Use a safe alternative that preserves the diagnostic objective and protocol",
                  "Increase mAs to compensate for the inability to flex the patient's neck"
            ],
            "answer": 2,
            "explanation": "Patient safety and diagnostic objective guide alternative positioning."
      },
      {
            "question": "A surgical C-arm image shows anatomy larger than expected. Which geometry change can reduce magnification when possible?",
            "options": [
                  "Reduce SID by moving the x-ray tube closer to the patient",
                  "Move the x-ray tube closer while leaving the receptor in place",
                  "Increase OID so the anatomy projects larger on the receptor",
                  "Move the image receptor closer to the patient when possible"
            ],
            "answer": 3,
            "explanation": "Reducing object-to-receptor distance helps reduce magnification."
      },
      {
            "question": "A lumbar image is centered correctly but clips the upper anatomy because the detector is too low. What should be changed?",
            "options": [
                  "Detector and field placement",
                  "kVp only",
                  "mAs only",
                  "Grid ratio only"
            ],
            "answer": 0,
            "explanation": "Clipped anatomy is corrected by placement/centering."
      },
      {
            "question": "A fluoroscopic procedure is taking longer than expected. Which strategy best supports dose management?",
            "options": [
                  "Increase magnification mode so anatomy is easier to follow throughout",
                  "Use the lowest practical pulse rate and minimize beam-on time",
                  "Open collimation to the full detector to avoid repositioning delays",
                  "Keep the beam on while planning the next procedural step"
            ],
            "answer": 1,
            "explanation": "Reducing beam-on time and pulse rate supports dose management."
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
                  "Motion is present despite acceptable inspiration",
                  "Exposure error is present despite acceptable positioning",
                  "Detector artifact is present despite acceptable collimation",
                  "Positioning error is present despite acceptable exposure"
            ],
            "answer": 3,
            "explanation": "Asymmetric thoracic landmarks and scapular superimposition indicate positioning problems."
      },
      {
            "question": "A digital abdomen appears appropriately bright, but the exposure indicator is far above target and noise is minimal. What is the best corrective action for future similar patients?",
            "options": [
                  "Reduce technique appropriately rather than relying on processed brightness",
                  "Ignore the indicator because displayed brightness is acceptable",
                  "Increase field size so the detector receives more scatter",
                  "Increase technique further to ensure the image remains noise free"
            ],
            "answer": 0,
            "explanation": "Processed brightness can conceal excessive detector exposure; technique should be optimized using exposure feedback."
      },
      {
            "question": "A repeated image still shows the same linear artifact in the identical detector location despite repositioning the patient. What source is most likely?",
            "options": [
                  "Patient motion during exposure",
                  "Detector or image-receptor related artifact",
                  "Anatomic structure from patient rotation",
                  "Patient clothing artifact"
            ],
            "answer": 1,
            "explanation": "A fixed artifact that remains in the same detector location despite patient repositioning suggests a detector/system source."
      },
      {
            "question": "An image is clipped laterally, but the exposure indicator is within target and positioning is otherwise correct. What should be changed on repeat?",
            "options": [
                  "Shorten exposure time to reduce geometric clipping",
                  "Increase mAs to compensate for the missing anatomy",
                  "Center and collimate to include the required anatomy",
                  "Increase kVp to widen the useful x-ray beam"
            ],
            "answer": 2,
            "explanation": "Missing anatomy is a centering/field-coverage problem, not an exposure-factor problem."
      },
      {
            "question": "A trauma image is technically imperfect but demonstrates all required anatomy and answers the immediate clinical question. The patient deteriorates after the exposure. What is the best next action?",
            "options": [
                  "Move the patient to a routine position before addressing the clinical change",
                  "Repeat immediately so the image meets routine positioning criteria",
                  "Obtain another exposure before communicating the patient's deterioration",
                  "Prioritize the patient and report the clinical change rather than repeat for perfection"
            ],
            "answer": 3,
            "explanation": "Patient condition takes priority; repeats should be clinically justified, especially when the existing image is diagnostic."
      },
      {
            "question": "A chest image shows adequate exposure but the medial clavicles are not equidistant from the spine. What is the most likely error?",
            "options": [
                  "Patient rotation",
                  "Underexposure",
                  "Grid cutoff",
                  "Motion"
            ],
            "answer": 0,
            "explanation": "Asymmetric sternoclavicular relationships indicate rotation."
      },
      {
            "question": "A digital image shows acceptable brightness but coarse quantum noise and a low exposure indicator. What is the best interpretation?",
            "options": [
                  "The image was overexposed",
                  "Detector exposure was likely insufficient",
                  "The patient was rotated",
                  "The grid ratio was too high only"
            ],
            "answer": 1,
            "explanation": "Low detector exposure is consistent with quantum noise."
      },
      {
            "question": "A repeated artifact appears in the same detector location on multiple patients. What should be suspected first?",
            "options": [
                  "Incorrect patient rotation that reproduces the same receptor location",
                  "Patient motion occurring in exactly the same detector coordinates",
                  "A detector or processing-system artifact fixed to that image location",
                  "Low kVp that produces the same localized artifact on every patient"
            ],
            "answer": 2,
            "explanation": "A fixed artifact location across patients points to the imaging system."
      },
      {
            "question": "An image is diagnostically adequate but slightly undercollimated beyond the anatomy of interest. What is the best quality-improvement response?",
            "options": [
                  "Ignore collimation because the exposure indicator is acceptable",
                  "Repeat immediately so the field margins look more symmetric",
                  "Increase mAs on the repeat to improve the visible field margins",
                  "Improve collimation on future exams without repeating this diagnostic image"
            ],
            "answer": 3,
            "explanation": "Avoid unnecessary repeat exposure while improving future technique."
      },
      {
            "question": "A lateral knee image shows motion blur but correct rotation. What should be changed first on repeat?",
            "options": [
                  "Improve support and shorten exposure time if technique permits",
                  "Increase OID to separate anatomy from the detector",
                  "Open collimation to reduce the effect of patient motion",
                  "Change the side marker before making the repeat exposure"
            ],
            "answer": 0,
            "explanation": "Motion blur is addressed through support and exposure-time management."
      },
      {
            "question": "A chest image is underpenetrated and the exposure indicator is low. Which change most directly addresses both findings if positioning is correct?",
            "options": [
                  "Increase OID to improve penetration through thicker anatomy",
                  "Increase technique appropriately for the patient and exam",
                  "Use tighter collimation as the only exposure correction",
                  "Shorten SID without recalculating the exposure factors"
            ],
            "answer": 1,
            "explanation": "Low exposure and inadequate penetration call for technique reassessment."
      },
      {
            "question": "An extremity image shows one cortex sharply defined and the opposite cortex elongated. Which factor is most likely?",
            "options": [
                  "A detector exposure problem caused by inadequate photon quantity",
                  "An exposure-factor error that changed only receptor brightness",
                  "Part-detector or central-ray misalignment causing shape distortion",
                  "A filtration problem that changed beam quality but not geometry"
            ],
            "answer": 2,
            "explanation": "Unequal shape distortion suggests geometric misalignment."
      },
      {
            "question": "A chest image has a high exposure indicator but acceptable displayed brightness. What should be concluded?",
            "options": [
                  "The exposure indicator is unreliable after processing",
                  "The displayed brightness confirms exposure was appropriate",
                  "The receptor may have received more exposure than necessary",
                  "The image should be repeated with a larger field"
            ],
            "answer": 2,
            "explanation": "Digital processing can mask excessive exposure."
      },
      {
            "question": "A radiograph clips essential anatomy but has perfect exposure and no motion. What is the primary reason for repeat?",
            "options": [
                  "Missing required anatomy",
                  "Exposure indicator outside target",
                  "Incorrect processing",
                  "Excessive image sharpness"
            ],
            "answer": 0,
            "explanation": "Missing required anatomy is a diagnostic-adequacy issue."
      },
      {
            "question": "A line-like artifact changes position when the patient is repositioned but not when the detector is changed. What source is more likely?",
            "options": [
                  "A fixed detector defect that remains in the same receptor location",
                  "An object associated with the patient or positioning setup",
                  "A processing-calibration error fixed to the same detector coordinates",
                  "A tube-target defect that produces the same artifact on every exposure"
            ],
            "answer": 1,
            "explanation": "Artifacts that move with the patient/setup are less likely detector artifacts."
      },
      {
            "question": "An AP pelvis is correctly exposed but shows asymmetric iliac wings. What should be evaluated first?",
            "options": [
                  "Detector exposure indicator",
                  "mAs",
                  "Pelvic rotation",
                  "Grid ratio"
            ],
            "answer": 2,
            "explanation": "Asymmetric iliac wings are a positioning clue."
      },
      {
            "question": "A digital image appears too dark on the workstation but the exposure indicator is on target and raw anatomy is present. What should be checked before repeating?",
            "options": [
                  "Reposition the patient",
                  "Increase mAs immediately",
                  "Increase kVp immediately",
                  "Display and processing settings"
            ],
            "answer": 3,
            "explanation": "Displayed brightness may reflect processing rather than detector exposure."
      },
      {
            "question": "An image has adequate anatomy and exposure, but a removable external object overlies the region of interest. What is the best decision?",
            "options": [
                  "Repeat only if the object obscures necessary diagnostic information",
                  "Repeat automatically because any artifact is unacceptable",
                  "Increase kVp and accept the object",
                  "Crop the object electronically even if anatomy is lost"
            ],
            "answer": 0,
            "explanation": "Repeat decisions should be based on diagnostic impact."
      },
      {
            "question": "A repeat image corrects rotation but introduces motion blur. What does this illustrate?",
            "options": [
                  "Correcting one positioning error makes the repeat diagnostically acceptable",
                  "Image evaluation must consider all quality criteria, including new errors",
                  "Motion blur is unrelated to whether the repeat answers the clinical question",
                  "Exposure indicator values determine whether motion can be disregarded"
            ],
            "answer": 1,
            "explanation": "Overall diagnostic criteria matter, not one corrected issue."
      },
      {
            "question": "A trauma image is slightly oblique but clearly demonstrates the fracture and required anatomy while the patient is unstable. What is the best action?",
            "options": [
                  "Increase exposure and repeat before moving the patient",
                  "Repeat immediately to obtain textbook positioning",
                  "Prioritize the patient rather than repeat for cosmetic perfection",
                  "Ignore the patient's condition until imaging is complete"
            ],
            "answer": 2,
            "explanation": "Patient stability and diagnostic sufficiency outweigh cosmetic perfection."
      }
]
  }
};

export const radiographyCapstone = [
  {
    "category": "Patient Care & Professional Practice",
    "question": "A confused inpatient arrives with an order for a left hip radiograph, but the wristband name differs from the order by one letter. The patient cannot reliably confirm identity. What should occur first?",
    "options": [
      "Resolve the identity discrepancy using approved identifiers before imaging",
      "Proceed because the room assignment and transport request both match",
      "Use a chart photograph as the only identifier and begin positioning",
      "Image both hips so an unresolved laterality or identity error is less likely"
    ],
    "answer": 0,
    "explanation": "Identity must be positively established before exposure, especially when the patient cannot reliably self-identify."
  },
  {
    "category": "Patient Care & Professional Practice",
    "question": "A patient becomes increasingly lethargic while waiting for a routine extremity exam and is difficult to arouse. Which action has priority?",
    "options": [
      "Complete the first exposure so the order is partially satisfied",
      "Pause the examination and obtain appropriate clinical assistance",
      "Move the patient to the table before reassessing responsiveness",
      "Ask a family member whether this behavior is normal and continue"
    ],
    "answer": 1,
    "explanation": "A significant change in responsiveness requires clinical assessment before continuing imaging."
  },
  {
    "category": "Patient Care & Professional Practice",
    "question": "A portable detector was used in a contact-precaution room and the outer barrier tears during removal. What is the best next step?",
    "options": [
      "Wipe only the visible tear because the rest of the cover remained intact",
      "Place a second clean barrier over it and proceed to the next patient",
      "Treat the detector as potentially contaminated and disinfect it per policy",
      "Return the detector to storage until routine end-of-day cleaning"
    ],
    "answer": 2,
    "explanation": "A breached barrier requires contamination control before the detector is reused."
  },
  {
    "category": "Patient Care & Professional Practice",
    "question": "A competent adult agrees to positioning but then withdraws consent immediately before exposure. What should the technologist do?",
    "options": [
      "Have a family member authorize the exposure instead",
      "Proceed because consent was given earlier in the examination",
      "Ask the ordering provider to override the patient's refusal",
      "Stop and address the refusal rather than making the exposure"
    ],
    "answer": 3,
    "explanation": "Consent can be withdrawn; the patient's refusal should be respected and communicated."
  },
  {
    "category": "Patient Care & Professional Practice",
    "question": "A patient with oxygen, a chest tube, and a weight-bearing restriction needs transfer to the imaging table. Which plan best reduces risk?",
    "options": [
      "Coordinate transfer after reviewing restrictions, devices, and needed assistance",
      "Disconnect oxygen briefly so tubing cannot become entangled during transfer",
      "Move first and reposition drains and lines after the patient reaches the table",
      "Ask the patient to stand-pivot so fewer staff members are needed for transfer"
    ],
    "answer": 0,
    "explanation": "Safe transfer planning must account for mobility restrictions and attached devices before movement."
  },
  {
    "category": "Radiographic Anatomy & Positioning Foundations",
    "question": "A true lateral wrist is intended, but the radius and ulna are not superimposed as expected. Exposure and collimation are appropriate. What should be corrected?",
    "options": [
      "Tube current because mAs controls alignment",
      "Part rotation relative to the detector",
      "Field size because collimation changes rotation",
      "SID because distance determines superimposition"
    ],
    "answer": 1,
    "explanation": "Failure of expected superimposition is primarily a positioning issue."
  },
  {
    "category": "Radiographic Anatomy & Positioning Foundations",
    "question": "A pelvis image shows one iliac wing wider than the other and one obturator foramen narrower. Which conclusion is most defensible?",
    "options": [
      "The detector exposure is excessive",
      "The kVp is too low for the patient's habitus",
      "The pelvis is rotated relative to the detector",
      "The SID is too short for the projection"
    ],
    "answer": 2,
    "explanation": "Asymmetry of paired pelvic structures is a classic sign of rotation."
  },
  {
    "category": "Radiographic Anatomy & Positioning Foundations",
    "question": "A projection requires the central ray perpendicular to the part, but the part is angled while the detector remains flat. Which image effect is most likely?",
    "options": [
      "Reduced scatter because the part is oblique",
      "Uniform magnification without distortion",
      "Improved spatial resolution from the angle",
      "Shape distortion from geometric misalignment"
    ],
    "answer": 3,
    "explanation": "Misalignment among source, part, and detector produces distortion."
  },
  {
    "category": "Radiographic Anatomy & Positioning Foundations",
    "question": "A very broad patient is centered using a memorized distance from the iliac crest, and the anatomy is clipped. What is the best correction strategy?",
    "options": [
      "Recenter using palpable anatomy and required image coverage",
      "Increase kVp so the missing anatomy becomes visible",
      "Increase mAs so the detector records more peripheral anatomy",
      "Increase SID until the anatomy automatically fits the receptor"
    ],
    "answer": 0,
    "explanation": "Landmarks and required coverage should guide centering rather than fixed distances alone."
  },
  {
    "category": "Radiographic Anatomy & Positioning Foundations",
    "question": "A joint projection is centered properly but the joint space is closed. Which factor should be evaluated before changing exposure technique?",
    "options": [
      "Detector exposure indicator and image-processing response",
      "Part alignment and central-ray angle relative to the joint",
      "Focal-spot size and tube-loading limits for the exposure",
      "SID and receptor dimensions used for the projection"
    ],
    "answer": 1,
    "explanation": "Closed joint spaces usually reflect positioning or central-ray geometry."
  },
  {
    "category": "Radiation Physics & X-Ray Production",
    "question": "mA is increased while exposure time is reduced so that mAs stays constant. With kVp unchanged, what is the expected primary result?",
    "options": [
      "Lower beam penetration because time is shorter",
      "Higher maximum photon energy with unchanged heat",
      "Similar photon quantity with a shorter exposure duration",
      "Greater scatter solely because mA increased"
    ],
    "answer": 2,
    "explanation": "Reciprocal mA/time changes can maintain mAs and photon quantity while altering exposure duration."
  },
  {
    "category": "Radiation Physics & X-Ray Production",
    "question": "A photon interaction produces an inner-shell vacancy and no scattered photon leaves the atom. Which mechanism best explains the event?",
    "options": [
      "Bremsstrahlung production",
      "Compton scatter",
      "Coherent scatter",
      "Photoelectric absorption"
    ],
    "answer": 3,
    "explanation": "Photoelectric absorption involves complete photon absorption and inner-shell ionization."
  },
  {
    "category": "Radiation Physics & X-Ray Production",
    "question": "A scattered photon leaves the patient after transferring only part of its energy to an outer-shell electron. Which interaction is responsible?",
    "options": [
      "Compton scatter",
      "Photoelectric absorption",
      "Characteristic radiation",
      "Pair production"
    ],
    "answer": 0,
    "explanation": "Compton interaction transfers part of the photon energy and changes the photon direction."
  },
  {
    "category": "Radiation Physics & X-Ray Production",
    "question": "Two beams are produced at the same selected kVp and mAs, but one has additional filtration. Compared with the unfiltered beam, which change is most expected?",
    "options": [
      "A larger field size with the same photon-energy distribution",
      "A higher average photon energy with fewer low-energy photons",
      "A smaller focal spot with unchanged beam quality",
      "More low-energy photons reaching the patient's skin"
    ],
    "answer": 1,
    "explanation": "Filtration removes lower-energy photons that contribute little to image formation."
  },
  {
    "category": "Radiation Physics & X-Ray Production",
    "question": "A small focal spot is selected for a detail-sensitive study. What limitation should the technologist anticipate?",
    "options": [
      "Greater scatter production because the focal area is small",
      "Lower beam energy because focal spot controls kVp",
      "More restrictive tube loading because heat is concentrated",
      "Automatic reduction in patient dose regardless of technique"
    ],
    "answer": 2,
    "explanation": "Small focal spots improve detail but tolerate less tube loading."
  },
  {
    "category": "Exposure Factors & Image Acquisition",
    "question": "A digital radiograph is adequately penetrated, but the exposure indicator is well above target. Which change best reduces receptor exposure while preserving beam penetration?",
    "options": [
      "Decrease SID without recalculating technique",
      "Reduce kVp while keeping the same mAs",
      "Increase OID while leaving technique unchanged",
      "Reduce mAs while keeping the selected kVp"
    ],
    "answer": 3,
    "explanation": "Reducing mAs lowers photon quantity while preserving the selected beam energy."
  },
  {
    "category": "Exposure Factors & Image Acquisition",
    "question": "A technologist increases OID for a lateral exam because the patient cannot approach the detector. SID is not changed. Which image-quality tradeoff should be anticipated?",
    "options": [
      "Greater magnification with reduced geometric sharpness",
      "Less magnification with improved recorded detail",
      "Higher beam energy with less scatter production",
      "No geometric effect because exposure factors are unchanged"
    ],
    "answer": 0,
    "explanation": "Increasing OID increases magnification and geometric unsharpness."
  },
  {
    "category": "Exposure Factors & Image Acquisition",
    "question": "An AEC chest exposure is longer than expected because the active chamber lies beneath dense prosthetic material. What should be corrected first?",
    "options": [
      "Increase backup time so the system can complete the exposure",
      "Reposition or select an appropriate chamber for the intended anatomy",
      "Increase mA so the chamber reaches termination sooner",
      "Open collimation so scatter reaches the chamber more quickly"
    ],
    "answer": 1,
    "explanation": "AEC performance depends on correct chamber selection and anatomy placement."
  },
  {
    "category": "Exposure Factors & Image Acquisition",
    "question": "A grid is added for a thicker patient without changing technique. Which immediate effect is most likely?",
    "options": [
      "Beam energy increases because the grid hardens the beam",
      "More scatter reaches the detector and receptor exposure rises",
      "Less scatter reaches the detector and receptor exposure may decrease",
      "Magnification decreases because the grid reduces OID"
    ],
    "answer": 2,
    "explanation": "A grid removes scatter and some primary radiation, often requiring technique compensation."
  },
  {
    "category": "Exposure Factors & Image Acquisition",
    "question": "Two digital images have similar displayed brightness, but one exposure indicator is far above target. What is the best interpretation?",
    "options": [
      "Display brightness is a reliable substitute for exposure indicators",
      "Both images received essentially identical detector exposure",
      "The high exposure indicator proves the image is underexposed",
      "Processing may be masking excessive detector exposure"
    ],
    "answer": 3,
    "explanation": "Digital processing can normalize brightness despite excessive receptor exposure."
  },
  {
    "category": "Radiation Biology & Protection",
    "question": "A diagnostic image meets all required criteria, but the technologist considers repeating it to improve cosmetic centering. Which choice best supports ALARA?",
    "options": [
      "Do not repeat unless diagnostic information would improve",
      "Repeat because exact centering is required for every image",
      "Increase technique on the repeat to ensure a cleaner image",
      "Open the field on repeat so positioning is easier"
    ],
    "answer": 0,
    "explanation": "Repeats that add dose without diagnostic benefit are inconsistent with ALARA."
  },
  {
    "category": "Radiation Biology & Protection",
    "question": "During mobile imaging, a staff member can safely double the distance from the patient during exposure. Which protection principle is being used?",
    "options": [
      "Primary-beam filtration selected at the x-ray tube",
      "Distance from the patient and scatter source during exposure",
      "Detector collimation used to limit the exposed field",
      "Shorter SID used to increase beam intensity at the receptor"
    ],
    "answer": 1,
    "explanation": "Increasing distance from the scatter source reduces occupational exposure."
  },
  {
    "category": "Radiation Biology & Protection",
    "question": "A patient reports possible pregnancy before a medically indicated pelvic radiograph. Which response is most appropriate?",
    "options": [
      "Proceed because the provider's order overrides screening",
      "Cancel the examination independently without consultation",
      "Follow pregnancy-screening policy and communicate before exposure",
      "Substitute a different projection without authorization"
    ],
    "answer": 2,
    "explanation": "Pregnancy concerns require policy-based screening and communication."
  },
  {
    "category": "Radiation Biology & Protection",
    "question": "A department identifies repeated positioning rejects on the same projection. What is the most effective radiation-safety response?",
    "options": [
      "Remove those rejects from analysis because they are technique-related",
      "Increase mAs on all future images to reduce repeat frequency",
      "Use a larger field so positioning errors are less obvious",
      "Analyze the pattern and correct the underlying positioning process"
    ],
    "answer": 3,
    "explanation": "Repeat analysis should identify and correct systematic causes of unnecessary exposure."
  },
  {
    "category": "Radiation Biology & Protection",
    "question": "Which change can reduce both the volume of tissue irradiated and the amount of scatter produced?",
    "options": [
      "Tighter collimation to the anatomy of interest",
      "Increasing mAs while keeping field size constant",
      "Using a larger detector with the same beam field",
      "Increasing SID while opening the collimated field"
    ],
    "answer": 0,
    "explanation": "Collimation reduces irradiated tissue volume and scatter production."
  },
  {
    "category": "Chest, Abdomen & Extremity Procedures",
    "question": "An upright PA chest shows symmetric sternoclavicular joints but only seven posterior ribs above the diaphragm. What is the primary issue?",
    "options": [
      "Rotation rather than inadequate inspiration",
      "Inadequate inspiration rather than rotation",
      "Excessive SID rather than poor inspiration",
      "Insufficient mAs rather than poor inspiration"
    ],
    "answer": 1,
    "explanation": "Symmetry argues against rotation; low rib count suggests inadequate inspiration."
  },
  {
    "category": "Chest, Abdomen & Extremity Procedures",
    "question": "A trauma patient with suspected proximal femur fracture has the affected leg shortened and externally rotated. What should the technologist avoid?",
    "options": [
      "Maintaining trauma precautions during positioning",
      "Using a horizontal-beam approach when indicated",
      "Routine internal rotation of the injured leg",
      "Adapting detector placement to limit movement"
    ],
    "answer": 2,
    "explanation": "Routine internal rotation can worsen pain or injury when fracture is suspected."
  },
  {
    "category": "Chest, Abdomen & Extremity Procedures",
    "question": "A forearm study includes the elbow but clips the wrist. Exposure is adequate. What determines whether a repeat is required?",
    "options": [
      "Whether post-processing can increase field size",
      "Whether the exposure indicator is within the target range",
      "Whether the patient can tolerate a second exposure",
      "Whether the ordered projection requires inclusion of both joints"
    ],
    "answer": 3,
    "explanation": "Required anatomy and exam criteria determine repeat necessity."
  },
  {
    "category": "Chest, Abdomen & Extremity Procedures",
    "question": "A true lateral elbow is intended, but the epicondyles are not superimposed. What is the most appropriate correction?",
    "options": [
      "Adjust elbow rotation before repeating",
      "Increase kVp to separate the epicondyles",
      "Increase SID to improve superimposition",
      "Use a grid to reduce overlap"
    ],
    "answer": 0,
    "explanation": "Epicondylar misalignment indicates rotation."
  },
  {
    "category": "Chest, Abdomen & Extremity Procedures",
    "question": "A PA chest image shows the scapulae projected over the lungs despite adequate inspiration. Which positioning change is most relevant?",
    "options": [
      "Increase kVp so the scapulae are less visible",
      "Roll the shoulders forward to move the scapulae laterally",
      "Increase SID to move the scapulae away from the lungs",
      "Angle the central ray cephalically to clear the lung fields"
    ],
    "answer": 1,
    "explanation": "Shoulder positioning helps move the scapulae off the lung fields."
  },
  {
    "category": "Spine, Pelvis, Skull & Advanced Procedures",
    "question": "A trauma cervical-spine patient remains immobilized on a stretcher. Which approach best preserves safety and the diagnostic goal?",
    "options": [
      "Ask the patient to rotate the head until the anatomy aligns",
      "Remove immobilization briefly to obtain the routine projection",
      "Adapt tube and detector placement while maintaining immobilization",
      "Delay imaging until the patient can sit or stand without support"
    ],
    "answer": 2,
    "explanation": "Trauma imaging should preserve immobilization and minimize movement."
  },
  {
    "category": "Spine, Pelvis, Skull & Advanced Procedures",
    "question": "An AP pelvis shows asymmetric obturator foramina and iliac wings. What should be corrected first?",
    "options": [
      "Grid ratio",
      "Detector exposure",
      "mAs",
      "Pelvic rotation"
    ],
    "answer": 3,
    "explanation": "Asymmetric paired pelvic structures indicate rotation."
  },
  {
    "category": "Spine, Pelvis, Skull & Advanced Procedures",
    "question": "A lateral lumbar image shows posterior vertebral bodies not superimposed. Exposure and collimation are adequate. What is the likely cause?",
    "options": [
      "Patient rotation",
      "Insufficient penetration",
      "Grid cutoff",
      "Excessive SID"
    ],
    "answer": 0,
    "explanation": "Failure of posterior vertebral body superimposition indicates rotation."
  },
  {
    "category": "Spine, Pelvis, Skull & Advanced Procedures",
    "question": "Fluoroscopy time has increased because the operator repeatedly rechecks anatomy between steps. Which workflow change would best reduce unnecessary radiation?",
    "options": [
      "Keep the beam active while planning so anatomy remains continuously visible",
      "Plan steps off-beam and use the shortest practical beam-on intervals",
      "Use tighter collimation only after the procedure has already been completed",
      "Increase magnification mode so fewer image checks are needed"
    ],
    "answer": 1,
    "explanation": "Planning off-beam and limiting beam-on time directly reduces unnecessary fluoroscopic exposure."
  },
  {
    "category": "Spine, Pelvis, Skull & Advanced Procedures",
    "question": "A C-arm image shows more magnification than desired. Which geometry change can reduce magnification when practical?",
    "options": [
      "Increase OID",
      "Move the x-ray tube closer to the patient",
      "Move the image receptor closer to the patient",
      "Reduce SID"
    ],
    "answer": 2,
    "explanation": "Reducing object-to-receptor distance reduces magnification."
  },
  {
    "category": "Image Evaluation & Clinical Judgment",
    "question": "A chest image is adequately exposed, but one sternoclavicular joint is farther from the spine and one scapula overlies the lung. What is the best conclusion?",
    "options": [
      "Motion is the only likely cause of the asymmetry",
      "Exposure error is present despite acceptable positioning",
      "A fixed detector artifact explains both findings",
      "Positioning error is present despite acceptable exposure"
    ],
    "answer": 3,
    "explanation": "The combined asymmetry and scapular superimposition indicate positioning error."
  },
  {
    "category": "Image Evaluation & Clinical Judgment",
    "question": "A repeated linear artifact remains in the same receptor location after the patient is repositioned. What source is most likely?",
    "options": [
      "Detector or processing-system artifact fixed to the receptor location",
      "Patient motion that happened to recur during both exposures",
      "Patient clothing artifact remaining in the same anatomic region",
      "Anatomic superimposition caused by identical patient rotation"
    ],
    "answer": 0,
    "explanation": "A fixed artifact in detector coordinates suggests an imaging-system source."
  },
  {
    "category": "Image Evaluation & Clinical Judgment",
    "question": "An image has adequate exposure but clips required anatomy laterally. What should be changed on repeat?",
    "options": [
      "Increase mAs to reveal anatomy beyond the field",
      "Center and collimate to include the required anatomy",
      "Increase kVp so the x-ray field becomes wider",
      "Shorten exposure time to reduce clipping"
    ],
    "answer": 1,
    "explanation": "Missing anatomy is a centering/field-coverage problem."
  },
  {
    "category": "Image Evaluation & Clinical Judgment",
    "question": "A trauma image is technically imperfect but answers the immediate clinical question. The patient deteriorates immediately after exposure. What is the priority?",
    "options": [
      "Obtain a higher-exposure image before reporting the clinical deterioration",
      "Repeat immediately so the image meets routine positioning expectations",
      "Address the patient's condition before considering any technically improved repeat",
      "Move the patient into a routine position to improve image symmetry"
    ],
    "answer": 2,
    "explanation": "Patient condition takes priority when the existing image is diagnostically adequate."
  },
  {
    "category": "Image Evaluation & Clinical Judgment",
    "question": "A department notices that one abdominal technique consistently produces very low noise and exposure indicators above the target range even though displayed brightness looks normal. What change is most appropriate?",
    "options": [
      "Increase technique slightly so the low-noise appearance is preserved",
      "Open collimation so additional scatter lowers the exposure indicator",
      "Ignore the trend because post-processing keeps brightness acceptable",
      "Reduce technique and monitor exposure indicators for similar patients"
    ],
    "answer": 3,
    "explanation": "The pattern suggests excessive receptor exposure; technique should be reduced and monitored rather than judged by brightness alone."
  }
];
