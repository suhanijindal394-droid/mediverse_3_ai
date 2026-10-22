import { useState, useMemo } from "react";
import Icon from "../components/Icon";
import { formatDisplayDate } from "../data/mockData";
import {
  usePrescriptions,
  usePatientProfile,
  usePharmacyOrders,
} from "../hooks/useSharedData";

export default function PatientPharmacy() {
  const { patient } = usePatientProfile();
  const { prescriptions } = usePrescriptions();
  const { orders, placeOrder } = usePharmacyOrders();

  const [planTab, setPlanTab] = useState("Monthly");
  const [activeSection, setActiveSection] = useState("medications"); // "medications" | "orders" | "request"
  const [orderType, setOrderType] = useState("Home Delivery"); // "Home Delivery" | "Counter Pickup"
  const [orderSuccess, setOrderSuccess] = useState("");

  const activeRx = useMemo(() => {
    return (prescriptions || []).filter((p) => p.status === "Active");
  }, [prescriptions]);

  // List of all active medicine names
  const allActiveMedicines = useMemo(() => {
    return activeRx.flatMap((rx) => rx.medicines || []);
  }, [activeRx]);

  function handleCreateOrder(e) {
    e.preventDefault();
    if (allActiveMedicines.length === 0) {
      alert("No active prescribed medicines to order.");
      return;
    }

    const items = allActiveMedicines.map((m) => `${m.name} (${m.dosage})`);
    const newOrder = placeOrder({
      type: orderType,
      items,
      notes:
        orderType === "Home Delivery"
          ? `Deliver to: ${patient.address || "Registered Address"}`
          : "Counter pickup at Block A Ground Floor.",
    });

    setOrderSuccess(
      `Order ${newOrder.id} successfully placed! Estimated ${
        orderType === "Home Delivery" ? "delivery" : "pickup"
      }: ${formatDisplayDate(newOrder.estimatedDate)}.`
    );
    setActiveSection("orders");
    setTimeout(() => setOrderSuccess(""), 5000);
  }

  // Calculate dynamic pickup date for a prescription
  function getDynamicPickupDate(rxDate) {
    if (!rxDate) return formatDisplayDate(new Date().toISOString().slice(0, 10));
    const d = new Date(rxDate);
    if (isNaN(d.getTime())) return formatDisplayDate(new Date().toISOString().slice(0, 10));
    // Ready within 1 day of prescription issue
    d.setDate(d.getDate() + 1);
    return formatDisplayDate(d.toISOString().slice(0, 10));
  }

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: "clamp(22px,3vw,28px)", marginBottom: 6 }}>Pharmacy & Medications</h1>
          <p className="muted">
            Manage your prescribed medications, order refills, or track home delivery.
          </p>
        </div>

        <div className="flex gap-8">
          <button
            onClick={() => setActiveSection("medications")}
            className={`btn btn-sm ${activeSection === "medications" ? "btn-primary" : "btn-outline"}`}
          >
            Active Medications ({allActiveMedicines.length})
          </button>
          <button
            onClick={() => setActiveSection("orders")}
            className={`btn btn-sm ${activeSection === "orders" ? "btn-primary" : "btn-outline"}`}
          >
            Orders & Tracking ({orders.length})
          </button>
          <button
            onClick={() => setActiveSection("request")}
            className={`btn btn-sm ${activeSection === "request" ? "btn-primary" : "btn-outline"}`}
          >
            <Icon name="plus" size={14} /> Order Refill
          </button>
        </div>
      </div>

      {orderSuccess && (
        <div
          className="fade-up"
          style={{
            padding: "12px 16px",
            borderRadius: 10,
            background: "var(--green-50)",
            color: "var(--green-800)",
            border: "1px solid var(--green-200)",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon name="checkCircle" size={18} style={{ color: "var(--green-600)" }} />
          <span>{orderSuccess}</span>
        </div>
      )}

      {/* Patient ID Banner for Hospital Pharmacy Pickup */}
      <div
        className="card card-pad flex items-center justify-between gap-16"
        style={{ marginBottom: 24, background: "var(--navy-900)", border: "none" }}
      >
        <div className="flex items-center gap-16">
          <Icon name="crossMed" size={28} style={{ color: "var(--teal-300)", flexShrink: 0 }} />
          <div>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
              Hospital Counter Pickup Card
            </p>
            <p className="muted" style={{ color: "var(--ink-200)", fontSize: 13, marginTop: 2 }}>
              Present this verified patient identifier at Hospital Pharmacy (Block A, Ground Floor).
            </p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p className="muted" style={{ color: "var(--teal-200)", fontSize: 11, letterSpacing: "0.5px" }}>
            PATIENT ID
          </p>
          <p className="font-mono" style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>
            {patient.patientId}
          </p>
        </div>
      </div>

      {/* SECTION 1: Active Medications */}
      {activeSection === "medications" && (
        <div className="fade-up">
          <div className="flex items-center justify-between" style={{ marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
            <h3 style={{ fontSize: 16 }}>Current Prescriptions & Dosage</h3>
            <div className="flex gap-8">
              {["Weekly", "Monthly"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setPlanTab(t)}
                  className={`btn btn-sm ${planTab === t ? "btn-primary" : "btn-outline"}`}
                >
                  {t} Schedule
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-2">
            {activeRx.flatMap((rx) =>
              (rx.medicines || []).map((m, i) => {
                const dailyDose = m.frequency && m.frequency.includes("2") ? 2 : 1;
                const totalDays = planTab === "Weekly" ? 7 : 30;
                const tablets = dailyDose * totalDays;
                const dynamicPickup = getDynamicPickupDate(rx.date);

                return (
                  <div key={`${rx.id}-${i}`} className="card card-pad">
                    <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                      <p style={{ fontWeight: 700, fontSize: 15 }}>{m.name}</p>
                      <span className="badge badge-teal">{m.dosage}</span>
                    </div>

                    <p className="muted" style={{ fontSize: 13.5, marginBottom: 14 }}>
                      {m.frequency} · {m.instructions}
                    </p>

                    <div className="grid grid-2" style={{ gap: 12, marginBottom: 14 }}>
                      <MiniStat label={`${planTab} Supply`} value={`${tablets} units`} />
                      <MiniStat
                        label="Pickup Available"
                        value={dynamicPickup}
                        subtitle="Hospital Counter"
                      />
                    </div>

                    <div
                      style={{
                        paddingTop: 12,
                        borderTop: "1px solid var(--navy-50)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span className="muted font-mono" style={{ fontSize: 12 }}>
                        Rx: {rx.id}
                      </span>
                      <span className="badge badge-green" style={{ fontSize: 11 }}>
                        Ready
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {activeRx.length === 0 && (
            <div className="card card-pad center" style={{ padding: 60 }}>
              <Icon name="pill" size={28} style={{ color: "var(--ink-400)", marginBottom: 12 }} />
              <h3 style={{ fontSize: 17, marginBottom: 6 }}>No active medications</h3>
              <p className="muted" style={{ fontSize: 13.5 }}>
                You currently have no active prescriptions on file.
              </p>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: Orders & Tracking */}
      {activeSection === "orders" && (
        <div className="fade-up">
          <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: 16 }}>Pharmacy Orders & Delivery Tracking</h3>
            <button
              onClick={() => setActiveSection("request")}
              className="btn btn-primary btn-sm"
            >
              <Icon name="plus" size={14} /> Place New Order
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="card card-pad center" style={{ padding: 50 }}>
              <Icon name="building" size={26} style={{ color: "var(--ink-400)", marginBottom: 10 }} />
              <p className="muted">No past pharmacy orders.</p>
            </div>
          ) : (
            <div className="grid" style={{ gap: 14 }}>
              {orders.map((ord) => (
                <div key={ord.id} className="card card-pad">
                  <div className="flex items-center justify-between" style={{ marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div className="flex items-center gap-10">
                        <span className="font-mono" style={{ fontWeight: 700, fontSize: 15 }}>
                          {ord.id}
                        </span>
                        <span className={`badge ${ord.type === "Home Delivery" ? "badge-navy" : "badge-teal"}`}>
                          {ord.type}
                        </span>
                      </div>
                      <p className="muted" style={{ fontSize: 12.5, marginTop: 4 }}>
                        Ordered on {formatDisplayDate(ord.orderDate)}
                      </p>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <span className="badge badge-green">{ord.status}</span>
                      <p style={{ fontSize: 12.5, fontWeight: 600, color: "var(--navy-800)", marginTop: 4 }}>
                        Estimated: {formatDisplayDate(ord.estimatedDate)}
                      </p>
                    </div>
                  </div>

                  {ord.items && ord.items.length > 0 && (
                    <div style={{ marginBottom: 10 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-600)", marginBottom: 6 }}>
                        MEDICATIONS:
                      </p>
                      <div className="flex gap-8" style={{ flexWrap: "wrap" }}>
                        {ord.items.map((it, idx) => (
                          <span key={idx} className="badge badge-navy" style={{ fontSize: 12 }}>
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {ord.notes && (
                    <p className="muted" style={{ fontSize: 12.5, marginTop: 8 }}>
                      {ord.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: Request Refill / Delivery */}
      {activeSection === "request" && (
        <div className="card card-pad fade-up" style={{ maxWidth: 600, margin: "0 auto" }}>
          <h3 style={{ fontSize: 17, marginBottom: 6 }}>Request Prescription Delivery or Refill</h3>
          <p className="muted" style={{ fontSize: 13.5, marginBottom: 20 }}>
            Choose between free Hospital Counter Pickup or Express Home Delivery.
          </p>

          <form onSubmit={handleCreateOrder}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--ink-600)" }}>
                Fulfillment Method
              </label>
              <div className="grid grid-2" style={{ gap: 12 }}>
                {["Home Delivery", "Counter Pickup"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setOrderType(type)}
                    className="card card-pad"
                    style={{
                      textAlign: "left",
                      cursor: "pointer",
                      borderColor: orderType === type ? "var(--teal-600)" : "var(--navy-100)",
                      background: orderType === type ? "var(--teal-50)" : "#fff",
                    }}
                  >
                    <Icon
                      name={type === "Home Delivery" ? "building" : "crossMed"}
                      size={20}
                      style={{ color: "var(--teal-600)", marginBottom: 6 }}
                    />
                    <p style={{ fontWeight: 700, fontSize: 14 }}>{type}</p>
                    <p className="muted" style={{ fontSize: 12, marginTop: 2 }}>
                      {type === "Home Delivery"
                        ? "Delivery in ~2 days (to registered address)"
                        : "Ready for pickup in ~24 hours at hospital"}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {orderType === "Home Delivery" && (
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "var(--navy-50)",
                  marginBottom: 18,
                  fontSize: 13,
                }}
              >
                <p style={{ fontWeight: 600, color: "var(--navy-900)" }}>Delivery Destination:</p>
                <p className="muted" style={{ marginTop: 2 }}>
                  {patient.address || "House 21, Model Town, Ludhiana, Punjab"}
                </p>
              </div>
            )}

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--ink-600)" }}>
                Included Active Medications ({allActiveMedicines.length})
              </label>
              <div
                style={{
                  padding: "12px 14px",
                  border: "1px solid var(--navy-100)",
                  borderRadius: 10,
                  maxHeight: 140,
                  overflowY: "auto",
                }}
              >
                {allActiveMedicines.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between"
                    style={{
                      padding: "6px 0",
                      borderBottom: idx < allActiveMedicines.length - 1 ? "1px solid var(--navy-50)" : "none",
                    }}
                  >
                    <span style={{ fontSize: 13.5, fontWeight: 600 }}>{m.name}</span>
                    <span className="badge badge-teal">{m.dosage}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-10">
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                Confirm {orderType} Order
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("medications")}
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value, subtitle }) {
  return (
    <div>
      <p className="muted" style={{ fontSize: 11.5 }}>
        {label}
      </p>
      <p style={{ fontWeight: 600, fontSize: 14 }}>{value}</p>
      {subtitle && (
        <p className="muted" style={{ fontSize: 11, marginTop: 1 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
