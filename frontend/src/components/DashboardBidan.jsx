import { useEffect, useState } from "react";
import {
  fetchChildren,
  fetchImmunizations,
  fetchVaccineTypes,
} from "../services/api";

/* ── SVG Icon Components ── */
function HomeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    </svg>
  );
}
function PersonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}
function ProfileIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" />
    </svg>
  );
}

/* ── Nurse Illustration ── */
function NurseIllustration() {
  return (
    <svg width="100" height="95" viewBox="0 0 140 130" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="70" cy="115" rx="55" ry="12" fill="#04342C" opacity="0.4" />
      <rect x="40" y="55" width="50" height="60" rx="10" fill="#1D9E75" />
      <ellipse cx="65" cy="38" rx="20" ry="22" fill="#FDBCB4" />
      <ellipse cx="65" cy="24" rx="20" ry="13" fill="#085041" />
      <rect x="47" y="52" width="36" height="16" rx="6" fill="white" opacity="0.95" />
      <rect x="57" y="55" width="3" height="10" rx="1.5" fill="#1D9E75" />
      <rect x="53" y="59" width="11" height="3" rx="1.5" fill="#1D9E75" />
      <rect x="57" y="70" width="16" height="30" rx="4" fill="#E1F5EE" />
      <rect x="61" y="74" width="3" height="22" rx="1.5" fill="#9FE1CB" />
      <ellipse cx="57" cy="70" rx="5" ry="6" fill="#FDBCB4" />
      <rect x="93" y="56" width="12" height="35" rx="6" fill="#1D9E75" transform="rotate(-25 99 73)" />
      <ellipse cx="108" cy="46" rx="9" ry="8" fill="#FDBCB4" transform="rotate(-25 108 46)" />
      <rect x="103" y="28" width="6" height="20" rx="2" fill="#D3D1C7" transform="rotate(-25 106 38)" />
      <rect x="40" y="118" width="14" height="5" rx="2.5" fill="#085041" />
      <rect x="76" y="118" width="14" height="5" rx="2.5" fill="#085041" />
    </svg>
  );
}

