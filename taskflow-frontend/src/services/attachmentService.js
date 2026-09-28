// ↔ backend routes/attachmentRoutes.js (/api/attachments) — upload dạng multipart/form-data
import api from './api';
export const uploadAttachment = (taskId, file) => {
  const form = new FormData();
  form.append('task_id', taskId);
  form.append('file', file);
  return api.post('/attachments', form);
};
export const getAttachments = (taskId) => api.get('/attachments', { params: { task_id: taskId } });
export const deleteAttachment = (id) => api.delete(`/attachments/${id}`);
