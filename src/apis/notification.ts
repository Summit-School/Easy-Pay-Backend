import express, { Router } from "express";
import NotificationController from "../controllers/notification";
import { Request, Response } from "express";

const router: Router = express.Router();
const notificationCtl: any = new NotificationController();

router.post("/saveToken", notificationCtl.saveToken);
// router.get("/messages/:id", messageCtl.getMessage);

export default router;
