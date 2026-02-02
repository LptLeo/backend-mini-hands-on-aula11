import bcrypt from "bcryptjs";
import { appDataSource } from "../database/dataSource.js";
import Pesquisador from "../entities/Pesquisador.js";
import RefreshToken from "../entities/RefreshToken.js";
import { AppError } from "../errors/AppError.js";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config.js";
import ms from "ms";

export default class AuthService {
    private repoRefresh = appDataSource.getRepository(RefreshToken);
    private repoPesquisador = appDataSource.getRepository(Pesquisador);

    async login(email: string, senha: string) {

        const pesquisador = await this.repoPesquisador.findOne({ where: { email } });

        if (!pesquisador)
            throw new AppError(401, "Credenciais Inválidas")

        // Se a senha que o usuário informou no login é igual a senha que está no banco de dados
        const senhasSaoIguais = await bcrypt.compare(senha, pesquisador.senha);

        if (!senhasSaoIguais) {
            throw new AppError(401, "Credenciais Inválidas")
        }
        const refreshToken = await this.createRefreshToken(pesquisador);

        // Acess Token
        const tokenAcess = await this.generateAcessToken(pesquisador);
        
        // Refresh Token
        const tokenRefresh = await this.generateRefreshToken(pesquisador, refreshToken.jti);
        
        // Retorna os Tokens
        return {
            tokenAcess,
            tokenRefresh
        };
    }

    private async createRefreshToken(pesquisador: Pesquisador) {
        const token = await this.repoRefresh.create({
            jti: randomUUID(),
            pesquisador: pesquisador
        })

        return this.repoRefresh.save(token);
    }

    private async generateRefreshToken(pesq: Pesquisador, jti: string) {
        const tokenPlan = jwt.sign(
            {
                sub: pesq.id,
                jti: jti,
                type: "refresh"
            },
            jwtConfig.refresh.secret,
            {
                expiresIn: jwtConfig.refresh.expiresIn!
            }
        );

        const expireInMS = typeof jwtConfig.refresh.expiresIn === "string" ? ms(jwtConfig.refresh.expiresIn) : jwtConfig.refresh.expiresIn! * 1000;

        await this.repoRefresh.update({ jti }, {
            tokenhash: await bcrypt.hash(tokenPlan, 12),
            expireIn: new Date(Date.now() + expireInMS),
            revoked: false
        });

        return tokenPlan;
    }

    private async generateAcessToken(pesq: Pesquisador) {
        return jwt.sign(
            {
                sub: pesq.id,
                email: pesq.email,
                type: "access"
            },
            jwtConfig.access.secret,
            {
                expiresIn: jwtConfig.access.expiresIn!
            }
        );
    }
}