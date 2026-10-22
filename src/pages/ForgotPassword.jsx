import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [stage, setStage] = useState("request"); // "request" | "simulated_reset" | "success"
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetError, setResetError] = useState("");

  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  function handleRequestReset(e) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address (e.g. name@example.com).");
      return;
    }
    setError("");
    setStage("simulated_reset");
  }

  function handleCompleteReset(e) {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setResetError("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match.");
      return;
    }
    setResetError("");
    // In demo environment, store simulated password update notice
    setStage("success");
  }

  return (
    <section className="section wrap" style={{ display: "flex", justifyContent: "center" }}>
      <div className="card card-pad" style={{ maxWidth: 460, width: "100%" }}>
        <div className="center" style={{ marginBottom: 26 }}>
          <div className="brand-mark" style={{ margin: "0 auto 14px" }}>
            <Icon name="logo" size={18} style={{ color: "#5EEAD4" }} />
          </div>
          <h1 style={{ fontSize: 24 }}>Reset Password</h1>
          <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>
            {stage === "success"
              ? "Your password has been reset."
              : "Recover access to your MediVerse patient account"}
          </p>
        </div>

        {/* Demo environment disclosure */}
        <div
          style={{
            padding: "12px 14px",
            background: "var(--navy-50)",
            border: "1px solid var(--navy-100)",
            borderRadius: 10,
            marginBottom: 22,
            fontSize: 12.5,
            color: "var(--ink-600)",
          }}
        >
          <div className="flex items-center gap-8" style={{ marginBottom: 4 }}>
            <Icon name="shield" size={15} style={{ color: "var(--navy-700)" }} />
            <strong style={{ color: "var(--navy-900)" }}>Demo Environment Simulation</strong>
          </div>
          <p>
            No external emails are sent in this frontend demo. You can test the simulated reset flow below.
          </p>
        </div>

        {stage === "request" && (
          <form onSubmit={handleRequestReset}>
            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="forgot-email"
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 6,
                  color: "var(--ink-600)",
                }}
              >
                Registered Email Address
              </label>
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="e.g. khushboo.ahuja@example.com"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 10,
                  border: "1px solid var(--navy-100)",
                  fontSize: 14.5,
                  outline: "none",
                }}
              />
            </div>

            {error && (
              <p
                style={{
                  color: "var(--red-600)",
                  fontSize: 13.5,
                  marginBottom: 14,
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-block"
              style={{ marginTop: 8 }}
            >
              Continue to Reset Password
            </button>
          </form>
        )}

        {stage === "simulated_reset" && (
          <form onSubmit={handleCompleteReset} className="fade-up">
            <div
              style={{
                padding: "12px 14px",
                background: "var(--teal-50)",
                borderRadius: 10,
                border: "1px solid var(--teal-200)",
                marginBottom: 18,
                fontSize: 13,
              }}
            >
              <p style={{ color: "var(--teal-800)", fontWeight: 600 }}>
                Reset link verified for <strong>{email}</strong>
              </p>
              <p style={{ color: "var(--teal-700)", fontSize: 12, marginTop: 2 }}>
                Enter your new demo password below to complete the simulated recovery.
              </p>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label
                htmlFor="new-pass"
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 6,
                  color: "var(--ink-600)",
                }}
              >
                New Password
              </label>
              <input
                id="new-pass"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 10,
                  border: "1px solid var(--navy-100)",
                  fontSize: 14.5,
                  outline: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="confirm-pass"
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 6,
                  color: "var(--ink-600)",
                }}
              >
                Confirm New Password
              </label>
              <input
                id="confirm-pass"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 10,
                  border: "1px solid var(--navy-100)",
                  fontSize: 14.5,
                  outline: "none",
                }}
              />
            </div>

            {resetError && (
              <p
                style={{
                  color: "var(--red-600)",
                  fontSize: 13.5,
                  marginBottom: 14,
                }}
              >
                {resetError}
              </p>
            )}

            <button type="submit" className="btn btn-primary btn-block">
              Save New Password
            </button>
          </form>
        )}

        {stage === "success" && (
          <div className="center fade-up" style={{ padding: "10px 0" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "var(--green-100)",
                color: "var(--green-600)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <Icon name="checkCircle" size={28} />
            </div>
            <h3 style={{ fontSize: 18, marginBottom: 8 }}>Password Successfully Reset!</h3>
            <p className="muted" style={{ fontSize: 13.5, marginBottom: 22 }}>
              Your simulated credentials have been updated. You can now log into your patient account.
            </p>
            <Link to="/patient/login" className="btn btn-primary btn-block">
              Back to Patient Login
            </Link>
          </div>
        )}

        <div className="center" style={{ marginTop: 22, paddingTop: 16, borderTop: "1px solid var(--navy-50)" }}>
          <Link
            to="/patient/login"
            style={{ fontSize: 13.5, color: "var(--teal-600)", fontWeight: 600 }}
          >
            ← Return to Patient Login
          </Link>
        </div>
      </div>
    </section>
  );
}
