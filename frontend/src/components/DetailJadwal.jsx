import { useState, useEffect, useMemo } from "react";
import EditJadwalPage from "../components/EditJadwal";
import {
  fetchImmunizations,
  fetchVaccineTypes,
  createImmunization,
  updateImmunization,
} from "../services/api";

const defaultVaccines = [
  { id: 1, name: "BCG (TBC)" },
  { id: 2, name: "Hepatitis B" },
  { id: 3, name: "DPT (Difteri, Pertusis, Tetanus)" },
  { id: 4, name: "Polio" },
  { id: 5, name: "Hib" },
  { id: 6, name: "Campak" },
  { id: 7, name: "MMR" },
  { id: 8, name: "Influenza" },
  { id: 9, name: "Pneumokokus (PCV)" },
  { id: 10, name: "Rotavirus" },
  { id: 11, name: "Varicella (Cacar Air)" },
  { id: 12, name: "Hepatitis A" },
  { id: 13, name: "Tifoid" },
  { id: 14, name: "Japanese Encephalitis (JE)" },
  { id: 15, name: "Dengue" },
];

// ── Helpers ────────────────────────────────────────────────────────
function hitungUmur(birthDate) {
  if (!birthDate) return "-";
  const lahir = new Date(birthDate);
  const sekarang = new Date();
  const bulan =
    (sekarang.getFullYear() - lahir.getFullYear()) * 12 +
    (sekarang.getMonth() - lahir.getMonth());
  if (bulan < 12) return `${bulan} bulan`;
  return `${Math.floor(bulan / 12)} tahun ${bulan % 12} bulan`;
}

