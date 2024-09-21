import {Router} from 'express';
import {ClientController} from "../client-controller/client-controller";

const router = Router();
const clientController = new ClientController();

router.get("/", clientController.getAll);
router.get("/:id", clientController.getByid);
router.post("/", clientController.create);
router.put("/:id", clientController.update);
router.patch("/:id", clientController.replace);
router.delete("/:id", clientController.delete);

export default router;