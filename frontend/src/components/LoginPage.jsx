import { useState } from "react"

function LoginPage({ onLogin, onRegister }) {
  const [isRegister, setIsRegister] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
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
        if (!formData.name.trim()) {
          setError("Nama wajib diisi")
          setLoading(false)
          return
        }
        if (formData.password.length < 8) {
          setError("Password minimal 8 karakter")
          setLoading(false)
          return
        }
        await onRegister(formData)
      } else {
        await onLogin(formData.email, formData.password)
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
        <h1 style={styles.title}>☁️ Cloud App</h1>
        <p style={styles.subtitle}>Komputasi Awan — SI ITK</p>

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
          {isRegister && (
            <div style={styles.field}>
              <label style={styles.label}>Nama Lengkap</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama Lengkap"
                style={styles.input}
              />
            </div>
          )}

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@student.itk.ac.id"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimal 8 karakter"
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.btnSubmit} disabled={loading}>
            {loading ? "⏳ Loading..." : isRegister ? "📝 Register" : "🔐 Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f2942 0%, #1F4E79 50%, #2d6fa6 100%)",
    padding: "2rem",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  card: {
    backgroundColor: "white",
    padding: "2.5rem",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)",
    position: "relative",
    zIndex: 1,
  },
  title: {
    textAlign: "center",
    margin: "0 0 0.25rem 0",
    color: "#1F4E79",
    fontSize: "2rem",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    textAlign: "center",
    color: "#94a3b8",
    margin: "0 0 1.75rem 0",
    fontSize: "0.85rem",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  tabs: {
    display: "flex",
    marginBottom: "1.5rem",
    borderRadius: "10px",
    overflow: "hidden",
    border: "1.5px solid #e2e8f0",
    backgroundColor: "#f8fafc",
    padding: "4px",
    gap: "4px",
  },
  tab: {
    flex: 1,
    padding: "0.6rem",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#94a3b8",
    borderRadius: "7px",
    transition: "all 0.18s ease",
  },
  tabActive: {
    backgroundColor: "#1F4E79",
    color: "white",
    boxShadow: "0 2px 8px rgba(31,78,121,0.3)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
  },
  label: {
    fontSize: "0.8rem",
    fontWeight: "700",
    color: "#475569",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  },
  input: {
    padding: "0.75rem 1rem",
    border: "1.5px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "0.95rem",
    outline: "none",
    backgroundColor: "#f8fafc",
    color: "#1e293b",
    transition: "border-color 0.18s, box-shadow 0.18s",
  },
  btnSubmit: {
    padding: "0.85rem",
    background: "linear-gradient(135deg, #548235, #3d6126)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "700",
    marginTop: "0.5rem",
    boxShadow: "0 4px 14px rgba(84,130,53,0.35)",
    letterSpacing: "0.02em",
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
}

export default LoginPage