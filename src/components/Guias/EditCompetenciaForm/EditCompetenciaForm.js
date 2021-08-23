import React, { useState, useEffect, useCallback} from "react";
import { useDropzone } from "react-dropzone";
import { subirCompeApi } from "../../../api/guia";
import { getAccessTokenApi } from "../../../api/auth";

import "./EditCompetenciaForm.scss";

export default function EditCompetenciaForm(props) {
    const { item, guia, setReloadCompe, setIsVisibleModal } = props;
    const [documento, setDocumento] = useState(null);
    

    return (
        <UploadCompe
        documento={documento}
        setDocumento={setDocumento}
        item={item}
        guia={guia}
        setReloadCompe={setReloadCompe}
        setIsVisibleModal={setIsVisibleModal}
        />

    );
}

function UploadCompe(props) {
    const { documento, setDocumento, item, guia, setReloadCompe, setIsVisibleModal } = props;
    const [docUrl, setDocUrl] = useState(null);
    const token = getAccessTokenApi();

    useEffect(() => {
      
      console.log("datos en effect de docurl");
      console.log(item);
      console.log(guia);
      console.log("----------");
      if(docUrl !== null){
        console.log("if doc");
        console.log(docUrl);
        console.log("----------");

        subirCompeApi(token, guia._id, item._id, docUrl).then(response => {
          console.log(response);
          setIsVisibleModal(false);
        });
      } 

    }, [docUrl])

    useEffect(() => {
        if (documento) {
          if (documento.preview) {
            setDocUrl(documento.file);
            console.log("documento-preview");
            console.log(documento);
            console.log("----------");
          } else {
            setDocUrl(documento.file);
            console.log("documento");
            console.log(documento);
            console.log("----------");
          }
        } else {
            setDocUrl(null);
        }
      }, [documento]);
    
      const onDrop = useCallback(
        acceptedFiles => {
          const file = acceptedFiles[0];
          setDocumento({ file, preview: URL.createObjectURL(file) });
        },
        [setDocumento]
      );
    
      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png, application/pdf",
        noKeyboard: true,
        onDrop
      });
    
      return (
        <div className="upload-doc" {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className="upload-doc__zone">
                Suéltalo
            </div>
          ) : (
            <div className="upload-doc__zone">
                Da click aquí o arrastra tu documento
            </div>
          )}
        </div>
      );
}