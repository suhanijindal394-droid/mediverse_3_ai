import Icon from "../components/Icon";

const appointmentsPerDay = [
  { label: "Mon", value: 62 }, { label: "Tue", value: 58 }, { label: "Wed", value: 71 },
  { label: "Thu", value: 65 }, { label: "Fri", value: 74 }, { label: "Sat", value: 48 }, { label: "Sun", value: 20 },
];

const patientsPerDept = [
  { label: "General Medicine", value: 3240 }, { label: "Dermatology", value: 2180 },
  { label: "Cardiology", value: 1940 }, { label: "Orthopedics", value: 1520 }, { label: "Neurology", value: 1210 },
];

const mostRequestedDepts = ["General Medicine", "Dermatology", "Cardiology", "Orthopedics", "Neurology"];

export default function AdminAnalytics() {
  const maxDay = Math.max(...appointmentsPerDay.map((d) => d.value));
  const maxDept = Math.max(...patientsPerDept.map((d) => d.value));

  return (
    <div>
      <h1 style={{ fontSize: "clamp(22px,3vw,28px)", marginBottom: 6 }}>Reports & Analytics</h1>
      <p className="muted" style={{ marginBottom: 28 }}>Hospital-wide trends across appointments, departments and pharmacy usage.</p>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <div className="card card-pad">
          <h3 style={{ fontSize: 15.5, marginBottom: 20 }}>Appointments per Day</h3>
          <div className="flex items-end gap-12" style={{ height: 160 }}>
            {appointmentsPerDay.map((d) => (
              <div key={d.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                <span className="font-mono" style={{ fontSize: 11, marginBottom: 6, color: "var(--ink-600)" }}>{d.value}</span>
                <div style={{
                  width: "100%", borderRadius: "6px 6px 0 0",
                  background: "linear-gradient(180deg,var(--teal-400),var(--navy-700))",
                  height: `${(d.value / maxDay) * 100}%`,
                }} />
                <span className="muted" style={{ fontSize: 11.5, marginTop: 6 }}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-pad">
          <h3 style={{ fontSize: 15.5, marginBottom: 20 }}>Patients per Department</h3>
          {patientsPerDept.map((d) => (
            <div key={d.label} style={{ marginBottom: 14 }}>
              <div className="flex justify-between" style={{ marginBottom: 5, fontSize: 12.5 }}>
                <span>{d.label}</span><span className="muted">{d.value.toLocaleString()}</span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: "var(--navy-50)" }}>
                <div style={{ height: "100%", width: `${(d.value / maxDept) * 100}%`, borderRadius: 999, background: "var(--teal-500)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-3" style={{ marginBottom: 24 }}>
        <MiniStat label="Completed Consultations" value="9,842" tone="green" />
        <MiniStat label="Cancelled Appointments" value="312" tone="red" />
        <MiniStat label="New Patient Registrations" value="486" tone="teal" />
      </div>

      {/* ---------- AI Care Navigation Insights ---------- */}
      <div className="card card-pad">
        <div className="flex items-center gap-10" style={{ marginBottom: 18 }}>
          <Icon name="sparkle" size={18} style={{ color: "var(--teal-600)" }} />
          <h3 style={{ fontSize: 16 }}>AI Care Navigation Insights</h3>
        </div>
        <p className="muted" style={{ fontSize: 13, marginBottom: 20 }}>
          Aggregated, anonymized statistics only — no individual patient data is shown here.
        </p>

        <div className="grid grid-2" style={{ gap: 28 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Most Requested Departments</p>
            {mostRequestedDepts.map((d, i) => (
              <div key={d} className="flex items-center gap-10" style={{ marginBottom: 8 }}>
                <span className="font-mono" style={{ fontSize: 12, color: "var(--ink-400)", width: 16 }}>{i + 1}.</span>
                <span style={{ fontSize: 13.5 }}>{d}</span>
              </div>
            ))}
          </div>
          <div>
            <MiniStat label="AI Recommendation Volume" value="4,912 / month" tone="navy" full />
            <div style={{ height: 12 }} />
            <MiniStat label="Successful Appointment Conversions" value="71%" tone="green" full />
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, tone, full }) {
  const tones = {
    navy: "var(--navy-800)", green: "var(--green-600)", red: "var(--red-600)", teal: "var(--teal-600)",
  };
  return (
    <div className="card card-pad" style={{ width: full ? "100%" : "auto" }}>
      <p className="muted" style={{ fontSize: 12.5, marginBottom: 6 }}>{label}</p>
      <p style={{ fontWeight: 700, fontSize: 20, color: tones[tone] }}>{value}</p>
    </div>
  );
}
