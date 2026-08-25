import { Link } from "react-router-dom";
import Icon from "../components/Icon";

export default function Placeholder({ title = "Coming up next" }) {
  return (
    <section className="section wrap center" style={{ minHeight: "50vh" }}>
      <div className="card card-pad" style={{ maxWidth: 480, margin: "0 auto" }}>
        <Icon name="sparkle" size={28} style={{ color: "var(--teal-500)", marginBottom: 12 }} />
        <h2 style={{ fontSize: 22, marginBottom: 8 }}>{title}</h2>
        <p className="muted" style={{ marginBottom: 18 }}>
          This screen is being built next in the MediVerse walkthrough.
        </p>
        <Link to="/" className="btn btn-outline btn-sm">Back to Home</Link>
      </div>
    </section>
  );
}
