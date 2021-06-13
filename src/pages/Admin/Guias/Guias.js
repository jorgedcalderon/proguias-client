import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { getGuiasActiveApi } from "../../../api/guia";
import ListUsers from "../../../components/Admin/Guias/ListUsers";

import "./Guias.scss";

export default function Guias() {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const token = getAccessTokenApi();

  useEffect(() => {
    getGuiasActiveApi(token, true).then(response => {
      setUsersActive(response.users);
    });
    getGuiasActiveApi(token, false).then(response => {
      setUsersInactive(response.users);
    });
    setReloadUsers(false);
  }, [token, reloadUsers]);

  return (
    <div className="users">
      <ListUsers
        usersActive={usersActive}
        usersInactive={usersInactive}
        setReloadUsers={setReloadUsers}
      />
    </div>
  );
}
