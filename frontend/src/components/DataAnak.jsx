import { useState, useEffect } from "react";
import {
  createChild,
  fetchVaccineTypes,
  createImmunization,
  updateChild,
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

// ── Notification (inline) ─────────────────────────────────────────
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
          position: "fixed",
          top: "24px",
          right: "24px",
          zIndex: 9999,
          background: c.bg,
          border: `1.5px solid ${c.border}`,
          borderRadius: "16px",
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
          animation: "slideInNotif 0.3s ease",
          minWidth: "280px",
          maxWidth: "380px",
        }}
      >
        <span style={{ fontSize: "22px", flexShrink: 0 }}>{c.icon}</span>
        <span
          style={{
            flex: 1,
            fontSize: "14px",
            fontWeight: "600",
            color: c.text,
            lineHeight: 1.4,
          }}
        >
          {message}
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            color: c.text,
            padding: "0 2px",
            lineHeight: 1,
            flexShrink: 0,
            opacity: 0.7,
          }}
        >
          ×
        </button>
      </div>
    </>
  );
}
// ─────────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div style={s.sectionLabel}>
      <span>{children}</span>
      <div style={s.sectionLine} />
    </div>
  );
}

export default function DataAnak({ setActivePage, onLogout }) {
  const [child, setChild] = useState({
    name: "",
    birth_date: "",
    gender: "",
    weight: "",
    height: "",
  });
  const [immunizations, setImmunizations] = useState([
    { vaccine_id: "", scheduled_date: "" },
  ]);
  const [vaccineTypes, setVaccineTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const { notif, showNotif, closeNotif } = useNotification();

  useEffect(() => {
    loadVaccines();

    const data = localStorage.getItem("editChild");
    if (data) {
      const editChild = JSON.parse(data);
      setChild({
        name: editChild.name ?? "",
        birth_date: editChild.birth_date ?? "",
        gender: editChild.gender ?? "",
        weight: editChild.weight ?? "",
        height: editChild.height ?? "",
      });
      if (editChild.immunizations && editChild.immunizations.length > 0) {
        setImmunizations(editChild.immunizations.map(item => ({
          id: item.id,
          vaccine_id: item.vaccine_id || "",
          scheduled_date: item.scheduled_date || ""
        })));
      } else {
        setImmunizations([{ vaccine_id: "", scheduled_date: "" }]);
      }
      setIsEditMode(true);
      setEditId(editChild.id);
      localStorage.removeItem("editChild");
    }
  }, []);

  const loadVaccines = async () => {
    try {
      const data = await fetchVaccineTypes();
      setVaccineTypes(!data || data.length === 0 ? defaultVaccines : data);
    } catch (err) {
      console.error(err);
      setVaccineTypes(defaultVaccines);
    }
  };

  const handleChildChange = (e) =>
    setChild({ ...child, [e.target.name]: e.target.value });

  const handleImmunizationChange = (i, field, value) => {
    const updated = [...immunizations];
    updated[i][field] = value;
    setImmunizations(updated);
  };

  const addImmunization = () =>
    setImmunizations([
      ...immunizations,
      { vaccine_id: "", scheduled_date: "" },
    ]);

  const removeImmunization = (i) =>
    setImmunizations(immunizations.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
    if (!child.name || !child.birth_date || !child.gender) {
      showNotif("Data anak wajib diisi", "error");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: child.name,
        birth_date: child.birth_date,
        gender: child.gender,
        weight: child.weight ? parseFloat(child.weight) : null,
        height: child.height ? parseFloat(child.height) : null,
      };
      if (isEditMode) {
        await updateChild(editId, payload);
        
        let failedVaccines = [];
        for (let item of immunizations) {
          if (!item.id && item.vaccine_id && item.scheduled_date) {
            try {
              await createImmunization({
                child_id: editId,
                vaccine_id: item.vaccine_id,
                scheduled_date: item.scheduled_date,
                status: "pending",
              });
            } catch (vaccineErr) {
              console.error("Gagal menyimpan imunisasi:", vaccineErr);
              failedVaccines.push(item.vaccine_id);
            }
          }
        }

        if (failedVaccines.length > 0) {
          showNotif(`Data anak diperbarui! ${failedVaccines.length} imunisasi baru gagal.`, "info");
        } else {
          showNotif("Data berhasil diperbarui!", "success");
        }
      } else {
        const newChild = await createChild(payload);

        // Simpan imunisasi dengan error handling terpisah
        let failedVaccines = [];
        for (let item of immunizations) {
          if (item.vaccine_id && item.scheduled_date) {
            try {
              await createImmunization({
                child_id: newChild.id,
                vaccine_id: item.vaccine_id,
                scheduled_date: item.scheduled_date,
                status: "pending",
              });
            } catch (vaccineErr) {
              console.error("Gagal menyimpan imunisasi:", vaccineErr);
              failedVaccines.push(item.vaccine_id);
            }
          }
        }

        // Tampilkan pesan sesuai hasil
        if (failedVaccines.length > 0) {
          showNotif(
            `Data anak berhasil disimpan! ${failedVaccines.length} `,
            "info",
          );
        } else {
          showNotif("Data berhasil disimpan!", "success");
        }
      }
      setTimeout(() => setActivePage?.("jadwal"), 1500);
    } catch (err) {
      showNotif("Gagal menyimpan: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (name) => ({
    ...s.input,
    borderColor: focusedField === name ? "#e91e8c" : "#e0e0e0",
  });

  const unitBoxStyle = (name) => ({
    ...s.inputWithUnit,
    borderColor: focusedField === name ? "#e91e8c" : "#e0e0e0",
  });

  return (
    <div style={s.page}>
      {/* Notification */}
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
        <a style={{ ...s.navLink, ...s.navActive }}>Jadwal Imunisasi</a>
        <a style={s.navLink} onClick={() => setActivePage?.("faskes")}>
          Faskes Map
        </a>
        <div style={s.navAvatar} onClick={onLogout} title="Logout">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#e91e8c">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
      </nav>

      {/* Card Utama */}
      <div style={s.card}>
        {/* Header */}
        <div style={s.cardHeader}>
          <button style={s.backBtn} onClick={() => setActivePage?.("jadwal")}>
            ↩ Kembali
          </button>
          <h2 style={s.cardTitle}>
            {isEditMode ? "Edit Data Anak" : "Tambah Data Anak"}
          </h2>
          <div style={{ width: 100 }} />
        </div>

        {/* 2 Kolom */}
        <div style={s.twoCol}>
          {/* Kolom Kiri */}
          <div>
            <SectionLabel>Data Anak</SectionLabel>

            <div style={s.field}>
              <label style={s.label}>Nama Lengkap</label>
              <input
                name="name"
                value={child.name}
                onChange={handleChildChange}
                placeholder="Masukkan nama lengkap"
                style={inputStyle("name")}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div style={s.field}>
              <label style={s.label}>Tanggal Lahir</label>
              <input
                type="date"
                name="birth_date"
                value={child.birth_date}
                onChange={handleChildChange}
                style={inputStyle("birth_date")}
                onFocus={() => setFocusedField("birth_date")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div style={s.field}>
              <label style={s.label}>Jenis Kelamin</label>
              <div style={s.genderRow}>
                <button
                  style={
                    child.gender === "female"
                      ? s.genderActive
                      : s.genderInactive
                  }
                  onClick={() => setChild({ ...child, gender: "female" })}
                >
                  <span style={s.genderSymbol}>♀</span> Perempuan
                </button>
                <button
                  style={
                    child.gender === "male" ? s.genderActive : s.genderInactive
                  }
                  onClick={() => setChild({ ...child, gender: "male" })}
                >
                  <span
                    style={{
                      ...s.genderSymbol,
                      color: child.gender === "male" ? "#e91e8c" : "#42a5f5",
                    }}
                  >
                    ♂
                  </span>{" "}
                  Laki-laki
                </button>
              </div>
            </div>

            <div style={s.divider} />
            <SectionLabel>Antropometri</SectionLabel>

            <div style={s.bbTbRow}>
              <div style={s.field}>
                <label style={s.label}>Berat Badan</label>
                <div style={unitBoxStyle("weight")}>
                  <input
                    type="number"
                    name="weight"
                    value={child.weight}
                    onChange={handleChildChange}
                    placeholder="0.0"
                    min="0"
                    step="0.1"
                    style={s.inputUnit}
                    onFocus={() => setFocusedField("weight")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <span style={s.unitBadge}>kg</span>
                </div>
              </div>

              <div style={s.field}>
                <label style={s.label}>Tinggi Badan</label>
                <div style={unitBoxStyle("height")}>
                  <input
                    type="number"
                    name="height"
                    value={child.height}
                    onChange={handleChildChange}
                    placeholder="0.0"
                    min="0"
                    step="0.1"
                    style={s.inputUnit}
                    onFocus={() => setFocusedField("height")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <span style={s.unitBadge}>cm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div>
            <SectionLabel>Data Imunisasi</SectionLabel>
            <div style={s.imunBox}>
              {immunizations.map((item, i) => (
                <div key={i} style={s.imunCard}>
                  <div style={s.imunCardHeader}>
                    <span style={s.imunCardTitle}>
                      Imunisasi
                      <span style={s.imunBadge}>{i + 1}</span>
                    </span>
                    {!item.id && (
                      <button
                        style={s.deleteBtn}
                        onClick={() => removeImmunization(i)}
                      >
                        🗑
                      </button>
                    )}
                  </div>

                  <label style={s.imunLabel}>Jenis Vaksin</label>
                  <select
                    value={item.vaccine_id}
                    onChange={(e) =>
                      handleImmunizationChange(i, "vaccine_id", e.target.value)
                    }
                    style={s.imunInput}
                    disabled={!!item.id}
                  >
                    <option value="">Pilih jenis vaksin</option>
                    {vaccineTypes.length === 0 && (
                      <option disabled>Memuat vaksin...</option>
                    )}
                    {vaccineTypes.map((v) => (
                      <option key={v.id} value={v.id}>
                        💉 {v.name}
                      </option>
                    ))}
                  </select>

                  <label style={s.imunLabel}>Tanggal Vaksin</label>
                  <input
                    type="date"
                    value={item.scheduled_date}
                    onChange={(e) =>
                      handleImmunizationChange(
                        i,
                        "scheduled_date",
                        e.target.value,
                      )
                    }
                    style={s.imunInput}
                    disabled={!!item.id}
                  />
                </div>
              ))}

              <button style={s.addImunBtn} onClick={addImmunization}>
                + Tambah Imunisasi
              </button>
            </div>
          </div>
        </div>

        {/* Simpan */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button style={s.saveBtn} onClick={handleSubmit} disabled={loading}>
            {loading ? "Menyimpan..." : isEditMode ? "Perbarui" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: {
    background: "linear-gradient(180deg, #fff5f8, #fdeef4)",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  nav: {
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(10px)",
    borderBottom: "0.5px solid #f0c0d0",
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    height: "56px",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  logo: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#1a1a2e",
    marginRight: "auto",
  },
  logoPink: { color: "#e91e8c" },
  navLink: {
    fontSize: "13px",
    color: "#aaa",
    cursor: "pointer",
    textDecoration: "none",
  },
  navActive: {
    color: "#e91e8c",
    fontWeight: "600",
    borderBottom: "2px solid #e91e8c",
    paddingBottom: "2px",
  },
  navAvatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#fce4ec",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginLeft: "auto",
  },
  card: {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
    borderRadius: "20px",
    maxWidth: "900px",
    margin: "2rem auto",
    padding: "2rem 2.5rem",
    border: "0.5px solid rgba(233,30,140,0.12)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2rem",
    paddingBottom: "1.25rem",
    borderBottom: "0.5px solid #fce4ec",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#e91e8c",
    margin: 0,
    flex: 1,
    textAlign: "center",
  },
  backBtn: {
    background: "#fff",
    border: "0.5px solid #e0e0e0",
    color: "#666",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: "600",
    borderRadius: "10px",
    padding: "8px 14px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    alignItems: "start",
  },
  sectionLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    color: "#e91e8c",
    textTransform: "uppercase",
    marginBottom: "1rem",
  },
  sectionLine: { flex: 1, height: "0.5px", background: "#fce4ec" },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "1rem",
  },
  label: { fontSize: "13px", fontWeight: "600", color: "#444" },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "0.5px solid #e0e0e0",
    fontSize: "14px",
    outline: "none",
    background: "white",
    color: "#1a1a2e",
    transition: "border-color 0.15s",
    boxSizing: "border-box",
  },
  genderRow: { display: "flex", gap: "10px" },
  genderActive: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    background: "#fce4ec",
    border: "0.5px solid #e91e8c",
    color: "#e91e8c",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },
  genderInactive: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    background: "white",
    border: "0.5px solid #e0e0e0",
    color: "#666",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },
  genderSymbol: { fontSize: "16px" },
  divider: { height: "0.5px", background: "#fce4ec", margin: "1.25rem 0" },
  bbTbRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  inputWithUnit: {
    display: "flex",
    alignItems: "center",
    border: "0.5px solid #e0e0e0",
    borderRadius: "10px",
    overflow: "hidden",
    background: "white",
    transition: "border-color 0.15s",
  },
  inputUnit: {
    flex: 1,
    padding: "10px 14px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "transparent",
    color: "#1a1a2e",
    width: "100%",
  },
  unitBadge: {
    padding: "0 14px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#e91e8c",
    background: "#fff5f8",
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    borderLeft: "0.5px solid #fce4ec",
    whiteSpace: "nowrap",
  },
  imunBox: {
    background: "white",
    borderRadius: "16px",
    padding: "1.25rem",
    border: "0.5px solid #fce4ec",
  },
  imunCard: {
    background: "linear-gradient(135deg, #e91e8c, #f48fb1)",
    borderRadius: "14px",
    padding: "1rem",
    marginBottom: "1rem",
  },
  imunCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  imunCardTitle: {
    fontWeight: "700",
    fontSize: "13px",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  imunBadge: {
    background: "rgba(255,255,255,0.25)",
    borderRadius: "20px",
    padding: "2px 10px",
    fontSize: "11px",
  },
  deleteBtn: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    borderRadius: "8px",
    padding: "5px 9px",
    cursor: "pointer",
    fontSize: "13px",
    color: "white",
  },
  imunLabel: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.85)",
    fontWeight: "600",
    marginBottom: "4px",
    display: "block",
  },
  imunInput: {
    width: "100%",
    padding: "9px 12px",
    borderRadius: "9px",
    border: "none",
    fontSize: "13px",
    outline: "none",
    background: "white",
    color: "#1a1a2e",
    marginBottom: "8px",
    boxSizing: "border-box",
  },
  addImunBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "1.5px dashed #f48fb1",
    background: "transparent",
    color: "#e91e8c",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
    marginTop: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },
  saveBtn: {
    background: "linear-gradient(135deg, #2196f3, #42a5f5)",
    color: "white",
    border: "none",
    borderRadius: "14px",
    padding: "14px 80px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  },
};
