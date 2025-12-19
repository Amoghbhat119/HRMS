import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Payroll() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/payroll").then(res => setData(res.data));
  }, []);

  return (
    <table className="w-full bg-white shadow">
      <thead><tr><th>Employee</th><th>Month</th><th>Net Salary</th></tr></thead>
      <tbody>
        {data.map(p => (
          <tr key={p._id}>
            <td>{p.employee?.name}</td>
            <td>{p.month}</td>
            <td>₹{p.netSalary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
