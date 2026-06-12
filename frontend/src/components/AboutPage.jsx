import Navbar from "../components/Navbar"
import { useTheme } from "../hooks/ThemeContext"

function AboutPage({ onBack, activePage, setActivePage, onLogout }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const team = [
    { name: "Ahmad Daffa Alfattah", nim: "10231008", role: "Lead Backend",   initials: "AD", bg: "#fce4ec", color: "#c2185b" },
    { name: "Nazwa Amelia Zahra",   nim: "10231068", role: "Lead Frontend",  initials: "NA", bg: "#e3f2fd", color: "#1565c0" },
    { name: "Cintya Widhi Astuti",  nim: "10231026", role: "Lead DevOps",    initials: "CW", bg: "#e8f5e9", color: "#2e7d32" },
    { name: "Verina Rahmadinnah",   nim: "10231090", role: "Lead QA & Docs", initials: "VR", bg: "#fff8e1", color: "#e65100" },
  ]

  const stack = [
    { label: "Backend",   sub: "FastAPI + PostgreSQL", icon: "🗄️", accent: "#e91e8c" },
    { label: "Frontend",  sub: "React + Vite",         icon: "⚛️", accent: "#f48fb1" },
    { label: "Container", sub: "Docker Compose",       icon: "🐳", accent: "#c2185b" },
    { label: "CI/CD",     sub: "GitHub Actions",       icon: "🔀", accent: "#e91e8c" },
  ]

  const s = {
    page: {
      background: isDark
        ? "linear-gradient(160deg, #0f0f1a 0%, #1a0a14 50%, #0f0f1a 100%)"
        : "linear-gradient(160deg, #fff5f8 0%, #fce4ec 40%, #fff0f5 100%)",
      minHeight: "100vh",
      color: isDark ? "#f0f0f0" : "#1a1a2e",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      transition: "background 0.3s, color 0.3s",
    },
    wrap: {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "1.25rem 1rem 3rem",
    },
    topBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      marginBottom: "1rem",
    },
    backBtn: {
      background: "none",
      border: "none",
      padding: "0 0 10px 0",
      fontSize: "13px",
      cursor: "pointer",
      color: "#e91e8c",
      fontWeight: "600",
    },
    hero: {
      textAlign: "center",
      padding: "2rem 1rem 2.25rem",
      background: isDark
        ? "linear-gradient(135deg, #2a0a1e 0%, #1a0a2e 100%)"
        : "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)",
      border: `1px solid ${isDark ? "#4a1a2e" : "#f48fb1"}`,
      borderRadius: "20px",
      boxShadow: isDark
        ? "0 4px 24px rgba(233,30,140,0.15)"
        : "0 4px 24px rgba(233,30,140,0.12)",
      position: "relative",
      overflow: "hidden",
    },
    heroDeco: {
      position: "absolute",
      top: "-40px",
      right: "-40px",
      width: "180px",
      height: "180px",
      borderRadius: "50%",
      background: isDark ? "rgba(233,30,140,0.08)" : "rgba(233,30,140,0.12)",
      pointerEvents: "none",
    },
    heroDeco2: {
      position: "absolute",
      bottom: "-30px",
      left: "-30px",
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      background: isDark ? "rgba(233,30,140,0.06)" : "rgba(233,30,140,0.10)",
      pointerEvents: "none",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: isDark ? "rgba(233,30,140,0.2)" : "rgba(233,30,140,0.15)",
      border: `1px solid ${isDark ? "#e91e8c55" : "#e91e8c44"}`,
      borderRadius: "999px",
      padding: "6px 16px",
      fontSize: "13px",
      color: "#e91e8c",
      marginBottom: "1rem",
      fontWeight: "700",
      letterSpacing: "0.3px",
    },
    h1: {
      fontSize: "clamp(24px, 4vw, 34px)",
      fontWeight: "800",
      color: isDark ? "#f0f0f0" : "#1a1a2e",
      margin: "0 0 0.75rem",
      lineHeight: 1.15,
    },
    heroP: {
      fontSize: "clamp(14px, 2vw, 15px)",
      color: isDark ? "#c084a0" : "#9c4468",
      lineHeight: "1.7",
      maxWidth: "600px",
      margin: "0 auto",
      fontWeight: "500",
    },
    divider: {
      height: "1px",
      background: isDark
        ? "linear-gradient(90deg, transparent, #4a1a2e, transparent)"
        : "linear-gradient(90deg, transparent, #f48fb1, transparent)",
      margin: "1.75rem 0",
    },
    sectionLabel: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "11px",
      fontWeight: "700",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: isDark ? "#e91e8c" : "#e91e8c",
      margin: "0 0 0.85rem",
    },
    sectionBar: {
      width: "3px",
      height: "14px",
      background: "linear-gradient(180deg, #e91e8c, #f48fb1)",
      borderRadius: "2px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "12px",
    },
    stackCard: {
      background: isDark
        ? "linear-gradient(135deg, #1e1030, #2a0a1e)"
        : "linear-gradient(135deg, #fff5f8, #fce4ec)",
      border: `1px solid ${isDark ? "#4a1a3a" : "#f8bbd0"}`,
      borderRadius: "16px",
      padding: "1rem 1.1rem",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      boxShadow: isDark
        ? "0 2px 12px rgba(233,30,140,0.1)"
        : "0 2px 12px rgba(233,30,140,0.08)",
      transition: "transform 0.2s",
    },
    stackIcon: {
      width: "42px",
      height: "42px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      fontSize: "20px",
      background: isDark ? "rgba(233,30,140,0.15)" : "rgba(233,30,140,0.12)",
      border: `1px solid ${isDark ? "#e91e8c33" : "#f48fb177"}`,
    },
    stackLabel: {
      fontSize: "14px",
      fontWeight: "700",
      color: isDark ? "#f0f0f0" : "#1a1a2e",
      margin: "0 0 3px",
    },
    stackSub: {
      fontSize: "12px",
      color: isDark ? "#c084a0" : "#9c4468",
      fontWeight: "500",
    },
    teamCard: {
      background: isDark
        ? "linear-gradient(135deg, #1e1030, #2a0a1e)"
        : "linear-gradient(135deg, #fff5f8, #fce4ec)",
      border: `1px solid ${isDark ? "#4a1a3a" : "#f8bbd0"}`,
      borderRadius: "16px",
      padding: "1.25rem 1rem",
      textAlign: "center",
      boxShadow: isDark
        ? "0 2px 12px rgba(233,30,140,0.1)"
        : "0 2px 12px rgba(233,30,140,0.08)",
    },
    avatar: {
      width: "52px",
      height: "52px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "15px",
      fontWeight: "800",
      margin: "0 auto 0.9rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
    teamName: {
      fontSize: "14px",
      fontWeight: "700",
      color: isDark ? "#f0f0f0" : "#1a1a2e",
      margin: "0 0 4px",
      lineHeight: 1.35,
    },
    teamNim: {
      fontSize: "11px",
      color: isDark ? "#c084a0" : "#b06080",
      margin: "0 0 10px",
      fontWeight: "500",
    },
    roleBadge: {
      display: "inline-block",
      fontSize: "11px",
      padding: "4px 12px",
      borderRadius: "999px",
      fontWeight: "700",
      background: isDark ? "rgba(233,30,140,0.18)" : "rgba(233,30,140,0.12)",
      border: `1px solid ${isDark ? "#e91e8c44" : "#f48fb1"}`,
      color: "#e91e8c",
    },
  }

  return (
    <div style={s.page}>
      <Navbar activePage={activePage} setActivePage={setActivePage} onLogout={onLogout} />

      <div style={s.wrap}>
        <div style={s.topBar}>
          <button style={s.backBtn} onClick={onBack}>← Kembali</button>
        </div>

        {/* Hero */}
        <div style={s.hero}>
          <div style={s.heroDeco} />
          <div style={s.heroDeco2} />
          <div style={s.badge}>🛡️ ByeByeVirus</div>
          <h1 style={s.h1}>
            Tentang <span style={{ color: "#e91e8c" }}>Proyek Ini</span>
          </h1>
          <p style={s.heroP}>
            Aplikasi Cloud-Native yang dibangun untuk mata kuliah Komputasi Awan —
            menggabungkan imunisasi pintar dengan peta layanan kesehatan terdekat.
          </p>
        </div>

        <div style={s.divider} />

        {/* Tech Stack */}
        <div>
          <div style={s.sectionLabel}>
            <div style={s.sectionBar} />
            Tech Stack
          </div>
          <div style={s.grid}>
            {stack.map((item) => (
              <div key={item.label} style={s.stackCard}>
                <div style={s.stackIcon}>{item.icon}</div>
                <div>
                  <p style={s.stackLabel}>{item.label}</p>
                  <span style={s.stackSub}>{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={s.divider} />

        {/* Tim */}
        <div>
          <div style={s.sectionLabel}>
            <div style={s.sectionBar} />
            Tim Pengembang
          </div>
          <div style={s.grid}>
            {team.map((m) => (
              <div key={m.nim} style={s.teamCard}>
                <div style={{ ...s.avatar, background: m.bg, color: m.color }}>
                  {m.initials}
                </div>
                <p style={s.teamName}>{m.name}</p>
                <p style={s.teamNim}>{m.nim}</p>
                <span style={s.roleBadge}>{m.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: "2.5rem",
          paddingTop: "1.25rem",
          borderTop: `1px solid ${isDark ? "#2a0a1e" : "#f8bbd0"}`,
          textAlign: "center",
          fontSize: "12px",
          color: isDark ? "#4a1a2e" : "#f48fb1",
          fontWeight: "600",
          letterSpacing: "0.5px",
        }}>
          Bye Bye Virus · Kelompok Stranger Things · Komputasi Awan
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

export default AboutPage