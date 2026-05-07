import { baseApi } from "@/shared/lib/axios/axios";
import type { IPutStudent } from "../model/types";
import { handleToasts } from "@/shared/lib/toast/toastTypes";

export const putStudent = async ({ student, theme }: { student: IPutStudent, theme: boolean }) => {

    console.log(student);

    const response = await baseApi.put(`students/${student.id}`, {
        fullName: student.fullName,
        expirationYear: student.expirationYear,
        shift: student.shift,
        className: `Turma ${student.className}`
    });

    if (response.status === 200) {
        handleToasts({
            message: "Aluno atualizado com sucesso!",
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