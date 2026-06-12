import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../hooks/ThemeContext';
import Navbar from '../components/Navbar';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost';

function ServiceCard({ name, icon, healthUrl, metricsUrl }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [health, setHealth] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStatus = useCallback(async (isAuto = false) => {
    if (isAuto) setRefreshing(true);

    try {
      const healthRes = await fetch(healthUrl);
      const healthData = await healthRes.json();
      setHealth(healthData);
    } catch {
      setHealth({ status: 'unreachable' });
    }

    if (metricsUrl) {
      try {
        const metricsRes = await fetch(metricsUrl);
        const metricsData = await metricsRes.json();
        setMetrics(metricsData);
      } catch {
        setMetrics(null);
      }
    }

    setLoading(false);
    setRefreshing(false);
  }, [healthUrl, metricsUrl]);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(() => fetchStatus(true), 10000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const statusColor = {
    healthy: '#22c55e',
    degraded: '#f59e0b',
    unhealthy: '#ef4444',
    unreachable: '#6b7280',
  };

  const status = health?.status || 'unreachable';
  const errorRate = metrics?.error_rate_percent || 0;
  const errorRateColor = errorRate > 10 ? '#ef4444' : errorRate > 5 ? '#f59e0b' : '#22c55e';

  return (
    <div style={{
      border: `1px solid ${isDark ? '#2a2a4a' : '#f0c0d0'}`,
      borderRadius: '12px',
      padding: '20px',
      borderLeft: `4px solid ${statusColor[status] || '#6b7280'}`,
      background: isDark ? '#16213e' : '#fff',
      transition: 'opacity 0.3s, background 0.3s',
      opacity: refreshing ? 0.75 : 1,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, color: isDark ? '#f0f0f0' : '#1a1a2e' }}>
          {icon} {name}
          {refreshing && (
            <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '8px', fontWeight: 400 }}>
              ↻ memperbarui...
            </span>
          )}
        </h3>
        <span style={{
          background: statusColor[status],
          color: '#fff',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: '600',
          textTransform: 'uppercase',
        }}>
          {loading ? '...' : status}
        </span>
      </div>

      {metrics && (
        <div style={{ marginTop: '16px', fontSize: '14px', color: isDark ? '#94a3b8' : '#64748b' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>Requests: <strong style={{ color: isDark ? '#f0f0f0' : '#1a1a2e' }}>{metrics.total_requests}</strong></div>
            <div>Errors: <strong style={{ color: metrics.total_errors > 0 ? '#ef4444' : '#22c55e' }}>
              {metrics.total_errors}
            </strong></div>
            <div>Error Rate: <strong style={{ color: errorRateColor }}>{errorRate}%</strong></div>
            <div>Avg Latency: <strong style={{ color: (metrics.latency?.avg_ms || 0) > 500 ? '#f59e0b' : (isDark ? '#f0f0f0' : '#1a1a2e') }}>
              {metrics.latency?.avg_ms || 0}ms
            </strong></div>
            <div>p95 Latency: <strong style={{ color: (metrics.latency?.p95_ms || 0) > 1000 ? '#ef4444' : (isDark ? '#f0f0f0' : '#1a1a2e') }}>
              {metrics.latency?.p95_ms || 0}ms
            </strong></div>
            <div>Uptime: <strong style={{ color: isDark ? '#f0f0f0' : '#1a1a2e' }}>
              {Math.round((metrics.uptime_seconds || 0) / 60)}min
            </strong></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ✅ Tambah props: onLogout, activePage, setActivePage
export default function StatusPage({ onLogout, activePage, setActivePage }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [lastChecked, setLastChecked] = useState(new Date());
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const tick = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setLastChecked(new Date());
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark ? '#0f0f1a' : '#fff5f8',
      transition: 'background 0.3s, color 0.3s',
    }}>
      {/* ✅ Navbar — sama persis seperti di JadwalImunisasi */}
      <Navbar activePage={activePage} setActivePage={setActivePage} onLogout={onLogout} />

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px',
        color: isDark ? '#f0f0f0' : '#1a1a2e',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            {/* ✅ Tombol kembali */}
            <button
              onClick={() => setActivePage?.('jadwalImunisasi')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#e91e8c',
                fontWeight: '600',
                fontSize: '13px',
                padding: '0 0 10px 0',
              }}
            >
              ← Kembali
            </button>
            <h1 style={{ margin: '0 0 8px 0', color: isDark ? '#f0f0f0' : '#1a1a2e' }}>
              📊 System Status
            </h1>
            <p style={{ color: isDark ? '#9ca3af' : '#64748b', margin: 0 }}>
              Real-time health monitoring — auto-refresh setiap 10 detik
            </p>
          </div>
          <div style={{
            background: isDark ? '#16213e' : '#f1f5f9',
            border: `1px solid ${isDark ? '#2a2a4a' : 'transparent'}`,
            borderRadius: '10px',
            padding: '10px 16px',
            fontSize: '13px',
            color: isDark ? '#9ca3af' : '#64748b',
            textAlign: 'right',
          }}>
            <div>Refresh dalam <strong style={{ color: '#e91e8c' }}>{countdown}s</strong></div>
            <div style={{ marginTop: '4px' }}>
              Last checked: <strong style={{ color: isDark ? '#f0f0f0' : '#1a1a2e' }}>
                {lastChecked.toLocaleTimeString()}
              </strong>
            </div>
          </div>
        </div>

        <div style={{
          height: '3px',
          background: isDark ? '#2a2a4a' : '#e2e8f0',
          borderRadius: '2px',
          margin: '16px 0',
        }}>
          <div style={{
            height: '100%',
            background: '#e91e8c',
            borderRadius: '2px',
            width: `${(countdown / 10) * 100}%`,
            transition: 'width 1s linear',
          }} />
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <ServiceCard
            name="Auth Service"
            icon="🔐"
            healthUrl={`${API_URL}/auth/health`}
            metricsUrl={`${API_URL}/auth/metrics`}
          />
          <ServiceCard
            name="Item Service"
            icon="📦"
            healthUrl={`${API_URL}/items/health`}
            metricsUrl={`${API_URL}/items/metrics`}
          />
          <ServiceCard
            name="API Gateway"
            icon="🚪"
            healthUrl={`${API_URL}/health`}
            metricsUrl={null}
          />
        </div>
      </div>
    </div>
  );
}