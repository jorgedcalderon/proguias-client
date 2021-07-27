import React, { useState, useEffect } from "react";
import DragSortableList from "react-drag-sortable";
import { Spin, Switch, List, Button, Icon, Modal as ModalAntd, notification } from "antd";

import { asignarCompeApi, findCompeApi, borrarCompeApi } from "../../../api/guia";
import { getAccessTokenApi } from "../../../api/auth";
import { updateCompeApi } from "../../../api/competencias";

import EditCompetenciaForm from "../EditCompetenciaForm";
import VerCompetencia from "../VerCompetencia";

import Modal from "../../Modal";

import "./ListaCompetencias.scss";

const { confirm } = ModalAntd;

export default function ListaCompetencias(props) {
    const { compe, setReloadCompe, guia, defu } = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const accessToken = getAccessTokenApi();
    let i=0;

    useEffect( () => {
        let listItemsArray = [];
        
        compe.forEach(item => {
            
            listItemsArray.push({
                content: (
                    <CompeItem
                        item={item}
                        asignarCompe={asignarCompe}
                        addPdfCompe={addPdfCompe}
                        verCompe={verCompe}
                        guia={guia}
                        def={defu[i].cert}
                    />
                )
            })
           
            i++;
            setListItems(listItemsArray);
        })
    
          
    }, [defu]);



    const asignarCompe = (i, g, e) => {
        const accessToken = getAccessTokenApi();
        const guia  = g;
        const item = i;
        
        if(e === true){
            asignarCompeApi(accessToken, guia._id, item._id).then( response => {
                notification["success"]({
                    message: response
                  });
                  setReloadCompe(true);
            });
        } else if (e === false) {
            borrarCompeApi(accessToken, guia._id, item._id).then( response => {
                notification["success"]({
                    message: response
                  });
                  setReloadCompe(true);
            })
        }

    };

    const onSort = (sortedList, dropEvent) => {
        const accessToken = getAccessTokenApi();

        sortedList.forEach(item => {
            const { _id } = item.content.props.item;
            const order = item.rank;
            updateCompeApi(accessToken, _id, {order });
        });
    };

   

    const verCompe = (item, guia) => {
        const accessToken = getAccessTokenApi();

        setIsVisibleModal(true);
        setModalTitle(`Competencia: ${item.name}`);
        setModalContent (
            <VerCompetencia
                setIsVisibleModal={setIsVisibleModal}
                setReloadCompe={setReloadCompe}
                item={item}
                guia={guia}
            />
        );
    };

    const addPdfCompe = (item, guia) => {
        setIsVisibleModal(true);
        setModalTitle(`Agrega los documentos de: ${item.name}`);
        setModalContent (
            <EditCompetenciaForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadCompe={setReloadCompe}
                item={item}
                guia={guia}
            />
        );
    };

    if (!guia) {
        return (
          <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
        );
      }
    
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
    const { item, asignarCompe, addPdfCompe, verCompe, guia, def } = props;
    

    return (
        <List.Item
            actions={[
                <Switch
                    defaultChecked={ def }
                    onChange={e => asignarCompe(item, guia, e)}
                />,
                
                <Button type="primary" disabled={!def} onClick={() => addPdfCompe (item, guia)} >
                    <Icon type="edit" />
                </Button>,
                <Button type="primary" disabled={!def} onClick={() => verCompe(item, guia)} >
                    <Icon type="eye" />
                </Button>
            ]}
        >
            <List.Item.Meta title={item.name} description={item.name} />
        </List.Item>
    );
    
}


            
         