import React, { useEffect, useState } from "react";
import { Divider, List, Skeleton } from "antd";
import { Layout, Row, Col } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import BottomFooter from "../components/BottomFooter";
import axios from "axios";
const { Content } = Layout;

const ArticleList = () => {
  const [article, setArticle] = useState([]);

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
    return Object.values(res.data);
  };

  useEffect(() => {
    GetArticle().then((e) => {
      setArticle(e);
      console.log(e);
    });
  }, []);

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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
              justifyContent: "space-between",
            }}
          >
            <h1>기록 모음집</h1>
            <h3>게시글 총 1개</h3>
          </div>
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
                marginTop: "20px",
              }}
            >
              <div
                id="scrollableDiv"
                style={{
                  width: "90vw",
                  height: "66vh",
                  overflow: "auto",
                  padding: "0 16px",
                  border: "none",
                }}
              >
                <InfiniteScroll
                  dataLength="1"
                  loader={
                    <Skeleton
                      avatar
                      paragraph={{
                        rows: 1,
                      }}
                      active
                    />
                  }
                  endMessage={<Divider plain>목록의 끝이예요.</Divider>}
                  scrollableTarget="scrollableDiv"
                >
                  <List
                    size="large"
                    dataSource={article}
                    renderItem={(item) => (
                      <List.Item>
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={`/pages/ArticleDetail/${item.id}`}
                        >
                          <h3>{item.title}</h3>
                          <div>{item.createTime}</div>
                        </Link>
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
      <BottomFooter />
    </Layout>
  );
};

export default ArticleList;
