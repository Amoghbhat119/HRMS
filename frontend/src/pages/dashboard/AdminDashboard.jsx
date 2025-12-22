import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/dashboard/admin").then((res) => setData(res.data));
  }, []);

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Total Employees" value={data.totalEmployees} />
        <Card title="Present Today" value={data.presentToday} />
        <Card title="On Leave Today" value={data.onLeaveToday} />
        <Card title="Pending Leaves" value={data.pendingLeaves} />
      </div>
    </div>
  );
}

const Card = ({ title, value }) => (
  <div className="bg-white shadow rounded p-5">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);
