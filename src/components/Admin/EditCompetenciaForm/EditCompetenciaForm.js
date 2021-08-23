import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, notification } from "antd";
import { updateCompeApi } from "../../../api/competencias";
import { getAccessTokenApi } from "../../../api/auth";

import "./EditCompetenciaForm.scss";

export default function EditCompetenciaForm(props) {
    const { setIsVisibleModal, setReloadCompe, compe } = props;
    const [ compeData, setCompeData ] = useState(compe);

    useEffect(() => {
        setCompeData(compe)
    }, [compe]);

    const editCompe = event => {
        event.preventDefault();

        if ( !compeData.name ) {
            notification["error"]({
                message: "El nombre es obligatorio."
            });
        } else {
            const accessToken = getAccessTokenApi();

            updateCompeApi(accessToken, compeData._id, compeData).then(response => {
                notification["success"]({
                    message: response
                });
                setIsVisibleModal(false);
                setReloadCompe(true);
            }).catch(() => {
                notification["error"]({
                    message: "Error del servidor."
                });
            });

        }
    };

    return (
        <div className="edit-compe-form">
            <EditForm
             compeData={compeData}
             setCompeData={setCompeData}
             editCompe={editCompe}
            />
        </div>
    );
}

function EditForm(props) {
    const { compeData, setCompeData, editCompe } = props;

    return (
        <Form className="form-edit" onSubmit={editCompe}>
        <Form.Item>
          <Input
            prefix={<Icon type="font-size" />}
            placeholder="Nombre de la certificacion"
            value={compeData.name}
            onChange={e =>
              setCompeData({ ...compeData, name: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="link" />}
            placeholder="Order"
            value={compeData.order}
            onChange={e =>
              setCompeData({ ...compeData, order: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Actualizar
          </Button>
        </Form.Item>
      </Form>
    );
  }
  