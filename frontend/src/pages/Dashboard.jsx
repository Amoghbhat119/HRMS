import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    leavesToday: 0,
    attendancePercent: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await api.get("/dashboard");
      setStats(res.data);
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Total Employees</p>
          <h2 className="text-3xl font-bold">{stats.totalEmployees}</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Employees on Leave Today</p>
          <h2 className="text-3xl font-bold">{stats.leavesToday}</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Attendance Percentage</p>
          <h2 className="text-3xl font-bold">
            {stats.attendancePercent}%
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
