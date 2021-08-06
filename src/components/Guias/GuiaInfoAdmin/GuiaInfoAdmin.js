import React, { useState, useEffect} from "react";
import { getAvatarGuiaApi } from "../../../api/guia";
import { Spin, notification, Row, Col, Avatar, Button, Modal as ModalAntd} from "antd";
import Modal from "../../Modal";
import EditGuiaPerfil from "../EditGuiaPerfil";

import NoAvatar from "../../../assets/img/png/no-avatar.png";
import "./GuiaInfoAdmin.scss";
const { confirm } = ModalAntd;

export default function GuiaInfoAdmin(props) {
    const { guia, setReloadGuia} = props;
    const [avatar, setAvatar] = useState(null);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const EditPerfil = () => {
        setIsVisibleModal(true);
        setModalTitle("Editar guia");
        setModalContent(
            <EditGuiaPerfil
                user={guia}
                setReloadGuia={setReloadGuia}
                setIsVisibleModal={setIsVisibleModal}
            />
        );
    };

    useEffect(() => {
        if (guia.avatar) {
          getAvatarGuiaApi(guia.avatar).then(response => {
            setAvatar(response);
          });
        } else {
          setAvatar(null);
        }
      }, [guia]);

      if (!guia) {
        return (
          <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
        );
      }
      
      console.log(guia);

    return(
        <div className="guia-info-admin">
          <div className="guia-info-admin__header">
                <Button type="primary" onClick={EditPerfil}>
                    Editar mi perfil
                </Button>
          </div>
          
            <Row gutter={24}>
                <h1 className="guia-info-admin__title">Mi Perfil</h1>
                <h2 className="guia-info-admin__name">{guia.name} {guia.lastname}</h2>
                <Avatar src={avatar ? avatar : NoAvatar} size={250} shape="square" />
                <div>
                  <h2>Datos de contacto:</h2>
                  <h3>Correo: {guia.email}</h3>
                  <h3>Teléfono: {guia.fono}</h3>
                  <h3>URL: www.proguias.cl/guia/{guia.url}</h3>
                  <h3>Años de experiencia: {guia.expe}</h3>
                  <h3>Idiomas: {guia.idiomas}</h3>
                
                </div>
            </Row>
            <Row>
              
            </Row>
        

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
            
        </div>
        
    );
}

