import { Navigate } from "react-router-dom";

/**
 * Validates JWT structural validity and expiration time on client side
 */
function isTokenValid(token) {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    // Decode Base64URL payload
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const payload = JSON.parse(jsonPayload);

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return false; // Token has expired
    }
    return true;
  } catch {
    return false;
  }
}

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("admin_token");

  if (!isTokenValid(token)) {
    if (token) {
      localStorage.removeItem("admin_token");
    }
    return <Navigate to="/admin" replace />;
  }

  return children;
}