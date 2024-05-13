import axios from 'axios';  

const apiAxios = () =>{
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:4200/',//trocar url para de prod quando subir
    });
    return axiosInstance;
}

export const api = apiAxios()