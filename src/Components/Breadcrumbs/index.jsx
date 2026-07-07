import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb, ConfigProvider } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  CalendarOutlined,
  QuestionCircleOutlined,
  BarChartOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

const routeConfig = {
  "/frontend": { label: "Home", icon: <HomeOutlined /> },
  "dashhome": { label: "Web and Mobile App Development" },
  "assignments": { label: "Assignments", icon: <FileTextOutlined /> },
  "attendence": { label: "Attendance", icon: <CalendarOutlined /> },
  "quiz": { label: "Quiz", icon: <QuestionCircleOutlined /> },
  "progress": { label: "Progress", icon: <BarChartOutlined /> },
  "payment": { label: "Payment", icon: <CreditCardOutlined /> },
};

const BreadcrumbNav = () => {
  const location = useLocation();
  const path = location.pathname;

  const buildItems = () => {
    const items = [];

    // 1️⃣ Home (Frontend) Link mapping configuration
    items.push({
      title: (
        <Link to="/frontend" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <HomeOutlined />
          <span>Home</span>
        </Link>
      ),
    });

    if (path === "/frontend") {
      return items;
    }

    // Safe splitting mechanics
    let snippets = path.split("/").filter((i) => i);
    
    // 🔥 AUTO RECOVERY: Agar route sirf ['dashboard'] bacha hai, to loop se pehle hi use full clear path structure de do
    if (snippets.length === 1 && snippets[0] === "dashboard") {
      snippets.push("dashhome");
    }

    let accumulatedPath = "";

    snippets.forEach((snippet, index) => {
      accumulatedPath += `/${snippet}`;
      const isLast = index === snippets.length - 1;

      // 2️⃣ Handling "dashboard" segment mapping properties
      if (snippet === "dashboard") {
        items.push({
          title: isLast ? (
            <span>Web and Mobile App Development</span>
          ) : (
            <Link to="/dashboard/dashhome">Web and Mobile App Development</Link>
          ),
        });
        return; 
      }

      // 3️⃣ Skip direct replication of "dashhome" naming parameters to prevent duplicates
      if (snippet === "dashhome") {
        return;
      }

      // 4️⃣ Dashboard active child layout tabs handler
      const config = routeConfig[snippet];
      if (config) {
        items.push({
          title: isLast ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              {config.icon}
              <span>{config.label}</span>
            </span>
          ) : (
            <Link to={accumulatedPath} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              {config.icon}
              <span>{config.label}</span>
            </Link>
          ),
        });
      }
    });

    return items;
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Breadcrumb: {
            linkColor: "#8C8C8C",
            linkHoverColor: "#ffffff",
            lastItemColor: "#ffffff", 
            separatorColor: "rgba(255, 255, 255, 0.45)",
            fontSize: "18px",
          },
        },
      }}
    >
      <style>{`
        .ant-breadcrumb a {
          text-decoration: none !important;
        }
        .ant-breadcrumb a:hover {
          color: #ffffff !important;
        }
      `}</style>

      <Breadcrumb
        style={{ fontWeight: "500", padding: "30px 20px" }}
        items={buildItems()}
      />
    </ConfigProvider>
  );
};

export default BreadcrumbNav;