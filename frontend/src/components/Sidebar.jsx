import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  const linkClass =
    "block px-4 py-2 rounded hover:bg-gray-700 transition";

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 min-h-screen">
      <div className="p-5 text-xl font-bold border-b border-gray-700">
        HRMS
      </div>

      <nav className="p-4 space-y-2 text-sm">
        <NavLink className={linkClass} to="/dashboard">Dashboard</NavLink>

        {user?.role === "ADMIN" && (
          <>
            <NavLink className={linkClass} to="/users">Create Users</NavLink>
            <NavLink className={linkClass} to="/employees">Employees</NavLink>
            <NavLink className={linkClass} to="/departments">Departments</NavLink>
            <NavLink className={linkClass} to="/attendance">Attendance</NavLink>
            <NavLink className={linkClass} to="/leaves">Leaves</NavLink>
            <NavLink className={linkClass} to="/payroll">Payroll</NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}
