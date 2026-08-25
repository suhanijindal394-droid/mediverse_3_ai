import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import useAuth from "../hooks/useAuth";

const navItems = [
  { to: "/doctor/dashboard", label: "Dashboard", icon: "grid" },
  { to: "/doctor/patients", label: "My Patients", icon: "users" },
];

export default function DoctorLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <aside className={`portal-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="flex items-center gap-8" style={{ padding: "22px 20px", borderBottom: "1px solid var(--navy-800)" }}>
          <span className="brand-mark"><Icon name="stethoscope" size={16} style={{ color: "#5EEAD4" }} /></span>
          <span style={{ color: "#fff", fontWeight: 700, fontFamily: "var(--font-display)" }}>Doctor Portal</span>
        </div>

        <nav style={{ padding: "16px 12px", flex: 1 }}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <Icon name={item.icon} size={17} /> {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: 12, borderTop: "1px solid var(--navy-800)" }}>
          <div style={{ padding: "8px 14px 14px", color: "#7488A6", fontSize: 12.5 }}>Logged in as</div>
          <div style={{ padding: "0 14px 14px", color: "#fff", fontSize: 13.5, fontWeight: 600, marginTop: -10 }}>{session?.name}</div>
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
          <div style={{ flex: 1 }} />
          <div className="flex items-center gap-8">
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--navy-100)", color: "var(--navy-800)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>
              {session?.name?.replace("Dr. ", "")[0]}
            </div>
          </div>
        </header>
        <main className="wrap" style={{ padding: "32px 28px", maxWidth: 1180 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
