import { baseApi } from "@/shared/lib/axios/axios";
import type { IPostAuthSignin } from "../model/types";

export const postAuthSignin = async ({ data }: { data: IPostAuthSignin }) => {

    const { email, password } = data;

    const response = await baseApi.post("/auth/login", {
        email,
        password
    });

    return response.data;    
}