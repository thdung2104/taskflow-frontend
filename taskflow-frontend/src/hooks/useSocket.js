// Vào room project khi mở Kanban, lắng nghe task_updated / notification_new.
import { useEffect } from 'react';
import { socket } from '../services/socket';

export default function useSocket({ projectId, userId, onTaskUpdated, onNotification }) {
  useEffect(() => {
    socket.connect();
    if (projectId) socket.emit('join_project', projectId);
    if (userId) socket.emit('join_user', userId);
    if (onTaskUpdated) socket.on('task_updated', onTaskUpdated);
    if (onNotification) socket.on('notification_new', onNotification);
    return () => {
      if (projectId) socket.emit('leave_project', projectId);
      socket.off('task_updated');
      socket.off('notification_new');
      socket.disconnect();
    };
  }, [projectId, userId]); // eslint-disable-line react-hooks/exhaustive-deps
}
