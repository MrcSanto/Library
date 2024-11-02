CREATE TABLE categoria(
    categoria_id SERIAL PRIMARY KEY,
    categoria_nome VARCHAR(50),
    categoria_desc TEXT
);
CREATE TABLE book (
    book_id SERIAL PRIMARY KEY,
    book_nome VARCHAR(50) NOT NULL,
    book_autor VARCHAR(50) NOT NULL,
    book_isbn INTEGER UNIQUE,
    book_categoria INTEGER,
    book_paginas INTEGER,
    book_restantes INTEGER,
    book_qtd_emprestados INTEGER,
    book_data_add DATE,
    book_imagem VARCHAR(255),
    FOREIGN KEY (book_categoria) REFERENCES categoria(categoria_id)
);


CREATE TABLE endereco (
    endereco_id SERIAL PRIMARY KEY,
    rua VARCHAR(100) NOT NULL,
    numero VARCHAR(10),
    complemento VARCHAR(50),
    bairro VARCHAR(50),
    cidade VARCHAR(50) NOT NULL,
    cep VARCHAR(10) NOT NULL
);

CREATE TABLE cliente(
    client_id SERIAL PRIMARY KEY,
    client_cpf VARCHAR(11) UNIQUE,
    client_nome VARCHAR(50) NOT NULL,
    client_adress INTEGER,
    FOREIGN KEY (client_adress) REFERENCES endereco(endereco_id)
);

CREATE TABLE emprestimos(
    emprestimo_id SERIAL PRIMARY KEY,
    emprestimo_client INTEGER NOT NULL,
    emprestimo_livro INTEGER NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    FOREIGN KEY (emprestimo_client) REFERENCES cliente(client_id),
    FOREIGN KEY (emprestimo_livro) REFERENCES book(book_id)
);

CREATE TABLE admin (
   admin_id SERIAL PRIMARY KEY,
   email VARCHAR(255) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   nome VARCHAR(100) NOT NULL
);


INSERT INTO categoria (categoria_nome, categoria_desc) VALUES
('Ficção', 'Livros de ficção narrativa'),
('Fantasia', 'Livros com elementos fantásticos e sobrenaturais'),
('Biografia', 'Livros sobre a vida de pessoas'),
('Tecnologia', 'Livros sobre avanços tecnológicos e ciência da computação'),
('História', 'Livros sobre eventos e civilizações antigas e modernas'),
('Autoajuda', 'Livros que ajudam no desenvolvimento pessoal'),
('Romance', 'Histórias de amor e relações interpessoais'),
('Suspense', 'Livros com foco em mistério e tensão'),
('Terror', 'Livros com histórias assustadoras e sobrenaturais'),
('Aventura', 'Livros que envolvem explorações e jornadas'),
('Religiosos', 'Livros que abordam temas de fé e espiritualidade'),
('Gibis', 'Histórias em quadrinhos de diversos gêneros'),
('Livros Infantis', 'Livros voltados para o público infantil'),
('Livros de Poesia', 'Coleções de poemas e poesias'),
('Livros de Filosofia', 'Obras que discutem questões filosóficas e existenciais'),
('Contos', 'Coleções de contos curtos e narrativas breves');

