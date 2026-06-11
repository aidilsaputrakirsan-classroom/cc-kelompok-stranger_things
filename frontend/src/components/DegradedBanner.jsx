import { useState } from "react";

export default function DegradedBanner({ message, isDark, onDismiss }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      style={{
        background: isDark ? "#2a1a00" : "#fff7ed",
        borderBottom: `1px solid ${isDark ? "#7c4a00" : "#fed7aa"}`,
        padding: "10px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        fontSize: 13,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke={isDark ? "#fb923c" : "#c2410c"}
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span style={{ color: isDark ? "#fb923c" : "#c2410c", fontWeight: 500 }}>
          {message || "Beberapa fitur sementara tidak tersedia karena gangguan server."}
        </span>
      </div>
      <button
        onClick={() => {
          setDismissed(true);
          if (onDismiss) onDismiss();
        }}
        aria-label="Tutup notifikasi"
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: isDark ? "#fb923c" : "#c2410c",
          padding: 4, display: "flex", alignItems: "center", flexShrink: 0,
        }}
      >
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}