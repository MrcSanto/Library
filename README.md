# Sistema de Gestão de Biblioteca Online

*O projeto ainda não está pronto...*

## Descrição

Este é um sistema de gestão de biblioteca online que permite a administração e consulta de livros em uma biblioteca. O sistema inclui funcionalidades para adicionar, atualizar, remover e listar livros, além de possibilitar a busca por títulos e autores.

## Funcionalidades | Endpoints

- ```GET /books```: Lista todos os livros.
- ```GET /books/:id```: Lista o livro pelo identificador.
- ```POST /books```: Adiciona novo livro.
- ```PUT /:id```: Substitui algum elemento de livro.
- ```PATCH /:id```: Atualiza o livro como um todo.
- ```DELETE /:id```: Deleta o livro do banco de dados pelo id.

## Tecnologias Utilizadas

- **Frontend**: **Ainda não definido**
- **Backend**: [Node.js](https://nodejs.org/) com [Express.js](https://expressjs.com/)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [TypeORM](https://typeorm.io/)

## Requisitos

- Node.js (v14 ou superior)
- PostgreSQL (v12 ou superior)

## Instalação

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/MrcSanto/Library-API.git

2. **Instale as dependências**

    ```bash
    cd Library-API
    npm install

3. **Configuração do Banco de Dados**
- Configure as variáveis de ambiente para a conexão com o BD. Crie um novo arquivo ```.env``` na raiz do projeto e adicione:
    ```bash
    DB_USER=seu_usuario
    DB_HOST=localhost
    DB_NAME=nome_do_banco
    DB_PASSWORD=sua_senha
    DB_PORT=5432

4. **Migrar o Banco de Dados**
- Execute as migrações para criar as tabelas no Banco de Dados:
    ```bash
    npm run migration:run

5. **Iniciar o servidor**

    ```bash
    npm start
