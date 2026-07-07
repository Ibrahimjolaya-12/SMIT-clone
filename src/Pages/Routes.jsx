// Index.jsx
import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Auth from './Auth'
import Frontend from './Frontend'
import Dashboard from './Dashboard'

const Index = () => {
  return (
    
    <Routes>
        <Route path="/" element={<Navigate to="/auth/register" replace />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth/register" replace />} />
        <Route path="/frontend/*" element={<Frontend />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        
    </Routes>
  )
}

export default Index