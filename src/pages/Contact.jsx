import { useState } from "react";
import Icon from "../components/Icon";
import FormField from "../components/FormField";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section className="section">
      <div className="wrap">
        <div className="center" style={{ maxWidth: 600, margin: "0 auto 40px" }}>
          <div className="eyebrow">Get in touch</div>
          <h1 style={{ fontSize: "clamp(26px,3.6vw,38px)", marginTop: 14 }}>Contact MediVerse</h1>
        </div>

        <div id="emergency" className="card card-pad" style={{
          marginBottom: 32, background: "linear-gradient(135deg,#FEF2F2,#FFF7ED)", border: "1px solid #FCA5A5",
        }}>
          <div className="flex items-center gap-16" style={{ flexWrap: "wrap" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "#FEE2E2", color: "var(--red-600)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="siren" size={26} />
            </div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <p style={{ fontWeight: 700, fontSize: 16 }}>Emergency Department</p>
              <p className="muted" style={{ fontSize: 14 }}>Open 24/7 · Model Town, Ludhiana, Punjab · Ground Floor, Block E</p>
            </div>
            <a href="tel:112" className="btn btn-danger btn-sm">Call 112 Now</a>
          </div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "1fr 1.2fr", gap: 28 }}>
          <div>
            <div className="card card-pad" style={{ marginBottom: 16 }}>
              <ContactRow icon="mapPin" label="Address" value="Model Town, Ludhiana, Punjab, India" />
              <ContactRow icon="phone" label="General Enquiries" value="+91 161 400 1000" />
              <ContactRow icon="mail" label="Email" value="care@mediverse.health" />
              <ContactRow icon="clock" label="OPD Hours" value="Mon–Sat, 8:00 AM – 8:00 PM" last />
            </div>
            <div className="card card-pad center" style={{ padding: "48px 20px", color: "var(--ink-400)" }}>
              <Icon name="mapPin" size={26} style={{ marginBottom: 8 }} />
              <p style={{ fontSize: 13 }}>Map placeholder</p>
            </div>
          </div>

          <div className="card card-pad">
            {sent ? (
              <div className="center" style={{ padding: "40px 0" }}>
                <Icon name="checkCircle" size={34} style={{ color: "var(--green-600)", marginBottom: 14 }} />
                <h3 style={{ marginBottom: 8 }}>Message sent</h3>
                <p className="muted" style={{ fontSize: 14 }}>Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: 17, marginBottom: 18 }}>Send us a message</h3>
                <FormField label="Name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                <div className="grid grid-2" style={{ gap: 0 }}>
                  <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
                  <FormField label="Phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 ..." />
                </div>
                <FormField label="Message" name="message" textarea value={form.message} onChange={handleChange} placeholder="How can we help?" required />
                <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 8 }}>Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value, last }) {
  return (
    <div className="flex gap-12" style={{ paddingBottom: 14, marginBottom: 14, borderBottom: last ? "none" : "1px solid var(--navy-50)" }}>
      <Icon name={icon} size={17} style={{ color: "var(--teal-600)", flexShrink: 0, marginTop: 2 }} />
      <div>
        <p className="muted" style={{ fontSize: 12 }}>{label}</p>
        <p style={{ fontSize: 14, fontWeight: 500 }}>{value}</p>
      </div>
    </div>
  );
}
