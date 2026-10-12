import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar bên trái */}
      <Sidebar />

      {/* Khu vực nội dung bên phải */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="min-w-0 flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}