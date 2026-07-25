export const medicationAcademyModules = [
  {
    number: 1,
    title: "Medication Safety Fundamentals",
    description:
      "Medication verification, patient identification, routes, labels, abbreviations, high-alert medications, and error prevention.",
    badge: "Medication Safety Specialist",
  },
  {
    number: 2,
    title: "Drug Classes",
    description:
      "Recognize major medication classes, common naming patterns, uses, and precautions.",
    badge: "Drug Class Specialist",
  },
  {
    number: 3,
    title: "Cardiovascular Medications",
    description:
      "Blood pressure, heart rate, heart failure, angina, anticoagulation, and lipid medications.",
    badge: "Cardiovascular Medication Specialist",
  },
  {
    number: 4,
    title: "Respiratory Medications",
    description:
      "Bronchodilators, inhaled corticosteroids, anticholinergics, and related therapies.",
    badge: "Respiratory Medication Specialist",
  },
  {
    number: 5,
    title: "Diabetes Medications",
    description:
      "Insulin, metformin, GLP-1 medicines, SGLT2 inhibitors, and other diabetes therapies.",
    badge: "Diabetes Medication Specialist",
  },
  {
    number: 6,
    title: "Antibiotics",
    description:
      "Common antibiotic families, appropriate use, safety concerns, and resistance principles.",
    badge: "Antibiotic Safety Specialist",
  },
  {
    number: 7,
    title: "Emergency Medications",
    description:
      "Epinephrine, naloxone, atropine, adenosine, dextrose, glucagon, and urgent-use medications.",
    badge: "Emergency Medication Specialist",
  },
  {
    number: 8,
    title: "Medication Mastery Final Challenge",
    description:
      "A comprehensive mixed review and final exam covering all academy topics.",
    badge: "Medication Mastery Graduate",
  },
];

export const moduleOneBriefing = {
  title: "Your Mission",
  summary:
    "Build a repeatable safety process for verifying a medication before it reaches a patient. This mission focuses on recognition, communication, and knowing when to stop.",
  objectives: [
    "Use patient-specific identifiers rather than location or appearance.",
    "Read the complete medication label, including name, strength, dosage form, route, warnings, and expiration.",
    "Recognize common high-risk situations such as unclear orders, unexpected doses, and look-alike or sound-alike names.",
    "Explain why near misses and error reporting improve medication safety.",
  ],
};

export const moduleOneLessons = [
  {
    title: "Verify the Patient and the Order",
    icon: "🪪",
    body:
      "Medication safety begins with the correct patient and a verified order. Use the identifiers and procedures required by your organization. A room number, bed location, diagnosis, or a familiar face should not be used as the only identifier.",
    takeaway:
      "Patient identification must be person-specific and connected to the verified order.",
    check: {
      question:
        "Which item should not be used by itself to identify a patient?",
      options: ["Full name", "Date of birth", "Room number", "Medical record number"],
      answer: 2,
      explanation:
        "Room numbers can change and are not person-specific identifiers.",
    },
  },
  {
    title: "Read the Entire Medication Label",
    icon: "🏷️",
    body:
      "Cartons and containers may display the brand name, generic name, strength, dosage form, route, warnings, storage instructions, and expiration information. Do not depend on package color, tablet shape, or the first few letters of a name.",
    takeaway:
      "The complete label—not appearance or memory—is the source for medication verification.",
    check: {
      question:
        "Which label detail most directly distinguishes a 10 mg tablet from a 100 mg tablet?",
      options: ["Package color", "Strength", "Manufacturer logo", "Tablet shape"],
      answer: 1,
      explanation:
        "The labeled strength identifies the amount of medication in the dosage unit.",
    },
  },
  {
    title: "Match the Route and Dosage Form",
    icon: "💊",
    body:
      "A medication may be supplied as a tablet, liquid, injection, inhaler, patch, or another dosage form. The route and dosage form are not automatically interchangeable. A product intended for injection should not be given orally simply because the drug name matches.",
    takeaway:
      "The ordered route must match the product and the intended administration method.",
    check: {
      question:
        "An order is oral, but the available product is labeled for injection. What is the safest response?",
      options: [
        "Give it orally because the name matches",
        "Dilute it in water",
        "Stop and obtain clarification or the correct dosage form",
        "Change the route on the order",
      ],
      answer: 2,
      explanation:
        "The route and dosage form must match the verified order and approved use.",
    },
  },
  {
    title: "Recognize High-Alert Situations",
    icon: "⚠️",
    body:
      "Some medications can cause significant harm when used in error. Insulin, anticoagulants, opioids, and certain concentrated electrolytes are common examples of medications that may require extra safeguards under facility policy.",
    takeaway:
      "Familiarity does not replace required checks, monitoring, or an independent verification process.",
    check: {
      question:
        "Which medication is commonly treated as high alert?",
      options: ["Skin moisturizer", "Insulin", "Saline nasal spray", "Antacid"],
      answer: 1,
      explanation:
        "Insulin errors can cause severe hypoglycemia or hyperglycemia and require careful safeguards.",
    },
  },
  {
    title: "Prevent Name and Communication Errors",
    icon: "👀",
    body:
      "Medication names can look or sound alike. Tall Man lettering highlights differences between similar names. Unclear handwriting, unsafe abbreviations, incomplete orders, and verbal misunderstandings can also contribute to medication errors.",
    takeaway:
      "Read the full name and compare the medication, dose, route, indication, and patient context.",
    check: {
      question:
        "Tall Man lettering is used primarily to:",
      options: [
        "Show that a medication is expensive",
        "Highlight differences between similar medication names",
        "Identify an expired medication",
        "Indicate that a drug is available over the counter",
      ],
      answer: 1,
      explanation:
        "Tall Man lettering uses selective capitalization to distinguish look-alike names.",
    },
  },
  {
    title: "Stop, Clarify, and Report",
    icon: "🛑",
    body:
      "Pause when an order is incomplete, unclear, inconsistent, or far outside the expected range. Clarify through the appropriate clinical process. Follow organizational procedures for reporting medication errors, near misses, and unsafe conditions.",
    takeaway:
      "A near miss is not a failure to hide—it is safety information that may prevent future harm.",
    check: {
      question:
        "What is a near miss?",
      options: [
        "An error that causes permanent harm",
        "A potential error caught before it reaches the patient",
        "A correctly administered medication",
        "A patient refusing a medication",
      ],
      answer: 1,
      explanation:
        "A near miss is intercepted before reaching the patient but can reveal a system weakness.",
    },
  },
];

export const moduleOneScenarios = [
  {
    title: "Scenario 1: Unexpected Dose",
    patient:
      "An adult patient has a new medication order. The calculated dose is ten times larger than the dose normally seen for this medication.",
    question: "What is the safest next action?",
    options: [
      "Administer it because the order is signed",
      "Reduce the dose without telling anyone",
      "Pause and clarify the order through the appropriate clinical process",
      "Ask the patient what dose they usually take and use that",
    ],
    answer: 2,
    explanation:
      "A dose far outside the expected range may reflect an ordering, transcription, or calculation problem. It should be clarified before administration.",
  },
  {
    title: "Scenario 2: Similar Medication Names",
    patient:
      "Two medication names appear very similar in the electronic list. The requested medication is used for blood pressure, but the selected product is commonly used for itching.",
    question: "What should happen first?",
    options: [
      "Use the selected product because the names are similar",
      "Compare the complete names, indication, dose, route, and order",
      "Choose whichever medication is stocked closest",
      "Rely on package color",
    ],
    answer: 1,
    explanation:
      "The mismatch between the indication and selected medication is a strong signal to stop and verify the complete order and label.",
  },
];

export const moduleOneQuestions = [
  {
    question:
      "A medication package looks different from what you usually see, but the name appears similar. What is the safest next action?",
    options: [
      "Administer it because the name is close",
      "Verify the full label, strength, dosage form, route, and order",
      "Ask the patient whether it looks familiar",
      "Remove it from the package to compare color",
    ],
    answer: 1,
    explanation:
      "Unexpected appearance should trigger complete verification rather than an assumption.",
  },
  {
    question:
      "Which identifier is inappropriate to use by itself for patient identification?",
    options: ["Full name", "Date of birth", "Medical record number", "Room number"],
    answer: 3,
    explanation:
      "A room number can change and does not uniquely identify the patient.",
  },
  {
    question:
      "Why is route of administration a critical medication check?",
    options: [
      "It determines the medication price",
      "The same medication may have dosage forms that are not interchangeable",
      "It only matters for controlled substances",
      "It replaces the need to verify the dose",
    ],
    answer: 1,
    explanation:
      "Different routes and dosage forms can have different absorption, concentration, and safety requirements.",
  },
  {
    question:
      "Which medication is commonly considered high alert?",
    options: ["Antacid", "Insulin", "Saline nasal spray", "Skin moisturizer"],
    answer: 1,
    explanation:
      "Insulin requires careful safeguards because errors may cause severe harm.",
  },
  {
    question:
      "Tall Man lettering is primarily used to:",
    options: [
      "Make labels easier to advertise",
      "Highlight differences between look-alike medication names",
      "Show that a medication is available without a prescription",
      "Identify an expired medication",
    ],
    answer: 1,
    explanation:
      "Tall Man lettering helps differentiate medication names that could be confused.",
  },
  {
    question:
      "An order could reasonably be read as either of two medications. What should happen first?",
    options: [
      "Choose the more common medication",
      "Ask another student to guess",
      "Clarify the order through the appropriate clinical process",
      "Administer half of each",
    ],
    answer: 2,
    explanation:
      "Ambiguous orders must be clarified rather than interpreted by guessing.",
  },
  {
    question:
      "Which label detail most directly distinguishes a 10 mg tablet from a 100 mg tablet?",
    options: ["Manufacturer logo", "Strength", "Package color", "Tablet shape"],
    answer: 1,
    explanation:
      "The labeled strength is the direct source for confirming the amount per dosage unit.",
  },
  {
    question:
      "A near miss occurs when:",
    options: [
      "An error reaches the patient and causes harm",
      "A potential error is caught before reaching the patient",
      "A patient refuses a correctly prepared medication",
      "A medication is administered exactly as ordered",
    ],
    answer: 1,
    explanation:
      "A near miss is intercepted before reaching the patient but still provides valuable safety information.",
  },
  {
    question:
      "Which action best reduces the risk of look-alike or sound-alike medication errors?",
    options: [
      "Reading only the first three letters",
      "Relying on package color",
      "Comparing the complete name, dose, route, indication, and patient",
      "Selecting the first search result",
    ],
    answer: 2,
    explanation:
      "A complete comparison helps detect confusion that a partial glance may miss.",
  },
  {
    question:
      "Why should allergies be reviewed before medication administration?",
    options: [
      "To determine insurance coverage",
      "To identify a possible hypersensitivity risk",
      "To determine the room assignment",
      "To calculate the expiration date",
    ],
    answer: 1,
    explanation:
      "Known allergies may signal a risk of an allergic or hypersensitivity reaction.",
  },
  {
    question:
      "A medication is ordered orally, but the available product is labeled for injection. What is the safest response?",
    options: [
      "Give it orally because the drug name matches",
      "Change the route on the order",
      "Stop and obtain clarification or the correct dosage form",
      "Dilute the injectable product in water",
    ],
    answer: 2,
    explanation:
      "The dosage form and route must match the verified order and approved administration method.",
  },
  {
    question:
      "Which situation most strongly requires a pause and recheck?",
    options: [
      "The order, label, and patient information all match",
      "The calculated dose is far outside the expected range",
      "The medication is in its original package",
      "The patient states two identifiers",
    ],
    answer: 1,
    explanation:
      "An unexpectedly high or low dose may indicate an ordering, transcription, or calculation issue.",
  },
  {
    question:
      "What is the purpose of an independent double-check when required for a high-alert medication?",
    options: [
      "To replace documentation",
      "To let one person copy the other's work",
      "To independently verify critical elements before administration",
      "To avoid reading the medication label",
    ],
    answer: 2,
    explanation:
      "A true independent check adds a separate verification step rather than simple agreement.",
  },
  {
    question:
      "Which statement about medication errors is most accurate?",
    options: [
      "Only errors that cause harm should be reported",
      "Near misses and unsafe conditions can reveal system weaknesses",
      "Medication errors are always caused by one careless person",
      "Packaging and labeling never contribute to errors",
    ],
    answer: 1,
    explanation:
      "Near misses and hazards can identify process problems before harm occurs.",
  },
  {
    question:
      "What should guide medication administration in actual clinical practice?",
    options: [
      "A social media video",
      "Personal preference",
      "Organizational policy, authorized scope of practice, and the verified order",
      "Package color",
    ],
    answer: 2,
    explanation:
      "Clinical practice must follow authorized scope, organizational policy, and verified orders.",
  },
];

