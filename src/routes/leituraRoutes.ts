import { Router } from "express";
import LeituraController from "../controllers/LeituraController.js";
import LeituraService from "../services/LeituraService.js";
import { validarBody } from "../middleware/validarBody.js";
import { leituraSchema } from "../validators/leituraSchema.js";

const leituraRoutes = Router();
const leituraService = new LeituraService();
const leituraController = new LeituraController(leituraService);

leituraRoutes.get('/leitura', (req, res) => leituraController.findAll(req, res));
leituraRoutes.get('/leitura/:id', (req, res) => leituraController.findById(req, res));
leituraRoutes.post('/leitura', validarBody(leituraSchema), (req, res) => leituraController.create(req, res));
leituraRoutes.put('/leitura/:id', validarBody(leituraSchema), (req, res) => leituraController.update(req, res));
leituraRoutes.delete('/leitura/:id', (req, res) => leituraController.delete(req, res));

export default leituraRoutes;