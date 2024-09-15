import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "genero" })
class GeneroEntity {
    @PrimaryGeneratedColumn({ name: 'genero_id' })
    generoId!: number;

    @Column({ name: 'genero_nome', type: 'varchar', length: 100, nullable: false })
    nome!: string;

    @Column({ name: 'genero_descricao', type: 'text', nullable: false })
    descricao!: string;
}

export default GeneroEntity;