export const moduleOneSources = [
  {
    label: "FDA: Frequently Asked Questions About Labeling for Prescription Medicines",
    href: "https://www.fda.gov/drugs/fdas-labeling-resources-human-prescription-drugs/frequently-asked-questions-about-labeling-prescription-medicines",
  },
  {
    label: "FDA: Name Differentiation Project and Tall Man Lettering",
    href: "https://www.fda.gov/drugs/medication-errors-related-cder-regulated-drug-products/fda-name-differentiation-project",
  },
  {
    label: "FDA: Dosage Form and Route of Administration",
    href: "https://www.fda.gov/industry/data-standards/dosage-form-and-route-administration",
  },
  {
    label: "Joint Commission: Two Patient Identifiers",
    href: "https://www.jointcommission.org/en-us/knowledge-library/support-center/standards-interpretation/standards-faqs/000001462",
  },
];

export const moduleTwoBriefing = {
  title: "Think in Drug Classes",
  summary:
    "Learn how medication classes organize drugs by shared mechanisms, effects, or chemical features. You will practice recognizing major classes, common naming patterns, and the limits of relying on suffixes alone.",
  objectives: [
    "Explain what a pharmacologic class represents.",
    "Connect common medication classes with their general therapeutic purpose.",
    "Use common name patterns as clues without treating them as guarantees.",
    "Recognize when two medications from the same class may share important effects or precautions.",
  ],
};

export const moduleTwoLessons = [
  {
    title: "What Is a Drug Class?",
    icon: "🧬",
    body:
      "A pharmacologic class groups medications that share scientifically documented properties. A class may be based on mechanism of action, physiologic effect, chemical structure, or a combination of these features. Class knowledge helps learners organize many medications into meaningful families.",
    takeaway:
      "A drug class is more than a list of names—it connects medications through shared properties.",
    check: {
      question: "Which statement best describes a pharmacologic class?",
      options: [
        "A group based only on package color",
        "A group with shared scientifically documented properties",
        "Every medication made by one company",
        "Only medications with identical brand names",
      ],
      answer: 1,
      explanation:
        "Drug classes are based on shared mechanisms, effects, structures, or related scientifically documented properties.",
    },
  },
  {
    title: "Use Name Patterns Carefully",
    icon: "🔤",
    body:
      "Generic medication names often contain recognizable stems or suffixes. Examples include many ACE inhibitors ending in -pril, beta blockers ending in -olol, and statins ending in -statin. These patterns are useful clues, but exceptions and combination products mean the complete label and verified reference still matter.",
    takeaway:
      "A suffix can guide recognition, but it should never replace full medication verification.",
    check: {
      question: "Which generic-name ending is commonly associated with ACE inhibitors?",
      options: ["-pril", "-olol", "-statin", "-prazole"],
      answer: 0,
      explanation:
        "Many ACE inhibitors, including lisinopril and enalapril, end in -pril.",
    },
  },
  {
    title: "Major Blood Pressure Classes",
    icon: "❤️",
    body:
      "Common blood pressure medication classes include ACE inhibitors, angiotensin II receptor blockers, beta blockers, calcium channel blockers, and diuretics. They lower blood pressure through different pathways, such as reducing vessel narrowing, slowing the heart, relaxing vessels, or removing excess sodium and water.",
    takeaway:
      "Medications can treat the same condition through different mechanisms and monitoring needs.",
    check: {
      question: "Which class helps the heart beat slower and with less force?",
      options: [
        "Beta blockers",
        "Statins",
        "Proton pump inhibitors",
        "Antifungals",
      ],
      answer: 0,
      explanation:
        "Beta blockers reduce beta-receptor stimulation and commonly slow heart rate and reduce contractile force.",
    },
  },
  {
    title: "Pain and Inflammation Classes",
    icon: "🩹",
    body:
      "Analgesics reduce pain, while anti-inflammatory medicines reduce inflammation. Acetaminophen is commonly used for pain and fever. Nonsteroidal anti-inflammatory drugs, or NSAIDs, reduce pain and inflammation. Opioids are a separate analgesic class with important sedation, respiratory, and misuse risks.",
    takeaway:
      "Medicines used for pain are not interchangeable and may have very different safety concerns.",
    check: {
      question: "Which class is commonly used to reduce both pain and inflammation?",
      options: ["NSAIDs", "Statins", "ACE inhibitors", "Antifungals"],
      answer: 0,
      explanation:
        "NSAIDs are commonly used for pain and inflammation, although individual risks and contraindications vary.",
    },
  },
  {
    title: "Anti-Infective Classes",
    icon: "🦠",
    body:
      "Anti-infective medications are organized by the type of organism or process they target. Antibiotics treat susceptible bacterial infections, antivirals act against viruses, and antifungals treat fungal infections. Using the correct class depends on the diagnosis, organism, patient factors, and verified order.",
    takeaway:
      "Antibiotics, antivirals, and antifungals are different classes and are not substitutes for one another.",
    check: {
      question: "Which class is intended to treat fungal infections?",
      options: ["Antivirals", "Antifungals", "Beta blockers", "Diuretics"],
      answer: 1,
      explanation:
        "Antifungal medications are used to treat fungal infections.",
    },
  },
  {
    title: "Class Effects and Shared Precautions",
    icon: "🔎",
    body:
      "Medications within a class may share therapeutic effects, adverse effects, interactions, or monitoring needs. However, individual drugs can differ in selectivity, duration, route, dose, and approved uses. Class recognition supports learning, but patient-specific decisions require the actual medication information.",
    takeaway:
      "Class knowledge predicts patterns; the individual medication label provides the details.",
    check: {
      question:
        "Why is knowing a medication's class useful?",
      options: [
        "It guarantees every drug in the class is identical",
        "It helps predict shared effects and precautions",
        "It removes the need to read the label",
        "It determines the medication's package color",
      ],
      answer: 1,
      explanation:
        "Class knowledge helps learners anticipate common mechanisms, effects, and safety themes, while individual details still matter.",
    },
  },
];

export const moduleTwoScenarios = [
  {
    title: "Scenario 1: Recognizing a Pattern",
    patient:
      "A patient medication list includes lisinopril. You are asked to identify its likely class before reviewing the verified drug reference.",
    question: "Which class is the best match?",
    options: [
      "ACE inhibitor",
      "Beta blocker",
      "Statin",
      "Proton pump inhibitor",
    ],
    answer: 0,
    explanation:
      "Lisinopril is an ACE inhibitor. The -pril ending is a useful recognition clue, but full verification is still required.",
  },
  {
    title: "Scenario 2: Same Goal, Different Class",
    patient:
      "Two patients are being treated for high blood pressure. One takes a beta blocker and the other takes a diuretic.",
    question: "Which statement is most accurate?",
    options: [
      "Both classes work in exactly the same way",
      "Different classes can treat the same condition through different mechanisms",
      "A diuretic is always interchangeable with a beta blocker",
      "Class information is unrelated to monitoring",
    ],
    answer: 1,
    explanation:
      "Multiple classes may treat hypertension through different mechanisms, with different effects, precautions, and monitoring considerations.",
  },
];

export const moduleTwoQuestions = [
  {
    question: "A pharmacologic class may be defined using which features?",
    options: [
      "Mechanism, physiologic effect, or chemical structure",
      "Package color only",
      "Manufacturer location only",
      "Tablet price only",
    ],
    answer: 0,
    explanation:
      "FDA describes pharmacologic class using mechanism of action, physiologic effect, chemical structure, or combinations of these attributes.",
  },
  {
    question: "Which suffix is a common clue for many beta blockers?",
    options: ["-olol", "-pril", "-statin", "-cycline"],
    answer: 0,
    explanation:
      "Many beta blockers, such as metoprolol and propranolol, end in -olol.",
  },
  {
    question: "Which suffix is commonly associated with statins?",
    options: ["-sartan", "-statin", "-prazole", "-cillin"],
    answer: 1,
    explanation:
      "Atorvastatin, rosuvastatin, and simvastatin are examples of statins.",
  },
  {
    question: "Which class helps remove extra sodium and water from the body?",
    options: ["Diuretics", "Antifungals", "Statins", "Antivirals"],
    answer: 0,
    explanation:
      "Diuretics increase removal of sodium and water, which can reduce circulating fluid volume.",
  },
  {
    question: "Which class commonly keeps blood vessels from narrowing through the renin-angiotensin system?",
    options: [
      "ACE inhibitors or ARBs",
      "Antacids",
      "Antihistamines",
      "Antifungals",
    ],
    answer: 0,
    explanation:
      "ACE inhibitors and ARBs affect the renin-angiotensin system and help reduce vessel narrowing.",
  },
  {
    question: "Which medication is most likely a beta blocker?",
    options: ["Metoprolol", "Lisinopril", "Atorvastatin", "Omeprazole"],
    answer: 0,
    explanation:
      "Metoprolol is a beta blocker; its -olol ending is a useful clue.",
  },
  {
    question: "Which medication is most likely an ACE inhibitor?",
    options: ["Amlodipine", "Lisinopril", "Furosemide", "Rosuvastatin"],
    answer: 1,
    explanation:
      "Lisinopril is an ACE inhibitor and ends in the common -pril stem.",
  },
  {
    question: "Which medication is most likely a statin?",
    options: ["Losartan", "Atorvastatin", "Metformin", "Albuterol"],
    answer: 1,
    explanation:
      "Atorvastatin is an HMG-CoA reductase inhibitor, commonly called a statin.",
  },
  {
    question: "Which class is commonly used to reduce pain and inflammation?",
    options: ["NSAIDs", "Antivirals", "Diuretics", "Statins"],
    answer: 0,
    explanation:
      "NSAIDs are commonly used for pain and inflammation, although risks differ among patients and products.",
  },
  {
    question: "Which class carries important sedation and respiratory-depression concerns?",
    options: ["Opioids", "Statins", "Antifungals", "ACE inhibitors"],
    answer: 0,
    explanation:
      "Opioids can cause sedation and respiratory depression and require careful use and monitoring.",
  },
  {
    question: "Antibiotics are intended to treat:",
    options: [
      "Susceptible bacterial infections",
      "Every viral infection",
      "All fungal infections",
      "High blood pressure",
    ],
    answer: 0,
    explanation:
      "Antibiotics target susceptible bacteria and do not treat every infection type.",
  },
  {
    question: "Which class is used against viral infections?",
    options: ["Antivirals", "Antifungals", "Diuretics", "Beta blockers"],
    answer: 0,
    explanation:
      "Antiviral medications act against specific viruses or viral processes.",
  },
  {
    question: "Why should suffix recognition be used cautiously?",
    options: [
      "Suffixes are never useful",
      "Exceptions and combination products exist",
      "Generic names have no patterns",
      "Brand names always show the class",
    ],
    answer: 1,
    explanation:
      "Name stems are helpful clues, but exceptions and combination products make full verification necessary.",
  },
  {
    question: "Which statement about medications in the same class is most accurate?",
    options: [
      "They are always identical in dose and duration",
      "They may share effects but still differ in important details",
      "They always have the same route",
      "They never share adverse effects",
    ],
    answer: 1,
    explanation:
      "Class members can share mechanisms or effects while differing in selectivity, duration, route, dose, and approved uses.",
  },
  {
    question: "What is the safest use of drug-class knowledge?",
    options: [
      "Use it to organize learning and anticipate patterns, then verify the individual drug",
      "Use it to skip reading the label",
      "Assume every class member is interchangeable",
      "Use it to change an ordered medication",
    ],
    answer: 0,
    explanation:
      "Class knowledge supports recognition and reasoning, but the individual drug and verified order must guide practice.",
  },
];

