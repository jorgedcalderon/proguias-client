import createStore from "antd/lib/table/createStore";
import React, {useEffect, useState } from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { getCertsApi} from "../../../api/guia";

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
import pdfFile from "../../../assets/pdf/ejemplo.pdf";

export default function VerCompetencia(props) {
    const {item, guia } = props;
    const [documento, setDocumento] = useState(pdfFile);
    const token = getAccessTokenApi();

    //Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    
    // useEffect(() => {
    //    getCertsApi(token, guia._id, item._id).then(response => {
    //        console.log(response.certs.path);
    //        if(response.certs.path) {
    //            setDocumento(response.certs.path);
    //        } else {
    //            setDocumento(null);
    //        }

    //    }).catch(err => {
    //        console.log("error");
    //        console.log(err);
    //    })
    // }, [guia])

    // useEffect(() => {
        
    // }, [documento])

    return(
        <div className="pdf-container">
            {documento&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <Viewer fileUrl={documento}
            plugins={[defaultLayoutPluginInstance]} />
            </Worker></>}
        </div>
    );
}