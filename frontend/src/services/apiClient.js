// frontend/src/services/apiClient.js
// Wrapper untuk semua API call — menambahkan error normalization
// agar error dari server (503, 504, dsb) punya pesan yang konsisten

export async function callApi(fetchFn) {
  try {
    return await fetchFn();
  } catch (err) {
    // Jika error sudah punya status dari response
    if (err.status === 503 || err.message?.includes("503")) {
      throw new Error("Service temporarily unavailable");
    }
    if (err.status === 504 || err.message?.includes("504") || err.message?.includes("timeout")) {
      throw new Error("Service temporarily unavailable");
    }
    if (!navigator.onLine) {
      throw new Error("Service temporarily unavailable");
    }
    throw err;
  }
}