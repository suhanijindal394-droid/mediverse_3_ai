import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Icon from "../components/Icon";
import { patientsList, demoPrescriptions, demoReports, demoPatient } from "../data/mockData";

export default function DoctorPatientRecord() {
  const { patientId } = useParams();
  const [notes, setNotes] = useState("");
  const patient = patientsList.find((p) => p.patientId === patientId);
  if (!patient) return <Navigate to="/doctor/patients" replace />;

  const hasFullRecord = patient.patientId === demoPatient.patientId;
  const prescriptions = hasFullRecord ? demoPrescriptions : [];
  const reports = hasFullRecord ? demoReports : [];

  return (
    <div>
      <Link to="/doctor/patients" className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }}>
        <Icon name="chevronLeft" size={16} /> Back to Patients
      </Link>

      <div className="grid" style={{ gridTemplateColumns: "300px 1fr", gap: 28 }}>
        {/* ---------- Left: patient overview ---------- */}
        <div>
          <div className="card card-pad center" style={{ marginBottom: 20 }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%", margin: "0 auto 14px",
              background: "linear-gradient(135deg,var(--navy-800),var(--navy-600))", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 24, fontFamily: "var(--font-display)",
            }}>
              {patient.name[0]}
            </div>
            <h2 style={{ fontSize: 18 }}>{patient.name}</h2>
            <p className="font-mono muted" style={{ fontSize: 12.5, marginTop: 4 }}>{patient.patientId}</p>
          </div>

          <div className="card card-pad">
            <InfoRow label="Age" value={`${patient.age} yrs`} />
            <InfoRow label="Gender" value={patient.gender} />
            <InfoRow label="Blood Group" value={patient.bloodGroup} />
            <InfoRow label="Allergies" value={patient.allergies} />
            <InfoRow label="Phone" value={patient.phone} />
            <InfoRow label="Emergency Contact" value={patient.emergencyContact} last />
          </div>
        </div>

        {/* ---------- Right: history + current visit ---------- */}
        <div>
          <Section title="Previous Prescriptions" icon="pill">
            {prescriptions.length === 0 ? <EmptyLine text="No previous prescriptions on file." /> : (
              prescriptions.map((rx) => (
                <div key={rx.id} className="flex items-center justify-between" style={{ padding: "10px 0", borderBottom: "1px solid var(--navy-50)" }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 13.5 }} className="font-mono">{rx.id}</p>
                    <p className="muted" style={{ fontSize: 12 }}>{rx.medicines.map((m) => m.name).join(", ")}</p>
                  </div>
                  <span className="muted" style={{ fontSize: 12 }}>{new Date(rx.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                </div>
              ))
            )}
          </Section>

          <Section title="Reports" icon="file">
            {reports.length === 0 ? <EmptyLine text="No reports on file." /> : (
              reports.map((r) => (
                <div key={r.id} className="flex items-center justify-between" style={{ padding: "10px 0", borderBottom: "1px solid var(--navy-50)" }}>
                  <p style={{ fontWeight: 600, fontSize: 13.5 }}>{r.name}</p>
                  <span className="muted" style={{ fontSize: 12 }}>{new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                </div>
              ))
            )}
          </Section>

          <Section title="Current Visit" icon="stethoscope">
            <div style={{ marginBottom: 14 }}>
              <p className="muted" style={{ fontSize: 12, marginBottom: 4 }}>PATIENT'S REPORTED CONCERN</p>
              <p style={{ fontSize: 13.5 }}>Frequent headaches for the past two weeks, moderate severity.</p>
            </div>
            <div style={{ marginBottom: 14 }}>
              <p className="muted" style={{ fontSize: 12, marginBottom: 4 }}>AI CARE-NAVIGATION SUMMARY</p>
              <p style={{ fontSize: 13.5 }}>Suggested category: Neurology. Care-navigation only — not a diagnosis.</p>
            </div>
            <div>
              <label className="muted" style={{ fontSize: 12, display: "block", marginBottom: 6 }}>DOCTOR NOTES</label>
              <textarea
                value={notes} onChange={(e) => setNotes(e.target.value)} rows={4}
                placeholder="Add your clinical notes here…"
                style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--navy-100)", fontSize: 13.5, resize: "vertical" }}
              />
            </div>
          </Section>

          <Link to="/doctor/prescription/new" state={{ patientId: patient.patientId, patientName: patient.name }} className="btn btn-primary btn-block">
            Create Prescription <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="card card-pad" style={{ marginBottom: 20 }}>
      <div className="flex items-center gap-10" style={{ marginBottom: 14 }}>
        <Icon name={icon} size={17} style={{ color: "var(--teal-600)" }} />
        <h3 style={{ fontSize: 15.5 }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value, last }) {
  return (
    <div className="flex justify-between" style={{ padding: "10px 0", borderBottom: last ? "none" : "1px solid var(--navy-50)" }}>
      <span className="muted" style={{ fontSize: 13 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600 }}>{value}</span>
    </div>
  );
}

function EmptyLine({ text }) {
  return <p className="muted" style={{ fontSize: 13, padding: "6px 0" }}>{text}</p>;
}
