import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import FormField from "../components/FormField";
import { doctors, careCategoryRules, emergencyKeywords, timeSlots, getUnavailableSlots } from "../data/mockData";

const STAGE = { FORM: "form", PROCESSING: "processing", RESULT: "result", EMERGENCY: "emergency" };

const initialForm = { concern: "", duration: "", severity: "Mild", age: "", conditions: "", medications: "" };

export default function AISpecialistFinder() {
  const [stage, setStage] = useState(STAGE.FORM);
  const [form, setForm] = useState(initialForm);
  const [department, setDepartment] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function analyze(text) {
    const lower = text.toLowerCase();
    const isEmergency = emergencyKeywords.some((kw) => lower.includes(kw));
    if (isEmergency) return { emergency: true };

    const match = careCategoryRules.find((rule) => rule.keywords.some((kw) => lower.includes(kw)));
    return { emergency: false, department: match ? match.department : "General Medicine" };
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.concern.trim()) return;
    setStage(STAGE.PROCESSING);
  }

  // simulate AI processing time, then resolve to result or emergency
  useEffect(() => {
    if (stage !== STAGE.PROCESSING) return;
    const timer = setTimeout(() => {
      const result = analyze(form.concern);
      if (result.emergency) {
        setStage(STAGE.EMERGENCY);
      } else {
        setDepartment(result.department);
        setStage(STAGE.RESULT);
      }
    }, 1900);
    return () => clearTimeout(timer);
  }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

  function reset() {
    setForm(initialForm);
    setDepartment(null);
    setStage(STAGE.FORM);
  }

  if (stage === STAGE.PROCESSING) return <ProcessingScreen />;
  if (stage === STAGE.EMERGENCY) return <EmergencyState onReset={reset} />;
  if (stage === STAGE.RESULT) return <ResultScreen department={department} concern={form.concern} onReset={reset} />;

  return (
    <div>
      <div style={{ maxWidth: 640, marginBottom: 28 }}>
        <div className="eyebrow"><Icon name="sparkle" size={12} /> AI Care Navigation</div>
        <h1 style={{ fontSize: "clamp(24px,3vw,30px)", marginTop: 14 }}>Tell us what you're experiencing.</h1>
        <p className="muted" style={{ marginTop: 8, fontSize: 14.5 }}>
          You can describe your concern in your own words. MediVerse will help identify the most
          appropriate hospital department or specialist category — this is not a diagnosis.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card card-pad" style={{ maxWidth: 720 }}>
          <FormField
            label="Describe your concern" name="concern" textarea required
            value={form.concern} onChange={handleChange}
            placeholder="Example: I've been experiencing frequent headaches for the past two weeks..."
          />
          <div className="grid grid-2" style={{ gap: 0 }}>
            <FormField label="How long have you experienced this?" name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 2 weeks" />
            <FormField label="Severity" name="severity" value={form.severity} onChange={handleChange} options={["Mild", "Moderate", "Severe"]} />
          </div>
          <div className="grid grid-2" style={{ gap: 0 }}>
            <FormField label="Age" name="age" type="number" value={form.age} onChange={handleChange} placeholder="e.g. 30" />
            <FormField label="Existing conditions" name="conditions" value={form.conditions} onChange={handleChange} placeholder="e.g. diabetes, none" />
          </div>
          <FormField label="Current medications" name="medications" value={form.medications} onChange={handleChange} placeholder="e.g. none" />

          <div style={{ marginBottom: 8 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--ink-600)" }}>
              Optional report upload
            </label>
            <div className="flex items-center gap-8" style={{ padding: "12px 14px", borderRadius: 10, border: "1px dashed var(--navy-100)", color: "var(--ink-400)", fontSize: 13.5 }}>
              <Icon name="upload" size={16} /> Attach a related report (optional, demo only)
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 12 }} disabled={!form.concern.trim()}>
            Analyze My Concern <Icon name="arrowRight" size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}

