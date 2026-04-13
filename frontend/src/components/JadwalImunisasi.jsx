import { useState, useEffect } from "react"
import { fetchChildren, createChild, updateChild, deleteChild } from "../services/api"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, Legend
} from "recharts"

// ── Static Data ──
const childrenList = [
  {
    id: "static-1",
    name: "Cintya Widhi Astuti",
    age: "2 Bulan",
    gender: "Perempuan",
    birthDate: "15 November 2024",
    prevVaccines: "Hepatitis B, DPT",
    heightNow: 105,
    heightDelta: "+5 cm bulan ini",
    weightNow: 11.5,
    weightDelta: "+0.5 kg bulan ini",
    avatar: "girl",
    weightData: [
      { bulan: "Sep", anak: 3.2, ideal: 3.3 },
      { bulan: "Okt", anak: 4.5, ideal: 4.5 },
      { bulan: "Nov", anak: 5.8, ideal: 5.8 },
      { bulan: "Des", anak: 6.8, ideal: 6.9 },
      { bulan: "Jan", anak: 8.2, ideal: 8.0 },
      { bulan: "Feb", anak: 10.1, ideal: 9.2 },
      { bulan: "Mar", anak: 11.5, ideal: 10.5 },
    ],
    heightData: [
      { bulan: "Sep", anak: 50, ideal: 50 },
      { bulan: "Okt", anak: 58, ideal: 57 },
      { bulan: "Nov", anak: 65, ideal: 64 },
      { bulan: "Des", anak: 72, ideal: 71 },
      { bulan: "Jan", anak: 82, ideal: 80 },
      { bulan: "Feb", anak: 95, ideal: 90 },
      { bulan: "Mar", anak: 105, ideal: 99 },
    ],
  },
  {
    id: "static-2",
    name: "Ahmad Daffa Alfattah",
    age: "8 Bulan",
    gender: "Laki-laki",
    birthDate: "10 Mei 2024",
    prevVaccines: "BCG, Polio, DPT",
    heightNow: 72,
    heightDelta: "+2 cm bulan ini",
    weightNow: 9.2,
    weightDelta: "+0.3 kg bulan ini",
    avatar: "boy",
    weightData: [
      { bulan: "Sep", anak: 5.5, ideal: 5.6 },
      { bulan: "Okt", anak: 6.2, ideal: 6.3 },
      { bulan: "Nov", anak: 7.0, ideal: 7.1 },
      { bulan: "Des", anak: 7.8, ideal: 7.9 },
      { bulan: "Jan", anak: 8.3, ideal: 8.4 },
      { bulan: "Feb", anak: 8.9, ideal: 8.9 },
      { bulan: "Mar", anak: 9.2, ideal: 9.3 },
    ],
    heightData: [
      { bulan: "Sep", anak: 62, ideal: 63 },
      { bulan: "Okt", anak: 65, ideal: 66 },
      { bulan: "Nov", anak: 67, ideal: 68 },
      { bulan: "Des", anak: 69, ideal: 70 },
      { bulan: "Jan", anak: 70, ideal: 71 },
      { bulan: "Feb", anak: 71, ideal: 72 },
      { bulan: "Mar", anak: 72, ideal: 73 },
    ],
  },
]

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

// Menu dropdown component
function ChildMenu({ child, onEdit, onDelete, isOpen }) {
  if (!isOpen) return null
  return (
    <div style={s.dropdown}>
      <button style={s.dropdownItem} onClick={() => onEdit(child)}>
        ✏️ Edit
      </button>
      <button style={s.dropdownItem} onClick={() => onDelete(child.id)}>
        🗑️ Hapus
      </button>
    </div>
  )
}

