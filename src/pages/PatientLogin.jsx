import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Icon from "../components/Icon";
import useAuth from "../hooks/useAuth";

export default function PatientLogin() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const { loginAsPatient } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.identifier.trim() || !form.password.trim()) {
      setError("Please enter both your Patient ID / email and password.");
      return;
    }
    setError("");
    // Demo auth — any credentials log in as the demo patient (Khushboo Ahuja)
    loginAsPatient();
    const redirectTo = location.state?.from || "/patient/dashboard";
    navigate(redirectTo);
  }

  return (
    <section className="section wrap" style={{ display: "flex", justifyContent: "center" }}>
      <div className="card card-pad" style={{ maxWidth: 440, width: "100%" }}>
        <div className="center" style={{ marginBottom: 26 }}>
          <div className="brand-mark" style={{ margin: "0 auto 14px" }}>
            <Icon name="logo" size={18} style={{ color: "#5EEAD4" }} />
          </div>
          <h1 style={{ fontSize: 24 }}>Welcome back</h1>
          <p className="muted" style={{ fontSize: 14.5, marginTop: 6 }}>Log in to your MediVerse patient account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Field label="Patient ID / Email / Mobile" name="identifier" value={form.identifier} onChange={handleChange} placeholder="PT-2026-10482 or you@example.com" />
          <Field label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" />

          {error && (
            <p style={{ color: "var(--red-600)", fontSize: 13.5, marginBottom: 14 }}>{error}</p>
          )}

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 6 }}>Login</button>
        </form>

        <div className="flex justify-between" style={{ marginTop: 16 }}>
          <Link to="#" className="muted" style={{ fontSize: 13.5 }}>Forgot Password?</Link>
          <Link to="/patient/register" style={{ fontSize: 13.5, color: "var(--teal-600)", fontWeight: 600 }}>Create Patient Account</Link>
        </div>

        <div className="flex items-center gap-8" style={{ marginTop: 24, padding: "12px 14px", background: "var(--navy-50)", borderRadius: 10 }}>
          <Icon name="shield" size={16} style={{ color: "var(--navy-700)", flexShrink: 0 }} />
          <p style={{ fontSize: 12.5, color: "var(--ink-600)" }}>
            Your medical information is protected and accessible only to authorized users.
          </p>
        </div>

        <p className="center muted" style={{ fontSize: 12.5, marginTop: 18 }}>
          Are you a doctor, pharmacist or hospital staff member?{" "}
          <Link to="/doctor/login" style={{ color: "var(--navy-700)", fontWeight: 600 }}>Staff login</Link>
        </p>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--ink-600)" }}>{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--navy-100)", fontSize: 14.5, outline: "none" }}
      />
    </div>
  );
}
