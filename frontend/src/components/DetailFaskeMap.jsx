import { useState } from "react"
import Navbar from "./Navbar"

const scheduleData = [
  { id: 1, vaccine: "BCG (TBC)", date: "2026-05-20", time: "09:00 - 11:00", status: "Tersedia", capacity: "5/10" },
  { id: 2, vaccine: "Hepatitis B", date: "2026-05-20", time: "09:00 - 11:00", status: "Tersedia", capacity: "8/10" },
  { id: 3, vaccine: "DPT (Difteri, Pertusis, Tetanus)", date: "2026-05-22", time: "10:00 - 12:00", status: "Tersedia", capacity: "3/10" },
  { id: 4, vaccine: "Polio", date: "2026-05-25", time: "08:00 - 10:00", status: "Penuh", capacity: "10/10" },
  { id: 5, vaccine: "Campak", date: "2026-05-27", time: "14:00 - 16:00", status: "Tersedia", capacity: "7/10" },
]

const facilities = [
  { icon: "🏥", name: "Ruang Vaksinasi", desc: "Tersedia 3 ruang modern" },
  { icon: "👨‍⚕️", name: "Tenaga Medis", desc: "6 petugas bersertifikat" },
  { icon: "📋", name: "Rekam Medis Digital", desc: "Sistem terintegrasi" },
  { icon: "🚑", name: "Ambulans", desc: "Siap 24 jam" },
]

