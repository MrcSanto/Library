import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import ClienteEntity from "../../client-catalog/entities/cliente-entity";
import BookEntity from "../../book-catalog/entities/book-entity";

@Entity({ name: "emprestimos" })
class EmprestimoEntity {
    @PrimaryGeneratedColumn({ name: 'emprestimo_id' })
    emprestimoId!: number;

    @ManyToOne(() => ClienteEntity, { nullable: false })
    @JoinColumn({ name: 'emprestimo_client' })
    emprestimoClient!: ClienteEntity;

    @ManyToOne(() => BookEntity, { nullable: false })
    @JoinColumn({ name: 'emprestimo_livro' })
    emprestimoLivro!: BookEntity;

    @Column({ name: 'data_emprestimo', type: 'date', nullable: false })
    dataEmprestimo!: Date;

    @Column({ name: 'data_devolucao', type: 'date', nullable: true })
    dataDevolucao?: Date;
}

export default EmprestimoEntity;