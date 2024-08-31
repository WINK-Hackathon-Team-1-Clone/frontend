import React, {useState} from "react";
import {Layout, Button, Form, Input, Select, Space, Col, Row} from 'antd';
import {LeftOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import BottomFooter from "../components/BottomFooter";
const { Content } = Layout;

const MyPage = () => {
    const [userId,setUserId] = useState('');
    const navigate = useNavigate();

    const LogoutFunc = async (e) => {
        axios.post('https://10.223.126.146:443/logout', {}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
                navigate('/')
            })
            .catch(error => {
                console.error(error);
            });
    }
    const GetUserFunc = async (e) => {
        axios.get('https://10.223.126.146:443/user-info', {withCredentials: true})
            .then(response => {
                console.log(response.data.username);
                setUserId(response.data.username);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const RemoveUserFunc = async (e) => {
        try {
            let res = await axios.delete(`https://10.223.126.146:443/delete/${userId}`, {withCredentials: true})
            console.log(res.data.username);
            alert("회원 탈퇴가 정상적으로 이루어졌습니다. 감사합니다.")
            navigate('/')
        } catch(err) {
            console.error(err);
        }
    }

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
                    <Link to="/pages/Login" style={{
                        textDecoration : 'none',
                        color : 'black'
                    }}>
                        <LeftOutlined
                            style={{marginTop : '40px',
                                fontSize : '25px'}}/>
                    </Link>
                    <h1 style={{marginTop : '60px'}}>{userId}의 마이페이지.</h1>

                    <Row justify="center">
                        <Col xs={24} sm={16} md={12} lg={8} xl={6}>
                            <Form
                                name="basic"
                                initialValues={{ remember: true }}
                                style={{ marginTop: '50%'}}
                            >
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        style={{ width: "100%" }}
                                    >
                                        <Link to="/pages/EditInfo">
                                            회원정보 수정
                                        </Link>

                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        style={{ width: "100%" }}
                                        onClick={LogoutFunc}
                                    >로그아웃</Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="secondary"
                                        htmlType="submit"
                                        size="large"
                                        style={{ width: "100%",
                                                color: 'red'
                                        }}
                                        onClick={RemoveUserFunc}
                                    >회원탈퇴
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Content>
            <BottomFooter/>
        </Layout>

    );
}

export default MyPage;