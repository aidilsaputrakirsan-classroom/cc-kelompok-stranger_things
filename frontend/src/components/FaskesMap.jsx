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
    markerX: 370,
    markerY: 248,
  },
  {
    id: 1,
    name: "Puskesmas Sepinggan",
    type: "Puskesmas",
    distance: "2.1",
    status: "Buka",
    address: "Jl. Marsma Iswahyudi, Balikpapan",
    phone: "0542-111222",
    markerX: 562,
    markerY: 310,
  },
  {
    id: 2,
    name: "Puskesmas Gunung Sari",
    type: "Puskesmas",
    distance: "3.4",
    status: "Buka",
    address: "Jl. Gunung Sari Ilir, Balikpapan Tengah",
    phone: "0542-222333",
    markerX: 185,
    markerY: 252,
  },
  {
    id: 3,
    name: "RS Pertamina Balikpapan",
    type: "RS",
    distance: "4.2",
    status: "Buka 24 Jam",
    address: "Jl. Yos Sudarso No.1, Balikpapan",
    phone: "0542-531000",
    markerX: 448,
    markerY: 388,
  },
  {
    id: 4,
    name: "Klinik Pratama Sepinggan",
    type: "Klinik",
    distance: "1.9",
    status: "Tutup",
    address: "Jl. Sepinggan Baru No. 45, Balikpapan",
    phone: "0542-778899",
    markerX: 128,
    markerY: 350,
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

  const renderMarker = (d) => {
    const isSelected = d.id === selected
    const isClosed = d.status === "Tutup"
    const isRS = d.type === "RS"
    const opacity = isClosed ? 0.5 : 1
    const markerSize = isRS ? 16 : 14
    const tipY = d.markerY + markerSize + 4

    return (
      <g
        key={d.id}
        style={{ cursor: "pointer", opacity }}
        onClick={() => setSelected(d.id)}
        filter={isSelected ? "url(#markershadowBig)" : "url(#markershadow)"}
      >
        {/* Pulse ring for selected */}
        {isSelected && (
          <circle
            cx={d.markerX}
            cy={d.markerY}
            r={markerSize + 8}
            fill="#e91e8c"
            opacity="0.18"
          />
        )}
        <circle cx={d.markerX} cy={d.markerY} r={markerSize} fill={isRS ? "#cc1155" : "#e91e8c"} />
        <polygon
          points={`${d.markerX},${tipY} ${d.markerX - 6},${d.markerY + markerSize - 4} ${d.markerX + 6},${d.markerY + markerSize - 4}`}
          fill={isRS ? "#cc1155" : "#e91e8c"}
        />
        {isRS ? (
          <>
            <rect x={d.markerX - 7} y={d.markerY - 7} width="14" height="14" rx="2" fill="#fff" />
            <text x={d.markerX} y={d.markerY + 5} textAnchor="middle" fontSize="10" fill="#cc1155" fontFamily="sans-serif" fontWeight="bold">H</text>
          </>
        ) : (
          <text x={d.markerX} y={d.markerY + 4} textAnchor="middle" fontSize="12" fill="#fff" fontFamily="sans-serif">⌂</text>
        )}
      </g>
    )
  }

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
          <svg width="100%" height="100%" viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="7" cy="7" r="0.8" fill="#b8c8b0" />
              </pattern>
              <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00000030" />
              </filter>
              <filter id="markershadow">
                <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#00000050" />
              </filter>
              <filter id="markershadowBig">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#e91e8c60" />
              </filter>
              <radialGradient id="userBlip" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1a7fe8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1a7fe8" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Base land */}
            <rect width="700" height="520" fill="#e6eedf" />
            <rect width="700" height="520" fill="url(#dots)" />

            {/* Sea */}
            <path d="M520,380 Q580,360 660,390 Q700,405 700,440 L700,520 L520,520Z" fill="#b8d4e8" />
            <path d="M580,440 Q620,420 680,445 L700,455 L700,520 L560,520Z" fill="#a8cce0" />
            <text x="635" y="490" textAnchor="middle" fontSize="10" fill="#6a9ab8" fontFamily="Georgia,serif" fontStyle="italic">Teluk Balikpapan</text>

            {/* Terrain */}
            <path d="M0,0 Q80,30 180,10 Q280,-10 380,30 Q480,60 560,20 Q640,-5 700,15 L700,200 Q580,170 460,200 Q340,230 220,190 Q110,155 0,180Z" fill="#d8e8d0" />
            <path d="M0,180 Q110,205 220,230 Q350,255 460,220 Q560,195 700,220 L700,380 Q600,350 480,370 Q360,390 240,355 Q120,320 0,345Z" fill="#cce0c4" />

            {/* Neighborhood zones */}
            <ellipse cx="160" cy="280" rx="90" ry="55" fill="#d4e8cc" opacity="0.7" />
            <ellipse cx="420" cy="180" rx="100" ry="60" fill="#d0e4c8" opacity="0.6" />
            <ellipse cx="560" cy="310" rx="80" ry="50" fill="#cce0c8" opacity="0.6" />

            {/* ===== ROADS ===== */}
            {/* Jl. Soekarno-Hatta */}
            <path d="M30,155 Q120,145 220,160 Q350,180 470,150 Q570,125 680,140" stroke="#fff" strokeWidth="9" fill="none" strokeLinecap="round" />
            <path d="M30,155 Q120,145 220,160 Q350,180 470,150 Q570,125 680,140" stroke="#e8dfc8" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M30,155 Q120,145 220,160 Q350,180 470,150 Q570,125 680,140" stroke="#fff" strokeWidth="1" fill="none" strokeDasharray="12 10" strokeLinecap="round" />

            {/* Jl. MT Haryono */}
            <path d="M0,290 Q100,275 210,300 Q330,328 460,295 Q560,270 680,285" stroke="#fff" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M0,290 Q100,275 210,300 Q330,328 460,295 Q560,270 680,285" stroke="#e0d8c0" strokeWidth="5" fill="none" />
            <path d="M0,290 Q100,275 210,300 Q330,328 460,295 Q560,270 680,285" stroke="#fff" strokeWidth="0.8" fill="none" strokeDasharray="10 8" />

            {/* Jl. Yos Sudarso */}
            <path d="M320,380 Q400,365 490,372 Q560,378 630,360" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M320,380 Q400,365 490,372 Q560,378 630,360" stroke="#ddd4b8" strokeWidth="4" fill="none" />

            {/* Jl. Ruhui Rahayu II */}
            <path d="M340,180 Q350,220 360,260 Q368,295 370,340" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M340,180 Q350,220 360,260 Q368,295 370,340" stroke="#e0d8c0" strokeWidth="4" fill="none" />

            {/* Jl. Marsma Iswahyudi */}
            <path d="M490,150 Q520,200 540,255 Q555,295 560,340" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M490,150 Q520,200 540,255 Q555,295 560,340" stroke="#e0d8c0" strokeWidth="4" fill="none" />

            {/* Secondary roads */}
            <path d="M180,160 Q195,205 200,250 Q202,280 195,315" stroke="#f5f2eb" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M220,160 Q240,195 250,240 Q260,275 255,310" stroke="#f5f2eb" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M100,290 Q140,295 180,290 Q220,285 260,295" stroke="#f0ede4" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M390,295 Q440,290 490,300 Q530,308 560,295" stroke="#f0ede4" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M60,155 Q65,210 70,270 Q72,305 75,345" stroke="#f5f2eb" strokeWidth="3.5" fill="none" />
            <path d="M600,140 Q610,200 615,270 Q617,315 610,355" stroke="#f5f2eb" strokeWidth="3.5" fill="none" />
            <path d="M370,340 Q410,360 450,372" stroke="#f0ede4" strokeWidth="3" fill="none" />

            {/* Small local streets */}
            <path d="M100,275 Q115,260 130,250" stroke="#ede9e0" strokeWidth="2" fill="none" />
            <path d="M250,280 Q270,265 285,255" stroke="#ede9e0" strokeWidth="2" fill="none" />
            <path d="M450,270 Q470,258 485,248" stroke="#ede9e0" strokeWidth="2" fill="none" />

            {/* ===== BUILDINGS ===== */}
            <rect x="82" y="200" width="38" height="22" rx="2" fill="#c8d8c0" opacity="0.8" />
            <rect x="128" y="195" width="28" height="18" rx="2" fill="#c0d0b8" opacity="0.8" />
            <rect x="82" y="230" width="24" height="16" rx="2" fill="#c8d8c0" opacity="0.7" />
            <rect x="112" y="228" width="32" height="14" rx="2" fill="#bccbb4" opacity="0.7" />
            <rect x="265" y="200" width="42" height="24" rx="2" fill="#c4d4bc" opacity="0.8" />
            <rect x="315" y="204" width="22" height="18" rx="2" fill="#bccbb4" opacity="0.7" />
            <rect x="266" y="232" width="30" height="16" rx="2" fill="#c0d0b8" opacity="0.7" />
            <rect x="400" y="205" width="36" height="20" rx="2" fill="#c8d8c0" opacity="0.8" />
            <rect x="444" y="200" width="24" height="26" rx="2" fill="#bccbb4" opacity="0.8" />
            <rect x="402" y="232" width="28" height="14" rx="2" fill="#c0d0b8" opacity="0.7" />
            <rect x="88" y="315" width="34" height="20" rx="2" fill="#c4d4bc" opacity="0.7" />
            <rect x="128" y="312" width="26" height="22" rx="2" fill="#c0d0b8" opacity="0.7" />
            <rect x="88" y="342" width="22" height="14" rx="2" fill="#bccbb4" opacity="0.6" />
            <rect x="430" y="315" width="38" height="22" rx="2" fill="#c4d4bc" opacity="0.7" />
            <rect x="475" y="318" width="28" height="18" rx="2" fill="#c0d0b8" opacity="0.7" />

            {/* Park */}
            <ellipse cx="290" cy="360" rx="30" ry="18" fill="#a8d08c" opacity="0.7" />
            <ellipse cx="291" cy="360" rx="20" ry="12" fill="#98c07c" opacity="0.5" />
            <text x="290" y="363" textAnchor="middle" fontSize="7" fill="#4a8a3a" fontFamily="sans-serif">TAMAN</text>

            {/* ===== ROAD LABELS ===== */}
            <text x="200" y="147" textAnchor="middle" fontSize="9" fill="#8a7e5e" fontFamily="Georgia,serif" fontWeight="bold" transform="rotate(-2,200,147)">Jl. Soekarno-Hatta</text>
            <text x="500" y="134" textAnchor="middle" fontSize="9" fill="#8a7e5e" fontFamily="Georgia,serif" transform="rotate(-2,500,134)">Jl. Soekarno-Hatta</text>
            <text x="180" y="280" textAnchor="middle" fontSize="8.5" fill="#7a7060" fontFamily="sans-serif" transform="rotate(-2,180,280)">Jl. MT Haryono</text>
            <text x="480" y="272" textAnchor="middle" fontSize="8.5" fill="#7a7060" fontFamily="sans-serif" transform="rotate(-2,480,272)">Jl. MT Haryono</text>
            <text x="360" y="377" textAnchor="middle" fontSize="8" fill="#8a7e5e" fontFamily="sans-serif" transform="rotate(-3,360,377)">Jl. Ruhui Rahayu II</text>
            <text x="555" y="230" textAnchor="middle" fontSize="8" fill="#7a7060" fontFamily="sans-serif" transform="rotate(80,555,230)">Jl. Marsma Iswahyudi</text>
            <text x="470" y="368" textAnchor="middle" fontSize="8" fill="#7a7060" fontFamily="sans-serif" transform="rotate(-2,470,368)">Jl. Yos Sudarso</text>

            {/* ===== AREA LABELS ===== */}
            <text x="155" y="258" textAnchor="middle" fontSize="10" fill="#6a7860" fontFamily="Georgia,serif" fontStyle="italic" opacity="0.8">Gn. Sari</text>
            <text x="415" y="170" textAnchor="middle" fontSize="10" fill="#6a7860" fontFamily="Georgia,serif" fontStyle="italic" opacity="0.8">Gn. Bahagia</text>
            <text x="555" y="300" textAnchor="middle" fontSize="10" fill="#6a7860" fontFamily="Georgia,serif" fontStyle="italic" opacity="0.8">Sepinggan</text>
            <text x="95" y="358" textAnchor="middle" fontSize="9.5" fill="#6a7860" fontFamily="Georgia,serif" fontStyle="italic" opacity="0.7">Klandasan</text>

            {/* ===== COMPASS ===== */}
            <g transform="translate(648,52)">
              <circle cx="0" cy="0" r="20" fill="#fff" opacity="0.85" stroke="#c8c0a8" strokeWidth="0.8" />
              <polygon points="0,-14 -4,-4 0,-7 4,-4" fill="#888" />
              <polygon points="0,14 -4,4 0,7 4,4" fill="#bbb" />
              <polygon points="-14,0 -4,-4 -7,0 -4,4" fill="#bbb" />
              <polygon points="14,0 4,-4 7,0 4,4" fill="#bbb" />
              <text x="0" y="-16" textAnchor="middle" fontSize="8" fill="#555" fontFamily="sans-serif" fontWeight="bold">U</text>
            </g>

            {/* ===== SCALE BAR ===== */}
            <g transform="translate(28,488)">
              <rect x="0" y="0" width="60" height="5" rx="1" fill="#9a9080" />
              <rect x="0" y="0" width="30" height="5" rx="1" fill="#fff" />
              <rect x="0" y="-1" width="1" height="7" fill="#9a9080" />
              <rect x="60" y="-1" width="1" height="7" fill="#9a9080" />
              <rect x="30" y="-1" width="1" height="7" fill="#9a9080" />
              <text x="0" y="14" fontSize="8" fill="#888" fontFamily="sans-serif">0</text>
              <text x="30" y="14" textAnchor="middle" fontSize="8" fill="#888" fontFamily="sans-serif">1</text>
              <text x="60" y="14" textAnchor="end" fontSize="8" fill="#888" fontFamily="sans-serif">2 km</text>
            </g>

            {/* ===== FASKES MARKERS ===== */}
            {faskesData.map((d) => renderMarker(d))}

            {/* ===== USER LOCATION ===== */}
            <circle cx="530" cy="295" r="22" fill="url(#userBlip)" opacity="0.4" />
            <circle cx="530" cy="295" r="8" fill="#1a7fe8" opacity="0.9" />
            <circle cx="530" cy="295" r="5" fill="#fff" />
            <circle cx="530" cy="295" r="3" fill="#1a7fe8" />
            <rect x="494" y="263" width="72" height="24" rx="5" fill="#1a7fe8" />
            <text x="530" y="279" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="sans-serif" fontWeight="bold">Lokasi Anda</text>

            {/* ===== LEGEND ===== */}
            <rect x="28" y="416" width="138" height="62" rx="7" fill="#fff" opacity="0.88" stroke="#d8d0c0" strokeWidth="0.8" />
            <text x="40" y="432" fontSize="9" fill="#666" fontFamily="sans-serif" fontWeight="bold">LEGENDA</text>
            <circle cx="44" cy="445" r="6" fill="#e91e8c" />
            <text x="56" y="449" fontSize="9" fill="#444" fontFamily="sans-serif">Puskesmas / Klinik</text>
            <circle cx="44" cy="460" r="7" fill="#cc1155" />
            <rect x="40" y="456" width="8" height="8" rx="1" fill="#fff" opacity="0.9" />
            <text x="56" y="464" fontSize="9" fill="#444" fontFamily="sans-serif">Rumah Sakit</text>
            <circle cx="44" cy="474" r="5" fill="#1a7fe8" />
            <circle cx="44" cy="474" r="3" fill="#fff" />
            <circle cx="44" cy="474" r="2" fill="#1a7fe8" />
            <text x="56" y="478" fontSize="9" fill="#444" fontFamily="sans-serif">Lokasi Anda</text>
          </svg>

          {/* Map controls */}
          <div style={s.mapOverlay}>
            <div style={s.mapBtn}>+</div>
            <div style={s.mapBtn}>-</div>
            <div style={{ ...s.mapBtn, fontSize: "13px" }}>●</div>
          </div>

          {/* Info popup */}
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