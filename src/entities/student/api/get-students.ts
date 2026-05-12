import { baseApi } from "@/shared/lib/axios/axios";
import type { IStudent } from "../model/types";
import { isAxiosError } from "axios";
import { handleToasts } from "@/shared/lib/toast/toast-custom";

export const getStudents = async () => {

    try {
        const response = await baseApi.get<IStudent[]>("/students");
        return response.data;
    } catch (error) {

        if (isAxiosError(error)) {
            if (error.status === 500) {
                handleToasts({
                    message: "Erro no servidor",
                    type: "error"
                })
            }
        }

    }

}