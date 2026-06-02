import { useState, useEffect } from "react";

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

/* ── Constants ── */
const TEAL_DARK  = "#085041";
const TEAL_MID   = "#1D9E75";
const TEAL_LIGHT = "#E1F5EE";
const TEAL_TEXT  = "#0F6E56";

/* ── Icons ── */
function HomeIcon()     { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>; }
function CalendarIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>; }
function PersonIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>; }
function ProfileIcon()  { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>; }
function BellIcon()     { return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>; }
function LogoutIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>; }
function ShieldIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/></svg>; }
function ChevronDown()  { return <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>; }
function EditIcon()     { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>; }
function TrashIcon()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>; }
function ArrowLeft()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>; }
function FilterIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>; }

/* ── Modal ── */
function JadwalModal({ mode, initialData, onClose, onSave, isMobile }) {
  const [form, setForm] = useState(
    initialData
      ? { ...initialData, vaccineInput: initialData.vaccines.join(", ") }
      : { date: "", timeStart: "08:00", timeEnd: "14:00", vaccineInput: "", status: "tersedia", slotTotal: 15, slotUsed: 0, keterangan: "" }
  );

  const handleSave = () => {
    const vaccines = form.vaccineInput.split(",").map((v) => v.trim()).filter(Boolean);
    const { vaccineInput, ...rest } = form;
    onSave({ ...rest, vaccines });
  };

  const modalStyle = isMobile
    ? { ...ms.modal, maxWidth: "100%", borderRadius: "16px 16px 0 0", position: "fixed", bottom: 0, left: 0, right: 0, maxHeight: "90vh" }
    : { ...ms.modal, maxWidth: "460px" };

  const overlayStyle = isMobile
    ? { ...ms.overlay, alignItems: "flex-end" }
    : ms.overlay;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={ms.modalHeader}>
          <h3 style={ms.modalTitle}>{mode === "add" ? "Tambah jadwal" : "Edit jadwal"}</h3>
          <button style={ms.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={ms.field}>
          <label style={ms.label}>Tanggal</label>
          <input type="date" style={ms.input} value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </div>

        <div style={ms.row}>
          <div style={{ ...ms.field, flex: 1 }}>
            <label style={ms.label}>Jam mulai</label>
            <input type="time" style={ms.input} value={form.timeStart}
              onChange={(e) => setForm({ ...form, timeStart: e.target.value })} />
          </div>
          <div style={{ ...ms.field, flex: 1 }}>
            <label style={ms.label}>Jam selesai</label>
            <input type="time" style={ms.input} value={form.timeEnd}
              onChange={(e) => setForm({ ...form, timeEnd: e.target.value })} />
          </div>
        </div>

        <div style={ms.field}>
          <label style={ms.label}>Jenis imunisasi (pisahkan dengan koma)</label>
          <input type="text" style={ms.input} placeholder="contoh: DPT, Polio, BCG"
            value={form.vaccineInput}
            onChange={(e) => setForm({ ...form, vaccineInput: e.target.value })} />
        </div>

        <div style={ms.row}>
          <div style={{ ...ms.field, flex: 1 }}>
            <label style={ms.label}>Total slot</label>
            <input type="number" style={ms.input} value={form.slotTotal} min={1}
              onChange={(e) => setForm({ ...form, slotTotal: Number(e.target.value) })} />
          </div>
          <div style={{ ...ms.field, flex: 1 }}>
            <label style={ms.label}>Slot terpakai</label>
            <input type="number" style={ms.input} value={form.slotUsed} min={0}
              onChange={(e) => setForm({ ...form, slotUsed: Number(e.target.value) })} />
          </div>
        </div>

        <div style={ms.field}>
          <label style={ms.label}>Status</label>
          <select style={ms.input} value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="tersedia">Tersedia</option>
            <option value="penuh">Penuh</option>
            <option value="nonaktif">Nonaktif</option>
          </select>
        </div>

        <div style={ms.field}>
          <label style={ms.label}>Keterangan</label>
          <input type="text" style={ms.input} placeholder="Contoh: Imunisasi lanjutan"
            value={form.keterangan}
            onChange={(e) => setForm({ ...form, keterangan: e.target.value })} />
        </div>

        <div style={ms.modalFooter}>
          <button style={ms.cancelBtn} onClick={onClose}>Batal</button>
          <button style={ms.saveBtn} onClick={handleSave}>Simpan</button>
        </div>
      </div>
    </div>
  );
}

