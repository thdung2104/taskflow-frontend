# TaskFlow Frontend

Đọc `PROJECT_STATE.md` để biết dự án đang ở đâu. API: `docs/API_CONTRACT.md` (bản sao từ repo backend).

```
src/
├── services/    # MỖI FILE = 1 NHÓM API backend (api.js = axios + token; socket.js = Socket.io)
├── context/     # AuthContext — token + user
├── pages/       # Login, Register, ProjectList, Kanban, Dashboard
├── components/  # layout/ Kanban/ Task/ Dashboard/ Notification/
├── hooks/       # useSocket
└── mocks/       # dữ liệu giả khi backend chưa xong
```
Chạy: `npm install` → `copy .env.example .env` → `npm run dev` (http://localhost:5173)
