import React from "react";
import { Button, ConfigProvider, notification } from "antd";
import "./Logout.css";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/auth.slice";
import { LogoutOutlined } from "@ant-design/icons";
export default function LogoutButton() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    notification.success({
      message: "Logout successfully",
      description: "See you again!",
    });
  };
  return (
    <div className="logout-btn" onClick={handleLogout}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#333333",
            colorTextLightSolid: "#000000",
          },
        }}
      >
        <Button
          style={{ color: "#ffffff", fontWeight: "bold" }}
          type="primary"
          icon={<LogoutOutlined />}
        >
          Logout
        </Button>
      </ConfigProvider>
    </div>
  );
}
