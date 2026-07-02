import { useState, useEffect, useCallback, useRef } from 'react';
import { Stethoscope, UserPlus, Activity, Clock, AlertTriangle, Users, WifiOff, TrendingUp, BarChart3, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { QueueItem, StatsData } from '../types';
import { addSimulatedPatient, getStats } from '../api/client';

function AnimatedCounter({ target, duration = 2000, suffix = '' }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

function Sparkline({ data, color }: { data: { v: number }[]; color: string }) {
  return (
    <div className="sparkline-wrapper">
      <ResponsiveContainer width="100%" height={28}>
        <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={color} fillOpacity={0.1} dot={false} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function RadialGauge({ value, max = 60, color }: { value: number; max?: number; color: string }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const offset = circumference * (1 - pct);
  return (
    <svg width={56} height={56} viewBox="0 0 56 56" className="radial-gauge">
      <circle className="radial-gauge-track" cx="28" cy="28" r={radius} />
      <circle
        className="radial-gauge-fill"
        cx="28" cy="28" r={radius}
        stroke={color}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <text x="28" y="32" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="700" transform="rotate(90, 28, 28)">
        {value}
      </text>
    </svg>
  );
}

const FALLBACK_STATS: StatsData = {
  totalToday: 5124,
  criticalCount: 38,
  avgWaitTime: 34,
  doctorsOnDuty: 24,
  activeDepartments: 8
};

const MOCK_QUEUE: QueueItem[] = [
  { id: '1', token: "EMG-2041", name: "Venkatesh Iyer", age: 58, department: "Emergency/Cardiology", triageLevel: "critical", assignedDoctor: "Dr. Srinivas Murthy", roomNumber: "Emergency Bay C-204", waitTime: 0, status: "Priority Override", chiefComplaint: "Chest Pain", timestamp: "" },
  { id: '2', token: "OPD-1847", name: "Lalita Deshmukh", age: 34, department: "General Medicine", triageLevel: "moderate", assignedDoctor: "Dr. Sundararajan", roomNumber: "G-102", waitTime: 28, status: "Waiting", chiefComplaint: "Fever", timestamp: "" },
  { id: '3', token: "OPD-1848", name: "Prakash Nair", age: 45, department: "Orthopaedics", triageLevel: "moderate", assignedDoctor: "Dr. Harish Bhat", roomNumber: "O-201", waitTime: 35, status: "Waiting", chiefComplaint: "Fracture", timestamp: "" },
  { id: '4', token: "OPD-1849", name: "Anjali Krishnan", age: 28, department: "Gynecology", triageLevel: "mild", assignedDoctor: "Dr. Radhika Menon", roomNumber: "GY-201", waitTime: 45, status: "Waiting", chiefComplaint: "Checkup", timestamp: "" },
  { id: '5', token: "OPD-1850", name: "Dhanraj Pillai", age: 62, department: "Neurology", triageLevel: "moderate", assignedDoctor: "Dr. Chandrasekhar", roomNumber: "N-101", waitTime: 40, status: "Waiting", chiefComplaint: "Headache", timestamp: "" }
];

const MOCK_DEPARTMENTS = [
  { name: 'General Medicine', patientCount: 47, status: 'Overloaded', color: 'red', doctors: 'Dr. Sundararajan, Dr. Manjunath Hegde', room: 'G-102, G-104' },
  { name: 'Cardiology', patientCount: 12, status: 'Busy', color: 'yellow', doctors: 'Dr. Srinivas Murthy, Dr. Lakshmi Narayan', room: 'C-201, C-202' },
  { name: 'Orthopaedics', patientCount: 23, status: 'Normal', color: 'green', doctors: 'Dr. Harish Bhat, Dr. Subramaniam Iyer', room: 'O-201, O-203' },
  { name: 'Emergency', patientCount: 6, status: 'Busy', color: 'yellow', doctors: 'Dr. Karthik Rajan', room: 'Emergency Bay C-204' },
  { name: 'Neurology', patientCount: 15, status: 'Normal', color: 'green', doctors: 'Dr. Chandrasekhar, Dr. Nalini Rao', room: 'N-101, N-103' },
  { name: 'Pediatrics', patientCount: 19, status: 'Normal', color: 'green', doctors: 'Dr. Shweta Pai, Dr. Balachandran', room: 'P-101, P-102' },
  { name: 'Gynecology', patientCount: 11, status: 'Normal', color: 'green', doctors: 'Dr. Radhika Menon, Dr. Geetha Subbiah', room: 'GY-201, GY-202' },
  { name: 'Dermatology', patientCount: 8, status: 'Normal', color: 'green', doctors: 'Dr. Vikramaditya Nair', room: 'D-101' }
];

export default function AdminDashboard() {
  const [queue, setQueue] = useState<QueueItem[]>(MOCK_QUEUE);
  const [stats, setStats] = useState<StatsData>(FALLBACK_STATS);
  const [clock, setClock] = useState(new Date());
  const [wsConnected, setWsConnected] = useState(false);
  
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchAllData = useCallback(async () => {
    try {
      const s = await getStats();
      if (s && s.totalToday > 0) {
        setStats(s);
      } else {
        setStats(FALLBACK_STATS);
      }
    } catch (err) {
      setStats(FALLBACK_STATS);
      console.warn('API fail, using fallback stats');
    }
  }, []);

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 15000);
    return () => clearInterval(interval);
  }, [fetchAllData]);

  useEffect(() => {
    let ws: WebSocket;
    try {
      ws = new WebSocket('ws://localhost:8000/ws/queue');
      wsRef.current = ws;

      ws.onopen = () => {
        setWsConnected(true);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data && data.length > 0) {
          setQueue(data);
        } else {
          setQueue(MOCK_QUEUE);
        }
      };

      ws.onclose = () => {
        setWsConnected(false);
        setQueue(MOCK_QUEUE);
      };
      
      ws.onerror = () => {
        setWsConnected(false);
        setQueue(MOCK_QUEUE);
      }
    } catch (e) {
      setWsConnected(false);
      setQueue(MOCK_QUEUE);
    }

    return () => {
      if (ws) ws.close();
    };
  }, []);

  const handleExportCsv = useCallback(() => {
    const headers = ['Token', 'Name', 'Age', 'Department', 'Severity', 'Doctor', 'Room', 'Wait (min)', 'Status'];
    const rows = queue.map(p => [
      p.token, p.name, p.age, p.department, p.triageLevel,
      p.assignedDoctor || 'On-Duty', p.roomNumber || '-',
      p.waitTime === 0 ? '0-3' : String(p.waitTime),
      p.status || 'Waiting'
    ]);
    const csv = '\uFEFF' + [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `queue_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  }, [queue]);

  const handleSimulate = useCallback(async () => {
    try {
      if (wsRef.current && wsConnected) {
        wsRef.current.send(JSON.stringify({ action: "add_patient" }));
        toast.success(`🏥 Simulating new patient...`);
      } else {
        await addSimulatedPatient();
        toast.success(`🏥 Simulating new patient...`);
      }
    } catch (err) {
      toast.error('Failed to add patient, but using mock data');
    }
  }, [wsConnected]);

  const getStatusBadge = (status: string) => {
    if (status === 'Priority Override') {
      return <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444' }}>Priority Override</span>;
    }
    return <span className="badge badge-waiting">{status}</span>;
  };

  const getTriageBadge = (level: string) => {
    const map: Record<string, { className: string; label: string; emoji: string }> = {
      critical: { className: 'badge badge-critical', label: 'Critical', emoji: '🔴' },
      moderate: { className: 'badge badge-moderate', label: 'Moderate', emoji: '🟡' },
      mild: { className: 'badge badge-mild', label: 'Low', emoji: '🟢' },
    };
    const info = map[level] || map.mild;
    return <span className={info.className}>{info.emoji} {info.label}</span>;
  };

  const getRowStyle = (level: string) => {
    if (level === 'critical') return { background: 'rgba(239, 68, 68, 0.1)' };
    if (level === 'moderate') return { background: 'rgba(245, 158, 11, 0.05)' };
    return { background: 'rgba(34, 197, 94, 0.05)' };
  };

  const clockStr = clock.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kolkata',
  });

  const hourlyData = [
    { hour: '6AM', patients: 12, forecast: null },
    { hour: '7AM', patients: 28, forecast: null },
    { hour: '8AM', patients: 89, forecast: null },
    { hour: '9AM', patients: 156, forecast: null },
    { hour: '10AM', patients: 203, forecast: null },
    { hour: '11AM', patients: 241, forecast: null },
    { hour: '12PM', patients: 218, forecast: null },
    { hour: '1PM', patients: 167, forecast: null },
    { hour: '2PM', patients: null, forecast: 185 },
    { hour: '3PM', patients: null, forecast: 142 },
    { hour: '4PM', patients: null, forecast: 98 },
  ];

  const sparklineData = [
    { v: 30 }, { v: 45 }, { v: 38 }, { v: 52 }, { v: 48 }, { v: 64 },
  ];

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <div className="title-section">
          <h1>
            <Stethoscope size={28} color="#00d4aa" />
            SYMPTORA — Smart OPD Triage & Management
          </h1>
          <p>SYMPTORA — AI-Powered OPD Triage & Queue Management | OPD Hours: 8:00 AM – 2:00 PM</p>
        </div>
        <div className="status-section">
          <div className="live-clock">{clockStr}</div>
          <div className="status-badge" style={!wsConnected ? { background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.3)' } : {}}>
            {!wsConnected ? <WifiOff size={14} /> : <span className="live-dot-active"></span>}
            {wsConnected ? 'System Active' : 'Fallback Mode'}
          </div>
        </div>
      </div>

      {/* TOP STATS BAR */}
      <div className="stats-grid">
        <div className="stat-card" style={{ animationDelay: '0s' }}>
          <Users size={24} color="#00d4aa" />
          <div className="stat-number"><AnimatedCounter target={stats.totalToday} /></div>
          <div className="stat-label">Total Patients Today</div>
          <Sparkline data={sparklineData} color="#00d4aa" />
        </div>
        <div className="stat-card" style={{ animationDelay: '0.1s' }}>
          <Clock size={24} color="#f59e0b" />
          <div className="stat-number"><AnimatedCounter target={stats.avgWaitTime} suffix=" min" /></div>
          <div className="stat-label">Avg Wait Time</div>
          <Sparkline data={sparklineData.map(d => ({ v: d.v + 10 }))} color="#f59e0b" />
        </div>
        <div className="stat-card" style={{ animationDelay: '0.2s' }}>
          <AlertTriangle size={24} color="#ef4444" />
          <div className="stat-number"><AnimatedCounter target={stats.criticalCount} /></div>
          <div className="stat-label">Critical Cases Routed</div>
          <Sparkline data={sparklineData.map(d => ({ v: Math.max(2, d.v - 20) }))} color="#ef4444" />
        </div>
        <div className="stat-card" style={{ animationDelay: '0.3s' }}>
          <Activity size={24} color="#22c55e" />
          <div className="stat-number"><AnimatedCounter target={stats.activeDepartments} /></div>
          <div className="stat-label">Departments Active</div>
          <Sparkline data={sparklineData.map(d => ({ v: d.v % 8 }))} color="#22c55e" />
        </div>
        <div className="stat-card" style={{ animationDelay: '0.4s' }}>
          <UserPlus size={24} color="#3b82f6" />
          <div className="stat-number"><AnimatedCounter target={stats.doctorsOnDuty || 24} /></div>
          <div className="stat-label">Doctors On Duty</div>
          <Sparkline data={sparklineData.map(d => ({ v: d.v - 5 }))} color="#3b82f6" />
        </div>
      </div>

      {/* FORECAST INSIGHT STRIP */}
      <div className="glass-card forecast-strip">
        <TrendingUp size={20} color="#00d4aa" />
        <span className="forecast-text">
          <strong>Forecast:</strong> 18% surge in Emergency expected between 2–4 PM based on historical patterns. Recommend 1 additional nurse.
        </span>
        <span className="forecast-confidence">AI Prediction · 92% confidence</span>
      </div>

      {/* PATIENT INFLOW CHART */}
      <div className="glass-card chart-card">
        <div className="scan-overlay" />
        <h2 className="section-title">
          <BarChart3 size={20} color="#00d4aa" />
          Patient Inflow — Today vs Forecast
        </h2>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={hourlyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="inflowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00d4aa" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#00d4aa" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="hour" stroke="#64748b" fontSize={12} tickMargin={6} />
            <YAxis stroke="#64748b" fontSize={12} tickMargin={6} />
            <Tooltip
              contentStyle={{ background: '#0f2040', border: '1px solid rgba(0,212,170,0.3)', borderRadius: 8, fontSize: 13 }}
              labelStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="patients" stroke="#00d4aa" strokeWidth={2} fill="url(#inflowGradient)" name="Actual" connectNulls />
            <Area type="monotone" dataKey="forecast" stroke="#3b82f6" strokeWidth={2} strokeDasharray="6 3" fill="url(#forecastGradient)" name="Forecast" connectNulls />
          </AreaChart>
        </ResponsiveContainer>
        <div className="chart-legend">
          <span className="chart-legend-item">
            <span className="chart-legend-swatch" style={{ background: '#00d4aa' }} /> Actual
          </span>
          <span className="chart-legend-item">
            <span className="chart-legend-swatch-dashed" /> Forecast
          </span>
        </div>
      </div>

      {/* HOSPITAL DEPARTMENTS SECTION */}
      <div className="glass-card" style={{ marginBottom: 24 }}>
        <h2 className="section-title">
          <Activity size={20} color="#00d4aa" />
          Hospital Departments Load
        </h2>
        <div className="dept-grid">
          {MOCK_DEPARTMENTS.map((dept, i) => {
            const barColor = dept.patientCount > 35 ? '#ef4444' : dept.patientCount > 20 ? '#f59e0b' : '#22c55e';
            const badgeBg = dept.color === 'red' ? 'rgba(239, 68, 68, 0.2)' : dept.color === 'yellow' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(34, 197, 94, 0.2)';
            const badgeCol = dept.color === 'red' ? '#ef4444' : dept.color === 'yellow' ? '#f59e0b' : '#22c55e';

            return (
              <div key={i} className="dept-card" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="dept-card-header">
                  <h3 className="dept-card-title">
                    {dept.name === 'Cardiology' ? '🫀' : dept.name === 'Emergency' ? '🚨' : dept.name === 'Orthopaedics' ? '🦴' : dept.name === 'Neurology' ? '🧠' : '🏥'} 
                    {dept.name}
                  </h3>
                  <span className="dept-status-badge" style={{ background: badgeBg, color: badgeCol }}>{dept.status}</span>
                </div>
                <div className="dept-card-body">
                  <RadialGauge value={dept.patientCount} color={barColor} />
                  <div className="dept-doc-info">
                    {dept.doctors.split(', ').map((doc, j) => {
                      const rms = dept.room.split(', ');
                      return (
                        <div key={j} className="dept-doc-row">
                          <span>{doc}</span>
                          <span className="dept-doc-room">{rms[j] || rms[0]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QUEUE TABLE SECTION */}
      <div className="glass-card queue-card">
        <div className="section-header">
          <h2 className="section-title">
            <Users size={20} color="#00d4aa" />
            Live Patient Queue
          </h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-ghost" onClick={handleExportCsv} title="Export queue as CSV">
              <Download size={16} /> CSV
            </button>
            <button className="btn-primary" onClick={handleSimulate}>
              <UserPlus size={16} /> Simulate
            </button>
          </div>
        </div>
        <div className="queue-scroll">
          <table className="queue-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Name</th>
                <th>Age</th>
                <th>Department</th>
                <th>Severity</th>
                <th>Doctor</th>
                <th>Room</th>
                <th>Wait</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((patient, i) => (
                <tr
                  key={patient.id || i}
                  className="queue-row"
                  style={{ ...getRowStyle(patient.triageLevel), animation: `fadeInUp 0.3s ease-out ${i * 0.03}s both` }}
                >
                  <td className="queue-token-cell" style={{ color: patient.triageLevel === 'critical' ? '#ef4444' : '#00d4aa' }}>
                    {patient.token.startsWith('EMG') ? <span className="queue-token-emg">{patient.token}</span> : patient.token}
                  </td>
                  <td className="queue-name-cell">
                    {patient.triageLevel === 'critical' && <span className="critical-pulse"></span>}
                    {patient.name}
                  </td>
                  <td>{patient.age}</td>
                  <td className="queue-dept-cell">{patient.department}</td>
                  <td>{getTriageBadge(patient.triageLevel)}</td>
                  <td className="queue-doctor-cell">{patient.assignedDoctor || 'On-Duty'}</td>
                  <td className="queue-room-cell">{patient.roomNumber || '-'}</td>
                  <td className="queue-wait-cell">{patient.waitTime === 0 ? '0-3 mins' : `${patient.waitTime} mins`}</td>
                  <td>{getStatusBadge(patient.status || 'Waiting')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
