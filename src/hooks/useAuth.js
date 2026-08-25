import useLocalStorage from "./useLocalStorage";
import { demoPatient } from "../data/mockData";

// Custom hook — very small mock auth layer built on localStorage.
// role: "patient" | "doctor" | "pharmacist" | "receptionist" | "admin" | null
export default function useAuth() {
  const [session, setSession] = useLocalStorage("mv_session", null);

  function loginAsPatient() {
    setSession({ role: "patient", id: demoPatient.patientId, name: demoPatient.name });
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

  return { session, loginAsPatient, loginAsDoctor, loginAsRole, logout };
}
