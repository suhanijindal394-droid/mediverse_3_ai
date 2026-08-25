import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Icon from "../components/Icon";
import { doctors, timeSlots, getUnavailableSlots } from "../data/mockData";

const dayLabels = ["Today", "Tomorrow", "This Week"];

export default function DoctorProfile() {
  const { doctorId } = useParams(); // dynamic route param
  const [activeDay, setActiveDay] = useState(0);

  const doc = doctors.find((d) => d.id === doctorId);
  if (!doc) return <Navigate to="/specialists" replace />;

  const unavailable = getUnavailableSlots(doc.id);
  const initials = doc.name.replace("Dr. ", "").split(" ").map((n) => n[0]).join("");

  return (
    <section className="section">
      <div className="wrap">
        <Link to="/specialists" className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }}>
          <Icon name="chevronLeft" size={16} /> Back to Specialists
        </Link>

        <div className="grid" style={{ gridTemplateColumns: "340px 1fr", gap: 32 }}>
          {/* ---------- Left: profile summary ---------- */}
          <div>
            <div className="card card-pad center" style={{ marginBottom: 20 }}>
              <div style={{
                width: 96, height: 96, borderRadius: "50%", margin: "0 auto 16px",
                background: "linear-gradient(135deg,var(--navy-800),var(--navy-600))",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 28, fontFamily: "var(--font-display)",
              }}>
                {initials}
              </div>
              <div className="flex items-center gap-8" style={{ justifyContent: "center" }}>
                <h2 style={{ fontSize: 19 }}>{doc.name}</h2>
                {doc.verified && <Icon name="checkCircle" size={16} style={{ color: "var(--teal-600)" }} />}
              </div>
              <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>{doc.specialty} · {doc.department}</p>
              <div className="flex gap-8" style={{ justifyContent: "center", marginTop: 12, flexWrap: "wrap" }}>
                <span className="badge badge-teal">★ {doc.rating}</span>
                <span className="badge badge-navy">{doc.experience}+ yrs</span>
              </div>
              <Link to={`/patient/book-appointment/${doc.id}`} className="btn btn-primary btn-block" style={{ marginTop: 20 }}>
                Book Appointment
              </Link>
            </div>

            <div className="card card-pad">
              <InfoRow icon="file" label="Qualifications" value={doc.qualifications} />
              <InfoRow icon="grid" label="Consultation Fee" value={`₹${doc.fee}`} />
              <InfoRow icon="globe" label="Languages" value={doc.languages.join(", ")} />
              <InfoRow icon="mapPin" label="Location" value={doc.location} />
              <InfoRow icon="calendar" label="Available Days" value={doc.availableDays.join(", ")} last />
            </div>
          </div>

          {/* ---------- Right: about + availability ---------- */}
          <div>
            <div className="card card-pad" style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 17, marginBottom: 10 }}>About {doc.name}</h3>
              <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.7 }}>{doc.about}</p>
              <h4 style={{ fontSize: 14, marginTop: 18, marginBottom: 10 }}>Areas of Expertise</h4>
              <div className="flex gap-8" style={{ flexWrap: "wrap" }}>
                {doc.expertise.map((e) => <span key={e} className="badge badge-navy">{e}</span>)}
              </div>
            </div>

            <div className="card card-pad">
              <h3 style={{ fontSize: 17, marginBottom: 16 }}>Availability</h3>
              <div className="flex gap-8" style={{ marginBottom: 20 }}>
                {dayLabels.map((label, i) => (
                  <button
                    key={label}
                    onClick={() => setActiveDay(i)}
                    className={`btn btn-sm ${activeDay === i ? "btn-primary" : "btn-outline"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="grid grid-4" style={{ gap: 12 }}>
                {timeSlots.map((slot) => {
                  const disabled = unavailable.includes(slot);
                  return (
                    <button
                      key={slot}
                      disabled={disabled}
                      className={`btn btn-sm ${disabled ? "btn-ghost" : "btn-outline"}`}
                      style={disabled ? { opacity: 0.4, textDecoration: "line-through", cursor: "not-allowed" } : {}}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>

              <Link to={`/patient/book-appointment/${doc.id}`} className="btn btn-primary btn-block" style={{ marginTop: 24 }}>
                Continue to Book Appointment <Icon name="arrowRight" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, value, last }) {
  return (
    <div className="flex gap-12" style={{ paddingBottom: 14, marginBottom: 14, borderBottom: last ? "none" : "1px solid var(--navy-50)" }}>
      <Icon name={icon} size={17} style={{ color: "var(--teal-600)", flexShrink: 0, marginTop: 2 }} />
      <div>
        <p className="muted" style={{ fontSize: 12 }}>{label}</p>
        <p style={{ fontSize: 14, fontWeight: 500 }}>{value}</p>
      </div>
    </div>
  );
}
