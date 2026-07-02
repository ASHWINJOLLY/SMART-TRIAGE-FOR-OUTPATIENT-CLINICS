"""
SYMPTORA - Department Auto-Routing Engine
Maps symptoms to hospital departments with confidence scoring.
"""

DEPARTMENT_ROUTING_MAP = {
    "Emergency": {
        "keywords": [
            "chest pain", "seene mein dard", "heart attack", "dil ka daura",
            "breathing difficulty", "saans nahi aa rahi", "saans lene mein takleef",
            "unconscious", "behosh", "hosh nahi", "severe bleeding", "bahut khoon",
            "seizure", "mirgi", "fits", "stroke", "lakwa", "paralysis",
            "poisoning", "zeher", "severe burn", "jal gaya", "anaphylaxis",
            "cardiac arrest", "choking", "drowning", "electrocution",
            "severe trauma", "accident", "road accident", "hadsa",
            "cold sweat", "passed out", "gir gaya", "suicide", "overdose",
            "gunshot", "goli", "stab", "chaku", "deep wound", "gehra zakhm",
            "allergic reaction", "severe allergic", "sweating chest"
        ],
        "priority": 1,
        "avg_consultation_min": 5,
        "doctors": ["Dr. R.K. Sharma", "Dr. Priya Verma"],
        "rooms": ["ER-1", "ER-2", "ER-3"]
    },
    "Cardiology": {
        "keywords": [
            "chest pain", "seene mein dard", "heart", "dil", "palpitation",
            "dhadkan", "BP high", "blood pressure", "hypertension",
            "heart murmur", "angina", "irregular heartbeat", "dil ki dhadkan tez",
            "arrhythmia", "tachycardia", "bradycardia", "shortness of breath",
            "dil ki bimari", "heart failure", "cardiac"
        ],
        "priority": 2,
        "avg_consultation_min": 15,
        "doctors": ["Dr. A.K. Mehta", "Dr. Sunita Gupta"],
        "rooms": ["Card-101", "Card-102"]
    },
    "Neurology": {
        "keywords": [
            "head injury", "sir mein chot", "headache", "sir dard", "migraine",
            "seizure", "mirgi", "numbness", "sunn", "stroke", "lakwa",
            "dizziness", "chakkar", "vertigo", "memory loss", "yaaddaasht",
            "tremor", "kaampna", "fainting", "behoshi", "brain",
            "neuropathy", "sciatica", "facial palsy", "chehra paralysis",
            "brain tumor", "parkinson", "alzheimer", "sciatic pain"
        ],
        "priority": 2,
        "avg_consultation_min": 15,
        "doctors": ["Dr. Vikram Singh", "Dr. Neha Agarwal"],
        "rooms": ["Neuro-201", "Neuro-202"]
    },
    "Pulmonology": {
        "keywords": [
            "asthma", "dama", "cough", "khansi", "breathing", "saans",
            "TB", "tuberculosis", "pneumonia", "bronchitis", "wheezing",
            "oxygen", "lung", "phephda", "COPD", "chest congestion",
            "seene mein jalan", "cold", "sardi", "sputum", "balam",
            "hemoptysis", "khoon ki khansi", "sleep apnea", "neend mein saans"
        ],
        "priority": 3,
        "avg_consultation_min": 12,
        "doctors": ["Dr. Rajesh Kumar", "Dr. Anita Yadav"],
        "rooms": ["Pulm-301", "Pulm-302"]
    },
    "Orthopaedics": {
        "keywords": [
            "fracture", "haddi tooti", "bone", "haddi", "joint pain", "jod dard",
            "sprain", "moch", "back pain", "kamar dard", "knee pain",
            "ghutna dard", "shoulder pain", "kandha dard", "slip disc",
            "arthritis", "gathiya", "swelling joint", "sujan",
            "neck pain", "gardan dard", "heel pain", "pairi ka dard",
            "foot pain", "carpal tunnel", "tennis elbow", "osteoporosis",
            "haddi kamzor", "muscle pain", "maanspeshi dard", "leg pain",
            "hand pain", "haath dard", "hip pain", "koolhe ka dard"
        ],
        "priority": 3,
        "avg_consultation_min": 12,
        "doctors": ["Dr. Manoj Tiwari", "Dr. Kavita Mishra"],
        "rooms": ["Ortho-401", "Ortho-402"]
    },
    "Gynaecology": {
        "keywords": [
            "pregnancy", "pregnant", "garbhvati", "periods", "mahavari",
            "menstrual", "bleeding", "PCOS", "ovary", "uterus", "bachedani",
            "delivery", "labour pain", "pet mein dard female", "breast",
            "prenatal", "postnatal", "miscarriage", "infertility",
            "menopause", "PCOD", "fibroid", "cyst", "vaginal discharge",
            "safed pani", "urinary infection female", "pregnancy test",
            "contraception", "family planning", "nipple discharge",
            "female health", "mahiNwaari"
        ],
        "priority": 3,
        "avg_consultation_min": 15,
        "doctors": ["Dr. Seema Sharma", "Dr. Pooja Rastogi"],
        "rooms": ["Gynae-501", "Gynae-502"]
    },
    "Paediatrics": {
        "keywords": [
            "child", "bachcha", "baby", "infant", "shishu", "fever child",
            "vaccination", "teeka", "growth", "vikas", "crying",
            "rona", "not eating", "khana nahi kha raha", "diarrhea child",
            "dast bachche", "colic", "measles", "khasra",
            "ear infection child", "fever with rash", "bukhar daane",
            "dehydration child", "failure to thrive", "developmental delay",
            "autism", "ADHD", "worm infection", "keede", "newborn",
            "navjaat", "cold child", "cough child"
        ],
        "priority": 3,
        "avg_consultation_min": 10,
        "doctors": ["Dr. Amit Saxena", "Dr. Ritu Agarwal"],
        "rooms": ["Paed-601", "Paed-602"]
    },
    "ENT": {
        "keywords": [
            "ear pain", "kaan dard", "hearing", "sunai", "throat",
            "gala", "gale mein dard", "nose", "naak", "nose bleed",
            "naak se khoon", "tonsil", "sinus", "snoring", "kharrate",
            "voice problem", "awaaz", "ear infection", "kaan behna",
            "hearing loss", "tinnitus", "kaan mein ghanti", "nasal congestion",
            "naak band", "deviated septum", "nasal polyp", "smell loss",
            "gandh nahi aana", "ear discharge", "swimmer ear", "motion sickness"
        ],
        "priority": 4,
        "avg_consultation_min": 10,
        "doctors": ["Dr. Sandeep Verma", "Dr. Nidhi Gupta"],
        "rooms": ["ENT-701", "ENT-702"]
    },
    "Eye OPD": {
        "keywords": [
            "eye", "aankh", "vision", "nazar", "blurred vision", "dhundla",
            "eye pain", "aankh mein dard", "redness eye", "aankh laal",
            "cataract", "motiyabind", "glaucoma", "kala motia",
            "spectacles", "chashma", "itching eye", "aankh mein khujli",
            "conjunctivitis", "aankh aana", "dry eye", "sukhi aankh",
            "sty", "guher", "floaters", "retina", "corneal ulcer",
            "eye injury", "aankh mein chot", "night blindness", "ratandhi",
            "color blindness", "rang andhata", "squint", "bhainga"
        ],
        "priority": 4,
        "avg_consultation_min": 10,
        "doctors": ["Dr. Ravi Shankar", "Dr. Meenakshi Jain"],
        "rooms": ["Eye-801", "Eye-802"]
    },
    "Dermatology": {
        "keywords": [
            "skin", "chamdi", "twacha", "rash", "daane", "itching",
            "khujli", "allergy", "acne", "pimple", "muhase", "fungal",
            "ring worm", "daad", "eczema", "psoriasis", "hair fall",
            "baal jharna", "burn", "jalana", "wound", "ghav",
            "vitiligo", "safed daag", "scabies", "khaarish", "hives",
            "pitta", "warts", "massa", "mole", "til", "dandruff",
            "ruesi", "leprosy", "kushtha", "skin infection", "boil",
            "phora", "cyst skin", "ingrown nail"
        ],
        "priority": 4,
        "avg_consultation_min": 8,
        "doctors": ["Dr. Pallavi Sinha", "Dr. Ashok Pandey"],
        "rooms": ["Derm-901", "Derm-902"]
    },
    "Surgery": {
        "keywords": [
            "hernia", "appendix", "appendicitis", "gallstone", "pathari",
            "tumor", "rasauli", "abscess", "pus", "surgical", "operation",
            "lump", "ganth", "pilonidal", "fistula", "bhagandar",
            "hydrocele", "phimosis", "varicose veins", "nason ki nas",
            "piles", "bawasir", "anal fissure", "fissure", "breast lump",
            "stan mein ganth", "lipoma", "cyst removal", "biopsy"
        ],
        "priority": 3,
        "avg_consultation_min": 15,
        "doctors": ["Dr. Suresh Chandra", "Dr. Deepika Singh"],
        "rooms": ["Surg-1001", "Surg-1002"]
    },
    "Medicine": {
        "keywords": [
            "fever", "bukhar", "diabetes", "sugar", "thyroid",
            "weakness", "kamzori", "fatigue", "thakan", "vomiting",
            "ulti", "nausea", "ji machlana", "diarrhea", "dast",
            "constipation", "kabz", "stomach", "pet", "body pain",
            "badan dard", "infection", "blood test", "general checkup",
            "motion sickness", "food poisoning", "dehydration", "paani ki kami",
            "jaundice", "peeliya", "typhoid", "dengue", "malaria",
            "chikungunya", "gout", "gathiya", "anemia", "khoon ki kami",
            "urinary infection", "UTI", "kidney stone", "gurde ki pathari",
            "gastritis", "gas", "acid", "acidity", "heartburn",
            "seene mein jalan", "bloating", "pet phoolna", "weight loss",
            "vajan kam", "blood pressure", "BP low", "cholesterol",
            "liver", "kidney", "gurda", "allergic rhinitis", "hay fever"
        ],
        "priority": 3,
        "avg_consultation_min": 10,
        "doctors": ["Dr. S.P. Mishra", "Dr. Rekha Dubey"],
        "rooms": ["Med-1101", "Med-1102"]
    },
    "General OPD": {
        "keywords": [
            "checkup", "general", "consultation", "follow up", "report",
            "certificate", "dawai", "medicine refill", "routine",
            "health check", "normal", "minor", "fitness", "medical certificate",
            "employment checkup", "annual checkup", "travel vaccine",
            "vaccination adult", "health screening", "blood donation",
            "weight management", "diet", "nutrition", "smoking cessation"
        ],
        "priority": 5,
        "avg_consultation_min": 8,
        "doctors": ["Dr. V.K. Singh", "Dr. Anju Chaurasia"],
        "rooms": ["OPD-1", "OPD-2", "OPD-3"]
    }
}

