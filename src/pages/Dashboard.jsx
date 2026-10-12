import {
  FolderKanban,
  CheckCircle2,
  Clock,
  ListTodo,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

const stats = [
  {
    title: "Tổng dự án",
    value: "8",
    description: "Dự án đang quản lý",
    icon: FolderKanban,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Công việc",
    value: "24",
    description: "Tổng công việc",
    icon: ListTodo,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Đã hoàn thành",
    value: "16",
    description: "Công việc hoàn tất",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Đang thực hiện",
    value: "8",
    description: "Công việc cần xử lý",
    icon: Clock,
    color: "bg-orange-100 text-orange-600",
  },
];

const tasks = [
  {
    title: "Thiết kế giao diện đăng nhập",
    project: "TaskFlow",
    priority: "Cao",
    status: "Đang thực hiện",
    color: "text-orange-600 bg-orange-50",
    date: "30/09/2026",
  },
  {
    title: "Xây dựng trang Dashboard",
    project: "TaskFlow",
    priority: "Trung bình",
    status: "Đang thực hiện",
    color: "text-blue-600 bg-blue-50",
    date: "02/10/2026",
  },
  {
    title: "Hoàn thiện tài liệu dự án",
    project: "TaskFlow",
    priority: "Thấp",
    status: "Hoàn thành",
    color: "text-green-600 bg-green-50",
    date: "28/09/2026",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Tiêu đề */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Tổng quan
          </h1>

          <p className="mt-2 text-gray-500">
            Chào mừng bạn quay lại với TaskFlow!
          </p>
        </div>
      </div>

      {/* Các thẻ thống kê */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon size={24} />
                </div>

                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-700"
                  aria-label="Xem thêm"
                >
                  <MoreHorizontal size={22} />
                </button>
              </div>

              <p className="mt-5 text-sm text-gray-500">
                {item.title}
              </p>

              <h2 className="mt-1 text-3xl font-bold text-gray-900">
                {item.value}
              </h2>

              <p className="mt-2 text-xs text-gray-400">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tiến độ và công việc */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Tiến độ dự án */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Tiến độ công việc
            </h2>

            <ArrowUpRight size={20} className="text-gray-400" />
          </div>

          <div className="mt-8 flex items-center justify-center">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[14px] border-blue-100">
              <div className="absolute inset-[-14px] rounded-full border-[14px] border-transparent border-t-blue-600 border-r-blue-600 border-b-blue-600 rotate-[-35deg]" />

              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900">
                  67%
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Hoàn thành
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-600">
                <span className="h-3 w-3 rounded-full bg-blue-600" />
                Đã hoàn thành
              </span>

              <span className="font-medium text-gray-900">
                16 công việc
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-600">
                <span className="h-3 w-3 rounded-full bg-blue-100" />
                Chưa hoàn thành
              </span>

              <span className="font-medium text-gray-900">
                8 công việc
              </span>
            </div>
          </div>
        </div>

        {/* Danh sách công việc */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Công việc gần đây
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Theo dõi những công việc mới nhất
              </p>
            </div>

            <button
              type="button"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Xem tất cả
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {tasks.map((task) => (
              <div
                key={task.title}
                className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className={
                      task.status === "Hoàn thành"
                        ? "mt-1 text-green-500"
                        : "mt-1 text-gray-300"
                    }
                  />

                  <div>
                    <h3 className="font-medium text-gray-800">
                      {task.title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Dự án: {task.project}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      Hạn: {task.date}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${task.color}`}
                  >
                    {task.priority}
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}