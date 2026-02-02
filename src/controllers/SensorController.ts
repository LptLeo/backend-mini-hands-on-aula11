import type { Request, Response } from "express";
import SensorService from "../services/SensorService.js";

export default class SensorController {

    private sensorService: SensorService;

    constructor(sensorService: SensorService) {
        this.sensorService = sensorService;
    }

    public async findAll(req: Request, res: Response) {
        const sensores = await this.sensorService.getAll();
        res.status(200).json(sensores);
    }

    public async findById(req: Request, res: Response) {
        const { id } = req.params;
        const sensor = await this.sensorService.getById(id as string);
        res.status(200).json(sensor);
    }

    public async create(req: Request, res: Response) {
        const body = req.body;
        const sensor = await this.sensorService.create(body);
        res.status(201).json(sensor);
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const body = req.body;
        const sensor = await this.sensorService.update(id as string, body);
        res.status(200).json(sensor);
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await this.sensorService.delete(id as string);
        res.status(204).json({ status: "Sensor deletado" });
    }
}
