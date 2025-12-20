import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CreateEmployee() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
    department: "",
    designation: "",
    manager: ""
  });

  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    api.get("/departments").then((res) => setDepartments(res.data));
    api.get("/employees/managers").then((res) => setManagers(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/employees", form);
    alert("Employee created successfully");
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-xl mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Create Employee</h2>

      <input
        className="input mb-3"
        placeholder="Name"
        required
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="input mb-3"
        placeholder="Email"
        required
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        className="input mb-3"
        placeholder="Password"
        required
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select
        className="input mb-3"
        value={form.role}
        onChange={(e) =>
          setForm({
            ...form,
            role: e.target.value,
            manager: ""
          })
        }
      >
        <option value="EMPLOYEE">EMPLOYEE</option>
        <option value="MANAGER">MANAGER</option>
      </select>

      <select
        className="input mb-3"
        required
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      >
        <option value="">Select Department</option>
        {departments.map((d) => (
          <option key={d._id} value={d._id}>
            {d.name}
          </option>
        ))}
      </select>

      <input
        className="input mb-3"
        placeholder="Designation"
        required
        onChange={(e) => setForm({ ...form, designation: e.target.value })}
      />

      {form.role === "EMPLOYEE" && (
        <select
          className="input mb-4"
          required
          onChange={(e) => setForm({ ...form, manager: e.target.value })}
        >
          <option value="">Select Manager</option>
          {managers.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name}
            </option>
          ))}
        </select>
      )}

      <button className="btn w-full">Create Employee</button>
    </form>
  );
}
