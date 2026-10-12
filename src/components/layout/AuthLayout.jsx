import axios from "axios";

// Địa chỉ API backend
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Tạo axios instance dùng chung
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Đăng ký tài khoản
const register = async ({ full_name, email, password }) => {
  const response = await api.post("/auth/register", {
    full_name,
    email,
    password,
  });

  return response.data;
};

// Đăng nhập
const login = async ({ email, password }) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

// Lấy thông tin người dùng đang đăng nhập
const getMe = async (token) => {
  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const authService = {
  register,
  login,
  getMe,
};

export default authService;