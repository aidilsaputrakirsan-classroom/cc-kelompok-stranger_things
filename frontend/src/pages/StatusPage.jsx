import { useState, useEffect, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost';

function ServiceCard({ name, icon, healthUrl, metricsUrl }) {
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
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '20px',
      borderLeft: `4px solid ${statusColor[status] || '#6b7280'}`,
      background: '#fff',
      transition: 'opacity 0.3s',
      opacity: refreshing ? 0.75 : 1,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, color: '#1a1a2e' }}>
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
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#64748b' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>Requests: <strong style={{ color: '#1a1a2e' }}>{metrics.total_requests}</strong></div>
            <div>Errors: <strong style={{ color: metrics.total_errors > 0 ? '#ef4444' : '#22c55e' }}>
              {metrics.total_errors}
            </strong></div>
            <div>Error Rate: <strong style={{ color: errorRateColor }}>
              {errorRate}%
            </strong></div>
            <div>Avg Latency: <strong style={{ color: (metrics.latency?.avg_ms || 0) > 500 ? '#f59e0b' : '#1a1a2e' }}>
              {metrics.latency?.avg_ms || 0}ms
            </strong></div>
            <div>p95 Latency: <strong style={{ color: (metrics.latency?.p95_ms || 0) > 1000 ? '#ef4444' : '#1a1a2e' }}>
              {metrics.latency?.p95_ms || 0}ms
            </strong></div>
            <div>Uptime: <strong style={{ color: '#1a1a2e' }}>
              {Math.round((metrics.uptime_seconds || 0) / 60)}min
            </strong></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StatusPage() {
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
  }, []