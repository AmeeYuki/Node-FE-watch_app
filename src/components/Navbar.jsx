import React from "react";
import { Layout, Menu, Button, Avatar, Space, Dropdown, Flex } from "antd";
import { UserOutlined, LoginOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "../pages/login/Logout";
import { useSelector } from "react-redux";
import { selectAuth } from "../slices/auth.slice";

const { Header } = Layout;

export default function Navbar() {
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();
  const handleViewProfie = () => {
    navigate(`/profile/${auth?._id}`);
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <div onClick={() => handleViewProfie()}>Update Profile</div>
      </Menu.Item>
      <Menu.Item key="settings">
        <Link to="/update-password">Update Password</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutButton />
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#002147",
        padding: "0 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <h1
            style={{
              marginRight: "16px",
            }}
          >
            Watchshop
          </h1>
        </Link>

        {/* Menu */}
        <Menu
          theme="dark"
          mode="horizontal"
          style={{
            background: "transparent",
            borderBottom: "none",
            width: "80%",
            fontWeight: "bold",
          }}
        >
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          {auth?.isAdmin == true ? (
            <>
              <Menu.Item key="brand">
                <Link to="/brands-dashboard">Brands</Link>
              </Menu.Item>
              <Menu.Item key="watch">
                <Link to="/watches-dashboard">Watches</Link>
              </Menu.Item>
            </>
          ) : null}
          {/* <Menu.Item key="admin">
            <Link to="/admin">Admin</Link>
          </Menu.Item>
          <Menu.Item key="dashboard">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item> */}
        </Menu>
      </div>

      <Space>
        {auth ? (
          <Flex align="center" justify="center" gap={10}>
            <h4 style={{ color: "#ffffff" }}>Welcome, {auth.name}</h4>
            <Dropdown overlay={menu} placement="bottomRight" trigger="click">
              <Avatar
                size={46}
                src="https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/3/photo1646280815645-1646280816151764748403.jpg"
              />
            </Dropdown>
          </Flex>
        ) : (
          <Link to="/login">
            <Button type="primary" icon={<LoginOutlined />}>
              Login
            </Button>
          </Link>
        )}
      </Space>
    </Header>
  );
}
