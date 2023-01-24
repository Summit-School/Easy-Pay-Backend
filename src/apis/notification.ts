import express, { Router } from "express";
import NotificationController from "../controllers/notification";
import { Request, Response } from "express";

const router: Router = express.Router();
const notificationCtl: any = new NotificationController();

router.post("/saveToken", notificationCtl.saveToken);
// router.post(
//   "https://fcm.googleapis.com/fcm/send",
//   notificationCtl.sendNotification
// );

export default router;
