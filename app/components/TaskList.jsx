import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onUpdate, onDelete, onEdit }) {
  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 py-10 border border-dashed rounded-lg">
          No tasks yet. Create your first task.
        </div>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={(updates) => onUpdate(task.id, updates)}
            onDelete={() => onDelete(task.id)}
            onEdit={() => onEdit(task)}
          />
        ))
      )}
    </div>
  );
}