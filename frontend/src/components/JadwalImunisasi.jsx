import { useState } from "react"
import {
  Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, Legend
} from "recharts"

const childrenList = []

function GirlAvatar() {
  return (
    <svg viewBox="0 0 40 40" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#fce4ec" />
      <circle cx="20" cy="16" r="9" fill="#f48fb1" />
      <circle cx="20" cy="16" r="7" fill="#fce4ec" />
      <ellipse cx="17" cy="15" rx="1.2" ry="1.4" fill="#333" />
      <ellipse cx="23" cy="15" rx="1.2" ry="1.4" fill="#333" />
      <path d="M17 19 Q20 22 23 19" stroke="#e91e8c" strokeWidth="1" fill="none" strokeLinecap="round" />
      <rect x="13" y="8" width="14" height="7" rx="3.5" fill="#e91e8c" />
      <circle cx="20" cy="28" r="8" fill="#f48fb1" />
      <path d="M14 25 Q20 23 26 25 L27 36 Q20 39 13 36Z" fill="#e91e8c" />
    </svg>
  )
}

function BoyAvatar() {
  return (
    <svg viewBox="0 0 40 40" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#e3f2fd" />
      <circle cx="20" cy="16" r="9" fill="#90caf9" />
      <circle cx="20" cy="16" r="7" fill="#e3f2fd" />
      <ellipse cx="17" cy="15" rx="1.2" ry="1.4" fill="#333" />
      <ellipse cx="23" cy="15" rx="1.2" ry="1.4" fill="#333" />
      <path d="M17 19 Q20 22 23 19" stroke="#1e88e5" strokeWidth="1" fill="none" strokeLinecap="round" />
      <rect x="13" y="8" width="14" height="5" rx="2.5" fill="#1e88e5" />
      <circle cx="20" cy="28" r="8" fill="#90caf9" />
      <path d="M14 25 Q20 23 26 25 L27 36 Q20 39 13 36Z" fill="#1e88e5" />
    </svg>
  )
}

