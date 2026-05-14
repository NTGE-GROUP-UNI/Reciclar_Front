import { baseApi } from "@/shared/lib/axios/axios";
import { handleToasts } from "@/shared/lib/toast/toast-custom";
import { isAxiosError } from "axios";

export const getDownloadAbsencesHistory = async () => {

    try {
        const response = await baseApi.get("/attendance/absences/history/export",
            {
                responseType: "blob"
            }
        );

        if (response.status === 200) {
            handleToasts({
                message: "Planilha obtida! Aguarde...",
                type: "success"
            })
        }

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