INSERT INTO book (book_nome, book_autor, book_isbn, book_categoria, book_paginas, book_restantes, book_qtd_emprestados, book_data_add, book_imagem) VALUES
('O Senhor dos Anéis', 'J.R.R. Tolkien', 123456, 2, 1178, 5, 13, '2023-01-10', 'https://dcdn.mitiendanube.com/stores/001/996/618/products/o20senhor20dos20anc3a9is20vol20220as20duas20torres20capa20serie20j-r-r-20tolkien20editora20harper20collins-eb30bb98b3fe8313aa16649876041678-1024-1024.webp'),
('Dom Casmurro', 'Machado de Assis', 223344, 7, 256, 3, 1, '2023-02-15', 'https://m.media-amazon.com/images/I/41AYWyc6qmL._SY445_SX342_.jpg'),
('Steve Jobs', 'Walter Isaacson', 998877, 3, 600, 2, 32, '2023-03-20', 'https://m.media-amazon.com/images/I/81wbmWlRNEL._SL1500_.jpg'),
('A Revolução dos Bichos', 'George Orwell', 445566, 1, 152, 4, 12, '2023-04-25', 'https://m.media-amazon.com/images/I/61owA5ey3iL._SY445_SX342_.jpg'),
('A Torre Negra', 'Stephen King', 778899, 9, 820, 6, 51, '2023-05-30', 'https://m.media-amazon.com/images/I/51fLBNCsV6L._SY445_SX342_.jpg'),
('O Código Da Vinci', 'Dan Brown', 112233, 8, 480, 7, 22, '2023-06-10', 'https://m.media-amazon.com/images/I/91QSDmqQdaL._SY466_.jpg'),
('Clean Code', 'Robert C. Martin', 556677, 4, 464, 5, 17, '2023-07-15', 'https://m.media-amazon.com/images/I/413za4fzZLL._SY445_SX342_.jpg'),
('História do Brasil', 'Boris Fausto', 332211, 5, 530, 4, 0, '2023-08-20', 'https://m.media-amazon.com/images/I/512fsxhpw7L._SY445_SX342_.jpg'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 667788, 7, 120, 3, 5, '2023-09-25', 'https://m.media-amazon.com/images/I/71LJ4k-k9hL._SY466_.jpg'),
('It: A Coisa', 'Stephen King', 887766, 9, 1104, 2, 31, '2023-10-30', 'https://m.media-amazon.com/images/I/51z0s3GcvwL._SY445_SX342_.jpg'),
('1984', 'George Orwell', 112358, 1, 328, 4, 15, '2023-11-01', 'https://m.media-amazon.com/images/I/51feD87yuEL._SY445_SX342_.jpg'),
('O Alquimista', 'Paulo Coelho', 987654, 5, 208, 6, 10, '2023-11-05', 'https://m.media-amazon.com/images/I/51cF7jnQGBS._SY445_SX342_.jpg'),
('O Hobbit', 'J.R.R. Tolkien', 654321, 2, 310, 3, 20, '2023-11-10', 'https://m.media-amazon.com/images/I/91M9xPIf10L._AC_UF1000,1000_QL80_.jpg'),
('A Menina que Roubava Livros', 'Markus Zusak', 321654, 7, 552, 2, 18, '2023-11-15', 'https://m.media-amazon.com/images/I/41pVlY-bbaL._SY445_SX342_.jpg'),
('O Caçador de Pipas', 'Khaled Hosseini', 135791, 3, 371, 5, 11, '2023-11-20', 'https://m.media-amazon.com/images/I/41XrBearVdL._SY445_SX342_.jpg'),
('A Culpa é das Estrelas', 'John Green', 246813, 8, 313, 4, 9, '2023-11-25', 'https://m.media-amazon.com/images/I/41yToN1cOML._SY445_SX342_.jpg'),
('A Guerra dos Tronos', 'George R.R. Martin', 102030, 9, 694, 3, 7, '2023-12-01', 'https://m.media-amazon.com/images/I/41UKpOWrZVL._SY445_SX342_.jpg'),
('O Livro dos Espíritos', 'Allan Kardec', 314159, 4, 800, 2, 5, '2023-12-05', 'https://m.media-amazon.com/images/I/41dOD1tpSiL._SY445_SX342_.jpg'),
('O Pássaro da Noite', 'Sérgio Sant’Anna', 271828, 6, 350, 3, 4, '2023-12-10', 'https://cdn.lojavirtuolpro.com/editoramondrongo/produto/multifotos/hd/20220708173838_1622998378_DZ.jpg'),
('Cem Anos de Solidão', 'Gabriel García Márquez', 161803, 5, 417, 2, 3, '2023-12-15', 'https://m.media-amazon.com/images/I/515cVYLIP9L._SY445_SX342_.jpg');

