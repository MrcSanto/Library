import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import EnderecoEntity from "../../adress-catalog/entities/adress-entity";

@Entity({ name: "cliente" })
class ClienteEntity {
    @PrimaryGeneratedColumn({ name: 'client_id' })
    clientId!: number;

    @Column({ name: 'client_cpf', type: 'varchar', length: 11, unique: true, nullable: true })
    clientCpf!: string;

    @Column({ name: 'client_nome', type: 'varchar', length: 50, nullable: false })
    clientNome!: string;

    @ManyToOne(() => EnderecoEntity, { nullable: false })
    @JoinColumn({ name: 'client_adress' })
    clientAdress!: EnderecoEntity;
}

export default ClienteEntity;
