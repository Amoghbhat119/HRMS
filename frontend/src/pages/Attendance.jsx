import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Attendance() {
  const { user } = useAuth();

  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState("PRESENT");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    if (user.role === "ADMIN") {
      loadAdminData();
    } else if (user.role === "MANAGER") {
      loadManagerData();
    } else {
      loadEmployeeData();
    }
  }, [user]);

  /* ================= ADMIN ================= */

  const loadAdminData = async () => {
    const empRes = await api.get("/employees");
    const attRes = await api.get("/attendance");
    setEmployees(empRes.data);
    setRecords(attRes.data);
  };

  const markAttendance = async (employeeId) => {
    try {
      setLoading(true);
      await api.post("/attendance/mark", { employeeId, status });
      const res = await api.get("/attendance");
      setRecords(res.data);
    } catch (err) {
      alert("Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };

  /* ================= MANAGER ================= */

  const loadManagerData = async () => {
    const res = await api.get("/attendance/team");
    setRecords(res.data);
  };

  /* ================= EMPLOYEE ================= */

  const loadEmployeeData = async () => {
    const res = await api.get(
      `/attendance/employee/${user.employeeId}`
    );
    setRecords(res.data);
  };

  const checkIn = async () => {
    await api.post("/attendance/check-in");
    loadEmployeeData();
  };

  const checkOut = async () => {
    await api.post("/attendance/check-out");
    loadEmployeeData();
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Attendance</h1>

      {/* EMPLOYEE ACTIONS */}
      {user.role === "EMPLOYEE" && (
        <div className="flex gap-4 mb-6">
          <button
            onClick={checkIn}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Check In
          </button>
          <button
            onClick={checkOut}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Check Out
          </button>
        </div>
      )}

      {/* ADMIN CONTROLS */}
      {user.role === "ADMIN" && (
        <>
          <div className="flex gap-4 mb-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="PRESENT">Present</option>
              <option value="ABSENT">Absent</option>
              <option value="LEAVE">Leave</option>
            </select>
          </div>

          <table className="w-full bg-white shadow rounded text-sm mb-8">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Employee</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e._id} className="border-t">
                  <td className="p-3">{e.name}</td>
                  <td className="p-3">
                    <button
                      disabled={loading}
                      onClick={() => markAttendance(e._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Mark
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* ATTENDANCE TABLE */}
      <table className="w-full bg-white shadow rounded text-sm">
        <thead className="bg-gray-100">
          <tr>
            {(user.role !== "EMPLOYEE") && (
              <th className="p-3">Employee</th>
            )}
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Check In</th>
            <th className="p-3">Check Out</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id} className="border-t">
              {(user.role !== "EMPLOYEE") && (
                <td className="p-3">{r.employee?.name}</td>
              )}
              <td className="p-3">
                {new Date(r.date).toLocaleDateString()}
              </td>
              <td className="p-3">{r.status}</td>
              <td className="p-3">
                {r.checkInTime
                  ? new Date(r.checkInTime).toLocaleTimeString()
                  : "-"}
              </td>
              <td className="p-3">
                {r.checkOutTime
                  ? new Date(r.checkOutTime).toLocaleTimeString()
                  : "-"}
              </td>
            </tr>
          ))}

          {records.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No attendance records
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
