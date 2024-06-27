import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Avatar,
  Badge,
  Dropdown,
  Space,
} from "antd";
import useSider from "@/hooks/useSider";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const { Header, Content } = Layout;

const MainLayout = () => {
  const location = useLocation();

  const siderList = useSider();
  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Navbar />
      {/* <Header
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          background: "#ffffff", // Reset header background color
        }}
      >
        <div style={{ flex: 1 }}>
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname.substring(1)]}
            items={[
              ...siderList.map((item) => {
                return {
                  ...item,
                  key: item.href,
                  label: <Link to={item.href}>{item.label}</Link>,
                };
              }),
            ]}
          />
        </div>
      </Header> */}
      <Layout>
        <Content
          style={{
            minHeight: 280,
            backgroundColor: "#ffffff",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
