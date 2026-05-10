import { useState, useEffect, useCallback } from "react";
import LoginPage from "./components/LoginPage";
import SplashPage from "./components/SplashPage";
import JadwalImunisasi from "./components/JadwalImunisasi";
import FaskesMap from "./components/FaskesMap";
import DataAnak from "./components/DataAnak";
import DetailJadwal from "./components/DetailJadwal";
import Navbar from "./components/Navbar";
import AboutPage from "./components/AboutPage"
import img1 from "../image/image-size-modul5/edu1.png";
import img2 from "../image/image-size-modul5/edu2.png";
import img3 from "../image/image-size-modul5/edu3.png";
import useTheme from "./hooks/useTheme";
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  checkHealth,
  login,
  register,
  clearToken,
} from "./services/api";

// ── Static data ──
const scheduleData = [
  { id: 1, name: "BCG", date: "6 April 2026", status: "red" },
  { id: 2, name: "POLIO 2", date: "6 April 2026", status: "orange" },
  { id: 3, name: "POLIO 2", date: "6 April 2026", status: "green" },
  { id: 4, name: "Hepatitis B", date: "6 April 2026", status: "green" },
  { id: 5, name: "DPT 1", date: "6 April 2026", status: "orange" },
  { id: 6, name: "DPT 1", date: "6 April 2026", status: "orange" },
];

const eduArticles = [
  {
    id: 1,
    tag: "Panduan",
    tagColor: "#e91e8c",
    title: "Panduan Lengkap Jadwal Imunisasi Anak Sesuai Usia",
    bgImage: img1,
    url: "https://www.halodoc.com/artikel/ini-jadwal-imunisasi-dasar-lengkap-anak-rekomendasi-idai-berdasarkan-usia-dan-jenis",
  },
  {
    id: 2,
    tag: "Tips",
    tagColor: "#ff9800",
    title: "Tips Agar Anak Tidak Takut Saat Imunisasi",
    bgImage: img2,
    url: "https://hellosehat.com/parenting/anak-1-sampai-5-tahun/perkembangan-balita/tips-untuk-anak-takut-disuntik/",
  },
  {
    id: 3,
    tag: "Kesehatan",
    tagColor: "#4caf50",
    title: "Mengapa Imunisasi Penting untuk Kesehatan Anak",
    bgImage: img3,
    url: "https://ayosehat.kemkes.go.id/pentingnya-melakukan-imunisasi-pada-anak",
  },
];

const dotColors = { red: "#e53935", orange: "#fb8c00", green: "#43a047" };

