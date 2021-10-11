import createStore from "antd/lib/table/createStore";
import React, {useEffect, useState } from "react";
import { getAccessTokenApi } from "../../../../api/auth";
import { getCertsApi, getCompeDocApi } from "../../../../api/guia";


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

        if(item.path){

            getCompeDocApi(item.path).then(response => {
                setArchivo(response);
                console.log(response);
            });
        } else {
            setArchivo(null);
        }
        
    }, [item])

    if (archivo === null) {
        return (
            <div>
                <h2>{item.name.name}</h2>
                <p>Esta competencia se encuentra activa pero no tiene documento</p>
            </div>
            
        //   <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
        );
      }
      

    return(
        
        <div className="pdf-container">
            <h2>{item.name.name}</h2>
            <a href={archivo} target="_blank" rel="noopener noreferrer">
                Click aquí
              </a>
        </div>
    );
}