"use client";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function AuthHeader() {
  const { user, login, logout, error, loading } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (loading) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (user) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>👋 {user.email}</span>
        <button
          onClick={logout}
          style={{
            padding: "6px 12px", borderRadius: 8,
            border: "1px solid var(--border-default)",
            background: "var(--bg-elevated)",
            fontSize: 13, cursor: "pointer",
          }}
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          padding: "6px 14px", borderRadius: 8,
          border: "1px solid var(--border-default)",
          background: "var(--bg-elevated)",
          fontSize: 13, cursor: "pointer",
        }}
      >
        Log In
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            position: "absolute", top: 42, right: 0,
            background: "var(--bg-surface)",
            border: "1px solid var(--border-default)",
            borderRadius: 10, padding: 16,
            display: "flex", flexDirection: "column", gap: 8,
            width: 240, zIndex: 50,
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          }}
        >
          <input
            type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: "1px solid var(--border-default)", background: "var(--bg-elevated)", color: "var(--text-primary)" }}
          />
          <input
            type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: "1px solid var(--border-default)", background: "var(--bg-elevated)", color: "var(--text-primary)" }}
          />
          {error && <p style={{ color: "#ef4444", fontSize: 12, margin: 0 }}>{error}</p>}
          <button
            type="submit"
            style={{
              padding: 8, borderRadius: 6, border: "none",
              background: "var(--accent-primary)", color: "#fff",
              fontSize: 13, cursor: "pointer",
            }}
          >
            Log In
          </button>
        </form>
      )}
    </div>
  );
}