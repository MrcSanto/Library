import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "endereco" })
class EnderecoEntity {
    @PrimaryGeneratedColumn({ name: 'endereco_id' })
    enderecoId!: number;

    @Column({ name: 'rua', type: 'varchar', length: 100, nullable: false })
    rua!: string;

    @Column({ name: 'numero', type: 'varchar', length: 10, nullable: true })
    numero?: string;

    @Column({ name: 'complemento', type: 'varchar', length: 50, nullable: true })
    complemento?: string;

    @Column({ name: 'bairro', type: 'varchar', length: 50, nullable: true })
    bairro?: string;

    @Column({ name: 'cidade', type: 'varchar', length: 50, nullable: false })
    cidade!: string;

    @Column({ name: 'cep', type: 'varchar', length: 10, nullable: false })
    cep!: string;
}

export default EnderecoEntity;
