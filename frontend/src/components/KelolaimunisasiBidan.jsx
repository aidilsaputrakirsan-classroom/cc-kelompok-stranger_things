// KelolaimunisasiBidan.jsx
// Halaman kosong Kelola Imunisasi dengan navbar yang sama seperti DashboardBidan

function KelolaimunisasiBidan({ user, onLogout, onNavigate }) {
  return (
    <div style={styles.page}>
      {/* NAVBAR — sama persis dengan DashboardBidan */}
      <div style={styles.navbar}>
        <div style={styles.logoWrap}>
          <h2 style={styles.logo}>
            ByeBye<span style={{ color: "#e91e63" }}>Virus</span>
          </h2>
        </div>

        <div style={styles.navMenu}>
          <button
            style={styles.navItem}
            onClick={() => onNavigate?.("home")}
          >
            Home
          </button>

          <button
            style={styles.navItem}
            onClick={() => onNavigate?.("detail")}
          >
            Detail Imunisasi
          </button>

          <button
            style={{
              ...styles.navItem,
              ...styles.navItemActive,
            }}
          >
            Kelola Imunisasi
          </button>

          <button
            style={styles.navItem}
            onClick={() => onNavigate?.("profil")}
          >
            Profil
          </button>
        </div>

        <div style={styles.navRight}>
          <div style={styles.avatar}>
            {(user?.name || "B")[0]}
          </div>
          <button style={styles.logoutBtn} onClick={onLogout}>
            Keluar
          </button>
        </div>
      </div>

      {/* MAIN — kosong */}
      <div style={styles.main}>
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🗂️</div>
          <h2 style={styles.emptyTitle}>Kelola Imunisasi</h2>
          <p style={styles.emptyText}>
            Halaman ini sedang dalam pengembangan.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff5f8",
    fontFamily: "'Segoe UI', sans-serif",
  },
  navbar: {
    height: "70px",
    background: "white",
    padding: "0 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
    borderBottom: "1px solid #f8c8d8",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a1a2e",
  },
  navMenu: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  navItem: {
    border: "none",
    background: "transparent",
    fontSize: "14px",
    fontWeight: "500",
    color: "#777",
    cursor: "pointer",
    transition: "0.2s",
  },
  navItemActive: {
    color: "#e91e63",
    fontWeight: "700",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#f8bbd0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    color: "#c2185b",
    textTransform: "uppercase",
  },
  logoutBtn: {
    border: "none",
    background: "#e91e63",
    color: "white",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 70px)",
  },
  emptyState: {
    textAlign: "center",
    color: "#ccc",
  },
  emptyIcon: {
    fontSize: "64px",
    marginBottom: "16px",
  },
  emptyTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#e91e63",
    margin: "0 0 8px",
  },
  emptyText: {
    fontSize: "14px",
    color: "#aaa",
  },
};

export default KelolaimunisasiBidan;