// ↔ backend routes/taskRoutes.js (/api/tasks)
import api from './api';
export const createTask = (data) => api.post('/tasks', data); // { project_id, title, ... }
export const getTasks = (params) => api.get('/tasks', { params }); // { project_id, status?, assignee?, tag?, search? }
export const getTask = (id) => api.get(`/tasks/${id}`);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const updateTaskStatus = (id, status) => api.patch(`/tasks/${id}/status`, { status }); // gọi khi kéo-thả
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
export const getHealthScore = (id) => api.get(`/tasks/${id}/health-score`);
export const getTaskActivity = (id) => api.get(`/tasks/${id}/activity`);
