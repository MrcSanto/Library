import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "book" })
class BookEntity {
    @PrimaryGeneratedColumn({ name: 'book_id' })
    bookId!: number;

    @Column({ name: 'book_name', type: 'varchar', length: 255, nullable: false })
    name!: string;

    @Column({ name: 'book_editora', type: 'text', nullable: true })
    editora!: string;

    @Column({ name: 'book_comment', type: 'text', nullable: true })
    comment!: string;
}

export default BookEntity;
