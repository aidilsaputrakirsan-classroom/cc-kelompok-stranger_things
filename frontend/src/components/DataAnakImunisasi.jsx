import { useState, useEffect } from "react";
import { fetchChildren, fetchImmunizations, fetchVaccineTypes } from "../services/api";

/* ── Responsive Hook ── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

/* ─── Design tokens (sama dengan KelolaJadwalBidan) ─── */
const C = {
  forest:        "#063D30",
  forestMid:     "#085041",
  teal:          "#10B981",
  tealLight:     "#D1FAE5",
  tealMid:       "#6EE7B7",
  tealSoft:      "#ECFDF5",
  pageBg:        "#F0FAF6",
  surface:       "#FFFFFF",
  surfaceAlt:    "#F8FFFE",
  border:        "#E2F0EB",
  borderStrong:  "#C4DDD5",
  textPrimary:   "#0C1F1A",
  textSecondary: "#3D6657",
  textMuted:     "#7BA898",
  amber:         "#F59E0B",
  amberLight:    "#FEF3C7",
  rose:          "#F43F5E",
  roseLight:     "#FFE4E6",
  blue:          "#3B82F6",
  blueLight:     "#DBEAFE",
  blueSoft:      "#EFF6FF",
  sidebarBg:     "#052E24",
  sidebarHover:  "#0A4034",
};

const T = {
  hero:     { fontSize: "22px",   fontWeight: "700", lineHeight: "1.25", letterSpacing: "-0.3px" },
  h2:       { fontSize: "15px",   fontWeight: "700", letterSpacing: "-0.1px" },
  label:    { fontSize: "10.5px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase" },
  body:     { fontSize: "13.5px", fontWeight: "400", lineHeight: "1.6" },
  bodyMed:  { fontSize: "13.5px", fontWeight: "600" },
  small:    { fontSize: "12px",   fontWeight: "400", lineHeight: "1.5" },
  smallMed: { fontSize: "12px",   fontWeight: "600" },
  xs:       { fontSize: "11px",   fontWeight: "500" },
};

/* ── Icons ── */
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
const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const ChevronLeftIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

/* ── Constants ── */
const PAGE_SIZE = 5;

const SAMPLE_CHILDREN = [
  {
    id: 1,
    name: "Ahmad Daffa",
    birth_date: "2023-05-15",
    mother_name: "Siti Aminah",
    address: "Jl. Mawar No. 12, Bandung",
    photo: null,
    immunizations: [
      { id: 1, vaccine_name: "DPT",         scheduled_date: "2023-04-16", status: "completed" },
      { id: 2, vaccine_name: "BCG",         scheduled_date: "2023-04-16", status: "completed" },
      { id: 3, vaccine_name: "Hepatitis B", scheduled_date: "2023-04-16", status: "scheduled" },
    ],
  },
  {
    id: 2,
    name: "Andini Permata D.",
    birth_date: "2023-08-20",
    mother_name: "Dewi Sartika",
    address: "Jl. Melati No. 5, Bandung",
    photo: null,
    immunizations: [
      { id: 4, vaccine_name: "Polio", scheduled_date: "2023-04-16", status: "completed" },
      { id: 5, vaccine_name: "BCG",   scheduled_date: "2023-04-16", status: "completed" },
    ],
  },
];

const statusConfig = {
  completed: { label: "Selesai",   color: C.forestMid, bg: C.tealLight  },
  scheduled: { label: "Terjadwal", color: "#854F0B",   bg: C.amberLight },
  pending:   { label: "Tertunda",  color: C.textMuted, bg: C.border     },
};

