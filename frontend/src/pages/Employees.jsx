import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Employees</h1>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Department</th>
              <th className="p-3">Designation</th>
              <th className="p-3">Manager</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e._id} className="border-t">
                <td className="p-3">{e.name}</td>
                <td className="p-3">{e.user?.email}</td>
                <td className="p-3">{e.user?.role}</td>
                <td className="p-3">{e.department?.name}</td>
                <td className="p-3">{e.designation}</td>
                <td className="p-3">{e.manager?.name || "-"}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    e.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
