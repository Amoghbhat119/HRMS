import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState("PRESENT");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/employees").then((res) => setEmployees(res.data));
  }, []);

  const checkIn = async () => {
    try {
      setLoading(true);
      const res = await api.post("/attendance/check-in");
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Check-in failed");
    } finally {
      setLoading(false);
    }
  };

  const checkOut = async () => {
    try {
      setLoading(true);
      const res = await api.post("/attendance/check-out");
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Check-out failed");
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (employeeId) => {
    try {
      await api.post("/attendance/mark", {
        employeeId,
        status,
      });
      alert("Attendance marked successfully");
    } catch (err) {
      alert("Failed to mark attendance");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Attendance</h1>

      {/* Employee Self Attendance */}
      <div className="bg-white p-5 rounded-lg shadow mb-6 flex gap-4">
        <button
          onClick={checkIn}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Check In
        </button>
        <button
          onClick={checkOut}
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          Check Out
        </button>
      </div>

      {/* Admin / Manager Manual Mark */}
      <div className="bg-white p-5 rounded-lg shadow">
        <div className="flex items-center gap-4 mb-4">
          <label className="font-medium">Status</label>
          <select
            className="border rounded px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
            <option value="LEAVE">Leave</option>
          </select>
        </div>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border text-left">Employee</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td className="p-3 border">{emp.name}</td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => markAttendance(emp._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Mark
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan="2" className="p-4 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
