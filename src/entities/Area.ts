import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Area {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 100, nullable: false, unique: true })
    nome: string;

    @Column({ type: "varchar", nullable: true })
    descricao?: string;

    @Column({ type: "varchar", nullable: false })
    bioma: string;

    @Column({ type: "float", nullable: false })
    latitude: number;

    @Column({ type: "float", nullable: false })
    longitude: number;

    @Column({ type: "float", nullable: false })
    largura: number;

    @Column({ type: "float", nullable: false })
    comprimento: number;

    @Column({ type: "varchar", nullable: true })
    relevo?: string;
}