import React from "react";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
// crear un guialist
import GuiasListWeb from "../../components/Web/Guias/GuiasListWeb";
// crear un guia info
import GuiaInfo from "../../components/Web/Guias/GuiaInfo";

export default function Guia(props) {
  const { location, history } = props;
  const { url } = useParams();

  return (
    <Row>
      <Col md={4} />
      <Col md={16}>
        {url ? (
          <GuiaInfo url={url} />
        ) : (
          <GuiasListWeb location={location} history={history} />
        )}
      </Col>
      <Col md={4} />
    </Row>
  );
}
