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

