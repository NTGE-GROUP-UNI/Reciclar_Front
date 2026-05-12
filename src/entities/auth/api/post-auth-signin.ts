import { baseApi } from "@/shared/lib/axios/axios";
import type { IPostAuthSignin } from "../model/types";
import { handleToasts } from "@/shared/lib/toast/toast-custom";
import { isAxiosError } from "axios";

export const postAuthSignin = async ({ data }: { data: IPostAuthSignin }) => {
    try {
        const { email, password } = data;

        const response = await baseApi.post("/auth/login", {
            email,
            password
        });

        if (response.status === 200) {
            handleToasts({
                message: "Usuário autorizado!",
                theme: true,
                type: "success"
            })
        }

        return response.data;

    } catch (error) {

        if (isAxiosError(error)) {
            if (error.status === 401) {
                handleToasts({
                    message: "Usuário não autorizado",
                    theme: true,
                    type: "error"
                })
            }

            if (error.status === 500) {
                handleToasts({
                    message: "Erro",
                    type: "error"
                })
            }
        }
    }
}