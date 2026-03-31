//Zod
import z from "zod";

export const UserSchema = z
    .object({
        email: z.string()
            .min(1, { message: "E-mail obrigatório" })
            .email({ message: "E-mail inválido" }),
        name: z.string(),
        password: z.string()
            .min(1, { message: "Senha obrigatória" })
            .min(5, { message: "Senha muito curta" })
            .max(20, { message: "Senha muito longa" }),
        confirmPassword: z.string()
            .min(1, { message: "Confirme sua senha" })
            .min(5, { message: "Senha muito curta" })
            .max(20, { message: "Senha muito longa" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coididem",
        path: ["confirmPassword"]
    })