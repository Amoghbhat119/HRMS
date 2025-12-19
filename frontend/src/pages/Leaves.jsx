import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Leaves() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({ type: "CASUAL", fromDate: "", toDate: "", reason: "" });

  useEffect(() => {
    api.get("/leaves").then((res) => setLeaves(res.data));
  }, []);

  const applyLeave = async () => {
    await api.post("/leaves", form);
    const res = await api.get("/leaves");
    setLeaves(res.data);
  };

  const updateStatus = async (id, status) => {
    await api.put(`/leaves/${id}`, { status });
    const res = await api.get("/leaves");
    setLeaves(res.data);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Leaves</h1>

      {user.role === "EMPLOYEE" && (
        <div className="bg-white p-4 shadow rounded mb-6">
          <h2 className="font-semibold mb-4">Apply Leave</h2>
          <div className="grid grid-cols-4 gap-4">
            <select className="border p-2" onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option>CASUAL</option>
              <option>SICK</option>
              <option>EARNED</option>
            </select>
            <input type="date" className="border p-2" onChange={(e) => setForm({ ...form, fromDate: e.target.value })} />
            <input type="date" className="border p-2" onChange={(e) => setForm({ ...form, toDate: e.target.value })} />
            <button onClick={applyLeave} className="bg-blue-600 text-white rounded">
              Submit
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {user.role !== "EMPLOYEE" && <th className="p-3 border">Employee</th>}
              <th className="p-3 border">Dates</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Status</th>
              {user.role !== "EMPLOYEE" && <th className="p-3 border">Action</th>}
            </tr>
          </thead>
          <tbody>
            {leaves.map((l) => (
              <tr key={l._id}>
                {user.role !== "EMPLOYEE" && <td className="p-3 border">{l.employee?.name}</td>}
                <td className="p-3 border">
                  {new Date(l.fromDate).toLocaleDateString()} - {new Date(l.toDate).toLocaleDateString()}
                </td>
                <td className="p-3 border">{l.type}</td>
                <td className="p-3 border">{l.status}</td>
                {user.role !== "EMPLOYEE" && (
                  <td className="p-3 border space-x-2">
                    <button onClick={() => updateStatus(l._id, "APPROVED")} className="text-green-600">Approve</button>
                    <button onClick={() => updateStatus(l._id, "REJECTED")} className="text-red-600">Reject</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