/* ── Main Component ── */
function DashboardBidan({ user, onLogout, onNavigate, onSelectImmunization }) {
  const [summary, setSummary] = useState({
    anak: 0,
    selesai: 0,
    mendatang: 0,
    terlambat: 0,
  });
  const [todaySchedules, setTodaySchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("Beranda");

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Ambil semua jenis vaksin untuk mapping id → nama
        let vaccineMap = {};
        try {
          const vt = await fetchVaccineTypes();
          (vt || []).forEach((v) => {
            vaccineMap[String(v.id)] = v.name;
          });
        } catch (_) {}

        // 2. Ambil semua data anak
        const children = await fetchChildren();
        const allImun = [];

        // 3. Untuk tiap anak, ambil semua jadwal imunisasinya
        for (const child of children || []) {
          try {
            const imuns = await fetchImmunizations(child.id);
            (imuns || []).forEach((i) => {
              allImun.push({
                ...i,
                childName: child.name,
                motherName: child.mother_name || child.motherName || "",
                childId: child.id,
                childData: child,
                childPhoto: child.photo || child.avatar || null,
                vaccine_name:
                  vaccineMap[String(i.vaccine_id)] ||
                  i.vaccine_name ||
                  `Vaksin ${i.vaccine_id}`,
              });
            });
          } catch (_) {}
        }

        // 4. Hitung ringkasan statistik
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const in30Days = new Date(today);
        in30Days.setDate(in30Days.getDate() + 30);

        const selesai = allImun.filter((i) => i.status === "completed").length;

        const mendatang = allImun.filter((i) => {
          if (!i.scheduled_date) return false;
          const d = new Date(i.scheduled_date);
          d.setHours(0, 0, 0, 0);
          return d >= today && d <= in30Days && i.status !== "completed";
        }).length;

        const terlambat = allImun.filter((i) => {
          if (!i.scheduled_date || i.status === "completed") return false;
          const d = new Date(i.scheduled_date);
          d.setHours(0, 0, 0, 0);
          return d < today;
        }).length;

        setSummary({ anak: children.length, selesai, mendatang, terlambat });

        // 5. Filter jadwal HARI INI:
        //    - scheduled_date == today
        //    - status bukan "completed"
        const todayList = allImun.filter((i) => {
          if (!i.scheduled_date || i.status === "completed") return false;
          const d = new Date(i.scheduled_date);
          d.setHours(0, 0, 0, 0);
          return d.getTime() === today.getTime();
        });

        setTodaySchedules(todayList);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const navItems = [
    { label: "Beranda",         icon: HomeIcon,     page: "dashboardBidan"    },
    { label: "Kelola Jadwal",   icon: CalendarIcon, page: "kelolaJadwalBidan" },
    { label: "Data Anak",       icon: PersonIcon,   page: "dataAnakBidan"     },
    { label: "Profil",          icon: ProfileIcon,  page: "profilBidan"       },
  ];

  return (
    <div style={s.root}>
      {/* SIDEBAR */}
      <aside style={s.sidebar}>
        <div style={s.logoArea}>
          <div style={s.logoIcon}>
            <ShieldIcon />
          </div>
          <span style={s.logoText}>Imunisasi</span>
        </div>

        <nav style={s.nav}>
          {navItems.map(({ label, icon: Icon, page }) => (
            <button
              key={label}
              style={{
                ...s.navBtn,
                ...(activeNav === label ? s.navBtnActive : {}),
              }}
              onClick={() => {
                setActiveNav(label);
                onNavigate && onNavigate(page);
              }}
            >
              <span style={{ ...s.navIcon, ...(activeNav === label ? s.navIconActive : {}) }}>
                <Icon />
              </span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div style={s.sidebarBottom}>
          <button style={s.logoutBtn} onClick={() => onLogout && onLogout()}>
            <span style={s.logoutIcon}><LogoutIcon /></span>
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <div style={s.content}>
        {/* TOPBAR */}
        <header style={s.topbar}>
          <div />
          <div style={s.topbarRight}>
            <div style={s.bellWrap}>
              <BellIcon />
              <span style={s.bellBadge}>3</span>
            </div>
            <div style={s.topbarUser}>
              <div style={s.topbarAvatar}>BD</div>
              <span style={s.topbarName}>{user?.name || "Bidan"}</span>
              <ChevronDown />
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main style={s.main}>
          {/* HERO */}
          <div style={s.heroBanner}>
            <div>
              <h1 style={s.heroTitle}>Halo, {user?.name || "Bidan"} 👋</h1>
              <p style={s.heroSub}>
                Ada {loading ? "..." : todaySchedules.length} jadwal imunisasi hari ini.<br />
                Mari pastikan semua berjalan lancar.
              </p>
            </div>
            <NurseIllustration />
          </div>

          {/* STATS */}
          <div style={s.statsGrid}>
            <div style={s.statCard}>
              <div style={{ ...s.statIcon, ...s.statIconTeal }}>
                <CalendarIcon />
              </div>
              <div>
                <div style={s.statNum}>{loading ? "..." : todaySchedules.length}</div>
                <div style={s.statLabel}>Jadwal hari ini</div>
              </div>
            </div>

            <div style={s.statCard}>
              <div style={{ ...s.statIcon, ...s.statIconBlue }}>
                <PersonIcon />
              </div>
              <div>
                <div style={s.statNum}>{loading ? "..." : summary.anak}</div>
                <div style={s.statLabel}>Total anak</div>
              </div>
            </div>

            <div style={s.statCard}>
              <div style={{ ...s.statIcon, ...s.statIconAmber }}>
                <BellIcon />
              </div>
              <div>
                <div style={s.statNum}>{loading ? "..." : summary.terlambat}</div>
                <div style={s.statLabel}>Jadwal terlambat</div>
              </div>
            </div>
          </div>

          {/* SCHEDULE LIST */}
          <div style={s.scheduleSection}>
            <div style={s.sectionHeader}>
              <span style={s.sectionTitle}>Jadwal imunisasi hari ini</span>
              <span style={s.sectionBadge}>{loading ? "..." : todaySchedules.length} anak</span>
            </div>

            {loading ? (
              <p style={s.emptyText}>Memuat...</p>
            ) : todaySchedules.length === 0 ? (
              <p style={s.emptyText}>Tidak ada jadwal hari ini.</p>
            ) : (
              <div style={s.schedList}>
                {todaySchedules.map((item) => (
                  <div key={item.id} style={s.schedCard}>
                    <div style={s.schedAvatar}>
                      {item.childPhoto ? (
                        <img src={item.childPhoto} alt={item.childName} style={s.schedImg} />
                      ) : (
                        <span style={{ fontSize: "15px" }}>👶</span>
                      )}
                    </div>
                    <div>
                      <div style={s.schedName}>{item.childName}</div>
                      <div style={s.schedMeta}>Ibu: {item.motherName || "—"}</div>
                    </div>
                    <div style={s.schedRight}>
                      <span style={s.vaccinePill}>{item.vaccine_name}</span>
                      <button
                        style={s.detailBtn}
                        onClick={() =>
                          onSelectImmunization && onSelectImmunization(item, item.childData)
                        }
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ── Styles ── */
const TEAL_DARK  = "#085041";
const TEAL_MID   = "#1D9E75";
const TEAL_LIGHT = "#E1F5EE";
const TEAL_TEXT  = "#0F6E56";

const s = {
  root: {
    display: "flex",
    minHeight: "100vh",
    background: "#f5f7f6",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: "13.5px",
  },

  /* SIDEBAR */
  sidebar: {
    width: "196px",
    background: "white",
    borderRight: "1px solid #f0f0f0",
    display: "flex",
    flexDirection: "column",
    padding: "1.1rem 0",
    flexShrink: 0,
  },
  logoArea: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "0 1rem 1.25rem",
  },
  logoIcon: {
    width: "28px", height: "28px",
    borderRadius: "7px",
    background: TEAL_LIGHT,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: TEAL_TEXT,
  },
  logoText: { fontSize: "15px", fontWeight: "700", color: TEAL_TEXT },

  nav: {
    display: "flex", flexDirection: "column", gap: "1px",
    padding: "0 0.6rem", flex: 1,
  },
  navBtn: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "8px 10px", borderRadius: "7px", border: "none",
    background: "transparent", color: "#888",
    fontSize: "12.5px", fontWeight: "400",
    cursor: "pointer", textAlign: "left", width: "100%",
  },
  navBtnActive: { background: TEAL_LIGHT, color: TEAL_TEXT, fontWeight: "600" },
  navIcon: { color: "#bbb", display: "flex", alignItems: "center", flexShrink: 0 },
  navIconActive: { color: TEAL_TEXT },

  sidebarBottom: {
    padding: "0.75rem 0.6rem 0",
    borderTop: "1px solid #f5f5f5",
    marginTop: "auto",
  },
  logoutBtn: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "8px 10px", borderRadius: "7px", border: "none",
    background: "transparent", color: "#c0392b",
    fontSize: "12.5px", cursor: "pointer", width: "100%",
  },
  logoutIcon: { color: "#c0392b", display: "flex", alignItems: "center" },

  /* CONTENT */
  content: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },

  /* TOPBAR */
  topbar: {
    height: "48px",
    background: "white",
    borderBottom: "1px solid #f0f0f0",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 1.5rem", flexShrink: 0,
  },
  topbarRight: { display: "flex", alignItems: "center", gap: "14px" },
  bellWrap: {
    position: "relative", cursor: "pointer",
    display: "flex", alignItems: "center", color: "#555",
  },
  bellBadge: {
    position: "absolute", top: "-4px", right: "-5px",
    background: TEAL_MID, color: "white",
    fontSize: "9px", fontWeight: "700",
    width: "13px", height: "13px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  topbarUser: { display: "flex", alignItems: "center", gap: "7px", cursor: "pointer" },
  topbarAvatar: {
    width: "28px", height: "28px", borderRadius: "50%",
    background: TEAL_LIGHT,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: TEAL_TEXT, fontSize: "11px", fontWeight: "600",
  },
  topbarName: { fontSize: "12.5px", fontWeight: "600", color: "#333" },

  /* MAIN */
  main: {
    flex: 1, padding: "1.25rem 1.5rem",
    display: "flex", flexDirection: "column", gap: "1rem",
    overflowY: "auto",
  },

  /* HERO */
  heroBanner: {
    background: TEAL_DARK,
    borderRadius: "14px",
    padding: "1.2rem 1.5rem",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    minHeight: "110px", overflow: "hidden",
  },
  heroTitle: { fontSize: "18px", fontWeight: "700", color: "#9FE1CB", marginBottom: "4px" },
  heroSub:  { fontSize: "12px", color: "#5DCAA5", lineHeight: 1.6 },

  /* STATS */
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  },
  statCard: {
    background: "white",
    border: "1px solid #f0f0f0",
    borderRadius: "12px",
    padding: "0.85rem 1rem",
    display: "flex", alignItems: "center", gap: "10px",
  },
  statIcon: {
    width: "36px", height: "36px", borderRadius: "8px",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  statIconTeal:  { background: TEAL_LIGHT,  color: TEAL_TEXT },
  statIconBlue:  { background: "#E6F1FB",   color: "#185FA5" },
  statIconAmber: { background: "#FAEEDA",   color: "#854F0B" },
  statNum:   { fontSize: "20px", fontWeight: "700", color: "#1a1a2e", lineHeight: 1 },
  statLabel: { fontSize: "11px", color: "#888", marginTop: "3px" },

  /* SCHEDULE */
  scheduleSection: {
    background: "white",
    border: "1px solid #f0f0f0",
    borderRadius: "12px",
    padding: "1.1rem 1.25rem",
  },
  sectionHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    marginBottom: "0.9rem",
  },
  sectionTitle: { fontSize: "13.5px", fontWeight: "700", color: "#1a1a2e" },
  sectionBadge: {
    fontSize: "11px", background: TEAL_LIGHT, color: TEAL_TEXT,
    padding: "2px 9px", borderRadius: "6px", fontWeight: "600",
  },
  emptyText: { color: "#aaa", padding: "0.5rem 0", fontSize: "13px" },

  schedList: { display: "flex", flexDirection: "column", gap: "7px" },
  schedCard: {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "0.65rem 0.9rem",
    background: "#fafafa",
    borderRadius: "8px",
    border: "1px solid #f0f0f0",
  },
  schedAvatar: {
    width: "34px", height: "34px", borderRadius: "50%",
    background: TEAL_LIGHT,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, overflow: "hidden",
  },
  schedImg: { width: "100%", height: "100%", objectFit: "cover" },
  schedName: { fontSize: "13px", fontWeight: "600", color: "#1a1a2e" },
  schedMeta: { fontSize: "11px", color: "#888", marginTop: "1px" },
  schedRight: {
    marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px",
  },
  vaccinePill: {
    fontSize: "11px", background: "#E6F1FB", color: "#185FA5",
    padding: "2px 9px", borderRadius: "6px", fontWeight: "500",
  },
  detailBtn: {
    background: TEAL_DARK, color: "#9FE1CB",
    border: "none", borderRadius: "7px",
    padding: "5px 14px", fontSize: "12px", fontWeight: "600",
    cursor: "pointer",
  },
};

export default DashboardBidan;