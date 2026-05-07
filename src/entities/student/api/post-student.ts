import { baseApi } from "@/shared/lib/axios/axios";
import type { IPostStudent } from "../model/types";
import { handleToasts } from "@/shared/lib/toast/toastTypes";

export const postStudent = async ({ student, theme }: { student: IPostStudent, theme: boolean }) => {

    const { className, expirationYear, fullName, shift } = student;

    const response = await baseApi.post("/students", {
        fullName: fullName,
        className: `Turma ${className}`,
        shift: shift,
        expirationYear: Number(expirationYear)
    });

    if (response.status === 201) {
        handleToasts({
            message: "Aluno cadastrado com sucesso!",
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