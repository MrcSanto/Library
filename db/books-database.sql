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

CREATE TABLE editora (
    editora_id SERIAL PRIMARY KEY,
    nome_fantasia VARCHAR(50),
    razao_social VARCHAR(50)
);
CREATE TABLE autor(
    autor_id SERIAL PRIMARY KEY,
    autor_nacionalidade VARCHAR(50) NOT NULL
);
CREATE TABLE genero(
    genero_id SERIAL PRIMARY KEY,
    genero_nome VARCHAR(100) NOT NULL,
    genero_descricao TEXT NOT NULL
);
CREATE TABLE book (
    book_id SERIAL PRIMARY KEY, -- ISBN
    book_name VARCHAR(100) NOT NULL,
    book_editora INTEGER NOT NULL,
    book_autor INTEGER NOT NULL,
    book_genero INTEGER NOT NULL,
    book_remaining INTEGER NOT NULL,
    book_numPages INTEGER NOT NULL,
    book_ranking SMALLINT CHECK (book_ranking >= 0 AND book_ranking <= 5),
    FOREIGN KEY (book_editora) REFERENCES editora(editora_id),
    FOREIGN KEY (book_autor) REFERENCES autor(autor_id),
    FOREIGN KEY (book_genero) REFERENCES genero(genero_id)
);

select * from book

