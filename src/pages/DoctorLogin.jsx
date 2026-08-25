import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import FormField from "../components/FormField";
import useAuth from "../hooks/useAuth";
import { doctors } from "../data/mockData";

export default function DoctorLogin() {
  const [selectedDoc, setSelectedDoc] = useState(doctors[0].id);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginAsDoctor } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }
    const doc = doctors.find((d) => d.id === selectedDoc);
    loginAsDoctor(doc.id, doc.name);
    navigate("/doctor/dashboard");
  }

  return (
    <section className="section wrap" style={{ display: "flex", justifyContent: "center" }}>
      <div className="card card-pad" style={{ maxWidth: 440, width: "100%" }}>
        <div className="center" style={{ marginBottom: 26 }}>
          <div className="brand-mark" style={{ margin: "0 auto 14px" }}>
            <Icon name="stethoscope" size={18} style={{ color: "#5EEAD4" }} />
          </div>
          <h1 style={{ fontSize: 24 }}>Doctor Portal</h1>
          <p className="muted" style={{ fontSize: 14.5, marginTop: 6 }}>Log in to view your patients and schedule</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--ink-600)" }}>Select Doctor (demo)</label>
            <select value={selectedDoc} onChange={(e) => setSelectedDoc(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--navy-100)", fontSize: 14.5 }}>
              {doctors.map((d) => <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>)}
            </select>
          </div>
          <FormField label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />

          {error && <p style={{ color: "var(--red-600)", fontSize: 13.5, marginBottom: 14 }}>{error}</p>}

          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>

        <p className="center muted" style={{ fontSize: 12.5, marginTop: 20 }}>
          Patient? <Link to="/patient/login" style={{ color: "var(--navy-700)", fontWeight: 600 }}>Patient login</Link>
        </p>
      </div>
    </section>
  );
}
