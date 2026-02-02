import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user: { sub: string, email: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.replace("Bearer", "").trim();

        if (!token) {
            throw new AppError(401, "Token Inválido");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

        if (decoded.type !== "access") {
            throw new AppError(401, "Token Inválido");
        }

        req.user = { sub: decoded.sub, email: decoded.email };

        next();
    } catch (error) {
        throw new AppError(401, "Token Inválido");
    }
}