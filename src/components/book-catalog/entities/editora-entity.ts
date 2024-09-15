import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "editora" })
class EditoraEntity {
    @PrimaryGeneratedColumn({ name: 'editora_id' })
    editoraId!: number;

    @Column({ name: 'nome_fantasia', type: 'varchar', length: 50, nullable: true })
    nomeFantasia!: string;

    @Column({ name: 'razao_social', type: 'varchar', length: 50, nullable: true })
    razaoSocial!: string;
}

export default EditoraEntity;
