import React, { useState } from "react";
import { Card, Spin, Alert, Button, Flex, notification } from "antd";
import { StarFilled } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import {
  useGetWatchByIdQuery,
  useAddCommentMutation,
} from "../../services/watchAPI";
import CommentForm from "./CommentForm"; // Adjust the import path as needed
import { useSelector } from "react-redux";
import { selectAuth } from "../../slices/auth.slice";

const WatchDetail = () => {
  const { id } = useParams();
  const { data: watch, error, isLoading, refetch } = useGetWatchByIdQuery(id);
  const [addComment] = useAddCommentMutation();
  const [modalVisible, setModalVisible] = useState(false);
  const auth = useSelector(selectAuth);

  const renderStars = (rating) => {
    return Array(rating)
      .fill(1)
      .map((_, index) => (
        <StarFilled key={index} style={{ color: "#fadb14" }} />
      ));
  };

  const handleCommentSubmit = async (commentData) => {
    try {
      await addComment({ watchId: id, ...commentData }).unwrap();
      setModalVisible(false);
      refetch(); // Assuming refetch is a function to refetch watch data
    } catch (error) {
      console.error("Error submitting comment:", error);
      notification.error({
        message: "Comment error",
        description: error.data.msg,
      });
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <Alert
          message="Error"
          description="Could not fetch watch details"
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!watch) {
    return (
      <div style={{ padding: "20px" }}>
        <Alert
          message="Error"
          description="Watch not found"
          type="error"
          showIcon
        />
      </div>
    );
  }

  const hasUserCommented = watch.comments.some(
    (comment) => comment?.author?._id === auth?._id
  );

  return (
    <div style={{ padding: "20px" }}>
      <Flex justify="center" gap={40} align="center">
        <div className="image">
          <img width={400} alt={watch.watchName} src={watch.image} />
        </div>
        <div style={{ marginLeft: 20, fontSize: "24px" }}>
          <p>
            <strong>Watch Name:</strong> {watch.watchName}
          </p>
          <p>
            <strong>Brand:</strong> {watch?.brand?.brandName}
          </p>
          <p>
            <strong>Price:</strong> ${watch.price}
          </p>
          <p>
            <strong>Automatic:</strong> {watch.automatic ? "Yes" : "No"}
          </p>
          <p>
            <strong>Description:</strong>
          </p>
          <p>{watch.watchDescription}</p>
        </div>
      </Flex>
      <br />
      <br />
      <br />
      <Flex justify="space-between" align="center">
        <h1>Comments:</h1>
        {auth ? (
          auth.isAdmin === false ? (
            hasUserCommented === false ? (
              <Button
                type="primary"
                onClick={handleOpenModal}
                style={{ marginBottom: 16 }}
              >
                Add Comment
              </Button>
            ) : (
              <div>User has commented</div>
            )
          ) : null
        ) : (
          <div>
            <Link to={"/login"}>Login</Link> to comment
          </div>
        )}
      </Flex>
      <hr />
      <br />

      {watch.comments.map((comment) => (
        <div key={comment._id}>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h4>{comment.author.name}</h4>
                <p>{comment.content}</p>
              </div>
              <div>Rating: {renderStars(comment.rating)}</div>
            </div>
          </Card>
        </div>
      ))}
      <CommentForm
        visible={modalVisible}
        onCreate={handleCommentSubmit}
        onCancel={handleCloseModal}
      />
    </div>
  );
};

export default WatchDetail;
