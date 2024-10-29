import {Router} from 'express';
import {CategoriaController} from "../category-controllers/categoria-controller";
import Auth from "../../../middlewares/auth";

const router = Router();
const categoriaController = new CategoriaController();

router.get("/", categoriaController.getAll);
router.get("/:id", categoriaController.getById);
router.post("/", Auth.authenticate, categoriaController.create);
router.put("/:id", Auth.authenticate, categoriaController.update);
router.patch("/:id", Auth.authenticate, categoriaController.replace);
router.delete("/:id", Auth.authenticate, categoriaController.delete);

export default router;