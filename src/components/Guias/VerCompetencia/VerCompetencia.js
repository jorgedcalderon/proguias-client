import createStore from "antd/lib/table/createStore";
import React, {useEffect, useState } from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { getCertsApi, getCompeDocApi } from "../../../api/guia";
import { Spin} from "antd";

// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

import "./VerCompetencia.scss";

export default function VerCompetencia(props) {
    const {item, guia } = props;
    const [documento, setDocumento] = useState(null);
    const [archivo, setArchivo] = useState(null);
    const token = getAccessTokenApi();

    //Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    
    useEffect(() => {
       getCertsApi(token, guia._id, item._id).then(response => {
           console.log(response);
           if(response.certs.path) {
               setDocumento(response.certs.path);
           } else {
               setDocumento(null);
           }

       }).catch(err => {
           console.log("error");
           console.log(err);
       })
    }, [guia])

    useEffect(() => {

        if(documento !== null){
            console.log("documento con el nombre");
            console.log(documento);
            console.log("-----------");

            getCompeDocApi(documento).then(response => {
                setArchivo(response);
            });
        } else {
            setArchivo(null);
        }
        
    }, [documento])

    if (archivo === null) {
        return (
            <h1>No se encuentra el archivo, recarge la página e intente de nuevo</h1>
        //   <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
        );
      }

    return(
        <div className="pdf-container">
            {documento&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <Viewer fileUrl={archivo}
            plugins={[defaultLayoutPluginInstance]} />
            </Worker></>}
        </div>
    );
}