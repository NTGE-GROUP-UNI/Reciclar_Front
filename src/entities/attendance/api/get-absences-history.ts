import { baseApi } from "@/shared/lib/axios/axios";
import { isAxiosError } from "axios";
import { handleToasts } from "@/shared/lib/toast/toast-custom";

export const getAbsencesHistory = async (page:number) => {

    try {
        const preResponse = await baseApi.get(`/attendance/absences/history`);
        const totalPages = preResponse.data.meta.totalPages;
    
        if(page > totalPages){
            const response = await baseApi.get(`/attendance/absences/history?page=${totalPages}`);
            return response.data
        }

        const response = await baseApi.get(`/attendance/absences/history?page=${page}`);
        return response.data
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