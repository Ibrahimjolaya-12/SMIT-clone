import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import {
  DashboardOutlined,
  FileTextOutlined,
  LeftOutlined,
  LogoutOutlined,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Avatar, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import Home from '../../Pages/Dashboard/Home';
import Bread from '../Breadcrumbs';
import { useAuth } from '../../Context/Auth'; 

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation(); 
  const { handleLogout } = useAuth(); 

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const items = [
    getItem(<Link to="/dashboard/dashhome" className='text-decoration-none'>Dashboard</Link>, '1', <DashboardOutlined className='fs-5' />),
    getItem(<Link to="/dashboard/progress" className='text-decoration-none'>Progress</Link>, 'sub1', <i className="fa-solid fa-book-open fs-5"></i>),
    getItem(<Link to="/dashboard/attendence" className='text-decoration-none'>Attendance</Link>, 'sub2', <i className="fa-regular fa-calendar-check fs-5"></i>),
    getItem(<Link to="/dashboard/payment" className='text-decoration-none'>Payment</Link>, 'sub3', <i className="fa-solid fa-wallet fs-5"></i>),
    getItem(<Link to="/dashboard/assignments" className='text-decoration-none'>Assignments</Link>, 'sub4', <FileTextOutlined className='fs-5' />),
    getItem(<Link to="/dashboard/quiz" className='text-decoration-none'>Quizzes</Link>, 'sub5', <i className="fa-solid fa-clipboard-check fs-5"></i>),
    
    { type: 'divider', style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', margin: '16px 0' } },
    
    getItem(
      <span style={{ display: 'block', width: '100%', color: '#ef4444' }}>
        Logout
      </span>,
      '10',
      <LogoutOutlined style={{ color: '#ef4444' }} />
    )
  ];

  // 🔥 CLICK HANDLER BINDING
  const handleMenuClick = (e) => {
    if (e.key === '10') {
      handleLogout();
    }
  };

  const pathToKey = {
    '/dashboard': '1',
    '/dashboard/dashhome': '1',
    '/dashboard/progress': 'sub1',
    '/dashboard/attendence': 'sub2',
    '/dashboard/payment': 'sub3',
    '/dashboard/assignments': 'sub4',
    '/dashboard/quiz': 'sub5',
  };

  const matchedPath = Object.keys(pathToKey)
    .filter(
      (path) =>
        location.pathname === path || location.pathname.startsWith(path + '/')
    )
    .sort((a, b) => b.length - a.length)[0];

  const currentKey = matchedPath ? pathToKey[matchedPath] : '1';

  let user = null;
  try {
    const savedUser = localStorage.getItem("user");
    user = savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("Localstorage recovery parameters missing:", error);
  }

  const customTrigger = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        marginBottom: '30px',
        padding: '0px 16px',
        paddingTop: '18px',
        paddingBottom: '18px',
        height: '60px',
        cursor: 'pointer',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
      onClick={() => setCollapsed(!collapsed)}
    >
      {!collapsed && (
        <img src={logo} alt="Logo" style={{ height: '45px', objectFit: 'contain' }} />
      )}
      <div style={{ color: '#8c8c8c', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
        {collapsed ? <RightOutlined /> : <LeftOutlined />}
      </div>
    </div>
  );

  return (
    <>
      <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row', background: '#000000' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
          style={{ background: '#000000', borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}
        >
          <div className="demo-logo-vertical" />
          {customTrigger}

          <Menu
            theme="dark"
            selectedKeys={[currentKey]}
            mode="inline"
            items={items}
            onClick={handleMenuClick} // 🔥 FIXED: Added onClick execution mapping property
            style={{ background: '#000000' }}
          />
        </Sider>

        <Layout style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', background: '#000000' }}>
          <Header style={{ 
            padding: '0 24px', 
            background: '#000000', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            height: '64px'
          }}>
            <Bread />
            
            <Space size="large" style={{ display: 'flex', alignItems: 'center' }}>
              {user?.email && (
                <Space size="middle" style={{ cursor: 'default' }}>
                  <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: '#2b4f8c' }} />
                  <span style={{ color: '#8c8c8c', fontSize: '13px', fontWeight: '500' }}>
                    {user.email}
                  </span>
                </Space>
              )}
              
              <Button style={{ background: "#141414", border: "1px solid #303030", color: "#ffffff" }}>
                Feedback
              </Button>
            </Space>
          </Header>
          
          <Content style={{ margin: '16px', display: 'flex', flexDirection: 'column', background: '#000000' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: '#000000',
                borderRadius: borderRadiusLG,
                flex: 1
              }}
            >
              <Home />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;