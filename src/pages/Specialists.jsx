import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { doctors, departments } from "../data/mockData";

export default function Specialists() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [sortBy, setSortBy] = useState("experience");

  // useMemo — avoid recomputing the filtered list on every unrelated render
  const filtered = useMemo(() => {
    let list = doctors.filter((d) => {
      const matchesQuery =
        query.trim() === "" ||
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.specialty.toLowerCase().includes(query.toLowerCase());
      const matchesDept = department === "All" || d.department === department;
      const matchesAvailability =
        availability === "All" || d.availableDays.includes(availability);
      return matchesQuery && matchesDept && matchesAvailability;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === "experience") return b.experience - a.experience;
      if (sortBy === "fee-low") return a.fee - b.fee;
      if (sortBy === "fee-high") return b.fee - a.fee;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

    return list;
  }, [query, department, availability, sortBy]);

  return (
    <section className="section">
      <div className="wrap">
        <div className="center" style={{ maxWidth: 640, margin: "0 auto 40px" }}>
          <div className="eyebrow">186+ verified specialists</div>
          <h1 style={{ fontSize: "clamp(28px,3.6vw,40px)", marginTop: 14 }}>Find your specialist</h1>
          <p className="muted" style={{ marginTop: 12 }}>
            Search by name, specialty or department, or filter by availability.
          </p>
        </div>

        {/* ---------- Search + Filters ---------- */}
        <div className="card card-pad" style={{ marginBottom: 32 }}>
          <div className="flex gap-12" style={{ flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 260px", position: "relative" }}>
              <Icon name="search" size={17} style={{ position: "absolute", left: 14, top: 13, color: "var(--ink-400)" }} />
              <input
                type="text"
                placeholder="Search doctor name or specialty…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={inputStyle(true)}
              />
            </div>

            <select value={department} onChange={(e) => setDepartment(e.target.value)} style={inputStyle()}>
              <option value="All">All Departments</option>
              {departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>

            <select value={availability} onChange={(e) => setAvailability(e.target.value)} style={inputStyle()}>
              <option value="All">Any Availability</option>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <option key={d} value={d}>Available {d}</option>
              ))}
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={inputStyle()}>
              <option value="experience">Sort: Most Experienced</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="fee-low">Sort: Fee (Low to High)</option>
              <option value="fee-high">Sort: Fee (High to Low)</option>
            </select>
          </div>
        </div>

        <p className="muted" style={{ marginBottom: 18, fontSize: 14 }}>
          Showing <strong style={{ color: "var(--navy-900)" }}>{filtered.length}</strong> of {doctors.length} specialists
        </p>

        {/* ---------- Results ---------- */}
        {filtered.length === 0 ? (
          <div className="card card-pad center" style={{ padding: 60 }}>
            <Icon name="search" size={30} style={{ color: "var(--ink-400)", marginBottom: 14 }} />
            <h3 style={{ marginBottom: 8 }}>No specialists match your filters</h3>
            <p className="muted" style={{ marginBottom: 18 }}>Try clearing a filter or searching a different term.</p>
            <button className="btn btn-outline btn-sm" onClick={() => { setQuery(""); setDepartment("All"); setAvailability("All"); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-3">
            {filtered.map((doc) => <DoctorCard key={doc.id} doc={doc} />)}
          </div>
        )}
      </div>
    </section>
  );
}

function DoctorCard({ doc }) {
  const initials = doc.name.replace("Dr. ", "").split(" ").map((n) => n[0]).join("");
  return (
    <div className="card card-pad card-hover">
      <div className="flex items-center gap-12" style={{ marginBottom: 16 }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "linear-gradient(135deg,var(--navy-800),var(--navy-600))",
          color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: 16, fontFamily: "var(--font-display)", flexShrink: 0,
        }}>
          {initials}
        </div>
        <div style={{ flex: 1 }}>
          <div className="flex items-center gap-8">
            <p style={{ fontWeight: 700, fontSize: 15.5 }}>{doc.name}</p>
            {doc.verified && <Icon name="checkCircle" size={15} style={{ color: "var(--teal-600)" }} />}
          </div>
          <p className="muted" style={{ fontSize: 13.5 }}>{doc.specialty}</p>
        </div>
      </div>

      <div className="flex gap-8" style={{ flexWrap: "wrap", marginBottom: 14 }}>
        <span className="badge badge-navy">{doc.department}</span>
        <span className="badge badge-teal">{doc.experience}+ yrs experience</span>
      </div>

      <p className="muted" style={{ fontSize: 13.5, marginBottom: 6 }}>{doc.qualifications}</p>
      <div className="flex items-center gap-8 muted" style={{ marginBottom: 6, fontSize: 13.5 }}>
        <Icon name="mapPin" size={14} /> {doc.location}
      </div>
      <div className="flex items-center justify-between" style={{ marginTop: 16, marginBottom: 16 }}>
        <div>
          <p className="muted" style={{ fontSize: 12 }}>Consultation Fee</p>
          <p style={{ fontWeight: 700, fontSize: 16 }}>₹{doc.fee}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p className="muted" style={{ fontSize: 12 }}>Available</p>
          <p style={{ fontWeight: 600, fontSize: 13.5, color: "var(--green-600)" }}>{doc.availableDays.join(", ")}</p>
        </div>
      </div>

      <div className="flex gap-8">
        <Link to={`/specialists/${doc.id}`} className="btn btn-outline btn-sm" style={{ flex: 1 }}>View Profile</Link>
        <Link to={`/patient/book-appointment/${doc.id}`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>Book</Link>
      </div>
    </div>
  );
}

function inputStyle(grow) {
  return {
    padding: grow ? "12px 14px 12px 40px" : "12px 14px",
    borderRadius: 10, border: "1px solid var(--navy-100)",
    fontSize: 14.5, background: "#fff", color: "var(--ink-900)",
    width: grow ? "100%" : "auto", outline: "none",
  };
}
