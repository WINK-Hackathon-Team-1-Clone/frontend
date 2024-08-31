import React from "react";
import { Layout, Menu, Form, Input, Button, Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignJustify,
  faMap,
  faUserLarge,
} from "@fortawesome/free-solid-svg-icons";

const { Content, Footer } = Layout;

function Main() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "0 20px", flex: 1 }}>
        <div
          style={{
            background: "#fff",
            padding: 24,
            margin: "16px 0",
            minHeight: "calc(100vh - 134px)",
            borderRadius: "10px",
          }}
        >
          <h1>Welcome to Ant Design with React</h1>
          <Row justify="center">
            <Col xs={24} sm={16} md={12} lg={8} xl={6}>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ marginTop: 24 }}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ padding: 0, overflow: "hidden" }}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Menu.Item key="1">
            <div
              style={{
                textAlign: "center",
                fontSize: "12px",
                margin: 0,
                width: 55,
              }}
            >
              <FontAwesomeIcon icon={faMap} style={{ fontSize: "24px" }} />
              <div style={{ marginTop: -30, marginBottom: -10 }}>편의맵</div>
            </div>
          </Menu.Item>
          <Menu.Item key="2">
            <div
              style={{
                textAlign: "center",
                fontSize: "12px",
                margin: 0,
                width: 55,
              }}
            >
              <FontAwesomeIcon
                icon={faAlignJustify}
                style={{ fontSize: "24px" }}
              />
              <div style={{ marginTop: -30, marginBottom: -10 }}>게시판</div>
            </div>
          </Menu.Item>
          <Menu.Item key="3">
            <div
              style={{
                textAlign: "center",
                fontSize: "12px",
                margin: 0,
                width: 55,
              }}
            >
              <FontAwesomeIcon
                icon={faUserLarge}
                style={{ fontSize: "24px" }}
              />
              <div style={{ marginTop: -30, marginBottom: -10 }}>
                마이페이지
              </div>
            </div>
          </Menu.Item>
        </Menu>
      </Footer>
    </Layout>
  );
}

export default Main;
