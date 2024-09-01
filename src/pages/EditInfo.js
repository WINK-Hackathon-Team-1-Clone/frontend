import React, { useState } from "react";
import { Layout, Button, Form, Input, Select, Space } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BottomFooter from "../components/BottomFooter";
const { Content } = Layout;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 5,
    span: 10,
  },
};
const EditInfo = () => {
  const [form] = Form.useForm();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nowPassword, setNowpassword] = useState("");
  const [newPassword, setNewpassword] = useState("");
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };

  const clickEditUser = () => {
    axios
      .post(
        "https://wink.kookm.in/member/edit",
        { nowPassword, newPassword, userId, name },
        {
          withCredentials: true, // 쿠키를 포함하여 요청
        }
      )
      .then((result) => {
        console.log(result);
        alert("정보수정이 완료되었습니다.");
        navigate("/pages/MyPage");
      })
      .catch((err) => {
        console.error(err);
        alert(
          "아이디, 현재 비밀번호, 혹은 닉네임을 맞게 입력하였는지 확인하여 주십시오."
        );
      });
  };

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
          <Link
            to="/pages/MyPage"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <LeftOutlined style={{ marginTop: "40px", fontSize: "25px" }} />
          </Link>
          <h1 style={{ marginTop: "60px" }}>회원정보 수정</h1>
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{
              maxWidth: 600,
              marginTop: "20%",
            }}
          >
            <Form.Item
              name="userId"
              label="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "아이디를 입력해 주세요!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="nowPassword"
              label="현재 비밀번호 입력"
              value={password}
              onChange={(e) => setNowpassword(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "기존 비밀번호를 입력해 주세요!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="새 비밀번호 입력"
              value={newPassword}
              onChange={(e) => setNewpassword(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "새 비밀번호를 입력해 주세요!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="name"
              label="닉네임"
              value={name}
              onChange={(e) => setName(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "닉네임을 입력해 주세요!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  onClick={clickEditUser}
                >
                  수정 완료
                </Button>
                <Button htmlType="button" size="large">
                  <Link to="/pages/Login">처음으로</Link>
                </Button>
                <Button
                  type="link"
                  htmlType="button"
                  size="large"
                  onClick={onReset}
                >
                  초기화
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <BottomFooter />
    </Layout>
  );
};

export default EditInfo;
