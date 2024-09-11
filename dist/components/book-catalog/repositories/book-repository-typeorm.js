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
const book_entity_1 = __importDefault(require("../entities/book-entity"));
class BookRepository {
    constructor(dataSource) {
        this.repository = dataSource.getRepository(book_entity_1.default);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.repository.findOneBy({ bookId: id }); /////////
            return book || undefined;
        });
    }
    create(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = this.repository.create(book);
            return this.repository.save(newProduct);
        });
    }
    replace(id, book) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(id, book);
            return this.getById(id);
        });
    }
    update(id, book) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(id, book);
            return this.getById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repository.delete(id);
            return (result === null || result === void 0 ? void 0 : result.affected) ? result.affected > 0 : false;
        });
    }
}
exports.default = BookRepository;
