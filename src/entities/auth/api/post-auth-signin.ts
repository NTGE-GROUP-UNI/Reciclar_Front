import { baseApi } from "@/shared/lib/axios/axios";
import type { IPostAuthSignin } from "../model/types";
import { handleToasts } from "@/shared/lib/toast/toastTypes";
import { isAxiosError } from "axios";

export const postAuthSignin = async ({ data }: { data: IPostAuthSignin }) => {
    try {
        const { email, password } = data;

        const response = await baseApi.post("/auth/login", {
            email,
            password
        });

        console.log(response.status);

        if (response.status === 401) {
            handleToasts({
                message: "Usuário autorizado!",
                theme: true,
                type: "success"
            })
        }

        return response.data; 

    } catch (error) {

        if(isAxiosError(error)){
            if(error.status === 401){
                handleToasts({
                    message: "Usuário não autorizado",
                    theme: true,
                    type: "error"
                })
            }
        }
    }   
}