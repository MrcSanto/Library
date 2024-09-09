import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name : "Book"})
class BookEntity {
    @PrimaryGeneratedColumn({name : 'book_id'})
    bookId!: number;

    @Column({name : 'book_name', type : 'string', length : 200, nullable: false})
    name!: string;

    @Column({name: 'book_editora', type: 'string', length: 200, nullable: false})
    editora!: string;

    @Column({name: 'book_comment', type: 'string', length: 200, nullable: false})
    comment!: string;
}

export default BookEntity;