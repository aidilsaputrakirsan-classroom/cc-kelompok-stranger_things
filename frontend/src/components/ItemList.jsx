import ItemCard from "./ItemCard"

function ItemList({ items, onEdit, onDelete, loading }) {
  if (loading) {
    return <p style={styles.message}>⏳ Memuat data...</p>
  }

  if (items.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyIcon}>📭</p>
        <p style={styles.emptyText}>Belum ada item.</p>
        <p style={styles.emptyHint}>
          Gunakan form di atas untuk menambahkan item pertama.
        </p>
      </div>
    )
  }

  return (
    <ul style={styles.grid}>
  {items.map((item) => (
    <li key={item.id} style={styles.listItem}>
      <ItemCard
        item={item}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </li>
  ))}
</ul>
  )
}

const styles = {
  grid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "1rem",
  padding: 0,
  margin: 0,
},
  message: {
    textAlign: "center",
    color: "#888",
    padding: "2rem",
    fontSize: "1.1rem",
  },
  empty: {
    textAlign: "center",
    padding: "3rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    border: "2px dashed #ddd",
  },
  emptyIcon: {
    fontSize: "3rem",
    margin: "0 0 0.5rem 0",
  },
  emptyText: {
    fontSize: "1.1rem",
    color: "#555",
    margin: "0 0 0.25rem 0",
  },
  emptyHint: {
    fontSize: "0.9rem",
    color: "#888",
    margin: 0,
  },
  listItem: {
  listStyle: "none",
},
}

export default ItemList