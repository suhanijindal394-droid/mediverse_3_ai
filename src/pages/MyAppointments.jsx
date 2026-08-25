import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { doctors, demoAppointments } from "../data/mockData";
import useLocalStorage from "../hooks/useLocalStorage";

const tabs = ["Upcoming", "Completed", "Cancelled"];

export default function MyAppointments() {
  const [bookedAppointments, setBookedAppointments] = useLocalStorage("mv_appointments", []);
  const [activeTab, setActiveTab] = useState("Upcoming");

  const allAppointments = useMemo(
    () => [...bookedAppointments, ...demoAppointments],
    [bookedAppointments]
  );

  const filtered = allAppointments.filter((a) => a.status === activeTab);

  function updateStatus(id, status) {
    setBookedAppointments((prev) => {
      const exists = prev.some((a) => a.id === id);
      if (exists) return prev.map((a) => (a.id === id ? { ...a, status } : a));
      // if it was a demo appointment, add an override on top
      const demo = demoAppointments.find((a) => a.id === id);
      return demo ? [{ ...demo, status }, ...prev] : prev;
    });
  }

  return (
    <div>
      <h1 style={{ fontSize: "clamp(22px,3vw,28px)", marginBottom: 6 }}>My Appointments</h1>
      <p className="muted" style={{ marginBottom: 24 }}>View, reschedule or cancel your upcoming visits.</p>

      <div className="flex gap-8" style={{ marginBottom: 24, borderBottom: "1px solid var(--navy-100)" }}>
        {tabs.map((t) => (
          <button
            key={t} onClick={() => setActiveTab(t)}
            className="btn btn-sm"
            style={{
              background: "none", border: "none", borderRadius: 0,
              borderBottom: activeTab === t ? "2px solid var(--navy-900)" : "2px solid transparent",
              color: activeTab === t ? "var(--navy-900)" : "var(--ink-400)",
              fontWeight: activeTab === t ? 700 : 500, padding: "10px 14px",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card card-pad center" style={{ padding: 60 }}>
          <Icon name="calendar" size={28} style={{ color: "var(--ink-400)", marginBottom: 14 }} />
          <h3 style={{ marginBottom: 8 }}>No {activeTab.toLowerCase()} appointments.</h3>
          {activeTab === "Upcoming" && (
            <>
              <p className="muted" style={{ marginBottom: 18 }}>Ready to see a specialist?</p>
              <Link to="/specialists" className="btn btn-primary btn-sm">Book an Appointment</Link>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-2">
          {filtered.map((a) => {
            const doc = doctors.find((d) => d.id === a.doctorId);
            return (
              <div key={a.id} className="card card-pad">
                <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15.5 }}>{doc?.name}</p>
                    <p className="muted" style={{ fontSize: 13 }}>{doc?.specialty}</p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
                <div className="flex items-center gap-16" style={{ marginBottom: 6, fontSize: 13.5 }}>
                  <span className="flex items-center gap-8"><Icon name="calendar" size={14} /> {new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  <span className="flex items-center gap-8"><Icon name="clock" size={14} /> {a.time}</span>
                </div>
                <p className="flex items-center gap-8 muted" style={{ fontSize: 13, marginBottom: 16 }}>
                  <Icon name="mapPin" size={14} /> {a.room || doc?.location}
                </p>
                <div className="flex gap-8">
                  <Link to={`/specialists/${doc?.id}`} className="btn btn-outline btn-sm" style={{ flex: 1 }}>View</Link>
                  {a.status === "Upcoming" && (
                    <>
                      <Link to={`/patient/book-appointment/${doc?.id}`} className="btn btn-ghost btn-sm" style={{ flex: 1 }}>Reschedule</Link>
                      <button onClick={() => updateStatus(a.id, "Cancelled")} className="btn btn-ghost btn-sm" style={{ flex: 1, color: "var(--red-600)" }}>Cancel</button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    Upcoming: "badge-teal", Completed: "badge-green", Cancelled: "badge-red", Rescheduled: "badge-amber",
  };
  return <span className={`badge ${map[status] || "badge-navy"}`}>{status}</span>;
}
