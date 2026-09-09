import { useEffect, useState, useCallback } from "react";
import { get, put } from "../utils/api";
import {
  ShieldCheck,
  KeyRound,
  Database,
  User,
  CheckCircle2,
  AlertCircle,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  Layers,
  FileText,
  Briefcase,
  Users,
  Building,
  Mail,
  Receipt,
  Lock,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile"); // 'profile' | 'backup'
  const [adminProfile, setAdminProfile] = useState({
    username: "aggarwalpiyush630@gmail.com",
    role: "Super Administrator",
    createdAt: null,
  });

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passSubmitting, setPassSubmitting] = useState(false);
  const [passError, setPassError] = useState("");

  // Username edit state
  const [usernameInput, setUsernameInput] = useState("");
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Backup record counts state
  const [backupStats, setBackupStats] = useState({
    contacts: 0,
    quotes: 0,
    careers: 0,
    jobs: 0,
    leads: 0,
    subscribers: 0,
    invoices: 0,
    totalRecords: 0,
    timestamp: null,
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [exportingBackup, setExportingBackup] = useState(false);

  // Global toast
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Load Profile
  const loadProfile = useCallback(async () => {
    try {
      const res = await get("/api/admin/profile");
      if (res && res.data) {
        setAdminProfile(res.data);
        setUsernameInput(res.data.username || "aggarwalpiyush630@gmail.com");
      }
    } catch (err) {
      console.error("Failed to load admin profile:", err);
    }
  }, []);

  // Load Backup Record Counts
  const loadBackupStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await get("/api/admin/backup/stats");
      if (res && res.data) {
        setBackupStats(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch backup counts:", err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
    loadBackupStats();
  }, [loadProfile, loadBackupStats]);

  // Handle Email / Username Update
  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    setProfileError("");

    if (!usernameInput || usernameInput.trim().length < 3) {
      setProfileError("Email address must be at least 3 characters long.");
      return;
    }

    setUpdatingProfile(true);
    try {
      const res = await put("/api/admin/profile", { username: usernameInput.trim() });
      if (res && res.success) {
        setAdminProfile((prev) => ({ ...prev, username: usernameInput.trim() }));
        showToast("Admin email updated successfully");
      } else {
        setProfileError(res?.message || "Failed to update email.");
      }
    } catch (err) {
      setProfileError(err?.message || "Error updating email.");
    } finally {
      setUpdatingProfile(false);
    }
  };

  // Handle Password Update
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPassError("");

    if (!currentPassword || !newPassword) {
      setPassError("Please fill out both current and new password.");
      return;
    }

    if (newPassword.length < 6) {
      setPassError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError("New password and confirmation password do not match.");
      return;
    }

    setPassSubmitting(true);
    try {
      const res = await put("/api/admin/change-password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (res && res.success) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        showToast("Password changed successfully");
      } else {
        setPassError(res?.message || "Password update failed.");
      }
    } catch (err) {
      setPassError(err?.message || "Error communicating with auth service.");
    } finally {
      setPassSubmitting(false);
    }
  };

  // Handle Database Backup Export
  const handleExportBackup = async () => {
    setExportingBackup(true);
    try {
      const res = await get("/api/admin/backup/export");
      if (res && res.data) {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(res.data, null, 2)
        )}`;
        const downloadAnchor = document.createElement("a");
        const dateStr = new Date().toISOString().slice(0, 10);
        downloadAnchor.setAttribute("href", jsonString);
        downloadAnchor.setAttribute("download", `veloshift-database-backup-${dateStr}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();

        showToast("Database backup downloaded successfully");
        loadBackupStats();
      } else {
        alert("Failed to compile database backup.");
      }
    } catch (err) {
      console.error("Backup export error:", err);
      alert("Error generating database backup. Please try again.");
    } finally {
      setExportingBackup(false);
    }
  };

  const collectionBadges = [
    { label: "Contact Inquiries", count: backupStats.contacts, icon: <Users size={16} className="text-[#38A7F0]" /> },
    { label: "Service Quotes", count: backupStats.quotes, icon: <Layers size={16} className="text-amber-400" /> },
    { label: "Applications", count: backupStats.careers, icon: <FileText size={16} className="text-purple-400" /> },
    { label: "Job Postings", count: backupStats.jobs, icon: <Briefcase size={16} className="text-emerald-400" /> },
    { label: "Client CRM", count: backupStats.leads, icon: <Building size={16} className="text-[#38A7F0]" /> },
    { label: "Subscribers", count: backupStats.subscribers, icon: <Mail size={16} className="text-blue-400" /> },
    { label: "Invoices", count: backupStats.invoices, icon: <Receipt size={16} className="text-emerald-400" /> },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER & TOAST */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings & Backup</h1>
          <p className="text-white/60 text-sm mt-1">
            Manage administrator credentials, profile settings, and database backups.
          </p>
        </div>

        {toastMessage && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium animate-in fade-in">
            <CheckCircle2 size={14} />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* TOP OVERVIEW TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-white/60 text-xs font-medium uppercase tracking-wider">
            <span>Admin Email</span>
            <Mail size={15} />
          </div>
          <div
            className="text-base sm:text-lg font-bold mt-2 text-white truncate"
            title={adminProfile.username || "aggarwalpiyush630@gmail.com"}
          >
            {adminProfile.username || "aggarwalpiyush630@gmail.com"}
          </div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-medium uppercase tracking-wider">
            <span>Privilege Role</span>
            <ShieldCheck size={15} />
          </div>
          <div className="text-lg font-bold mt-2 text-emerald-400">
            Super Admin
          </div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-[#38A7F0] text-xs font-medium uppercase tracking-wider">
            <span>Total Records</span>
            <Database size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-[#38A7F0]">
            {statsLoading ? "..." : backupStats.totalRecords}
          </div>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === "profile"
              ? "bg-[#38A7F0] text-white shadow-sm"
              : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
          }`}
        >
          <KeyRound size={15} />
          <span>Security & Credentials</span>
        </button>

        <button
          onClick={() => setActiveTab("backup")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === "backup"
              ? "bg-[#38A7F0] text-white shadow-sm"
              : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
          }`}
        >
          <Database size={15} />
          <span>Database Backup</span>
        </button>
      </div>

      {/* TAB 1: PROFILE & PASSWORD */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PROFILE CARD */}
          <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-5 space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#38A7F0]/15 border border-[#38A7F0]/30 flex items-center justify-center text-[#38A7F0]">
                <Mail size={20} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Administrator Profile</h2>
                <p className="text-xs text-white/50">Manage administrative identity and credentials</p>
              </div>
            </div>

            {profileError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
                <AlertCircle size={15} className="shrink-0" />
                <span>{profileError}</span>
              </div>
            )}

            <form onSubmit={handleUpdateUsername} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">Admin Email</label>
                <input
                  type="email"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="admin@veloshift.digital"
                  className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">Access Role</label>
                <input
                  type="text"
                  disabled
                  value="Primary Administrator (Full Access)"
                  className="w-full bg-[#091122]/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/60 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-white/50">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="block text-[11px] text-white/40 mb-1">Session Security</span>
                  <strong className="text-white">Encrypted Session</strong>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="block text-[11px] text-white/40 mb-1">Session Expiration</span>
                  <strong className="text-white">7 Days Active</strong>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={updatingProfile}
                  className="px-4 py-2 rounded-xl bg-[#38A7F0] hover:bg-[#2b92d6] text-white text-xs font-semibold shadow-sm transition disabled:opacity-50"
                >
                  {updatingProfile ? "Updating..." : "Save Email"}
                </button>
              </div>
            </form>
          </div>

          {/* CHANGE PASSWORD CARD */}
          <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-5 space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Lock size={20} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Update Password</h2>
                <p className="text-xs text-white/50">Update your administrator account password</p>
              </div>
            </div>

            {passError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
                <AlertCircle size={15} className="shrink-0" />
                <span>{passError}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 pr-10 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-2.5 text-white/40 hover:text-white"
                  >
                    {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">New Password</label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 pr-10 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-2.5 text-white/40 hover:text-white"
                  >
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 pr-10 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-2.5 text-white/40 hover:text-white"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={passSubmitting}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm transition disabled:opacity-50"
                >
                  {passSubmitting ? "Updating Password..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: MASTER DATABASE BACKUP */}
      {activeTab === "backup" && (
        <div className="space-y-6">
          {/* EXPLANATION / BANNER */}
          <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#38A7F0]/15 border border-[#38A7F0]/30 flex items-center justify-center text-[#38A7F0] shrink-0 mt-0.5">
                <Database size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Database Backup & Export</h2>
                <p className="text-xs text-white/60 mt-1 max-w-2xl leading-relaxed">
                  Download a complete backup archive containing all 7 company record collections: Contact Inquiries,
                  Service Requests, Career Applications, Job Openings, Client Accounts, Email Subscribers, and Invoices.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <button
                onClick={loadBackupStats}
                disabled={statsLoading}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition text-xs font-medium"
                title="Refresh record counts"
              >
                <RefreshCw size={13} className={statsLoading ? "animate-spin" : ""} />
                <span>Refresh Counts</span>
              </button>

              <button
                onClick={handleExportBackup}
                disabled={exportingBackup}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition disabled:opacity-50"
              >
                <Download size={14} />
                <span>{exportingBackup ? "Preparing Download..." : "Download Database Backup (.json)"}</span>
              </button>
            </div>
          </div>

          {/* COLLECTIONS BREAKDOWN GRID */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-3">
              Collections Included in Backup Archive
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {collectionBadges.map((col, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      {col.icon}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white/70">{col.label}</div>
                      <div className="text-lg font-bold text-white mt-0.5">
                        {statsLoading ? "-" : col.count}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    Ready
                  </span>
                </div>
              ))}

              {/* SUMMARY TOTAL TILE */}
              <div className="bg-[var(--admin-card)] border border-[#38A7F0]/30 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#38A7F0]/15 border border-[#38A7F0]/30 flex items-center justify-center text-[#38A7F0]">
                    <Database size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#38A7F0]">Total Records</div>
                    <div className="text-lg font-bold text-white mt-0.5">
                      {statsLoading ? "-" : backupStats.totalRecords}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] uppercase font-bold text-[#38A7F0] bg-[#38A7F0]/10 border border-[#38A7F0]/20 px-2 py-0.5 rounded-full">
                  7 Collections
                </span>
              </div>
            </div>
          </div>

          {/* BACKUP SPECIFICATION DETAILS */}
          <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Export File Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg">
                <span className="text-white/40 block mb-1">File Format</span>
                <span className="text-white font-medium">Structured JSON (.json)</span>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg">
                <span className="text-white/40 block mb-1">Download Delivery</span>
                <span className="text-white font-medium">Direct Secure Download</span>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg">
                <span className="text-white/40 block mb-1">Backup Version</span>
                <span className="text-white font-medium">Timestamped Archive</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
