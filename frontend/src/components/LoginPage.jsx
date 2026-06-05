import { useState } from "react";

function LoginPage({ onLogin, onRegister, onBack }) {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("parent");
  const [isServiceDown, setIsServiceDown] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    strNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const doSubmit = async () => {
    if (isRegister) {
      if (!formData.fullName.trim()) { setError("Nama lengkap wajib diisi"); return; }
      if (!formData.email.trim()) { setError("Email wajib diisi"); return; }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) { setError("Format email tidak valid (contoh: user@example.com)"); return; }
      if (formData.password.length < 8) { setError("Password minimal 8 karakter"); return; }
      if (!/[A-Z]/.test(formData.password)) { setError("Password harus mengandung minimal 1 huruf besar"); return; }
      if (!/[a-z]/.test(formData.password)) { setError("Password harus mengandung minimal 1 huruf kecil"); return; }
      if (!/[0-9]/.test(formData.password)) { setError("Password harus mengandung minimal 1 angka"); return; }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) { setError('Password harus mengandung minimal 1 karakter spesial (!@#$%^&*)'); return; }
      if (formData.password !== formData.confirmPassword) { setError("Konfirmasi password tidak cocok"); return; }
      await onRegister?.({ ...formData, role: selectedRole });
    } else {
      if (!formData.email.trim()) { setError("Email wajib diisi"); return; }
      await onLogin?.(formData.email, formData.password, selectedRole);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsServiceDown(false);
    setLoading(true);
    try {
      await doSubmit();
    } catch (err) {
      if (
        err.message?.includes("Service temporarily unavailable") ||
        err.message?.includes("503") ||
        err.message?.includes("Failed to fetch")
      ) {
        setIsServiceDown(true);
        setError("Layanan sedang tidak tersedia. Silakan coba beberapa saat lagi.");
      } else {
        setIsServiceDown(false);
        setError(err.message || "Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async () => {
    setError("");
    setIsServiceDown(false);
    setLoading(true);
    try {
      await doSubmit();
    } catch (err) {
      if (
        err.message?.includes("Service temporarily unavailable") ||
        err.message?.includes("503") ||
        err.message?.includes("Failed to fetch")
      ) {
        setIsServiceDown(true);
        setError("Layanan masih tidak tersedia. Coba lagi beberapa saat.");
      } else {
        setIsServiceDown(false);
        setError(err.message || "Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

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
        <h1 style={styles.title}>
          {isRegister ? "Daftar Akun" : selectedRole === "midwife" ? "Login Bidan" : "Masuk Akun"}
        </h1>
        <p style={styles.subtitle}>
          {isRegister
            ? "Buat akun sekarang dan mulai jelajahi Bye Bye Virus"
            : selectedRole === "midwife"
            ? "Masuk sebagai bidan untuk langsung ke dashboard bidan"
            : "Masuk sebagai orang tua untuk melihat jadwal imunisasi"}
        </p>

        {/* Tab Switch */}
        <div style={styles.tabs}>
          <button
            style={{ ...styles.tab, ...(isRegister ? {} : styles.tabActive) }}
            onClick={() => { setIsRegister(false); setError(""); setIsServiceDown(false); }}
          >
            Login
          </button>
          <button
            style={{ ...styles.tab, ...(isRegister ? styles.tabActive : {}) }}
            onClick={() => { setIsRegister(true); setError(""); setIsServiceDown(false); }}
          >
            Register
          </button>
        </div>

        {!isRegister && (
          <div style={styles.field}>
            <label style={styles.label}>Masuk sebagai</label>
            <div style={styles.roleOptions}>
              <div
                style={{ ...styles.roleCard, ...(selectedRole === "parent" ? styles.roleCardActive : {}) }}
                onClick={() => setSelectedRole("parent")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedRole("parent")}
                aria-pressed={selectedRole === "parent"}
              >
                <span style={styles.roleIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke={selectedRole === "parent" ? "#e879a0" : "#9ca3af"}
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12h.01" /><path d="M15 12h.01" />
                    <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
                    <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
                  </svg>
                </span>
                <span style={styles.roleName}>Orang Tua</span>
                <span style={styles.roleDesc}>Akses fitur orang tua</span>
              </div>

              <div
                style={{ ...styles.roleCard, ...(selectedRole === "midwife" ? styles.roleCardActive : {}) }}
                onClick={() => setSelectedRole("midwife")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedRole("midwife")}
                aria-pressed={selectedRole === "midwife"}
              >
                <span style={styles.roleIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke={selectedRole === "midwife" ? "#e879a0" : "#9ca3af"}
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
                  </svg>
                </span>
                <span style={styles.roleName}>Bidan / Nakes</span>
                <span style={styles.roleDesc}>Masuk ke dashboard bidan</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div style={styles.error}>
            {error}
            {isServiceDown && (
              <button
                type="button"
                style={styles.retryBtn}
                disabled={loading}
                onClick={handleRetry}
              >
                {loading ? "⏳ Menghubungi server..." : "🔄 Coba Lagi"}
              </button>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Full Name — Register only */}
          {isRegister && (
            <div style={styles.field}>
              <label style={styles.label}>Nama Lengkap</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text" name="fullName" value={formData.fullName}
                  onChange={handleChange} placeholder="Masukkan Nama Lengkap"
                  style={styles.input}
                />
                <span style={styles.icon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#e879a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
              </div>
            </div>
          )}

          {/* Email */}
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <div style={styles.inputWrapper}>
              <input
                type="email" name="email" value={formData.email}
                onChange={handleChange} placeholder="Masukkan Email (user@example.com)"
                style={styles.input}
              />
              <span style={styles.icon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="#e879a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Role Selection — Register only */}
          {isRegister && (
            <div style={styles.field}>
              <label style={styles.label}>Daftar sebagai</label>
              <div style={styles.roleOptions}>
                <div
                  style={{ ...styles.roleCard, ...(selectedRole === "parent" ? styles.roleCardActive : {}) }}
                  onClick={() => setSelectedRole("parent")}
                  role="button" tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedRole("parent")}
                  aria-pressed={selectedRole === "parent"}
                >
                  <span style={styles.roleIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke={selectedRole === "parent" ? "#e879a0" : "#9ca3af"}
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12h.01" /><path d="M15 12h.01" />
                      <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
                      <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
                    </svg>
                  </span>
                  <span style={styles.roleName}>Orang Tua</span>
                  <span style={styles.roleDesc}>Pantau imunisasi &amp; tumbuh kembang anak</span>
                </div>

                <div
                  style={{ ...styles.roleCard, ...(selectedRole === "midwife" ? styles.roleCardActive : {}) }}
                  onClick={() => setSelectedRole("midwife")}
                  role="button" tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedRole("midwife")}
                  aria-pressed={selectedRole === "midwife"}
                >
                  <span style={styles.roleIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke={selectedRole === "midwife" ? "#e879a0" : "#9ca3af"}
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
                    </svg>
                  </span>
                  <span style={styles.roleName}>Bidan / Nakes</span>
                  <span style={styles.roleDesc}>Kelola data imunisasi &amp; pasien</span>
                </div>
              </div>
            </div>
          )}

          {/* Info note untuk bidan */}
          {isRegister && selectedRole === "midwife" && (
            <div style={styles.bidanNote}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#1d6fa5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ flexShrink: 0, marginTop: "1px" }}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" /><path d="M12 8h.01" />
              </svg>
              <span>
                Akun bidan memerlukan verifikasi nomor STR/SIP. Anda bisa
                melanjutkan pendaftaran dan melengkapinya nanti.
              </span>
            </div>
          )}

          {/* STR / SIP — Midwife only */}
          {isRegister && selectedRole === "midwife" && (
            <div style={styles.field}>
              <label style={styles.label}>
                Nomor STR / SIP{" "}
                <span style={styles.optionalTag}>(opsional)</span>
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type="text" name="strNumber" value={formData.strNumber}
                  onChange={handleChange} placeholder="Masukkan nomor STR atau SIP"
                  style={styles.input}
                />
                <span style={styles.icon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#e879a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" />
                    <path d="M16 14h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" />
                  </svg>
                </span>
              </div>
            </div>
          )}

          {/* Password */}
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password" value={formData.password}
                onChange={handleChange} placeholder="Minimal 8 karakter"
                style={styles.input}
              />
              <button type="button" onClick={() => setShowPassword((p) => !p)} style={styles.iconBtn}>
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
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
                  name="confirmPassword" value={formData.confirmPassword}
                  onChange={handleChange} placeholder="Ulangi password"
                  style={styles.input}
                />
                <button type="button" onClick={() => setShowConfirmPassword((p) => !p)} style={styles.iconBtn}>
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          <button type="submit" style={styles.btnSubmit} disabled={loading}>
            {loading ? "⏳ Loading..." : isRegister ? "Daftar Sekarang" : "Masuk"}
          </button>
        </form>

        <p style={styles.toggleNote}>
          {isRegister ? "Sudah punya akun? " : "Belum punya akun? "}
          <button
            style={styles.toggleLink}
            onClick={() => { setIsRegister((r) => !r); setError(""); setIsServiceDown(false); }}
          >
            {isRegister ? "Masuk sekarang" : "Daftar sekarang"}
          </button>
        </p>
      </div>
    </div>
  );
}

/* ─── Design tokens ─────────────────────────────────── */
const PINK = "#e879a0";
const PINK_DARK = "#d4588a";
const PINK_LIGHT = "#f9a8d4";
const PINK_BG = "#fce7f3";

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: PINK_BG,
    padding: "2rem",
    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2.5rem 2.25rem",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "440px",
    boxShadow: "0 8px 40px rgba(232,121,160,0.15), 0 2px 8px rgba(0,0,0,0.06)",
  },
  title: {
    textAlign: "center", margin: "0 0 0.4rem 0",
    color: "#1a1a2e", fontSize: "1.75rem", fontWeight: "700", letterSpacing: "-0.3px",
  },
  subtitle: {
    textAlign: "center", color: "#6b7280",
    margin: "0 0 1.75rem 0", fontSize: "0.875rem", lineHeight: "1.5",
  },
  tabs: {
    display: "flex", marginBottom: "1.5rem", borderRadius: "12px",
    overflow: "hidden", border: "1.5px solid #f3f4f6",
    backgroundColor: "#f9fafb", padding: "4px", gap: "4px",
  },
  tab: {
    flex: 1, padding: "0.65rem", border: "none",
    backgroundColor: "transparent", cursor: "pointer",
    fontSize: "0.95rem", fontWeight: "600", color: "#9ca3af",
    borderRadius: "9px", transition: "all 0.2s ease",
  },
  tabActive: {
    background: `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`,
    color: "white",
    boxShadow: `0 2px 12px rgba(232,121,160,0.4)`,
  },
  form: { display: "flex", flexDirection: "column", gap: "1.1rem" },
  field: { display: "flex", flexDirection: "column", gap: "0.4rem" },
  label: { fontSize: "0.85rem", fontWeight: "600", color: "#374151" },
  optionalTag: { fontWeight: "400", color: "#9ca3af", fontSize: "0.8rem" },
  inputWrapper: { position: "relative", display: "flex", alignItems: "center" },
  input: {
    width: "100%", padding: "0.75rem 2.75rem 0.75rem 1rem",
    border: `1.5px solid ${PINK_LIGHT}`, borderRadius: "10px",
    fontSize: "0.9rem", outline: "none", backgroundColor: "#ffffff",
    color: "#1a1a2e", boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  icon: { position: "absolute", right: "0.85rem", display: "flex", alignItems: "center", pointerEvents: "none" },
  iconBtn: {
    position: "absolute", right: "0.75rem",
    background: "none", border: "none", cursor: "pointer",
    padding: "0", display: "flex", alignItems: "center",
  },
  roleOptions: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
  roleCard: {
    border: `1.5px solid ${PINK_LIGHT}`, borderRadius: "12px",
    padding: "14px 10px", cursor: "pointer", textAlign: "center",
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: "5px", transition: "all 0.18s ease",
    backgroundColor: "#ffffff", userSelect: "none",
  },
  roleCardActive: {
    borderColor: PINK, backgroundColor: PINK_BG,
    boxShadow: `0 0 0 3px rgba(232,121,160,0.15)`,
  },
  roleIcon: { display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2px" },
  roleName: { fontSize: "0.85rem", fontWeight: "700", color: "#1a1a2e" },
  roleDesc: { fontSize: "0.72rem", color: "#6b7280", lineHeight: "1.4" },
  bidanNote: {
    display: "flex", alignItems: "flex-start", gap: "8px",
    backgroundColor: "#eff6ff", border: "1px solid #bfdbfe",
    borderRadius: "8px", padding: "10px 12px",
    fontSize: "0.78rem", color: "#1d4ed8", lineHeight: "1.5",
  },
  btnSubmit: {
    padding: "0.9rem",
    background: `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`,
    color: "white", border: "none", borderRadius: "10px",
    cursor: "pointer", fontSize: "0.95rem", fontWeight: "700",
    marginTop: "0.25rem",
    boxShadow: `0 4px 16px rgba(232,121,160,0.4)`,
    letterSpacing: "0.02em", transition: "opacity 0.2s",
  },
  error: {
    backgroundColor: "#fff1f0", color: "#c0392b",
    padding: "0.65rem 1rem", borderRadius: "8px",
    marginBottom: "0.5rem", fontSize: "0.875rem",
    textAlign: "center", border: "1.5px solid #fecaca", fontWeight: "500",
  },
  retryBtn: {
    display: "block", margin: "8px auto 0",
    background: "none", border: "1.5px solid #c0392b",
    borderRadius: "6px", color: "#c0392b",
    padding: "5px 16px", fontSize: "0.8rem",
    fontWeight: "600", cursor: "pointer",
  },
  btnBack: {
    background: "none", border: "none", cursor: "pointer",
    color: PINK, fontSize: "0.9rem", fontWeight: "600",
    padding: "0 0 1rem 0", display: "block",
  },
  toggleNote: { textAlign: "center", marginTop: "1rem", fontSize: "0.85rem", color: "#6b7280" },
  toggleLink: {
    background: "none", border: "none", cursor: "pointer",
    color: PINK, fontWeight: "600", fontSize: "0.85rem",
    padding: 0, textDecoration: "underline",
  },
};

export default LoginPage;