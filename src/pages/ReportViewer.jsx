import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Icon from "../components/Icon";
import { demoReports, doctors, formatDisplayDate } from "../data/mockData";
import { usePatientProfile } from "../hooks/useSharedData";

export default function ReportViewer() {
  const { id } = useParams();
  const [showAISummary, setShowAISummary] = useState(false);
  const { patient } = usePatientProfile();
  const report = demoReports.find((r) => r.id === id);
  if (!report) return <Navigate to="/patient/reports" replace />;
  const doc = doctors.find((d) => d.id === report.doctorId);

  return (
    <div>
      <Link to="/patient/reports" className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }}>
        <Icon name="chevronLeft" size={16} /> Back to Reports
      </Link>

      <div className="grid" style={{ gridTemplateColumns: "1fr 300px", gap: 24 }}>
        <div className="card card-pad">
          <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
            <h2 style={{ fontSize: 19 }}>{report.name}</h2>
            <span className="badge badge-green">{report.status}</span>
          </div>

          <div className="grid grid-2" style={{ marginBottom: 20 }}>
            <Info label="Patient" value={patient.name} />
            <Info label="Test Date" value={formatDisplayDate(report.date)} />
            <Info label="Doctor" value={doc?.name} />
            <Info label="Department / Lab" value={report.department} />
          </div>

          <div style={{
            border: "2px dashed var(--navy-100)", borderRadius: 14, padding: "44px 20px",
            textAlign: "center", color: "var(--ink-400)", marginBottom: 20,
          }}>
            <Icon name="file" size={30} style={{ marginBottom: 10 }} />
            <p style={{ fontSize: 13.5 }}>Document preview (PDF)</p>
          </div>

          <div style={{ marginBottom: 8 }}>
            <p className="muted" style={{ fontSize: 12, marginBottom: 4 }}>DOCTOR COMMENTS</p>
            <p style={{ fontSize: 13.5 }}>{report.summary}</p>
          </div>
        </div>

        <div>
          <div className="card card-pad" style={{ marginBottom: 16 }}>
            <button className="btn btn-teal btn-block btn-sm" onClick={() => setShowAISummary((s) => !s)}>
              <Icon name="sparkle" size={15} /> {showAISummary ? "Hide" : "Explain this report in simple language"}
            </button>

            {showAISummary && (
              <div className="fade-up" style={{ marginTop: 14, padding: 14, background: "var(--teal-50)", borderRadius: 10 }}>
                <p style={{ fontSize: 13, lineHeight: 1.6 }}>{plainLanguageSummary(report)}</p>
                <p className="muted" style={{ fontSize: 11.5, marginTop: 10 }}>
                  AI summaries are for informational purposes and should be discussed with your healthcare professional.
                </p>
              </div>
            )}
          </div>

          <button className="btn btn-outline btn-block btn-sm" onClick={() => window.print()}>
            <Icon name="download" size={15} /> Download
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="muted" style={{ fontSize: 11.5 }}>{label}</p>
      <p style={{ fontSize: 13.5, fontWeight: 600 }}>{value}</p>
    </div>
  );
}

function plainLanguageSummary(report) {
  return `In simple terms: this ${report.name.toLowerCase()} was reviewed by your care team and the recorded finding was — "${report.summary}" This is a plain-language restatement, not a new interpretation. Please discuss any questions with ${"your doctor"} at your next visit.`;
}
