import React from 'react';

// --- Icons ---
const AlertTriangleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

// --- Data ---
const quizData = [
  {
    id: 1,
    module: 'Modern Front-End Development',
    title: 'Javascript (Quiz-2)',
    questions: 40,
    attempts: '2 / 3',
    score: 38,
    percentage: 83,
    status: 'Passed',
    note: '—',
    action: 'Completed'
  },
  {
    id: 2,
    module: 'Modern Front-End Development',
    title: 'Javascript (Quiz-3)',
    questions: 40,
    attempts: '2 / 3',
    score: 36,
    percentage: 68,
    status: 'Passed',
    note: '—',
    action: 'Completed'
  },
  {
    id: 3,
    module: 'Front-End Development',
    title: 'CSS Quiz',
    questions: 40,
    attempts: '2 / 3',
    score: 34,
    percentage: 65,
    status: 'Passed',
    note: '—',
    action: 'Completed'
  },
  {
    id: 4,
    module: 'Web Designing Module',
    title: 'HTML Quiz',
    questions: 40,
    attempts: '2 / 3',
    score: 29,
    percentage: 73,
    status: 'Passed',
    note: '—',
    action: 'Completed'
  }
];

const infoItems = [
  'Once started, quizzes must be completed in one session',
  'Switching tabs or leaving the window will be recorded',
  'Ensure you have a stable internet connection',
  'The quiz will open in fullscreen mode'
];

// --- Sub-components ---
const StatusBadge = ({ status }) => {
  const isPassed = status === 'Passed';
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.5px',
      color: isPassed ? '#22c55e' : '#ef4444',
      border: isPassed ? '1px solid #22c55e' : '1px solid #ef4444',
      background: isPassed ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
    }}>
      {status.toUpperCase()}
    </span>
  );
};

const QuestionsBadge = ({ count }) => (
  <span style={{
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#ccc',
    background: '#2a2a2a',
    border: '1px solid #333',
  }}>
    {count}
  </span>
);

const AttemptsBadge = ({ attempts }) => (
  <span style={{
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#ccc',
    background: '#2a2a2a',
    border: '1px solid #333',
  }}>
    {attempts}
  </span>
);

const ActionButton = ({ label }) => (
  <span style={{
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
    color: '#888',
    background: '#252525',
    border: '1px solid #333',
    cursor: 'default',
  }}>
    {label}
  </span>
);

// --- Main Component ---
const Quiz = () => {
  return (
    <div style={{
      backgroundColor: '#000000',
      minHeight: '70vh',
      color: '#ffffff',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
      padding: '24px',
      boxSizing: 'border-box',
    }}>

      {/* ===== INFO ALERT BOX ===== */}
      <div style={{
        backgroundColor: '#1a2332',
        borderRadius: '10px',
        padding: '18px 22px',
        marginBottom: '24px',
        border: '1px solid #2a3a4a',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{ color: '#60a5fa' }}>
            <AlertTriangleIcon />
          </span>
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#e0e0e0' }}>Important Information</span>
        </div>
        <ul style={{ margin: 0, paddingLeft: '28px', color: '#888', fontSize: '13.5px', lineHeight: '2' }}>
          {infoItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* ===== QUIZ TABLE ===== */}
      <div style={{
        backgroundColor: '#1e1e1e',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid #2a2a2a',
      }}>
        {/* Table Header */}
        <div className="quiz-header" style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.5fr 80px 90px 60px 90px 90px 60px 100px',
          gap: '8px',
          padding: '14px 16px',
          borderBottom: '1px solid #2a2a2a',
          fontSize: '13px',
          fontWeight: 500,
          color: '#888',
        }}>
          <div>Module</div>
          <div>Title</div>
          <div style={{ textAlign: 'center' }}>Questions</div>
          <div style={{ textAlign: 'center' }}>Attempts</div>
          <div style={{ textAlign: 'center' }}>Score</div>
          <div style={{ textAlign: 'center' }}>Percentage</div>
          <div style={{ textAlign: 'center' }}>Status</div>
          <div style={{ textAlign: 'center' }}>Note</div>
          <div style={{ textAlign: 'center' }}>Action</div>
        </div>

        {/* Table Rows */}
        {quizData.map((quiz, idx) => (
          <div
            className="quiz-row"
            key={quiz.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1.5fr 80px 90px 60px 90px 90px 60px 100px',
              gap: '8px',
              padding: '16px',
              borderBottom: idx < quizData.length - 1 ? '1px solid #2a2a2a' : 'none',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '14px', color: '#e0e0e0', fontWeight: 500 }}>{quiz.module}</div>
            <div style={{ fontSize: '14px', color: '#e0e0e0' }}>{quiz.title}</div>
            <div style={{ textAlign: 'center' }}><QuestionsBadge count={quiz.questions} /></div>
            <div style={{ textAlign: 'center' }}><AttemptsBadge attempts={quiz.attempts} /></div>
            <div style={{ textAlign: 'center', fontSize: '14px', color: '#e0e0e0' }}>{quiz.score}</div>
            <div style={{ textAlign: 'center', fontSize: '14px', color: '#e0e0e0' }}>{quiz.percentage}%</div>
            <div style={{ textAlign: 'center' }}><StatusBadge status={quiz.status} /></div>
            <div style={{ textAlign: 'center', fontSize: '14px', color: '#888' }}>{quiz.note}</div>
            <div style={{ textAlign: 'center' }}><ActionButton label={quiz.action} /></div>
          </div>
        ))}
      </div>

      {/* ===== FOOTER NOTE ===== */}
      <div style={{
        textAlign: 'center',
        marginTop: '28px',
        fontSize: '13px',
        color: '#666',
      }}>
        Contact your instructor if you have any issues accessing your quizzes.
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1100px) {
          .quiz-row, .quiz-header {
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
          }
          .quiz-row > div, .quiz-header > div {
            text-align: left !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Quiz;