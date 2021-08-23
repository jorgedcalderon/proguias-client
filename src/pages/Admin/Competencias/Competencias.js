import React, { useState, useEffect} from "react";
import { getCompesApi } from "../../../api/competencias";
import ListaCompetencias from "../../../components/Admin/ListaCompetencias";
import { Spin } from "antd";
import useAuth from "../../../hooks/useAuth";

import "./Competencias.scss";

export default function Competencias() {
    const [compe, setCompe] = useState([]);
    const [reloadCompe, setReloadCompe] = useState(false);
    const { isLoading } = useAuth();
    

    useEffect(() => {
        getCompesApi()
        .then(response => {
          setCompe(response.compe);
        });
        setReloadCompe(false);
      }, [reloadCompe]);

    return(
        <div className="competencias">
            <ListaCompetencias compe={compe} setReloadCompe={setReloadCompe} />
        </div>
    );
}