import React from "react";
import { Row, Col, Card, Icon } from "antd";

import "./HowMyCoursesWork.scss";

export default function HowMyCoursesWork() {
  return (
    <Row className="how-my-courses-work">
      <Col lg={24} className="how-my-courses-work__title">
        <h2>¿Qué es Pro Guías?</h2>
        <h3>
        Pro Guias es una organización dedicada al trabajo con profesionales en la labor turística, ofreciendo servicios de información, orientación y formación a trabajadores de turismo en San Pedro de Atacama, con la finalidad de estandarizar las labores de turismo y crear un servicio de calidad. Asimismo nos dedicamos al manejo de información turística con el fin de orientar y dar la mejor experiencia al visitante en San Pedro de Atacama.
        </h3>
      </Col>

      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              icon="clock-circle"
              title="Cursos y Clases"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac lorem imperdiet, dapibus risus et, interdum urna. Sed vitae diam orci. Integer vitae nisi elit. Cras varius in risus ac cursus."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon="key"
              title="Tarjeta de Pro Guías "
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac lorem imperdiet, dapibus risus et, interdum urna. Sed vitae diam orci. Integer vitae nisi elit. Cras varius in risus ac cursus."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon="message"
              title="Accesso a capacitaciones gratuitas"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac lorem imperdiet, dapibus risus et, interdum urna. Sed vitae diam orci. Integer vitae nisi elit. Cras varius in risus ac cursus."
            />
          </Col>
        </Row>
        {/* <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              icon="user"
              title="Mejora tu perfil"
              description="Aprende y mejora tu perfil para mantenerte informado de actualizaciones."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon="dollar"
              title="Precios bajos"
              description="Obtén el curso que necesitas por solo 9.99 y ten acceso a el por tiempo ilimitado y soporte ilimitado."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon="check-circle"
              title="Certificador de finalización"
              description="Al completar tu un curso recibirás una certificación que te expedirá Udemy en PDF."
            />
          </Col>
        </Row> */}
      </Col>
      <Col lg={4} />
    </Row>
  );
}

function CardInfo(props) {
  const { icon, title, description } = props;
  const { Meta } = Card;

  return (
    <Card className="how-my-courses-work__card">
      <Icon type={icon} />
      <Meta title={title} description={description} />
    </Card>
  );
}
