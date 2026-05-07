import { baseApi } from "@/shared/lib/axios/axios";
import type { IPostClassroom } from "../model/types";
import { handleToasts } from "@/shared/lib/toast/toastTypes";

export const postClassroom = async ({ targetClass, theme }: { targetClass: IPostClassroom, theme: boolean }) => {

    const { name, shift } = targetClass;

    const response = await baseApi.post("/classes", {
        name: name,
        shift: shift,
    });

    if (response.status === 201) {
        handleToasts({
            message: "Classe cadastrada com sucesso!",
            theme: theme,
            type: "success"
        })
    }

    if (response.status === 500) {
        handleToasts({
            message: "Erro",
            theme: theme,
            type: "error"
        })
    }
}