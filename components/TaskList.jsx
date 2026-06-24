"use client";

import { useState } from "react";
import TaskCard from "./TaskCard";

export default function TaskList() {
  // Temporary fake data (will later come from API)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Setup project structure",
      description: "Initialize Next.js app and folders",
      completed: false,
      assignedTo: "Nihad",
      priority: "high",
    },
    {
      id: 2,
      title: "Design homepage UI",
      description: "Create clean landing page layout",
      completed: true,
      assignedTo: "Ali",
      priority: "medium",
    },
    {
      id: 3,
      title: "Build TaskCard component",
      description: "Reusable task UI component",
      completed: false,
      assignedTo: "Teammate 3",
      priority: "low",
    },
  ]);

  // Toggle done
  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

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
            title={task.title}
            description={task.description}
            completed={task.completed}
            assignedTo={task.assignedTo}
            priority={task.priority}
            onToggleDone={() => toggleDone(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))
      )}
    </div>
  );
}