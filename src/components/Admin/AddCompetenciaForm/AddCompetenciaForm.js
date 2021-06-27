import React, { useState } from "react";
import { Form, Icon, Input, Button, Select, notification} from "antd";
import { getAccessTokenApi } from "../../../api/auth";
import { addCompeApi } from "../../../api/competencias";

import "./AddCompetenciaForm.scss";

export default function AddCompetenciaForm(props) {
    const { setIsVisibleModal, setReloadCompe } = props;
    const [compeData, setCompeData ] = useState({});

    const addCompe = event => {
        event.preventDefault();
        let finalData = {
            name: compeData.name
        };

        if (!finalData.name  ) {
            notification["error"]({
                message: "Todos los campos son obligatorios."
            });
        } else {
            const accessToken = getAccessTokenApi();
            finalData.activa = false;
            finalData.order = 1000;

            addCompeApi(accessToken, finalData).then( response => {
                notification["success"]({
                    message: response
                });
                setIsVisibleModal(false);
                setReloadCompe(true);
                setCompeData({});
                finalData = {};
            }).catch(() => {
                notification["error"]({
                    message: "Error del servidor."
                });
            });
        }
    };

    return (
        <div className="add-compe-form">
            <AddForm
                compeData={compeData}
                setCompeData={setCompeData}
                addCompe={addCompe}
            />
        </div>
    );
}

function AddForm(props) {
    const { compeData, setCompeData, addCompe } = props;
    
    return (
        <Form className="form-add" onSubmit={addCompe}>
            <Form.Item>
                <Input
                    prefix={<Icon type="font-size" />}
                    placeholder="Nombre de la competencia"
                    value={compeData.name}
                    onChange={e => 
                        setCompeData({
                            ...compeData, name: e.target.value
                        })
                    }
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Crear Competencia
                </Button>
            </Form.Item>
        </Form>
    );
}