export const moduleTwoSources = [
  {
    label: "FDA: Pharmacologic Class",
    href: "https://www.fda.gov/industry/structured-product-labeling-resources/pharmacologic-class",
  },
  {
    label: "FDA: High Blood Pressure Medicines",
    href: "https://www.fda.gov/consumers/womens-health-topics/high-blood-pressure",
  },
  {
    label: "FDA: Cholesterol Medicines Guide",
    href: "https://www.fda.gov/consumers/womens-health-topics/cholesterol-medicines-guide",
  },
  {
    label: "FDA: General Drug Categories",
    href: "https://www.fda.gov/drugs/investigational-new-drug-ind-application/general-drug-categories",
  },
];

export const moduleThreeBriefing = {
  title: "Follow the Cardiovascular Purpose",
  summary:
    "Learn how common cardiovascular medications affect blood pressure, heart rate, fluid balance, cholesterol, chest discomfort, and clotting. The goal is recognition and safe reasoning—not independent prescribing or medication changes.",
  objectives: [
    "Connect major cardiovascular medication classes with their general purpose.",
    "Recognize common examples such as lisinopril, losartan, metoprolol, amlodipine, furosemide, nitroglycerin, atorvastatin, and anticoagulants.",
    "Identify important assessment themes such as blood pressure, pulse, dizziness, swelling, fluid status, bleeding, and muscle symptoms.",
    "Explain why cardiovascular medications should not be stopped, doubled, or substituted without the appropriate prescriber or pharmacist.",
  ],
};

export const moduleThreeLessons = [
  {
    title: "ACE Inhibitors and ARBs",
    icon: "🫀",
    body:
      "ACE inhibitors and angiotensin II receptor blockers, or ARBs, help prevent blood vessels from narrowing. Common examples include lisinopril and losartan. These medicines may be used for hypertension and selected heart or kidney conditions. Important safety themes include dizziness, blood pressure changes, kidney function, potassium, and pregnancy-related warnings. ACE inhibitors may also cause cough or angioedema.",
    takeaway:
      "ACE inhibitors and ARBs affect the renin-angiotensin system, but the individual medication and patient factors determine the exact risks and monitoring.",
    check: {
      question: "Which medication is an ACE inhibitor?",
      options: ["Lisinopril", "Metoprolol", "Amlodipine", "Atorvastatin"],
      answer: 0,
      explanation:
        "Lisinopril is an ACE inhibitor. The -pril ending is a common recognition clue.",
    },
  },
  {
    title: "Beta Blockers",
    icon: "💓",
    body:
      "Beta blockers help the heart beat slower and with less force. Examples include metoprolol, carvedilol, and propranolol. Depending on the medication and indication, they may be used for hypertension, selected rhythm problems, angina, heart failure, or other conditions. Common assessment themes include pulse, blood pressure, dizziness, fatigue, and breathing history.",
    takeaway:
      "A slow pulse, low blood pressure, or new breathing concern may be important context when reviewing a beta blocker.",
    check: {
      question: "Which effect is most associated with beta blockers?",
      options: [
        "Slowing heart rate",
        "Increasing clot formation",
        "Raising cholesterol",
        "Increasing fluid retention as the intended effect",
      ],
      answer: 0,
      explanation:
        "Beta blockers commonly reduce heart rate and the force of contraction.",
    },
  },
  {
    title: "Calcium Channel Blockers",
    icon: "🩸",
    body:
      "Calcium channel blockers prevent calcium from entering certain heart and blood-vessel muscle cells. This can relax blood vessels, lower blood pressure, and—depending on the specific drug—affect heart rate or conduction. Examples include amlodipine, diltiazem, verapamil, and nifedipine. Common safety themes include dizziness, ankle swelling, flushing, blood pressure, and pulse.",
    takeaway:
      "Not all calcium channel blockers affect the heart in the same way; identify the individual medication rather than relying on the class name alone.",
    check: {
      question: "Which medication is a calcium channel blocker?",
      options: ["Amlodipine", "Losartan", "Furosemide", "Warfarin"],
      answer: 0,
      explanation:
        "Amlodipine is a calcium channel blocker commonly used for hypertension and angina.",
    },
  },
  {
    title: "Diuretics and Fluid Balance",
    icon: "💧",
    body:
      "Diuretics help remove extra sodium and water. Examples include furosemide, hydrochlorothiazide, chlorthalidone, and spironolactone. They may be used for hypertension, edema, or selected heart conditions. Important assessment themes include blood pressure, daily weight, swelling, fluid intake and output, kidney function, and electrolytes. Different diuretic subclasses can affect potassium differently.",
    takeaway:
      "A diuretic changes fluid and electrolyte balance, so weight trends, symptoms, kidney function, and laboratory results can matter.",
    check: {
      question: "Which medication is a loop diuretic?",
      options: ["Furosemide", "Metoprolol", "Lisinopril", "Nitroglycerin"],
      answer: 0,
      explanation:
        "Furosemide is a loop diuretic used to remove excess fluid.",
    },
  },
  {
    title: "Nitrates and Angina",
    icon: "⚡",
    body:
      "Nitroglycerin is a nitrate used in the management of angina. Nitrates relax blood vessels and reduce the heart's workload. Headache, dizziness, and low blood pressure are important safety themes. A key interaction concern is the combination of nitrates with phosphodiesterase-5 inhibitors because severe hypotension can occur.",
    takeaway:
      "Chest discomfort requires the emergency or clinical process appropriate to the setting; medication education should never delay urgent evaluation.",
    check: {
      question: "Which medication is commonly used to relieve or prevent angina?",
      options: ["Nitroglycerin", "Atorvastatin", "Furosemide", "Warfarin"],
      answer: 0,
      explanation:
        "Nitroglycerin is a nitrate used for angina management.",
    },
  },
  {
    title: "Statins and Antithrombotic Medicines",
    icon: "🛡️",
    body:
      "Statins such as atorvastatin and rosuvastatin lower cholesterol and may reduce cardiovascular risk in appropriate patients. Anticoagulants and antiplatelet medicines reduce clot formation through different pathways. Examples include warfarin, apixaban, heparin, aspirin, and clopidogrel. Safety themes include bleeding, interactions, laboratory or renal monitoring when applicable, and following the exact product instructions.",
    takeaway:
      "A statin manages lipids; anticoagulants and antiplatelets affect clotting. These are different purposes with different risks.",
    check: {
      question: "Which finding is especially important when reviewing an anticoagulant or antiplatelet medicine?",
      options: [
        "Unusual bleeding or bruising",
        "Package color",
        "Hair length",
        "Room temperature only",
      ],
      answer: 0,
      explanation:
        "Unexpected bleeding or bruising can be clinically important when a medication affects clotting.",
    },
  },
];

export const moduleThreeScenarios = [
  {
    title: "Scenario 1: Pulse and Blood Pressure",
    patient:
      "A patient scheduled to receive a beta blocker has a heart rate much lower than their usual baseline and reports new dizziness.",
    question: "What is the safest general response?",
    options: [
      "Give an extra dose to raise the blood pressure",
      "Ignore the findings because beta blockers always cause this",
      "Pause and follow the clinical assessment and medication-clarification process",
      "Substitute a calcium channel blocker",
    ],
    answer: 2,
    explanation:
      "A significant change in pulse with symptoms should be assessed according to the verified order, parameters, scope, and organizational policy.",
  },
  {
    title: "Scenario 2: Bleeding Concern",
    patient:
      "A patient taking an anticoagulant reports black stools and increasing weakness.",
    question: "Which response is most appropriate?",
    options: [
      "Treat it as a possible bleeding concern and escalate promptly",
      "Recommend doubling the anticoagulant",
      "Wait several weeks to see whether it stops",
      "Assume the stool color is unrelated",
    ],
    answer: 0,
    explanation:
      "Black stools and weakness may indicate gastrointestinal bleeding and require prompt clinical evaluation.",
  },
];

export const moduleThreeQuestions = [
  {
    question: "ACE inhibitors and ARBs generally help lower blood pressure by:",
    options: [
      "Keeping blood vessels from narrowing",
      "Increasing sodium retention",
      "Increasing clot formation",
      "Raising heart rate",
    ],
    answer: 0,
    explanation:
      "ACE inhibitors and ARBs affect the renin-angiotensin system and help reduce vessel narrowing.",
  },
  {
    question: "Which medication is an ARB?",
    options: ["Losartan", "Lisinopril", "Metoprolol", "Amlodipine"],
    answer: 0,
    explanation:
      "Losartan is an angiotensin II receptor blocker, or ARB.",
  },
  {
    question: "Which symptom is commonly associated with ACE inhibitors?",
    options: ["Dry cough", "Blue urine", "Improved night vision", "Hair growth"],
    answer: 0,
    explanation:
      "A dry cough is a recognized common effect of ACE inhibitors.",
  },
  {
    question: "Beta blockers commonly:",
    options: [
      "Slow heart rate and reduce force of contraction",
      "Increase heart rate",
      "Dissolve blood clots immediately",
      "Increase sodium and water retention as their main purpose",
    ],
    answer: 0,
    explanation:
      "Beta blockers reduce beta-receptor stimulation and commonly slow the heart.",
  },
  {
    question: "Which medication is a beta blocker?",
    options: ["Metoprolol", "Losartan", "Amlodipine", "Atorvastatin"],
    answer: 0,
    explanation:
      "Metoprolol is a beta blocker.",
  },
  {
    question: "Which medication is a calcium channel blocker?",
    options: ["Amlodipine", "Furosemide", "Warfarin", "Lisinopril"],
    answer: 0,
    explanation:
      "Amlodipine is a calcium channel blocker.",
  },
  {
    question: "Ankle swelling is a common safety theme with which class?",
    options: [
      "Calcium channel blockers",
      "Statins only",
      "Antibiotics only",
      "Antivirals only",
    ],
    answer: 0,
    explanation:
      "Ankle or peripheral swelling is a recognized effect of some calcium channel blockers.",
  },
  {
    question: "What is the general purpose of a diuretic?",
    options: [
      "Remove extra sodium and water",
      "Increase clot formation",
      "Raise cholesterol",
      "Slow bacterial growth",
    ],
    answer: 0,
    explanation:
      "Diuretics increase the removal of sodium and water and can reduce fluid volume.",
  },
  {
    question: "Which medication is a loop diuretic?",
    options: ["Furosemide", "Metoprolol", "Nitroglycerin", "Clopidogrel"],
    answer: 0,
    explanation:
      "Furosemide is a loop diuretic.",
  },
  {
    question: "Which information is especially useful when monitoring fluid status?",
    options: [
      "Daily weight trend",
      "Favorite color",
      "Room number",
      "Shoe brand",
    ],
    answer: 0,
    explanation:
      "Daily weight trends can help identify changes in fluid balance.",
  },
  {
    question: "Nitroglycerin belongs to which general medication group?",
    options: ["Nitrates", "Statins", "Diuretics", "Antibiotics"],
    answer: 0,
    explanation:
      "Nitroglycerin is a nitrate used in angina management.",
  },
  {
    question: "Which effect is common with nitrates?",
    options: ["Headache and dizziness", "High fever", "Increased clotting", "High cholesterol"],
    answer: 0,
    explanation:
      "Vasodilation from nitrates can contribute to headache, dizziness, and low blood pressure.",
  },
  {
    question: "Which medication is a statin?",
    options: ["Atorvastatin", "Apixaban", "Nitroglycerin", "Furosemide"],
    answer: 0,
    explanation:
      "Atorvastatin is an HMG-CoA reductase inhibitor, commonly called a statin.",
  },
  {
    question: "Which symptom should be reported when taking a statin?",
    options: [
      "Unexplained muscle pain or weakness",
      "Normal hunger before lunch",
      "A preference for cold water",
      "A stable pulse",
    ],
    answer: 0,
    explanation:
      "Unexplained muscle pain or weakness can be an important statin safety concern.",
  },
  {
    question: "Which finding is most concerning in a patient taking an anticoagulant?",
    options: [
      "Black stools and weakness",
      "A normal appetite",
      "Clear urine",
      "A stable temperature",
    ],
    answer: 0,
    explanation:
      "Black stools and weakness may suggest gastrointestinal bleeding and require prompt evaluation.",
  },
];

