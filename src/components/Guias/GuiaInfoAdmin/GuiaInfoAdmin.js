import React, { useState, useEffect} from "react";
import { getAvatarGuiaApi } from "../../../api/guia";
import { Spin, notification, Row, Col, Avatar, Button, Modal as ModalAntd} from "antd";
import Modal from "../../Modal";
import EditCompetenciaForm from "../EditCompetenciaForm";
import ListaCompetencias from "../ListaCompetencias";

import NoAvatar from "../../../assets/img/png/no-avatar.png";
import "./GuiaInfoAdmin.scss";
const { confirm } = ModalAntd;

export default function GuiaInfoAdmin(props) {
    const { guia, setReloadGuia} = props;
    const [avatar, setAvatar] = useState(null);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const EditCompetencia = () => {
        setIsVisibleModal(true);
        setModalTitle("Editar competencias de guia");
        setModalContent(
            <EditCompetenciaForm
                guia={guia}
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

    return(
        <div className="guia-info-admin">
            <Row gutter={24}>
                <h1 className="guia-info-admin__title">Informacion de {guia.name} {guia.lastname}</h1>
                <Avatar src={avatar ? avatar : NoAvatar} size={250} shape="square" />
            </Row>
            <Row>
                <Button onClick={EditCompetencia}>
                    Editar guia
                </Button>
            </Row>
            <Row>
                <ListaCompetencias />
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

{/* <div className="perfil__boton">
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
          </div> */}