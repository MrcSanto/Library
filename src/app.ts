import express, {json, Request, Response} from 'express';
import cors from 'cors';
import bookRoutes from "./components/book-catalog/routes/book-routes";
import categoriaRoutes from "./components/category-catalog/routes/categoria-routes";
import adressRoutes from "./components/adress-catalog/routes/adress-routes";
import clientRoutes from "./components/client-catalog/routes/client-routes";
import loginRoutes from "./components/login-catalog/routes/login-routes";
import errorHandler from "./middlewares/error-handler";
import emprestimoRoutes from "./components/emprestimo-catalog/routes/emprestimo-routes";

import Auth from "./middlewares/auth";

const app = express();

// Configurando o CORS
app.use(cors({
    origin: ['http://localhost:5100', 'http://localhost:8081'], // Permite requisições apenas dessa origem
}));

app.use(json());

app.get('/library', (req: Request, res: Response) => {
    res.send('Library Api');
});

app.use('/library/healthcheck', (req: Request, res: Response) => {
    res.status(200).json({ status: 'Sucesso' });
});

app.use('/library/books', bookRoutes);
app.use('/library/categories', categoriaRoutes);
app.use('/library/adresses', adressRoutes);
app.use('/library/clients', Auth.authenticate,  clientRoutes);
app.use('/library/emprestimos',Auth.authenticate, emprestimoRoutes);
app.use('/library', loginRoutes)

app.use(errorHandler);

export default app;
