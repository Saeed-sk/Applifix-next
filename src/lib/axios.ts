import axios from 'axios';
import Cookies from 'js-cookie';
import {env} from "@/env";

const BASE_URL = env.NEXT_PUBLIC_API_URL;
const api = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json', "Accept": "application/json"},
    withCredentials: false,
});

api.interceptors.request.use(config => {
    const token = Cookies.get('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;