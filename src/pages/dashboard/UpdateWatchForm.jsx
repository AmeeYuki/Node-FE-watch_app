// src/components/UpdateWatchForm.js

import React, { useEffect } from "react";
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
  useUpdateWatchMutation,
} from "../../services/watchAPI";

const UpdateWatchForm = ({ visible, onCancel, onSuccess, watch }) => {
  const [form] = Form.useForm();
  const {
    data: brands,
    error: brandsError,
    isLoading: brandsLoading,
  } = useGetAllBrandQuery();
  const [updateWatch, { isLoading: updateWatchLoading }] =
    useUpdateWatchMutation();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        watchName: watch.watchName,
        image: watch.image,
        price: watch.price,
        automatic: watch.automatic,
        watchDescription: watch.watchDescription,
        brand: watch?.brand._id,
      });
    } else {
      form.resetFields();
    }
  }, [visible, form, watch]);

  const onFinish = async (values) => {
    try {
      const result = await updateWatch({ id: watch?._id, values });
      console.log(result);
      if (result.data) {
        notification.success({
          message: "Watch Updated",
          description: "The watch has been successfully updated.",
        });
        onSuccess();
      } else {
        notification.error({
          message: "Update Failed",
          description: result.error.data.msg,
        });
      }
    } catch (error) {
      console.error("Update Error:", error);
      notification.error({
        message: "Update Failed",
        description: error.message || "Failed to update watch.",
      });
    }
  };

  return (
    <Modal
      title="Update Watch"
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
          <Button type="primary" htmlType="submit" loading={updateWatchLoading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateWatchForm;
