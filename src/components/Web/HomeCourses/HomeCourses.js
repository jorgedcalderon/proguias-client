import React from "react";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";
import cursoUno from "../../../assets/img/jpg/curso-uno.jpg";
import cursoDos from "../../../assets/img/jpg/curso-dos.jpg";
import cursoTres from "../../../assets/img/jpg/cursoTres.jpg";
import cursoCuatro from "../../../assets/img/jpg/curso-cuatro.jpeg";


import "./HomeCourses.scss";

export default function HomeCourses() {
  return (
    <Row className="home-courses">
      <Col lg={24} className="home-courses__title">
        <h2>Aprende y mejora tus habilidades</h2>
      </Col>
      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-courses">
          <Col md={12}>
            <CardCourse
              image={cursoUno}
              title="Recursos hídricos en la cuenca de Atacama"
              subtitle="Imparte: José Luis Rojas"
              link="#"
            />
          </Col>
          <Col md={12}>
            <CardCourse
              image={cursoDos}
              title="Geología"
              subtitle="Imparte: Benjamin Arenas"
              link="#"
            />
          </Col>
          <Col md={12}>
            <CardCourse
              image={cursoTres}
              title="Explorando el Altiplano - Fauna en la Puna"
              subtitle="Imparte: Maira Alejandra Fernandez"
              link="#"
            />
          </Col>
          <Col md={12}>
            <CardCourse
              image={cursoCuatro}
              title="Ecología aplicada"
              subtitle="Imparte: Rene Grunztenberg"
              link="#"
            />
          </Col>
        </Row>
        
      </Col>
      <Col lg={4} />
      <Col lg={24} className="home-courses__more">
        <Link to="/courses">
          <Button>Ver más</Button>
        </Link>
      </Col>
    </Row>
  );
}

function CardCourse(props) {
  const { image, title, subtitle, link } = props;
  const { Meta } = Card;

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Card
        className="home-courses__card"
        cover={<img src={image} alt={title} />}
        actions={[<Button>INGRESAR</Button>]}
      >
        <Meta title={title} description={subtitle} />
      </Card>
    </a>
  );
}
