import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Attendance() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("/attendance").then((res) => setRecords(res.data));
  }, []);

  const markAttendance = async (status) => {
    await api.post("/attendance", { status });
    const res = await api.get("/attendance");
    setRecords(res.data);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        {user.role === "EMPLOYEE" ? "My Attendance" : "Attendance"}
      </h1>

      {user.role === "EMPLOYEE" && (
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => markAttendance("PRESENT")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Mark Present
          </button>
        </div>
      )}

      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Date</th>
              {user.role !== "EMPLOYEE" && <th className="p-3 border">Employee</th>}
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Check In</th>
              <th className="p-3 border">Check Out</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r._id}>
                <td className="p-3 border">{new Date(r.date).toLocaleDateString()}</td>
                {user.role !== "EMPLOYEE" && (
                  <td className="p-3 border">{r.employee?.name}</td>
                )}
                <td className="p-3 border">{r.status}</td>
                <td className="p-3 border">{r.checkIn || "-"}</td>
                <td className="p-3 border">{r.checkOut || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
