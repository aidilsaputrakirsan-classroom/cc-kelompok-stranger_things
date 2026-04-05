import { useState } from "react"

function LoginPage({ onLogin, onRegister, onBack }) {
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (isRegister) {
        if (!formData.fullName.trim()) {
          setError("Nama lengkap wajib diisi")
          setLoading(false)
          return
        }
        if (!formData.username.trim()) {
          setError("Nama pengguna wajib diisi")
          setLoading(false)
          return
        }
        if (formData.password.length < 8) {
          setError("Password minimal 8 karakter")
          setLoading(false)
          return
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Konfirmasi password tidak cocok")
          setLoading(false)
          return
        }
        await onRegister?.(formData)
      } else {
        if (!formData.username.trim()) {
          setError("Nama pengguna wajib diisi")
          setLoading(false)
          return
        }
        await onLogin?.(formData.username, formData.password)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {/* Tombol Kembali */}
        {onBack && (
          <button onClick={onBack} style={styles.btnBack}>
            ← Kembali
          </button>
        )}
        {/* Title */}
        <h1 style={styles.title}>{isRegister ? "Daftar Akun" : "Masuk Akun"}</h1>
        <p style={styles.subtitle}>
          {isRegister
            ? "Buat akun sekarang dan mulai jelajahi Bye Bye Virus"
            : "Masuk akun sekarang dan mulai jelajahi Bye Bye Virus"}
        </p>

        

        {/* Tab Switch */}
        <div style={styles.tabs}>
          <button
            style={{ ...styles.tab, ...(isRegister ? {} : styles.tabActive) }}
            onClick={() => { setIsRegister(false); setError("") }}
          >
            Login
          </button>
          <button
            style={{ ...styles.tab, ...(isRegister ? styles.tabActive : {}) }}
            onClick={() => { setIsRegister(true); setError("") }}
          >
            Register
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Full Name — Register only */}
          {isRegister && (
            <div style={styles.field}>
              <label style={styles.label}>Nama Lengkap</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Masukkan Nama Lengkap"
                  style={styles.input}
                />
                <span style={styles.icon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e879a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
              </div>
            </div>
          )}

          {/* Username */}
          <div style={styles.field}>
            <label style={styles.label}>Nama Pengguna</label>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Masukkan Nama Pengguna"
                style={styles.input}
              />
              <span style={styles.icon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e879a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </span>
            </div>
          </div>

          {/* Password */}
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimal 8 karakter"
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                style={styles.iconBtn}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password — Register only */}
          {isRegister && (
            <div style={styles.field}>
              <label style={styles.label}>Konfirmasi Password</label>
              <div style={styles.inputWrapper}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi password"
                  style={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  style={styles.iconBtn}
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          <button type="submit" style={styles.btnSubmit} disabled={loading}>
            {loading ? "⏳ Loading..." : "Daftar Sekarang"}
          </button>
        </form>
      </div>
    </div>
  )
}

const PINK = "#e879a0"
const PINK_DARK = "#d4588a"
const PINK_LIGHT = "#f9a8d4"
const PINK_BG = "#fce7f3"

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fce7f3",
    padding: "2rem",
    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2.5rem 2.25rem",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 8px 40px rgba(232,121,160,0.15), 0 2px 8px rgba(0,0,0,0.06)",
  },
  title: {
    textAlign: "center",
    margin: "0 0 0.4rem 0",
    color: "#1a1a2e",
    fontSize: "1.75rem",
    fontWeight: "700",
    letterSpacing: "-0.3px",
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    margin: "0 0 1.75rem 0",
    fontSize: "0.875rem",
    lineHeight: "1.5",
  },
  tabs: {
    display: "flex",
    marginBottom: "1.5rem",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1.5px solid #f3f4f6",
    backgroundColor: "#f9fafb",
    padding: "4px",
    gap: "4px",
  },
  tab: {
    flex: 1,
    padding: "0.65rem",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#9ca3af",
    borderRadius: "9px",
    transition: "all 0.2s ease",
  },
  tabActive: {
    background: `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`,
    color: "white",
    boxShadow: `0 2px 12px rgba(232,121,160,0.4)`,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.1rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  label: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#374151",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "0.75rem 2.75rem 0.75rem 1rem",
    border: `1.5px solid ${PINK_LIGHT}`,
    borderRadius: "10px",
    fontSize: "0.9rem",
    outline: "none",
    backgroundColor: "#ffffff",
    color: "#1a1a2e",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  icon: {
    position: "absolute",
    right: "0.85rem",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
  },
  iconBtn: {
    position: "absolute",
    right: "0.75rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
    display: "flex",
    alignItems: "center",
  },
  btnSubmit: {
    padding: "0.9rem",
    background: `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`,
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "700",
    marginTop: "0.25rem",
    boxShadow: `0 4px 16px rgba(232,121,160,0.4)`,
    letterSpacing: "0.02em",
    transition: "opacity 0.2s",
  },
  error: {
    backgroundColor: "#fff1f0",
    color: "#c0392b",
    padding: "0.65rem 1rem",
    borderRadius: "8px",
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
    textAlign: "center",
    border: "1.5px solid #fecaca",
    fontWeight: "500",
  },

  btnBack: {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#e879a0",
  fontSize: "0.9rem",
  fontWeight: "600",
  padding: "0 0 1rem 0",
  display: "block",
},
}

export default LoginPage