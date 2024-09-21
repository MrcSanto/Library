import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "categoria" })
class CategoriaEntity {
    @PrimaryGeneratedColumn({ name: 'categoria_id' })
    categoriaId!: number;

    @Column({ name: 'categoria_nome', type: 'varchar', length: 50, nullable: false })
    nome!: string;

    @Column({ name: 'categoria_desc', type: 'text', nullable: true })
    descricao!: string;
}

export default CategoriaEntity;
