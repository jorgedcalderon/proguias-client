import React from "react";
import { Row, Col, Icon } from "antd";
import { Link } from "react-router-dom";

import "./NavigationFooter.scss";

export default function NavigationFooter() {
  return (
    <Row className="navigation-footer">
      <Col>
        <h3>Navegación</h3>
      </Col>
      <Col md={12}>
        <RenderListLeft />
      </Col>
      <Col md={12}>
        <RenderListRight />
      </Col>
    </Row>
  );
}

function RenderListLeft() {
  return (
    <ul>
      <li>
        <a href="/admin">
          <Icon type="book" /> Panel de administrador
        </a>
      </li>
      <li>
        <a href="/guias">
          <Icon type="code" /> Guías
        </a>
      </li>
      <li>
        <a href="/blog">
          <Icon type="database" /> Blog
        </a>
      </li>
      <li>
        <a href="#">
          <Icon type="right" /> Nosotros
        </a>
      </li>
    </ul>
  );
}

function RenderListRight() {
  return (
    <ul>
      <li>
        <a href="#">
          <Icon type="hdd" /> Contacto
        </a>
      </li>
      
    </ul>
  );
}
