import { useState, useEffect } from "react";
import { fetchSchedules, createSchedule, updateSchedule, deleteSchedule } from "../services/api";

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

/* ─── Design tokens (sama dengan DashboardBidan) ─────────────────────────── */
const C = {
  forest:       "#063D30",
  forestMid:    "#085041",
  teal:         "#10B981",
  tealLight:    "#D1FAE5",
  tealMid:      "#6EE7B7",
  tealSoft:     "#ECFDF5",
  pageBg:       "#F0FAF6",
  surface:      "#FFFFFF",
  surfaceAlt:   "#F8FFFE",
  border:       "#E2F0EB",
  borderStrong: "#C4DDD5",
  textPrimary:  "#0C1F1A",
  textSecondary:"#3D6657",
  textMuted:    "#7BA898",
  textOnDark:   "#ECFDF5",
  amber:        "#F59E0B",
  amberLight:   "#FEF3C7",
  rose:         "#F43F5E",
  roseLight:    "#FFE4E6",
  blue:         "#3B82F6",
  blueLight:    "#DBEAFE",
  blueSoft:     "#EFF6FF",
  sidebarBg:    "#052E24",
  sidebarHover: "#0A4034",
  sidebarActive:"#10B981",
};

const T = {
  hero:    { fontSize: "22px",   fontWeight: "700", lineHeight: "1.25", letterSpacing: "-0.3px" },
  h2:      { fontSize: "15px",   fontWeight: "700", letterSpacing: "-0.1px" },
  stat:    { fontSize: "30px",   fontWeight: "700", lineHeight: "1",    letterSpacing: "-0.5px" },
  label:   { fontSize: "10.5px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase" },
  body:    { fontSize: "13.5px", fontWeight: "400", lineHeight: "1.6" },
  bodyMed: { fontSize: "13.5px", fontWeight: "600" },
  small:   { fontSize: "12px",   fontWeight: "400", lineHeight: "1.5" },
  smallMed:{ fontSize: "12px",   fontWeight: "600" },
  xs:      { fontSize: "11px",   fontWeight: "500" },
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
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);
const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const AlertIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

/* ── Status config ── */
const statusConfig = {
  tersedia: { label: "Tersedia", color: C.teal,         bg: C.tealLight   },
  penuh:    { label: "Penuh",    color: C.amber,        bg: C.amberLight  },
  nonaktif: { label: "Nonaktif", color: C.textMuted,    bg: C.border      },
};

