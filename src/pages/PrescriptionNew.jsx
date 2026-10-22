import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Icon from "../components/Icon";
import useAuth from "../hooks/useAuth";
import { usePrescriptions } from "../hooks/useSharedData";
import { demoPatient } from "../data/mockData";

const emptyMedicine = { name: "", dosage: "", frequency: "", duration: "", instructions: "" };

export default function PrescriptionNew() {
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = useAuth();
  const { addPrescription } = usePrescriptions();
  const { patientId, patientName } = location.state || {};

  const [medicines, setMedicines] = useState([{ ...emptyMedicine }]);
  const [instructions, setInstructions] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [saved, setSaved] = useState(false);

  function updateMedicine(index, field, value) {
    setMedicines((prev) => prev.map((m, i) => (i === index ? { ...m, [field]: value } : m)));
  }
  function addMedicine() {
    setMedicines((prev) => [...prev, { ...emptyMedicine }]);
  }
  function removeMedicine(index) {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSave() {
    const validMeds = medicines.filter((m) => m.name.trim());
    if (validMeds.length === 0) {
      alert("Please enter at least one medicine name.");
      return;
    }

    addPrescription({
      patientId: patientId || demoPatient.patientId,
      doctorId: session?.id || "doc-1",
      medicines: validMeds,
      instructions,
      followUp,
    });

    setSaved(true);
    setTimeout(() => navigate("/doctor/dashboard"), 1400);
  }

  if (saved) {
    return (
      <div className="center" style={{ maxWidth: 440, margin: "60px auto" }}>
        <div className="card card-pad">
          <Icon name="checkCircle" size={30} style={{ color: "var(--green-600)", marginBottom: 12 }} />
          <h3 style={{ marginBottom: 6 }}>Prescription saved</h3>
          <p className="muted" style={{ fontSize: 13.5 }}>It now appears in the patient's account and is ready for the pharmacy.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link to={patientId ? `/doctor/patient/${patientId}` : "/doctor/patients"} className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }}>
        <Icon name="chevronLeft" size={16} /> Back
      </Link>

      <h1 style={{ fontSize: "clamp(22px,3vw,26px)", marginBottom: 6 }}>Create Prescription</h1>
      <p className="muted" style={{ marginBottom: 24 }}>
        {patientName ? <>For <strong>{patientName}</strong> <span className="font-mono">({patientId})</span></> : "Select a patient from My Patients first."}
      </p>

      <div className="card card-pad" style={{ marginBottom: 20 }}>
        {medicines.map((m, i) => (
          <div key={i} style={{ paddingBottom: 18, marginBottom: 18, borderBottom: i < medicines.length - 1 ? "1px solid var(--navy-50)" : "none" }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
              <p style={{ fontWeight: 700, fontSize: 13.5 }}>Medicine {i + 1}</p>
              {medicines.length > 1 && (
                <button onClick={() => removeMedicine(i)} className="icon-btn" style={{ color: "var(--red-600)" }}>
                  <Icon name="trash" size={16} />
                </button>
              )}
            </div>
            <div className="grid grid-2" style={{ gap: 12 }}>
              <MiniField label="Medicine" value={m.name} onChange={(v) => updateMedicine(i, "name", v)} placeholder="e.g. Paracetamol" />
              <MiniField label="Dosage" value={m.dosage} onChange={(v) => updateMedicine(i, "dosage", v)} placeholder="e.g. 500 mg" />
              <MiniField label="Frequency" value={m.frequency} onChange={(v) => updateMedicine(i, "frequency", v)} placeholder="e.g. 2 times/day" />
              <MiniField label="Duration" value={m.duration} onChange={(v) => updateMedicine(i, "duration", v)} placeholder="e.g. 5 days" />
            </div>
            <MiniField label="Instructions" value={m.instructions} onChange={(v) => updateMedicine(i, "instructions", v)} placeholder="e.g. After food" />
          </div>
        ))}

        <button onClick={addMedicine} className="btn btn-outline btn-sm">
          <Icon name="plus" size={15} /> Add Another Medicine
        </button>
      </div>

      <div className="card card-pad" style={{ marginBottom: 20 }}>
        <MiniField label="Doctor Instructions" value={instructions} onChange={setInstructions} placeholder="General notes for the patient" textarea />
        <MiniField label="Follow-up Date" value={followUp} onChange={setFollowUp} type="date" />
      </div>

      <div className="flex gap-10">
        <button className="btn btn-outline" style={{ flex: 1 }} onClick={handleSave}>Save Prescription</button>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSave}>Generate Digital Prescription</button>
      </div>
    </div>
  );
}

function MiniField({ label, value, onChange, placeholder, textarea, type = "text" }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 5, color: "var(--ink-600)" }}>{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3}
          style={{ width: "100%", padding: "10px 12px", borderRadius: 9, border: "1px solid var(--navy-100)", fontSize: 13.5, resize: "vertical" }} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          style={{ width: "100%", padding: "10px 12px", borderRadius: 9, border: "1px solid var(--navy-100)", fontSize: 13.5 }} />
      )}
    </div>
  );
}
