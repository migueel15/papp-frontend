import { useGoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "@/features/auth/auth.context";
import * as AuthService from "@/features/auth/auth.service";

const BACKEND_BASE_URL =
	import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

export const useAuth = () => {
	const navigate = useNavigate();
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	const logout = async () => {
		const res = await AuthService.logout();
		context.setUser(null);
		context.setIsAuthenticated(false);
		navigate("/auth/login");
	};

	const login = useGoogleLogin({
		onSuccess: async (codeResponse) => {
			context.setLoading(true);
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
			// Update user context
			const { user } = await AuthService.getProfile();
			context.setUser(user);
			context.setIsAuthenticated(true);
			context.setLoading(false);
			// redirect to home
			navigate("/");
		},
		onError: (error) => {
			console.error("Login Failed:", error);
		},
		flow: "auth-code",
		redirect_uri: import.meta.env.VITE_REDIRECT_URI || "http://localhost:4200",
	});

	return { ...context, login, logout };
};
