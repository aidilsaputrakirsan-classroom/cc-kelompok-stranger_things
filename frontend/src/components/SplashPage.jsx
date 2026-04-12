import { useEffect, useState } from "react";
import doctorImg from "../../image/dokter.png";

function SplashPage({ onSignUp }) {
  const [visible, setVisible] = useState(false);
  const [isHover, setIsHover] = useState(false); // 🔥 state hover

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <span style={styles.logo}>
            <span style={styles.logoBlack}>ByeBye</span>
            <span style={styles.logoPink}>Virus</span>
          </span>
        </div>

        <div style={styles.navRight}>
          <button
            onClick={onSignUp}
            style={{
              ...styles.btnSignUp,
              transform: isHover
                ? "translateY(-2px) scale(1.03)"
                : "translateY(0)",
              boxShadow: isHover
                ? "0 10px 30px rgba(232,121,160,0.5)"
                : "0 6px 20px rgba(232,121,160,0.35)",
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.96)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = isHover
                ? "translateY(-2px) scale(1.03)"
                : "translateY(0)";
            }}
          >
            Masuk Sekarang
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main style={styles.hero}>
        {/* Left Content */}
        <div
          style={{
            ...styles.heroLeft,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          <h1 style={styles.heroTitle}>
            Temukan jadwal imunisasi yang tepat untuk anak Anda
          </h1>

          <p style={styles.heroDesc}>
            Website ini membantu orang tua memantau dan mengatur jadwal
            imunisasi anak dengan mudah. Dapatkan informasi lengkap tentang
            vaksin, pengingat jadwal, dan rekomendasi layanan kesehatan
            terpercaya untuk memastikan tumbuh kembang anak yang optimal.
          </p>
        </div>

        {/* Right Image */}
        <div
          style={{
            ...styles.heroRight,
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.94)",
            transition: "all 1s ease",
          }}
        >
          <div style={styles.pinkCircle} />

          <div style={styles.doctorImageWrapper}>
            <img
              src={doctorImg}
              alt="Dokter"
              style={styles.doctorImage}
            />
          </div>
        </div>
      </main>

      {/* Animation CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        @keyframes floatDoctor {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }

        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.03); opacity: 0.92; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const PINK = "#e879a0";
const PINK_DARK = "#d4588a";

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

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
  },

  navRight: {
    display: "flex",
    alignItems: "center",
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

  btnSignUp: {
    background: `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`,
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "700",
    color: "white",
    padding: "0.7rem 1.6rem",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(232,121,160,0.35)",
    transition: "all 0.25s ease", // 🔥 penting
  },

  hero: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    padding: "2rem 3rem 0 3rem",
    gap: "2rem",
    minHeight: "calc(100vh - 68px)",
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

  doctorImageWrapper: {
    position: "absolute",
    right: "-100px",
    bottom: "-20px",
    zIndex: 1,
    width: "420px",
    height: "540px",
    animation: "floatDoctor 4s ease-in-out infinite",
  },

  doctorImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "top center",
  },
};

export default SplashPage;

