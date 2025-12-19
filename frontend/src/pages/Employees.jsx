import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get("/employees").then((res) => setEmployees(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Employees</h1>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Department</th>
              <th className="p-3 border">Designation</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((e) => (
              <tr key={e._id} className="hover:bg-gray-50">
                <td className="p-3 border">{e.name}</td>
                <td className="p-3 border">{e.email}</td>
                <td className="p-3 border">{e.role}</td>
                <td className="p-3 border">{e.department}</td>
                <td className="p-3 border">{e.designation}</td>
                <td className="p-3 border">
                  <span className={`px-2 py-1 rounded text-sm ${
                    e.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
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
