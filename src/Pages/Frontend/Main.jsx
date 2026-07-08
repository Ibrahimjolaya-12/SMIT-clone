import { Button, Col, Row, Typography } from "antd";
import React from "react";
import Frontbar from "./Frontbar";
import { useNavigate } from "react-router-dom";
const { Title, Paragraph } = Typography;

const Main = () => {
  const navigate = useNavigate();
  return (
    <>
      <main className="start">
        <Frontbar />
        <div className="container-fluid">
          <div
            onClick={()=>{navigate("/dashboard/dashhome")}}
            className=" card mt-3 "
            style={{ borderRadius: "20px" , cursor: "pointer"}}
          >
            <Row>
              <Col
                span={24}
                className="d-flex container"
                style={{
                  justifyContent: "space-between",
                  background: "#1E2433",
                  padding: "10px 20px",
                  borderRadius: "15px 15px 0px 0px", paddingTop: "20px",
                }}
              >
                <Title className="text-white" level={4}>
                  Web and Mobile App Development
                </Title>
                <p className="enroll">Enrolled</p>
              </Col>
              <Col span={24} className="px-4 pt-2">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Paragraph className="text-white">Progress</Paragraph>
                  <Paragraph className="text-white">0% Complete</Paragraph>
                </div>
                <div>

                  <input
                    type="range"
                    className="form-range"
                    disabled
                  ></input>
                </div>
              </Col>
              <Col span={24} >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", paddingLeft: "30px", width: "450px" }}>
                  <div>
                    <h6 style={{ fontWeight: "500", }}><span ><i className="text1 fa-solid fa-hashtag"></i> </span>Batch: <span className="text1">9</span></h6>
                  </div>
                  <div>
                    <h6 style={{ fontWeight: "500", }}><span > <i className="text1 fa-solid fa-award"></i> </span>Roll: <span className="text1">153409</span></h6>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", paddingLeft: "30px", width: "485px" }}>
                  <div>
                    <h6 style={{ fontWeight: "500", }}><span ><i className="text1 fa-solid fa-location-dot"></i> </span>Campus: <span className="text1">Faisalabad Campus</span></h6>
                  </div>
                  <div>
                    <h6 style={{ fontWeight: "500", }}><span ><i className="text1 fa-solid fa-location-dot"></i> </span>City: <span className="text1">Faisalabad</span></h6>
                  </div>
                </div>

              </Col>
              <Col span={24} style={{ padding: "0px 10px" }} className="py-2">
                <Button block size="large" style={{ fontWeight: "500", fontSize: "20px", backgroundColor: "transparent" }}><i class="fa-regular fa-eye"></i>  View Details</Button>
              </Col>
            </Row>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
