function ItemCard({ item, onEdit, onDelete }) {

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num)
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return "-"
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)"
        e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.15)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)"
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)"
      }}
    >
      <div style={styles.cardHeader}>
        <h3 style={styles.name}>{item.name}</h3>
        <span style={styles.price}>{formatRupiah(item.price)}</span>
      </div>

      {item.description && (
        <p style={styles.description}>{item.description}</p>
      )}

      <div style={styles.meta}>
        <span style={styles.quantity}>📦 Stok: {item.quantity}</span>
        <span style={styles.date}>🕐 {formatDate(item.created_at)}</span>
      </div>

      <div style={styles.actions}>
        <button onClick={() => onEdit(item)} style={styles.btnEdit}>
          ✏️ Edit
        </button>
        <button onClick={() => onDelete(item.id)} style={styles.btnDelete}>
          🗑️ Hapus
        </button>
      </div>
    </div>
  )
}

const styles = {

  card: {
    background: "linear-gradient(180deg,#ffffff,#f8fafc)",
    padding: 20,
    borderRadius: 18,
    border: "1px solid #e5e7eb",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    transition: "all 0.25s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 170,
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },

  name: {
    margin: 0,
    fontSize: 18,
    color: "#1e293b",
    fontWeight: 600,
    letterSpacing: 0.2,
  },

  price: {
    fontWeight: "bold",
    color: "#16a34a",
    fontSize: 16,
    whiteSpace: "nowrap",
  },

  description: {
    color: "#64748b",
    fontSize: 14,
    margin: "4px 0 12px 0",
    lineHeight: 1.5,
  },

  meta: {
    display: "flex",
    gap: 16,
    fontSize: 12,
    color: "#94a3b8",
    marginBottom: 12,
  },

  quantity: {},
  date: {},

  actions: {
    display: "flex",
    gap: 8,
    borderTop: "1px solid #f1f5f9",
    paddingTop: 12,
  },

  btnEdit: {
    flex: 1,
    padding: "8px 10px",
    background: "#dbeafe",
    color: "#1d4ed8",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    transition: "0.2s",
  },

  btnDelete: {
    flex: 1,
    padding: "8px 10px",
    background: "#fee2e2",
    color: "#dc2626",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    transition: "0.2s",
  },

}

export default ItemCard

