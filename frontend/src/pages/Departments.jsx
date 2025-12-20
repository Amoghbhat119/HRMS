import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const res = await api.get("/departments");
    setDepartments(res.data);
  };

  const addDepartment = async () => {
    if (!name.trim()) return;
    await api.post("/departments", { name });
    setName("");
    fetchDepartments();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Departments</h1>

      <div className="flex gap-3 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Department name"
          className="border p-2 rounded w-64"
        />
        <button
          onClick={addDepartment}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="bg-white shadow rounded">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Department</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d, i) => (
              <tr key={d._id} className="border-t">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{d.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
