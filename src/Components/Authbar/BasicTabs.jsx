import React from 'react';
import './Tabs.scss';
import { NavLink } from 'react-router-dom';

const BasicTabs = () => {
  // Yahan apni routes define karo
  const tabs = [
    { id: 'login', label: 'Login', path: '/auth/login' },
    { id: 'register', label: 'Register', path: '/auth/register' },
    { id: 'password', label: 'Password', path: '/auth/password' },
  ];

  return (
    <div className="auth-tabs pb-2"  style={{backgroundColor: '#141414'}} >
      <div className="auth-tabs__nav">
        {tabs.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.path}
            className={({ isActive }) =>
              `auth-tabs__btn ${isActive ? 'auth-tabs__btn--active' : ''}`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BasicTabs;