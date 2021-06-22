import React, { useState, useEffect} from "react";
import { Button, Icon,  Spin, notification, Avatar, Modal as ModalAntd } from "antd";
import { getGuiaEmailApi, getAvatarGuiaApi } from "../../../api/guia";
import useAuth from "../../../hooks/useAuth";
import Modal from "../../../components/Modal";
//editguiaform
import EditGuiaForm from "../../../components/Admin/Guias/EditUserForm";
import NoAvatar from "../../../assets/img/png/no-avatar.png";
//import getavatar, activate

import "./Perfil.scss";

export default function Perfil(props){
    const [guia, setGuia] = useState({});
    const [avatar, setAvatar] = useState(null);
    const { user, isLoading } = useAuth();
    console.log(user);

    useEffect(() => {
        getGuiaEmailApi(user.email)
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
        if (guia.avatar) {
          getAvatarGuiaApi(guia.avatar).then(response => {
            setAvatar(response);
          });
        } else {
          setAvatar(null);
        }
      }, [guia]);

      if (!user) {
        return (
          <Spin tip="No se encuentra el guía" style={{ width: "100%", padding: "200px 0" }} />
        );
      }

    return(
        <div className="perfil">
          <div className="perfil__boton">
            <Button type="primary">
              <Icon type="edit" />
            </Button>
          </div>
          <Avatar size={250} src={avatar ? avatar : NoAvatar} />
          <h1 className="perfil__name">{guia.name} {guia.lastname}</h1>
          <h3>Idiomas</h3>
          <h4>Inglés, Español, Frances</h4>
          <div className="perfil__competencia">
            <h2>Competencias</h2>
            <h3>Registro en Sernatour</h3>
            <p>Vigente hasta: <span>aaa</span></p>
          </div>

        </div>
    );
}

// onClick={() => editUser(user)}