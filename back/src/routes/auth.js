import { Router } from "express";

import {register, login, captcha} from '../controllers/authController.js'
const router = Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/captcha").get(captcha);
export default router;
