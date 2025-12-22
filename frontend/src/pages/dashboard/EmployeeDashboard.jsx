import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function EmployeeDashboard() {
  const { user } = useAuth();

  const [records, setRecords] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    loadEmployeeProfile();
  }, [user]);

  const loadEmployeeProfile = async () => {
    try {
      const res = await api.get("/employees");
      const emp = res.data.find(e => e.user?._id === user.id);

      if (!emp) {
        setError("Employee profile not linked. Contact admin.");
        return;
      }

      setEmployeeId(emp._id);
      fetchAttendance(emp._id);
    } catch (err) {
      setError("Failed to load employee profile");
    }
  };

  const fetchAttendance = async (empId) => {
    try {
      const res = await api.get(`/attendance/employee/${empId}`);
      setRecords(res.data);
    } catch (err) {
      setError("Unable to fetch attendance");
    }
  };

  const checkIn = async () => {
    try {
      setLoading(true);
      await api.post("/attendance/check-in");
      await fetchAttendance(employeeId);
      alert("Checked in successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Check-in failed");
    } finally {
      setLoading(false);
    }
  };

  const checkOut = async () => {
    try {
      setLoading(true);
      await api.post("/attendance/check-out");
      await fetchAttendance(employeeId);
      alert("Checked out successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Check-out failed");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Dashboard</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={checkIn}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Check In
        </button>

        <button
          onClick={checkOut}
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Check Out
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-3">My Attendance</h2>

      <table className="w-full bg-white shadow rounded text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Check In</th>
            <th className="p-3">Check Out</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id} className="border-t">
              <td className="p-3">{new Date(r.date).toLocaleDateString()}</td>
              <td className="p-3">{r.status}</td>
              <td className="p-3">
                {r.checkInTime ? new Date(r.checkInTime).toLocaleTimeString() : "-"}
              </td>
              <td className="p-3">
                {r.checkOutTime ? new Date(r.checkOutTime).toLocaleTimeString() : "-"}
              </td>
            </tr>
          ))}

          {records.length === 0 && (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No attendance records
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
