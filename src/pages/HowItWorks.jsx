import { Link } from "react-router-dom";
import Icon from "../components/Icon";

const steps = [
  { icon: "user", title: "Tell Us Your Concern", text: "Describe your problem in normal, everyday language — no medical jargon needed." },
  { icon: "sparkle", title: "AI Understands Your Request", text: "MediVerse identifies the most relevant hospital department for your concern." },
  { icon: "search", title: "Find an Available Specialist", text: "We check real doctor availability across the relevant department." },
  { icon: "calendar", title: "Book Your Appointment", text: "Pick a date and time slot that suits your schedule." },
  { icon: "stethoscope", title: "Consult & Get Prescription", text: "Your doctor reviews your case and issues a digital prescription." },
  { icon: "pill", title: "Collect Medicine & Track Records", text: "Use your Patient ID at the pharmacy, and keep every record in one place." },
];

export default function HowItWorks() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="center" style={{ maxWidth: 620, margin: "0 auto 56px" }}>
          <div className="eyebrow">The full pathway</div>
          <h1 style={{ fontSize: "clamp(26px,3.8vw,40px)", marginTop: 14 }}>How MediVerse works</h1>
          <p className="muted" style={{ marginTop: 12 }}>
            Six connected steps — from your first description to a completed pharmacy pickup.
          </p>
        </div>

        <div className="care-rail-v">
          {steps.map((s, i) => (
            <div key={s.title} style={{ position: "relative", paddingBottom: 34 }}>
              <div className="rail-node-sm"><Icon name={s.icon} size={18} /></div>
              <div className="card card-pad" style={{ marginLeft: 8 }}>
                <p className="font-mono muted" style={{ fontSize: 11.5, marginBottom: 4 }}>STEP {i + 1}</p>
                <h3 style={{ fontSize: 16.5, marginBottom: 6 }}>{s.title}</h3>
                <p className="muted" style={{ fontSize: 14 }}>{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="center" style={{ marginTop: 20 }}>
          <Link to="/patient/register" className="btn btn-primary btn-lg">
            Get Started <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
