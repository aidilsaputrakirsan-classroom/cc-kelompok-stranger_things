import { useState } from "react"
import SearchBar from "../components/SearchBar"
import Navbar from "../components/Navbar"

const faskesData = [
  {
    id: 0,
    name: "UPTD Puskesmas Gn. Bahagia",
    type: "Puskesmas",
    distance: "1.5",
    status: "Buka",
    address: "Jl. Ruhui Rahayu II No. 789, Balikpapan Selatan",
    phone: "0542-345678",
    markerX: 360,
    markerY: 250,
  },
  {
    id: 1,
    name: "Puskesmas Sepinggan",
    type: "Puskesmas",
    distance: "2.1",
    status: "Buka",
    address: "Jl. Marsma Iswahyudi, Balikpapan",
    phone: "0542-111222",
    markerX: 580,
    markerY: 335,
  },
  {
    id: 2,
    name: "Puskesmas Gunung Sari",
    type: "Puskesmas",
    distance: "3.4",
    status: "Buka",
    address: "Jl. Gunung Sari Ilir, Balikpapan Tengah",
    phone: "0542-222333",
    markerX: 200,
    markerY: 200,
  },
  {
    id: 3,
    name: "RS Pertamina Balikpapan",
    type: "RS",
    distance: "4.2",
    status: "Buka 24 Jam",
    address: "Jl. Yos Sudarso No.1, Balikpapan",
    phone: "0542-531000",
    markerX: 450,
    markerY: 420,
  },
  {
    id: 4,
    name: "Klinik Pratama Sepinggan",
    type: "Klinik",
    distance: "1.9",
    status: "Tutup",
    address: "Jl. Sepinggan Baru No. 45, Balikpapan",
    phone: "0542-778899",
    markerX: 150,
    markerY: 380,
  },
]

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
)

