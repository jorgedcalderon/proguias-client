import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

import "./MenuSider.scss";

function MenuSider(props) {
  const { menuCollapsed, location } = props;
  const { Sider } = Layout;

  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu
        // theme="dark"
        mode="inline"
         defaultSelectedKeys={[location.pathname]}
        // defaultSelectedKeys={["/guia-admin/perfil"]}
      >
        {/* <Menu.Item key="/admin">
          <Link to="/admin">
            <Icon type="home" />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item> */}
        <Menu.Item key="/guia-admin/perfil">
          <Link to="/guia-admin/perfil">
            <Icon type="user" />
            <span className="nav-text">Mi Perfil</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/guia-admin/competencias">
          <Link to="/guia-admin/competencias">
            <Icon type="user" />
            <span className="nav-text">Competencias</span>
          </Link>
        </Menu.Item>
        
      </Menu>
    </Sider>
  );
}

export default withRouter(MenuSider);
