import {Router} from 'express';
import {BookController} from "../book-controllers/book-controller";
import Auth from "../../../middlewares/auth";

const router = Router();
const bookController = new BookController();

router.get("/", bookController.getAll);
router.get("/most-popular", bookController.getMostPopular);
router.get("/most-recent", bookController.getMostRecent);
router.get("/:id", bookController.getByid);
router.post("/", Auth.authenticate, bookController.create);
router.put("/:id", Auth.authenticate, bookController.update);
router.patch("/:id", Auth.authenticate, bookController.replace);
router.delete("/:id", Auth.authenticate, bookController.delete);

export default router;