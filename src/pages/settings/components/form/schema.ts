//Zod
import z from "zod";

export const DisplayNameSchema = z
    .object({
        displayName: z.string()
            .max(15, { message: "O nome deve ter no máximo 15 caracteres" })
            .min(1, { message: "O campo não pode ser vazio" })
            .min(3, { message: "O nome deve ter no mínimo 6 caracteres" })
    })