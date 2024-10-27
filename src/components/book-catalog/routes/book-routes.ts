import {Router} from 'express';
import {BookController} from "../book-controllers/book-controller";

const router = Router();
const bookController = new BookController();

router.get("/", bookController.getAll);
router.get("/most-popular", bookController.getMostPopular);
router.get("/most-recent", bookController.getMostRecent);
router.get("/:id", bookController.getByid);
router.post("/", bookController.create);
router.put("/:id", bookController.update);
router.patch("/:id", bookController.replace);
router.delete("/:id", bookController.delete);

export default router;