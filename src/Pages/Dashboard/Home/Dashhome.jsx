import React, { useState } from "react";
import {
  ClockCircleOutlined,
  BookOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  NumberOutlined,
  UserOutlined,
  CopyOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // React Router ke liye

const Dashhome = () => {
  const navigate = useNavigate(); // navigate hook
  const [activeTab, setActiveTab] = useState("quizzes");
  const [selectedDay, setSelectedDay] = useState("Mon");

  const stats = [
    {
      id: "attendance",
      number: "4",
      label: "Attendance",
      icon: <ClockCircleOutlined />,
      color: "#4ade80",
      path: "/attendance", // navigate path
    },
    {
      id: "assignment",
      number: "7",
      label: "Assignment",
      icon: <BookOutlined />,
      color: "#a78bfa",
      path: "/assignments", // navigate path
    },
  ];

  // Card click handler — bahar define kiya
  const handleCardClick = (path) => {
    navigate(path);
  };

  // Dynamic schedule — har week Mon/Tue green
  const getScheduleDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const currentDay = today.getDay(); // 0=Sun, 1=Mon, 2=Tue...
    
    // Current week ka start (Sunday)
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - currentDay);

    return days.map((dayName, index) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + index);
      
      return {
        day: dayName,
        date: date.getDate().toString().padStart(2, '0'),
        active: dayName === "Mon" || dayName === "Tue", // Har week Mon/Tue green
      };
    });
  };

  const scheduleDays = getScheduleDays();

  const tabs = [
    { key: "assignments", label: "Assignments" },
    { key: "quizzes", label: "Quizzes" },
    { key: "events", label: "Events" },
  ];

  const feeData = [
    {
      month: "Jun 2026",
      amount: "Rs: 1000 /-",
      type: "Monthly",
      dueDate: "08-Jun-2026",
      voucherId: "124421001110",
      status: "paid",
    },
  ];


  const handleCopyVoucher = (id) => {
    navigator.clipboard.writeText(id);
    alert("Voucher ID copied!");
  };

  return (
    <div className="student-dashboard">
      {/* Top Section: Stats + Schedule */}
      <div className="dashboard-top">
        {/* Left: Stats Cards */}
        <div className="stats-section">
          <div className="stats-row">
            {stats.map((stat, index) => (
              <div
                className="stat-card"
                key={index}
                onClick={() => navigate('/dashboard/attendence')} // Navigate on click
                style={{ cursor: "pointer" }} // Pointer cursor
              >
                <div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
                <div className="stat-icon" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Active Course Card */}
          <div className="course-card">
            <h3 className="section-title">Active Course</h3>
            <div className="course-header">
              <h2>Web and Mobile App Development</h2>
              <span className="enrolled-badge">ENROLLED</span>
            </div>
            <div className="course-timing">
              <span className="time-badge">Mon 05:00 PM – 07:00 PM</span>
              <span className="time-badge">Tue 05:00 PM – 07:00 PM</span>
            </div>
            <div className="progress-bar">
              <div className="progress-label">
                <span>Progress</span>
                <span>0% Completed</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: "0%" }}></div>
              </div>
            </div>
            <div className="course-info">
              <div className="info-item">
                <NumberOutlined /> <strong>Batch:</strong> 9
              </div>
              <div className="info-item">
                <UserOutlined /> <strong>Roll:</strong> 506276
              </div>
              <div className="info-item">
                <EnvironmentOutlined /> <strong>Campus:</strong> Faisalabad
                Campus
              </div>
              <div className="info-item">
                <EnvironmentOutlined /> <strong>City:</strong> Faisalabad
              </div>
            </div>
          </div>
        </div>

        {/* Right: Class Schedule + Tabs */}
        <div className="sidebar-section">
          {/* Class Schedule - Dynamic Loop */}
          <div className="schedule-card">
            <h3>
              <CalendarOutlined /> Class Schedule
            </h3>
            <div className="days-row">
              {scheduleDays.map((item, index) => (
                <div
                  key={index}
                  className={`day-box ${item.active ? "active" : ""} ${
                    selectedDay === item.day ? "selected" : ""
                  }`}
                  onClick={() => setSelectedDay(item.day)}
                >
                  <span className="day-name">{item.day}</span>
                  <span className="day-date">{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs Card */}
          <div className="tabs-card">
            <div className="tabs-header">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(tab.key);
                    handleNavigate(`/${tab.key}`);
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="tabs-content">
              {activeTab === "assignments" && (
                <div className="empty-state">No pending assignments</div>
              )}
              {activeTab === "quizzes" && (
                <div className="empty-state">No upcoming quizzes</div>
              )}
              {activeTab === "events" && (
                <div className="empty-state">No upcoming events</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fee Section */}
      <div className="fee-section">
        <h3 className="section-title">Fee</h3>
        <div className="fee-table-wrapper">
          <table className="fee-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Due date</th>
                <th>Voucher ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {feeData.map((fee, index) => (
                <tr key={index}>
                  <td data-label="Month">{fee.month}</td>
                  <td data-label="Amount">{fee.amount}</td>
                  <td data-label="Type">{fee.type}</td>
                  <td data-label="Due date">{fee.dueDate}</td>
                  <td data-label="Voucher ID">
                    <span className="voucher-id">{fee.voucherId}</span>
                    <button
                      className="copy-btn"
                      onClick={() => handleCopyVoucher(fee.voucherId)}
                    >
                      <CopyOutlined />
                    </button>
                  </td>
                  <td data-label="Status">
                    <span className={`status-badge fee-${fee.status}`}>
                      <CheckCircleOutlined /> {fee.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashhome;