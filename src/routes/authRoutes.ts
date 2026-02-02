import { Router, type Request, type Response } from "express";
import AuthService from "../services/AuthService.js";
import AuthController from "../controllers/AuthController.js";
import RefreshTokenService from "../services/RefreshTokenService.js";
import LogoutService from "../services/LogoutService.js";

const authService = new AuthService();
const logoutService = new LogoutService();
const refreshService = new RefreshTokenService();

const authController = new AuthController(authService, logoutService, refreshService);

const authRoutes = Router();

authRoutes.post("/login", async (req: Request, res: Response) => authController.login(req, res));
authRoutes.post("/refresh-token", async (req: Request, res: Response) => authController.refreshToken(req, res));
authRoutes.post("/logout", async (req: Request, res: Response) => authController.logout(req, res));

export default authRoutes;