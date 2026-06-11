import { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import DetailFaskeMap from "./DetailFaskeMap";

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
];

const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

export default function FaskesMap({ setActivePage, onLogout, activePage }) {
  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [showDetail, setShowDetail] = useState(false);
  const [selectedFaskes, setSelectedFaskes] = useState(null);

  const filters = ["Semua", "Puskesmas", "RS", "Klinik"];

  const filtered = useMemo(() => {
    return faskesData.filter((d) => {
      const q = search.toLowerCase();
      const matchSearch = d.name.toLowerCase().includes(q) || d.address.toLowerCase().includes(q);
      const matchFilter = activeFilter === "Semua" || d.type === activeFilter;
      return matchSearch && matchFilter;
    });
  }, [search, activeFilter]);

  const selectedData = faskesData.find((d) => d.id === selected) || filtered[0] || faskesData[0];

  const renderMarker = (d) => {
    const isSelected = d.id === selected;
    const isClosed = d.status === "Tutup";
    const isRS = d.type === "RS";
    const opacity = isClosed ? 0.55 : 1;
    const markerSize = isRS ? 15 : 13;
    const tipY = d.markerY + markerSize + 4;

    return (
      <g
        key={d.id}
        style={{ cursor: "pointer", opacity }}
        onClick={() => setSelected(d.id)}
      >
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
            <text x={d.markerX} y={d.markerY + 5} textAnchor="middle" fontSize="10" fill="#cc1155" fontFamily="sans-serif" fontWeight="bold">
              H
            </text>
          </>
        ) : (
          <text x={d.markerX} y={d.markerY + 4} textAnchor="middle" fontSize="11" fill="#fff" fontFamily="sans-serif">
            ⌂
          </text>
        )}
      </g>
    );
  };

  if (showDetail && selectedFaskes) {
    return (
      <DetailFaskeMap
        faskes={selectedFaskes}
        onBack={() => {
          setShowDetail(false);
          setSelectedFaskes(null);
        }}
        setActivePage={setActivePage}
        activePage={activePage}
        onLogout={onLogout}
      />
    );
  }

  return (
    <div className="faskes-page">
      <Navbar activePage={activePage} setActivePage={setActivePage} onLogout={onLogout} />

      <div className="faskes-layout">
        <aside className="faskes-sidebar">
          <div className="faskes-search">
            <SearchBar onSearch={(q) => setSearch(q)} minimal />
          </div>

          <div className="faskes-location">
            <div className="faskes-location-dot" />
            <div>
              <div className="faskes-location-label">Lokasi anda saat ini</div>
              <div className="faskes-location-address">
                Jl. Tunggal Ika No. 11b, Kec. Balikpapan Selatan, Kel. Sepinggan Baru, Balikpapan
              </div>
            </div>
          </div>

          <div className="faskes-filters">
            {filters.map((f) => (
              <button
                key={f}
                className={`faskes-chip ${activeFilter === f ? "is-active" : ""}`}
                onClick={() => setActiveFilter(f)}
                type="button"
              >
                {f}
              </button>
            ))}
          </div>

          <div className="faskes-list-header">
            <div className="faskes-list-bar" />
            <span className="faskes-list-title">Faskes Terdekat</span>
            <span className="faskes-list-count">{filtered.length} hasil</span>
          </div>

          <div className="faskes-list">
            {filtered.map((d) => (
              <div
                key={d.id}
                className={`faskes-card ${d.id === selected ? "is-selected" : ""}`}
                onClick={() => setSelected(d.id)}
              >
                <div className="faskes-card-head">
                  <div className="faskes-card-icon">
                    <HomeIcon />
                  </div>
                  <div className="faskes-card-name-wrap">
                    <div className="faskes-card-name">{d.name}</div>
                    <span className={`faskes-badge ${d.status === "Tutup" ? "badge-closed" : "badge-open"}`}>
                      {d.status}
                    </span>
                  </div>
                </div>

                <div className="faskes-card-meta">
                  <span>● {d.distance} km</span>
                  <span>{d.type}</span>
                </div>

                <div className="faskes-card-address">📍 {d.address}</div>
                <div className="faskes-card-phone">📞 {d.phone}</div>

                <div className="faskes-card-footer">
                  <button
                    className="btn-route"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://maps.google.com/?q=${encodeURIComponent(d.address)}`, "_blank");
                    }}
                    type="button"
                  >
                    🗺 Rute
                  </button>
                  <button
                    className="btn-detail"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFaskes(d);
                      setShowDetail(true);
                    }}
                    type="button"
                  >
                    Detail ›
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="faskes-map-area">
          <svg className="faskes-map-svg" viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
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

            <rect width="700" height="520" fill="#e6eedf" />
            <rect width="700" height="520" fill="url(#dots)" />

            <path d="M520,380 Q580,360 660,390 Q700,405 700,440 L700,520 L520,520Z" fill="#b8d4e8" />
            <path d="M580,440 Q620,420 680,445 L700,455 L700,520 L560,520Z" fill="#a8cce0" />
            <text x="635" y="490" textAnchor="middle" fontSize="10" fill="#6a9ab8" fontFamily="Georgia,serif" fontStyle="italic">
              Teluk Balikpapan
            </text>

            <path d="M0,0 Q80,30 180,10 Q280,-10 380,30 Q480,60 560,20 Q640,-5 700,15 L700,200 Q580,170 460,200 Q340,230 220,190 Q110,155 0,180Z" fill="#d8e8d0" />
            <path d="M0,180 Q110,205 220,230 Q350,255 460,220 Q560,195 700,220 L700,380 Q600,350 480,370 Q360,390 240,355 Q120,320 0,345Z" fill="#cce0c4" />

            <ellipse cx="160" cy="280" rx="90" ry="55" fill="#d4e8cc" opacity="0.7" />
            <ellipse cx="420" cy="180" rx="100" ry="60" fill="#d0e4c8" opacity="0.6" />
            <ellipse cx="560" cy="310" rx="80" ry="50" fill="#cce0c8" opacity="0.6" />

            <path d="M30,155 Q120,145 220,160 Q350,180 470,150 Q570,125 680,140" stroke="#fff" strokeWidth="9" fill="none" strokeLinecap="round" />
            <path d="M30,155 Q120,145 220,160 Q350,180 470,150 Q570,125 680,140" stroke="#e8dfc8" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M30,155 Q120,145 220,160 Q350,180 470,150 Q570,125 680,140" stroke="#fff" strokeWidth="1" fill="none" strokeDasharray="12 10" strokeLinecap="round" />

            <path d="M0,290 Q100,275 210,300 Q330,328 460,295 Q560,270 680,285" stroke="#fff" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M0,290 Q100,275 210,300 Q330,328 460,295 Q560,270 680,285" stroke="#e0d8c0" strokeWidth="5" fill="none" />
            <path d="M0,290 Q100,275 210,300 Q330,328 460,295 Q560,270 680,285" stroke="#fff" strokeWidth="0.8" fill="none" strokeDasharray="10 8" />

            <path d="M320,380 Q400,365 490,372 Q560,378 630,360" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M320,380 Q400,365 490,372 Q560,378 630,360" stroke="#ddd4b8" strokeWidth="4" fill="none" />

            <path d="M340,180 Q350,220 360,260 Q368,295 370,340" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M340,180 Q350,220 360,260 Q368,295 370,340" stroke="#e0d8c0" strokeWidth="4" fill="none" />

            <path d="M490,150 Q520,200 540,255 Q555,295 560,340" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M490,150 Q520,200 540,255 Q555,295 560,340" stroke="#e0d8c0" strokeWidth="4" fill="none" />

            {faskesData.map((d) => renderMarker(d))}

            <circle cx="530" cy="295" r="22" fill="url(#userBlip)" opacity="0.4" />
            <circle cx="530" cy="295" r="8" fill="#1a7fe8" opacity="0.9" />
            <circle cx="530" cy="295" r="5" fill="#fff" />
            <circle cx="530" cy="295" r="3" fill="#1a7fe8" />
          </svg>

          <div className="map-controls">
            <button type="button">+</button>
            <button type="button">-</button>
            <button type="button">●</button>
          </div>

          {selectedData && (
            <div className="map-popup">
              <div className="map-popup-name">{selectedData.name}</div>
              <div className="map-popup-row">
                <span className="map-popup-open">{selectedData.status}</span> · {selectedData.type}
              </div>
              <div className="map-popup-row">{selectedData.distance} km dari lokasi anda</div>
              <div className="map-popup-row muted">{selectedData.address}</div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        .faskes-page {
          background: #fff5f8;
          min-height: 100vh;
          font-family: 'Segoe UI', Arial, sans-serif;
          color: #1a1a2e;
        }

        .faskes-layout {
          display: grid;
          grid-template-columns: 340px 1fr;
          height: calc(100vh - 56px);
          overflow: hidden;
        }

        .faskes-sidebar {
          background: #fff;
          border-right: 1px solid #eee;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
        }

        .faskes-search {
          padding: 12px 14px;
          border-bottom: 1px solid #f0f0f0;
        }

        .faskes-location {
          margin: 10px 14px 0;
          background: #fff3f8;
          border: 1px solid #f8bbd0;
          border-radius: 12px;
          padding: 10px 12px;
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }

        .faskes-location-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #e91e8c;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .faskes-location-label {
          font-size: 10px;
          color: #888;
          margin-bottom: 2px;
        }

        .faskes-location-address {
          font-size: 12px;
          color: #333;
          line-height: 1.35;
        }

        .faskes-filters {
          padding: 10px 14px 0;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .faskes-chip {
          font-size: 11px;
          padding: 5px 10px;
          border-radius: 9999px;
          border: 1px solid #e0e0e0;
          background: #fff;
          color: #666;
          cursor: pointer;
        }

        .faskes-chip.is-active {
          background: #fce4ec;
          border-color: #f48fb1;
          color: #c2185b;
          font-weight: 600;
        }

        .faskes-list-header {
          padding: 12px 14px 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .faskes-list-bar {
          width: 3px;
          height: 16px;
          background: #e91e8c;
          border-radius: 2px;
        }

        .faskes-list-title {
          font-size: 13px;
          font-weight: 700;
          color: #555;
        }

        .faskes-list-count {
          margin-left: auto;
          font-size: 11px;
          color: #aaa;
        }

        .faskes-list {
          flex: 1;
          overflow-y: auto;
          padding: 0 14px 14px;
        }

        .faskes-card {
          background: #fce4ec;
          border-radius: 12px;
          padding: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          border: 2px solid transparent;
        }

        .faskes-card.is-selected {
          border-color: #e91e8c;
          background: #fad7e8;
        }

        .faskes-card-head {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 6px;
        }

        .faskes-card-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: #e91e8c;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #fff;
        }

        .faskes-card-name-wrap {
          flex: 1;
          min-width: 0;
        }

        .faskes-card-name {
          font-weight: 700;
          color: #e91e8c;
          font-size: 12.5px;
          line-height: 1.25;
        }

        .faskes-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 9999px;
          margin-top: 4px;
        }

        .badge-open {
          background: #e8f5e9;
          color: #2e7d32;
        }

        .badge-closed {
          background: #fff3e0;
          color: #e65100;
        }

        .faskes-card-meta {
          font-size: 11px;
          color: #666;
          margin-bottom: 4px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .faskes-card-address,
        .faskes-card-phone {
          font-size: 11px;
          color: #666;
          line-height: 1.3;
        }

        .faskes-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid #f8bbd0;
          gap: 8px;
        }

        .btn-route,
        .btn-detail {
          font-size: 11px;
          border-radius: 8px;
          padding: 6px 10px;
          cursor: pointer;
        }

        .btn-route {
          background: #e91e8c;
          color: #fff;
          border: none;
        }

        .btn-detail {
          background: #fff;
          color: #e91e8c;
          border: 1px solid #e91e8c;
        }

        .faskes-map-area {
          position: relative;
          background: #e8ede8;
          overflow: hidden;
          min-width: 0;
        }

        .faskes-map-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .map-controls {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .map-controls button {
          width: 32px;
          height: 32px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 15px;
          font-weight: 700;
          color: #555;
        }

        .map-popup {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #fff;
          border-radius: 10px;
          padding: 10px 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          min-width: 190px;
          max-width: 250px;
        }

        .map-popup-name {
          font-weight: 700;
          font-size: 13px;
          color: #e91e8c;
          margin-bottom: 4px;
        }

        .map-popup-row {
          font-size: 11.5px;
          color: #555;
          margin-bottom: 2px;
          line-height: 1.35;
        }

        .map-popup-row.muted {
          color: #888;
        }

        .map-popup-open {
          color: #2e7d32;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .faskes-layout {
            grid-template-columns: 1fr;
            height: auto;
            overflow: visible;
          }

          .faskes-sidebar {
            order: 1;
            border-right: none;
            border-bottom: 1px solid #eee;
            max-height: 48vh;
          }

          .faskes-map-area {
            order: 2;
            height: 62vh;
            min-height: 420px;
          }
        }

        @media (max-width: 768px) {
          .faskes-sidebar {
            max-height: none;
            overflow: visible;
          }

          .faskes-map-area {
            height: 56vh;
            min-height: 360px;
          }

          .faskes-search {
            padding: 10px 12px;
          }

          .faskes-location,
          .faskes-list-header,
          .faskes-list,
          .faskes-filters {
            padding-left: 12px;
            padding-right: 12px;
          }

          .faskes-location-address {
            font-size: 11px;
          }

          .faskes-card {
            padding: 9px;
          }

          .map-popup {
            max-width: 190px;
          }
        }

        @media (max-width: 480px) {
          .faskes-map-area {
            height: 50vh;
            min-height: 320px;
          }

          .faskes-card-footer {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-route,
          .btn-detail {
            width: 100%;
          }

          .map-controls {
            top: 8px;
            right: 8px;
          }

          .map-controls button {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </div>
  );
}