export const moduleThreeSources = [
  {
    label: "FDA: High Blood Pressure Medicines",
    href: "https://www.fda.gov/consumers/womens-health-topics/high-blood-pressure",
  },
  {
    label: "FDA: Hypertension Medication Types",
    href: "https://www.fda.gov/consumers/health-education-resources/hypertension",
  },
  {
    label: "FDA: Cholesterol Medicines Guide",
    href: "https://www.fda.gov/consumers/womens-health-topics/cholesterol-medicines-guide",
  },
  {
    label: "MedlinePlus: Blood Pressure Medicines",
    href: "https://medlineplus.gov/bloodpressuremedicines.html",
  },
  {
    label: "MedlinePlus: Stable Angina",
    href: "https://medlineplus.gov/ency/article/000198.htm",
  },
];

export const moduleFourBriefing = {
  title: "Breathe Easier Through Medication Recognition",
  summary:
    "Learn how common respiratory medications support patients with asthma, COPD, bronchospasm, and airway inflammation. This mission emphasizes rescue-versus-maintenance recognition, inhaler safety, patient teaching, and knowing when worsening symptoms require escalation.",
  objectives: [
    "Distinguish quick-relief medicines from long-term control medicines.",
    "Recognize SABAs, LABAs, inhaled corticosteroids, anticholinergics, and common combination inhalers.",
    "Connect inhaler and nebulizer devices with safe use and patient education.",
    "Identify important concerns such as frequent rescue-inhaler use, oral thrush, tremor, fast heart rate, and worsening breathing.",
    "Apply oxygen-safety principles and follow the verified order, patient-specific plan, and organizational policy.",
  ],
};

export const moduleFourLessons = [
  {
    title: "Rescue vs. Maintenance Medicines",
    icon: "🚨",
    body:
      "Quick-relief, or rescue, medicines act rapidly during coughing, wheezing, bronchospasm, or breathing difficulty. Albuterol and levalbuterol are common short-acting beta agonists. Maintenance medicines are taken on a schedule to reduce symptoms or prevent flare-ups. They are not automatically substitutes for a rescue medicine during sudden breathing difficulty.",
    takeaway:
      "Frequent or increasing rescue-medication use may signal poor control or worsening disease and should be addressed through the patient's action plan and healthcare team.",
    pearl:
      "A medication can be inhaled and still be a maintenance medicine. Identify its class and purpose instead of assuming every inhaler is for immediate relief.",
    check: {
      question: "Which medication is commonly used as a quick-relief bronchodilator?",
      options: ["Albuterol", "Fluticasone", "Tiotropium", "Budesonide"],
      answer: 0,
      explanation:
        "Albuterol is a short-acting beta agonist commonly used for rapid relief of bronchospasm.",
    },
  },
  {
    title: "SABAs and LABAs",
    icon: "💨",
    body:
      "Short-acting beta agonists, or SABAs, include albuterol and levalbuterol. They relax airway muscles quickly. Long-acting beta agonists, or LABAs, include salmeterol and formoterol and provide longer bronchodilation. In asthma care, LABAs are generally used as part of a controller plan rather than as stand-alone rescue treatment. Beta agonists may cause tremor, nervousness, or a fast heartbeat.",
    takeaway:
      "SABA usually signals quick relief; LABA signals longer control. The exact product and action plan still determine how it should be used.",
    pearl:
      "When a patient reports palpitations or marked tremor after repeated rescue doses, assess the full situation and escalate according to the clinical setting.",
    check: {
      question: "Which medication is a long-acting beta agonist?",
      options: ["Salmeterol", "Albuterol", "Ipratropium", "Fluticasone"],
      answer: 0,
      explanation:
        "Salmeterol is a LABA. Albuterol is a SABA.",
    },
  },
  {
    title: "Inhaled Corticosteroids",
    icon: "🛡️",
    body:
      "Inhaled corticosteroids reduce airway inflammation and are common long-term control medicines. Examples include fluticasone, budesonide, and beclomethasone. They do not usually provide immediate relief during an acute episode. Patients are commonly instructed to rinse, gargle, and spit after use to reduce mouth and throat effects such as oral candidiasis.",
    takeaway:
      "Inhaled corticosteroids control inflammation over time; consistent technique and mouth care are important.",
    pearl:
      "White patches, mouth soreness, or hoarseness after regular inhaled-steroid use may require assessment of technique and possible oral candidiasis.",
    check: {
      question: "Why is mouth rinsing commonly taught after an inhaled corticosteroid?",
      options: [
        "To reduce oral candidiasis and local irritation",
        "To make the drug act as a rescue medicine",
        "To increase oxygen flow",
        "To prevent all systemic effects",
      ],
      answer: 0,
      explanation:
        "Rinsing, gargling, and spitting can reduce medication residue and local mouth or throat effects.",
    },
  },
  {
    title: "Anticholinergic Bronchodilators",
    icon: "🔓",
    body:
      "Anticholinergic, or antimuscarinic, medicines help relax airways by blocking muscarinic effects. Ipratropium is short acting, while tiotropium is long acting. These medicines are commonly encountered in COPD treatment and may be used in selected asthma plans. Dry mouth, blurred vision from eye exposure, urinary difficulty, and other anticholinergic effects are important safety themes.",
    takeaway:
      "Ipratropium is generally shorter acting; tiotropium is a long-acting maintenance medicine and is not a substitute for immediate rescue therapy.",
    pearl:
      "Nebulized or mist medication should be kept out of the eyes when the product instructions warn of eye effects.",
    check: {
      question: "Which medication is a long-acting anticholinergic bronchodilator?",
      options: ["Tiotropium", "Albuterol", "Budesonide", "Salmeterol"],
      answer: 0,
      explanation:
        "Tiotropium is a long-acting muscarinic antagonist commonly used as maintenance therapy.",
    },
  },
  {
    title: "Combination Inhalers and Devices",
    icon: "🧩",
    body:
      "Combination inhalers place two or more medication classes in one device. Common combinations may pair an inhaled corticosteroid with a LABA, or combine bronchodilator classes. Metered-dose inhalers, dry-powder inhalers, soft-mist inhalers, spacers, and nebulizers use different techniques. The medication name, device instructions, dose counter, priming steps, and cleaning directions should all be verified.",
    takeaway:
      "Correct medication plus incorrect device technique can still lead to poor delivery. Teach and verify technique for the exact device.",
    pearl:
      "Do not assume two inhalers work the same way. Some require slow inhalation, some forceful inhalation, and some need shaking or priming.",
    check: {
      question: "A common controller combination inhaler contains:",
      options: [
        "An inhaled corticosteroid plus a LABA",
        "A statin plus an anticoagulant",
        "An antibiotic plus insulin",
        "A diuretic plus a nitrate",
      ],
      answer: 0,
      explanation:
        "Many controller combination inhalers pair an inhaled corticosteroid with a long-acting bronchodilator.",
    },
  },
  {
    title: "Nebulizers, Oxygen, and Escalation",
    icon: "🫁",
    body:
      "A nebulizer turns liquid medication into a mist for inhalation. Albuterol, ipratropium, or a combination may be delivered this way. Oxygen is a prescribed therapy with specific device and flow requirements. Oxygen does not burn by itself, but it supports combustion. Keep it away from smoking, sparks, flames, petroleum-based products when prohibited, and unsecured cylinders. Severe breathing difficulty, cyanosis, altered mental status, silent chest, or failure to respond requires urgent escalation.",
    takeaway:
      "Follow the verified oxygen order and equipment instructions, and never allow medication teaching to delay emergency evaluation.",
    pearl:
      "A patient who cannot speak normally, is becoming confused, or is worsening despite rescue treatment needs urgent help—not another round of casual teaching.",
    practice: {
      label: "Practice recognizing respiratory findings",
      href: "/?tab=EvaluateLungSounds",
    },
    check: {
      question: "Which statement about oxygen is correct?",
      options: [
        "Oxygen supports combustion and must be kept away from ignition sources",
        "Oxygen is safe beside an open flame",
        "Cylinder storage does not matter",
        "The flow rate may be changed without checking the order or plan",
      ],
      answer: 0,
      explanation:
        "Oxygen enriches the environment and can make fires burn more intensely, so strict safety practices are required.",
    },
  },
];

export const moduleFourScenarios = [
  {
    title: "Scenario 1: Increasing Rescue Use",
    patient:
      "A patient with asthma reports using albuterol many times today and still has worsening wheezing and difficulty speaking in full sentences.",
    question: "What is the safest general response?",
    options: [
      "Treat this as worsening respiratory distress and follow the urgent action or escalation plan",
      "Advise the patient to wait until tomorrow",
      "Replace albuterol with a maintenance inhaler without an order",
      "Assume repeated rescue use proves the symptoms are controlled",
    ],
    answer: 0,
    explanation:
      "Worsening symptoms despite repeated rescue use—especially difficulty speaking—can indicate significant respiratory distress and require urgent evaluation.",
  },
  {
    title: "Scenario 2: Mouth Changes",
    patient:
      "A patient who uses fluticasone every day reports hoarseness and new white patches inside the mouth. They say they do not rinse after using the inhaler.",
    question: "Which interpretation is most appropriate?",
    options: [
      "The findings may reflect a local inhaled-corticosteroid effect and should be assessed",
      "Fluticasone is acting as a rescue bronchodilator",
      "The patient should double every dose",
      "The findings prove an oxygen allergy",
    ],
    answer: 0,
    explanation:
      "Inhaled corticosteroids can contribute to oral candidiasis and hoarseness. Technique, mouth rinsing, and clinical assessment are important.",
  },
];

