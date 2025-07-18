import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";

const BACKEND_BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

export default function useAuth() {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const response = await fetch(`${BACKEND_BASE_URL}/auth/google`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: codeResponse.code,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      // redirect to home
      navigate("/");
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
    flow: "auth-code",
    redirect_uri: import.meta.env.VITE_REDIRECT_URI || "http://localhost:4200",
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/auth/login";
    // remove cookie if needed
    fetch(`${BACKEND_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).catch((error) => console.error("Logout failed:", error));
  };

  const getProfile = async () => { };

  return {
    login,
    logout,
    getProfile,
  };
}
