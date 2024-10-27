import express from 'express'
import {LoginController} from "../login-controller/login-controller";

const router = express.Router();
const loginController = new LoginController();

router.post("/login", loginController.DoLogin)
router.post('/hashcode', loginController.updatePassword)

export default router;