import {Request, Response} from 'express'
import {Repository} from 'typeorm'
import {DataSource} from "typeorm";
import logger from "../../../utils/logger";
import {Logger} from "winston";
import EnderecoEntity from "../entities/adress-entity";
import {datasource} from "../../../config/datasource";
import {AdressListDto} from "../dto/adress-list-dto";

export class AdressController {
    private adressRepository: Repository<EnderecoEntity>
    constructor() {
        this.adressRepository = datasource.getRepository(EnderecoEntity);
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
        const result = await this.adressRepository.findAndCount();
        const bookList : AdressListDto = {data: result[0], total: result[1]};
        res.status(200).json(bookList);
    };
    getAllPaged = async (req: Request, res: Response): Promise<void> => {
        const skip = parseInt(req.query.skip as string);
        const take = parseInt(req.query.take as string);

        const result = await this.adressRepository.findAndCount({
            skip, take
        });
        const AdressList : AdressListDto = {data: result[0], total: result[1]};
        res.status(200).json(AdressList);
    };
    getByid = async (req: Request, res: Response): Promise<void> => {
        const endereco = await this.adressRepository.findOne({
            where: {enderecoId: parseInt(req.params.id)},
        });
        if (!endereco){
            res.status(404).send("Endereco nao encontrado");
        } else {
            res.status(200).json(endereco);
        }
    };
    create = async (req: Request, res: Response): Promise<void> => {
        const {rua, numero, complemento, bairro, cidade, cep} = req.body;

        const newEndereco =  new EnderecoEntity();
        newEndereco.rua = rua;
        newEndereco.numero = numero;
        newEndereco.complemento = complemento;
        newEndereco.bairro = bairro;
        newEndereco.cidade = cidade;
        newEndereco.cep = cep;

        const savedEndereco = await datasource.getRepository(EnderecoEntity).save(newEndereco);
        res.status(201).json(savedEndereco);
    };
    replace = async (req: Request, res: Response): Promise<void> => {
        const endereco_id = parseInt(req.params.id);
        const existingEndereco = await this.adressRepository.findOneBy({enderecoId : endereco_id});

        if (!existingEndereco){
            res.status(404).send("Endereco nao encontrada");
        } else {
            const updatedEndereco = this.adressRepository.create({...existingEndereco, ...req.body});
            await this.adressRepository.save(updatedEndereco);
            res.status(200).json(updatedEndereco);
        }
    };
    update = async (req: Request, res: Response): Promise<void> => {
        const endereco_id = parseInt(req.params.id);
        const partialUpdate = req.body;

        const result = await this.adressRepository.update(endereco_id, partialUpdate);
        if (result.affected === 0) {
            res.status(404).send("Endereco nao encontrada");
        } else {
            const updatedCategoria = await this.adressRepository.findOneBy({enderecoId : endereco_id});
            res.status(200).json(updatedCategoria);
        }
    };
    delete = async (req: Request, res: Response): Promise<void> => {
        const result = await this.adressRepository.delete(parseInt(req.params.id));
        if (result.affected === 0){
            res.status(404).send('Endereco nao encontrada');
        } else {
            res.status(204).send();
        }
    };
}