import React, { useState, useEffect } from "react";

import {
  Switch,
  List,
  Avatar,
  Button,
  Icon,
  Modal as ModalAntd,
  notification
} from "antd";
import DragSortableList from "react-drag-sortable";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import AddUserForm from "../AddUserForm";
import {
  getAvatarGuiaApi,
  activateGuiaApi,
  activoGuiaApi,
  deleteGuiaApi,
  certsPopuladasApi
} from "../../../../api/guia";
import { getAccessTokenApi } from "../../../../api/auth";
import VerCompetenciaAdmin from "../VerCompetenciaAdmin";

import "./ListUsers.scss";

const { confirm } = ModalAntd;

export default function ListUsers(props) {
  const { usersActive, usersInactive, setReloadUsers } = props;
  const [viewUsersActives, setViewUsersActives] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addUserModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo usuario");
    setModalContent(
      <AddUserForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => setViewUsersActives(!viewUsersActives)}
          />
          <span>
            {viewUsersActives ? "Guías Activos" : "Guías Inactivos"}
          </span>
        </div>
        <Button type="primary" onClick={addUserModal}>
          Nuevo guía
        </Button>
      </div>

      {viewUsersActives ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
        />
      )}

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

function UsersActive(props) {
  const {
    usersActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadUsers
  } = props;

  const editUser = user => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${user.name ? user.name : "..."} ${
        user.lastname ? user.lastname : "..."
      }`
    );
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  const verCompes = user => {
    
    certsPopuladasApi(user._id).then(response => {
      const certsArray = [];
      response.certs.forEach(cert => {
        certsArray.push({
          content: (
           <VerCompetenciaAdmin
              guia={user}
              item={cert}
           />
          )
        })
      });
      
      
      setIsVisibleModal(true);
      setModalTitle(`Competencias de ${user.name} ${user.lastname}`);
      setModalContent(

        <DragSortableList items={certsArray} type="vertical" />
        
        
      );
    })
  
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={user => (
        <UserActive
          user={user}
          editUser={editUser}
          verCompes={verCompes}
          setReloadUsers={setReloadUsers}
        />
      )}
    />
  );
}

function UserActive(props) {
  const { user, editUser, verCompes, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarGuiaApi(user.avatar).then(response => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const desactivateUser = () => {
    const accessToken = getAccessTokenApi();

    activateGuiaApi(accessToken, user._id, false)
      .then(response => {
        notification["success"]({
          message: response
        });
        setReloadUsers(true);
      })
      .catch(err => {
        notification["error"]({
          message: err
        });
      });
  };

  const activoGuia = (user, status) => {
    const accessToken = getAccessTokenApi();

    activoGuiaApi(accessToken, user._id, status).then(response => {
        notification["success"]({
            message: response
        });
    });
};

  const showDeleteConfirm = () => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminando usuario",
      content: `¿Estas seguro que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteGuiaApi(accesToken, user._id)
          .then(response => {
            notification["success"]({
              message: response
            });
            setReloadUsers(true);
          })
          .catch(err => {
            notification["error"]({
              message: err
            });
          });
      }
    });
  };


  return (
    <List.Item
      actions={[
        <Switch
                    defaultChecked={user.activo}
                    onChange={e => activoGuia(user, e)}
                />,
        <Button type="primary" onClick={() => verCompes(user)}>
          <Icon type="eye" />
        </Button>,
        <Button type="primary" onClick={() => editUser(user)}>
          <Icon type="edit" />
        </Button>,
        <Button type="danger" onClick={desactivateUser}>
          <Icon type="stop" />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <Icon type="delete" />
        </Button>
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                ${user.name ? user.name : "..."} 
                ${user.lastname ? user.lastname : "..."}
            `}
        description={user.email}
      />
    </List.Item>
  );
}

function UsersInactive(props) {
  const { usersInactive, setReloadUsers } = props;

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={user => (
        <UserInactive user={user} setReloadUsers={setReloadUsers} />
      )}
    />
  );
}

function UserInactive(props) {
  const { user, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarGuiaApi(user.avatar).then(response => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const activateUser = () => {
    const accesToken = getAccessTokenApi();

    activateGuiaApi(accesToken, user._id, true)
      .then(response => {
        notification["success"]({
          message: response
        });
        setReloadUsers(true);
      })
      .catch(err => {
        notification["error"]({
          message: err
        });
      });
  };

  const showDeleteConfirm = () => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminando usuario",
      content: `¿Estas seguro que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteGuiaApi(accesToken, user._id)
          .then(response => {
            notification["success"]({
              message: response
            });
            setReloadUsers(true);
          })
          .catch(err => {
            notification["error"]({
              message: err
            });
          });
      }
    });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={activateUser}>
          <Icon type="check" />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <Icon type="delete" />
        </Button>
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                    ${user.name ? user.name : "..."} 
                    ${user.lastname ? user.lastname : "..."}
                `}
        description={user.email}
      />
    </List.Item>
  );
}
