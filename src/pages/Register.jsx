import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Kiểm tra các trường thông tin
    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Vui lòng điền thông tin.");
      return;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setError("Vui lòng nhập email hợp lệ.");
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      await register(
        fullName.trim(),
        email.trim(),
        password
      );

      navigate("/login", {
        replace: true,
        state: {
          message: "Đăng ký thành công. Vui lòng đăng nhập.",
        },
      });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        (err.code === "ERR_NETWORK"
          ? "Không thể kết nối đến máy chủ. Vui lòng thử lại sau."
          : err.message) ||
        "Đăng ký thất bại. Vui lòng thử lại.";

      setError(message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Logo và tiêu đề */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-600">
            TaskFlow
          </h1>

          <p className="mt-2 text-gray-500">
            Tạo tài khoản để bắt đầu quản lý công việc
          </p>
        </div>

        {/* Form đăng ký */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
        >
          {/* Họ và tên */}
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Họ và tên
            </label>

            <input
              id="fullName"
              type="text"
              placeholder="Nhập họ và tên"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setError("");
              }}
              autoComplete="name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Email */}
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
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Mật khẩu */}
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
              placeholder="Tạo mật khẩu"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Xác nhận mật khẩu */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Xác nhận mật khẩu
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
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

          {/* Nút đăng ký */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Đang đăng ký..." : "Tạo tài khoản"}
          </button>
        </form>

        {/* Chuyển sang đăng nhập */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}