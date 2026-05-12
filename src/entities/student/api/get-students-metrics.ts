import { baseApi } from "@/shared/lib/axios/axios";
import type { IStudent } from "../model/types";
import { isAxiosError } from "axios";
import { handleToasts } from "@/shared/lib/toast/toast-custom";

export const getStudentsMetrics = async () => {

    try {
        const response = await baseApi.get<IStudent[]>("/dashboard/students-metrics");
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