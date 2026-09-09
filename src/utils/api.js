export const API_BASE =
  import.meta.env.VITE_API_BASE || "https://veloshift-backend.onrender.com";

export function authHeader() {
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res) {
  // If session expired or unauthorized on an authenticated request, clear token
  if (res.status === 401 && localStorage.getItem("admin_token")) {
    console.warn("[VeloShift Digital] Admin session expired or invalid. Clearing credentials.");
    localStorage.removeItem("admin_token");
    window.dispatchEvent(
      new CustomEvent("vs_message", {
        detail: {
          type: "error",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
        },
      })
    );
  }

  try {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      return data;
    }
    const text = await res.text();
    return { success: res.ok, message: text };
  } catch {
    return { success: false, message: "Error parsing server response." };
  }
}

export async function post(path, body, auth = true) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(auth ? authHeader() : {}),
      },
      body: JSON.stringify(body),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("API POST Error:", error.message);
    return { success: false, message: "Unable to reach server. Please check your connection." };
  }
}

export async function get(path, auth = true) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: {
        ...(auth ? authHeader() : {}),
      },
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("API GET Error:", error.message);
    return null;
  }
}

export async function put(path, body, auth = true) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(auth ? authHeader() : {}),
      },
      body: JSON.stringify(body),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("API PUT Error:", error.message);
    return { success: false, message: "Unable to reach server." };
  }
}

export async function patch(path, body, auth = true) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(auth ? authHeader() : {}),
      },
      body: JSON.stringify(body),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("API PATCH Error:", error.message);
    return { success: false, message: "Unable to reach server." };
  }
}

export async function del(path, auth = true) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "DELETE",
      headers: {
        ...(auth ? authHeader() : {}),
      },
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("API DELETE Error:", error.message);
    return { success: false, message: "Unable to reach server." };
  }
}

export function logout() {
  localStorage.removeItem("admin_token");
}

