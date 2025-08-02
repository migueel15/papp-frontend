import { Navigate } from "react-router";
import { useAuth } from "./auth.hook";
import UnauthorizedPage from "./components/UnauthorizedPage";
import LoadingScreen from "@/application/components/Loading";

function RequireAuth({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/auth/login" />;
  if (!user.isAuthorized) return <UnauthorizedPage />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;

  return children;
}

export default RequireAuth;