export default function DetailFaskeMap({ faskes, onBack, setActivePage, activePage, onLogout }) {
  const [activeTab, setActiveTab] = useState("info")
  const [selectedSchedule, setSelectedSchedule] = useState(null)

  if (!faskes) {
    return (
      <div style={s.emptyWrapper}>
        <p>Data faskes tidak tersedia</p>
      </div>
    )
  }

  const handleBookSchedule = (schedule) => {
    setSelectedSchedule(schedule)
    // Simpan ke localStorage untuk digunakan di halaman booking
    localStorage.setItem("selectedSchedule", JSON.stringify(schedule))
    localStorage.setItem("selectedFaskes", JSON.stringify(faskes))
    // Bisa redirect ke halaman booking atau form imunisasi
    // setActivePage?.("bookImmunization")
  }

  return (
    <div style={s.page}>
      <Navbar activePage={activePage} setActivePage={setActivePage} onLogout={onLogout} />

      <div style={s.container}>
        {/* Header */}
        <div style={s.header}>
          <button style={s.backBtn} onClick={onBack}>
            ← Kembali
          </button>
          <div style={s.headerTitle}>
            <h1 style={s.title}>{faskes.name}</h1>
            <span style={{...s.badge, background: faskes.status === "Buka" ? "#e8f5e9" : "#fff3e0", color: faskes.status === "Buka" ? "#2e7d32" : "#e65100"}}>
              {faskes.status}
            </span>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div style={s.quickInfoRow}>
          <div style={s.quickCard}>
            <span style={s.quickIcon}>📍</span>
            <div>
              <div style={s.quickLabel}>Jarak</div>
              <div style={s.quickValue}>{faskes.distance} km</div>
            </div>
          </div>
          <div style={s.quickCard}>
            <span style={s.quickIcon}>🏷️</span>
            <div>
              <div style={s.quickLabel}>Tipe</div>
              <div style={s.quickValue}>{faskes.type}</div>
            </div>
          </div>
          <div style={s.quickCard}>
            <span style={s.quickIcon}>📞</span>
            <div>
              <div style={s.quickLabel}>Telepon</div>
              <div style={s.quickValue}>{faskes.phone}</div>
            </div>
          </div>
          <div style={s.quickCard}>
            <span style={s.quickIcon}>⭐</span>
            <div>
              <div style={s.quickLabel}>Rating</div>
              <div style={s.quickValue}>4.5/5</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={s.tabsWrapper}>
          <div style={s.tabsHeader}>
            {["info", "jadwal", "fasilitas"].map(tab => (
              <button
                key={tab}
                style={{
                  ...s.tab,
                  ...(activeTab === tab ? s.tabActive : s.tabInactive)
                }}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "info" && "ℹ️ Informasi"}
                {tab === "jadwal" && "📅 Jadwal Imunisasi"}
                {tab === "fasilitas" && "🏥 Fasilitas"}
              </button>
            ))}
          </div>

          {/* Tab: Info */}
          {activeTab === "info" && (
            <div style={s.tabContent}>
              <div style={s.infoSection}>
                <h3 style={s.sectionTitle}>Alamat Lengkap</h3>
                <p style={s.infoText}>{faskes.address}</p>
              </div>

              <div style={s.infoSection}>
                <h3 style={s.sectionTitle}>Jam Operasional</h3>
                <div style={s.operationalGrid}>
                  <div style={s.opRow}>
                    <span>Senin - Jumat</span>
                    <span style={s.opTime}>08:00 - 17:00</span>
                  </div>
                  <div style={s.opRow}>
                    <span>Sabtu</span>
                    <span style={s.opTime}>08:00 - 12:00</span>
                  </div>
                  <div style={s.opRow}>
                    <span>Minggu & Libur</span>
                    <span style={{...s.opTime, color: "#e53935"}}>Tutup</span>
                  </div>
                </div>
              </div>

              <div style={s.infoSection}>
                <h3 style={s.sectionTitle}>Kontak</h3>
                <div style={s.contactGrid}>
                  <div style={s.contactItem}>
                    <span style={s.contactLabel}>📞 Telepon</span>
                    <span style={s.contactValue}>{faskes.phone}</span>
                  </div>
                  <div style={s.contactItem}>
                    <span style={s.contactLabel}>📧 Email</span>
                    <span style={s.contactValue}>info@{faskes.name.toLowerCase().replace(/ /g, "")}.com</span>
                  </div>
                </div>
              </div>

              <div style={s.infoSection}>
                <h3 style={s.sectionTitle}>Persyaratan Kunjungan</h3>
                <ul style={s.requirementsList}>
                  <li>Membawa Kartu Kesehatan atau KTP</li>
                  <li>Datang 15 menit sebelum jadwal</li>
                  <li>Anak dalam kondisi sehat</li>
                  <li>Didampingi orang tua/wali</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab: Jadwal Imunisasi */}
          {activeTab === "jadwal" && (
            <div style={s.tabContent}>
              <div style={s.scheduleListWrapper}>
                {scheduleData.length === 0 ? (
                  <p style={s.emptyMessage}>Tidak ada jadwal imunisasi tersedia</p>
                ) : (
                  scheduleData.map(schedule => (
                    <div key={schedule.id} style={s.scheduleCard}>
                      <div style={s.scheduleCardHeader}>
                        <div>
                          <div style={s.scheduleVaccine}>{schedule.vaccine}</div>
                          <div style={s.scheduleDateTime}>
                            📅 {schedule.date} | ⏰ {schedule.time}
                          </div>
                        </div>
                        <span style={{...s.statusBadge, background: schedule.status === "Tersedia" ? "#c8e6c9" : "#ffccbc", color: schedule.status === "Tersedia" ? "#2e7d32" : "#d84315"}}>
                          {schedule.status}
                        </span>
                      </div>

                      <div style={s.scheduleCardBody}>
                        <div style={s.capacityInfo}>
                          <span>Kapasitas: {schedule.capacity}</span>
                          <div style={s.capacityBar}>
                            <div style={{...s.capacityFill, width: "70%"}} />
                          </div>
                        </div>
                      </div>

                      <button
                        style={{...s.bookBtn, opacity: schedule.status === "Penuh" ? 0.5 : 1, cursor: schedule.status === "Penuh" ? "not-allowed" : "pointer"}}
                        onClick={() => handleBookSchedule(schedule)}
                        disabled={schedule.status === "Penuh"}
                      >
                        {schedule.status === "Penuh" ? "Penuh" : "Pesan Jadwal"}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Tab: Fasilitas */}
          {activeTab === "fasilitas" && (
            <div style={s.tabContent}>
              <div style={s.facilitiesGrid}>
                {facilities.map((facility, idx) => (
                  <div key={idx} style={s.facilityCard}>
                    <div style={s.facilityIcon}>{facility.icon}</div>
                    <div style={s.facilityName}>{facility.name}</div>
                    <div style={s.facilityDesc}>{facility.desc}</div>
                  </div>
                ))}
              </div>

              <div style={s.infoSection}>
                <h3 style={s.sectionTitle}>Peralatan Medis</h3>
                <ul style={s.equipmentList}>
                  <li>Alat pendingin vaksin (Cold Chain)</li>
                  <li>Spuit steril sekali pakai</li>
                  <li>Tempat sampah medis tertutup</li>
                  <li>Alat pengukur tinggi & berat badan</li>
                  <li>Alat pemantau tanda vital</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={s.actionBar}>
          <button style={s.actionBtn} onClick={() => window.open(`https://maps.google.com/?q=${faskes.address}`, "_blank")}>
            🗺️ Lihat Rute
          </button>
          <button style={{...s.actionBtn, background: "#e91e8c", color: "#fff"}} onClick={() => handleBookSchedule(scheduleData[0])}>
            📞 Hubungi
          </button>
        </div>
      </div>
    </div>
  )
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#fff5f8",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    color: "#1a1a2e",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "1.5rem 1rem 3rem",
  },
  header: {
    marginBottom: "1.5rem",
  },
  backBtn: {
    background: "none",
    border: "0.5px solid #e0e0e0",
    borderRadius: "8px",
    padding: "7px 14px",
    fontSize: "13px",
    cursor: "pointer",
    color: "#555",
    marginBottom: "1rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  headerTitle: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#e91e8c",
    margin: 0,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
    fontWeight: "600",
    padding: "6px 12px",
    borderRadius: "999px",
  },
  quickInfoRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "12px",
    marginBottom: "2rem",
  },
  quickCard: {
    background: "#fff",
    border: "0.5px solid #ececec",
    borderRadius: "12px",
    padding: "1rem",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },
  quickIcon: {
    fontSize: "20px",
    flexShrink: 0,
  },
  quickLabel: {
    fontSize: "11px",
    color: "#aaa",
    fontWeight: "600",
    marginBottom: "4px",
  },
  quickValue: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a1a2e",
  },
  tabsWrapper: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    marginBottom: "2rem",
  },
  tabsHeader: {
    display: "flex",
    borderBottom: "0.5px solid #f0e0e8",
    background: "#fafafa",
  },
  tab: {
    flex: 1,
    padding: "1rem",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    color: "#aaa",
    transition: "all 0.2s",
  },
  tabActive: {
    color: "#e91e8c",
    borderBottom: "2px solid #e91e8c",
    background: "#fce4ec",
  },
  tabInactive: {
    color: "#aaa",
  },
  tabContent: {
    padding: "2rem",
  },
  infoSection: {
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#e91e8c",
    marginBottom: "0.75rem",
    margin: "0 0 0.75rem 0",
  },
  infoText: {
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.6",
    margin: 0,
  },
  operationalGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  opRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 12px",
    background: "#f9f9f9",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#555",
  },
  opTime: {
    fontWeight: "600",
    color: "#2e7d32",
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px",
  },
  contactItem: {
    background: "#fce4ec",
    border: "0.5px solid #f8bbd0",
    borderRadius: "12px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  contactLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#e91e8c",
    textTransform: "uppercase",
  },
  contactValue: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1a1a2e",
  },
  requirementsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  scheduleListWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  scheduleCard: {
    background: "#fce4ec",
    border: "0.5px solid #f8bbd0",
    borderRadius: "12px",
    padding: "1.25rem",
  },
  scheduleCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1rem",
  },
  scheduleVaccine: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#e91e8c",
    marginBottom: "4px",
  },
  scheduleDateTime: {
    fontSize: "12px",
    color: "#666",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: "11px",
    fontWeight: "600",
    padding: "5px 10px",
    borderRadius: "20px",
  },
  scheduleCardBody: {
    marginBottom: "1rem",
  },
  capacityInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  capacityBar: {
    height: "6px",
    background: "#e0e0e0",
    borderRadius: "3px",
    overflow: "hidden",
  },
  capacityFill: {
    height: "100%",
    background: "#e91e8c",
    borderRadius: "3px",
  },
  bookBtn: {
    width: "100%",
    padding: "10px",
    background: "#e91e8c",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  facilitiesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "12px",
    marginBottom: "2rem",
  },
  facilityCard: {
    background: "#fce4ec",
    border: "0.5px solid #f8bbd0",
    borderRadius: "12px",
    padding: "1.25rem",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  facilityIcon: {
    fontSize: "28px",
  },
  facilityName: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#e91e8c",
  },
  facilityDesc: {
    fontSize: "11px",
    color: "#888",
    lineHeight: "1.4",
  },
  equipmentList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  actionBar: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: "1.5rem",
    borderTop: "0.5px solid #f0e0e8",
  },
  actionBtn: {
    padding: "11px 22px",
    background: "#fff",
    border: "0.5px solid #e91e8c",
    color: "#e91e8c",
    borderRadius: "24px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  emptyWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    color: "#aaa",
  },
  emptyMessage: {
    textAlign: "center",
    color: "#aaa",
    padding: "2rem",
  },
}
