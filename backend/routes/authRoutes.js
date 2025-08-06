import { googleLogin } from "../controllers/authController.js";
import express from 'express'
const router = express.Router();

router.post("/google", googleLogin);

export default router;

