import {Request, Response} from 'express'
import {Repository} from "typeorm";
import ClienteEntity from "../entities/cliente-entity";
import logger from "../../../utils/logger";
import {datasource} from "../../../config/datasource";
import {ClientListDto} from "../dto/client-list-dto";
import AdressEntity from "../../adress-catalog/entities/adress-entity";

export class ClientController {
    private clientRepository: Repository<ClienteEntity>;
    constructor() {
        this.clientRepository = datasource.getRepository(ClienteEntity);
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
        const result = await this.clientRepository.findAndCount({
            relations : ['clientAdress']
        });
        const clientList : ClientListDto = {data: result[0], total: result[1]};
        res.status(200).json(clientList);
    };
    getAllPaged = async (req: Request, res: Response): Promise<void> => {
        const skip = parseInt(req.query.skip as string);
        const take = parseInt(req.query.take as string);

        const result = await this.clientRepository.findAndCount({
            skip, take
        });
        const AdressList : ClientListDto = {data: result[0], total: result[1]};
        res.status(200).json(AdressList);
    };
    getByid = async (req: Request, res: Response): Promise<void> => {
        const cliente = await this.clientRepository.findOne({
            where: {clientId: parseInt(req.params.id)},
            relations : ['clientAdress']
        });
        if (!cliente){
            res.status(404).send("Cliente nao encontrado");
        } else {
            res.status(200).json(cliente);
        }
    };
    create = async (req: Request, res: Response): Promise<void> => {
        try {
            // Extraindo os valores do corpo da requisição
            const { clientCpf, clientNome, clientAdress } = req.body;

            // Obtendo o repositório de Endereco e buscando o endereço pelo ID, se fornecido
            const adress_repo = datasource.getRepository(AdressEntity);
            const adress = clientAdress ? await adress_repo.findOneBy({ enderecoId: clientAdress }) : null;

            // Criando nova instância e atribuindo os valores
            const newCliente = new ClienteEntity();
            newCliente.clientCpf = clientCpf;
            newCliente.clientNome = clientNome;
            newCliente.clientAdress = adress || null;

            // Salvando a nova instância no banco usando TypeORM
            const savedCliente = await datasource.getRepository(ClienteEntity).save(newCliente);
            res.status(201).json(savedCliente);
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar cliente", error });
        }
    };
    replace = async (req: Request, res: Response): Promise<void> => {
        const cliente_id = parseInt(req.params.id);
        const existingCliente = await this.clientRepository.findOneBy({clientId : cliente_id});

        if (!existingCliente){
            res.status(404).send("Book not found");
        } else {
            const updatedCliente = this.clientRepository.create({...existingCliente, ...req.body});
            await this.clientRepository.save(updatedCliente);
            res.status(200).json(updatedCliente);
        }
    };
    update = async (req: Request, res: Response): Promise<void> => {
        const cliente_id = parseInt(req.params.id);
        const partialUpdate = req.body;

        const result = await this.clientRepository.update(cliente_id, partialUpdate);
        if (result.affected === 0) {
            res.status(404).send("Cliente nao encontrado");
        } else {
            const updatedBook = await this.clientRepository.findOneBy({clientId : cliente_id});
            res.status(200).json(updatedBook);
        }
    };
    delete = async (req: Request, res: Response): Promise<void> => {
        const result = await this.clientRepository.delete(parseInt(req.params.id));
        if (result.affected === 0){
            res.status(404).send('Book not found');
        } else {
            res.status(204).send();
        }
    };
}