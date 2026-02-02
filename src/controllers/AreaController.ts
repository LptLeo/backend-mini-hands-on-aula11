import type { Request, Response } from "express";
import AreaService from "../services/AreaService.js";

export default class AreaController {

    private areaService: AreaService;

    constructor(areaService: AreaService) {
        this.areaService = areaService;
    }

    public async findAll(req: Request, res: Response) {
        const areas = await this.areaService.getAll();
        res.status(200).json(areas);
    }

    public async findById(req: Request, res: Response) {
        const { id } = req.params;
        const area = await this.areaService.getById(id as string);
        res.status(200).json(area);
    }

    public async create(req: Request, res: Response) {
        const body = req.body;
        const area = await this.areaService.create(body);
        res.status(201).json(area);
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const body = req.body;
        const area = await this.areaService.update(id as string, body);
        res.status(200).json(area);
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await this.areaService.delete(id as string);
        res.status(204).json({ status: "Area deletada" });
    }
}
