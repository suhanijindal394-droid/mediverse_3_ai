import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Icon from "../components/Icon";
import FormField from "../components/FormField";
import useAuth from "../hooks/useAuth";

export default function PharmacyLogin() {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginAsRole } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!staffId.trim() || !password.trim()) {
      setError("Please enter your staff ID and password.");
      return;
    }
    loginAsRole("pharmacist", "Pharmacist " + staffId);
    navigate("/pharmacy/dashboard");
  }

  return (
    <section className="section wrap" style={{ display: "flex", justifyContent: "center" }}>
      <div className="card card-pad" style={{ maxWidth: 420, width: "100%" }}>
        <div className="center" style={{ marginBottom: 26 }}>
          <div className="brand-mark" style={{ margin: "0 auto 14px" }}>
            <Icon name="crossMed" size={18} style={{ color: "#5EEAD4" }} />
          </div>
          <h1 style={{ fontSize: 24 }}>Pharmacy Portal</h1>
          <p className="muted" style={{ fontSize: 14.5, marginTop: 6 }}>Log in to look up and dispense prescriptions</p>
        </div>
        <form onSubmit={handleSubmit}>
          <FormField label="Staff ID" name="staffId" value={staffId} onChange={(e) => setStaffId(e.target.value)} placeholder="PH-1042" required />
          <FormField label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          {error && <p style={{ color: "var(--red-600)", fontSize: 13.5, marginBottom: 14 }}>{error}</p>}
          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>
        <p className="center muted" style={{ fontSize: 12.5, marginTop: 20 }}>
          <Link to="/patient/login" style={{ color: "var(--navy-700)", fontWeight: 600 }}>Back to Patient Login</Link>
        </p>
      </div>
    </section>
  );
}
