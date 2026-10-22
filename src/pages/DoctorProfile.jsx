import { useState, useMemo } from "react";
import { useParams, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import Icon from "../components/Icon";
import { doctors, timeSlots, getUnavailableSlots, formatDisplayDate } from "../data/mockData";
import useAuth from "../hooks/useAuth";
import { useAppointments } from "../hooks/useSharedData";

export default function DoctorProfile() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useAuth();
  const { appointments, bookAppointment } = useAppointments();

  const [activeDay, setActiveDay] = useState(0); // 0 = Today, 1 = Tomorrow
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [bookedAppointment, setBookedAppointment] = useState(null);

  const doc = doctors.find((d) => d.id === doctorId);

  // Dynamic Today and Tomorrow dates
  const today = useMemo(() => new Date(), []);
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  }, []);

  const currentDayObj = activeDay === 0 ? today : tomorrow;
  const currentDateStr = currentDayObj.toISOString().slice(0, 10);
  const currentWeekday = currentDayObj.toLocaleDateString("en-US", { weekday: "short" });
  const isDoctorScheduledToday = doc ? doc.availableDays.includes(currentWeekday) : false;

  // Deterministic doctor-level unavailable slots
  const unavailableBase = useMemo(() => (doc ? getUnavailableSlots(doc.id) : []), [doc]);

  // Already booked appointments for this doctor on this day
  const bookedSlotsOnDate = useMemo(() => {
    if (!doc) return [];
    return (appointments || [])
      .filter(
        (a) =>
          a.doctorId === doc.id &&
          a.date === currentDateStr &&
          a.status !== "Cancelled"
      )
      .map((a) => a.time);
  }, [appointments, doc, currentDateStr]);

  if (!doc) return <Navigate to="/specialists" replace />;

  const initials = doc.name.replace("Dr. ", "").split(" ").map((n) => n[0]).join("");

  function handleTabChange(tabIndex) {
    setActiveDay(tabIndex);
    setSelectedSlot(null);
    setErrorMsg("");
  }

  function handleSlotClick(slot) {
    setSelectedSlot(slot);
    setErrorMsg("");
  }

  function handleBook() {
    if (!selectedSlot) {
      setErrorMsg("Please select an available time slot before booking.");
      return;
    }

    // Check if patient is logged in
    if (!session || session.role !== "patient") {
      // Redirect to login preserving booking intent
      navigate("/patient/login", {
        state: {
          from: location.pathname,
          pendingBooking: {
            doctorId: doc.id,
            doctorName: doc.name,
            specialty: doc.specialty,
            date: currentDateStr,
            time: selectedSlot,
            type: "In-person",
          },
        },
      });
      return;
    }

    // Validate duplicate booking
    const isDuplicate = (appointments || []).some(
      (a) =>
        a.doctorId === doc.id &&
        a.date === currentDateStr &&
        a.time === selectedSlot &&
        a.status !== "Cancelled"
    );

    if (isDuplicate) {
      setErrorMsg(
        `This slot (${selectedSlot}) is already booked for Dr. ${doc.name} on ${formatDisplayDate(
          currentDateStr
        )}. Please select a different slot.`
      );
      return;
    }

    // Create booking
    const newAppt = bookAppointment({
      doctorId: doc.id,
      date: currentDateStr,
      time: selectedSlot,
      type: "In-person",
      room: doc.location || "Room 214, Block A",
      notes: `Consultation with ${doc.name} (${doc.specialty})`,
    });

    setBookedAppointment(newAppt);
    setErrorMsg("");
  }

  const todayLabel = `Today · ${today.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })}`;

  const tomorrowLabel = `Tomorrow · ${tomorrow.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })}`;

  return (
    <section className="section">
      <div className="wrap">
        <Link to="/specialists" className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }}>
          <Icon name="chevronLeft" size={16} /> Back to Specialists
        </Link>

        <div className="grid" style={{ gridTemplateColumns: "340px 1fr", gap: 32 }}>
          {/* ---------- Left: profile summary ---------- */}
          <div>
            <div className="card card-pad center" style={{ marginBottom: 20 }}>
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  margin: "0 auto 16px",
                  background: "linear-gradient(135deg,var(--navy-800),var(--navy-600))",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 28,
                  fontFamily: "var(--font-display)",
                }}
              >
                {initials}
              </div>
              <div className="flex items-center gap-8" style={{ justifyContent: "center" }}>
                <h2 style={{ fontSize: 19 }}>{doc.name}</h2>
                {doc.verified && <Icon name="checkCircle" size={16} style={{ color: "var(--teal-600)" }} />}
              </div>
              <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>
                {doc.specialty} · {doc.department}
              </p>
              <div className="flex gap-8" style={{ justifyContent: "center", marginTop: 12, flexWrap: "wrap" }}>
                <span className="badge badge-teal">★ {doc.rating}</span>
                <span className="badge badge-navy">{doc.experience}+ yrs exp</span>
              </div>

              <button
                onClick={() => {
                  const elem = document.getElementById("availability-section");
                  if (elem) elem.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn btn-primary btn-block"
                style={{ marginTop: 20 }}
              >
                Book Appointment
              </button>
            </div>

            <div className="card card-pad">
              <InfoRow icon="file" label="Qualifications" value={doc.qualifications} />
              <InfoRow icon="grid" label="Consultation Fee" value={`₹${doc.fee}`} />
              <InfoRow icon="globe" label="Languages" value={doc.languages.join(", ")} />
              <InfoRow icon="mapPin" label="Location" value={doc.location} />
              <InfoRow icon="calendar" label="Available Days" value={doc.availableDays.join(", ")} last />
            </div>
          </div>

          {/* ---------- Right: about + availability ---------- */}
          <div>
            <div className="card card-pad" style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 17, marginBottom: 10 }}>About {doc.name}</h3>
              <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.7 }}>
                {doc.about}
              </p>
              <h4 style={{ fontSize: 14, marginTop: 18, marginBottom: 10 }}>Areas of Expertise</h4>
              <div className="flex gap-8" style={{ flexWrap: "wrap" }}>
                {doc.expertise.map((e) => (
                  <span key={e} className="badge badge-navy">
                    {e}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability card with Today and Tomorrow tabs */}
            <div id="availability-section" className="card card-pad">
              <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontSize: 17 }}>Doctor Availability</h3>
                  <p className="muted" style={{ fontSize: 13, marginTop: 2 }}>
                    Select a date and interactive time slot to book an appointment.
                  </p>
                </div>
              </div>

              {/* Today / Tomorrow tabs */}
              <div className="flex gap-10" style={{ marginBottom: 20 }}>
                <button
                  type="button"
                  onClick={() => handleTabChange(0)}
                  className={`btn btn-sm ${activeDay === 0 ? "btn-primary" : "btn-outline"}`}
                  style={{ flex: 1, padding: "10px 14px", fontWeight: 600 }}
                >
                  <Icon name="calendar" size={15} /> {todayLabel}
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange(1)}
                  className={`btn btn-sm ${activeDay === 1 ? "btn-primary" : "btn-outline"}`}
                  style={{ flex: 1, padding: "10px 14px", fontWeight: 600 }}
                >
                  <Icon name="calendar" size={15} /> {tomorrowLabel}
                </button>
              </div>

              {/* Day status notice if doctor not available on this weekday */}
              {!isDoctorScheduledToday ? (
                <div
                  style={{
                    padding: "16px 18px",
                    borderRadius: 10,
                    background: "var(--amber-100)",
                    color: "var(--amber-700)",
                    marginBottom: 20,
                    fontSize: 13.5,
                  }}
                >
                  <p style={{ fontWeight: 600, marginBottom: 4 }}>
                    Dr. {doc.name} is not scheduled for clinic consultations on {currentWeekday}.
                  </p>
                  <p style={{ fontSize: 13 }}>
                    Available days: <strong>{doc.availableDays.join(", ")}</strong>. You can switch tabs or choose an alternate day.
                  </p>
                </div>
              ) : null}

              {/* Slot selection grid */}
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: "var(--ink-600)" }}>
                  Available Time Slots ({formatDisplayDate(currentDateStr)}):
                </p>
                <div className="grid grid-4" style={{ gap: 10 }}>
                  {timeSlots.map((slot) => {
                    const isDoctorOff = !isDoctorScheduledToday;
                    const isBaseUnavailable = unavailableBase.includes(slot);
                    const isAlreadyBooked = bookedSlotsOnDate.includes(slot);
                    const disabled = isDoctorOff || isBaseUnavailable || isAlreadyBooked;
                    const isSelected = selectedSlot === slot;

                    let titleText = "Available";
                    if (isDoctorOff) titleText = "Doctor not available on this day";
                    else if (isAlreadyBooked) titleText = "Already booked";
                    else if (isBaseUnavailable) titleText = "Slot unavailable";

                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={disabled}
                        title={titleText}
                        onClick={() => handleSlotClick(slot)}
                        className={`btn btn-sm ${
                          isSelected
                            ? "btn-primary"
                            : disabled
                            ? "btn-ghost"
                            : "btn-outline"
                        }`}
                        style={{
                          padding: "10px 8px",
                          fontWeight: isSelected ? 700 : 500,
                          position: "relative",
                          opacity: disabled ? 0.4 : 1,
                          textDecoration: disabled ? "line-through" : "none",
                          cursor: disabled ? "not-allowed" : "pointer",
                          borderColor: isSelected ? "var(--teal-600)" : undefined,
                        }}
                      >
                        {slot}
                        {isSelected && (
                          <span style={{ marginLeft: 4, display: "inline-flex" }}>
                            <Icon name="check" size={13} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected slot banner */}
              {selectedSlot && (
                <div
                  className="flex items-center justify-between"
                  style={{
                    padding: "12px 16px",
                    background: "var(--teal-50)",
                    borderRadius: 10,
                    border: "1px solid var(--teal-200)",
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <p style={{ fontSize: 13.5, fontWeight: 700, color: "var(--teal-700)" }}>
                      Selected: {selectedSlot} on {formatDisplayDate(currentDateStr)}
                    </p>
                    <p className="muted" style={{ fontSize: 12 }}>
                      Consultation Fee: ₹{doc.fee} · {doc.location}
                    </p>
                  </div>
                  <span className="badge badge-teal">Ready to book</span>
                </div>
              )}

              {/* Error message banner */}
              {errorMsg && (
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: 10,
                    background: "#FEE2E2",
                    color: "#991B1B",
                    fontSize: 13.5,
                    marginBottom: 20,
                  }}
                >
                  <div className="flex items-center gap-8">
                    <Icon name="alert" size={16} />
                    <span>{errorMsg}</span>
                  </div>
                </div>
              )}

              {/* Booking success modal / banner */}
              {bookedAppointment && (
                <div
                  className="fade-up"
                  style={{
                    padding: "18px 20px",
                    borderRadius: 12,
                    background: "var(--green-50)",
                    border: "1px solid var(--green-200)",
                    marginBottom: 20,
                  }}
                >
                  <div className="flex items-center gap-12" style={{ marginBottom: 10 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "var(--green-100)",
                        color: "var(--green-600)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon name="checkCircle" size={22} />
                    </div>
                    <div>
                      <h4 style={{ color: "var(--green-800)", fontSize: 15.5 }}>
                        Appointment Successfully Booked!
                      </h4>
                      <p style={{ color: "var(--green-700)", fontSize: 13 }}>
                        ID: <span className="font-mono">{bookedAppointment.id}</span> · {formatDisplayDate(bookedAppointment.date)} at {bookedAppointment.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-8" style={{ marginTop: 14 }}>
                    <Link
                      to={`/patient/appointment-confirmation/${bookedAppointment.id}`}
                      state={bookedAppointment}
                      className="btn btn-primary btn-sm"
                    >
                      View Confirmation
                    </Link>
                    <Link to="/patient/appointments" className="btn btn-outline btn-sm">
                      My Appointments
                    </Link>
                    <Link to="/patient/dashboard" className="btn btn-ghost btn-sm">
                      Go to Dashboard
                    </Link>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              {!bookedAppointment && (
                <button
                  type="button"
                  onClick={handleBook}
                  className="btn btn-primary btn-block"
                  style={{ padding: "13px 20px", fontSize: 15 }}
                >
                  Book Appointment <Icon name="arrowRight" size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, value, last }) {
  return (
    <div
      className="flex gap-12"
      style={{
        paddingBottom: 14,
        marginBottom: 14,
        borderBottom: last ? "none" : "1px solid var(--navy-50)",
      }}
    >
      <Icon
        name={icon}
        size={17}
        style={{ color: "var(--teal-600)", flexShrink: 0, marginTop: 2 }}
      />
      <div>
        <p className="muted" style={{ fontSize: 12 }}>
          {label}
        </p>
        <p style={{ fontSize: 14, fontWeight: 500 }}>{value}</p>
      </div>
    </div>
  );
}
