import { baseApi } from "@/shared/lib/axios/axios";
import type { IPatchStudent } from "../model/types";
import { handleToasts } from "@/shared/lib/toast/toast-custom";
import { isAxiosError } from "axios";

export const patchStudentStatus = async ({ student }: { student: IPatchStudent }) => {

    try {
        const response = await baseApi.patch(`students/${student.id}/status`, {
            status: student.status
        });

        const message = student.status?.toLowerCase() === "ativo" || student.status?.toLowerCase() === "alerta" ? "Aluno ativo!" : "Aluno desativado!"

        if (response.status === 200) {
            handleToasts({
                message,
                type: "warn"
            })
        }
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