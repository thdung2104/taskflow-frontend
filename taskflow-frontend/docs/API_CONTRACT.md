# API CONTRACT (v0)
> Nguồn sự thật duy nhất cho URL/tham số/response. Dũng giữ file này; Công & Cử chỉ đọc. Đổi API → Dũng cập nhật + báo nhóm. Frontend giữ 1 bản sao ở `docs/API_CONTRACT.md`.

**Quy ước chung**
- Base URL: `/api` (dev: `http://localhost:5000/api`). API có 🔒 cần header `Authorization: Bearer <token>`.
- URL dạng **phẳng**: id của cha đi qua query/body (`/tasks?project_id=`, body `{ project_id }`), không dùng dạng lồng `/projects/:id/tasks`.
- Thành công: trả thẳng object/mảng JSON. **Lỗi luôn là `{ "message": "..." }`** kèm mã 400 (sai dữ liệu) · 401 (chưa đăng nhập) · 403 (không đủ quyền/token sai) · 404 (không thấy) · 500 (lỗi server).
- Tên trường **snake_case** trùng tên cột DB. Trạng thái task: `todo` | `in_progress` | `done`. Ưu tiên: `low` | `medium` | `high`.
- Ký hiệu: ⚡ phát Socket.io · 🔔 tạo Notification · 👑 chỉ owner của project.

### 5.1. Auth — Xác thực (`authRoutes.js` → `authController.js`)
| Method | Endpoint | Body / Query | Trả về | Mục đích trong dự án |
|---|---|---|---|---|
| POST | `/auth/register` | body: `full_name`, `email`, `password` | 201 → `{ id, full_name, email, role }` | Tạo tài khoản mới |
| POST | `/auth/login` | body: `email`, `password` | 200 → `{ token, user }` | Đăng nhập; token dùng cho mọi API 🔒 |
| GET 🔒 | `/auth/me` | — | user | Hiển thị tên/avatar trên header |

### 5.2. Users — Người dùng (`userRoutes.js` → `userController.js`)
| Method | Endpoint | Body / Query | Trả về | Mục đích |
|---|---|---|---|---|
| GET 🔒 | `/users/:id` | — | `{ id, full_name, email, avatar_url }` | Xem thông tin 1 user (hover avatar) |
| PUT 🔒 | `/users/me` | body: `full_name?`, `avatar_url?` | user | Cập nhật hồ sơ cá nhân |

### 5.3. Projects & Members (`projectRoutes.js` → `projectController.js`)
| Method | Endpoint | Body / Query | Trả về | Mục đích |
|---|---|---|---|---|
| POST 🔒 | `/projects` | body: `name`, `description?` | 201 → project | Tạo project; người tạo tự thành `owner` |
| GET 🔒 | `/projects` | — | `[project]` | Project mà user tham gia — sidebar |
| GET 🔒 | `/projects/:id` | — | project + `members[]` | Chi tiết project |
| PUT 🔒 👑 | `/projects/:id` | body: `name?`, `description?` | project | Sửa project |
| DELETE 🔒 👑 | `/projects/:id` | — | `{ message }` | Xoá project (CASCADE task, member, tag) |
| POST 🔒 👑 | `/projects/:id/members` | body: `email` | 201 → member | Mời thành viên qua email |
| GET 🔒 | `/projects/:id/members` | — | `[{ user_id, full_name, email, role_in_project }]` | Dropdown "gán người phụ trách" |
| DELETE 🔒 👑 | `/projects/:id/members/:userId` | — | `{ message }` | Xoá thành viên |

### 5.4. Dashboard — Thống kê (`projectRoutes.js` → `projectController.js`)
| Method | Endpoint | Trả về | Mục đích |
|---|---|---|---|
| GET 🔒 | `/projects/:id/stats/overview` | `{ total, done, overdue }` | Thẻ số liệu đầu Dashboard |
| GET 🔒 | `/projects/:id/stats/by-status` | `[{ status, count }]` | Biểu đồ tròn/cột (Chart.js) |
| GET 🔒 | `/projects/:id/stats/by-assignee` | `[{ user_id, full_name, count }]` | Biểu đồ khối lượng công việc theo người |

