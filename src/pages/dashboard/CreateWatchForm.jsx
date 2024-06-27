// src/components/CreateWatchForm.js

import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  notification,
} from "antd";
import {
  useGetAllBrandQuery,
  useAddWatchMutation,
} from "../../services/watchAPI";

const CreateWatchForm = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const {
    data: brands,
    error: brandsError,
    isLoading: brandsLoading,
  } = useGetAllBrandQuery();
  const [addWatch, { isLoading: addWatchLoading }] = useAddWatchMutation();

  useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [visible, form]);

  const onFinish = async (values) => {
    try {
      const result = await addWatch(values);
      console.log(result);
      if (result.data) {
        notification.success({
          message: "Watch Created",
          description: "The watch has been successfully created.",
        });
        onSuccess();
      } else {
        notification.error({
          message: "Creation Failed",
          description: result.error.data,
        });
      }
    } catch (error) {
      console.error("Creation Error:", error);
      notification.error({
        message: "Creation Failed",
        description: error.message || "Failed to create watch.",
      });
    }
  };

  return (
    <Modal
      title="Create New Watch"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="watchName"
          label="Watch Name"
          rules={[{ required: true, message: "Please enter watch name" }]}
        >
          <Input placeholder="Enter watch name" />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image URL"
          rules={[{ required: true, message: "Please enter image URL" }]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber placeholder="Enter price" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="automatic" label="Automatic" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item
          name="watchDescription"
          label="Description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>
        <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: "Please select brand" }]}
        >
          <Select placeholder="Select brand" loading={brandsLoading}>
            {brands &&
              brands.map((brand) => (
                <Select.Option key={brand._id} value={brand._id}>
                  {brand.brandName}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={addWatchLoading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateWatchForm;
