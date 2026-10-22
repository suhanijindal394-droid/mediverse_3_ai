import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { doctors, formatDisplayDate } from "../data/mockData";
import { useAppointments } from "../hooks/useSharedData";

const tabs = ["Upcoming", "Completed", "Cancelled"];

export default function MyAppointments() {
  const { appointments, cancelAppointment, updateAppointmentStatus } = useAppointments();
  const [activeTab, setActiveTab] = useState("Upcoming");

  const filtered = useMemo(() => {
    return (appointments || []).filter((a) => a.status === activeTab);
  }, [appointments, activeTab]);

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: 6, flexWrap: "wrap", gap: 10 }}>
        <h1 style={{ fontSize: "clamp(22px,3vw,28px)" }}>My Appointments</h1>
        <Link to="/specialists" className="btn btn-primary btn-sm">
          <Icon name="plus" size={14} /> Book New Appointment
        </Link>
      </div>
      <p className="muted" style={{ marginBottom: 24 }}>View, reschedule or cancel your upcoming visits.</p>

      <div className="flex gap-8" style={{ marginBottom: 24, borderBottom: "1px solid var(--navy-100)" }}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className="btn btn-sm"
            style={{
              background: "none",
              border: "none",
              borderRadius: 0,
              borderBottom: activeTab === t ? "2px solid var(--navy-900)" : "2px solid transparent",
              color: activeTab === t ? "var(--navy-900)" : "var(--ink-400)",
              fontWeight: activeTab === t ? 700 : 500,
              padding: "10px 14px",
            }}
          >
            {t} ({ (appointments || []).filter((a) => a.status === t).length })
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
                    <p style={{ fontWeight: 700, fontSize: 15.5 }}>{doc?.name || "Specialist Physician"}</p>
                    <p className="muted" style={{ fontSize: 13 }}>{doc?.specialty || "Hospital Clinic"}</p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>

                <div className="flex items-center gap-16" style={{ marginBottom: 6, fontSize: 13.5 }}>
                  <span className="flex items-center gap-8">
                    <Icon name="calendar" size={14} /> {formatDisplayDate(a.date)}
                  </span>
                  <span className="flex items-center gap-8">
                    <Icon name="clock" size={14} /> {a.time}
                  </span>
                </div>

                <p className="flex items-center gap-8 muted" style={{ fontSize: 13, marginBottom: 16 }}>
                  <Icon name="mapPin" size={14} /> {a.room || doc?.location || "Main Hospital Building"}
                </p>

                {a.notes && (
                  <p
                    style={{
                      fontSize: 12.5,
                      padding: "8px 10px",
                      background: "var(--navy-50)",
                      borderRadius: 8,
                      marginBottom: 16,
                      color: "var(--ink-700)",
                    }}
                  >
                    {a.notes}
                  </p>
                )}

                <div className="flex gap-8">
                  <Link to={`/specialists/${doc?.id || ""}`} className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                    Doctor Info
                  </Link>
                  {a.status === "Upcoming" && (
                    <>
                      <Link to={`/patient/book-appointment/${doc?.id || ""}`} className="btn btn-ghost btn-sm" style={{ flex: 1 }}>
                        Reschedule
                      </Link>
                      <button
                        onClick={() => cancelAppointment(a.id)}
                        className="btn btn-ghost btn-sm"
                        style={{ flex: 1, color: "var(--red-600)" }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {a.status === "Cancelled" && (
                    <button
                      onClick={() => updateAppointmentStatus(a.id, "Upcoming")}
                      className="btn btn-outline btn-sm"
                      style={{ flex: 1 }}
                    >
                      Restore Visit
                    </button>
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
    Upcoming: "badge-teal",
    Completed: "badge-green",
    Cancelled: "badge-red",
    Rescheduled: "badge-amber",
  };
  return <span className={`badge ${map[status] || "badge-navy"}`}>{status}</span>;
}
