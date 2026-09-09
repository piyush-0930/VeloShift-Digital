import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/api";
import { ShieldCheck, Eye, EyeOff, Lock, User, AlertCircle } from "lucide-react";

function isTokenValid(token) {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const payload = JSON.parse(jsonPayload);
    return Boolean(payload.exp && Date.now() < payload.exp * 1000);
  } catch {
    return false;
  }
}

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // If already authenticated with a valid token, redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (isTokenValid(token)) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  function onChange(e) {
    setErrorMsg("");
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const data = await post("/api/admin/login", form, false);

      if (data && data.success && data.token) {
        localStorage.setItem("admin_token", data.token);

        window.dispatchEvent(
          new CustomEvent("vs_message", {
            detail: {
              type: "success",
              title: "Login Successful",
              text: "Welcome back to VeloShift Digital Admin",
            },
          })
        );

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 300);
      } else {
        setErrorMsg(data?.message || "Invalid administrator credentials");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setErrorMsg("Unable to connect to security server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--admin-bg)] p-4">
      <div className="bg-[#0b1328] border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl relative text-white space-y-6">
        {/* BRANDING HEADER */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#38A7F0]/15 border border-[#38A7F0]/30 flex items-center justify-center text-[#38A7F0] shadow-sm mb-1">
            <ShieldCheck size={26} />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            VeloShift Digital
          </h2>
          <p className="text-xs text-white/50">
            Administrative portal • Internal staff access
          </p>
        </div>

        {/* ERROR BANNER */}
        {errorMsg && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs animate-in fade-in">
            <AlertCircle size={15} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/70">Email / Username</label>
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                name="username"
                type="text"
                placeholder="Admin email or username"
                value={form.username}
                onChange={onChange}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#091122] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#38A7F0] transition"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/70">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={form.password}
                onChange={onChange}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#091122] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#38A7F0] transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-[#38A7F0] hover:bg-[#2b92d6] text-white text-xs font-bold transition shadow-sm disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In to Admin Portal</span>
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <p className="text-[11px] text-white/40">
            Authorized personnel only • Secure enterprise access
          </p>
        </div>
      </div>
    </div>
  );
}