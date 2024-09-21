import {Router} from 'express';
import {AdressController} from "../adress-controller/adress-controller";

const router = Router();
const adressController = new AdressController();

router.get("/", adressController.getAll);
router.get("/:id", adressController.getByid);
router.post("/", adressController.create);
router.put("/:id", adressController.update);
router.patch("/:id", adressController.replace);
router.delete("/:id", adressController.delete);

export default router;