import {Request, Response} from "express";
import {Repository} from "typeorm";
import EmprestimoEntity from "../entities/emprestimo-entity";
import {datasource} from "../../../config/datasource";
import logger from "../../../utils/logger";
import {EmprestimoListDto} from "../dto/emprestimo-list-dto";
import BookEntity from "../../book-catalog/entities/book-entity";
import ClienteEntity from "../../client-catalog/entities/cliente-entity";

export class EmprestimoController{
    private emprestimoRepository: Repository<EmprestimoEntity>;
    constructor(){
        this.emprestimoRepository = datasource.getRepository(EmprestimoEntity);
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        if (req.query.skip && req.query.take){
            logger.debug(`Getting books from skip: ${req.query.skip}`);
            logger.debug(`Getting books from take: ${req.query.take}`);
            return this.getAllPaged(req, res);
        } else {
            return this.getAllWithoutPage(req, res);
        }
    };
    getAllWithoutPage = async (req: Request, res: Response): Promise<void> => {
        const result = await this.emprestimoRepository.findAndCount({
            relations:  ['emprestimoClient', 'emprestimoLivro'],
        });
        const emprestimoList : EmprestimoListDto = {data: result[0], total: result[1]};
        res.status(200).json(emprestimoList);
    };
    getAllPaged = async (req: Request, res: Response): Promise<void> => {
        const skip = parseInt(req.query.skip as string);
        const take = parseInt(req.query.take as string);

        const result = await this.emprestimoRepository.findAndCount({
            skip, take
        });
        const emprestimoList : EmprestimoListDto = {data: result[0], total: result[1]};
        res.status(200).json(emprestimoList);
    };
    getByid = async (req: Request, res: Response): Promise<void> => {
        const emprestimo = await this.emprestimoRepository.findOne({
            where: {
                emprestimoId : parseInt(req.params.id)
            },
            relations: ['emprestimoClient', 'emprestimoLivro']
        });
        if (!emprestimo) {
            res.status(404).send("Emprestimo nao encontrado");
        } else {
            res.status(200).json(emprestimo);
        }
    };
    create = async (req: Request, res: Response): Promise<void> => {
        const {emprestimoClient, emprestimoLivro, dataEmprestimo, dataDevolucao} = req.body;

        const client_repo = datasource.getRepository(ClienteEntity);
        const cliente = await client_repo.findOneBy({clientId : emprestimoClient});

        const emprestimo_repo = datasource.getRepository(BookEntity);
        const emprestimo = await emprestimo_repo.findOneBy({bookId : emprestimoLivro});

        if (!cliente || !emprestimo) {
            res.status(400).send("Verificar os parametros informados");
        } else{
            const newEmprestimo = new EmprestimoEntity();
            newEmprestimo.emprestimoClient = emprestimoClient;
            newEmprestimo.emprestimoLivro = emprestimoLivro;
            newEmprestimo.dataEmprestimo = dataEmprestimo;
            newEmprestimo.dataDevolucao = dataDevolucao;

            const savedEmprestimo = await datasource.getRepository(EmprestimoEntity).save(newEmprestimo);
            res.status(201).json(savedEmprestimo);
        }
    };
    replace = async (req: Request, res: Response): Promise<void> => {
        const emprestimo_id = parseInt(req.params.id);
        const existingEmprestimo = await this.emprestimoRepository.findOneBy({emprestimoId : emprestimo_id});

        if (!existingEmprestimo){
            res.status(404).send("Emprestimo nao encontrado");
        } else {
            const updatedEmprestimo = this.emprestimoRepository.create({...existingEmprestimo, ...req.body});
            await this.emprestimoRepository.save(updatedEmprestimo);
            res.status(200).json(updatedEmprestimo);
        }
    };
    update = async (req: Request, res: Response): Promise<void> => {
        const emprestimo_id = parseInt(req.params.id);
        const partialUpdate = req.body;

        const result = await this.emprestimoRepository.update(emprestimo_id, partialUpdate);
        if (result.affected === 0) {
            res.status(404).send("Emprestimo nao encontrado");
        } else {
            const updatedEmprestimo = await this.emprestimoRepository.findOneBy({emprestimoId : emprestimo_id});
            res.status(200).json(updatedEmprestimo);
        }
    };
    delete = async (req: Request, res: Response): Promise<void> => {
        const result = await this.emprestimoRepository.delete(parseInt(req.params.id));
        if (result.affected === 0){
            res.status(404).send('Emprestimo nao encontrado');
        } else {
            res.status(204).send();
        }
    };
}