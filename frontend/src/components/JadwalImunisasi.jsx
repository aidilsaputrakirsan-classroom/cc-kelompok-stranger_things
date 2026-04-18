import { useState, useEffect } from "react"
import {
  Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, Legend
} from "recharts"
import { fetchChildren, deleteChild } from "../services/api"

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

function hitungUmur(birthDate) {
  if (!birthDate) return "-"
  const lahir = new Date(birthDate)
  const sekarang = new Date()
  const bulan =
    (sekarang.getFullYear() - lahir.getFullYear()) * 12 +
    (sekarang.getMonth() - lahir.getMonth())
  if (bulan < 12) return `${bulan} bulan`
  return `${Math.floor(bulan / 12)} tahun ${bulan % 12} bulan`
}

function formatTanggal(dateStr) {
  if (!dateStr) return "-"
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "2-digit", month: "short", year: "numeric",
  })
}

// ── Notification (inline) ─────────────────────────────────────────
function useNotification() {
  const [notif, setNotif] = useState({ message: "", type: "success" })
  const showNotif = (message, type = "success") => setNotif({ message, type })
  const closeNotif = () => setNotif({ message: "", type: "success" })
  return { notif, showNotif, closeNotif }
}

function Notification({ message, type = "success", onClose }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [message])

  if (!message) return null

  const colors = {
    success: { bg: "#e8f5e9", border: "#4caf50", icon: "✅", text: "#2e7d32" },
    error:   { bg: "#fce4ec", border: "#e91e8c", icon: "❌", text: "#c62828" },
    info:    { bg: "#e3f2fd", border: "#2196f3", icon: "ℹ️", text: "#1565c0" },
  }
  const c = colors[type] ?? colors.success

  return (
    <>
      <style>{`
        @keyframes slideInNotif {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      <div style={{
        position: "fixed", top: "24px", right: "24px", zIndex: 9999,
        background: c.bg,
        border: `1.5px solid ${c.border}`,
        borderRadius: "16px",
        padding: "14px 18px",
        display: "flex", alignItems: "center", gap: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
        animation: "slideInNotif 0.3s ease",
        minWidth: "280px", maxWidth: "380px",
      }}>
        <span style={{ fontSize: "22px", flexShrink: 0 }}>{c.icon}</span>
        <span style={{
          flex: 1, fontSize: "14px", fontWeight: "600",
          color: c.text, lineHeight: 1.4,
        }}>
          {message}
        </span>
        <button onClick={onClose} style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: "20px", color: c.text, padding: "0 2px",
          lineHeight: 1, flexShrink: 0, opacity: 0.7,
        }}>×</button>
      </div>
    </>
  )
}

// ── Confirm Dialog (pengganti window.confirm) ─────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }) {
  if (!message) return null
  return (
    <>
      <style>{`
        @keyframes fadeInDialog {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div style={{
        position: "fixed", inset: 0, zIndex: 9998,
        background: "rgba(0,0,0,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          background: "white", borderRadius: "20px",
          padding: "2rem 2.5rem", maxWidth: "360px", width: "90%",
          boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
          animation: "fadeInDialog 0.2s ease",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "40px", marginBottom: "1rem" }}>🗑️</div>
          <p style={{
            fontSize: "15px", fontWeight: "600",
            color: "#1a1a2e", marginBottom: "1.5rem", lineHeight: 1.5,
          }}>
            {message}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button onClick={onCancel} style={{
              flex: 1, padding: "10px", borderRadius: "12px",
              border: "1px solid #e0e0e0", background: "white",
              color: "#666", fontWeight: "600", fontSize: "14px", cursor: "pointer",
            }}>
              Batal
            </button>
            <button onClick={onConfirm} style={{
              flex: 1, padding: "10px", borderRadius: "12px",
              border: "none", background: "linear-gradient(135deg, #e91e8c, #f48fb1)",
              color: "white", fontWeight: "600", fontSize: "14px", cursor: "pointer",
            }}>
              Hapus
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
// ─────────────────────────────────────────────────────────────────

export default function JadwalImunisasi({ onLogout, activePage, setActivePage }) {
  const [childrenList, setChildrenList] = useState([])
  const [selectedChild, setSelectedChild] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { notif, showNotif, closeNotif } = useNotification()
  const [confirmDialog, setConfirmDialog] = useState({ message: "", child: null })

  useEffect(() => {
    loadChildren()
  }, [])

  const loadChildren = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchChildren()
      setChildrenList(data ?? [])
    } catch (err) {
      console.error(err)
      setError("Gagal memuat data anak.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteConfirm = async () => {
    const child = confirmDialog.child
    setConfirmDialog({ message: "", child: null })
    try {
      await deleteChild(child.id)
      if (selectedChild?.id === child.id) setSelectedChild(null)
      loadChildren()
      showNotif(`Data ${child.name} berhasil dihapus`, "success")
    } catch {
      showNotif("Gagal menghapus data anak.", "error")
    }
  }

  return (
    <div style={s.page}>
      {/* Notification */}
      <Notification message={notif.message} type={notif.type} onClose={closeNotif} />

      {/* Confirm Dialog */}
      <ConfirmDialog
        message={confirmDialog.message}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmDialog({ message: "", child: null })}
      />

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

            {loading && <p style={s.emptyText}>Memuat data...</p>}
            {!loading && error && (
              <p style={{ ...s.emptyText, color: "#e53935" }}>{error}</p>
            )}
            {!loading && !error && childrenList.length === 0 && (
              <p style={s.emptyText}>Belum ada data anak.</p>
            )}

            {!loading && childrenList.map((child) => (
              <div
                key={child.id}
                style={{
                  ...s.childRow,
                  ...(selectedChild?.id === child.id ? s.childRowActive : s.childRowInactive),
                }}
                onClick={() => setSelectedChild(child)}
              >
                <div style={s.childAvatarWrap}>
                  {child.gender === "female" ? <GirlAvatar /> : <BoyAvatar />}
                </div>
                <span style={{ ...s.childName, color: selectedChild?.id === child.id ? "white" : "#444" }}>
                  {child.name}
                </span>

                <div style={{ display: "flex", gap: "4px" }} onClick={e => e.stopPropagation()}>
                  <button
                    style={{
                      ...s.iconBtn,
                      background: selectedChild?.id === child.id ? "rgba(255,255,255,0.25)" : "#fff3e0",
                      color: selectedChild?.id === child.id ? "white" : "#fb8c00",
                    }}
                    title="Edit"
                    onClick={() => {
                      localStorage.setItem("editChild", JSON.stringify(child))
                      setActivePage?.("dataAnak")
                    }}
                  >✏️</button>

                  <button
                    style={{
                      ...s.iconBtn,
                      background: selectedChild?.id === child.id ? "rgba(255,255,255,0.25)" : "#fce4ec",
                      color: selectedChild?.id === child.id ? "white" : "#e53935",
                    }}
                    title="Hapus"
                    onClick={() => setConfirmDialog({
                      message: `Hapus data ${child.name}?`,
                      child,
                    })}
                  >🗑️</button>
                </div>
              </div>
            ))}

            <button style={s.tambahAnakBtn} onClick={() => setActivePage?.("dataAnak")}>
              <span style={s.tambahAnakPlus}>+</span>
              Tambah data anak
            </button>
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
                <span>Umur : {hitungUmur(selectedChild.birth_date)}</span>
              </div>
              <div style={s.infoRow}>
                <span style={s.infoIcon}>⚥</span>
                <span>Jenis Kelamin : {selectedChild.gender === "female" ? "Perempuan" : "Laki-laki"}</span>
              </div>
              <div style={s.infoRow}>
                <span style={s.infoIcon}>📅</span>
                <span>Lahir : {formatTanggal(selectedChild.birth_date)}</span>
              </div>
              <div style={s.infoRow}>
                <span style={s.infoIcon}>🕐</span>
                <span>
                  Imunisasi Sebelumnya :{" "}
                  {selectedChild.immunizations?.length
                    ? `${selectedChild.immunizations.length} jadwal`
                    : "Belum ada"}
                </span>
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
            <div style={s.statCardValue}>{selectedChild?.heightNow ? `${selectedChild.heightNow} cm` : "— cm"}</div>
            <div style={s.statCardDelta}>
              <span style={s.arrowUp}>↑</span>
              <span style={s.deltaText}>{selectedChild?.heightDelta ?? "-"}</span>
            </div>
          </div>
          <div style={s.statCard}>
            <div style={s.statCardTitle}>Berat Terkini</div>
            <div style={s.statCardValue}>{selectedChild?.weightNow ? `${selectedChild.weightNow} kg` : "— kg"}</div>
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
    margin: 0,
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
  tambahAnakBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "0.7rem 1rem",
    marginTop: "0.25rem",
    borderRadius: "24px",
    border: "2px dashed #f48fb1",
    background: "transparent",
    color: "#e91e8c",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },
  tambahAnakPlus: { fontSize: "18px", fontWeight: "700", lineHeight: 1 },
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
  chartsRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" },
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
  rightPanel: { display: "flex", flexDirection: "column", gap: "1rem" },
  statCard: {
    background: "white",
    borderRadius: "16px",
    padding: "1.25rem 1.5rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  iconBtn: {
    border: "none",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "13px",
    padding: 0,
    flexShrink: 0,
  },
  statCardTitle: { fontSize: "16px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px" },
  statCardValue: { fontSize: "28px", fontWeight: "700", color: "#2196f3", marginBottom: "8px" },
  statCardDelta: { display: "flex", alignItems: "center", gap: "6px" },
  arrowUp: { fontSize: "18px", color: "#4caf50", fontWeight: "700" },
  deltaText: { fontSize: "12px", color: "#555" },
}