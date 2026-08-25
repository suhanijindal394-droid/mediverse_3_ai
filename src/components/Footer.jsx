import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="grid grid-4" style={{ marginBottom: 8 }}>
          <div>
            <div className="brand" style={{ color: "#fff", marginBottom: 14 }}>
              <span className="brand-mark"><Icon name="logo" size={18} style={{ color: "#5EEAD4" }} /></span>
              MediVerse
            </div>
            <p style={{ color: "#9FB0C9", fontSize: 14, maxWidth: 260 }}>
              Your health. One connected experience — specialists, appointments, prescriptions and records in a single platform.
            </p>
          </div>
          <div>
            <h4>Platform</h4>
            <Link to="/specialists">Find a Specialist</Link>
            <Link to="/departments">Departments</Link>
            <Link to="/patient/login">Patient Login</Link>
            <Link to="/patient/register">Create Account</Link>
          </div>
          <div>
            <h4>Hospital</h4>
            <Link to="/about">About MediVerse</Link>
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/contact#emergency">Emergency Info</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <span style={{ color: "#9FB0C9", fontSize: 14, display: "block", padding: "5px 0" }}>Model Town, Ludhiana, Punjab</span>
            <span style={{ color: "#9FB0C9", fontSize: 14, display: "block", padding: "5px 0" }}>+91 161 400 1000</span>
            <span style={{ color: "#9FB0C9", fontSize: 14, display: "block", padding: "5px 0" }}>care@mediverse.health</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 MediVerse Hospital. Demo platform — fictional data only.</span>
          <span>Privacy Policy · Terms of Use · Accessibility</span>
        </div>
      </div>
    </footer>
  );
}
