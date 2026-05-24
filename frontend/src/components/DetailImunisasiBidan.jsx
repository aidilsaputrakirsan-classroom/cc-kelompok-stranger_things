import { useState } from "react";

// ─── Warna ────────────────────────────────────────────────────────────────────
const P      = "#534AB7";
const P_DARK = "#3C3489";
const P_BG   = "#EEEDFE";
const P_BDR  = "#CECBF6";
const P_LITE = "#AFA9EC";

// ─── Ikon inline ─────────────────────────────────────────────────────────────
function IconCalendar({ s = 18, c = P }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function IconUser({ s = 18, c = P }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IconSyringe({ s = 18, c = P }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 2 4 4" /><path d="m17 7 3-3" />
      <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
      <path d="m9 11 4 4" /><path d="m5 19-3 3" /><path d="m14 4 6 6" />
    </svg>
  );
}
function IconPencil({ s = 18, c = P }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}
function IconAlert({ s = 18, c = "#e53935" }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
  );
}
function IconCheck({ s = 18, c = "white" }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconX({ s = 18, c = "white" }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconSave({ s = 18, c = "white" }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
    </svg>
  );
}
function IconBack({ s = 20, c = P }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function IconHistory({ s = 18, c = P }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" /><path d="M12 7v5l4 2" />
    </svg>
  );
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────
function Toggle({ on, onChange }) {
  return (
    <div onClick={() => onChange(!on)}
      style={{
        width: "48px", height: "26px", borderRadius: "999px", cursor: "pointer",
        background: on ? P : "#d1d5db",
        position: "relative", transition: "background 0.25s",
        flexShrink: 0,
      }}>
      <div style={{
        position: "absolute", top: "3px",
        left: on ? "25px" : "3px",
        width: "20px", height: "20px", borderRadius: "50%",
        background: "white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        transition: "left 0.25s",
      }} />
    </div>
  );
}

// ─── Riwayat Imunisasi mini ───────────────────────────────────────────────────
function RiwayatImunisasi({ riwayat }) {
  return (
    <div style={S.card}>
      <div style={S.cardHeader}>
        <IconHistory s={17} c={P} />
        <span style={S.cardTitle}>Riwayat Imunisasi</span>
      </div>
      {riwayat.length === 0 ? (
        <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>Belum ada riwayat imunisasi.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {riwayat.map((r, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 12px", borderRadius: "8px",
              background: r.status === "completed" ? "#f0fdf4" : P_BG,
              border: `0.5px solid ${r.status === "completed" ? "#bbf7d0" : P_BDR}`,
            }}>
              <div>
                <div style={{ fontWeight: "600", fontSize: "0.875rem", color: "#1a1a2e" }}>{r.vaccine}</div>
                <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "2px" }}>{r.date}</div>
              </div>
              <span style={{
                padding: "3px 10px", borderRadius: "999px", fontSize: "0.72rem", fontWeight: "600",
                background: r.status === "completed" ? "#dcfce7" : "#fef9c3",
                color: r.status === "completed" ? "#166534" : "#854d0e",
              }}>
                {r.status === "completed" ? "Selesai" : "Terjadwal"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
/**
 * Props:
 *   immunization  – object data imunisasi dari API (opsional, fallback ke dummy)
 *   child         – object data anak dari API (opsional, fallback ke dummy)
 *   onBack        – function () => void
 *   onSave        – function ({ status, catatan, reaksiAlergi, deskripsiAlergi }) => void
 */
function DetailImunisasiBidan({ immunization, child, onBack, onSave }) {
  const [tab, setTab] = useState("info"); // "info" | "validasi"
  const [status, setStatus] = useState(immunization?.status || "scheduled");
  const [catatan, setCatatan] = useState(immunization?.notes || "");
  const [reaksiAlergi, setReaksiAlergi] = useState(immunization?.allergy_reaction || false);
  const [deskripsiAlergi, setDeskripsiAlergi] = useState(immunization?.allergy_description || "");
  const [saved, setSaved] = useState(false);

  // ── Data (pakai prop jika ada, fallback ke dummy) ──
  const jadwal = {
    tanggal:   immunization?.scheduled_date
                 ? new Date(immunization.scheduled_date).toLocaleDateString("id-ID", { weekday:"long", day:"numeric", month:"numeric", year:"numeric" })
                 : "Senin, 28/7/2025",
    waktu:     immunization?.time_range   || "08:00 – 12:00",
    jenis:     immunization?.vaccine_name || "Hepatitis B",
    bidan:     immunization?.midwife_name || "dr. Siti Aisyah",
    lokasi:    immunization?.location     || "Puskesmas Balikpapan Selatan",
  };

  const dataAnak = {
    nama:      child?.name         || "Ahmad Daffa",
    umur:      child?.age_months != null ? `${child.age_months} bulan` : "3 bulan",
    berat:     child?.weight       ? `${child.weight} kg` : "5.2 kg",
    orangTua:  child?.parent_name  || "Ibu Aminah",
    noHP:      child?.parent_phone || "0812-3456-7890",
    alamat:    child?.address      || "Jl. Mulawarman No. 123, Balikpapan",
  };

  const riwayat = immunization?.history || [
    { vaccine: "BCG",         date: "15 Mar 2025", status: "completed"  },
    { vaccine: "Polio 1",     date: "20 Apr 2025", status: "completed"  },
    { vaccine: "DPT-HB-Hib", date: "10 Jun 2025", status: "scheduled"  },
  ];

  const handleSave = () => {
    onSave?.({ status, catatan, reaksiAlergi, deskripsiAlergi });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // ── Render info row ──
  const Row = ({ label, value }) => (
    <div style={S.row}>
      <span style={S.rowLabel}>{label}</span>
      <span style={S.rowValue}>{value}</span>
    </div>
  );

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <button style={S.backBtn} onClick={onBack}>
          <IconBack />
        </button>
        <h1 style={S.headerTitle}>Detail Imunisasi</h1>
        <div style={{ width: "32px" }} /> {/* spacer */}
      </div>

      {/* Tab Switch */}
      <div style={S.tabBar}>
        <button
          style={{ ...S.tab, ...(tab === "info" ? S.tabActive : S.tabInactive) }}
          onClick={() => setTab("info")}>
          Info Pasien
        </button>
        <button
          style={{ ...S.tab, ...(tab === "validasi" ? S.tabActive : S.tabInactive) }}
          onClick={() => setTab("validasi")}>
          Validasi
        </button>
      </div>

      <div style={S.body}>

        {/* ── TAB: INFO PASIEN ── */}
        {tab === "info" && (
          <>
            {/* Informasi Jadwal */}
            <div style={S.card}>
              <div style={S.cardHeader}>
                <IconCalendar s={17} />
                <span style={S.cardTitle}>Informasi Jadwal</span>
              </div>
              <Row label="Tanggal"        value={jadwal.tanggal} />
              <Row label="Waktu"          value={jadwal.waktu} />
              <Row label="Jenis Imunisasi" value={jadwal.jenis} />
              <Row label="Bidan"          value={jadwal.bidan} />
              <Row label="Lokasi"         value={jadwal.lokasi} />
            </div>

            {/* Data Anak */}
            <div style={S.card}>
              <div style={S.cardHeader}>
                <IconUser s={17} />
                <span style={S.cardTitle}>Data Anak</span>
              </div>
              <Row label="Nama"       value={dataAnak.nama} />
              <Row label="Umur"       value={dataAnak.umur} />
              <Row label="Berat Badan" value={dataAnak.berat} />
              <Row label="Orang Tua"  value={dataAnak.orangTua} />
              <Row label="No. HP"     value={dataAnak.noHP} />
              <Row label="Alamat"     value={dataAnak.alamat} />
            </div>

            {/* Riwayat Imunisasi */}
            <RiwayatImunisasi riwayat={riwayat} />
          </>
        )}

        {/* ── TAB: VALIDASI ── */}
        {tab === "validasi" && (
          <>
            {saved && (
              <div style={S.successNote}>✓ Validasi berhasil disimpan!</div>
            )}

            {/* Status Imunisasi */}
            <div style={S.card}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                {/* Ilustrasi bidan mini */}
                <div style={{
                  width: "64px", height: "64px", borderRadius: "50%",
                  background: P_BG, display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg viewBox="0 0 64 64" width="48" height="48">
                    <circle cx="32" cy="22" r="12" fill="#f9c0d5" />
                    <circle cx="32" cy="22" r="9"  fill="#fce4ec" />
                    <rect x="24" y="10" width="16" height="8" rx="4" fill={P} />
                    <rect x="28" y="8"  width="8"  height="4" rx="2" fill="white" />
                    <rect x="30" y="6"  width="4"  height="4" rx="1" fill="#e53935" />
                    <circle cx="32" cy="42" r="12" fill="#a5b4fc" />
                    <path d="M22 38 Q32 36 42 38 L44 58 Q32 62 20 58Z" fill={P} />
                    <ellipse cx="28" cy="20" rx="1.5" ry="2" fill="#333" />
                    <ellipse cx="36" cy="20" rx="1.5" ry="2" fill="#333" />
                    <path d="M28 26 Q32 29 36 26" stroke="#e879a0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <rect x="29" y="10" width="6"  height="3"  rx="1" fill="#e53935" />
                  </svg>
                </div>
                <div style={{ fontWeight: "700", fontSize: "1.1rem", color: "#1a1a2e" }}>
                  Status Imunisasi
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => setStatus("completed")}
                  style={{
                    ...S.statusBtn,
                    background: status === "completed" ? P : "#e5e7eb",
                    color: status === "completed" ? "white" : "#374151",
                    boxShadow: status === "completed" ? `0 4px 12px rgba(83,74,183,0.35)` : "none",
                  }}>
                  <IconCheck s={16} c={status === "completed" ? "white" : "#374151"} />
                  Selesai
                </button>
                <button
                  onClick={() => setStatus("cancelled")}
                  style={{
                    ...S.statusBtn,
                    background: status === "cancelled" ? "#dc2626" : "#e5e7eb",
                    color: status === "cancelled" ? "white" : "#374151",
                    boxShadow: status === "cancelled" ? "0 4px 12px rgba(220,38,38,0.35)" : "none",
                  }}>
                  <IconX s={16} c={status === "cancelled" ? "white" : "#374151"} />
                  Dibatalkan
                </button>
              </div>
            </div>

            {/* Catatan Bidan */}
            <div style={S.card}>
              <div style={S.cardHeader}>
                <IconPencil s={17} />
                <span style={S.cardTitle}>Catatan Bidan</span>
              </div>
              <textarea
                value={catatan}
                onChange={e => setCatatan(e.target.value)}
                placeholder="Tambahkan catatan mengenai proses imunisasi..."
                rows={4}
                style={S.textarea}
              />
            </div>

            {/* Reaksi Alergi */}
            <div style={S.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: reaksiAlergi ? "14px" : "0" }}>
                <div style={S.cardHeader}>
                  <IconAlert s={17} />
                  <span style={S.cardTitle}>Reaksi Alergi</span>
                </div>
                <Toggle on={reaksiAlergi} onChange={setReaksiAlergi} />
              </div>
              {reaksiAlergi && (
                <textarea
                  value={deskripsiAlergi}
                  onChange={e => setDeskripsiAlergi(e.target.value)}
                  placeholder="Deskripsikan reaksi alergi yang terjadi..."
                  rows={3}
                  style={S.textarea}
                />
              )}
            </div>

            {/* Tombol Simpan */}
            <button style={S.btnSimpan} onClick={handleSave}>
              <IconSave s={18} />
              Simpan Validasi
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  page: {
    minHeight: "100vh",
    background: "#f8f0f5",
    fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
    fontSize: "14px",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    background: "white",
    borderBottom: "0.5px solid #f0e0eb",
  },
  headerTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: P,
    margin: 0,
  },
  backBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
  },
  tabBar: {
    display: "flex",
    background: "white",
    padding: "10px 16px",
    gap: "8px",
    borderBottom: "0.5px solid #f0e0eb",
  },
  tab: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
    transition: "all 0.2s",
  },
  tabActive: {
    background: P,
    color: "white",
    boxShadow: `0 3px 10px rgba(83,74,183,0.3)`,
  },
  tabInactive: {
    background: "#f3f4f6",
    color: "#9ca3af",
  },
  body: {
    flex: 1,
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    maxWidth: "680px",
    width: "100%",
    margin: "0 auto",
    boxSizing: "border-box",
  },
  card: {
    background: "white",
    borderRadius: "14px",
    padding: "16px",
    boxShadow: "0 2px 8px rgba(83,74,183,0.07)",
    border: `0.5px solid ${P_BDR}`,
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "14px",
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: "0.95rem",
    color: P,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "8px 0",
    borderBottom: "0.5px solid #f5eef8",
    gap: "12px",
  },
  rowLabel: {
    fontSize: "0.85rem",
    color: "#6b7280",
    flexShrink: 0,
  },
  rowValue: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#1a1a2e",
    textAlign: "right",
  },
  statusBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "700",
    transition: "all 0.2s",
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    border: `1.5px solid ${P_BDR}`,
    borderRadius: "10px",
    fontSize: "0.875rem",
    outline: "none",
    color: "#374151",
    resize: "vertical",
    background: "#fafafe",
    boxSizing: "border-box",
    fontFamily: "inherit",
    lineHeight: "1.5",
  },
  btnSimpan: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "14px",
    background: P,
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "700",
    boxShadow: `0 4px 16px rgba(83,74,183,0.35)`,
    marginTop: "4px",
  },
  successNote: {
    background: "#dcfce7",
    color: "#166534",
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "0.875rem",
    fontWeight: "600",
  },
};

export default DetailImunisasiBidan;