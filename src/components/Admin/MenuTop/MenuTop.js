import React from "react";
import { Button, Icon } from "antd";
import ProLogo from "../../../assets/img/png/logo-izq-proguias-san-pedro.png";
import { logout } from "../../../api/auth";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;

  const logoutUser = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <a href="/">
        <img
          className="menu-top__left-logo"
          src={ProLogo}
          alt="ProGuias San Pedro de Atacama"
        />
        </a>
        
        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          <Icon type={menuCollapsed ? "menu-unfold" : "menu-fold"} />
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={logoutUser}>
          <Icon type="poweroff" />
        </Button>
      </div>
    </div>
  );
}