function ProcessingScreen() {
  const steps = ["Patient Input", "AI Analysis", "Care Category", "Hospital Specialist Matching"];
  return (
    <div className="center" style={{ padding: "60px 0", maxWidth: 480, margin: "0 auto" }}>
      <div style={{
        width: 74, height: 74, borderRadius: "50%", margin: "0 auto 26px",
        background: "var(--teal-50)", color: "var(--teal-600)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }} className="pulse-soft">
        <Icon name="sparkle" size={32} />
      </div>
      <h2 style={{ fontSize: 20, marginBottom: 8 }}>Understanding your request…</h2>
      <p className="muted" style={{ fontSize: 14, marginBottom: 34 }}>This will only take a moment.</p>

      <div style={{ textAlign: "left" }}>
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-12" style={{ marginBottom: 16, opacity: 0, animation: `fadeUp .5s ease forwards`, animationDelay: `${i * 0.35}s` }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--teal-500)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="check" size={14} />
            </div>
            <p style={{ fontSize: 14.5, fontWeight: 500 }}>{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultScreen({ department, onReset }) {
  const matches = doctors.filter((d) => d.department === department).slice(0, 3);
  const fallback = matches.length ? matches : doctors.slice(0, 3);

  return (
    <div>
      <button onClick={onReset} className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }}>
        <Icon name="chevronLeft" size={16} /> Describe a different concern
      </button>

      <div className="card card-pad" style={{ maxWidth: 720, marginBottom: 28, background: "var(--teal-50)", border: "1px solid var(--teal-100)" }}>
        <p className="muted" style={{ fontSize: 12.5, textTransform: "uppercase", letterSpacing: ".05em", fontWeight: 600, marginBottom: 8 }}>Suggested Care Category</p>
        <h2 style={{ fontSize: 26, marginBottom: 12 }}>{department}</h2>
        <p className="muted" style={{ fontSize: 14.5 }}>
          Based on the information you provided, a {department.toLowerCase()} consultation may be appropriate.
        </p>
      </div>

      <h3 style={{ fontSize: 17, marginBottom: 16 }}>Available Specialists</h3>
      <div className="grid grid-3" style={{ marginBottom: 24 }}>
        {fallback.map((doc) => {
          const unavailable = getUnavailableSlots(doc.id);
          const openSlots = timeSlots.filter((s) => !unavailable.includes(s)).slice(0, 3);
          return (
            <div key={doc.id} className="card card-pad card-hover">
              <p style={{ fontWeight: 700, fontSize: 15 }}>{doc.name}</p>
              <p className="muted" style={{ fontSize: 13.5, marginBottom: 8 }}>{doc.specialty} · {doc.experience}+ yrs experience</p>
              <span className="badge badge-green" style={{ marginBottom: 12 }}>Available Today</span>
              <div className="flex gap-8" style={{ flexWrap: "wrap", marginBottom: 14 }}>
                {openSlots.map((s) => <span key={s} className="badge badge-navy">{s}</span>)}
              </div>
              <Link to={`/specialists/${doc.id}`} className="btn btn-outline btn-block btn-sm">View Availability</Link>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-12" style={{ padding: "14px 16px", background: "var(--navy-50)", borderRadius: 12 }}>
        <Icon name="info" size={18} style={{ color: "var(--navy-700)", flexShrink: 0 }} />
        <p style={{ fontSize: 13, color: "var(--ink-600)" }}>
          This recommendation is for care navigation and does not constitute a medical diagnosis.
        </p>
      </div>
    </div>
  );
}

function EmergencyState({ onReset }) {
  return (
    <div className="center" style={{ maxWidth: 560, margin: "40px auto" }}>
      <div className="card card-pad" style={{ background: "linear-gradient(135deg,#FEF2F2,#FFF7ED)", border: "1px solid #FCA5A5" }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", margin: "0 auto 18px",
          background: "var(--red-100)", color: "var(--red-600)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="siren" size={30} />
        </div>
        <h2 style={{ fontSize: 22, marginBottom: 10 }}>Please Seek Immediate Medical Care</h2>
        <p className="muted" style={{ fontSize: 14.5, marginBottom: 26 }}>
          Some symptoms you entered may require urgent medical attention. This tool cannot assess
          emergencies — please contact emergency services or go to the nearest emergency department now.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link to="/contact#emergency" className="btn btn-danger btn-block">Emergency Department Information</Link>
          <a href="tel:112" className="btn btn-outline btn-block">Call Emergency Services</a>
          <Link to="/contact#emergency" className="btn btn-outline btn-block">Hospital Emergency Location</Link>
        </div>
        <button onClick={onReset} className="btn btn-ghost btn-sm" style={{ marginTop: 18 }}>
          Describe a different, non-urgent concern
        </button>
      </div>
    </div>
  );
}
