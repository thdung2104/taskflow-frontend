import { useState } from "react";
import { User, Lock, Bell,Save } from "lucide-react";

export default function Settings() {
  // State lưu thông tin cài đặt cơ bản trên giao diện
  const [formData, setFormData] = useState({
    name: "User",
    email: "user@gmail.com",
    currentPassword: "",
    newPassword: "",
    emailNotification: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sau này khi có Backend, bạn sẽ gọi API ở đây để lưu dữ liệu
    alert("Đã lưu thay đổi thành công! (Dữ liệu mẫu trên giao diện)");
  };

  return (
    <div className="flex-1 bg-gray-50 p-8">
      {/* Tiêu đề trang */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
        <p className="text-sm text-gray-500">
          Quản lý thông tin tài khoản và tùy chỉnh giao diện của bạn.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        {/* Phần 1: Thông tin tài khoản */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Thông tin cá nhân</h2>
              <p className="text-xs text-gray-500">Cập nhật tên hiển thị và email của bạn</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Phần 2: Đổi mật khẩu */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <Lock size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Bảo mật</h2>
              <p className="text-xs text-gray-500">Thay đổi mật khẩu đăng nhập của tài khoản</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu hiện tại
              </label>
              <input
                type="password"
                name="currentPassword"
                placeholder="••••••••"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu mới
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="••••••••"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Phần 3: Tùy chỉnh & Thông báo */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Bell size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Tùy chọn hệ thống</h2>
              <p className="text-xs text-gray-500">Quản lý thông báo và hiển thị</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-gray-700">Nhận thông báo qua Email</span>
              <input
                type="checkbox"
                name="emailNotification"
                checked={formData.emailNotification}
                onChange={handleChange}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Nút lưu thay đổi */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 shadow-sm"
          >
            <Save size={18} />
            <span>Lưu thay đổi</span>
          </button>
        </div>
      </form>
    </div>
  );
}