/* ── Filter Sheet (mobile) ── */
function FilterSheet({ filterStatus, filterDate, onChange, onClose }) {
  return (
    <div style={{ ...ms.overlay, alignItems: "flex-end" }}>
      <div style={{ background: "white", borderRadius: "16px 16px 0 0", padding: "1.25rem 1rem 2rem", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <span style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a2e" }}>Filter jadwal</span>
          <button style={ms.closeBtn} onClick={onClose}>✕</button>
        </div>
        <label style={ms.label}>Status</label>
        <select style={{ ...ms.input, marginBottom: "0.85rem" }} value={filterStatus}
          onChange={(e) => onChange("status", e.target.value)}>
          <option value="semua">Semua status</option>
          <option value="tersedia">Tersedia</option>
          <option value="penuh">Penuh</option>
          <option value="nonaktif">Nonaktif</option>
        </select>
        <label style={ms.label}>Tanggal</label>
        <input type="date" style={ms.input} value={filterDate}
          onChange={(e) => onChange("date", e.target.value)} />
        <button style={{ ...ms.saveBtn, width: "100%", marginTop: "1rem", textAlign: "center" }} onClick={onClose}>
          Terapkan
        </button>
      </div>
    </div>
  );
}

/* ── Main Component ── */
function KelolaJadwalBidan({ user, onLogout, onNavigate }) {
  const isMobile = useIsMobile();
  const [activeNav, setActiveNav] = useState("Kelola Jadwal");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [filterDate, setFilterDate]     = useState("");
  const [showFilter, setShowFilter]     = useState(false);
  const [jadwalList, setJadwalList] = useState([
    { id: 1, date: "2025-07-29", timeStart: "08:00", timeEnd: "14:00", vaccines: ["DPT", "Polio"], status: "tersedia", slotTotal: 15, slotUsed: 12, keterangan: "Imunisasi lanjutan" },
    { id: 2, date: "2025-07-30", timeStart: "09:00", timeEnd: "13:00", vaccines: ["BCG"], status: "penuh", slotTotal: 10, slotUsed: 10, keterangan: "" },
  ]);
  const [modal, setModal]               = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const navItems = [
    { label: "Beranda",       icon: HomeIcon,     page: "dashboardBidan"    },
    { label: "Kelola Jadwal", icon: CalendarIcon, page: "kelolaJadwalBidan" },
    { label: "Data Anak",     icon: PersonIcon,   page: "dataAnakBidan"     },
    { label: "Profil",        icon: ProfileIcon,  page: "profilBidan"       },
  ];

  const filtered = jadwalList.filter((j) => {
    const matchStatus = filterStatus === "semua" || j.status === filterStatus;
    const matchDate   = !filterDate || j.date === filterDate;
    return matchStatus && matchDate;
  });

  const handleSave = (data) => {
    if (modal.mode === "add") {
      setJadwalList((prev) => [...prev, { ...data, id: Date.now() }]);
    } else {
      setJadwalList((prev) => prev.map((j) => j.id === modal.data.id ? { ...data, id: j.id } : j));
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    setJadwalList((prev) => prev.filter((j) => j.id !== id));
    setDeleteConfirm(null);
  };

  const handleToggleStatus = (id) => {
    setJadwalList((prev) =>
      prev.map((j) => j.id === id ? { ...j, status: j.status === "nonaktif" ? "tersedia" : "nonaktif" } : j)
    );
  };

  const handleNav = (label, page) => {
    setActiveNav(label);
    onNavigate && onNavigate(page);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  };

  const formatDateShort = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  const statusConfig = {
    tersedia: { label: "Tersedia", color: TEAL_TEXT,  bg: TEAL_LIGHT },
    penuh:    { label: "Penuh",    color: "#854F0B",  bg: "#FAEEDA"  },
    nonaktif: { label: "Nonaktif", color: "#5F5E5A",  bg: "#F1EFE8"  },
  };

  /* ── Shared card renderer ── */
  const renderCard = (j) => {
    const badge    = statusConfig[j.status] || statusConfig.tersedia;
    const slotSisa = j.slotTotal - j.slotUsed;
    const slotPct  = Math.round((j.slotUsed / j.slotTotal) * 100);

    return (
      <div key={j.id} style={isMobile ? m.jadwalCard : s.jadwalCard}>
        {/* Head */}
        <div style={isMobile ? m.cardHead : s.cardHead}>
          <div style={s.cardDateWrap}>
            <div style={s.cardDateIcon}><CalendarIcon /></div>
            <span style={isMobile ? m.cardDate : s.cardDate}>
              {isMobile ? formatDateShort(j.date) : formatDate(j.date)}
            </span>
          </div>
          <span style={{ ...s.statusBadge, color: badge.color, background: badge.bg }}>
            {badge.label}
          </span>
        </div>

        {/* Body */}
        <div style={s.cardBody}>
          <div style={s.cardRow}>
            <span style={s.metaLabel}>Waktu</span>
            <span style={s.metaValue}>{j.timeStart} – {j.timeEnd}</span>
          </div>
          <div style={s.cardRow}>
            <span style={s.metaLabel}>Imunisasi</span>
            <div style={s.vaccineTags}>
              {j.vaccines.length > 0
                ? j.vaccines.map((v) => <span key={v} style={s.vaccineTag}>{v}</span>)
                : <span style={s.metaValue}>—</span>
              }
            </div>
          </div>
          <div style={s.cardRow}>
            <span style={s.metaLabel}>Slot</span>
            <div style={{ flex: 1 }}>
              <div style={s.slotRow}>
                <span style={s.metaValue}>{j.slotUsed}/{j.slotTotal}</span>
                <span style={s.slotSisa}>{slotSisa} tersisa</span>
              </div>
              <div style={s.progressBg}>
                <div style={{ ...s.progressFill, width: `${slotPct}%`, background: slotPct >= 100 ? "#854F0B" : TEAL_MID }} />
              </div>
            </div>
          </div>
          {j.keterangan ? (
            <div style={s.cardRow}>
              <span style={s.metaLabel}>Keterangan</span>
              <span style={s.metaValue}>{j.keterangan}</span>
            </div>
          ) : null}
        </div>

        {/* Actions */}
        <div style={s.cardActions}>
          <button
            style={{ ...s.toggleBtn, background: j.status === "nonaktif" ? TEAL_LIGHT : "#F1EFE8", color: j.status === "nonaktif" ? TEAL_TEXT : "#5F5E5A" }}
            onClick={() => handleToggleStatus(j.id)}
          >
            {j.status === "nonaktif" ? "Aktifkan" : "Nonaktifkan"}
          </button>
          <div style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
            <button style={s.iconBtn} title="Edit" onClick={() => setModal({ mode: "edit", data: j })}>
              <EditIcon />
            </button>
            <button style={{ ...s.iconBtn, color: "#A32D2D", background: "#FCEBEB" }} title="Hapus"
              onClick={() => setDeleteConfirm(j.id)}>
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* ── MOBILE LAYOUT ── */
  if (isMobile) {
    const activeFilters = (filterStatus !== "semua" ? 1 : 0) + (filterDate ? 1 : 0);
    return (
      <div style={m.root}>
        {/* TOPBAR */}
        <header style={m.topbar}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button style={m.backBtn} onClick={() => onNavigate && onNavigate("dashboardBidan")}>
              <ArrowLeft />
            </button>
            <span style={m.pageTitle}>Kelola jadwal</span>
          </div>
          <div style={m.topbarRight}>
            <div style={{ position: "relative", color: "#555", display: "flex" }}>
              <BellIcon />
              <span style={m.bellBadge}>3</span>
            </div>
            <div style={m.topbarAvatar}>BD</div>
          </div>
        </header>

        {/* ACTION BAR */}
        <div style={m.actionBar}>
          <button style={m.filterBtn} onClick={() => setShowFilter(true)}>
            <FilterIcon />
            <span>Filter</span>
            {activeFilters > 0 && <span style={m.filterBadge}>{activeFilters}</span>}
          </button>
          <span style={m.resultCount}>{filtered.length} jadwal</span>
          <button style={m.addBtnMobile} onClick={() => setModal({ mode: "add" })}>
            + Tambah
          </button>
        </div>

        {/* LIST */}
        <main style={m.main}>
          {filtered.length === 0 ? (
            <div style={m.emptyState}>
              <CalendarIcon />
              <p style={{ color: "#bbb", fontSize: "13px", marginTop: "8px" }}>Tidak ada jadwal ditemukan.</p>
            </div>
          ) : (
            filtered.map(renderCard)
          )}
        </main>

        {/* BOTTOM NAV */}
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

        {/* Filter Sheet */}
        {showFilter && (
          <FilterSheet
            filterStatus={filterStatus}
            filterDate={filterDate}
            onChange={(key, val) => key === "status" ? setFilterStatus(val) : setFilterDate(val)}
            onClose={() => setShowFilter(false)}
          />
        )}

        {/* Modal */}
        {modal && <JadwalModal mode={modal.mode} initialData={modal.data} onClose={() => setModal(null)} onSave={handleSave} isMobile={true} />}

        {/* Delete Confirm */}
        {deleteConfirm && (
          <div style={{ ...ms.overlay, alignItems: "flex-end" }}>
            <div style={{ background: "white", borderRadius: "16px 16px 0 0", padding: "1.25rem 1rem 2rem", width: "100%" }}>
              <p style={{ fontSize: "15px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px" }}>Hapus jadwal?</p>
              <p style={{ fontSize: "13px", color: "#666", marginBottom: "1.25rem" }}>Tindakan ini tidak dapat dibatalkan.</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button style={{ ...ms.cancelBtn, flex: 1 }} onClick={() => setDeleteConfirm(null)}>Batal</button>
                <button style={{ ...ms.saveBtn, flex: 1, background: "#A32D2D", textAlign: "center" }} onClick={() => handleDelete(deleteConfirm)}>Hapus</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ── DESKTOP LAYOUT ── */
  return (
    <div style={s.root}>
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

      <div style={s.content}>
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

        <main style={s.main}>
          <div style={s.pageHeading}>
            <button style={s.backBtn} onClick={() => onNavigate && onNavigate("dashboardBidan")}><ArrowLeft /></button>
            <div>
              <h1 style={s.pageTitle}>Kelola jadwal</h1>
              <p style={s.pageSubtitle}>Kelola jadwal pelayanan imunisasi puskesmas</p>
            </div>
            <button style={s.addBtn} onClick={() => setModal({ mode: "add" })}>+ Tambah jadwal</button>
          </div>

          <div style={s.twoCol}>
            {/* Filter */}
            <div style={s.filterCard}>
              <p style={s.filterTitle}>Filter jadwal</p>
              <div style={s.filterField}>
                <label style={s.filterLabel}>Status</label>
                <select style={s.filterSelect} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="semua">Semua status</option>
                  <option value="tersedia">Tersedia</option>
                  <option value="penuh">Penuh</option>
                  <option value="nonaktif">Nonaktif</option>
                </select>
              </div>
              <div style={s.filterField}>
                <label style={s.filterLabel}>Tanggal</label>
                <input type="date" style={s.filterSelect} value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
              </div>
              {(filterStatus !== "semua" || filterDate) && (
                <button style={s.resetBtn} onClick={() => { setFilterStatus("semua"); setFilterDate(""); }}>Reset filter</button>
              )}
            </div>

            {/* List */}
            <div style={s.listPanel}>
              <p style={s.listTitle}>Daftar jadwal <span style={s.listCount}>{filtered.length}</span></p>
              {filtered.length === 0 ? (
                <div style={s.emptyState}>
                  <CalendarIcon /><p style={{ color: "#bbb", fontSize: "13px", marginTop: "8px" }}>Tidak ada jadwal.</p>
                </div>
              ) : filtered.map(renderCard)}
            </div>
          </div>
        </main>
      </div>

      {modal && <JadwalModal mode={modal.mode} initialData={modal.data} onClose={() => setModal(null)} onSave={handleSave} isMobile={false} />}

      {deleteConfirm && (
        <div style={ms.overlay}>
          <div style={{ ...ms.modal, maxWidth: 360 }}>
            <div style={ms.modalHeader}>
              <h3 style={ms.modalTitle}>Hapus jadwal?</h3>
              <button style={ms.closeBtn} onClick={() => setDeleteConfirm(null)}>✕</button>
            </div>
            <p style={{ color: "#666", fontSize: "13px", margin: "0.5rem 0 1.25rem" }}>
              Tindakan ini tidak dapat dibatalkan. Yakin ingin menghapus jadwal ini?
            </p>
            <div style={ms.modalFooter}>
              <button style={ms.cancelBtn} onClick={() => setDeleteConfirm(null)}>Batal</button>
              <button style={{ ...ms.saveBtn, background: "#A32D2D" }} onClick={() => handleDelete(deleteConfirm)}>Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Desktop Styles ── */
const s = {
  root:         { display: "flex", minHeight: "100vh", background: "#f5f7f6", fontFamily: "'Segoe UI', sans-serif", fontSize: "13.5px" },
  sidebar:      { width: "196px", background: "white", borderRight: "1px solid #f0f0f0", display: "flex", flexDirection: "column", padding: "1.1rem 0", flexShrink: 0 },
  logoArea:     { display: "flex", alignItems: "center", gap: "8px", padding: "0 1rem 1.25rem" },
  logoIcon:     { width: "28px", height: "28px", borderRadius: "7px", background: TEAL_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", color: TEAL_TEXT },
  logoText:     { fontSize: "15px", fontWeight: "700", color: TEAL_TEXT },
  nav:          { display: "flex", flexDirection: "column", gap: "1px", padding: "0 0.6rem", flex: 1 },
  navBtn:       { display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "7px", border: "none", background: "transparent", color: "#888", fontSize: "12.5px", cursor: "pointer", textAlign: "left", width: "100%" },
  navBtnActive: { background: TEAL_LIGHT, color: TEAL_TEXT, fontWeight: "600" },
  navIcon:      { color: "#bbb", display: "flex", alignItems: "center", flexShrink: 0 },
  navIconActive:{ color: TEAL_TEXT },
  sidebarBottom:{ padding: "0.75rem 0.6rem 0", borderTop: "1px solid #f5f5f5", marginTop: "auto" },
  logoutBtn:    { display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "7px", border: "none", background: "transparent", color: "#A32D2D", fontSize: "12.5px", cursor: "pointer", width: "100%" },
  logoutIcon:   { color: "#A32D2D", display: "flex", alignItems: "center" },
  content:      { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
  topbar:       { height: "48px", background: "white", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", flexShrink: 0 },
  topbarRight:  { display: "flex", alignItems: "center", gap: "14px" },
  bellWrap:     { position: "relative", cursor: "pointer", display: "flex", alignItems: "center", color: "#555" },
  bellBadge:    { position: "absolute", top: "-4px", right: "-5px", background: TEAL_MID, color: "white", fontSize: "9px", fontWeight: "700", width: "13px", height: "13px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  topbarUser:   { display: "flex", alignItems: "center", gap: "7px", cursor: "pointer" },
  topbarAvatar: { width: "28px", height: "28px", borderRadius: "50%", background: TEAL_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", color: TEAL_TEXT, fontSize: "11px", fontWeight: "600" },
  topbarName:   { fontSize: "12.5px", fontWeight: "600", color: "#333" },
  main:         { flex: 1, padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem", overflowY: "auto" },
  pageHeading:  { display: "flex", alignItems: "center", gap: "10px" },
  backBtn:      { background: "#F1EFE8", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "8px", color: TEAL_TEXT, flexShrink: 0 },
  pageTitle:    { margin: "0 0 1px", fontSize: "17px", fontWeight: "700", color: "#1a1a2e" },
  pageSubtitle: { margin: 0, fontSize: "11.5px", color: "#888" },
  addBtn:       { marginLeft: "auto", background: TEAL_DARK, color: "#9FE1CB", border: "none", borderRadius: "8px", padding: "8px 16px", fontWeight: "600", fontSize: "12.5px", cursor: "pointer" },
  twoCol:       { display: "flex", gap: "1rem", alignItems: "flex-start" },
  filterCard:   { background: "white", border: "1px solid #f0f0f0", borderRadius: "12px", padding: "1.1rem", width: "200px", flexShrink: 0 },
  filterTitle:  { margin: "0 0 0.9rem", fontSize: "13px", fontWeight: "700", color: "#1a1a2e" },
  filterField:  { marginBottom: "0.75rem" },
  filterLabel:  { display: "block", fontSize: "11.5px", color: "#888", marginBottom: "5px" },
  filterSelect: { width: "100%", padding: "7px 10px", borderRadius: "7px", border: "1px solid #eee", background: "#fafafa", fontSize: "12.5px", color: "#444", outline: "none", boxSizing: "border-box" },
  resetBtn:     { width: "100%", marginTop: "4px", background: "none", border: "1px solid #eee", borderRadius: "7px", padding: "6px", fontSize: "11.5px", color: "#888", cursor: "pointer" },
  listPanel:    { flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" },
  listTitle:    { margin: "0 0 0.25rem", fontSize: "13px", fontWeight: "700", color: "#1a1a2e", display: "flex", alignItems: "center", gap: "8px" },
  listCount:    { background: TEAL_LIGHT, color: TEAL_TEXT, fontSize: "11px", fontWeight: "600", padding: "1px 8px", borderRadius: "20px" },
  emptyState:   { background: "white", border: "1px solid #f0f0f0", borderRadius: "12px", padding: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#ccc" },
  jadwalCard:   { background: "white", border: "1px solid #f0f0f0", borderRadius: "12px", padding: "1rem 1.1rem" },
  cardHead:     { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem", paddingBottom: "0.7rem", borderBottom: "1px solid #f5f5f5" },
  cardDateWrap: { display: "flex", alignItems: "center", gap: "7px" },
  cardDateIcon: { width: "28px", height: "28px", borderRadius: "7px", background: TEAL_LIGHT, color: TEAL_TEXT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  cardDate:     { fontWeight: "600", fontSize: "13px", color: "#1a1a2e" },
  statusBadge:  { fontSize: "11px", fontWeight: "600", padding: "3px 10px", borderRadius: "20px" },
  cardBody:     { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "0.85rem" },
  cardRow:      { display: "flex", alignItems: "flex-start", gap: "8px" },
  metaLabel:    { fontSize: "11.5px", color: "#aaa", fontWeight: "500", width: "72px", flexShrink: 0, paddingTop: "1px" },
  metaValue:    { fontSize: "13px", color: "#1a1a2e", fontWeight: "500", flex: 1 },
  vaccineTags:  { display: "flex", flexWrap: "wrap", gap: "5px", flex: 1 },
  vaccineTag:   { fontSize: "11px", background: "#E6F1FB", color: "#185FA5", padding: "2px 8px", borderRadius: "5px", fontWeight: "500" },
  slotRow:      { display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" },
  slotSisa:     { fontSize: "11px", color: "#aaa" },
  progressBg:   { height: "4px", background: "#f0f0f0", borderRadius: "4px", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: "4px" },
  cardActions:  { display: "flex", alignItems: "center", gap: "8px", paddingTop: "0.7rem", borderTop: "1px solid #f5f5f5" },
  toggleBtn:    { border: "none", borderRadius: "7px", padding: "6px 14px", fontWeight: "600", fontSize: "12px", cursor: "pointer" },
  iconBtn:      { background: TEAL_LIGHT, color: TEAL_TEXT, border: "none", borderRadius: "7px", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
};

/* ── Mobile Styles ── */
const m = {
  root:             { display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f5f7f6", fontFamily: "'Segoe UI', sans-serif", fontSize: "13.5px" },
  topbar:           { height: "52px", background: "white", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1rem", flexShrink: 0, position: "sticky", top: 0, zIndex: 100 },
  backBtn:          { background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: TEAL_TEXT, padding: "4px", marginRight: "4px" },
  pageTitle:        { fontSize: "15px", fontWeight: "700", color: "#1a1a2e" },
  topbarRight:      { display: "flex", alignItems: "center", gap: "12px" },
  bellBadge:        { position: "absolute", top: "-3px", right: "-4px", background: TEAL_MID, color: "white", fontSize: "8px", width: "12px", height: "12px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  topbarAvatar:     { width: "28px", height: "28px", borderRadius: "50%", background: TEAL_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", color: TEAL_TEXT, fontSize: "11px", fontWeight: "600" },
  actionBar:        { display: "flex", alignItems: "center", gap: "8px", padding: "0.6rem 1rem", background: "white", borderBottom: "1px solid #f0f0f0" },
  filterBtn:        { display: "flex", alignItems: "center", gap: "5px", background: TEAL_LIGHT, color: TEAL_TEXT, border: "none", borderRadius: "7px", padding: "6px 12px", fontSize: "12px", fontWeight: "600", cursor: "pointer", position: "relative" },
  filterBadge:      { background: TEAL_DARK, color: "white", fontSize: "9px", width: "14px", height: "14px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  resultCount:      { fontSize: "12px", color: "#888", flex: 1 },
  addBtnMobile:     { background: TEAL_DARK, color: "#9FE1CB", border: "none", borderRadius: "7px", padding: "6px 14px", fontSize: "12px", fontWeight: "600", cursor: "pointer" },
  main:             { flex: 1, padding: "0.85rem 1rem", display: "flex", flexDirection: "column", gap: "0.75rem", overflowY: "auto", paddingBottom: "80px" },
  jadwalCard:       { background: "white", border: "1px solid #f0f0f0", borderRadius: "12px", padding: "0.85rem 0.95rem" },
  cardHead:         { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", paddingBottom: "0.6rem", borderBottom: "1px solid #f5f5f5" },
  cardDate:         { fontWeight: "600", fontSize: "12.5px", color: "#1a1a2e" },
  emptyState:       { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 0", color: "#ccc" },
  bottomNav:        { position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: "1px solid #f0f0f0", display: "flex", zIndex: 100 },
  bottomNavBtn:     { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 4px", border: "none", background: "transparent", cursor: "pointer", gap: "2px" },
  bottomNavBtnActive:{ background: TEAL_LIGHT },
};

/* ── Modal Styles ── */
const ms = {
  overlay:     { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" },
  modal:       { background: "white", borderRadius: "14px", padding: "1.4rem", width: "100%", maxHeight: "90vh", overflowY: "auto" },
  modalHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.1rem" },
  modalTitle:  { margin: 0, fontSize: "15px", fontWeight: "700", color: "#1a1a2e" },
  closeBtn:    { background: "#f5f5f5", border: "none", width: "26px", height: "26px", borderRadius: "50%", cursor: "pointer", fontSize: "12px", color: "#888", display: "flex", alignItems: "center", justifyContent: "center" },
  field:       { marginBottom: "0.85rem", display: "flex", flexDirection: "column", gap: "4px" },
  row:         { display: "flex", gap: "10px", marginBottom: "0.85rem" },
  label:       { fontSize: "12px", fontWeight: "600", color: "#555" },
  input:       { padding: "8px 12px", borderRadius: "8px", border: "1px solid #eee", background: "#fafafa", fontSize: "13px", color: "#333", outline: "none", width: "100%", boxSizing: "border-box" },
  modalFooter: { display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "1.1rem" },
  cancelBtn:   { background: "#f5f5f5", color: "#555", border: "none", borderRadius: "8px", padding: "8px 18px", fontWeight: "600", fontSize: "13px", cursor: "pointer" },
  saveBtn:     { background: TEAL_DARK, color: "#9FE1CB", border: "none", borderRadius: "8px", padding: "8px 22px", fontWeight: "600", fontSize: "13px", cursor: "pointer" },
};

export default KelolaJadwalBidan;