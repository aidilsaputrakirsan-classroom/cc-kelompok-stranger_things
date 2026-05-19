import { useState, useEffect, useCallback } from "react";
import LoginPage from "./components/LoginPage";
import SplashPage from "./components/SplashPage";
import JadwalImunisasi from "./components/JadwalImunisasi";
import FaskesMap from "./components/FaskesMap";
import DataAnak from "./components/DataAnak";
import DetailJadwal from "./components/DetailJadwal";
import Navbar from "./components/Navbar";
import AboutPage from "./components/AboutPage";
import AboutPage from "./components/AboutPage";
import ProfilPengguna from "./components/ProfilPengguna";
import img1 from "../image/image-size-modul5/edu1.png";
import img2 from "../image/image-size-modul5/edu2.png";
import img3 from "../image/image-size-modul5/edu3.png";
import useTheme from "./hooks/useTheme";
import {
  checkHealth,
  login,
  register,
  clearToken,
  fetchChildren,
  fetchImmunizations,
  fetchVaccineTypes,
  fetchChildren,
  fetchImmunizations,
  fetchVaccineTypes,
} from "./services/api";

const dotColors = { red: "#e53935", orange: "#fb8c00", green: "#43a047" };
const dotColors = { red: "#e53935", orange: "#fb8c00", green: "#43a047" };

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

