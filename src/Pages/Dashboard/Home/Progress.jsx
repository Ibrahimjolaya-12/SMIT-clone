import React from 'react';
import { Row, Col, Card } from 'antd';
import { BookOutlined, ClockCircleOutlined } from '@ant-design/icons';

// Props ke through real data pass karo (jaise API se aayi hui counts)
const Progress = ({ totalTopics = 0, completedTopics = 0, pendingTopics = 0 }) => {
  const stats = [
    {
      label: 'Total Topics',
      value: totalTopics,
    },
    {
      label: 'Completed Topics',
      value: completedTopics,
    },
    {
      label: 'Pending Topics',
      value: pendingTopics,
    },
  ];

  return (
    <Row gutter={[24, 24]} className="topic-stats">
      {stats.map((stat) => (
        <Col xs={24} sm={12} md={8} key={stat.label}>
          <Card className={`stat-card ${stat.colorClass}`} bordered={false}>
            <div className="stat-card-content">
              <div className="stat-text">
                <h2 className="stat-value">{stat.value}</h2>
                <p className="stat-label">{stat.label}</p>
              </div>
              <div className="stat-icon-wrapper">{stat.icon}</div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Progress;