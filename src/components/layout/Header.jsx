// src/components/layout/Header.jsx
// Ban Header co chuong thong bao + ten nguoi dung that tu AuthContext
import { useLocation } from "react-router-dom";
import { UserRound } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import NotificationBell from "../Notification/NotificationBell";

const pageNames = {
  "/dashboard": "Tổng quan",
  "/projects": "Dự án",
};

export default function Header() {
  const location = useLocation();
  const { user, token } = useAuth();

  const getPageName = () => {
    if (pageNames[location.pathname]) return pageNames[location.pathname];
    if (location.pathname.includes("/kanban")) return "Bảng công việc";
    return "Không gian làm việc";
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
      <div>
        <p className="text-sm text-gray-500">TaskFlow / Không gian làm việc</p>
        <h1 className="text-lg font-semibold text-gray-800">{getPageName()}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Chi hien chuong khi da dang nhap (can token de goi API va ket noi socket) */}
        {token && <NotificationBell />}

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <UserRound size={19} />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-800">{user?.full_name || "Thành viên"}</p>
            <p className="text-xs text-gray-500">{user?.email || "TaskFlow"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