export const moduleFourQuestions = [
  {
    question: "Which medication is most commonly recognized as a quick-relief SABA?",
    options: ["Albuterol", "Fluticasone", "Tiotropium", "Salmeterol"],
    answer: 0,
    explanation: "Albuterol is a short-acting beta agonist used for rapid bronchodilation.",
  },
  {
    question: "Which statement best describes a maintenance respiratory medicine?",
    options: [
      "It is used on a planned schedule to support long-term control",
      "It always works immediately during severe distress",
      "It can be substituted for any rescue medicine",
      "It should be stopped whenever symptoms improve for one hour",
    ],
    answer: 0,
    explanation:
      "Maintenance medicines are generally used consistently as part of a long-term treatment plan.",
  },
  {
    question: "Which medication is a LABA?",
    options: ["Salmeterol", "Albuterol", "Ipratropium", "Prednisone"],
    answer: 0,
    explanation: "Salmeterol is a long-acting beta agonist.",
  },
  {
    question: "Which effect may occur after repeated beta-agonist use?",
    options: ["Tremor and fast heartbeat", "Severe bradycardia as the expected effect", "Black stools", "Low cholesterol"],
    answer: 0,
    explanation:
      "Beta agonists may cause tremor, nervousness, or tachycardia.",
  },
  {
    question: "What is the primary role of an inhaled corticosteroid?",
    options: [
      "Reduce airway inflammation over time",
      "Provide immediate clot reversal",
      "Remove excess fluid",
      "Treat bacterial pneumonia directly",
    ],
    answer: 0,
    explanation:
      "Inhaled corticosteroids are controller medicines that reduce airway inflammation.",
  },
  {
    question: "Which teaching is commonly appropriate after inhaled corticosteroid use?",
    options: [
      "Rinse, gargle, and spit",
      "Lie flat for one hour",
      "Take an extra rescue dose automatically",
      "Store every device in water",
    ],
    answer: 0,
    explanation:
      "Mouth rinsing can reduce local medication residue and mouth or throat effects.",
  },
  {
    question: "Which medication is an inhaled corticosteroid?",
    options: ["Budesonide", "Albuterol", "Ipratropium", "Tiotropium"],
    answer: 0,
    explanation: "Budesonide is an inhaled corticosteroid.",
  },
  {
    question: "Which medication is a short-acting anticholinergic?",
    options: ["Ipratropium", "Tiotropium", "Salmeterol", "Fluticasone"],
    answer: 0,
    explanation: "Ipratropium is a short-acting muscarinic antagonist.",
  },
  {
    question: "Which medication is a long-acting anticholinergic used for maintenance?",
    options: ["Tiotropium", "Albuterol", "Levalbuterol", "Prednisone"],
    answer: 0,
    explanation: "Tiotropium is a long-acting muscarinic antagonist.",
  },
  {
    question: "Which pairing is common in a controller combination inhaler?",
    options: [
      "Inhaled corticosteroid plus LABA",
      "SABA plus statin",
      "Antibiotic plus anticoagulant",
      "Diuretic plus insulin",
    ],
    answer: 0,
    explanation:
      "Many combination controller inhalers pair an inhaled corticosteroid with a LABA.",
  },
  {
    question: "What does a nebulizer do?",
    options: [
      "Turns liquid medication into an inhaled mist",
      "Measures blood glucose",
      "Converts oxygen into carbon dioxide",
      "Automatically selects a medication dose",
    ],
    answer: 0,
    explanation:
      "A nebulizer converts liquid medication into a mist that can be inhaled.",
  },
  {
    question: "Which statement about inhaler devices is safest?",
    options: [
      "Technique must match the exact device and product instructions",
      "All inhalers are used identically",
      "Dose counters can always be ignored",
      "Dry-powder inhalers should always be shaken like an MDI",
    ],
    answer: 0,
    explanation:
      "Different inhaler types require different preparation and inhalation techniques.",
  },
  {
    question: "A patient needs a rescue inhaler every day and symptoms are increasing. What does this suggest?",
    options: [
      "Control may be inadequate and the treatment plan needs prompt review",
      "The maintenance plan is automatically perfect",
      "The rescue inhaler should be replaced with oxygen without assessment",
      "No follow-up is needed",
    ],
    answer: 0,
    explanation:
      "Frequent or increasing quick-relief use can indicate poor control or worsening disease.",
  },
  {
    question: "Which oxygen-safety statement is correct?",
    options: [
      "Keep oxygen away from smoking, sparks, and open flames",
      "Oxygen cylinders may be left unsecured",
      "Oxygen does not affect fire behavior",
      "Anyone may change the prescribed flow rate",
    ],
    answer: 0,
    explanation:
      "Oxygen supports combustion, and equipment and flow settings require appropriate safety controls.",
  },
  {
    question: "A patient is confused, cyanotic, and worsening despite rescue treatment. What is the priority?",
    options: [
      "Urgent emergency assessment and escalation",
      "A routine lesson about device cleaning",
      "Waiting for the next scheduled visit",
      "Independent substitution of another inhaler",
    ],
    answer: 0,
    explanation:
      "Altered mental status, cyanosis, and treatment failure are emergency warning signs.",
  },
];

export const moduleFourSources = [
  {
    label: "MedlinePlus: Asthma Quick-Relief Medicines",
    href: "https://medlineplus.gov/ency/patientinstructions/000008.htm",
  },
  {
    label: "MedlinePlus: Asthma Control Medicines",
    href: "https://medlineplus.gov/ency/patientinstructions/000005.htm",
  },
  {
    label: "MedlinePlus: COPD Quick-Relief Medicines",
    href: "https://medlineplus.gov/ency/patientinstructions/000026.htm",
  },
  {
    label: "MedlinePlus: Inhaler Use With a Spacer",
    href: "https://medlineplus.gov/ency/patientinstructions/000042.htm",
  },
  {
    label: "MedlinePlus: Tiotropium",
    href: "https://medlineplus.gov/druginfo/meds/a604018.html",
  },
];

export const moduleFiveBriefing = {
  title: "Regulate Glucose, Hormones, and Inflammation",
  summary:
    "Learn to recognize major endocrine medicines used for diabetes, thyroid disorders, and corticosteroid therapy. This mission emphasizes insulin timing concepts, hypoglycemia recognition, GLP-1 safety, thyroid replacement, steroid precautions, and knowing when abnormal findings require prompt escalation.",
  objectives: [
    "Distinguish rapid-, short-, intermediate-, and long-acting insulin concepts.",
    "Recognize common non-insulin diabetes medicine classes and their general purposes.",
    "Identify signs of hypoglycemia and appropriate emergency escalation principles.",
    "Explain key GLP-1 receptor agonist safety and medication-verification concerns.",
    "Recognize levothyroxine as thyroid hormone replacement and understand consistent administration principles.",
    "Identify important corticosteroid effects, including infection risk, blood-glucose changes, and the danger of abrupt discontinuation after prolonged use.",
  ],
};

export const moduleFiveLessons = [
  {
    title: "Insulin Types and Timing",
    icon: "💉",
    body:
      "Insulin lowers blood glucose by helping glucose move from the bloodstream into cells. Rapid-acting insulin is commonly associated with meals and begins working quickly. Regular insulin is short acting. NPH is intermediate acting. Long-acting products such as insulin glargine provide basal coverage. Exact onset, peak, duration, concentration, device, and timing must be verified for the specific product.",
    takeaway:
      "Insulin names and timing patterns are recognition clues, but the verified product label and patient-specific order determine safe use.",
    pearl:
      "Never assume that two insulin products are interchangeable. Similar names, different concentrations, and different delivery devices can create high-risk errors.",
    check: {
      question: "Which insulin is commonly recognized as long acting?",
      options: ["Insulin glargine", "Insulin lispro", "Regular insulin", "NPH insulin"],
      answer: 0,
      explanation:
        "Insulin glargine is a long-acting basal insulin. Product-specific instructions still apply.",
    },
  },
  {
    title: "Hypoglycemia Recognition",
    icon: "⚠️",
    body:
      "Hypoglycemia can occur with insulin and selected diabetes medicines. Symptoms may develop quickly and include shaking, sweating, hunger, dizziness, anxiety, irritability, confusion, weakness, or visual changes. Severe hypoglycemia may cause seizure, loss of consciousness, coma, or death. Treatment depends on severity, ability to swallow, the patient's plan, and the clinical setting.",
    takeaway:
      "A glucose value below the patient's safe range plus symptoms requires prompt action according to the established hypoglycemia protocol.",
    pearl:
      "A patient who is unconscious or unable to swallow should not be given food or drink by mouth. Activate the appropriate emergency process.",
    check: {
      question: "Which cluster most strongly suggests hypoglycemia?",
      options: [
        "Shaking, sweating, hunger, and confusion",
        "Dry skin, slow hair growth, and constipation only",
        "Ankle swelling and black stools",
        "Cough and oral thrush",
      ],
      answer: 0,
      explanation:
        "Shaking, sweating, hunger, dizziness, and confusion are common warning signs of low blood glucose.",
    },
  },
  {
    title: "Non-Insulin Diabetes Medicines",
    icon: "🧪",
    body:
      "Type 2 diabetes medicines work in different ways. Metformin reduces liver glucose production and improves insulin sensitivity. Sulfonylureas such as glipizide stimulate insulin release and can contribute to hypoglycemia. SGLT2 inhibitors increase glucose loss through urine and have important hydration, infection, and ketoacidosis precautions. DPP-4 inhibitors and other classes have their own indications and safety profiles.",
    takeaway:
      "Do not treat all diabetes pills as the same. Class, kidney function, meal intake, illness, and patient-specific factors can change the risk.",
    pearl:
      "A patient taking a medicine that can lower glucose who skips meals may have a higher risk of hypoglycemia. Follow the verified plan rather than guessing.",
    check: {
      question: "Which medication is commonly recognized as a biguanide?",
      options: ["Metformin", "Glipizide", "Semaglutide", "Levothyroxine"],
      answer: 0,
      explanation:
        "Metformin is a biguanide commonly used in type 2 diabetes.",
    },
  },
  {
    title: "GLP-1 Receptor Agonists",
    icon: "📉",
    body:
      "GLP-1 receptor agonists include medicines such as semaglutide, liraglutide, and dulaglutide. Depending on the exact product, they may be approved for type 2 diabetes, chronic weight management, or selected cardiovascular-risk reduction. They are not insulin. Nausea, vomiting, reduced appetite, dehydration, gallbladder concerns, pancreatitis symptoms, and product-specific thyroid warnings are important safety themes.",
    takeaway:
      "The brand, active ingredient, strength, indication, and dosing schedule must all match the verified prescription.",
    pearl:
      "Unapproved or improperly compounded products may create dosing and quality risks. Patients should use medicines from appropriate licensed sources and clarify any unfamiliar vial or syringe.",
    check: {
      question: "Which statement about GLP-1 receptor agonists is correct?",
      options: [
        "They are not the same as insulin",
        "They may always replace insulin in type 1 diabetes",
        "Every product has the same dosing schedule",
        "Severe vomiting never requires follow-up",
      ],
      answer: 0,
      explanation:
        "GLP-1 receptor agonists are a separate medication class and are not substitutes for insulin when insulin is required.",
    },
  },
  {
    title: "Thyroid Replacement",
    icon: "🦋",
    body:
      "Levothyroxine replaces thyroid hormone in hypothyroidism. It is commonly taken consistently on an empty stomach, often 30 to 60 minutes before breakfast, according to the prescription. Food, calcium, iron, antacids, and other medicines can affect absorption. Dose changes are guided by clinical assessment and laboratory monitoring. Excess thyroid hormone may cause palpitations, tremor, sweating, anxiety, or chest discomfort.",
    takeaway:
      "Consistency matters with levothyroxine: timing, product, interactions, and follow-up laboratory testing all affect therapy.",
    pearl:
      "Levothyroxine is not a weight-loss medicine. Large or inappropriate doses can cause serious cardiovascular effects.",
    check: {
      question: "Which medication replaces thyroid hormone?",
      options: ["Levothyroxine", "Prednisone", "Metformin", "Glucagon"],
      answer: 0,
      explanation:
        "Levothyroxine is synthetic thyroid hormone used to treat hypothyroidism.",
    },
  },
  {
    title: "Corticosteroids and Sick-Day Safety",
    icon: "🛡️",
    body:
      "Systemic corticosteroids such as prednisone reduce inflammation and suppress immune activity. They may raise blood glucose, increase infection risk, affect mood and sleep, cause fluid retention, and create other effects depending on dose and duration. After prolonged therapy, abrupt discontinuation can be dangerous because the body may not immediately produce enough natural cortisol. Illness can also destabilize diabetes even when usual medicines are taken.",
    takeaway:
      "Corticosteroids and sick days can change glucose and hormone needs. Follow the patient's written plan and seek help for persistent abnormal glucose, vomiting, confusion, or inability to keep fluids down.",
    pearl:
      "A patient taking long-term corticosteroids should not independently stop the medicine suddenly. Tapering decisions require the prescribing clinician.",
    check: {
      question: "Which statement about prolonged corticosteroid therapy is safest?",
      options: [
        "It should not be stopped abruptly without prescriber guidance",
        "It never affects blood glucose",
        "It always improves infection resistance",
        "The dose should be doubled whenever sleep is poor",
      ],
      answer: 0,
      explanation:
        "Abrupt discontinuation after prolonged corticosteroid use can cause adrenal insufficiency and requires clinical guidance.",
    },
  },
];

