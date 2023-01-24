import { Request, Response } from "express";
import dotenv from "dotenv";
const admin = require("firebase-admin");

import Notification from "../models/notification";

dotenv.config();

// const serviceAccount = require("../../firebase.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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

  //   async sendNotification(req: Request, res: Response) {
  //     Notification.find({ userId: req.params.userId })
  //       .exec()
  //       .then(async (notification) => {
  //         if (notification) {
  //           const tokens = notification[0].token;
  //           console.log(tokens);
  //         }
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }
}

export default NotificationController;
