import Navbar from "../components/Navbar"
function AboutPage({ onBack }) {
  const team = [
    { name: "Ahmad Daffa Alfattah", nim: "10231008", role: "Lead Backend",  initials: "AD", bg: "#fce4ec", color: "#c2185b" },
    { name: "Nazwa Amelia Zahra", nim: "10231068", role: "Lead Frontend", initials: "NA", bg: "#e3f2fd", color: "#1565c0" },
    { name: "Cintya Widhi Astuti", nim: "10231026", role: "Lead DevOps",   initials: "CW", bg: "#e8f5e9", color: "#2e7d32" },
    { name: "Verina Rahmadinnah", nim: "10231090", role: "Lead QA & Docs",initials: "VR", bg: "#fff8e1", color: "#e65100" },
  ]

  const stack = [
    { label: "Backend",   sub: "FastAPI + PostgreSQL", icon: "🗄️", bg: "#fce4ec" },
    { label: "Frontend",  sub: "React + Vite",         icon: "⚛️", bg: "#e3f2fd" },
    { label: "Container", sub: "Docker Compose",       icon: "🐳", bg: "#e8f5e9" },
    { label: "CI/CD",     sub: "GitHub Actions",       icon: "🔀", bg: "#fff8e1" },
  ]

  const s = {
    wrap: {
      fontFamily: "'Segoe UI', Arial, sans-serif",
      padding: "2rem 1rem",
      maxWidth: "760px",
      margin: "0 auto",
    },
    backBtn: {
      background: "none",
      border: "0.5px solid #e0e0e0",
      borderRadius: "8px",
      padding: "6px 14px",
      fontSize: "13px",
      cursor: "pointer",
      marginBottom: "1.5rem",
      color: "#888",
    },
    hero: {
      textAlign: "center",
      padding: "1.5rem 1rem 2rem",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: "#fce4ec",
      border: "0.5px solid #f8bbd0",
      borderRadius: "999px",
      padding: "5px 14px",
      fontSize: "13px",
      color: "#c2185b",
      marginBottom: "1.25rem",
    },
    h1: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#1a1a2e",
      marginBottom: "0.75rem",
    },
    heroP: {
      fontSize: "15px",
      color: "#888",
      lineHeight: "1.6",
      maxWidth: "480px",
      margin: "0 auto",
    },
    divider: {
      height: "0.5px",
      background: "#f0e0e8",
      margin: "2rem 0",
    },
    sectionLabel: {
      fontSize: "11px",
      fontWeight: "600",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "#bbb",
      marginBottom: "0.75rem",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: "10px",
    },
    card: {
      background: "white",
      border: "0.5px solid #f0e0e8",
      borderRadius: "12px",
      padding: "1rem 1.1rem",
    },
    stackCard: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    stackIcon: {
      width: "34px",
      height: "34px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      fontSize: "16px",
    },
    stackLabel: {
      fontSize: "13px",
      fontWeight: "500",
      color: "#1a1a2e",
      margin: "0 0 2px",
    },
    stackSub: {
      fontSize: "12px",
      color: "#aaa",
    },
    teamCard: {
      textAlign: "center",
    },
    avatar: {
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: "600",
      margin: "0 auto 0.75rem",
    },
    teamName: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#1a1a2e",
      margin: "0 0 3px",
    },
    teamNim: {
      fontSize: "11px",
      color: "#ccc",
      margin: "0 0 8px",
    },
    roleBadge: {
      display: "inline-block",
      fontSize: "11px",
      padding: "3px 10px",
      borderRadius: "999px",
      fontWeight: "500",
    },
  }

  return (
    <div style={s.wrap}>
      <button style={s.backBtn} onClick={onBack}>← Kembali</button>

      {/* Hero */}
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

      {/* Tech Stack */}
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

      {/* Tim */}
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
  )
}

export default AboutPage