import {Request, Response} from "express";
import {Repository} from "typeorm";
import BookEntity from "../entities/book-entity";
import {datasource} from '../../../config/datasource'
import logger from "../../../utils/logger"
import {BookListDto} from "../dto/book-list-dto";
import {resolve} from "node:dns";


export class BookController{
    private bookRepository: Repository<BookEntity>
    constructor(){
        // @ts-ignore
        this.bookRepository = datasource.getRepository(BookEntity);
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        if (req.query.skip && req.query.take){
            logger.debug(`Getting books from skip: ${req.query.skip}`);
            logger.debug(`Getting books from take: ${req.query.take}`);
            return this.getAllPaged(req, res);
        } else {
            return this.getAllWithoutPage(req, res);
        }
    };
    getAllWithoutPage = async (req : Request, res : Response) : Promise<void> => {
        const result = await this.bookRepository.findAndCount({
           relations:  ['autor', 'genero', 'editora'],
        });
        const bookList : BookListDto = {data: result[0], total: result[1]};
        res.status(200).json(bookList);
    };
    getAllPaged = async (req: Request, res: Response): Promise<void> => {
        const skip = parseInt(req.query.skip as string);
        const take = parseInt(req.query.take as string);

        const result = await this.bookRepository.findAndCount({
           skip, take
        });
        const bookList : BookListDto = {data: result[0], total: result[1]};
        res.status(200).json(bookList);
    };
    getByid = async (req: Request, res: Response): Promise<void> => {
        const book = await this.bookRepository.findOne({
            where: {
                bookId : parseInt(req.params.id)
            },
            relations: ['autor', 'genero', 'editora']
        });
        if (!book) {
            res.status(404).send("Book not found");
        } else {
            res.status(200).json(book);
        }
    };
    create = async (req : Request, res : Response) : Promise<void> => {
        const newBook = await this.bookRepository.create(req.body);
        res.status(201).json(newBook);
    };
    replace = async (req: Request, res: Response): Promise<void> => {
        const book_id = parseInt(req.params.id);
        const existingBook = await this.bookRepository.findOneBy({bookId : book_id});

        if (!existingBook){
            res.status(404).send("Book not found");
        } else {
            const updatedBook = this.bookRepository.create({...existingBook, ...req.body});
            await this.bookRepository.save(updatedBook);
            res.status(200).json(updatedBook);
        }
    };
    update = async (req : Request, res : Response) : Promise<void> => {
        const book_id = parseInt(req.params.id);
        const partialUpdate = req.body;

        const result = await this.bookRepository.update(book_id, partialUpdate);
        if (result.affected === 0) {
            res.status(404).send("Book not found");
        } else {
            const updatedProduct = await this.bookRepository.findOneBy({bookId : book_id});
            res.status(200).json(updatedProduct);
        }
    };
    delete = async (req : Request, res : Response) : Promise<void> => {
        const result = await this.bookRepository.delete(parseInt(req.params.id));
        if (result.affected === 0){
            res.status(404).send('Book not found');
        } else {
            res.status(204).send();
        }
    };
}