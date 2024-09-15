import BookEntity from "../entities/book-entity";

export type BookListDto = {
    data : BookEntity[];
    total : number;
}