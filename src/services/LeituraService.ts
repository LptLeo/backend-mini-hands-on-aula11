import { appDataSource } from "../database/dataSource.js";
import Leitura from "../entities/Leitura.js";

import { AppError } from "../errors/AppError.js";

class LeituraService {
    private leituraRepository = appDataSource.getRepository(Leitura);

    public async create(data: Leitura): Promise<Leitura> {
        const leituraExiste = await this.leituraRepository.findOneBy({ id: data.id });

        if (leituraExiste) throw new AppError(400, "A leitura com o ID informado já existe.");

        if (data.dataHora > new Date()) throw new AppError(400, "A data e hora da leitura não podem ser no futuro.");

        const novaLeitura = this.leituraRepository.create(data);
        await this.leituraRepository.save(novaLeitura);

        return novaLeitura;
    }

    public async getAll(): Promise<Leitura[]> {
        return await this.leituraRepository.find();
    }

    public async getById(id: string): Promise<Leitura> {
        const leitura = await this.leituraRepository.findOneBy({ id });

        if (!leitura) {
            throw new AppError(404, "Leitura não encontrada.")
        }

        return leitura;
    }

    public async update(id: string, data: Leitura): Promise<Leitura> {
        const leituraExiste = await this.leituraRepository.findOneBy({ id: id });

        if (!leituraExiste) throw new AppError(404, "Leitura não encontrada");

        if (data.dataHora > new Date()) throw new AppError(400, "A data e hora da leitura não podem ser no futuro.");

        // Atualiza os dados existentes, mesclando os dados antigos com os novos.
        const leituraAtualizada = this.leituraRepository.merge(leituraExiste, data);

        await this.leituraRepository.save(leituraAtualizada);
        return leituraAtualizada;
    }

    public async delete(id: string): Promise<void> {
        const leitura = await this.leituraRepository.findOneBy({ id });

        if (!leitura) {
            throw new AppError(404, "Leitura não encontrada");
        }

        // Deleta os dados pelo id.
        await this.leituraRepository.remove(leitura);
    }
}

export default LeituraService;