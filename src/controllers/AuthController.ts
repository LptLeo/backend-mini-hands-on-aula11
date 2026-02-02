import type { Request, Response } from "express";
import AuthService from "../services/AuthService.js";
import LogoutService from "../services/LogoutService.js";
import RefreshTokenService from "../services/RefreshTokenService.js";

export default class AuthController {

    private authService = new AuthService();
    private logoutService = new LogoutService();
    private refreshService = new RefreshTokenService();

    constructor(authService: AuthService, logoutService: LogoutService, refreshService: RefreshTokenService) {
        this.authService = authService;
        this.logoutService = logoutService;
        this.refreshService = refreshService;
    }

    async login(req: Request, res: Response) {
        const { email, senha } = req.body;

        const tokens = await this.authService.login(email, senha);

        res.status(200).json({ tokens });
    }

    async refreshToken(req: Request, res: Response) {
        const { refreshToken } = req.body;

        const tokens = await this.refreshService.refresh(refreshToken);

        res.status(200).json({ tokens });
    }

    async logout(req: Request, res: Response) {
        const { refreshToken } = req.body;

        await this.logoutService.logout(refreshToken);

        res.status(200).json({ message: "Logout realizado com sucesso" });
    }
}