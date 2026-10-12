import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  CalendarDays,
  UserRound,
  ArrowUpRight,
  ListTodo,
  CheckCircle2,
  Clock3,
  CircleDashed,
} from "lucide-react";

const sampleTasks = [
  {
    id: 1,
    title: "Thiết kế giao diện đăng nhập",
    description: "Xây dựng giao diện đăng nhập bằng React và Tailwind CSS.",
    status: "todo",
    priority: "Cao",
    assignee: "Công",
    deadline: "2026-09-30",
    projectId: 1,
    projectName: "TaskFlow",
  },
  {
    id: 2,
    title: "Thiết kế giao diện Dashboard",
    description: "Hiển thị thống kê và các công việc gần đây.",
    status: "progress",
    priority: "Trung bình",
    assignee: "Dũng",
    deadline: "2026-10-02",
    projectId: 1,
    projectName: "TaskFlow",
  },
  {
    id: 3,
    title: "Xây dựng trang đăng ký",
    description: "Tạo form đăng ký tài khoản người dùng.",
    status: "review",
    priority: "Thấp",
    assignee: "Dũng",
    deadline: "2026-10-01",
    projectId: 1,
    projectName: "TaskFlow",
  },
  {
    id: 4,
    title: "Khởi tạo dự án React",
    description: "Cài đặt Vite, Tailwind CSS và React Router.",
    status: "done",
    priority: "Cao",
    assignee: "Cử",
    deadline: "2026-09-28",
    projectId: 1,
    projectName: "TaskFlow",
  },
];

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "todo", label: "Cần làm" },
  { value: "progress", label: "Đang làm" },
  { value: "review", label: "Đang kiểm tra" },
  { value: "done", label: "Hoàn thành" },
];

const statusInfo = {
  todo: { label: "Cần làm", className: "bg-gray-100 text-gray-700" },
  progress: { label: "Đang làm", className: "bg-blue-100 text-blue-700" },
  review: { label: "Đang kiểm tra", className: "bg-orange-100 text-orange-700" },
  done: { label: "Hoàn thành", className: "bg-green-100 text-green-700" },
};

const priorityInfo = {
  Cao: "bg-red-100 text-red-700",
  "Trung bình": "bg-orange-100 text-orange-700",
  Thấp: "bg-green-100 text-green-700",
};

function formatDate(dateString) {
  if (!dateString) return "Chưa có hạn";
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("vi-VN");
}

export default function MyTasks() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Dữ liệu mẫu để dựng giao diện; sẽ kết nối dữ liệu thật khi có Backend.
  const tasks = sampleTasks;

  const filteredTasks = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(keyword) ||
        task.projectName.toLowerCase().includes(keyword) ||
        task.description.toLowerCase().includes(keyword);
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, search, statusFilter]);

  const completedCount = tasks.filter((task) => task.status === "done").length;
  const inProgressCount = tasks.filter((task) => task.status === "progress").length;
  const todoCount = tasks.filter((task) => task.status === "todo").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Công việc của tôi</h1>
        <p className="mt-2 text-gray-500">
          Theo dõi các công việc được giao và tiến độ thực hiện của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3 text-gray-500">
            <ListTodo size={20} />
            <span className="text-sm">Tổng công việc</span>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">{tasks.length}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3 text-gray-500">
            <CircleDashed size={20} />
            <span className="text-sm">Cần làm</span>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">{todoCount}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3 text-gray-500">
            <Clock3 size={20} />
            <span className="text-sm">Đang làm</span>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">{inProgressCount}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3 text-gray-500">
            <CheckCircle2 size={20} />
            <span className="text-sm">Hoàn thành</span>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">{completedCount}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên công việc hoặc dự án..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            aria-label="Lọc theo trạng thái"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-gray-900">Danh sách công việc</h2>
          <span className="text-sm text-gray-500">{filteredTasks.length} công việc</span>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-gray-500">
            Không tìm thấy công việc phù hợp.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredTasks.map((task) => {
              const status = statusInfo[task.status] || statusInfo.todo;
              return (
                <div
                  key={task.id}
                  className="flex flex-col gap-4 px-5 py-5 transition hover:bg-gray-50 md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}>
                        {status.label}
                      </span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityInfo[task.priority] || priorityInfo["Trung bình"]}`}>
                        Ưu tiên: {task.priority}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{task.description}</p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <ListTodo size={14} />
                        {task.projectName}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <UserRound size={14} />
                        Phụ trách: {task.assignee || "Chưa phân công"}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        Hạn: {formatDate(task.deadline)}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/projects/${task.projectId}/kanban`}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Mở dự án <ArrowUpRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <p className="text-xs text-gray-400">
       
      </p>
    </div>
  );
}
