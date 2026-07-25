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

