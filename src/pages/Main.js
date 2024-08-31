import React, {useState} from "react";
import { Layout, Form, Input, Button, Row, Col } from "antd";
import { LeftOutlined} from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


const { Content } = Layout;

function Main() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [userId,setUserId] = useState('');
  const [password,setPassword] = useState('');
  const [isLoginOk, setIsLoginOk] = useState(false);
  const navigate = useNavigate();
  const LoginFunc = async (e) => {
      axios.post('https://10.223.126.146:443/login', {userId, password}, {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          withCredentials: true
      })
          .then(response => {
              console.log(response.data);
              alert("로그인에 성공했습니다.")
              navigate('/pages/MyPage')

          })
          .catch(error => {
              console.error(error);
              alert("아이디 혹은 비밀번호를 다시 한 번 확인해 주세요.")
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
          <Link to="/pages/Main" style={{
            textDecoration : 'none',
            color : 'black'
          }}>
            <LeftOutlined
                style={{marginTop : '40px',
                  fontSize : '25px'}}/>
          </Link>

          <h1 style={{marginTop: '60px'}}>로그인 해 주세요.</h1>
          <Row justify="center">
            <Col xs={24} sm={16} md={12} lg={8} xl={6}>
                <Form
                  name="basic"
                  initialValues={{remember: true}}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  style={{marginTop: '30%'}}
              >
                <Form.Item
                    label="아이디"
                    name="userId"
                    htmlFor="id"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    rules={[
                      {required: true, message: "아이디를 입력해 주세요!"},
                    ]}

                >
                  <Input/>
                </Form.Item>

                <Form.Item
                    label="비밀번호"
                    name="password"
                    htmlFor="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    rules={[
                      {required: true, message: "비밀번호를 입력해 주세요!"},
                    ]}

                >
                  <Input.Password/>
                </Form.Item>
                <Form.Item>
                  <Button
                      type="primary"
                      htmlType="submit"
                      size='large'
                      style={{
                        marginTop : "100px",
                        width: "100%"
                      }}
                      onClick={LoginFunc}
                  >
                    로그인
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
