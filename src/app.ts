import express, {json, Request, Response} from 'express';
import bookRoutes from "./components/book-catalog/routes/book-routes";
import categoriaRoutes from "./components/category-catalog/routes/categoria-routes";
import errorHandler from "./middlewares/error-handler";

const app = express();
app.use(json());

app.get('/', (req: Request, res: Response) => {
    res.send('Library Api')
})

app.use('/library/healthcheck', (req: Request, res: Response) => {
   res.status(200).json({status : 'Sucesso'})
});

app.use('/library/books', bookRoutes)
app.use('/library/categories', categoriaRoutes)

app.use(errorHandler);

export default app;