// ↔ backend routes/authRoutes.js  (/api/auth)
import api from './api';
export const register = (data) => api.post('/auth/register', data); // { full_name, email, password }
export const login = (data) => api.post('/auth/login', data);       // { email, password } -> { token, user }
export const getMe = () => api.get('/auth/me');
