// src/hooks/useSocket.js
// Dung chung cho Kanban (co projectId) va chuong thong bao (khong can projectId)
//   useSocket({ projectId, onTaskUpdated, onNotification })
// - Tu ket noi khi co token, ngat khi dang xuat
// - Tu vao lai room project sau khi mat ket noi roi noi lai
import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { socket, connectSocket, disconnectSocket } from "../services/socket";

export default function useSocket({ projectId, onTaskUpdated, onNotification } = {}) {
  const { token } = useAuth();

  // Luon goi ban moi nhat cua callback, tranh loi du lieu cu (stale closure)
  const taskRef = useRef(onTaskUpdated);
  const notiRef = useRef(onNotification);
  useEffect(() => {
    taskRef.current = onTaskUpdated;
    notiRef.current = onNotification;
  });

  useEffect(() => {
    if (!token) {
      disconnectSocket();
      return;
    }
    connectSocket(token);

    const handleTask = (task) => taskRef.current?.(task);
    const handleNoti = (noti) => notiRef.current?.(noti);
    const joinProject = () => {
      if (projectId) socket.emit("join_project", projectId, (res) => {
        if (res && !res.ok) console.warn("join_project that bai:", res.message);
      });
    };

    socket.on("task_updated", handleTask);
    socket.on("notification_new", handleNoti);
    socket.on("connect", joinProject); // chay lai khi reconnect
    if (socket.connected) joinProject();

    return () => {
      socket.off("task_updated", handleTask); // chi go dung ham cua minh, khong go cua noi khac
      socket.off("notification_new", handleNoti);
      socket.off("connect", joinProject);
      if (projectId) socket.emit("leave_project", projectId);
    };
  }, [token, projectId]);
}
