import {DataSource, Repository} from "typeorm";
import BookEntity from "../entities/book-entity";

class BookRepository implements BookRepository {
    private repository: Repository<BookEntity>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(BookEntity);
    }

    async getAll(): Promise<BookEntity[]> {
        return await this.repository.find();
    }
    async getById(id: number): Promise<BookEntity | undefined> {
        const book = await this.repository.findOneBy({ bookId : id }); /////////
        return book || undefined;
    }
    async create(book : Omit<BookEntity, 'bookId'>) : Promise<BookEntity> {
        const newProduct = this.repository.create(book);
        return this.repository.save(newProduct);
    }
    async replace(id: number, book : Omit<BookEntity, 'bookId'>) : Promise<BookEntity | undefined> {
        await this.repository.update(id, book);
        return this.getById(id)
    }
    async update(id: number, book : Omit<BookEntity, 'bookId'>) : Promise<BookEntity | undefined> {
        await this.repository.update(id, book);
        return this.getById(id);
    }
    async delete(id: number) : Promise<boolean> {
        const result = await this.repository.delete(id);
        return result?.affected ? result.affected > 0 : false;
    }
}

export default BookRepository;