/* ── Main Component ── */
function DataAnakImunisasi({ user, onLogout, onNavigate }) {
  const isMobile = useIsMobile();
  const [activeNav, setActiveNav]     = useState("Data Anak");
  const [search, setSearch]           = useState("");
  const [children, setChildren]       = useState(SAMPLE_CHILDREN);
  const [loading, setLoading]         = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const displayName = user?.name || "Bidan";
  const initials = displayName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() || "BD";

  const navItems = [
    { label: "Beranda",       icon: HomeIcon,     page: "dashboardBidan"    },
    { label: "Kelola Jadwal", icon: CalendarIcon, page: "kelolaJadwalBidan" },
    { label: "Data Anak",     icon: UsersIcon,    page: "dataAnakBidan"     },
    { label: "Profil",        icon: UserIcon,     page: "profilBidan"       },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        let vaccineMap = {};
        try {
          const vt = await fetchVaccineTypes();
          (vt || []).forEach((v) => { vaccineMap[String(v.id)] = v.name; });
        } catch (_) {}

        const fetchedChildren = await fetchChildren();
        if (!fetchedChildren || fetchedChildren.length === 0) { setChildren([]); return; }

        const result = [];
        for (const child of fetchedChildren) {
          let imuns = [];
          try {
            const raw = await fetchImmunizations(child.id);
            imuns = (raw || []).map((i) => ({
              ...i,
              vaccine_name: vaccineMap[String(i.vaccine_id)] || i.vaccine_name || `Vaksin ${i.vaccine_id}`,
            }));
          } catch (_) {}
          result.push({ ...child, immunizations: imuns });
        }
        setChildren(result);
      } catch (_) {
        setChildren([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filtered = children.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) ||
      (c.mother_name || c.motherName || "").toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" });
  };
  const formatDateShort = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  const handleNav = (label, page) => {
    setActiveNav(label);
    onNavigate && onNavigate(page);
  };

  /* ── Child card ── */
  const renderCard = (child) => {
    const motherName = child.mother_name || child.motherName || "—";
    const address    = child.address || child.alamat || "—";
    const imuns      = child.immunizations || [];
    const completed  = imuns.filter(i => i.status === "completed").length;

    return (
      <div key={child.id} style={{
        background: C.surface,
        borderRadius: "14px",
        border: `1px solid ${C.border}`,
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(6,61,48,0.05)",
      }}>
        {/* Card head */}
        <div style={{
          display: "flex", alignItems: "center",
          padding: "14px 18px",
          borderBottom: `1px solid ${C.border}`,
          background: C.surfaceAlt,
          gap: "12px",
        }}>
          {/* Avatar */}
          <div style={{
            width: "38px", height: "38px", borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.teal}, ${C.forestMid})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontSize: "13px", fontWeight: "700", flexShrink: 0,
          }}>
            {child.photo
              ? <img src={child.photo} alt={child.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
              : child.name?.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
            }
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ ...T.bodyMed, color: C.textPrimary, marginBottom: "2px" }}>{child.name}</div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <span style={{ ...T.xs, color: C.textMuted }}>
                Lahir: <span style={{ color: C.textSecondary }}>{formatDate(child.birth_date || child.birthDate)}</span>
              </span>
              <span style={{ ...T.xs, color: C.textMuted }}>
                Ibu: <span style={{ color: C.textSecondary }}>{motherName}</span>
              </span>
              {!isMobile && (
                <span style={{ ...T.xs, color: C.textMuted }}>
                  Alamat: <span style={{ color: C.textSecondary }}>{address}</span>
                </span>
              )}
            </div>
          </div>

          {/* Badge */}
          <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
            <span style={{ ...T.xs, background: C.tealLight, color: C.teal, padding: "3px 10px", borderRadius: "20px" }}>
              {imuns.length} imunisasi
            </span>
            {imuns.length > 0 && (
              <span style={{ ...T.xs, color: C.textMuted }}>
                {completed}/{imuns.length} selesai
              </span>
            )}
          </div>
        </div>

        {/* Card body — immunization list */}
        <div style={{ padding: "14px 18px" }}>
          {/* Section label */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <div style={{
              width: "22px", height: "22px", borderRadius: "6px",
              background: C.tealLight, color: C.teal,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ShieldIcon />
            </div>
            <span style={{ ...T.smallMed, color: C.textPrimary }}>Riwayat imunisasi</span>
          </div>

          {imuns.length === 0 ? (
            <p style={{ ...T.small, color: C.textMuted, margin: 0 }}>Belum ada riwayat imunisasi.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {imuns.map((imun, idx) => {
                const badge = statusConfig[imun.status] || statusConfig.pending;
                return (
                  <div key={imun.id || idx} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "7px 10px",
                    background: C.surfaceAlt,
                    borderRadius: "8px",
                    border: `1px solid ${C.border}`,
                  }}>
                    <span style={{ ...T.smallMed, color: C.textPrimary, flex: 1 }}>
                      {imun.vaccine_name || "—"}
                    </span>
                    <span style={{ ...T.xs, color: C.textMuted, flexShrink: 0 }}>
                      {isMobile ? formatDateShort(imun.scheduled_date) : formatDate(imun.scheduled_date)}
                    </span>
                    <span style={{
                      ...T.xs, padding: "3px 10px", borderRadius: "20px", flexShrink: 0,
                      background: badge.bg, color: badge.color,
                    }}>
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ── Shared: Empty state ── */
  const EmptyState = () => (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "40px 24px", gap: "12px",
      background: C.surfaceAlt, borderRadius: "14px",
      border: `1.5px dashed ${C.border}`,
    }}>
      <div style={{ color: C.borderStrong }}><UsersIcon /></div>
      <div style={{ ...T.h2, color: C.textSecondary }}>Tidak ada data anak</div>
      <div style={{ ...T.small, color: C.textMuted, textAlign: "center" }}>
        {search ? "Tidak ada anak yang sesuai pencarian." : "Belum ada data anak tersedia."}
      </div>
    </div>
  );

  /* ── Shared: Pagination ── */
  const Pagination = ({ mobile }) => {
    if (loading || filtered.length <= PAGE_SIZE) return null;
    return mobile ? (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", padding: "8px 0" }}>
        <button
          style={{ width: "34px", height: "34px", borderRadius: "9px", border: `1px solid ${C.border}`, background: C.surface, color: C.teal, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: currentPage === 1 ? 0.4 : 1 }}
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        ><ChevronLeftIcon /></button>
        <span style={{ ...T.xs, color: C.textMuted }}>{currentPage} / {totalPages}</span>
        <button
          style={{ width: "34px", height: "34px", borderRadius: "9px", border: `1px solid ${C.border}`, background: C.surface, color: C.teal, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: currentPage === totalPages ? 0.4 : 1 }}
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        ><ChevronRightIcon /></button>
      </div>
    ) : (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
        <span style={{ ...T.xs, color: C.textMuted }}>
          {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} dari {filtered.length} anak
        </span>
        <div style={{ display: "flex", gap: "4px" }}>
          <button
            style={{ width: "30px", height: "30px", borderRadius: "8px", border: `1px solid ${C.border}`, background: C.surface, color: C.teal, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: currentPage === 1 ? 0.4 : 1 }}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          ><ChevronLeftIcon /></button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button key={page}
              style={{ width: "30px", height: "30px", borderRadius: "8px", border: `1px solid ${page === currentPage ? C.forest : C.border}`, background: page === currentPage ? C.forest : C.surface, color: page === currentPage ? C.tealMid : C.textSecondary, ...T.xs, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              onClick={() => setCurrentPage(page)}
            >{page}</button>
          ))}
          <button
            style={{ width: "30px", height: "30px", borderRadius: "8px", border: `1px solid ${C.border}`, background: C.surface, color: C.teal, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: currentPage === totalPages ? 0.4 : 1 }}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          ><ChevronRightIcon /></button>
        </div>
      </div>
    );
  };

  /* ── Sidebar (identical to KelolaJadwalBidan) ── */
  const Sidebar = () => (
    <aside style={{ width: "208px", flexShrink: 0, background: C.sidebarBg, display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh" }}>
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
            <ShieldIcon />
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "white", letterSpacing: "-0.2px" }}>Imunisasi</div>
            <div style={{ fontSize: "10px", color: C.tealMid, letterSpacing: "0.04em", marginTop: "1px" }}>DASHBOARD BIDAN</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: "2px" }}>
        {navItems.map(({ label, icon: Icon, page }) => {
          const isActive = activeNav === label;
          return (
            <button key={label}
              style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderRadius: "9px", border: "none", cursor: "pointer", width: "100%", fontSize: "13px", fontWeight: isActive ? "600" : "400", background: isActive ? C.teal : "transparent", color: isActive ? "white" : "rgba(255,255,255,0.55)", transition: "all 0.15s", textAlign: "left" }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = C.sidebarHover; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; } }}
              onClick={() => handleNav(label, page)}
            >
              <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}><Icon /></span>
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
      <div style={{ padding: "12px 10px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button
          style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderRadius: "9px", border: "none", cursor: "pointer", width: "100%", fontSize: "13px", fontWeight: "400", background: "transparent", color: "rgba(255,255,255,0.4)", transition: "all 0.15s", textAlign: "left" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(244,63,94,0.12)"; e.currentTarget.style.color = "#FDA4AF"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
          onClick={() => onLogout && onLogout()}
        >
          <LogoutIcon /><span>Keluar</span>
        </button>
      </div>
    </aside>
  );

  /* ── Topbar (shared) ── */
  const Topbar = ({ mobile }) => (
    <header style={{
      height: "56px", background: C.surface, borderBottom: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: mobile ? "0 16px" : "0 28px",
      flexShrink: 0, position: mobile ? "sticky" : "relative", top: 0, zIndex: 100,
      boxShadow: "0 1px 0 rgba(6,61,48,0.04)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {mobile && (
          <button
            style={{ background: C.tealLight, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "8px", color: C.teal }}
            onClick={() => onNavigate && onNavigate("dashboardBidan")}
          ><ArrowLeft /></button>
        )}
        <span style={mobile ? { ...T.bodyMed, color: C.textPrimary } : { ...T.label, color: C.textMuted }}>
          Data Anak
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: mobile ? "12px" : "16px" }}>
        <button style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: "6px", borderRadius: "8px", color: C.textSecondary, display: "flex", alignItems: "center" }}>
          <BellIcon />
          <span style={{ position: "absolute", top: "4px", right: "4px", width: "7px", height: "7px", borderRadius: "50%", background: C.rose, border: "1.5px solid white" }} />
        </button>
        {mobile ? (
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: `linear-gradient(135deg, ${C.teal}, ${C.forestMid})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: "700" }}>
            {initials}
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "5px 12px 5px 5px", background: C.tealSoft, borderRadius: "40px", border: `1px solid ${C.border}` }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: `linear-gradient(135deg, ${C.teal}, ${C.forestMid})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: "700" }}>
              {initials}
            </div>
            <span style={{ fontSize: "13px", fontWeight: "600", color: C.textPrimary }}>{displayName}</span>
          </div>
        )}
      </div>
    </header>
  );

  /* ── MOBILE LAYOUT ── */
  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.pageBg, fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", fontSize: "13.5px", color: C.textPrimary }}>
        <Topbar mobile />

        {/* Search bar */}
        <div style={{ padding: "10px 16px", background: C.surface, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: C.textMuted, display: "flex", pointerEvents: "none" }}><SearchIcon /></span>
            <input
              type="text" value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Cari nama anak atau ibu…"
              style={{ width: "100%", padding: "9px 12px 9px 32px", borderRadius: "9px", border: `1px solid ${C.border}`, background: C.surfaceAlt, fontSize: "13px", color: C.textPrimary, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
            />
          </div>
        </div>

        {/* Result count */}
        <div style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: "8px", background: C.surface, borderBottom: `1px solid ${C.border}` }}>
          <FilterIcon color={C.textMuted} />
          <span style={{ ...T.xs, color: C.textMuted }}>{filtered.length} anak ditemukan</span>
        </div>

        {/* List */}
        <main style={{ flex: 1, padding: "16px", display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "88px" }}>
          {loading
            ? <p style={{ ...T.small, color: C.textMuted }}>Memuat data…</p>
            : paginated.length === 0
              ? <EmptyState />
              : paginated.map(renderCard)
          }
          <Pagination mobile />
        </main>

        {/* Bottom nav */}
        <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.surface, borderTop: `1px solid ${C.border}`, display: "flex", zIndex: 100 }}>
          {navItems.map(({ label, icon: Icon, page }) => {
            const isActive = activeNav === label;
            return (
              <button key={label}
                style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 4px", border: "none", background: isActive ? C.tealSoft : "transparent", cursor: "pointer", gap: "2px" }}
                onClick={() => handleNav(label, page)}
              >
                <span style={{ color: isActive ? C.teal : C.textMuted }}><Icon /></span>
                <span style={{ fontSize: "10px", color: isActive ? C.teal : C.textMuted }}>{label}</span>
              </button>
            );
          })}
          <button style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 4px", border: "none", background: "transparent", cursor: "pointer", gap: "2px" }} onClick={() => onLogout && onLogout()}>
            <span style={{ color: C.rose }}><LogoutIcon /></span>
            <span style={{ fontSize: "10px", color: C.rose }}>Keluar</span>
          </button>
        </nav>
      </div>
    );
  }

  /* ── DESKTOP LAYOUT ── */
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.pageBg, fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", fontSize: "13.5px", color: C.textPrimary }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar />

        <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: "20px", overflowY: "auto", maxWidth: "1100px", width: "100%" }}>

          {/* Page heading */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              style={{ background: C.tealLight, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", color: C.teal, flexShrink: 0 }}
              onClick={() => onNavigate && onNavigate("dashboardBidan")}
            ><ArrowLeft /></button>
            <div>
              <h1 style={{ ...T.hero, color: C.textPrimary, margin: "0 0 2px" }}>Data Anak</h1>
              <p style={{ ...T.small, color: C.textMuted, margin: 0 }}>Kelola data anak dan riwayat imunisasinya</p>
            </div>
          </div>

          {/* Two-col layout (sama dengan KelolaJadwalBidan) */}
          <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>

            {/* Filter / info panel */}
            <div style={{ background: C.surface, borderRadius: "14px", border: `1px solid ${C.border}`, padding: "18px 20px", width: "220px", flexShrink: 0, boxShadow: "0 1px 4px rgba(6,61,48,0.05)", display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "26px", height: "26px", borderRadius: "7px", background: C.tealLight, color: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <SearchIcon />
                </div>
                <span style={{ ...T.bodyMed, color: C.textPrimary }}>Cari anak</span>
              </div>

              {/* Search */}
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: C.textMuted, display: "flex", pointerEvents: "none" }}><SearchIcon /></span>
                <input
                  type="text" value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  placeholder="Nama anak / ibu…"
                  style={{ width: "100%", padding: "8px 10px 8px 30px", borderRadius: "8px", border: `1px solid ${C.border}`, background: C.surfaceAlt, fontSize: "12.5px", color: C.textPrimary, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                />
              </div>

              {search && (
                <button
                  style={{ width: "100%", background: "none", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "7px", ...T.xs, color: C.textMuted, cursor: "pointer" }}
                  onClick={() => { setSearch(""); setCurrentPage(1); }}
                >Reset pencarian</button>
              )}

              {/* Stat */}
              <div style={{ background: C.tealLight, borderRadius: "10px", padding: "12px 14px" }}>
                <div style={{ ...T.label, color: C.textSecondary, marginBottom: "4px" }}>Total anak</div>
                <div style={{ fontSize: "26px", fontWeight: "700", color: C.forest, lineHeight: 1 }}>{children.length}</div>
              </div>

              <div style={{ background: C.surfaceAlt, borderRadius: "10px", padding: "12px 14px", border: `1px solid ${C.border}` }}>
                <div style={{ ...T.label, color: C.textMuted, marginBottom: "4px" }}>Hasil pencarian</div>
                <div style={{ fontSize: "20px", fontWeight: "700", color: C.textPrimary, lineHeight: 1 }}>{filtered.length}</div>
              </div>
            </div>

            {/* List panel */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Section header (sama dengan KelolaJadwalBidan) */}
              <div style={{ background: C.surface, borderRadius: "14px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", boxShadow: "0 1px 4px rgba(6,61,48,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: C.tealLight, color: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <UsersIcon />
                  </div>
                  <span style={{ ...T.h2, color: C.textPrimary }}>Daftar anak</span>
                </div>
                <div style={{ ...T.xs, background: C.tealLight, color: C.teal, padding: "4px 12px", borderRadius: "20px" }}>
                  {filtered.length} anak
                </div>
              </div>

              {loading
                ? <p style={{ ...T.small, color: C.textMuted }}>Memuat data…</p>
                : paginated.length === 0
                  ? <EmptyState />
                  : paginated.map(renderCard)
              }

              <Pagination />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DataAnakImunisasi;