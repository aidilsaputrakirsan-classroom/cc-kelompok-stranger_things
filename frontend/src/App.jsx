import { useState, useEffect, useCallback, useRef } from "react";
import LoginPage from "./components/LoginPage";
import SplashPage from "./components/SplashPage";
import JadwalImunisasi from "./components/JadwalImunisasi";
import FaskesMap from "./components/FaskesMap";
import DataAnak from "./components/DataAnak";
import DetailJadwal from "./components/DetailJadwal";
import Navbar from "./components/Navbar";
import AboutPage from "./components/AboutPage";
import DashboardBidan from "./components/DashboardBidan";
import DataAnakImunisasi from "./components/DataAnakImunisasi";
import KelolaJadwalBidan from "./components/KelolaJadwalBidan";
import ProfilBidan from "./components/ProfilBidan";
import DetailImunisasiBidan from "./components/DetailImunisasiBidan";
import KelolaimunisasiBidan from "./components/KelolaimunisasiBidan";
import DegradedBanner from "./components/DegradedBanner";
import ProfilPengguna from "./components/ProfilPengguna";
import StatusPage from "./pages/StatusPage";
import img1 from "../image/image-size-modul5/edu1.png";
import img2 from "../image/image-size-modul5/edu2.png";
import img3 from "../image/image-size-modul5/edu3.png";
import { ThemeProvider } from "./hooks/ThemeContext";
import { useTheme } from "./hooks/ThemeContext";
import {
  checkHealth,
  login,
  register,
  clearToken,
  fetchChildren,
  fetchImmunizations,
  fetchVaccineTypes,
} from "./services/api";

// ── Design Tokens ──
const tokens = {
  fontSize: {
    xs: "11px",
    sm: "12px",
    base: "14px",
    md: "15px",
    lg: "18px",
    xl: "22px",
    "2xl": "28px",
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  space: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    full: "9999px",
  },
  color: {
    primary: "#e91e8c",
    primaryDark: "#c2185b",
    primaryLight: "#f48fb1",
    primarySoft: "#fce4ec",
    darkBg: "#0f0f1a",
    darkSurface: "#16213e",
    darkBorder: "#2a2a4a",
    darkText: "#f0f0f0",
    darkMuted: "#9ca3af",
    lightBg: "#fff5f8",
    lightSurface: "#ffffff",
    lightBorder: "#f9c0d0",
    lightText: "#1a1a2e",
    lightMuted: "#6b7280",
  },
  shadow: {
    sm: "0 1px 3px rgba(0,0,0,0.12)",
    md: "0 2px 8px rgba(0,0,0,0.12)",
    lg: "0 4px 16px rgba(0,0,0,0.12)",
    smDark: "0 1px 3px rgba(0,0,0,0.4)",
    mdDark: "0 2px 8px rgba(0,0,0,0.4)",
  },
};

