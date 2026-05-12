import { baseApi } from "@/shared/lib/axios/axios";
import type { IClassSummary } from "../model/types";
import { isAxiosError } from "axios";
import { handleToasts } from "@/shared/lib/toast/toast-custom";

export const getClassrooms = async () => {
    try {
        const response = await baseApi.get<IClassSummary[]>("/classes/summary");
        return response.data
    } catch (error) {

        if (isAxiosError(error)) {
            if (error.status === 400) {
                handleToasts({
                    message: "Não foi possível obter as classses!",
                    type: "error",
                })
            }

            if (error.status === 500) {
                handleToasts({
                    message: "Erro no servidor",
                    type: "error"
                })
            }
        }
    }

}