export const moduleFiveScenarios = [
  {
    title: "Scenario 1: Low Glucose and Confusion",
    patient:
      "A patient who received insulin becomes sweaty, shaky, and confused. A glucose check is below the patient's prescribed safe range.",
    question: "What is the safest general response?",
    options: [
      "Follow the hypoglycemia protocol immediately and assess the patient's ability to swallow",
      "Give another insulin dose",
      "Wait for the next scheduled meal without reassessment",
      "Assume confusion is unrelated to glucose",
    ],
    answer: 0,
    explanation:
      "Symptoms plus a low glucose reading require prompt treatment according to the established protocol. Route depends on alertness and swallowing ability.",
  },
  {
    title: "Scenario 2: Vomiting With a GLP-1 Medicine",
    patient:
      "A patient using semaglutide reports repeated vomiting, severe abdominal pain, and difficulty keeping fluids down.",
    question: "Which response is most appropriate?",
    options: [
      "Promptly contact the healthcare team or seek urgent evaluation based on severity",
      "Take an extra dose to replace the medicine lost through vomiting",
      "Ignore the symptoms because nausea is always harmless",
      "Substitute insulin without an order",
    ],
    answer: 0,
    explanation:
      "Persistent vomiting, severe abdominal pain, and dehydration risk require prompt clinical assessment and may signal a serious adverse effect.",
  },
];

export const moduleFiveQuestions = [
  {
    question: "What is insulin's primary glucose-lowering role?",
    options: [
      "Help glucose move from the bloodstream into cells",
      "Block all carbohydrate absorption permanently",
      "Increase liver glucose release",
      "Replace thyroid hormone",
    ],
    answer: 0,
    explanation:
      "Insulin helps cells use and store glucose, lowering blood glucose.",
  },
  {
    question: "Which insulin is rapid acting?",
    options: ["Insulin lispro", "Insulin glargine", "NPH insulin", "Regular insulin"],
    answer: 0,
    explanation:
      "Insulin lispro is a rapid-acting insulin commonly associated with meal coverage.",
  },
  {
    question: "Which insulin is intermediate acting?",
    options: ["NPH insulin", "Insulin lispro", "Insulin glargine", "Insulin degludec"],
    answer: 0,
    explanation:
      "NPH is an intermediate-acting insulin.",
  },
  {
    question: "Which symptom group most strongly suggests hypoglycemia?",
    options: [
      "Sweating, shaking, hunger, and confusion",
      "Constipation, dry skin, and cold sensitivity",
      "Cough, fever, and sputum",
      "Edema, black stools, and bruising",
    ],
    answer: 0,
    explanation:
      "Hypoglycemia often develops quickly with autonomic and neurologic symptoms.",
  },
  {
    question: "A patient with severe hypoglycemia is unconscious. What is unsafe?",
    options: [
      "Giving food or drink by mouth",
      "Activating the emergency process",
      "Checking the glucose when possible",
      "Following the prescribed glucagon or emergency protocol",
    ],
    answer: 0,
    explanation:
      "An unconscious person cannot safely swallow and is at risk for aspiration.",
  },
  {
    question: "Which medication is a biguanide?",
    options: ["Metformin", "Glipizide", "Semaglutide", "Prednisone"],
    answer: 0,
    explanation:
      "Metformin is a biguanide.",
  },
  {
    question: "Which class can stimulate insulin release and increase hypoglycemia risk?",
    options: ["Sulfonylureas", "Thyroid hormones", "Inhaled corticosteroids", "Statins"],
    answer: 0,
    explanation:
      "Sulfonylureas such as glipizide increase insulin secretion and may cause hypoglycemia.",
  },
  {
    question: "Which medicine is a GLP-1 receptor agonist?",
    options: ["Semaglutide", "Levothyroxine", "Prednisone", "Insulin glargine"],
    answer: 0,
    explanation:
      "Semaglutide is a GLP-1 receptor agonist.",
  },
  {
    question: "Which statement about GLP-1 medicines is correct?",
    options: [
      "The exact product, strength, and schedule must be verified",
      "All products use identical doses",
      "They are insulin",
      "They are appropriate substitutes for required insulin in type 1 diabetes",
    ],
    answer: 0,
    explanation:
      "GLP-1 products differ in indication, strength, formulation, and dosing schedule.",
  },
  {
    question: "Which symptom combination during GLP-1 therapy needs prompt assessment?",
    options: [
      "Severe abdominal pain with persistent vomiting",
      "A brief mild appetite change only",
      "A normal pulse",
      "Stable hydration",
    ],
    answer: 0,
    explanation:
      "Severe abdominal pain and persistent vomiting may indicate a serious adverse effect or dehydration.",
  },
  {
    question: "Which medication is used for thyroid hormone replacement?",
    options: ["Levothyroxine", "Glucagon", "Metformin", "Dulaglutide"],
    answer: 0,
    explanation:
      "Levothyroxine replaces thyroid hormone in hypothyroidism.",
  },
  {
    question: "Which administration principle is commonly associated with levothyroxine?",
    options: [
      "Take it consistently on an empty stomach as directed",
      "Change the timing every day",
      "Take extra doses for weight loss",
      "Stop when energy improves for one day",
    ],
    answer: 0,
    explanation:
      "Consistent timing and attention to food and medication interactions support reliable absorption.",
  },
  {
    question: "Which finding may suggest excessive thyroid hormone effect?",
    options: [
      "Rapid heartbeat, tremor, and sweating",
      "Slow breathing after an opioid",
      "Black stools",
      "Oral thrush",
    ],
    answer: 0,
    explanation:
      "Excess thyroid hormone may produce hyperthyroid-like cardiovascular and neurologic symptoms.",
  },
  {
    question: "Which effect can occur with systemic corticosteroids?",
    options: [
      "Higher blood glucose and increased infection risk",
      "Guaranteed lower blood glucose",
      "Permanent immunity to infection",
      "Immediate thyroid replacement",
    ],
    answer: 0,
    explanation:
      "Systemic corticosteroids can raise glucose and suppress immune function.",
  },
  {
    question: "A patient with diabetes is ill, vomiting, and has glucose that will not return to the target range. What is safest?",
    options: [
      "Follow the sick-day plan and contact the healthcare team promptly",
      "Stop every medicine without guidance",
      "Wait several days despite worsening symptoms",
      "Double all diabetes medicines automatically",
    ],
    answer: 0,
    explanation:
      "Illness can destabilize glucose control. Persistent abnormal glucose, vomiting, or confusion requires prompt guidance.",
  },
];

export const moduleFiveSources = [
  {
    label: "MedlinePlus: Diabetes Medicines",
    href: "https://medlineplus.gov/diabetesmedicines.html",
  },
  {
    label: "MedlinePlus: Insulin Therapy",
    href: "https://medlineplus.gov/ency/patientinstructions/000965.htm",
  },
  {
    label: "MedlinePlus: Hypoglycemia",
    href: "https://medlineplus.gov/hypoglycemia.html",
  },
  {
    label: "MedlinePlus: Levothyroxine",
    href: "https://medlineplus.gov/druginfo/meds/a682461.html",
  },
  {
    label: "MedlinePlus: Semaglutide",
    href: "https://medlineplus.gov/druginfo/meds/a619057.html",
  },
  {
    label: "FDA: Diabetes Medicines",
    href: "https://www.fda.gov/consumers/womens-health-topics/women-and-diabetes-diabetes-medicines",
  },
];

export const moduleSixBriefing = {
  title: "Protect Digestion, Kidney Function, and Electrolyte Balance",
  summary:
    "Learn to recognize common gastrointestinal medicines, renal medication precautions, and electrolyte replacement risks. This mission emphasizes medication purpose, red-flag symptoms, kidney-function considerations, and safe escalation rather than independent treatment decisions.",
  objectives: [
    "Distinguish proton pump inhibitors, H2 blockers, antacids, and mucosal-protective medicines.",
    "Recognize common antiemetic, laxative, stool-softener, and antidiarrheal classes.",
    "Identify gastrointestinal warning signs that require prompt evaluation.",
    "Explain why kidney function can change medication dosing, accumulation, and toxicity risk.",
    "Recognize major potassium, magnesium, calcium, sodium, and phosphate replacement precautions.",
    "Apply dialysis and medication-timing concepts using the verified prescription and organizational policy.",
  ],
};

