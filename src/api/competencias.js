import { basePath, apiVersion } from "./config";

export function getCompesApi(){
    const url = `${basePath}/${apiVersion}/get-compes`;

    return fetch(url).then( response => {
        return response.json();
    }).then( result => {
        return result;
    }).catch(err => {
        return err.message;
    });
}

export function updateCompeApi(token, compeId, data) {
    const url = `${basePath}/${apiVersion}/update-compe/${compeId}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params).then( response => {
        return response.json();
    }).then(result => {
        return result.message;
    }).catch(err => {
        return err;
    }); 
}

export function activateCompeApi(token, compeId, status) {
    const url = `${basePath}/${apiVersion}/activate-compe/${compeId}`;

    const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ activa: status })
      };

      return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      console.log(err);
    });
}

export function addCompeApi(token, compe) {
    const url = `${basePath}/${apiVersion}/add-compe`;
  
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(compe)
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result.message;
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  export function deleteCompeApi(token, compeId) {
    const url = `${basePath}/${apiVersion}/delete-compe/${compeId}`;
  
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
        console.log(err);
      });
  }

  export function getCompesActivaApi(token, status) {
    const url = `${basePath}/${apiVersion}/get-compes-activa?activa=${status}`;
  
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