/* ── Modal ── */
function JadwalModal({ mode, initialData, onClose, onSave, isMobile }) {
  const [form, setForm] = useState(
    initialData
      ? { ...initialData }
      : { date: "", time_start: "08:00", time_end: "14:00", vaccine_id: 1, location: "Puskesmas", quota: 15 }
  );

  const handleSave = () => {
    onSave(form);
  };

  const overlayStyle = {
    position: "fixed", inset: 0,
    background: "rgba(6,61,48,0.45)",
    display: "flex",
    alignItems: isMobile ? "flex-end" : "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: isMobile ? 0 : "1rem",
  };

  const modalStyle = {
    background: C.surface,
    borderRadius: isMobile ? "20px 20px 0 0" : "18px",
    padding: "24px",
    width: "100%",
    maxWidth: isMobile ? "100%" : "460px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 8px 40px rgba(6,61,48,0.18)",
  };

  const inputStyle = {
    padding: "9px 12px",
    borderRadius: "9px",
    border: `1px solid ${C.border}`,
    background: C.surfaceAlt,
    fontSize: "13.5px",
    color: C.textPrimary,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <h3 style={{ ...T.h2, color: C.textPrimary, margin: 0 }}>
            {mode === "add" ? "Tambah jadwal" : "Edit jadwal"}
          </h3>
          <button
            style={{
              background: C.border, border: "none", width: "28px", height: "28px",
              borderRadius: "50%", cursor: "pointer", fontSize: "13px",
              color: C.textSecondary, display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onClick={onClose}
          >✕</button>
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ ...T.label, color: C.textMuted, display: "block", marginBottom: "6px" }}>Tanggal</label>
            <input type="date" style={inputStyle} value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ ...T.label, color: C.textMuted, display: "block", marginBottom: "6px" }}>Jam mulai</label>
              <input type="time" style={inputStyle} value={form.time_start}
                onChange={(e) => setForm({ ...form, time_start: e.target.value })} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ ...T.label, color: C.textMuted, display: "block", marginBottom: "6px" }}>Jam selesai</label>
              <input type="time" style={inputStyle} value={form.time_end}
                onChange={(e) => setForm({ ...form, time_end: e.target.value })} />
            </div>
          </div>

          <div>
            <label style={{ ...T.label, color: C.textMuted, display: "block", marginBottom: "6px" }}>
              ID Vaksin
            </label>
            <input type="number" style={inputStyle} placeholder="contoh: 1"
              value={form.vaccine_id}
              onChange={(e) => setForm({ ...form, vaccine_id: Number(e.target.value) })} />
          </div>

          <div>
            <label style={{ ...T.label, color: C.textMuted, display: "block", marginBottom: "6px" }}>Lokasi</label>
            <input type="text" style={inputStyle} value={form.location} placeholder="contoh: Posyandu"
              onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>

          <div>
            <label style={{ ...T.label, color: C.textMuted, display: "block", marginBottom: "6px" }}>Total Kuota</label>
            <input type="number" style={inputStyle} value={form.quota} min={1}
              onChange={(e) => setForm({ ...form, quota: Number(e.target.value) })} />
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "22px" }}>
          <button
            style={{
              background: C.border, color: C.textSecondary, border: "none",
              borderRadius: "9px", padding: "9px 20px", ...T.smallMed, cursor: "pointer",
            }}
            onClick={onClose}
          >Batal</button>
          <button
            style={{
              background: C.forest, color: C.tealMid, border: "none",
              borderRadius: "9px", padding: "9px 24px", ...T.smallMed, cursor: "pointer",
            }}
            onClick={handleSave}
          >Simpan</button>
        </div>
      </div>
    </div>
  );
}

/* ── Filter Sheet (mobile) ── */
function FilterSheet({ filterStatus, filterDate, onChange, onClose }) {
  const inputStyle = {
    padding: "9px 12px", borderRadius: "9px", border: `1px solid ${C.border}`,
    background: C.surfaceAlt, fontSize: "13.5px", color: C.textPrimary,
    outline: "none", width: "100%", boxSizing: "border-box", fontFamily: "inherit",
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(6,61,48,0.45)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: C.surface, borderRadius: "20px 20px 0 0", padding: "22px 20px 32px", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <span style={{ ...T.h2, color: C.textPrimary }}>Filter jadwal</span>
          <button style={{ background: C.border, border: "none", width: "28px", height: "28px", borderRadius: "50%", cursor: "pointer", fontSize: "13px", color: C.textSecondary, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>✕</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ ...T.label, color: C.textMuted, display: "block", marginBottom: "6px" }}>Status</label>
            <select style={inputStyle} value={filterStatus} onChange={(e) => onChange("status", e.target.value)}>
              <option value="semua">Semua status</option>
              <option value="tersedia">Tersedia</option>
              <option value="penuh">Penuh</option>
              <option value="nonaktif">Nonaktif</option>
            </select>
          </div>
          <div>
            <label style={{ ...T.label, color: C.textMuted, display: "block", marginBottom: "6px" }}>Tanggal</label>
            <input type="date" style={inputStyle} value={filterDate} onChange={(e) => onChange("date", e.target.value)} />
          </div>
        </div>
        <button
          style={{ background: C.forest, color: C.tealMid, border: "none", borderRadius: "9px", padding: "10px", width: "100%", marginTop: "20px", ...T.smallMed, cursor: "pointer" }}
          onClick={onClose}
        >Terapkan</button>
      </div>
    </div>
  );
}

