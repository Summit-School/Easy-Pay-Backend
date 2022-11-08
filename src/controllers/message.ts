import { Request, Response } from "express";
import dotenv from "dotenv";

import Message from "../models/message";

dotenv.config();

class MessageController {
  createPopupMessage(req: Request, res: Response) {
    PopupMessage.find()
      .exec()
      .then((response) => {
        if (response.length >= 1) {
          return res.status(500).json({
            message: "Popup message already exists",
          });
        } else {
          const newMessage = new PopupMessage({
            message: req.body.message,
          });

          newMessage
            .save()
            .then((result) => {
              res.status(201).json({
                message: "Popup message created successfully",
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        }
      })
      .catch((err: any) => {
        return res.status(500).json({
          message: "Update Failed",
        });
      });
  }
}

export default MessageController;
