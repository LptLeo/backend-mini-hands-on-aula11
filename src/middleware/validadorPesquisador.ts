import type { Request, Response, NextFunction } from "express";
import { createPesquisadorSchema } from "../validators/pesquisadorSchema.js";

export const validarPesquisador = (req: Request, res: Response, next: NextFunction) => {
    const resultado = createPesquisadorSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({
            message: "Ocorreu um erro ao validar.",
        });
    }

    next();
};