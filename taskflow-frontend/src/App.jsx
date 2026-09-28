// Định tuyến toàn app. Trang cần đăng nhập được bọc bởi <ProtectedRoute>.
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProjectListPage from './pages/ProjectListPage';
import KanbanPage from './pages/KanbanPage';
import DashboardPage from './pages/DashboardPage';

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<ProtectedRoute><ProjectListPage /></ProtectedRoute>} />
      <Route path="/projects/:projectId" element={<ProtectedRoute><KanbanPage /></ProtectedRoute>} />
      <Route path="/projects/:projectId/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
