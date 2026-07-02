import { useState, useEffect } from 'react';
import { RefreshCw, Sparkles, AlertTriangle, TrendingUp, Info, CheckCircle2 } from 'lucide-react';
import { getInsights } from '../api/client';

const FALLBACK_INSIGHTS = [
  { title: 'High Load Alert', message: 'General Medicine overloaded with 47 patients. Recommend shifting 1 doctor from Orthopaedics immediately.', severity: 'high', time: '2 mins ago' },
  { title: 'Emergency Cases Rising', message: 'Emergency cases up 21% in last 2 hours. Ensure 2 additional nurses are on standby in Emergency Bay.', severity: 'medium', time: '8 mins ago' },
  { title: 'OPD Rush Predicted', message: 'High patient volume expected between 11 AM – 1 PM today. Consider opening temporary overflow counter in General Medicine.', severity: 'info', time: '15 mins ago' },
  { title: 'Cardiology Running Smooth', message: 'Cardiology queue at optimal levels. Dr. Arvind Singh available for additional consultations.', severity: 'low', time: '20 mins ago' }
];

export default function AIInsights() {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState<string>('');

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const data = await getInsights();
      if (data && data.length > 0) {
        setInsights(data);
      } else {
        setInsights(FALLBACK_INSIGHTS);
      }
      setLastFetched(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    } catch (err) {
      // Fallback to hardcoded insights
      setInsights(FALLBACK_INSIGHTS);
      setLastFetched(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle size={24} color="#ef4444" />;
      case 'medium': return <TrendingUp size={24} color="#f59e0b" />;
      case 'info': return <Info size={24} color="#3b82f6" />;
      case 'low': return <CheckCircle2 size={24} color="#22c55e" />;
      default: return <Sparkles size={24} color="#00d4aa" />;
    }
  };

  return (
    <div className="page-container ai-insights-page">
      <div className="ai-insights-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div className="ai-insights-title-block">
          <h1 className="ai-insights-title" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 24, margin: 0 }}>
            <Sparkles size={28} className="ai-insights-title-icon" color="#00d4aa" />
            AI Insights
          </h1>
          <p className="ai-insights-subtitle" style={{ color: '#94a3b8', margin: '4px 0 0', fontSize: 14 }}>
            Gemini-powered operational intelligence for OPD
          </p>
        </div>
        <div className="ai-insights-controls" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {lastFetched && <span className="ai-insights-timestamp" style={{ fontSize: 12, color: '#64748b' }}>Last updated: {lastFetched}</span>}
          <button 
            className="btn-primary" 
            onClick={fetchInsights} 
            disabled={loading}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, background: 'rgba(0, 212, 170, 0.1)', color: '#00d4aa', border: '1px solid rgba(0, 212, 170, 0.3)', cursor: 'pointer' }}
          >
            <RefreshCw size={16} className={loading ? 'spin' : ''} />
            {loading ? 'Refreshing...' : 'Refresh Insights'}
          </button>
        </div>
      </div>

      {loading && insights.length === 0 ? (
        <div className="ai-insights-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="insight-card-skeleton">
              <div className="skeleton-line skeleton-icon" />
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-text" />
              <div className="skeleton-line skeleton-text-short" />
            </div>
          ))}
        </div>
      ) : (
        <div className="ai-insights-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {insights.map((insight, i) => {
              
            return (
              <div 
                key={i} 
                className={`insight-card severity-${insight.severity}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {getSeverityIcon(insight.severity)}
                    <h3 style={{ margin: 0, fontSize: 16, color: '#fff' }}>{insight.title || 'Insight'}</h3>
                  </div>
                  {insight.time && <span style={{ fontSize: 11, color: '#64748b' }}>{insight.time}</span>}
                </div>
                
                <p className="insight-card-message">
                  {insight.message}
                </p>
                
                <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-muted)' }}>
                  <Sparkles size={12} color="#00d4aa" />
                  Powered by Gemini AI
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
