import {Router} from "express";
import {EmprestimoController} from "../emprestimo-controller/emprestimo-controller";

const router = Router();
const emprestimoController = new EmprestimoController();

router.get("/", emprestimoController.getAll);
router.get("/:id", emprestimoController.getByid);
router.post("/", emprestimoController.create);
router.put("/:id", emprestimoController.update);
router.patch("/:id", emprestimoController.replace);
router.delete("/:id", emprestimoController.delete);

export default router;