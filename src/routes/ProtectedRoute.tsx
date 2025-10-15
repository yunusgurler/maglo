import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth";
export const ProtectedRoute = () => {
  const token = useAuthStore((s) => s.accessToken);
  console.log("token", token);

  return token ? <Outlet /> : <Navigate to="/sign-in" replace />;
};
