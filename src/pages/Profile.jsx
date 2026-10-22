import { useState, useMemo, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import Icon from "../components/Icon";
import { usePatientProfile } from "../hooks/useSharedData";

const tabs = ["Personal Information", "Digital ID & QR", "Medical Information", "Account Security", "Privacy"];

export default function Profile() {
  const { patient, updateProfile } = usePatientProfile();

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [showId, setShowId] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    name: patient.name || "",
    phone: patient.phone || "",
    address: patient.address || "",
  });

  const [fieldErrors, setFieldErrors] = useState({});

  // Sync form state if external patient profile updates
  useEffect(() => {
    setForm({
      name: patient.name || "",
      phone: patient.phone || "",
      address: patient.address || "",
    });
  }, [patient]);

  const initials = useMemo(() => {
    if (!patient?.name) return "P";
    return patient.name
      .trim()
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [patient?.name]);

  // Non-sensitive data for QR code (Feature 7)
  const qrData = useMemo(() => {
    if (!patient?.patientId) return "";
    return JSON.stringify({
      patientId: patient.patientId,
      system: "MediVerse Hospital Platform",
      code: `MV-${patient.patientId}`,
      verification: "Hospital-Kiosk-Checkin-Only",
    });
  }, [patient?.patientId]);

  function handleStartEdit() {
    setForm({
      name: patient.name || "",
      phone: patient.phone || "",
      address: patient.address || "",
    });
    setFieldErrors({});
    setSuccessMsg("");
    setIsEditing(true);
  }

  function handleCancelEdit() {
    // Restore previous saved values
    setForm({
      name: patient.name || "",
      phone: patient.phone || "",
      address: patient.address || "",
    });
    setFieldErrors({});
    setSuccessMsg("");
    setIsEditing(false);
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) {
      errs.name = "Full name is required.";
    } else if (form.name.trim().length < 2) {
      errs.name = "Full name must be at least 2 characters.";
    }

    if (!form.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else {
      // Validate phone number format (at least 10 digits, allowing +, spaces, hyphens)
      const digitsOnly = form.phone.replace(/\D/g, "");
      if (digitsOnly.length < 10) {
        errs.phone = "Phone number must have at least 10 digits.";
      }
    }

    if (!form.address.trim()) {
      errs.address = "Address is required.";
    } else if (form.address.trim().length < 5) {
      errs.address = "Please enter a complete address.";
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSave(e) {
    e.preventDefault();
    if (!validate()) return;

    updateProfile({
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
    });

    setIsEditing(false);
    setSuccessMsg("Personal information updated successfully.");
    setTimeout(() => setSuccessMsg(""), 4000);
  }

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: "clamp(22px,3vw,28px)" }}>Profile & Settings</h1>
          <p className="muted" style={{ marginTop: 4 }}>
            Manage your personal healthcare information and digital hospital identity.
          </p>
        </div>
        {!isEditing && activeTab === "Personal Information" && (
          <button onClick={handleStartEdit} className="btn btn-primary btn-sm">
            <Icon name="edit" size={15} /> Edit Profile
          </button>
        )}
      </div>

      {successMsg && (
        <div
          className="fade-up"
          style={{
            padding: "12px 16px",
            borderRadius: 10,
            background: "var(--green-50)",
            color: "var(--green-800)",
            border: "1px solid var(--green-200)",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon name="checkCircle" size={18} style={{ color: "var(--green-600)" }} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Top Profile Summary Card */}
      <div className="card card-pad flex items-center gap-16" style={{ marginBottom: 24 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "linear-gradient(135deg,var(--navy-800),var(--navy-600))",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 22,
            fontFamily: "var(--font-display)",
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 700, fontSize: 17 }}>{patient.name}</p>
          <p className="muted" style={{ fontSize: 13.5 }}>{patient.email}</p>
          <p className="muted" style={{ fontSize: 12.5, marginTop: 2 }}>{patient.phone}</p>
        </div>
        <div className="flex gap-8">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setShowId((s) => !s)}
          >
            {showId ? "Hide" : "Show"} ID
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setActiveTab("Digital ID & QR")}
          >
            <Icon name="grid" size={14} /> View QR
          </button>
        </div>
      </div>

      {showId && (
        <div
          className="card card-pad fade-up center"
          style={{ marginBottom: 24, background: "var(--navy-900)", border: "none" }}
        >
          <p className="muted" style={{ color: "var(--teal-200)", fontSize: 12, marginBottom: 4, letterSpacing: "1px" }}>
            OFFICIAL PATIENT IDENTIFIER
          </p>
          <p className="font-mono" style={{ color: "#fff", fontSize: 24, fontWeight: 700 }}>
            {patient.patientId}
          </p>
        </div>
      )}

      {/* Navigation tabs */}
      <div className="flex gap-8" style={{ marginBottom: 24, flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => {
              setActiveTab(t);
              if (isEditing && t !== "Personal Information") setIsEditing(false);
            }}
            className={`btn btn-sm ${activeDayTab(activeTab, t)}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Main Tab Panels */}
      <div className="card card-pad" style={{ maxWidth: 680 }}>
        {activeTab === "Personal Information" && (
          <div>
            {!isEditing ? (
              <>
                <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                  <h3 style={{ fontSize: 16 }}>Personal Details</h3>
                  <button onClick={handleStartEdit} className="btn btn-outline btn-sm">
                    <Icon name="edit" size={14} /> Edit
                  </button>
                </div>
                <Row label="Full Name" value={patient.name} />
                <Row
                  label="Date of Birth"
                  value={
                    patient.dob
                      ? new Date(patient.dob).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "—"
                  }
                />
                <Row label="Gender" value={patient.gender} />
                <Row label="Phone Number" value={patient.phone} />
                <Row label="Email Address" value={patient.email} />
                <Row label="Residential Address" value={patient.address} last />
              </>
            ) : (
              <form onSubmit={handleSave} className="fade-up">
                <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
                  <h3 style={{ fontSize: 16 }}>Edit Personal Details</h3>
                  <span className="badge badge-teal">Editing</span>
                </div>

                {/* Full name input */}
                <div style={{ marginBottom: 16 }}>
                  <label
                    htmlFor="profile-name"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 6,
                      color: "var(--ink-600)",
                    }}
                  >
                    Full Name <span style={{ color: "var(--red-600)" }}>*</span>
                  </label>
                  <input
                    id="profile-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: null });
                    }}
                    placeholder="Enter full name"
                    style={inputStyle(fieldErrors.name)}
                  />
                  {fieldErrors.name && (
                    <p style={errorStyle}>{fieldErrors.name}</p>
                  )}
                </div>

                {/* Phone number input */}
                <div style={{ marginBottom: 16 }}>
                  <label
                    htmlFor="profile-phone"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 6,
                      color: "var(--ink-600)",
                    }}
                  >
                    Phone Number <span style={{ color: "var(--red-600)" }}>*</span>
                  </label>
                  <input
                    id="profile-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => {
                      setForm({ ...form, phone: e.target.value });
                      if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: null });
                    }}
                    placeholder="+91 98765 43210"
                    style={inputStyle(fieldErrors.phone)}
                  />
                  {fieldErrors.phone && (
                    <p style={errorStyle}>{fieldErrors.phone}</p>
                  )}
                </div>

                {/* Address input */}
                <div style={{ marginBottom: 18 }}>
                  <label
                    htmlFor="profile-address"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 6,
                      color: "var(--ink-600)",
                    }}
                  >
                    Address <span style={{ color: "var(--red-600)" }}>*</span>
                  </label>
                  <textarea
                    id="profile-address"
                    rows={3}
                    value={form.address}
                    onChange={(e) => {
                      setForm({ ...form, address: e.target.value });
                      if (fieldErrors.address) setFieldErrors({ ...fieldErrors, address: null });
                    }}
                    placeholder="House / Street, City, State"
                    style={{ ...inputStyle(fieldErrors.address), resize: "vertical" }}
                  />
                  {fieldErrors.address && (
                    <p style={errorStyle}>{fieldErrors.address}</p>
                  )}
                </div>

                {/* Protected fields info */}
                <div
                  style={{
                    padding: "10px 14px",
                    background: "var(--navy-50)",
                    borderRadius: 8,
                    marginBottom: 20,
                    fontSize: 12.5,
                    color: "var(--ink-600)",
                  }}
                >
                  <div className="flex items-center gap-6">
                    <Icon name="lock" size={14} style={{ color: "var(--navy-600)" }} />
                    <span>
                      Patient ID (<strong>{patient.patientId}</strong>), DOB, and Gender are protected institutional records and cannot be edited online.
                    </span>
                  </div>
                </div>

                {/* Save and Cancel buttons */}
                <div className="flex gap-10">
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="btn btn-outline"
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* FEATURE 7 — Patient ID QR Code Tab */}
        {activeTab === "Digital ID & QR" && (
          <div className="center">
            <h3 style={{ fontSize: 17, marginBottom: 6 }}>Digital Patient ID Card</h3>
            <p className="muted" style={{ fontSize: 13.5, marginBottom: 24 }}>
              Present this verified QR code at hospital registration or pharmacy desk for fast, contactless check-in.
            </p>

            <div
              className="card card-pad"
              style={{
                maxWidth: 360,
                margin: "0 auto 20px",
                background: "linear-gradient(180deg, #FFFFFF, var(--navy-50))",
                border: "2px solid var(--navy-100)",
                borderRadius: 16,
                padding: "24px 20px",
                boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
              }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: 16, borderBottom: "1px solid var(--navy-100)", paddingBottom: 12 }}>
                <div className="flex items-center gap-8">
                  <span className="brand-mark">
                    <Icon name="logo" size={14} style={{ color: "#5EEAD4" }} />
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 14, fontFamily: "var(--font-display)" }}>
                    MediVerse Health
                  </span>
                </div>
                <span className="badge badge-teal" style={{ fontSize: 11 }}>Active ID</span>
              </div>

              {/* QR Code Container */}
              <div
                style={{
                  background: "#fff",
                  padding: 16,
                  borderRadius: 12,
                  display: "inline-block",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  marginBottom: 16,
                }}
              >
                {patient?.patientId ? (
                  <QRCodeSVG
                    value={qrData}
                    size={170}
                    level="M"
                    fgColor="#0F172A"
                    bgColor="#FFFFFF"
                  />
                ) : (
                  <div style={{ width: 170, height: 170, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p className="muted" style={{ fontSize: 13 }}>No Patient ID Available</p>
                  </div>
                )}
              </div>

              <p style={{ fontWeight: 700, fontSize: 16 }}>{patient.name}</p>
              <p
                className="font-mono"
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "var(--teal-700)",
                  marginTop: 4,
                  letterSpacing: "0.5px",
                }}
              >
                {patient.patientId || "Unassigned"}
              </p>
              <p className="muted" style={{ fontSize: 11.5, marginTop: 8 }}>
                Encodes non-sensitive hospital identity token only. Private health records are never stored in the QR code.
              </p>
            </div>

            <div className="flex gap-10" style={{ maxWidth: 360, margin: "0 auto" }}>
              <button
                className="btn btn-outline btn-sm"
                style={{ flex: 1 }}
                onClick={() => window.print()}
              >
                <Icon name="download" size={15} /> Print ID
              </button>
              <button
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
                onClick={() => {
                  navigator.clipboard?.writeText(patient.patientId);
                  alert(`Copied Patient ID (${patient.patientId}) to clipboard.`);
                }}
              >
                Copy Patient ID
              </button>
            </div>
          </div>
        )}

        {activeTab === "Medical Information" && (
          <>
            <h3 style={{ fontSize: 16, marginBottom: 14 }}>Clinical Summary</h3>
            <Row label="Blood Group" value={patient.bloodGroup || "—"} />
            <Row label="Known Allergies" value={patient.allergies || "None"} />
            <Row label="Emergency Contact" value={patient.emergencyContact || "—"} />
            <Row label="Hospital Registration Status" value="Verified & Active" last />
          </>
        )}

        {activeTab === "Account Security" && (
          <>
            <h3 style={{ fontSize: 16, marginBottom: 14 }}>Account Security</h3>
            <ActionRow icon="lock" label="Password Management" desc="Simulate password recovery or updates" cta="Manage" />
            <ActionRow icon="shield" label="Two-Factor Authentication" desc="Add an extra layer of protection" cta="Enable" />
            <ActionRow icon="clock" label="Recent Sign-ins" desc="View recent sessions on MediVerse" cta="View" last />
          </>
        )}

        {activeTab === "Privacy" && (
          <>
            <h3 style={{ fontSize: 16, marginBottom: 14 }}>Privacy & Consents</h3>
            <ActionRow icon="users" label="Provider Access Permissions" desc="Control which specialists view records" cta="Manage" />
            <ActionRow icon="download" label="Export Medical Dossier" desc="Download complete patient records" cta="Download" />
            <ActionRow icon="grid" label="Preferences" desc="Notification channels and communication" cta="Open" last />
          </>
        )}
      </div>
    </div>
  );
}

function activeDayTab(active, current) {
  return active === current ? "btn-primary" : "btn-outline";
}

function Row({ label, value, last }) {
  return (
    <div
      className="flex justify-between"
      style={{
        padding: "13px 0",
        borderBottom: last ? "none" : "1px solid var(--navy-50)",
      }}
    >
      <span className="muted" style={{ fontSize: 13.5 }}>
        {label}
      </span>
      <span style={{ fontSize: 13.5, fontWeight: 600, textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}

function ActionRow({ icon, label, desc, cta, last }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        padding: "14px 0",
        borderBottom: last ? "none" : "1px solid var(--navy-50)",
      }}
    >
      <div className="flex items-center gap-12">
        <Icon name={icon} size={17} style={{ color: "var(--teal-600)" }} />
        <div>
          <p style={{ fontSize: 14, fontWeight: 600 }}>{label}</p>
          <p className="muted" style={{ fontSize: 12.5 }}>
            {desc}
          </p>
        </div>
      </div>
      <button className="btn btn-outline btn-sm">{cta}</button>
    </div>
  );
}

function inputStyle(hasError) {
  return {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: `1px solid ${hasError ? "var(--red-600)" : "var(--navy-100)"}`,
    fontSize: 14,
    outline: "none",
  };
}

const errorStyle = {
  color: "var(--red-600)",
  fontSize: 12.5,
  marginTop: 4,
};