EMERGENCY_KEYWORDS = [
    "chest pain", "seene mein dard", "heart attack", "breathing difficulty",
    "saans nahi", "unconscious", "behosh", "severe bleeding", "bahut khoon",
    "seizure", "mirgi", "stroke", "lakwa", "poisoning", "zeher",
    "severe burn", "accident", "hadsa", "cardiac arrest", "choking",
    "anaphylaxis", "not breathing", "saans band", "cold sweat", "passed out",
    "gir gaya", "suicide", "overdose", "gunshot", "stab", "deep wound",
    "gehra zakhm", "allergic reaction", "paralysis", "drowning"
]


def route_to_department(symptoms: str, age: int = 30, gender: str = "Male") -> dict:
    """Route patient to the best department based on symptoms."""
    symptoms_lower = symptoms.lower()
    
    # Check emergency first
    is_emergency = any(kw in symptoms_lower for kw in EMERGENCY_KEYWORDS)
    
    if is_emergency:
        dept_info = DEPARTMENT_ROUTING_MAP["Emergency"]
        return {
            "department": "Emergency",
            "confidence": 0.95,
            "reasoning": f"Emergency keywords detected in symptoms. Immediate attention required.",
            "alternative_department": None,
            "is_emergency": True,
            "doctor": dept_info["doctors"][0],
            "room": dept_info["rooms"][0],
            "avg_consultation_min": dept_info["avg_consultation_min"]
        }
    
    # Age-based routing
    if age < 12:
        # Check pediatrics first for children
        dept_info = DEPARTMENT_ROUTING_MAP["Paediatrics"]
        paed_match = any(kw in symptoms_lower for kw in dept_info["keywords"])
        if paed_match or not _find_best_department(symptoms_lower):
            return {
                "department": "Paediatrics",
                "confidence": 0.85,
                "reasoning": f"Patient is {age} years old (child). Routing to Paediatrics.",
                "alternative_department": _find_best_department(symptoms_lower) or "General OPD",
                "is_emergency": False,
                "doctor": dept_info["doctors"][0],
                "room": dept_info["rooms"][0],
                "avg_consultation_min": dept_info["avg_consultation_min"]
            }
    
    # Gender-based routing for pregnancy
    if gender.lower() == "female":
        gynae_info = DEPARTMENT_ROUTING_MAP["Gynaecology"]
        gynae_match = any(kw in symptoms_lower for kw in gynae_info["keywords"])
        if gynae_match:
            return {
                "department": "Gynaecology",
                "confidence": 0.90,
                "reasoning": f"Female patient with gynaecological symptoms detected.",
                "alternative_department": "Medicine",
                "is_emergency": False,
                "doctor": gynae_info["doctors"][0],
                "room": gynae_info["rooms"][0],
                "avg_consultation_min": gynae_info["avg_consultation_min"]
            }
    
    # Score each department
    scores = {}
    for dept_name, dept_info in DEPARTMENT_ROUTING_MAP.items():
        if dept_name in ["Emergency", "General OPD"]:
            continue
        score = sum(1 for kw in dept_info["keywords"] if kw in symptoms_lower)
        if score > 0:
            scores[dept_name] = score
    
    if scores:
        best_dept = max(scores, key=scores.get)
        best_score = scores[best_dept]
        total_keywords = len(DEPARTMENT_ROUTING_MAP[best_dept]["keywords"])
        confidence = min(0.95, 0.5 + (best_score / total_keywords) * 0.5)
        
        # Find alternative
        sorted_depts = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        alt_dept = sorted_depts[1][0] if len(sorted_depts) > 1 else "General OPD"
        
        dept_info = DEPARTMENT_ROUTING_MAP[best_dept]
        return {
            "department": best_dept,
            "confidence": round(confidence, 2),
            "reasoning": f"Matched {best_score} symptom keywords for {best_dept}.",
            "alternative_department": alt_dept,
            "is_emergency": False,
            "doctor": dept_info["doctors"][0],
            "room": dept_info["rooms"][0],
            "avg_consultation_min": dept_info["avg_consultation_min"]
        }
    
    # Default
    dept_info = DEPARTMENT_ROUTING_MAP["General OPD"]
    return {
        "department": "General OPD",
        "confidence": 0.50,
        "reasoning": "No specific department match found. Routing to General OPD.",
        "alternative_department": "Medicine",
        "is_emergency": False,
        "doctor": dept_info["doctors"][0],
        "room": dept_info["rooms"][0],
        "avg_consultation_min": dept_info["avg_consultation_min"]
    }


def _find_best_department(symptoms_lower: str) -> str:
    """Find best matching department for symptoms."""
    scores = {}
    for dept_name, dept_info in DEPARTMENT_ROUTING_MAP.items():
        if dept_name in ["Emergency", "General OPD"]:
            continue
        score = sum(1 for kw in dept_info["keywords"] if kw in symptoms_lower)
        if score > 0:
            scores[dept_name] = score
    return max(scores, key=scores.get) if scores else ""


def get_department_info(department: str) -> dict:
    """Get department details."""
    dept = DEPARTMENT_ROUTING_MAP.get(department, DEPARTMENT_ROUTING_MAP["General OPD"])
    return {
        "name": department,
        "avg_consultation_min": dept["avg_consultation_min"],
        "doctors": dept["doctors"],
        "rooms": dept["rooms"],
        "priority": dept["priority"]
    }
