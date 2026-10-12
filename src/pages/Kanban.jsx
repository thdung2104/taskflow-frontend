import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  closestCorners,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  CalendarDays,
  UserRound,
  Pencil,
  Trash2,
  Search,
  ListTodo,
} from "lucide-react";

const initialTasks = [
  {
    id: 1,
    title: "Thiết kế giao diện đăng nhập",
    description: "Xây dựng giao diện đăng nhập bằng React và Tailwind CSS.",
    status: "todo",
    priority: "Cao",
    assignee: "Công",
    deadline: "30/09/2026",
  },
  {
    id: 2,
    title: "Thiết kế giao diện Dashboard",
    description: "Hiển thị thống kê và các công việc gần đây.",
    status: "progress",
    priority: "Trung bình",
    assignee: "Dũng",
    deadline: "02/10/2026",
  },
  {
    id: 3,
    title: "Xây dựng trang đăng ký",
    description: "Tạo form đăng ký tài khoản người dùng.",
    status: "review",
    priority: "Thấp",
    assignee: "Dũng",
    deadline: "01/10/2026",
  },
  {
    id: 4,
    title: "Khởi tạo dự án React",
    description: "Cài đặt Vite, Tailwind CSS và React Router.",
    status: "done",
    priority: "Cao",
    assignee: "Cử",
    deadline: "28/09/2026",
  },
];

const columns = [
  {
    id: "todo",
    title: "Cần làm",
    color: "bg-gray-400",
    badge: "bg-gray-100 text-gray-600",
  },
  {
    id: "progress",
    title: "Đang làm",
    color: "bg-blue-500",
    badge: "bg-blue-50 text-blue-600",
  },
  {
    id: "review",
    title: "Đang kiểm tra",
    color: "bg-orange-500",
    badge: "bg-orange-50 text-orange-600",
  },
  {
    id: "done",
    title: "Hoàn thành",
    color: "bg-green-500",
    badge: "bg-green-50 text-green-600",
  },
];

const priorityStyles = {
  Cao: "bg-red-50 text-red-600",
  "Trung bình": "bg-orange-50 text-orange-600",
  Thấp: "bg-green-50 text-green-600",
};

const emptyForm = {
  title: "",
  description: "",
  status: "todo",
  priority: "Trung bình",
  assignee: "",
  deadline: "",
};

