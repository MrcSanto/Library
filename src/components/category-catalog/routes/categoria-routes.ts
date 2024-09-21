import {Router} from 'express';
import {CategoriaController} from "../category-controllers/categoria-controller";

const router = Router();
const categoriaController = new CategoriaController();

router.get("/", categoriaController.getAll);
router.get("/:id", categoriaController.getById);
router.post("/", categoriaController.create);
router.put("/:id", categoriaController.update);
router.patch("/:id", categoriaController.replace);
router.delete("/:id", categoriaController.delete);

export default router;