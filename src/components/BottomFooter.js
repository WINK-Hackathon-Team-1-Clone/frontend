import React from "react";
import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignJustify,
  faMap,
  faUserLarge,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

const { Footer } = Layout;

function BottomFooter() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Footer style={{ padding: 0, overflow: "hidden" }}>
      <Menu
        mode="horizontal"
        style={{
          display: "flex",
          justifyContent: "center",
          borderRadius: "10px",
        }}
      >
        <Menu.Item
          className={
            location.pathname === "/pages/Map" ? "ant-menu-item-selected" : ""
          }
          onClick={() => navigate("/pages/Map")}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              margin: 0,
              width: 55,
            }}
          >
            <FontAwesomeIcon icon={faMap} style={{ fontSize: "24px" }} />
            <div style={{ marginTop: -30, marginBottom: -10 }}>지도</div>
          </div>
        </Menu.Item>

        <Menu.Item
          className={
            location.pathname === "/pages/ArticleList"
              ? "ant-menu-item-selected"
              : ""
          }
          onClick={() => navigate("/pages/ArticleList")}
        >
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
            <div style={{ marginTop: -30, marginBottom: -10 }}>기록</div>
          </div>
        </Menu.Item>
        <Menu.Item
          className={
            location.pathname === "/pages/MyPage"
              ? "ant-menu-item-selected"
              : ""
          }
          onClick={() => navigate("/pages/MyPage")}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              margin: 0,
              width: 55,
            }}
          >
            <FontAwesomeIcon icon={faUserLarge} style={{ fontSize: "24px" }} />
            <div style={{ marginTop: -30, marginBottom: -10 }}>마이페이지</div>
          </div>
        </Menu.Item>
      </Menu>
    </Footer>
  );
}

export default BottomFooter;
