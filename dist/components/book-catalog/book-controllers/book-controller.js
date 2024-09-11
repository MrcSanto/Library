"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_repository_typeorm_1 = __importDefault(require("../repositories/book-repository-typeorm"));
const datasource_1 = require("../../../config/datasource");
class BookController {
    constructor() {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const books = yield this.bookRepository.getAll();
            res.status(200).json(books);
        });
        this.getByid = (res, req) => __awaiter(this, void 0, void 0, function* () {
            const book = yield this.bookRepository.getById(parseInt(req.params.id));
            if (!book) {
                res.status(404).json({ message: 'Book Not Found' });
            }
            else {
                res.status(200).json(book);
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newBook = yield this.bookRepository.create(req.body);
            res.status(201).json(newBook);
        });
        this.replace = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const updatedBook = yield this.bookRepository.replace(parseInt(req.params.id), req.body);
            if (!updatedBook) {
                res.status(404).json({ message: 'Book Not Found' });
            }
            else {
                res.status(200).json(updatedBook);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const updatedBook = yield this.bookRepository.replace(parseInt(req.params.id), req.body);
            if (!updatedBook) {
                res.status(404).json({ message: 'Book Not Found' });
            }
            else {
                res.status(200).json(updatedBook);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const sucess = yield this.bookRepository.delete(parseInt(req.params.id));
            if (!sucess) {
                res.status(404).json({ message: 'Book Not Found' });
            }
            else {
                res.status(204).send();
            }
        });
        // @ts-ignore
        this.bookRepository = new book_repository_typeorm_1.default(datasource_1.datasource);
    }
}
exports.BookController = BookController;
