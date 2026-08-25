import Icon from "../components/Icon";

const values = [
  { icon: "user", title: "Patient-First", text: "Every feature is designed around making care easier to find and manage." },
  { icon: "shield", title: "Secure by Design", text: "Role-based access ensures medical records are only seen by authorized people." },
  { icon: "sparkle", title: "AI-Assisted, Doctor-Led", text: "AI helps navigate care; every diagnosis and prescription is made by a licensed doctor." },
  { icon: "globe", title: "Accessible to All", text: "A responsive, simple interface that works for every patient, on every device." },
];

export default function About() {
  return (
    <>
      <section className="section">
        <div className="wrap">
          <div className="center" style={{ maxWidth: 680, margin: "0 auto 20px" }}>
            <div className="eyebrow">About MediVerse</div>
            <h1 style={{ fontSize: "clamp(26px,3.8vw,40px)", marginTop: 14 }}>
              A hospital, reimagined as one connected experience.
            </h1>
            <p className="muted" style={{ marginTop: 14, fontSize: 15.5 }}>
              MediVerse brings patients, doctors, pharmacists and hospital administrators onto a single
              digital platform — so care feels less like paperwork and more like a conversation.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ background: "var(--bg-alt)" }}>
        <div className="wrap grid grid-2" style={{ alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 24, marginBottom: 14 }}>Our Mission</h2>
            <p className="muted" style={{ marginBottom: 24, fontSize: 14.5, lineHeight: 1.7 }}>
              To make quality healthcare easier to reach — by connecting every part of the patient
              journey, from the first symptom to the last pharmacy pickup, in one trustworthy platform.
            </p>
            <h2 style={{ fontSize: 24, marginBottom: 14 }}>Our Vision</h2>
            <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.7 }}>
              A future where no patient loses time or clarity navigating a hospital system — where
              technology quietly supports doctors instead of getting in their way.
            </p>
          </div>
          <div className="card card-pad">
            <h3 style={{ fontSize: 16, marginBottom: 16 }}>MediVerse at a glance</h3>
            <div className="grid grid-2">
              <Stat value="14" label="Departments" />
              <Stat value="186+" label="Specialists" />
              <Stat value="12,400+" label="Patients" />
              <Stat value="99.9%" label="Platform uptime" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="center" style={{ fontSize: 24, marginBottom: 36 }}>What we stand for</h2>
          <div className="grid grid-4">
            {values.map((v) => (
              <div key={v.title} className="card card-pad">
                <Icon name={v.icon} size={22} style={{ color: "var(--teal-600)", marginBottom: 12 }} />
                <h3 style={{ fontSize: 15, marginBottom: 6 }}>{v.title}</h3>
                <p className="muted" style={{ fontSize: 13 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="font-display" style={{ fontSize: 24, fontWeight: 700, color: "var(--navy-900)" }}>{value}</p>
      <p className="muted" style={{ fontSize: 12.5 }}>{label}</p>
    </div>
  );
}
