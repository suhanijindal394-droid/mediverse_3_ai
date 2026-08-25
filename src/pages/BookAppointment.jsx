import { useState } from "react";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import Icon from "../components/Icon";
import { doctors, timeSlots, getUnavailableSlots } from "../data/mockData";
import useLocalStorage from "../hooks/useLocalStorage";

function nextNDays(n) {
  const days = [];
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const doc = doctors.find((d) => d.id === doctorId);

  const [appointments, setAppointments] = useLocalStorage("mv_appointments", []);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [consultType, setConsultType] = useState("In-person");
  const [submitting, setSubmitting] = useState(false);

  if (!doc) return <Navigate to="/specialists" replace />;

  const days = nextNDays(7);
  const unavailable = getUnavailableSlots(doc.id);
  const dateObj = days[selectedDate];

  function handleConfirm() {
    if (!selectedTime) return;
    setSubmitting(true);
    const random = Math.floor(100000 + Math.random() * 899999);
    const appointmentId = `AP-2026-${random}`;

    const newAppointment = {
      id: appointmentId,
      doctorId: doc.id,
      date: dateObj.toISOString().slice(0, 10),
      time: selectedTime,
      type: consultType,
      status: "Upcoming",
      room: consultType === "In-person" ? "Room 214, Block A" : "—",
    };

    setTimeout(() => {
      setAppointments([newAppointment, ...appointments]);
      navigate(`/patient/appointment-confirmation/${appointmentId}`, { state: newAppointment });
    }, 700);
  }

  return (
    <div>
      <Link to={`/specialists/${doc.id}`} className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }}>
        <Icon name="chevronLeft" size={16} /> Back to Doctor Profile
      </Link>

      {/* Doctor summary */}
      <div className="card card-pad flex items-center gap-16" style={{ marginBottom: 24 }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,var(--navy-800),var(--navy-600))",
          color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontFamily: "var(--font-display)", flexShrink: 0,
        }}>
          {doc.name.replace("Dr. ", "").split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: 16 }}>{doc.name}</p>
          <p className="muted" style={{ fontSize: 13.5 }}>{doc.specialty} · {doc.department} · ₹{doc.fee}</p>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 320px", gap: 28 }}>
        <div>
          {/* Select date */}
          <div className="card card-pad" style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, marginBottom: 14 }}>Select Date</h3>
            <div className="flex gap-8" style={{ overflowX: "auto", paddingBottom: 4 }}>
              {days.map((d, i) => (
                <button
                  key={i} onClick={() => { setSelectedDate(i); setSelectedTime(null); }}
                  className={`btn btn-sm ${selectedDate === i ? "btn-primary" : "btn-outline"}`}
                  style={{ flexDirection: "column", minWidth: 66, padding: "10px 8px", gap: 2 }}
                >
                  <span style={{ fontSize: 11, opacity: 0.85 }}>{d.toLocaleDateString("en-IN", { weekday: "short" })}</span>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{d.getDate()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Select time */}
          <div className="card card-pad" style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, marginBottom: 14 }}>Select Time</h3>
            <div className="grid grid-4" style={{ gap: 10 }}>
              {timeSlots.map((slot) => {
                const disabled = unavailable.includes(slot);
                const active = selectedTime === slot;
                return (
                  <button
                    key={slot} disabled={disabled} onClick={() => setSelectedTime(slot)}
                    className={`btn btn-sm ${active ? "btn-primary" : disabled ? "btn-ghost" : "btn-outline"}`}
                    style={disabled ? { opacity: 0.4, textDecoration: "line-through", cursor: "not-allowed" } : {}}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Consultation type */}
          <div className="card card-pad">
            <h3 style={{ fontSize: 16, marginBottom: 14 }}>Consultation Type</h3>
            <div className="grid grid-2">
              {["In-person", "Video consultation"].map((type) => (
                <button
                  key={type} onClick={() => setConsultType(type)}
                  className="card card-pad"
                  style={{
                    textAlign: "left", cursor: "pointer",
                    borderColor: consultType === type ? "var(--teal-400)" : "var(--navy-100)",
                    background: consultType === type ? "var(--teal-50)" : "#fff",
                  }}
                >
                  <Icon name={type === "In-person" ? "building" : "video"} size={20} style={{ color: "var(--teal-600)", marginBottom: 8 }} />
                  <p style={{ fontWeight: 600, fontSize: 14.5 }}>{type}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="card card-pad" style={{ alignSelf: "start", position: "sticky", top: 90 }}>
          <h3 style={{ fontSize: 16, marginBottom: 16 }}>Appointment Summary</h3>
          <SummaryRow label="Doctor" value={doc.name} />
          <SummaryRow label="Department" value={doc.department} />
          <SummaryRow label="Date" value={dateObj.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
          <SummaryRow label="Time" value={selectedTime || "— Select a time —"} />
          <SummaryRow label="Consultation" value={consultType} last />
          <div className="flex justify-between" style={{ marginTop: 6, marginBottom: 20, paddingTop: 16, borderTop: "1px solid var(--navy-50)" }}>
            <span className="muted" style={{ fontSize: 14 }}>Consultation Fee</span>
            <span style={{ fontWeight: 700, fontSize: 17 }}>₹{doc.fee}</span>
          </div>
          <button
            className="btn btn-primary btn-block"
            disabled={!selectedTime || submitting}
            onClick={handleConfirm}
          >
            {submitting ? "Confirming…" : "Confirm Appointment"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, last }) {
  return (
    <div className="flex justify-between" style={{ padding: "9px 0", borderBottom: last ? "none" : "1px solid var(--navy-50)" }}>
      <span className="muted" style={{ fontSize: 13.5 }}>{label}</span>
      <span style={{ fontSize: 13.5, fontWeight: 600, textAlign: "right" }}>{value}</span>
    </div>
  );
}
