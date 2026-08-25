import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { demoPrescriptions, doctors } from "../data/mockData";

export default function MyPrescriptions() {
  return (
    <div>
      <h1 style={{ fontSize: "clamp(22px,3vw,28px)", marginBottom: 6 }}>My Prescriptions</h1>
      <p className="muted" style={{ marginBottom: 24 }}>Prescriptions your doctor has written for you.</p>

      {demoPrescriptions.length === 0 ? (
        <div className="card card-pad center" style={{ padding: 60 }}>
          <Icon name="pill" size={28} style={{ color: "var(--ink-400)", marginBottom: 14 }} />
          <h3>No prescriptions yet.</h3>
        </div>
      ) : (
        <div className="grid grid-2">
          {demoPrescriptions.map((rx) => {
            const doc = doctors.find((d) => d.id === rx.doctorId);
            return (
              <Link to={`/patient/prescriptions/${rx.id}`} key={rx.id} className="card card-pad card-hover">
                <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                  <div className="flex items-center gap-12">
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--teal-50)", color: "var(--teal-600)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="pill" size={19} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 14.5 }} className="font-mono">{rx.id}</p>
                      <p className="muted" style={{ fontSize: 12.5 }}>{doc?.name}</p>
                    </div>
                  </div>
                  <span className={`badge ${rx.status === "Active" ? "badge-green" : "badge-navy"}`}>{rx.status}</span>
                </div>
                <p className="muted" style={{ fontSize: 13, marginBottom: 10 }}>
                  {rx.medicines.length} medicine{rx.medicines.length > 1 ? "s" : ""} · Issued {new Date(rx.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </p>
                <div className="flex gap-8" style={{ flexWrap: "wrap" }}>
                  {rx.medicines.map((m) => <span key={m.name} className="badge badge-navy">{m.name}</span>)}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
