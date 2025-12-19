import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Attendance() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/attendance").then(res => setData(res.data));
  }, []);

  return (
    <table className="w-full bg-white shadow">
      <thead><tr><th>Date</th><th>Employee</th><th>Status</th></tr></thead>
      <tbody>
        {data.map(a => (
          <tr key={a._id}>
            <td>{new Date(a.date).toLocaleDateString()}</td>
            <td>{a.employee?.name}</td>
            <td>{a.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
