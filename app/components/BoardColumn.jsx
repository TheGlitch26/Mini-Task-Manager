const COLUMN_CONFIG = {
  "To Do":       { dot: "var(--status-todo-color)",     glow: "#6366F155" },
  "In Progress": { dot: "var(--status-progress-color)", glow: "#F59E0B55" },
  "Done":        { dot: "var(--status-done-color)",     glow: "var(--accent-glow)" },
};

export default function BoardColumn({ title, count = 0, children }) {
  const cfg = COLUMN_CONFIG[title] || {};

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      background: "var(--bg-elevated)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding: "16px 14px",
      minWidth: 260, flex: "1 1 0", minHeight: 0,
    }}>
      {/* Column header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexShrink: 0 }}>
        <span style={{
          width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
          background: cfg.dot,
          boxShadow: `0 0 7px ${cfg.dot}`,
        }} />
        <h3 style={{ fontSize: 12, fontWeight: 600, margin: 0, color: "var(--text-primary)", flex: 1, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {title}
        </h3>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 999,
          background: "var(--bg-surface)", color: "var(--text-muted)",
          border: "1px solid var(--border-subtle)",
        }}>
          {count}
        </span>
      </div>

      {/* Scrollable cards */}
      <div style={{
        display: "flex", flexDirection: "column", gap: 8,
        overflowY: "auto", flex: 1, minHeight: 0, paddingRight: 2,
      }}>
        {children}
        {count === 0 && (
          <div style={{
            textAlign: "center", padding: "32px 12px",
            color: "var(--text-muted)", fontSize: 12,
            border: "1px dashed var(--border-subtle)",
            borderRadius: "var(--radius-md)",
          }}>
            Nothing here yet
          </div>
        )}
      </div>
    </div>
  );
}