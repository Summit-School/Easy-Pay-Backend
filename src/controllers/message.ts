import { Request, Response } from "express";
import dotenv from "dotenv";

import Message from "../models/message";

dotenv.config();

class MessageController {
  async createMessage(req: Request, res: Response) {
    const newMessage = new Message(req.body);

    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }

  async getMessage(req: Request, res: Response) {
    try {
      const massages = await Message.find({
        conversationId: req.params.conversationId,
      });

      res.status(200).send(massages);
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }
}

export default MessageController;
