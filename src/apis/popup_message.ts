import express, { Router } from "express";
import PopupController from "../controllers/popup_message";
import { Request, Response } from "express";

const router: Router = express.Router();
const popupCtl: any = new PopupController();

router.post("/createPopupMessage", popupCtl.createPopupMessage);
router.get("/getPopupMessage", popupCtl.getPopupMessage);
router.put("/updatePopupMessage/:id", popupCtl.updatePopupMessage);
router.delete("/deletePopupMessage/:id", popupCtl.deletePopupMessage);

export default router;
