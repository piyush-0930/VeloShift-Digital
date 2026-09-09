import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import {
  Users,
  Briefcase,
  Layers,
  Mail,
  Building,
  Receipt,
  CheckCircle2,
  TrendingUp,
  Activity,
  IndianRupee,
  Clock,
  ArrowUpRight,
  Database,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    contacts: 0,
    careers: 0,
    services: 0,
    subscribers: 0,
    leads: 0,
    leadRevenue: 0,
    jobs: 0,
    activeJobs: 0,
    invoices: 0,
    invoiceTotal: 0,
    invoicePaid: 0,
    invoicePending: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [
          contactsRes,
          careersRes,
          subscribersRes,
          servicesRes,
          leadsRes,
          jobsRes,
          invoicesRes,
        ] = await Promise.allSettled([
          get("/api/contact/all"),
          get("/api/careers"),
          get("/api/subscribers"),
          get("/api/quotes"),
          get("/api/leads?limit=100"),
          get("/api/jobs/admin"),
          get("/api/invoices"),
        ]);

        const contactsData =
          contactsRes.status === "fulfilled" ? contactsRes.value : null;
        const careersData =
          careersRes.status === "fulfilled" ? careersRes.value : null;
        const subscribersData =
          subscribersRes.status === "fulfilled" ? subscribersRes.value : null;
        const servicesData =
          servicesRes.status === "fulfilled" ? servicesRes.value : null;
        const leadsData =
          leadsRes.status === "fulfilled" ? leadsRes.value : null;
        const jobsData =
          jobsRes.status === "fulfilled" ? jobsRes.value : null;
        const invoicesData =
          invoicesRes.status === "fulfilled" ? invoicesRes.value : null;

        const allLeads = leadsData?.data || [];
        const totalLeadRevenue = allLeads.reduce(
          (acc, l) => acc + Number(l.amount || 0),
          0
        );

        const allJobs = jobsData?.data || [];
        const activeJobsCount = allJobs.filter((j) => j.isActive).length;

        const allInvoices = invoicesData?.data || [];
        const invStats = invoicesData?.stats || {};

        setStats({
          contacts: contactsData?.contacts?.length || 0,
          careers: Array.isArray(careersData) ? careersData.length : 0,
          services: servicesData?.data?.length || 0,
          subscribers: Array.isArray(subscribersData)
            ? subscribersData.length
            : 0,
          leads: allLeads.length,
          leadRevenue: totalLeadRevenue,
          jobs: allJobs.length,
          activeJobs: activeJobsCount,
          invoices: allInvoices.length,
          invoiceTotal: invStats.totalInvoiced || 0,
          invoicePaid: invStats.totalPaid || 0,
          invoicePending: invStats.totalPending || 0,
        });
      } catch (err) {
        console.error("Error loading admin stats:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const barData = [
    { name: "Inquiries", count: stats.contacts },
    { name: "Candidates", count: stats.careers },
    { name: "Quotes", count: stats.services },
    { name: "Clients", count: stats.leads },
    { name: "Openings", count: stats.activeJobs },
    { name: "Subscribers", count: stats.subscribers },
    { name: "Invoices", count: stats.invoices },
  ];

  const pieData = [
    { name: "Inquiries", value: stats.contacts },
    { name: "Applications", value: stats.careers },
    { name: "Quotes", value: stats.services },
    { name: "Clients", value: stats.leads },
    { name: "Invoices", value: stats.invoices },
  ].filter((d) => d.value > 0);

  const COLORS = ["#38A7F0", "#a855f7", "#f59e0b", "#10b981", "#6366f1"];

  return (
    <div className="space-y-4 sm:space-y-4.5">
      {/* HEADER & STATUS BADGE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Executive Dashboard</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-0.5">
            Executive overview across client accounts, active hiring, project quotes, and billing.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold self-start sm:self-auto">
          <span className={`w-2 h-2 rounded-full ${loading ? "bg-amber-400" : "bg-emerald-400"} animate-pulse`} />
          <span>{loading ? "Loading Records..." : "All Systems Active"}</span>
        </div>
      </div>

      {/* EXECUTIVE KPI METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        <Link
          to="/admin/contacts"
          className="bg-[var(--admin-card)] p-3.5 sm:p-4 rounded-xl border border-white/10 hover:border-[#38A7F0]/40 transition group"
        >
          <div className="flex items-center justify-between text-white/60 text-xs font-medium uppercase tracking-wider">
            <span>Inquiries</span>
            <Users size={14} className="text-[#38A7F0]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold mt-1.5 text-white group-hover:text-[#38A7F0] transition">
            {stats.contacts}
          </div>
          <div className="text-[10px] text-white/40 mt-1 flex items-center gap-0.5">
            <span>Review inquiries</span>
            <ArrowUpRight size={10} />
          </div>
        </Link>

        <Link
          to="/admin/careers"
          className="bg-[var(--admin-card)] p-3.5 sm:p-4 rounded-xl border border-white/10 hover:border-purple-500/40 transition group"
        >
          <div className="flex items-center justify-between text-white/60 text-xs font-medium uppercase tracking-wider">
            <span>Applications</span>
            <Briefcase size={14} className="text-purple-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold mt-1.5 text-white group-hover:text-purple-400 transition">
            {stats.careers}
          </div>
          <div className="text-[10px] text-white/40 mt-1 flex items-center gap-0.5">
            <span>Review resumes</span>
            <ArrowUpRight size={10} />
          </div>
        </Link>

        <Link
          to="/admin/jobs"
          className="bg-[var(--admin-card)] p-3.5 sm:p-4 rounded-xl border border-white/10 hover:border-emerald-500/40 transition group"
        >
          <div className="flex items-center justify-between text-emerald-400 text-xs font-medium uppercase tracking-wider">
            <span>Hiring Roles</span>
            <CheckCircle2 size={14} />
          </div>
          <div className="text-xl sm:text-2xl font-bold mt-1.5 text-emerald-400">
            {stats.activeJobs}
          </div>
          <div className="text-[10px] text-white/40 mt-1 flex items-center gap-0.5">
            <span>{stats.jobs} total posted</span>
          </div>
        </Link>

        <Link
          to="/admin/services"
          className="bg-[var(--admin-card)] p-3.5 sm:p-4 rounded-xl border border-white/10 hover:border-amber-500/40 transition group"
        >
          <div className="flex items-center justify-between text-white/60 text-xs font-medium uppercase tracking-wider">
            <span>Quotes</span>
            <Layers size={14} className="text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold mt-1.5 text-white group-hover:text-amber-400 transition">
            {stats.services}
          </div>
          <div className="text-[10px] text-white/40 mt-1 flex items-center gap-0.5">
            <span>Project quotes</span>
          </div>
        </Link>

        <Link
          to="/admin/leads"
          className="bg-[var(--admin-card)] p-3.5 sm:p-4 rounded-xl border border-white/10 hover:border-[#38A7F0]/40 transition group"
        >
          <div className="flex items-center justify-between text-white/60 text-xs font-medium uppercase tracking-wider">
            <span>Client Accounts</span>
            <Building size={14} className="text-[#38A7F0]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold mt-1.5 text-white group-hover:text-[#38A7F0] transition">
            {stats.leads}
          </div>
          <div className="text-[10px] text-white/40 mt-1 flex items-center gap-0.5">
            <span>Active accounts</span>
          </div>
        </Link>

        <Link
          to="/admin/invoices"
          className="bg-[var(--admin-card)] p-3.5 sm:p-4 rounded-xl border border-white/10 hover:border-emerald-500/40 transition group"
        >
          <div className="flex items-center justify-between text-emerald-400 text-xs font-medium uppercase tracking-wider">
            <span>Collected (₹)</span>
            <IndianRupee size={14} />
          </div>
          <div className="text-lg sm:text-xl font-bold mt-1.5 text-emerald-400 truncate">
            ₹{stats.invoicePaid.toLocaleString("en-IN")}
          </div>
          <div className="text-[10px] text-white/40 mt-1 flex items-center gap-0.5">
            <span>₹{stats.invoicePending.toLocaleString("en-IN")} due</span>
          </div>
        </Link>
      </div>

      {/* BALANCED CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* BAR CHART: VOLUME OVERVIEW */}
        <div className="bg-[var(--admin-card)] p-4.5 sm:p-5 rounded-xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-white">Records Volume Distribution</h2>
              <p className="text-xs text-white/50">Overview of total inquiries, candidates, jobs, and invoices</p>
            </div>
            <TrendingUp size={16} className="text-white/40" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="name"
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
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  contentStyle={{
                    backgroundColor: "#0b1328",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: "0.5rem",
                    color: "#fff",
                    fontSize: "12px",
                    padding: "8px 12px",
                  }}
                />
                <Bar dataKey="count" fill="#38A7F0" radius={[4, 4, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* FINANCIAL & BUSINESS RATIO */}
        <div className="bg-[var(--admin-card)] p-4.5 sm:p-5 rounded-xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-white">Client Inquiries & Business Overview</h2>
              <p className="text-xs text-white/50">Distribution of business activity and customer requests</p>
            </div>
            <Activity size={16} className="text-white/40" />
          </div>

          {pieData.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-white/40 text-xs min-h-[12rem]">
              <Activity size={26} className="mb-2 opacity-50" />
              <span>No customer records logged yet.</span>
            </div>
          ) : (
            <>
              <div className="h-48 sm:h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      innerRadius={48}
                      outerRadius={74}
                      paddingAngle={4}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0b1328",
                        borderColor: "rgba(255,255,255,0.1)",
                        borderRadius: "0.5rem",
                        color: "#fff",
                        fontSize: "12px",
                        padding: "8px 12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-3 text-xs text-white/70 flex-wrap pt-2.5 border-t border-white/5">
                {pieData.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* COMPACT QUICK WORKFLOW SHORTCUTS */}
      <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4 sm:p-4.5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xs sm:text-sm font-semibold text-white">Quick Actions & Management Tools</h2>
            <p className="text-[11px] text-white/50">Direct access to invoices, hiring vacancies, inquiries, and client accounts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3">
          <Link
            to="/admin/invoices"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-emerald-500/40 transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Receipt size={16} />
            </div>
            <div>
              <div className="text-xs font-semibold text-white group-hover:text-emerald-400 transition">Invoices & Billing</div>
              <div className="text-[10px] text-white/50 mt-0.5">Billing & GST calculations</div>
            </div>
          </Link>

          <Link
            to="/admin/jobs"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-purple-500/40 transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
              <Briefcase size={16} />
            </div>
            <div>
              <div className="text-xs font-semibold text-white group-hover:text-purple-400 transition">Job Openings</div>
              <div className="text-[10px] text-white/50 mt-0.5">Manage hiring on Careers</div>
            </div>
          </Link>

          <Link
            to="/admin/contacts"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#38A7F0]/40 transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#38A7F0]/15 text-[#38A7F0] border border-[#38A7F0]/30 flex items-center justify-center shrink-0">
              <Users size={16} />
            </div>
            <div>
              <div className="text-xs font-semibold text-white group-hover:text-[#38A7F0] transition">Contact Inquiries</div>
              <div className="text-[10px] text-white/50 mt-0.5">Customer messages & status</div>
            </div>
          </Link>

          <Link
            to="/admin/leads"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-amber-500/40 transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Building size={16} />
            </div>
            <div>
              <div className="text-xs font-semibold text-white group-hover:text-amber-400 transition">Client Accounts</div>
              <div className="text-[10px] text-white/50 mt-0.5">Active accounts & deliverables</div>
            </div>
          </Link>

          <Link
            to="/admin/settings"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#38A7F0]/40 transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-500/15 text-[#38A7F0] border border-blue-500/30 flex items-center justify-center shrink-0">
              <Database size={16} />
            </div>
            <div>
              <div className="text-xs font-semibold text-white group-hover:text-[#38A7F0] transition">Settings & Backup</div>
              <div className="text-[10px] text-white/50 mt-0.5">Account settings & backup</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}