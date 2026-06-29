import BoardColumn from "./BoardColumn";
import TaskCard from "./TaskCard";

export default function KanbanBoard({ tasks, onUpdate, onDelete, onEdit, isLoggedIn }) {
  const todoTasks       = tasks.filter(t => t.status === "todo");
  const inProgressTasks = tasks.filter(t => t.status === "in-progress");
  const doneTasks       = tasks.filter(t => t.status === "done");

  const renderCards = (colTasks) =>
    colTasks.map(task => (
      <div key={task.id} style={{ flexShrink: 0 }}>
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={(updates) => onUpdate(task.id, updates)}
          onDelete={() => onDelete(task.id)}
          onEdit={() => onEdit(task)}
          isLoggedIn={isLoggedIn}
        />
      </div>
    ));

  return (
    <div style={{
      display: "flex",
      gap: 16,
      height: 520,
      overflowX: "auto",
    }}>
      <BoardColumn title="To Do" count={todoTasks.length}>
        {renderCards(todoTasks)}
      </BoardColumn>
      <BoardColumn title="In Progress" count={inProgressTasks.length}>
        {renderCards(inProgressTasks)}
      </BoardColumn>
      <BoardColumn title="Done" count={doneTasks.length}>
        {renderCards(doneTasks)}
      </BoardColumn>
    </div>
  );
}