export default function JadwalImunisasi({ onLogout, activePage, setActivePage }) {
  const [selectedChild, setSelectedChild] = useState(null)

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.logo}>ByeBye<span style={s.logoPink}>Virus</span></span>
        <a style={s.navLink} onClick={() => setActivePage?.("home")}>Home</a>
        <a style={{ ...s.navLink, ...s.navActive }}>Jadwal Imunisasi</a>
        <a style={s.navLink} onClick={() => setActivePage?.("faskes")}>Faskes Map</a>
        <div style={s.avatar} onClick={onLogout} title="Logout">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#e91e8c">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
      </nav>

      {/* Main Layout */}
      <div style={s.main}>

        {/* Left: Daftar Anak */}
        <div style={s.leftPanel}>
          <div style={s.daftarHeader}>Daftar anak</div>
          <div style={s.daftarBody}>
            {childrenList.length === 0 ? (
              <p style={s.emptyText}>Belum ada data anak.</p>
            ) : (
              childrenList.map((child) => (
                <div
                  key={child.id}
                  style={{
                    ...s.childRow,
                    ...(selectedChild?.id === child.id ? s.childRowActive : s.childRowInactive),
                  }}
                  onClick={() => setSelectedChild(child)}
                >
                  <div style={s.childAvatarWrap}>
                    {child.avatar === "girl" ? <GirlAvatar /> : <BoyAvatar />}
                  </div>
                  <span style={{ ...s.childName, color: selectedChild?.id === child.id ? "white" : "#444" }}>
                    {child.name}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Center: Profil Data Anak */}
        <div style={s.centerPanel}>
          {!selectedChild ? (
            <div style={s.emptyCenter}>
              <span style={{ fontSize: "48px" }}>👶</span>
              <p style={{ color: "#e91e8c", fontWeight: "600", marginTop: "1rem" }}>
                Pilih anak untuk melihat profil
              </p>
            </div>
          ) : (
            <>
              <div style={s.profileHeader}>
                <h2 style={s.profileTitle}>Profil Data Anak</h2>
                <button style={s.jadwalBtn}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "14px" }}>Jadwal Imunisasi</div>
                    <div style={{ fontSize: "11px", opacity: 0.85 }}>Buat jadwal imunisasi</div>
                  </div>
                  <span style={s.jadwalChevron}>›</span>
                </button>
              </div>

              <h3 style={s.childFullName}>{selectedChild.name}</h3>

              <div style={s.infoRow}>
                <span style={s.infoIcon}>🍼</span>
                <span>Umur : {selectedChild.age}</span>
              </div>
              <div style={s.infoRow}>
                <span style={s.infoIcon}>⚥</span>
                <span>Jenis Kelamin : {selectedChild.gender}</span>
              </div>
              <div style={s.infoRow}>
                <span style={s.infoIcon}>📅</span>
                <span>Lahir : {selectedChild.birthDate}</span>
              </div>
              <div style={s.infoRow}>
                <span style={s.infoIcon}>🕐</span>
                <span>Imunisasi Sebelumnya : {selectedChild.prevVaccines}</span>
              </div>

              <h3 style={s.statsTitle}>Statistik</h3>
              <div style={s.chartsRow}>
                <div style={s.chartBox}>
                  {selectedChild.weightData?.length > 0 ? (
                    <ResponsiveContainer width="100%" height={180}>
                      <AreaChart data={selectedChild.weightData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#42a5f5" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#42a5f5" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="bulan" tick={{ fontSize: 10 }} />
                        <YAxis tickFormatter={(v) => `${v} kg`} tick={{ fontSize: 10 }} />
                        <Tooltip formatter={(v, n) => [`${v} kg`, n === "anak" ? "Berat anak" : "Berat Ideal"]} />
                        <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ fontSize: 11 }}>{v === "anak" ? "Berat anak" : "Berat Ideal"}</span>} />
                        <Area type="monotone" dataKey="anak" stroke="#1565c0" strokeWidth={2} fill="url(#weightGrad)" dot={{ r: 4, fill: "#1565c0" }} name="anak" />
                        <Line type="monotone" dataKey="ideal" stroke="#aaa" strokeWidth={1.5} strokeDasharray="4 3" dot={false} name="ideal" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={s.noData}>Data belum ada</div>
                  )}
                </div>

                <div style={s.chartBox}>
                  {selectedChild.heightData?.length > 0 ? (
                    <ResponsiveContainer width="100%" height={180}>
                      <AreaChart data={selectedChild.heightData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="heightGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#42a5f5" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#42a5f5" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="bulan" tick={{ fontSize: 10 }} />
                        <YAxis tickFormatter={(v) => `${v} cm`} tick={{ fontSize: 10 }} />
                        <Tooltip formatter={(v, n) => [`${v} cm`, n === "anak" ? "Tinggi anak" : "Tinggi Ideal"]} />
                        <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ fontSize: 11 }}>{v === "anak" ? "Tinggi anak" : "Tinggi Ideal"}</span>} />
                        <Area type="monotone" dataKey="anak" stroke="#1565c0" strokeWidth={2} fill="url(#heightGrad)" dot={{ r: 4, fill: "#1565c0" }} name="anak" />
                        <Line type="monotone" dataKey="ideal" stroke="#aaa" strokeWidth={1.5} strokeDasharray="4 3" dot={false} name="ideal" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={s.noData}>Data belum ada</div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right: Stats Cards */}
        <div style={s.rightPanel}>
          <div style={s.statCard}>
            <div style={s.statCardTitle}>Tinggi Terkini</div>
            <div style={s.statCardValue}>{selectedChild ? `${selectedChild.heightNow} cm` : "— cm"}</div>
            <div style={s.statCardDelta}>
              <span style={s.arrowUp}>↑</span>
              <span style={s.deltaText}>{selectedChild?.heightDelta ?? "-"}</span>
            </div>
          </div>
          <div style={s.statCard}>
            <div style={s.statCardTitle}>Berat Terkini</div>
            <div style={s.statCardValue}>{selectedChild ? `${selectedChild.weightNow} kg` : "— kg"}</div>
            <div style={s.statCardDelta}>
              <span style={s.arrowUp}>↑</span>
              <span style={s.deltaText}>{selectedChild?.weightDelta ?? "-"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const s = {
  page: {
    background: "#fff5f8",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    color: "#1a1a2e",
    fontSize: "14px",
  },
  nav: {
    background: "white",
    borderBottom: "0.5px solid #f0c0d0",
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    height: "56px",
  },
  logo: { fontSize: "18px", fontWeight: "700", color: "#1a1a2e", marginRight: "auto" },
  logoPink: { color: "#e91e8c" },
  navLink: { fontSize: "14px", color: "#888", cursor: "pointer", textDecoration: "none" },
  navActive: { color: "#e91e8c", fontWeight: "600" },
  avatar: {
    width: "36px", height: "36px", borderRadius: "50%",
    background: "#fce4ec", display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer", marginLeft: "auto",
  },
  main: {
    display: "grid",
    gridTemplateColumns: "280px 1fr 200px",
    gap: "1.25rem",
    padding: "1.5rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    alignItems: "start",
  },
  leftPanel: {
    background: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  daftarHeader: {
    background: "#e91e8c",
    color: "white",
    fontWeight: "700",
    fontSize: "15px",
    padding: "1rem 1.25rem",
  },
  daftarBody: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  emptyText: {
    color: "#aaa",
    fontSize: "13px",
    textAlign: "center",
    padding: "1rem 0",
  },
  childRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "0.6rem 0.75rem",
    borderRadius: "24px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  childRowActive: { background: "#e91e8c" },
  childRowInactive: { background: "#f0f0f0" },
  childAvatarWrap: {
    width: "36px", height: "36px", borderRadius: "50%",
    overflow: "hidden", flexShrink: 0,
  },
  childName: { flex: 1, fontWeight: "600", fontSize: "13px" },
  centerPanel: {
    background: "#fce4ec",
    borderRadius: "16px",
    padding: "1.5rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    minHeight: "300px",
  },
  emptyCenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "260px",
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  profileTitle: { fontSize: "18px", fontWeight: "700", color: "#e91e8c", margin: 0 },
  jadwalBtn: {
    background: "#e91e8c",
    color: "white",
    border: "none",
    borderRadius: "24px",
    padding: "0.6rem 1rem 0.6rem 1.25rem",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    textAlign: "left",
  },
  jadwalChevron: { fontSize: "22px", fontWeight: "700", lineHeight: 1 },
  childFullName: { fontSize: "20px", fontWeight: "700", color: "#1a1a2e", margin: "0 0 0.75rem 0" },
  infoRow: {
    background: "white",
    borderRadius: "24px",
    padding: "0.7rem 1.1rem",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "0.5rem",
    fontSize: "14px",
    color: "#333",
  },
  infoIcon: { fontSize: "16px" },
  statsTitle: { fontSize: "17px", fontWeight: "700", color: "#1a1a2e", margin: "1.25rem 0 0.75rem 0" },
  chartsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
  },
  chartBox: {
    background: "white",
    borderRadius: "12px",
    padding: "0.75rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
  noData: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "180px",
    color: "#999",
    fontSize: "13px",
  },
  rightPanel: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  statCard: {
    background: "white",
    borderRadius: "16px",
    padding: "1.25rem 1.5rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  statCardTitle: { fontSize: "16px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px" },
  statCardValue: { fontSize: "28px", fontWeight: "700", color: "#2196f3", marginBottom: "8px" },
  statCardDelta: { display: "flex", alignItems: "center", gap: "6px" },
  arrowUp: { fontSize: "18px", color: "#4caf50", fontWeight: "700" },
  deltaText: { fontSize: "12px", color: "#555" },
}