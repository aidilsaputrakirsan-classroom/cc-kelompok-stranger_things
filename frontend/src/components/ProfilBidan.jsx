import { useState } from "react";

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
  green:         "#16A34A",
  greenLight:    "#DCFCE7",
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
const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const DeviceIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);
const ActivityIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* ── Helpers ── */
function getInitials(name = "") {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function formatTanggalPanjang(raw = "") {
  if (!raw) return "-";
  const d = new Date(raw);
  if (isNaN(d)) return raw;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function resolveRole(u) {
  const raw = u.peran || u.role || "";
  if (raw === "midwife") return "Bidan";
  if (raw === "doctor")  return "Dokter";
  if (raw === "nurse")   return "Perawat";
  if (raw === "admin")   return "Admin";
  return raw || "Bidan";
}

/* ── Input style ── */
const inputBase = {
  padding: "9px 12px",
  borderRadius: "9px",
  border: `1px solid ${C.border}`,
  background: C.surfaceAlt,
  fontSize: "13px",
  color: C.textPrimary,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "inherit",
};
const inputReadOnly = {
  ...inputBase,
  background: C.pageBg,
  border: `1px solid ${C.border}`,
  color: C.textSecondary,
  cursor: "default",
};

/* ── Field component ── */
function Field({ label, value, onChange, type = "text", readOnly = false, fullWidth = false, isSelect = false, options = [] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px", ...(fullWidth ? { gridColumn: "1 / -1" } : {}) }}>
      <label style={{ ...T.label, color: C.textMuted }}>{label}</label>
      {isSelect ? (
        <div style={{ position: "relative" }}>
          <select
            style={{ ...(readOnly ? inputReadOnly : inputBase), appearance: "none", paddingRight: "28px" }}
            value={value} onChange={onChange} disabled={readOnly}
          >
            {options.map((o) => <option key={o}>{o}</option>)}
          </select>
          {!readOnly && (
            <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: C.textMuted, pointerEvents: "none", fontSize: "10px" }}>▾</span>
          )}
        </div>
      ) : (
        <input
          type={type}
          style={readOnly ? inputReadOnly : inputBase}
          value={value} onChange={onChange} readOnly={readOnly}
        />
      )}
    </div>
  );
}

/* ── Section card header ── */
function CardHeader({ icon, title, action }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 20px",
      borderBottom: `1px solid ${C.border}`,
      background: C.surfaceAlt,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: C.tealLight, color: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
        <span style={{ ...T.h2, color: C.textPrimary }}>{title}</span>
      </div>
      {action}
    </div>
  );
}

