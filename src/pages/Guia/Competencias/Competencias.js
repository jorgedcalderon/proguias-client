import React, { useState, useEffect} from "react";
import useAuth from "../../../hooks/useAuth";
import { Spin } from "antd";

import { getAccessTokenApi } from "../../../api/auth";
import { getCompesActivaApi } from "../../../api/competencias";
import { getGuiaEmailApi, findCompeApi } from "../../../api/guia";

import ListaCompetencias from "../../../components/Guias/ListaCompetencias";

import "./Competencias.scss";


export default function Competencias() {
    const { user } = useAuth();
    const [compe, setCompe] = useState([]);
    const [defu, setDefu] = useState();
    const [guia, setGuia] = useState({});
    const [reloadCompe, setReloadCompe] = useState(false);
    const [listo, setListo] = useState(false);
    const accessToken = getAccessTokenApi();
    const status = true;
    let datosGuia;
    let datosCompe;
    let arreglo = [];
    

    useEffect(() => {
     Email(user.email).then(response => {
        setGuia(response)
        datosGuia = response;
      }).then( () => {
        Activos(accessToken, status).then(response => {
          setCompe(response.compes);
          datosCompe= response.compes;
          
        }).then( () => {

          datosCompe.forEach(item => {
            let dato = item._id;
            arreglo.push(dato);
          });
          let hola = Defun(accessToken, arreglo, guia);
          console.log("holaaaa");
          console.log(hola);
          
        })
      })


        setReloadCompe(false);
      }, [reloadCompe]);

      if (listo === false) {
        return (
          <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
        );
      }

    return(
        <div className="competencias">
            <ListaCompetencias compe={compe} setReloadCompe={setReloadCompe} guia={guia} defu={defu} />
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

async function Defun(access, arreglo, guia){
  let conecta = [];
  let i=0;

  arreglo.forEach(item => {
    let hola = findCompeApi(access, guia._id, arreglo[i]);
    console.log(arreglo[i]);
    i++;
  });
  
  return conecta;
}