export default function JadwalImunisasi({ onLogout, activePage, setActivePage }) {
  const [children, setChildren] = useState(childrenList)
  const [selectedChild, setSelectedChild] = useState(childrenList[0])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingChild, setEditingChild] = useState(null)
  const [openMenu, setOpenMenu] = useState(null)
  const [formData, setFormData] = useState({ name: "", birthDate: "", gender: "" })
  const [isLoading, setIsLoading] = useState(false)

  // Load backend data
  useEffect(() => {
    loadChildren()
  }, [])

  const loadChildren = async () => {
    try {
      const parentChildren = await fetchChildren()
      // Map backend data to frontend format
      const formatted = parentChildren.map(c => ({
        id: c.id,
        name: c.name,
        // Backend currently returns YYYY-MM-DD
        birthDate: c.birth_date,
        gender: c.gender === "male" || c.gender === "Laki-laki" ? "Laki-laki" : "Perempuan",
        age: "Sesuai usia",
        prevVaccines: "-",
        heightNow: 0,
        heightDelta: "-",
        weightNow: 0,
        weightDelta: "-",
        avatar: (c.gender === "male" || c.gender === "Laki-laki") ? "boy" : "girl",
        weightData: [],
        heightData: []
      }))
      
      if (formatted.length > 0) {
        setChildren([...formatted, ...childrenList]) // fallback to keep static data visualization for demo, or set only formatted
        setSelectedChild(formatted[0])
      }
    } catch (err) {
      console.error("Gagal load data anak:", err)
    }
  }

  const handleSaveChild = async () => {
    if (!formData.name) {
      alert("Nama anak harus diisi")
      return
    }
    if (!formData.birthDate) {
      alert("Tanggal lahir harus diisi")
      return
    }
    if (!formData.gender) {
      alert("Jenis kelamin harus dipilih")
      return
    }

    setIsLoading(true)
    try {
      const payload = {
        name: formData.name,
        birth_date: formData.birthDate,
        gender: formData.gender === "Laki-laki" ? "male" : "female"
      }
      
      if (editingChild && editingChild.id) {
        // Update existing (check if it's not the static ID)
        if (typeof editingChild.id !== 'string' || !editingChild.id.toString().startsWith('static')) {
           await updateChild(editingChild.id, payload)
        } else {
           alert("Tidak bisa mengedit data contoh")
           setIsLoading(false)
           return
        }
        alert("Anak berhasil diupdate")
      } else {
        // Add new
        await createChild(payload)
        alert("Anak berhasil ditambahkan")
      }
      await loadChildren()
      handleCloseForm()
    } catch (err) {
      alert(err.message || "Terjadi kesalahan")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditChild = (child) => {
    setEditingChild(child)
    setFormData({ name: child.name, birthDate: child.birthDate, gender: child.gender })
    setShowAddForm(true)
    setOpenMenu(null)
  }

  const handleDeleteChild = async (childId) => {
    if (typeof childId === 'string' && childId.startsWith('static')) {
      alert("Tidak bisa menghapus data contoh")
      setOpenMenu(null)
      return
    }
    if (window.confirm("Yakin ingin menghapus anak ini?")) {
      try {
        await deleteChild(childId)
        alert("Anak berhasil dihapus")
        await loadChildren()
      } catch (err) {
        alert(err.message || "Gagal menghapus anak")
      }
      setOpenMenu(null)
    }
  }

  const handleCloseForm = () => {
    setShowAddForm(false)
    setEditingChild(null)
    setFormData({ name: "", birthDate: "", gender: "" })
  }

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
            {children.map((child) => (
              <div key={child.id} style={s.childRowContainer}>
                <div
                  style={{
                    ...s.childRow,
                    ...(selectedChild.id === child.id ? s.childRowActive : s.childRowInactive),
                  }}
                  onClick={() => setSelectedChild(child)}
                >
                  <div style={s.childAvatarWrap}>
                    {child.avatar === "girl" ? <GirlAvatar /> : <BoyAvatar />}
                  </div>
                  <span style={{ ...s.childName, color: selectedChild.id === child.id ? "white" : "#444" }}>
                    {child.name}
                  </span>
                  <button
                    style={s.menuBtn}
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenMenu(openMenu === child.id ? null : child.id)
                    }}
                    title="Menu"
                  >
                    ⋯
                  </button>
                </div>
                <ChildMenu
                  child={child}
                  onEdit={handleEditChild}
                  onDelete={handleDeleteChild}
                  isOpen={openMenu === child.id}
                />
              </div>
            ))}

            <button style={s.addBtn} onClick={() => {
              setEditingChild(null)
              setFormData({ name: "", birthDate: "", gender: "" })
              setShowAddForm(true)
            }}>
              + &nbsp; Tambah anak
            </button>
          </div>
        </div>

        {/* Center: Profil Data Anak */}
        <div style={s.centerPanel}>
          {/* Header */}
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

          {/* Name */}
          <h3 style={s.childFullName}>{selectedChild.name}</h3>

          {/* Info rows */}
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

          {/* Statistik */}
          <h3 style={s.statsTitle}>Statistik</h3>
          <div style={s.chartsRow}>
            {/* Berat */}
            <div style={s.chartBox}>
              {selectedChild.weightData.length > 0 ? (
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
                    <Legend
                      iconType="circle" iconSize={8}
                      formatter={(v) => <span style={{ fontSize: 11 }}>{v === "anak" ? "Berat anak" : "Berat Ideal"}</span>}
                    />
                    <Area type="monotone" dataKey="anak" stroke="#1565c0" strokeWidth={2} fill="url(#weightGrad)" dot={{ r: 4, fill: "#1565c0" }} name="anak" />
                    <Line type="monotone" dataKey="ideal" stroke="#aaa" strokeWidth={1.5} strokeDasharray="4 3" dot={false} name="ideal" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 180 }}>
                  <p style={{ color: "#999" }}>Data belum ada</p>
                </div>
              )}
            </div>

            {/* Tinggi */}
            <div style={s.chartBox}>
              {selectedChild.heightData.length > 0 ? (
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
                    <Legend
                      iconType="circle" iconSize={8}
                      formatter={(v) => <span style={{ fontSize: 11 }}>{v === "anak" ? "Tinggi anak" : "Tinggi Ideal"}</span>}
                    />
                    <Area type="monotone" dataKey="anak" stroke="#1565c0" strokeWidth={2} fill="url(#heightGrad)" dot={{ r: 4, fill: "#1565c0" }} name="anak" />
                    <Line type="monotone" dataKey="ideal" stroke="#aaa" strokeWidth={1.5} strokeDasharray="4 3" dot={false} name="ideal" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 180 }}>
                  <p style={{ color: "#999" }}>Data belum ada</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Stats Cards */}
        <div style={s.rightPanel}>
          <div style={s.statCard}>
            <div style={s.statCardTitle}>Tinggi Terkini</div>
            <div style={s.statCardValue}>{selectedChild.heightNow} cm</div>
            <div style={s.statCardDelta}>
              <span style={s.arrowUp}>↑</span>
              <span style={s.deltaText}>{selectedChild.heightDelta}</span>
            </div>
          </div>
          <div style={s.statCard}>
            <div style={s.statCardTitle}>Berat Terkini</div>
            <div style={s.statCardValue}>{selectedChild.weightNow}kg</div>
            <div style={s.statCardDelta}>
              <span style={s.arrowUp}>↑</span>
              <span style={s.deltaText}>{selectedChild.weightDelta}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Child Modal */}
      {showAddForm && (
        <div style={s.modalOverlay} onClick={handleCloseForm}>
          <div style={s.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: "1rem", color: "#1a1a2e", fontSize: "18px" }}>
              {editingChild ? "Edit Anak" : "Tambah Anak"}
            </h3>
            <input
              style={s.modalInput}
              placeholder="Nama lengkap"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              style={s.modalInput}
              type="date"
              placeholder="Tanggal lahir"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            />
            <select
              style={s.modalInput}
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="">Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button style={s.modalBtnPrimary} onClick={handleSaveChild}>
                {editingChild ? "Update" : "Simpan"}
              </button>
              <button style={s.modalBtnSecondary} onClick={handleCloseForm}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
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

  // Left panel
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
  childRowContainer: {
    position: "relative",
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
  menuBtn: {
    background: "transparent",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    padding: "0 4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: "0.75rem",
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    zIndex: 10,
    minWidth: "120px",
    overflow: "hidden",
  },
  dropdownItem: {
    width: "100%",
    padding: "0.5rem 0.75rem",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "13px",
    textAlign: "left",
    transition: "background 0.2s",
  },
  addBtn: {
    marginTop: "0.5rem",
    background: "white",
    border: "1.5px solid #e91e8c",
    color: "#e91e8c",
    borderRadius: "12px",
    padding: "0.75rem",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
    width: "100%",
  },

  // Center panel
  centerPanel: {
    background: "#fce4ec",
    borderRadius: "16px",
    padding: "1.5rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
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
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
  },

  // Right panel
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

  // Modal
  modalOverlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 100,
  },
  modal: {
    background: "white",
    borderRadius: "16px",
    padding: "2rem",
    width: "360px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  },
  modalInput: {
    width: "100%",
    padding: "0.7rem 1rem",
    borderRadius: "10px",
    border: "1.5px solid #e2e8f0",
    fontSize: "14px",
    marginBottom: "0.75rem",
    outline: "none",
    boxSizing: "border-box",
  },
  modalBtnPrimary: {
    flex: 1, background: "#e91e8c", color: "white",
    border: "none", borderRadius: "10px",
    padding: "0.7rem", fontWeight: "600", fontSize: "14px", cursor: "pointer",
  },
  modalBtnSecondary: {
    flex: 1, background: "#f1f5f9", color: "#555",
    border: "1.5px solid #e2e8f0", borderRadius: "10px",
    padding: "0.7rem", fontWeight: "600", fontSize: "14px", cursor: "pointer",
  },
}