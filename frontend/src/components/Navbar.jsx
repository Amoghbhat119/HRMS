import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow px-6 py-3 flex justify-between">
      <h2 className="font-semibold">Admin Panel</h2>
      <button onClick={logout} className="text-red-600">
        Logout
      </button>
    </header>
  );
}