// ── Responsive style injection ──
const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif; }

  .home-main {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px 32px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .schedule-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .edu-articles {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  @media (max-width: 1024px) {
    .home-main {
      padding: 16px 20px;
      gap: 16px;
    }
    .edu-articles {
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
  }

  @media (max-width: 768px) {
    .home-main {
      padding: 12px 16px;
      gap: 12px;
    }
    .stats-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .schedule-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
    .edu-articles {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .welcome-card {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 12px !important;
    }
  }

  @media (max-width: 480px) {
    .stats-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
    }
    .schedule-grid {
      grid-template-columns: 1fr;
    }
    .edu-articles {
      grid-template-columns: 1fr;
    }
  }
`;

function injectStyles() {
  if (document.getElementById("app-global-styles")) return;
  const el = document.createElement("style");
  el.id = "app-global-styles";
  el.textContent = globalStyles;
  document.head.appendChild(el);
}

const HEALTH_POLL_INTERVAL = 30_000;

const statusDotColors = {
  red: "#ef4444",
  orange: "#f59e0b",
  green: "#22c55e",
};

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
    tagColor: "#f59e0b",
    title: "Tips Agar Anak Tidak Takut Saat Imunisasi",
    bgImage: img2,
    url: "https://hellosehat.com/parenting/anak-1-sampai-5-tahun/perkembangan-balita/tips-untuk-anak-takut-disuntik/",
  },
  {
    id: 3,
    tag: "Kesehatan",
    tagColor: "#22c55e",
    title: "Mengapa Imunisasi Penting untuk Kesehatan Anak",
    bgImage: img3,
    url: "https://ayosehat.kemkes.go.id/pentingnya-melakukan-imunisasi-pada-anak",
  },
];

function isServiceDownError(err) {
  return (
    err?.message?.includes("503") ||
    err?.message?.includes("Service temporarily unavailable") ||
    err?.message?.includes("Failed to fetch")
  );
}

function getSurface(isDark) {
  return isDark ? tokens.color.darkSurface : tokens.color.lightSurface;
}
function getBorder(isDark) {
  return isDark ? tokens.color.darkBorder : tokens.color.lightBorder;
}
function getText(isDark) {
  return isDark ? tokens.color.darkText : tokens.color.lightText;
}
function getMuted(isDark) {
  return isDark ? tokens.color.darkMuted : tokens.color.lightMuted;
}
function getShadow(isDark) {
  return isDark ? tokens.shadow.mdDark : tokens.shadow.md;
}

// ── HomePage Component ──
function HomePage({ user, onLogout, activePage, onNavigate, theme, serviceDown }) {
  const isDark = theme === "dark";

  useEffect(() => {
    injectStyles();
  }, []);

  const [summary, setSummary] = useState({ selesai: 0, total: 0, mendatang: 0, belumTerjadwal: 0 });
  const [upcomingSchedules, setUpcomingSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        let vaccineMap = {};
        try {
          const types = await fetchVaccineTypes();
          if (Array.isArray(types)) {
            types.forEach((v) => {
              vaccineMap[String(v.id)] = v.name;
              vaccineMap[v.id] = v.name;
            });
          }
        } catch (e) {
          console.warn("Vaccine types fetch failed", e);
        }

        const children = await fetchChildren();
        if (!children?.length) {
          setSummary({ selesai: 0, total: 0, mendatang: 0, belumTerjadwal: 0 });
          setUpcomingSchedules([]);
          return;
        }

        const all = [];
        for (const child of children) {
          try {
            const imuns = await fetchImmunizations(child.id);
            if (Array.isArray(imuns)) {
              all.push(
                ...imuns.map((i) => ({
                  ...i,
                  childName: child.name,
                  childId: child.id,
                  vaccine_name:
                    vaccineMap[String(i.vaccine_id)] ||
                    vaccineMap[i.vaccine_id] ||
                    i.vaccine_name ||
                    `Vaksin ${i.vaccine_id}`,
                }))
              );
            }
          } catch (e) {
            console.error(`Error child ${child.id}:`, e);
          }
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const in30 = new Date(today);
        in30.setDate(in30.getDate() + 30);

        const selesai = all.filter((i) => i.status === "completed").length;
        const belumTerjadwal = all.filter((i) => !i.scheduled_date).length;
        const mendatang = all.filter((i) => {
          if (!i.scheduled_date) return false;
          const d = new Date(i.scheduled_date);
          d.setHours(0, 0, 0, 0);
          return d >= today && d <= in30 && i.status !== "completed";
        }).length;

        setSummary({ selesai, total: all.length, mendatang, belumTerjadwal });

        const upcoming = all
          .filter((i) => i.scheduled_date && i.status !== "completed")
          .sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date))
          .slice(0, 6)
          .map((i) => {
            const d = new Date(i.scheduled_date);
            d.setHours(0, 0, 0, 0);
            return {
              id: i.id,
              name: i.vaccine_name,
              date: new Date(i.scheduled_date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
              scheduled_date: i.scheduled_date,
              childName: i.childName,
              status: d >= today ? "green" : "red",
            };
          });
        setUpcomingSchedules(upcoming);
      } catch (e) {
        console.error("Load error:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const daysLabel = (scheduled_date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(scheduled_date);
    d.setHours(0, 0, 0, 0);
    const diff = Math.ceil((d - today) / 86400000);
    if (diff === 0) return "hari ini";
    if (diff === 1) return "1 hari lagi";
    if (diff < 0) return `${Math.abs(diff)} hari lalu`;
    return `${diff} hari lagi`;
  };

  const bg = isDark ? tokens.color.darkBg : tokens.color.lightBg;
  const surface = getSurface(isDark);
  const border = getBorder(isDark);
  const textMain = getText(isDark);
  const textMuted = getMuted(isDark);
  const shadow = getShadow(isDark);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bg,
        color: textMain,
        transition: "background 0.3s, color 0.3s",
        fontSize: tokens.fontSize.base,
      }}
    >
      <Navbar activePage={activePage} setActivePage={onNavigate} onLogout={onLogout} />

      {serviceDown && (
        <DegradedBanner
          message="Layanan sedang bermasalah. Beberapa data mungkin tidak ter-update."
          isDark={isDark}
        />
      )}

      <div className="home-main">

        {/* Welcome Card */}
        <div
          className="welcome-card"
          style={{
            background: isDark ? tokens.color.darkSurface : tokens.color.primarySoft,
            borderRadius: tokens.radius.lg,
            padding: tokens.space[5],
            display: "flex",
            alignItems: "center",
            gap: tokens.space[5],
            boxShadow: shadow,
          }}
        >
          <div
            onClick={() => onNavigate?.("profile")}
            title="Lihat Profil"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              cursor: "pointer",
              boxShadow: tokens.shadow.sm,
            }}
          >
            <svg viewBox="0 0 80 80" width="52" height="52" xmlns="http://www.w3.org/2000/svg">
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
          <div style={{ minWidth: 0 }}>
            <h2
              style={{
                fontSize: tokens.fontSize.lg,
                fontWeight: tokens.fontWeight.bold,
                margin: "0 0 6px",
                color: textMain,
              }}
            >
              Selamat Datang, {user?.name || user?.email?.split("@")[0] || "Pengguna"}!
            </h2>
            <p style={{ fontSize: tokens.fontSize.sm, color: textMuted, margin: 0, lineHeight: 1.6 }}>
              {serviceDown
                ? "Koneksi ke server bermasalah. Menampilkan data terakhir."
                : "Mari jaga kesehatan si kecil bersama Bye Bye Virus. Pantau jadwal imunisasi dengan mudah."}
            </p>
          </div>
        </div>

        {/* Reminder */}
        <div
          style={{
            background: surface,
            border: `1px solid ${border}`,
            borderRadius: tokens.radius.md,
            padding: `${tokens.space[3]} ${tokens.space[4]}`,
            display: "flex",
            alignItems: "center",
            gap: tokens.space[3],
            boxShadow: shadow,
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: tokens.color.primary,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontWeight: tokens.fontWeight.bold,
              fontSize: tokens.fontSize.md,
            }}
          >
            !
          </div>
          <p style={{ flex: 1, margin: 0, fontSize: tokens.fontSize.base, color: textMain }}>
            {loading ? (
              <strong>Pengingat</strong>
            ) : upcomingSchedules.length > 0 ? (
              <>
                <strong>Pengingat:</strong> {upcomingSchedules[0].name} untuk {upcomingSchedules[0].childName}
              </>
            ) : (
              <><strong>Pengingat</strong> — Tidak ada jadwal mendekat</>
            )}
          </p>
          <span
            style={{
              background: tokens.color.primaryDark,
              color: "#fff",
              borderRadius: tokens.radius.full,
              padding: "5px 14px",
              fontSize: tokens.fontSize.xs,
              fontWeight: tokens.fontWeight.semibold,
              whiteSpace: "nowrap",
            }}
          >
            {loading
              ? "..."
              : upcomingSchedules.length > 0
              ? daysLabel(upcomingSchedules[0].scheduled_date)
              : "—"}
          </span>
        </div>

        {/* Ringkasan */}
        <div>
          <h3
            style={{
              fontSize: tokens.fontSize.md,
              fontWeight: tokens.fontWeight.bold,
              margin: "0 0 10px",
              color: textMain,
            }}
          >
            Ringkasan Imunisasi
          </h3>
          <div className="stats-grid">
            {[
              { label: "Selesai", value: summary.selesai, sub: `Dari ${summary.total} imunisasi`, bg: tokens.color.primary },
              { label: "Mendatang", value: summary.mendatang, sub: "Dalam 30 hari ke depan", bg: tokens.color.primaryLight },
              { label: "Belum terjadwal", value: summary.belumTerjadwal, sub: "Perlu dijadwalkan", bg: "#f06292" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: s.bg,
                  borderRadius: tokens.radius.md,
                  padding: `${tokens.space[4]} ${tokens.space[4]}`,
                  color: "#fff",
                  boxShadow: tokens.shadow.sm,
                }}
              >
                <div
                  style={{
                    fontSize: tokens.fontSize.sm,
                    fontWeight: tokens.fontWeight.medium,
                    opacity: 0.9,
                    marginBottom: tokens.space[1],
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: tokens.fontSize["2xl"],
                    fontWeight: tokens.fontWeight.bold,
                    lineHeight: 1,
                    marginBottom: tokens.space[1],
                  }}
                >
                  {loading ? "…" : serviceDown ? "—" : s.value}
                </div>
                <div style={{ fontSize: tokens.fontSize.xs, opacity: 0.85 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Jadwal Terdekat */}
        <div>
          <h3
            style={{
              fontSize: tokens.fontSize.md,
              fontWeight: tokens.fontWeight.bold,
              margin: "0 0 10px",
              color: textMain,
            }}
          >
            Jadwal Imunisasi Terdekat
          </h3>
          <div className="schedule-grid">
            {loading ? (
              <p
                style={{
                  gridColumn: "1/-1",
                  color: textMuted,
                  textAlign: "center",
                  margin: "16px 0",
                  fontSize: tokens.fontSize.sm,
                }}
              >
                Memuat jadwal…
              </p>
            ) : serviceDown ? (
              <p
                style={{
                  gridColumn: "1/-1",
                  color: textMuted,
                  textAlign: "center",
                  margin: "16px 0",
                  fontSize: tokens.fontSize.sm,
                }}
              >
                Tidak dapat memuat jadwal. Periksa koneksi server.
              </p>
            ) : upcomingSchedules.length === 0 ? (
              <p
                style={{
                  gridColumn: "1/-1",
                  color: textMuted,
                  textAlign: "center",
                  margin: "16px 0",
                  fontSize: tokens.fontSize.sm,
                }}
              >
                Tidak ada jadwal terdekat
              </p>
            ) : (
              upcomingSchedules.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: surface,
                    border: `1px solid ${border}`,
                    borderRadius: tokens.radius.md,
                    padding: `${tokens.space[3]} ${tokens.space[3]}`,
                    display: "flex",
                    alignItems: "center",
                    gap: tokens.space[2],
                    boxShadow: shadow,
                  }}
                >
                  <div
                    style={{
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      background: statusDotColors[item.status],
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: tokens.fontSize.sm,
                        fontWeight: tokens.fontWeight.semibold,
                        color: textMain,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </div>
                    <div style={{ fontSize: tokens.fontSize.xs, color: textMuted, marginTop: "2px" }}>
                      {item.date}
                    </div>
                    <div style={{ fontSize: tokens.fontSize.xs, color: textMuted, marginTop: "1px" }}>
                      {item.childName}
                    </div>
                  </div>
                  <span
                    style={{
                      background: tokens.color.primaryDark,
                      color: "#fff",
                      borderRadius: tokens.radius.full,
                      padding: "3px 9px",
                      fontSize: tokens.fontSize.xs,
                      fontWeight: tokens.fontWeight.semibold,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {daysLabel(item.scheduled_date)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── EduHealth ── */}
        <div>
          <h3
            style={{
              fontSize: tokens.fontSize.md,
              fontWeight: tokens.fontWeight.bold,
              margin: "0 0 12px",
              color: textMain,
            }}
          >
            EduHealth
          </h3>
          <div className="edu-articles">
            {eduArticles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  background: surface,
                  border: `1px solid ${border}`,
                  borderRadius: tokens.radius.md,
                  overflow: "hidden",
                  textDecoration: "none",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  boxShadow: shadow,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = tokens.shadow.lg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = shadow;
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "140px",
                    backgroundImage: `url(${article.bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      background: article.tagColor,
                      color: "#fff",
                      borderRadius: tokens.radius.sm,
                      padding: "4px 10px",
                      fontSize: tokens.fontSize.xs,
                      fontWeight: tokens.fontWeight.semibold,
                    }}
                  >
                    {article.tag}
                  </span>
                </div>
                <div style={{ padding: `${tokens.space[3]} ${tokens.space[4]}` }}>
                  <p
                    style={{
                      fontSize: tokens.fontSize.sm,
                      fontWeight: tokens.fontWeight.semibold,
                      color: textMain,
                      margin: "0 0 6px",
                      lineHeight: 1.5,
                    }}
                  >
                    {article.title}
                  </p>
                  <p
                    style={{
                      fontSize: tokens.fontSize.xs,
                      color: tokens.color.primary,
                      margin: 0,
                      fontWeight: tokens.fontWeight.semibold,
                    }}
                  >
                    Baca selengkapnya →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Main App ──
function App() {
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [activePage, setActivePage] = useState("home");
  const [selectedImmunization, setSelectedImmunization] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [serviceDown, setServiceDown] = useState(false);
  const pollRef = useRef(null);

  const handleLogout = useCallback(() => {
    clearToken();
    setUser(null);
    setIsAuthenticated(false);
    setActivePage("home");
    setShowSplash(true);
    setServiceDown(false);
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const runHealthCheck = useCallback(async () => {
    try {
      await checkHealth();
      setServiceDown(false);
    } catch (err) {
      if (err.message === "UNAUTHORIZED") {
        handleLogout();
      } else if (isServiceDownError(err)) {
        setServiceDown(true);
      }
    }
  }, [handleLogout]);

  useEffect(() => {
    if (!isAuthenticated) return;
    runHealthCheck();
    pollRef.current = setInterval(runHealthCheck, HEALTH_POLL_INTERVAL);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [isAuthenticated, runHealthCheck]);

  const handleLogin = async (email, password, accountType = "parent") => {
    try {
      const data = await login(email, password);
      setUser(data.user);
      setIsAuthenticated(true);
      setServiceDown(false);
      const actualRole = data.user?.role || "parent";
      if (accountType === "midwife" && actualRole !== "midwife") {
        alert("Akun ini terdaftar sebagai Orang Tua. Anda dialihkan ke dashboard Orang Tua.");
      } else if (accountType === "parent" && actualRole === "midwife") {
        alert("Akun ini terdaftar sebagai Bidan. Anda dialihkan ke dashboard Bidan.");
      }
      setActivePage(actualRole === "midwife" ? "dashboardBidan" : "home");
    } catch (err) {
      if (isServiceDownError(err)) setServiceDown(true);
      throw err;
    }
  };

  const handleRegister = async (userData) => {
    try {
      await register(userData);
      await handleLogin(userData.email, userData.password, userData.role || "parent");
    } catch (err) {
      if (isServiceDownError(err)) setServiceDown(true);
      throw err;
    }
  };

  const BIDAN_NAV_MAP = {
    Beranda: "dashboardBidan",
    "Kelola Jadwal Imunisasi": "kelolaJadwalBidan",
    "Data Anak Imunisasi": "dataAnakBidan",
    Profil: "profilBidan",
  };

  const handleBidanNavigate = (labelOrPage) => {
    setActivePage(BIDAN_NAV_MAP[labelOrPage] || labelOrPage);
  };

  if (!isAuthenticated) {
    if (showSplash)
      return <SplashPage onSignIn={() => setShowSplash(false)} onSignUp={() => setShowSplash(false)} />;
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
          serviceDown={serviceDown}
        />
      )}
      {activePage === "jadwal" && (
        <JadwalImunisasi
          onLogout={handleLogout}
          activePage={activePage}
          setActivePage={setActivePage}
          theme={theme}
          serviceDown={serviceDown}
        />
      )}
      {activePage === "detailJadwal" && (
        <DetailJadwal onLogout={handleLogout} setActivePage={setActivePage} theme={theme} />
      )}
      {activePage === "faskes" && (
        <FaskesMap
          setActivePage={setActivePage}
          onLogout={handleLogout}
          activePage={activePage}
          theme={theme}
        />
      )}
      {activePage === "dataAnak" && (
        <DataAnak
          setActivePage={setActivePage}
          onLogout={() => setActivePage("login")}
          theme={theme}
          serviceDown={serviceDown}
        />
      )}

      {activePage === "profile" && (
        <ProfilPengguna
          user={user}
          activePage={activePage}
          setActivePage={setActivePage}
          onBack={() => setActivePage("home")}
          onLogout={handleLogout}
          theme={theme}
        />
      )}
      {activePage === "about" && (
  <AboutPage
    onBack={() => setActivePage("home")}
    activePage={activePage}
    setActivePage={setActivePage}
    onLogout={handleLogout}
    theme={theme}
  />
)}
      {activePage === "status" && (
  <StatusPage
    activePage={activePage}
    setActivePage={setActivePage}
    onLogout={handleLogout}
  />
)}
      {activePage === "dashboardBidan" && (
        <DashboardBidan
          user={user}
          onLogout={handleLogout}
          onNavigate={handleBidanNavigate}
          serviceDown={serviceDown}
          onSelectImmunization={(immunization, child) => {
            setSelectedImmunization(immunization);
            setSelectedChild(child);
            setActivePage("dataAnakBidan");
          }}
        />
      )}
    
      {activePage === "profilBidan" && (
        <ProfilBidan user={user} onLogout={handleLogout} onNavigate={handleBidanNavigate} />
      )}
      {activePage === "kelolaJadwalBidan" && (
        <KelolaJadwalBidan user={user} onLogout={handleLogout} onNavigate={handleBidanNavigate} />
      )}
      {activePage === "dataAnakBidan" && (
        <DataAnakImunisasi
          user={user}
          onLogout={handleLogout}
          onNavigate={handleBidanNavigate}
          selectedImmunization={selectedImmunization}
          selectedChild={selectedChild}
        />
      )}
    </>
  );
}

// ── AppWrapper: bungkus App dengan ThemeProvider ──
function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default AppWrapper;
