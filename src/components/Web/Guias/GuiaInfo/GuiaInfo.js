import React, { useState, useEffect } from "react";
import { Spin, notification, Row, Col, Card, Button } from "antd";
import { Helmet } from "react-helmet";
import moment from "moment";
import { getGuiaApi } from "../../../../api/guia";
import "moment/locale/es";

import "./GuiaInfo.scss";

export default function GuiaInfo(props) {
  const { url } = props;
  const [guiaInfo, setGuiaInfo] = useState(null);

  useEffect(() => {
    getGuiaApi(url)
      .then(response => {
        if (response.code !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          setGuiaInfo(response.guia);
        }
      })
      .catch(() => {
        notification["warning"]({
          message: "Error del servidor."
        });
      });
  }, [url]);

  if (!guiaInfo) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
    );
  }

  return (
    <>
      <Helmet>
        <title>{guiaInfo.name} | Pro Guias San Pedro</title>
      </Helmet>
      <div className="post-info">
        <h1 className="post-info__title">{guiaInfo.name}</h1>
      </div>
    </>
  );
}
