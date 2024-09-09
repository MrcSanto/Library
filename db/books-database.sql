create table book(
                     book_id SERIAL PRIMARY KEY,
                     book_name VARCHAR(255) NOT NULL,
                     book_editora TEXT,
                     book_comment TEXT
);

-- Inserindo registros na tabela 'book'
INSERT INTO book (book_name, book_editora, book_comment)
VALUES ('The Catcher in the Rye', 'Little, Brown and Company', 'Classic novel by J.D. Salinger.');

INSERT INTO book (book_name, book_editora, book_comment)
VALUES ('1984', 'Secker & Warburg', 'Dystopian novel by George Orwell.');

INSERT INTO book (book_name, book_editora, book_comment)
VALUES ('Brave New World', 'Chatto & Windus', 'Dystopian novel by Aldous Huxley.');

INSERT INTO book (book_name, book_editora, book_comment)
VALUES ('To Kill a Mockingbird', 'J.B. Lippincott & Co.', 'Pulitzer Prize-winning novel by Harper Lee.');

INSERT INTO book (book_name, book_editora, book_comment)
VALUES ('The Great Gatsby', 'Charles Scribners Sons', 'Classic novel by F. Scott Fitzgerald.');