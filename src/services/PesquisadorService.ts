import { appDataSource } from '../database/dataSource.js';
import Pesquisador from '../entities/Pesquisador.js';
import { AppError } from '../errors/AppError.js';

class PesquisadorService {
    private pesquisadorRepository = appDataSource.getRepository(Pesquisador);

    public async findAll(): Promise<Pesquisador[]> {
        // Retorna todos os registros de pesquisadores cadastrados
        return await this.pesquisadorRepository.find();
    }

    public async findById(id: string): Promise<Pesquisador> {
        // Retorna o pesquisador pelo id caso ele exista (uuid).
        const pesquisador = await this.pesquisadorRepository.findOneBy({ id });

        if (!pesquisador) {
            throw new AppError(404, "Pesquisador não encontrado");
        }

        return pesquisador;
    }

    public async create(data: Pesquisador): Promise<Pesquisador> {
        // Desestruturação dos dados.
        const { nome, email, senha, matricula, titulacao, dataNascimento } = data;

        // Verifica se todos os dados foram passados, se não, erro.
        if (!nome || !email || !senha || !matricula || !titulacao || !dataNascimento) {
            throw new AppError(400, "Campos obrigatórios ausentes");
        }

        // Verifica a existencia do email do pesquisador.
        const emailExiste = await this.pesquisadorRepository.findOneBy({ email });
        // Verifica a existencia da matrícula do pesquisador.
        const matriculaExiste = await this.pesquisadorRepository.findOneBy({ matricula });

        if (emailExiste || matriculaExiste) {
            throw new AppError(400, "E-mail ou Matrícula já cadastrados");
        }

        // Cria uma nova instância de dado
        const novoPesquisador = this.pesquisadorRepository.create(data);
        // Salva os dados, enviando-os para o banco de dados
        await this.pesquisadorRepository.save(novoPesquisador);
        return novoPesquisador;
    }

    public async update(id: string, data: Pesquisador): Promise<Pesquisador> {
        const pesquisadorExiste = await this.pesquisadorRepository.findOneBy({ id });

        if (!pesquisadorExiste) {
            throw new AppError(404, "Pesquisador não encontrado");
        }

        // Atualiza os dados existentes, mesclando os dados antigos com os novos.
        const pesquisadorAtualizado = this.pesquisadorRepository.merge(pesquisadorExiste, data);

        await this.pesquisadorRepository.save(pesquisadorAtualizado);
        return pesquisadorAtualizado;
    }

    public async delete(id: string): Promise<void> {
        const pesquisador = await this.pesquisadorRepository.findOneBy({ id });

        if (!pesquisador) {
            throw new AppError(404, "Pesquisador não encontrado");
        }

        // Deleta os dados pelo id.
        await this.pesquisadorRepository.remove(pesquisador);
    }
}

export default PesquisadorService;