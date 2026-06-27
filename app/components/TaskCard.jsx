const PRIORITY_STYLES = {
  high:   { bg: "var(--priority-high-bg)",  text: "var(--priority-high-text)", bar: "var(--priority-high-bar)", label: "High" },
  medium: { bg: "var(--priority-med-bg)",   text: "var(--priority-med-text)",  bar: "var(--priority-med-bar)",  label: "Medium" },
  low:    { bg: "var(--priority-low-bg)",   text: "var(--priority-low-text)",  bar: "var(--priority-low-bar)",  label: "Low" },
};

const STATUS_OPTIONS = [
  { value: "todo",        label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "done",        label: "Done" },
];

export default function TaskCard({ task, onUpdate, onDelete, onEdit, isLoggedIn}) {
  const { title, description, status, assignedTo, priority } = task;
  const completed = status === "done";
  const p = PRIORITY_STYLES[priority] || PRIORITY_STYLES.medium;

  return (
    <div
      className="animate-fadeInUp"
      style={{
        position: "relative",
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        padding: "14px 16px 12px 22px",
        display: "flex", flexDirection: "column", gap: 10,
        overflow: "hidden",
        opacity: completed ? 0.6 : 1,
        transition: "transform 150ms ease, box-shadow 150ms ease, opacity 150ms ease",
        cursor: "default",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25), 0 0 0 1px var(--border-default)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Kinso-style priority left bar */}
      <span style={{
        position: "absolute", left: 0, top: 8, bottom: 8,
        width: 3, background: p.bar, borderRadius: "0 3px 3px 0",
        boxShadow: `0 0 8px ${p.bar}55`,
      }} />

      {/* Title row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontSize: 14, fontWeight: 600, margin: 0, lineHeight: 1.4,
            color: completed ? "var(--text-muted)" : "var(--text-primary)",
            textDecoration: completed ? "line-through" : "none",
            letterSpacing: "-0.1px",
          }}>
            {title}
          </h3>
          {description && (
            <p style={{
              fontSize: 12, color: "var(--text-secondary)",
              margin: "4px 0 0", lineHeight: 1.55,
            }}>
              {description}
            </p>
          )}
        </div>

        {/* Buttons */}
        {isLoggedIn && (
        <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
          <button
            onClick={onEdit}
            style={{
              padding: "4px 10px", fontSize: 11, fontWeight: 500,
              borderRadius: 6, border: "1px solid var(--border-default)",
              background: "transparent", color: "var(--text-secondary)",
              cursor: "pointer", transition: "all 120ms ease",
            }}
            onMouseEnter={e => { e.target.style.background = "var(--bg-hover)"; e.target.style.color = "var(--text-primary)"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "var(--text-secondary)"; }}
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            style={{
              padding: "4px 10px", fontSize: 11, fontWeight: 500,
              borderRadius: 6, border: "1px solid transparent",
              background: "transparent", color: "var(--priority-high-text)",
              cursor: "pointer", transition: "all 120ms ease",
            }}
            onMouseEnter={e => { e.target.style.background = "var(--priority-high-bg)"; e.target.style.borderColor = "var(--priority-high-bar)22"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "transparent"; }}
          >
            Delete
          </button>
        </div>
        )}
      </div>

      {/* Bottom meta row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {assignedTo && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              fontSize: 11, padding: "2px 8px", borderRadius: 999,
              background: "var(--bg-surface)", color: "var(--text-secondary)",
              border: "1px solid var(--border-subtle)",
            }}>
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M1.5 10.5C1.5 8.567 3.567 7 6 7s4.5 1.567 4.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              {assignedTo}
            </span>
          )}
          <span style={{
            fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 999,
            background: p.bg, color: p.text,
          }}>
            {p.label}
          </span>
        </div>

        <select
          value={status}
          onChange={e => onUpdate({ status: e.target.value })}
          disabled={!isLoggedIn}
          style={{
            fontSize: 11, padding: "3px 8px",
            borderRadius: 999, border: "1px solid var(--border-default)",
            background: "var(--bg-surface)", color: "var(--text-secondary)",
            cursor: "pointer", outline: "none", fontFamily: "inherit",
          }}
        >
          {STATUS_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}