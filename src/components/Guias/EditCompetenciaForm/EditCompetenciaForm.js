import React, { useState, useEffect, useCallback} from "react";
import { useDropzone } from "react-dropzone";
import { subirCompeApi } from "../../../api/guia";
import { getAccessTokenApi } from "../../../api/auth";

import "./EditCompetenciaForm.scss";

export default function EditCompetenciaForm(props) {
    const { item, guia, setReloadCompe, setIsVisibleModal } = props;
    const [documento, setDocumento] = useState(null);
    const token = getAccessTokenApi();

    return (
        <UploadCompe documento={documento} setDocumento={setDocumento} />

    );
}

function UploadCompe(props) {
    const { documento, setDocumento } = props;
    const [docUrl, setDocUrl] = useState(null);

    useEffect(() => {
        if (documento) {
          if (documento.preview) {
            setDocUrl(documento.preview);
            console.log("documento-preview");
            console.log(documento);
          } else {
            setDocUrl(documento);
            console.log("documento");
            console.log(documento);
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
                DROPZONE
            </div>
          ) : (
            <div className="upload-doc__zone">
                NO DROPZONE
            </div>
          )}
        </div>
      );
}