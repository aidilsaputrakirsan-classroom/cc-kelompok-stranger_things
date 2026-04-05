import { useEffect, useState } from "react"
import doctorImg from "../../image/dokter.png"

function SplashPage({ onSignUp }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <span style={styles.logo}>
            <span style={styles.logoBlack}>ByeBye</span>
            <span style={styles.logoPink}>Virus</span>
          </span>
          <div style={styles.navLinks}>
            <a href="#" style={styles.navLink}>Home</a>
            <a href="#" style={styles.navLink}>Jadwal Imunisasi</a>
            <a href="#" style={styles.navLink}>Faskes Map</a>
          </div>
        </div>
        <div style={styles.navRight}>
          <button onClick={onSignUp} style={styles.btnSignUp}>Sign Up</button>
        </div>
      </nav>

      {/* Hero */}
      <main style={styles.hero}>
        {/* Left Content */}
        <div
          style={{
            ...styles.heroLeft,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <h1 style={styles.heroTitle}>
            Temukan jadwal imunisasi yang tepat untuk anak Anda
          </h1>
          <p style={styles.heroDesc}>
            Website ini membantu orang tua memantau dan mengatur jadwal imunisasi
            anak dengan mudah. Dapatkan informasi lengkap tentang vaksin, pengingat
            jadwal, dan rekomendasi layanan kesehatan terpercaya untuk memastikan
            tumbuh kembang anak yang optimal.
          </p>
          <button
            onClick={onSignUp}
            style={styles.btnCTA}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #d4588a, #c0457a)"
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(232,121,160,0.5)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #e879a0, #d4588a)"
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(232,121,160,0.4)"
            }}
          >
            Jadwalkan Sekarang
          </button>
        </div>

        {/* Right — Doctor Illustration */}
        <div
          style={{
            ...styles.heroRight,
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.94)",
            transition: "opacity 0.75s ease 0.15s, transform 0.75s ease 0.15s",
          }}
        >
          {/* Pink circle bg */}
          <div style={styles.pinkCircle} />
          {/* Doctor image placeholder */}
          <div style={styles.doctorImageWrapper}>
            <img
            src={doctorImg}
            alt="Dokter"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
            }}
            />
          </div>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        a { text-decoration: none; }
      `}</style>
    </div>
  )
}

// SVG doctor illustration — replicates the mockup's white-coat doctor figure
function DoctorIllustration() {
  return (
    <svg
      viewBox="0 0 360 520"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {/* Body - white coat */}
      <ellipse cx="180" cy="420" rx="110" ry="130" fill="#f0f0f0" />
      {/* Coat collar */}
      <path d="M140 300 Q180 340 220 300 L230 420 Q180 440 130 420 Z" fill="#e8e8e8" />
      {/* Pink shirt underneath */}
      <path d="M160 310 Q180 325 200 310 L205 370 Q180 380 155 370 Z" fill="#fce7f3" />
      {/* Stethoscope */}
      <path d="M155 320 Q130 350 135 390 Q138 410 155 412" stroke="#555" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M205 320 Q220 340 215 370 Q212 390 200 395" stroke="#555" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <circle cx="178" cy="415" r="14" fill="#555" />
      <circle cx="178" cy="415" r="9" fill="#777" />
      {/* Neck */}
      <rect x="168" y="265" width="24" height="45" rx="12" fill="#f5c5a3" />
      {/* Head */}
      <ellipse cx="180" cy="230" rx="58" ry="68" fill="#f5c5a3" />
      {/* Hair */}
      <path d="M122 215 Q125 155 180 148 Q235 155 238 215 Q230 180 215 168 Q195 158 180 160 Q163 158 145 170 Q130 182 122 215Z" fill="#2a1a0e" />
      {/* Hair sides */}
      <path d="M122 215 Q116 240 120 260 Q128 250 130 240 Q128 228 122 215Z" fill="#2a1a0e" />
      <path d="M238 215 Q244 240 240 260 Q232 250 230 240 Q232 228 238 215Z" fill="#2a1a0e" />
      {/* Bun */}
      <ellipse cx="200" cy="162" rx="22" ry="16" fill="#2a1a0e" />
      {/* Eyes */}
      <ellipse cx="162" cy="235" rx="8" ry="9" fill="white" />
      <ellipse cx="198" cy="235" rx="8" ry="9" fill="white" />
      <ellipse cx="163" cy="236" rx="5" ry="6" fill="#3d2b1f" />
      <ellipse cx="199" cy="236" rx="5" ry="6" fill="#3d2b1f" />
      <circle cx="165" cy="234" r="2" fill="white" />
      <circle cx="201" cy="234" r="2" fill="white" />
      {/* Eyebrows */}
      <path d="M154 224 Q162 219 170 222" stroke="#2a1a0e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M190 222 Q198 219 206 224" stroke="#2a1a0e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Nose */}
      <path d="M178 245 Q175 258 178 262 Q181 264 184 262 Q187 258 184 245" stroke="#e0a882" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Smile */}
      <path d="M168 278 Q180 289 192 278" stroke="#d4826a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Cheeks blush */}
      <ellipse cx="148" cy="262" rx="12" ry="7" fill="#f9a8d4" opacity="0.45" />
      <ellipse cx="212" cy="262" rx="12" ry="7" fill="#f9a8d4" opacity="0.45" />
      {/* Left arm pointing up */}
      <path d="M120 350 Q80 300 95 230 Q100 210 110 205" stroke="#f5c5a3" strokeWidth="28" fill="none" strokeLinecap="round"/>
      {/* Left hand */}
      <ellipse cx="112" cy="198" rx="16" ry="20" fill="#f5c5a3" />
      {/* Index finger pointing up */}
      <rect x="108" y="168" width="9" height="32" rx="4.5" fill="#f5c5a3" />
      {/* Other fingers curled */}
      <rect x="100" y="194" width="8" height="18" rx="4" fill="#f0b896" />
      <rect x="119" y="196" width="8" height="16" rx="4" fill="#f0b896" />
      <rect x="128" y="200" width="7" height="14" rx="3.5" fill="#f0b896" />
      {/* Right arm lower */}
      <path d="M240 350 Q275 320 265 290 Q260 275 250 268" stroke="#f5c5a3" strokeWidth="28" fill="none" strokeLinecap="round"/>
      {/* Right hand pointing */}
      <ellipse cx="248" cy="260" rx="16" ry="18" fill="#f5c5a3" />
      <rect x="255" y="248" width="9" height="28" rx="4.5" fill="#f5c5a3" transform="rotate(30 255 248)" />
      <rect x="244" y="244" width="8" height="18" rx="4" fill="#f0b896" />
      {/* White coat buttons */}
      <circle cx="180" cy="370" r="3" fill="#ccc" />
      <circle cx="180" cy="395" r="3" fill="#ccc" />
    </svg>
  )
}

const PINK = "#e879a0"
const PINK_DARK = "#d4588a"

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
 
  // Navbar
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 3rem",
    height: "68px",
    borderBottom: "1px solid #f3f4f6",
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: "2.5rem",
  },
  logo: {
    fontSize: "1.25rem",
    fontWeight: "800",
    letterSpacing: "-0.3px",
    cursor: "pointer",
  },
  logoBlack: {
    color: "#111827",
  },
  logoPink: {
    color: PINK,
  },
  navLinks: {
    display: "flex",
    gap: "2rem",
  },
  navLink: {
    color: "#374151",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "color 0.2s",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  btnSignIn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#374151",
    padding: "0.5rem 0.75rem",
    borderRadius: "8px",
    transition: "color 0.2s",
  },
  btnSignUp: {
    background: `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`,
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "700",
    color: "white",
    padding: "0.55rem 1.4rem",
    borderRadius: "10px",
    boxShadow: "0 4px 14px rgba(232,121,160,0.35)",
    transition: "opacity 0.2s",
  },
 
  // Hero
  hero: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    padding: "2rem 3rem 0 3rem",
    gap: "2rem",
    overflow: "hidden",
    minHeight: "calc(100vh - 68px)",
    position: "relative",
  },
  heroLeft: {
    flex: "0 0 52%",
    maxWidth: "600px",
    paddingBottom: "4rem",
  },
  heroTitle: {
    fontSize: "clamp(1.75rem, 3vw, 2.6rem)",
    fontWeight: "800",
    color: "#111827",
    lineHeight: "1.25",
    marginBottom: "1.25rem",
    letterSpacing: "-0.5px",
  },
  heroDesc: {
    fontSize: "0.95rem",
    color: "#6b7280",
    lineHeight: "1.75",
    marginBottom: "2rem",
    maxWidth: "520px",
  },
  btnCTA: {
    background: `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`,
    border: "none",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "white",
    padding: "0.85rem 2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 14px rgba(232,121,160,0.4)",
    transition: "background 0.2s, box-shadow 0.2s, transform 0.15s",
    letterSpacing: "0.01em",
  },
 
  heroRight: {
    flex: 1,
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    minHeight: "520px",
    overflow: "visible",
  },
  pinkCircle: {
    position: "absolute",
    right: "-100px",
    bottom: "-120px",
    width: "560px",
    height: "560px",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`,
    zIndex: 0,
  },
  doctorImageWrapper: {
    position: "absolute",
    right: "-100px",
    bottom: "-20px",
    zIndex: 1,
    width: "420px",
    height: "540px",
  },
}
 
export default SplashPage