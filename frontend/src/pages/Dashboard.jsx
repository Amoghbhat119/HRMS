import { useAuth } from "../context/AuthContext";
import AdminDashboard from "./dashboard/AdminDashboard";
import ManagerDashboard from "./dashboard/ManagerDashboard";
import EmployeeDashboard from "./dashboard/EmployeeDashboard";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === "ADMIN") return <AdminDashboard />;
  if (user.role === "MANAGER") return <ManagerDashboard />;
  return <EmployeeDashboard />;
}
