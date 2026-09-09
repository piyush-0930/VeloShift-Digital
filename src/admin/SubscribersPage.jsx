import { useEffect, useState } from "react";
import { get, del } from "../utils/api";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Mail,
  Copy,
  Check,
  Trash2,
  Download,
  TrendingUp,
  Clock,
  CheckCircle2,
  Inbox,
} from "lucide-react";

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const loadData = async () => {
    try {
      const res = await get("/api/subscribers");
      setSubscribers(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Error fetching subscribers:", err);
      setSubscribers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const fmt = (d) => (d ? new Date(d).toLocaleString() : "-");

  // Filtering
  const filteredSubscribers = subscribers.filter((s) =>
    s.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Statistics
  const total = subscribers.length;
  const now = new Date();
  const msInDay = 24 * 60 * 60 * 1000;

  const last7Start = new Date(now.getTime() - 7 * msInDay);
  const prev7Start = new Date(now.getTime() - 14 * msInDay);

  const last7 = subscribers.filter((s) => {
    const d = new Date(s.createdAt);
    return d > last7Start && d <= now;
  }).length;

  const prev7 = subscribers.filter((s) => {
    const d = new Date(s.createdAt);
    return d > prev7Start && d <= last7Start;
  }).length;

  let growth = 0;
  if (prev7 === 0) {
    growth = last7 === 0 ? 0 : 100;
  } else {
    growth = Math.round(((last7 - prev7) / prev7) * 100);
  }

  // 7-day trend chart data
  const last7DaysData = [...Array(7)]
    .map((_, i) => {
      const day = new Date();
      day.setDate(day.getDate() - (6 - i));

      const count = subscribers.filter((s) => {
        const d = new Date(s.createdAt);
        return d.toDateString() === day.toDateString();
      }).length;

      return {
        day: day.toLocaleDateString("en-US", { weekday: "short" }),
        signups: count,
      };
    });

  // Copy Email Function
  const copyEmail = (email, id) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setToastMessage(`Copied ${email} to clipboard`);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  // Delete Subscriber
  const handleDelete = async (id, email) => {
    if (!window.confirm(`Are you sure you want to remove ${email} from subscribers?`)) {
      return;
    }

    try {
      const res = await del(`/api/subscribers/${id}`);
      if (res && (res.success || !res.error)) {
        setSubscribers((prev) => prev.filter((s) => s._id !== id));
        setToastMessage(`Subscriber ${email} deleted`);
        setTimeout(() => setToastMessage(""), 3000);
      }
    } catch (err) {
      console.error("Delete subscriber failed:", err);
    }
  };

  // Export CSV (RFC 4180 safe)
  const exportCSV = () => {
    if (filteredSubscribers.length === 0) return;

    const headers = ["Email", "Subscribed Date"];
    const escapeCsv = (val) => {
      const str = val == null ? "" : String(val);
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = filteredSubscribers.map((s) => [
      escapeCsv(s.email),
      escapeCsv(fmt(s.createdAt)),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* HEADER & TOAST */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Email Subscribers</h1>
          <p className="text-white/60 text-sm mt-1">
            Track audience growth, manage newsletter subscribers, and export mailing lists.
          </p>
        </div>

        {toastMessage && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium animate-in fade-in">
            <CheckCircle2 size={14} />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* STATS TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-white/60 text-xs font-medium uppercase tracking-wider">
            <span>Total Audience</span>
            <Inbox size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-white">{total}</div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-blue-400 text-xs font-medium uppercase tracking-wider">
            <span>Last 7 Days</span>
            <Clock size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-blue-400">{last7}</div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-medium uppercase tracking-wider">
            <span>Weekly Growth</span>
            <TrendingUp size={15} />
          </div>
          <div
            className={`text-2xl font-bold mt-2 ${
              growth >= 0 ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {growth > 0 ? `+${growth}%` : `${growth}%`}
          </div>
        </div>
      </div>

      {/* RECHARTS ACTIVITY CARD */}
      <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-white">Audience Growth</h2>
            <p className="text-xs text-white/50">New newsletter subscriptions over the past 7 days</p>
          </div>
          <span className="text-xs font-medium text-white/60 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
            Last 7 Days
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={last7DaysData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="subscriberGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38A7F0" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#38A7F0" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                stroke="#64748b"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                allowDecimals={false}
                stroke="#64748b"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0b1328",
                  borderColor: "rgba(255,255,255,0.1)",
                  borderRadius: "0.75rem",
                  color: "#fff",
                  fontSize: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                }}
                itemStyle={{ color: "#38A7F0" }}
              />
              <Area
                type="monotone"
                dataKey="signups"
                stroke="#38A7F0"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#subscriberGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CONTROLS BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--admin-card)] border border-white/10 rounded-xl p-3">
        <input
          type="text"
          placeholder="Search subscriber email address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-white/50">
            Showing <strong className="text-white">{filteredSubscribers.length}</strong> of {total}
          </span>

          <button
            onClick={exportCSV}
            disabled={filteredSubscribers.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            title="Export filtered subscribers to CSV"
          >
            <Download size={13} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* SUBSCRIBERS TABLE */}
      <div className="overflow-x-auto border border-white/10 rounded-xl bg-[var(--admin-card)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/60">
              <th className="p-3.5">Email Address</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Subscribed Date</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-10 text-center text-white/50">
                  Loading subscribers list...
                </td>
              </tr>
            ) : filteredSubscribers.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-10 text-center text-white/50">
                  No subscribers found matching your search.
                </td>
              </tr>
            ) : (
              filteredSubscribers.map((s) => {
                const isCopied = copiedId === s._id;

                return (
                  <tr
                    key={s._id}
                    className="border-b border-white/5 hover:bg-white/[0.03] transition"
                  >
                    <td className="p-3.5 font-medium text-white">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-[#38A7F0] shrink-0" />
                        <span>{s.email}</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Active
                      </span>
                    </td>

                    <td className="p-3.5 text-white/60 text-xs">{fmt(s.createdAt)}</td>

                    <td className="p-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => copyEmail(s.email, s._id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition ${
                            isCopied
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                              : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border-white/10"
                          }`}
                          title="Copy email to clipboard"
                        >
                          {isCopied ? <Check size={13} /> : <Copy size={13} />}
                          <span>{isCopied ? "Copied" : "Copy"}</span>
                        </button>

                        <button
                          onClick={() => handleDelete(s._id, s.email)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition border border-red-500/20 text-xs font-medium"
                          title="Delete subscriber"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}