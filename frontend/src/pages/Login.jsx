import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await login(email, password);
    nav("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl mb-4">HRMS Login</h2>
        <input className="input mb-3" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input className="input mb-4" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button className="btn w-full">Login</button>
      </form>
    </div>
  );
}