function formatTanggal(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function hitungHariLagi(dateStr) {
  if (!dateStr) return null;
  const target = new Date(dateStr);
  const sekarang = new Date();
  target.setHours(0, 0, 0, 0);
  sekarang.setHours(0, 0, 0, 0);
  const diff = Math.round((target - sekarang) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "hari ini";
  if (diff < 0) return `${Math.abs(diff)} hari lalu`;
  return `${diff} hari lagi`;
}

// ── Notification ────────────────────────────────────────────────────
function useNotification() {
  const [notif, setNotif] = useState({ message: "", type: "success" });
  const showNotif = (message, type = "success") => setNotif({ message, type });
  const closeNotif = () => setNotif({ message: "", type: "success" });
  return { notif, showNotif, closeNotif };
}

function Notification({ message, type = "success", onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message]);

  if (!message) return null;

  const colors = {
    success: { bg: "#e8f5e9", border: "#4caf50", icon: "✅", text: "#2e7d32" },
    error: { bg: "#fce4ec", border: "#e91e8c", icon: "❌", text: "#c62828" },
    info: { bg: "#e3f2fd", border: "#2196f3", icon: "ℹ️", text: "#1565c0" },
  };
  const c = colors[type] ?? colors.success;

  return (
    <>
      <style>{`
        @keyframes slideInNotif {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      <div
        style={{
          ...s.notifWrapper,
          background: c.bg,
          border: `1.5px solid ${c.border}`,
        }}
      >
        <span style={s.notifWrapperIcon}>{c.icon}</span>
        <span style={{ ...s.notifWrapperText, color: c.text }}>{message}</span>
        <button onClick={onClose} style={{ ...s.notifCloseBtn, color: c.text }}>
          ×
        </button>
      </div>
    </>
  );
}

// ── Main Component ──────────────────────────────────────────────────
export default function DetailJadwal({
  onLogout,
  setActivePage,
  selectedChild,
  scheduleData,
}) {
  const { notif, showNotif, closeNotif } = useNotification();
  const [showEditPage, setShowEditPage] = useState(false);
  const [jadwal, setJadwal] = useState(null);
  const [reminderSet, setReminderSet] = useState(false);

  const [immunizations, setImmunizations] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    vaccine_id: "",
    scheduled_date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const child = useMemo(() => {
    return (
      selectedChild ??
      (() => {
        try {
          return JSON.parse(localStorage.getItem("selectedChild"));
        } catch {
          return null;
        }
      })()
    );
  }, [selectedChild]);

  const [loadTrigger, setLoadTrigger] = useState(0);

  const reloadData = () => setLoadTrigger((prev) => prev + 1);

  useEffect(() => {
    if (!child?.id) {
      setJadwal(dummyJadwal);
      return;
    }

    const load = async () => {
      try {
        const [imunData, vacData] = await Promise.all([
          fetchImmunizations(child.id),
          fetchVaccineTypes().catch(() => null),
        ]);
        const vacs =
          !vacData || vacData.length === 0 ? defaultVaccines : vacData;
        setVaccines(vacs);

        const mappedImun = (imunData || []).map((imun) => {
          const vac = vacs.find((v) => v.id === imun.vaccine_id);
          return {
            ...imun,
            vaccine_name: vac?.name || `Vaksin ${imun.vaccine_id}`,
            dose_label: vac?.description || "Jadwal Imunisasi",
            location_name: "UPTD Puskemas Gn. Bahagia",
            address: "Jl. Ruhui Rahayu II No. 789, Balikpapan Selatan",
          };
        });
        setImmunizations(mappedImun);

        if (mappedImun.length > 0) {
          setJadwal(mappedImun[0]);
          setShowAddForm(false);
        } else {
          setJadwal(null);
          setShowAddForm(true);
        }
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    load();
  }, [child?.id, loadTrigger]);

  const handleAddSubmit = async () => {
    if (!newSchedule.vaccine_id || !newSchedule.scheduled_date) {
      showNotif("Isi jenis vaksin dan tanggal", "error");
      return;
    }
    setIsSubmitting(true);
    try {
      await createImmunization({
        child_id: child.id,
        vaccine_id: newSchedule.vaccine_id,
        scheduled_date: newSchedule.scheduled_date,
        status: "pending",
      });
      showNotif("Jadwal imunisasi berhasil ditambahkan!", "success");
      setNewSchedule({ vaccine_id: "", scheduled_date: "" });
      reloadData();
    } catch (err) {
      showNotif("Gagal menambahkan imunisasi: " + err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveEdit = async (updated) => {
    try {
      await updateImmunization(updated.id, {
        scheduled_date: updated.scheduled_date,
        notes: updated.notes,
      });
      showNotif("Perubahan jadwal berhasil disimpan!", "success");
      setShowEditPage(false);
      reloadData();
    } catch (err) {
      showNotif("Gagal menyimpan perubahan: " + err.message, "error");
    }
  };

  const handlePasangPengingat = () => {
    setReminderSet(true);
    showNotif("Pengingat berhasil dipasang! 🔔", "success");
  };

  // Tampilkan halaman edit jika tombol ditekan
  if (showEditPage && jadwal) {
    return (
      <EditJadwalPage
        jadwal={jadwal}
        onSave={handleSaveEdit}
        onBack={() => setShowEditPage(false)}
      />
    );
  }

  if (!jadwal && !showAddForm)
    return (
      <div style={s.loadingWrapper}>
        <p style={s.loadingText}>Memuat data jadwal...</p>
      </div>
    );

  const hariLagi = jadwal ? hitungHariLagi(jadwal.scheduled_date) : null;
  const isUpcoming =
    jadwal &&
    jadwal.scheduled_date &&
    new Date(jadwal.scheduled_date) >= new Date();

  return (
    <div style={s.page}>
      <Notification
        message={notif.message}
        type={notif.type}
        onClose={closeNotif}
      />

      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.logo}>
          ByeBye<span style={s.logoPink}>Virus</span>
        </span>
        <a style={s.navLink} onClick={() => setActivePage?.("home")}>
          Home
        </a>
        <a style={s.navLink} onClick={() => setActivePage?.("jadwal")}>
          Jadwal Imunisasi
        </a>
        <a style={s.navLink} onClick={() => setActivePage?.("faskes")}>
          Faskes Map
        </a>
        <div style={s.avatarBtn} onClick={onLogout} title="Logout">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#e91e8c">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
      </nav>

      {/* Main Content */}
      <div style={s.main}>
        {/* Left Panel */}
        <div style={s.leftPanel}>
          <div style={s.leftCard}>
            <div style={s.leftCardHeader}>
              <span style={s.leftCardTitle}>Jadwal Imunisasi</span>
            </div>
            <div style={s.leftCardBody}>
              <div style={s.leftCardScroll}>
                {immunizations.length === 0 ? (
                  <p
                    style={{
                      textAlign: "center",
                      color: "#888",
                      fontSize: "13px",
                    }}
                  >
                    Belum ada jadwal
                  </p>
                ) : (
                  immunizations.map((imun, idx) => (
                    <div
                      key={idx}
                      style={{
                        ...s.vaccineCard,
                        marginBottom: "10px",
                        borderColor:
                          jadwal?.id === imun.id ? "#e91e8c" : "#fce4ec",
                      }}
                    >
                      <div style={s.vaccineCardTop}>
                        <div style={s.vaccineNameRow}>
                          <span style={s.clockIcon}>🕐</span>
                          <span style={s.vaccineName}>{imun.vaccine_name}</span>
                        </div>
                        <span style={s.validasiTag}>
                          {imun.status === "completed" ? "Selesai" : "Validasi"}
                        </span>
                      </div>
                      <div style={s.vaccineSubtitle}>{imun.dose_label}</div>
                      <div style={s.vaccineInfoRow}>
                        <span>📅</span>
                        <span>
                          {imun.scheduled_date
                            ? new Date(imun.scheduled_date).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "-"}
                        </span>
                      </div>
                      <button
                        style={s.lihatDetailBtn}
                        onClick={() => {
                          setJadwal(imun);
                          setShowAddForm(false);
                          setShowEditPage(false);
                        }}
                      >
                        📋 Lihat Detail
                      </button>
                    </div>
                  ))
                )}
              </div>
              <div style={s.leftCardFooter}>
                <button
                  style={{ ...s.btnPrimary, width: "100%" }}
                  onClick={() => {
                    setJadwal(null);
                    setShowAddForm(true);
                    setShowEditPage(false);
                  }}
                >
                  + Tambah Imunisasi
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div style={s.rightPanel}>
          <div style={s.detailCard}>
            {/* Header */}
            <div style={s.detailHeader}>
              <div style={s.detailTitleRow}>
                <div style={s.detailTitleBar} />
                <h2 style={s.detailTitle}>
                  {showAddForm ? "Tambah Jadwal Imunisasi" : "Detail jadwal"}
                </h2>
              </div>
            </div>

            {showAddForm ? (
              <div style={{ marginTop: "1.5rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "600",
                      marginBottom: "8px",
                      color: "#444",
                    }}
                  >
                    Jenis Vaksin
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "1px solid #e0e0e0",
                    }}
                    value={newSchedule.vaccine_id}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        vaccine_id: e.target.value,
                      })
                    }
                  >
                    <option value="">Pilih jenis vaksin</option>
                    {vaccines.map((v) => (
                      <option key={v.id} value={v.id}>
                        💉 {v.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "600",
                      marginBottom: "8px",
                      color: "#444",
                    }}
                  >
                    Tanggal Imunisasi
                  </label>
                  <input
                    type="date"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "1px solid #e0e0e0",
                    }}
                    value={newSchedule.scheduled_date}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        scheduled_date: e.target.value,
                      })
                    }
                  />
                </div>
                <div style={s.actionRow}>
                  <button
                    style={s.btnPrimary}
                    onClick={handleAddSubmit}
                    disabled={isSubmitting}
                  >
                    💾 Simpan Jadwal
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Notifikasi Banner */}
                {isUpcoming && (
                  <div style={s.notifBanner}>
                    <span style={s.notifBell}>🔔</span>
                    <span style={s.notifText}>
                      Imunisasi berikutnya: {jadwal.vaccine_name ?? "BCG"} –{" "}
                      {jadwal.scheduled_date
                        ? new Date(jadwal.scheduled_date).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )
                        : "-"}
                      {hariLagi ? ` (${hariLagi})` : ""}
                    </span>
                  </div>
                )}

                {/* Two Columns */}
                <div style={s.columnsRow}>
                  {/* Kolom Kiri */}
                  <div style={s.column}>
                    <div style={s.columnDotLine}>
                      <div style={s.columnDotPink} />
                      <div style={s.columnLine} />
                    </div>
                    <div style={s.columnContent}>
                      <h3 style={s.columnTitle}>
                        {jadwal.vaccine_name ?? "BCG"}
                      </h3>
                      <div style={s.infoBox}>
                        {[
                          { label: "Nama", value: child?.name ?? "—" },
                          {
                            label: "Usia",
                            value: hitungUmur(child?.birth_date),
                          },
                          {
                            label: "Vaksin",
                            value: jadwal.vaccine_name ?? "—",
                          },
                          {
                            label: "Tanggal",
                            value: formatTanggal(jadwal.scheduled_date),
                          },
                          {
                            label: "Waktu",
                            value: jadwal.time_start
                              ? `${jadwal.time_start}${jadwal.time_end ? ` - ${jadwal.time_end}` : ""} WIB`
                              : "—",
                          },
                          {
                            label: "Lokasi",
                            value: jadwal.location_name ?? "—",
                          },
                          { label: "Alamat", value: jadwal.address ?? "—" },
                        ].map(({ label, value }) => (
                          <div key={label} style={s.infoRow}>
                            <span style={s.infoLabel}>{label}</span>
                            <span style={s.infoSep}>:</span>
                            <span style={s.infoValue}>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Kolom Kanan */}
                  <div style={s.column}>
                    <div style={s.columnDotLine}>
                      <div style={s.columnDotRed} />
                      <div style={s.columnLine} />
                    </div>
                    <div style={s.columnContent}>
                      <h3 style={s.columnTitle}>Informasi Tambahan</h3>
                      <div style={s.infoBox}>
                        <p style={s.persiapanTitle}>
                          Persiapan sebelum datang :
                        </p>
                        <ul style={s.persiapanList}>
                          <li>Bawa KIA (Kartu Identitas Anak)</li>
                          <li>Bawa KMS (Kartu Menuju Sehat)</li>
                          <li>Pastikan anak dalam kondisi sehat</li>
                          <li>Datang 15 menit sebelum jadwal</li>
                        </ul>
                        {jadwal.notes && (
                          <>
                            <p style={s.catatanTitle}>Catatan :</p>
                            <p style={s.catatanText}>{jadwal.notes}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={s.actionRow}>
                  <button
                    style={reminderSet ? s.btnReminderActive : s.btnSecondary}
                    onClick={handlePasangPengingat}
                    disabled={reminderSet}
                  >
                    🔔{" "}
                    {reminderSet ? "Pengingat Terpasang" : "Pasang pengingat"}
                  </button>
                  <button
                    style={s.btnPrimary}
                    onClick={() => setShowEditPage(true)}
                  >
                    ✏️ Edit jadwal
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Dummy data fallback ─────────────────────────────────────────────
const dummyJadwal = {
  vaccine_name: "BCG",
  dose_label: "Vaksin Tuberkolosis Dosis 3",
  scheduled_date: "2025-07-07",
  time_start: "08.00",
  time_end: "10.00",
  location_name: "UPTD Puskemas Gn. Bahagia",
  address: "Jl. Ruhui Rahayu II No. 789, Balikpapan Selatan",
  notes: "",
};

// ── Styles ──────────────────────────────────────────────────────────
const s = {
  // Loading state
  loadingWrapper: {
    background: "#fff5f8",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  loadingText: {
    color: "#e91e8c",
    fontWeight: "600",
  },

  // Page
  page: {
    background: "#fff5f8",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    color: "#1a1a2e",
    fontSize: "14px",
  },

  // Navbar
  nav: {
    background: "white",
    borderBottom: "0.5px solid #f0c0d0",
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    height: "56px",
  },
  logo: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1a1a2e",
    marginRight: "auto",
  },
  logoPink: { color: "#e91e8c" },
  navLink: {
    fontSize: "14px",
    color: "#888",
    cursor: "pointer",
    textDecoration: "none",
  },
  avatarBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#fce4ec",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginLeft: "auto",
  },

  // Layout
  main: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "1.5rem",
    padding: "1.5rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    alignItems: "start",
  },
  leftPanel: {},
  rightPanel: {},

  // Left Card
  leftCard: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(233,30,140,0.10)",
    display: "flex",
    flexDirection: "column",
    maxHeight: "80vh",
  },
  leftCardHeader: {
    background: "linear-gradient(135deg, #e91e8c 0%, #f48fb1 100%)",
    padding: "1.1rem 1.25rem",
    flexShrink: 0,
  },
  leftCardTitle: {
    color: "white",
    fontWeight: "800",
    fontSize: "18px",
    letterSpacing: "0.01em",
  },
  leftCardBody: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
  },
  leftCardScroll: {
    padding: "1rem",
    overflowY: "auto",
    flex: 1,
    minHeight: 0,
  },
  leftCardFooter: {
    padding: "1rem",
    borderTop: "1px solid #fce4ec",
    background: "#fff",
    flexShrink: 0,
  },

  // Vaccine Card
  vaccineCard: {
    background: "white",
    border: "1px solid #fce4ec",
    borderRadius: "16px",
    padding: "1rem 1.1rem",
    boxShadow: "0 2px 8px rgba(233,30,140,0.07)",
  },
  vaccineCardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
  vaccineNameRow: { display: "flex", alignItems: "center", gap: "6px" },
  clockIcon: { fontSize: "16px" },
  vaccineName: { fontWeight: "700", fontSize: "16px", color: "#1a1a2e" },
  validasiTag: {
    background: "#fce4ec",
    color: "#e91e8c",
    fontWeight: "700",
    fontSize: "11px",
    padding: "3px 10px",
    borderRadius: "20px",
    border: "1px solid #f48fb1",
  },
  vaccineSubtitle: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "10px",
    marginLeft: "22px",
  },
  vaccineInfoRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    fontSize: "12px",
    color: "#555",
    marginBottom: "6px",
  },
  vaccineTimeHighlight: { color: "#2196f3", fontWeight: "600" },
  vaccineAddress: { fontSize: "12px", color: "#555" },
  lihatDetailBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "9px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #2196f3, #64b5f6)",
    color: "white",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer",
  },

  // Detail Card
  detailCard: {
    background: "white",
    borderRadius: "20px",
    padding: "1.75rem 2rem",
    boxShadow: "0 4px 20px rgba(233,30,140,0.08)",
    border: "1.5px solid #fce4ec",
  },
  detailHeader: { marginBottom: "1rem" },
  detailTitleRow: { display: "flex", alignItems: "center", gap: "10px" },
  detailTitleBar: {
    width: "4px",
    height: "24px",
    background: "#e91e8c",
    borderRadius: "4px",
    flexShrink: 0,
  },
  detailTitle: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#e91e8c",
    margin: 0,
  },

  // Notification Banner (in-card)
  notifBanner: {
    background: "#f0fdf4",
    border: "1px solid #86efac",
    borderRadius: "12px",
    padding: "0.85rem 1.1rem",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "1.25rem",
  },
  notifBell: { fontSize: "20px", flexShrink: 0 },
  notifText: { fontSize: "14px", fontWeight: "600", color: "#166534" },

  // Two-column layout
  columnsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.25rem",
    marginBottom: "1.5rem",
  },
  column: { display: "flex", gap: "10px", alignItems: "flex-start" },
  columnDotLine: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "6px",
    flexShrink: 0,
  },
  columnDotPink: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#f48fb1",
    border: "2px solid #e91e8c",
    flexShrink: 0,
    zIndex: 1,
  },
  columnDotRed: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#e91e8c",
    border: "2px solid #e91e8c",
    flexShrink: 0,
    zIndex: 1,
  },
  columnLine: {
    width: "2px",
    flex: 1,
    background: "#f0c0d0",
    marginTop: "4px",
    minHeight: "160px",
  },
  columnContent: { flex: 1 },
  columnTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: "0 0 0.75rem 0",
  },

  // Info Box
  infoBox: {
    background: "#fff5f8",
    borderRadius: "12px",
    padding: "0.85rem 1rem",
    border: "1px solid #fce4ec",
  },
  infoRow: {
    display: "flex",
    gap: "6px",
    fontSize: "13px",
    color: "#333",
    marginBottom: "5px",
    alignItems: "flex-start",
    lineHeight: 1.5,
  },
  infoLabel: { minWidth: "70px", color: "#888", flexShrink: 0 },
  infoSep: { color: "#ccc", flexShrink: 0 },
  infoValue: { color: "#1a1a2e", flex: 1 },

  // Persiapan
  persiapanTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#444",
    margin: "0 0 8px 0",
  },
  persiapanList: {
    margin: 0,
    paddingLeft: "1.1rem",
    fontSize: "13px",
    color: "#555",
    lineHeight: 1.7,
  },
  catatanTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#444",
    margin: "0.75rem 0 8px 0",
  },
  catatanText: { fontSize: "13px", color: "#555", margin: 0 },

  // Action Row
  actionRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  },
  btnSecondary: {
    padding: "10px 20px",
    borderRadius: "12px",
    border: "1.5px solid #bdbdbd",
    background: "#f5f5f5",
    color: "#555",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  btnReminderActive: {
    padding: "10px 20px",
    borderRadius: "12px",
    border: "1.5px solid #4caf50",
    background: "#e8f5e9",
    color: "#2e7d32",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "default",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  btnPrimary: {
    padding: "10px 22px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #2196f3, #64b5f6)",
    color: "white",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  // Floating notification (toast)
  notifWrapper: {
    position: "fixed",
    top: "24px",
    right: "24px",
    zIndex: 9999,
    borderRadius: "16px",
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
    animation: "slideInNotif 0.3s ease",
    minWidth: "280px",
    maxWidth: "380px",
  },
  notifWrapperIcon: { fontSize: "22px", flexShrink: 0 },
  notifWrapperText: {
    flex: 1,
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: 1.4,
  },
  notifCloseBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
    padding: "0 2px",
    lineHeight: 1,
    flexShrink: 0,
    opacity: 0.7,
  },
};
