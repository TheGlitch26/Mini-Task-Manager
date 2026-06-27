import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onUpdate, onDelete, onEdit, isLoggedIn }) {
  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <div style={{
          textAlign: "center", color: "var(--text-muted)",
          padding: "48px 16px",
          border: "1px dashed var(--border-subtle)",
          borderRadius: "var(--radius-md)",
          fontSize: 13,
        }}>
          No tasks yet. Hit <strong style={{ color: "var(--text-secondary)" }}>+ New Task</strong> to get started.
        </div>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={(updates) => onUpdate(task.id, updates)}
            onDelete={() => onDelete(task.id)}
            onEdit={() => onEdit(task)}
            isLoggedIn={isLoggedIn}
          />
        ))
      )}
    </div>
  );
}
