import express, { Router } from "express";
import ExpoController from "../controllers/expo_notifications";
import pushNotification from "../services/push_notification/expo.notification";

const router: Router = express.Router();
const exponotifCtl: any = new ExpoController();
const pushNotificationCtl: any = new pushNotification();

router.get("/expoTokens/token", exponotifCtl.getTokens);
router.post("/saveToken", exponotifCtl.saveToken);

router.post("/sendPushNotification", pushNotificationCtl.sendPushNotification);
export default router;
