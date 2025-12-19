import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Payroll() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("/payroll").then((res) => setRecords(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        {user.role === "EMPLOYEE" ? "My Payroll" : "Payroll"}
      </h1>

      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {user.role !== "EMPLOYEE" && <th className="p-3 border">Employee</th>}
              <th className="p-3 border">Month</th>
              <th className="p-3 border">Year</th>
              <th className="p-3 border">Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {records.map((p) => (
              <tr key={p._id}>
                {user.role !== "EMPLOYEE" && <td className="p-3 border">{p.employee?.name}</td>}
                <td className="p-3 border">{p.month}</td>
                <td className="p-3 border">{p.year}</td>
                <td className="p-3 border font-semibold">₹{p.netSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
