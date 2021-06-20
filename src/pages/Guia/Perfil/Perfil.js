import React, { useState, useEffect} from "react";
import { Spin, notification, Avatar } from "antd";
import { getGuiaApi, getAvatarGuiaApi } from "../../../api/guia";
import useAuth from "../../../hooks/useAuth";

import NoAvatar from "../../../assets/img/png/no-avatar.png";

import "./Perfil.scss";

export default function Perfil(props){
    const [guia, setGuia] = useState({});
    const [avatar, setAvatar] = useState(null);
    const { user, isLoading } = useAuth();
    console.log(user);

    useEffect(() => {
        getGuiaApi(user.url)
          .then(response => {
            if (response.code !== 200) {
              notification["warning"]({
                message: response.message
              });
            } else {
              setGuia(response.guia);
            }
          })
          .catch(() => {
            notification["warning"]({
              message: "Error del servidor."
            });
          });
      }, [user]);

    useEffect(() => {
        if (user.avatar) {
          getAvatarGuiaApi(user.avatar).then(response => {
            setAvatar(response);
          });
        } else {
          setAvatar(null);
        }
      }, [guia]);

      if (!guia && !user.url) {
        return (
          <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
        );
      }

    return(
        <h1>Mi perfil</h1>
    );
}
