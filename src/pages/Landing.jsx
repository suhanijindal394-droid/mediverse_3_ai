import { Link } from "react-router-dom";
import Icon from "../components/Icon";

const services = [
  { icon: "sparkle", title: "AI Specialist Matching", text: "Describe your symptoms in your own words and get a care-navigation suggestion for the right department." },
  { icon: "calendar", title: "Online Appointment Booking", text: "See real-time doctor availability and book a slot that works for you, in-person or by video." },
  { icon: "pill", title: "Digital Prescriptions", text: "Every prescription your doctor writes appears instantly in your patient dashboard." },
  { icon: "building", title: "Pharmacy Integration", text: "Walk up to the hospital pharmacy with just your Patient ID and collect your medicines." },
  { icon: "file", title: "Medical Reports", text: "Lab and diagnostic reports are uploaded to your account as soon as they're ready." },
  { icon: "shield", title: "Health Records", text: "One secure, centralised history of every appointment, prescription and report you've had." },
];

const steps = [
  { icon: "user", title: "Tell Us Your Concern", text: "Describe your problem in normal, everyday language — no medical jargon needed." },
  { icon: "sparkle", title: "AI Understands Your Request", text: "MediVerse identifies the most relevant hospital department for your concern." },
  { icon: "search", title: "Find an Available Specialist", text: "We check real doctor availability across the relevant department." },
  { icon: "calendar", title: "Book Your Appointment", text: "Pick a date and time slot that suits your schedule." },
  { icon: "stethoscope", title: "Consult & Get Prescription", text: "Your doctor reviews your case and issues a digital prescription." },
  { icon: "pill", title: "Collect Medicine & Track Records", text: "Use your Patient ID at the pharmacy, and keep every record in one place." },
];

