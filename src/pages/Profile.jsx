import { useState } from "react";
import Icon from "../components/Icon";
import { demoPatient } from "../data/mockData";

const tabs = ["Personal Information", "Medical Information", "Account Security", "Privacy"];

export default function Profile() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [showId, setShowId] = useState(false);

  return (
    <div>
      <h1 style={{ fontSize: "clamp(22px,3vw,28px)", marginBottom: 24 }}>Profile & Settings</h1>

      <div className="card card-pad flex items-center gap-16" style={{ marginBottom: 24 }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,var(--navy-800),var(--navy-600))",
          color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 22, fontFamily: "var(--font-display)",
        }}>
          {demoPatient.firstName[0]}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 700, fontSize: 17 }}>{demoPatient.name}</p>
          <p className="muted" style={{ fontSize: 13.5 }}>{demoPatient.email}</p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={() => setShowId((s) => !s)}>
          {showId ? "Hide" : "Show"} Patient ID
        </button>
      </div>
      {showId && (
        <div className="card card-pad fade-up center" style={{ marginBottom: 24, background: "var(--navy-900)", border: "none" }}>
          <p className="font-mono" style={{ color: "var(--teal-300)", fontSize: 24, fontWeight: 600 }}>{demoPatient.patientId}</p>
        </div>
      )}

      <div className="flex gap-8" style={{ marginBottom: 24, flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <button key={t} onClick={() => setActiveTab(t)} className={`btn btn-sm ${activeTab === t ? "btn-primary" : "btn-outline"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="card card-pad" style={{ maxWidth: 640 }}>
        {activeTab === "Personal Information" && (
          <>
            <Row label="Full Name" value={demoPatient.name} />
            <Row label="Date of Birth" value={new Date(demoPatient.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
            <Row label="Gender" value={demoPatient.gender} />
            <Row label="Phone" value={demoPatient.phone} />
            <Row label="Email" value={demoPatient.email} />
            <Row label="Address" value={demoPatient.address} last />
          </>
        )}
        {activeTab === "Medical Information" && (
          <>
            <Row label="Blood Group" value={demoPatient.bloodGroup} />
            <Row label="Allergies" value={demoPatient.allergies} />
            <Row label="Current Medications" value="Metformin, Atorvastatin" />
            <Row label="Emergency Contact" value={demoPatient.emergencyContact} last />
          </>
        )}
        {activeTab === "Account Security" && (
          <>
            <ActionRow icon="lock" label="Change Password" desc="Last changed 3 months ago" cta="Update" />
            <ActionRow icon="shield" label="Two-Factor Authentication" desc="Add an extra layer of security" cta="Enable" />
            <ActionRow icon="clock" label="Login History" desc="View recent sign-ins to your account" cta="View" last />
          </>
        )}
        {activeTab === "Privacy" && (
          <>
            <ActionRow icon="users" label="Manage Data Sharing" desc="Control who can access your records" cta="Manage" />
            <ActionRow icon="download" label="Download Health Data" desc="Export a copy of your complete record" cta="Download" />
            <ActionRow icon="grid" label="Account Settings" desc="Language, notifications and preferences" cta="Open" last />
          </>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, last }) {
  return (
    <div className="flex justify-between" style={{ padding: "13px 0", borderBottom: last ? "none" : "1px solid var(--navy-50)" }}>
      <span className="muted" style={{ fontSize: 13.5 }}>{label}</span>
      <span style={{ fontSize: 13.5, fontWeight: 600, textAlign: "right" }}>{value}</span>
    </div>
  );
}

function ActionRow({ icon, label, desc, cta, last }) {
  return (
    <div className="flex items-center justify-between" style={{ padding: "14px 0", borderBottom: last ? "none" : "1px solid var(--navy-50)" }}>
      <div className="flex items-center gap-12">
        <Icon name={icon} size={17} style={{ color: "var(--teal-600)" }} />
        <div>
          <p style={{ fontSize: 14, fontWeight: 600 }}>{label}</p>
          <p className="muted" style={{ fontSize: 12.5 }}>{desc}</p>
        </div>
      </div>
      <button className="btn btn-outline btn-sm">{cta}</button>
    </div>
  );
}