/* ── Main Component ── */
function KelolaJadwalBidan({ user, onLogout, onNavigate }) {
  const isMobile = useIsMobile();
  const [activeNav, setActiveNav] = useState("Kelola Jadwal");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [filterDate, setFilterDate] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [jadwalList, setJadwalList] = useState([]);
  const [modal, setModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchSchedules();
        setJadwalList(data);
      } catch (err) {
        console.error("Failed to fetch schedules", err);
      }
    }
    load();
  }, []);

  const displayName = user?.name || "Bidan";
  const initials = displayName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() || "BD";

  const navItems = [
    { label: "Beranda",       icon: HomeIcon,     page: "dashboardBidan"    },
    { label: "Kelola Jadwal", icon: CalendarIcon, page: "kelolaJadwalBidan" },
    { label: "Data Anak",     icon: UsersIcon,    page: "dataAnakBidan"     },
    { label: "Profil",        icon: UserIcon,     page: "profilBidan"       },
  ];

  const filtered = jadwalList.filter((j) => {
    const matchStatus = filterStatus === "semua" || j.status === filterStatus;
    const matchDate   = !filterDate || j.date === filterDate;
    return matchStatus && matchDate;
  });

  const handleSave = async (data) => {
    try {
      if (modal.mode === "add") {
        const newJadwal = await createSchedule(data);
        setJadwalList((prev) => [...prev, newJadwal]);
      } else {
        const updated = await updateSchedule(modal.data.id, data);
        setJadwalList((prev) => prev.map((j) => j.id === modal.data.id ? updated : j));
      }
      setModal(null);
    } catch (err) {
      alert("Gagal menyimpan jadwal: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSchedule(id);
      setJadwalList((prev) => prev.filter((j) => j.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      alert("Gagal menghapus jadwal: " + err.message);
    }
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

  /* ── Shared card renderer ── */
  const renderCard = (j) => {
    // Determine status purely conceptually or assume "tersedia" for now
    const status = j.quota > 0 ? "tersedia" : "penuh";
    const badge    = statusConfig[status] || statusConfig.tersedia;
    const slotSisa = j.quota; // Assuming quota is remaining slot for now
    const slotPct  = Math.round((1 - j.quota / (j.quota || 1)) * 100);

    return (
      <div key={j.id} style={{
        background: C.surface,
        borderRadius: "14px",
        border: `1px solid ${C.border}`,
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(6,61,48,0.05)",
      }}>
        {/* Card head */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: `1px solid ${C.border}`,
          background: C.surfaceAlt,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "9px",
              background: C.tealLight, color: C.teal,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <CalendarIcon />
            </div>
            <span style={{ ...T.bodyMed, color: C.textPrimary }}>
              {isMobile ? formatDateShort(j.date) : formatDate(j.date)}
            </span>
          </div>
          <div style={{
            ...T.xs,
            background: badge.bg, color: badge.color,
            padding: "4px 12px", borderRadius: "20px",
          }}>
            {badge.label}
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* Waktu */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ ...T.label, color: C.textMuted, width: "80px", flexShrink: 0 }}>Waktu</span>
            <span style={{ ...T.small, color: C.textPrimary }}>{j.time_start} – {j.time_end}</span>
          </div>

          {/* Imunisasi */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <span style={{ ...T.label, color: C.textMuted, width: "80px", flexShrink: 0, paddingTop: "2px" }}>Imunisasi</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", flex: 1 }}>
              <span style={{
                ...T.xs, background: C.blueSoft, color: C.blue,
                padding: "3px 10px", borderRadius: "20px",
              }}>ID: {j.vaccine_id}</span>
            </div>
          </div>

          {/* Slot */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <span style={{ ...T.label, color: C.textMuted, width: "80px", flexShrink: 0, paddingTop: "2px" }}>Slot</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <span style={{ ...T.small, color: C.textPrimary }}>Kuota: {j.quota}</span>
              </div>
            </div>
          </div>

          {/* Lokasi */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <span style={{ ...T.label, color: C.textMuted, width: "80px", flexShrink: 0 }}>Lokasi</span>
            <span style={{ ...T.small, color: C.textSecondary, flex: 1 }}>{j.location}</span>
          </div>
        </div>

        {/* Card actions */}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "12px 18px",
          borderTop: `1px solid ${C.border}`,
          background: C.surfaceAlt,
        }}>
          <div style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
            <button
              title="Edit"
              style={{
                background: C.tealLight, color: C.teal, border: "none",
                borderRadius: "8px", width: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}
              onClick={() => setModal({ mode: "edit", data: j })}
            >
              <EditIcon />
            </button>
            <button
              title="Hapus"
              style={{
                background: "#FFE4E6", color: C.rose, border: "none",
                borderRadius: "8px", width: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}
              onClick={() => setDeleteConfirm(j.id)}
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* ── Delete confirm modal ── */
  const DeleteModal = () => (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(6,61,48,0.45)",
      display: "flex", alignItems: isMobile ? "flex-end" : "center",
      justifyContent: "center", zIndex: 1000, padding: isMobile ? 0 : "1rem",
    }}>
      <div style={{
        background: C.surface, borderRadius: isMobile ? "20px 20px 0 0" : "18px",
        padding: "24px", width: "100%", maxWidth: isMobile ? "100%" : "380px",
        boxShadow: "0 8px 40px rgba(6,61,48,0.18)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "#FFE4E6", color: C.rose,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <AlertIcon />
          </div>
          <h3 style={{ ...T.h2, color: C.textPrimary, margin: 0 }}>Hapus jadwal?</h3>
        </div>
        <p style={{ ...T.small, color: C.textMuted, margin: "0 0 22px" }}>
          Tindakan ini tidak dapat dibatalkan. Yakin ingin menghapus jadwal ini?
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={{ flex: 1, background: C.border, color: C.textSecondary, border: "none", borderRadius: "9px", padding: "9px", ...T.smallMed, cursor: "pointer" }}
            onClick={() => setDeleteConfirm(null)}
          >Batal</button>
          <button
            style={{ flex: 1, background: C.rose, color: "white", border: "none", borderRadius: "9px", padding: "9px", ...T.smallMed, cursor: "pointer" }}
            onClick={() => handleDelete(deleteConfirm)}
          >Hapus</button>
        </div>
      </div>
    </div>
  );

  /* ── MOBILE LAYOUT ── */
  if (isMobile) {
    const activeFilters = (filterStatus !== "semua" ? 1 : 0) + (filterDate ? 1 : 0);
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.pageBg, fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", fontSize: "13.5px", color: C.textPrimary }}>

        {/* Topbar */}
        <header style={{
          height: "56px", background: C.surface, borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 16px", flexShrink: 0, position: "sticky", top: 0, zIndex: 100,
          boxShadow: "0 1px 0 rgba(6,61,48,0.04)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              style={{ background: C.tealLight, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "8px", color: C.teal, flexShrink: 0 }}
              onClick={() => onNavigate && onNavigate("dashboardBidan")}
            >
              <ArrowLeft />
            </button>
            <span style={{ ...T.bodyMed, color: C.textPrimary }}>Kelola Jadwal</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: "6px", borderRadius: "8px", color: C.textSecondary, display: "flex", alignItems: "center" }}>
              <BellIcon />
              <span style={{ position: "absolute", top: "4px", right: "4px", width: "7px", height: "7px", borderRadius: "50%", background: C.rose, border: "1.5px solid white" }} />
            </button>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: `linear-gradient(135deg, ${C.teal}, ${C.forestMid})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: "700" }}>
              {initials}
            </div>
          </div>
        </header>

        {/* Action bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          padding: "12px 16px",
          background: C.surface, borderBottom: `1px solid ${C.border}`,
        }}>
          <button
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: C.tealLight, color: C.teal, border: "none",
              borderRadius: "8px", padding: "7px 12px", ...T.xs, cursor: "pointer",
              position: "relative",
            }}
            onClick={() => setShowFilter(true)}
          >
            <FilterIcon /><span>Filter</span>
            {activeFilters > 0 && (
              <span style={{ background: C.forest, color: C.tealMid, fontSize: "9px", width: "14px", height: "14px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {activeFilters}
              </span>
            )}
          </button>
          <span style={{ ...T.xs, color: C.textMuted, flex: 1 }}>{filtered.length} jadwal</span>
          <button
            style={{ background: C.forest, color: C.tealMid, border: "none", borderRadius: "9px", padding: "7px 16px", ...T.smallMed, cursor: "pointer" }}
            onClick={() => setModal({ mode: "add" })}
          >+ Tambah</button>
        </div>

        {/* List */}
        <main style={{ flex: 1, padding: "16px", display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "80px" }}>
          {filtered.length === 0 ? (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              padding: "40px 24px", gap: "12px",
              background: C.surfaceAlt, borderRadius: "12px",
              border: `1.5px dashed ${C.border}`,
            }}>
              <div style={{ color: C.borderStrong }}><CalendarIcon /></div>
              <div style={{ ...T.h2, color: C.textSecondary }}>Tidak ada jadwal</div>
              <div style={{ ...T.small, color: C.textMuted, textAlign: "center" }}>Tidak ada jadwal yang sesuai filter.</div>
            </div>
          ) : filtered.map(renderCard)}
        </main>

        {/* Bottom nav */}
        <nav style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: C.surface, borderTop: `1px solid ${C.border}`,
          display: "flex", zIndex: 100,
        }}>
          {navItems.map(({ label, icon: Icon, page }) => {
            const isActive = activeNav === label;
            return (
              <button key={label}
                style={{
                  flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                  justifyContent: "center", padding: "8px 4px",
                  border: "none", background: isActive ? C.tealSoft : "transparent",
                  cursor: "pointer", gap: "2px",
                }}
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

        {showFilter && <FilterSheet filterStatus={filterStatus} filterDate={filterDate} onChange={(key, val) => key === "status" ? setFilterStatus(val) : setFilterDate(val)} onClose={() => setShowFilter(false)} />}
        {modal && <JadwalModal mode={modal.mode} initialData={modal.data} onClose={() => setModal(null)} onSave={handleSave} isMobile={true} />}
        {deleteConfirm && <DeleteModal />}
      </div>
    );
  }

  /* ── DESKTOP LAYOUT ── */
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.pageBg, fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", fontSize: "13.5px", color: C.textPrimary }}>

      {/* ── SIDEBAR (sama persis dengan DashboardBidan) ── */}
      <aside style={{
        width: "208px", flexShrink: 0,
        background: C.sidebarBg,
        display: "flex", flexDirection: "column",
        position: "sticky", top: 0, height: "100vh",
      }}>
        {/* Logo */}
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
                  transition: "all 0.15s", textAlign: "left",
                }}
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

        {/* Logout */}
        <div style={{ padding: "12px 10px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "9px 12px", borderRadius: "9px",
              border: "none", cursor: "pointer", width: "100%",
              fontSize: "13px", fontWeight: "400",
              background: "transparent", color: "rgba(255,255,255,0.4)",
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

      {/* ── CONTENT ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Topbar */}
        <header style={{
          height: "56px", background: C.surface, borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 28px", flexShrink: 0,
          boxShadow: "0 1px 0 rgba(6,61,48,0.04)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ ...T.label, color: C.textMuted }}>Kelola Jadwal</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: "6px", borderRadius: "8px", color: C.textSecondary, display: "flex", alignItems: "center" }}>
              <BellIcon />
              <span style={{ position: "absolute", top: "4px", right: "4px", width: "7px", height: "7px", borderRadius: "50%", background: C.rose, border: "1.5px solid white" }} />
            </button>
            <div style={{
              display: "flex", alignItems: "center", gap: "9px",
              padding: "5px 12px 5px 5px",
              background: C.tealSoft, borderRadius: "40px",
              border: `1px solid ${C.border}`,
            }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: `linear-gradient(135deg, ${C.teal}, ${C.forestMid})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: "700" }}>
                {initials}
              </div>
              <span style={{ fontSize: "13px", fontWeight: "600", color: C.textPrimary }}>{displayName}</span>
            </div>
          </div>
        </header>

        {/* Main */}
        <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: "20px", overflowY: "auto", maxWidth: "1100px", width: "100%" }}>

          {/* Page heading */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              style={{ background: C.tealLight, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", color: C.teal, flexShrink: 0 }}
              onClick={() => onNavigate && onNavigate("dashboardBidan")}
            >
              <ArrowLeft />
            </button>
            <div style={{ flex: 1 }}>
              <h1 style={{ ...T.hero, color: C.textPrimary, margin: "0 0 2px" }}>Kelola Jadwal</h1>
              <p style={{ ...T.small, color: C.textMuted, margin: 0 }}>Kelola jadwal pelayanan imunisasi puskesmas</p>
            </div>
            <button
              style={{ background: C.forest, color: C.tealMid, border: "none", borderRadius: "10px", padding: "10px 20px", ...T.smallMed, cursor: "pointer" }}
              onClick={() => setModal({ mode: "add" })}
            >+ Tambah jadwal</button>
          </div>

          {/* Two-col layout */}
          <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>

            {/* Filter panel */}
            <div style={{
              background: C.surface, borderRadius: "14px",
              border: `1px solid ${C.border}`,
              padding: "18px 20px",
              width: "220px", flexShrink: 0,
              boxShadow: "0 1px 4px rgba(6,61,48,0.05)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
                <div style={{ width: "26px", height: "26px", borderRadius: "7px", background: C.tealLight, color: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FilterIcon />
                </div>
                <span style={{ ...T.bodyMed, color: C.textPrimary }}>Filter jadwal</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ ...T.label, color: C.textMuted, display: "block", marginBottom: "6px" }}>Status</label>
                  <select
                    style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: `1px solid ${C.border}`, background: C.surfaceAlt, fontSize: "12.5px", color: C.textPrimary, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                    value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="semua">Semua status</option>
                    <option value="tersedia">Tersedia</option>
                    <option value="penuh">Penuh</option>
                    <option value="nonaktif">Nonaktif</option>
                  </select>
                </div>
                <div>
                  <label style={{ ...T.label, color: C.textMuted, display: "block", marginBottom: "6px" }}>Tanggal</label>
                  <input
                    type="date"
                    style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: `1px solid ${C.border}`, background: C.surfaceAlt, fontSize: "12.5px", color: C.textPrimary, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                    value={filterDate} onChange={(e) => setFilterDate(e.target.value)}
                  />
                </div>
                {(filterStatus !== "semua" || filterDate) && (
                  <button
                    style={{ width: "100%", background: "none", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "7px", ...T.xs, color: C.textMuted, cursor: "pointer" }}
                    onClick={() => { setFilterStatus("semua"); setFilterDate(""); }}
                  >Reset filter</button>
                )}
              </div>
            </div>

            {/* List panel */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Section header */}
              <div style={{
                background: C.surface, borderRadius: "14px",
                border: `1px solid ${C.border}`,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 20px",
                boxShadow: "0 1px 4px rgba(6,61,48,0.05)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: C.tealLight, color: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CalendarIcon />
                  </div>
                  <span style={{ ...T.h2, color: C.textPrimary }}>Daftar jadwal</span>
                </div>
                <div style={{ ...T.xs, background: C.tealLight, color: C.teal, padding: "4px 12px", borderRadius: "20px" }}>
                  {filtered.length} jadwal
                </div>
              </div>

              {filtered.length === 0 ? (
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  padding: "40px 24px", gap: "12px",
                  background: C.surfaceAlt, borderRadius: "14px",
                  border: `1.5px dashed ${C.border}`,
                }}>
                  <div style={{ color: C.borderStrong }}><CalendarIcon /></div>
                  <div style={{ ...T.h2, color: C.textSecondary }}>Tidak ada jadwal</div>
                  <div style={{ ...T.small, color: C.textMuted }}>Tidak ada jadwal yang sesuai filter yang dipilih.</div>
                </div>
              ) : filtered.map(renderCard)}
            </div>
          </div>
        </main>
      </div>

      {modal && <JadwalModal mode={modal.mode} initialData={modal.data} onClose={() => setModal(null)} onSave={handleSave} isMobile={false} />}
      {deleteConfirm && <DeleteModal />}
    </div>
  );
}

export default KelolaJadwalBidan;