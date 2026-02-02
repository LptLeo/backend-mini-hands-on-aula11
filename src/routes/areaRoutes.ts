import { Router } from "express";
import AreaService from "../services/AreaService.js";
import AreaController from "../controllers/AreaController.js";
import { validarBody } from "../middleware/validarBody.js";
import { areaSchema } from "../validators/areaSchema.js";

const areaRoutes = Router();
const areaService = new AreaService();
const areaController = new AreaController(areaService);

areaRoutes.get('/areas', (req, res) => areaController.findAll(req, res));
areaRoutes.get('/areas/:id', (req, res) => areaController.findById(req, res));
areaRoutes.post('/areas', validarBody(areaSchema), (req, res) => areaController.create(req, res));
areaRoutes.put('/areas/:id', validarBody(areaSchema), (req, res) => areaController.update(req, res));
areaRoutes.delete('/areas/:id', (req, res) => areaController.delete(req, res));

export default areaRoutes;