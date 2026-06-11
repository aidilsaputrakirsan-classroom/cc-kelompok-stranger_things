import Navbar from "../components/Navbar"

function AboutPage({ onBack, activePage, setActivePage, onLogout }) {
  const team = [
    { name: "Ahmad Daffa Alfattah", nim: "10231008", role: "Lead Backend", initials: "AD", bg: "#fce4ec", color: "#c2185b" },
    { name: "Nazwa Amelia Zahra", nim: "10231068", role: "Lead Frontend", initials: "NA", bg: "#e3f2fd", color: "#1565c0" },
    { name: "Cintya Widhi Astuti", nim: "10231026", role: "Lead DevOps", initials: "CW", bg: "#e8f5e9", color: "#2e7d32" },
    { name: "Verina Rahmadinnah", nim: "10231090", role: "Lead QA & Docs", initials: "VR", bg: "#fff8e1", color: "#e65100" },
  ]

  const stack = [
    { label: "Backend", sub: "FastAPI + PostgreSQL", icon: "🗄️", bg: "#fce4ec" },
    { label: "Frontend", sub: "React + Vite", icon: "⚛️", bg: "#e3f2fd" },
    { label: "Container", sub: "Docker Compose", icon: "🐳", bg: "#e8f5e9" },
    { label: "CI/CD", sub: "GitHub Actions", icon: "🔀", bg: "#fff8e1" },
  ]

  const s = {
    page: {
      background: "#fff5f8",
      minHeight: "100vh",
      color: "#1a1a2e",
      fontFamily: "'Segoe UI', Arial, sans-serif",
    },
    wrap: {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "1.25rem 1rem 2rem",
    },
    topBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      marginBottom: "1rem",
    },
    backBtn: {
      background: "white",
      border: "1px solid #ead7e0",
      borderRadius: "10px",
      padding: "8px 14px",
      fontSize: "13px",
      cursor: "pointer",
      color: "#666",
      boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    },
    hero: {
      textAlign: "center",
      padding: "1.5rem 1rem 1.75rem",
      background: "linear-gradient(180deg, rgba(252,228,236,0.65), rgba(255,255,255,0.65))",
      border: "1px solid #f3dce5",
      borderRadius: "18px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: "#fce4ec",
      border: "1px solid #f8bbd0",
      borderRadius: "999px",
      padding: "6px 14px",
      fontSize: "13px",
      color: "#c2185b",
      marginBottom: "1rem",
      fontWeight: "600",
    },
    h1: {
      fontSize: "clamp(24px, 4vw, 34px)",
      fontWeight: "800",
      color: "#1a1a2e",
      margin: "0 0 0.75rem",
      lineHeight: 1.15,
    },
    heroP: {
      fontSize: "clamp(14px, 2vw, 16px)",
      color: "#777",
      lineHeight: "1.7",
      maxWidth: "640px",
      margin: "0 auto",
    },
    divider: {
      height: "1px",
      background: "#f0e0e8",
      margin: "1.5rem 0",
    },
    sectionLabel: {
      fontSize: "11px",
      fontWeight: "700",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "#b9a7b2",
      margin: "0 0 0.75rem",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "12px",
    },
    card: {
      background: "white",
      border: "1px solid #f0e0e8",
      borderRadius: "16px",
      padding: "1rem",
      boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    },
    stackCard: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    stackIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      fontSize: "18px",
    },
    stackLabel: {
      fontSize: "14px",
      fontWeight: "700",
      color: "#1a1a2e",
      margin: "0 0 2px",
    },
    stackSub: {
      fontSize: "12px",
      color: "#888",
    },
    teamCard: {
      textAlign: "center",
    },
    avatar: {
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: "700",
      margin: "0 auto 0.8rem",
    },
    teamName: {
      fontSize: "14px",
      fontWeight: "700",
      color: "#1a1a2e",
      margin: "0 0 4px",
      lineHeight: 1.35,
    },
    teamNim: {
      fontSize: "11px",
      color: "#aaa",
      margin: "0 0 10px",
    },
    roleBadge: {
      display: "inline-block",
      fontSize: "11px",
      padding: "4px 10px",
      borderRadius: "999px",
      fontWeight: "600",
    },
  }

  return (
    <div style={s.page}>
      <Navbar activePage={activePage} setActivePage={setActivePage} onLogout={onLogout} />

      <div style={s.wrap}>
        <div style={s.topBar}>
          <button style={s.backBtn} onClick={onBack}>← Kembali</button>
        </div>

        <div style={s.hero}>
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

        <div>
          <p style={s.sectionLabel}>Tech Stack</p>
          <div style={s.grid}>
            {stack.map((item) => (
              <div key={item.label} style={{ ...s.card, ...s.stackCard }}>
                <div style={{ ...s.stackIcon, background: item.bg }}>{item.icon}</div>
                <div>
                  <p style={s.stackLabel}>{item.label}</p>
                  <span style={s.stackSub}>{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={s.divider} />

        <div>
          <p style={s.sectionLabel}>Tim Pengembang</p>
          <div style={s.grid}>
            {team.map((m) => (
              <div key={m.nim} style={{ ...s.card, ...s.teamCard }}>
                <div style={{ ...s.avatar, background: m.bg, color: m.color }}>
                  {m.initials}
                </div>
                <p style={s.teamName}>{m.name}</p>
                <p style={s.teamNim}>{m.nim}</p>
                <span style={{ ...s.roleBadge, background: m.bg, color: m.color }}>
                  {m.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-page-wrap {
            padding: 1rem 0.85rem 1.5rem !important;
          }
        }

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