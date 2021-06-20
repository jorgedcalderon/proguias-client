import React, { useState, useEffect } from "react";
import { Spin, List, notification, Row, Col, Card, Button, Avatar } from "antd";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import moment from "moment";
import queryString from "query-string";
import Pagination from "../../../Pagination";
// getguiasapi
import { getGuiasPagApi, getAvatarGuiaApi } from "../../../../api/guia";
import "moment/locale/es";

import imagen from "../../../../assets/img/jpg/curso-uno.jpg"
import NoAvatar from "../../../../assets/img/png/no-avatar.png";

import "./GuiasListWeb.scss";

export default function GuiasListWeb(props) {
  const { location, history } = props;
  const [guias, setGuias] = useState(null);
  const { page = 1 } = queryString.parse(location.search);
  
  // unepected token <, revisar api

  useEffect(() => {
    getGuiasPagApi(10, page)
      .then(response => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          setGuias(response.guias);
          console.log(response.guias);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor."
        });
      });
  }, [page]);

  if (!guias) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
    );
  }

  return (
    <>
      <Helmet>
        <title>Lista de Guías | Pro Guias San Pedro</title>
      </Helmet>
      <div className="guias-list-web">
        <h1 className="guias-list-web__title">Lista de Guias</h1>
        <Row className="guias-list-web__list">
            <List
              dataSource={guias.docs}
              renderItem={guia => <Guia guia={guia} />}
            />
        </Row>
        
        <Pagination posts={guias} location={location} history={history} />
      </div>
    </>
  );
}

function Guia(props) {
  const { guia } = props;
  const { Meta } = Card;
  const [avatar, setAvatar] = useState(null);
  const guiaUrl = `/guia/${guia.url}`;

  useEffect(() => {
    if(guia.avatar) {
      getAvatarGuiaApi(guia.avatar).then(response => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [guia]);

  return (
              <Col md={12}>
                <a href={guiaUrl} rel="noopener noreferrer">
                <Card
                  className="guias-list-web__card"
                  // cover={<img src={image} alt={title} />}
                  cover={<img src={avatar ? avatar : NoAvatar} alt={guia.name} />}
                  // cover={<Avatar size={250} src={avatar ? avatar : NoAvatar} />}
                  actions={[<Button>Ver más</Button>]}
                >
                <Meta title={`Nombre: ${guia.name} ${guia.lastname}`} description={`Experiencia: 7 años Registro en Sernatour: Vigente`} />
                </Card>
                </a>
            </Col>
                
  );
}




// <List.Item className="post">
// <div className="post__date">
  
//   <span>{guia.name}</span>
// </div>
// <Link to={`guia/${guia.url}`}>
//   <List.Item.Meta title={guia.email} />
// </Link>
// // </List.Item>

// <Row className="home-courses">
//       <Col lg={24} className="home-courses__title">
//         <h2>Aprende y mejora tus habilidades</h2>
//       </Col>

//       <Col lg={4} />
//       <Col lg={16}>
//         <Row className="row-courses">
//           <Col md={12}>
//             <CardCourse
//               image={cursoUno}
//               title="Recursos hídricos en la cuenca de Atacama"
//               subtitle="Imparte: José Luis Rojas"
//               link="#"
//             />
//           </Col>
//           <Col md={12}>
//             <CardCourse
//               image={cursoDos}
//               title="Geología"
//               subtitle="Imparte: Benjamin Arenas"
//               link="#"
//             />
//           </Col>
//           <Col md={12}>
//             <CardCourse
//               image={cursoTres}
//               title="Explorando el Altiplano - Fauna en la Puna"
//               subtitle="Imparte: Maira Alejandra Fernandez"
//               link="#"
//             />
//           </Col>
//           <Col md={12}>
//             <CardCourse
//               image={cursoCuatro}
//               title="Ecología aplicada"
//               subtitle="Imparte: Rene Grunztenberg"
//               link="#"
//             />
//           </Col>
//         </Row>
        
//       </Col>
//       <Col lg={4} />
//       <Col lg={24} className="home-courses__more">
//         <Link to="/courses">
//           <Button>Ver más</Button>
//         </Link>
//       </Col>
//     </Row>