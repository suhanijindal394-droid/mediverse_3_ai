import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Icon from "../components/Icon";
import FormField from "../components/FormField";
import useAuth from "../hooks/useAuth";

const initialForm = {
  fullName: "", dob: "", gender: "Female", mobile: "", email: "", address: "",
  emergencyContact: "", bloodGroup: "O+", allergies: "", password: "",
};

export default function PatientRegister() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [patientId, setPatientId] = useState(null);
  const { loginAsPatient } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required.";
    if (!form.mobile.trim()) errs.mobile = "Mobile number is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    if (!form.password || form.password.length < 6) errs.password = "Password must be at least 6 characters.";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Generate a Patient ID, e.g. PT-2026-48213
    const random = Math.floor(10000 + Math.random() * 89999);
    const id = `PT-2026-${random}`;
    setPatientId(id);
  }

  function handleContinue() {
    loginAsPatient();
    navigate("/patient/dashboard");
  }

  if (patientId) {
    return (
      <section className="section wrap" style={{ display: "flex", justifyContent: "center" }}>
        <div className="card card-pad center" style={{ maxWidth: 460, width: "100%" }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", margin: "0 auto 18px",
            background: "var(--green-100)", color: "var(--green-600)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="checkCircle" size={30} />
          </div>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>Account created!</h2>
          <p className="muted" style={{ fontSize: 14.5, marginBottom: 22 }}>
            Your Patient ID will be used to securely identify your hospital records and pharmacy prescriptions.
          </p>
          <div className="font-mono" style={{
            background: "var(--navy-900)", color: "var(--teal-300)", borderRadius: 12,
            padding: "18px", fontSize: 22, fontWeight: 600, letterSpacing: "0.04em", marginBottom: 24,
          }}>
            {patientId}
          </div>
          <button className="btn btn-primary btn-block" onClick={handleContinue}>
            Continue to Dashboard <Icon name="arrowRight" size={16} />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section wrap" style={{ display: "flex", justifyContent: "center" }}>
      <div className="card card-pad" style={{ maxWidth: 520, width: "100%" }}>
        <div className="center" style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24 }}>Create your patient account</h1>
          <p className="muted" style={{ fontSize: 14.5, marginTop: 6 }}>Takes less than two minutes.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-2" style={{ gap: 0 }}>
            <FormField label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" required />
            <FormField label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} />
          </div>
          {errors.fullName && <ErrorText text={errors.fullName} />}

          <div className="grid grid-2" style={{ gap: 0 }}>
            <FormField label="Gender" name="gender" value={form.gender} onChange={handleChange} options={["Female", "Male", "Other"]} />
            <FormField label="Blood Group" name="bloodGroup" value={form.bloodGroup} onChange={handleChange} options={["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]} />
          </div>

          <div className="grid grid-2" style={{ gap: 0 }}>
            <FormField label="Mobile Number" name="mobile" value={form.mobile} onChange={handleChange} placeholder="+91 98765 43210" required />
            <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
          </div>
          {(errors.mobile || errors.email) && <ErrorText text={errors.mobile || errors.email} />}

          <FormField label="Address" name="address" textarea value={form.address} onChange={handleChange} placeholder="House, street, city, state" />
          <FormField label="Emergency Contact" name="emergencyContact" value={form.emergencyContact} onChange={handleChange} placeholder="+91 ... (relation)" />
          <FormField label="Allergies (if any)" name="allergies" value={form.allergies} onChange={handleChange} placeholder="e.g. Penicillin, none" />
          <FormField label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="At least 6 characters" required />
          {errors.password && <ErrorText text={errors.password} />}

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 8 }}>
            Create Patient Account
          </button>
        </form>

        <p className="center muted" style={{ fontSize: 13, marginTop: 16 }}>
          Already have an account? <Link to="/patient/login" style={{ color: "var(--teal-600)", fontWeight: 600 }}>Log in</Link>
        </p>
      </div>
    </section>
  );
}

function ErrorText({ text }) {
  return <p style={{ color: "var(--red-600)", fontSize: 12.5, marginTop: -10, marginBottom: 14 }}>{text}</p>;
}
