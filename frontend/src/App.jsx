import { useState, useEffect, useCallback } from "react"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import ItemForm from "./components/ItemForm"
import ItemList from "./components/ItemList"
import { fetchItems, createItem, updateItem, deleteItem, checkHealth } from "./services/api"

function App() {

  // ==================== STATE ====================

  const [items, setItems] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  const [sortBy, setSortBy] = useState("created_at")
  const [sortDir, setSortDir] = useState("desc")

  const skip = 0
  const limit = 20

  // ==================== LOAD DATA ====================

  const loadItems = useCallback(async (
    search = searchQuery,
    sort = sortBy,
    dir = sortDir
  ) => {

    setLoading(true)

    try {
      const data = await fetchItems(search, skip, limit, sort, dir)

      setItems(data.items)
      setTotalItems(data.total)

    } catch (err) {
      console.error("Error loading items:", err)
    } finally {
      setLoading(false)
    }

  }, [searchQuery, sortBy, sortDir])

  // ==================== ON MOUNT ====================

  useEffect(() => {
    checkHealth().then(setIsConnected)
    loadItems()
  }, [loadItems])

  // ==================== HANDLERS ====================

  const handleSubmit = async (itemData, editId) => {

    if (editId) {
      await updateItem(editId, itemData)
      setEditingItem(null)
    } else {
      await createItem(itemData)
    }

    loadItems()
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {

    const item = items.find((i) => i.id === id)

    if (!window.confirm(`Yakin ingin menghapus "${item?.name}"?`)) return

    try {
      await deleteItem(id)
      loadItems()
    } catch (err) {
      alert("Gagal menghapus: " + err.message)
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    loadItems(query, sortBy, sortDir)
  }

  const handleSortChange = (e) => {

    const value = e.target.value

    let newSortBy = "created_at"
    let newSortDir = "desc"

    if (value === "name_asc") {
      newSortBy = "name"
      newSortDir = "asc"
    }

    if (value === "name_desc") {
      newSortBy = "name"
      newSortDir = "desc"
    }

    if (value === "price_asc") {
      newSortBy = "price"
      newSortDir = "asc"
    }

    if (value === "price_desc") {
      newSortBy = "price"
      newSortDir = "desc"
    }

    setSortBy(newSortBy)
    setSortDir(newSortDir)

    loadItems(searchQuery, newSortBy, newSortDir)
  }

  const handleCancelEdit = () => {
    setEditingItem(null)
  }

  // ==================== RENDER ====================

  return (
    <div style={styles.app}>

      <div style={styles.container}>

        <Header totalItems={totalItems} isConnected={isConnected} />

        <ItemForm
          onSubmit={handleSubmit}
          editingItem={editingItem}
          onCancelEdit={handleCancelEdit}
        />

        <SearchBar onSearch={handleSearch} />

        <div style={styles.sortContainer}>

          <label style={styles.sortLabel}>Urutkan:</label>

          <div style={{ position: "relative" }}>
            <select onChange={handleSortChange} style={styles.sort}>
              <option value="latest">Terbaru</option>
              <option value="name_asc">Nama A-Z</option>
              <option value="name_desc">Nama Z-A</option>
              <option value="price_asc">Harga Termurah</option>
              <option value="price_desc">Harga Termahal</option>
            </select>
            <svg
              style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              width="12" height="8" viewBox="0 0 12 8" fill="none"
            >
              <path d="M1 1l5 6 5-6" stroke="#64b5f6" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

        </div>

        <ItemList
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />

      </div>

    </div>
  )
}

const styles = {

  app: {
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    padding: "2rem",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    color: "#e0e0e0",
  },

  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },

  sortContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "1.5rem",
  },

  sortLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  },

  sort: {
    appearance: "none",
    WebkitAppearance: "none",
    background: "#1F4E79",
    border: "1.5px solid #378ADD",
    borderRadius: "8px",
    padding: "8px 36px 8px 14px",
    fontSize: "14px",
    color: "#e0e0e0",
    cursor: "pointer",
    outline: "none",
    minWidth: "160px",
  },

}

export default App