// ↔ backend routes/commentRoutes.js (/api/comments)
import api from './api';
export const createComment = (taskId, content) => api.post('/comments', { task_id: taskId, content });
export const getComments = (taskId) => api.get('/comments', { params: { task_id: taskId } });
export const deleteComment = (id) => api.delete(`/comments/${id}`);
