import { baseApi } from "@/shared/lib/axios/axios";
import { isAxiosError } from "axios";
import { handleToasts } from "@/shared/lib/toast/toast-custom";

export const getAbsencesHistory = async () => {

    try {
        const response = await baseApi.get("/attendance/absences/history");
        console.log(response.data);
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