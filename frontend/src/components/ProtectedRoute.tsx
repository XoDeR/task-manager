import useAuthStore from "@/stores/authStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;