import React from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarData from "./sidebardata";
import SidebarDataPublic from "./sidebardatepublic";
import Submenu from "./SubMenu";
import "../sidebar/sidebar.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import logo from "../../images/meisze.png";
import i18n from "../../i18n";
import { useTranslation, Trans } from "react-i18next";
import { Grid } from "@mui/material";

const lngs = {
  en: {
    nativeName: "English",
  },
  ch: {
    nativeName: "中文",
  },
};

const Nav = styled.div`
  background: #181b3a;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%
  position: fixed;
`;

const LogoutButton = styled.div`
  margin-right: 2rem;
  height: 80px;
  display: flex;
  align-items: center;
`;

const SidebarNav = styled.div`
  background: #181b3a;
  height: 100%;
  width: auto;
  display: flex;
  justify-content: center;

  // position: fixed;
  // top: 0;
  // left: 0;
  // transition: 350ms;
  // z-index: 10;
  flex-direction: colum;

  overflow-y: auto;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  // const vauth = getAuth();
  // const user = vauth.currentUser;
  // window.localStorage.setItem("User", user.email)
  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleClick = () => {
    signOut(auth)
      .then((val) => {
        if (window.confirm("Do you want to log out?")) {
          window.localStorage.removeItem("User");
          navigate("/");
        }
      })
      .catch((error) => {});
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "20% 1fr"}}>
      <div style={{ width: '100%' }}>
        <SidebarNav>
          {window.localStorage.getItem("User") === "admin@gmail.com" ? (
            <SidebarWrap>
              <img
                style={{
                  height: "80px",
                  color: "#e1e9fc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                alt="logo"
                src={logo}
              />
              {SidebarData.map((item, index) => {
                return <Submenu item={item} key={index} />;
              })}
            </SidebarWrap>
          ) : (
            <SidebarWrap>
              <img
                style={{
                  height: "80px",
                  color: "#e1e9fc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                alt="logo"
                src={logo}
              />
              {SidebarDataPublic.map((item, index) => {
                return <Submenu item={item} key={index} />;
              })}
            </SidebarWrap>
          )}
        </SidebarNav>
      </div>
      <div style={{ backgroundColor: '#0b0c28' }}>
        <Nav>
          <div style={{ marginRight: "20px", color: "white" }}>
            <button
              key={"en"}
              style={{
                backgroundColor: "#181b3a",
                border: 0,
                color: "white",
                marginRight: "5px",
                fontWeight: i18n.resolvedLanguage === "en-US" ? 900 : "normal",
              }}
              onClick={() => {
                i18n.changeLanguage("en-US");
              }}
            >
              {lngs["en"].nativeName}
            </button>
            |
            <button
              key={"ch"}
              style={{
                backgroundColor: "#181b3a",
                border: 0,
                color: "white",
                marginLeft: "5px",
                fontWeight: i18n.resolvedLanguage === "zh-TW" ? 900 : "normal",
              }}
              onClick={() => {
                i18n.changeLanguage("zh-TW");
              }}
            >
              {lngs["ch"].nativeName}
            </button>
          </div>
          <LogoutButton>
            <button className="btn btn-success" onClick={(e) => handleClick(e)}>
              {t("topbar.logout")}
            </button>
          </LogoutButton>
        </Nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
