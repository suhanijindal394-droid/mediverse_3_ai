import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import useAuth from "../hooks/useAuth";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "grid" },
  { to: "/admin/doctors", label: "Doctors", icon: "stethoscope" },
  { to: "/admin/patients", label: "Patients", icon: "users" },
  { to: "/admin/appointments", label: "Appointments", icon: "calendar" },
  { to: "/admin/pharmacy", label: "Pharmacy", icon: "crossMed" },
  { to: "/admin/analytics", label: "Analytics", icon: "activity" },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <aside className={`portal-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="flex items-center gap-8" style={{ padding: "22px 20px", borderBottom: "1px solid var(--navy-800)" }}>
          <span className="brand-mark"><Icon name="shield" size={16} style={{ color: "#5EEAD4" }} /></span>
          <span style={{ color: "#fff", fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 14 }}>MediVerse Admin</span>
        </div>
        <nav style={{ padding: "16px 12px", flex: 1 }}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <Icon name={item.icon} size={17} /> {item.label}
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
      <div style={{ flex: 1, minWidth: 0 }}>
        <header className="portal-topbar">
          <button className="nav-toggle" style={{ display: "flex" }} onClick={() => setMobileOpen(true)}>
            <Icon name="menu" size={22} />
          </button>
        </header>
        <main className="wrap" style={{ padding: "32px 28px", maxWidth: 1220 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
