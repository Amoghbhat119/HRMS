import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Leaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    api.get("/leaves").then(res => setLeaves(res.data));
  }, []);

  return (
    <table className="w-full bg-white shadow">
      <thead>
        <tr><th>Employee</th><th>Type</th><th>Status</th></tr>
      </thead>
      <tbody>
        {leaves.map(l => (
          <tr key={l._id}>
            <td>{l.employee?.name}</td>
            <td>{l.type}</td>
            <td>{l.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
