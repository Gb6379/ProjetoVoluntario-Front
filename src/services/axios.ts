import axios from 'axios';  

const apiAxios = () =>{
    const axiosInstance = axios.create({
        baseURL: 'https://api-voluntarios-ab11acbc3a17.herokuapp.com/',//trocar url para de prod quando subir
    });
    return axiosInstance;
}

export const api = apiAxios()