export const moduleSixLessons = [
  {
    title: "Acid-Reducing and Protective Medicines",
    icon: "🔥",
    body:
      "Proton pump inhibitors such as omeprazole and pantoprazole strongly reduce stomach-acid production. H2 blockers such as famotidine also reduce acid through a different mechanism. Antacids neutralize existing acid and can interact with the absorption of other medicines. Sucralfate forms a protective barrier over irritated tissue and also requires attention to administration timing.",
    takeaway:
      "The class provides an important clue, but indication, duration, timing, kidney function, and interacting medicines determine safe use.",
    pearl:
      "Persistent reflux symptoms, difficulty swallowing, unexplained weight loss, vomiting blood, or black tarry stools should not be treated as routine indigestion.",
    check: {
      question: "Which medication is a proton pump inhibitor?",
      options: ["Pantoprazole", "Famotidine", "Calcium carbonate", "Ondansetron"],
      answer: 0,
      explanation: "Pantoprazole is a proton pump inhibitor that suppresses gastric-acid production.",
    },
  },
  {
    title: "Antiemetics and Hydration Risk",
    icon: "🤢",
    body:
      "Antiemetics treat nausea and vomiting through different pathways. Ondansetron blocks serotonin receptors and may affect the QT interval in susceptible patients. Metoclopramide promotes gastric movement but may cause movement-related adverse effects. Promethazine can cause sedation and has route-specific safety concerns. The underlying cause of vomiting and the patient's hydration status still require assessment.",
    takeaway:
      "Stopping nausea is not the same as correcting dehydration, electrolyte loss, bowel obstruction, infection, or another serious cause.",
    pearl:
      "Repeated vomiting, severe abdominal pain, confusion, fainting, blood in vomit, or inability to keep fluids down warrants prompt clinical evaluation.",
    check: {
      question: "Which medication is commonly used as an antiemetic?",
      options: ["Ondansetron", "Omeprazole", "Loperamide", "Potassium chloride"],
      answer: 0,
      explanation: "Ondansetron is an antiemetic commonly used to prevent or treat nausea and vomiting.",
    },
  },
  {
    title: "Constipation Medicines and Obstruction Warnings",
    icon: "🚽",
    body:
      "Constipation medicines include bulk-forming agents, osmotic laxatives, stimulant laxatives, and stool softeners. Psyllium requires adequate fluid intake. Polyethylene glycol draws water into the bowel. Senna and bisacodyl stimulate intestinal movement. Docusate softens stool. Choice depends on the cause, duration, comorbidities, hydration, and whether obstruction is possible.",
    takeaway:
      "Do not automatically give a laxative when severe pain, vomiting, abdominal swelling, absent bowel sounds, or inability to pass gas suggests possible obstruction.",
    pearl:
      "Long-term or excessive laxative use can contribute to dehydration and electrolyte imbalance. Follow the individualized bowel regimen.",
    check: {
      question: "Which medication is an osmotic laxative?",
      options: ["Polyethylene glycol", "Loperamide", "Famotidine", "Ondansetron"],
      answer: 0,
      explanation: "Polyethylene glycol is an osmotic laxative that increases water in the stool.",
    },
  },
  {
    title: "Antidiarrheals and Red Flags",
    icon: "💧",
    body:
      "Loperamide slows intestinal movement and may help selected patients with uncomplicated diarrhea. Bismuth subsalicylate has antisecretory and antimicrobial effects but carries salicylate-related precautions and can darken the tongue or stool. Antidiarrheals may be inappropriate when diarrhea is bloody, accompanied by high fever, associated with severe abdominal pain, or caused by certain infections.",
    takeaway:
      "Hydration and cause matter. Suppressing intestinal movement can be harmful in selected infectious or inflammatory conditions.",
    pearl:
      "Recent antibiotic use followed by frequent watery diarrhea raises concern for Clostridioides difficile and requires clinical evaluation rather than routine self-treatment.",
    check: {
      question: "Which finding makes routine antidiarrheal use less appropriate without clinical guidance?",
      options: ["Bloody diarrhea with fever", "One loose stool after a dietary change", "Normal hydration", "Improving symptoms"],
      answer: 0,
      explanation: "Bloody diarrhea and fever may indicate invasive infection or inflammation requiring prompt assessment.",
    },
  },
  {
    title: "Kidney Function and Medication Accumulation",
    icon: "🫘",
    body:
      "The kidneys remove many medicines and metabolites from the body. Reduced kidney function can allow a drug to accumulate, increasing adverse-effect risk. Estimated glomerular filtration rate, serum creatinine trends, urine output, age, hydration, and dialysis status may influence medication selection or dosing. Nephrotoxic medicines and contrast exposure require particular attention in at-risk patients.",
    takeaway:
      "A familiar dose may be unsafe when kidney function changes. Verify renal dosing rather than relying on memory.",
    pearl:
      "A sudden fall in urine output, rapidly rising creatinine, new confusion, severe weakness, or fluid overload should be escalated promptly.",
    check: {
      question: "Why might a medication dose need adjustment in reduced kidney function?",
      options: ["The drug may accumulate and cause toxicity", "All drugs become inactive", "The stomach stops absorbing medicine", "Kidney disease prevents every interaction"],
      answer: 0,
      explanation: "Reduced renal clearance can increase medication concentration and toxicity risk.",
    },
  },
  {
    title: "Electrolyte Replacement and Dialysis Safety",
    icon: "⚡",
    body:
      "Potassium, magnesium, calcium, sodium, and phosphate are essential but can be dangerous when replaced incorrectly. Concentration, route, infusion rate, kidney function, cardiac rhythm, and repeat laboratory testing matter. Potassium chloride is a high-alert medicine and must never be administered by direct intravenous push. Dialysis can remove some medicines and electrolytes while leaving others relatively unaffected, so timing must follow the verified dialysis plan.",
    takeaway:
      "Electrolyte replacement is guided by the laboratory result, symptoms, route, renal function, and monitoring plan—not by the supplement name alone.",
    pearl:
      "Potassium abnormalities can trigger life-threatening arrhythmias. Severe weakness, palpitations, chest symptoms, or ECG changes require urgent escalation.",
    check: {
      question: "Which statement about intravenous potassium chloride is correct?",
      options: ["It must never be given by direct IV push", "It can be pushed rapidly in any peripheral IV", "It requires no monitoring", "It is safe regardless of kidney function"],
      answer: 0,
      explanation: "Concentrated potassium chloride is high alert and must be diluted and infused according to strict policy; direct IV push can be fatal.",
    },
  },
];

export const moduleSixScenarios = [
  {
    title: "Scenario 1: Constipation or Possible Obstruction?",
    patient:
      "A patient requests a laxative but reports severe cramping, repeated vomiting, abdominal distention, and inability to pass gas.",
    question: "What is the safest response?",
    options: [
      "Hold routine laxative treatment and promptly escalate for evaluation",
      "Give the strongest stimulant laxative available",
      "Encourage a large meal and wait several days",
      "Assume the symptoms are uncomplicated constipation",
    ],
    answer: 0,
    explanation:
      "Severe pain, vomiting, distention, and inability to pass gas may indicate bowel obstruction. Routine laxatives may be inappropriate until evaluated.",
  },
  {
    title: "Scenario 2: Potassium Replacement With Reduced Kidney Function",
    patient:
      "A patient with worsening kidney function has a potassium replacement order. The newest potassium result is higher than the previous value, and urine output has fallen substantially.",
    question: "What should happen before administration?",
    options: [
      "Verify the current laboratory result and clarify the order promptly",
      "Administer the dose because potassium orders never change",
      "Give the medication by direct IV push",
      "Ignore urine output because it does not affect potassium handling",
    ],
    answer: 0,
    explanation:
      "Reduced kidney function can impair potassium removal. A rising level and low urine output require verification and clinical clarification before replacement.",
  },
];

export const moduleSixQuestions = [
  { question: "Which medication is a proton pump inhibitor?", options: ["Omeprazole", "Famotidine", "Ondansetron", "Loperamide"], answer: 0, explanation: "Omeprazole is a proton pump inhibitor." },
  { question: "Which medication is an H2 receptor blocker?", options: ["Famotidine", "Pantoprazole", "Sucralfate", "Metoclopramide"], answer: 0, explanation: "Famotidine is an H2 blocker that reduces gastric-acid secretion." },
  { question: "Which finding is a gastrointestinal bleeding warning sign?", options: ["Black tarry stool", "Mild hiccups", "Normal appetite", "One episode of heartburn"], answer: 0, explanation: "Black tarry stool may represent digested blood and requires evaluation." },
  { question: "Which medication is commonly used to treat nausea and vomiting?", options: ["Ondansetron", "Psyllium", "Loperamide", "Calcium carbonate"], answer: 0, explanation: "Ondansetron is an antiemetic." },
  { question: "Which antiemetic may cause movement-related adverse effects?", options: ["Metoclopramide", "Famotidine", "Omeprazole", "Docusate"], answer: 0, explanation: "Metoclopramide can cause extrapyramidal symptoms and tardive dyskinesia." },
  { question: "Which medication is a stimulant laxative?", options: ["Senna", "Docusate", "Psyllium", "Loperamide"], answer: 0, explanation: "Senna stimulates intestinal motility." },
  { question: "Which symptom pattern suggests possible bowel obstruction?", options: ["Severe pain, vomiting, distention, and inability to pass gas", "Mild constipation after travel", "Normal bowel sounds and appetite", "One firm stool"], answer: 0, explanation: "This combination is a red flag for obstruction and requires evaluation." },
  { question: "Which medication slows intestinal movement?", options: ["Loperamide", "Polyethylene glycol", "Senna", "Metoclopramide"], answer: 0, explanation: "Loperamide decreases intestinal motility." },
  { question: "When should diarrhea receive prompt clinical evaluation?", options: ["When it is bloody or accompanied by high fever", "When hydration is normal and symptoms are resolving", "After one loose stool", "Whenever a person eats fiber"], answer: 0, explanation: "Bloody diarrhea or high fever may signal invasive infection or inflammation." },
  { question: "Why is kidney function important in medication dosing?", options: ["Reduced clearance may cause drug accumulation", "It changes every drug into insulin", "It eliminates all adverse effects", "It prevents oral absorption"], answer: 0, explanation: "Many drugs depend on renal clearance, so reduced function may increase toxicity risk." },
  { question: "Which value commonly helps estimate renal medication clearance?", options: ["Estimated glomerular filtration rate", "Visual acuity", "Respiratory rate alone", "Body temperature alone"], answer: 0, explanation: "eGFR is one measure used when assessing renal function, though product-specific dosing guidance may use other calculations." },
  { question: "Which electrolyte replacement is considered high alert?", options: ["Potassium chloride", "Dietary fiber", "Calcium carbonate antacid", "Docusate"], answer: 0, explanation: "Potassium chloride carries a high risk of severe harm if prepared or administered incorrectly." },
  { question: "How should concentrated potassium chloride be administered?", options: ["Only after proper dilution and by controlled infusion according to policy", "By direct IV push", "Without checking kidney function", "As rapidly as possible"], answer: 0, explanation: "Potassium must be diluted and infused under strict safeguards; direct IV push is unsafe." },
  { question: "Which finding can accompany a dangerous electrolyte abnormality?", options: ["New palpitations and severe weakness", "Stable energy and normal rhythm", "Improving hydration", "Normal laboratory values"], answer: 0, explanation: "Electrolyte abnormalities can affect muscles and cardiac conduction, producing weakness or arrhythmias." },
  { question: "What determines whether a medicine should be given before or after dialysis?", options: ["The verified drug-specific dialysis plan", "A universal rule for all medicines", "The tablet color", "The patient's breakfast preference alone"], answer: 0, explanation: "Dialyzability differs among medicines, so timing must follow drug-specific and patient-specific guidance." },
];

export const moduleSixSources = [
  { label: "MedlinePlus: GERD", href: "https://medlineplus.gov/gerd.html" },
  { label: "MedlinePlus: Nausea and Vomiting", href: "https://medlineplus.gov/nauseaandvomiting.html" },
  { label: "MedlinePlus: Constipation", href: "https://medlineplus.gov/constipation.html" },
  { label: "MedlinePlus: Diarrhea", href: "https://medlineplus.gov/diarrhea.html" },
  { label: "NIDDK: Keeping Kidneys Safe", href: "https://www.niddk.nih.gov/health-information/kidney-disease/keeping-kidneys-safe" },
  { label: "FDA: Safe Use of Medicines", href: "https://www.fda.gov/drugs/resources-you-drugs/safe-use-medicines" },
];

export const moduleSevenBriefing = {
  title: "Target the Germ and Protect the Patient",
  summary:
    "Learn to recognize major antibacterial, antiviral, antifungal, and antiparasitic medication concepts. This mission emphasizes matching the medicine to the organism, obtaining cultures when ordered, allergy and interaction screening, antimicrobial stewardship, severe reaction recognition, and prompt escalation when infection is worsening.",
  objectives: [
    "Explain why antibacterial medicines do not treat viral infections.",
    "Recognize common antibiotic classes and major safety themes.",
    "Distinguish expected side effects from severe allergy, toxicity, and treatment failure.",
    "Identify important antiviral, antifungal, and antiparasitic medication concepts.",
    "Explain the purpose of cultures, susceptibility testing, and antimicrobial stewardship.",
    "Recognize red flags such as anaphylaxis, sepsis, severe antibiotic-associated diarrhea, and worsening infection.",
  ],
};

