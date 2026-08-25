import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import useAuth from "../hooks/useAuth";
import { todaySchedule } from "../data/mockData";

export default function DoctorDashboard() {
  const { session } = useAuth();

  const completed = todaySchedule.filter((s) => s.status === "Completed").length;
  const waiting = todaySchedule.filter((s) => s.status === "Waiting").length;
  const pendingReports = 4;

  return (
    <div>
      <h1 style={{ fontSize: "clamp(22px,3vw,28px)", marginBottom: 6 }}>Good Morning, {session?.name} 👋</h1>
      <p className="muted" style={{ marginBottom: 28 }}>Here's what's happening today.</p>

      <div className="grid grid-4" style={{ marginBottom: 30 }}>
        <StatCard icon="calendar" tone="navy" label="Today's Appointments" value={todaySchedule.length} />
        <StatCard icon="checkCircle" tone="green" label="Patients Seen" value={completed} />
        <StatCard icon="clock" tone="amber" label="Pending Consultations" value={waiting} />
        <StatCard icon="file" tone="teal" label="Pending Reports" value={pendingReports} />
      </div>

      <div className="card card-pad">
        <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
          <h3 style={{ fontSize: 17 }}>Today's Schedule</h3>
          <Link to="/doctor/patients" className="btn btn-outline btn-sm">View All Patients</Link>
        </div>

        <div className="care-rail-v">
          {todaySchedule.map((s, i) => (
            <div key={i} style={{ position: "relative", paddingBottom: 20 }}>
              <div className="rail-node-sm" style={{ borderColor: statusColor(s.status), color: statusColor(s.status) }}>
                <Icon name="user" size={16} />
              </div>
              <div className="flex items-center justify-between" style={{
                marginLeft: 8, padding: "12px 16px", borderRadius: 12, background: "var(--bg-alt)",
              }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14 }}>{s.time} — {s.patient}</p>
                  <p className="font-mono muted" style={{ fontSize: 12 }}>{s.patientId}</p>
                </div>
                <div className="flex items-center gap-10">
                  <StatusBadge status={s.status} />
                  {s.status !== "Cancelled" && (
                    <Link to={`/doctor/patient/${s.patientId}`} className="btn btn-outline btn-sm">Open Record</Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, tone, label, value }) {
  const tones = {
    navy: { bg: "var(--navy-50)", color: "var(--navy-800)" },
    green: { bg: "var(--green-100)", color: "var(--green-600)" },
    amber: { bg: "var(--amber-100)", color: "var(--amber-600)" },
    teal: { bg: "var(--teal-50)", color: "var(--teal-600)" },
  };
  const t = tones[tone];
  return (
    <div className="card stat-card">
      <div className="stat-icon" style={{ background: t.bg, color: t.color }}><Icon name={icon} size={20} /></div>
      <p className="muted" style={{ fontSize: 13 }}>{label}</p>
      <p style={{ fontWeight: 700, fontSize: 24 }}>{value}</p>
    </div>
  );
}

function statusColor(status) {
  const map = { Waiting: "var(--amber-500)", "In Consultation": "var(--teal-500)", Completed: "var(--green-500)", Cancelled: "var(--red-500)" };
  return map[status] || "var(--navy-600)";
}

function StatusBadge({ status }) {
  const map = { Waiting: "badge-amber", "In Consultation": "badge-teal", Completed: "badge-green", Cancelled: "badge-red" };
  return <span className={`badge ${map[status]}`}>{status}</span>;
}
