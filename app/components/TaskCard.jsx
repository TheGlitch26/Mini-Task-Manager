export default function TaskCard({
  task,
  onUpdate,
  onDelete,
  onEdit,
}) {
  const { title, description, status, assignedTo, priority } = task;
  const completed = status === "done";

  const handleStatusChange = (e) => {
    onUpdate({ status: e.target.value });
  };

  return (
    <div
      className={`border rounded-xl p-4 flex flex-col gap-3 transition
      ${completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-300"}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className={`font-medium ${
              completed ? "line-through text-gray-400" : "text-gray-900"
            }`}
          >
            {title}
          </h3>

          {description && (
            <p className="text-sm text-gray-500 mt-1">
              {description}
            </p>
          )}

          {/* Meta info */}
          <div className="flex gap-3 mt-2 text-xs text-gray-500">
            {assignedTo && (
              <span className="px-2 py-0.5 bg-gray-100 rounded">
                👤 {assignedTo}
              </span>
            )}

            {priority && (
              <span
                className={`px-2 py-0.5 rounded
                ${
                  priority === "high"
                    ? "bg-red-100 text-red-600"
                    : priority === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }
                `}
              >
                {priority}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <select
          value={status}
          onChange={handleStatusChange}
          className={`text-xs border rounded-md px-2 py-1 outline-none ${
            completed ? "bg-gray-100 border-gray-200 text-gray-500" : "bg-white border-gray-300"
          }`}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-xs px-2 py-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-xs px-2 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}