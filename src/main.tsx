import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from "react-router";
import Callback from "./Callback";
import LoginPage from "@/features/auth/LoginPage";
import ColorPaletteTest from "./ColorPaletteTest";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
console.log("Google Client ID:", clientId);

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/auth/login",
    Component: LoginPage,
  },
  {
    path: "/auth/callback/google",
    Component: Callback,
  },
  {
    path: "/test",
    Component: ColorPaletteTest,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
);
