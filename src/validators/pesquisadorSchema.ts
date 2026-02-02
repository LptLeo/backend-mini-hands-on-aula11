import { z } from "zod";

export const createPesquisadorSchema = z.object({

    nome: z.string()
        .min(1, "Nome é obrigatório"),

    email: z.email()
        .min(1, "E-mail é obrigatório"),

    senha: z.string()
        .min(8, "A senha deve ter no mínimo 8 caracteres"),

    especialidade: z.string()
        .min(1, "Especialidade é obrigatória"),
    titulacao: z.enum(["Graduação", "Especialização", "Mestrado", "Doutorado"], "Titulação inválida"),

    matricula: z.string()
        .min(1, "Matrícula é obrigatória"),

    linhaPesquisa: z.string()
        .optional(),

    dataNascimento: z.coerce.date().refine((date) => {
        const hoje = new Date();
        const idade = hoje.getFullYear() - date.getFullYear();

        return idade >= 18;
    }, "Você deve ter pelo menos 18 anos.")
});