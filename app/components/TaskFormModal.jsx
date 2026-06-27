"use client";
import { useEffect, useRef } from "react";

const INPUT_STYLE = {
  width: "100%",
  padding: "9px 13px",
  borderRadius: 10,
  border: "1px solid var(--border-default)",
  background: "var(--bg-elevated)",
  color: "var(--text-primary)",
  fontSize: 13,
  outline: "none",
  transition: "border-color 150ms ease, box-shadow 150ms ease",
  fontFamily: "'Inter', sans-serif",
};

const LABEL_STYLE = {
  display: "block",
  fontSize: 11,
  fontWeight: 600,
  color: "var(--text-secondary)",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.4px",
};

export default function TaskFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => firstInputRef.current?.focus(), 80);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    onSubmit({
      title:       fd.get("title"),
      description: fd.get("description"),
      assignedTo:  fd.get("assignedTo"),
      priority:    fd.get("priority"),
      status:      fd.get("status"),
    });
  };

  const onFocus = (e) => {
    e.target.style.borderColor = "var(--accent-primary)";
    e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)";
  };
  const onBlur = (e) => {
    e.target.style.borderColor = "var(--border-default)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        className="animate-modalIn"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-modal)",
          width: "100%", maxWidth: 440,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 22px 16px",
          borderBottom: "1px solid var(--border-subtle)",
        }}>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 800, margin: 0, color: "var(--text-primary)", letterSpacing: "-0.3px" }}>
              {initialData ? "Edit Task" : "New Task"}
            </h2>
            <p style={{ fontSize: 11, color: "var(--text-muted)", margin: "2px 0 0" }}>
              {initialData ? "Update the task details below" : "Fill in the details to create a task"}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 30, height: 30, borderRadius: 8,
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-elevated)",
              color: "var(--text-muted)",
              cursor: "pointer", fontSize: 13,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 150ms ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--bg-elevated)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={LABEL_STYLE}>Title <span style={{ color: "var(--priority-high-text)" }}>*</span></label>
            <input ref={firstInputRef} name="title" defaultValue={initialData?.title || ""} required
              placeholder="e.g. Fix the login bug" style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur} />
          </div>

          <div>
            <label style={LABEL_STYLE}>Description</label>
            <textarea name="description" defaultValue={initialData?.description || ""} rows={3}
              placeholder="What needs to be done?" style={{ ...INPUT_STYLE, resize: "none" }} onFocus={onFocus} onBlur={onBlur} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={LABEL_STYLE}>Assignee</label>
              <input name="assignedTo" defaultValue={initialData?.assignedTo || ""}
                placeholder="Team member name" style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <div>
              <label style={LABEL_STYLE}>Priority</label>
              <select name="priority" defaultValue={initialData?.priority || "medium"}
                style={{ ...INPUT_STYLE, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}>
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
          </div>

          <div>
            <label style={LABEL_STYLE}>Status</label>
            <select name="status" defaultValue={initialData?.status || "todo"}
              style={{ ...INPUT_STYLE, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div style={{
            display: "flex", justifyContent: "flex-end", gap: 8,
            paddingTop: 10, marginTop: 4,
            borderTop: "1px solid var(--border-subtle)",
          }}>
            <button type="button" onClick={onClose} className="btn-ghost" style={{ fontSize: 13 }}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ fontSize: 13 }}>
              {initialData ? "Save Changes" : "Create Task"} →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
