import { useState, useRef, useEffect } from "react"

const SORT_OPTIONS = [
  { value: "newest",     label: "Terbaru",        icon: "↓" },
  { value: "oldest",     label: "Terlama",         icon: "↑" },
  { value: "price_asc",  label: "Harga Termurah",  icon: "₊" },
  { value: "price_desc", label: "Harga Termahal",  icon: "₋" },
  { value: "name_asc",   label: "Nama A–Z",        icon: "A" },
  { value: "name_desc",  label: "Nama Z–A",        icon: "Z" },
]

function SearchBar({ onSearch, onSort }) {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState("newest")
  const [focused, setFocused] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const activeOption = SORT_OPTIONS.find((o) => o.value === sort)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  const handleSortChange = (e) => {
    const value = e.target.value
    setSort(value)
    onSort(value)
  }

  const handleSortSelect = (value) => {
    setSort(value)
    onSort(value)
    setDropdownOpen(false)
  }

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <>
      <style>{`
        .sb-sort-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          white-space: nowrap;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .sb-sort-btn:hover { border-color: #1F4E79; }
        .sb-sort-btn.open {
          border-color: #1F4E79;
          box-shadow: 0 0 0 3px rgba(31,78,121,0.1);
        }
        .sb-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px; height: 22px;
          border-radius: 6px;
          background: #e8f0fb;
          color: #1F4E79;
          font-size: 11px;
          font-weight: 700;
        }
        .sb-caret {
          font-size: 9px;
          color: #9ca3af;
          margin-left: 2px;
          transition: transform 0.2s;
        }
        .sb-sort-btn.open .sb-caret { transform: rotate(180deg); }
        .sb-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          min-width: 190px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.10);
          padding: 5px;
          z-index: 100;
          animation: sbFade 0.13s ease;
        }
        @keyframes sbFade {
          from { opacity: 0; transform: translateY(-5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sb-option {
          display: flex;
          align-items: center;
          gap: 9px;
          width: 100%;
          padding: 8px 10px;
          border: none;
          background: none;
          border-radius: 8px;
          font-size: 14px;
          color: #374151;
          cursor: pointer;
          text-align: left;
          transition: background 0.12s;
        }
        .sb-option:hover { background: #f3f4f6; }
        .sb-option.active { background: #eef2fb; color: #1F4E79; font-weight: 600; }
        .sb-opt-icon {
          width: 22px; height: 22px;
          border-radius: 6px;
          background: #f3f4f6;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; color: #6b7280;
          flex-shrink: 0;
        }
        .sb-option.active .sb-opt-icon { background: #dbeafe; color: #1F4E79; }
        .sb-check { margin-left: auto; font-size: 12px; color: #1F4E79; }
      `}</style>

      <div style={styles.container}>

        {/* SEARCH */}
        <form onSubmit={handleSubmit} style={styles.searchRow}>
          <input
            type="text"
            placeholder="Cari item..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              ...styles.input,
              ...(focused ? styles.inputFocused : {}),
            }}
          />

          <button type="submit" style={styles.primaryBtn}>
            Cari
          </button>

          {query && (
            <button type="button" onClick={handleClear} style={styles.secondaryBtn}>
              Reset
            </button>
          )}
        </form>

        {/* FILTER */}
        <div style={styles.filterRow}>
          <div style={styles.filterGroup}>
            <span style={styles.label}>Urutkan</span>

            {/* Custom dropdown */}
            <div style={{ position: "relative" }} ref={dropdownRef}>
              <button
                type="button"
                className={`sb-sort-btn${dropdownOpen ? " open" : ""}`}
                onClick={() => setDropdownOpen((v) => !v)}
              >
                <span className="sb-badge">{activeOption.icon}</span>
                {activeOption.label}
                <span className="sb-caret">▼</span>
              </button>

              {dropdownOpen && (
                <div className="sb-dropdown">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`sb-option${sort === opt.value ? " active" : ""}`}
                      onClick={() => handleSortSelect(opt.value)}
                    >
                      <span className="sb-opt-icon">{opt.icon}</span>
                      {opt.label}
                      {sort === opt.value && <span className="sb-check">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

const styles = {
  container: {
    marginBottom: "28px",
  },
  searchRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "12px",
  },
  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    fontSize: "15px",
    background: "#ffffff",
    outline: "none",
    transition: "border-color 0.18s, box-shadow 0.18s",
    color: "#111827",
  },
  inputFocused: {
    borderColor: "#1F4E79",
    boxShadow: "0 0 0 3px rgba(31,78,121,0.1)",
  },
  primaryBtn: {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #1F4E79, #163d61)",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 14px rgba(31,78,121,0.3)",
  },
  secondaryBtn: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    cursor: "pointer",
    transition: "all 0.2s ease",
    color: "#6b7280",
    fontWeight: 600,
    fontSize: "14px",
  },
  filterRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#ffffff",
    padding: "8px 12px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
  },
  label: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#374151",
  },
}

export default SearchBar