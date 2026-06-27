import BoardColumn from "./BoardColumn";
import TaskCard from "./TaskCard";

export default function KanbanBoard({ tasks, onUpdate, onDelete, onEdit }) {
  const todoTasks = tasks.filter(t => t.status === "todo");
  const inProgressTasks = tasks.filter(t => t.status === "in-progress");
  const doneTasks = tasks.filter(t => t.status === "done");

  const renderTasks = (columnTasks) => (
    columnTasks.map(task => (
      <TaskCard
        key={task.id}
        task={task}
        onUpdate={(updates) => onUpdate(task.id, updates)}
        onDelete={() => onDelete(task.id)}
        onEdit={() => onEdit(task)}
      />
    ))
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BoardColumn title="To Do" count={todoTasks.length}>
        {renderTasks(todoTasks)}
      </BoardColumn>
      <BoardColumn title="In Progress" count={inProgressTasks.length}>
        {renderTasks(inProgressTasks)}
      </BoardColumn>
      <BoardColumn title="Done" count={doneTasks.length}>
        {renderTasks(doneTasks)}
      </BoardColumn>
    </div>
  );
}