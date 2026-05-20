import Navbar from "./Navbar"

export default function ProfilPengguna({ user, activePage, setActivePage, onBack, onLogout }) {
  const fullName = user?.name || user?.fullName || "Pengguna"
  const email = user?.email || "Email tidak tersedia"
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("")

  return (
    <div style={s.page}>
      <Navbar activePage={activePage} setActivePage={setActivePage} onLogout={onLogout} />
      <div style={s.container}>
        <button type="button" style={s.backBtn} onClick={onBack}>
          ← Kembali
        </button>

        {/* Hero */}
        <div style={s.hero}>
          <div style={s.avatarWrap}>
            <div style={s.avatar}>{initials}</div>
            <div style={s.statusDot} />
          </div>
          <div>
            <h1 style={s.heroName}>{fullName}</h1>
            <p style={s.heroEmail}>{email}</p>
            <span style={s.badge}>✓ Akun Aktif</span>
          </div>
        </div>

        {/* Info grid */}
        <div style={s.grid}>
          <div style={s.card}>
            <div style={s.cardLabel}>Nama Lengkap</div>
            <div style={s.cardValue}>{fullName}</div>
            <div style={s.cardSub}>Nama terdaftar</div>
          </div>
          <div style={s.card}>
            <div style={s.cardLabel}>Email</div>
            <div style={{ ...s.cardValue, fontSize: "14px" }}>{email}</div>
            <div style={s.cardSub}>Email utama</div>
          </div>
          <div style={s.card}>
            <div style={s.cardLabel}>Status Akun</div>
            <div style={{ ...s.cardValue, color: "#2e7d32" }}>Aktif</div>
            <div style={s.cardSub}>Tidak ada masalah</div>
          </div>
          <div style={s.card}>
            <div style={s.cardLabel}>Akses Cepat</div>
            <div style={{ ...s.cardValue, fontSize: "13px", fontWeight: "400", lineHeight: "1.6" }}>
              Gunakan tombol avatar di header untuk kembali ke profil kapan saja.
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={s.actionsBar}>
          <span style={s.actionInfo}>ℹ Akses profil kapan saja lewat tombol avatar di header.</span>
          <button type="button" style={s.logoutBtn} onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#fff",
    color: "#1a1a2e",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  container: {
    maxWidth: "820px",
    margin: "0 auto",
    padding: "1.75rem 1rem 3rem",
  },
  backBtn: {
    background: "none",
    border: "0.5px solid #e0e0e0",
    borderRadius: "8px",
    padding: "7px 14px",
    fontSize: "13px",
    cursor: "pointer",
    color: "#555",
    marginBottom: "1.25rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },

  // Hero
  hero: {
    background: "#fbeaf0",
    border: "0.5px solid #f4c0d1",
    borderRadius: "16px",
    padding: "1.75rem 2rem",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    flexWrap: "wrap",
  },
  avatarWrap: {
    position: "relative",
    flexShrink: 0,
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#e91e8c",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
    fontWeight: "600",
    border: "3px solid #fff",
  },
  statusDot: {
    position: "absolute",
    bottom: "4px",
    right: "4px",
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#4caf50",
    border: "2px solid #fbeaf0",
  },
  heroName: {
    margin: "0 0 4px",
    fontSize: "22px",
    fontWeight: "700",
    color: "#72243e",
  },
  heroEmail: {
    margin: "0 0 12px",
    fontSize: "14px",
    color: "#993556",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    background: "#e91e8c",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "600",
    padding: "4px 12px",
    borderRadius: "999px",
  },

  // Info grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "10px",
    marginBottom: "10px",
  },
  card: {
    background: "#fff",
    border: "0.5px solid #ececec",
    borderLeft: "3px solid #e91e8c",
    borderRadius: "0 12px 12px 0",
    padding: "1.1rem 1.2rem",
  },
  cardLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#e91e8c",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    marginBottom: "8px",
  },
  cardValue: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1a1a2e",
    lineHeight: "1.5",
  },
  cardSub: {
    fontSize: "12px",
    color: "#aaa",
    marginTop: "3px",
  },

  // Actions bar
  actionsBar: {
    background: "#fff",
    border: "0.5px solid #ececec",
    borderRadius: "12px",
    padding: "1.1rem 1.4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
  },
  actionInfo: {
    fontSize: "13px",
    color: "#999",
  },
  logoutBtn: {
    background: "#e91e8c",
    border: "none",
    borderRadius: "999px",
    color: "#fff",
    padding: "9px 22px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
}