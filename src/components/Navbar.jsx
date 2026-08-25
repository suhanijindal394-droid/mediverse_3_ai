import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Icon from "./Icon";
import useAuth from "../hooks/useAuth";

const links = [
  { to: "/", label: "Home" },
  { to: "/departments", label: "Services" },
  { to: "/specialists", label: "Specialists" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { session } = useAuth();

  return (
    <header className="navbar">
      <div className="wrap navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <Icon name="logo" size={18} style={{ color: "#5EEAD4" }} />
          </span>
          MediVerse
        </Link>

        <nav className="nav-links">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"}
              className={({ isActive }) => (isActive ? "active" : "")}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="btn btn-ghost btn-sm" title="Language" style={{ display: "flex" }}>
            <Icon name="globe" size={16} /> EN
          </button>
          {session ? (
            <Link
              to={session.role === "patient" ? "/patient/dashboard" : `/${session.role}/dashboard`}
              className="btn btn-primary btn-sm"
            >
              My Dashboard
            </Link>
          ) : (
            <>
              <Link to="/patient/login" className="btn btn-outline btn-sm">Login</Link>
              <Link to="/patient/register" className="btn btn-primary btn-sm">Get Started</Link>
            </>
          )}
          <button className="nav-toggle" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      <div className={`mobile-menu wrap ${open ? "open" : ""}`}>
        {links.map((l) => (
          <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
        ))}
      </div>
    </header>
  );
}
