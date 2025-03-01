import axios  from "axios";
import { StorageService as store } from '../services/storage';
import { environment } from "./environments/environment.prod";

 const api =  axios.create({
    baseURL: environment.gateway,
});

api.interceptors.request.use(
    (config) => {
      const token = store.get("_token"); // Retrieve token from storage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      const _tokenEnt =  store.getJson("entToken") as any ;
      const tEnt = (_tokenEnt && _tokenEnt.appEntToken.token) ? _tokenEnt.appEntToken.token : false;
      if (tEnt) {
        config.headers.entToken = tEnt;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        store.remove("_token"); // Remove invalid token
        window.location.href = "/"; // Redirect to login page
      }
      return Promise.reject(error);
    }
  );

export default api ;