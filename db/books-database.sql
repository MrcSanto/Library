CREATE TABLE editora (
    editora_id SERIAL PRIMARY KEY,
    nome_fantasia VARCHAR(50),
    razao_social VARCHAR(50)
);
CREATE TABLE autor(
    autor_id SERIAL PRIMARY KEY,
    autor_nome VARCHAR(100) NOT NULL,
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

-- Inserindo dados na tabela 'editora'
INSERT INTO editora (nome_fantasia, razao_social)
VALUES
    ('Editora ABC', 'ABC Livros Ltda.'),
    ('Editora XYZ', 'XYZ Publicações SA'),
    ('Livros Novo Mundo', 'Novo Mundo Editora Ltda.');

-- Inserindo dados na tabela 'autor'
INSERT INTO autor (autor_nome, autor_nacionalidade)
VALUES
    ('Jorge Amado', 'Brasileiro'),
    ('George Orwell', 'Britânico'),
    ('Isabel Allende', 'Chilena'),
    ('Haruki Murakami', 'Japonês'),
    ('Gabriel García Márquez', 'Colombiano');
-- Inserindo dados na tabela 'genero'
INSERT INTO genero (genero_nome, genero_descricao)
VALUES
    ('Ficção Científica', 'Gênero que trata de ficção com temas futuristas e tecnológicos.'),
    ('Romance', 'Histórias que se concentram em relacionamentos e emoções humanas.'),
    ('Biografia', 'Relato da vida de uma pessoa.');

-- Inserindo dados na tabela 'book'
INSERT INTO book (book_name, book_editora, book_autor, book_genero, book_remaining, book_numPages, book_ranking)
VALUES
    ('Viagem ao Futuro', 1, 1, 1, 12, 300, 4),
    ('O Amor nos Tempos da Ciência', 2, 2, 2, 8, 250, 5),
    ('A Vida de Marie Curie', 3, 3, 3, 5, 180, 3),
    ('Robôs e Humanos', 1, 1, 1, 7, 400, 5);


SELECT
    book.book_name as nome_livro,
    editora.razao_social as editora,
    autor.autor_nome as nome_autor
FROM
    book
INNER JOIN editora ON book.book_editora = editora.editora_id
INNER JOIN autor ON book.book_autor = autor.autor_id
INNER JOIN genero ON book.book_genero = genero.genero_id;
select * from book