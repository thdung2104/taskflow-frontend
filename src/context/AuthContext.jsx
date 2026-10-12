import {
  createContext,
  useContext,
  useState,
} from "react";

import authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [loading, setLoading] = useState(false);

  // Đăng nhập
  const login = async (email, password) => {
    setLoading(true);

    try {
      const data = await authService.login({
        email,
        password,
      });

      const newToken = data.token;
      const newUser = data.user;

      if (!newToken || !newUser) {
        throw new Error(
          "Dữ liệu đăng nhập từ máy chủ không hợp lệ."
        );
      }

      localStorage.setItem("token", newToken);
      localStorage.setItem(
        "user",
        JSON.stringify(newUser)
      );

      setToken(newToken);
      setUser(newUser);

      return data;
    } finally {
      setLoading(false);
    }
  };

  // Đăng ký
  const register = async (full_name, email, password) => {
    setLoading(true);

    try {
      return await authService.register({
        full_name,
        email,
        password,
      });
    } finally {
      setLoading(false);
    }
  };

  // Đăng xuất
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token && user),
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook để các component sử dụng thông tin đăng nhập
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth phải được sử dụng bên trong AuthProvider."
    );
  }

  return context;
}