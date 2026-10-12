import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, FolderKanban, Users, CalendarDays, MoreHorizontal, ArrowUpRight, X } from "lucide-react";

const initialProjects = [
  { 
    id: 1, 
    name: "TaskFlow", 
    description: "Xây dựng ứng dụng quản lý công việc theo mô hình Kanban.", 
    category: "Phát triển phần mềm", 
    progress: 65, 
    tasks: 20, 
    completedTasks: 13, 
    members: ["C", "A", "M"], 
    deadline: "15/10/2026", 
    color: "bg-blue-100 text-blue-600", 
    barColor: "bg-blue-600" 
  },
  { 
    id: 2, 
    name: "Website bán hàng", 
    description: "Thiết kế và phát triển website thương mại điện tử.", 
    category: "Thiết kế website", 
    progress: 40, 
    tasks: 25, 
    completedTasks: 10, 
    members: ["N", "H", "T"], 
    deadline: "20/10/2026", 
    color: "bg-purple-100 text-purple-600", 
    barColor: "bg-purple-600" 
  },
  { 
    id: 3, 
    name: "Quản lý sinh viên", 
    description: "Xây dựng hệ thống quản lý thông tin sinh viên.", 
    category: "Bài tập nhóm", 
    progress: 80, 
    tasks: 15, 
    completedTasks: 12, 
    members: ["L", "P"], 
    deadline: "10/10/2026", 
    color: "bg-green-100 text-green-600", 
    barColor: "bg-green-600" 
  },
  { 
    id: 4, 
    name: "Ứng dụng ghi chú", 
    description: "Phát triển ứng dụng ghi chú và quản lý công việc cá nhân.", 
    category: "Ứng dụng", 
    progress: 25, 
    tasks: 12, 
    completedTasks: 3, 
    members: ["C", "D"], 
    deadline: "25/10/2026", 
    color: "bg-orange-100 text-orange-600", 
    barColor: "bg-orange-500" 
  },
];

const projectStyles = [
  { color: "bg-blue-100 text-blue-600", barColor: "bg-blue-600" },
  { color: "bg-purple-100 text-purple-600", barColor: "bg-purple-600" },
  { color: "bg-green-100 text-green-600", barColor: "bg-green-600" },
  { color: "bg-orange-100 text-orange-600", barColor: "bg-orange-500" },
];

