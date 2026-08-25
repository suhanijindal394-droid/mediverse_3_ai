import { useState } from "react";
import Icon from "../components/Icon";
import { demoPrescriptions, demoPatient } from "../data/mockData";

export default function PatientPharmacy() {
  const [tab, setTab] = useState("Monthly");
  const activeRx = demoPrescriptions.filter((p) => p.status === "Active");

  return (
    <div>
      <h1 style={{ fontSize: "clamp(22px,3vw,28px)", marginBottom: 6 }}>Pharmacy</h1>
      <p className="muted" style={{ marginBottom: 20 }}>
        Use your Patient ID at the hospital pharmacy counter to collect prescribed medicines.
      </p>

      <div className="card card-pad flex items-center gap-16" style={{ marginBottom: 24, background: "var(--navy-900)", border: "none" }}>
        <Icon name="crossMed" size={26} style={{ color: "var(--teal-300)" }} />
        <div>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Show this ID at the pharmacy</p>
          <p className="font-mono" style={{ color: "var(--teal-300)", fontSize: 20, fontWeight: 600 }}>{demoPatient.patientId}</p>
        </div>
      </div>

      <div className="flex gap-8" style={{ marginBottom: 20 }}>
        {["Weekly", "Monthly"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`btn btn-sm ${tab === t ? "btn-primary" : "btn-outline"}`}>
            {t} Medication Plan
          </button>
        ))}
      </div>

      <div className="grid grid-2">
        {activeRx.flatMap((rx) => rx.medicines).map((m, i) => {
          const dailyDose = m.frequency.includes("2") ? 2 : 1;
          const totalDays = tab === "Weekly" ? 7 : 30;
          const tablets = dailyDose * totalDays;
          return (
            <div key={i} className="card card-pad">
              <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                <p style={{ fontWeight: 700, fontSize: 15 }}>{m.name}</p>
                <span className="badge badge-teal">{m.dosage}</span>
              </div>
              <p className="muted" style={{ fontSize: 13.5, marginBottom: 14 }}>{m.frequency} · {m.instructions}</p>
              <div className="grid grid-2" style={{ gap: 12 }}>
                <MiniStat label={`${tab} Supply`} value={`${tablets} tablets`} />
                <MiniStat label="Pickup Date" value="14 Aug 2026" />
              </div>
            </div>
          );
        })}
      </div>

      {activeRx.length === 0 && (
        <div className="card card-pad center" style={{ padding: 60 }}>
          <Icon name="pill" size={26} style={{ color: "var(--ink-400)", marginBottom: 12 }} />
          <p className="muted">No active medications right now.</p>
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div>
      <p className="muted" style={{ fontSize: 11.5 }}>{label}</p>
      <p style={{ fontWeight: 600, fontSize: 14 }}>{value}</p>
    </div>
  );
}
