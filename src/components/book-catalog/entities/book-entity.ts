import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import CategoriaEntity from "../../category-catalog/entities/categoria-entity";

@Entity({ name: "book" })
class BookEntity {
    @PrimaryGeneratedColumn({ name: 'book_id' })
    bookId!: number;

    @Column({ name: 'book_nome', type: 'varchar', length: 50, nullable: false })
    nome!: string;

    @Column({ name: 'book_autor', type: 'varchar', length: 50, nullable: false })
    autor!: string;

    @Column({ name: 'book_isbn', type: 'int', unique: true, nullable: true })
    isbn!: number;

    @ManyToOne(() => CategoriaEntity, {nullable: false})
    @JoinColumn({ name: 'book_categoria' })
    categoria!: CategoriaEntity | null;

    @Column({ name: 'book_paginas', type: 'int', nullable: false })
    paginas!: number;

    @Column({ name: 'book_restantes', type: 'int', nullable: false })
    restantes!: number;

    @Column({ name: 'book_qtd_emprestados', type: 'int', nullable: false })
    qtdEmprestimos!: number;

    @Column({ name: 'book_data_add', type: 'date', nullable: false })
    dataAdd!: Date;

    @Column({ name: 'book_imagem', type: 'varchar', length: 255, nullable: true })
    imagem?: string;
}

export default BookEntity;
