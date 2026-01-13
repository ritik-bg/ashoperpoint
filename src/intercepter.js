import axios from "axios";
import { Baseurl } from "./api.config";

export const publicApi = axios.create({
    baseURL: Baseurl,
    headers: {
        "Content-Type": "application/json",
    },
});

publicApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Public API Error:", error.response?.data?.msg || error.message);
        return Promise.reject(error);
    }
);

export const authApi = axios.create({
    baseURL: Baseurl,
    headers: {
        "Content-Type": "application/json",
    },
});

authApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }        
        return config;
    },
    (error) => Promise.reject(error,"getting error ehile getting the respone")
);
