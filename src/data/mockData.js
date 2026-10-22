// MediVerse — fictional demo data only. No real patient data.

export const departments = [
  "Cardiology", "Neurology", "Orthopedics", "Dermatology", "Pediatrics",
  "Gynecology", "Gastroenterology", "Pulmonology", "ENT", "Ophthalmology",
  "General Medicine", "Psychiatry", "Dentistry", "Oncology",
];

export const doctors = [
  { id: "doc-1", name: "Dr. Ananya Sharma", specialty: "Cardiology", department: "Cardiology", experience: 14, qualifications: "MBBS, MD (Cardiology), DM", fee: 800, languages: ["English", "Hindi"], location: "Block A, 2nd Floor", verified: true, about: "Dr. Sharma focuses on preventive cardiology and heart-rhythm disorders, with a patient-first approach to long-term heart health.", expertise: ["Hypertension", "Arrhythmia", "Heart Failure", "Preventive Cardiology"], availableDays: ["Mon", "Tue", "Wed", "Fri"], rating: 4.9 },
  { id: "doc-2", name: "Dr. Rahul Mehta", specialty: "Neurology", department: "Neurology", experience: 12, qualifications: "MBBS, MD, DM (Neurology)", fee: 900, languages: ["English", "Hindi", "Punjabi"], location: "Block B, 3rd Floor", verified: true, about: "Dr. Mehta specialises in headache disorders, epilepsy and stroke recovery, combining clinical care with patient education.", expertise: ["Migraine", "Epilepsy", "Stroke Recovery", "Neuropathy"], availableDays: ["Mon", "Wed", "Thu", "Sat"], rating: 4.8 },
  { id: "doc-3", name: "Dr. Priya Kapoor", specialty: "Dermatology", department: "Dermatology", experience: 9, qualifications: "MBBS, MD (Dermatology)", fee: 650, languages: ["English", "Hindi"], location: "Block A, 1st Floor", verified: true, about: "Dr. Kapoor treats a wide range of skin, hair and nail conditions with an emphasis on evidence-based dermatology.", expertise: ["Acne", "Eczema", "Hair Loss", "Skin Allergies"], availableDays: ["Tue", "Thu", "Fri", "Sat"], rating: 4.7 },
  { id: "doc-4", name: "Dr. Arjun Malhotra", specialty: "Orthopedics", department: "Orthopedics", experience: 16, qualifications: "MBBS, MS (Ortho)", fee: 750, languages: ["English", "Hindi"], location: "Block C, Ground Floor", verified: true, about: "Dr. Malhotra manages joint pain, sports injuries and post-fracture rehabilitation with a conservative-first philosophy.", expertise: ["Joint Pain", "Sports Injury", "Fractures", "Spine Care"], availableDays: ["Mon", "Tue", "Thu", "Fri"], rating: 4.8 },
  { id: "doc-5", name: "Dr. Nisha Verma", specialty: "Pediatrics", department: "Pediatrics", experience: 11, qualifications: "MBBS, MD (Pediatrics)", fee: 600, languages: ["English", "Hindi"], location: "Block D, 1st Floor", verified: true, about: "Dr. Verma provides comprehensive child healthcare from infancy through adolescence, including growth and vaccination tracking.", expertise: ["Growth & Nutrition", "Vaccination", "Infections", "Newborn Care"], availableDays: ["Mon", "Wed", "Fri", "Sat"], rating: 4.9 },
  { id: "doc-6", name: "Dr. Sanjay Rao", specialty: "General Medicine", department: "General Medicine", experience: 18, qualifications: "MBBS, MD (Internal Medicine)", fee: 500, languages: ["English", "Hindi", "Telugu"], location: "Block A, Ground Floor", verified: true, about: "Dr. Rao is the go-to physician for everyday illnesses, chronic disease management and first-point-of-care concerns.", expertise: ["Fever", "Diabetes", "Thyroid", "General Checkups"], availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"], rating: 4.7 },
  { id: "doc-7", name: "Dr. Meera Iyer", specialty: "Gynecology", department: "Gynecology", experience: 13, qualifications: "MBBS, MS (OBG)", fee: 700, languages: ["English", "Hindi", "Tamil"], location: "Block D, 2nd Floor", verified: true, about: "Dr. Iyer offers women's health care across all life stages, from adolescence through pregnancy and menopause.", expertise: ["Pregnancy Care", "PCOS", "Menstrual Health", "Menopause"], availableDays: ["Tue", "Wed", "Fri", "Sat"], rating: 4.9 },
  { id: "doc-8", name: "Dr. Karan Bedi", specialty: "Psychiatry", department: "Psychiatry", experience: 10, qualifications: "MBBS, MD (Psychiatry)", fee: 850, languages: ["English", "Hindi"], location: "Block B, 4th Floor", verified: true, about: "Dr. Bedi provides confidential, judgement-free mental health care for anxiety, mood and stress-related concerns.", expertise: ["Anxiety", "Depression", "Sleep Issues", "Stress Management"], availableDays: ["Mon", "Thu", "Fri"], rating: 4.8 },
];

export const timeSlots = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"];

// deterministic "unavailable" slots per doctor so the UI feels real but stays consistent
export function getUnavailableSlots(doctorId) {
  const seed = doctorId.charCodeAt(doctorId.length - 1);
  return timeSlots.filter((_, i) => (i + seed) % 4 === 0);
}

export function getRelativeDate(daysOffset) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().slice(0, 10);
}

