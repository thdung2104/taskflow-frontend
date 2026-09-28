// Dữ liệu giả đúng cấu trúc GET /api/tasks?project_id= — dùng khi backend chưa xong.
export const mockTasks = [
  { id: 1, project_id: 1, title: 'Thiết kế ERD & tạo database', priority: 'high', status: 'done', due_date: '2026-10-05', assignee_id: 1 },
  { id: 2, project_id: 1, title: 'Viết API đăng ký/đăng nhập', priority: 'high', status: 'in_progress', due_date: '2026-10-10', assignee_id: 1 },
  { id: 3, project_id: 1, title: 'Xây dựng giao diện Kanban board', priority: 'medium', status: 'in_progress', due_date: '2026-10-12', assignee_id: 2 },
  { id: 4, project_id: 1, title: 'Tích hợp Socket.io', priority: 'medium', status: 'todo', due_date: '2026-10-15', assignee_id: 3 },
];
