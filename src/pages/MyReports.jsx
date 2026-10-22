import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { demoReports, doctors, formatDisplayDate } from "../data/mockData";

const categoryIcon = {
  "Blood Tests": "activity", "Imaging": "file", "ECG": "activity",
  "X-Ray": "bone", "MRI": "brain", "CT Scan": "brain", "Other": "file",
};

export default function MyReports() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(demoReports.map((r) => r.category))];

  const filtered = useMemo(
    () => (filter === "All" ? demoReports : demoReports.filter((r) => r.category === filter)),
    [filter]
  );

  return (
    <div>
      <h1 style={{ fontSize: "clamp(22px,3vw,28px)", marginBottom: 6 }}>My Reports</h1>
      <p className="muted" style={{ marginBottom: 20 }}>Lab and diagnostic reports from your visits.</p>

      <div className="flex gap-8" style={{ marginBottom: 24, flexWrap: "wrap" }}>
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`btn btn-sm ${filter === c ? "btn-primary" : "btn-outline"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-2">
        {filtered.map((r) => {
          const doc = doctors.find((d) => d.id === r.doctorId);
          return (
            <Link to={`/patient/reports/${r.id}`} key={r.id} className="card card-pad card-hover">
              <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                <div className="flex items-center gap-12">
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--amber-100)", color: "var(--amber-600)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={categoryIcon[r.category] || "file"} size={18} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14.5 }}>{r.name}</p>
                    <p className="muted" style={{ fontSize: 12.5 }}>{r.department} · {doc?.name}</p>
                  </div>
                </div>
                <span className="badge badge-green">{r.status}</span>
              </div>
              <p className="muted" style={{ fontSize: 12.5 }}>
                {formatDisplayDate(r.date)}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