export default function Landing() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="section" style={{ paddingTop: 68, position: "relative", overflow: "hidden" }}>
        <div className="wrap">
          <div className="grid grid-2" style={{ alignItems: "center", gap: 48 }}>
            <div className="fade-up">
              <div className="eyebrow"><Icon name="sparkle" size={13} /> AI-powered care navigation</div>
              <h1 style={{ fontSize: "clamp(34px,4.6vw,54px)", lineHeight: 1.08, marginTop: 18 }}>
                Healthcare That Understands Your Needs.
              </h1>
              <p className="muted" style={{ fontSize: 18, marginTop: 20, maxWidth: 520 }}>
                Describe your health concern, find the right specialist, book an appointment, and
                manage your healthcare journey — all from one secure platform.
              </p>
              <div className="flex gap-12" style={{ marginTop: 30, flexWrap: "wrap" }}>
                <Link to="/patient/register" className="btn btn-primary btn-lg">
                  Find My Specialist <Icon name="arrowRight" size={17} />
                </Link>
                <Link to="/specialists" className="btn btn-outline btn-lg">Book an Appointment</Link>
              </div>
              <div className="flex items-center gap-24" style={{ marginTop: 38, flexWrap: "wrap" }}>
                <Stat value="186+" label="Verified specialists" />
                <Stat value="12,400+" label="Patients cared for" />
                <Stat value="14" label="Hospital departments" />
              </div>
            </div>

            <div style={{ position: "relative", minHeight: 420 }}>
              <div className="card card-pad drift" style={{ position: "absolute", top: 0, left: "6%", width: 230 }}>
                <div className="flex items-center gap-12">
                  <IconBadge name="sparkle" />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14 }}>AI Specialist Match</p>
                    <p className="muted" style={{ fontSize: 12.5 }}>Neurology suggested</p>
                  </div>
                </div>
              </div>

              <div className="card card-pad drift-slow" style={{ position: "absolute", top: 130, right: "2%", width: 240 }}>
                <div className="flex items-center gap-12">
                  <IconBadge name="checkCircle" tone="green" />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14 }}>Appointment Confirmed</p>
                    <p className="muted" style={{ fontSize: 12.5 }}>Dr. Ananya Sharma · 10:30 AM</p>
                  </div>
                </div>
              </div>

              <div className="card card-pad drift" style={{ position: "absolute", top: 268, left: "10%", width: 230, animationDelay: "2s" }}>
                <div className="flex items-center gap-12">
                  <IconBadge name="pill" tone="teal" />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14 }}>Digital Prescription</p>
                    <p className="muted" style={{ fontSize: 12.5 }}>2 medicines · Ready</p>
                  </div>
                </div>
              </div>

              <div className="card card-pad drift-slow" style={{ position: "absolute", bottom: 0, right: "8%", width: 230 }}>
                <div className="flex items-center gap-12">
                  <IconBadge name="file" tone="amber" />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14 }}>Report Available</p>
                    <p className="muted" style={{ fontSize: 12.5 }}>ECG · Ready to view</p>
                  </div>
                </div>
              </div>

              <div style={{
                position: "absolute", inset: "18% 14%", borderRadius: "50%",
                background: "radial-gradient(circle, var(--teal-100) 0%, transparent 70%)",
                zIndex: -1,
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- EMERGENCY BANNER ---------------- */}
      <section className="wrap" style={{ marginBottom: 8 }}>
        <div className="card card-pad" style={{
          background: "linear-gradient(135deg,#FFF7ED,#FEF2F2)",
          border: "1px solid #FED7AA",
          display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14, background: "#FEE2E2", color: "var(--red-600)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Icon name="siren" size={26} />
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <p style={{ fontWeight: 700, fontSize: 16, color: "var(--navy-900)" }}>Need urgent medical attention?</p>
            <p className="muted" style={{ fontSize: 14.5, marginTop: 3 }}>
              If you are experiencing severe or life-threatening symptoms, do not wait for an online
              recommendation. Contact emergency services or visit the hospital emergency department immediately.
            </p>
          </div>
          <Link to="/contact#emergency" className="btn btn-danger btn-sm">Emergency Information</Link>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section className="section" id="services">
        <div className="wrap">
          <div className="center" style={{ maxWidth: 620, margin: "0 auto 48px" }}>
            <div className="eyebrow">What MediVerse offers</div>
            <h2 style={{ fontSize: "clamp(26px,3.4vw,38px)", marginTop: 14 }}>
              One platform for your entire care journey
            </h2>
            <p className="muted" style={{ marginTop: 12 }}>
              From the first symptom to the last pickup at the pharmacy counter.
            </p>
          </div>

          <div className="grid grid-3">
            {services.map((s) => (
              <div key={s.title} className="card card-pad card-hover">
                <IconBadge name={s.icon} tone="navy" size={44} />
                <h3 style={{ fontSize: 17.5, marginTop: 16, marginBottom: 8 }}>{s.title}</h3>
                <p className="muted" style={{ fontSize: 14.5 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="section" style={{ background: "var(--bg-alt)" }} id="how-it-works">
        <div className="wrap">
          <div className="center" style={{ maxWidth: 620, margin: "0 auto 56px" }}>
            <div className="eyebrow">The full pathway</div>
            <h2 style={{ fontSize: "clamp(26px,3.4vw,38px)", marginTop: 14 }}>How MediVerse works</h2>
            <p className="muted" style={{ marginTop: 12 }}>
              Six connected steps — from your first description to a completed pharmacy pickup.
            </p>
          </div>

          <div className="care-rail-h grid grid-3" style={{ rowGap: 46 }}>
            {steps.map((s, i) => (
              <div key={s.title} style={{ textAlign: "center", padding: "0 12px" }}>
                <div className="rail-node" style={{ margin: "0 auto 18px" }}>
                  <Icon name={s.icon} size={20} />
                </div>
                <p className="font-mono muted" style={{ fontSize: 12, marginBottom: 6 }}>STEP {i + 1}</p>
                <h3 style={{ fontSize: 16.5, marginBottom: 8 }}>{s.title}</h3>
                <p className="muted" style={{ fontSize: 14, maxWidth: 260, margin: "0 auto" }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="section">
        <div className="wrap">
          <div className="card" style={{
            background: "linear-gradient(135deg,var(--navy-900),var(--navy-700))",
            padding: "56px 40px", textAlign: "center", border: "none",
          }}>
            <h2 style={{ color: "#fff", fontSize: "clamp(24px,3.2vw,34px)", marginBottom: 14 }}>
              Ready to find the right care?
            </h2>
            <p style={{ color: "#C7D3E6", maxWidth: 480, margin: "0 auto 28px" }}>
              Create your free MediVerse account and get your Patient ID in under two minutes.
            </p>
            <div className="flex gap-12" style={{ justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/patient/register" className="btn btn-teal btn-lg">Create My Account</Link>
              <Link to="/specialists" className="btn btn-outline btn-lg" style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,.3)" }}>
                Browse Specialists
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--navy-900)" }}>{value}</p>
      <p className="muted" style={{ fontSize: 13 }}>{label}</p>
    </div>
  );
}

function IconBadge({ name, tone = "teal", size = 40 }) {
  const tones = {
    teal: { bg: "var(--teal-50)", color: "var(--teal-600)" },
    navy: { bg: "var(--navy-50)", color: "var(--navy-800)" },
    green: { bg: "var(--green-100)", color: "var(--green-600)" },
    amber: { bg: "var(--amber-100)", color: "var(--amber-600)" },
  };
  const t = tones[tone] || tones.teal;
  return (
    <div style={{
      width: size, height: size, borderRadius: 12, background: t.bg, color: t.color,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <Icon name={name} size={size * 0.48} />
    </div>
  );
}
