import { DataSource } from "typeorm";
// É a instância de configuração da conexão com o banco de dados.
// É através dele que o código sabe como se conectar ao Postgres
export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "reservaIot",
    entities: ["src/entities/*.ts"],
    synchronize: true,
    logging: true,
})
