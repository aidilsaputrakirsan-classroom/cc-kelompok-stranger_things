import { useState, useEffect } from "react"

function ItemForm({ onSubmit, editingItem, onCancelEdit }) {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "0",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState("")

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        description: editingItem.description || "",
        price: String(editingItem.price),
        quantity: String(editingItem.quantity),
      })
    } else {
      setFormData({ name: "", description: "", price: "", quantity: "0" })
    }
    setError("")
  }, [editingItem])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.name.trim()) {
      setError("Nama item wajib diisi")
      return
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError("Harga harus lebih dari 0")
      return
    }

    const itemData = {
      name: formData.name.trim(),
      description: formData.description.trim() || null,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity) || 0,
    }

    setLoading(true)

    try {
      await onSubmit(itemData, editingItem?.id)
      setFormData({ name: "", description: "", price: "", quantity: "0" })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (name) => ({
    ...styles.input,
    ...(focused === name ? styles.inputFocused : {}),
  })

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .btn-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
      `}</style>

      <div style={styles.container}>
        <h2 style={styles.title}>
          {editingItem ? "✏️ Edit Item" : "➕ Tambah Item Baru"}
        </h2>

        {error && <div style={styles.error}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="📦 Nama Item"
              style={inputStyle("name")}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused("")}
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="💰 Harga"
              style={inputStyle("price")}
              onFocus={() => setFocused("price")}
              onBlur={() => setFocused("")}
            />
          </div>

          <div style={styles.row}>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="📝 Deskripsi"
              style={inputStyle("description")}
              onFocus={() => setFocused("description")}
              onBlur={() => setFocused("")}
            />
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="📊 Stok"
              style={inputStyle("quantity")}
              onFocus={() => setFocused("quantity")}
              onBlur={() => setFocused("")}
            />
          </div>

          <div style={styles.actions}>
            <button type="submit" disabled={loading} style={styles.btnSubmit}>
              {loading ? (
                <>
                  <span className="btn-spinner" />
                  Menyimpan...
                </>
              ) : editingItem ? (
                "💾 Update Item"
              ) : (
                "➕ Tambah Item"
              )}
            </button>

            {editingItem && (
              <button type="button" onClick={onCancelEdit} style={styles.btnCancel}>
                ❌ Batal
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  )
}

const styles = {
  container: {
    background: "#ffffff",
    padding: "1.75rem",
    borderRadius: "16px",
    border: "1.5px solid #e2e8f0",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
  },
  title: {
    marginBottom: "1.1rem",
    color: "#0f172a",
    fontWeight: "700",
    fontSize: "1rem",
    letterSpacing: "-0.1px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  row: {
    display: "flex",
    gap: "0.75rem",
  },
  input: {
    flex: 1,
    padding: "0.72rem 0.9rem",
    borderRadius: "10px",
    border: "1.5px solid #e2e8f0",
    outline: "none",
    fontSize: "0.9rem",
    color: "#1e293b",
    background: "#f8fafc",
    transition: "border-color 0.18s, box-shadow 0.18s",
  },
  inputFocused: {
    border: "1.5px solid #1F4E79",
    background: "#ffffff",
    boxShadow: "0 0 0 3px rgba(31,78,121,0.1)",
  },
  actions: {
    display: "flex",
    gap: "0.65rem",
    marginTop: "0.35rem",
  },
  btnSubmit: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "linear-gradient(135deg, #1F4E79, #163d61)",
    color: "white",
    border: "none",
    padding: "0.72rem 1.25rem",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.88rem",
    boxShadow: "0 4px 14px rgba(31,78,121,0.3)",
    transition: "opacity 0.18s",
  },
  btnCancel: {
    background: "#f1f5f9",
    border: "1.5px solid #e2e8f0",
    padding: "0.72rem 1.25rem",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.88rem",
    color: "#64748b",
    transition: "background 0.18s",
  },
  error: {
    background: "#fff1f0",
    color: "#c0392b",
    padding: "0.65rem 0.9rem",
    borderRadius: "10px",
    marginBottom: "0.5rem",
    fontWeight: "500",
    fontSize: "0.875rem",
    border: "1.5px solid #fecaca",
  },
}

export default ItemForm