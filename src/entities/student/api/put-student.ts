import { baseApi } from "@/shared/lib/axios/axios";
import type { IPutStudent } from "../model/types";
import { handleToasts } from "@/shared/lib/toast/toast-custom";
import { isAxiosError } from "axios";

export const putStudent = async ({ student }: { student: IPutStudent }) => {

    try {
        const response = await baseApi.put(`students/${student.id}`, {
            fullName: student.fullName,
            expirationYear: student.expirationYear,
            shift: student.shift,
            className: student.className
        });

        if (response.status === 200) {
            handleToasts({
                message: "Aluno atualizado com sucesso!",
                type: "success"
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