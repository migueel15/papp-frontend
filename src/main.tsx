import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "@/App.tsx";
import LoginPage from "@/features/auth/LoginPage";
import Callback from "./Callback";
import ColorPaletteTest from "./ColorPaletteTest";
import { AuthProvider } from "./features/auth/auth.context";
import RequireAuth from "./features/auth/auth.guard";
import TaskPage from "./features/tasks/TaskPage";
import Layout from "./layout/Layout";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
console.log("Google Client ID:", clientId);

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
		children: [
			{
				path: "",
				element: <App />,
			},
			{
				path: "tasks",
				element: <TaskPage />,
			},
			{
				path: "finance",
				element: <h1>Vista de finanzas!</h1>,
			},
		],
	},
	{
		path: "/auth/login",
		Component: LoginPage,
	},
	{
		path: "/auth/callback/google",
		Component: Callback,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<GoogleOAuthProvider clientId={clientId}>
				<RouterProvider router={router} />
			</GoogleOAuthProvider>
		</AuthProvider>
	</StrictMode>,
);
