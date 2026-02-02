import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Sensor {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 8, unique: true, nullable: false })
    serialNumber: string;

    @Column({ type: "varchar", nullable: false })
    fabricante: string;

    @Column({ type: "varchar", nullable: false })
    modelo: string;

    @Column({ type: "varchar", nullable: false })
    tipo: string;

    @Column({ type: "varchar", nullable: false })
    status: string

    @Column({ type: "varchar", nullable: true, default: null })
    ipFixo?: string;

    @Column({ type: "date", nullable: false, default: () => "CURRENT_DATE" })
    dataInstalacao: Date;

    @Column({ type: "date", nullable: true, default: null })
    dataManutencao?: Date;

    @Column({ type: "integer", nullable: false })
    cicloLeitura: number;

    @Column({ type: "float", nullable: false })
    latitude: number;

    @Column({ type: "float", nullable: false })
    longitude: number;

    @Column({ type: "varchar", nullable: true, default: null })
    finalidade?: string;
}