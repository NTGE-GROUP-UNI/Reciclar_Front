import { baseApi } from "@/shared/lib/axios/axios";
import { handleToasts } from "@/shared/lib/toast/toast-custom";
import { isAxiosError } from "axios";

export const patchStudentRegisterAbsence = async (id: string) => {

    try {
        const response = await baseApi.patch(`/students/${id}/absence`);

        if (response.status === 201 || response.status === 200) {
            handleToasts({
                message: "Falta confirmada!",
                theme: true,
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