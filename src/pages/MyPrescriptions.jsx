import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { doctors, formatDisplayDate } from "../data/mockData";
import { usePrescriptions } from "../hooks/useSharedData";

export default function MyPrescriptions() {
  const { prescriptions } = usePrescriptions();

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: 6, flexWrap: "wrap", gap: 10 }}>
        <h1 style={{ fontSize: "clamp(22px,3vw,28px)" }}>My Prescriptions</h1>
        <Link to="/patient/pharmacy" className="btn btn-primary btn-sm">
          <Icon name="building" size={14} /> Open Pharmacy
        </Link>
      </div>
      <p className="muted" style={{ marginBottom: 24 }}>Digital prescriptions issued by your attending physicians.</p>

      {!prescriptions || prescriptions.length === 0 ? (
        <div className="card card-pad center" style={{ padding: 60 }}>
          <Icon name="pill" size={28} style={{ color: "var(--ink-400)", marginBottom: 14 }} />
          <h3>No prescriptions yet.</h3>
          <p className="muted" style={{ marginTop: 6 }}>
            When a doctor writes a prescription for you, it will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-2">
          {prescriptions.map((rx) => {
            const doc = doctors.find((d) => d.id === rx.doctorId);
            const medicines = rx.medicines || [];
            return (
              <Link to={`/patient/prescriptions/${rx.id}`} key={rx.id} className="card card-pad card-hover">
                <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                  <div className="flex items-center gap-12">
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--teal-50)", color: "var(--teal-600)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="pill" size={19} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 14.5 }} className="font-mono">{rx.id}</p>
                      <p className="muted" style={{ fontSize: 12.5 }}>{doc?.name || "Consulting Physician"}</p>
                    </div>
                  </div>
                  <span className={`badge ${rx.status === "Active" ? "badge-green" : "badge-navy"}`}>{rx.status || "Active"}</span>
                </div>
                <p className="muted" style={{ fontSize: 13, marginBottom: 10 }}>
                  {medicines.length} medicine{medicines.length === 1 ? "" : "s"} · Issued {formatDisplayDate(rx.date)}
                </p>
                <div className="flex gap-8" style={{ flexWrap: "wrap" }}>
                  {medicines.map((m, i) => <span key={i} className="badge badge-navy">{m.name}</span>)}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
