# PROJECT_STATE — taskflow-frontend
> File DUY NHẤT cần đính kèm khi mở chat Claude mới (+ file sắp sửa). Cập nhật cuối mỗi phase rồi commit cùng code.
> Cập nhật lần cuối: 2026-09-28 · Phase hiện tại: 1 (Tuần 1–2)

## 1. Dự án
TaskFlow: web quản lý công việc Kanban (đồ án TTCS PTIT). Repo Frontend của 🟩 Công. Backend ở repo `taskflow-backend` (Dũng, Cử).
Stack: React 18 + Vite, Tailwind v4, React Router 6, Axios, dnd-kit, Chart.js (react-chartjs-2), socket.io-client.

## 2. Quyết định đã chốt
1. URL/tham số/response: `docs/API_CONTRACT.md` (bản sao; Dũng đổi API thì báo Công copy lại).
2. URL API phẳng (`/tasks?project_id=`); lỗi backend trả `{ message }`; trường snake_case.
3. Token JWT trong localStorage, tự gắn header ở `services/api.js`; 401 → về `/login`.
4. Component KHÔNG gọi axios trực tiếp — chỉ qua `src/services/*`.
5. Socket: `join_project` (vào Kanban) · `join_user` · nghe `task_updated`, `notification_new` (hook `useSocket`).
6. Task status `todo|in_progress|done` ↔ 3 cột Kanban. Priority `low|medium|high`.
7. Chưa có API thật → dùng `src/mocks/` đúng cấu trúc contract.

## 3. Vùng file
Công sửa toàn bộ repo này. Không sửa repo backend; cần API mới/đổi response → ghi chú yêu cầu gửi Dũng.

## 4. Trạng thái UI (⬜ chưa · 🟨 đang · ✅ xong)
| Phần | TT | Ghi chú |
|---|---|---|
| Khung dự án, routing, AuthContext, services/ | ✅ | Có sẵn trong skeleton |
| Login / Register | ⬜ | Tuần 2 (cần API auth) |
| Layout Sidebar + Header | ⬜ | Tuần 2 |
| Project list + mời thành viên | ⬜ | Tuần 3 |
| Kanban kéo-thả (dnd-kit) | ⬜ | Tuần 3 |
| Task detail (comment, đính kèm, activity) | ⬜ | Tuần 4 |
| Dashboard + Chart.js | ⬜ | Tuần 5 |
| Notification bell + realtime | ⬜ | Tuần 5 |

## 5. Nhật ký phase
- Phase 0 (2026-09-28): skeleton, services đã map đủ API, placeholder pages/components. `npm run build` OK.

## 6. Việc tiếp theo (dán 1 mục vào prompt)
- Dựng LoginPage + RegisterPage (form, validate, gọi authService, lưu AuthContext, chuyển trang).
- Dựng layout Sidebar + Header.
- Wireframe mô tả văn bản 5 màn hình để vẽ Figma.

## 7. Bẫy đã biết
- Tailwind v4: `@import "tailwindcss";` trong index.css, không cần tailwind.config.js.
- Backend tới Tuần 2 mới có API auth; trước đó chỉ `GET /api/health` chạy được.
