import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import useAuth from "../hooks/useAuth";
import { usePatientProfile, useNotifications } from "../hooks/useSharedData";
import AIAssistant from "./AIAssistant";

const navItems = [
  { to: "/patient/dashboard", label: "Dashboard", icon: "grid" },
  { to: "/patient/ai-specialist", label: "Find Specialist", icon: "sparkle" },
  { to: "/patient/appointments", label: "My Appointments", icon: "calendar" },
  { to: "/patient/prescriptions", label: "My Prescriptions", icon: "pill" },
  { to: "/patient/reports", label: "My Reports", icon: "file" },
  { to: "/patient/medical-history", label: "Medical History", icon: "activity" },
  { to: "/patient/pharmacy", label: "Pharmacy", icon: "building" },
  { to: "/patient/notifications", label: "Notifications", icon: "bell", badge: true },
  { to: "/patient/profile", label: "Profile", icon: "user" },
];

export default function PatientLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth();
  const { patient } = usePatientProfile();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const avatarInitial = (patient?.firstName?.[0] || patient?.name?.[0] || "P").toUpperCase();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {/* ---------- Sidebar ---------- */}
      <aside className={`portal-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="flex items-center gap-8" style={{ padding: "22px 20px", borderBottom: "1px solid var(--navy-800)" }}>
          <span className="brand-mark"><Icon name="logo" size={16} style={{ color: "#5EEAD4" }} /></span>
          <span style={{ color: "#fff", fontWeight: 700, fontFamily: "var(--font-display)" }}>MediVerse</span>
        </div>

        <nav style={{ padding: "16px 12px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              style={{ display: "flex", alignItems: "center" }}
            >
              <Icon name={item.icon} size={17} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && unreadCount > 0 && (
                <span
                  className="badge badge-teal"
                  style={{
                    fontSize: 11,
                    padding: "2px 7px",
                    fontWeight: 700,
                    borderRadius: 10,
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: 12, borderTop: "1px solid var(--navy-800)" }}>
          <button onClick={handleLogout} className="sidebar-link" style={{ width: "100%", background: "none", border: "none", cursor: "pointer" }}>
            <Icon name="logout" size={17} /> Logout
          </button>
        </div>
      </aside>

      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}

      {/* ---------- Main ---------- */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <header className="portal-topbar">
          <button className="nav-toggle" style={{ display: "flex" }} onClick={() => setMobileOpen(true)}>
            <Icon name="menu" size={22} />
          </button>
          <div style={{ flex: 1 }} />
          <NavLink
            to="/patient/notifications"
            className="icon-btn"
            style={{ position: "relative" }}
            title="Notifications"
          >
            <Icon name="bell" size={19} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  background: "var(--teal-600)",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                  borderRadius: "50%",
                  minWidth: 17,
                  height: 17,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 2px",
                  lineHeight: 1,
                  border: "2px solid #fff",
                }}
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </NavLink>
          <NavLink to="/patient/profile" className="flex items-center gap-8" style={{ marginLeft: 8 }} title="Patient Profile">
            <div style={{
              width: 34, height: 34, borderRadius: "50%", background: "var(--navy-100)", color: "var(--navy-800)",
              display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13,
            }}>
              {avatarInitial}
            </div>
          </NavLink>
        </header>

        <main className="wrap" style={{ padding: "32px 28px", maxWidth: 1180 }}>
          <Outlet />
        </main>
      </div>

      <AIAssistant />
    </div>
  );
}
