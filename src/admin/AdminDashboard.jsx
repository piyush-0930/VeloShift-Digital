import { useEffect, useState } from "react";
import { FaUsers, FaBriefcase, FaCogs } from "react-icons/fa";
import { get } from "../utils/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    contacts: 0,
    careers: 0,
    services: 0,
    subscribers: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const contactsRes = await get("/api/contact/all");
        const careersRes = await get("/api/careers");
        const subscribersRes = await get("/api/subscribers");

        setStats({
          contacts: contactsRes?.contacts?.length || 0,
          careers: Array.isArray(careersRes) ? careersRes.length : 0,
          services: 0,
          subscribers: Array.isArray(subscribersRes)
            ? subscribersRes.length
            : 0,
        });
      } catch (err) {
        console.error("Error loading stats:", err);
      }
    }

    loadStats();
  }, []);

  const barData = [
    { name: "Contacts", value: stats.contacts },
    { name: "Careers", value: stats.careers },
    { name: "Services", value: stats.services },
    { name: "Subscribers", value: stats.subscribers },
  ];

  const pieData = [
    { name: "Contacts", value: stats.contacts },
    { name: "Careers", value: stats.careers },
    { name: "Services", value: stats.services },
    { name: "Subscribers", value: stats.subscribers },
  ];

  const COLORS = ["#3b82f6", "#a855f7", "#22c55e", "#f59e0b"];

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-white/60 text-sm mt-1">
          Welcome back, manage everything from here
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-[var(--admin-card)] p-6 rounded-xl border border-white/10">
          <p className="text-white/60 text-sm">Total Contacts</p>
          <h2 className="text-2xl font-bold mt-1">{stats.contacts}</h2>
        </div>

        <div className="bg-[var(--admin-card)] p-6 rounded-xl border border-white/10">
          <p className="text-white/60 text-sm">Applications</p>
          <h2 className="text-2xl font-bold mt-1">{stats.careers}</h2>
        </div>

        <div className="bg-[var(--admin-card)] p-6 rounded-xl border border-white/10">
          <p className="text-white/60 text-sm">Service Requests</p>
          <h2 className="text-2xl font-bold mt-1">{stats.services}</h2>
        </div>

        <div className="bg-[var(--admin-card)] p-6 rounded-xl border border-white/10">
          <p className="text-white/60 text-sm">Subscribers</p>
          <h2 className="text-2xl font-bold mt-1">{stats.subscribers}</h2>
        </div>

      </div>

      {/* 📊 CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

        <div className="bg-[var(--admin-card)] p-6 rounded-xl border border-white/10">
          <h2 className="text-lg font-semibold mb-4">Overview</h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[var(--admin-card)] p-6 rounded-xl border border-white/10">
          <h2 className="text-lg font-semibold mb-4">Distribution</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ✅ UPDATED SYSTEM HEALTH */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">System Health</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

          <div className="bg-[var(--admin-card)] p-6 rounded-xl border border-white/10">
            <p className="text-white/60 text-sm">Overall Status</p>
            <h3 className="text-xl font-bold mt-2 text-green-400">
              100% Operational
            </h3>
          </div>

          <div className="bg-[var(--admin-card)] p-6 rounded-xl border border-white/10">
            <p className="text-white/60 text-sm">Contacts</p>
            <p className="mt-2 text-green-400 font-medium">● Working</p>
          </div>

          <div className="bg-[var(--admin-card)] p-6 rounded-xl border border-white/10">
            <p className="text-white/60 text-sm">Careers</p>
            <p className="mt-2 text-green-400 font-medium">● Active</p>
          </div>

          <div className="bg-[var(--admin-card)] p-6 rounded-xl border border-white/10">
            <p className="text-white/60 text-sm">Services</p>
            <p className="mt-2 text-yellow-400 font-medium">● Maintenance</p>
          </div>

          <div className="bg-[var(--admin-card)] p-6 rounded-xl border border-white/10">
            <p className="text-white/60 text-sm">Subscribers</p>
            <p className="mt-2 text-green-400 font-medium">● Growing</p>
          </div>

        </div>
      </div>

    </div>
  );
}