export const moduleSevenLessons = [
  {
    title: "Match the Medicine to the Organism",
    icon: "🦠",
    body:
      "Antimicrobial medicines are selected according to the suspected or confirmed organism, infection site, patient factors, local resistance patterns, and test results. Antibiotics treat selected bacterial infections; they do not treat viruses such as influenza or the common cold. Antivirals, antifungals, and antiparasitic medicines target different organisms and are not interchangeable.",
    takeaway:
      "The word infection does not automatically mean antibiotic. Identify the likely organism and follow the verified treatment plan.",
    pearl:
      "Using an antibiotic when it is not needed can still cause harm and contributes to antimicrobial resistance.",
    check: {
      question: "Which statement is correct?",
      options: [
        "Antibiotics treat selected bacterial infections, not viral infections",
        "Antibiotics cure influenza",
        "All antimicrobial medicines treat the same organisms",
        "A fever always proves a bacterial infection",
      ],
      answer: 0,
      explanation:
        "Antibiotics act against selected bacteria. Viral, fungal, and parasitic infections require different evaluation and treatment.",
    },
  },
  {
    title: "Common Antibiotic Classes",
    icon: "💊",
    body:
      "Penicillins include amoxicillin and related medicines. Cephalosporins include cephalexin and ceftriaxone. Macrolides include azithromycin. Tetracyclines include doxycycline. Fluoroquinolones include ciprofloxacin and levofloxacin. Sulfonamide combinations include trimethoprim-sulfamethoxazole. Each class has different coverage, dosing, interactions, organ-function considerations, and adverse-effect risks.",
    takeaway:
      "Class recognition is only the starting point. The infection, culture data, allergy history, kidney or liver function, and verified order determine safe therapy.",
    pearl:
      "Fluoroquinolones carry important warnings involving tendons, nerves, the central nervous system, and other serious effects. New tendon pain, weakness, numbness, or major neurologic symptoms require prompt follow-up.",
    check: {
      question: "Which medication is a macrolide antibiotic?",
      options: ["Azithromycin", "Amoxicillin", "Doxycycline", "Fluconazole"],
      answer: 0,
      explanation:
        "Azithromycin is a macrolide antibiotic.",
    },
  },
  {
    title: "Allergy, Anaphylaxis, and Safe Administration",
    icon: "🚨",
    body:
      "Before an antimicrobial is administered, verify the documented allergy, the reaction, its severity, and when it occurred. Mild nausea is not the same as an immune-mediated allergy. Hives, facial or tongue swelling, wheezing, difficulty breathing, hypotension, or rapidly progressing symptoms may signal anaphylaxis and require immediate emergency action. Infusion-related reactions and severe skin reactions also require prompt assessment.",
    takeaway:
      "Do not rely on the word allergy alone. Clarify the reaction—but never delay emergency treatment for signs of anaphylaxis.",
    pearl:
      "A new widespread rash with blistering, skin peeling, mouth sores, or eye involvement is a medical emergency and may represent a severe cutaneous reaction.",
    check: {
      question: "Which finding most strongly suggests anaphylaxis?",
      options: [
        "Hives with tongue swelling and difficulty breathing",
        "Mild temporary nausea",
        "A metallic taste",
        "One loose stool",
      ],
      answer: 0,
      explanation:
        "Airway swelling, breathing difficulty, hives, and circulatory symptoms require immediate emergency response.",
    },
  },
  {
    title: "Cultures, Timing, and Stewardship",
    icon: "🧫",
    body:
      "Cultures help identify an organism, and susceptibility testing helps determine which medicines may be effective. When ordered and clinically appropriate, cultures are often collected before the first antimicrobial dose, but urgent treatment should not be delayed when the patient is unstable. Broad-spectrum therapy may be narrowed when results return. Stewardship means using the right medicine, dose, route, and duration while reassessing the need for continued treatment.",
    takeaway:
      "Collect the correct specimen at the correct time, then act on culture and susceptibility results according to the clinical plan.",
    pearl:
      "Never save antibiotics for later, share them, or use someone else's prescription. These practices can delay correct treatment and increase harm.",
    check: {
      question: "What is a major purpose of antimicrobial stewardship?",
      options: [
        "Improve treatment while reducing avoidable harm and resistance",
        "Give the broadest antibiotic to every patient",
        "Treat all viral illnesses with antibiotics",
        "Continue every antibiotic indefinitely",
      ],
      answer: 0,
      explanation:
        "Stewardship aims to optimize antimicrobial selection, dosing, route, duration, and reassessment.",
    },
  },
  {
    title: "Antivirals, Antifungals, and Antiparasitics",
    icon: "🔬",
    body:
      "Antivirals act against specific viruses. Examples include oseltamivir for influenza, acyclovir or valacyclovir for herpes viruses, and combination antiretroviral therapy for HIV. Antifungals include fluconazole, nystatin, and terbinafine, while serious invasive infections may require other agents. Antiparasitic medicines vary widely by organism. Timing, interactions, organ function, pregnancy status, and the exact diagnosis matter.",
    takeaway:
      "Antiviral, antifungal, and antiparasitic medicines are organism-specific; one product cannot be substituted for another without verification.",
    pearl:
      "Some antivirals work best when started early in the illness. Prompt testing and treatment decisions can matter for high-risk patients.",
    check: {
      question: "Which medication is an antifungal?",
      options: ["Fluconazole", "Azithromycin", "Oseltamivir", "Amoxicillin"],
      answer: 0,
      explanation:
        "Fluconazole is an antifungal medicine.",
    },
  },
  {
    title: "Treatment Failure, C. diff, and Sepsis Red Flags",
    icon: "🩺",
    body:
      "Infection should be reassessed when symptoms worsen, fever persists, the patient cannot keep medicine down, new organ dysfunction appears, or culture results do not support the current therapy. Antibiotic-associated diarrhea may be mild, but frequent watery diarrhea, abdominal pain, fever, dehydration, or symptoms during or after antibiotic use can indicate Clostridioides difficile infection. Confusion, low blood pressure, breathing difficulty, very rapid heart rate, mottled skin, or reduced urine output may signal sepsis.",
    takeaway:
      "Worsening infection, severe diarrhea, or signs of organ dysfunction require prompt escalation—not simply another routine dose.",
    pearl:
      "Do not automatically treat significant antibiotic-associated diarrhea with an antidiarrheal. The cause must be evaluated, especially when C. diff is possible.",
    check: {
      question: "Which situation requires prompt clinical evaluation?",
      options: [
        "Frequent watery diarrhea with abdominal pain after recent antibiotics",
        "Symptoms steadily improving",
        "One mild, isolated loose stool",
        "A completed prescription with no concerns",
      ],
      answer: 0,
      explanation:
        "Significant diarrhea during or after antibiotics may indicate C. diff and can become severe.",
    },
  },
];

export const moduleSevenScenarios = [
  {
    title: "Scenario 1: Possible Immediate Allergic Reaction",
    patient:
      "Minutes after an antibiotic begins infusing, a patient develops hives, wheezing, tongue swelling, and dizziness.",
    question: "What is the safest response?",
    options: [
      "Stop the infusion and activate the emergency response for suspected anaphylaxis",
      "Slow the infusion and reassess at the end of the shift",
      "Give the next dose early",
      "Document nausea as the only reaction",
    ],
    answer: 0,
    explanation:
      "Hives, airway swelling, wheezing, and dizziness are compatible with anaphylaxis and require immediate emergency management.",
  },
  {
    title: "Scenario 2: Diarrhea After Antibiotics",
    patient:
      "A patient recently treated with antibiotics now has frequent watery stools, fever, abdominal tenderness, and increasing weakness.",
    question: "What is the best next step?",
    options: [
      "Promptly notify the healthcare team and evaluate for antibiotic-associated infection such as C. diff",
      "Automatically give loperamide and delay evaluation",
      "Restart the leftover antibiotic at home",
      "Assume the symptoms are harmless because the antibiotic course is finished",
    ],
    answer: 0,
    explanation:
      "C. diff can occur during or after antibiotic exposure and may cause severe colitis, dehydration, and systemic illness.",
  },
];

export const moduleSevenQuestions = [
  { question: "What do antibiotics treat?", options: ["Selected bacterial infections", "All viral infections", "Every fungal infection", "Every fever"], answer: 0, explanation: "Antibiotics target selected bacteria and do not treat viral illnesses such as colds or influenza." },
  { question: "Which medication is a penicillin-class antibiotic?", options: ["Amoxicillin", "Azithromycin", "Doxycycline", "Fluconazole"], answer: 0, explanation: "Amoxicillin is a penicillin-class antibiotic." },
  { question: "Which medication is a cephalosporin?", options: ["Cephalexin", "Oseltamivir", "Metronidazole", "Nystatin"], answer: 0, explanation: "Cephalexin is a cephalosporin antibiotic." },
  { question: "Which medication is a tetracycline antibiotic?", options: ["Doxycycline", "Amoxicillin", "Ceftriaxone", "Acyclovir"], answer: 0, explanation: "Doxycycline is a tetracycline antibiotic." },
  { question: "Which medication is a fluoroquinolone?", options: ["Ciprofloxacin", "Azithromycin", "Fluconazole", "Valacyclovir"], answer: 0, explanation: "Ciprofloxacin is a fluoroquinolone antibiotic." },
  { question: "Which new symptom during fluoroquinolone therapy needs prompt follow-up?", options: ["Tendon pain or new numbness", "Stable appetite", "Normal urine color", "Improving fever"], answer: 0, explanation: "Fluoroquinolones have serious warnings involving tendons, nerves, and the central nervous system." },
  { question: "Which symptom pattern suggests anaphylaxis?", options: ["Hives, tongue swelling, wheezing, and dizziness", "Mild nausea only", "A temporary bad taste", "One episode of heartburn"], answer: 0, explanation: "Anaphylaxis may rapidly affect the skin, airway, breathing, and circulation." },
  { question: "What should be clarified when a patient reports an antibiotic allergy?", options: ["The exact reaction, severity, and timing", "Only the tablet color", "The pharmacy parking location", "Nothing; all reactions are identical"], answer: 0, explanation: "The nature and severity of the reaction help guide safe clinical decisions." },
  { question: "What does susceptibility testing help determine?", options: ["Which antimicrobial may be effective against the organism", "Whether the patient has a fracture", "The patient's blood type", "Whether a virus is always present"], answer: 0, explanation: "Susceptibility results help guide targeted antimicrobial treatment." },
  { question: "Which action supports antimicrobial stewardship?", options: ["Reassess therapy and narrow treatment when appropriate", "Use antibiotics for every cold", "Share leftover antibiotics", "Continue treatment without reviewing results"], answer: 0, explanation: "Stewardship promotes appropriate selection, dosing, route, duration, and reassessment." },
  { question: "Which medication is an antiviral used for influenza?", options: ["Oseltamivir", "Amoxicillin", "Fluconazole", "Cephalexin"], answer: 0, explanation: "Oseltamivir is an antiviral used for influenza in selected patients." },
  { question: "Which medication is commonly used for herpes viruses?", options: ["Acyclovir", "Azithromycin", "Ceftriaxone", "Terbinafine"], answer: 0, explanation: "Acyclovir is an antiviral used for selected herpes-virus infections." },
  { question: "Which medication is an antifungal?", options: ["Fluconazole", "Levofloxacin", "Amoxicillin", "Oseltamivir"], answer: 0, explanation: "Fluconazole is an antifungal." },
  { question: "Which finding raises concern for C. diff after antibiotic use?", options: ["Frequent watery diarrhea with abdominal pain and fever", "A normal formed stool", "Improving appetite", "No gastrointestinal symptoms"], answer: 0, explanation: "C. diff can cause significant diarrhea and colitis during or after antibiotic exposure." },
  { question: "Which finding may signal sepsis or worsening systemic infection?", options: ["New confusion, low blood pressure, and reduced urine output", "Steady improvement and normal vital signs", "A healed incision", "Normal mentation and hydration"], answer: 0, explanation: "Changes in mental status, circulation, breathing, or organ function require urgent evaluation." },
];

export const moduleSevenSources = [
  { label: "CDC: Antibiotic Do's and Don'ts", href: "https://www.cdc.gov/antibiotic-use/about/" },
  { label: "CDC: Antibiotic Use and Antimicrobial Resistance", href: "https://www.cdc.gov/antibiotic-use/data-research/facts-stats/index.html" },
  { label: "CDC: Core Elements of Antibiotic Stewardship", href: "https://www.cdc.gov/antibiotic-use/hcp/core-elements/" },
  { label: "CDC: About C. diff", href: "https://www.cdc.gov/c-diff/about/index.html" },
  { label: "MedlinePlus: Antibiotics", href: "https://medlineplus.gov/antibiotics.html" },
  { label: "FDA: Fluoroquinolone Safety Communication", href: "https://www.fda.gov/drugs/drug-safety-and-availability/fda-updates-warnings-oral-and-injectable-fluoroquinolone-antibiotics-due-disabling-side-effects" },
];

