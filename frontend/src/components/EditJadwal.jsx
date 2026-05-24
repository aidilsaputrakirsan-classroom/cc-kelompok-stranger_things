import { useState } from "react"

// ── Edit Jadwal Page ────────────────────────────────────────────────
export default function EditJadwalPage({ jadwal, onSave, onBack }) {
  const [form, setForm] = useState({ ...jadwal })

  const handleChange = (key, value) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const fields = [
    { label: "Nama Vaksin",  key: "vaccine_name",   type: "text" },
    { label: "Dosis",        key: "dose_label",      type: "text" },
    { label: "Tanggal",      key: "scheduled_date",  type: "date" },
    { label: "Jam Mulai",    key: "time_start",      type: "time" },
    { label: "Jam Selesai",  key: "time_end",        type: "time" },
    { label: "Lokasi",       key: "location_name",   type: "text" },
    { label: "Alamat",       key: "address",         type: "text" },
    { label: "Catatan",      key: "notes",           type: "text" },
  ]

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.logo}>
          ByeBye<span style={s.logoPink}>Virus</span>
        </span>
        <button style={s.backBtn} onClick={onBack}>
          ← Kembali
        </button>
      </nav>

      {/* Content */}
      <div style={s.content}>
        {/* Header Card */}
        <div style={s.headerCard}>
          <div style={s.headerIcon}>✏️</div>
          <div>
            <h1 style={s.headerTitle}>Edit Jadwal Imunisasi</h1>
            <p style={s.headerSub}>Perbarui informasi jadwal imunisasi anak</p>
          </div>
        </div>

        {/* Form Card */}
        <div style={s.formCard}>
          <div style={s.formGrid}>
            {fields.map(({ label, key, type }) => (
              <div
                key={key}
                style={key === "address" || key === "notes" ? s.fieldFullWidth : s.field}
              >
                <label style={s.fieldLabel}>{label}</label>
                <input
                  type={type}
                  value={form[key] ?? ""}
                  onChange={e => handleChange(key, e.target.value)}
                  style={s.fieldInput}
                  onFocus={e => { e.target.style.borderColor = "#e91e8c"; e.target.style.boxShadow = "0 0 0 3px rgba(233,30,140,0.10)" }}
                  onBlur={e => { e.target.style.borderColor = "#f0c0d0"; e.target.style.boxShadow = "none" }}
                />
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={s.actionRow}>
            <button
              style={s.btnCancel}
              onClick={onBack}
              onMouseEnter={e => e.currentTarget.style.background = "#f5f5f5"}
              onMouseLeave={e => e.currentTarget.style.background = "white"}
            >
              Batal
            </button>
            <button
              style={s.btnSave}
              onClick={() => onSave(form)}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              💾 Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Styles ──────────────────────────────────────────────────────────
const s = {
  page: {
    background: "#fff5f8",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    color: "#1a1a2e",
  },

  // Navbar
  nav: {
    background: "white",
    borderBottom: "0.5px solid #f0c0d0",
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    height: "56px",
  },
  logo: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1a1a2e",
    marginRight: "auto",
  },
  logoPink: { color: "#e91e8c" },
  backBtn: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#e91e8c",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "6px 0",
  },

  // Content wrapper
  content: {
    maxWidth: "720px",
    margin: "2rem auto",
    padding: "0 1.5rem",
  },

  // Header card
  headerCard: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    background: "linear-gradient(135deg, #e91e8c 0%, #f48fb1 100%)",
    borderRadius: "20px",
    padding: "1.5rem 2rem",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 20px rgba(233,30,140,0.20)",
  },
  headerIcon: {
    fontSize: "36px",
    background: "rgba(255,255,255,0.25)",
    borderRadius: "14px",
    width: "56px",
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  headerTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "800",
    color: "white",
  },
  headerSub: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "rgba(255,255,255,0.85)",
  },

  // Form card
  formCard: {
    background: "white",
    borderRadius: "20px",
    padding: "2rem",
    boxShadow: "0 4px 20px rgba(233,30,140,0.08)",
    border: "1.5px solid #fce4ec",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.1rem 1.5rem",
    marginBottom: "1.75rem",
  },

  // Field
  field: {},
  fieldFullWidth: { gridColumn: "1 / -1" },
  fieldLabel: {
    display: "block",
    fontSize: "12px",
    fontWeight: "600",
    color: "#888",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  fieldInput: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "12px",
    border: "1.5px solid #f0c0d0",
    fontSize: "14px",
    color: "#1a1a2e",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    background: "#fff",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },

  // Action row
  actionRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    borderTop: "1px solid #fce4ec",
    paddingTop: "1.5rem",
  },
  btnCancel: {
    padding: "11px 24px",
    borderRadius: "12px",
    border: "1.5px solid #e0e0e0",
    background: "white",
    color: "#666",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background 0.15s",
  },
  btnSave: {
    padding: "11px 28px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #e91e8c, #f48fb1)",
    color: "white",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    boxShadow: "0 4px 14px rgba(233,30,140,0.30)",
    transition: "opacity 0.15s",
  },
}