/* ── Main Component ── */
function ProfilBidan({ user = {}, onLogout, onNavigate, onUpdateUser }) {
  const [activeNav, setActiveNav] = useState("Profil");
  const [isEditing, setIsEditing] = useState(false);

  const buildForm = (u) => ({
    namaLengkap: u.namaLengkap || u.name       || "",
    peran:       resolveRole(u),
    email:       u.email                        || "",
    strNumber:   u.strNumber || u.str_number    || "",
  });

  const [form, setForm] = useState(() => buildForm(user));
  const [saved, setSaved] = useState(() => buildForm(user));

  const navItems = [
    { label: "Beranda",       icon: HomeIcon,     page: "dashboardBidan"    },
    { label: "Kelola Jadwal", icon: CalendarIcon, page: "kelolaJadwalBidan" },
    { label: "Data Anak",     icon: UsersIcon,    page: "dataAnakBidan"     },
    { label: "Profil",        icon: UserIcon,     page: "profilBidan"       },
  ];

  const handleSave   = () => { setSaved({ ...form }); setIsEditing(false); onUpdateUser && onUpdateUser({ ...user, ...form }); };
  const handleCancel = () => { setForm({ ...saved }); setIsEditing(false); };
  const handleNav    = (label, page) => { setActiveNav(label); onNavigate && onNavigate(page); };

  const initials      = getInitials(saved.namaLengkap || user.name || "");
  const bergabungLabel = formatTanggalPanjang(user.bergabungSejak || user.created_at || "");
  const faskes        = user.faskes || user.clinic_name || "Puskesmas";
  const username      = user.username || (saved.email ? saved.email.split("@")[0] : "-");
  const terakhirLogin = user.last_login_at
    ? formatTanggalPanjang(user.last_login_at)
    : (user.terakhirLogin ? formatTanggalPanjang(user.terakhirLogin) : "-");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.pageBg, fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", fontSize: "13.5px", color: C.textPrimary }}>

      {/* ── SIDEBAR (identik dengan KelolaJadwalBidan) ── */}
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

      {/* ── CONTENT ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Topbar */}
        <header style={{ height: "56px", background: C.surface, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0, boxShadow: "0 1px 0 rgba(6,61,48,0.04)" }}>
          <span style={{ ...T.label, color: C.textMuted }}>Profil</span>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: "6px", borderRadius: "8px", color: C.textSecondary, display: "flex", alignItems: "center" }}>
              <BellIcon />
              <span style={{ position: "absolute", top: "4px", right: "4px", width: "7px", height: "7px", borderRadius: "50%", background: C.rose, border: "1.5px solid white" }} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "5px 12px 5px 5px", background: C.tealSoft, borderRadius: "40px", border: `1px solid ${C.border}` }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: `linear-gradient(135deg, ${C.teal}, ${C.forestMid})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: "700" }}>
                {initials}
              </div>
              <span style={{ fontSize: "13px", fontWeight: "600", color: C.textPrimary }}>{saved.namaLengkap || user.name || "Bidan"}</span>
            </div>
          </div>
        </header>

        {/* Main */}
        <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: "20px", overflowY: "auto", maxWidth: "1100px", width: "100%" }}>

          {/* Page heading */}
          <div>
            <h1 style={{ ...T.hero, color: C.textPrimary, margin: "0 0 4px" }}>Profil saya</h1>
            <p style={{ ...T.small, color: C.textMuted, margin: 0 }}>Kelola informasi akun dan preferensi Anda</p>
          </div>

          {/* Avatar hero card */}
          <div style={{
            background: C.surface, borderRadius: "14px",
            border: `1px solid ${C.border}`,
            boxShadow: "0 1px 4px rgba(6,61,48,0.05)",
            overflow: "hidden",
          }}>
            <div style={{ background: `linear-gradient(135deg, ${C.forest}, ${C.forestMid})`, padding: "24px 24px 20px", display: "flex", alignItems: "center", gap: "20px" }}>
              {/* Avatar */}
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: `linear-gradient(135deg, ${C.teal}, ${C.tealMid})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "20px", fontWeight: "700", flexShrink: 0, border: "3px solid rgba(255,255,255,0.2)" }}>
                {initials}
              </div>
              <div>
                <div style={{ fontSize: "18px", fontWeight: "700", color: "white", marginBottom: "6px" }}>{saved.namaLengkap || "-"}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ ...T.xs, background: "rgba(255,255,255,0.15)", color: C.tealLight, padding: "3px 12px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "5px" }}>
                    <UserIcon /> {saved.peran}
                  </span>
                  <span style={{ ...T.xs, color: "rgba(255,255,255,0.55)" }}>·</span>
                  <span style={{ ...T.xs, color: "rgba(255,255,255,0.55)" }}>{faskes}</span>
                </div>
              </div>
            </div>
            {/* Quick stats */}
            <div style={{ display: "flex", borderTop: `1px solid ${C.border}` }}>
              {[
                { label: "Username", value: username },
                { label: "Bergabung", value: bergabungLabel !== "-" ? bergabungLabel : "—" },
                { label: "Terakhir login", value: terakhirLogin !== "-" ? terakhirLogin : "—" },
              ].map(({ label, value }, i, arr) => (
                <div key={label} style={{ flex: 1, padding: "14px 20px", borderRight: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ ...T.label, color: C.textMuted, marginBottom: "3px" }}>{label}</div>
                  <div style={{ ...T.smallMed, color: C.textPrimary }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Two-col layout */}
          <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>

            {/* ── LEFT: Informasi pribadi ── */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ background: C.surface, borderRadius: "14px", border: `1px solid ${C.border}`, boxShadow: "0 1px 4px rgba(6,61,48,0.05)", overflow: "hidden" }}>
                <CardHeader
                  icon={<UserIcon />}
                  title="Informasi pribadi"
                  action={
                    !isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        style={{ display: "flex", alignItems: "center", gap: "6px", background: C.tealLight, color: C.forestMid, border: "none", borderRadius: "8px", padding: "6px 14px", ...T.smallMed, cursor: "pointer" }}
                      >
                        <EditIcon /> Edit
                      </button>
                    ) : (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={handleCancel}
                          style={{ background: C.border, color: C.textSecondary, border: "none", borderRadius: "8px", padding: "6px 14px", ...T.smallMed, cursor: "pointer" }}
                        >Batal</button>
                        <button
                          onClick={handleSave}
                          style={{ background: C.forest, color: C.tealMid, border: "none", borderRadius: "8px", padding: "6px 16px", ...T.smallMed, cursor: "pointer" }}
                        >Simpan</button>
                      </div>
                    )
                  }
                />

                <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <Field label="Nama lengkap" value={form.namaLengkap}
                    onChange={e => setForm({ ...form, namaLengkap: e.target.value })} readOnly={!isEditing} />
                  <Field label="Peran" value={form.peran}
                    onChange={e => setForm({ ...form, peran: e.target.value })} readOnly={!isEditing}
                    isSelect options={["Bidan", "Dokter", "Perawat", "Admin"]} />
                  <Field label="Email" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} readOnly={!isEditing} type="email" fullWidth />
                  {(form.strNumber || ["Bidan","Dokter","Perawat"].includes(saved.peran)) && (
                    <Field label="Nomor STR / SIP" value={form.strNumber}
                      onChange={e => setForm({ ...form, strNumber: e.target.value })} readOnly={!isEditing} fullWidth />
                  )}
                </div>
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div style={{ width: "260px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Informasi akun */}
              <div style={{ background: C.surface, borderRadius: "14px", border: `1px solid ${C.border}`, boxShadow: "0 1px 4px rgba(6,61,48,0.05)", overflow: "hidden" }}>
                <CardHeader icon={<ShieldIcon />} title="Informasi akun" />
                <div style={{ padding: "4px 0" }}>
                  {[
                    { label: "Username",       value: username,       extra: null },
                    { label: "Email",          value: saved.email,    verified: !!saved.email },
                    { label: "Bergabung",      value: bergabungLabel },
                    { label: "Terakhir login", value: terakhirLogin,  active: terakhirLogin !== "-" },
                  ].map((row, idx, arr) => (
                    <div key={idx}>
                      <div style={{ padding: "10px 20px" }}>
                        <div style={{ ...T.label, color: C.textMuted, marginBottom: "3px" }}>{row.label}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "7px", flexWrap: "wrap" }}>
                          <span style={{ ...T.smallMed, color: C.textPrimary }}>{row.value || "—"}</span>
                          {row.verified && (
                            <span style={{ ...T.xs, background: C.greenLight, color: C.green, padding: "2px 8px", borderRadius: "20px", display: "inline-flex", alignItems: "center", gap: "3px" }}>
                              <CheckIcon /> Terverifikasi
                            </span>
                          )}
                          {row.active && (
                            <span style={{ ...T.xs, color: C.teal }}>● Aktif</span>
                          )}
                        </div>
                      </div>
                      {idx < arr.length - 1 && <div style={{ height: "1px", background: C.border, margin: "0 20px" }} />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Keamanan akun */}
              <div style={{ background: C.surface, borderRadius: "14px", border: `1px solid ${C.border}`, boxShadow: "0 1px 4px rgba(6,61,48,0.05)", overflow: "hidden" }}>
                <CardHeader icon={<LockIcon />} title="Keamanan akun" />
                <div style={{ padding: "4px 0" }}>
                  {[
                    { icon: LockIcon,     title: "Ubah kata sandi",  sub: "Perbarui kata sandi akun Anda" },
                    { icon: DeviceIcon,   title: "Kelola perangkat", sub: "Lihat perangkat yang terhubung" },
                    { icon: ActivityIcon, title: "Aktivitas akun",   sub: "Riwayat aktivitas login" },
                  ].map(({ icon: Icon, title, sub }, idx, arr) => (
                    <button key={idx}
                      style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "12px 20px", background: "none", border: "none", borderBottom: idx < arr.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer", textAlign: "left" }}
                      onMouseEnter={e => e.currentTarget.style.background = C.surfaceAlt}
                      onMouseLeave={e => e.currentTarget.style.background = "none"}
                    >
                      <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: C.tealLight, color: C.teal, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ ...T.smallMed, color: C.textPrimary }}>{title}</div>
                        <div style={{ ...T.xs, color: C.textMuted, marginTop: "1px" }}>{sub}</div>
                      </div>
                      <span style={{ color: C.textMuted }}><ChevronRightIcon /></span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProfilBidan;