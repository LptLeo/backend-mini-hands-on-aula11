import { Router } from "express";
import PesquisadorController from "../controllers/PesquisadorController.js";
import PesquisadorService from "../services/PesquisadorService.js";
// import { validarPesquisador } from "../middlewares/validarPesquisador.js"; // Você precisará criar este arquivo

const pesquisadorRoutes = Router();
const pesquisadorService = new PesquisadorService();
const pesquisadorController = new PesquisadorController(pesquisadorService);

pesquisadorRoutes.post("/", (req, res) => pesquisadorController.create(req, res)); // Adicionar middleware aqui depois
pesquisadorRoutes.get("/", (req, res) => pesquisadorController.findAll(req, res));
pesquisadorRoutes.get("/:id", (req, res) => pesquisadorController.findById(req, res));
pesquisadorRoutes.put("/:id", (req, res) => pesquisadorController.update(req, res));
pesquisadorRoutes.delete("/:id", (req, res) => pesquisadorController.delete(req, res));

export default pesquisadorRoutes;