import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";

const menuItems = [
  {
    name: "Tổng quan",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Dự án",
    path: "/projects",
    icon: FolderKanban,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-gray-100 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Zap size={23} />
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-900">
            TaskFlow
          </h1>
          <p className="text-xs text-gray-500">
            Quản lý công việc
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Menu chính
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

        <div className="pt-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Khác
          </p>

          <NavLink
            to="/my-tasks"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <CheckSquare size={20} />
            <span>Công việc của tôi</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <Settings size={20} />
            <span>Cài đặt</span>
          </NavLink>
        </div>
      </nav>

      {/* Tài khoản */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3 rounded-xl p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
            U
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-800">
              Người dùng
            </p>
            <p className="text-xs text-gray-500">
              Thành viên
            </p>
          </div>

          <button
            type="button"
            title="Đăng xuất"
            className="text-gray-400 transition hover:text-red-500"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}