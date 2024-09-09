import express, {json, Request, Response} from 'express';
import bookRoutes from "./components/book-catalog/routes/book-routes";
import errorHandler from "./middlewares/error-handler";

const app = express();
app.use(json());

app.get('/', (req: Request, res: Response) => {
    res.send('Library Api')
})

app.use('/books', bookRoutes)

app.use(errorHandler);

export default app;