### 5.5. Tasks — Công việc (`taskRoutes.js` → `taskController.js`)
| Method | Endpoint | Body / Query | Trả về | Mục đích |
|---|---|---|---|---|
| POST 🔒 | `/tasks` | body: `project_id`, `title`, `description?`, `priority?`, `due_date?`, `assignee_id?`, `parent_task_id?` | 201 → task ⚡🔔 | Tạo task (🔔 nếu có assignee) |
| GET 🔒 | `/tasks` | query: `project_id` (bắt buộc), `status?`, `assignee?`, `tag?`, `search?` | `[task]` | Đổ dữ liệu lên Kanban + tìm kiếm/lọc |
| GET 🔒 | `/tasks/:id` | — | task + `comments[]`, `attachments[]`, `subtasks[]`, `tags[]` | Modal chi tiết task |
| PUT 🔒 | `/tasks/:id` | body: các trường cần sửa | task ⚡ | Sửa thông tin task |
| PATCH 🔒 | `/tasks/:id/status` | body: `status` | task ⚡ | **Kéo-thả Kanban** — ghi ActivityLog + emit `task_updated` |
| DELETE 🔒 | `/tasks/:id` | — | `{ message }` | Xoá task (xoá task con trước) |
| GET 🔒 | `/tasks/:id/health-score` | — | `{ score: 'green'\|'yellow'\|'red', reason }` | Badge 🟢🟡🔴 (tính runtime, không lưu DB) |
| GET 🔒 | `/tasks/:id/activity` | — | `[{ id, user_id, full_name, action, detail, created_at }]` | Tab "Activity" |

### 5.6. Tags (`tagRoutes.js` → `tagController.js`)
| Method | Endpoint | Body / Query | Trả về | Mục đích |
|---|---|---|---|---|
| POST 🔒 | `/tags` | body: `project_id`, `name`, `color?` | 201 → tag | Tạo nhãn |
| GET 🔒 | `/tags` | query: `project_id` | `[tag]` | Bộ lọc + dropdown gắn nhãn |
| POST 🔒 | `/tags/:tagId/assign` | body: `task_id` | `{ message }` | Gắn nhãn vào task |
| DELETE 🔒 | `/tags/:tagId/assign/:taskId` | — | `{ message }` | Gỡ nhãn khỏi task |

### 5.7. Comments (`commentRoutes.js` → `commentController.js`)
| Method | Endpoint | Body / Query | Trả về | Mục đích |
|---|---|---|---|---|
| POST 🔒 | `/comments` | body: `task_id`, `content` | 201 → comment 🔔 | Thêm bình luận, báo assignee |
| GET 🔒 | `/comments` | query: `task_id` | `[{ id, user_id, full_name, content, created_at }]` | Danh sách bình luận |
| DELETE 🔒 | `/comments/:id` | — | `{ message }` | Chỉ người viết được xoá |

### 5.8. Attachments (`attachmentRoutes.js` → `attachmentController.js`)
| Method | Endpoint | Body / Query | Trả về | Mục đích |
|---|---|---|---|---|
| POST 🔒 | `/attachments` | `multipart/form-data`: `task_id`, `file` | 201 → `{ id, file_name, file_url }` | Upload (multer → `uploads/`); tải file qua `GET /uploads/<tên file>` |
| GET 🔒 | `/attachments` | query: `task_id` | `[attachment]` | Danh sách file của task |
| DELETE 🔒 | `/attachments/:id` | — | `{ message }` | Xoá file (cả bản ghi lẫn file trong `uploads/`) |

### 5.9. Notifications — phần của Cử (`notificationRoutes.js` → `notificationController.js`)
| Method | Endpoint | Trả về | Mục đích |
|---|---|---|---|
| GET 🔒 | `/notifications` | `[{ id, type, content, related_task_id, is_read, created_at }]` | Đổ vào chuông thông báo |
| PATCH 🔒 | `/notifications/:id/read` | `{ message }` | Đánh dấu 1 thông báo đã đọc |
| PATCH 🔒 | `/notifications/read-all` | `{ message }` | Đánh dấu tất cả đã đọc |
| *(nội bộ)* | cron `jobs/reminderJob.js` 7:00 | — | Không có URL — quét task sắp đến hạn, tạo Notification `type='digest'` cho từng user |

### 5.10. Socket.io — phần của Cử (`sockets/taskSocket.js` ↔ Frontend `services/socket.js`)
| Sự kiện | Hướng | Payload | Ý nghĩa |
|---|---|---|---|
| `join_project` | Client → Server | `projectId` | Vào room `project_<id>` khi mở Kanban |
| `leave_project` | Client → Server | `projectId` | Rời room khi thoát |
| `join_user` | Client → Server | `userId` | Vào room riêng `user_<id>` để nhận thông báo |
| `task_updated` | Server → Client | task | Task đổi (trạng thái, thông tin, tạo mới) — Kanban tự cập nhật |
| `notification_new` | Server → Client | notification | Có thông báo mới — chuông nhảy số |

### 5.11. Cầu nối Dũng ↔ Cử
Controller của Dũng chỉ **gọi** 2 hàm do Cử sở hữu: `emitToProject(projectId, event, payload)` (`sockets/emitter.js`) và `createNotification({ userId, type, content, relatedTaskId })` (`services/notificationService.js`). Không tự viết logic socket/notification trong controller.

