import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApi, setShowApi] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });

    fetch("http://localhost:8000/team")
      .then(res => res.json())
      .then(json => setTeam(json))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>☁️ Cloud App</h1>
        <h2>Mata Kuliah Komputasi Awan - SI ITK</h2>
      </header>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : data ? (
        <div className="card">
          <h3 onClick={() => setShowApi(!showApi)} className="clickable">
            API Response {showApi ? "▲" : "▼"}
          </h3>
          {showApi && (
            <div className="card-content">
              <p><strong>Message:</strong> {data.message}</p>
              <p><strong>Status:</strong> {data.status}</p>
              <p><strong>Version:</strong> {data.version}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="error">❌ Error connecting to backend</p>
      )}

      {team && (
        <div className="card">
          <h3>Tim: {team.team}</h3>
          <ul>
            {team.members.map((m, i) => (
              <li key={i} className="team-member">
                <strong>{m.name}</strong> ({m.nim}) - <em>{m.role}</em>
              </li>
            ))}
          </ul>
        </div>
      )}

      <footer>
        <p>© 2026 Cloud App - SI ITK</p>
      </footer>
    </div>
  );
}

export default App;