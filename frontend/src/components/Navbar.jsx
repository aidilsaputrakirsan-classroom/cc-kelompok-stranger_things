import useTheme from "../hooks/useTheme"

export default function Navbar({ activePage, setActivePage, onLogout }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  const navStyle = {
    background: isDark ? "#16213e" : "white",
    borderBottom: isDark ? "0.5px solid #2a2a4a" : "0.5px solid #f0c0d0",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    height: "56px",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  }

  const logoStyle = {
    fontSize: "18px",
    fontWeight: "700",
    color: isDark ? "#f0f0f0" : "#1a1a2e",
    justifySelf: "start",
    cursor: "pointer",
  }

  const navLinkBase = {
    fontSize: "14px",
    color: isDark ? "#aaa" : "#888",
    cursor: "pointer",
    textDecoration: "none",
  }

  const navLinkActive = {
    color: "#e91e8c",
    fontWeight: "600",
  }

  const toggleBtnStyle = {
    background: isDark ? "#2a2a4a" : "#fce4ec",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    flexShrink: 0,
  }

  const avatarStyle = {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: isDark ? "#2a1a2e" : "#fce4ec",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  }

  const links = [
    { key: "home",    label: "Home" },
    { key: "jadwal",  label: "Jadwal Imunisasi" },
    { key: "faskes",  label: "Faskes Map" },
    { key: "about",   label: "About" },
  ]

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <span style={logoStyle} onClick={() => setActivePage?.("home")}>
        ByeBye<span style={{ color: "#e91e8c" }}>Virus</span>
      </span>

      {/* Nav Links - tengah */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        {links.map(({ key, label }) => (
          <a
            key={key}
            style={{
              ...navLinkBase,
              ...(activePage === key ? navLinkActive : {}),
            }}
            onClick={() => setActivePage?.(key)}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Kanan: toggle dark mode + avatar logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifySelf: "end" }}>
        <button onClick={toggleTheme} title="Toggle Dark Mode" style={toggleBtnStyle}>
          {isDark ? "☀️" : "🌙"}
        </button>
        <div style={avatarStyle} onClick={onLogout} title="Logout">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#e91e8c">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
      </div>
    </nav>
  )
}