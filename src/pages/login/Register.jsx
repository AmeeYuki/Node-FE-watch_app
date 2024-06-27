import React, { useEffect, useState } from "react"; // Import React if not already imported

// Import the image file
import "./Login.css";
import { Alert, Button, DatePicker, Form, Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterUserMutation } from "../../services/authAPI";
import { selectToken, setAuth, setToken } from "../../slices/auth.slice";
import dayjs from "dayjs";

function Login() {
  const [form] = Form.useForm(); // Sử dụng hook Form của Ant Design
  const [error, setError] = useState(null); // Khai báo state error
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (values) => {
    const formattedYob = values.yob.format("YYYY");

    const result = await registerUser({
      memberName: values.username,
      password: values.password,
      name: values.name,
      yob: formattedYob,
    });
    // console.log(result);
    if (result.data.status == 200) {
      notification.success({
        message: "Register successfully",
        description: "Try to login!",
      });
      form.resetFields();
      navigate("/login");
    } else {
      notification.error({
        message: "Login error",
        description: result.error.data,
      });
      form.resetFields(); // Xóa dữ liệu trong các ô input
    }
  };
  const yearsFormat = "YYYY";

  return (
    <div className="login-page">
      <div className="img-background"></div>

      <div className="login-space" style={{ marginTop: 80 }}>
        {/* <h1 className="title"> Watch nè</h1> */}
        <h3 className="sub-title">Hello, Let's Sign up</h3>
        <Form form={form} className="login-form" onFinish={handleSubmit}>
          {/* <Form form={form} className="login-form"> */}
          {error && (
            <>
              <Alert message={error} type="error" showIcon />
              <br />
            </>
          )}
          {/* Hiển thị thông báo lỗi */}
          <p>Username</p>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                // pattern: /^[\w-]+(\.[\w-]+)*@(gmail\.com|fpt\.edu\.vn)$/,
                message: "Please input valid username!",
              },
            ]}
          >
            <Input
              type=""
              placeholder="your@username.com"
              className="form-input"
            />
          </Form.Item>
          <p>Password</p>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Enter password"
              className="form-input"
            />
          </Form.Item>
          <p>Name</p>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input.Password placeholder="Enter name" className="form-input" />
          </Form.Item>
          <p>Year of birth</p>
          <Form.Item
            name="yob"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              // defaultValue={dayjs("2015", yearsFormat)}
              format={yearsFormat}
              picker="year"
            />
          </Form.Item>

          <div className="forget-pass ">
            <p>
              <Link to={"/login"}>Login</Link>
            </p>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="submit-btn"
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
