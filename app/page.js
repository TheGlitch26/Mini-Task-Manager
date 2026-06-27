"use client";
import { useState, useEffect } from "react";
import AuthHeader from "@/app/components/AuthHeader";
import TaskList from "@/app/components/TaskList";
import KanbanBoard from "@/app/components/KanbanBoard";
import TaskFormModal from "@/app/components/TaskFormModal";
import { supabase } from "@/app/lib/supabase";
import { useAuth } from "@/app/hooks/useAuth";

/* ── SVG Icons ── */
const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const LogoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="2" fill="var(--brand-warm)" opacity="0.9"/>
    <rect x="14" y="3" width="7" height="7" rx="2" fill="var(--brand-warm)" opacity="0.6"/>
    <rect x="3" y="14" width="7" height="7" rx="2" fill="var(--brand-warm)" opacity="0.6"/>
    <rect x="14" y="14" width="7" height="7" rx="2" fill="var(--brand-warm-2)" opacity="0.9"/>
  </svg>
);

export default function Home() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [theme, setTheme] = useState("dark");

  /* ── theme ── */
  useEffect(() => {
    const saved = localStorage.getItem("tf-theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("tf-theme", next);
  };

  /* ── data ── */
  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("tasks").select("*").order("created_at", { ascending: false });
    if (error) console.error("Error fetching tasks:", error);
    else setTasks(data || []);
    setIsLoading(false);
  };

  const handleOpenModal  = (task = null) => { setEditingTask(task); setIsModalOpen(true); };
  const handleCloseModal = () => { setEditingTask(null); setIsModalOpen(false); };

  const handleSubmitTask = async (taskData) => {
    if (editingTask) {
      const { error } = await supabase.from("tasks").update(taskData).eq("id", editingTask.id);
      if (!error) setTasks(p => p.map(t => t.id === editingTask.id ? { ...t, ...taskData } : t));
      else console.error("Error updating task:", error);
    } else {
      const { data, error } = await supabase.from("tasks").insert([taskData]).select();
      if (!error && data) setTasks(p => [data[0], ...p]);
      else console.error("Error creating task:", error);
    }
    handleCloseModal();
  };

  const handleUpdateTask = async (id, updates) => {
    const { error } = await supabase.from("tasks").update(updates).eq("id", id);
    if (!error) setTasks(p => p.map(t => t.id === id ? { ...t, ...updates } : t));
    else console.error("Error updating status:", error);
  };

  const handleDeleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (!error) setTasks(p => p.filter(t => t.id !== id));
    else console.error("Error deleting task:", error);
  };

  const counts = {
    todo:       tasks.filter(t => t.status === "todo").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    done:       tasks.filter(t => t.status === "done").length,
  };

  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px 48px" }}>

        {/* ── NAV ── */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 48,
          padding: "0 4px",
        }}>
          {/* Logo — Kinso style: icon + wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34,
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-default)",
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <LogoIcon />
            </div>
            <span style={{
              fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px",
              color: "var(--text-primary)",
            }}>
              TaskFlow
            </span>
            {/* Kinso-style nav divider */}
            <span style={{ width: 1, height: 16, background: "var(--border-default)", margin: "0 8px" }} />
            <nav style={{ display: "flex", gap: 24 }}>
              {["List", "Board"].map(v => (
                <button
                  key={v}
                  onClick={() => setViewMode(v.toLowerCase())}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 13, fontWeight: 500,
                    color: viewMode === v.toLowerCase() ? "var(--text-primary)" : "var(--text-secondary)",
                    padding: 0,
                    transition: "color 150ms ease",
                    position: "relative",
                  }}
                >
                  {v}
                  {viewMode === v.toLowerCase() && (
                    <span style={{
                      position: "absolute", bottom: -3, left: 0, right: 0, height: 1.5,
                      background: "var(--accent-primary)",
                      borderRadius: 99,
                    }} />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Right actions — Kinso style */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <AuthHeader />
            <button
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                width: 34, height: 34, borderRadius: 8,
                border: "1px solid var(--border-default)",
                background: "var(--bg-elevated)",
                color: "var(--text-secondary)",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 150ms ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--bg-elevated)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            {user && (
            <button onClick={() => handleOpenModal()} className="btn-primary">
              New Task →
            </button>)}
          </div>
        </header>
        {/* ── HERO HEADING — Kinso bold style ── */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 900,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            margin: "0 0 10px",
            color: "var(--text-primary)",
          }}>
            Your tasks,{" "}
            <span className="accent-text">organized.</span>
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, maxWidth: 420 }}>
            A focused workspace for high-performing teams. Everything in one place.
          </p>
        </div>

        {/* ── STATS — Kinso-style horizontal pills ── */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          {[
            { label: "To Do",       count: counts.todo,       color: "var(--status-todo-color)" },
            { label: "In Progress", count: counts.inProgress, color: "var(--status-progress-color)" },
            { label: "Done",        count: counts.done,       color: "var(--status-done-color)" },
          ].map(({ label, count, color }) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 16px",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 999,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0, boxShadow: `0 0 5px ${color}` }} />
              <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{count}</span>
            </div>
          ))}

          <div style={{ flex: 1 }} />

          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 16px",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 999,
          }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Total</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{tasks.length}</span>
          </div>
        </div>

        {/* ── MAIN PANEL ── */}
        <section
          className="glow-border"
          style={{
            background: "var(--bg-surface)",
            borderRadius: "var(--radius-xl)",
            padding: viewMode === "board" ? "24px 20px" : "24px",
            minHeight: 480,
            transition: "box-shadow 300ms ease",
          }}
        >
          {isLoading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[100, 80, 90].map((w, i) => (
                <div key={i} className="skeleton" style={{ height: 78, borderRadius: "var(--radius-md)" }} />
              ))}
            </div>
          ) : viewMode === "list" ? (
            <TaskList
              tasks={tasks}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onEdit={handleOpenModal}
              isLoggedIn={!!user}
            />
          ) : (
            <KanbanBoard
              tasks={tasks}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onEdit={handleOpenModal}
              isLoggedIn={!!user}
            />
          )}
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          marginTop: 36, textAlign: "center",
          fontSize: 12, color: "var(--text-muted)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        }}>
          <span>TaskFlow</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--text-muted)", display: "inline-block" }} />
          <span>Next.js + Supabase</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--text-muted)", display: "inline-block" }} />
          <span>{new Date().getFullYear()}</span>
        </footer>
      </div>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitTask}
        initialData={editingTask}
      />
    </main>
    
  );
}
