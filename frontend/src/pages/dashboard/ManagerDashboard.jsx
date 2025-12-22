import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ManagerDashboard() {
  const [team, setTeam] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // ✅ Team employees (backend filtered)
      const teamRes = await api.get("/employees?team=true");
      setTeam(teamRes.data);

      // ✅ Team attendance (backend filtered)
      const attRes = await api.get("/attendance/team");
      setAttendance(attRes.data);
    } catch (err) {
      console.error("Manager dashboard error:", err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Manager Dashboard</h1>

      {/* ================= TEAM ================= */}
      <h2 className="font-semibold mb-3">My Team</h2>
      <table className="w-full bg-white shadow rounded mb-8">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Employee</th>
            <th className="p-3">Department</th>
            <th className="p-3">Designation</th>
          </tr>
        </thead>
        <tbody>
          {team.map((e) => (
            <tr key={e._id} className="border-t">
              <td className="p-3">{e.name}</td>
              <td className="p-3">{e.department?.name || "-"}</td>
              <td className="p-3">{e.designation || "-"}</td>
            </tr>
          ))}

          {team.length === 0 && (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-500">
                No team members assigned
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ================= ATTENDANCE ================= */}
      <h2 className="font-semibold mb-3">Team Attendance</h2>
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Employee</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((a) => (
            <tr key={a._id} className="border-t">
              <td className="p-3">{a.employee?.name}</td>
              <td className="p-3">
                {new Date(a.date).toLocaleDateString()}
              </td>
              <td className="p-3">{a.status}</td>
            </tr>
          ))}

          {attendance.length === 0 && (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-500">
                No attendance records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