function formatDate(date) {
  if (!date) return "Chưa đặt hạn";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export default function ProjectList() {
  const [projects, setProjects] = useState(initialProjects);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", category: "", deadline: "" });
  const [error, setError] = useState("");

  const handleCreateProject = (event) => {
    event.preventDefault();
    const name = form.name.trim();

    if (!name) {
      setError("Vui lòng nhập tên dự án.");
      return;
    }
    if (projects.some((project) => project.name.toLowerCase() === name.toLowerCase())) {
      setError("Tên dự án đã tồn tại. Vui lòng chọn tên khác.");
      return;
    }

    const style = projectStyles[projects.length % projectStyles.length];
    const newProject = {
      id: Date.now(),
      name,
      description: form.description.trim() || "Chưa có mô tả cho dự án.",
      category: form.category.trim() || "Dự án mới",
      progress: 0,
      tasks: 0,
      completedTasks: 0,
      members: ["C"],
      deadline: formatDate(form.deadline),
      color: style.color,
      barColor: style.barColor,
    };

    setProjects((current) => [newProject, ...current]);
    setForm({ name: "", description: "", category: "", deadline: "" });
    setError("");
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dự án</h1>
          <p className="mt-2 text-gray-500">Quản lý và theo dõi tiến độ các dự án của bạn.</p>
        </div>
        <button 
          type="button" 
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700" 
          onClick={() => { setError(""); setShowCreateForm(true); }}
        >
          <Plus size={20} /> Tạo dự án
        </button>
      </div>

      {/* Modal Tạo Dự Án */}
      {showCreateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div role="dialog" aria-modal="true" aria-labelledby="create-project-title" className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 id="create-project-title" className="text-xl font-bold text-gray-900">Tạo dự án mới</h2>
                <p className="mt-1 text-sm text-gray-500">Nhập thông tin cho dự án của bạn.</p>
              </div>
              <button 
                type="button" 
                onClick={() => setShowCreateForm(false)} 
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" 
                aria-label="Đóng form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label htmlFor="project-name" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Tên dự án <span className="text-red-500">*</span>
                </label>
                <input 
                  id="project-name" 
                  autoFocus 
                  required 
                  maxLength={100} 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })} 
                  placeholder="Ví dụ: Website quản lý bán hàng" 
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                />
              </div>

              <div>
                <label htmlFor="project-category" className="mb-1.5 block text-sm font-medium text-gray-700">Loại dự án</label>
                <input 
                  id="project-category" 
                  maxLength={80} 
                  value={form.category} 
                  onChange={(e) => setForm({ ...form, category: e.target.value })} 
                  placeholder="Ví dụ: Bài tập nhóm" 
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                />
              </div>

              <div>
                <label htmlFor="project-description" className="mb-1.5 block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea 
                  id="project-description" 
                  rows={3} 
                  maxLength={500} 
                  value={form.description} 
                  onChange={(e) => setForm({ ...form, description: e.target.value })} 
                  placeholder="Mô tả ngắn về dự án..." 
                  className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                />
              </div>

              <div>
                <label htmlFor="project-deadline" className="mb-1.5 block text-sm font-medium text-gray-700">Hạn hoàn thành</label>
                <input 
                  id="project-deadline" 
                  type="date" 
                  value={form.deadline} 
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })} 
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                />
              </div>

              {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button 
                  type="button" 
                  onClick={() => { setShowCreateForm(false); setError(""); }} 
                  className="rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                  <Plus size={18} /> Tạo dự án
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600"><FolderKanban size={22} /></div>
            <p className="text-sm text-gray-500">Tổng số dự án</p>
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-900">{projects.length}</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-100 p-3 text-green-600"><Users size={22} /></div>
            <p className="text-sm text-gray-500">Tổng công việc</p>
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-900">
            {projects.reduce((sum, project) => sum + project.tasks, 0)}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-100 p-3 text-purple-600"><FolderKanban size={22} /></div>
            <p className="text-sm text-gray-500">Công việc hoàn thành</p>
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-900">
            {projects.reduce((sum, project) => sum + project.completedTasks, 0)}
          </p>
        </div>
      </div>

      {/* Danh sách dự án */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Tất cả dự án</h2>
          <span className="text-sm text-gray-500">{projects.length} dự án</span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <div key={project.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${project.color}`}>
                    <FolderKanban size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <p className="mt-1 text-xs text-gray-500">{project.category}</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-100" 
                  aria-label={`Tùy chọn ${project.name}`} 
                  onClick={() => alert("Chức năng tùy chọn dự án sẽ được bổ sung sau.")}
                >
                  <MoreHorizontal size={22} />
                </button>
              </div>

              {/* Description */}
              <p className="mt-5 min-h-12 text-sm leading-6 text-gray-500">{project.description}</p>

              {/* Progress */}
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tiến độ</span>
                  <span className="text-sm font-semibold text-gray-900">{project.progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div className={`h-full rounded-full ${project.barColor}`} style={{ width: `${project.progress}%` }} />
                </div>
                <p className="mt-2 text-xs text-gray-400">{project.completedTasks}/{project.tasks} công việc hoàn thành</p>
              </div>

              {/* Footer info: Deadline & Members */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CalendarDays size={15} /> Hạn hoàn thành
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-700">{project.deadline}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs text-gray-500">Thành viên</p>
                  <div className="flex -space-x-2">
                    {project.members.map((member, index) => (
                      <div 
                        key={`${project.id}-${member}`} 
                        title={`Thành viên ${member}`} 
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-semibold ${
                          index === 0 ? "bg-blue-100 text-blue-700" : index === 1 ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"
                        }`}
                      >
                        {member}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <Link 
                to={`/projects/${project.id}/kanban`} 
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 transition hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
              >
                Mở dự án <ArrowUpRight size={17} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}