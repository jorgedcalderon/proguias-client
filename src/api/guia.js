import { basePath, apiVersion } from "./config";

export function signUpGuiaApi(data) {
    const url = `${basePath}/${apiVersion}/sign-up-guia`;
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.user) {
          return { ok: true, message: "Usuario creado correctamente" };
        }
        return { ok: false, message: result.message };
      })
      .catch(err => {
        return { ok: false, message: err.message };
      });
  }

export function signInGuiaApi(data) {
    const url = `${basePath}/${apiVersion}/sign-in-guia`;
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        console.log(result);
  
        return result;
      })
      .catch(err => {
        return err.message;
      });
}


export function getGuiasActiveApi(token, status) {
  const url = `${basePath}/${apiVersion}/guias-active?active=${status}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}

export function uploadAvatarGuiaApi(token, avatar, userId) {
  const url = `${basePath}/${apiVersion}/upload-avatar-guia/${userId}`;

  const formData = new FormData();
  formData.append("avatar", avatar, avatar.name);

  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}

export function getAvatarGuiaApi(avatarName) {
  const url = `${basePath}/${apiVersion}/get-avatar-guia/${avatarName}`;

  return fetch(url)
    .then(response => {
      return response.url;
    })
    .catch(err => {
      return err.message;
    });
}

export function updateGuiaApi(token, user, userId) {
  const url = `${basePath}/${apiVersion}/update-guia/${userId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(user)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}

export function activateGuiaApi(token, userId, status) {
  const url = `${basePath}/${apiVersion}/activate-guia/${userId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      active: status
    })
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      return err.message;
    });
}

export function deleteGuiaApi(token, userId) {
  const url = `${basePath}/${apiVersion}/delete-guia/${userId}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      return err.message;
    });
}

export function signUpAdminGuiaApi(token, data) {
  const url = `${basePath}/${apiVersion}/sign-up-admin-guia`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(data)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      return err.message;
    });
}

export function getGuiasApi(token) {
  const url = `${basePath}/${apiVersion}/guias`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}

export function getGuiaApi(urlGuia) {
  const url = `${basePath}/${apiVersion}/get-guia/${urlGuia}`;

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

export function getGuiaEmailApi(emailGuia) {
  const url = `${basePath}/${apiVersion}/get-guia-email/${emailGuia}`;

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

export function getGuiasPagApi(limit, page) {
  const url = `${basePath}/${apiVersion}/get-guias-pag?limit=${limit}&page=${page}`;

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

export function asignarCompeApi(token, userId, idCompe) {
  
  const url = `${basePath}/${apiVersion}/add-guia-compe/${userId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      idCompe: idCompe
    })
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      return err.message;
    });

}

export function findCompeApi(token, id, idCompe) {
  const url = `${basePath}/${apiVersion}/find-compe/${id}`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      idCompe: idCompe
    })
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}

