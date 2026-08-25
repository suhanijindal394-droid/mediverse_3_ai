import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Guards a group of nested routes. If nobody is logged in (or the wrong
// role is logged in) it redirects to the matching login screen.
export default function ProtectedRoute({ role, redirectTo = "/patient/login" }) {
  const { session } = useAuth();
  const location = useLocation();

  if (!session || session.role !== role) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }
  return <Outlet />;
}
