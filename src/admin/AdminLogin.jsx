import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("admin-hide-ui");
    return () => document.body.classList.remove("admin-hide-ui");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await post("/api/admin/login", { username, password });

    // Backend success shape: { success: true, token: "..." }
    if (res?.success && res?.token) {
      localStorage.setItem("admin_token", res.token);
      navigate("/admin/dashboard");
      return;
    }

    // Backend error shape: { message: "Invalid credentials" }
    setError(res?.message || "Login failed");
  };

  return (
    <div className="admin-theme min-h-screen flex items-center justify-center px-4">
      <div
        className="admin-login-panel w-full max-w-md 
                   p-8 rounded-xl shadow-2xl
                   bg-[rgba(34,10,42,0.55)] 
                   border border-white/10 backdrop-blur-xl"
      >
        <h2 className="text-3xl font-bold text-[var(--admin-light)] mb-6 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* USERNAME */}
          <input
            className="w-full p-3 rounded-lg bg-[rgba(46,15,52,0.45)] 
                       border border-white/15 text-[var(--admin-light)] 
                       placeholder-white/40 focus:border-[var(--admin-accent)] 
                       outline-none transition"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            type="password"
            className="w-full p-3 rounded-lg bg-[rgba(46,15,52,0.45)] 
                       border border-white/15 text-[var(--admin-light)] 
                       placeholder-white/40 focus:border-[var(--admin-accent)] 
                       outline-none transition"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ERROR MESSAGE */}
          {error && <div className="text-red-400 text-sm">{error}</div>}

          <button
            className="admin-login-button w-full py-3 rounded-lg 
                       text-white font-medium text-lg
                       bg-gradient-to-r from-[var(--admin-accent)] 
                       to-[var(--admin-accent2)] hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
