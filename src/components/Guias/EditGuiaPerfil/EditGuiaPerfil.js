import React, { useState, useEffect, useCallback } from "react";
import {
  Avatar,
  Form,
  Icon,
  Input,
  Select,
  Button,
  Row,
  Col,
  notification
} from "antd";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../assets/img/png/no-avatar.png";
import {
  updateGuiaApi,
  uploadAvatarGuiaApi,
  getAvatarGuiaApi
} from "../../../api/guia";
import { getAccessTokenApi } from "../../../api/auth";

import "./EditGuiaPerfil.scss";

export default function EditGuiaPerfil(props) {
  const { user, setIsVisibleModal, setReloadGuia } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});
  

  useEffect(() => {
    setUserData({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      expe: user.expe,
      licencia: user.licencia,
      idiomas: user.idiomas,
      fono: user.fono,
      url: user.url
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
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateUser = e => {
    e.preventDefault();
    const token = getAccessTokenApi();
    let userUpdate = userData;

    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales."
        });
        return;
      } else {
        delete userUpdate.repeatPassword;
      }
    }

    if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email || !userUpdate.password ) {
      notification["error"]({
        message: "El nombre, apellidos, email y las contraseñas son obligatorios."
      });
      return;
    }

    if (typeof userUpdate.avatar === "object") {
      uploadAvatarGuiaApi(token, userUpdate.avatar, user._id).then(response => {
        userUpdate.avatar = response.avatarName;
        updateGuiaApi(token, userUpdate, user._id).then(result => {
          notification["success"]({
            message: result.message
          });
          setIsVisibleModal(false);
          setReloadGuia(true);
        });
      });
    } else {
      updateGuiaApi(token, userUpdate, user._id).then(result => {
        notification["success"]({
          message: result.message
        });
        setIsVisibleModal(false);
        setReloadGuia(true);
      });
    }
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser } = props;
  const { Option } = Select;

  return (
    <Form className="form-edit" onSubmit={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" />}
              placeholder="Nombre"
              value={userData.name}
              onChange={e => setUserData({ ...userData, name: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" />}
              placeholder="Apellidos"
              value={userData.lastname}
              onChange={e =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="mail" />}
              placeholder="Correo electronico"
              value={userData.email}
              onChange={e =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Seleccióna una rol"
              onChange={e => setUserData({ ...userData, role: e })}
              value={userData.role}
            >
              <Option value="admin">Administrador</Option>
              <Option value="guia-pro">Guia profesional</Option>
              <Option value="guia-regular">Guia regular</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" />}
              placeholder="Idiomas"
              onChange={e =>
              setUserData({...userData, idiomas: e.target.value })
              }
              value={userData.idiomas}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" /> }
              type="number"
              placeholder="Experiencia"
              onChange={e =>
              setUserData({ ...userData, expe: e.target.value })
              }
              value={userData.expe}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" /> }
              placeholder="Teléfono"
              onChange={e => 
              setUserData({ ...userData, fono: e.target.value })
              }
              value={userData.fono}
              />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" /> }
              placeholder="Usuario"
              onChange={e =>
              setUserData({ ...userData, url: e.target.value })
              }
              value={userData.url}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Contraseña"
              onChange={e =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Repetir contraseña"
              onChange={e =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
