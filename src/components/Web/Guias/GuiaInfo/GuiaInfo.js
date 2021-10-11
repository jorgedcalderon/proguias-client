import React, { useState, useEffect } from "react";
import { Spin, notification, Avatar } from "antd";
import { Helmet } from "react-helmet";
import { getGuiaApi, getAvatarGuiaApi, certsPopuladasApi } from "../../../../api/guia";

import NoAvatar from "../../../../assets/img/png/no-avatar.png";

import "./GuiaInfo.scss";

export default function GuiaInfo(props) {
  const { url } = props;
  const [guiaInfo, setGuiaInfo] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [competencias, setCompetencias] = useState([]);

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

   useEffect(() => {
    if (guiaInfo.avatar) {
      getAvatarGuiaApi(guiaInfo.avatar).then(response => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }

    if (guiaInfo._id){
      
      certsPopuladasApi(guiaInfo._id)
      .then(response => {
        if (response.code !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          console.log(response.certs);
          setCompetencias(response);
        }
      });
    } else {
      console.log("null competencias");
    }

  }, [guiaInfo]);




  if (!competencias) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
    );
  }

  return (
    <>
      {/* <Helmet>
        <title>{guiaInfo.name} | Pro Guias San Pedro</title>
      </Helmet> */}
      <div className="guia-info">
        <Avatar size={250} src={avatar ? avatar : NoAvatar} />
        <h1 className="guia-info__title">{guiaInfo.name} {guiaInfo.lastname}</h1>
        <h3>Experiencia: <span>{guiaInfo.expe}</span></h3>
        <h3>Idiomas: <span>Inglés, Español, Frances</span></h3>
        <div className="guia-info__competencia">
          <h2>Competencias:</h2>
        </div>
        
        <h3>WFR</h3><p>Vigente hasta Marzo 2021</p>
      </div>
    </>
  );
}
