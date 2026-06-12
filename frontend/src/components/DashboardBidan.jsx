import { useEffect, useState } from "react";
import {
  fetchChildren,
  fetchImmunizations,
  fetchVaccineTypes,
} from "../services/api";
import DegradedBanner from "./DegradedBanner";

/* ─── Icons ─────────────────────────────────────────────────────────────── */
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const BellIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const LogoutIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/>
  </svg>
);
const AlertIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const SyringeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/>
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const EmptyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>
  </svg>
);

/* ─── Design tokens ──────────────────────────────────────────────────────── */
const C = {
  // Brand
  forest:      "#063D30",
  forestMid:   "#085041",
  teal:        "#10B981",
  tealLight:   "#D1FAE5",
  tealMid:     "#6EE7B7",
  tealSoft:    "#ECFDF5",
  // Page
  pageBg:      "#F0FAF6",
  surface:     "#FFFFFF",
  surfaceAlt:  "#F8FFFE",
  border:      "#E2F0EB",
  borderStrong:"#C4DDD5",
  // Text
  textPrimary: "#0C1F1A",
  textSecondary:"#3D6657",
  textMuted:   "#7BA898",
  textOnDark:  "#ECFDF5",
  // Semantic
  amber:       "#F59E0B",
  amberLight:  "#FEF3C7",
  amberSoft:   "#FFFBEB",
  rose:        "#F43F5E",
  roseLight:   "#FFE4E6",
  roseSoft:    "#FFF1F2",
  blue:        "#3B82F6",
  blueLight:   "#DBEAFE",
  blueSoft:    "#EFF6FF",
  // Sidebar
  sidebarBg:   "#052E24",
  sidebarHover:"#0A4034",
  sidebarActive:"#10B981",
};

/* ─── Typography scale ───────────────────────────────────────────────────── */
const T = {
  hero:    { fontSize: "22px",  fontWeight: "700", lineHeight: "1.25", letterSpacing: "-0.3px" },
  h2:      { fontSize: "15px",  fontWeight: "700", letterSpacing: "-0.1px" },
  stat:    { fontSize: "30px",  fontWeight: "700", lineHeight: "1",    letterSpacing: "-0.5px" },
  label:   { fontSize: "10.5px",fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase" },
  body:    { fontSize: "13.5px",fontWeight: "400", lineHeight: "1.6" },
  bodyMed: { fontSize: "13.5px",fontWeight: "600" },
  small:   { fontSize: "12px",  fontWeight: "400", lineHeight: "1.5" },
  smallMed:{ fontSize: "12px",  fontWeight: "600" },
  xs:      { fontSize: "11px",  fontWeight: "500" },
};

/* ─── Date helpers ───────────────────────────────────────────────────────── */
function todayIndonesia() {
  return new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}
function daysLabel(scheduled_date) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const d = new Date(scheduled_date); d.setHours(0, 0, 0, 0);
  const diff = Math.ceil((d - today) / 86400000);
  if (diff === 0)  return { text: "Hari ini",   color: C.teal,  bg: C.tealLight };
  if (diff === 1)  return { text: "Besok",      color: C.blue,  bg: C.blueLight };
  if (diff < 0)   return { text: `${Math.abs(diff)}h lalu`, color: C.rose, bg: C.roseLight };
  return { text: `${diff} hari lagi`, color: C.amber, bg: C.amberLight };
}

/* ─── Subcomponents ──────────────────────────────────────────────────────── */
function StatCard({ label, value, loading, serviceDown, accentColor, icon, sub }) {
  return (
    <div style={{
      background: C.surface,
      borderRadius: "14px",
      border: `1px solid ${C.border}`,
      padding: "20px 22px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 1px 4px rgba(6,61,48,0.05)",
    }}>
      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: "16px", bottom: "16px",
        width: "3px", borderRadius: "0 3px 3px 0",
        background: accentColor,
      }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ ...T.label, color: C.textMuted }}>{label}</span>
        <div style={{
          width: "32px", height: "32px", borderRadius: "8px",
          background: accentColor + "18",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: accentColor,
        }}>
          {icon}
        </div>
      </div>
      <div>
        <div style={{ ...T.stat, color: C.textPrimary }}>
          {loading ? <span style={{ fontSize: "20px", color: C.textMuted }}>…</span>
          : serviceDown ? <span style={{ fontSize: "20px", color: C.textMuted }}>—</span>
          : value}
        </div>
        {sub && <div style={{ ...T.small, color: C.textMuted, marginTop: "4px" }}>{sub}</div>}
      </div>
    </div>
  );
}

