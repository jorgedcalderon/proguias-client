import React, { useState, useEffect} from "react";
import { getGuiaEmailApi } from "../../../api/guia";
import useAuth from "../../../hooks/useAuth";
import GuiaInfoAdmin from "../../../components/Guias/GuiaInfoAdmin";

import { Spin, notification } from "antd";
import "./Perfil.scss";

export default function Perfil(){
    const [guia, setGuia] = useState({});
    const [reloadGuia, setReloadGuia] = useState(false);
    const { user, isLoading } = useAuth();


    useEffect(() => {
        getGuiaEmailApi(user.email)
          .then(response => {
            if (response.code !== 200) {
              notification["warning"]({
                message: response.message
              });
            } else {
              setGuia(response.guia);
            }
          })
          .catch(() => {
            notification["warning"]({
              message: "Error del servidor."
            });
          });
      }, [user, reloadGuia]);


      if (!user) {
        return (
          <Spin tip="No se encuentra el guía" style={{ width: "100%", padding: "200px 0" }} />
        );
      }

    return(
        <div className="perfil">
          <GuiaInfoAdmin
            guia={guia}
            setReloadGuia={setReloadGuia}
          />

        </div>
    );
}
