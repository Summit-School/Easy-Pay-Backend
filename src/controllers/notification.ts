import { Request, Response } from "express";
import dotenv from "dotenv";

import Notification from "../models/notification";

dotenv.config();

class NotificationController {
  async saveToken(req: Request, res: Response) {
    Notification.find({ userId: req.body.userId })
      .exec()
      .then((tkn) => {
        if (tkn.length >= 1) {
          return res.status(409).json({
            message: "Token already exists",
          });
        } else {
          const userToken = new Notification({
            userId: req.body.userId,
            token: req.body.token,
          });
          userToken
            .save()
            .then((result) => {
              return res.status(200).json({
                message: "Token Saved",
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //   async getMessage(req: Request, res: Response) {
  //     try {
  //       const massages = await Message.find({
  //         message: { $in: [req.params.id] },
  //       });

  //       res.status(200).send(massages);
  //     } catch (error) {
  //       res.status(500).json({
  //         error: error,
  //       });
  //     }
  //   }
}

export default NotificationController;
