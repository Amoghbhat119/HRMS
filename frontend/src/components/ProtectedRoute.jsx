import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ roles, children }) {
  const { token, user } = useAuth();

  if (!token) return <Navigate to="/" />;
  if (roles && !roles.includes(user?.role)) return <Navigate to="/dashboard" />;

  return children;
}
