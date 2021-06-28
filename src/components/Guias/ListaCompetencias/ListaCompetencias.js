import React, { useState, useEffect } from "react";
import DragSortableList from "react-drag-sortable";
import { Switch, List, Button, Icon, Modal as ModalAntd, notification } from "antd";

import { asignarCompeApi } from "../../../api/guia";
import { getAccessTokenApi } from "../../../api/auth";
import { updateCompeApi, activateCompeApi, deleteCompeApi } from "../../../api/competencias";

import EditCompetenciaForm from "../EditCompetenciaForm";
import VerCompetencia from "../VerCompetencia";

import Modal from "../../Modal";

import "./ListaCompetencias.scss";

const { confirm } = ModalAntd;

export default function ListaCompetencias(props) {
    const { compe, setReloadCompe, user } = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listItemsArray = [];
        compe.forEach(item => {
            listItemsArray.push({
                content: (
                    <CompeItem
                        item={item}
                        asignarCompe={asignarCompe}
                        addPdfCompe={addPdfCompe}
                        verCompe={verCompe}
                    />
                )
            });
        });
        setListItems(listItemsArray);
    }, [compe]);

    const asignarCompe = (user, compe) => {
        const accessToken = getAccessTokenApi();

        asignarCompeApi(accessToken, user,  compe._id).then(response => {
            notification["success"]({
                message: response
            });
        });
    };

    const onSort = (sortedList, dropEvent) => {
        const accessToken = getAccessTokenApi();

        sortedList.forEach(item => {
            const { _id } = item.content.props.item;
            const order = item.rank;
            updateCompeApi(accessToken, _id, {order });
        });
    };

   

    const verCompe = compe => {
        const accessToken = getAccessTokenApi();

        setIsVisibleModal(true);
        setModalTitle(`Competencia: ${compe.name}`);
        setModalContent (
            <VerCompetencia
                setIsVisibleModal={setIsVisibleModal}
                setReloadCompe={setReloadCompe}
                compe={compe}
            />
        );
    };

    const addPdfCompe = compe => {
        setIsVisibleModal(true);
        setModalTitle(`Agrega los documentos de: ${compe.name}`);
        setModalContent (
            <EditCompetenciaForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadCompe={setReloadCompe}
                compe={compe}
            />
        );
    };
    
    return (
        <div className="lista-competencias">
            

            <div className="lista-competencias__items">
                <DragSortableList items={listItems} onSort={onSort}
                type="vertical" />
            </div>

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

function CompeItem(props) {
    const { item, asignarCompe, addPdfCompe, verCompe } = props;
    console.log(item.certs.0.activa);

    return (
        <List.Item
            actions={[
                <Switch
                    defaultChecked={false}
                    onChange={e => asignarCompe(item, e)}
                />,
                <Button type="primary" onClick={() => addPdfCompe (item)} >
                    <Icon type="edit" />
                </Button>,
                <Button type="primary" onClick={() => verCompe(item)} >
                    <Icon type="eye" />
                </Button>
            ]}
        >
            <List.Item.Meta title={item.name} description={item.name} />
        </List.Item>
    );
}

{/* <div className="lista-competencias__header">
                <Button type="primary" onClick={addCompeModal} >
                    Crear competencia
                </Button>
            </div> */}

            // const addCompeModal = () => {
            //     setIsVisibleModal(true);
            //     setModalTitle("Creando nueva competencia:");
            //     setModalContent(
            //         <AddCompetenciaForm
            //             setIsVisibleModal={setIsVisibleModal}
            //             setReloadCompe={setReloadCompe}
            //         />
            //     );
            // };