export function formatDisplayDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return String(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const demoPatient = {
  patientId: "PT-2026-10482",
  name: "Khushboo Ahuja",
  firstName: "Khushboo",
  dob: "1996-04-12",
  gender: "Female",
  phone: "+91 98765 43210",
  email: "khushboo.ahuja@example.com",
  address: "House 21, Model Town, Ludhiana, Punjab",
  emergencyContact: "+91 98111 22233 (Sister)",
  bloodGroup: "O+",
  allergies: "Penicillin",
};

export function getInitialAppointments() {
  return [
    {
      id: "AP-2026-009281",
      patientId: "PT-2026-10482",
      doctorId: "doc-1",
      date: getRelativeDate(2),
      time: "10:30 AM",
      type: "In-person",
      status: "Upcoming",
      room: "Room 214, Block A",
      notes: "Cardiovascular evaluation and ECG review.",
    },
    {
      id: "AP-2026-008120",
      patientId: "PT-2026-10482",
      doctorId: "doc-6",
      date: getRelativeDate(-14),
      time: "11:00 AM",
      type: "In-person",
      status: "Completed",
      room: "Room 102, Block A",
      notes: "Routine quarterly consultation and vitals review.",
    },
    {
      id: "AP-2026-007765",
      patientId: "PT-2026-10482",
      doctorId: "doc-3",
      date: getRelativeDate(-35),
      time: "03:00 PM",
      type: "Video consultation",
      status: "Completed",
      room: "—",
      notes: "Follow-up regarding contact dermatitis and allergy relief.",
    },
    {
      id: "AP-2026-006590",
      patientId: "PT-2026-10482",
      doctorId: "doc-2",
      date: getRelativeDate(-60),
      time: "09:30 AM",
      type: "In-person",
      status: "Cancelled",
      room: "Room 301, Block B",
      notes: "Cancelled by patient due to schedule conflict.",
    },
  ];
}

export const demoAppointments = getInitialAppointments();

export function getInitialPrescriptions() {
  return [
    {
      id: "RX-10028",
      patientId: "PT-2026-10482",
      appointmentId: "AP-2026-008120",
      doctorId: "doc-6",
      date: getRelativeDate(-14),
      status: "Active",
      followUp: getRelativeDate(16),
      medicines: [
        { name: "Metformin", dosage: "500 mg", frequency: "2 times/day", duration: "30 days", instructions: "After food" },
        { name: "Atorvastatin", dosage: "10 mg", frequency: "1 time/day", duration: "30 days", instructions: "At night" },
      ],
      instructions: "Monitor blood sugar weekly. Follow up in 4 weeks with fasting report.",
    },
    {
      id: "RX-10015",
      patientId: "PT-2026-10482",
      appointmentId: "AP-2026-007765",
      doctorId: "doc-3",
      date: getRelativeDate(-35),
      status: "Active",
      followUp: getRelativeDate(-5),
      medicines: [
        { name: "Cetirizine", dosage: "10 mg", frequency: "1 time/day", duration: "10 days", instructions: "At night" },
        { name: "Hydrocortisone Cream", dosage: "1%", frequency: "2 times/day", duration: "7 days", instructions: "Apply on affected area" },
      ],
      instructions: "Avoid harsh soaps. Use fragrance-free moisturiser.",
    },
  ];
}

export const demoPrescriptions = getInitialPrescriptions();

export function getInitialReports() {
  return [
    { id: "RPT-2201", patientId: "PT-2026-10482", name: "Complete Blood Count (CBC)", category: "Blood Tests", date: getRelativeDate(-7), doctorId: "doc-6", department: "General Medicine", status: "Ready", summary: "All values within normal reference range. No signs of infection or anaemia." },
    { id: "RPT-2198", patientId: "PT-2026-10482", name: "ECG Report", category: "ECG", date: getRelativeDate(-12), doctorId: "doc-1", department: "Cardiology", status: "Ready", summary: "Normal sinus rhythm. No ST-segment abnormalities detected." },
    { id: "RPT-2170", patientId: "PT-2026-10482", name: "Lipid Profile", category: "Blood Tests", date: getRelativeDate(-14), doctorId: "doc-6", department: "General Medicine", status: "Ready", summary: "LDL cholesterol slightly elevated. Dietary changes recommended." },
    { id: "RPT-2140", patientId: "PT-2026-10482", name: "Chest X-Ray", category: "X-Ray", date: getRelativeDate(-35), doctorId: "doc-3", department: "Dermatology", status: "Ready", summary: "No abnormalities detected in lung fields." },
  ];
}

export const demoReports = getInitialReports();

export function getInitialNotifications() {
  const now = Date.now();
  return [
    { id: "notif-1", patientId: "PT-2026-10482", title: "Upcoming Appointment", message: "Appointment with Dr. Ananya Sharma is scheduled for 10:30 AM.", text: "Appointment with Dr. Ananya Sharma is scheduled for 10:30 AM.", icon: "calendar", time: "2h ago", timestamp: now - 2 * 3600 * 1000, read: false, type: "appointment" },
    { id: "notif-2", patientId: "PT-2026-10482", title: "Prescription Ready", message: "Your prescription RX-10028 is ready for pharmacy pickup.", text: "Your prescription RX-10028 is ready for pharmacy pickup.", icon: "pill", time: "5h ago", timestamp: now - 5 * 3600 * 1000, read: false, type: "prescription" },
    { id: "notif-3", patientId: "PT-2026-10482", title: "Lab Report Uploaded", message: "New lab report (ECG) has been uploaded to your records.", text: "New lab report (ECG) has been uploaded to your records.", icon: "file", time: "1d ago", timestamp: now - 24 * 3600 * 1000, read: true, type: "report" },
    { id: "notif-4", patientId: "PT-2026-10482", title: "Appointment Confirmed", message: "Your appointment with Dr. Sanjay Rao has been confirmed.", text: "Your appointment with Dr. Sanjay Rao has been confirmed.", icon: "doctor", time: "3d ago", timestamp: now - 3 * 24 * 3600 * 1000, read: true, type: "appointment" },
    { id: "notif-5", patientId: "PT-2026-10482", title: "Follow-up Consultation", message: "Follow-up consultation reminder with Dr. Sanjay Rao.", text: "Follow-up consultation reminder scheduled.", icon: "calendar", time: "5d ago", timestamp: now - 5 * 24 * 3600 * 1000, read: true, type: "appointment" },
  ];
}

export const demoNotifications = getInitialNotifications();

// simple keyword → department mapping used by the AI Specialist Finder (rule-based, not a diagnosis)
export const careCategoryRules = [
  { keywords: ["heart", "chest pain", "palpitation", "bp", "blood pressure"], department: "Cardiology" },
  { keywords: ["headache", "migraine", "seizure", "numbness", "dizziness"], department: "Neurology" },
  { keywords: ["skin", "rash", "acne", "itch", "hair fall"], department: "Dermatology" },
  { keywords: ["joint", "bone", "fracture", "back pain", "knee"], department: "Orthopedics" },
  { keywords: ["child", "baby", "infant", "vaccination"], department: "Pediatrics" },
  { keywords: ["pregnan", "period", "menstrual", "pcos"], department: "Gynecology" },
  { keywords: ["stomach", "acidity", "digestion", "vomit", "nausea"], department: "Gastroenterology" },
  { keywords: ["cough", "breath", "asthma", "lungs"], department: "Pulmonology" },
  { keywords: ["ear", "nose", "throat", "sinus"], department: "ENT" },
  { keywords: ["eye", "vision", "blurry"], department: "Ophthalmology" },
  { keywords: ["tooth", "teeth", "gum", "dental"], department: "Dentistry" },
  { keywords: ["anxiety", "depress", "stress", "sleep", "mood"], department: "Psychiatry" },
];

export const emergencyKeywords = [
  "severe chest pain", "can't breathe", "cannot breathe", "difficulty breathing",
  "unconscious", "not breathing", "heavy bleeding", "severe bleeding",
  "suicidal", "want to die", "kill myself", "seizure right now", "stroke",
  "paralysis", "poisoning", "overdose", "severe accident", "no pulse",
];

// A small roster of fictional patients doctors can search/browse in the Doctor Portal
export const patientsList = [
  { patientId: "PT-2026-10482", name: "Khushboo Ahuja", age: 30, gender: "Female", phone: "+91 98765 43210", lastVisit: getRelativeDate(-5), bloodGroup: "O+", allergies: "Penicillin", emergencyContact: "+91 98111 22233 (Sister)" },
  { patientId: "PT-2026-10391", name: "Rohit Malik", age: 45, gender: "Male", phone: "+91 98234 55671", lastVisit: getRelativeDate(-10), bloodGroup: "B+", allergies: "None", emergencyContact: "+91 98234 00000 (Wife)" },
  { patientId: "PT-2026-10287", name: "Simran Kaur", age: 27, gender: "Female", phone: "+91 99887 12345", lastVisit: getRelativeDate(-18), bloodGroup: "A-", allergies: "Sulfa drugs", emergencyContact: "+91 99887 54321 (Mother)" },
  { patientId: "PT-2026-10156", name: "Aditya Verma", age: 58, gender: "Male", phone: "+91 97654 32109", lastVisit: getRelativeDate(-25), bloodGroup: "AB+", allergies: "None", emergencyContact: "+91 97654 88888 (Son)" },
  { patientId: "PT-2026-09980", name: "Neha Chawla", age: 34, gender: "Female", phone: "+91 96543 21098", lastVisit: getRelativeDate(-40), bloodGroup: "O-", allergies: "Latex", emergencyContact: "+91 96543 99999 (Husband)" },
];

// Doctor's "today" schedule (demo)
export const todaySchedule = [
  { time: "09:00 AM", patient: "Khushboo Ahuja", patientId: "PT-2026-10482", status: "Completed" },
  { time: "09:30 AM", patient: "Rohit Malik", patientId: "PT-2026-10391", status: "Completed" },
  { time: "10:00 AM", patient: "Simran Kaur", patientId: "PT-2026-10287", status: "In Consultation" },
  { time: "10:30 AM", patient: "Aditya Verma", patientId: "PT-2026-10156", status: "Waiting" },
  { time: "11:00 AM", patient: "Neha Chawla", patientId: "PT-2026-09980", status: "Waiting" },
  { time: "11:30 AM", patient: "Karan Oberoi", patientId: "PT-2026-09877", status: "Cancelled" },
];

export const medicineInventory = [
  { name: "Paracetamol 500mg", quantity: 1250, min: 200, expiry: "2027-03-01" },
  { name: "Metformin 500mg", quantity: 80, min: 150, expiry: "2027-01-15" },
  { name: "Atorvastatin 10mg", quantity: 340, min: 100, expiry: "2027-06-10" },
  { name: "Cetirizine 10mg", quantity: 25, min: 100, expiry: "2026-12-20" },
  { name: "Amoxicillin 500mg", quantity: 410, min: 150, expiry: "2027-02-05" },
];
