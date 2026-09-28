// ↔ backend sockets/taskSocket.js (Socket.io). Sự kiện: join_project, task_updated, notification_new
import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', { autoConnect: false });
