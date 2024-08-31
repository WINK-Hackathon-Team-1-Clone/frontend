import React, {useState} from "react";
import { Layout, Button, Form, Input, Select, Space } from 'antd';
import {LeftOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import axios from "axios";
const { Content } = Layout;

const { Option } = Select;
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
const SignUp = () => {
    const [form] = Form.useForm();
    const [userId,setUserId] = useState('');
    const [password,setPassword] = useState('');
    const [passwordAgain,setPasswordAgain] = useState('');
    const [name,setName] = useState('');

    const SignUpFunc = () => {
        if (password === passwordAgain) {
            axios.post('https://10.223.126.146:443/members', {userId, password, name}, {
                withCredentials: true
            })
                .then(response => {
                    console.log(response.data);
                    alert("회원가입에 성공하셨습니다.")
                })
                .catch(error => {
                    console.error(error);
                });
        }else{
            alert("비밀번호가 일치하지 않습니다.")
        }
    };

    const onFinish = (values) => {
        console.log(values);
    };
    const onReset = () => {
        form.resetFields();
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
                    <Link to="/pages/Login" style={{
                        textDecoration : 'none',
                        color : 'black'
                    }}>
                        <LeftOutlined
                            style={{marginTop : '40px',
                                fontSize : '25px'}}/>
                    </Link>
                    <h1 style={{marginTop : '60px'}}>환영합니다.</h1>
                    <Form
                        {...layout}
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 600,
                            marginTop : '20%'
                        }}
                    >
                        <Form.Item
                            name="userId"
                            label="아이디"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            rules={[
                                {
                                    required: true, message: "아이디를 입력해 주세요!"
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            rules={[
                                {
                                    required: true, message: "비밀번호를 입력해 주세요!"
                                },
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item
                            name="passwordAgain"
                            label="비밀번호 재입력"
                            value={passwordAgain}
                            onChange={(e) => setPasswordAgain(e.target.value)}
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="닉네임"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            rules={[
                                {
                                    required: true, message: "닉네임을 입력해 주세요!"
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Space>
                                <Button type="primary" htmlType="submit" size='large'
                                onClick={SignUpFunc}>
                                    가입 완료
                                </Button>
                                <Button htmlType="button" size='large'>
                                    <Link to="/pages/Login">처음으로</Link>
                                </Button>
                                <Button type="link" htmlType="button" size='large' onClick={onReset}>
                                    초기화
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
}

export default SignUp;