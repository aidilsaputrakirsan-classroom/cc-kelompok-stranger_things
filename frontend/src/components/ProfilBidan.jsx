import { useState } from "react";

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
function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
}
function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M12 15.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={PINK}>
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </svg>
  );
}
function DeviceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={PINK}>
      <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z" />
    </svg>
  );
}
function ActivityIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={PINK}>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#bbb">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={PINK}>
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

const PINK = "#e91e63";
const PINK_LIGHT = "#fce4ec";

function ProfilBidan({ user, onLogout, onNavigate }) {
  const [activeNav, setActiveNav] = useState("Profil");
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    namaLengkap: "Aisyah",
    peran: "Bidan",
    email: "aisyah@puskesmas.go.id",
    telepon: "0812 3456 7890",
    tanggalLahir: "15/03/1992",
    jenisKelamin: "Perempuan",
    alamat: "Jl. Sehat No. 12, Kecamatan Sukajadi, Kota Bandung, Jawa Barat",
    tentang: "Bidan di Puskesmas Sehat. Berkomitmen membantu kesehatan ibu dan anak.",
  });
  const [saved, setSaved] = useState({ ...form });

const navItems = [
  { label: "Beranda",                 icon: HomeIcon,     page: "dashboardBidan"    },
  { label: "Kelola Jadwal Imunisasi", icon: CalendarIcon, page: "kelolaJadwalBidan" },
  { label: "Data Anak Imunisasi",     icon: PersonIcon,   page: "dataAnakBidan"     },
  { label: "Profil",                  icon: ProfileIcon,  page: "profilBidan"       },
];

  const handleSave = () => {
    setSaved({ ...form });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm({ ...saved });
    setIsEditing(false);
  };

  const Field = ({ label, value, onChange, type = "text", readOnly = false, fullWidth = false, isSelect = false, options = [], isTextarea = false }) => (
    <div style={{ ...fs.field, ...(fullWidth ? fs.fieldFull : {}) }}>
      <label style={fs.label}>{label}</label>
      {isTextarea ? (
        <div style={{ position: "relative" }}>
          <textarea
            style={{ ...fs.input, ...fs.textarea, ...(readOnly ? fs.inputReadOnly : {}) }}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            maxLength={200}
            rows={4}
          />
          <span style={fs.charCount}>{value.length}/200</span>
        </div>
      ) : isSelect ? (
        <div style={{ position: "relative" }}>
          <select
            style={{ ...fs.input, ...(readOnly ? fs.inputReadOnly : {}), appearance: "none", paddingRight: "36px" }}
            value={value}
            onChange={onChange}
            disabled={readOnly}
          >
            {options.map((o) => <option key={o}>{o}</option>)}
          </select>
          {!readOnly && (
            <span style={fs.selectArrow}>▾</span>
          )}
        </div>
      ) : type === "date-display" ? (
        <div style={{ position: "relative" }}>
          <input
            style={{ ...fs.input, ...(readOnly ? fs.inputReadOnly : {}), paddingRight: "40px" }}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
          />
          {!readOnly && (
            <span style={fs.calIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#bbb">
                <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
              </svg>
            </span>
          )}
        </div>
      ) : (
        <input
          type={type}
          style={{ ...fs.input, ...(readOnly ? fs.inputReadOnly : {}) }}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
        />
      )}
    </div>
  );

  return (
    <div style={s.root}>
      {/* SIDEBAR */}
      <aside style={s.sidebar}>
        <div style={s.logoArea}>
          <div style={s.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" fill="#e91e63" />
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
              <span style={s.topbarName}>Aisyah</span>
              <span style={s.topbarChevron}>▾</span>
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main style={s.main}>
          {/* Page heading */}
          <div style={s.pageHeadingBlock}>
            <h1 style={s.pageTitle}>Profil Saya</h1>
            <p style={s.pageSubtitle}>Kelola informasi akun dan preferensi Anda</p>
          </div>

          <div style={s.twoCol}>
            {/* LEFT COLUMN */}
            <div style={s.leftCol}>

              {/* Avatar card */}
              <div style={s.avatarCard}>
                {/* Decorative blobs */}
                <div style={s.blobTopRight} />
                <div style={s.blobBottomLeft} />

                <div style={s.avatarWrap}>
                  <div style={s.avatarCircle}>
                    <div style={s.avatarPlaceholder}>
                      <PersonIcon />
                    </div>
                    <button style={s.cameraBtn}><CameraIcon /></button>
                  </div>
                </div>

                <div style={s.avatarInfo}>
                  <div style={s.avatarName}>{saved.namaLengkap}</div>
                  <div style={s.avatarRoleBadge}>
                    <ProfileIcon />
                    <span>{saved.peran}</span>
                  </div>
                  <div style={s.avatarSub}>Petugas Kesehatan</div>
                  <div style={s.avatarSub}>Puskesmas Sehat</div>
                </div>

                <button style={s.editFotoBtn}>
                  <EditIcon />
                  Edit Foto
                </button>
              </div>

              {/* Personal info card */}
              <div style={s.infoCard}>
                <div style={s.infoCardHeader}>
                  <div style={s.infoCardTitle}>
                    <span style={s.infoTitleIcon}><PersonIcon /></span>
                    <span style={s.infoTitleText}>Informasi Pribadi</span>
                  </div>
                  {!isEditing ? (
                    <button style={s.editBtn} onClick={() => setIsEditing(true)}>
                      <EditIcon />
                      Edit
                    </button>
                  ) : (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button style={s.cancelBtn} onClick={handleCancel}>Batal</button>
                      <button style={s.saveBtn} onClick={handleSave}>Simpan</button>
                    </div>
                  )}
                </div>

                <div style={fs.formGrid}>
                  <Field label="Nama Lengkap" value={form.namaLengkap}
                    onChange={(e) => setForm({ ...form, namaLengkap: e.target.value })}
                    readOnly={!isEditing} />
                  <Field label="Peran" value={form.peran}
                    onChange={(e) => setForm({ ...form, peran: e.target.value })}
                    readOnly={!isEditing} isSelect
                    options={["Bidan", "Dokter", "Perawat", "Admin"]} />
                  <Field label="Email" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    readOnly={!isEditing} type="email" />
                  <Field label="Nomor Telepon" value={form.telepon}
                    onChange={(e) => setForm({ ...form, telepon: e.target.value })}
                    readOnly={!isEditing} />
                  <Field label="Tanggal Lahir" value={form.tanggalLahir}
                    onChange={(e) => setForm({ ...form, tanggalLahir: e.target.value })}
                    readOnly={!isEditing} type="date-display" />
                  <Field label="Jenis Kelamin" value={form.jenisKelamin}
                    onChange={(e) => setForm({ ...form, jenisKelamin: e.target.value })}
                    readOnly={!isEditing} isSelect
                    options={["Perempuan", "Laki-laki"]} />
                  <Field label="Alamat" value={form.alamat}
                    onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                    readOnly={!isEditing} fullWidth />
                  <Field label="Tentang Saya" value={form.tentang}
                    onChange={(e) => setForm({ ...form, tentang: e.target.value })}
                    readOnly={!isEditing} fullWidth isTextarea />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div style={s.rightCol}>

              {/* Account info card */}
              <div style={s.sideCard}>
                <div style={s.sideCardHeader}>
                  <span style={s.sideCardIcon}><ProfileIcon /></span>
                  <span style={s.sideCardTitle}>Informasi Akun</span>
                </div>

                <div style={s.accountRow}>
                  <div style={s.accountLabel}>Username</div>
                  <div style={s.accountValue}>aisyah.bidan</div>
                </div>
                <div style={s.accountDivider} />

                <div style={s.accountRow}>
                  <div style={s.accountLabel}>Email</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <div style={s.accountValue}>aisyah@puskesmas.go.id</div>
                    <div style={s.verifiedBadge}>
                      <CheckIcon />
                      Terverifikasi
                    </div>
                  </div>
                </div>
                <div style={s.accountDivider} />

                <div style={s.accountRow}>
                  <div style={s.accountLabel}>Bergabung Sejak</div>
                  <div style={s.accountValue}>12 Januari 2024</div>
                </div>
                <div style={s.accountDivider} />

                <div style={s.accountRow}>
                  <div style={s.accountLabel}>Terakhir Login</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={s.accountValue}>29 Juli 2025, 08:45 WIB</div>
                    <div style={s.activeBadge}>● Aktif</div>
                  </div>
                </div>
              </div>

              {/* Security card */}
              <div style={s.sideCard}>
                <div style={s.sideCardHeader}>
                  <span style={s.sideCardIcon}><ShieldIcon /></span>
                  <span style={s.sideCardTitle}>Keamanan Akun</span>
                </div>

                {[
                  { icon: <LockIcon />, title: "Ubah Kata Sandi", sub: "Perbarui kata sandi akun Anda" },
                  { icon: <DeviceIcon />, title: "Kelola Perangkat", sub: "Lihat perangkat yang terhubung" },
                  { icon: <ActivityIcon />, title: "Aktivitas Akun", sub: "Riwayat aktivitas login akun Anda" },
                ].map((item, idx) => (
                  <button key={idx} style={s.securityRow}>
                    <div style={s.securityIconWrap}>{item.icon}</div>
                    <div style={s.securityText}>
                      <div style={s.securityTitle}>{item.title}</div>
                      <div style={s.securitySub}>{item.sub}</div>
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
    gap: "1.5rem",
    overflowY: "auto",
  },
  pageHeadingBlock: {},
  pageTitle: { margin: "0 0 4px", fontSize: "26px", fontWeight: "800", color: "#1a1a2e" },
  pageSubtitle: { margin: 0, fontSize: "14px", color: "#888" },

  twoCol: { display: "flex", gap: "1.5rem", alignItems: "flex-start" },
  leftCol: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "1.2rem" },
  rightCol: { width: "300px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "1.2rem" },

  /* Avatar card */
  avatarCard: {
    background: PINK_LIGHT,
    borderRadius: "20px",
    padding: "1.8rem 2rem",
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    position: "relative",
    overflow: "hidden",
    minHeight: "140px",
  },
  blobTopRight: {
    position: "absolute",
    top: "-30px",
    right: "-30px",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "rgba(233,30,99,0.12)",
    pointerEvents: "none",
  },
  blobBottomLeft: {
    position: "absolute",
    bottom: "-40px",
    left: "160px",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "rgba(233,30,99,0.08)",
    pointerEvents: "none",
  },
  avatarWrap: { flexShrink: 0, zIndex: 1 },
  avatarCircle: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  avatarPlaceholder: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: PINK_LIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: PINK,
    fontSize: "32px",
  },
  cameraBtn: {
    position: "absolute",
    bottom: "2px",
    right: "2px",
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    background: PINK,
    border: "2px solid white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  avatarInfo: { flex: 1, zIndex: 1 },
  avatarName: { fontWeight: "800", fontSize: "22px", color: "#1a1a2e", marginBottom: "6px" },
  avatarRoleBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    background: "white",
    color: PINK,
    fontWeight: "700",
    fontSize: "13px",
    padding: "4px 12px",
    borderRadius: "20px",
    marginBottom: "8px",
  },
  avatarSub: { fontSize: "13px", color: "#666", lineHeight: 1.6 },
  editFotoBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "white",
    color: PINK,
    border: `1.5px solid ${PINK}`,
    borderRadius: "12px",
    padding: "9px 18px",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer",
    flexShrink: 0,
    zIndex: 1,
  },

  /* Info card */
  infoCard: {
    background: "white",
    borderRadius: "20px",
    padding: "1.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  infoCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.4rem",
  },
  infoCardTitle: { display: "flex", alignItems: "center", gap: "10px" },
  infoTitleIcon: { color: PINK, display: "flex", alignItems: "center" },
  infoTitleText: { fontWeight: "800", fontSize: "17px", color: "#1a1a2e" },
  editBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "white",
    color: PINK,
    border: `1.5px solid ${PINK}`,
    borderRadius: "10px",
    padding: "7px 16px",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#f5f5f5",
    color: "#555",
    border: "none",
    borderRadius: "10px",
    padding: "7px 16px",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer",
  },
  saveBtn: {
    background: PINK,
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "7px 20px",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer",
  },

  /* Side cards */
  sideCard: {
    background: "white",
    borderRadius: "20px",
    padding: "1.4rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  sideCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "1.2rem",
  },
  sideCardIcon: { color: PINK, display: "flex", alignItems: "center" },
  sideCardTitle: { fontWeight: "800", fontSize: "16px", color: "#1a1a2e" },

  accountRow: { padding: "10px 0", display: "flex", flexDirection: "column", gap: "4px" },
  accountDivider: { height: "1px", background: "#f5f5f5" },
  accountLabel: { fontSize: "12px", color: "#aaa", fontWeight: "500" },
  accountValue: { fontSize: "14px", color: "#1a1a2e", fontWeight: "600" },
  verifiedBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    background: "#2e7d32",
    color: "white",
    fontSize: "11px",
    fontWeight: "700",
    padding: "3px 8px",
    borderRadius: "20px",
  },
  activeBadge: {
    fontSize: "12px",
    color: "#2e7d32",
    fontWeight: "700",
  },

  securityRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "12px 0",
    background: "none",
    border: "none",
    borderBottom: "1px solid #f5f5f5",
    cursor: "pointer",
    textAlign: "left",
  },
  securityIconWrap: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    background: PINK_LIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  securityText: { flex: 1 },
  securityTitle: { fontWeight: "700", fontSize: "14px", color: "#1a1a2e" },
  securitySub: { fontSize: "12px", color: "#aaa", marginTop: "2px" },
};

/* ── Form styles ── */
const fs = {
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  fieldFull: { gridColumn: "1 / -1" },
  label: { fontSize: "13px", fontWeight: "600", color: "#555" },
  input: {
    padding: "11px 14px",
    borderRadius: "10px",
    border: "1.5px solid #f0e0e8",
    background: "white",
    fontSize: "14px",
    color: "#333",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  inputReadOnly: {
    background: "#fafafa",
    border: "1.5px solid #f5f5f5",
    color: "#555",
    cursor: "default",
  },
  textarea: {
    resize: "none",
    lineHeight: 1.6,
    paddingBottom: "24px",
  },
  charCount: {
    position: "absolute",
    bottom: "10px",
    right: "12px",
    fontSize: "11px",
    color: "#bbb",
  },
  selectArrow: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#bbb",
    pointerEvents: "none",
    fontSize: "12px",
  },
  calIcon: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
  },
};

export default ProfilBidan;