import { useState, useMemo } from "react";
import Icon from "../components/Icon";
import { patientsList } from "../data/mockData";

export default function AdminPatients() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return patientsList;
    const q = query.toLowerCase();
    return patientsList.filter((p) => p.name.toLowerCase().includes(q) || p.patientId.toLowerCase().includes(q) || p.phone.includes(q));
  }, [query]);

  return (
    <div>
      <h1 style={{ fontSize: "clamp(22px,3vw,28px)", marginBottom: 6 }}>Manage Patients</h1>
      <p className="muted" style={{ marginBottom: 20 }}>{patientsList.length} registered patients</p>

      <div className="card card-pad" style={{ marginBottom: 20, position: "relative" }}>
        <Icon name="search" size={17} style={{ position: "absolute", left: 40, top: 38, color: "var(--ink-400)" }} />
        <input
          type="text" placeholder="Search by name, Patient ID, or phone…" value={query} onChange={(e) => setQuery(e.target.value)}
          style={{ width: "100%", padding: "12px 14px 12px 40px", borderRadius: 10, border: "1px solid var(--navy-100)", fontSize: 14.5, outline: "none" }}
        />
      </div>

      <div className="card" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
          <thead>
            <tr style={{ background: "var(--navy-50)" }}>
              {["Patient ID", "Name", "Age", "Last Visit", "Status", "Actions"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, color: "var(--ink-600)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.patientId} style={{ borderBottom: "1px solid var(--navy-50)" }}>
                <td style={{ padding: "12px 16px", fontSize: 13.5 }} className="font-mono">{p.patientId}</td>
                <td style={{ padding: "12px 16px", fontWeight: 600, fontSize: 13.5 }}>{p.name}</td>
                <td style={{ padding: "12px 16px", fontSize: 13.5 }}>{p.age}</td>
                <td style={{ padding: "12px 16px", fontSize: 13.5 }}>{new Date(p.lastVisit).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
                <td style={{ padding: "12px 16px" }}><span className="badge badge-green">Active</span></td>
                <td style={{ padding: "12px 16px" }}>
                  <button className="icon-btn" title="View"><Icon name="chevronRight" size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
