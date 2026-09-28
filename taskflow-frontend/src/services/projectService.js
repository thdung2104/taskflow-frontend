// ↔ backend routes/projectRoutes.js (/api/projects) — gồm thành viên + thống kê Dashboard
import api from './api';
export const createProject = (data) => api.post('/projects', data);            // { name, description? }
export const getMyProjects = () => api.get('/projects');
export const getProject = (id) => api.get(`/projects/${id}`);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);
export const addMember = (id, email) => api.post(`/projects/${id}/members`, { email });
export const getMembers = (id) => api.get(`/projects/${id}/members`);
export const removeMember = (id, userId) => api.delete(`/projects/${id}/members/${userId}`);
export const getOverviewStats = (id) => api.get(`/projects/${id}/stats/overview`);
export const getStatsByStatus = (id) => api.get(`/projects/${id}/stats/by-status`);
export const getStatsByAssignee = (id) => api.get(`/projects/${id}/stats/by-assignee`);
