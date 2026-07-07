import React from 'react';
import { EyeOutlined, UploadOutlined, EditOutlined } from '@ant-design/icons';

const Assignments = () => {
  // Sample data
  const stats = [
    { number: '07', label: 'Total', icon: '📋', color: '#4a9eff' },
    { number: '07', label: 'Submitted', icon: '✏️', color: '#fbbf24' },
    { number: '0', label: 'Approved', icon: '✅', color: '#4ade80' },
    { number: '07', label: 'Not Approved', icon: '❌', color: '#f87171' },
  ];

  const assignments = [
    {
      id: 1,
      name: 'React Firebase Authentication Assignment...',
      course: 'Web and Mobile App Development',
      dueDate: 'June 7, 2026',
      status: 'submitted',
    },
    {
      id: 2,
      name: 'React Authentication & Todos App Assignm...',
      course: 'Web and Mobile App Development',
      dueDate: 'May 19, 2026',
      status: 'submitted',
    },
    {
      id: 3,
      name: 'React Authentication Project Assignment ...',
      course: 'Web and Mobile App Development',
      dueDate: 'April 26, 2026',
      status: 'submitted',
    },
    {
      id: 4,
      name: 'React Project Development Assignment (Vi...',
      course: 'Web and Mobile App Development',
      dueDate: 'April 21, 2026',
      status: 'submitted',
    },
    {
      id: 5,
      name: 'React Basic Setup & Routing Assignment',
      course: 'Web and Mobile App Development',
      dueDate: 'April 12, 2026',
      status: 'submitted',
    },
    {
      id: 6,
      name: 'JavaScript Assignment 10',
      course: 'Web and Mobile App Development',
      dueDate: 'February 28, 2026',
      status: 'submitted',
    },
    {
      id: 7,
      name: 'JavaScript Assignment 9',
      course: 'Web and Mobile App Development',
      dueDate: 'February 28, 2026',
      status: 'submitted',
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'submitted': return 'status-submitted';
      case 'approved': return 'status-approved';
      case 'not-approved': return 'status-not-approved';
      default: return 'status-submitted';
    }
  };

  return (
    <div className="Assignments-container">
      {/* Stats Cards */}
      <div className="stats-row">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
            <div 
              className="stat-icon" 
              style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Assignments Table */}
      <div className="table-wrapper">
        <table className="assignments-table">
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Course</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((item) => (
              <tr key={item.id}>
                <td data-label="Assignment">{item.name}</td>
                <td data-label="Course">{item.course}</td>
                <td data-label="Due Date">{item.dueDate}</td>
                <td data-label="Status">
                  <span className={`status-badge ${getStatusClass(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td data-label="Action">
                  <div className="action-buttons">
                    <button className="action-btn" title="View">
                      <EyeOutlined />
                    </button>
                    <button className="action-btn" title="Upload">
                      <UploadOutlined />
                    </button>
                    <button className="action-btn" title="Edit">
                      <EditOutlined />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignments;