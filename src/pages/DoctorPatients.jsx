import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { patientsList } from "../data/mockData";

export default function DoctorPatients() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return patientsList;
    const q = query.toLowerCase();
    return patientsList.filter((p) =>
      p.name.toLowerCase().includes(q) || p.patientId.toLowerCase().includes(q) || p.phone.includes(q)
    );
  }, [query]);

  return (
    <div>
      <h1 style={{ fontSize: "clamp(22px,3vw,28px)", marginBottom: 6 }}>My Patients</h1>
      <p className="muted" style={{ marginBottom: 20 }}>Search by Patient ID, name, or phone number.</p>

      <div className="card card-pad" style={{ marginBottom: 24, position: "relative" }}>
        <Icon name="search" size={17} style={{ position: "absolute", left: 40, top: 38, color: "var(--ink-400)" }} />
        <input
          type="text" placeholder="Search patients…" value={query} onChange={(e) => setQuery(e.target.value)}
          style={{ width: "100%", padding: "12px 14px 12px 40px", borderRadius: 10, border: "1px solid var(--navy-100)", fontSize: 14.5, outline: "none" }}
        />
      </div>

      <div className="grid grid-2">
        {filtered.map((p) => (
          <div key={p.patientId} className="card card-pad">
            <div className="flex items-center gap-12" style={{ marginBottom: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", background: "var(--navy-100)", color: "var(--navy-800)",
                display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontFamily: "var(--font-display)",
              }}>
                {p.name[0]}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</p>
                <p className="font-mono muted" style={{ fontSize: 12 }}>{p.patientId}</p>
              </div>
            </div>
            <div className="grid grid-2" style={{ marginBottom: 16, gap: 10 }}>
              <MiniInfo label="Age" value={`${p.age} yrs`} />
              <MiniInfo label="Last Visit" value={new Date(p.lastVisit).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} />
            </div>
            <Link to={`/doctor/patient/${p.patientId}`} className="btn btn-primary btn-sm btn-block">Open Medical Record</Link>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card card-pad center" style={{ padding: 50 }}>
          <p className="muted">No patients match that search.</p>
        </div>
      )}
    </div>
  );
}

function MiniInfo({ label, value }) {
  return (
    <div>
      <p className="muted" style={{ fontSize: 11.5 }}>{label}</p>
      <p style={{ fontSize: 13.5, fontWeight: 600 }}>{value}</p>
    </div>
  );
}
