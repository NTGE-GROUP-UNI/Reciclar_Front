import { baseApi } from "@/shared/lib/axios/axios";
import type { IPostClassroom } from "../model/types";
import { handleToasts } from "@/shared/lib/toast/toast-custom";
import { isAxiosError } from "axios";

export const postClassroom = async ({ targetClass }: { targetClass: IPostClassroom }) => {

    try {
        const { name, shift } = targetClass;

        const response = await baseApi.post("/classes", {
            name: name,
            shift: shift,
        });

        if (response.status === 201) {
            handleToasts({
                message: "Classe cadastrada com sucesso!",
                type: "success"
            })
        }

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