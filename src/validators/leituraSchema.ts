import z from "zod";

export const leituraSchema = z.object({
    umidade: z.number()
        .positive("A umidade deve ser um número positivo.")
        .max(100, "A umidade deve ser menor ou igual a 100."),

    temperatura: z.number()
        .min(-50, "A temperatura mínima é -50°C.")
        .max(100, "A temperatura máxima é 100°C."),

    dataHora: z.iso.date()
})