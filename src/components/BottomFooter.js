import React, {useEffect, useState} from "react";
import { Layout, Menu, Form, Input, Button, Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAlignJustify,
    faMap,
    faUserLarge,
} from "@fortawesome/free-solid-svg-icons";

const { Footer } = Layout;

function BottomFooter () {
    return(
        <Footer style={{ padding: 0, overflow: "hidden" }}>
            <Menu
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                style={{ display: "flex", justifyContent: "center", borderRadius : '10px'
                }}
            >
                <Menu.Item key={"1"}>
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
                <Menu.Item key={"2"}>
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
                <Menu.Item key={"3"}>
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
    );
}


export default BottomFooter;
