import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();

    // ✅ FIXED LOGIN CHECK
    if (
      form.email.trim().toLowerCase() === "admin@veloshift.com" &&
      form.password.trim() === "admin123"
    ) {
      localStorage.setItem("admin_token", "dummy_token");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--admin-bg)]">
      <div className="bg-[var(--admin-sidebar)] p-8 rounded-xl w-full max-w-md shadow-xl border border-white/10">
        
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Admin Login
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            className="w-full p-3 rounded bg-transparent border border-white/10 text-white outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            className="w-full p-3 rounded bg-transparent border border-white/10 text-white outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded bg-[var(--admin-accent)] hover:opacity-90 transition text-white font-semibold"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}