import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Typography, message } from 'antd';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../Config/Firebase';

const { Title } = Typography;

// --- SVG Check & Uncheck Icons ---
const CheckIcon = () => (
  <svg className="shrink-0" style={{ width: '16px', height: '16px', color: '#22c55e' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

const UncheckIcon = () => (
  <svg className="shrink-0" style={{ width: '16px', height: '16px', color: '#ef4444' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [passRules, setPassRules] = useState({
        uppercase: false,
        numbers: false,
        special: false,
    });
    
    const navigate = useNavigate();

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Password validation logic on typing
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassRules({
            uppercase: /[A-Z]/.test(value),
            numbers: /[0-9]/.test(value),
            special: /[&!@]/.test(value), // Custom allowed set: & ! @
        });
    };

    const onFinish = async (values) => {
        const { fullName, email, password, confirmPassword } = values;
        const trimmedName = fullName?.trim() || '';
        const trimmedEmail = email?.trim() || '';

        if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
            return message.error("Please fill all fields!");
        }
        if (trimmedName.length < 3) {
            return message.warning("Please Enter your Full name (Min 3 characters)");
        }
        if (!isValidEmail(trimmedEmail)) {
            return message.error("Please enter a valid email");
        }
        
        // Strict Validation Checks based on indicators
        if (!passRules.uppercase || !passRules.numbers || !passRules.special) {
            return message.error("Password must fulfill all the required rules!");
        }

        if (password !== confirmPassword) {
            return message.error("Passwords do not match!");
        }
        if (password.length < 6) {
            return message.warning("Password should be at least 6 characters");
        }

        setIsLoading(true);

        try {
            const { user } = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
            await updateProfile(user, { displayName: trimmedName });

            message.success("Account created successfully!");
            navigate("/auth/login");
        } catch (error) {
            console.error('Registration Error:', error);
            if (error.code === 'auth/email-already-in-use') {
                message.error("User already exists with this email");
            } else {
                message.error(error.message || "Registration failed");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="auth">
            <div className="container card p-3" style={{ position: 'relative' }}>
                <Title level={2} className="text-white">Register</Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                className="text-white"
                                label="Full Name"
                                name="fullName"
                                rules={[{ required: true, message: 'Please input your full name!' }]}
                            >
                                <Input placeholder="Full Name" size="large" />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                className="text-white"
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input placeholder="Enter Your E-mail Here" size="large" />
                            </Form.Item>
                        </Col>

                        <Col span={24} style={{ position: 'relative' }}>
                            <Form.Item
                                className="text-white"
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password 
                                    placeholder=". . . . . . . ." 
                                    size="large" 
                                    onChange={handlePasswordChange}
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                />
                            </Form.Item>

                            {/* DYNAMIC PASSWORD HINTS CONTAINER */}
                            {passwordFocus && (
                                <div style={{
                                    position: 'absolute',
                                    zIndex: 100,
                                    width: '100%',
                                    backgroundColor: '#1E1E1E',
                                    border: '1px solid #333',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    top: '75px',
                                }}>
                                    <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>
                                        Your password must contain:
                                    </h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: passRules.uppercase ? '#22c55e' : '#9CA3AF' }}>
                                            {passRules.uppercase ? <CheckIcon /> : <UncheckIcon />}
                                            Should contain uppercase.
                                        </li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: passRules.numbers ? '#22c55e' : '#9CA3AF' }}>
                                            {passRules.numbers ? <CheckIcon /> : <UncheckIcon />}
                                            Should contain numbers.
                                        </li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: passRules.special ? '#22c55e' : '#9CA3AF' }}>
                                            {passRules.special ? <CheckIcon /> : <UncheckIcon />}
                                            Should contain special characters (available chars: &!@).
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                className="text-white"
                                label="Confirm Password"
                                name="confirmPassword"
                                rules={[{ required: true, message: 'Please confirm your password!' }]}
                            >
                                <Input.Password placeholder=". . . . . . . ." size="large" />
                            </Form.Item>
                        </Col>

                        <Col span={24} className="mb-3">
                            <Button
                                htmlType="submit"
                                block
                                loading={isLoading}
                                disabled={isLoading}
                                style={{ backgroundColor: "#2B4F8C", color: "white", border: "none" }}
                            >
                                Register
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </main>
    );
};

export default Register;