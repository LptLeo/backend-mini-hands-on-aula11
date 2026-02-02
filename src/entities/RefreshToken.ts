import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    ManyToOne, 
    CreateDateColumn 
} from "typeorm";
import Pesquisador from "./Pesquisador.js";

@Entity("refresh_tokens")
export default class RefreshToken {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", nullable: false, length: 255})
    jti: string;

    @Column({ type: "varchar", nullable: false, length: 255 })
    tokenhash: string;

    @Column({ type: "timestamp", nullable: true })
    expireIn: Date;

    @Column({ type: "boolean", default: false })
    revoked: boolean;

    @ManyToOne(() => Pesquisador, { onDelete: "CASCADE" })
    pesquisador: Pesquisador;

    @CreateDateColumn()
    createdAt: Date;
}