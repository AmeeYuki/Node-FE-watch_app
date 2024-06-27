import React from "react";
import { useUpdatePasswordMutation } from "../../services/watchAPI";
import { Button, Input, Form, notification } from "antd";

const UpdatePassword = () => {
  const [updatePassword, { isLoading, error }] = useUpdatePasswordMutation();

  const handleUpdatePassword = async (values) => {
    const { currentPassword, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      notification.error({
        message: "Update Password Failed",
        description: "New password and confirm password do not match.",
      });
      return;
    }

    try {
      const result = await updatePassword({
        passwordData: { currentPassword, newPassword },
      });

      console.log(result);
      if (result.data) {
        // Xử lý thành công
        notification.success({
          message: "Update Password Success",
          description: "Your password has been updated.",
        });
      } else {
        notification.error({
          message: "Update Password Success",
          description: result.error.data.msg,
        });
      }
    } catch (error) {
      // Xử lý lỗi
      console.error("Update Password Error:", error);
      notification.error({
        message: "Update Password Failed",
        description: error.message || "Failed to update password.",
      });
    }
  };

  return (
    <div className="profile-page">
      <h1>Update Password</h1>
      <hr />
      <Form
        onFinish={handleUpdatePassword}
        layout="vertical"
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        className="information"
      >
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[
            { required: true, message: "Please enter your current password" },
          ]}
        >
          <Input.Password placeholder="Enter current password" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            { required: true, message: "Please enter your new password" },
          ]}
        >
          <Input.Password placeholder="Enter confirm password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[
            { required: true, message: "Please enter your new password" },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdatePassword;
