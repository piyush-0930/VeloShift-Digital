const API_BASE = import.meta.env.VITE_API_BASE || "https://veloshift-backend.onrender.com";

function authHeader() {
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function post(path, body, auth = false) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(auth ? authHeader() : {}),
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function get(path, auth = false) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      ...(auth ? authHeader() : {}),
    },
  });
  return res.json();
}

export async function put(path, body, auth = false) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(auth ? authHeader() : {}),
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function del(path, auth = false) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    headers: {
      ...(auth ? authHeader() : {}),
    },
  });
  return res.json();
}

export function logout() {
  localStorage.removeItem("admin_token");
}
