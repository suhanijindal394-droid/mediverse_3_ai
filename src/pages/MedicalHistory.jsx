import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { doctors, demoReports, formatDisplayDate, demoPatient } from "../data/mockData";
import useAuth from "../hooks/useAuth";
import { useAppointments, usePrescriptions } from "../hooks/useSharedData";

const filterTabs = ["All Records", "Appointments", "Prescriptions", "Lab Reports"];

export default function MedicalHistory() {
  const { session } = useAuth();
  const currentPatientId =
    session?.role === "patient" ? session.id : demoPatient.patientId;

  const { appointments } = useAppointments(currentPatientId);
  const { prescriptions } = usePrescriptions(currentPatientId);

  const [filter, setFilter] = useState("All Records");

  // Filter reports for current patient
  const patientReports = useMemo(() => {
    return (demoReports || []).filter(
      (r) => !r.patientId || r.patientId === currentPatientId
    );
  }, [currentPatientId]);

  // Combine appointments, prescriptions & reports into one chronological timeline
  const events = useMemo(() => {
    const list = [];

    // 1. Appointments
    if (filter === "All Records" || filter === "Appointments") {
      (appointments || []).forEach((a) => {
        list.push({
          id: a.id,
          date: a.date,
          type: "appointment",
          status: a.status || "Upcoming",
          data: a,
        });
      });
    }

    // 2. Prescriptions
    if (filter === "All Records" || filter === "Prescriptions") {
      (prescriptions || []).forEach((p) => {
        list.push({
          id: p.id,
          date: p.date,
          type: "prescription",
          status: p.status || "Active",
          data: p,
        });
      });
    }

    // 3. Reports
    if (filter === "All Records" || filter === "Lab Reports") {
      (patientReports || []).forEach((r) => {
        list.push({
          id: r.id,
          date: r.date,
          type: "report",
          status: r.status || "Ready",
          data: r,
        });
      });
    }

    // Sort newest first
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [appointments, prescriptions, patientReports, filter]);

  // Group by "Month Year"
  const grouped = useMemo(() => {
    return events.reduce((acc, ev) => {
      const d = new Date(ev.date);
      const key = isNaN(d.getTime())
        ? "Recent Records"
        : d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
      acc[key] = acc[key] || [];
      acc[key].push(ev);
      return acc;
    }, {});
  }, [events]);

  const upcomingCount = useMemo(() => {
    return (appointments || []).filter((a) => a.status === "Upcoming").length;
  }, [appointments]);

  return (
    <div>
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: 20, flexWrap: "wrap", gap: 12 }}
      >
        <div>
          <h1 style={{ fontSize: "clamp(22px,3vw,28px)", marginBottom: 6 }}>
            Medical History
          </h1>
          <p className="muted">
            Your centralized digital health timeline combining appointments, prescriptions, and lab reports.
          </p>
        </div>

        {upcomingCount > 0 && (
          <div
            className="flex items-center gap-8"
            style={{
              padding: "8px 14px",
              background: "var(--teal-50)",
              borderRadius: 8,
              border: "1px solid var(--teal-200)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--teal-600)",
              }}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--teal-800)" }}>
              {upcomingCount} Upcoming Visit{upcomingCount === 1 ? "" : "s"}
            </span>
          </div>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-8" style={{ marginBottom: 24, flexWrap: "wrap" }}>
        {filterTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`btn btn-sm ${filter === tab ? "btn-primary" : "btn-outline"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {events.length === 0 ? (
        <div className="card card-pad center" style={{ padding: 60 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "var(--navy-50)",
              color: "var(--ink-400)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <Icon name="activity" size={26} />
          </div>
          <h3 style={{ fontSize: 17, marginBottom: 6 }}>No records found</h3>
          <p className="muted" style={{ fontSize: 13.5, marginBottom: 18 }}>
            There are no medical timeline events matching "{filter}".
          </p>
          <Link to="/specialists" className="btn btn-primary btn-sm">
            Book an Appointment
          </Link>
        </div>
      ) : (
        Object.entries(grouped).map(([month, items]) => (
          <div key={month} style={{ marginBottom: 32 }}>
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                marginBottom: 16,
                color: "var(--navy-800)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {month}
            </h3>
            <div className="care-rail-v">
              {items.map((ev, i) => (
                <TimelineItem key={ev.id || i} ev={ev} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function TimelineItem({ ev }) {
  const doc = doctors.find((d) => d.id === ev.data.doctorId);

  // Distinguish tone and styling based on record type and status
  let tone = { bg: "var(--navy-50)", color: "var(--navy-700)", border: "var(--navy-100)" };
  let iconName = "file";
  let statusBadgeClass = "badge-navy";

  if (ev.type === "appointment") {
    iconName = "calendar";
    if (ev.data.status === "Upcoming") {
      tone = { bg: "var(--teal-50)", color: "var(--teal-700)", border: "var(--teal-300)" };
      statusBadgeClass = "badge-teal";
    } else if (ev.data.status === "Completed") {
      tone = { bg: "var(--green-50)", color: "var(--green-700)", border: "var(--green-200)" };
      statusBadgeClass = "badge-green";
    } else if (ev.data.status === "Cancelled") {
      tone = { bg: "var(--red-50)", color: "var(--red-700)", border: "var(--red-200)" };
      statusBadgeClass = "badge-red";
    }
  } else if (ev.type === "prescription") {
    iconName = "pill";
    tone = { bg: "var(--teal-50)", color: "var(--teal-600)", border: "var(--teal-200)" };
    statusBadgeClass = "badge-green";
  } else if (ev.type === "report") {
    iconName = "file";
    tone = { bg: "var(--amber-100)", color: "var(--amber-700)", border: "var(--amber-200)" };
    statusBadgeClass = "badge-amber";
  }

  return (
    <div style={{ position: "relative", paddingBottom: 24 }}>
      <div
        className="rail-node-sm"
        style={{
          background: tone.bg,
          borderColor: tone.color,
          color: tone.color,
        }}
      >
        <Icon name={iconName} size={16} />
      </div>

      <div
        className="card card-pad"
        style={{
          marginLeft: 8,
          borderColor: ev.type === "appointment" && ev.data.status === "Upcoming" ? "var(--teal-300)" : undefined,
          background: ev.type === "appointment" && ev.data.status === "Upcoming" ? "linear-gradient(180deg, #FFFFFF, var(--teal-50))" : "#FFFFFF",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: 6, flexWrap: "wrap", gap: 6 }}>
          <div className="flex items-center gap-10">
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: tone.color,
              }}
            >
              {ev.type}
            </span>
            <span className={`badge ${statusBadgeClass}`} style={{ fontSize: 11 }}>
              {ev.data.status || "Active"}
            </span>
          </div>

          <span className="muted" style={{ fontSize: 12.5, fontWeight: 500 }}>
            {formatDisplayDate(ev.date)} {ev.data.time ? `· ${ev.data.time}` : ""}
          </span>
        </div>

        {/* Content Details based on type */}
        {ev.type === "appointment" && (
          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: "var(--navy-900)" }}>
              {doc?.department || "General"} Consultation · {doc?.name || "Specialist"}
            </p>
            <p className="muted" style={{ fontSize: 13, marginTop: 2 }}>
              {doc?.specialty} · {ev.data.type || "In-person"} {ev.data.room ? `(${ev.data.room})` : ""}
            </p>
            {ev.data.notes && (
              <p
                style={{
                  fontSize: 13,
                  marginTop: 8,
                  padding: "8px 12px",
                  background: "var(--navy-50)",
                  borderRadius: 8,
                  color: "var(--ink-700)",
                }}
              >
                <strong>Consultation Details:</strong> {ev.data.notes}
              </p>
            )}
            <div className="flex gap-8" style={{ marginTop: 12 }}>
              <Link to="/patient/appointments" className="btn btn-outline btn-sm">
                View in Appointments
              </Link>
            </div>
          </div>
        )}

        {ev.type === "prescription" && (
          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: "var(--navy-900)" }}>
              Prescription {ev.data.id} · Issued by {doc?.name || "Hospital Physician"}
            </p>
            <p className="muted" style={{ fontSize: 13, marginTop: 2 }}>
              Doctor instructions: {ev.data.instructions || "Follow prescribed dosage."}
            </p>

            {/* Prescribed medicines list with dosage and frequency */}
            {ev.data.medicines && ev.data.medicines.length > 0 && (
              <div style={{ marginTop: 10 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-600)", marginBottom: 6 }}>
                  PRESCRIBED MEDICINES:
                </p>
                <div className="flex gap-8" style={{ flexWrap: "wrap" }}>
                  {ev.data.medicines.map((m, idx) => (
                    <span
                      key={idx}
                      className="badge badge-navy"
                      style={{ fontSize: 12, padding: "4px 10px" }}
                    >
                      <strong>{m.name}</strong> · {m.dosage} ({m.frequency})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {ev.data.followUp && (
              <p className="muted" style={{ fontSize: 12, marginTop: 8 }}>
                Recommended Follow-up: <strong>{formatDisplayDate(ev.data.followUp)}</strong>
              </p>
            )}

            <div className="flex gap-8" style={{ marginTop: 12 }}>
              <Link to={`/patient/prescriptions/${ev.data.id}`} className="btn btn-outline btn-sm">
                View Prescription Details
              </Link>
              <Link to="/patient/pharmacy" className="btn btn-ghost btn-sm">
                Pharmacy Pickup Info
              </Link>
            </div>
          </div>
        )}

        {ev.type === "report" && (
          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: "var(--navy-900)" }}>
              {ev.data.name}
            </p>
            <p className="muted" style={{ fontSize: 13, marginTop: 2 }}>
              {ev.data.department} · Category: {ev.data.category}
            </p>
            {ev.data.summary && (
              <p
                style={{
                  fontSize: 13,
                  marginTop: 8,
                  padding: "8px 12px",
                  background: "var(--amber-50)",
                  borderRadius: 8,
                  color: "var(--amber-800)",
                }}
              >
                <strong>Clinical Summary:</strong> {ev.data.summary}
              </p>
            )}
            <div className="flex gap-8" style={{ marginTop: 12 }}>
              <Link to={`/patient/reports/${ev.data.id}`} className="btn btn-outline btn-sm">
                View Diagnostic Report
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
