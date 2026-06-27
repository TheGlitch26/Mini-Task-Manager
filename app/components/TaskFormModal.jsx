export default function TaskFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const taskData = {
      title: formData.get("title"),
      description: formData.get("description"),
      assignedTo: formData.get("assignedTo"),
      priority: formData.get("priority"),
      status: formData.get("status"),
    };
    onSubmit(taskData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            {initialData ? "Edit Task" : "New Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              name="title"
              defaultValue={initialData?.title || ""}
              required
              placeholder="E.g. Fix login bug"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={initialData?.description || ""}
              rows={3}
              placeholder="Details about the task..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assignee
              </label>
              <input
                name="assignedTo"
                defaultValue={initialData?.assignedTo || ""}
                placeholder="Name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                name="priority"
                defaultValue={initialData?.priority || "medium"}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              defaultValue={initialData?.status || "todo"}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition"
            >
              {initialData ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
