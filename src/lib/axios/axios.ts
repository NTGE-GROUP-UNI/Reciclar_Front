import axios from "axios";

export const baseApi = axios.create({
    baseURL: "https://ong-reciclar.vercel.app/"
});