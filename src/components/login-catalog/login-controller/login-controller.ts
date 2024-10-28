import {Request, Response} from 'express';
import {datasource} from "../../../config/datasource";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {Repository} from "typeorm";
import AdminEntity from "../entities/admin-entity";

export class LoginController {
    private adminRepository: Repository<AdminEntity>;
    constructor() {
        this.adminRepository = datasource.getRepository(AdminEntity);
    }

    DoLogin = async (req: Request, res: Response): Promise<Response>  => {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({message: 'Email e senha são obrigatórios.'});
        }

        const admin = await this.adminRepository.findOne({
            where: {email: email}
        });


        if (!admin || !bcrypt.compareSync(password, admin.password)) {
            return res.status(401).json({message: 'Credenciais inválidas.'});
        }

        const token = jwt.sign(
            {id: admin.adminId, email: admin.email},
            process.env.JWT_SECRET || 'default_secret',
            {expiresIn: '1h'}
        );

        return res.status(200).json(
            {auth: true, token: token}
        ).send()
    }
}
