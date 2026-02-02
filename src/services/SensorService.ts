import { appDataSource } from "../database/dataSource.js";
import Sensor from "../entities/Sensor.js";

import { AppError } from "../errors/AppError.js";

class SensorService {
    private sensorRepository = appDataSource.getRepository(Sensor);

    public async create(data: Sensor): Promise<Sensor> {
        const sensorExiste = await this.sensorRepository.findOneBy({ serialNumber: data.serialNumber });

        if (sensorExiste) throw new AppError(400, "O sensor com o número de série informado já existe.");

        if (data.status === "Manutencao") data.dataManutencao = new Date();

        const novoSensor = this.sensorRepository.create(data);

        await this.sensorRepository.save(novoSensor);

        return novoSensor;
    }

    public async getAll(): Promise<Sensor[]> {
        return await this.sensorRepository.find();
    }

    public async getById(id: string): Promise<Sensor> {
        const sensor = await this.sensorRepository.findOneBy({ id });

        if (!sensor) {
            throw new AppError(404, "Sensor não encontrado.")
        }

        return sensor;
    }

    public async update(id: string, data: Sensor): Promise<Sensor> {
        const sensorExiste = await this.sensorRepository.findOneBy({ id });

        if (!sensorExiste) throw new AppError(404, "Sensor não encontrado");

        if (data.status === "Manutencao" && sensorExiste.status !== "Manutencao") data.dataManutencao = new Date();

        // Atualiza os dados existentes, mesclando os dados antigos com os novos.
        const sensorAtualizado = this.sensorRepository.merge(sensorExiste, data);

        await this.sensorRepository.save(sensorAtualizado);

        return sensorAtualizado;
    }

    public async delete(id: string): Promise<void> {
        const sensor = await this.sensorRepository.findOneBy({ id });

        if (!sensor) {
            throw new AppError(404, "Sensor não encontrado");
        }

        // Deleta os dados pelo id.
        await this.sensorRepository.remove(sensor);
    }
}

export default SensorService;