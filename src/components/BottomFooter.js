import React, {useState} from "react";
import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAlignJustify,
    faMap,
    faUserLarge,
} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";

const { Footer } = Layout;

function BottomFooter () {
    const navigation = useNavigate();

    return(
        <Footer style={{ padding: 0, overflow: "hidden" }}>
            <Menu
                mode="horizontal"
                style={{ display: "flex", justifyContent: "center", borderRadius : '10px'
                }}
            >
                <Menu.Item component={Link} to="/pages/Map">
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: "12px",
                            margin: 0,
                            width: 55,
                        }}
                    >
                        <FontAwesomeIcon icon={faMap} style={{fontSize: "24px"}}/>
                        <div style={{marginTop: -30, marginBottom: -10}}>지도</div>
                    </div>
                </Menu.Item>

                <Menu.Item component={Link} to="/pages/ArticleList">
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
                                style={{fontSize: "24px"}}
                            />
                            <div style={{ marginTop: -30, marginBottom: -10 }}>기록</div>
                        </div>
                </Menu.Item>
                <Menu.Item component={Link} to="/pages/MyPage">
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
