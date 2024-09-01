import React, { useEffect, useState } from "react";
import { Layout, Row, Col } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import BottomFooter from "../components/BottomFooter";
import axios from "axios";
const { Content } = Layout;

const ArticleDetail = () => {
  const [article, setArticle] = useState([]);

  const params = useParams();

  const getUserId = async () => {
    let res = await axios.get("https://wink.kookm.in/user-info", {
      withCredentials: true,
    });
    return res.data.userId;
  };

  const GetArticle = async () => {
    const res = await axios.get(
      `https://wink.kookm.in/communityList/all/${await getUserId()}`,
      {
        withCredentials: false,
      }
    );
    return res.data;
  };

  useEffect(() => {
    GetArticle().then((e) => {
      setArticle(e.filter((e) => e.id === Number.parseInt(params.id)).at(0));
    });
  }, []);

  // 커뮤니티리스트(라고 쓰고 기록목록이라 읽음)
  //
  // request
  // {
  //     "placeName": "testing place",
  //     "x": "6813478",
  //     "y": "1379"
  // }
  //
  // response
  // {
  //     "placeName": "testing place",
  //     "x": "6813478",
  //     "y": "1379",
  //     "communities": [
  //     {
  //         "id": 6,
  //         "title": "test title666",
  //         "content": "test content2679",
  //         "createTime": "2024-09-01T02:44:28.961542"
  //     }
  // ]
  // }

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
            to="/pages/ArticleList"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <LeftOutlined style={{ marginTop: "40px", fontSize: "25px" }} />
          </Link>
          <h1 style={{ marginTop: "60px" }}>기록 모음집</h1>
          <Row justify="center">
            <Col
              xs={24}
              sm={16}
              md={12}
              lg={8}
              xl={6}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "50px",
              }}
            >
              <div
                style={{
                  width: "90vw",
                  height: "50vh",
                  lineHeight: "1.5",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: "150%",
                  wordBreak: "break-all",
                }}
              >
                <div
                  style={{
                    width: "90%",
                    height: "20%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  제목 : {article?.title ?? ""}
                </div>
                <span
                  style={{ width: "90%", border: "1px solid black" }}
                ></span>
                <div
                  style={{
                    width: "90%",
                    height: "90%",
                    display: "flex",
                    marginTop: "20px",
                  }}
                >
                  {article?.content ?? ""}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
      <BottomFooter />
    </Layout>
  );
};

export default ArticleDetail;
