import { useState, useEffect } from "react"

// ── Helpers ────────────────────────────────────────────────────────
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
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function hitungHariLagi(dateStr) {
  if (!dateStr) return null
  const target = new Date(dateStr)
  const sekarang = new Date()
  target.setHours(0, 0, 0, 0)
  sekarang.setHours(0, 0, 0, 0)
  const diff = Math.round((target - sekarang) / (1000 * 60 * 60 * 24))
  if (diff === 0) return "hari ini"
  if (diff < 0) return `${Math.abs(diff)} hari lalu`
  return `${diff} hari lagi`
}

// ── Notification ────────────────────────────────────────────────────
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
        background: c.bg, border: `1.5px solid ${c.border}`,
        borderRadius: "16px", padding: "14px 18px",
        display: "flex", alignItems: "center", gap: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
        animation: "slideInNotif 0.3s ease",
        minWidth: "280px", maxWidth: "380px",
      }}>
        <span style={{ fontSize: "22px", flexShrink: 0 }}>{c.icon}</span>
        <span style={{ flex: 1, fontSize: "14px", fontWeight: "600", color: c.text, lineHeight: 1.4 }}>
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

// ── Edit Jadwal Modal ───────────────────────────────────────────────
function EditJadwalModal({ jadwal, onSave, onClose }) {
  const [form, setForm] = useState({ ...jadwal })

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9998,
      background: "rgba(0,0,0,0.35)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        background: "white", borderRadius: "20px",
        padding: "2rem", maxWidth: "440px", width: "90%",
        boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
      }}>
        <h3 style={{ margin: "0 0 1.25rem", color: "#e91e8c", fontSize: "18px", fontWeight: "700" }}>
          ✏️ Edit Jadwal Imunisasi
        </h3>

        {[
          { label: "Nama Vaksin", key: "vaccine_name", type: "text" },
          { label: "Tanggal", key: "scheduled_date", type: "date" },
          { label: "Jam Mulai", key: "time_start", type: "time" },
          { label: "Jam Selesai", key: "time_end", type: "time" },
          { label: "Lokasi", key: "location_name", type: "text" },
          { label: "Alamat", key: "address", type: "text" },
        ].map(({ label, key, type }) => (
          <div key={key} style={{ marginBottom: "0.85rem" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#888", display: "block", marginBottom: "4px" }}>
              {label}
            </label>
            <input
              type={type}
              value={form[key] ?? ""}
              onChange={e => handleChange(key, e.target.value)}
              style={{
                width: "100%", padding: "8px 12px",
                borderRadius: "10px", border: "1.5px solid #f0c0d0",
                fontSize: "14px", outline: "none",
                fontFamily: "inherit", boxSizing: "border-box",
              }}
            />
          </div>
        ))}

        <div style={{ display: "flex", gap: "12px", marginTop: "1rem" }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "10px", borderRadius: "12px",
            border: "1px solid #e0e0e0", background: "white",
            color: "#666", fontWeight: "600", fontSize: "14px", cursor: "pointer",
          }}>Batal</button>
          <button onClick={() => onSave(form)} style={{
            flex: 1, padding: "10px", borderRadius: "12px",
            border: "none", background: "linear-gradient(135deg, #e91e8c, #f48fb1)",
            color: "white", fontWeight: "600", fontSize: "14px", cursor: "pointer",
          }}>Simpan</button>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ──────────────────────────────────────────────────
export default function DetailJadwal({ onLogout, setActivePage, selectedChild, scheduleData }) {
  const { notif, showNotif, closeNotif } = useNotification()
  const [showEdit, setShowEdit] = useState(false)
  const [jadwal, setJadwal] = useState(null)
  const [reminderSet, setReminderSet] = useState(false)

  useEffect(() => {
    if (scheduleData) {
      setJadwal(scheduleData)
      return
    }
    // Fallback dari localStorage 
    const stored = localStorage.getItem("activeSchedule")
    if (stored) {
      try { setJadwal(JSON.parse(stored)) } catch { setJadwal(dummyJadwal) }
      return
    }
    setJadwal(dummyJadwal)
  }, [scheduleData])

  // Data anak: dari props atau localStorage
  const child = selectedChild ?? (() => {
    try { return JSON.parse(localStorage.getItem("selectedChild")) } catch { return null }
  })()

  const handleSaveEdit = (updated) => {
    setJadwal(updated)
    localStorage.setItem("activeSchedule", JSON.stringify(updated))
    setShowEdit(false)
    showNotif("Jadwal berhasil diperbarui", "success")
  }

  const handlePasangPengingat = () => {
    setReminderSet(true)
    showNotif("Pengingat berhasil dipasang! 🔔", "success")
  }

  if (!jadwal) return (
    <div style={{ ...s.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#e91e8c", fontWeight: "600" }}>Memuat data jadwal...</p>
    </div>
  )

  const hariLagi = hitungHariLagi(jadwal.scheduled_date)
  const isUpcoming = jadwal.scheduled_date && new Date(jadwal.scheduled_date) >= new Date()

  return (
    <div style={s.page}>
      <Notification message={notif.message} type={notif.type} onClose={closeNotif} />
      {showEdit && (
        <EditJadwalModal
          jadwal={jadwal}
          onSave={handleSaveEdit}
          onClose={() => setShowEdit(false)}
        />
      )}

      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.logo}>ByeBye<span style={s.logoPink}>Virus</span></span>
        <a style={s.navLink} onClick={() => setActivePage?.("home")}>Home</a>
        <a style={{ ...s.navLink }} onClick={() => setActivePage?.("jadwal")}>Jadwal Imunisasi</a>
        <a style={s.navLink} onClick={() => setActivePage?.("faskes")}>Faskes Map</a>
        <div style={s.avatarBtn} onClick={onLogout} title="Logout">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#e91e8c">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
      </nav>

      {/* Main Content */}
      <div style={s.main}>

        {/* Left Panel: Jadwal Card */}
        <div style={s.leftPanel}>
          <div style={s.leftCard}>
            <div style={s.leftCardHeader}>
              <span style={s.leftCardTitle}>Jadwal Imunisasi</span>
            </div>
            <div style={s.leftCardBody}>
              {/* Vaccine Card */}
              <div style={s.vaccineCard}>
                <div style={s.vaccineCardTop}>
                  <div style={s.vaccineNameRow}>
                    <span style={s.clockIcon}>🕐</span>
                    <span style={s.vaccineName}>{jadwal.vaccine_name ?? "BCG"}</span>
                  </div>
                  <span style={s.validasiTag}>Validasi</span>
                </div>
                <div style={s.vaccineSubtitle}>
                  {jadwal.dose_label ?? "Vaksin Tuberkolosis Dosis 3"}
                </div>
                <div style={s.vaccineInfoRow}>
                  <span>📅</span>
                  <span>
                    {jadwal.scheduled_date
                      ? new Date(jadwal.scheduled_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
                      : "-"}
                    {jadwal.time_start && (
                      <span style={{ color: "#2196f3", fontWeight: "600" }}>
                        {" "}| {jadwal.time_start}{jadwal.time_end ? ` - ${jadwal.time_end}` : ""}
                      </span>
                    )}
                  </span>
                </div>
                <div style={s.vaccineInfoRow}>
                  <span>📍</span>
                  <span style={{ fontSize: "12px", color: "#555" }}>
                    {jadwal.address ?? "Jl. Ruhui Rahayu II No. 789, Balikpapan Selatan"}
                  </span>
                </div>
                <button style={s.lihatDetailBtn} onClick={() => {}}>
                  📋 Lihat Detail
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Detail Jadwal */}
        <div style={s.rightPanel}>
          <div style={s.detailCard}>

            {/* Header */}
            <div style={s.detailHeader}>
              <div style={s.detailTitleRow}>
                <div style={s.detailTitleBar} />
                <h2 style={s.detailTitle}>Detail jadwal</h2>
              </div>
            </div>

            {/* Notifikasi Imunisasi Berikutnya */}
            {isUpcoming && (
              <div style={s.notifBanner}>
                <span style={s.notifBell}>🔔</span>
                <span style={s.notifText}>
                  Imunisasi berikutnya: {jadwal.vaccine_name ?? "BCG"} –{" "}
                  {jadwal.scheduled_date
                    ? new Date(jadwal.scheduled_date).toLocaleDateString("id-ID", {
                        day: "numeric", month: "long", year: "numeric",
                      })
                    : "-"}
                  {hariLagi ? ` (${hariLagi})` : ""}
                </span>
              </div>
            )}

            {/* Two Columns */}
            <div style={s.columnsRow}>

              {/* Kolom Kiri: Info Anak & Jadwal */}
              <div style={s.column}>
                <div style={s.columnDotLine}>
                  <div style={s.columnDot} />
                  <div style={s.columnLine} />
                </div>
                <div style={s.columnContent}>
                  <h3 style={s.columnTitle}>{jadwal.vaccine_name ?? "BCG"}</h3>
                  <div style={s.infoBox}>
                    {[
                      { label: "Nama", value: child?.name ?? "—" },
                      { label: "Usia", value: hitungUmur(child?.birth_date) },
                      { label: "Vaksin", value: jadwal.vaccine_name ?? "—" },
                      { label: "Tanggal", value: formatTanggal(jadwal.scheduled_date) },
                      {
                        label: "Waktu",
                        value: jadwal.time_start
                          ? `${jadwal.time_start}${jadwal.time_end ? ` - ${jadwal.time_end}` : ""} WIB`
                          : "—",
                      },
                      { label: "Lokasi", value: jadwal.location_name ?? "—" },
                      { label: "Alamat", value: jadwal.address ?? "—" },
                    ].map(({ label, value }) => (
                      <div key={label} style={s.infoRow}>
                        <span style={s.infoLabel}>{label}</span>
                        <span style={s.infoSep}>:</span>
                        <span style={s.infoValue}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Informasi Tambahan */}
              <div style={s.column}>
                <div style={s.columnDotLine}>
                  <div style={{ ...s.columnDot, background: "#e91e8c" }} />
                  <div style={s.columnLine} />
                </div>
                <div style={s.columnContent}>
                  <h3 style={s.columnTitle}>Informasi Tambahan</h3>
                  <div style={s.infoBox}>
                    <p style={s.persiapanTitle}>Persiapan sebelum datang :</p>
                    <ul style={s.persiapanList}>
                      <li>Bawa KIA (Kartu Identitas Anak)</li>
                      <li>Bawa KMS (Kartu Menuju Sehat)</li>
                      <li>Pastikan anak dalam kondisi sehat</li>
                      <li>Datang 15 menit sebelum jadwal</li>
                    </ul>
                    {jadwal.notes && (
                      <>
                        <p style={{ ...s.persiapanTitle, marginTop: "0.75rem" }}>Catatan :</p>
                        <p style={{ fontSize: "13px", color: "#555", margin: 0 }}>{jadwal.notes}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={s.actionRow}>
              <button
                style={{
                  ...s.btnSecondary,
                  ...(reminderSet ? s.btnReminderActive : {}),
                }}
                onClick={handlePasangPengingat}
                disabled={reminderSet}
              >
                🔔 {reminderSet ? "Pengingat Terpasang" : "Pasang pengingat"}
              </button>
              <button style={s.btnPrimary} onClick={() => setShowEdit(true)}>
                ✏️ Edit jadwal
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

// ── Dummy data fallback ─────────────────────────────────────────────
const dummyJadwal = {
  vaccine_name: "BCG",
  dose_label: "Vaksin Tuberkolosis Dosis 3",
  scheduled_date: "2025-07-07",
  time_start: "08.00",
  time_end: "10.00",
  location_name: "UPTD Puskemas Gn. Bahagia",
  address: "Jl. Ruhui Rahayu II No. 789, Balikpapan Selatan",
  notes: "",
}

// ── Styles ──────────────────────────────────────────────────────────
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
  avatarBtn: {
    width: "36px", height: "36px", borderRadius: "50%",
    background: "#fce4ec", display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer", marginLeft: "auto",
  },

  main: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "1.5rem",
    padding: "1.5rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    alignItems: "start",
  },

  // Left panel
  leftPanel: {},
  leftCard: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(233,30,140,0.10)",
  },
  leftCardHeader: {
    background: "linear-gradient(135deg, #e91e8c 0%, #f48fb1 100%)",
    padding: "1.1rem 1.25rem",
  },
  leftCardTitle: {
    color: "white",
    fontWeight: "800",
    fontSize: "18px",
    letterSpacing: "0.01em",
  },
  leftCardBody: { padding: "1rem" },

  vaccineCard: {
    background: "white",
    border: "1px solid #fce4ec",
    borderRadius: "16px",
    padding: "1rem 1.1rem",
    boxShadow: "0 2px 8px rgba(233,30,140,0.07)",
  },
  vaccineCardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
  vaccineNameRow: { display: "flex", alignItems: "center", gap: "6px" },
  clockIcon: { fontSize: "16px" },
  vaccineName: { fontWeight: "700", fontSize: "16px", color: "#1a1a2e" },
  validasiTag: {
    background: "#fce4ec",
    color: "#e91e8c",
    fontWeight: "700",
    fontSize: "11px",
    padding: "3px 10px",
    borderRadius: "20px",
    border: "1px solid #f48fb1",
  },
  vaccineSubtitle: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "10px",
    marginLeft: "22px",
  },
  vaccineInfoRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    fontSize: "12px",
    color: "#555",
    marginBottom: "6px",
  },
  lihatDetailBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "9px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #2196f3, #64b5f6)",
    color: "white",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer",
  },

  // Right panel
  rightPanel: {},
  detailCard: {
    background: "white",
    borderRadius: "20px",
    padding: "1.75rem 2rem",
    boxShadow: "0 4px 20px rgba(233,30,140,0.08)",
    border: "1.5px solid #fce4ec",
  },
  detailHeader: { marginBottom: "1rem" },
  detailTitleRow: { display: "flex", alignItems: "center", gap: "10px" },
  detailTitleBar: {
    width: "4px",
    height: "24px",
    background: "#e91e8c",
    borderRadius: "4px",
    flexShrink: 0,
  },
  detailTitle: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#e91e8c",
    margin: 0,
  },

  notifBanner: {
    background: "#f0fdf4",
    border: "1px solid #86efac",
    borderRadius: "12px",
    padding: "0.85rem 1.1rem",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "1.25rem",
  },
  notifBell: { fontSize: "20px", flexShrink: 0 },
  notifText: { fontSize: "14px", fontWeight: "600", color: "#166534" },

  columnsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.25rem",
    marginBottom: "1.5rem",
  },

  column: { display: "flex", gap: "10px", alignItems: "flex-start" },
  columnDotLine: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "6px",
    flexShrink: 0,
  },
  columnDot: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#f48fb1",
    border: "2px solid #e91e8c",
    flexShrink: 0,
    zIndex: 1,
  },
  columnLine: {
    width: "2px",
    flex: 1,
    background: "#f0c0d0",
    marginTop: "4px",
    minHeight: "160px",
  },
  columnContent: { flex: 1 },
  columnTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: "0 0 0.75rem 0",
  },

  infoBox: {
    background: "#fff5f8",
    borderRadius: "12px",
    padding: "0.85rem 1rem",
    border: "1px solid #fce4ec",
  },
  infoRow: {
    display: "flex",
    gap: "6px",
    fontSize: "13px",
    color: "#333",
    marginBottom: "5px",
    alignItems: "flex-start",
    lineHeight: 1.5,
  },
  infoLabel: { minWidth: "70px", color: "#888", flexShrink: 0 },
  infoSep: { color: "#ccc", flexShrink: 0 },
  infoValue: { color: "#1a1a2e", flex: 1 },

  persiapanTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#444",
    margin: "0 0 8px 0",
  },
  persiapanList: {
    margin: 0,
    paddingLeft: "1.1rem",
    fontSize: "13px",
    color: "#555",
    lineHeight: 1.7,
  },

  actionRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  },
  btnSecondary: {
    padding: "10px 20px",
    borderRadius: "12px",
    border: "1.5px solid #bdbdbd",
    background: "#f5f5f5",
    color: "#555",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  btnReminderActive: {
    background: "#e8f5e9",
    border: "1.5px solid #4caf50",
    color: "#2e7d32",
    cursor: "default",
  },
  btnPrimary: {
    padding: "10px 22px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #2196f3, #64b5f6)",
    color: "white",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
}