import { z } from 'zod';

export const createSensorSchema = z.object({
    serialNumber: z.string()
        .length(8, "O Serial deve ter exatamente 8 caracteres.")
        .regex(/^[a-zA-Z0-9]+$/, "Deve ser alfanumérico"),

    fabricante: z.string().min(1, "Obrigatório"),

    modelo: z.string().min(1, "Obrigatório"),

    tipo: z.string().min(1, "Obrigatório"),

    status: z.enum(["Ativo", "Inativo", "Manutencao"], "Use uma opção válida."),

    ipFixo: z.ipv4()
        .optional(),

    dataInstalacao: z.iso.date(),

    dataManutencao: z.iso.date()
        .optional(),

    cicloLeitura: z.number()
        .positive("Deve ser maior que zero."),

    latitude: z.number()
        .min(-90)
        .max(90),

    longitude: z.number()
        .min(-180)
        .max(180),

    finalidade: z.string()
        .optional()
})