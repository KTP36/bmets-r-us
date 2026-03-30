const anatomyQuestions = [
  {
    question: "Which chamber of the heart receives oxygen-poor blood?",
    options: ["Left atrium", "Right atrium", "Left ventricle", "Right ventricle"],
    answer: 1,
    explanation: "The right atrium receives deoxygenated blood from the body.",
    difficulty: "easy",
    category: "Heart",
  },
  {
    question: "Which lobe processes vision?",
    options: ["Frontal", "Parietal", "Occipital", "Temporal"],
    answer: 2,
    explanation: "The occipital lobe processes visual information.",
    difficulty: "easy",
    category: "Brain",
  },
  {
    question: "Where does gas exchange occur?",
    options: ["Bronchi", "Alveoli", "Trachea", "Pleura"],
    answer: 1,
    explanation: "Gas exchange occurs in the alveoli.",
    difficulty: "easy",
    category: "Lungs",
  },
  {
    question: "Which chamber of the heart pumps oxygenated blood to the body?",
    options: ["Right atrium", "Right ventricle", "Left atrium", "Left ventricle"],
    answer: 3,
    explanation: "The left ventricle pumps oxygenated blood into the aorta and systemic circulation."
  },
  {
    question: "What organ filters blood to produce urine?",
    options: ["Liver", "Kidneys", "Pancreas", "Spleen"],
    answer: 1,
    explanation: "The kidneys filter blood and remove waste through urine formation."
  },
  {
    question: "Which part of the brain controls balance?",
    options: ["Cerebrum", "Cerebellum", "Brainstem", "Hypothalamus"],
    answer: 1,
    explanation: "The cerebellum is responsible for coordination and balance."
  },
  {
    question: "What is the main function of red blood cells?",
    options: ["Fight infection", "Carry oxygen", "Clot blood", "Produce hormones"],
    answer: 1,
    explanation: "Red blood cells transport oxygen using hemoglobin."
  },

  // HEART
  {
    question: "Which valve separates the left atrium and left ventricle?",
    options: ["Tricuspid", "Mitral", "Pulmonary", "Aortic"],
    answer: 1,
    explanation: "The mitral valve separates the left atrium and left ventricle."
  },
  {
    question: "Which vessel carries oxygenated blood from lungs to heart?",
    options: ["Pulmonary artery", "Pulmonary vein", "Aorta", "Vena cava"],
    answer: 1,
    explanation: "Pulmonary veins carry oxygenated blood to the left atrium."
  },

  // LUNGS
  {
    question: "What structure conducts air to the lungs?",
    options: ["Esophagus", "Trachea", "Aorta", "Bronchiole"],
    answer: 1,
    explanation: "The trachea carries air to the bronchi."
  },
  {
    question: "What surrounds and protects the lungs?",
    options: ["Peritoneum", "Pleura", "Pericardium", "Meninges"],
    answer: 1,
    explanation: "The pleura is the membrane surrounding the lungs."
  },

  // BRAIN
  {
    question: "Which part of the brain controls voluntary movement?",
    options: ["Cerebellum", "Cerebrum", "Brainstem", "Thalamus"],
    answer: 1,
    explanation: "The cerebrum controls voluntary actions and thinking."
  },
  {
    question: "What connects the brain to the spinal cord?",
    options: ["Cerebellum", "Brainstem", "Frontal lobe", "Occipital lobe"],
    answer: 1,
    explanation: "The brainstem connects the brain to the spinal cord."
  },

  // LIVER
  {
    question: "What is a major function of the liver?",
    options: ["Produce insulin", "Filter toxins", "Pump blood", "Store oxygen"],
    answer: 1,
    explanation: "The liver detoxifies chemicals and metabolizes drugs."
  },

  // KIDNEYS
  {
    question: "What unit filters blood in the kidney?",
    options: ["Neuron", "Nephron", "Alveoli", "Glomerulus"],
    answer: 1,
    explanation: "The nephron is the functional unit of the kidney."
  },

  // EYE
  {
    question: "Which part of the eye detects light?",
    options: ["Cornea", "Lens", "Retina", "Iris"],
    answer: 2,
    explanation: "The retina contains photoreceptors that detect light."
  },
  {
    question: "What controls the amount of light entering the eye?",
    options: ["Retina", "Iris", "Lens", "Cornea"],
    answer: 1,
    explanation: "The iris adjusts pupil size to control light entry."
  },

  // EAR
  {
    question: "What part of the ear is responsible for hearing?",
    options: ["Cochlea", "Semicircular canals", "Eardrum", "Ossicles"],
    answer: 0,
    explanation: "The cochlea converts sound vibrations into nerve signals."
  },
  {
    question: "What controls balance in the ear?",
    options: ["Cochlea", "Semicircular canals", "Eardrum", "Malleus"],
    answer: 1,
    explanation: "Semicircular canals detect head movement and balance."
  },

  // BLOOD / VASCULAR
  {
    question: "Which vessel carries blood away from the heart?",
    options: ["Veins", "Arteries", "Capillaries", "Venules"],
    answer: 1,
    explanation: "Arteries carry blood away from the heart."
  },
  {
    question: "Which vessel returns blood to the heart?",
    options: ["Arteries", "Veins", "Capillaries", "Aorta"],
    answer: 1,
    explanation: "Veins return blood back to the heart."
  },
  {
    question: "What is the largest artery in the body?",
    options: ["Pulmonary artery", "Aorta", "Carotid", "Femoral"],
    answer: 1,
    explanation: "The aorta is the main artery carrying blood from the heart."
  },

  // GENERAL
  {
    question: "What system transports nutrients and oxygen?",
    options: ["Digestive", "Circulatory", "Respiratory", "Nervous"],
    answer: 1,
    explanation: "The circulatory system transports oxygen and nutrients."
  },
  {
    question: "What system controls body functions?",
    options: ["Respiratory", "Digestive", "Nervous", "Muscular"],
    answer: 2,
    explanation: "The nervous system controls body processes."
  }
];

const anatomyCategories = [
  "Heart",
  "Brain",
  "Lungs",
  "Liver",
  "Kidneys",
  "Eye",
  "Ear",
  "Arterial System",
  "Venous System",
];

export { anatomyQuestions, anatomyCategories };