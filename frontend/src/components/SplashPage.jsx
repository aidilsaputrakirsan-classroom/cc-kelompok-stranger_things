import { useEffect, useState } from "react";
import doctorImg from "../../image/dokter.png";

function SplashPage({ onSignUp }) {
  const [visible, setVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.navbar}>
        <span style={s.logo}>
          <span style={s.logoBlack}>ByeBye</span>
          <span style={s.logoPink}>Virus</span>
        </span>

        <button
          onClick={onSignUp}
          style={{
            ...s.btnSignUp,
            transform: isHover ? "translateY(-2px) scale(1.03)" : "translateY(0)",
            boxShadow: isHover
              ? "0 10px 30px rgba(232,121,160,0.5)"
              : "0 6px 20px rgba(232,121,160,0.35)",
          }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = isHover
              ? "translateY(-2px) scale(1.03)"
              : "translateY(0)";
          }}
        >
          Masuk Sekarang
        </button>
      </nav>

      {/* Hero */}
      <main style={{ ...s.hero, flexDirection: isMobile ? "column" : "row" }}>
        {/* Left Content */}
        <div
          style={{
            ...s.heroLeft,
            ...(isMobile ? s.heroLeftMobile : {}),
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          <h1 style={{ ...s.heroTitle, fontSize: isMobile ? "1.65rem" : "clamp(1.75rem, 3vw, 2.6rem)" }}>
            Temukan jadwal imunisasi yang tepat untuk anak Anda
          </h1>

          <p style={s.heroDesc}>
            Website ini membantu orang tua memantau dan mengatur jadwal
            imunisasi anak dengan mudah. Dapatkan informasi lengkap tentang
            vaksin, pengingat jadwal, dan rekomendasi layanan kesehatan
            terpercaya untuk memastikan tumbuh kembang anak yang optimal.
          </p>

          {/* CTA di mobile muncul di bawah teks */}
          {isMobile && (
            <button onClick={onSignUp} style={{ ...s.btnSignUp, marginTop: "1.5rem", width: "100%" }}>
              Masuk Sekarang
            </button>
          )}
        </div>

        {/* Right Image */}
        <div
          style={{
            ...s.heroRight,
            ...(isMobile ? s.heroRightMobile : {}),
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.94)",
            transition: "all 1s ease",
          }}
        >
          <div style={{ ...s.pinkCircle, ...(isMobile ? s.pinkCircleMobile : {}) }} />
          <div style={{ ...s.doctorImageWrapper, ...(isMobile ? s.doctorImageWrapperMobile : {}) }}>
            <img src={doctorImg} alt="Dokter" style={s.doctorImage} />
          </div>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }

        @keyframes floatDoctor {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulseGlow {
          0%   { transform: scale(1);    opacity: 1; }
          50%  { transform: scale(1.03); opacity: 0.92; }
          100% { transform: scale(1);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const PINK      = "#e879a0";
const PINK_DARK = "#d4588a";

const s = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  // ── Navbar ──────────────────────────────────────────────
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1.5rem",          // lebih kecil agar aman di HP
    height: "64px",
    borderBottom: "1px solid #f3f4f6",
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  logo: {
    fontSize: "1.2rem",
    fontWeight: "800",
    letterSpacing: "-0.3px",
    cursor: "pointer",
  },
  logoBlack: { color: "#111827" },
  logoPink:  { color: PINK },

  btnSignUp: {
    background: `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`,
    border: "none",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "700",
    color: "white",
    padding: "0.65rem 1.4rem",
    borderRadius: "12px",
    transition: "all 0.25s ease",
  },

  // ── Hero ─────────────────────────────────────────────────
  hero: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    padding: "2rem 1.5rem 0",    
    gap: "2rem",
    minHeight: "calc(100vh - 64px)",
  },


  heroLeft: {
    flex: "0 0 52%",
    maxWidth: "600px",
    paddingBottom: "4rem",
    paddingLeft: "1.5rem",
  },
 
  heroLeftMobile: {
    flex: "unset",
    width: "100%",
    maxWidth: "100%",
    paddingBottom: "0",
    paddingLeft: "0",
    textAlign: "center",
  },

  heroTitle: {
    fontWeight: "800",
    color: "#111827",
    lineHeight: "1.25",
    marginBottom: "1.25rem",
  },

  heroDesc: {
    fontSize: "0.95rem",
    color: "#6b7280",
    lineHeight: "1.75",
    maxWidth: "520px",
  },

 
  heroRight: {
    flex: 1,
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    minHeight: "520px",
  },
 
  heroRightMobile: {
    width: "100%",
    flex: "unset",
    minHeight: "300px",
    justifyContent: "center",
    alignItems: "flex-end",
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
    animation: "pulseGlow 4s ease-in-out infinite",
    boxShadow: "0 0 60px rgba(232,121,160,0.25)",
  },
 
  pinkCircleMobile: {
    right: "50%",
    transform: "translateX(50%)",
    bottom: "-60px",
    width: "300px",
    height: "300px",
  },

 
  doctorImageWrapper: {
    position: "absolute",
    right: "-100px",
    bottom: "-20px",
    zIndex: 1,
    width: "420px",
    height: "540px",
    animation: "floatDoctor 4s ease-in-out infinite",
  },
  
  doctorImageWrapperMobile: {
    right: "50%",
    transform: "translateX(50%)",
    bottom: "0",
    width: "220px",
    height: "280px",
  },

  doctorImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "top center",
  },
};

export default SplashPage;