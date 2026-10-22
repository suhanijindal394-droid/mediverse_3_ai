import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import useAuth from "../hooks/useAuth";
import { patientsList } from "../data/mockData";
import useLocalStorage from "../hooks/useLocalStorage";
import { usePrescriptions } from "../hooks/useSharedData";

export default function PharmacyDashboard() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [dispensed, setDispensed] = useLocalStorage("mv_dispensed", []);
  const { session, logout } = useAuth();
  const { allPrescriptions } = usePrescriptions();
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    const patient = patientsList.find((p) => p.patientId.toLowerCase() === query.trim().toLowerCase());
    if (!patient) {
      setResult(null);
      setNotFound(true);
      return;
    }
    setNotFound(false);
    const rx = (allPrescriptions || []).filter((p) => p.patientId === patient.patientId && p.status === "Active");
    setResult({ patient, prescriptions: rx });
  }

  function markDispensed(rxId) {
    setDispensed((prev) => [...prev, { rxId, date: new Date().toISOString().slice(0, 10) }]);
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header className="portal-topbar wrap" style={{ maxWidth: "100%" }}>
        <div className="flex items-center gap-8">
          <span className="brand-mark"><Icon name="crossMed" size={16} style={{ color: "#5EEAD4" }} /></span>
          <span style={{ fontWeight: 700, fontFamily: "var(--font-display)" }}>Pharmacy Portal</span>
        </div>
        <div style={{ flex: 1 }} />
        <span className="muted" style={{ fontSize: 13.5, marginRight: 12 }}>{session?.name}</span>
        <button className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
      </header>

      <div className="wrap" style={{ padding: "32px 28px", maxWidth: 900 }}>
        <h1 style={{ fontSize: "clamp(22px,3vw,28px)", marginBottom: 6 }}>Find Prescription</h1>
        <p className="muted" style={{ marginBottom: 20 }}>Enter the patient's ID to look up active prescriptions.</p>

        <form onSubmit={handleSearch} className="card card-pad flex gap-12" style={{ marginBottom: 24, flexWrap: "wrap" }}>
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Patient ID — e.g. PT-2026-10482"
            style={{ flex: "1 1 260px", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--navy-100)", fontSize: 14.5, outline: "none" }}
          />
          <button type="submit" className="btn btn-primary">Find Prescription</button>
        </form>

        {notFound && (
          <div className="card card-pad center" style={{ padding: 40 }}>
            <Icon name="search" size={26} style={{ color: "var(--ink-400)", marginBottom: 10 }} />
            <p className="muted">No patient found with that ID. Try <span className="font-mono">PT-2026-10482</span>.</p>
          </div>
        )}

        {result && (
          <div className="fade-up">
            <div className="card card-pad flex items-center gap-16" style={{ marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--navy-100)", color: "var(--navy-800)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontFamily: "var(--font-display)" }}>
                {result.patient.name[0]}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 16 }}>{result.patient.name}</p>
                <p className="font-mono muted" style={{ fontSize: 13 }}>{result.patient.patientId}</p>
              </div>
            </div>

            {result.prescriptions.length === 0 ? (
              <div className="card card-pad center" style={{ padding: 40 }}>
                <p className="muted">No active prescriptions for this patient.</p>
              </div>
            ) : (
              result.prescriptions.map((rx) => {
                const isDispensed = dispensed.some((d) => d.rxId === rx.id);
                return (
                  <div key={rx.id} className="card card-pad" style={{ marginBottom: 16 }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                      <p style={{ fontWeight: 700, fontSize: 15 }} className="font-mono">Prescription #{rx.id}</p>
                      <span className={`badge ${isDispensed ? "badge-navy" : "badge-green"}`}>
                        {isDispensed ? "Dispensed" : "Ready for Dispensing"}
                      </span>
                    </div>
                    {rx.medicines.map((m) => (
                      <div key={m.name} className="flex items-center justify-between" style={{ padding: "8px 0", borderBottom: "1px solid var(--navy-50)" }}>
                        <span style={{ fontSize: 13.5, fontWeight: 600 }}>{m.name}</span>
                        <span className="muted" style={{ fontSize: 12.5 }}>{m.duration} supply · {m.dosage}</span>
                      </div>
                    ))}
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ marginTop: 16 }}
                      disabled={isDispensed}
                      onClick={() => markDispensed(rx.id)}
                    >
                      {isDispensed ? "Already Dispensed" : "Mark as Dispensed"}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
