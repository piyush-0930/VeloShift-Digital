import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await post("/api/admin/login", { email, password });
    if (res && res.token) {
      localStorage.setItem("admin_token", res.token);
      navigate("/admin/dashboard");
    } else {
      setError(res.error || "Login failed");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center admin-theme">
      <div className="w-full max-w-md bg-white/5 p-8 rounded-md">
        <h2 className="text-2xl text-white mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-3 rounded bg-transparent border border-white/10 text-white" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="w-full p-3 rounded bg-transparent border border-white/10 text-white" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <div className="text-red-400">{error}</div>}
          <button className="w-full py-3 bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] rounded">Login</button>
        </form>
      </div>
    </div>
  );
}
