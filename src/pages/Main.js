import React from "react";
import { Layout, Form, Input, Button, Row, Col } from "antd";
import BottomFooter from "../components/BottomFooter";
const { Content } = Layout;

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
          <h1>서비스 이름</h1>
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
                  label="아이디"
                  name="userId"
                  rules={[
                    { required: true, message: "아이디를 입력해 주세요!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="비밀번호"
                  name="password"
                  rules={[
                    { required: true, message: "비밀번호를 입력해 주세요!" },
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
    </Layout>
  );
}

export default Main;
