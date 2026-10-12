import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Vui lòng điền email.");
      return;
    }

    if (!password) {
      setError("Vui lòng điền mật khẩu.");
      return;
    }

    try {
      await login(email.trim(), password);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Đăng nhập thất bại. Vui lòng thử lại.";

      setError(message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Logo và tiêu đề */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-600">
            TaskFlow
          </h1>

          <p className="mt-2 text-gray-500">
            Đăng nhập để quản lý công việc của bạn
          </p>
        </div>

        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              onInvalid={(e) => {
                if (e.target.validity.valueMissing) {
                  e.target.setCustomValidity(
                    "Vui lòng điền email"
                  );
                } else if (e.target.validity.typeMismatch) {
                  e.target.setCustomValidity(
                    "Vui lòng nhập email hợp lệ"
                  );
                }
              }}
              onInput={(e) => e.target.setCustomValidity("")}
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>

            <input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onInvalid={(e) => {
                e.target.setCustomValidity(
                  "Vui lòng điền mật khẩu"
                );
              }}
              onInput={(e) => e.target.setCustomValidity("")}
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
              />
              Ghi nhớ đăng nhập
            </label>

            <button
              type="button"
              onClick={() =>
                setError(
                  "Chức năng quên mật khẩu chưa được triển khai."
                )
              }
              className="text-blue-600 hover:underline"
            >
              Quên mật khẩu?
            </button>
          </div>

          {/* Thông báo lỗi */}
          {error && (
            <div
              role="alert"
              className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {/* Chuyển sang trang đăng ký */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}