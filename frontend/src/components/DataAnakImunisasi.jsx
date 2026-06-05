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

/* ── Constants (sama persis dengan KelolaJadwalBidan) ── */
const TEAL_DARK  = "#085041";
const TEAL_MID   = "#1D9E75";
const TEAL_LIGHT = "#E1F5EE";
const TEAL_TEXT  = "#0F6E56";

/* ── Icons (sama dengan KelolaJadwalBidan) ── */
function HomeIcon()     { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>; }
function CalendarIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>; }
function PersonIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>; }
function ProfileIcon()  { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>; }
function BellIcon()     { return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>; }
function LogoutIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>; }
function ShieldIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/></svg>; }
function ChevronDown()  { return <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>; }
function SearchIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>; }
function ChevronLeftIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>; }
function ChevronRightIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>; }
function ArrowLeft()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>; }

/* ── Constants ── */
const PAGE_SIZE = 5;

/* ── Sample fallback data ── */
const SAMPLE_CHILDREN = [
  {
    id: 1,
    name: "Ahmad Daffa",
    birth_date: "2023-05-15",
    mother_name: "Siti Aminah",
    address: "Jl. Mawar No. 12, Bandung",
    photo: null,
    immunizations: [
      { id: 1, vaccine_name: "DPT",        scheduled_date: "2023-04-16", status: "completed" },
      { id: 2, vaccine_name: "BCG",        scheduled_date: "2023-04-16", status: "completed" },
      { id: 3, vaccine_name: "Hepatitis B",scheduled_date: "2023-04-16", status: "scheduled" },
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

/* ── Main Component ── */
function DataAnakImunisasi({ user, onLogout, onNavigate }) {
  const isMobile = useIsMobile();
  const [activeNav, setActiveNav] = useState("Data Anak");
  const [search, setSearch]       = useState("");
  const [children, setChildren]   = useState(SAMPLE_CHILDREN);
  const [loading, setLoading]     = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navItems = [
    { label: "Beranda",       icon: HomeIcon,     page: "dashboardBidan"    },
    { label: "Kelola Jadwal", icon: CalendarIcon, page: "kelolaJadwalBidan" },
    { label: "Data Anak",     icon: PersonIcon,   page: "dataAnakBidan"     },
    { label: "Profil",        icon: ProfileIcon,  page: "profilBidan"       },
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
        if (!fetchedChildren || fetchedChildren.length === 0) {
          setChildren([]);
          return;
        }

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

  const statusConfig = {
    completed: { label: "Selesai",    color: TEAL_TEXT,  bg: TEAL_LIGHT, icon: "✓" },
    scheduled: { label: "Terjadwal",  color: "#854F0B",  bg: "#FAEEDA",  icon: "●" },
    pending:   { label: "Tertunda",   color: "#5F5E5A",  bg: "#F1EFE8",  icon: "!" },
  };

  const handleNav = (label, page) => {
    setActiveNav(label);
    onNavigate && onNavigate(page);
  };

  /* ── Render child card (shared mobile + desktop) ── */
  const renderCard = (child) => {
    const motherName = child.mother_name || child.motherName || "—";
    const address    = child.address || child.alamat || "—";
    const imuns      = child.immunizations || [];

    return (
      <div key={child.id} style={isMobile ? m.childCard : s.childCard}>
        {/* Header */}
        <div style={isMobile ? m.cardHead : s.cardHead}>
          <div style={s.childPhotoWrap}>
            {child.photo
              ? <img src={child.photo} alt={child.name} style={s.childImg} />
              : <div style={s.childImgPlaceholder}><PersonIcon /></div>
            }
          </div>
          <div style={s.childInfo}>
            <div style={isMobile ? m.childName : s.childName}>{child.name}</div>
            <div style={s.metaRow}>
              <span style={s.metaLabel}>Lahir</span>
              <span style={s.metaValue}>{formatDate(child.birth_date || child.birthDate)}</span>
            </div>
            <div style={s.metaRow}>
              <span style={s.metaLabel}>Ibu</span>
              <span style={s.metaValue}>{motherName}</span>
            </div>
            {!isMobile && (
              <div style={s.metaRow}>
                <span style={s.metaLabel}>Alamat</span>
                <span style={s.metaValue}>{address}</span>
              </div>
            )}
          </div>
          <span style={s.imunCountBadge}>
            {imuns.length} imunisasi
          </span>
        </div>

        {/* Immunization table */}
        <div style={s.cardBody}>
          <div style={s.imunHeader}>
            <div style={s.imunHeaderIcon}><ShieldIcon /></div>
            <span style={s.imunTitle}>Riwayat imunisasi</span>
          </div>

          {imuns.length === 0 ? (
            <p style={{ color: "#aaa", fontSize: "12.5px", margin: "0.5rem 0 0" }}>
              Belum ada riwayat imunisasi.
            </p>
          ) : (
            <div style={s.imunList}>
              {imuns.map((imun, idx) => {
                const badge = statusConfig[imun.status] || statusConfig.pending;
                return (
                  <div key={imun.id || idx} style={s.imunRow}>
                    <span style={s.imunName}>{imun.vaccine_name || "—"}</span>
                    <span style={s.imunDate}>{isMobile ? formatDateShort(imun.scheduled_date) : formatDate(imun.scheduled_date)}</span>
                    <span style={{ ...s.statusBadge, color: badge.color, background: badge.bg }}>
                      {badge.icon} {badge.label}
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

  /* ── MOBILE LAYOUT ── */
  if (isMobile) {
    return (
      <div style={m.root}>
        {/* Topbar */}
        <header style={m.topbar}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button style={m.backBtn} onClick={() => onNavigate && onNavigate("dashboardBidan")}>
              <ArrowLeft />
            </button>
            <span style={m.pageTitle}>Data anak</span>
          </div>
          <div style={m.topbarRight}>
            <div style={{ position: "relative", color: "#555", display: "flex" }}>
              <BellIcon />
              <span style={m.bellBadge}>3</span>
            </div>
            <div style={m.topbarAvatar}>BD</div>
          </div>
        </header>

        {/* Search bar */}
        <div style={m.searchBar}>
          <span style={m.searchIcon}><SearchIcon /></span>
          <input
            type="text"
            style={m.searchInput}
            placeholder="Cari nama anak atau ibu..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>

        {/* Result count */}
        <div style={m.actionBar}>
          <span style={m.resultCount}>{filtered.length} anak ditemukan</span>
        </div>

        {/* List */}
        <main style={m.main}>
          {loading ? (
            <p style={{ color: "#aaa", fontSize: "13px" }}>Memuat data...</p>
          ) : paginated.length === 0 ? (
            <div style={m.emptyState}>
              <PersonIcon />
              <p style={{ color: "#bbb", fontSize: "13px", marginTop: "8px" }}>Tidak ada data anak ditemukan.</p>
            </div>
          ) : (
            paginated.map(renderCard)
          )}

          {/* Pagination */}
          {!loading && filtered.length > PAGE_SIZE && (
            <div style={m.pagination}>
              <button
                style={{ ...m.pageBtn, opacity: currentPage === 1 ? 0.4 : 1 }}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon />
              </button>
              <span style={m.pageInfo}>{currentPage} / {totalPages}</span>
              <button
                style={{ ...m.pageBtn, opacity: currentPage === totalPages ? 0.4 : 1 }}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon />
              </button>
            </div>
          )}
        </main>

        {/* Bottom Nav */}
        <nav style={m.bottomNav}>
          {navItems.map(({ label, icon: Icon, page }) => (
            <button key={label}
              style={{ ...m.bottomNavBtn, ...(activeNav === label ? m.bottomNavBtnActive : {}) }}
              onClick={() => handleNav(label, page)}
            >
              <span style={{ color: activeNav === label ? TEAL_TEXT : "#aaa" }}><Icon /></span>
              <span style={{ fontSize: "10px", color: activeNav === label ? TEAL_TEXT : "#aaa", marginTop: "2px" }}>{label}</span>
            </button>
          ))}
          <button style={m.bottomNavBtn} onClick={() => onLogout && onLogout()}>
            <span style={{ color: "#A32D2D" }}><LogoutIcon /></span>
            <span style={{ fontSize: "10px", color: "#A32D2D", marginTop: "2px" }}>Keluar</span>
          </button>
        </nav>
      </div>
    );
  }

  /* ── DESKTOP LAYOUT ── */
  return (
    <div style={s.root}>
      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={s.logoArea}>
          <div style={s.logoIcon}><ShieldIcon /></div>
          <span style={s.logoText}>Imunisasi</span>
        </div>
        <nav style={s.nav}>
          {navItems.map(({ label, icon: Icon, page }) => (
            <button key={label}
              style={{ ...s.navBtn, ...(activeNav === label ? s.navBtnActive : {}) }}
              onClick={() => handleNav(label, page)}
            >
              <span style={{ ...s.navIcon, ...(activeNav === label ? s.navIconActive : {}) }}><Icon /></span>
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

      {/* Content */}
      <div style={s.content}>
        {/* Topbar */}
        <header style={s.topbar}>
          <div />
          <div style={s.topbarRight}>
            <div style={s.bellWrap}><BellIcon /><span style={s.bellBadge}>3</span></div>
            <div style={s.topbarUser}>
              <div style={s.topbarAvatar}>BD</div>
              <span style={s.topbarName}>{user?.name || "Bidan"}</span>
              <ChevronDown />
            </div>
          </div>
        </header>

        {/* Main */}
        <main style={s.main}>
          {/* Page heading */}
          <div style={s.pageHeading}>
            <div>
              <h1 style={s.pageTitle}>Data anak</h1>
              <p style={s.pageSubtitle}>Kelola data anak dan riwayat imunisasinya</p>
            </div>
          </div>

          <div style={s.twoCol}>
            {/* Search & info panel */}
            <div style={s.filterCard}>
              <p style={s.filterTitle}>Cari anak</p>
              <div style={s.searchWrap}>
                <span style={s.searchIcon}><SearchIcon /></span>
                <input
                  type="text"
                  style={s.searchInput}
                  placeholder="Nama anak / ibu..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                />
              </div>
              {search && (
                <button style={s.resetBtn} onClick={() => { setSearch(""); setCurrentPage(1); }}>
                  Reset pencarian
                </button>
              )}
              <div style={s.statBox}>
                <span style={s.statLabel}>Total anak</span>
                <span style={s.statValue}>{children.length}</span>
              </div>
            </div>

            {/* List panel */}
            <div style={s.listPanel}>
              <p style={s.listTitle}>
                Daftar anak <span style={s.listCount}>{filtered.length}</span>
              </p>

              {loading ? (
                <p style={{ color: "#aaa", fontSize: "13px" }}>Memuat data...</p>
              ) : paginated.length === 0 ? (
                <div style={s.emptyState}>
                  <PersonIcon />
                  <p style={{ color: "#bbb", fontSize: "13px", marginTop: "8px" }}>Tidak ada data anak ditemukan.</p>
                </div>
              ) : (
                paginated.map(renderCard)
              )}

              {/* Pagination */}
              {!loading && filtered.length > PAGE_SIZE && (
                <div style={s.paginationBar}>
                  <span style={s.paginationInfo}>
                    {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} dari {filtered.length} anak
                  </span>
                  <div style={s.paginationBtns}>
                    <button
                      style={{ ...s.pageBtn, opacity: currentPage === 1 ? 0.4 : 1 }}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeftIcon />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button key={page}
                        style={{ ...s.pageBtn, ...(currentPage === page ? s.pageBtnActive : {}) }}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      style={{ ...s.pageBtn, opacity: currentPage === totalPages ? 0.4 : 1 }}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRightIcon />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ── Desktop Styles (ikut KelolaJadwalBidan) ── */
const s = {
  root:              { display: "flex", minHeight: "100vh", background: "#f5f7f6", fontFamily: "'Segoe UI', sans-serif", fontSize: "13.5px" },
  sidebar:           { width: "196px", background: "white", borderRight: "1px solid #f0f0f0", display: "flex", flexDirection: "column", padding: "1.1rem 0", flexShrink: 0 },
  logoArea:          { display: "flex", alignItems: "center", gap: "8px", padding: "0 1rem 1.25rem" },
  logoIcon:          { width: "28px", height: "28px", borderRadius: "7px", background: TEAL_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", color: TEAL_TEXT },
  logoText:          { fontSize: "15px", fontWeight: "700", color: TEAL_TEXT },
  nav:               { display: "flex", flexDirection: "column", gap: "1px", padding: "0 0.6rem", flex: 1 },
  navBtn:            { display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "7px", border: "none", background: "transparent", color: "#888", fontSize: "12.5px", cursor: "pointer", textAlign: "left", width: "100%" },
  navBtnActive:      { background: TEAL_LIGHT, color: TEAL_TEXT, fontWeight: "600" },
  navIcon:           { color: "#bbb", display: "flex", alignItems: "center", flexShrink: 0 },
  navIconActive:     { color: TEAL_TEXT },
  sidebarBottom:     { padding: "0.75rem 0.6rem 0", borderTop: "1px solid #f5f5f5", marginTop: "auto" },
  logoutBtn:         { display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "7px", border: "none", background: "transparent", color: "#A32D2D", fontSize: "12.5px", cursor: "pointer", width: "100%" },
  logoutIcon:        { color: "#A32D2D", display: "flex", alignItems: "center" },
  content:           { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
  topbar:            { height: "48px", background: "white", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", flexShrink: 0 },
  topbarRight:       { display: "flex", alignItems: "center", gap: "14px" },
  bellWrap:          { position: "relative", cursor: "pointer", display: "flex", alignItems: "center", color: "#555" },
  bellBadge:         { position: "absolute", top: "-4px", right: "-5px", background: TEAL_MID, color: "white", fontSize: "9px", fontWeight: "700", width: "13px", height: "13px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  topbarUser:        { display: "flex", alignItems: "center", gap: "7px", cursor: "pointer" },
  topbarAvatar:      { width: "28px", height: "28px", borderRadius: "50%", background: TEAL_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", color: TEAL_TEXT, fontSize: "11px", fontWeight: "600" },
  topbarName:        { fontSize: "12.5px", fontWeight: "600", color: "#333" },
  main:              { flex: 1, padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem", overflowY: "auto" },
  pageHeading:       { display: "flex", alignItems: "center", gap: "10px" },
  pageTitle:         { margin: "0 0 1px", fontSize: "17px", fontWeight: "700", color: "#1a1a2e" },
  pageSubtitle:      { margin: 0, fontSize: "11.5px", color: "#888" },
  twoCol:            { display: "flex", gap: "1rem", alignItems: "flex-start" },
  filterCard:        { background: "white", border: "1px solid #f0f0f0", borderRadius: "12px", padding: "1.1rem", width: "200px", flexShrink: 0 },
  filterTitle:       { margin: "0 0 0.75rem", fontSize: "13px", fontWeight: "700", color: "#1a1a2e" },
  searchWrap:        { position: "relative", marginBottom: "0.75rem" },
  searchIcon:        { position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#bbb", display: "flex", alignItems: "center", pointerEvents: "none" },
  searchInput:       { width: "100%", padding: "7px 10px 7px 30px", borderRadius: "7px", border: "1px solid #eee", background: "#fafafa", fontSize: "12.5px", color: "#444", outline: "none", boxSizing: "border-box" },
  resetBtn:          { width: "100%", marginBottom: "0.75rem", background: "none", border: "1px solid #eee", borderRadius: "7px", padding: "6px", fontSize: "11.5px", color: "#888", cursor: "pointer" },
  statBox:           { background: TEAL_LIGHT, borderRadius: "8px", padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  statLabel:         { fontSize: "11.5px", color: TEAL_TEXT, fontWeight: "500" },
  statValue:         { fontSize: "18px", fontWeight: "700", color: TEAL_DARK },
  listPanel:         { flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" },
  listTitle:         { margin: "0 0 0.25rem", fontSize: "13px", fontWeight: "700", color: "#1a1a2e", display: "flex", alignItems: "center", gap: "8px" },
  listCount:         { background: TEAL_LIGHT, color: TEAL_TEXT, fontSize: "11px", fontWeight: "600", padding: "1px 8px", borderRadius: "20px" },
  emptyState:        { background: "white", border: "1px solid #f0f0f0", borderRadius: "12px", padding: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", color: "#ccc" },

  /* Child card */
  childCard:         { background: "white", border: "1px solid #f0f0f0", borderRadius: "12px", padding: "1rem 1.1rem" },
  cardHead:          { display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "0.85rem", paddingBottom: "0.7rem", borderBottom: "1px solid #f5f5f5" },
  childPhotoWrap:    { width: "36px", height: "36px", borderRadius: "50%", background: TEAL_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", color: TEAL_TEXT, flexShrink: 0 },
  childImg:          { width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" },
  childImgPlaceholder:{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" },
  childInfo:         { flex: 1 },
  childName:         { fontWeight: "700", fontSize: "13px", color: "#1a1a2e", marginBottom: "4px" },
  metaRow:           { display: "flex", gap: "6px", fontSize: "11.5px", marginBottom: "2px" },
  metaLabel:         { color: "#aaa", fontWeight: "500", width: "36px", flexShrink: 0 },
  metaValue:         { color: "#444" },
  imunCountBadge:    { fontSize: "11px", background: TEAL_LIGHT, color: TEAL_TEXT, padding: "2px 8px", borderRadius: "20px", fontWeight: "600", flexShrink: 0 },

  /* Immunization list */
  cardBody:          { display: "flex", flexDirection: "column", gap: "8px" },
  imunHeader:        { display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" },
  imunHeaderIcon:    { width: "22px", height: "22px", borderRadius: "5px", background: TEAL_LIGHT, color: TEAL_TEXT, display: "flex", alignItems: "center", justifyContent: "center" },
  imunTitle:         { fontSize: "12px", fontWeight: "600", color: "#1a1a2e" },
  imunList:          { display: "flex", flexDirection: "column", gap: "4px" },
  imunRow:           { display: "flex", alignItems: "center", gap: "8px", padding: "5px 8px", background: "#f9f9f9", borderRadius: "6px" },
  imunName:          { fontSize: "12.5px", color: "#1a1a2e", fontWeight: "500", flex: 1 },
  imunDate:          { fontSize: "11.5px", color: "#aaa", flexShrink: 0 },
  statusBadge:       { fontSize: "11px", fontWeight: "600", padding: "2px 8px", borderRadius: "20px", flexShrink: 0 },

  /* Pagination */
  paginationBar:     { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.25rem" },
  paginationInfo:    { fontSize: "11.5px", color: "#aaa" },
  paginationBtns:    { display: "flex", alignItems: "center", gap: "4px" },
  pageBtn:           { width: "28px", height: "28px", borderRadius: "6px", border: "1px solid #eee", background: "white", color: "#555", fontSize: "12px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  pageBtnActive:     { background: TEAL_DARK, color: "#9FE1CB", border: `1px solid ${TEAL_DARK}` },
};

/* ── Mobile Styles (ikut KelolaJadwalBidan) ── */
const m = {
  root:              { display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f5f7f6", fontFamily: "'Segoe UI', sans-serif", fontSize: "13.5px" },
  topbar:            { height: "52px", background: "white", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1rem", flexShrink: 0, position: "sticky", top: 0, zIndex: 100 },
  backBtn:           { background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: TEAL_TEXT, padding: "4px", marginRight: "4px" },
  pageTitle:         { fontSize: "15px", fontWeight: "700", color: "#1a1a2e" },
  topbarRight:       { display: "flex", alignItems: "center", gap: "12px" },
  bellBadge:         { position: "absolute", top: "-3px", right: "-4px", background: TEAL_MID, color: "white", fontSize: "8px", width: "12px", height: "12px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  topbarAvatar:      { width: "28px", height: "28px", borderRadius: "50%", background: TEAL_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", color: TEAL_TEXT, fontSize: "11px", fontWeight: "600" },
  searchBar:         { display: "flex", alignItems: "center", gap: "8px", padding: "0.6rem 1rem", background: "white", borderBottom: "1px solid #f0f0f0", position: "relative" },
  searchIcon:        { position: "absolute", left: "24px", color: "#bbb", display: "flex", alignItems: "center", pointerEvents: "none" },
  searchInput:       { width: "100%", padding: "7px 10px 7px 28px", borderRadius: "7px", border: "1px solid #eee", background: "#fafafa", fontSize: "12.5px", color: "#444", outline: "none" },
  actionBar:         { display: "flex", alignItems: "center", padding: "0.4rem 1rem", background: "white", borderBottom: "1px solid #f0f0f0" },
  resultCount:       { fontSize: "12px", color: "#888" },
  main:              { flex: 1, padding: "0.85rem 1rem", display: "flex", flexDirection: "column", gap: "0.75rem", overflowY: "auto", paddingBottom: "80px" },
  childCard:         { background: "white", border: "1px solid #f0f0f0", borderRadius: "12px", padding: "0.85rem 0.95rem" },
  cardHead:          { display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "0.75rem", paddingBottom: "0.6rem", borderBottom: "1px solid #f5f5f5" },
  childName:         { fontWeight: "700", fontSize: "12.5px", color: "#1a1a2e", marginBottom: "4px" },
  emptyState:        { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 0", color: "#ccc" },
  pagination:        { display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", padding: "0.5rem 0" },
  pageBtn:           { width: "32px", height: "32px", borderRadius: "7px", border: "1px solid #eee", background: "white", color: TEAL_TEXT, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  pageInfo:          { fontSize: "12px", color: "#888" },
  bottomNav:         { position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: "1px solid #f0f0f0", display: "flex", zIndex: 100 },
  bottomNavBtn:      { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 4px", border: "none", background: "transparent", cursor: "pointer", gap: "2px" },
  bottomNavBtnActive:{ background: TEAL_LIGHT },
};

export default DataAnakImunisasi;