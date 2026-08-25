import { useParams, useLocation, Link, Navigate } from "react-router-dom";
import Icon from "../components/Icon";
import { doctors, demoPatient } from "../data/mockData";
import useLocalStorage from "../hooks/useLocalStorage";

export default function AppointmentConfirmation() {
  const { id } = useParams();
  const location = useLocation();
  const [appointments] = useLocalStorage("mv_appointments", []);

  const appointment = location.state || appointments.find((a) => a.id === id);
  if (!appointment) return <Navigate to="/patient/appointments" replace />;

  const doc = doctors.find((d) => d.id === appointment.doctorId);

  return (
    <div className="center" style={{ maxWidth: 560, margin: "20px auto" }}>
      <div className="card card-pad">
        <div style={{
          width: 72, height: 72, borderRadius: "50%", margin: "0 auto 18px",
          background: "var(--green-100)", color: "var(--green-600)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="checkCircle" size={34} />
        </div>
        <h2 style={{ fontSize: 24, marginBottom: 6 }}>Appointment Confirmed</h2>
        <p className="muted" style={{ fontSize: 14, marginBottom: 26 }}>
          A confirmation has been added to your dashboard.
        </p>

        <div style={{ textAlign: "left", background: "var(--bg-alt)", borderRadius: 14, padding: 20, marginBottom: 24 }}>
          <Row label="Patient" value={demoPatient.name} />
          <Row label="Patient ID" value={demoPatient.patientId} mono />
          <Row label="Doctor" value={doc?.name} />
          <Row label="Department" value={doc?.department} />
          <Row label="Date" value={new Date(appointment.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
          <Row label="Time" value={appointment.time} />
          <Row label="Hospital Location" value={doc?.location} />
          <Row label="Room Number" value={appointment.room} />
          <Row label="Appointment ID" value={appointment.id} mono last />
        </div>

        <div className="flex gap-10" style={{ flexWrap: "wrap" }}>
          <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => alert("Added to your calendar (demo).")}>
            <Icon name="calendar" size={15} /> Add to Calendar
          </button>
          <Link to="/patient/appointments" className="btn btn-outline btn-sm" style={{ flex: 1 }}>View Appointment</Link>
        </div>
        <Link to="/patient/dashboard" className="btn btn-primary btn-block" style={{ marginTop: 10 }}>Back to Dashboard</Link>
      </div>
    </div>
  );
}

function Row({ label, value, mono, last }) {
  return (
    <div className="flex justify-between" style={{ padding: "8px 0", borderBottom: last ? "none" : "1px solid var(--navy-100)" }}>
      <span className="muted" style={{ fontSize: 13 }}>{label}</span>
      <span className={mono ? "font-mono" : ""} style={{ fontSize: 13.5, fontWeight: 600 }}>{value}</span>
    </div>
  );
}
