import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Employees() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/employees").then(res => setData(res.data));
  }, []);

  return (
    <div className="bg-white shadow rounded">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th>Name</th><th>Email</th><th>Role</th>
            <th>Department</th><th>Designation</th><th>Manager</th>
          </tr>
        </thead>
        <tbody>
          {data.map(e => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.user.role}</td>
              <td>{e.department}</td>
              <td>{e.designation}</td>
              <td>{e.manager?.name || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
