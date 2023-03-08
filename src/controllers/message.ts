import { Request, Response } from "express";
import dotenv from "dotenv";

import Message from "../models/message";

import { sendNotification } from "../services/push_notification/notification";

dotenv.config();

class MessageController {
  async createMessage(req: Request, res: Response) {
    const newMessage = new Message({
      message: [req.body.sender, req.body.receiver],
      text: req.body.text,
    });

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
        message: { $in: [req.params.id] },
      });
      await sendNotification({
        title: "New Message",
        description: `You have a new message from a client`,
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
