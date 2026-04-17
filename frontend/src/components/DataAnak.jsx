import { useState, useEffect } from "react"
import { createChild, fetchVaccineTypes, createImmunization } from "../services/api"

export default function DataAnak({ setActivePage, onLogout }) {
  const [child, setChild] = useState({ name: "", birth_date: "", gender: "" })
  const [immunizations, setImmunizations] = useState([{ vaccine_id: "", scheduled_date: "" }])
  const [vaccineTypes, setVaccineTypes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => { loadVaccines() }, [])

  const loadVaccines = async () => {
    try {
      const data = await fetchVaccineTypes()
      setVaccineTypes(data)
    } catch (err) { console.error(err) }
  }

  const handleChildChange = (e) => setChild({ ...child, [e.target.name]: e.target.value })

  const handleImmunizationChange = (i, field, value) => {
    const updated = [...immunizations]
    updated[i][field] = value
    setImmunizations(updated)
  }

  const addImmunization = () => {
    setImmunizations([...immunizations, { vaccine_id: "", scheduled_date: "" }])
  }

  const removeImmunization = (i) => {
    setImmunizations(immunizations.filter((_, idx) => idx !== i))
  }

  const handleSubmit = async () => {
    if (!child.name || !child.birth_date || !child.gender) {
      alert("Data anak wajib diisi")
      return
    }
    setLoading(true)
    try {
      const newChild = await createChild(child)
      for (let item of immunizations) {
        if (item.vaccine_id && item.scheduled_date) {
          await createImmunization({
            child_id: newChild.id,
            vaccine_id: item.vaccine_id,
            scheduled_date: item.scheduled_date,
            status: "pending"
          })
        }
      }
      alert("Data berhasil disimpan")
      setActivePage?.("jadwal") // ← ganti navigate() dengan ini
    } catch (err) {
      alert("Gagal menyimpan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.logo}>ByeBye<span style={s.logoPink}>Virus</span></span>
        <a style={s.navLink} onClick={() => setActivePage?.("home")}>Home</a>
        <a style={{ ...s.navLink, ...s.navActive }}>Jadwal Imunisasi</a>
        <a style={s.navLink} onClick={() => setActivePage?.("faskes")}>Faskes Map</a>
        <div style={s.navAvatar} onClick={onLogout} title="Logout">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#e91e8c">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
      </nav>

      {/* Card Utama */}
      <div style={s.card}>
        {/* Header card */}
        <div style={s.cardHeader}>
          <button style={s.backBtn} onClick={() => setActivePage?.("jadwal")}>
            ↩ Kembali
          </button>
          <h2 style={s.cardTitle}>Tambah Data Anak</h2>
          <div style={{ width: 100 }} />
        </div>

        {/* Layout 2 kolom */}
        <div style={s.twoCol}>
          {/* Kolom Kiri: Data Anak */}
          <div style={s.leftCol}>
            <label style={s.label}>Nama Lengkap</label>
            <input
              name="name"
              value={child.name}
              onChange={handleChildChange}
              placeholder="Masukkan Nama Lengkap"
              style={s.input}
            />

            <label style={s.label}>Tanggal Lahir</label>
            <input
              type="date"
              name="birth_date"
              value={child.birth_date}
              onChange={handleChildChange}
              style={s.input}
            />

            <label style={s.label}>Jenis Kelamin</label>
            <div style={s.genderRow}>
              <span style={s.genderIcon}>♀</span>
              <button
                style={child.gender === "female" ? s.genderActive : s.genderInactive}
                onClick={() => setChild({ ...child, gender: "female" })}
              >
                Perempuan
              </button>
              <span style={{ ...s.genderIcon, color: "#42a5f5" }}>♂</span>
              <button
                style={child.gender === "male" ? s.genderActive : s.genderInactive}
                onClick={() => setChild({ ...child, gender: "male" })}
              >
                Laki - Laki
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Data Imunisasi */}
          <div style={s.rightCol}>
            <div style={s.imunBox}>
              <div style={s.imunTitle}>
                <span style={s.imunTitleBar} />
                Data Imunisasi
              </div>

              {immunizations.map((item, i) => (
                <div key={i} style={s.imunCard}>
                  <div style={s.imunCardHeader}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>Imunisasi {i + 1}</span>
                    <button style={s.deleteBtn} onClick={() => removeImmunization(i)}>🗑</button>
                  </div>

                  <label style={s.imunLabel}>Jenis Vaksin</label>
                  <div style={s.selectWrap}>
                    <select
                      value={item.vaccine_id}
                      onChange={(e) => handleImmunizationChange(i, "vaccine_id", e.target.value)}
                      style={s.selectInput}
                    >
                      <option value="">Pilih jenis vaksin</option>
                      {vaccineTypes.map(v => (
                        <option key={v.id} value={v.id}>{v.name}</option>
                      ))}
                    </select>
                    <span style={s.chevron}>▾</span>
                  </div>

                  <label style={s.imunLabel}>Tanggal Vaksin</label>
                  <input
                    type="date"
                    value={item.scheduled_date}
                    onChange={(e) => handleImmunizationChange(i, "scheduled_date", e.target.value)}
                    style={s.dateInput}
                  />
                </div>
              ))}

              <button style={s.addImunBtn} onClick={addImmunization}>
                + Tambah Imunisasi
              </button>
            </div>
          </div>
        </div>

        {/* Tombol Simpan */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button style={s.saveBtn} onClick={handleSubmit}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
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
  navAvatar: {
    width: "36px", height: "36px", borderRadius: "50%",
    background: "#fce4ec", display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer", marginLeft: "auto",
  },

  card: {
    background: "#fce4ec",
    borderRadius: "20px",
    maxWidth: "960px",
    margin: "2rem auto",
    padding: "2rem 2.5rem",
    boxShadow: "0 4px 20px rgba(233,30,140,0.08)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2rem",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#e91e8c",
    margin: 0,
    textAlign: "center",
    flex: 1,
  },
  backBtn: {
    background: "transparent",
    border: "none",
    color: "#444",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "600",
    width: 100,
    textAlign: "left",
  },

  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    alignItems: "start",
  },
  leftCol: { display: "flex", flexDirection: "column", gap: "0.25rem" },
  rightCol: {},

  label: { fontSize: "15px", fontWeight: "600", color: "#1a1a2e", marginBottom: "6px", display: "block" },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    border: "1.5px solid #e2e8f0",
    fontSize: "14px",
    marginBottom: "1rem",
    outline: "none",
    boxSizing: "border-box",
    background: "white",
  },

  genderRow: { display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" },
  genderIcon: { fontSize: "22px", color: "#e91e8c" },
  genderActive: {
    padding: "10px 28px", borderRadius: "24px",
    background: "#e91e8c", color: "white",
    border: "none", fontWeight: "600", fontSize: "14px", cursor: "pointer",
  },
  genderInactive: {
    padding: "10px 28px", borderRadius: "24px",
    background: "white", color: "#444",
    border: "1.5px solid #ddd", fontWeight: "600", fontSize: "14px", cursor: "pointer",
  },

  imunBox: {
    background: "white",
    borderRadius: "16px",
    padding: "1.25rem",
  },
  imunTitle: {
    display: "flex", alignItems: "center", gap: "8px",
    fontWeight: "700", fontSize: "16px", color: "#1a1a2e",
    marginBottom: "1rem",
  },
  imunTitleBar: {
    display: "inline-block", width: "4px", height: "20px",
    background: "#e91e8c", borderRadius: "4px",
  },
  imunCard: {
    background: "linear-gradient(135deg, #e91e8c, #f48fb1)",
    borderRadius: "12px",
    padding: "1rem",
    marginBottom: "0.75rem",
  },
  imunCardHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: "0.75rem", color: "white",
  },
  deleteBtn: {
    background: "rgba(255,255,255,0.2)",
    border: "none", borderRadius: "8px",
    padding: "4px 8px", cursor: "pointer", fontSize: "14px",
  },
  imunLabel: { fontSize: "12px", color: "rgba(255,255,255,0.9)", fontWeight: "600", display: "block", marginBottom: "4px" },
  selectWrap: { position: "relative", marginBottom: "0.75rem" },
  selectInput: {
    width: "100%", padding: "0.6rem 2rem 0.6rem 0.75rem",
    borderRadius: "8px", border: "none",
    fontSize: "14px", appearance: "none", outline: "none",
    background: "white", color: "#444", boxSizing: "border-box",
  },
  chevron: {
    position: "absolute", right: "10px", top: "50%",
    transform: "translateY(-50%)", pointerEvents: "none",
    color: "#888", fontSize: "16px",
  },
  dateInput: {
    width: "100%", padding: "0.6rem 0.75rem",
    borderRadius: "8px", border: "none",
    fontSize: "14px", outline: "none",
    background: "white", color: "#444", boxSizing: "border-box",
  },
  addImunBtn: {
    background: "none", border: "none",
    color: "#e91e8c", fontWeight: "600",
    fontSize: "14px", cursor: "pointer", padding: "4px 0",
  },

  saveBtn: {
    background: "linear-gradient(135deg, #2196f3, #42a5f5)",
    color: "white", border: "none",
    borderRadius: "12px", padding: "14px 80px",
    fontSize: "16px", fontWeight: "700", cursor: "pointer",
  },
}