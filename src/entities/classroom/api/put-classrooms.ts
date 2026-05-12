import { baseApi } from "@/shared/lib/axios/axios";
import type { IPutClassroom } from "../model/types";
import { isAxiosError } from "axios";
import { handleToasts } from "@/shared/lib/toast/toast-custom";

export const putClassrooms = async ({ data }: { data: IPutClassroom }) => {

    try {
        const { id, shift, name } = data;

        const response = await baseApi.put(`/classes/${id}`, {
            name,
            shift,
        });

        if (response.status === 200) {
            handleToasts({
                message: "Classe atualizada com sucesso!",
                type: "success"
            })
        }

        return response.data;
    } catch (error) {

        if (isAxiosError(error)) {

            if (error.status === 409) {
                handleToasts({
                    message: "Classe já existente!",
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