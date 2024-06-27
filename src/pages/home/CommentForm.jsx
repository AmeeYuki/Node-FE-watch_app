import React, { useState } from "react";
import { Form, Input, Button, Modal, Radio } from "antd";

const { TextArea } = Input;

const CommentForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      await onCreate(values);
      //   form.resetFields();
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Leave a Comment"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={submitting}
          onClick={handleFormSubmit}
        >
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="content"
          label="Comment"
          rules={[{ required: true, message: "Please enter your comment" }]}
        >
          <TextArea rows={4} placeholder="Your comment" />
        </Form.Item>
        <Form.Item
          name="rating"
          label="Rating"
          rules={[{ required: true, message: "Please select a rating (1-3)" }]}
        >
          <Radio.Group>
            <Radio.Button value="1">1</Radio.Button>
            <Radio.Button value="2">2</Radio.Button>
            <Radio.Button value="3">3</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CommentForm;