// ── HomePage Component ──
function HomePage({ user, onLogout, activePage, onNavigate, theme }) {
  const isDark = theme === "dark";
  const [summary, setSummary] = useState({
    selesai: 0,
    total: 0,
    mendatang: 0,
    belumTerjadwal: 0,
  });
  const [upcomingSchedules, setUpcomingSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load immunization data from all children
  useEffect(() => {
    const loadImmunizationSummary = async () => {
      setLoading(true);
      try {
        // Fetch vaccine types for mapping (with fallback)
        let vaccineMap = {};
        try {
          const vaccinTypes = await fetchVaccineTypes();
          console.log("Vaccine types from API:", vaccinTypes);
          if (vaccinTypes && Array.isArray(vaccinTypes)) {
            vaccinTypes.forEach((v) => {
              vaccineMap[String(v.id)] = v.name;
              vaccineMap[v.id] = v.name;
            });
          }
          console.log("VaccineMap created:", vaccineMap);
        } catch (err) {
          console.warn("Could not fetch vaccine types, using fallback", err);
        }

        const children = await fetchChildren();
        console.log("Children fetched:", children);

        if (!children || children.length === 0) {
          setSummary({ selesai: 0, total: 0, mendatang: 0, belumTerjadwal: 0 });
          setUpcomingSchedules([]);
          setLoading(false);
          return;
        }

        // Fetch immunizations for all children
        const allImmunizations = [];
        for (const child of children) {
          try {
            const immunizations = await fetchImmunizations(child.id);
            console.log(`Immunizations for ${child.name}:`, immunizations);
            if (immunizations && Array.isArray(immunizations)) {
              allImmunizations.push(
                ...immunizations.map((imun) => {
                  const vacId = String(imun.vaccine_id);
                  const mappedName =
                    vaccineMap[vacId] ||
                    vaccineMap[imun.vaccine_id] ||
                    imun.vaccine_name ||
                    `Vaksin ${imun.vaccine_id}`;
                  console.log(
                    `Mapping vaccine_id=${imun.vaccine_id} (str: ${vacId}) to name=${mappedName}`,
                  );
                  return {
                    ...imun,
                    childName: child.name,
                    childId: child.id,
                    vaccine_name: mappedName,
                  };
                }),
              );
            }
          } catch (err) {
            console.error(
              `Error fetching immunizations for child ${child.id}:`,
              err,
            );
          }
        }

        console.log("All immunizations:", allImmunizations);

        // Calculate summary
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const in30Days = new Date(today);
        in30Days.setDate(in30Days.getDate() + 30);

        const selesai = allImmunizations.filter(
          (i) => i.status === "completed",
        ).length;
        const belumTerjadwal = allImmunizations.filter(
          (i) => !i.scheduled_date,
        ).length;

        const mendatang = allImmunizations.filter((i) => {
          if (!i.scheduled_date) return false;
          const schedDate = new Date(i.scheduled_date);
          schedDate.setHours(0, 0, 0, 0);
          return (
            schedDate >= today &&
            schedDate <= in30Days &&
            i.status !== "completed"
          );
        }).length;

        setSummary({
          selesai,
          total: allImmunizations.length,
          mendatang,
          belumTerjadwal,
        });

        // Get upcoming schedules sorted by date (take first 6)
        // Filter: harus ada scheduled_date, dan tidak completed
        const upcoming = allImmunizations
          .filter((i) => i.scheduled_date && i.status !== "completed")
          .sort(
            (a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date),
          )
          .slice(0, 6)
          .map((imun) => ({
            id: imun.id,
            name: imun.vaccine_name,
            date: new Date(imun.scheduled_date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            scheduled_date: imun.scheduled_date,
            childName: imun.childName,
            status: new Date(imun.scheduled_date) >= today ? "green" : "red",
          }));
        console.log("Final upcoming schedules to display:", upcoming);
        console.log("Upcoming schedules:", upcoming);
        setUpcomingSchedules(upcoming);
      } catch (err) {
        console.error("Error loading immunization summary:", err);
      } finally {
        setLoading(false);
      }
    };

    loadImmunizationSummary();
  }, []);
  const [summary, setSummary] = useState({
    selesai: 0,
    total: 0,
    mendatang: 0,
    belumTerjadwal: 0,
  });
  const [upcomingSchedules, setUpcomingSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load immunization data from all children
  useEffect(() => {
    const loadImmunizationSummary = async () => {
      setLoading(true);
      try {
        // Fetch vaccine types for mapping (with fallback)
        let vaccineMap = {};
        try {
          const vaccinTypes = await fetchVaccineTypes();
          console.log("Vaccine types from API:", vaccinTypes);
          if (vaccinTypes && Array.isArray(vaccinTypes)) {
            vaccinTypes.forEach((v) => {
              vaccineMap[String(v.id)] = v.name;
              vaccineMap[v.id] = v.name;
            });
          }
          console.log("VaccineMap created:", vaccineMap);
        } catch (err) {
          console.warn("Could not fetch vaccine types, using fallback", err);
        }

        const children = await fetchChildren();
        console.log("Children fetched:", children);

        if (!children || children.length === 0) {
          setSummary({ selesai: 0, total: 0, mendatang: 0, belumTerjadwal: 0 });
          setUpcomingSchedules([]);
          setLoading(false);
          return;
        }

        // Fetch immunizations for all children
        const allImmunizations = [];
        for (const child of children) {
          try {
            const immunizations = await fetchImmunizations(child.id);
            console.log(`Immunizations for ${child.name}:`, immunizations);
            if (immunizations && Array.isArray(immunizations)) {
              allImmunizations.push(
                ...immunizations.map((imun) => {
                  const vacId = String(imun.vaccine_id);
                  const mappedName =
                    vaccineMap[vacId] ||
                    vaccineMap[imun.vaccine_id] ||
                    imun.vaccine_name ||
                    `Vaksin ${imun.vaccine_id}`;
                  console.log(
                    `Mapping vaccine_id=${imun.vaccine_id} (str: ${vacId}) to name=${mappedName}`,
                  );
                  return {
                    ...imun,
                    childName: child.name,
                    childId: child.id,
                    vaccine_name: mappedName,
                  };
                }),
              );
            }
          } catch (err) {
            console.error(
              `Error fetching immunizations for child ${child.id}:`,
              err,
            );
          }
        }

        console.log("All immunizations:", allImmunizations);

        // Calculate summary
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const in30Days = new Date(today);
        in30Days.setDate(in30Days.getDate() + 30);

        const selesai = allImmunizations.filter(
          (i) => i.status === "completed",
        ).length;
        const belumTerjadwal = allImmunizations.filter(
          (i) => !i.scheduled_date,
        ).length;

        const mendatang = allImmunizations.filter((i) => {
          if (!i.scheduled_date) return false;
          const schedDate = new Date(i.scheduled_date);
          schedDate.setHours(0, 0, 0, 0);
          return (
            schedDate >= today &&
            schedDate <= in30Days &&
            i.status !== "completed"
          );
        }).length;

        setSummary({
          selesai,
          total: allImmunizations.length,
          mendatang,
          belumTerjadwal,
        });

        // Get upcoming schedules sorted by date (take first 6)
        // Filter: harus ada scheduled_date, dan tidak completed
        const upcoming = allImmunizations
          .filter((i) => i.scheduled_date && i.status !== "completed")
          .sort(
            (a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date),
          )
          .slice(0, 6)
          .map((imun) => ({
            id: imun.id,
            name: imun.vaccine_name,
            date: new Date(imun.scheduled_date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            scheduled_date: imun.scheduled_date,
            childName: imun.childName,
            status: new Date(imun.scheduled_date) >= today ? "green" : "red",
          }));
        console.log("Final upcoming schedules to display:", upcoming);
        console.log("Upcoming schedules:", upcoming);
        setUpcomingSchedules(upcoming);
      } catch (err) {
        console.error("Error loading immunization summary:", err);
      } finally {
        setLoading(false);
      }
    };

    loadImmunizationSummary();
  }, []);

  const dynPage = {
    ...homeStyles.page,
    background: isDark ? "#0f0f1a" : "#fff5f8",
    color: isDark ? "#f0f0f0" : "#1a1a2e",
  };

  const dynWelcomeCard = {
    ...homeStyles.welcomeCard,
    background: isDark ? "#16213e" : "#fce4ec",
    boxShadow: isDark
      ? "0 2px 6px rgba(0,0,0,0.5)"
      : "0 2px 6px rgba(0,0,0,0.2)",
    boxShadow: isDark
      ? "0 2px 6px rgba(0,0,0,0.5)"
      : "0 2px 6px rgba(0,0,0,0.2)",
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
    boxShadow: isDark
      ? "0 2px 6px rgba(0,0,0,0.5)"
      : "0 2px 6px rgba(0,0,0,0.2)",
    boxShadow: isDark
      ? "0 2px 6px rgba(0,0,0,0.5)"
      : "0 2px 6px rgba(0,0,0,0.2)",
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
    boxShadow: isDark
      ? "0 2px 6px rgba(0,0,0,0.5)"
      : "0 2px 6px rgba(0,0,0,0.2)",
    boxShadow: isDark
      ? "0 2px 6px rgba(0,0,0,0.5)"
      : "0 2px 6px rgba(0,0,0,0.2)",
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
      <Navbar
        activePage={activePage}
        setActivePage={onNavigate}
        onLogout={onLogout}
      />
      <Navbar
        activePage={activePage}
        setActivePage={onNavigate}
        onLogout={onLogout}
      />

      <div style={homeStyles.main}>
        {/* Left Column */}
        <div style={homeStyles.left}>
          {/* Welcome Card */}
          <div style={dynWelcomeCard}>
            <div style={homeStyles.welcomeAvatarWrap}>
              <svg
                viewBox="0 0 80 80"
                width="60"
                height="60"
                xmlns="http://www.w3.org/2000/svg"
              >
            <div
              style={{ ...homeStyles.welcomeAvatarWrap, cursor: "pointer" }}
              onClick={() => onNavigate?.("profile")}
              title="Lihat Profil" 
            >
              <svg
                viewBox="0 0 80 80"
                width="60"
                height="60"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="40" cy="30" r="18" fill="#f48fb1" />
                <circle cx="40" cy="30" r="14" fill="#fce4ec" />
                <ellipse cx="35" cy="28" rx="2" ry="2.5" fill="#333" />
                <ellipse cx="45" cy="28" rx="2" ry="2.5" fill="#333" />
                <path
                  d="M35 36 Q40 40 45 36"
                  stroke="#e91e8c"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <rect
                  x="28"
                  y="16"
                  width="24"
                  height="12"
                  rx="6"
                  fill="#e91e8c"
                />
                <path
                  d="M35 36 Q40 40 45 36"
                  stroke="#e91e8c"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <rect
                  x="28"
                  y="16"
                  width="24"
                  height="12"
                  rx="6"
                  fill="#e91e8c"
                />
                <circle cx="40" cy="55" r="14" fill="#f48fb1" />
                <path
                  d="M30 50 Q40 48 50 50 L52 70 Q40 74 28 70Z"
                  fill="#e91e8c"
                />
                <path
                  d="M30 50 Q40 48 50 50 L52 70 Q40 74 28 70Z"
                  fill="#e91e8c"
                />
                <circle cx="33" cy="60" r="4" fill="#fff" opacity="0.7" />
                <text
                  x="31"
                  y="63"
                  fontSize="6"
                  fill="#e91e8c"
                  fontWeight="bold"
                >
                  +
                </text>
                <text
                  x="31"
                  y="63"
                  fontSize="6"
                  fill="#e91e8c"
                  fontWeight="bold"
                >
                  +
                </text>
              </svg>
            </div>
            <div>
              <h2 style={dynWelcomeTitle}>
                Selamat Datang,{" "}
                {user?.name || user?.email?.split("@")[0] || "Andin"}!
                Selamat Datang,{" "}
                {user?.name || user?.email?.split("@")[0] || "Andin"}!
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
              {loading ? (
                <strong>Pengingat</strong>
              ) : upcomingSchedules.length > 0 ? (
                <>
                  <strong>Pengingat</strong>: {upcomingSchedules[0].name} untuk{" "}
                  {upcomingSchedules[0].childName}
                </>
              ) : (
                <strong>Pengingat</strong>
              )}
              {loading ? (
                <strong>Pengingat</strong>
              ) : upcomingSchedules.length > 0 ? (
                <>
                  <strong>Pengingat</strong>: {upcomingSchedules[0].name} untuk{" "}
                  {upcomingSchedules[0].childName}
                </>
              ) : (
                <strong>Pengingat</strong>
              )}
            </p>
            <span style={homeStyles.reminderBadge}>
              {loading
                ? "..."
                : upcomingSchedules.length > 0
                  ? (() => {
                      const schedDate = new Date(
                        upcomingSchedules[0].scheduled_date,
                      );
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      schedDate.setHours(0, 0, 0, 0);
                      const daysLeft = Math.ceil(
                        (schedDate - today) / (1000 * 60 * 60 * 24),
                      );
                      return daysLeft === 0
                        ? "hari ini"
                        : daysLeft === 1
                          ? "1 hari lagi"
                          : `${daysLeft} hari lagi`;
                    })()
                  : "-"}
            </span>
            <span style={homeStyles.reminderBadge}>
              {loading
                ? "..."
                : upcomingSchedules.length > 0
                  ? (() => {
                      const schedDate = new Date(
                        upcomingSchedules[0].scheduled_date,
                      );
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      schedDate.setHours(0, 0, 0, 0);
                      const daysLeft = Math.ceil(
                        (schedDate - today) / (1000 * 60 * 60 * 24),
                      );
                      return daysLeft === 0
                        ? "hari ini"
                        : daysLeft === 1
                          ? "1 hari lagi"
                          : `${daysLeft} hari lagi`;
                    })()
                  : "-"}
            </span>
          </div>

          {/* Ringkasan Imunisasi */}
          <div>
            <h3 style={dynSectionTitle}>Ringkasan Imunisasi</h3>
            <div style={homeStyles.statsGrid}>
              <div style={{ ...homeStyles.statCard, background: "#e91e8c" }}>
                <div style={homeStyles.statLabel}>Selesai</div>
                <div style={homeStyles.statNumber}>{summary.selesai}</div>
                <div style={homeStyles.statSub}>
                  Dari {summary.total} Imunisasi
                </div>
                <div style={homeStyles.statSub}>
                  Dari {summary.total} Imunisasi
                </div>
              </div>
              <div style={{ ...homeStyles.statCard, background: "#f06292" }}>
                <div style={homeStyles.statLabel}>Mendatang</div>
                <div style={homeStyles.statNumber}>{summary.mendatang}</div>
                <div style={homeStyles.statSub}>Dalam 30 Hari Kedepan</div>
              </div>
              <div style={{ ...homeStyles.statCard, background: "#f48fb1" }}>
                <div style={homeStyles.statLabel}>Belum terjadwal</div>
                <div style={homeStyles.statNumber}>
                  {summary.belumTerjadwal}
                </div>
                <div style={homeStyles.statNumber}>
                  {summary.belumTerjadwal}
                </div>
                <div style={homeStyles.statSub}>Perlu segera dijadwalkan</div>
              </div>
            </div>
          </div>

          {/* Jadwal Terdekat */}
          <div>
            <h3 style={dynSectionTitle}>Jadwal Imunisasi Terdekat</h3>
            <div style={homeStyles.scheduleGrid}>
              {loading ? (
                <p
                  style={{
                    gridColumn: "1 / -1",
                    color: "#aaa",
                    textAlign: "center",
                  }}
                >
                  Memuat jadwal...
                </p>
              ) : upcomingSchedules.length === 0 ? (
                <p
                  style={{
                    gridColumn: "1 / -1",
                    color: "#aaa",
                    textAlign: "center",
                  }}
                >
                  Tidak ada jadwal terdekat
                </p>
              ) : (
                upcomingSchedules.map((item) => {
                  const schedDate = new Date(item.scheduled_date);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  schedDate.setHours(0, 0, 0, 0);
                  const daysLeft = Math.ceil(
                    (schedDate - today) / (1000 * 60 * 60 * 24),
                  );
                  const daysLabel =
                    daysLeft === 0
                      ? "hari ini"
                      : daysLeft === 1
                        ? "1 hari lagi"
                        : `${daysLeft} hari lagi`;
                  return (
                    <div key={item.id} style={dynSchedCard}>
                      <div
                        style={{
                          ...homeStyles.dot,
                          background: dotColors[item.status],
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={dynSchedName}>{item.name}</div>
                        <div style={homeStyles.schedDate}>{item.date}</div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#888",
                            marginTop: "2px",
                          }}
                        >
                          {item.childName}
                        </div>
                      </div>
                      <span style={homeStyles.schedBadge}>{daysLabel}</span>
                    </div>
                  );
                })
              )}
              {loading ? (
                <p
                  style={{
                    gridColumn: "1 / -1",
                    color: "#aaa",
                    textAlign: "center",
                  }}
                >
                  Memuat jadwal...
                </p>
              ) : upcomingSchedules.length === 0 ? (
                <p
                  style={{
                    gridColumn: "1 / -1",
                    color: "#aaa",
                    textAlign: "center",
                  }}
                >
                  Tidak ada jadwal terdekat
                </p>
              ) : (
                upcomingSchedules.map((item) => {
                  const schedDate = new Date(item.scheduled_date);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  schedDate.setHours(0, 0, 0, 0);
                  const daysLeft = Math.ceil(
                    (schedDate - today) / (1000 * 60 * 60 * 24),
                  );
                  const daysLabel =
                    daysLeft === 0
                      ? "hari ini"
                      : daysLeft === 1
                        ? "1 hari lagi"
                        : `${daysLeft} hari lagi`;
                  return (
                    <div key={item.id} style={dynSchedCard}>
                      <div
                        style={{
                          ...homeStyles.dot,
                          background: dotColors[item.status],
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={dynSchedName}>{item.name}</div>
                        <div style={homeStyles.schedDate}>{item.date}</div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#888",
                            marginTop: "2px",
                          }}
                        >
                          {item.childName}
                        </div>
                      </div>
                      <span style={homeStyles.schedBadge}>{daysLabel}</span>
                    </div>
                  );
                })
              )}
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
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.35)",
                  }}
                />
                <span
                  style={{
                    ...homeStyles.eduTag,
                    background: article.tagColor,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.35)",
                  }}
                />
                <span
                  style={{
                    ...homeStyles.eduTag,
                    background: article.tagColor,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
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
  const { theme } = useTheme();
  const { theme } = useTheme();

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [activePage, setActivePage] = useState("home");

  const handleLogout = useCallback(() => {
    clearToken();
    setUser(null);
    setIsAuthenticated(false);
    setActivePage("home");
    setShowSplash(true);
  }, []);
  const handleLogout = useCallback(() => {
    clearToken();
    setUser(null);
    setIsAuthenticated(false);
    setActivePage("home");
    setShowSplash(true);
  }, []);

  const loadItems = useCallback(async () => {
  const loadItems = useCallback(async () => {
    try {
      await checkHealth();
      await checkHealth();
    } catch (err) {
      if (err.message === "UNAUTHORIZED") handleLogout();
    }
  }, [handleLogout]);
  }, [handleLogout]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadItems();
  }, [isAuthenticated, loadItems]);
    loadItems();
  }, [isAuthenticated, loadItems]);

  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    setUser(data.user);
    setIsAuthenticated(true);
  };

  const handleRegister = async (userData) => {
    await register(userData);
    await handleLogin(userData.email, userData.password);
  };

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
          theme={theme}
        />
      )}

      {activePage === "detailJadwal" && (
        <DetailJadwal
          onLogout={handleLogout}
          setActivePage={setActivePage}
          theme={theme}
        />
      )}

      {activePage === "faskes" && (
        <FaskesMap
          setActivePage={setActivePage}
          onLogout={handleLogout}
          activePage={activePage}
          theme={theme}
        />
      )}

      {activePage === "detailJadwal" && (
        <DetailJadwal onLogout={handleLogout} setActivePage={setActivePage} />
      {activePage === "dataAnak" && (
        <DataAnak
          setActivePage={setActivePage}
          onLogout={() => setActivePage("login")}
          theme={theme}
        />
      )}

      {activePage === "profile" && (
        <ProfilPengguna
          user={user}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}

      {activePage === "detailJadwal" && (
        <DetailJadwal onLogout={handleLogout} setActivePage={setActivePage} />
          onBack={() => setActivePage("home")}
          onLogout={handleLogout}
          theme={theme}
        />
      )}
      {activePage === "about" && (
        <AboutPage onBack={() => setActivePage("home")} />
        <AboutPage onBack={() => setActivePage("home")} theme={theme} />
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
    gap: "1rem",
  left: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  welcomeCard: {
    borderRadius: "16px",
    borderRadius: "16px",
    padding: "1.5rem",
    display: "flex",
    alignItems: "center",
    display: "flex",
    alignItems: "center",
    gap: "1.25rem",
    transition: "background 0.3s ease, box-shadow 0.3s ease",
  },
  welcomeAvatarWrap: {
    width: "72px",
    height: "72px",
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "white",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  welcomeTitle: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "6px",
    transition: "color 0.3s ease",
  welcomeTitle: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "6px",
    transition: "color 0.3s ease",
  },
  welcomeSubtitle: {
    fontSize: "13px",
    lineHeight: "1.6",
    margin: 0,
    transition: "color 0.3s ease",
  welcomeSubtitle: {
    fontSize: "13px",
    lineHeight: "1.6",
    margin: 0,
    transition: "color 0.3s ease",
  },
  reminder: {
    borderRadius: "12px",
    padding: "0.85rem 1.25rem",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderRadius: "12px",
    padding: "0.85rem 1.25rem",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    transition: "background 0.3s ease, border-color 0.3s ease",
  },
  reminderIcon: {
    width: "32px",
    height: "32px",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#e91e8c",
    display: "flex",
    background: "#e91e8c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: "white",
    fontWeight: "800",
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
    transition: "color 0.3s ease",
  reminderText: {
    flex: 1,
    fontSize: "13px",
    margin: 0,
    transition: "color 0.3s ease",
  },
  reminderBadge: {
    background: "#c2185b",
    color: "white",
    background: "#c2185b",
    color: "white",
    borderRadius: "20px",
    padding: "5px 14px",
    fontSize: "12px",
    fontWeight: "600",
    padding: "5px 14px",
    fontSize: "12px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  sectionTitle: {
    fontSize: "15px",
    fontWeight: "700",
    marginBottom: "0.6rem",
    transition: "color 0.3s ease",
  sectionTitle: {
    fontSize: "15px",
    fontWeight: "700",
    marginBottom: "0.6rem",
    transition: "color 0.3s ease",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "0.75rem",
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "0.75rem",
  },
  statCard: {
    borderRadius: "14px",
    padding: "1rem 1.25rem",
    color: "white",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  statCard: {
    borderRadius: "14px",
    padding: "1rem 1.25rem",
    color: "white",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
  statLabel: {
    fontSize: "13px",
    fontWeight: "500",
    opacity: 0.9,
    marginBottom: "6px",
  statLabel: {
    fontSize: "13px",
    fontWeight: "500",
    opacity: 0.9,
    marginBottom: "6px",
  },
  statNumber: {
    fontSize: "32px",
    fontWeight: "700",
    lineHeight: 1,
    marginBottom: "4px",
  statNumber: {
    fontSize: "32px",
    fontWeight: "700",
    lineHeight: 1,
    marginBottom: "4px",
  },
  statSub: {
    fontSize: "12px",
    opacity: 0.85,
  statSub: {
    fontSize: "12px",
    opacity: 0.85,
  },
  scheduleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "0.6rem",
  scheduleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "0.6rem",
  },
  schedCard: {
    borderRadius: "12px",
    borderRadius: "12px",
    padding: "0.75rem 1rem",
    display: "flex",
    alignItems: "center",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "background 0.3s ease, border-color 0.3s ease",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    flexShrink: 0,
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  schedName: {
    fontSize: "13px",
    fontWeight: "600",
    transition: "color 0.3s ease",
  schedName: {
    fontSize: "13px",
    fontWeight: "600",
    transition: "color 0.3s ease",
  },
  schedDate: {
    fontSize: "11px",
    color: "#888",
    marginTop: "2px",
  schedDate: {
    fontSize: "11px",
    color: "#888",
    marginTop: "2px",
  },
  schedBadge: {
    background: "#c2185b",
    color: "white",
    background: "#c2185b",
    color: "white",
    borderRadius: "20px",
    padding: "4px 10px",
    fontSize: "11px",
    fontWeight: "600",
    padding: "4px 10px",
    fontSize: "11px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  right: {
    display: "flex",
    flexDirection: "column",
  right: {
    display: "flex",
    flexDirection: "column",
  },
  eduTitle: {
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "1rem",
    transition: "color 0.3s ease",
  eduTitle: {
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "1rem",
    transition: "color 0.3s ease",
  },
  eduCard: {
    borderRadius: "12px",
    overflow: "hidden",
    borderRadius: "12px",
    overflow: "hidden",
    marginBottom: "0.75rem",
    cursor: "pointer",
    display: "block",
    cursor: "pointer",
    display: "block",
    transition: "all 0.25s ease",
  },
  eduImgBox: {
    width: "100%",
    width: "100%",
    height: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  eduTag: {
    position: "absolute",
    padding: "3px 10px",
    position: "absolute",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "600",
    color: "white",
    fontSize: "11px",
    fontWeight: "600",
    color: "white",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
  eduBody: {
    padding: "0.6rem 0.85rem 0.75rem",
  eduBody: {
    padding: "0.6rem 0.85rem 0.75rem",
  },
  eduBodyText: {
    fontSize: "13px",
    fontWeight: "600",
    lineHeight: "1.4",
    margin: 0,
    transition: "color 0.3s ease",
  },
  eduReadMore: {
    fontSize: "11px",
    color: "#e91e8c",
    marginTop: "6px",
    marginBottom: 0,
    fontWeight: "500",
  eduBodyText: {
    fontSize: "13px",
    fontWeight: "600",
    lineHeight: "1.4",
    margin: 0,
    transition: "color 0.3s ease",
  },
  eduReadMore: {
    fontSize: "11px",
    color: "#e91e8c",
    marginTop: "6px",
    marginBottom: 0,
    fontWeight: "500",
  },
};

export default App;

