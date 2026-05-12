import { baseApi } from "@/shared/lib/axios/axios";
import type { IDeleteClassroom } from "../model/types";
import { handleToasts } from "@/shared/lib/toast/toast-custom";
import { isAxiosError } from "axios";

export const deleteClassroom = async ({ data }: { data: IDeleteClassroom }) => {
    try {
        const { id } = data;
        const response = await baseApi.delete(`/classes/${id}`);

        if (response.status === 200) {
            handleToasts({
                message: "Classe deletada!",
                type: "success",
            })
        }

        return response.data;
    } catch (error) {

        if (isAxiosError(error)) {

            if (error.status === 400) {
                handleToasts({
                    message: "Não foi possível deletar essa classse, pois existem alunos registrados!",
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