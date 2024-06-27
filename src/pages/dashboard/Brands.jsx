import React, { useState } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  notification,
  Flex,
} from "antd";
import {
  useGetAllBrandQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} from "../../services/watchAPI";

const Brands = () => {
  const { data: brands, error, isLoading, refetch } = useGetAllBrandQuery();
  const [addBrand] = useAddBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);

  const columns = [
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentBrand(record);
    form.setFieldsValue({ brandName: record.brandName });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteBrand(id);
      console.log(result);
      if (result.data) {
        notification.success({
          message: "Delete Brand Success",
          description: "Brand has been deleted.",
        });
        refetch();
      } else {
        notification.error({
          message: "Delete Brand Unsuccessfully",
          description: result.error.data.msg,
        });
      }
    } catch (error) {
      console.error("Delete Brand Error:", error);
      notification.error({
        message: "Delete Brand Failed",
        description: error.message || "Failed to delete brand.",
      });
    }
  };

  const handleCreate = () => {
    setEditMode(false);
    setCurrentBrand(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const onFinish = async (values) => {
    try {
      if (editMode) {
        const result = await updateBrand({
          id: currentBrand._id,
          brandName: values.brandName,
        });
        console.log(result);
        if (result.data) {
          notification.success({
            message: "Update Brand Success",
            description: "Brand has been updated.",
          });
          setModalVisible(false);
          form.resetFields();
          refetch();
        } else {
          notification.error({
            message: "Update Brand Unsuccessfully",
            description: result.error.data.msg,
          });
        }
      } else {
        const result = await addBrand(values.brandName);
        if (result.data) {
          notification.success({
            message: "Create Brand Success",
            description: "New brand has been created.",
          });
          setModalVisible(false);
          form.resetFields();
          refetch();
        } else {
          notification.error({
            message: "Create Brand Unsuccess",
            description: result.error.data.msg,
          });
        }
      }
    } catch (error) {
      console.error("Brand Operation Error:", error);
      notification.error({
        message: "Brand Operation Failed",
        description: error.message || "Failed to complete the operation.",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ padding: "10px 20px" }}>
      <Flex justify="space-between" align="center">
        <h1>All Brands</h1>
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={handleCreate}
        >
          Create Brand
        </Button>
      </Flex>
      <hr />
      <br />
      <Table columns={columns} dataSource={brands} rowKey="_id" />
      <Modal
        title={editMode ? "Edit Brand" : "Create New Brand"}
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="brandName"
            label="Brand Name"
            rules={[{ required: true, message: "Please enter brand name" }]}
          >
            <Input placeholder="Enter brand name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editMode ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Brands;
