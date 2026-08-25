import { useState } from "react";
import Icon from "../components/Icon";
import { doctors as initialDoctors } from "../data/mockData";

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState(initialDoctors.map((d) => ({ ...d, active: true })));

  function toggleActive(id) {
    setDoctors((prev) => prev.map((d) => (d.id === id ? { ...d, active: !d.active } : d)));
  }

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h1 style={{ fontSize: "clamp(22px,3vw,28px)" }}>Manage Doctors</h1>
          <p className="muted" style={{ marginTop: 4 }}>{doctors.length} doctors on the platform</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => alert("Add Doctor form (demo)")}>
          <Icon name="plus" size={15} /> Add Doctor
        </button>
      </div>

      <div className="card" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
          <thead>
            <tr style={{ background: "var(--navy-50)" }}>
              {["Name", "Specialization", "Department", "Experience", "Availability", "Status", "Actions"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, color: "var(--ink-600)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d.id} style={{ borderBottom: "1px solid var(--navy-50)" }}>
                <td style={{ padding: "12px 16px", fontWeight: 600, fontSize: 13.5 }}>{d.name}</td>
                <td style={{ padding: "12px 16px", fontSize: 13.5 }}>{d.specialty}</td>
                <td style={{ padding: "12px 16px", fontSize: 13.5 }}>{d.department}</td>
                <td style={{ padding: "12px 16px", fontSize: 13.5 }}>{d.experience}+ yrs</td>
                <td style={{ padding: "12px 16px", fontSize: 13.5 }}>{d.availableDays.join(", ")}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span className={`badge ${d.active ? "badge-green" : "badge-red"}`}>{d.active ? "Active" : "Inactive"}</span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div className="flex gap-6">
                    <button className="icon-btn" title="Edit" onClick={() => alert("Edit Doctor (demo)")}><Icon name="edit" size={16} /></button>
                    <button className="icon-btn" title={d.active ? "Deactivate" : "Activate"} onClick={() => toggleActive(d.id)} style={{ color: d.active ? "var(--red-600)" : "var(--green-600)" }}>
                      <Icon name={d.active ? "close" : "check"} size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
