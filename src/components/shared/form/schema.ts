//Zod
import z from "zod";

export const FormSchema = z
    .object({
        email: z.string()
            .min(1, { message: "E-mail obrigatório" })
            .email({ message: "E-mail inválido" })
            .optional(),
        name: z.string().optional(),
        password: z.string()
            .min(1, { message: "Senha obrigatória" })
            .min(5, { message: "Senha muito curta" })
            .max(20, { message: "Senha muito longa" })
            .optional(),
        confirmPassword: z.string()
            .min(1, { message: "Confirme sua senha" })
            .min(5, { message: "Senha muito curta" })
            .max(20, { message: "Senha muito longa" })
            .optional(),
        displayName: z.string()
            .min(3, { message: "O campo não pode ser vazio" })
            .optional(),
        filter: z.string()
            .min(3, { message: "O campo não pode ser vazio" })
            .optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coididem",
        path: ["confirmPassword"]
    })