function ScheduleRow({ item, onSelect }) {
  const badge = item.scheduled_date ? daysLabel(item.scheduled_date) : null;
  const initials = item.childName
    ? item.childName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "—";

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "14px",
      padding: "12px 16px",
      borderRadius: "10px",
      border: `1px solid ${C.border}`,
      background: C.surface,
      transition: "box-shadow 0.15s, border-color 0.15s",
      cursor: "pointer",
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderStrong; e.currentTarget.style.boxShadow = "0 2px 8px rgba(6,61,48,0.08)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
    onClick={() => onSelect && onSelect(item, item.childData)}
    >
      {/* Avatar */}
      <div style={{
        width: "38px", height: "38px", borderRadius: "50%",
        background: `linear-gradient(135deg, ${C.teal}, ${C.forestMid})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "white", ...T.smallMed, flexShrink: 0, overflow: "hidden",
      }}>
        {item.childPhoto
          ? <img src={item.childPhoto} alt={item.childName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : initials
        }
      </div>
      {/* Name + meta */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ ...T.bodyMed, color: C.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {item.childName}
        </div>
        <div style={{ ...T.small, color: C.textMuted, marginTop: "2px" }}>
          Ibu: {item.motherName || "—"}
        </div>
      </div>
      {/* Vaccine pill */}
      <div style={{
        ...T.xs, background: C.blueSoft, color: C.blue,
        padding: "4px 10px", borderRadius: "20px", flexShrink: 0,
        whiteSpace: "nowrap",
      }}>
        {item.vaccine_name}
      </div>
      {/* Day badge */}
      {badge && (
        <div style={{
          ...T.xs, background: badge.bg, color: badge.color,
          padding: "4px 10px", borderRadius: "20px", flexShrink: 0,
          display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap",
        }}>
          <ClockIcon />
          {badge.text}
        </div>
      )}
      {/* Arrow */}
      <div style={{ color: C.textMuted, flexShrink: 0 }}><ChevronRightIcon /></div>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "40px 24px", gap: "12px",
      background: C.surfaceAlt, borderRadius: "12px",
      border: `1.5px dashed ${C.border}`,
    }}>
      <div style={{ color: C.borderStrong }}><EmptyIcon /></div>
      <div style={{ ...T.h2, color: C.textSecondary, textAlign: "center" }}>
        Tidak ada jadwal hari ini
      </div>
      <div style={{ ...T.small, color: C.textMuted, textAlign: "center", maxWidth: "260px" }}>
        Semua jadwal imunisasi untuk hari ini sudah selesai atau belum ada yang dijadwalkan.
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: "6px",
        ...T.xs, color: C.teal, marginTop: "4px",
      }}>
        <CheckCircleIcon />
        Kelola jadwal via menu Kelola Jadwal
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
function DashboardBidan({ user, onLogout, onNavigate, onSelectImmunization, serviceDown }) {
  const [summary, setSummary] = useState({ anak: 0, selesai: 0, mendatang: 0, terlambat: 0 });
  const [todaySchedules, setTodaySchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("Beranda");
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        let vaccineMap = {};
        try {
          const vt = await fetchVaccineTypes();
          (vt || []).forEach((v) => { vaccineMap[String(v.id)] = v.name; });
        } catch (_) {}

        const children = await fetchChildren();
        const allImun = [];
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

        const today = new Date(); today.setHours(0, 0, 0, 0);
        const in30Days = new Date(today); in30Days.setDate(in30Days.getDate() + 30);

        const selesai   = allImun.filter((i) => i.status === "completed").length;
        const mendatang = allImun.filter((i) => {
          if (!i.scheduled_date) return false;
          const d = new Date(i.scheduled_date); d.setHours(0, 0, 0, 0);
          return d >= today && d <= in30Days && i.status !== "completed";
        }).length;
        const terlambat = allImun.filter((i) => {
          if (!i.scheduled_date || i.status === "completed") return false;
          const d = new Date(i.scheduled_date); d.setHours(0, 0, 0, 0);
          return d < today;
        }).length;

        setSummary({ anak: children.length, selesai, mendatang, terlambat });

        const todayList = allImun.filter((i) => {
          if (!i.scheduled_date || i.status === "completed") return false;
          const d = new Date(i.scheduled_date); d.setHours(0, 0, 0, 0);
          return d.getTime() === today.getTime();
        });
        setTodaySchedules(todayList);
        setFetchError(false);
      } catch (err) {
        console.error(err);
        if (
          err.message?.includes("503") ||
          err.message?.includes("Service temporarily unavailable") ||
          err.message?.includes("Failed to fetch")
        ) setFetchError(true);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const navItems = [
    { label: "Beranda",       icon: HomeIcon,     page: "dashboardBidan"    },
    { label: "Kelola Jadwal", icon: CalendarIcon, page: "kelolaJadwalBidan" },
    { label: "Data Anak",     icon: UsersIcon,    page: "dataAnakBidan"     },
    { label: "Profil",        icon: UserIcon,     page: "profilBidan"       },
  ];

  const isServiceDown  = serviceDown || fetchError;
  const displayName    = user?.name || "Bidan";
  const initials       = displayName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() || "BD";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.pageBg, fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", fontSize: "13.5px", color: C.textPrimary }}>

      {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
      <aside style={{
        width: "208px", flexShrink: 0,
        background: C.sidebarBg,
        display: "flex", flexDirection: "column",
        padding: "0",
        position: "sticky", top: 0, height: "100vh",
      }}>
        {/* Logo */}
        <div style={{
          padding: "20px 20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "9px",
              background: C.teal,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white",
            }}>
              <ShieldIcon />
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "white", letterSpacing: "-0.2px" }}>
                Imunisasi
              </div>
              <div style={{ fontSize: "10px", color: C.tealMid, letterSpacing: "0.04em", marginTop: "1px" }}>
                DASHBOARD BIDAN
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: "2px" }}>
          {navItems.map(({ label, icon: Icon, page }) => {
            const isActive = activeNav === label;
            return (
              <button
                key={label}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "9px 12px", borderRadius: "9px",
                  border: "none", cursor: "pointer", width: "100%",
                  fontSize: "13px", fontWeight: isActive ? "600" : "400",
                  background: isActive ? C.teal : "transparent",
                  color: isActive ? "white" : "rgba(255,255,255,0.55)",
                  transition: "all 0.15s",
                  textAlign: "left",
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = C.sidebarHover; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; } }}
                onClick={() => { setActiveNav(label); onNavigate && onNavigate(page); }}
              >
                <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}><Icon /></span>
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "12px 10px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "9px 12px", borderRadius: "9px",
              border: "none", cursor: "pointer", width: "100%",
              fontSize: "13px", fontWeight: "400",
              background: "transparent",
              color: "rgba(255,255,255,0.4)",
              transition: "all 0.15s", textAlign: "left",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(244,63,94,0.12)"; e.currentTarget.style.color = "#FDA4AF"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            onClick={() => onLogout && onLogout()}
          >
            <LogoutIcon />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* ── CONTENT ─────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {isServiceDown && (
          <DegradedBanner
            message="Layanan sedang bermasalah. Data jadwal mungkin tidak ter-update."
            isDark={false}
          />
        )}

        {/* TOPBAR */}
        <header style={{
          height: "56px",
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 28px", flexShrink: 0,
          boxShadow: "0 1px 0 rgba(6,61,48,0.04)",
        }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ ...T.label, color: C.textMuted }}>Dashboard</span>
          </div>
          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Bell */}
            <button style={{
              position: "relative", background: "none", border: "none",
              cursor: "pointer", padding: "6px", borderRadius: "8px",
              color: C.textSecondary, display: "flex", alignItems: "center",
            }}>
              <BellIcon />
              <span style={{
                position: "absolute", top: "4px", right: "4px",
                width: "7px", height: "7px", borderRadius: "50%",
                background: C.rose, border: "1.5px solid white",
              }} />
            </button>
            {/* User chip */}
            <div style={{
              display: "flex", alignItems: "center", gap: "9px",
              padding: "5px 12px 5px 5px",
              background: C.tealSoft, borderRadius: "40px",
              border: `1px solid ${C.border}`,
            }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.teal}, ${C.forestMid})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontSize: "11px", fontWeight: "700",
              }}>
                {initials}
              </div>
              <span style={{ fontSize: "13px", fontWeight: "600", color: C.textPrimary }}>
                {displayName}
              </span>
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main style={{
          flex: 1, padding: "28px",
          display: "flex", flexDirection: "column", gap: "20px",
          overflowY: "auto",
          maxWidth: "1100px", width: "100%",
        }}>

          {/* HERO ──────────────────────────────────────────────────────── */}
          <div style={{
            background: `linear-gradient(135deg, ${C.forest} 0%, ${C.forestMid} 100%)`,
            borderRadius: "18px",
            padding: "28px 32px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "24px",
            boxShadow: "0 4px 24px rgba(6,61,48,0.18)",
            overflow: "hidden",
            position: "relative",
          }}>
            {/* Decorative ring */}
            <div style={{
              position: "absolute", right: "-40px", top: "-40px",
              width: "220px", height: "220px", borderRadius: "50%",
              border: "1px solid rgba(110,231,183,0.12)",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", right: "20px", bottom: "-60px",
              width: "160px", height: "160px", borderRadius: "50%",
              border: "1px solid rgba(110,231,183,0.08)",
              pointerEvents: "none",
            }} />

            <div style={{ position: "relative" }}>
              <div style={{ ...T.label, color: C.tealMid, marginBottom: "8px" }}>
                {todayIndonesia()}
              </div>
              <h1 style={{ ...T.hero, color: "white", margin: "0 0 8px" }}>
                Selamat datang, {displayName} 👋
              </h1>
              <p style={{ ...T.small, color: C.tealMid, margin: 0 }}>
                {isServiceDown
                  ? "Koneksi ke server bermasalah. Menampilkan data terakhir yang tersedia."
                  : loading
                  ? "Memuat data jadwal…"
                  : todaySchedules.length > 0
                  ? `${todaySchedules.length} jadwal imunisasi menunggu penanganan hari ini.`
                  : "Tidak ada jadwal imunisasi hari ini. Hari yang tenang!"
                }
              </p>
            </div>

            {/* Right: syringe icon dekorasi */}
            <div style={{
              flexShrink: 0, width: "72px", height: "72px",
              borderRadius: "20px",
              background: "rgba(16,185,129,0.15)",
              border: "1px solid rgba(110,231,183,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: C.tealMid,
              position: "relative",
            }}>
              <SyringeIcon />
            </div>
          </div>

          {/* STATS ─────────────────────────────────────────────────────── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "14px",
          }}>
            <StatCard
              label="Jadwal hari ini"
              value={loading ? "…" : todaySchedules.length}
              loading={false}
              serviceDown={isServiceDown}
              accentColor={C.teal}
              icon={<CalendarIcon />}
              sub={loading ? "" : `${todaySchedules.length} perlu ditangani`}
            />
            <StatCard
              label="Total anak terdaftar"
              value={summary.anak}
              loading={loading}
              serviceDown={isServiceDown}
              accentColor={C.blue}
              icon={<UsersIcon />}
              sub="dalam sistem"
            />
            <StatCard
              label="Jadwal terlambat"
              value={summary.terlambat}
              loading={loading}
              serviceDown={isServiceDown}
              accentColor={summary.terlambat > 0 ? C.rose : C.teal}
              icon={<AlertIcon />}
              sub={summary.terlambat > 0 ? "segera ditindaklanjuti" : "semua tepat waktu"}
            />
          </div>

          {/* OVERDUE ALERT ──────────────────────────────────────────────── */}
          {!loading && !isServiceDown && summary.terlambat > 0 && (
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "14px 18px", borderRadius: "12px",
              background: C.roseSoft, border: `1px solid ${C.roseLight}`,
            }}>
              <div style={{ color: C.rose, display: "flex", flexShrink: 0 }}><AlertIcon /></div>
              <div style={{ flex: 1 }}>
                <span style={{ ...T.bodyMed, color: "#9F1239" }}>
                  {summary.terlambat} jadwal imunisasi melewati batas waktu.
                </span>
                <span style={{ ...T.small, color: "#BE123C", marginLeft: "6px" }}>
                  Segera hubungi orang tua untuk penjadwalan ulang.
                </span>
              </div>
            </div>
          )}

          {/* SCHEDULE LIST ──────────────────────────────────────────────── */}
          <div style={{
            background: C.surface,
            borderRadius: "16px",
            border: `1px solid ${C.border}`,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(6,61,48,0.05)",
          }}>
            {/* Section header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 22px 14px",
              borderBottom: `1px solid ${C.border}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "7px",
                  background: C.tealLight, color: C.teal,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <CalendarIcon />
                </div>
                <span style={{ ...T.h2, color: C.textPrimary }}>
                  Jadwal imunisasi hari ini
                </span>
              </div>
              <div style={{
                ...T.xs,
                background: loading || isServiceDown ? C.border : todaySchedules.length > 0 ? C.tealLight : C.border,
                color: loading || isServiceDown ? C.textMuted : todaySchedules.length > 0 ? C.teal : C.textMuted,
                padding: "4px 12px", borderRadius: "20px",
              }}>
                {loading ? "Memuat…" : isServiceDown ? "—" : `${todaySchedules.length} anak`}
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {loading ? (
                /* Skeleton rows */
                [1, 2, 3].map(i => (
                  <div key={i} style={{
                    height: "64px", borderRadius: "10px",
                    background: C.border, opacity: 0.5,
                    animation: "pulse 1.5s ease-in-out infinite",
                  }} />
                ))
              ) : isServiceDown ? (
                <div style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "16px 18px", borderRadius: "12px",
                  background: C.amberSoft, border: `1px solid ${C.amberLight}`,
                }}>
                  <div style={{ color: C.amber }}><AlertIcon /></div>
                  <p style={{ ...T.small, color: "#92400E", margin: 0 }}>
                    Tidak dapat memuat jadwal. Periksa koneksi server.
                  </p>
                </div>
              ) : todaySchedules.length === 0 ? (
                <EmptyState />
              ) : (
                todaySchedules.map((item) => (
                  <ScheduleRow
                    key={item.id}
                    item={item}
                    onSelect={onSelectImmunization}
                  />
                ))
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default DashboardBidan;