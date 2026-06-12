import { useState, useEffect } from "react"
import { fetchChildren, deleteChild } from "../services/api"
import Navbar from "../components/Navbar"
import DegradedBanner from "../components/DegradedBanner"
import { useTheme } from "../hooks/ThemeContext"

function GirlAvatar() {
  return (
    <svg viewBox="0 0 40 40" width="34" height="34" xmlns="http://www.w3.org/2000/svg">
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
    <svg viewBox="0 0 40 40" width="34" height="34" xmlns="http://www.w3.org/2000/svg">
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
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

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
  }, [message, onClose])

  if (!message) return null

  const colors = {
    success: { bg: "#e8f5e9", border: "#4caf50", icon: "✅", text: "#2e7d32" },
    error: { bg: "#fce4ec", border: "#e91e8c", icon: "❌", text: "#c62828" },
    info: { bg: "#e3f2fd", border: "#2196f3", icon: "ℹ️", text: "#1565c0" },
  }
  const c = colors[type] ?? colors.success

  return (
    <>
      <style>{`
        @keyframes slideInNotif {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 640px) {
          .notif-box {
            top: 12px !important;
            right: 12px !important;
            left: 12px !important;
            min-width: auto !important;
            max-width: none !important;
            padding: 12px 14px !important;
            border-radius: 14px !important;
          }
        }
      `}</style>
      <div
        className="notif-box"
        style={{
          position: "fixed",
          top: "24px",
          right: "24px",
          zIndex: 9999,
          background: c.bg,
          border: `1.5px solid ${c.border}`,
          borderRadius: "16px",
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
          animation: "slideInNotif 0.3s ease",
          minWidth: "280px",
          maxWidth: "380px",
        }}
      >
        <span style={{ fontSize: "20px", flexShrink: 0 }}>{c.icon}</span>
        <span style={{ flex: 1, fontSize: "13px", fontWeight: "600", color: c.text, lineHeight: 1.4 }}>
          {message}
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            color: c.text,
            padding: 0,
            lineHeight: 1,
            flexShrink: 0,
            opacity: 0.75,
          }}
        >
          ×
        </button>
      </div>
    </>
  )
}

