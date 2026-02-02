import { appDataSource } from "../database/dataSource.js";
import Area from "../entities/Area.js";

import { AppError } from "../errors/AppError.js";

class AreaService {
    private areaRepository = appDataSource.getRepository(Area);

    public async create(data: Area): Promise<Area> {
        const nomeExiste = await this.areaRepository.findOneBy({ nome: data.nome });

        if (nomeExiste) throw new AppError(400, "O nome informado já existe.");

        const novaArea = this.areaRepository.create(data);

        await this.areaRepository.save(novaArea);

        return novaArea;
    }

    public async getAll(): Promise<Area[]> {
        return await this.areaRepository.find();
    }

    public async getById(id: string): Promise<Area> {
        const area = await this.areaRepository.findOneBy({ id });

        if (!area) {
            throw new AppError(404, "Área não encontrada.")
        }

        return area;
    }

    public async update(id: string, data: Area): Promise<Area> {
        const areaExiste = await this.areaRepository.findOneBy({ id: id });

        if (!areaExiste) throw new AppError(404, "Area não encontrada");

        // Atualiza os dados existentes, mesclando os dados antigos com os novos.
        const areaAtualizada = this.areaRepository.merge(areaExiste, data);

        await this.areaRepository.save(areaAtualizada);
        return areaAtualizada;
    }

    public async delete(id: string): Promise<void> {
        const area = await this.areaRepository.findOneBy({ id });

        if (!area) {
            throw new AppError(404, "Area não encontrada");
        }

        // Deleta os dados pelo id.
        await this.areaRepository.remove(area);
    }
}

export default AreaService;