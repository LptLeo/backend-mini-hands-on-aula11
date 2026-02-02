import z from "zod";

export const areaSchema = z.object({
    nome: z.string()
        .min(3, "Mínimo de 3 caracteres")
        .max(100, "Máximo de 100 caracteres")
        .regex(/^[a-zA-Z\u00C0-\u00FF\s\-']*$/, "Nome não pode conter números ou caracteres especiais inválidos."),

    descricao: z.string()
        .optional(),

    bioma: z.enum(["Floresta", "Deserto",
        "Savana", "Tundra", "Aquático"], "Escreva um bioma válido"),

    latitude: z.number()
        .min(-90)
        .max(90),

    longitude: z.number()
        .min(-180)
        .max(180),

    largura: z.number()
        .positive("Deve ser maior que zero."),

    comprimento: z.number()
        .positive("Deve ser maior que zero."),

    relevo: z.string()
        .optional()
})