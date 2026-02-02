import { Router } from "express";
import SensorController from "../controllers/SensorController.js";
import SensorService from "../services/SensorService.js";
import { validarBody } from "../middleware/validarBody.js";
import { createSensorSchema } from "../validators/sensorSchema.js";

const sensorRoutes = Router();
const sensorService = new SensorService();
const sensorController = new SensorController(sensorService);

sensorRoutes.get('/sensors', (req, res) => sensorController.findAll(req, res));
sensorRoutes.get('/sensors/:id', (req, res) => sensorController.findById(req, res));
sensorRoutes.post('/sensors', validarBody(createSensorSchema), (req, res) => sensorController.create(req, res));
sensorRoutes.put('/sensors/:id', validarBody(createSensorSchema), (req, res) => sensorController.update(req, res));
sensorRoutes.delete('/sensors/:id', (req, res) => sensorController.delete(req, res));

export default sensorRoutes;