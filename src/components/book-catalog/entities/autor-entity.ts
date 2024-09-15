import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "autor" })
class AutorEntity {
    @PrimaryGeneratedColumn({ name: 'autor_id' })
    autorId!: number;

    @Column({ name: 'autor_nome', type: 'varchar', length: 100, nullable: false })
    nome!: string;

    @Column({ name: 'autor_nacionalidade', type: 'varchar', length: 50, nullable: false })
    nacionalidade!: string;
}

export default AutorEntity;
