// Auth.jsx (simplified - no need for /auth prefix in paths)
import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Register from './Register/Register'
import Authbar from '../../Components/Authbar'
import Login from './Login/Login'
import Password from './Password/Password'

const Auth = () => {
    return (
        <>
            <Authbar />
            <Routes>
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
                <Route path='password' element={<Password />} />
                <Route path='*' element={<Navigate to="register" replace />} />
            </Routes>
        </>
    )
}

export default Auth