// ↔ backend routes/tagRoutes.js (/api/tags)
import api from './api';
export const createTag = (data) => api.post('/tags', data); // { project_id, name, color? }
export const getTags = (projectId) => api.get('/tags', { params: { project_id: projectId } });
export const assignTag = (tagId, taskId) => api.post(`/tags/${tagId}/assign`, { task_id: taskId });
export const removeTag = (tagId, taskId) => api.delete(`/tags/${tagId}/assign/${taskId}`);
