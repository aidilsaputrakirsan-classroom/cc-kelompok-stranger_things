import { useState } from "react";

/* ── Constants (sama dengan KelolaJadwalBidan) ── */
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
function CameraIcon()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 15.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>; }
function LockIcon()     { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>; }
function DeviceIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"/></svg>; }
function ActivityIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>; }
function ChevronRightIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="#bbb"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>; }
function CheckIcon()    { return <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>; }

function ProfilBidan({ user, onLogout, onNavigate }) {
  const [activeNav, setActiveNav] = useState("Profil");
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    namaLengkap:  "Aisyah",
    peran:        "Bidan",
    email:        "aisyah@puskesmas.go.id",
    telepon:      "0812 3456 7890",
    tanggalLahir: "15/03/1992",
    jenisKelamin: "Perempuan",
    alamat:       "Jl. Sehat No. 12, Kecamatan Sukajadi, Kota Bandung, Jawa Barat",
    tentang:      "Bidan di Puskesmas Sehat. Berkomitmen membantu kesehatan ibu dan anak.",
  });
  const [saved, setSaved] = useState({ ...form });

  const navItems = [
    { label: "Beranda",       icon: HomeIcon,     page: "dashboardBidan"    },
    { label: "Kelola Jadwal", icon: CalendarIcon, page: "kelolaJadwalBidan" },
    { label: "Data Anak",     icon: PersonIcon,   page: "dataAnakBidan"     },
    { label: "Profil",        icon: ProfileIcon,  page: "profilBidan"       },
  ];

  const handleSave   = () => { setSaved({ ...form }); setIsEditing(false); };
  const handleCancel = () => { setForm({ ...saved }); setIsEditing(false); };
  const handleNav    = (label, page) => { setActiveNav(label); onNavigate && onNavigate(page); };

  /* ── Reusable Field ── */
  const Field = ({ label, value, onChange, type = "text", readOnly = false, fullWidth = false, isSelect = false, options = [], isTextarea = false }) => (
    <div style={{ ...fs.field, ...(fullWidth ? fs.fieldFull : {}) }}>
      <label style={fs.label}>{label}</label>
      {isTextarea ? (
        <div style={{ position: "relative" }}>
          <textarea
            style={{ ...fs.input, ...fs.textarea, ...(readOnly ? fs.inputReadOnly : {}) }}
            value={value} onChange={onChange} readOnly={readOnly} maxLength={200} rows={4}
          />
          <span style={fs.charCount}>{value.length}/200</span>
        </div>
      ) : isSelect ? (
        <div style={{ position: "relative" }}>
          <select
            style={{ ...fs.input, ...(readOnly ? fs.inputReadOnly : {}), appearance: "none", paddingRight: "32px" }}
            value={value} onChange={onChange} disabled={readOnly}
          >
            {options.map((o) => <option key={o}>{o}</option>)}
          </select>
          {!readOnly && <span style={fs.selectArrow}>▾</span>}
        </div>
      ) : (
        <input
          type={type}
          style={{ ...fs.input, ...(readOnly ? fs.inputReadOnly : {}) }}
          value={value} onChange={onChange} readOnly={readOnly}
        />
      )}
    </div>
  );

  return (
    <div style={s.root}>
      {/* ── SIDEBAR ── */}
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

      {/* ── CONTENT ── */}
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
              <h1 style={s.pageTitle}>Profil saya</h1>
              <p style={s.pageSubtitle}>Kelola informasi akun dan preferensi Anda</p>
            </div>
          </div>

          <div style={s.twoCol}>
            {/* ── LEFT COLUMN ── */}
            <div style={s.leftCol}>

              {/* Avatar card */}
              <div style={s.avatarCard}>
                <div style={s.avatarCircle}>
                  <div style={s.avatarInner}><PersonIcon /></div>
                  <button style={s.cameraBtn}><CameraIcon /></button>
                </div>
                <div style={s.avatarInfo}>
                  <div style={s.avatarName}>{saved.namaLengkap}</div>
                  <div style={s.avatarRoleBadge}>
                    <ProfileIcon />
                    <span>{saved.peran}</span>
                  </div>
                  <div style={s.avatarSub}>Petugas Kesehatan · Puskesmas Sehat</div>
                </div>
                <button style={s.editFotoBtn}>
                  <EditIcon />
                  Edit foto
                </button>
              </div>

              {/* Personal info card */}
              <div style={s.infoCard}>
                <div style={s.cardHeader}>
                  <div style={s.cardTitle}>
                    <div style={s.cardTitleIcon}><PersonIcon /></div>
                    <span style={s.cardTitleText}>Informasi pribadi</span>
                  </div>
                  {!isEditing ? (
                    <button style={s.editBtn} onClick={() => setIsEditing(true)}>
                      <EditIcon /> Edit
                    </button>
                  ) : (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button style={s.cancelBtn} onClick={handleCancel}>Batal</button>
                      <button style={s.saveBtn} onClick={handleSave}>Simpan</button>
                    </div>
                  )}
                </div>

                <div style={fs.formGrid}>
                  <Field label="Nama lengkap" value={form.namaLengkap}
                    onChange={(e) => setForm({ ...form, namaLengkap: e.target.value })} readOnly={!isEditing} />
                  <Field label="Peran" value={form.peran}
                    onChange={(e) => setForm({ ...form, peran: e.target.value })} readOnly={!isEditing}
                    isSelect options={["Bidan", "Dokter", "Perawat", "Admin"]} />
                  <Field label="Email" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} readOnly={!isEditing} type="email" />
                  <Field label="Nomor telepon" value={form.telepon}
                    onChange={(e) => setForm({ ...form, telepon: e.target.value })} readOnly={!isEditing} />
                  <Field label="Tanggal lahir" value={form.tanggalLahir}
                    onChange={(e) => setForm({ ...form, tanggalLahir: e.target.value })} readOnly={!isEditing} />
                  <Field label="Jenis kelamin" value={form.jenisKelamin}
                    onChange={(e) => setForm({ ...form, jenisKelamin: e.target.value })} readOnly={!isEditing}
                    isSelect options={["Perempuan", "Laki-laki"]} />
                  <Field label="Alamat" value={form.alamat}
                    onChange={(e) => setForm({ ...form, alamat: e.target.value })} readOnly={!isEditing} fullWidth />
                  <Field label="Tentang saya" value={form.tentang}
                    onChange={(e) => setForm({ ...form, tentang: e.target.value })} readOnly={!isEditing} fullWidth isTextarea />
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div style={s.rightCol}>

              {/* Account info card */}
              <div style={s.sideCard}>
                <div style={s.cardHeader}>
                  <div style={s.cardTitle}>
                    <div style={s.cardTitleIcon}><ProfileIcon /></div>
                    <span style={s.cardTitleText}>Informasi akun</span>
                  </div>
                </div>

                {[
                  { label: "Username",        value: "aisyah.bidan" },
                  { label: "Email",           value: "aisyah@puskesmas.go.id", verified: true },
                  { label: "Bergabung sejak", value: "12 Januari 2024" },
                  { label: "Terakhir login",  value: "29 Juli 2025, 08:45 WIB", active: true },
                ].map((row, idx, arr) => (
                  <div key={idx}>
                    <div style={s.accountRow}>
                      <span style={s.accountLabel}>{row.label}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <span style={s.accountValue}>{row.value}</span>
                        {row.verified && (
                          <span style={s.verifiedBadge}><CheckIcon /> Terverifikasi</span>
                        )}
                        {row.active && (
                          <span style={s.activeBadge}>● Aktif</span>
                        )}
                      </div>
                    </div>
                    {idx < arr.length - 1 && <div style={s.divider} />}
                  </div>
                ))}
              </div>

              {/* Security card */}
              <div style={s.sideCard}>
                <div style={s.cardHeader}>
                  <div style={s.cardTitle}>
                    <div style={s.cardTitleIcon}><ShieldIcon /></div>
                    <span style={s.cardTitleText}>Keamanan akun</span>
                  </div>
                </div>

                {[
                  { icon: LockIcon,     title: "Ubah kata sandi",   sub: "Perbarui kata sandi akun Anda" },
                  { icon: DeviceIcon,   title: "Kelola perangkat",  sub: "Lihat perangkat yang terhubung" },
                  { icon: ActivityIcon, title: "Aktivitas akun",    sub: "Riwayat aktivitas login akun Anda" },
                ].map(({ icon: Icon, title, sub }, idx) => (
                  <button key={idx} style={s.securityRow}>
                    <div style={s.securityIconWrap}><Icon /></div>
                    <div style={s.securityText}>
                      <div style={s.securityTitle}>{title}</div>
                      <div style={s.securitySub}>{sub}</div>
                    </div>
                    <ChevronRightIcon />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ── Styles (mengikuti KelolaJadwalBidan) ── */
const s = {
  root:          { display: "flex", minHeight: "100vh", background: "#f5f7f6", fontFamily: "'Segoe UI', sans-serif", fontSize: "13.5px" },

  /* Sidebar */
  sidebar:       { width: "196px", background: "white", borderRight: "1px solid #f0f0f0", display: "flex", flexDirection: "column", padding: "1.1rem 0", flexShrink: 0 },
  logoArea:      { display: "flex", alignItems: "center", gap: "8px", padding: "0 1rem 1.25rem" },
  logoIcon:      { width: "28px", height: "28px", borderRadius: "7px", background: TEAL_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", color: TEAL_TEXT },
  logoText:      { fontSize: "15px", fontWeight: "700", color: TEAL_TEXT },
  nav:           { display: "flex", flexDirection: "column", gap: "1px", padding: "0 0.6rem", flex: 1 },
  navBtn:        { display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "7px", border: "none", background: "transparent", color: "#888", fontSize: "12.5px", cursor: "pointer", textAlign: "left", width: "100%" },
  navBtnActive:  { background: TEAL_LIGHT, color: TEAL_TEXT, fontWeight: "600" },
  navIcon:       { color: "#bbb", display: "flex", alignItems: "center", flexShrink: 0 },
  navIconActive: { color: TEAL_TEXT },
  sidebarBottom: { padding: "0.75rem 0.6rem 0", borderTop: "1px solid #f5f5f5", marginTop: "auto" },
  logoutBtn:     { display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "7px", border: "none", background: "transparent", color: "#A32D2D", fontSize: "12.5px", cursor: "pointer", width: "100%" },
  logoutIcon:    { color: "#A32D2D", display: "flex", alignItems: "center" },

  /* Content */
  content:       { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
  topbar:        { height: "48px", background: "white", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", flexShrink: 0 },
  topbarRight:   { display: "flex", alignItems: "center", gap: "14px" },
  bellWrap:      { position: "relative", cursor: "pointer", display: "flex", alignItems: "center", color: "#555" },
  bellBadge:     { position: "absolute", top: "-4px", right: "-5px", background: TEAL_MID, color: "white", fontSize: "9px", fontWeight: "700", width: "13px", height: "13px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  topbarUser:    { display: "flex", alignItems: "center", gap: "7px", cursor: "pointer" },
  topbarAvatar:  { width: "28px", height: "28px", borderRadius: "50%", background: TEAL_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", color: TEAL_TEXT, fontSize: "11px", fontWeight: "600" },
  topbarName:    { fontSize: "12.5px", fontWeight: "600", color: "#333" },

  main:          { flex: 1, padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem", overflowY: "auto" },
  pageHeading:   { display: "flex", alignItems: "center", gap: "10px" },
  pageTitle:     { margin: "0 0 1px", fontSize: "17px", fontWeight: "700", color: "#1a1a2e" },
  pageSubtitle:  { margin: 0, fontSize: "11.5px", color: "#888" },

  twoCol:        { display: "flex", gap: "1rem", alignItems: "flex-start" },
  leftCol:       { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "0.85rem" },
  rightCol:      { width: "240px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "0.85rem" },

  /* Avatar card */
  avatarCard:    { background: TEAL_LIGHT, borderRadius: "12px", padding: "1.1rem", display: "flex", alignItems: "center", gap: "1rem" },
  avatarCircle:  { width: "56px", height: "56px", borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 },
  avatarInner:   { width: "40px", height: "40px", borderRadius: "50%", background: TEAL_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", color: TEAL_TEXT },
  cameraBtn:     { position: "absolute", bottom: "1px", right: "1px", width: "20px", height: "20px", borderRadius: "50%", background: TEAL_DARK, border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  avatarInfo:    { flex: 1 },
  avatarName:    { fontWeight: "700", fontSize: "14px", color: "#1a1a2e", marginBottom: "4px" },
  avatarRoleBadge: { display: "inline-flex", alignItems: "center", gap: "4px", background: "white", color: TEAL_TEXT, fontWeight: "600", fontSize: "11.5px", padding: "2px 10px", borderRadius: "20px", marginBottom: "4px" },
  avatarSub:     { fontSize: "11.5px", color: TEAL_TEXT },
  editFotoBtn:   { display: "flex", alignItems: "center", gap: "5px", background: "white", color: TEAL_TEXT, border: `1px solid ${TEAL_TEXT}`, borderRadius: "7px", padding: "6px 12px", fontWeight: "600", fontSize: "12px", cursor: "pointer", flexShrink: 0 },

  /* Cards (sama dengan jadwal card) */
  infoCard:      { background: "white", border: "1px solid #f0f0f0", borderRadius: "12px", padding: "1rem 1.1rem" },
  sideCard:      { background: "white", border: "1px solid #f0f0f0", borderRadius: "12px", padding: "1rem 1.1rem" },
  cardHeader:    { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.9rem", paddingBottom: "0.7rem", borderBottom: "1px solid #f5f5f5" },
  cardTitle:     { display: "flex", alignItems: "center", gap: "7px" },
  cardTitleIcon: { width: "24px", height: "24px", borderRadius: "6px", background: TEAL_LIGHT, color: TEAL_TEXT, display: "flex", alignItems: "center", justifyContent: "center" },
  cardTitleText: { fontSize: "13px", fontWeight: "700", color: "#1a1a2e" },

  /* Buttons */
  editBtn:       { display: "flex", alignItems: "center", gap: "5px", background: TEAL_LIGHT, color: TEAL_TEXT, border: "none", borderRadius: "7px", padding: "5px 12px", fontWeight: "600", fontSize: "12px", cursor: "pointer" },
  cancelBtn:     { background: "#f5f5f5", color: "#555", border: "none", borderRadius: "7px", padding: "5px 12px", fontWeight: "600", fontSize: "12px", cursor: "pointer" },
  saveBtn:       { background: TEAL_DARK, color: "#9FE1CB", border: "none", borderRadius: "7px", padding: "5px 14px", fontWeight: "600", fontSize: "12px", cursor: "pointer" },

  /* Account info */
  accountRow:    { padding: "8px 0", display: "flex", flexDirection: "column", gap: "3px" },
  divider:       { height: "1px", background: "#f5f5f5" },
  accountLabel:  { fontSize: "11px", color: "#aaa", fontWeight: "500" },
  accountValue:  { fontSize: "12.5px", color: "#1a1a2e", fontWeight: "600" },
  verifiedBadge: { display: "inline-flex", alignItems: "center", gap: "3px", background: "#E2EFDA", color: "#3B6D11", fontSize: "10px", fontWeight: "700", padding: "2px 7px", borderRadius: "20px" },
  activeBadge:   { fontSize: "11px", color: "#3B6D11", fontWeight: "700" },

  /* Security */
  securityRow:      { display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "8px 0", background: "none", border: "none", borderBottom: "1px solid #f5f5f5", cursor: "pointer", textAlign: "left" },
  securityIconWrap: { width: "30px", height: "30px", borderRadius: "7px", background: TEAL_LIGHT, color: TEAL_TEXT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  securityText:     { flex: 1 },
  securityTitle:    { fontWeight: "600", fontSize: "12.5px", color: "#1a1a2e" },
  securitySub:      { fontSize: "11.5px", color: "#aaa", marginTop: "1px" },
};

/* ── Form Styles ── */
const fs = {
  formGrid:     { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" },
  field:        { display: "flex", flexDirection: "column", gap: "4px" },
  fieldFull:    { gridColumn: "1 / -1" },
  label:        { fontSize: "11.5px", fontWeight: "600", color: "#555" },
  input:        { padding: "7px 10px", borderRadius: "7px", border: "1px solid #eee", background: "white", fontSize: "12.5px", color: "#333", outline: "none", width: "100%", boxSizing: "border-box", fontFamily: "inherit" },
  inputReadOnly:{ background: "#fafafa", border: "1px solid #f5f5f5", color: "#666", cursor: "default" },
  textarea:     { resize: "none", lineHeight: 1.6, paddingBottom: "20px" },
  charCount:    { position: "absolute", bottom: "8px", right: "10px", fontSize: "10px", color: "#ccc" },
  selectArrow:  { position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#bbb", pointerEvents: "none", fontSize: "11px" },
};

export default ProfilBidan;