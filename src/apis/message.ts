import express, { Router } from "express";
import MessageController from "../controllers/message";
import { Request, Response } from "express";

const router: Router = express.Router();
const messageCtl: any = new MessageController();

router.post("/messages", messageCtl.createMessage);
router.get("/messages/:conversationId", messageCtl.getMessage);

export default router;