INSERT INTO endereco (rua, numero, complemento, bairro, cidade, cep) VALUES
('Rua das Flores', '123', 'Apto 101', 'Centro', 'São Paulo', '01001-000'),
('Av. Atlântica', '456', NULL, 'Copacabana', 'Rio de Janeiro', '22070-001'),
('Rua dos Artistas', '789', 'Bloco B', 'Vila Madalena', 'São Paulo', '05432-010'),
('Av. Paulista', '1001', 'Cobertura', 'Bela Vista', 'São Paulo', '01311-200'),
('Rua dos Pinheiros', '321', 'Casa', 'Pinheiros', 'São Paulo', '05422-040'),
('Rua da Praia', '654', 'Apto 202', 'Centro', 'Florianópolis', '88010-110'),
('Rua do Sol', '987', NULL, 'Boa Viagem', 'Recife', '51020-040'),
('Rua da Glória', '111', 'Fundos', 'Liberdade', 'São Paulo', '01509-000'),
('Rua das Palmeiras', '555', 'Casa 5', 'Jardins', 'São Paulo', '01412-050'),
('Rua da Aurora', '999', 'Cobertura', 'Centro', 'Recife', '50050-080');

INSERT INTO endereco (rua, numero, complemento, bairro, cidade, cep) VALUES
('Rua das Flores', '123', 'Apto 101', 'Centro', 'São Paulo', '01001-000'),
('Av. Atlântica', '456', NULL, 'Copacabana', 'Rio de Janeiro', '22070-001'),
('Rua dos Artistas', '789', 'Bloco B', 'Vila Madalena', 'São Paulo', '05432-010'),
('Av. Paulista', '1001', 'Cobertura', 'Bela Vista', 'São Paulo', '01311-200'),
('Rua dos Pinheiros', '321', 'Casa', 'Pinheiros', 'São Paulo', '05422-040'),
('Rua da Praia', '654', 'Apto 202', 'Centro', 'Florianópolis', '88010-110'),
('Rua do Sol', '987', NULL, 'Boa Viagem', 'Recife', '51020-040'),
('Rua da Glória', '111', 'Fundos', 'Liberdade', 'São Paulo', '01509-000'),
('Rua das Palmeiras', '555', 'Casa 5', 'Jardins', 'São Paulo', '01412-050'),
('Rua da Aurora', '999', 'Cobertura', 'Centro', 'Recife', '50050-080');

INSERT INTO cliente (client_cpf, client_nome, client_adress) VALUES
 ('12345678901', 'João da Silva', 1),
 ('98765432100', 'Maria Oliveira', 2),
 ('45678912345', 'Pedro Souza', 3),
 ('65432198765', 'Ana Lima', 4),
 ('32165498700', 'Lucas Ferreira', 5),
 ('15975348620', 'Carla Mendes', 6),
 ('95135785246', 'Fernanda Ribeiro', 7),
 ('85274196387', 'Marcelo Costa', 8),
 ('75395185264', 'Julia Carvalho', 9),
 ('14725836915', 'Paulo Miranda', 10);


INSERT INTO emprestimos (emprestimo_client, emprestimo_livro, data_emprestimo, data_devolucao) VALUES
(1, 1, '2024-09-01', '2024-09-15'),
(2, 2, '2024-09-03', NULL),
(3, 3, '2024-09-05', '2024-09-18'),
(4, 4, '2024-09-07', NULL),
(5, 5, '2024-09-10', '2024-09-20'),
(6, 6, '2024-09-12', NULL),
(7, 7, '2024-09-14', '2024-09-25'),
(8, 8, '2024-09-16', NULL),
(9, 9, '2024-09-18', '2024-09-29'),
(10, 10, '2024-09-20', NULL);

INSERT INTO admin (email, password, nome) VALUES
  ('admin1@upf.br', '$2a$10$n7jaq45B3QRRUEeQ7CWkfOnvfPHZ/bYj9EyQ3Wo0uYuydi0Gxw5B6', 'Secagonopeida Dos Santos'), --senha encriptada
  ('admin2@upf.br', '$2a$10$DPlh8W4n3x5ZthJb81OTwOFPGb1IuX4fRpZRKu4PxuFmLoItrzgHK', 'Pintomole Pinto da Silva'); --senha encriptada