function ConfirmDialog({ message, onConfirm, onCancel }) {
  if (!message) return null
  return (
    <>
      <style>{`
        @keyframes fadeInDialog {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 640px) {
          .confirm-box {
            width: min(92vw, 360px) !important;
            padding: 1.25rem !important;
            border-radius: 16px !important;
          }
          .confirm-actions {
            flex-direction: column !important;
          }
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          background: "rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <div
          className="confirm-box"
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "2rem 2.25rem",
            maxWidth: "360px",
            width: "100%",
            boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
            animation: "fadeInDialog 0.2s ease",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "36px", marginBottom: "0.75rem" }}>🗑️</div>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a2e", marginBottom: "1.25rem", lineHeight: 1.5 }}>
            {message}
          </p>
          <div className="confirm-actions" style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
              onClick={onCancel}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "12px",
                border: "1px solid #e0e0e0",
                background: "white",
                color: "#666",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(135deg, #e91e8c, #f48fb1)",
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function isServiceDownError(err) {
  return (
    err?.message?.includes("503") ||
    err?.message?.includes("Service temporarily unavailable") ||
    err?.message?.includes("Failed to fetch")
  )
}

function getStyles(isDark) {
  return {
    page: {
      background: isDark ? "#0f0f1a" : "#fff5f8",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      color: isDark ? "#f0f0f0" : "#1a1a2e",
      fontSize: "14px",
      transition: "background 0.3s, color 0.3s",
    },
    main: {
      display: "grid",
      gridTemplateColumns: "minmax(230px, 280px) minmax(0, 1fr) minmax(160px, 200px)",
      gap: "1rem",
      padding: "1rem 1.25rem",
      maxWidth: "1200px",
      margin: "0 auto",
      alignItems: "start",
    },
    leftPanel: {
      background: isDark ? "#16213e" : "white",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: isDark ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.06)",
    },
    daftarHeader: {
      background: "#e91e8c",
      color: "white",
      fontWeight: "700",
      fontSize: "14px",
      padding: "0.9rem 1rem",
    },
    daftarBody: {
      padding: "0.9rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.55rem",
    },
    emptyText: {
      color: isDark ? "#9ca3af" : "#aaa",
      fontSize: "12px",
      textAlign: "center",
      padding: "0.75rem 0",
      margin: 0,
    },
    errorState: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      padding: "1rem",
      background: isDark ? "#2a1a00" : "#FAEEDA",
      borderRadius: "10px",
      border: `1px solid ${isDark ? "#f59e0b" : "#EF9F27"}`,
      textAlign: "center",
    },
    retryBtn: {
      background: "none",
      border: `1px solid ${isDark ? "#f59e0b" : "#854F0B"}`,
      borderRadius: "8px",
      color: isDark ? "#f59e0b" : "#854F0B",
      padding: "6px 14px",
      fontSize: "12px",
      fontWeight: "600",
      cursor: "pointer",
    },
    childRow: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "0.55rem 0.7rem",
      borderRadius: "20px",
      cursor: "pointer",
      transition: "background 0.2s",
    },
    childRowActive: { background: "#e91e8c" },
    childRowInactive: { background: isDark ? "#2a2a4a" : "#f0f0f0" },
    childAvatarWrap: {
      width: "34px",
      height: "34px",
      borderRadius: "50%",
      overflow: "hidden",
      flexShrink: 0,
    },
    childName: { flex: 1, fontWeight: "600", fontSize: "12.5px", minWidth: 0 },
    tambahAnakBtn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      width: "100%",
      padding: "0.65rem 1rem",
      marginTop: "0.15rem",
      borderRadius: "20px",
      border: "2px dashed #f48fb1",
      background: "transparent",
      color: "#e91e8c",
      fontWeight: "600",
      fontSize: "13px",
      cursor: "pointer",
    },
    tambahAnakPlus: { fontSize: "18px", fontWeight: "700", lineHeight: 1 },
    centerPanel: {
      background: isDark ? "#1a1a2e" : "#fce4ec",
      borderRadius: "16px",
      padding: "1.15rem",
      boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
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
      gap: "10px",
      marginBottom: "0.9rem",
    },
    profileTitle: { fontSize: "16px", fontWeight: "700", color: "#e91e8c", margin: 0 },
    jadwalBtn: {
      background: "#e91e8c",
      color: "white",
      border: "none",
      borderRadius: "20px",
      padding: "0.55rem 0.9rem 0.55rem 1rem",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      textAlign: "left",
    },
    jadwalChevron: { fontSize: "20px", fontWeight: "700", lineHeight: 1 },
    childFullName: {
      fontSize: "18px",
      fontWeight: "700",
      color: isDark ? "#f0f0f0" : "#1a1a2e",
      margin: "0 0 0.75rem 0",
    },
    infoRow: {
      background: isDark ? "#0f0f1a" : "white",
      borderRadius: "18px",
      padding: "0.65rem 0.95rem",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "0.5rem",
      fontSize: "13px",
      color: isDark ? "#f0f0f0" : "#333",
    },
    infoIcon: { fontSize: "15px" },
    rightPanel: {
      display: "flex",
      flexDirection: "column",
      gap: "0.9rem",
    },
    statCard: {
      background: isDark ? "#16213e" : "white",
      borderRadius: "16px",
      padding: "1rem 1rem",
      boxShadow: isDark ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.06)",
    },
    iconBtn: {
      border: "none",
      borderRadius: "50%",
      width: "26px",
      height: "26px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "12px",
      padding: 0,
      flexShrink: 0,
    },
    statCardTitle: {
      fontSize: "14px",
      fontWeight: "700",
      color: isDark ? "#f0f0f0" : "#1a1a2e",
      marginBottom: "6px",
    },
    statCardValue: { fontSize: "24px", fontWeight: "700", color: "#2196f3", marginBottom: "6px" },
    statCardDelta: { display: "flex", alignItems: "center", gap: "6px" },
    arrowUp: { fontSize: "16px", color: "#4caf50", fontWeight: "700" },
    deltaText: { fontSize: "12px", color: isDark ? "#9ca3af" : "#555" },
    desktopOnly: {},
  }
}

export default function JadwalImunisasi({ onLogout, activePage, setActivePage, serviceDown: serviceDownProp = false }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const s = getStyles(isDark)

  const [childrenList, setChildrenList] = useState([])
  const [selectedChild, setSelectedChild] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fetchServiceDown, setFetchServiceDown] = useState(false)
  const { notif, showNotif, closeNotif } = useNotification()
  const [confirmDialog, setConfirmDialog] = useState({ message: "", child: null })

  const isServiceDown = serviceDownProp || fetchServiceDown

  useEffect(() => {
    loadChildren()
  }, [])

  const loadChildren = async () => {
    setLoading(true)
    setError(null)
    setFetchServiceDown(false)
    try {
      const data = await fetchChildren()
      setChildrenList(data ?? [])
    } catch (err) {
      if (isServiceDownError(err)) {
        setFetchServiceDown(true)
        setError("Layanan sedang tidak tersedia. Data mungkin belum terbaru.")
      } else {
        setError("Gagal memuat data anak.")
      }
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
    } catch (err) {
      showNotif(
        isServiceDownError(err) ? "Layanan tidak tersedia. Coba beberapa saat lagi." : "Gagal menghapus data anak.",
        "error"
      )
    }
  }

  return (
    <div className="jadwal-page" style={s.page}>
      <Notification message={notif.message} type={notif.type} onClose={closeNotif} />
      <ConfirmDialog
        message={confirmDialog.message}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmDialog({ message: "", child: null })}
      />

      <Navbar activePage={activePage} setActivePage={setActivePage} onLogout={onLogout} />

      {isServiceDown && (
        <DegradedBanner
          message="Layanan sedang bermasalah. Data anak mungkin tidak ter-update."
          isDark={isDark}
        />
      )}

      <div style={s.main}>
        <div style={s.leftPanel}>
          <div style={s.daftarHeader}>Daftar anak</div>
          <div style={s.daftarBody}>
            {loading && <p style={s.emptyText}>Memuat data...</p>}

            {!loading && isServiceDown && childrenList.length === 0 && (
              <div style={s.errorState}>
                <p style={{ color: isDark ? "#f59e0b" : "#854F0B", margin: 0, fontSize: "12px", lineHeight: 1.5 }}>
                  Tidak dapat memuat data. Periksa koneksi server.
                </p>
                <button style={s.retryBtn} onClick={loadChildren}>
                  🔄 Coba lagi
                </button>
              </div>
            )}

            {!loading && error && !isServiceDown && <p style={{ ...s.emptyText, color: "#e53935" }}>{error}</p>}

            {!loading && !error && childrenList.length === 0 && !isServiceDown && (
              <p style={s.emptyText}>Belum ada data anak.</p>
            )}

            {!loading &&
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
                    {child.gender === "female" ? <GirlAvatar /> : <BoyAvatar />}
                  </div>
                  <span style={{ ...s.childName, color: selectedChild?.id === child.id ? "white" : isDark ? "#f0f0f0" : "#444" }}>
                    {child.name}
                  </span>
                  <div style={{ display: "flex", gap: "4px" }} onClick={(e) => e.stopPropagation()}>
                    <button
                      style={{
                        ...s.iconBtn,
                        background: selectedChild?.id === child.id ? "rgba(255,255,255,0.25)" : isDark ? "#2a1a00" : "#fff3e0",
                        color: selectedChild?.id === child.id ? "white" : "#fb8c00",
                      }}
                      title="Edit"
                      onClick={() => {
                        localStorage.setItem("editChild", JSON.stringify(child))
                        setActivePage?.("dataAnak")
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      style={{
                        ...s.iconBtn,
                        background: selectedChild?.id === child.id ? "rgba(255,255,255,0.25)" : isDark ? "#2a0a0a" : "#fce4ec",
                        color: selectedChild?.id === child.id ? "white" : "#e53935",
                      }}
                      title="Hapus"
                      onClick={() => setConfirmDialog({ message: `Hapus data ${child.name}?`, child })}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}

            <button
              style={s.tambahAnakBtn}
              onClick={() => setActivePage?.("dataAnak")}
              disabled={isServiceDown}
            >
              <span style={s.tambahAnakPlus}>+</span>
              Tambah data anak
            </button>
          </div>
        </div>

        <div style={s.centerPanel}>
          {!selectedChild ? (
            <div style={s.emptyCenter}>
              <span style={{ fontSize: "44px" }}>👶</span>
              <p style={{ color: "#e91e8c", fontWeight: "600", marginTop: "1rem", textAlign: "center" }}>
                {isServiceDown ? "Data tidak dapat dimuat saat ini" : "Pilih anak untuk melihat profil"}
              </p>
            </div>
          ) : (
            <>
              <div style={s.profileHeader}>
                <h2 style={s.profileTitle}>Profil Data Anak</h2>
                <button
                  style={{
                    ...s.jadwalBtn,
                    opacity: isServiceDown ? 0.6 : 1,
                    cursor: isServiceDown ? "not-allowed" : "pointer",
                  }}
                  onClick={() => {
                    if (isServiceDown) return
                    if (selectedChild) localStorage.setItem("selectedChild", JSON.stringify(selectedChild))
                    setActivePage?.("detailJadwal")
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "13px" }}>Jadwal Imunisasi</div>
                    <div style={{ fontSize: "10px", opacity: 0.85 }}>
                      {isServiceDown ? "Tidak tersedia" : "Lihat detail jadwal"}
                    </div>
                  </div>
                  <span style={s.jadwalChevron}>›</span>
                </button>
              </div>

              <h3 style={s.childFullName}>{selectedChild.name}</h3>

              <div style={s.infoRow}>
                <span style={s.infoIcon}>🍼</span>
                <span>Umur: {hitungUmur(selectedChild.birth_date)}</span>
              </div>
              <div style={s.infoRow}>
                <span style={s.infoIcon}>⚥</span>
                <span>Jenis Kelamin: {selectedChild.gender === "female" ? "Perempuan" : "Laki-laki"}</span>
              </div>
              <div style={s.infoRow}>
                <span style={s.infoIcon}>📅</span>
                <span>Lahir: {formatTanggal(selectedChild.birth_date)}</span>
              </div>
              <div style={s.infoRow}>
                <span style={s.infoIcon}>🕐</span>
                <span>
                  Imunisasi Sebelumnya:{" "}
                  {selectedChild.immunizations?.length ? `${selectedChild.immunizations.length} jadwal` : "Belum ada"}
                </span>
              </div>
            </>
          )}
        </div>

        <div style={s.rightPanel}>
          <div style={s.statCard}>
            <div style={s.statCardTitle}>Tinggi Terkini</div>
            <div style={s.statCardValue}>
              {isServiceDown ? "—" : selectedChild?.heightNow ? `${selectedChild.heightNow} cm` : "— cm"}
            </div>
            <div style={s.statCardDelta}>
              <span style={s.arrowUp}>↑</span>
              <span style={s.deltaText}>{isServiceDown ? "-" : selectedChild?.heightDelta ?? "-"}</span>
            </div>
          </div>

          <div style={s.statCard}>
            <div style={s.statCardTitle}>Berat Terkini</div>
            <div style={s.statCardValue}>
              {isServiceDown ? "—" : selectedChild?.weightNow ? `${selectedChild.weightNow} kg` : "— kg"}
            </div>
            <div style={s.statCardDelta}>
              <span style={s.arrowUp}>↑</span>
              <span style={s.deltaText}>{isServiceDown ? "-" : selectedChild?.weightDelta ?? "-"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
