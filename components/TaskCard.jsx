export default function TaskCard({
  title,
  description,
  completed,
  assignedTo,
  priority,
  onToggleDone,
  onDelete,
}) {
  return (
    <div
      className={`border rounded-xl p-4 flex items-start justify-between gap-4 transition
      ${completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-300"}
      `}
    >
      {/* Left side */}
      <div className="flex gap-3">
        
        {/* Checkbox */}
        <button
          onClick={onToggleDone}
          className={`mt-1 w-5 h-5 rounded border flex items-center justify-center
          ${completed ? "bg-black border-black" : "border-gray-400"}
          `}
        >
          {completed && (
            <span className="text-white text-xs">✓</span>
          )}
        </button>

        {/* Content */}
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

      {/* Right actions */}
      <div className="flex gap-2">
        <button
          onClick={onDelete}
          className="text-xs px-2 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}