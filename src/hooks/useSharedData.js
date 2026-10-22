import { useMemo, useCallback } from "react";
import useLocalStorage from "./useLocalStorage";
import useAuth from "./useAuth";
import {
  demoPatient,
  getInitialAppointments,
  getInitialPrescriptions,
  getInitialNotifications,
  formatDisplayDate,
  doctors,
} from "../data/mockData";

export { formatDisplayDate };

// 1. Patient Profile Hook
export function usePatientProfile() {
  const [profile, setProfile] = useLocalStorage("mv_patient_profile", demoPatient);
  const { session, setSession } = useAuth();

  const updateProfile = useCallback(
    (updates) => {
      setProfile((prev) => {
        const next = {
          ...prev,
          ...updates,
          firstName: updates.name ? updates.name.trim().split(" ")[0] : prev.firstName,
        };
        // keep auth session in sync if current user is this patient
        if (session?.role === "patient" && typeof setSession === "function") {
          setSession((s) => (s ? { ...s, name: next.name } : s));
        }
        return next;
      });
    },
    [setProfile, session, setSession]
  );

  return { patient: profile, updateProfile };
}

// 2. Notifications Hook (Feature 4)
export function useNotifications(patientIdOverride) {
  const { session } = useAuth();
  const currentPatientId =
    patientIdOverride || (session?.role === "patient" ? session.id : demoPatient.patientId);

  const [allNotifications, setAllNotifications] = useLocalStorage(
    "mv_notifications",
    getInitialNotifications
  );

  const notifications = useMemo(() => {
    const list = Array.isArray(allNotifications) ? allNotifications : [];
    return list
      .filter((n) => !n.patientId || n.patientId === currentPatientId)
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  }, [allNotifications, currentPatientId]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const addNotification = useCallback(
    ({ patientId, title, message, type = "general", icon = "bell", meta = {} }) => {
      const pid = patientId || currentPatientId;
      const newNotif = {
        id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        patientId: pid,
        title,
        message,
        text: message,
        type,
        icon,
        timestamp: Date.now(),
        time: "Just now",
        read: false,
        meta,
      };
      setAllNotifications((prev) => [newNotif, ...(Array.isArray(prev) ? prev : [])]);
      return newNotif;
    },
    [currentPatientId, setAllNotifications]
  );

  const markAsRead = useCallback(
    (id) => {
      setAllNotifications((prev) =>
        (Array.isArray(prev) ? prev : []).map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      );
    },
    [setAllNotifications]
  );

  const markAllAsRead = useCallback(() => {
    setAllNotifications((prev) =>
      (Array.isArray(prev) ? prev : []).map((n) =>
        !n.patientId || n.patientId === currentPatientId ? { ...n, read: true } : n
      )
    );
  }, [currentPatientId, setAllNotifications]);

  const dismissNotification = useCallback(
    (id) => {
      setAllNotifications((prev) =>
        (Array.isArray(prev) ? prev : []).filter((n) => n.id !== id)
      );
    },
    [setAllNotifications]
  );

  return {
    notifications,
    allNotifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    dismissNotification,
  };
}

// 3. Appointments Hook (Feature 1, 2, 8)
export function useAppointments(patientIdOverride) {
  const { session } = useAuth();
  const currentPatientId =
    patientIdOverride || (session?.role === "patient" ? session.id : demoPatient.patientId);

  const [allAppointments, setAllAppointments] = useLocalStorage(
    "mv_appointments",
    getInitialAppointments
  );

  const { addNotification } = useNotifications(currentPatientId);

  const appointments = useMemo(() => {
    const list = Array.isArray(allAppointments) ? allAppointments : [];
    return list.filter((a) => !a.patientId || a.patientId === currentPatientId);
  }, [allAppointments, currentPatientId]);

  const bookAppointment = useCallback(
    (apptData) => {
      const doc = doctors.find((d) => d.id === apptData.doctorId);
      const appointmentId =
        apptData.id || `AP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

      const newAppt = {
        id: appointmentId,
        patientId: apptData.patientId || currentPatientId,
        doctorId: apptData.doctorId,
        date: apptData.date,
        time: apptData.time,
        type: apptData.type || "In-person",
        status: "Upcoming",
        room: apptData.room || doc?.location || "Room 214, Block A",
        notes: apptData.notes || `Consultation with ${doc?.name || "doctor"}`,
        createdAt: new Date().toISOString(),
      };

      setAllAppointments((prev) => [newAppt, ...(Array.isArray(prev) ? prev : [])]);

      // Automatically generate notification (Feature 4)
      const formattedDate = formatDisplayDate(newAppt.date);
      addNotification({
        patientId: newAppt.patientId,
        title: "Appointment Confirmed",
        message: `Your appointment with ${doc?.name || "Doctor"} on ${formattedDate} at ${newAppt.time} has been confirmed.`,
        type: "appointment",
        icon: "calendar",
      });

      return newAppt;
    },
    [currentPatientId, setAllAppointments, addNotification]
  );

  const cancelAppointment = useCallback(
    (appointmentId) => {
      let cancelledAppt = null;
      setAllAppointments((prev) =>
        (Array.isArray(prev) ? prev : []).map((a) => {
          if (a.id === appointmentId) {
            cancelledAppt = { ...a, status: "Cancelled" };
            return cancelledAppt;
          }
          return a;
        })
      );

      if (cancelledAppt) {
        const doc = doctors.find((d) => d.id === cancelledAppt.doctorId);
        const formattedDate = formatDisplayDate(cancelledAppt.date);
        addNotification({
          patientId: cancelledAppt.patientId || currentPatientId,
          title: "Appointment Cancelled",
          message: `Your appointment with ${doc?.name || "Doctor"} on ${formattedDate} at ${cancelledAppt.time} was cancelled.`,
          type: "appointment",
          icon: "calendar",
        });
      }
    },
    [setAllAppointments, addNotification, currentPatientId]
  );

  const updateAppointmentStatus = useCallback(
    (appointmentId, status) => {
      setAllAppointments((prev) =>
        (Array.isArray(prev) ? prev : []).map((a) =>
          a.id === appointmentId ? { ...a, status } : a
        )
      );
    },
    [setAllAppointments]
  );

  return {
    appointments,
    allAppointments,
    bookAppointment,
    cancelAppointment,
    updateAppointmentStatus,
  };
}

// 4. Prescriptions Hook (Feature 1, 4, 8)
export function usePrescriptions(patientIdOverride) {
  const { session } = useAuth();
  const currentPatientId =
    patientIdOverride || (session?.role === "patient" ? session.id : demoPatient.patientId);

  const [allPrescriptions, setAllPrescriptions] = useLocalStorage(
    "mv_prescriptions",
    getInitialPrescriptions
  );

  const { addNotification } = useNotifications(currentPatientId);

  const prescriptions = useMemo(() => {
    const list = Array.isArray(allPrescriptions) ? allPrescriptions : [];
    return list.filter((p) => !p.patientId || p.patientId === currentPatientId);
  }, [allPrescriptions, currentPatientId]);

  const addPrescription = useCallback(
    (rxData) => {
      const rxId =
        rxData.id || `RX-${Math.floor(10000 + Math.random() * 90000)}`;
      const doc = doctors.find((d) => d.id === rxData.doctorId);

      const newRx = {
        id: rxId,
        patientId: rxData.patientId || currentPatientId,
        doctorId: rxData.doctorId || "doc-1",
        date: rxData.date || new Date().toISOString().slice(0, 10),
        status: rxData.status || "Active",
        followUp: rxData.followUp || "",
        medicines: rxData.medicines || [],
        instructions: rxData.instructions || "",
        appointmentId: rxData.appointmentId || "",
        createdAt: new Date().toISOString(),
      };

      setAllPrescriptions((prev) => [newRx, ...(Array.isArray(prev) ? prev : [])]);

      // Automatically generate notification (Feature 4)
      const count = newRx.medicines.length;
      addNotification({
        patientId: newRx.patientId,
        title: "New Prescription Issued",
        message: `${doc?.name || "Doctor"} issued prescription ${rxId} with ${count} medicine${count === 1 ? "" : "s"}.`,
        type: "prescription",
        icon: "pill",
      });

      return newRx;
    },
    [currentPatientId, setAllPrescriptions, addNotification]
  );

  return {
    prescriptions,
    allPrescriptions,
    addPrescription,
  };
}

// 5. Pharmacy Orders Hook (Feature 5)
export function usePharmacyOrders(patientIdOverride) {
  const { session } = useAuth();
  const currentPatientId =
    patientIdOverride || (session?.role === "patient" ? session.id : demoPatient.patientId);

  const [allOrders, setAllOrders] = useLocalStorage("mv_pharmacy_orders", () => [
    {
      id: "ORD-928104",
      patientId: demoPatient.patientId,
      orderDate: new Date(Date.now() - 3 * 86400000).toISOString().slice(0, 10),
      estimatedDate: new Date(Date.now() - 1 * 86400000).toISOString().slice(0, 10),
      type: "Counter Pickup",
      status: "Ready for Pickup",
      items: ["Metformin 500mg (60 tabs)", "Atorvastatin 10mg (30 tabs)"],
      notes: "Pick up at Hospital Counter, Block A Ground Floor.",
    },
  ]);

  const { addNotification } = useNotifications(currentPatientId);

  const orders = useMemo(() => {
    const list = Array.isArray(allOrders) ? allOrders : [];
    return list.filter((o) => !o.patientId || o.patientId === currentPatientId);
  }, [allOrders, currentPatientId]);

  const placeOrder = useCallback(
    ({ type = "Counter Pickup", items = [], notes = "" }) => {
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const now = new Date();
      const est = new Date();
      if (type === "Home Delivery") {
        est.setDate(now.getDate() + 2); // 2 days demo delivery period
      } else {
        est.setDate(now.getDate() + 1); // 1 day pickup
      }

      const newOrder = {
        id: orderId,
        patientId: currentPatientId,
        orderDate: now.toISOString().slice(0, 10),
        estimatedDate: est.toISOString().slice(0, 10),
        type,
        status: type === "Home Delivery" ? "Processing" : "Ready for Pickup",
        items,
        notes,
      };

      setAllOrders((prev) => [newOrder, ...(Array.isArray(prev) ? prev : [])]);

      addNotification({
        patientId: currentPatientId,
        title: "Pharmacy Order Placed",
        message: `Your pharmacy order ${orderId} (${type}) has been placed. Estimated: ${formatDisplayDate(newOrder.estimatedDate)}.`,
        type: "prescription",
        icon: "pill",
      });

      return newOrder;
    },
    [currentPatientId, setAllOrders, addNotification]
  );

  return { orders, placeOrder };
}
