import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import Payroll from "./pages/Payroll";
import Departments from "./pages/Departments";
import CreateUser from "./pages/CreateUser";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />

          {/* Protected Layout */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />

            <Route
              path="users"
              element={
                <ProtectedRoute roles={["ADMIN"]}>
                  <CreateUser />
                </ProtectedRoute>
              }
            />

            <Route
              path="employees"
              element={
                <ProtectedRoute roles={["ADMIN"]}>
                  <Employees />
                </ProtectedRoute>
              }
            />

            <Route
              path="departments"
              element={
                <ProtectedRoute roles={["ADMIN"]}>
                  <Departments />
                </ProtectedRoute>
              }
            />

            <Route
              path="attendance"
              element={
                <ProtectedRoute roles={["ADMIN", "MANAGER", "EMPLOYEE"]}>
                  <Attendance />
                </ProtectedRoute>
              }
            />

            <Route
              path="leaves"
              element={
                <ProtectedRoute roles={["ADMIN", "MANAGER", "EMPLOYEE"]}>
                  <Leaves />
                </ProtectedRoute>
              }
            />

            <Route
              path="payroll"
              element={
                <ProtectedRoute roles={["ADMIN"]}>
                  <Payroll />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
