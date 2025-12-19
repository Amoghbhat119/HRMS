import { useState } from "react";
import api from "../api/axios";

export default function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    alert("User created");
  };

  return (
    <form onSubmit={submit} className="max-w-md bg-white p-6 shadow rounded">
      <h2 className="text-xl mb-4">Create User</h2>

      <input className="input mb-3" placeholder="Name"
        onChange={e=>setForm({...form, name:e.target.value})} />

      <input className="input mb-3" placeholder="Email"
        onChange={e=>setForm({...form, email:e.target.value})} />

      <input className="input mb-3" type="password" placeholder="Password"
        onChange={e=>setForm({...form, password:e.target.value})} />

      <select className="input mb-4"
        onChange={e=>setForm({...form, role:e.target.value})}>
        <option>EMPLOYEE</option>
        <option>MANAGER</option>
      </select>

      <button className="btn w-full">Create</button>
    </form>
  );
}
