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