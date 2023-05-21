import express, { Router } from "express";
import ExpoController from "../controllers/expo_notifications";

const router: Router = express.Router();
const exponotifCtl: any = new ExpoController();

router.get("/expoTokens/token", exponotifCtl.getTokens);
router.post("/saveToken", exponotifCtl.saveToken);

export default router;
