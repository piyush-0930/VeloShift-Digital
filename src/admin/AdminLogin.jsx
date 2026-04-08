import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://veloshift-backend.onrender.com/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("admin_token", data.token);

        // ✅ SUCCESS TOAST (your system)
        window.dispatchEvent(
          new CustomEvent("vs_message", {
            detail: {
              type: "success",
              title: "Login Successful",
              text: "Welcome back, Admin 🚀"
            }
          })
        );

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 800);

      } else {
        window.dispatchEvent(
          new CustomEvent("vs_message", {
            detail: {
              type: "error",
              title: "Login Failed",
              text: data.message || "Invalid credentials"
            }
          })
        );
      }
    } catch (err) {
      console.error(err);

      window.dispatchEvent(
        new CustomEvent("vs_message", {
          detail: {
            type: "error",
            title: "Server Error",
            text: "Please try again later"
          }
        })
      );
    } finally {
      setLoading(false);
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
            name="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={onChange}
            className="w-full p-3 rounded bg-transparent border border-white/10 text-white outline-none"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            className="w-full p-3 rounded bg-transparent border border-white/10 text-white outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded text-white font-semibold transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[var(--admin-accent)] hover:opacity-90"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
}