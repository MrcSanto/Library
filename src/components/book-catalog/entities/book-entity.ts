import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import EditoraEntity from "./editora-entity";
import AutorEntity from "./autor-entity";
import GeneroEntity from "./genero-entity";

@Entity({ name: "book" })
class BookEntity {
    @PrimaryGeneratedColumn({ name: 'book_id' })
    bookId!: number;

    @Column({ name: 'book_name', type: 'varchar', length: 100, nullable: false })
    name!: string;

    @ManyToOne(() => EditoraEntity)
    @JoinColumn({ name: 'book_editora' })
    editora!: EditoraEntity;

    @ManyToOne(() => AutorEntity)
    @JoinColumn({ name: 'book_autor' })
    autor!: AutorEntity;

    @ManyToOne(() => GeneroEntity)
    @JoinColumn({ name: 'book_genero' })
    genero!: GeneroEntity;

    @Column({ name: 'book_remaining', type: 'int', nullable: false })
    remaining!: number;

    @Column({ name: 'book_numpages', type: 'int', nullable: false })
    numPages!: number;

    @Column({ name: 'book_ranking', type: 'smallint', nullable: true })
    ranking!: number;
}

export default BookEntity;
