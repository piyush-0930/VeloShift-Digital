import { useEffect, useState } from "react";
import { get } from "../utils/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await get("/api/subscribers");
        setSubscribers(res || []);
      } catch (err) {
        console.error(err);
        setSubscribers([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const fmt = (d) => (d ? new Date(d).toLocaleString() : "-");

  // 🔍 FILTER
  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  // 📊 TOTAL
  const total = subscribers.length;

  // 📈 DATE HELPERS
  const now = new Date();
  const msInDay = 24 * 60 * 60 * 1000;

  const last7Start = new Date(now.getTime() - 7 * msInDay);
  const prev7Start = new Date(now.getTime() - 14 * msInDay);

  // 📈 LAST 7 DAYS
  const last7 = subscribers.filter((s) => {
    const d = new Date(s.createdAt);
    return d > last7Start && d <= now;
  }).length;

  // 📈 PREVIOUS 7 DAYS
  const prev7 = subscribers.filter((s) => {
    const d = new Date(s.createdAt);
    return d > prev7Start && d <= last7Start;
  }).length;

  // ✅ FIXED GROWTH LOGIC (PRODUCTION SAFE)
  let growth = 0;

  if (prev7 === 0) {
    if (last7 === 0) {
      growth = 0; // no activity
    } else {
      growth = 100; // new growth (can also show "New" in UI)
    }
  } else {
    growth = Math.round(((last7 - prev7) / prev7) * 100);
  }

  // 📉 CHART DATA
  const last7DaysData = [...Array(7)]
    .map((_, i) => {
      const day = new Date();
      day.setDate(day.getDate() - i);

      const count = subscribers.filter((s) => {
        const d = new Date(s.createdAt);
        return d.toDateString() === day.toDateString();
      }).length;

      return {
        day: day.toLocaleDateString("en-US", { weekday: "short" }),
        count,
      };
    })
    .reverse();

  // 📋 COPY FUNCTION
  const copyEmail = (email, id) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  };

  // 📤 EXPORT CSV
  const exportCSV = () => {
    if (filteredSubscribers.length === 0) return;

    const csv = [
      ["Email", "Date"],
      ...filteredSubscribers.map((s) => [s.email, fmt(s.createdAt)]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Subscribers</h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded bg-white/5 border border-white/10 text-white outline-none"
          />

          <button
            onClick={exportCSV}
            disabled={filteredSubscribers.length === 0}
            className="px-4 py-2 rounded bg-[var(--vs-primary)] disabled:opacity-50"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[var(--admin-card)] p-6 rounded-xl border border-white/10">
          <p className="text-white/60 text-sm">Total Subscribers</p>
          <h2 className="text-2xl font-bold mt-1">{total}</h2>
        </div>

        <div className="bg-[var(--admin-card)] p-6 rounded-xl border border-white/10">
          <p className="text-white/60 text-sm">Last 7 Days</p>
          <h2 className="text-2xl font-bold mt-1">{last7}</h2>
        </div>

        <div className="bg-[var(--admin-card)] p-6 rounded-xl border border-white/10">
          <p className="text-white/60 text-sm">Growth</p>
          <h2
            className={`text-2xl font-bold mt-1 ${
              growth >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {growth}%
          </h2>
        </div>
      </div>

      {/* 📉 CHART */}
      <div className="bg-[var(--admin-card)] p-6 rounded-xl border border-white/10 mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Last 7 Days Signups
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={last7DaysData}>
            <XAxis dataKey="day" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-white/10 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-[var(--admin-card)]">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="p-6 text-center text-white/60">
                  Loading...
                </td>
              </tr>
            ) : filteredSubscribers.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-6 text-center text-white/60">
                  No subscribers found
                </td>
              </tr>
            ) : (
              filteredSubscribers.map((s) => (
                <tr key={s._id} className="border-t border-white/10">
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{fmt(s.createdAt)}</td>
                  <td className="p-3">
                    <button
                      onClick={() => copyEmail(s.email, s._id)}
                      className="text-blue-400 hover:underline text-sm"
                    >
                      {copiedId === s._id ? "Copied!" : "Copy"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}