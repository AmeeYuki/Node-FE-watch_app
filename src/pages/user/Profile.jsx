import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetMemberByIdQuery,
  useUpdateInfoMutation,
} from "../../services/watchAPI";
import { Button, Input, Form, notification } from "antd";

const UpdateProfile = () => {
  const { id } = useParams();
  const { data: member, error, isLoading } = useGetMemberByIdQuery(id);
  const [updateMember, { error: updateError }] = useUpdateInfoMutation(); // Destructure error from useUpdateInfoMutation
  const [form] = Form.useForm();

  const handleUpdate = async (values) => {
    const updatedMember = {
      memberName: values.memberName,
      name: values.name,
      yob: values.yob,
    };
    const result = await updateMember(updatedMember); // Await the result of updateMember and unwrap it

    console.log(result); // Log the result of the mutation
    if (result.data) {
      notification.success({
        message: "Update Success",
        description: result.data.msg,
      });
    } else {
      notification.error({
        message: "Update Unsuccessfully",
        description: result.error.data.msg,
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Handle loading state
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Handle error state
  }

  if (!member) {
    return <div>Member not found</div>; // Handle if member data is not available
  }

  return (
    <div className="profile-page">
      <h1>Update Profile</h1>
      <hr />
      <Form
        className="information"
        form={form}
        initialValues={{
          memberName: member.memberName,
          name: member.name,
          yob: member.yob,
        }}
        onFinish={handleUpdate}
        layout="vertical"
      >
        <Form.Item
          name="memberName"
          label="Member Name"
          rules={[{ required: true, message: "Please enter member name" }]}
        >
          <Input placeholder="Enter member name" />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          name="yob"
          label="Year of Birth"
          rules={[
            { required: true, message: "Please enter year of birth" },
            {
              pattern: /^(19\d{2}|20\d{2})$/,
              message: "Please enter a valid year",
            },
          ]}
        >
          <Input placeholder="Enter year of birth" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProfile;
