import React, { useState, useEffect } from "react";
import { Spin, List, notification } from "antd";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import moment from "moment";
import queryString from "query-string";
import Pagination from "../../../Pagination";
// getguiasapi
import { getGuiasPagApi } from "../../../../api/guia";
import "moment/locale/es";

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
      <div className="posts-list-web">
        <h1>Lista de Guias</h1>
        <List
          dataSource={guias.docs}
          renderItem={guia => <Guia guia={guia} />}
        />
        {/* <Pagination posts={guias} location={location} history={history} /> */}
      </div>
    </>
  );
}

function Guia(props) {
  const { guia } = props;
  // const day = moment(post.date).format("DD");
  // const month = moment(post.date).format("MMMM");

  return (
    <List.Item className="post">
      <div className="post__date">
        
        <span>{guia.exp}</span>
      </div>
      <Link to={`guia/${guia.name}`}>
        <List.Item.Meta title={guia.email} />
      </Link>
    </List.Item>
  );
}
