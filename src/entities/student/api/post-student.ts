import { baseApi } from "@/shared/lib/axios/axios";
import type { IPostStudent } from "../model/types";
import { handleToasts } from "@/shared/lib/toast/toast-custom";
import { isAxiosError } from "axios";

export const postStudent = async ({ student }: { student: IPostStudent }) => {

    try {
        const { className, expirationYear, fullName, shift } = student;

        console.log(student);

        const response = await baseApi.post("/students", {
            fullName: fullName,
            className: `Turma ${className}`,
            shift: shift,
            expirationYear: Number(expirationYear)
        });

        if (response.status === 201) {
            handleToasts({
                message: "Aluno cadastrado com sucesso!",
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