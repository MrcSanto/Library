import Book from '../entities/book-entity'

interface BookRepository{
    getAll() : Promise<Book[]>;

    getById(id: number) : Promise<Book> | undefined;
    
    create(book : Omit<Book, 'id'>) : Promise<Book>;

    replace(id: number, book : Omit<Book, 'id'>) : Promise<Book> | undefined;

    update(id : number, book : Omit<Book, 'id'>) : Promise<Book> | undefined;

    delete(id: number) : Promise<boolean>;
}

export default BookRepository;