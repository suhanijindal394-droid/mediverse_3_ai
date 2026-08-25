import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

import Landing from "./pages/Landing";
import Specialists from "./pages/Specialists";
import DoctorProfile from "./pages/DoctorProfile";
import Departments from "./pages/Departments";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HowItWorks from "./pages/HowItWorks";

import PatientLogin from "./pages/PatientLogin";
import PatientRegister from "./pages/PatientRegister";
import PatientLayout from "./components/PatientLayout";
import PatientDashboard from "./pages/PatientDashboard";
import AISpecialistFinder from "./pages/AISpecialistFinder";
import BookAppointment from "./pages/BookAppointment";
import AppointmentConfirmation from "./pages/AppointmentConfirmation";
import MyAppointments from "./pages/MyAppointments";
import MyPrescriptions from "./pages/MyPrescriptions";
import PrescriptionDetail from "./pages/PrescriptionDetail";
import MyReports from "./pages/MyReports";
import ReportViewer from "./pages/ReportViewer";
import MedicalHistory from "./pages/MedicalHistory";
import PatientPharmacy from "./pages/PatientPharmacy";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

import DoctorLogin from "./pages/DoctorLogin";
import DoctorLayout from "./components/DoctorLayout";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorPatients from "./pages/DoctorPatients";
import DoctorPatientRecord from "./pages/DoctorPatientRecord";
import PrescriptionNew from "./pages/PrescriptionNew";

import PharmacyLogin from "./pages/PharmacyLogin";
import PharmacyDashboard from "./pages/PharmacyDashboard";

import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDoctors from "./pages/AdminDoctors";
import AdminPatients from "./pages/AdminPatients";
import AdminAppointments from "./pages/AdminAppointments";
import AdminPharmacy from "./pages/AdminPharmacy";
import AdminAnalytics from "./pages/AdminAnalytics";

export default function App() {
  return (
    <Routes>
      {/* ---------- Public marketing site ---------- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/specialists" element={<Specialists />} />
        <Route path="/specialists/:doctorId" element={<DoctorProfile />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ---------- Auth ---------- */}
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/register" element={<PatientRegister />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/pharmacy/login" element={<PharmacyLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Route>

      {/* ---------- Patient portal (protected) ---------- */}
      <Route path="/patient" element={<ProtectedRoute role="patient" />}>
        <Route element={<PatientLayout />}>
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="ai-specialist" element={<AISpecialistFinder />} />
          <Route path="book-appointment/:doctorId" element={<BookAppointment />} />
          <Route path="appointment-confirmation/:id" element={<AppointmentConfirmation />} />
          <Route path="appointments" element={<MyAppointments />} />
          <Route path="prescriptions" element={<MyPrescriptions />} />
          <Route path="prescriptions/:id" element={<PrescriptionDetail />} />
          <Route path="reports" element={<MyReports />} />
          <Route path="reports/:id" element={<ReportViewer />} />
          <Route path="medical-history" element={<MedicalHistory />} />
          <Route path="pharmacy" element={<PatientPharmacy />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* ---------- Doctor portal (protected) ---------- */}
      <Route path="/doctor" element={<ProtectedRoute role="doctor" redirectTo="/doctor/login" />}>
        <Route element={<DoctorLayout />}>
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="patients" element={<DoctorPatients />} />
          <Route path="patient/:patientId" element={<DoctorPatientRecord />} />
          <Route path="prescription/new" element={<PrescriptionNew />} />
        </Route>
      </Route>

      {/* ---------- Pharmacy portal (protected) ---------- */}
      <Route path="/pharmacy" element={<ProtectedRoute role="pharmacist" redirectTo="/pharmacy/login" />}>
        <Route path="dashboard" element={<PharmacyDashboard />} />
      </Route>

      {/* ---------- Admin portal (protected) ---------- */}
      <Route path="/admin" element={<ProtectedRoute role="admin" redirectTo="/admin/login" />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="patients" element={<AdminPatients />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="pharmacy" element={<AdminPharmacy />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>
      </Route>

      {/* ---------- 404 ---------- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
