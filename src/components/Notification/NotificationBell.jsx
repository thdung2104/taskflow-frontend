// src/components/Notification/NotificationBell.jsx
// Chuong thong bao: tai danh sach bang API, nhay so realtime khi co notification_new
import { useCallback, useEffect, useState } from "react";
import { Bell } from "lucide-react";
import useSocket from "../../hooks/useSocket";
import { getNotifications, markAsRead, markAllAsRead } from "../../services/notificationService";

export default function NotificationBell() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await getNotifications({ limit: 30 });
      setItems(res.data);
    } catch (err) {
      console.error("Khong tai duoc thong bao:", err);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Thong bao moi tu server: dua len dau danh sach
  useSocket({
    onNotification: (noti) =>
      setItems((prev) => (prev.some((n) => n.id === noti.id) ? prev : [noti, ...prev])),
  });

  const unread = items.filter((n) => !n.is_read).length;

  const handleRead = async (n) => {
    if (n.is_read) return;
    setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, is_read: true } : x)));
    try {
      await markAsRead(n.id);
    } catch {
      load(); // loi thi tai lai de dong bo
    }
  };

  const handleReadAll = async () => {
    setItems((prev) => prev.map((x) => ({ ...x, is_read: true })));
    try {
      await markAllAsRead();
    } catch {
      load();
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
        aria-label="Thong bao"
      >
        <Bell size={20} />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <>
          {/* Bam ra ngoai de dong */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-80 rounded-xl border border-gray-200 bg-white shadow-lg">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <span className="text-sm font-semibold text-gray-800">Thong bao</span>
              {unread > 0 && (
                <button type="button" onClick={handleReadAll} className="text-xs text-blue-600 hover:underline">
                  Danh dau tat ca da doc
                </button>
              )}
            </div>

            <ul className="max-h-96 overflow-y-auto">
              {items.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-gray-500">Chua co thong bao</li>
              )}
              {items.map((n) => (
                <li
                  key={n.id}
                  onClick={() => handleRead(n)}
                  className={`cursor-pointer border-b border-gray-50 px-4 py-3 text-sm hover:bg-gray-50 ${
                    n.is_read ? "text-gray-500" : "bg-blue-50/60 font-medium text-gray-800"
                  }`}
                >
                  <p>{n.content}</p>
                  <p className="mt-1 text-xs font-normal text-gray-400">
                    {new Date(n.created_at).toLocaleString("vi-VN")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
