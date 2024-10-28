import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

class Auth {
    async authenticate(req: Request, res: Response, next: () => void) {
        const bearerHeader = req.headers.authorization;
        if (!bearerHeader) {
            return res.status(401).json({auth : false, message : "Nenhum token fornecido"})
        }
        const bearer = bearerHeader.split(' ')[1]
        const secret = process.env.JWT_SECRET || 'default_secret';
        jwt.verify(bearer, secret,  function (err: any, decoded: any) {
            if (err) return res.status(500).json({
                auth: false,
                message: "Failed to authenticate token.",
                error: err
            });
            req.params.token = bearer;
            next();
        });
    }
}

export default new Auth()
