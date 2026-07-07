import { Button, Col, Form, Input, Row, Typography, message } from 'antd';
import React, { useState } from 'react';
import { auth } from '../../../Config/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const onFinish = async (values) => {
        const { email, password } = values;
        const trimmedEmail = email?.trim() || '';

        if (!trimmedEmail || !password) {
            return message.error("Please fill in all fields!");
        }
        if (!isValidEmail(trimmedEmail)) {
            return message.error("Please enter a valid email address");
        }
        if (password.length < 6) {
            return message.warning("Password must be at least 6 characters long");
        }

        setIsLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, password);
            const user = userCredential.user;
            message.success("Login successful!");
            navigate("/frontend");
            // Handle successful login...
        } catch (error) {
            message.error("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="auth">
            <div className="container card p-4">
                <Title level={3} className="text-white">Login</Title>
                <p style={{ fontSize: "12px", color: "#dadad0" }}>
                    Kindly provide the email and password used during SMIT course registration.
                </p>

                <Form layout="vertical" onFinish={onFinish}>
                    <Row>
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

                        <Col span={24}>
                            <Form.Item
                                className="text-white"
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
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
                                Login
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </main>
    );
};

export default Login;