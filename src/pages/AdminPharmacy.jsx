import Icon from "../components/Icon";
import { medicineInventory } from "../data/mockData";

export default function AdminPharmacy() {
  const totalPrescriptions = 764;
  const pendingPickups = 38;
  const completedPickups = 726;
  const lowStock = medicineInventory.filter((m) => m.quantity < m.min).length;

  return (
    <div>
      <h1 style={{ fontSize: "clamp(22px,3vw,28px)", marginBottom: 24 }}>Pharmacy Management</h1>

      <div className="grid grid-4" style={{ marginBottom: 28 }}>
        <StatCard label="Total Prescriptions" value={totalPrescriptions} icon="pill" tone="navy" />
        <StatCard label="Pending Pickups" value={pendingPickups} icon="clock" tone="amber" />
        <StatCard label="Completed Pickups" value={completedPickups} icon="checkCircle" tone="green" />
        <StatCard label="Low-Stock Medicines" value={lowStock} icon="alert" tone="red" />
      </div>

      <div className="card" style={{ overflowX: "auto" }}>
        <div style={{ padding: "18px 20px 6px" }}>
          <h3 style={{ fontSize: 16 }}>Medicine Inventory</h3>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
          <thead>
            <tr style={{ background: "var(--navy-50)" }}>
              {["Medicine", "Available Quantity", "Minimum Stock", "Expiry Date", "Status"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, color: "var(--ink-600)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {medicineInventory.map((m) => {
              const low = m.quantity < m.min;
              return (
                <tr key={m.name} style={{ borderBottom: "1px solid var(--navy-50)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600, fontSize: 13.5 }}>{m.name}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13.5 }}>{m.quantity}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13.5 }}>{m.min}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13.5 }}>{new Date(m.expiry).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span className={`badge ${low ? "badge-red" : "badge-green"}`}>{low ? "Low Stock" : "In Stock"}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, tone }) {
  const tones = {
    navy: { bg: "var(--navy-50)", color: "var(--navy-800)" },
    amber: { bg: "var(--amber-100)", color: "var(--amber-600)" },
    green: { bg: "var(--green-100)", color: "var(--green-600)" },
    red: { bg: "var(--red-100)", color: "var(--red-600)" },
  };
  const t = tones[tone];
  return (
    <div className="card stat-card">
      <div className="stat-icon" style={{ background: t.bg, color: t.color }}><Icon name={icon} size={20} /></div>
      <p className="muted" style={{ fontSize: 13 }}>{label}</p>
      <p style={{ fontWeight: 700, fontSize: 22 }}>{value}</p>
    </div>
  );
}
