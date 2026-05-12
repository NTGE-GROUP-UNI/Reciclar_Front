import { baseApi } from "@/shared/lib/axios/axios";
import { handleToasts } from "@/shared/lib/toast/toast-custom";
import { isAxiosError } from "axios";

export const postStudentPresence = async (id: string, type: "entry" | "exit") => {

    try {
        const response = await baseApi.post("/attendance", {
            studentId: id,
            type
        });

        if (type === "entry"){
            if (response.status === 201 || response.status === 200) {
                handleToasts({
                    message: "Presença registrada!",
                    theme: true,
                    type: "success"
                })
            }

        }

        if(type === "exit"){
            if (response.status === 201 || response.status === 200) {
                handleToasts({
                    message: "Saída registrada!",
                    theme: true,
                    type: "success"
                })
            }
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