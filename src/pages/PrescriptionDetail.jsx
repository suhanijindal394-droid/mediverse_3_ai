import { useParams, Link, Navigate } from "react-router-dom";
import Icon from "../components/Icon";
import { demoPrescriptions, doctors, demoPatient } from "../data/mockData";

export default function PrescriptionDetail() {
  const { id } = useParams();
  const rx = demoPrescriptions.find((p) => p.id === id);
  if (!rx) return <Navigate to="/patient/prescriptions" replace />;
  const doc = doctors.find((d) => d.id === rx.doctorId);

  return (
    <div>
      <Link to="/patient/prescriptions" className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }}>
        <Icon name="chevronLeft" size={16} /> Back to Prescriptions
      </Link>

      <div className="card card-pad" style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="flex items-center justify-between" style={{ paddingBottom: 20, marginBottom: 20, borderBottom: "2px solid var(--navy-900)" }}>
          <div className="flex items-center gap-12">
            <span className="brand-mark"><Icon name="logo" size={17} style={{ color: "#5EEAD4" }} /></span>
            <div>
              <p style={{ fontWeight: 700, fontSize: 17, fontFamily: "var(--font-display)" }}>MediVerse Hospital</p>
              <p className="muted" style={{ fontSize: 12 }}>Model Town, Ludhiana, Punjab</p>
            </div>
          </div>
          <span className={`badge ${rx.status === "Active" ? "badge-green" : "badge-navy"}`}>{rx.status}</span>
        </div>

        <div className="grid grid-2" style={{ marginBottom: 24 }}>
          <div>
            <p className="muted" style={{ fontSize: 11.5, marginBottom: 2 }}>DOCTOR</p>
            <p style={{ fontWeight: 700, fontSize: 14.5 }}>{doc?.name}</p>
            <p className="muted" style={{ fontSize: 12.5 }}>{doc?.specialty}, {doc?.qualifications}</p>
          </div>
          <div>
            <p className="muted" style={{ fontSize: 11.5, marginBottom: 2 }}>PATIENT</p>
            <p style={{ fontWeight: 700, fontSize: 14.5 }}>{demoPatient.name}</p>
            <p className="font-mono muted" style={{ fontSize: 12.5 }}>{demoPatient.patientId}</p>
          </div>
          <div>
            <p className="muted" style={{ fontSize: 11.5, marginBottom: 2 }}>DATE ISSUED</p>
            <p style={{ fontWeight: 600, fontSize: 13.5 }}>{new Date(rx.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
          <div>
            <p className="muted" style={{ fontSize: 11.5, marginBottom: 2 }}>PRESCRIPTION ID</p>
            <p className="font-mono" style={{ fontWeight: 600, fontSize: 13.5 }}>{rx.id}</p>
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 22 }}>
          <thead>
            <tr style={{ background: "var(--navy-50)" }}>
              {["Medicine", "Dosage", "Frequency", "Duration", "Instructions"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 12, color: "var(--ink-600)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rx.medicines.map((m) => (
              <tr key={m.name} style={{ borderBottom: "1px solid var(--navy-50)" }}>
                <td style={{ padding: "12px", fontWeight: 600, fontSize: 13.5 }}>{m.name}</td>
                <td style={{ padding: "12px", fontSize: 13.5 }}>{m.dosage}</td>
                <td style={{ padding: "12px", fontSize: 13.5 }}>{m.frequency}</td>
                <td style={{ padding: "12px", fontSize: 13.5 }}>{m.duration}</td>
                <td style={{ padding: "12px", fontSize: 13.5 }}>{m.instructions}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginBottom: 20 }}>
          <p className="muted" style={{ fontSize: 11.5, marginBottom: 4 }}>DOCTOR INSTRUCTIONS</p>
          <p style={{ fontSize: 13.5 }}>{rx.instructions}</p>
        </div>
        <div style={{ marginBottom: 26 }}>
          <p className="muted" style={{ fontSize: 11.5, marginBottom: 4 }}>FOLLOW-UP DATE</p>
          <p style={{ fontSize: 13.5, fontWeight: 600 }}>{new Date(rx.followUp).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>

        <div className="flex gap-10">
          <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => window.print()}>
            <Icon name="download" size={15} /> Download Prescription
          </button>
          <Link to="/patient/pharmacy" className="btn btn-primary btn-sm" style={{ flex: 1 }}>Show at Pharmacy</Link>
        </div>
      </div>
    </div>
  );
}
