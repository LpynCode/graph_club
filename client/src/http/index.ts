import axios from "axios";

export const API_URL = 'http://localhost:8080';

const $api = axios.create({
    baseURL: API_URL
})

$api.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem('token'))?.token
        config.headers['Authorization'] = 'Bearer ' + token
        return config;
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)

export default $api;