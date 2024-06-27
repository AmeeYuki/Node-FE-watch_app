// src/components/Watches.js

import React, { useState } from "react";
import { Table, Space, Button, Modal, Form, Input, notification } from "antd";
import {
  useDeleteWatchMutation,
  useGetAllWatchQuery,
} from "../../services/watchAPI";
import CreateWatchForm from "./CreateWatchForm";
import UpdateWatchForm from "./UpdateWatchForm";

const Watches = () => {
  const { data: watches, error, isLoading, refetch } = useGetAllWatchQuery();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [deleteWatch] = useDeleteWatchMutation();

  const handleEdit = (record) => {
    setSelectedWatch(record);
    setUpdateModalVisible(true);
  };

  const handleCreateSuccess = () => {
    setCreateModalVisible(false);
    refetch(); // Refresh the watch list after creating a new watch
  };

  const handleUpdateSuccess = () => {
    setUpdateModalVisible(false);
    refetch(); // Refresh the watch list after updating
  };
  const handleDelete = async (id) => {
    try {
      const result = await deleteWatch(id);
      if (result.data) {
        notification.success({
          message: "Watch Deleted",
          description: "The watch has been successfully deleted.",
        });
        refetch(); // Refresh the watch list after deletion
      } else {
        notification.error({
          message: "Deletion Failed",
          description: result.error.data,
        });
      }
    } catch (error) {
      console.error("Deletion Error:", error);
      notification.error({
        message: "Deletion Failed",
        description: error.message || "Failed to delete watch.",
      });
    }
  };
  const watchColumns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Watch Name",
      dataIndex: "watchName",
      key: "watchName",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          src={record.image}
          alt={record.watchName}
          style={{ width: "50px" }}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Automatic",
      dataIndex: "automatic",
      key: "automatic",
      render: (text, record) => (record.automatic ? "Yes" : "No"),
    },
    // {
    //   title: "Description",
    //   dataIndex: "watchDescription",
    //   key: "watchDescription",
    // },
    {
      title: "Brand Name",
      dataIndex: ["brand", "brandName"],
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

  const dataSource = watches?.map((watch, index) => ({
    ...watch,
    no: index + 1,
  }));

  return (
    <div style={{ padding: "10px 20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>All Watches</h1>
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={() => setCreateModalVisible(true)}
        >
          Create Watch
        </Button>
      </div>
      <hr />
      <br />
      <Table columns={watchColumns} dataSource={dataSource} rowKey="_id" />
      <CreateWatchForm
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSuccess={handleCreateSuccess}
      />
      <UpdateWatchForm
        visible={updateModalVisible}
        onCancel={() => setUpdateModalVisible(false)}
        onSuccess={handleUpdateSuccess}
        watch={selectedWatch}
      />
    </div>
  );
};

export default Watches;
