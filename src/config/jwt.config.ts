import dotenv from "dotenv";
import type { SignOptions } from "jsonwebtoken";
// You don't strict need SignOptions here anymore for the interface
// import type { SignOptions } from "jsonwebtoken"; 

dotenv.config();

interface JwtConfig {
    access: {
        secret: string;
        // Change this from SignOptions["expiresIn"] to string
        expiresIn: string;
    };
    refresh: {
        secret: string;
        // Change this from SignOptions["expiresIn"] to string
        expiresIn: string;
    };
}

function getEnvOrThrow(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Variável de ambiente ${name} não definida`);
    }
    return value;
}

export const jwtConfig = {
    access: {
        secret: getEnvOrThrow("JWT_ACCESS_SECRET"),
        // Force o tipo para o que o SignOptions espera exatamente
        expiresIn: getEnvOrThrow("JWT_ACCESS_EXPIRATION") as SignOptions["expiresIn"],
    },
    refresh: {
        secret: getEnvOrThrow("JWT_REFRESH_SECRET"),
        expiresIn: getEnvOrThrow("JWT_REFRESH_EXPIRATION") as SignOptions["expiresIn"],
    },
};