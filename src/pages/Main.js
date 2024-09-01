import React from "react";
import { Layout, Form, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
const { Content } = Layout;

function Main() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "0 20px", flex: 1 }}>
        <div
          style={{
            background: "#fff",
            padding: 30,
            margin: "16px 0",
            minHeight: "calc(100vh - 134px)",
            borderRadius: "10px",
          }}
        >
          <h1 style={{ marginTop: "60px" }}>서비스 이름</h1>
          <Row justify="center">
            <Col xs={24} sm={16} md={12} lg={8} xl={6}>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                style={{ marginTop: "120%" }}
              >
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    <Link to="/pages/SignUp">회원가입</Link>
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="secondary"
                    htmlType="submit"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    <Link to="/pages/Login">로그인</Link>
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

export default Main;
