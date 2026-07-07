import React from 'react'
import logo from '../../assets/logo.png'
import { Col, Row } from 'antd'
const Topbar = () => {
    return (
        <>
            <div style={{ backgroundColor: '#141414' }} className="container-fluid">
                <Row>
                    <Col span={24} className='text-center pt-3'>
                        <img style={{ width: "100px" }} src={logo} alt="" />
                    </Col>
                    <Col span={24} className='text-center  pb-2'>
                        <h5 className='text-white'>Student Portal</h5>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Topbar