import { baseApi } from "@/shared/lib/axios/axios";
import { isAxiosError } from "axios";
import { handleToasts } from "@/shared/lib/toast/toast-custom";

export const getClassroomsMetrics = async () => {
    try {
        const response = await baseApi.get("/attendance/historyfouls");
        return response.data;
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