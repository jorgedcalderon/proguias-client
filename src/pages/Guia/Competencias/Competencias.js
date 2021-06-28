import React, { useState, useEffect} from "react";
import useAuth from "../../../hooks/useAuth";

import { getAccessTokenApi } from "../../../api/auth";
import { getCompesActivaApi } from "../../../api/competencias";

import ListaCompetencias from "../../../components/Guias/ListaCompetencias";

import "./Competencias.scss";


export default function Competencias() {
    const [compe, setCompe] = useState([]);
    const [reloadCompe, setReloadCompe] = useState(false);
    const { user } = useAuth();
    const accessToken = getAccessTokenApi();
    const status = true;
    

    useEffect(() => {
      Activos(accessToken, status).then(response => {
        setCompe(response.compes);
      });
        setReloadCompe(false);
      }, [reloadCompe]);

    return(
        <div className="competencias">
            <ListaCompetencias compe={compe} setReloadCompe={setReloadCompe} user={user} />
        </div>
    );
}

async function Activos(accessToken, status){
  let compes = await getCompesActivaApi(accessToken, status);

  return compes;
}