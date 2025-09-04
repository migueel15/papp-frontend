import { fetchAuthorized } from "@/application/utils";
import type { User } from "./auth.context";

const BACKEND_BASE_URL =
	import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

// const login = useGoogleLogin({
//   onSuccess: async (codeResponse) => {
//     const response = await fetch(`${BACKEND_BASE_URL}/auth/google`, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         code: codeResponse.code,
//       }),
//     });
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     localStorage.setItem("accessToken", data.accessToken);
//     // redirect to home
//     navigate("/");
//   },
//   onError: (error) => {
//     console.error("Login Failed:", error);
//   },
//   flow: "auth-code",
//   redirect_uri: import.meta.env.VITE_REDIRECT_URI || "http://localhost:4200",
// });

export const logout = async () => {
	localStorage.removeItem("accessToken");
	await fetch(`${BACKEND_BASE_URL}/auth/logout`, {
		method: "POST",
		credentials: "include",
	}).catch((error) => console.error("Logout failed:", error));
};

export const getProfile = async (): Promise<{ user: User }> => {
	const res = await fetchAuthorized(`${BACKEND_BASE_URL}/auth/profile`, {
		method: "GET",
	});
	if (!res.ok) {
		const errorText = await res.text();
		console.error("Profile fetch error:", errorText);
		return;
	}
	const user = await res.json();
	return {
		user,
	};
};
