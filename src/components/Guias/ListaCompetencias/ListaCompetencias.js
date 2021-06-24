import React, { useState, useEffect } from "react";
import { Switch, List, Button, Icon, Modal as ModalAntd, notification } from "antd";
import Modal from "../../Modal";
import DragSortableList from "react-drag-sortable";
import { updateCompeApi, activateCompeApi, deleteCompeApi } from "../../../api/competencias";
import { getAccessTokenApi } from "../../../api/auth";
import AddCompetenciaForm from "../AddCompetenciaForm";
import EditCompetenciaForm from "../EditCompetenciaForm";

import "./ListaCompetencias.scss";
import { updateMenuApi } from "../../../api/menu";
const { confirm } = ModalAntd;

export default function ListaCompetencias(props) {
    const { compe, setReloadCompe } = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listItemsArray = [];
        console.log(compe);
        // compe.forEach(item => {
        //     listItemsArray.push({
        //         content: (
        //             <CompeItem
        //                 item={item}
        //                 activateCompe={activateCompe}
        //                 editCompeModal={editCompeModal}
        //                 deleteCompe={deleteCompe}
        //             />
        //         )
        //     });
        // });
        // setListItems(listItemsArray);
    }, [compe]);

    const activateCompe = (compe, status) => {
        const accessToken = getAccessTokenApi();

        activateCompeApi(accessToken, compe._id, status).then(response => {
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
            updateMenuApi(accessToken, _id, {order });
        });
    };

    const addCompeModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nueva competencia:");
        setModalContent(
            <AddCompetenciaForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadCompe={setReloadCompe}
            />
        );
    };

    const deleteCompe = compe => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: "Eliminar competencia",
            content: `¿Estas seguro de que quieres eliminar la competencia ${compe.name}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteCompeApi(accessToken, compe._id).then( response => {
                    notification["success"]({
                        message: response
                    });
                    setReloadCompe(true);
                }).catch(() => {
                    notification["error"]({
                        message: "Error del servidor."
                    });
                });
            }
        });
    };

    const editCompeModal = compe => {
        setIsVisibleModal(true);
        setModalTitle(`Editando: ${compe.name}`);
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
            <div className="lista-competencias__header">
                <Button type="primary" onClick={addCompeModal} >
                    Crear competencia
                </Button>
            </div>

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
    const { item, activateCompe, editCompeModal, deleteCompe } = props;

    return (
        <List.Item
            actions={[
                <Switch
                    defaultChecked={item.active}
                    onChange={e => activateCompe(item, e)}
                />,
                <Button type="primary" onClick={() => editCompeModal (item)} >
                    <Icon type="edit" />
                </Button>,
                <Button type="danger" onClick={() => deleteCompe(item)} >
                    <Icon type="delete" />
                </Button>
            ]}
        >
            <List.Item.Meta title={item.name} description={item.name} />
        </List.Item>
    );
}