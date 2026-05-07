import { baseApi } from "@/shared/lib/axios/axios";
import type { IPatchStudent } from "../model/types";
import { handleToasts } from "@/shared/lib/toast/toastTypes";

export const patchStudentStatus = async ({ student, theme }: { student: IPatchStudent, theme: boolean }) => {
    const response = await baseApi.patch(`students/${student.id}/status`, {
        status: student.status
    });

    const message = student.status?.toLowerCase() === "ativo" || student.status?.toLowerCase() === "alerta" ? "Aluno ativo!" : "Aluno desativado!"

    if (response.status === 200) {
        handleToasts({
            message,
            theme: theme,
            type: "warn"
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