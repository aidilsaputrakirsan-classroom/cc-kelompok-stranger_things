import { useState, useEffect } from "react";
import { fetchChildren, updateChild } from "../services/api";

export default function EditAnak({ childId, setActivePage, onLogout }) {
  const [child, setChild] = useState({
    name: "",
    birth_date: "",
    gender: "",
    weight: "",
    height: "",
    blood_type: "",
    notes: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    loadChild();
  }, [childId]);

  const loadChild = async () => {
    try {
      const children = await fetchChildren();
      const childData = children.find((c) => c.id === childId);
      if (childData) {
        setChild({
          name: childData.name,
          birth_date: childData.birth_date,
          gender: childData.gender,
          weight: childData.weight || "",
          height: childData.height || "",
          blood_type: childData.blood_type || "",
          notes: childData.notes || "",
        });
        setError(null);
      } else {
        setError("Data anak tidak ditemukan");
      }
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data anak");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setChild({ ...child, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!child.name || !child.birth_date || !child.gender) {
      alert("Data anak wajib diisi: Nama, Tanggal Lahir, dan Jenis Kelamin");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: child.name,
        birth_date: child.birth_date,
        gender: child.gender,
        weight: child.weight ? parseFloat(child.weight) : null,
        height: child.height ? parseFloat(child.height) : null,
        blood_type: child.blood_type || null,
        notes: child.notes || null,
      };

      await updateChild(childId, payload);
      alert("Data anak berhasil diperbarui");
      setActivePage?.("jadwalImunisasi");
    } catch (err) {
      alert("Gagal menyimpan: " + err.message);
    } finally {
      setSaving(false);
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

  if (loading) {
    return (
      <div style={s.page}>
        <div style={s.loadingContainer}>
          <p style={s.loadingText}>Memuat data anak...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={s.page}>
        <div style={s.card}>
          <div style={s.errorContainer}>
            <p style={s.errorText}>{error}</p>
            <button
              style={s.backBtn}
              onClick={() => setActivePage?.("jadwalImunisasi")}
            >
              ↩ Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.logo}>
          ByeBye<span style={s.logoPink}>Virus</span>
        </span>
        <a style={s.navLink} onClick={() => setActivePage?.("jadwalImunisasi")}>
          Jadwal Imunisasi
        </a>
        <div style={s.navAvatar} onClick={onLogout} title="Logout">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#e91e8c">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
      </nav>

      {/* Form Card */}
      <div style={s.card}>
        <div style={s.cardHeader}>
          <button
            style={s.headerBtn}
            onClick={() => setActivePage?.("jadwalImunisasi")}
          >
            ↩ Kembali
          </button>
          <h2 style={s.cardTitle}>✏️ Edit {child.name}</h2>
          <div style={{ width: 100 }} />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Data Anak Section */}
          <div style={s.section}>
            <h3 style={s.sectionTitle}>Data Anak</h3>

            <div style={s.field}>
              <label style={s.label}>Nama Lengkap *</label>
              <input
                name="name"
                value={child.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                style={inputStyle("name")}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div style={s.field}>
              <label style={s.label}>Tanggal Lahir *</label>
              <input
                type="date"
                name="birth_date"
                value={child.birth_date}
                onChange={handleChange}
                style={inputStyle("birth_date")}
                onFocus={() => setFocusedField("birth_date")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div style={s.field}>
              <label style={s.label}>Jenis Kelamin *</label>
              <div style={s.genderRow}>
                <button
                  type="button"
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
                  type="button"
                  style={
                    child.gender === "male" ? s.genderActive : s.genderInactive
                  }
                  onClick={() => setChild({ ...child, gender: "male" })}
                >
                  <span style={s.genderSymbol}>♂</span> Laki-laki
                </button>
              </div>
            </div>

            <div style={s.field}>
              <label style={s.label}>Golongan Darah</label>
              <select
                name="blood_type"
                value={child.blood_type}
                onChange={handleChange}
                style={inputStyle("blood_type")}
                onFocus={() => setFocusedField("blood_type")}
                onBlur={() => setFocusedField(null)}
              >
                <option value="">Pilih golongan darah</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>
            </div>
          </div>

          {/* Antropometri Section */}
          <div style={s.section}>
            <h3 style={s.sectionTitle}>Antropometri</h3>

            <div style={s.twoColRow}>
              <div style={s.field}>
                <label style={s.label}>Berat Badan</label>
                <div style={unitBoxStyle("weight")}>
                  <input
                    type="number"
                    name="weight"
                    value={child.weight}
                    onChange={handleChange}
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
                    onChange={handleChange}
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

          {/* Catatan Section */}
          <div style={s.section}>
            <h3 style={s.sectionTitle}>Catatan</h3>
            <textarea
              name="notes"
              value={child.notes}
              onChange={handleChange}
              placeholder="Catatan khusus tentang anak (opsional)"
              style={{
                ...s.input,
                minHeight: "100px",
                fontFamily: "inherit",
                resize: "vertical",
              }}
              onFocus={() => setFocusedField("notes")}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          {/* Form Actions */}
          <div style={s.formActions}>
            <button
              type="button"
              style={s.cancelBtn}
              onClick={() => setActivePage?.("jadwalImunisasi")}
              disabled={saving}
            >
              Batal
            </button>
            <button type="submit" style={s.saveBtn} disabled={saving}>
              {saving ? "Menyimpan..." : "Perbarui Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const s = {
  page: {
    background: "linear-gradient(180deg, #fff5f8, #fdeef4)",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    paddingBottom: "2rem",
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
  navAvatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#fce4ec",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  card: {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
    borderRadius: "20px",
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "2.5rem",
    border: "0.5px solid rgba(233,30,140,0.12)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2rem",
    paddingBottom: "1.5rem",
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
  headerBtn: {
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
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
  },
  loadingText: {
    color: "#999",
    fontSize: "16px",
  },
  errorContainer: {
    textAlign: "center",
    padding: "3rem 2rem",
  },
  errorText: {
    color: "#d32f2f",
    fontSize: "16px",
    marginBottom: "1.5rem",
  },
  section: {
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#e91e8c",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    margin: "0 0 1rem 0",
    paddingBottom: "0.75rem",
    borderBottom: "0.5px solid #fce4ec",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "1.25rem",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#444",
  },
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
  genderRow: {
    display: "flex",
    gap: "10px",
  },
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
  twoColRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
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
  formActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    marginTop: "2.5rem",
    paddingTop: "2rem",
    borderTop: "0.5px solid #fce4ec",
  },
  cancelBtn: {
    background: "#f5f5f5",
    color: "#666",
    border: "0.5px solid #e0e0e0",
    borderRadius: "10px",
    padding: "12px 40px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  saveBtn: {
    background: "linear-gradient(135deg, #2196f3, #42a5f5)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "12px 40px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
