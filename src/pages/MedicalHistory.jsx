import Icon from "../components/Icon";
import { demoAppointments, demoPrescriptions, demoReports, doctors } from "../data/mockData";

export default function MedicalHistory() {
  // combine appointments, prescriptions & reports into one chronological timeline
  const events = [
    ...demoAppointments.map((a) => ({ date: a.date, type: "appointment", data: a })),
    ...demoPrescriptions.map((p) => ({ date: p.date, type: "prescription", data: p })),
    ...demoReports.map((r) => ({ date: r.date, type: "report", data: r })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  // group by "Month Year"
  const grouped = events.reduce((acc, ev) => {
    const key = new Date(ev.date).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
    acc[key] = acc[key] || [];
    acc[key].push(ev);
    return acc;
  }, {});

  return (
    <div>
      <h1 style={{ fontSize: "clamp(22px,3vw,28px)", marginBottom: 6 }}>Medical History</h1>
      <p className="muted" style={{ marginBottom: 30 }}>Your centralized digital health timeline.</p>

      {Object.entries(grouped).map(([month, items]) => (
        <div key={month} style={{ marginBottom: 30 }}>
          <h3 style={{ fontSize: 15.5, marginBottom: 16, color: "var(--navy-700)" }}>{month}</h3>
          <div className="care-rail-v">
            {items.map((ev, i) => <TimelineItem key={i} ev={ev} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function TimelineItem({ ev }) {
  const doc = doctors.find((d) => d.id === ev.data.doctorId);
  const iconMap = { appointment: "stethoscope", prescription: "pill", report: "file" };
  const toneMap = {
    appointment: { bg: "var(--navy-50)", color: "var(--navy-700)" },
    prescription: { bg: "var(--teal-50)", color: "var(--teal-600)" },
    report: { bg: "var(--amber-100)", color: "var(--amber-600)" },
  };
  const t = toneMap[ev.type];

  let title, subtitle;
  if (ev.type === "appointment") { title = `${doc?.department} Consultation`; subtitle = `with ${doc?.name} · ${ev.data.status}`; }
  if (ev.type === "prescription") { title = `Prescription Issued (${ev.data.id})`; subtitle = `${ev.data.medicines.length} medicine(s) by ${doc?.name}`; }
  if (ev.type === "report") { title = ev.data.name; subtitle = `${ev.data.department} · ${ev.data.status}`; }

  return (
    <div style={{ position: "relative", paddingBottom: 24 }}>
      <div className="rail-node-sm" style={{ background: t.bg, borderColor: t.color, color: t.color }}>
        <Icon name={iconMap[ev.type]} size={17} />
      </div>
      <div className="card card-pad" style={{ marginLeft: 8 }}>
        <div className="flex items-center justify-between">
          <p style={{ fontWeight: 700, fontSize: 14.5 }}>{title}</p>
          <span className="muted" style={{ fontSize: 12 }}>
            {new Date(ev.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          </span>
        </div>
        <p className="muted" style={{ fontSize: 13, marginTop: 3 }}>{subtitle}</p>
      </div>
    </div>
  );
}
