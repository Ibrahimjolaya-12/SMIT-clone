// Attendance.jsx
import React, { useState, useEffect, useRef } from 'react';

// --- Icons ---
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const XCircleIcon = ({ color = "#eab308" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// --- Constants ---
const MONTHS_LIST = [
  'Jul 2026', 'Aug 2026', 'Sep 2026', 'Oct 2026', 

];

const STATUS_COLORS = {
  Present: { color: '#22c55e', border: '1px solid #22c55e', bg: 'rgba(34,197,94,0.1)' },
  Absent:  { color: '#ef4444', border: '1px solid #ef4444', bg: 'rgba(239,68,68,0.1)' },
  Leave:   { color: '#eab308', border: '1px solid #eab308', bg: 'rgba(234,179,8,0.1)' },
};

// Today: July 7, 2026
const START_DATE = new Date(2026, 6, 7);

// --- Helpers ---
const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const getDateStr = (date) => {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
};

const getMonthYearStr = (date) => {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// Generate all records from start date
const generateAllRecords = (startDate, totalCount) => {
  const records = [];
  let currentDate = new Date(startDate);
  for (let i = 1; i <= totalCount; i++) {
    // Skip weekends (Sat=6, Sun=0) — comment out if you want every day
    while (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    const seed = i * 17 + currentDate.getDate();
    const rand = ((seed * 9301 + 49297) % 233280) / 233280;
    let status;
    if (rand < 0.7) status = 'Present';
    else if (rand < 0.85) status = 'Absent';
    else status = 'Leave';
    
    records.push({
      class: i,
      date: new Date(currentDate),
      dateStr: getDateStr(currentDate),
      monthStr: getMonthYearStr(currentDate),
      status
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return records;
};

// --- Sub-components ---
const StatusBadge = ({ status }) => {
  const s = STATUS_COLORS[status] || STATUS_COLORS.Present;
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.5px',
      color: s.color,
      border: s.border,
      background: s.bg,
    }}>
      {status.toUpperCase()}
    </span>
  );
};

const StatCard = ({ value, label, icon, bgIcon }) => (
  <div style={{
    backgroundColor: '#1e1e1e',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #2a2a2a',
  }}>
    <div>
      <div style={{ fontSize: '28px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{value}</div>
      <div style={{ fontSize: '14px', color: '#a0a0a0' }}>{label}</div>
    </div>
    <div style={{
      width: '40px', height: '40px', borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: bgIcon,
    }}>
      {icon}
    </div>
  </div>
);

// --- Main Component ---
export default function Attendance() {
  const [totalClasses, setTotalClasses] = useState(4);
  const [present, setPresent] = useState(4);
  const [leave, setLeave] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [allRecords, setAllRecords] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('Jul 2026');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const [timerActive, setTimerActive] = useState(true);

  const intervalRef = useRef(null);

  const percentage = totalClasses > 0 ? Math.round((present / totalClasses) * 100) : 0;
  const filteredRecords = allRecords.filter(r => r.monthStr === selectedMonth);

  // Timer: auto-add class every 24 hours
  useEffect(() => {
    if (!timerActive) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          addOneClass(); // Add new class when timer hits 0
          return 24 * 60 * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [timerActive]);

  const addOneClass = () => {
    setTotalClasses(t => {
      const newTotal = t + 1;
      const newRecords = generateAllRecords(START_DATE, newTotal);
      setAllRecords(newRecords);
      const p = newRecords.filter(r => r.status === 'Present').length;
      const a = newRecords.filter(r => r.status === 'Absent').length;
      const l = newRecords.filter(r => r.status === 'Leave').length;
      setPresent(p);
      setAbsent(a);
      setLeave(l);
      return newTotal;
    });
  };

  const toggleTimer = () => setTimerActive(prev => !prev);

  const resetAll = () => {
    setTotalClasses(0);
    setPresent(0);
    setLeave(0);
    setAbsent(0);
    setAllRecords([]);
    setTimeLeft(24 * 60 * 60);
    setTimerActive(true);
  };

  return (
    <div style={{
      backgroundColor: '#000000',
      color: '#ffffff',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
      padding: '24px',
      boxSizing: 'border-box',
    }}>
      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ===== TIMER BAR ===== */}
      <div style={{
        backgroundColor: '#1e1e1e',
        borderRadius: '12px',
        padding: '16px 24px',
        marginBottom: '20px',
        border: '1px solid #2a2a2a',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div>
          <div style={{ fontSize: '13px', color: '#888', marginBottom: '4px' }}>Next class in</div>
          <div style={{
            fontSize: '28px', fontWeight: 700, fontFamily: 'monospace',
            color: timerActive ? '#f97316' : '#666'
          }}>
            {formatTime(timeLeft)}
          </div>
        </div>
       
      </div>

      {/* ===== STATS CARDS ===== */}
      <div className="stats-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px'
      }}>
        <StatCard value={totalClasses} label="Total Classes" icon={<CalendarIcon />} bgIcon="rgba(255,255,255,0.05)" />
        <StatCard value={present} label="Present" icon={<CheckCircleIcon />} bgIcon="rgba(34,197,94,0.1)" />
        <StatCard value={leave} label="Leave" icon={<XCircleIcon color="#eab308" />} bgIcon="rgba(234,179,8,0.1)" />
        <StatCard value={absent} label="Absent" icon={<XCircleIcon color="#ef4444" />} bgIcon="rgba(239,68,68,0.1)" />
      </div>

      {/* ===== ATTENDANCE OVERVIEW ===== */}
      <div style={{
        backgroundColor: '#1e1e1e', borderRadius: '12px', padding: '24px',
        marginBottom: '24px', border: '1px solid #2a2a2a',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 8px 0' }}>Attendance Overview</h2>
            <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>
              {percentage < 75 ? 'Your attendance is below 75%. Please improve.' : 'Great! Your attendance is above 75%.'}
            </p>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#f97316' }}>{percentage}%</div>
        </div>
        <div style={{ width: '100%', height: '8px', backgroundColor: '#2a2a2a', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', backgroundColor: '#f97316', borderRadius: '4px',
            transition: 'width 0.5s ease', width: `${percentage}%`,
          }} />
        </div>
      </div>

      {/* ===== MONTH DROPDOWN (FULL YEAR - NO SCROLLBAR) ===== */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px', position: 'relative' }}>
        <div
          style={{
            backgroundColor: '#1e1e1e', border: '1px solid #333', borderRadius: '8px',
            padding: '8px 12px', color: '#fff', fontSize: '14px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
            minWidth: '140px', justifyContent: 'space-between', userSelect: 'none',
          }}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span>{selectedMonth}</span>
          <ChevronDownIcon />
          {dropdownOpen && (
            <div style={{
              position: 'absolute', top: '100%', right: 0, marginTop: '4px',
              backgroundColor: '#1e1e1e', border: '1px solid #333', borderRadius: '8px',
              overflow: 'hidden', zIndex: 10, minWidth: '140px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              // NO maxHeight, NO overflowY — shows all 12 months without scroll
            }}>
              {MONTHS_LIST.map((m) => (
                <div
                  key={m}
                  style={{
                    padding: '10px 12px', fontSize: '14px', cursor: 'pointer',
                    color: selectedMonth === m ? '#fff' : '#ccc',
                    background: selectedMonth === m ? '#2a2a2a' : 'transparent',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => { if (selectedMonth !== m) e.target.style.background = '#252525'; }}
                  onMouseLeave={(e) => { if (selectedMonth !== m) e.target.style.background = 'transparent'; }}
                  onClick={(e) => { e.stopPropagation(); setSelectedMonth(m); setDropdownOpen(false); }}
                >
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== ATTENDANCE TABLE ===== */}
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
        <thead>
          <tr style={{ backgroundColor: '#1e1e1e' }}>
            {['Class', 'Date', 'Status'].map(h => (
              <th key={h} style={{
                textAlign: 'left', padding: '14px 16px', fontSize: '13px',
                fontWeight: 500, color: '#888', borderBottom: '1px solid #2a2a2a',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRecords.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ padding: '40px', textAlign: 'center', color: '#555', fontSize: '14px' }}>
                No classes recorded in {selectedMonth} yet.
              </td>
            </tr>
          ) : (
            filteredRecords.map((record, idx) => (
              <tr key={record.class} style={{ backgroundColor: '#1e1e1e' }}>
                <td style={{
                  padding: '14px 16px', fontSize: '14px', color: '#e0e0e0',
                  borderBottom: '1px solid #2a2a2a',
                  borderTopLeftRadius: idx === 0 ? '12px' : 0,
                  borderBottomLeftRadius: idx === filteredRecords.length - 1 ? '12px' : 0,
                }}>{record.class}</td>
                <td style={{
                  padding: '14px 16px', fontSize: '14px', color: '#e0e0e0',
                  borderBottom: '1px solid #2a2a2a',
                }}>{record.dateStr}</td>
                <td style={{
                  padding: '14px 16px', borderBottom: '1px solid #2a2a2a',
                  borderTopRightRadius: idx === 0 ? '12px' : 0,
                  borderBottomRightRadius: idx === filteredRecords.length - 1 ? '12px' : 0,
                }}>
                  <StatusBadge status={record.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}