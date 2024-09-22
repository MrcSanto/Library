import {Request, Response} from 'express';
import {Repository} from 'typeorm';
import CategoriaEntity from "../entities/categoria-entity";
import {datasource} from "../../../config/datasource";

export class CategoriaController {
    private categoriaRepository: Repository<CategoriaEntity>
    constructor() {
        this.categoriaRepository = datasource.getRepository(CategoriaEntity);
    }

    //Categoria nao possui um DTO pois não são muitas categorias que existem
    //nao vi motivo para uma consulta paginada.
    getAll = async (req: Request, res: Response): Promise<void> => {
        const categorias = await this.categoriaRepository.find();
        res.status(200).json(categorias);
    };
    getById = async (req: Request, res: Response): Promise<void> => {
        const categoria = await this.categoriaRepository.findOne({
            where: {categoriaId: parseInt(req.params.id)},
        });
        if (!categoria){
            res.status(404).send("Categoria nao encontrada");
        } else {
            res.status(200).json(categoria);
        }
    };
    create = async (req: Request, res : Response): Promise<void> => {
        //extraindo os dados do corpo da requisição
        const {nome, descricao} = req.body;

        //instanciando a nova categoria e atribuindo os valores
        const newCategoria = new CategoriaEntity();
        newCategoria.nome = nome;
        newCategoria.descricao = descricao;

        //e salvando a nova instancia no banco usando typeORM
        const savedCategoria = await datasource.getRepository(CategoriaEntity).save(newCategoria);
        res.status(201).json(savedCategoria);
    };
    replace = async (req: Request, res : Response): Promise<void> => {
        const categoria_id = parseInt(req.params.id);
        const existingCategoria = await this.categoriaRepository.findOneBy({categoriaId : categoria_id});

        if (!existingCategoria){
            res.status(404).send("Categoria nao encontrada");
        } else {
            const updatedCategoria = this.categoriaRepository.create({...existingCategoria, ...req.body});
            await this.categoriaRepository.save(updatedCategoria);
            res.status(200).json(updatedCategoria);
        }
    };
    update = async (req: Request, res : Response): Promise<void> => {
        const categoria_id = parseInt(req.params.id);
        const partialUpdate = req.body;

        const result = await this.categoriaRepository.update(categoria_id, partialUpdate);
        if (result.affected === 0) {
            res.status(404).send("Categoria nao encontrada");
        } else {
            const updatedCategoria = await this.categoriaRepository.findOneBy({categoriaId : categoria_id});
            res.status(200).json(updatedCategoria);
        }
    };
    delete = async (req: Request, res : Response): Promise<void> => {
        const result = await this.categoriaRepository.delete(parseInt(req.params.id));
        if (result.affected === 0){
            res.status(404).send('Categoria nao encontrada');
        } else {
            res.status(204).send();
        }
    }
}