import { useState, useEffect } from "react";
import { fetchChildren, fetchImmunizations, fetchVaccineTypes } from "../services/api";

// ── Icon Components ──
function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    </svg>
  );
}
function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}
function ProfileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#bbb">
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={PINK}>
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" />
      <path d="M10 12h4M12 10v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function DotsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#bbb">
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}
function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );
}

// ── Constants ──
const PINK = "#e91e63";
const PINK_LIGHT = "#fce4ec";
const PAGE_SIZE = 5;

// ── Sample fallback data ──
const SAMPLE_CHILDREN = [
  {
    id: 1,
    name: "Ahmad Daffa",
    birth_date: "2023-05-15",
    mother_name: "Siti Aminah",
    address: "Jl. Mawar No. 12, Bandung",
    photo: null,
    immunizations: [
      { id: 1, vaccine_name: "DPT", scheduled_date: "2023-04-16", status: "completed" },
      { id: 2, vaccine_name: "BCG", scheduled_date: "2023-04-16", status: "completed" },
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
      { id: 5, vaccine_name: "BCG", scheduled_date: "2023-04-16", status: "completed" },
    ],
  },
];

// ── Main Component ──
function DataAnakImunisasi({ user, onLogout, onNavigate }) {
  const [activeNav, setActiveNav] = useState("Data Anak Imunisasi");
  const [search, setSearch] = useState("");
  const [children, setChildren] = useState(SAMPLE_CHILDREN);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navItems = [
    { label: "Beranda",                 icon: HomeIcon,     page: "dashboardBidan"    },
    { label: "Kelola Jadwal Imunisasi", icon: CalendarIcon, page: "kelolaJadwalBidan" },
    { label: "Data Anak Imunisasi",     icon: PersonIcon,   page: "dataAnakBidan"     },
    { label: "Profil",                  icon: ProfileIcon,  page: "profilBidan"       },
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
          setChildren(SAMPLE_CHILDREN);
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
        setChildren(SAMPLE_CHILDREN);
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
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const statusBadge = (status) => {
    if (status === "completed") return { label: "Selesai",   color: "#2e7d32", bg: "#e8f5e9",  icon: "✓" };
    if (status === "scheduled") return { label: "Terjadwal", color: "#c2185b", bg: PINK_LIGHT, icon: "●" };
    return                             { label: "Tertunda",  color: "#c2185b", bg: PINK_LIGHT, icon: "!" };
  };

  return (
    <div style={s.root}>
      {/* SIDEBAR */}
      <aside style={s.sidebar}>
        <div style={s.logoArea}>
          <div style={s.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" fill={PINK} />
              <path d="M10 12h4M12 10v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span style={s.logoText}>Imunisasi</span>
        </div>

        <nav style={s.nav}>
          {navItems.map(({ label, icon: Icon, page }) => (
            <button
              key={label}
              style={{ ...s.navBtn, ...(activeNav === label ? s.navBtnActive : {}) }}
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
            <span>Logout</span>
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
              <div style={s.topbarAvatar}><PersonIcon /></div>
              <span style={s.topbarName}>Bidan</span>
              <span style={s.topbarChevron}>▾</span>
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main style={s.main}>
          {/* Page Title */}
          <div>
            <h1 style={s.pageTitle}>Data Anak Imunisasi</h1>
            <p style={s.pageSubtitle}>Kelola data anak dan riwayat imunisasinya</p>
          </div>

          {/* Search */}
          <div style={s.searchWrap}>
            <span style={s.searchIcon}><SearchIcon /></span>
            <input
              type="text"
              style={s.searchInput}
              placeholder="Cari nama anak atau ibu..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>

          {/* List */}
          {loading ? (
            <p style={{ color: "#aaa" }}>Memuat data...</p>
          ) : paginated.length === 0 ? (
            <div style={s.emptyState}>
              <svg width="52" height="52" viewBox="0 0 24 24" fill="#eee">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <p style={{ color: "#bbb", marginTop: 8 }}>Tidak ada data anak ditemukan.</p>
            </div>
          ) : (
            paginated.map((child) => {
              const motherName = child.mother_name || child.motherName || "—";
              const address = child.address || child.alamat || "—";
              const imuns = child.immunizations || [];

              return (
                <div key={child.id} style={s.childCard}>
                  {/* Left: child info */}
                  <div style={s.childLeft}>
                    <div style={s.childPhoto}>
                      {child.photo ? (
                        <img src={child.photo} alt={child.name} style={s.childImg} />
                      ) : (
                        <div style={s.childImgPlaceholder}>👶</div>
                      )}
                    </div>
                    <div style={s.childInfo}>
                      <div style={s.childName}>{child.name}</div>
                      <div style={s.childMeta}>
                        <span style={s.metaLabel}>Lahir:</span>
                        <span style={s.metaVal}>{formatDate(child.birth_date || child.birthDate)}</span>
                      </div>
                      <div style={s.childMeta}>
                        <span style={s.metaLabel}>Ibu:</span>
                        <span style={s.metaVal}>{motherName}</span>
                      </div>
                      <div style={s.childMeta}>
                        <span style={s.metaLabel}>Alamat:</span>
                        <span style={s.metaVal}>{address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={s.cardDivider} />

                  {/* Right: immunization history */}
                  <div style={s.childRight}>
                    <div style={s.imunHeader}>
                      <div style={s.imunHeaderLeft}>
                        <ShieldIcon />
                        <span style={s.imunTitle}>Riwayat Imunisasi</span>
                      </div>
                      <button style={s.dotsBtn}><DotsIcon /></button>
                    </div>

                    {imuns.length === 0 ? (
                      <p style={{ color: "#bbb", fontSize: "13px", padding: "0.5rem 0" }}>
                        Belum ada riwayat imunisasi.
                      </p>
                    ) : (
                      <table style={s.imunTable}>
                        <thead>
                          <tr style={s.tableHeadRow}>
                            <th style={s.th}>Jenis Imunisasi</th>
                            <th style={s.th}>Tanggal</th>
                            <th style={s.th}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {imuns.map((imun, idx) => {
                            const badge = statusBadge(imun.status);
                            return (
                              <tr key={imun.id || idx} style={s.tableRow}>
                                <td style={s.td}>{imun.vaccine_name || "—"}</td>
                                <td style={s.td}>{formatDate(imun.scheduled_date || imun.date)}</td>
                                <td style={s.td}>
                                  <span style={{ ...s.statusBadge, color: badge.color, background: badge.bg }}>
                                    {badge.icon} {badge.label}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {/* Pagination */}
          {!loading && filtered.length > 0 && (
            <div style={s.paginationBar}>
              <span style={s.paginationInfo}>
                Menampilkan {(currentPage - 1) * PAGE_SIZE + 1} - {Math.min(currentPage * PAGE_SIZE, filtered.length)} dari {filtered.length} anak
              </span>
              <div style={s.paginationBtns}>
                <button
                  style={{ ...s.pageBtn, ...(currentPage === 1 ? s.pageBtnDisabled : {}) }}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeftIcon />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    style={{ ...s.pageBtn, ...(currentPage === page ? s.pageBtnActive : {}) }}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  style={{ ...s.pageBtn, ...(currentPage === totalPages ? s.pageBtnDisabled : {}) }}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRightIcon />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* ── Styles ── */
const s = {
  root: {
    display: "flex",
    minHeight: "100vh",
    background: "#fdf4f7",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  sidebar: {
    width: "230px",
    background: "white",
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem 0",
    boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
    flexShrink: 0,
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "0 1.5rem 1.8rem",
  },
  logoIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: PINK_LIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { fontWeight: "800", fontSize: "18px", color: PINK },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "0 0.75rem",
    flex: 1,
  },
  navBtn: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 14px",
    borderRadius: "12px",
    border: "none",
    background: "transparent",
    color: "#888",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.15s",
  },
  navBtnActive: {
    background: PINK_LIGHT,
    color: PINK,
    fontWeight: "700",
  },
  navIcon: { color: "#bbb", display: "flex", alignItems: "center", flexShrink: 0 },
  navIconActive: { color: PINK },
  sidebarBottom: {
    padding: "1rem 0.75rem 0",
    borderTop: "1px solid #f5f5f5",
    marginTop: "auto",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 14px",
    borderRadius: "12px",
    border: "none",
    background: "transparent",
    color: "#e53935",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
  },
  logoutIcon: { color: "#e53935", display: "flex", alignItems: "center", flexShrink: 0 },
  content: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
  topbar: {
    height: "60px",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 2rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    flexShrink: 0,
  },
  topbarRight: { display: "flex", alignItems: "center", gap: "18px" },
  bellWrap: { position: "relative", color: "#555", display: "flex", alignItems: "center", cursor: "pointer" },
  bellBadge: {
    position: "absolute",
    top: "-6px",
    right: "-6px",
    background: PINK,
    color: "white",
    fontSize: "10px",
    fontWeight: "700",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topbarUser: { display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" },
  topbarAvatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: PINK_LIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: PINK,
  },
  topbarName: { fontWeight: "600", fontSize: "14px", color: "#333" },
  topbarChevron: { color: "#aaa", fontSize: "12px" },
  main: {
    flex: 1,
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
    overflowY: "auto",
  },
  pageTitle: { margin: "0 0 4px", fontSize: "26px", fontWeight: "800", color: PINK },
  pageSubtitle: { margin: 0, fontSize: "14px", color: "#888" },
  searchWrap: { position: "relative", maxWidth: "460px" },
  searchIcon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    padding: "13px 14px 13px 44px",
    borderRadius: "50px",
    border: `1.5px solid #f0e0e8`,
    background: "white",
    fontSize: "14px",
    color: "#333",
    outline: "none",
    boxSizing: "border-box",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  childCard: {
    background: "white",
    borderRadius: "20px",
    padding: "1.5rem",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    border: `1px solid ${PINK_LIGHT}`,
    display: "flex",
    gap: "0",
    alignItems: "flex-start",
  },
  childLeft: {
    display: "flex",
    gap: "1.2rem",
    alignItems: "flex-start",
    width: "300px",
    flexShrink: 0,
  },
  childPhoto: {
    width: "100px",
    height: "110px",
    borderRadius: "14px",
    overflow: "hidden",
    flexShrink: 0,
    background: PINK_LIGHT,
  },
  childImg: { width: "100%", height: "100%", objectFit: "cover" },
  childImgPlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
  },
  childInfo: { flex: 1, paddingTop: "4px" },
  childName: {
    fontWeight: "800",
    fontSize: "17px",
    color: PINK,
    marginBottom: "10px",
  },
  childMeta: {
    display: "flex",
    gap: "6px",
    marginBottom: "5px",
    fontSize: "13.5px",
    flexWrap: "wrap",
  },
  metaLabel: { color: "#555", fontWeight: "600" },
  metaVal: { color: "#333" },
  cardDivider: {
    width: "1px",
    background: "#f5e0ea",
    alignSelf: "stretch",
    margin: "0 1.5rem",
    flexShrink: 0,
  },
  childRight: { flex: 1, minWidth: 0 },
  imunHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0.8rem",
  },
  imunHeaderLeft: { display: "flex", alignItems: "center", gap: "8px" },
  imunTitle: { fontWeight: "700", fontSize: "15px", color: "#1a1a2e" },
  dotsBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "4px",
    borderRadius: "6px",
  },
  imunTable: { width: "100%", borderCollapse: "collapse" },
  tableHeadRow: { background: PINK_LIGHT },
  th: {
    padding: "10px 14px",
    textAlign: "left",
    fontSize: "13px",
    fontWeight: "700",
    color: "#555",
  },
  tableRow: { borderBottom: `1px solid ${PINK_LIGHT}` },
  td: {
    padding: "11px 14px",
    fontSize: "14px",
    color: "#1a1a2e",
    fontWeight: "500",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "700",
  },
  emptyState: {
    background: "white",
    borderRadius: "20px",
    padding: "3rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  paginationBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "0.5rem",
  },
  paginationInfo: { fontSize: "13px", color: "#888" },
  paginationBtns: { display: "flex", alignItems: "center", gap: "6px" },
  pageBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    border: `1.5px solid #f0e0e8`,
    background: "white",
    color: "#555",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
  },
  pageBtnActive: {
    background: PINK,
    color: "white",
    border: `1.5px solid ${PINK}`,
  },
  pageBtnDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
};

export default DataAnakImunisasi;