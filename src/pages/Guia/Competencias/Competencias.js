import React, { useState, useEffect} from "react";
import useAuth from "../../../hooks/useAuth";
import { Spin } from "antd";

import { getAccessTokenApi } from "../../../api/auth";
import { getCompesActivaApi } from "../../../api/competencias";
import { getGuiaEmailApi } from "../../../api/guia";

import ListaCompetencias from "../../../components/Guias/ListaCompetencias";

import "./Competencias.scss";


export default function Competencias() {
    const { user } = useAuth();
    const [compe, setCompe] = useState([]);
    const [guia, setGuia] = useState({});
    const [reloadCompe, setReloadCompe] = useState(false);
    const accessToken = getAccessTokenApi();
    const status = true;
    

    useEffect(() => {
     Email(user.email).then(response => {
        setGuia(response)
      }).then( () => {
        Activos(accessToken, status).then(response => {
          setCompe(response.compes);
        })
      })

      
        setReloadCompe(false);
      }, [reloadCompe, user]);

      if (!guia) {
        return (
          <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
        );
      }

    return(
        <div className="competencias">
            <ListaCompetencias compe={compe} setReloadCompe={setReloadCompe} guia={guia} />
        </div>
    );
}

async function Activos(accessToken, status){
  let compes = await getCompesActivaApi(accessToken, status);

  return compes;
}

async function Email(email){
  let guiaData = await getGuiaEmailApi(email);

  return guiaData.guia;
}