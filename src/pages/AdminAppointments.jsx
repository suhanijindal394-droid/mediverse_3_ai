import { useState, useMemo } from "react";
import { doctors, departments, formatDisplayDate } from "../data/mockData";
import { useAppointments } from "../hooks/useSharedData";

const statuses = ["All", "Upcoming", "Completed", "Cancelled", "Rescheduled"];

export default function AdminAppointments() {
  const [status, setStatus] = useState("All");
  const [department, setDepartment] = useState("All");
  const { allAppointments } = useAppointments();

  const filtered = useMemo(() => {
    return (allAppointments || []).filter((a) => {
      const doc = doctors.find((d) => d.id === a.doctorId);
      const matchStatus = status === "All" || a.status === status;
      const matchDept = department === "All" || doc?.department === department;
      return matchStatus && matchDept;
    });
  }, [allAppointments, status, department]);

  return (
    <div>
      <h1 style={{ fontSize: "clamp(22px,3vw,28px)", marginBottom: 6 }}>Manage Appointments</h1>
      <p className="muted" style={{ marginBottom: 20 }}>{filtered.length} appointments found</p>

      <div className="card card-pad flex gap-12" style={{ marginBottom: 20, flexWrap: "wrap" }}>
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={selectStyle}>
          {statuses.map((s) => <option key={s} value={s}>{s === "All" ? "All Statuses" : s}</option>)}
        </select>
        <select value={department} onChange={(e) => setDepartment(e.target.value)} style={selectStyle}>
          <option value="All">All Departments</option>
          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div className="card" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
          <thead>
            <tr style={{ background: "var(--navy-50)" }}>
              {["Appointment ID", "Doctor", "Department", "Date", "Time", "Status"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, color: "var(--ink-600)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => {
              const doc = doctors.find((d) => d.id === a.doctorId);
              return (
                <tr key={a.id} style={{ borderBottom: "1px solid var(--navy-50)" }}>
                  <td style={{ padding: "12px 16px", fontSize: 13 }} className="font-mono">{a.id}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 600, fontSize: 13.5 }}>{doc?.name}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13.5 }}>{doc?.department}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13.5 }}>{formatDisplayDate(a.date)}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13.5 }}>{a.time}</td>
                  <td style={{ padding: "12px 16px" }}><StatusBadge status={a.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = { Upcoming: "badge-teal", Completed: "badge-green", Cancelled: "badge-red", Rescheduled: "badge-amber" };
  return <span className={`badge ${map[status] || "badge-navy"}`}>{status}</span>;
}

const selectStyle = { padding: "10px 14px", borderRadius: 10, border: "1px solid var(--navy-100)", fontSize: 13.5, background: "#fff" };
