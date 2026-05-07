import z from "zod";

export const FormSchema = z
    .object({
        email: z.string()
            .min(1, { message: "E-mail obrigatório" })
            .email({ message: "E-mail inválido" })
            .optional(),
        name: z.string().min(1, { message: "Nome obrigatório" }).optional(),
        password: z.string()
            .min(1, { message: "Senha obrigatória" })
            .min(5, { message: "Senha muito curta" })
            .max(20, { message: "Senha muito longa" })
            .optional(),
        confirmPassword: z.string()
            .min(1, { message: "Confirme sua senha" })
            .optional(),
        shift: z.enum(["Manhã", "Tarde", "Noite"]).optional().or(z.literal("")),
        status: z.enum(["Ativo", "Inativo"]).optional().or(z.literal("")),
        className: z.string().optional(),
        expirationYear: z.string().optional(),
        displayName: z.string().min(3, { message: "Mínimo 3 caracteres" }).optional(),
        filterName: z.string().optional(),
        filterShift: z.string().optional(),
        filterClass: z.string().optional(),
        filterStatus: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"]
    });