export default function FaskesMap({ setActivePage, onLogout, activePage }) {
  const [selected, setSelected] = useState(0)
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("Semua")

  const filters = ["Semua", "Puskesmas", "RS", "Klinik"]

  const filtered = faskesData.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.address.toLowerCase().includes(search.toLowerCase())
    const matchFilter = activeFilter === "Semua" || d.type === activeFilter
    return matchSearch && matchFilter
  })

  const selectedData = faskesData[selected]

  return (
    <div style={s.page}>
      <Navbar activePage={activePage} setActivePage={setActivePage} onLogout={onLogout} />

      <div style={s.layout}>
        {/* Sidebar */}
        <div style={s.sidebar}>
          <div style={s.searchBox}>
            <SearchBar onSearch={(q) => setSearch(q)} minimal />
          </div>

          <div style={s.locBanner}>
            <div style={s.locDot} />
            <div>
              <div style={s.locLbl}>Lokasi anda saat ini</div>
              <div style={s.locAddr}>
                Jl. Tunggal Ika No. 11b, Kec. Balikpapan Selatan, Kel. Sepinggan Baru, Balikpapan
              </div>
            </div>
          </div>

          <div style={s.filterRow}>
            {filters.map((f) => (
              <span
                key={f}
                style={{ ...s.chip, ...(activeFilter === f ? s.chipOn : {}) }}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </span>
            ))}
          </div>

          <div style={s.listHeader}>
            <div style={s.listBar} />
            <span style={s.listTitle}>Faskes Terdekat</span>
            <span style={s.listCount}>{filtered.length} hasil</span>
          </div>

          <div style={s.faskesList}>
            {filtered.map((d) => (
              <div
                key={d.id}
                style={{ ...s.fcard, ...(d.id === selected ? s.fcardSelected : {}) }}
                onClick={() => setSelected(d.id)}
              >
                <div style={s.fcardHead}>
                  <div style={s.fcardIcon}><HomeIcon /></div>
                  <div style={s.fcardName}>
                    {d.name}
                    <span style={{ ...s.badge, ...(d.status === "Tutup" ? s.badgeTutup : s.badgeBuka) }}>
                      {d.status}
                    </span>
                  </div>
                </div>
                <div style={s.fcardMeta}>
                  <span>● {d.distance} km</span>
                  <span>{d.type}</span>
                </div>
                <div style={s.fcardAddr}>📍 {d.address}</div>
                <div style={s.fcardPhone}>📞 {d.phone}</div>
                <div style={s.fcardFooter}>
                  <button style={s.btnRoute}>🗺 Rute</button>
                  <button style={s.btnDetail}>Detail ›</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Area */}
        <div style={s.mapArea}>
          <svg width="100%" height="100%" viewBox="0 0 700 624" xmlns="http://www.w3.org/2000/svg">
            <rect width="700" height="624" fill="#e8ede8" />
            <path d="M0,200 Q100,180 200,220 Q320,265 440,190 Q560,115 700,160 L700,624 L0,624Z" fill="#dde8dd" />
            <path d="M0,260 Q120,235 260,275 Q380,310 500,245 L700,260 L700,624 L0,624Z" fill="#ccdacc" opacity="0.7" />
            <path d="M80,140 Q140,100 220,140 Q300,180 380,100 Q440,40 540,90 Q580,110 630,150" stroke="#d4c4a0" strokeWidth="18" fill="none" />
            <path d="M0,300 Q100,280 210,315 Q330,355 460,295 Q560,245 660,300 L700,310" stroke="#c4b890" strokeWidth="12" fill="none" />
            <path d="M350,624 Q370,500 400,380 Q415,310 450,240" stroke="#d4c4a0" strokeWidth="12" fill="none" />
            <path d="M0,420 Q80,400 180,440 Q280,475 380,430 Q460,395 560,435 L700,445" stroke="#c8b880" strokeWidth="8" fill="none" opacity="0.7" />
            <rect x="80" y="125" width="120" height="22" rx="4" fill="#f5f0e0" opacity="0.9" />
            <text x="140" y="141" textAnchor="middle" fontSize="11" fill="#666" fontFamily="sans-serif">KM. 5.5 Graha Indah</text>
            <text x="120" y="180" textAnchor="start" fontSize="9" fill="#999" fontFamily="sans-serif">GN. PIPA</text>
            <text x="580" y="360" textAnchor="middle" fontSize="9" fill="#999" fontFamily="sans-serif">PUSKES SEPINGGAN</text>
            <text x="380" y="228" textAnchor="middle" fontSize="10" fill="#555" fontFamily="sans-serif" fontWeight="bold">UPTD Puskesmas Gn. Bahagia</text>

            {faskesData.map((d) => (
              <g key={d.id} style={{ cursor: "pointer", opacity: d.id === selected ? 1 : 0.5 }} onClick={() => setSelected(d.id)}>
                <circle cx={d.markerX} cy={d.markerY - 8} r="18" fill="#cc1166" />
                <text x={d.markerX} y={d.markerY - 3} textAnchor="middle" fontSize={d.type === "RS" ? "11" : "14"} fill="#fff" fontFamily="sans-serif">
                  {d.type === "RS" ? "H" : "⌂"}
                </text>
                <polygon points={`${d.markerX},${d.markerY + 12} ${d.markerX - 6},${d.markerY - 2} ${d.markerX + 6},${d.markerY - 2}`} fill="#cc1166" />
              </g>
            ))}

            <circle cx="540" cy="290" r="12" fill="#1a6fcc" opacity="0.9" />
            <circle cx="540" cy="290" r="20" fill="#1a6fcc" opacity="0.2" />
          </svg>

          <div style={s.mapOverlay}>
            <div style={s.mapBtn}>+</div>
            <div style={s.mapBtn}>-</div>
            <div style={{ ...s.mapBtn, fontSize: "13px" }}>●</div>
          </div>

          {selectedData && (
            <div style={s.infoPopup}>
              <div style={s.popupName}>{selectedData.name}</div>
              <div style={s.popupRow}>
                <span style={s.popupOpen}>{selectedData.status}</span> · {selectedData.type}
              </div>
              <div style={s.popupRow}>{selectedData.distance} km dari lokasi anda</div>
              <div style={{ ...s.popupRow, color: "#aaa", fontSize: "11px" }}>{selectedData.address}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const s = {
  page: {
    background: "#fff5f8",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    color: "#1a1a2e",
    fontSize: "14px",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "340px 1fr",
    height: "calc(100vh - 56px)",
    overflow: "hidden",
  },
  sidebar: {
    background: "#fff",
    borderRight: "1px solid #eee",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  searchBox: {
    padding: "14px 16px",
    borderBottom: "1px solid #f0f0f0",
  },
  locBanner: {
    margin: "12px 16px 0",
    background: "#fff3f8",
    border: "1px solid #f8bbd0",
    borderRadius: "10px",
    padding: "10px 12px",
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
  },
  locDot: {
    width: "12px", height: "12px", borderRadius: "50%",
    background: "#e91e8c", flexShrink: 0, marginTop: "3px",
  },
  locLbl: { fontSize: "11px", color: "#888", marginBottom: "2px" },
  locAddr: { fontSize: "12px", color: "#333", lineHeight: "1.4" },
  filterRow: { padding: "10px 16px 0", display: "flex", gap: "6px" },
  chip: {
    fontSize: "11px", padding: "4px 10px", borderRadius: "20px",
    border: "1px solid #e0e0e0", cursor: "pointer", background: "#fff", color: "#666",
  },
  chipOn: {
    background: "#fce4ec", borderColor: "#f48fb1",
    color: "#c2185b", fontWeight: "600",
  },
  listHeader: {
    padding: "12px 16px 8px",
    display: "flex", alignItems: "center", gap: "8px",
  },
  listBar: { width: "3px", height: "18px", background: "#e91e8c", borderRadius: "2px" },
  listTitle: { fontSize: "14px", fontWeight: "700", color: "#555" },
  listCount: { marginLeft: "auto", fontSize: "12px", color: "#aaa" },
  faskesList: { overflowY: "auto", flex: 1, padding: "0 16px 16px" },
  fcard: {
    background: "#fce4ec", borderRadius: "12px",
    padding: "12px", marginBottom: "10px",
    cursor: "pointer", border: "2px solid transparent",
  },
  fcardSelected: { borderColor: "#e91e8c", background: "#fad7e8" },
  fcardHead: { display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "6px" },
  fcardIcon: {
    width: "32px", height: "32px", borderRadius: "8px",
    background: "#e91e8c", display: "flex", alignItems: "center",
    justifyContent: "center", flexShrink: 0, color: "#fff",
  },
  fcardName: { fontWeight: "700", color: "#e91e8c", fontSize: "13px", lineHeight: "1.3" },
  badge: {
    display: "inline-block", fontSize: "10px", fontWeight: "600",
    padding: "2px 7px", borderRadius: "20px", marginLeft: "6px",
  },
  badgeBuka: { background: "#e8f5e9", color: "#2e7d32" },
  badgeTutup: { background: "#fff3e0", color: "#e65100" },
  fcardMeta: { fontSize: "12px", color: "#666", marginBottom: "4px", display: "flex", gap: "12px" },
  fcardAddr: { fontSize: "11px", color: "#555", lineHeight: "1.4", marginBottom: "3px" },
  fcardPhone: { fontSize: "11px", color: "#888" },
  fcardFooter: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #f8bbd0",
  },
  btnRoute: {
    fontSize: "11px", background: "#e91e8c", color: "#fff",
    border: "none", borderRadius: "6px", padding: "5px 10px", cursor: "pointer",
  },
  btnDetail: {
    fontSize: "11px", background: "#fff", color: "#e91e8c",
    border: "1px solid #e91e8c", borderRadius: "6px", padding: "5px 10px", cursor: "pointer",
  },
  mapArea: { position: "relative", background: "#e8ede8", overflow: "hidden" },
  mapOverlay: {
    position: "absolute", top: "12px", right: "12px",
    display: "flex", flexDirection: "column", gap: "6px",
  },
  mapBtn: {
    width: "32px", height: "32px", background: "#fff",
    border: "1px solid #ddd", borderRadius: "8px",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", fontSize: "16px", fontWeight: "700", color: "#555",
  },
  infoPopup: {
    position: "absolute", top: "12px", left: "12px",
    background: "#fff", borderRadius: "10px",
    padding: "10px 14px", boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
    minWidth: "200px",
  },
  popupName: { fontWeight: "700", fontSize: "13px", color: "#e91e8c", marginBottom: "4px" },
  popupRow: { fontSize: "12px", color: "#555", marginBottom: "2px" },
  popupOpen: { color: "#2e7d32", fontWeight: "600" },
}