import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth";

const ProtectedRoute = () => {
  const [auth] = useAuth();

  // Not logged in → redirect to login
  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → allow access
  return <Outlet />;
};

export default ProtectedRoute;
