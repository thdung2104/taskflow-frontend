import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { token, loading } = useAuth();
  const location = useLocation();

  // Đang kiểm tra trạng thái đăng nhập
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">
          Đang kiểm tra đăng nhập...
        </p>
      </div>
    );
  }

  // Chưa đăng nhập thì chuyển về Login
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Đã đăng nhập thì cho phép truy cập
  return <Outlet />;
}