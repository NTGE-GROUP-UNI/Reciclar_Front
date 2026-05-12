import { baseApi } from "@/shared/lib/axios/axios";
import { handleToasts } from "@/shared/lib/toast/toast-custom";
import { isAxiosError } from "axios";

export const patchStudentRemoveAbsence = async (id: string) => {

    try {
        const response = await baseApi.patch(`/students/${id}/remove-absence`);

        if (response.status === 201 || response.status === 200) {
            handleToasts({
                message: "Falta removida!",
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