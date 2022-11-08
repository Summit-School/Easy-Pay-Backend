import { Request, Response } from "express";
import dotenv from "dotenv";

import Conversation from "../models/conversation";

dotenv.config();

class ConversationController {
  async createConversation(req: Request, res: Response) {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });

    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }

  async getConversation(req: Request, res: Response) {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }
}

export default ConversationController;
