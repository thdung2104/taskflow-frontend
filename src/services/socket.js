// src/services/socket.js
// Ket noi Socket.io toi backend (sockets/taskSocket.js). Backend BAT BUOC co JWT trong handshake.
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const socket = io(SOCKET_URL, { autoConnect: false });

// Goi sau khi dang nhap: gan token roi moi connect (tu dong reconnect cung dung token nay)
export function connectSocket(token) {
  socket.auth = { token };
  if (!socket.connected) socket.connect();
}

export function disconnectSocket() {
  socket.disconnect();
}
