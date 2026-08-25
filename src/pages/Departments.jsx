import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { departments, doctors } from "../data/mockData";

const deptIcon = {
  Cardiology: "heart", Neurology: "brain", Orthopedics: "bone", Dermatology: "activity",
  Pediatrics: "baby", Gynecology: "female", Gastroenterology: "stomach", Pulmonology: "lungs",
  ENT: "ear", Ophthalmology: "eye", "General Medicine": "stethoscope", Psychiatry: "mind",
  Dentistry: "tooth", Oncology: "shield",
};

const deptDescriptions = {
  Cardiology: "Heart health, blood pressure and rhythm disorders.",
  Neurology: "Brain, nerve and headache-related conditions.",
  Orthopedics: "Bones, joints, fractures and sports injuries.",
  Dermatology: "Skin, hair and nail conditions.",
  Pediatrics: "Complete healthcare for infants and children.",
  Gynecology: "Women's health across every life stage.",
  Gastroenterology: "Digestive system and stomach-related care.",
  Pulmonology: "Lungs, breathing and respiratory conditions.",
  ENT: "Ear, nose and throat conditions.",
  Ophthalmology: "Eye health and vision care.",
  "General Medicine": "Everyday illnesses and first-point-of-care.",
  Psychiatry: "Confidential mental health and wellbeing support.",
  Dentistry: "Teeth, gums and oral health.",
  Oncology: "Cancer screening, treatment and support care.",
};

export default function Departments() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="center" style={{ maxWidth: 620, margin: "0 auto 48px" }}>
          <div className="eyebrow">14 hospital departments</div>
          <h1 style={{ fontSize: "clamp(26px,3.6vw,38px)", marginTop: 14 }}>Our departments</h1>
          <p className="muted" style={{ marginTop: 12 }}>
            Every department is staffed with verified specialists and connected to the same digital record system.
          </p>
        </div>

        <div className="grid grid-3">
          {departments.map((dept) => {
            const count = doctors.filter((d) => d.department === dept).length;
            return (
              <div key={dept} className="card card-pad card-hover">
                <div style={{
                  width: 46, height: 46, borderRadius: 12, background: "var(--navy-50)", color: "var(--navy-800)",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16,
                }}>
                  <Icon name={deptIcon[dept] || "crossMed"} size={22} />
                </div>
                <h3 style={{ fontSize: 16.5, marginBottom: 6 }}>{dept}</h3>
                <p className="muted" style={{ fontSize: 13.5, marginBottom: 14 }}>{deptDescriptions[dept]}</p>
                <p className="muted" style={{ fontSize: 12.5, marginBottom: 14 }}>
                  {count > 0 ? `${count} specialist${count > 1 ? "s" : ""} available` : "Specialists available"}
                </p>
                <Link to="/specialists" className="btn btn-outline btn-sm btn-block">Book Appointment</Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