// ── HomePage Component ──
function HomePage({ user, onLogout, activePage, onNavigate, theme }) {
  const isDark = theme === "dark";
  const summary = { selesai: 7, total: 12, mendatang: 3, belumTerjadwal: 2 };

  const dynPage = {
    ...homeStyles.page,
    background: isDark ? "#0f0f1a" : "#fff5f8",
    color: isDark ? "#f0f0f0" : "#1a1a2e",
  };

  const dynWelcomeCard = {
    ...homeStyles.welcomeCard,
    background: isDark ? "#16213e" : "#fce4ec",
    boxShadow: isDark ? "0 2px 6px rgba(0,0,0,0.5)" : "0 2px 6px rgba(0,0,0,0.2)",
  };

  const dynWelcomeTitle = {
    ...homeStyles.welcomeTitle,
    color: isDark ? "#f0f0f0" : "#1a1a2e",
  };

  const dynWelcomeSubtitle = {
    ...homeStyles.welcomeSubtitle,
    color: isDark ? "#aaa" : "#555",
  };

  const dynReminder = {
    ...homeStyles.reminder,
    background: isDark ? "#1a1a2e" : "#fff0f5",
    border: isDark ? "1px solid #2a2a4a" : "1px solid #f9a8d4",
    boxShadow: isDark ? "0 2px 6px rgba(0,0,0,0.5)" : "0 2px 6px rgba(0,0,0,0.2)",
  };

  const dynReminderText = {
    ...homeStyles.reminderText,
    color: isDark ? "#ccc" : "#333",
  };

  const dynSectionTitle = {
    ...homeStyles.sectionTitle,
    color: isDark ? "#f0f0f0" : "#1a1a2e",
  };

  const dynSchedCard = {
    ...homeStyles.schedCard,
    background: isDark ? "#16213e" : "white",
    border: isDark ? "0.5px solid #2a2a4a" : "0.5px solid #f9c0d0",
    boxShadow: isDark ? "0 2px 6px rgba(0,0,0,0.5)" : "0 2px 6px rgba(0,0,0,0.2)",
  };

  const dynSchedName = {
    ...homeStyles.schedName,
    color: isDark ? "#f0f0f0" : "#1a1a2e",
  };

  const dynEduTitle = {
    ...homeStyles.eduTitle,
    color: isDark ? "#f0f0f0" : "#1a1a2e",
  };

  const dynEduCard = {
    ...homeStyles.eduCard,
    background: isDark ? "#16213e" : "white",
    border: isDark ? "0.5px solid #2a2a4a" : "0.5px solid #f0d0da",
  };

  const dynEduBodyText = {
    ...homeStyles.eduBodyText,
    color: isDark ? "#f0f0f0" : "#1a1a2e",
  };

  return (
    <div style={dynPage}>
      {/* Navbar bersama */}
      <Navbar activePage={activePage} setActivePage={onNavigate} onLogout={onLogout} />

      <div style={homeStyles.main}>
        {/* Left Column */}
        <div style={homeStyles.left}>
          {/* Welcome Card */}
          <div style={dynWelcomeCard}>
            <div style={homeStyles.welcomeAvatarWrap}>
              <svg viewBox="0 0 80 80" width="60" height="60" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="30" r="18" fill="#f48fb1" />
                <circle cx="40" cy="30" r="14" fill="#fce4ec" />
                <ellipse cx="35" cy="28" rx="2" ry="2.5" fill="#333" />
                <ellipse cx="45" cy="28" rx="2" ry="2.5" fill="#333" />
                <path d="M35 36 Q40 40 45 36" stroke="#e91e8c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <rect x="28" y="16" width="24" height="12" rx="6" fill="#e91e8c" />
                <circle cx="40" cy="55" r="14" fill="#f48fb1" />
                <path d="M30 50 Q40 48 50 50 L52 70 Q40 74 28 70Z" fill="#e91e8c" />
                <circle cx="33" cy="60" r="4" fill="#fff" opacity="0.7" />
                <text x="31" y="63" fontSize="6" fill="#e91e8c" fontWeight="bold">+</text>
              </svg>
            </div>
            <div>
              <h2 style={dynWelcomeTitle}>
                Selamat Datang, {user?.name || user?.email?.split("@")[0] || "Andin"}!
              </h2>
              <p style={dynWelcomeSubtitle}>
                Mari bersama menjaga kesehatan si kecil dengan Bye Bye Virus.
                <br />
                Pantau jadwal imunisasi dan tumbuh kembang anak dengan mudah.
              </p>
            </div>
          </div>

          {/* Reminder */}
          <div style={dynReminder}>
            <div style={homeStyles.reminderIcon}>!</div>
            <p style={dynReminderText}>
              <strong>Pengingat</strong>: Imunisasi BCG untuk Dina dalam 3 hari lagi
            </p>
            <span style={homeStyles.reminderBadge}>3 hari lagi</span>
          </div>

          {/* Ringkasan Imunisasi */}
          <div>
            <h3 style={dynSectionTitle}>Ringkasan Imunisasi</h3>
            <div style={homeStyles.statsGrid}>
              <div style={{ ...homeStyles.statCard, background: "#e91e8c" }}>
                <div style={homeStyles.statLabel}>Selesai</div>
                <div style={homeStyles.statNumber}>{summary.selesai}</div>
                <div style={homeStyles.statSub}>Dari {summary.total} Imunisasi</div>
              </div>
              <div style={{ ...homeStyles.statCard, background: "#f06292" }}>
                <div style={homeStyles.statLabel}>Mendatang</div>
                <div style={homeStyles.statNumber}>{summary.mendatang}</div>
                <div style={homeStyles.statSub}>Dalam 30 Hari Kedepan</div>
              </div>
              <div style={{ ...homeStyles.statCard, background: "#f48fb1" }}>
                <div style={homeStyles.statLabel}>Belum terjadwal</div>
                <div style={homeStyles.statNumber}>{summary.belumTerjadwal}</div>
                <div style={homeStyles.statSub}>Perlu segera dijadwalkan</div>
              </div>
            </div>
          </div>

          {/* Jadwal Terdekat */}
          <div>
            <h3 style={dynSectionTitle}>Jadwal Imunisasi Terdekat</h3>
            <div style={homeStyles.scheduleGrid}>
              {scheduleData.map((item) => (
                <div key={item.id} style={dynSchedCard}>
                  <div style={{ ...homeStyles.dot, background: dotColors[item.status] }} />
                  <div style={{ flex: 1 }}>
                    <div style={dynSchedName}>{item.name}</div>
                    <div style={homeStyles.schedDate}>{item.date}</div>
                  </div>
                  <span style={homeStyles.schedBadge}>3 hari lagi</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={homeStyles.right}>
          <h3 style={dynEduTitle}>EduHealth</h3>
          {eduArticles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...dynEduCard, textDecoration: "none" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  ...homeStyles.eduImgBox,
                  backgroundImage: `url(${article.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
                <span style={{ ...homeStyles.eduTag, background: article.tagColor, position: "relative", zIndex: 2 }}>
                  {article.tag}
                </span>
              </div>
              <div style={homeStyles.eduBody}>
                <p style={dynEduBodyText}>{article.title}</p>
                <p style={homeStyles.eduReadMore}>Baca selengkapnya →</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main App ──
function App() {
  const { theme, toggleTheme } = useTheme();

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [activePage, setActivePage] = useState("home");

  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [toast, setToast] = useState(null);

  const loadItems = useCallback(async (search = "") => {
    setLoading(true);
    try {
      const data = await fetchItems(search);
      setItems(data.items);
      setTotalItems(data.total);
    } catch (err) {
      if (err.message === "UNAUTHORIZED") handleLogout();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { checkHealth().then(setIsConnected); }, []);
  useEffect(() => { if (isAuthenticated) loadItems(); }, [isAuthenticated, loadItems]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    setUser(data.user);
    setIsAuthenticated(true);
  };

  const handleRegister = async (userData) => {
    await register(userData);
    await handleLogin(userData.email, userData.password);
  };

  const handleLogout = () => {
    clearToken();
    setUser(null);
    setIsAuthenticated(false);
    setItems([]);
    setTotalItems(0);
    setEditingItem(null);
    setSearchQuery("");
    setActivePage("home");
    setShowSplash(true);
  };

  const handleSubmit = async (itemData, editId) => {
    try {
      if (editId) {
        await updateItem(editId, itemData);
        setEditingItem(null);
        setToast({ type: "success", message: "Item berhasil diupdate" });
      } else {
        await createItem(itemData);
        setToast({ type: "success", message: "Item berhasil ditambahkan" });
      }
      loadItems(searchQuery);
    } catch (err) {
      if (err.message === "UNAUTHORIZED") handleLogout();
      else setToast({ type: "error", message: err.message });
    }
  };

  const handleDelete = async (id) => {
    const item = items.find((i) => i.id === id);
    if (!window.confirm(`Hapus "${item?.name}" ?`)) return;
    try {
      await deleteItem(id);
      setToast({ type: "success", message: "Item berhasil dihapus" });
      loadItems(searchQuery);
    } catch (err) {
      if (err.message === "UNAUTHORIZED") handleLogout();
      else setToast({ type: "error", message: err.message });
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    loadItems(query);
  };

  const sortedItems = [...items].sort((a, b) => {
    switch (sortBy) {
      case "price_asc": return a.price - b.price;
      case "price_desc": return b.price - a.price;
      case "name_asc": return a.name.localeCompare(b.name);
      case "name_desc": return b.name.localeCompare(a.name);
      case "oldest": return a.id - b.id;
      default: return b.id - a.id;
    }
  });

  if (!isAuthenticated) {
    if (showSplash) {
      return (
        <SplashPage
          onSignIn={() => setShowSplash(false)}
          onSignUp={() => setShowSplash(false)}
        />
      );
    }
    return (
      <LoginPage
        onLogin={handleLogin}
        onRegister={handleRegister}
        onBack={() => setShowSplash(true)}
      />
    );
  }

  return (
    <>
      {activePage === "home" && (
        <HomePage
          user={user}
          onLogout={handleLogout}
          activePage={activePage}
          onNavigate={setActivePage}
          theme={theme}
        />
      )}

      {activePage === "jadwal" && (
        <JadwalImunisasi
          onLogout={handleLogout}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}

      {activePage === "dataAnak" && (
        <DataAnak
          setActivePage={setActivePage}
          onLogout={() => setActivePage("login")}
        />
      )}

      {activePage === "faskes" && (
        <FaskesMap
          onLogout={handleLogout}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}

      {activePage === "detailJadwal" && (
        <DetailJadwal
          onLogout={handleLogout}
          setActivePage={setActivePage}
        />
      )}

      {activePage === "about" && (
        <AboutPage onBack={() => setActivePage("home")} />
     )}

      {toast && (
        <div style={{
          ...toastStyles.base,
          ...(toast.type === "success" ? toastStyles.success : toastStyles.error),
        }}>
          <div style={toastStyles.iconWrap(toast.type)}>
            {toast.type === "success" ? "✓" : "!"}
          </div>
          <span style={toastStyles.message}>{toast.message}</span>
          <button style={toastStyles.close} onClick={() => setToast(null)}>✕</button>
        </div>
      )}
    </>
  );
}

// ── HomePage Styles ──
const homeStyles = {
  page: {
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    fontSize: "14px",
    transition: "background 0.3s ease, color 0.3s ease",
  },
  main: {
    display: "grid",
    gridTemplateColumns: "1fr 300px",
    gap: "1.5rem",
    padding: "1.5rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  left: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "1rem" 
  },
  welcomeCard: {
    borderRadius: "16px", 
    padding: "1.5rem",
    display: "flex", 
    alignItems: "center", 
    gap: "1.25rem",
    transition: "background 0.3s ease, box-shadow 0.3s ease",
  },
  welcomeAvatarWrap: {
    width: "72px", 
    height: "72px", 
    borderRadius: "50%",
    background: "white", 
    display: "flex",
    alignItems: "center", 
    justifyContent: "center", 
    flexShrink: 0,
  },
  welcomeTitle: { 
    fontSize: "20px", 
    fontWeight: "700", 
    marginBottom: "6px", 
    transition: "color 0.3s ease" 
  },
  welcomeSubtitle: { 
    fontSize: "13px", 
    lineHeight: "1.6", 
    margin: 0, 
    transition: "color 0.3s ease" 
  },
  reminder: {
    borderRadius: "12px", padding: "0.85rem 1.25rem",
    display: "flex", alignItems: "center", gap: "12px",
    transition: "background 0.3s ease, border-color 0.3s ease",
  },
  reminderIcon: {
    width: "32px", 
    height: "32px", 
    borderRadius: "50%",
    background: "#e91e8c", 
    display: "flex", 
    alignItems: "center",
    justifyContent: "center", 
    flexShrink: 0, 
    color: "white", 
    fontWeight: "800", 
    fontSize: "15px",
  },
  reminderText: { 
    flex: 1, 
    fontSize: "13px", 
    margin: 0, 
    transition: "color 0.3s ease" 
  },
  reminderBadge: {
    background: "#c2185b", 
    color: "white", 
    borderRadius: "20px",
    padding: "5px 14px", 
    fontSize: "12px", 
    fontWeight: "600", 
    whiteSpace: "nowrap",
  },
  sectionTitle: { 
    fontSize: "15px", 
    fontWeight: "700", 
    marginBottom: "0.6rem", 
    transition: "color 0.3s ease" 
  },
  statsGrid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(3, 1fr)", 
    gap: "0.75rem" 
  },
  statCard: { 
    borderRadius: "14px", 
    padding: "1rem 1.25rem", 
    color: "white", 
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)" 
  },
  statLabel: { 
    fontSize: "13px", 
    fontWeight: "500", 
    opacity: 0.9, 
    marginBottom: "6px" 
  },
  statNumber: { 
    fontSize: "32px", 
    fontWeight: "700", 
    lineHeight: 1, 
    marginBottom: "4px" 
  },
  statSub: { 
    fontSize: "12px", 
    opacity: 0.85 
  },
  scheduleGrid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(3, 1fr)", 
    gap: "0.6rem" 
  },
  schedCard: {
    borderRadius: "12px", 
    padding: "0.75rem 1rem",
    display: "flex", 
    alignItems: "center", 
    gap: "10px",
    transition: "background 0.3s ease, border-color 0.3s ease",
  },
  dot: { 
    width: "10px", 
    height: "10px", 
    borderRadius: "50%", 
    flexShrink: 0 
  },
  schedName: { 
    fontSize: "13px", 
    fontWeight: "600", 
    transition: "color 0.3s ease" 
  },
  schedDate: { 
    fontSize: "11px", 
    color: "#888", 
    marginTop: "2px" 
  },
  schedBadge: {
    background: "#c2185b", 
    color: "white", 
    borderRadius: "20px",
    padding: "4px 10px", 
    fontSize: "11px", 
    fontWeight: "600", 
    whiteSpace: "nowrap",
  },
  right: { 
    display: "flex", 
    flexDirection: "column" 
  },
  eduTitle: { 
    fontSize: "16px", 
    fontWeight: "700", 
    marginBottom: "1rem", 
    transition: "color 0.3s ease" 
  },
  eduCard: {
    borderRadius: "12px", 
    overflow: "hidden", 
    marginBottom: "0.75rem",
    cursor: "pointer", 
    display: "block", 
    transition: "all 0.25s ease",
  },
  eduImgBox: {
    width: "100%", 
    height: "120px",
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    position: "relative",
  },
  eduTag: {
    position: "absolute", 
    padding: "3px 10px", 
    borderRadius: "20px",
    fontSize: "11px", 
    fontWeight: "600", 
    color: "white", 
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
  eduBody: { 
    padding: "0.6rem 0.85rem 0.75rem" 
  },
  eduBodyText: { 
    fontSize: "13px", 
    fontWeight: "600", 
    lineHeight: "1.4", 
    margin: 0, 
    transition: "color 0.3s ease" },
  eduReadMore: { 
    fontSize: "11px", 
    color: "#e91e8c", 
    marginTop: "6px", 
    marginBottom: 0, 
    fontWeight: "500" 
  },
};

// ── Toast Styles ──
const toastStyles = {
  base: {
    position: "fixed", 
    top: 24, 
    right: 24,
    display: "flex", 
    alignItems: "center", 
    gap: "12px",
    padding: "14px 18px", 
    borderRadius: "14px", 
    zIndex: 999,
    minWidth: "260px", 
    maxWidth: "360px",
    backdropFilter: "blur(12px)", 
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  success: { 
    background: "rgba(240,253,244,0.95)", 
    border: "1px solid rgba(22,163,74,0.2)" },
  error: { 
    background: "rgba(254,242,242,0.95)", 
    border: "1px solid rgba(220,38,38,0.2)" },
  iconWrap: (type) => ({
    width: "28px", 
    height: "28px", 
    borderRadius: "50%", 
    flexShrink: 0,
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    fontWeight: "800", 
    fontSize: "13px",
    background: type === "success" ? "#16a34a" : "#dc2626", 
    color: "#fff",
  }),
  message: { 
    flex: 1, 
    fontSize: "0.9rem", 
    fontWeight: "600", 
    color: "#1e293b", 
    lineHeight: "1.4" 
  },
  close: {
    background: "none", 
    border: "none", 
    cursor: "pointer",
    fontSize: "12px", 
    color: "#94a3b8", 
    padding: "2px 4px",
    borderRadius: "4px", 
    flexShrink: 0, 
    lineHeight: 1,
  },
};

export default App;