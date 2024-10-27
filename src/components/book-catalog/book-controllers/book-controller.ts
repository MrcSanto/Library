import {Request, Response} from "express";
import {Repository} from "typeorm";
import BookEntity from "../entities/book-entity";
import {datasource} from '../../../config/datasource'
import logger from "../../../utils/logger"
import {BookListDto} from "../dto/book-list-dto";
import {resolve} from "node:dns";
import CategoriaEntity from "../../category-catalog/entities/categoria-entity";
import bookEntity from "../entities/book-entity";


export class BookController{
    private bookRepository: Repository<BookEntity>
    constructor(){
        // @ts-ignore
        this.bookRepository = datasource.getRepository(BookEntity);
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        if (req.query.skip && req.query.take){
            const skip = parseInt(req.query.skip as string);
            const take = parseInt(req.query.take as string);

            // so aceita valores > 0
            if (skip == 0){
                res.status(400).send("skip > 0")
            }

            logger.debug(`Getting books from skip: ${skip}`);
            logger.debug(`Getting books from take: ${take}`);

            const page = (skip - 1) * take

            return this.getAllPaged(page, take, res);
        } else {
            return this.getAllWithoutPage(req, res);
        }
    };
    getAllWithoutPage = async (req : Request, res : Response) : Promise<void> => {
        const result = await this.bookRepository.findAndCount({
           relations:  ['categoria'],
        });
        const bookList : BookListDto = {data: result[0], total: result[1]};
        res.status(200).json(bookList);
    };
    getAllPaged = async (skip : number, take : number, res : Response): Promise<void> => {
        const [data, total] = await this.bookRepository.findAndCount({
            skip,
            take,
            relations: ['categoria'],
        });

        const bookList: BookListDto = { data, total };

        res.status(200).json(bookList);
    };
    getByid = async (req: Request, res: Response): Promise<void> => {
        const book = await this.bookRepository.findOne({
            where: {
                bookId : parseInt(req.params.id)
            },
            relations: ['categoria']
        });
        if (!book) {
            res.status(404).send("Book not found");
        } else {
            res.status(200).json(book);
        }
    };
    getMostPopular = async (req: Request, res: Response): Promise<void> => {
        const {limit} = req.body || {}

        const bookLimit = limit ? parseInt(limit) : 4;

        const mostPopularBooks = await this.bookRepository.find({
            order: {
                qtdEmprestimos: "DESC"
            },
            take: bookLimit,
            relations: ["categoria"]
        });

        res.status(200).json(mostPopularBooks);
    }
    getMostRecent = async (req: Request, res: Response): Promise<void> => {
        const {limit} = req.body || {}

        const bookLimit = limit ? parseInt(limit) : 4;

        const mostRecentBooks = await this.bookRepository.find({
            order : {
                dataAdd : "DESC"
            },
            take : bookLimit,
            relations : ['categoria']
        });

        res.status(200).json(mostRecentBooks);
    }
    create = async (req : Request, res : Response) : Promise<void> => {
        //extraindo os valores do corpo da requisicao
        const { nome, autor, isbn, paginas, restantes, categoria_id } = req.body;

        // obtendo o repositório da entidade Categoria e buscando a categoria pelo ID
        const cat_repo = datasource.getRepository(CategoriaEntity);
        const cat = await cat_repo.findOneBy({categoriaId : categoria_id});

        if (!cat){
            res.status(400).send("Categoria nao existe");
            return
        }

        //instanciando BookEntity e atribuindo os valores recebidos
        const newBook = new BookEntity();
        newBook.nome = nome;
        newBook.autor = autor;
        newBook.isbn = isbn;
        newBook.paginas = paginas;
        newBook.restantes = restantes;
        newBook.categoria = cat;

        //salvando o livro no banco usando typeORM
        const savedBook = await datasource.getRepository(bookEntity).save(newBook);
        res.status(201).json(savedBook);
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
            const updatedBook = await this.bookRepository.findOneBy({bookId : book_id});
            res.status(200).json(updatedBook);
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