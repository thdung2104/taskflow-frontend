import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Settings from "./pages/Settings";
import MyTasks from "./pages/MyTasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectList from "./pages/ProjectList";
import Kanban from "./pages/Kanban";

import MainLayout from "./components/layout/MainLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang đăng nhập và đăng ký */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Các trang chính của TaskFlow */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:id/kanban" element={<Kanban />} />
          <Route path="/my-tasks" element={<MyTasks />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Trang mặc định */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Đường dẫn không tồn tại */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}