function DraggableTask({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({ id: String(id) });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.55 : 1,
    cursor: isDragging ? "grabbing" : "grab",
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

function DroppableColumn({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id: String(id) });

  return (
    <div
      ref={setNodeRef}
      className={`min-w-0 rounded-2xl p-4 transition-colors ${
        isOver ? "bg-blue-100 ring-2 ring-blue-400" : "bg-gray-100/80"
      }`}
    >
      {children}
    </div>
  );
}

export default function Kanban() {
  const { id } = useParams();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const completedCount = tasks.filter(
    (task) => task.status === "done"
  ).length;

  function openAddForm(status = "todo") {
    setEditingTask(null);
    setForm({ ...emptyForm, status });
    setShowForm(true);
  }

  function openEditForm(task) {
    setEditingTask(task);
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignee: task.assignee,
      deadline: task.deadline,
    });
    setShowForm(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      alert("Vui lòng nhập tên công việc!");
      return;
    }

    if (editingTask) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...form, title: form.title.trim() }
            : task
        )
      );
    } else {
      const newTask = {
        id: Date.now(),
        ...form,
        title: form.title.trim(),
      };

      setTasks((currentTasks) => [...currentTasks, newTask]);
    }

    setShowForm(false);
    setEditingTask(null);
    setForm(emptyForm);
  }

  function deleteTask(taskId) {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa công việc này?"
    );

    if (!confirmed) return;

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }

  function changeStatus(taskId, newStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const taskId = Number(active.id);
    const newStatus = String(over.id);
    const isValidStatus = columns.some((column) => column.id === newStatus);

    if (!isValidStatus) return;
    changeStatus(taskId, newStatus);
  }

  return (
    <div className="min-h-screen space-y-6">
      {/* Tiêu đề */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <Link
            to="/projects"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Quay lại danh sách dự án
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <ListTodo size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {id === "1" ? "TaskFlow" : `Dự án #${id}`}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Bảng quản lý công việc Kanban
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => openAddForm()}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={19} />
          Thêm công việc
        </button>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {columns.map((column) => {
          const count = tasks.filter(
            (task) => task.status === column.id
          ).length;

          return (
            <div
              key={column.id}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${column.color}`} />
                <p className="text-sm text-gray-500">{column.title}</p>
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-900">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Thanh tìm kiếm */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tìm kiếm công việc..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <p className="text-sm text-gray-500">
          {completedCount}/{tasks.length} công việc hoàn thành
        </p>
      </div>

      {/* Bảng Kanban */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 2xl:grid-cols-4">
          {columns.map((column) => {
            const columnTasks = filteredTasks.filter(
              (task) => task.status === column.id
            );

            return (
              <DroppableColumn key={column.id} id={column.id}>
                {/* Tên cột */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-full ${column.color}`} />
                    <h2 className="font-semibold text-gray-800">
                      {column.title}
                    </h2>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${column.badge}`}
                    >
                      {columnTasks.length}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => openAddForm(column.id)}
                    title="Thêm công việc"
                    className="rounded-lg p-2 text-gray-500 hover:bg-white hover:text-blue-600"
                  >
                    <Plus size={19} />
                  </button>
                </div>

                {/* Các thẻ công việc */}
                <div className="space-y-4">
                  {columnTasks.map((task) => (
                    <DraggableTask key={task.id} id={task.id}>
                      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                        <div className="flex items-start justify-between gap-2">
                          <span
                            className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                              priorityStyles[task.priority] ||
                              priorityStyles["Trung bình"]
                            }`}
                          >
                            {task.priority}
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              title="Sửa công việc"
                              onClick={() => openEditForm(task)}
                              className="rounded-md p-1.5 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Pencil size={15} />
                            </button>

                            <button
                              type="button"
                              title="Xóa công việc"
                              onClick={() => deleteTask(task.id)}
                              className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        <h3 className="mt-3 font-semibold leading-6 text-gray-800">
                          {task.title}
                        </h3>

                        {task.description && (
                          <p className="mt-2 text-sm leading-5 text-gray-500">
                            {task.description}
                          </p>
                        )}

                        <div className="mt-4 space-y-3 border-t border-gray-100 pt-3">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <UserRound size={15} />
                            {task.assignee || "Chưa phân công"}
                          </div>

                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <CalendarDays size={15} />
                            {task.deadline || "Chưa có hạn"}
                          </div>
                        </div>

                        {/* Chuyển trạng thái */}
                        <div className="mt-4">
                          <label
                            htmlFor={`status-${task.id}`}
                            className="mb-1.5 block text-xs text-gray-500"
                          >
                            Trạng thái
                          </label>
                          <select
                            id={`status-${task.id}`}
                            value={task.status}
                            onChange={(event) =>
                              changeStatus(task.id, event.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500"
                          >
                            {columns.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.title}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </DraggableTask>
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white/60 px-4 py-8 text-center">
                      <p className="text-sm text-gray-400">Chưa có công việc</p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => openAddForm(column.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-sm text-gray-500 transition hover:border-blue-400 hover:bg-white hover:text-blue-600"
                  >
                    <Plus size={17} />
                    Thêm công việc
                  </button>
                </div>
              </DroppableColumn>
            );
          })}
        </div>
      </DndContext>

      {/* Form thêm / sửa công việc */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingTask ? "Chỉnh sửa công việc" : "Thêm công việc mới"}
              </h2>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Tên công việc *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      title: event.target.value,
                    })
                  }
                  placeholder="Nhập tên công việc"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Mô tả
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description: event.target.value,
                    })
                  }
                  placeholder="Mô tả công việc..."
                  className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Trạng thái
                  </label>
                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        status: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    {columns.map((column) => (
                      <option key={column.id} value={column.id}>
                        {column.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Mức độ ưu tiên
                  </label>
                  <select
                    value={form.priority}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        priority: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="Cao">Cao</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Thấp">Thấp</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Người phụ trách
                  </label>
                  <input
                    type="text"
                    value={form.assignee}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        assignee: event.target.value,
                      })
                    }
                    placeholder="Tên thành viên"
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Hạn hoàn thành
                  </label>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        deadline: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  {editingTask ? "Lưu thay đổi" : "Tạo công việc"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}