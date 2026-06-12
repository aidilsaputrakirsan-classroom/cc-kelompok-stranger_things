const API_URL = import.meta.env.VITE_API_URL || "http://localhost";

// ==================== TOKEN MANAGEMENT ====================
// Token disimpan di localStorage agar tidak hilang saat refresh/pindah halaman

export function setToken(token) {
  localStorage.setItem("authToken", token);
}

export function getToken() {
  return localStorage.getItem("authToken");
}

export function clearToken() {
  localStorage.removeItem("authToken");
}

function authHeaders() {
  const token = getToken();
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else {
    console.warn("⚠️ No token available! Cannot authorize request");
  }
  return headers;
}

// Helper: handle response errors
async function handleResponse(response) {
  if (response.status === 401) {
    console.error("❌ 401 Unauthorized - clearing token");
    clearToken();
    throw new Error("UNAUTHORIZED");
  }

    if (response.status === 503 || response.status === 504) {
    console.error(`❌ ${response.status} - Service unavailable`);
    throw new Error("Service temporarily unavailable. Please try again later.");
  }
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    // ← TAMBAHKAN INI: Handle jika detail adalah array (validation error)
    let errorMessage = "Request gagal";
    if (error.detail) {
      if (Array.isArray(error.detail)) {
        // Validation error dari Pydantic
        errorMessage = error.detail
          .map((e) => e.msg || JSON.stringify(e))
          .join(", ");
      } else if (typeof error.detail === "string") {
        // Custom error message
        errorMessage = error.detail;
      }
    }

    console.error(`❌ HTTP ${response.status}: ${errorMessage}`, error);
    throw new Error(errorMessage);
  }
  // 204 No Content
  if (response.status === 204) return null;
  return response.json();
}

// ==================== AUTH API ====================

export async function register(userData) {
  // Backend menerima: name, email, password, role
  const registerData = {
    name: userData.fullName,
    email: userData.email,
    password: userData.password,
    role: userData.role || "parent", // Include role, default to parent
  };
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerData),
  });
  return handleResponse(response);
}

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse(response);

  if (!data.access_token) {
    console.error("❌ ERROR: access_token is undefined!");
    console.error("❌ Response keys:", Object.keys(data));
    throw new Error("Server tidak mengembalikan access_token");
  }

  setToken(data.access_token);
  return data;
}
export async function getMe() {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

// ==================== ITEMS API ====================

export async function fetchItems(search = "", skip = 0, limit = 20) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  params.append("skip", skip);
  params.append("limit", limit);

  const response = await fetch(`${API_URL}/items?${params}`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function createItem(itemData) {
  const response = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(itemData),
  });
  return handleResponse(response);
}

export async function updateItem(id, itemData) {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(itemData),
  });
  return handleResponse(response);
}

export async function deleteItem(id) {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function checkHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();
    return data.status === "healthy";
  } catch {
    console.error("❌ Health check failed");
    return false;
  }
}

// ==================== CHILDREN API ====================

export async function fetchChildren() {
  const response = await fetch(`${API_URL}/children`, {
    headers: authHeaders(),
  });
  const data = await handleResponse(response);
  // Backend returns {total, children}, extract the children array
  return data.children || data || [];
}

export async function createChild(childData) {
  const response = await fetch(`${API_URL}/children`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(childData),
  });
  const result = await handleResponse(response);
  return result;
}

export async function updateChild(id, childData) {
  const response = await fetch(`${API_URL}/children/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(childData),
  });
  return handleResponse(response);
}

export async function deleteChild(id) {
  const response = await fetch(`${API_URL}/children/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
  return handleResponse(response);
}

// ==================== VACCINE API ====================

export async function fetchVaccineTypes() {
  const response = await fetch(`${API_URL}/vaccines`, {
    headers: authHeaders(), // kalau butuh token
  });
  return handleResponse(response);
}

// ==================== IMMUNIZATION API ====================

export async function createImmunization(data) {
  const response = await fetch(
    `${API_URL}/children/${data.child_id}/immunization`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify({
        vaccine_id: parseInt(data.vaccine_id, 10), // Convert to int
        scheduled_date: data.scheduled_date,
        status: data.status || "pending",
      }),
    },
  );

  const result = await handleResponse(response);
  return result;
}

// ====================FECTH IMMUNIZATION API ====================

export async function fetchImmunizations(childId) {
  const response = await fetch(`${API_URL}/children/${childId}/immunization`, {
    headers: authHeaders(),
  });

  const data = await handleResponse(response);
  // Backend returns {total, immunizations}, extract the array
  return data.immunizations || data || [];
}

export async function updateImmunization(logId, data) {
  const response = await fetch(`${API_URL}/immunization/${logId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// ==================== SCHEDULE API ====================

export async function fetchSchedules() {
  const response = await fetch(`${API_URL}/schedules`, {
    headers: authHeaders(),
  });
  const data = await handleResponse(response);
  return data.schedules || data || [];
}

export async function createSchedule(data) {
  const response = await fetch(`${API_URL}/schedules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateSchedule(id, data) {
  const response = await fetch(`${API_URL}/schedules/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function deleteSchedule(id) {
  const response = await fetch(`${API_URL}/schedules/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse(response);
}
