import express, { Router } from "express";
import ConversationController from "../controllers/conversation";
import { Request, Response } from "express";

const router: Router = express.Router();
const conversationCtl: any = new ConversationController();

router.post("/conversations", conversationCtl.createConversation);
router.get("/:userId", conversationCtl.getConversation);

export default router;
