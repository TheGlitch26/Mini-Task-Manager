import BoardColumn from "./BoardColumn";

export default function KanbanBoard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BoardColumn title="To Do" />
      <BoardColumn title="In Progress" />
      <BoardColumn title="Done" />
    </div>
  );
}