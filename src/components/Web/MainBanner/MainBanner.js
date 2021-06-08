import React from "react";
import { Row, Col } from "antd";

import "./MainBanner.scss";

export default function MainBanner() {
  return (
    <div className="main-banner">
      <div className="main-banner__dark" />
      <Row>
        <Col lg={4} />
        <Col lg={16}>
          <h2>
            Pro Guías <br /> San Pedro de Atacama.
          </h2>
          <h3>
          Un acercamiento a un lugar maravilloso.
            <br />
            Accede a información detallada de San Pedro de Atacama y sus destinos turísticos.
          </h3>
        </Col>
        <Col lg={4} />
      </Row>
    </div>
  );
}
