import React, { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Avatar, Card, Pagination, Row, Col, Button } from "antd";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";

export default function WatchList({ watches = [] }) {
  // Add default value
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentItems = watches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const navigate = useNavigate();

  const handleViewDetail = (id) => {
    navigate(`watches/${id}`);
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        {currentItems.map((item) => (
          <Col key={item._id.$oid} xs={24} sm={12} md={8} lg={8}>
            <div className="d-flex" style={{ justifyContent: "center" }}>
              <Card
                style={{
                  width: 300,
                  marginBottom: 20,
                  boxShadow: "2px 2px 1px 1px rgba(111, 77, 0, 0.2)",
                }}
                cover={<img alt="example" src={item.image} />}
              >
                <Meta
                  avatar={<Avatar src={item.image} />}
                  title={item.watchName}
                  description={`$${item.price} `}
                />
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "#333333",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleViewDetail(item._id)}
                  >
                    View Detail
                    <InfoCircleOutlined />
                  </Button>
                </div>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={watches.length}
        onChange={handlePageChange}
        style={{ marginTop: 16, textAlign: "center" }}
      />
    </div>
  );
}
