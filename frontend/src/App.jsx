import { useState, useEffect, useCallback } from "react"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import ItemForm from "./components/ItemForm"
import ItemList from "./components/ItemList"
import LoginPage from "./components/LoginPage"
import SplashPage from "./components/SplashPage"
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  checkHealth,
  login,
  register,
  clearToken,
} from "./services/api"

function App() {

  // AUTH
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showSplash, setShowSplash] = useState(true)

  // DATA
  const [items, setItems] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  // SEARCH + SORT
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  // TOAST
  const [toast, setToast] = useState(null)

  const loadItems = useCallback(async (search = "") => {
    setLoading(true)
    try {
      const data = await fetchItems(search)
      setItems(data.items)
      setTotalItems(data.total)
    } catch (err) {
      if (err.message === "UNAUTHORIZED") handleLogout()
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkHealth().then(setIsConnected)
  }, [])

  useEffect(() => {
    if (isAuthenticated) loadItems()
  }, [isAuthenticated, loadItems])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  // AUTH
  const handleLogin = async (email, password) => {
    const data = await login(email, password)
    setUser(data.user)
    setIsAuthenticated(true)
  }

  const handleRegister = async (userData) => {
    await register(userData)
    await handleLogin(userData.email, userData.password)
  }

  const handleLogout = () => {
    clearToken()
    setUser(null)
    setIsAuthenticated(false)
    setItems([])
    setTotalItems(0)
    setEditingItem(null)
    setSearchQuery("")
    setShowSplash(true)
  }

  // ITEM
  const handleSubmit = async (itemData, editId) => {
    try {
      if (editId) {
        await updateItem(editId, itemData)
        setEditingItem(null)
        setToast({ type: "success", message: "Item berhasil diupdate" })
      } else {
        await createItem(itemData)
        setToast({ type: "success", message: "Item berhasil ditambahkan" })
      }
      loadItems(searchQuery)
    } catch (err) {
      if (err.message === "UNAUTHORIZED") handleLogout()
      else setToast({ type: "error", message: err.message })
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    const item = items.find((i) => i.id === id)
    if (!window.confirm(`Hapus "${item?.name}" ?`)) return
    try {
      await deleteItem(id)
      setToast({ type: "success", message: "Item berhasil dihapus" })
      loadItems(searchQuery)
    } catch (err) {
      if (err.message === "UNAUTHORIZED") handleLogout()
      else setToast({ type: "error", message: err.message })
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    loadItems(query)
  }

  const sortedItems = [...items].sort((a, b) => {
    switch (sortBy) {
      case "price_asc": return a.price - b.price
      case "price_desc": return b.price - a.price
      case "name_asc": return a.name.localeCompare(b.name)
      case "name_desc": return b.name.localeCompare(a.name)
      case "oldest": return a.id - b.id
      default: return b.id - a.id
    }
  })

  // Belum login — tampilkan splash dulu, lalu login
  if (!isAuthenticated) {
    if (showSplash) {
      return (
        <SplashPage
          onSignIn={() => setShowSplash(false)}
          onSignUp={() => setShowSplash(false)}
        />
      )
    }
    return <LoginPage onLogin={handleLogin} onRegister={handleRegister} onBack={() => setShowSplash(true)} />
  }

  return (
    <div style={styles.app}>
      <div style={styles.container}>

        <Header
          totalItems={totalItems}
          isConnected={isConnected}
          user={user}
          onLogout={handleLogout}
        />

        {/* ── Toast notification ── */}
        {toast && (
          <div style={{
            ...toastStyles.base,
            ...(toast.type === "success" ? toastStyles.success : toastStyles.error),
          }}>
            <div style={toastStyles.iconWrap(toast.type)}>
              {toast.type === "success" ? "✓" : "!"}
            </div>
            <span style={toastStyles.message}>{toast.message}</span>
            <button style={toastStyles.close} onClick={() => setToast(null)}>✕</button>
          </div>
        )}

        <ItemForm
          onSubmit={handleSubmit}
          editingItem={editingItem}
          onCancelEdit={() => setEditingItem(null)}
        />

        <SearchBar
          onSearch={handleSearch}
          onSort={setSortBy}
        />

        <ItemList
          items={sortedItems}
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
    backgroundColor: "#f8f8f8",
    padding: "2rem",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  container: {
    maxWidth: "950px",
    margin: "0 auto",
  },
}

const toastStyles = {
  base: {
    position: "fixed",
    top: 24,
    right: 24,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 18px",
    borderRadius: "14px",
    zIndex: 999,
    minWidth: "260px",
    maxWidth: "360px",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    animation: "none",
  },
  success: {
    background: "rgba(240,253,244,0.95)",
    border: "1px solid rgba(22,163,74,0.2)",
  },
  error: {
    background: "rgba(254,242,242,0.95)",
    border: "1px solid rgba(220,38,38,0.2)",
  },
  iconWrap: (type) => ({
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "13px",
    background: type === "success" ? "#16a34a" : "#dc2626",
    color: "#fff",
  }),
  message: {
    flex: 1,
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#1e293b",
    lineHeight: "1.4",
  },
  close: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    color: "#94a3b8",
    padding: "2px 4px",
    borderRadius: "4px",
    flexShrink: 0,
    lineHeight: 1,
  },
}

export default App