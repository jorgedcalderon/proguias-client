import React from "react";
import { getAccessTokenApi } from "../../../api/auth";

import "./Competencias.scss";

export default function Competencias() {
    const [compeActiva, setCompeActiva] = useState([]);
    const [compeInactiva, setCompeInactiva] = useState([]);
    const [reloadCompe, setReloadCompe] = useState(false);
    const token = getAccessTokenApi();

    useEffect(() => {
        //getCompeActive
        //getCompeInactive
    }, [token, reloadCompe]);

    return(
        <h1>Page Competencias</h1>
    );
}