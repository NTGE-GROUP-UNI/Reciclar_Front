import { useAuthStore } from "@/shared/store/auth/auth.store";
import axios from "axios";

export const baseApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});


baseApi.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

baseApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout()
        }
        return Promise.reject(error)
    }
)