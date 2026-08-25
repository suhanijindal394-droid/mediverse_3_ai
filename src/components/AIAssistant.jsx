import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";

const quickActions = [
  { label: "Find a specialist", to: "/patient/ai-specialist", icon: "sparkle" },
  { label: "Check appointment", to: "/patient/appointments", icon: "calendar" },
  { label: "View prescriptions", to: "/patient/prescriptions", icon: "pill" },
  { label: "Find a report", to: "/patient/reports", icon: "file" },
  { label: "Pharmacy information", to: "/patient/pharmacy", icon: "building" },
  { label: "Contact support", to: "/contact", icon: "phone" },
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="ai-panel fade-up">
          <div className="flex items-center gap-12" style={{ padding: 18, background: "var(--navy-900)", color: "#fff" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="sparkle" size={17} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: 14.5 }}>MediVerse Assistant</p>
              <p style={{ fontSize: 11.5, color: "#9FB0C9" }}>Only sees your own data</p>
            </div>
            <button onClick={() => setOpen(false)} className="icon-btn" style={{ color: "#fff" }}>
              <Icon name="close" size={16} />
            </button>
          </div>

          <div style={{ padding: 16, overflowY: "auto" }}>
            <p className="muted" style={{ fontSize: 13, marginBottom: 12 }}>Hi! I'm here to help you navigate MediVerse. What would you like to do?</p>
            {quickActions.map((a) => (
              <Link
                key={a.label} to={a.to} onClick={() => setOpen(false)}
                className="flex items-center gap-12"
                style={{ padding: "11px 12px", borderRadius: 10, marginBottom: 6, border: "1px solid var(--navy-50)", fontSize: 13.5, fontWeight: 500 }}
              >
                <Icon name={a.icon} size={16} style={{ color: "var(--teal-600)" }} /> {a.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <button className="ai-fab drift" onClick={() => setOpen((o) => !o)} aria-label="Open MediVerse Assistant">
        <Icon name={open ? "close" : "sparkle"} size={24} />
      </button>
    </>
  );
}
