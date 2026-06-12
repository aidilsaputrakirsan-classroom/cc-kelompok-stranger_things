import { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import DetailFaskeMap from "./DetailFaskeMap";
import { useTheme } from "../hooks/ThemeContext";

const faskesData = [
  {
    id: 0,
    name: "UPTD Puskesmas Gn. Bahagia",
    type: "Puskesmas",
    distance: "1.5",
    status: "Buka",
    address: "Jl. Ruhui Rahayu II No. 789, Balikpapan Selatan",
    phone: "0542-345678",
    lat: -1.2654,
    lng: 116.8312,
  },
  {
    id: 1,
    name: "Puskesmas Sepinggan",
    type: "Puskesmas",
    distance: "2.1",
    status: "Buka",
    address: "Jl. Marsma Iswahyudi, Balikpapan",
    phone: "0542-111222",
    lat: -1.2801,
    lng: 116.8947,
  },
  {
    id: 2,
    name: "Puskesmas Gunung Sari",
    type: "Puskesmas",
    distance: "3.4",
    status: "Buka",
    address: "Jl. Gunung Sari Ilir, Balikpapan Tengah",
    phone: "0542-222333",
    lat: -1.2423,
    lng: 116.8156,
  },
  {
    id: 3,
    name: "RS Pertamina Balikpapan",
    type: "RS",
    distance: "4.2",
    status: "Buka 24 Jam",
    address: "Jl. Yos Sudarso No.1, Balikpapan",
    phone: "0542-531000",
    lat: -1.2678,
    lng: 116.8534,
  },
  {
    id: 4,
    name: "Klinik Pratama Sepinggan",
    type: "Klinik",
    distance: "1.9",
    status: "Tutup",
    address: "Jl. Sepinggan Baru No. 45, Balikpapan",
    phone: "0542-778899",
    lat: -1.2890,
    lng: 116.8723,
  },
];

const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

function GoogleMapEmbed({ faskes }) {
  const query = encodeURIComponent(faskes.address + ", Balikpapan, Kalimantan Timur, Indonesia");
  const src = `https://maps.google.com/maps?q=${query}&z=16&output=embed&hl=id`;

  return (
    <iframe
      key={faskes.id}
      src={src}
      width="100%"
      height="100%"
      style={{ border: "none", display: "block" }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={`Peta ${faskes.name}`}
    />
  );
}

export default function FaskesMap({ setActivePage, onLogout, activePage }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [showDetail, setShowDetail] = useState(false);
  const [selectedFaskes, setSelectedFaskes] = useState(null);

  const filters = ["Semua", "Puskesmas", "RS", "Klinik"];

  const filtered = useMemo(() => {
    return faskesData.filter((d) => {
      const q = search.toLowerCase();
      const matchSearch =
        d.name.toLowerCase().includes(q) || d.address.toLowerCase().includes(q);
      const matchFilter = activeFilter === "Semua" || d.type === activeFilter;
      return matchSearch && matchFilter;
    });
  }, [search, activeFilter]);

  const selectedData = faskesData.find((d) => d.id === selected) || filtered[0] || faskesData[0];

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
        {/* ── Sidebar ── */}
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
            {filtered.length === 0 && (
              <p style={{ textAlign: "center", color: isDark ? "#6b7280" : "#aaa", fontSize: "13px", marginTop: "20px" }}>
                Tidak ada hasil ditemukan
              </p>
            )}
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
                      window.open(
                        `https://maps.google.com/?q=${encodeURIComponent(d.address + ", Balikpapan")}`,
                        "_blank"
                      );
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

        {/* ── Map Area ── */}
        <main className="faskes-map-area">
          {/* Google Maps iframe */}
          <div className="faskes-map-iframe-wrap">
            <GoogleMapEmbed faskes={selectedData} />
          </div>

          {/* Info popup overlay */}
          {selectedData && (
            <div className="map-popup">
              <div className="map-popup-name">{selectedData.name}</div>
              <div className="map-popup-row">
                <span className="map-popup-open">{selectedData.status}</span>
                {" · "}{selectedData.type}
              </div>
              <div className="map-popup-row">{selectedData.distance} km dari lokasi anda</div>
              <div className="map-popup-row muted">{selectedData.address}</div>
              <button
                className="map-popup-btn"
                onClick={() =>
                  window.open(
                    `https://maps.google.com/?q=${encodeURIComponent(selectedData.address + ", Balikpapan")}`,
                    "_blank"
                  )
                }
              >
                🗺 Buka di Google Maps
              </button>
            </div>
          )}
        </main>
      </div>

      <style>{`
        .faskes-page {
          background: ${isDark ? "#0f0f1a" : "#fff5f8"};
          min-height: 100vh;
          font-family: 'Segoe UI', Arial, sans-serif;
          color: ${isDark ? "#f0f0f0" : "#1a1a2e"};
          transition: background 0.3s, color 0.3s;
        }

        .faskes-layout {
          display: grid;
          grid-template-columns: 340px 1fr;
          height: calc(100vh - 56px);
          overflow: hidden;
        }

        .faskes-sidebar {
          background: ${isDark ? "#16213e" : "#fff"};
          border-right: 1px solid ${isDark ? "#2a2a4a" : "#eee"};
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
        }

        .faskes-search {
          padding: 12px 14px;
          border-bottom: 1px solid ${isDark ? "#2a2a4a" : "#f0f0f0"};
        }

        .faskes-location {
          margin: 10px 14px 0;
          background: ${isDark ? "#1a0a14" : "#fff3f8"};
          border: 1px solid ${isDark ? "#4a1a2e" : "#f8bbd0"};
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
          box-shadow: 0 0 6px #e91e8c88;
        }

        .faskes-location-label {
          font-size: 10px;
          color: ${isDark ? "#9ca3af" : "#888"};
          margin-bottom: 2px;
        }

        .faskes-location-address {
          font-size: 12px;
          color: ${isDark ? "#f0f0f0" : "#333"};
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
          border: 1px solid ${isDark ? "#2a2a4a" : "#e0e0e0"};
          background: ${isDark ? "#16213e" : "#fff"};
          color: ${isDark ? "#9ca3af" : "#666"};
          cursor: pointer;
          transition: all 0.2s;
        }

        .faskes-chip.is-active {
          background: ${isDark ? "#2a0a1e" : "#fce4ec"};
          border-color: #f48fb1;
          color: #e91e8c;
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
          background: linear-gradient(180deg, #e91e8c, #f48fb1);
          border-radius: 2px;
        }

        .faskes-list-title {
          font-size: 13px;
          font-weight: 700;
          color: ${isDark ? "#f0f0f0" : "#555"};
        }

        .faskes-list-count {
          margin-left: auto;
          font-size: 11px;
          color: ${isDark ? "#6b7280" : "#aaa"};
        }

        .faskes-list {
          flex: 1;
          overflow-y: auto;
          padding: 0 14px 14px;
        }

        .faskes-card {
          background: ${isDark ? "#1a1a2e" : "#fce4ec"};
          border-radius: 12px;
          padding: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: border-color 0.2s, background 0.2s;
        }

        .faskes-card.is-selected {
          border-color: #e91e8c;
          background: ${isDark ? "#2a0a1e" : "#fad7e8"};
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

        .faskes-card-name-wrap { flex: 1; min-width: 0; }

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

        .badge-open { background: ${isDark ? "#0a2a0a" : "#e8f5e9"}; color: #2e7d32; }
        .badge-closed { background: ${isDark ? "#2a1a00" : "#fff3e0"}; color: #e65100; }

        .faskes-card-meta {
          font-size: 11px;
          color: ${isDark ? "#9ca3af" : "#666"};
          margin-bottom: 4px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .faskes-card-address,
        .faskes-card-phone {
          font-size: 11px;
          color: ${isDark ? "#9ca3af" : "#666"};
          line-height: 1.3;
        }

        .faskes-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid ${isDark ? "#2a2a4a" : "#f8bbd0"};
          gap: 8px;
        }

        .btn-route, .btn-detail {
          font-size: 11px;
          border-radius: 8px;
          padding: 6px 10px;
          cursor: pointer;
          font-weight: 600;
        }

        .btn-route {
          background: linear-gradient(135deg, #e91e8c, #c2185b);
          color: #fff;
          border: none;
        }

        .btn-detail {
          background: ${isDark ? "#16213e" : "#fff"};
          color: #e91e8c;
          border: 1px solid #e91e8c;
        }

        /* Map area */
        .faskes-map-area {
          position: relative;
          overflow: hidden;
          min-width: 0;
          background: ${isDark ? "#0f0f1a" : "#f0f4f8"};
        }

        .faskes-map-iframe-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        /* Popup overlay */
        .map-popup {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: ${isDark ? "rgba(22,33,62,0.97)" : "rgba(255,255,255,0.97)"};
          border: 1px solid ${isDark ? "#4a1a3a" : "#f8bbd0"};
          border-radius: 16px;
          padding: 14px 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,${isDark ? "0.5" : "0.15"});
          min-width: 240px;
          max-width: 320px;
          width: max-content;
          backdrop-filter: blur(8px);
        }

        .map-popup-name {
          font-weight: 700;
          font-size: 14px;
          color: #e91e8c;
          margin-bottom: 6px;
        }

        .map-popup-row {
          font-size: 12px;
          color: ${isDark ? "#d0d0d0" : "#555"};
          margin-bottom: 3px;
          line-height: 1.4;
        }

        .map-popup-row.muted { color: ${isDark ? "#9ca3af" : "#888"}; }

        .map-popup-open { color: #22c55e; font-weight: 700; }

        .map-popup-btn {
          margin-top: 10px;
          width: 100%;
          padding: 8px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #e91e8c, #c2185b);
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .faskes-layout {
            grid-template-columns: 1fr;
            height: auto;
            overflow: visible;
          }
          .faskes-sidebar {
            order: 1;
            border-right: none;
            border-bottom: 1px solid ${isDark ? "#2a2a4a" : "#eee"};
            max-height: 50vh;
          }
          .faskes-map-area {
            order: 2;
            height: 60vh;
            min-height: 400px;
          }
          .faskes-map-iframe-wrap {
            position: relative;
            height: 60vh;
            min-height: 400px;
          }
        }

        @media (max-width: 768px) {
          .faskes-sidebar { max-height: 45vh; }
          .faskes-map-area { height: 55vh; }
          .faskes-map-iframe-wrap { height: 55vh; }
          .map-popup {
            bottom: 12px;
            min-width: 200px;
            max-width: calc(100vw - 32px);
            padding: 12px 14px;
          }
        }

        @media (max-width: 480px) {
          .faskes-sidebar { max-height: 40vh; }
          .faskes-map-area { height: 50vh; }
          .faskes-map-iframe-wrap { height: 50vh; }
          .faskes-card-footer { flex-direction: column; align-items: stretch; }
          .btn-route, .btn-detail { width: 100%; text-align: center; }
        }
      `}</style>
    </div>
  );
}