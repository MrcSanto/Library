import {Router} from 'express';
import {BookController} from "../book-controllers/book-controller";

const router = Router();
const bookController = new BookController();

router.get("/", bookController.getAll);
router.get("/:id", bookController.getByid);
router.post("/", bookController.create);
router.put("/:id", bookController.update);
router.patch("/:id", bookController.replace);
router.delete("/:id", bookController.delete);

export default router;