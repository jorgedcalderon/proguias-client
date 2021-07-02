import React, { useState, useEffect } from "react";
import DragSortableList from "react-drag-sortable";
import { Spin, Switch, List, Button, Icon, Modal as ModalAntd, notification } from "antd";

import { asignarCompeApi, findCompeApi } from "../../../api/guia";
import { getAccessTokenApi } from "../../../api/auth";
import { updateCompeApi, activateCompeApi, deleteCompeApi } from "../../../api/competencias";

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
        console.log(defu.[].[0]);
        
        compe.forEach(item => {
            
            listItemsArray.push({
                content: (
                    <CompeItem
                        item={item}
                        asignarCompe={asignarCompe}
                        addPdfCompe={addPdfCompe}
                        verCompe={verCompe}
                        guia={guia}
                        def={defu[i]}
                    />
                )
            })
           
            i++;
            setListItems(listItemsArray);
        })
    
          
    }, [defu]);


    
    const getDef = (access, item, guia) => {
        return new Promise(function (res, err) {
            let enc = findCompeApi(access, guia._id, item._id);
    
            if(enc){
                res(enc)
            } else {
                err("error de algun tipo: ")
            }
        });
    }

    

    const definir = (i, g) => {
        const guia  = g;
        const item = i;
        const accessToken = getAccessTokenApi();
        let promRes = false;
        
        let myPromise = new Promise(function (res, err) {
            let enc = findCompeApi(accessToken, guia._id, item._id);
    
            if(enc){
                res(enc)
            } else {
                err("error de algun tipo: ")
            }
        });
    
       let res = myPromise.then(
            function(value) {
                console.log("promresss");
                promRes = value.cert;
                console.log(promRes);
                return promRes;
                
                
            },
            function(error){
                console.log("errorrr");
                console.log(error);
            }
        )
        return res;
    }

    const asignarCompe = (i, g, e) => {
        const accessToken = getAccessTokenApi();
        const guia  = g;
        const item = i;
        
        if(e === true){
            asignarCompeApi(accessToken, guia._id, item._id).then( response => {
                console.log(response);
                // const typeNotification = response.status === 200 ? "success" : "warning";
                // notification[typeNotification]({
                //     message: response.message
                // });
            });
        } else if (e === false) {
            console.log("falso es");
        }

        

        // asignarCompeApi(accessToken, user,  compe._id).then(response => {
        //     notification["success"]({
        //         message: response
        //     });
        // });

    //     updatePostApi(token, post._id, postData)
    //   .then(response => {
    //     const typeNotification = response.code === 200 ? "success" : "warning";
    //     notification[typeNotification]({
    //       message: response.message
    //     });
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



//   function DefaultCheck(i, g) {
//     const guia  = g;
//     const item = i;
//     const accessToken = getAccessTokenApi();
//     let promRes = false;
    
//     let myPromise = new Promise(function (res, err) {
//         let enc = findCompeApi(accessToken, guia._id, item._id);

//         if(enc){
//             res(enc)
//         } else {
//             err("error de algun tipo: ")
//         }
//     });

//     myPromise.then(
//         function(value) {
//             console.log("promresss");
//             promRes = value.cert;
//             console.log(promRes);
//             return promRes;
            
            
//         },
//         function(error){
//             console.log("errorrr");
//             console.log(error);
//         }
//     )
// }


    

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


         

            
         