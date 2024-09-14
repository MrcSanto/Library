import {Request, Response} from "express";

import BookRepository from "../repositories/book-repository";
import BookRepositoryTypeorm from "../repositories/book-repository-typeorm";
import {datasource} from '../../../config/datasource'
import BookEntity from "../entities/book-entity";

export class BookController{
    private bookRepository: BookRepository;
    constructor(){
        // @ts-ignore
        this.bookRepository = new BookRepositoryTypeorm(datasource);
    }

    getAll = async (req : Request, res : Response) : Promise<void> => {
        const books = await this.bookRepository.getAll();
        res.status(200).json(books);
    };
    getByid = async (req: Request, res: Response): Promise<void> => {
        const book = await this.bookRepository.getById(parseInt(req.params.id));
        if(!book){
            res.status(404).json({message: 'Book Not Found'});
        } else {
            res.status(200).json(book);
        }
    };
    create = async (req : Request, res : Response) : Promise<void> => {
        const newBook = await this.bookRepository.create(req.body);
        res.status(201).json(newBook);
    };
    replace = async (req : Request, res : Response) : Promise<void> => {
        const updatedBook = await this.bookRepository.replace(parseInt(req.params.id), req.body);
        if(!updatedBook){
            res.status(404).json({message: 'Book Not Found'});
        } else {
            res.status(200).json(updatedBook)
        }
    };
    update = async (req : Request, res : Response) : Promise<void> => {
        const updatedBook = await this.bookRepository.replace(parseInt(req.params.id), req.body);
        if(!updatedBook){
            res.status(404).json({message: 'Book Not Found'});
        } else{
            res.status(200).json(updatedBook);
        }
    };
    delete = async (req : Request, res : Response) : Promise<void> => {
        const sucess = await this.bookRepository.delete(parseInt(req.params.id));
        if (!sucess){
            res.status(404).json({message: 'Book Not Found'});
        } else {
            res.status(204).send();
        }
    };
}