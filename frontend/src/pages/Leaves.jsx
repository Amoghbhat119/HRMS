import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Leaves = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const fetchLeaves = async () => {
    const res = await api.get("/leave");
    setLeaves(res.data);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  /* ================= APPLY LEAVE (EMPLOYEE ONLY) ================= */
  const applyLeave = async () => {
    if (!form.fromDate || !form.toDate) {
      alert("Please select dates");
      return;
    }

    try {
      await api.post("/leave/apply", form);
      alert("Leave applied successfully");
      setForm({ fromDate: "", toDate: "", reason: "" });
      fetchLeaves();
    } catch (err) {
      alert(err.response?.data?.message || "Leave application failed");
    }
  };

  /* ================= APPROVE / REJECT ================= */
  const approveLeave = async (id) => {
    await api.post(`/leave/approve/${id}`);
    fetchLeaves();
  };

  const rejectLeave = async (id) => {
    await api.post(`/leave/reject/${id}`);
    fetchLeaves();
  };

  if (!user) {
    return <div className="p-6 text-gray-500">Loading leave data...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Leave Management</h1>

      {/* ================= APPLY LEAVE (EMPLOYEE ONLY) ================= */}
      {user.role === "EMPLOYEE" && (
        <div className="bg-white p-5 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={form.fromDate}
            onChange={(e) =>
              setForm({ ...form, fromDate: e.target.value })
            }
          />
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={form.toDate}
            onChange={(e) =>
              setForm({ ...form, toDate: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Reason"
            className="border rounded px-3 py-2"
            value={form.reason}
            onChange={(e) =>
              setForm({ ...form, reason: e.target.value })
            }
          />
          <button
            onClick={applyLeave}
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
          >
            Apply Leave
          </button>
        </div>
      )}

      {/* ================= LEAVE TABLE ================= */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Employee</th>
              <th className="p-3 border">From</th>
              <th className="p-3 border">To</th>
              <th className="p-3 border">Status</th>

              {(user.role === "ADMIN" || user.role === "MANAGER") && (
                <th className="p-3 border text-center">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td className="p-3 border">{leave.employee?.name}</td>

                <td className="p-3 border">
                  {new Date(leave.fromDate).toLocaleDateString()}
                </td>

                <td className="p-3 border">
                  {new Date(leave.toDate).toLocaleDateString()}
                </td>

                <td className="p-3 border font-semibold">
                  {leave.status}
                </td>

                {(user.role === "ADMIN" || user.role === "MANAGER") && (
                  <td className="p-3 border text-center space-x-2">
                    <button
                      disabled={leave.status !== "PENDING"}
                      onClick={() => approveLeave(leave._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-40"
                    >
                      Approve
                    </button>
                    <button
                      disabled={leave.status !== "PENDING"}
                      onClick={() => rejectLeave(leave._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded disabled:opacity-40"
                    >
                      Reject
                    </button>
                  </td>
                )}
              </tr>
            ))}

            {leaves.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No leave records
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaves;
