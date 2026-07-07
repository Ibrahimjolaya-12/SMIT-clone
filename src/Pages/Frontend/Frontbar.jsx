import { Row, Col, Input, Button, Dropdown, ConfigProvider } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import logo from '../../assets/logo.png';

const Frontbar = () => {
    const [selectedItem, setSelectedItem] = useState(() => {
        const saved = localStorage.getItem('dropdownSelection');
        return saved || 'All';
    });

    const items = [
        { key: '1', label: 'All' },
        { key: '2', label: 'Enrolled' },
        { key: '3', label: 'Dropped' },
    ];

    const handleMenuClick = (e) => {
        const selected = items.find(item => item.key === e.key);
        if (selected) {
            const newLabel = selected.label;
            setSelectedItem(newLabel);
            localStorage.setItem('dropdownSelection', newLabel);
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    // Dropdown menu ke liye custom theme
    const dropdownTheme = {
        components: {
            Menu: {
                colorBgContainer: '#ff0000',        // Menu background red
                colorItemBg: '#ff0000',              // Item background red
                colorItemBgHover: '#cc0000',         // Hover pe dark red
                colorItemText: '#ffffff',            // Text white
                colorItemTextHover: '#ffffff',       // Hover text white
            },
        },
    };

    // Search input ke liye custom theme (placeholder color ke liye)
    const searchTheme = {
        components: {
            Input: {
                colorTextPlaceholder: '#5b5a5a',
            },
        },
    };

    return (
        <div style={{ background: "#131514", padding: "10px 20px" }}>
            {/* Search icon (magnifying glass) ko white karne ke liye direct CSS override */}
            <style>{`
                .custom-search .ant-input-search-icon,
                .custom-search .ant-input-search-icon svg,
                .custom-search .anticon-search {
                    color: #5b5a5a !important;
                }
            `}</style>

            <div className="container">
                <Row>
                    <Col span={24} className="d-flex" style={{ justifyContent: "space-between", alignItems: "center" }}>
                        <img src={logo} alt="Logo" style={{ height: "50px" }} />
                        
                        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                            <ConfigProvider theme={searchTheme}>
                                <Input.Search
                                    className="custom-search text-white"
                                    style={{
                                        width: "300px",
                                        background: "#222222",
                                        border: "1px solid #3f3e3e",
                                        borderRadius: "10px",
                                        color: "#ffffff"
                                    }}
                                    placeholder="Search Courses"
                                    variant="filled"
                                />
                            </ConfigProvider>
                            
                            {/* ConfigProvider se dropdown menu theme override */}
                            <ConfigProvider theme={dropdownTheme}>
                                <Dropdown 
                                    menu={menuProps} 
                                    placement="bottomRight"
                                    dropdownRender={(menu) => (
                                        <div style={{ 
                                            
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                        }}>
                                            {menu}
                                        </div>
                                    )}
                                >
                                    <Button style={{ 
                                        minWidth: '120px', 
                                        background: "#131514", 
                                        border: "1px solid #3f3e3e", 
                                        color: "#ffffff" 
                                    }}>
                                        {selectedItem} <DownOutlined style={{ marginLeft: 8 }} />
                                    </Button>
                                </Dropdown>
                            </ConfigProvider>
                        </div>
                        
                        <Button style={{ background: "#222222", border: "1px solid #3f3e3e", color: "#ffffff" }}>
                            Feedback
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Frontbar;