"use client";

import { useState, useEffect } from "react";
import TaskList from "@/app/components/TaskList";
import KanbanBoard from "@/app/components/KanbanBoard";
import TaskFormModal from "@/app/components/TaskFormModal";
import { supabase } from "@/app/lib/supabase";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [viewMode, setViewMode] = useState("list"); // "list" or "board"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(data || []);
    }
    setIsLoading(false);
  };

  const handleOpenModal = (task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleSubmitTask = async (taskData) => {
    if (editingTask) {
      // Update existing task
      const { error } = await supabase
        .from("tasks")
        .update(taskData)
        .eq("id", editingTask.id);
        
      if (!error) {
        setTasks((prev) =>
          prev.map((t) => (t.id === editingTask.id ? { ...t, ...taskData } : t))
        );
      } else {
        console.error("Error updating task:", error);
      }
    } else {
      // Create new task
      const { data, error } = await supabase
        .from("tasks")
        .insert([taskData])
        .select();
        
      if (!error && data) {
        setTasks((prev) => [data[0], ...prev]);
      } else {
        console.error("Error creating task:", error);
      }
    }
    handleCloseModal();
  };

  const handleUpdateTask = async (id, updates) => {
    const { error } = await supabase
      .from("tasks")
      .update(updates)
      .eq("id", id);
      
    if (!error) {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
      );
    } else {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);
      
    if (!error) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } else {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-10">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold">TaskFlow</h1>
            <p className="text-sm text-gray-500">
              Simple task management for your team
            </p>
          </div>

          <button className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:opacity-90 transition">
            Login
          </button>
        </header>

        {/* Main content area */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm min-h-[600px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">Your Tasks</h2>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                    viewMode === "list" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode("board")}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                    viewMode === "board" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Board
                </button>
              </div>
            </div>

            <button 
              onClick={() => handleOpenModal()}
              className="px-3 py-1.5 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800 transition"
            >
              + New Task
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-10 text-gray-500">Loading tasks...</div>
          ) : viewMode === "list" ? (
            <TaskList 
              tasks={tasks} 
              onUpdate={handleUpdateTask} 
              onDelete={handleDeleteTask}
              onEdit={handleOpenModal}
            />
          ) : (
            <KanbanBoard 
              tasks={tasks}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onEdit={handleOpenModal}
            />
          )}
        </section>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-gray-400">
          Built for a small team • Next.js + Supabase
        </footer>

      </div>

      {/* Task Modal */}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitTask}
        initialData={editingTask}
      />
    </main>
  );
}
