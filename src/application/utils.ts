const BACKEND_BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

let refreshPromise: Promise<string> | null = null;

async function refreshToken(): Promise<string> {
  const response = await fetch(`${BACKEND_BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include", // para enviar la cookie httpOnly
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  const newAccessToken = data.accessToken;

  if (!newAccessToken) {
    throw new Error("No access token returned on refresh");
  }

  // Guarda el nuevo token
  localStorage.setItem("accessToken", newAccessToken);
  return newAccessToken;
}

export async function fetchAuthorized(
  input: RequestInfo,
  init: RequestInit = {},
): Promise<Response> {
  console.log("getting token from localStorage");
  const token = localStorage.getItem("accessToken");
  const headers = new Headers(init.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  console.log("fetching with token:", token);
  const response = await fetch(input, { ...init, headers });

  if (response.status !== 401) {
    console.log("fetch successful, returning response");
    return response;
  }

  if (!refreshPromise) {
    console.log("Token expired, refreshing...");
    refreshPromise = refreshToken().finally(() => {
      refreshPromise = null; // Reseteamos después de completado
    });
  }

  try {
    await refreshPromise;
  } catch (err) {
    // Si falla el refresh, redirigimos al login
    console.error("Error refreshing token:", err);
    if (window.location.pathname !== "/auth/login") {
      window.location.href = "/auth/login";
    }
    throw err;
  }

  // Intentamos la petición original otra vez con el nuevo token
  console.log("Retrying fetch with new token");
  const newToken = localStorage.getItem("accessToken");
  const retryHeaders = new Headers(init.headers || {});
  if (newToken) {
    retryHeaders.set("Authorization", `Bearer ${newToken}`);
  }

  return fetch(input, { ...init, headers: retryHeaders });
}
