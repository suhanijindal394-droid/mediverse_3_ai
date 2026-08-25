import Icon from "../components/Icon";

const stats = [
  { icon: "users", label: "Patients", value: "12,482", tone: "navy" },
  { icon: "stethoscope", label: "Doctors", value: "186", tone: "teal" },
  { icon: "calendar", label: "Today's Appointments", value: "328", tone: "green" },
  { icon: "crossMed", label: "Pharmacy Orders", value: "142", tone: "amber" },
  { icon: "file", label: "Pending Reports", value: "24", tone: "red" },
  { icon: "pill", label: "Active Prescriptions", value: "764", tone: "teal" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: "clamp(22px,3vw,28px)", marginBottom: 6 }}>MediVerse Hospital Administration</h1>
      <p className="muted" style={{ marginBottom: 28 }}>Hospital-wide overview, updated in real time.</p>

      <div className="grid grid-3">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, tone }) {
  const tones = {
    navy: { bg: "var(--navy-50)", color: "var(--navy-800)" },
    teal: { bg: "var(--teal-50)", color: "var(--teal-600)" },
    green: { bg: "var(--green-100)", color: "var(--green-600)" },
    amber: { bg: "var(--amber-100)", color: "var(--amber-600)" },
    red: { bg: "var(--red-100)", color: "var(--red-600)" },
  };
  const t = tones[tone];
  return (
    <div className="card stat-card">
      <div className="stat-icon" style={{ background: t.bg, color: t.color }}><Icon name={icon} size={22} /></div>
      <p className="muted" style={{ fontSize: 13.5 }}>{label}</p>
      <p style={{ fontWeight: 700, fontSize: 26 }} className="font-display">{value}</p>
    </div>
  );
}
