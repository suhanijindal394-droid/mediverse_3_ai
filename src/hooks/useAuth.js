import useLocalStorage from "./useLocalStorage";
import { demoPatient } from "../data/mockData";

// Custom hook — very small mock auth layer built on localStorage.
// role: "patient" | "doctor" | "pharmacist" | "receptionist" | "admin" | null
export default function useAuth() {
  const [session, setSession] = useLocalStorage("mv_session", null);

  function loginAsPatient() {
    let name = demoPatient.name;
    let id = demoPatient.patientId;
    try {
      const saved = window.localStorage.getItem("mv_patient_profile");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) name = parsed.name;
        if (parsed.patientId) id = parsed.patientId;
      }
    } catch (e) {
      console.warn("useAuth read error:", e);
    }
    setSession({ role: "patient", id, name });
  }
  function loginAsDoctor(doctorId, name) {
    setSession({ role: "doctor", id: doctorId, name });
  }
  function loginAsRole(role, name) {
    setSession({ role, id: role, name });
  }
  function logout() {
    setSession(null);
  }

  return { session, setSession, loginAsPatient, loginAsDoctor, loginAsRole, logout };
}
